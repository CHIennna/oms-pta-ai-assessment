'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync('server.js', 'utf8');
function harness(store = new Map()) {
  const examsByVersion = new Map([['personal', {selfScheduled: true, duration: 120}], ['fixed', {startAt:'2026-11-21T15:00:00+08:00',endAt:'2026-11-21T17:00:00+08:00'}]]);
  const fsSync = {
    existsSync: key => store.has(key),
    readFileSync: key => store.get(key),
    mkdirSync() {},
    writeFileSync: (key, text) => store.set(key,text),
    renameSync: (from,to) => {store.set(to,store.get(from));store.delete(from);}
  };
  class TestDate extends Date { static now() { return Date.parse('2026-11-20T00:00:00Z'); } }
  const context = {path,auth:{dataDir:'/private'},fsSync,stateStore:null,examsByVersion,Date:TestDate,Promise};
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('function examTimestamp('),source.indexOf('function trustedPayload(')),context);
  vm.runInContext(source.slice(source.indexOf('const personalScheduleFile ='),source.indexOf('const server = http.createServer')),context);
  return {context,store};
}
test('personal times persist across reloads and stay isolated by account',async()=>{
  const {context,store}=harness();
  const first=await context.savePersonalSchedule('alice','personal','2026-11-25T09:00');
  assert.equal(first.endAt,'2026-11-25T03:00:00.000Z');
  await context.savePersonalSchedule('bob','personal','2026-11-26T10:00+08:00');
  const reloaded=harness(store).context;
  assert.equal((await reloaded.personalSchedulesFor('alice')).personal.startAt,first.startAt);
  assert.notEqual((await reloaded.personalSchedulesFor('bob')).personal.startAt,first.startAt);
});
test('concurrent schedule writes preserve both accounts',async()=>{
  const {context}=harness();
  await Promise.all([context.savePersonalSchedule('a','personal','2026-11-25T09:00'),context.savePersonalSchedule('b','personal','2026-11-26T09:00')]);
  assert.ok((await context.personalSchedulesFor('a')).personal);
  assert.ok((await context.personalSchedulesFor('b')).personal);
});
test('server blocks unscheduled and future exams and accepts a started personal exam',async()=>{
  const {context}=harness();
  assert.throws(()=>context.assertExamOpen('personal'),/请先设置/);
  const schedule=await context.savePersonalSchedule('a','personal','2026-11-25T09:00');
  assert.throws(()=>context.assertExamOpen('personal',Date.parse('2026-11-25T00:59:00Z'),schedule),/尚未开始/);
  assert.doesNotThrow(()=>context.assertExamOpen('personal',Date.parse('2026-11-25T01:01:00Z'),schedule));
  assert.throws(()=>context.assertExamOpen('fixed',Date.parse('2026-11-20T00:00:00Z')),/尚未开始/);
});
test('invalid dates and nonpersonal exams cannot be saved',async()=>{
  const {context}=harness();
  await assert.rejects(context.savePersonalSchedule('a','personal','bad'),/有效/);
  await assert.rejects(context.savePersonalSchedule('a','fixed','2026-11-25T09:00'),/有效/);
});
