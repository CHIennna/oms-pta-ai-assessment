'use strict';

const PROTOCOLS = new Set(['fzu-peak-interactive', 'fzu-xyz-communication']);
const fail = message => { throw new Error(message); };
const integers = input => {
  const tokens = String(input).trim().split(/\s+/);
  if (tokens.some(s => !/^\d+$/.test(s))) fail('裁判输入必须是非负整数。');
  return tokens.map(Number);
};

function parseGroups(input, kind) {
  let seed = 137, data = input;
  if (String(input).trim().startsWith('{')) {
    const fixture = JSON.parse(input); seed = fixture.seed; data = fixture.data;
    if (!Number.isSafeInteger(seed)) fail('裁判随机种子无效。');
  }
  const values = integers(data); let offset = 1, total = 0;
  const count = values[0], groups = [];
  if (!Number.isInteger(count) || count < 1 || count > (kind === 'peak' ? 2000 : 1000)) fail('裁判数据组数无效。');
  for (let t = 0; t < count; t++) {
    const n = values[offset++]; total += n;
    if (!Number.isInteger(n) || n < 2 || n > (kind === 'peak' ? 2000 : 10000)) fail('裁判数据规模无效。');
    if (total > (kind === 'peak' ? 2000 : 10000)) fail('裁判总规模超过限制。');
    if (kind === 'peak') {
      const permutation = values.slice(offset, offset + n); offset += n;
      if (permutation.length !== n || new Set(permutation).size !== n || permutation.some(v => v < 1 || v > n)) fail('裁判输入必须包含完整排列。');
      const table = new Int32Array(n * n);
      for (let l = n - 2; l >= 0; l--) {
        let less = 0;
        for (let r = l + 1; r < n; r++) {
          less += permutation[r] < permutation[l] ? 1 : 0;
          table[l * n + r] = table[(l + 1) * n + r] + less;
        }
      }
      groups.push({ n, permutation, table });
    } else {
      const edges = [], degree = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        const u = values[offset++], v = values[offset++];
        if (!Number.isInteger(u) || !Number.isInteger(v) || u < 1 || v < 1 || u > n || v > n || u === v) fail('比赛端点无效。');
        edges.push([u, v]); degree[u - 1]++; degree[v - 1]++;
      }
      if (degree.some(d => d !== 2)) fail('每人必须恰好参加两场比赛。');
      groups.push({ n, edges });
    }
  }
  if (offset !== values.length || total > (kind === 'peak' ? 2000 : 10000)) fail('裁判输入长度或总规模无效。');
  return { groups, seed };
}

function peakMachine(groups) {
  let current = 0, spent = 0;
  return {
    start: () => `${groups.length}\n${groups[0].n}\n`,
    line(line) {
      if (current >= groups.length) fail('最终答案后仍有多余输出。');
      const tokens = line.trim().split(/\s+/), group = groups[current];
      if (tokens[0] === '?' && tokens.length === 3 && tokens.slice(1).every(v => /^\d+$/.test(v))) {
        const l = Number(tokens[1]), r = Number(tokens[2]);
        if (!(1 <= l && l < r && r <= group.n)) fail('询问区间不合法。');
        spent += (r - l) ** 2;
        if (spent > 5 * group.n ** 2) fail('询问总代价超过 5n²。');
        return `${group.table[(l - 1) * group.n + r - 1]}\n`;
      }
      if (tokens[0] === '!' && tokens.length === 2 && /^\d+$/.test(tokens[1])) {
        const answer = Number(tokens[1]);
        if (group.permutation[answer - 1] !== group.n) fail('最大元素下标不正确。');
        current++; spent = 0;
        return current < groups.length ? `${groups[current].n}\n` : null;
      }
      fail('交互输出应为 ? l r 或 ! i。');
    },
    finish() { if (current !== groups.length) fail('程序结束前未完成全部回答。'); },
    get done() { return current === groups.length; }
  };
}

function encodingMachine(groups, labels) {
  return {
    start: () => '1\n' + groups.length + '\n' + groups.map(g => `${g.n}\n${g.edges.map(e => e.join(' ')).join('\n')}`).join('\n') + '\n',
    line(line) {
      for (const word of line.trim().split(/\s+/)) {
        if (labels.length >= groups.length || word.length !== groups[labels.length].n || !/^[xyz]+$/.test(word)) fail('第一轮必须为每组输出长度为 n 的 xyz 字符串。');
        labels.push(word);
      }
    },
    finish() { if (labels.length !== groups.length) fail('第一轮编码数量不足。'); },
    done: false,
    initialEOF: true
  };
}

function decodingMachine(groups, labels, seed) {
  let state = seed >>> 0;
  const random = max => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state % max; };
  const shuffle = array => { for (let i = array.length - 1; i > 0; i--) { const j = random(i + 1); [array[i], array[j]] = [array[j], array[i]]; } return array; };
  const order = shuffle(groups.map((g, i) => ({ ...g, label: labels[i], edges: shuffle(g.edges.map(e => random(2) ? [...e] : [e[1], e[0]])) })));
  let current = 0, edge = 0, wins = new Uint8Array(order[0].n);
  const header = () => `${order[current].n}\n${order[current].label}\n`;
  const nextEdge = () => order[current].edges[edge].join(' ') + '\n';
  return {
    start: () => `2\n${order.length}\n${header()}${nextEdge()}`,
    line(line) {
      const tokens = line.trim().split(/\s+/);
      if (tokens.length !== 1) fail('第二轮每行只能输出当前比赛的一个结果。');
      for (const token of tokens) {
        if (current >= order.length || !/^[01]$/.test(token)) fail('第二轮每场比赛必须立即输出 0 或 1。');
        const group = order[current], pair = group.edges[edge];
        if (++wins[pair[Number(token)] - 1] > 1) fail('同一选手赢了不止一场。');
        edge++;
        if (edge === group.n) {
          if (wins.some(n => n !== 1)) fail('未满足每人一胜一负。');
          current++; edge = 0;
          if (current === order.length) return null;
          wins = new Uint8Array(order[current].n);
          return header() + nextEdge();
        }
        return nextEdge();
      }
    },
    finish() { if (current !== order.length) fail('第二轮未完成全部比赛。'); },
    get done() { return current === order.length; }
  };
}

async function runProtocol(checker, input, launch) {
  const kind = checker === 'fzu-peak-interactive' ? 'peak' : 'xyz';
  let fixture;
  try { fixture = parseGroups(input, kind); }
  catch (error) { return { code: 0, stdout: '', stderr: '', durationMs: 0, protocolPassed: false, protocolHint: error.message }; }
  if (kind === 'peak') return launch(peakMachine(fixture.groups), 1);
  const labels = [];
  const first = await launch(encodingMachine(fixture.groups, labels), 1);
  if (first.protocolPassed !== true || first.code !== 0) return first;
  const second = await launch(decodingMachine(fixture.groups, labels, fixture.seed), 2);
  return { ...second, durationMs: first.durationMs + second.durationMs };
}

module.exports = { PROTOCOLS, parseGroups, peakMachine, encodingMachine, decodingMachine, runProtocol };
