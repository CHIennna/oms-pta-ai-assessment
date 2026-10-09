const STORAGE = 'oms-pta-admin-config-v1';
const toLocalDateTime = date => new Date(date.getTime()-date.getTimezoneOffset()*60000).toISOString().slice(0,16);
const defaultExam=window.OMS_EXAM_DATA||{examVersion:'fallback-exam',title:'程序设计考试',duration:120,questions:[{id:'1001',name:'示例题目',score:20,tests:3}]};
const defaultStart = defaultExam.startAt?new Date(defaultExam.startAt):new Date(),defaultEnd=defaultExam.endAt?new Date(defaultExam.endAt):new Date(defaultStart.getTime()+(Number(defaultExam.duration)||120)*60*1000);
const fallback={...defaultExam,startAt:defaultExam.startAt||toLocalDateTime(defaultStart),endAt:defaultExam.endAt||toLocalDateTime(defaultEnd),seat:'PC-08',candidateName:'admin',studentId:'102500000',registered:48};
let config,saved={};try{saved=JSON.parse(localStorage.getItem(STORAGE)||'{}');config=saved.examVersion===fallback.examVersion?{...fallback,...saved}:{...fallback,seat:saved.seat||fallback.seat,candidateName:saved.candidateName||fallback.candidateName,studentId:saved.studentId||fallback.studentId,registered:saved.registered||fallback.registered};}catch{config={...fallback};}if(defaultExam.scheduleVersion&&saved.scheduleVersion!==defaultExam.scheduleVersion){config.startAt=fallback.startAt;config.endAt=fallback.endAt;config.duration=defaultExam.duration;config.scheduleVersion=defaultExam.scheduleVersion;localStorage.setItem(STORAGE,JSON.stringify(config));}if(config.candidateName==='陈小雅')config.candidateName=fallback.candidateName;if(config.studentId==='202401050128')config.studentId=fallback.studentId;if(!config.startAt)config.startAt=fallback.startAt;if(!config.endAt)config.endAt=fallback.endAt;if(!Array.isArray(config.questions)||!config.questions.length)config.questions=fallback.questions;const primaryExamVersion=fallback.examVersion;let primaryConfig=config;let current=0,examExpired=false,activeRoute='info';const results={};const submissions=[];const code=document.querySelector('#code');
if(config.studentId==='102505201')config.studentId=fallback.studentId;
if(window.OMS_NUMBER_EXAM){config=window.OMS_NUMBER_EXAM(config,[config,...(window.OMS_EXAM_ARCHIVE||[])]);primaryConfig=config;}
let portalUser=null,portalAuthenticated=false,portalCsrf='',pendingLoginRoute='home',portalAuthAvailable=false,portalRegistrationEnabled=true,portalAuthMessage='',routeRevision=0,portalSessionRevision=0,loadingCode=false;
let SUBMITTED_CODE_STORAGE='',DRAFT_CODE_STORAGE='',submittedCodes={},draftCodes={};
function readCodeMap(key){try{return JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{return {};}}
function migrateQuestionCodes(map,questions){
  const migrated={...map};
  for(const question of questions){
    if(Object.prototype.hasOwnProperty.call(map,question.id))continue;
    const alias=(question.legacyIds||[]).find(id=>Object.prototype.hasOwnProperty.call(map,id));
    if(alias!==undefined)migrated[question.id]=map[alias];
  }
  return migrated;
}
function loadCodeStores(examVersion){
  const owner=portalUser?.id||'guest';
  SUBMITTED_CODE_STORAGE=`oms-pta-submitted-code-${owner}-${examVersion}`;
  DRAFT_CODE_STORAGE=`oms-pta-draft-code-${owner}-${examVersion}`;
  const questions=config.examVersion===examVersion?config.questions:[];
  submittedCodes=migrateQuestionCodes(readCodeMap(SUBMITTED_CODE_STORAGE),questions);
  draftCodes=migrateQuestionCodes(readCodeMap(DRAFT_CODE_STORAGE),questions);
  try{localStorage.setItem(SUBMITTED_CODE_STORAGE,JSON.stringify(submittedCodes));localStorage.setItem(DRAFT_CODE_STORAGE,JSON.stringify(draftCodes));}catch{/* Keep readable drafts in memory if storage is full. */}
}
loadCodeStores(config.examVersion);function submittedCodeForQuestion(questionId){return Object.prototype.hasOwnProperty.call(submittedCodes,questionId)?submittedCodes[questionId]:'';}function codeForQuestion(questionId){return Object.prototype.hasOwnProperty.call(draftCodes,questionId)?draftCodes[questionId]:submittedCodeForQuestion(questionId);}let activeQuestionId=config.questions[current].id;let loadedCode=submittedCodeForQuestion(activeQuestionId);code.value=codeForQuestion(activeQuestionId);
const $=s=>document.querySelector(s);const escape=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function lines(){ $('#lines').textContent=Array.from({length:Math.max(18,code.value.split('\n').length)},(_,i)=>i+1).join('\n'); }
function renderTexFragment(value){let rendered=value.replace(/\\(?:texttt|mathtt)\{([^{}]*)\}/g,'<code>$1</code>').replace(/\\mathrm\{([^{}]*)\}/g,'$1').replace(/\\boldsymbol\{([^{}]*)\}/g,'<strong>$1</strong>').replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g,'<span style="white-space:nowrap"><sup>$1</sup>&frasl;<sub>$2</sub></span>').replace(/\^\{([^{}]+)\}/g,'<sup>$1</sup>').replace(/_\{([^{}]+)\}/g,'<sub>$1</sub>').replace(/\^([a-zA-Z0-9])/g,'<sup>$1</sup>').replace(/_([a-zA-Z0-9])/g,'<sub>$1</sub>');const symbols={cdots:'⋯',dots:'…',dagger:'†',sim:'∼',leq:'≤',le:'≤',geq:'≥',neq:'≠',times:'×',to:'→',leftarrow:'←',pm:'±',land:'∧',oplus:'⊕',lceil:'⌈',rceil:'⌉',sum:'∑',infty:'∞',max:'max',min:'min',left:'',right:'',quad:'  '};rendered=rendered.replace(/\\([a-zA-Z]+)\b/g,(_,command)=>symbols[command]??command).replace(/[{}]/g,'');return rendered;}
function inlineMarkdown(text){return escape(text).replace(/\$([^$\n]+)\$/g,(_,formula)=>{const color=formula.match(/^\s*\{?\s*\\color\{(green|red|purple|orange|blue)\}\s*([\s\S]*?)\s*\}?\s*$/i);if(color){const palette={green:'#4ade80',red:'#f87171',purple:'#c084fc',orange:'#fb923c',blue:'#60a5fa'};return `<span style="color:${palette[color[1].toLowerCase()]}">${renderTexFragment(color[2])}</span>`;}return `<span class="inline-math">${renderTexFragment(formula)}</span>`;}).replace(/&lt;span\s+style\s*=\s*(?:&quot;\s*color\s*:\s*#039ced\s*;?\s*&quot;|&#39;\s*color\s*:\s*#039ced\s*;?\s*&#39;)\s*&gt;([\s\S]*?)&lt;\/span\s*&gt;/gi,'<span style="color:#039CED">$1</span>').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/__([^_]+)__/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/_([^_]+)_/g,'<em>$1</em>');}
function markdownToHtml(source){const lines=String(source).replace(/\r\n?/g,'\n').split('\n');let html='',inCode=false,list='',paragraph=[];const closeParagraph=()=>{if(paragraph.length){html+=`<p>${paragraph.join('<br>')}</p>`;paragraph=[];}};const closeList=()=>{if(list){html+=`</${list}>`;list='';}};const cells=line=>line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim());const divider=line=>/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);for(let index=0;index<lines.length;index++){const raw=lines[index],line=raw.trimEnd();if(/^```/.test(line)){closeParagraph();closeList();if(inCode){html+='</code></pre>';inCode=false;}else{html+='<pre><code>';inCode=true;}continue;}if(inCode){html+=escape(raw)+'\n';continue;}if(line.includes('|')&&index+1<lines.length&&divider(lines[index+1])){closeParagraph();closeList();const header=cells(line);html+='<table><thead><tr>'+header.map(cell=>`<th>${inlineMarkdown(cell)}</th>`).join('')+'</tr></thead><tbody>';index+=2;while(index<lines.length&&lines[index].trim()&&lines[index].includes('|')&&!divider(lines[index])){html+='<tr>'+cells(lines[index]).map(cell=>`<td>${inlineMarkdown(cell)}</td>`).join('')+'</tr>';index++;}html+='</tbody></table>';index--;continue;}if(!line.trim()){closeParagraph();closeList();continue;}if(/^([-*_])\1\1+\s*$/.test(line)){closeParagraph();closeList();html+='<hr>';continue;}const heading=line.match(/^(#{1,6})\s+(.+)$/);if(heading){closeParagraph();closeList();const level=Math.min(3,heading[1].length+1);html+=`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;continue;}const item=line.match(/^[-*+]\s+(.+)$/),ordered=line.match(/^\d+[.)]\s+(.+)$/);if(item||ordered){closeParagraph();const type=item?'ul':'ol';if(list&&list!==type){closeList();}if(!list){html+=`<${type}>`;list=type;}html+=`<li>${inlineMarkdown((item||ordered)[1])}</li>`;continue;}if(/^>\s?/.test(line)){closeParagraph();closeList();html+=`<blockquote><p>${inlineMarkdown(line.replace(/^>\s?/,''))}</p></blockquote>`;continue;}closeList();paragraph.push(inlineMarkdown(line));}closeParagraph();closeList();if(inCode)html+='</code></pre>';return html;}
function sampleBlock(kind,value){const rows=String(value||'').split('\n');return `<div class="sample-block"><div class="sample-toolbar"><span>[ ${kind} ]</span><div><button type="button">复制内容</button><button type="button">格式</button><button type="button">全屏</button></div></div><div class="sample-rows">${rows.map((row,index)=>`<div><span>${index+1}</span><code>${escape(row)||' '}</code></div>`).join('')}</div></div>`;}
function resourceLimits(){return `<section class="problem-limits" aria-label="资源限制"><div><span>代码长度限制</span><b>16 KB</b></div><div><span>时间限制</span><b>250 ms</b></div><div><span>内存限制</span><b>64 MB</b></div><div><span>栈限制</span><b>8192 KB</b></div></section>`;}
function enhanceStatementSamples(text,q){let html=markdownToHtml(text);const replaceSample=(label,kind,value)=>{if(!value)return;const heading=`(<h[2-4]>${label}[：:]?</h[2-4]>)`,block='<pre><code>[\\s\\S]*?</code></pre>';html=html.replace(new RegExp(`${heading}\\s*${block}`),`$1${sampleBlock(kind,value)}`);};replaceSample('样例输入','in',q.sampleInput||markdownSample(text,'样例输入'));replaceSample('样例输出','out',q.sampleOutput||markdownSample(text,'样例输出'));return html;}
function cleanStatementDecoration(text){return String(text||'').replace(/^[ \t]*\[【原题配图 photo1\.png：HTML 未附图像文件，点此查看原题】\]\([^)]+\)[ \t]*(?:\r?\n|$)/gmi,'FZUTRIANGLEFIGUREMARKER\n').replace(/^[ \t]*(?:\*\*原题\*\*|原题)\s*[:：]\s*\[FZU Online Judge\]\([^)]+\)(?=[^\r\n]*(?:时间|time))(?=[^\r\n]*(?:内存|memory))[^\r\n]*(?:\r?\n|$)/gmi,'').replace(/^[ \t]*\[?【原题配图[^\r\n]*HTML 未附图像文件[^\r\n]*】\]?(?:\([^)]+\))?[ \t]*(?:\r?\n|$)/gmi,'').replace(/\n{3,}/g,'\n\n').trim();}
function formatStatement(text,q){const limits=resourceLimits();if(!text)return `<div class="rendered-markdown problem-copy"><p>请根据题目要求完成程序。提交后，AI 助教将检查程序逻辑、边界条件和代码风格。</p><h3>输入格式：</h3><p>输入数据由题目给定。</p><h3>输出格式：</h3><p>按题目要求输出计算结果。</p><h3>输入样例：</h3>${sampleBlock('in',q.sampleInput||'100311')}<h3>输出样例：</h3>${sampleBlock('out',q.sampleOutput||'0:2\n1:3\n3:1')}${limits}</div>`;const statementHtml=enhanceStatementSamples(cleanStatementDecoration(text),q).replaceAll('FZUTRIANGLEFIGUREMARKER','<img src="./fzu-triangle-lattice.svg" alt="n = 4 时的三角形网格示意图" style="display:block;max-width:100%;height:auto;margin:12px auto">');return `<div class="rendered-markdown problem-copy">${statementHtml}${limits}</div>`;}
function statusGlyph(status,label){if(status==='accepted')return '<svg viewBox="0 0 24 24" aria-label="答案正确"><path d="m5.5 12.5 4.1 4.1L18.5 7.5"/></svg>';if(status==='wrong')return '<svg viewBox="0 0 24 24" aria-label="答案错误"><path d="m8 8 8 8M16 8l-8 8"/></svg>';return label;}
function updateCountdown(){const start=Date.parse(config.startAt),end=Date.parse(config.endAt),now=Date.now(),remain=$('.remain'),archived=config.category==='past',beforeStart=!archived&&now<start,displayEnded=archived||now>=end,judgeable=config.questions[current]?.judgeable!==false;let milliseconds=archived?0:Math.max(0,beforeStart?start-now:end-now);examExpired=!archived&&now>=end;const seconds=Math.floor(milliseconds/1000),hours=String(Math.floor(seconds/3600)).padStart(2,'0'),minutes=String(Math.floor(seconds%3600/60)).padStart(2,'0'),secs=String(seconds%60).padStart(2,'0');$('#countdown-label').textContent=beforeStart?'距开始':displayEnded?'已结束':'剩余';$('#countdown').textContent=`${hours}:${minutes}:${secs}`;remain.classList.toggle('warning',!displayEnded&&milliseconds<=5*60*1000);remain.classList.toggle('expired',displayEnded);$('#submit').disabled=examExpired||!judgeable;$('#run-test').disabled=examExpired||!judgeable;if(!judgeable)$('#submit-state').textContent=config.questions[current]?.unjudgeableReason||'题面资料不完整，暂不支持评测';else if(examExpired)$('#submit-state').textContent='考试已结束';}
function editorCode(){return window.omsCodeEditor?.getValue?.()??code.value;}function saveDraftCode(questionId,source){if(!questionId)return false;draftCodes[questionId]=source;try{localStorage.setItem(DRAFT_CODE_STORAGE,JSON.stringify(draftCodes));return true;}catch{return false;}}function persistActiveDraft(){if(loadingCode)return false;return saveDraftCode(activeQuestionId,editorCode());}function saveSubmittedCode(questionId,source){if(!questionId)return;submittedCodes[questionId]=source;try{localStorage.setItem(SUBMITTED_CODE_STORAGE,JSON.stringify(submittedCodes));}catch{}saveDraftCode(questionId,source);}function hasUnsavedCode(){return editorCode()!==loadedCode;}function loadCode(source){loadingCode=true;try{code.value=source;code.dispatchEvent(new Event('input',{bubbles:true}));}finally{loadingCode=false;}lines();}function restoreSavedCode(){const source=codeForQuestion(activeQuestionId);loadedCode=submittedCodeForQuestion(activeQuestionId);loadCode(source);}function changeQuestion(index){if(index===current)return;persistActiveDraft();current=index;activeQuestionId=config.questions[current].id;render();restoreSavedCode();}
function activateExam(examVersion,questionIndex=0){
  const archive=window.OMS_EXAM_ARCHIVE||[];
  const exam=examVersion===primaryExamVersion?primaryConfig:archive.find(item=>item.examVersion===examVersion);
  if(!exam)return false;
  const target=Math.max(0,Math.min(Number(questionIndex)||0,exam.questions.length-1));
  if(config.examVersion===exam.examVersion){changeQuestion(target);return current===target;}
  const identity={seat:primaryConfig.seat,candidateName:primaryConfig.candidateName,studentId:primaryConfig.studentId};
  persistActiveDraft();config={...exam,...identity,registered:exam.registered??exam.participants??primaryConfig.registered};current=target;loadCodeStores(config.examVersion);activeQuestionId=config.questions[current].id;for(const key of Object.keys(results))delete results[key];render();restoreSavedCode();updateCountdown();return true;
}
function render(){const q=config.questions[current],sample=q.testCases?.[0]||{input:q.sampleInput||'',expected:q.sampleOutput||''};$('#exam-name').textContent=config.title;$('#seat').textContent=config.seat;$('#candidate').textContent=config.candidateName;$('#student-id').textContent=config.studentId;$('#bar-title').textContent=`${q.id} ${q.name}`;$('#problem-title').textContent=`${q.id} ${q.name}`;$('#score').textContent=`分数 ${q.score}`;$('#problem-text').innerHTML=formatStatement(q.statement,q);$('#sample-input').value=sample.input||'';$('#expected').textContent=sample.expected||'';const complete=Object.keys(results).length;$('#answer-count').textContent=`${complete} / ${config.questions.length}`;$('#question-grid').innerHTML=config.questions.map((item,index)=>`<button class="${results[index]||''} ${index===current?'current':''}" data-i="${index}" title="${escape(item.id)} ${escape(item.name)}">${statusGlyph(results[index],escape(item.id))}</button>`).join('');document.querySelectorAll('#question-grid button').forEach(button=>button.onclick=()=>changeQuestion(Number(button.dataset.i)));updateCountdown();}
  function renderPortalSubmissions(filters={},page=0){
   const pageSize=20,query=value=>String(value||'').trim().toLowerCase();
   const filtered=submissions.filter(item=>{
     const question=config.questions.find(candidate=>candidate.id===item.problemId),index=question?config.questions.indexOf(question):-1;
     const problem=`${item.problemId} ${index>=0?index+1:''} ${question?.name||''}`.toLowerCase();
     const submitter=`${item.candidateId||config.studentId||''} ${item.candidate||config.candidateName||''}`.toLowerCase();
     const contest=`${item.contestId||config.examVersion||''} ${item.contestTitle||config.title||''}`.toLowerCase();
     return (!query(filters.user)||submitter.includes(query(filters.user)))&&(!query(filters.problem)||problem.includes(query(filters.problem)))&&(!query(filters.contest)||contest.includes(query(filters.contest)))&&(!filters.status||item.verdict===filters.status)&&(!filters.language||item.language===filters.language);
   });
   const pageCount=Math.max(1,Math.ceil(filtered.length/pageSize)),safePage=Math.min(Math.max(0,page),pageCount-1),items=filtered.slice(safePage*pageSize,(safePage+1)*pageSize);
   const rows=items.map(item=>{
     const index=config.questions.findIndex(question=>question.id===item.problemId),question=index>=0?config.questions[index]:null;
     const accepted=item.verdict==='答案正确'||item.verdict==='Accepted';
     const submitted=item.createdAt?formatExamTime(item.createdAt):item.time||'—';
     return `<tr><td><span class="evaluation-verdict ${accepted?'accepted':'failed'}">${accepted?'✓':'×'} ${escape(item.verdict||'未知')}</span></td><td><b>${escape(item.problemId)}</b><span>${escape(question?.name||'题目记录')}</span></td><td>${escape(item.candidateId||config.studentId||'—')}<small>${escape(item.candidate||config.candidateName||'—')}</small></td><td>—</td><td>—</td><td>${escape(item.language||'—')}</td><td>${escape(submitted)}</td></tr>`;
   }).join('');
   const languages=['C (gcc)','C (clang)','C++ (g++)','C++ (clang++)','Java','Python 3','Python 2','PyPy'];
   const option=(value,label,selected)=>`<option value="${escape(value)}" ${selected?'selected':''}>${escape(label)}</option>`;
   return `<section class="evaluation-page"><header class="evaluation-heading"><div><h1>评测记录</h1></div><span>当前 ${filtered.length} 条</span></header><form class="evaluation-filters" data-evaluation-form><header><span class="evaluation-search-icon">⌕</span><b>查询评测记录</b></header><div class="evaluation-filter-grid"><label>用户名或 UID<input name="user" value="${escape(filters.user||'')}" placeholder="输入用户名或 UID"></label><label>题目<input name="problem" value="${escape(filters.problem||'')}" placeholder="题号或题目名称"></label><label>比赛 ID<input name="contest" value="${escape(filters.contest||'')}" placeholder="输入比赛 ID"></label><label>状态<select name="status">${option('','全部',!filters.status)}${option('答案正确','Accepted',filters.status==='答案正确')}${option('答案错误','Wrong Answer',filters.status==='答案错误')}${option('运行失败','Runtime Error',filters.status==='运行失败')}</select></label><label>代码语言<select name="language">${option('','全部',!filters.language)}${languages.map(language=>option(language,language,filters.language===language)).join('')}</select></label><div class="evaluation-filter-actions"><button type="button" data-evaluation-reset>重置</button><button type="submit">搜索</button></div></div></form><div class="evaluation-table-wrap"><table class="evaluation-table"><thead><tr><th>状态</th><th>题目</th><th>提交者</th><th>时间</th><th>内存</th><th>语言</th><th>Submit Time</th></tr></thead><tbody>${rows||`<tr><td colspan="7" class="evaluation-empty">${filtered.length?'没有符合条件的评测记录':'暂无提交记录'}</td></tr>`}</tbody></table></div><nav class="evaluation-pagination" aria-label="评测记录分页"><span>第 ${safePage+1} / ${pageCount} 页</span><div><button type="button" data-evaluation-page="${safePage-1}" ${safePage===0?'disabled':''}>‹ 上一页</button><button type="button" data-evaluation-page="${safePage+1}" ${safePage>=pageCount-1?'disabled':''}>下一页 ›</button></div></nav></section>`;
 }
function renderSubmissions(){return submissions.length?submissions.map(item=>{const index=config.questions.findIndex(question=>question.id===item.problemId);const number=index>=0?config.questions[index].id:item.problemId;return `<div class="row"><span>${escape(number)}</span><span>${escape(item.language)}</span><span>${escape(item.verdict)}</span><span>${escape(item.time)}</span></div>`;}).join(''):'<div class="row"><span>暂无提交记录</span><span>—</span><span>—</span><span>—</span></div>';}
function formatExamTime(value){const date=new Date(value);if(!Number.isFinite(date.getTime()))return '未设置';return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;}
function formatDuration(value){const minutes=Number(value)||0;if(minutes<=0)return '未记录';return minutes%60===0?`${minutes/60} 小时`:`${minutes} 分钟`;}
function contestStatus(){const now=Date.now(),start=Date.parse(config.startAt),end=Date.parse(config.endAt);if(config.category==='past')return '已结束';if(Number.isFinite(start)&&now<start)return '未开始';if(Number.isFinite(end)&&now>end)return '已结束';return '进行中';}
function lastSubmissionFor(question){return submissions.find(item=>item.problemId===question.id);}
function renderContestQuestionTable(){const rows=config.questions.map((question,index)=>{const last=lastSubmissionFor(question),status=question.judgeable===false?'暂不可评测':results[index]==='accepted'?'答案正确':results[index]==='wrong'?'答案错误':'未提交',tone=results[index]||'pending';return `<button type="button" class="contest-question-row" data-question-open="${index}"><span class="${tone}">${status}</span><span>${last?escape(last.time):'—'}</span><strong><i>${escape(question.id)}</i>${escape(question.name)}</strong><em>${Number(question.score)||0} 分</em></button>`;}).join('');return `<section class="contest-question-table"><header><h2>题目列表</h2></header><div class="contest-question-columns"><span>状态</span><span>上次递交</span><span>题目</span><span>分值</span></div>${rows}</section>`;}
function scoreForQuestion(question,index){return results[index]==='accepted'?Number(question.score)||0:0;}
function renderExamInfo(){
  const total=config.questions.reduce((sum,question)=>sum+(Number(question.score)||0),0);
  const title=String(config.title||'').replace(/^已结束\s*/, '');
  const setterLabel=config.setter?.label?escape(config.setter.label):'';
  const metadataIdentity=setterLabel||escape(config.candidateName);
  const participantCount=examParticipantCount(config);
  const contestType=escape(config.contestType||'程序设计');
  return `<section class="contest-overview"><div class="contest-heading"><span class="contest-status">${contestStatus()}</span><div><h1>${escape(title)}</h1><p><span>${contestType}</span><span>${formatExamTime(config.startAt)}</span><span>${formatDuration(config.duration)}</span><span>${participantCount} 人</span><span>${metadataIdentity}</span></p></div></div><div class="contest-home-layout"><main class="contest-home-main"><section class="contest-intro"><h2>比赛介绍</h2><p>Have fun.</p></section>${renderContestQuestionTable()}</main><aside class="contest-facts"><h2>比赛信息</h2><dl><div><dt>状态</dt><dd>${contestStatus()}</dd></div><div><dt>规则</dt><dd>${escape(config.contestType||'OI')}</dd></div><div><dt>题数</dt><dd>${config.questions.length}</dd></div><div><dt>开始</dt><dd>${formatExamTime(config.startAt)}</dd></div><div><dt>结束</dt><dd>${formatExamTime(config.endAt)}</dd></div><div><dt>限时</dt><dd>${formatDuration(config.duration)}</dd></div><div><dt>人数</dt><dd>${participantCount}</dd></div><div><dt>考生</dt><dd>${escape(config.candidateName)}</dd></div>${setterLabel?`<div><dt>命题人</dt><dd>${setterLabel}</dd></div>`:''}<div><dt>总分</dt><dd>${total} 分</dd></div></dl></aside></div></section>`;
}
function portalExamStatus(exam){const now=Date.now(),start=Date.parse(exam.startAt),end=Date.parse(exam.endAt);if(exam.category==='past'||(Number.isFinite(end)&&now>=end))return '已结束';if(Number.isFinite(start)&&now<start)return '未开始';return '进行中';}
function portalDuration(value){const minutes=Number(value)||0;if(!minutes)return '未记录';if(minutes%60===0)return `${minutes/60} 小时`;return `${minutes} 分钟`;}
function examParticipantCount(exam){const value=Number(exam.registered??exam.participants);return Number.isFinite(value)&&value>=0?value:1;}
const PORTAL_ICONS={home:'<path d="M3.5 11.2 12 4l8.5 7.2"/><path d="M5.5 9.8V20h13V9.8M9.5 20v-6h5v6"/>',problems:'<rect x="5" y="3.5" width="14" height="17" rx="1.8"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4.5"/>',training:'<path d="M5 4.5h14v15H5zM8 8h8M8 12h8M8 16h5"/>',contest:'<path d="M8 4h8v3.5a4 4 0 0 1-8 0zM12 11.5V16M8.5 20h7M9 16h6"/><path d="M8 6H4.5v1.5A3.5 3.5 0 0 0 8 11M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11"/>',assignment:'<path d="M8 5h11v16H5V8z"/><path d="M8 5v3H5M9 12h6M9 16h6"/>',judge:'<path d="M8.5 6.5H20M8.5 12H20M8.5 17.5H20"/><path d="m3.5 6.5 1.3 1.3 2.3-2.6M3.5 12l1.3 1.3 2.3-2.6M3.5 17.5l1.3 1.3 2.3-2.6"/>',advice:'<path d="M9 18h6M10 21h4M8.5 14.5A6 6 0 1 1 15.5 14.5C14.5 15.3 14 16.1 14 18h-4c0-1.9-.5-2.7-1.5-3.5Z"/>',theme:'<path d="M20 15.2A8.4 8.4 0 0 1 8.8 4a8.4 8.4 0 1 0 11.2 11.2Z"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 10.5V17M12 7.2h.01"/>',panel:'<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8.5 3.5v17M11.5 8h5M11.5 12h5M11.5 16h3"/>',calendar:'<rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M7.5 3v5M16.5 3v5M3.5 10h17"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',users:'<path d="M8.5 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6 6 0 0 1 12 0M16 12a3 3 0 1 0 0-6M16 14a5.5 5.5 0 0 1 5.5 5.5"/>',award:'<circle cx="12" cy="9" r="5"/><path d="m9 13-1 8 4-2 4 2-1-8"/>',arrow:'<path d="m9 5 7 7-7 7"/>',chevron:'<path d="m7 14 5-5 5 5"/>'};
function portalIcon(name){return `<svg class="portal-icon" viewBox="0 0 24 24" aria-hidden="true">${PORTAL_ICONS[name]||''}</svg>`;}
function renderPortalHome(){
  const archive=window.OMS_EXAM_ARCHIVE||[],exams=[primaryConfig,...archive].filter((exam,index,list)=>list.findIndex(item=>item.examVersion===exam.examVersion)===index).sort((a,b)=>Date.parse(b.startAt||b.date||0)-Date.parse(a.startAt||a.date||0));
  const contests=exams.slice(0,5).map(exam=>{const status=portalExamStatus(exam);return `<button type="button" class="portal-contest" data-portal-exam="${escape(exam.examVersion)}"><span class="portal-status ${status==='进行中'?'running':status==='未开始'?'pending':'ended'}">${status}</span><span class="portal-contest-copy"><b>${escape(exam.title)}</b><small><span>${portalIcon('award')}OI</span><span>${portalIcon('calendar')}${formatExamTime(exam.startAt||exam.date)}</span><span>${portalIcon('clock')}${portalDuration(exam.duration)}</span><span>${portalIcon('users')}${examParticipantCount(exam)}</span></small></span><span class="portal-arrow">${portalIcon('arrow')}</span></button>`;}).join('');
  const latest=(primaryConfig.questions||[]).slice(0,8).map((question,index)=>`<button type="button" data-portal-question="${index}"><i>${String(index+1).padStart(2,'0')}</i><span>${escape(question.id||String(index+1).padStart(4,'0'))}</span><b>${escape(question.name)}</b><em>${portalIcon('arrow')}</em></button>`).join('');
  const initial=escape(String(config.candidateName||'U').trim().slice(0,1).toUpperCase()||'U');
  const navItems=[['home','首页','home'],['problems','题目','problemset'],['contest','比赛','home-contests'],['judge','评测','home-submissions']].map(([icon,label,route],index)=>`<button type="button" class="${index===0?'active':''}" data-portal-route="${route}"><span class="portal-nav-icon">${portalIcon(icon)}</span><b>${label}</b></button>`).join('');
  return `<div class="portal-shell"><aside class="portal-sidebar"><div class="portal-brand"><span class="portal-seal">福</span><span class="portal-brand-copy"><b>福州大学</b><small>FUZHOU UNIVERSITY</small></span><i>${portalIcon('chevron')}</i></div><nav class="portal-nav" aria-label="主页面导航">${navItems}</nav><div class="portal-sidebar-bottom"><button type="button" data-portal-theme><span class="portal-nav-icon">${portalIcon('theme')}</span><b>主题切换</b></button><div class="portal-service"><span class="portal-service-dot"></span><p><b>服务状态</b><small>运行正常</small></p></div><button type="button" data-portal-route="info"><span class="portal-nav-icon">${portalIcon('info')}</span><b>关于</b></button><div class="portal-user"><span>${initial}</span><p><b>${escape(config.studentId||config.candidateName)}</b><small>${escape(config.candidateName)}</small></p><i>${portalIcon('chevron')}</i></div></div></aside><main class="portal-main"><header class="portal-topbar"><span>${portalIcon('panel')}</span><div><b>福州大学</b><small>FZU Online Judge</small></div></header><div class="portal-content"><div class="portal-primary"><section class="portal-welcome"><small>ONLINE JUDGE</small><h1>欢迎来到 FZU Online Judge</h1><p>从左侧导航进入题目、训练与比赛，开始你的程序设计练习。</p></section><section class="portal-section"><header><div><small>CONTESTS</small><h2>近期比赛</h2></div><button type="button" data-portal-route="home-contests">查看全部 ${portalIcon('arrow')}</button></header><div class="portal-contest-list">${contests||'<p class="portal-empty">暂无比赛</p>'}</div></section><section class="portal-section portal-practice"><header><div><small>PRACTICE</small><h2>近期训练</h2></div><button type="button" data-portal-route="exam">进入题目 ${portalIcon('arrow')}</button></header><button type="button" data-portal-exam="${escape(primaryConfig.examVersion)}"><span class="portal-status running">练习</span><b>${escape(primaryConfig.title)}</b><small>${primaryConfig.questions.length} 道题</small><em>${portalIcon('arrow')}</em></button></section></div><aside class="portal-right"><section class="portal-side-card"><header><small>PROBLEMS</small><h2>最新题目</h2></header><div class="portal-problem-list">${latest||'<p class="portal-empty">暂无题目</p>'}</div></section><section class="portal-side-card"><header><small>RECOMMENDED</small><h2>推荐</h2></header><p class="portal-empty">目前没有推荐内容。</p></section></aside></div></main></div>`;
}
function renderFzuOjHome(activePage='home'){
  const archive=window.OMS_EXAM_ARCHIVE||[];
  const exams=[primaryConfig,...archive]
    .filter((exam,index,list)=>list.findIndex(item=>item.examVersion===exam.examVersion)===index)
    .sort((a,b)=>Date.parse(b.startAt||b.date||0)-Date.parse(a.startAt||a.date||0));
  const activeNavRoute=activePage==='problemset'?'problems':activePage==='home-contests'?'contest':activePage==='home-submissions'?'judge':activePage==='advice'?'advice':'home';
  const navItems=[['home','首页','home'],['problems','题目','problemset'],['contest','考试','home-contests'],['judge','评测','home-submissions'],['advice','备考','advice']]
    .map(([icon,label,route])=>`<button type="button" class="fzuoj-nav-item ${route===activeNavRoute?'active':''}" data-portal-route="${route}"><span>${portalIcon(icon)}</span><b>${label}</b></button>`).join('');
  const contestTime=exam=>formatExamTime(exam.startAt||exam.date);
  const contests=exams.slice(0,5).map(exam=>{
    const status=portalExamStatus(exam);
    const tone=status==='进行中'?'running':status==='未开始'?'pending':'ended';
    return `<button type="button" class="fzuoj-list-row" data-portal-exam="${escape(exam.examVersion)}"><span class="fzuoj-status ${tone}">${status}</span><span class="fzuoj-list-main"><b>${escape(exam.title)}</b><small><span>${portalIcon('award')}OI</span><span>${portalIcon('calendar')}${contestTime(exam)}</span><span>${portalIcon('clock')}${portalDuration(exam.duration)}</span><span>${portalIcon('users')}${examParticipantCount(exam)}</span></small></span><i>${portalIcon('arrow')}</i></button>`;
  }).join('');
  const latest=(primaryConfig.questions||[]).slice(0,10).map((question,index)=>`<button type="button" class="fzuoj-problem-row" data-portal-question="${index}"><i>—</i><span>${escape(question.id||String(index+1).padStart(4,'0'))}</span><b>${escape(question.name)}</b></button>`).join('');
  const initial=escape(String(config.candidateName||'U').trim().slice(0,1).toUpperCase()||'U');
  const trainingStatus=portalExamStatus(primaryConfig);
  const trainingTone=trainingStatus==='进行中'?'running':trainingStatus==='未开始'?'pending':'ended';
  return `<div class="fzuoj-shell">
    <aside class="fzuoj-sidebar">
      <header class="fzuoj-domain"><span class="fzuoj-seal"><img src="/fzu-logo.png?v=20261007" alt="福州大学校徽" onerror="this.onerror=null;this.src='https://www.fzu.edu.cn/__local/B/00/85/7E40A9947CCADB9BCCF7F6A8AA0_9BDD11BE_23796.png';"></span><b>福州大学</b><button type="button" data-fzuoj-sidebar-toggle aria-label="折叠侧栏">${portalIcon('chevron')}</button></header>
      <nav class="fzuoj-nav" aria-label="主页面导航">${navItems}</nav>
      <footer class="fzuoj-sidebar-footer">
        <button type="button" class="fzuoj-nav-item" data-portal-theme><span>${portalIcon('theme')}</span><b>主题切换</b></button>
        <div class="fzuoj-service"><span></span><b>服务状态</b></div>
        <button type="button" class="fzuoj-nav-item ${activePage==='about'?'active':''}" data-portal-route="about"><span>${portalIcon('info')}</span><b>关于</b></button>
        <button type="button" class="fzuoj-account" data-profile-open aria-label="打开个人中心"><span>${initial}</span><p><b>${escape(config.studentId||config.candidateName)}</b><small>${escape(config.candidateName)}</small></p><i>${portalIcon('chevron')}</i></button>
      </footer>
    </aside>
    <div class="fzuoj-page">
      <header class="fzuoj-topbar"><button type="button" data-fzuoj-sidebar-toggle aria-label="收起侧栏">${portalIcon('panel')}</button>${portalAuthenticated?'<button type="button" data-portal-logout aria-label="退出登录" style="width:auto;margin-left:auto;padding:0 12px;font-size:14px">退出登录</button>':''}</header>
      <main class="fzuoj-content">
        <div class="fzuoj-primary">
          <section class="fzuoj-card fzuoj-bulletin"><h1>欢迎来到 FZU PTA Online Judge！</h1><p>请点击左侧的导航栏寻找你需要的功能。<br>拼搏百天，我要上福州大学！</p></section>
          <section class="fzuoj-card"><header><h2>近期比赛</h2><button type="button" data-portal-route="home-contests">查看全部 ${portalIcon('arrow')}</button></header><div class="fzuoj-list">${contests||'<p class="fzuoj-empty">暂无比赛</p>'}</div></section>
        </div>
        <aside class="fzuoj-aside">
          <section class="fzuoj-card"><header><h2>最新题目</h2></header><div class="fzuoj-problems">${latest||'<p class="fzuoj-empty">暂无题目</p>'}</div></section>
          <section class="fzuoj-card"><header><h2>推荐</h2></header><p class="fzuoj-empty">目前没有推荐内容。</p></section>
        </aside>
      </main>
    </div>
  </div>`;
}
function renderPtaHome(){
  const archive=window.OMS_EXAM_ARCHIVE||[];
  const exams=[primaryConfig,...archive]
    .filter((exam,index,list)=>list.findIndex(item=>item.examVersion===exam.examVersion)===index)
    .sort((a,b)=>Date.parse(b.startAt||b.date||0)-Date.parse(a.startAt||a.date||0));
  const totalQuestions=exams.reduce((sum,exam)=>sum+(exam.questions?.length||0),0);
  const accepted=Object.values(results).filter(result=>result==='accepted').length;
  const navItems=[['home','首页','home'],['problems','题目集','center'],['judge','答案板','submissions'],['training','课程班级','advice']]
    .map(([icon,label,route],index)=>`<button type="button" class="pta-home-nav-item ${index===0?'active':''}" data-portal-route="${route}"><span>${portalIcon(icon)}</span><b>${label}</b></button>`).join('');
  const cards=exams.map((exam,index)=>{
    const status=portalExamStatus(exam);
    const year=String(exam.title||exam.date||'').match(/20\d{2}/)?.[0]||'FZU';
    const questionCount=exam.questions?.length||0;
    const totalScore=(exam.questions||[]).reduce((sum,question)=>sum+(Number(question.score)||0),0);
    return `<article class="pta-home-resource-card"><div class="pta-home-cover"><span>PROGRAMMING</span><b>${year}</b><strong>${portalIcon('problems')} PTA</strong><small>程序设计考试与练习</small></div><div class="pta-home-card-body"><h3>${escape(exam.title)}</h3><div class="pta-home-tags"><span>编程题 × ${questionCount}</span><span>总分 × ${totalScore}</span><span>${portalDuration(exam.duration)}</span></div><button type="button" class="${index===0?'primary':''}" data-portal-exam="${escape(exam.examVersion)}">${status==='进行中'?'继续作答':'进入试卷'}</button></div></article>`;
  }).join('');
  const initial=escape(String(config.candidateName||'U').trim().slice(0,1).toUpperCase()||'U');
  return `<div class="pta-home-shell">
    <header class="pta-home-topbar">
      <div class="pta-home-brand"><span>${portalIcon('problems')}</span><b>PTA</b><i></i><p>程序设计类实验辅助教学平台<small>PROGRAMMING TEACHING ASSISTANT</small></p></div>
      <nav class="pta-home-topnav"><button type="button" class="active" data-portal-route="center">考试练习</button><button type="button" data-portal-route="advice">教育超市</button></nav>
      <div class="pta-home-account"><button type="button" aria-label="通知"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg></button><span>${initial}</span><b>${escape(config.candidateName)}</b></div>
    </header>
    <div class="pta-home-layout">
      <aside class="pta-home-sidebar"><nav>${navItems}</nav></aside>
      <main class="pta-home-main"><section class="pta-home-resources"><header><h1>考试与练习</h1><span>PROGRAMMING PRACTICE</span></header><div class="pta-home-card-grid">${cards||'<p class="pta-home-empty">暂无可用试卷</p>'}</div></section></main>
      <aside class="pta-home-right">
        <section class="pta-home-stats"><header>程序设计训练</header><dl><div><dt>试卷</dt><dd>${exams.length}</dd></div><div><dt>题目</dt><dd>${totalQuestions}</dd></div><div><dt>提交</dt><dd>${submissions.length}</dd></div><div><dt>通过</dt><dd>${accepted}</dd></div></dl></section>
        <section class="pta-home-shortcuts"><button type="button" data-portal-route="center"><span>${portalIcon('contest')}</span><b>考试中心</b></button><button type="button" data-portal-route="advice"><span>${portalIcon('training')}</span><b>备考建议</b></button><button type="button" data-portal-route="submissions"><span>${portalIcon('judge')}</span><b>提交列表</b></button><button type="button" data-portal-route="realtime"><span>${portalIcon('award')}</span><b>成绩排名</b></button></section>
        <section class="pta-home-promo"><span>${portalIcon('problems')}</span><b>PTA</b><strong>让程序设计学习更高效</strong><small>练习 · 考试 · 评测 · 复盘</small><button type="button" data-portal-route="exam">开始练习</button></section>
        <footer class="pta-home-footer"><b>${portalIcon('problems')} PTA</b><p><button type="button" data-portal-route="home">首页</button><button type="button" data-portal-route="info">关于我们</button><button type="button" data-portal-route="advice">备考建议</button></p><small>FZU Programming Teaching Assistant</small></footer>
      </aside>
    </div>
  </div>`;
}
function renderScoreboard(){
  const imported=config.scoreboard;
  if(Array.isArray(imported?.rows)&&imported.rows.length){
    const ioi=imported.rule==='IOI';
    const heads=(imported.problems||[]).map(problem=>`<th><b>${escape(problem.letter)}</b><span>${Number(problem.accepted)||0} / ${Number(problem.submissions)||0}</span></th>`).join('');
    const rows=imported.rows.map(row=>{
      const problems=(row.problems||[]).map(value=>{const text=String(value??'').trim();if(ioi){const points=Number(text.match(/^\s*(\d+)/)?.[1]),hasScore=Number.isFinite(points)&&text!=='-',tone=!hasScore?'':points>=100?'#20bf55':points>0?(points>=50?'#f2b51b':'#ff7048'):'#ff3545',visible=text||'—';return `<td class="score-problem"><b${tone?` style="color:${tone}"`:''}>${escape(visible)}</b><span>&nbsp;</span></td>`;}const accepted=text.match(/^(?:\+(\d+)\s+)?(\d+:\d{2})$/),wrong=text.match(/^-(\d+)$/),top=accepted?(accepted[1]?`+${accepted[1]}`:'✓'):wrong?`-${wrong[1]}`:text,time=accepted?.[2]||'';return `<td class="score-problem ${accepted?'accepted':text?'attempted':''}"><b>${top?escape(top):'&nbsp;'}</b><span>${time?escape(time):'&nbsp;'}</span></td>`;}).join('');
      const displayUserId=String(row.userId||'').replace(/^B\s*/, '');
      const userUrl=/^https:\/\/oj\.fzu\.edu\.cn\/user\/\d+$/.test(String(row.userUrl||''))?`<a href="${escape(row.userUrl)}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">${escape(displayUserId)}</a>`:escape(displayUserId);
      const avatarPath=String(row.avatarUrl||'');
      const avatar=/^\.\/比赛成绩表 - FZU Online Judge_files\/[^?#]+$/.test(avatarPath)?`<img src="${escape(avatarPath)}" alt="" loading="lazy" style="display:block;width:38px;height:38px;object-fit:cover;border-radius:50%" onerror="this.onerror=null;this.parentElement.textContent='B'">`:'B';
      const totalValue=ioi?Number(row.totalScore)||0:Number(row.solved)||0;
      const totalDetail=ioi?'':escape(row.penalty||'0:00');
      return `<tr><td>${escape(row.rank)}</td><td class="score-user"><span>${avatar}</span><b>${userUrl}</b><small>${escape(row.userName)}</small></td><td class="score-total"><b>${totalValue}</b><span>${totalDetail}</span></td>${problems}</tr>`;
    }).join('');
    const totalHead=ioi?'<th><b>总分数</b><span>&nbsp;</span></th>':'<th><b>Solved</b><span>总耗时</span></th>';
    return `<section class="scoreboard-page"><header><h1>成绩表</h1></header><div class="scoreboard-scroll"><table class="scoreboard-table"><thead><tr><th>#</th><th>用户</th>${totalHead}${heads}</tr></thead><tbody>${rows}</tbody></table></div></section>`;
  }
  const solved=config.questions.filter((question,index)=>results[index]==='accepted').length,totalScore=config.questions.reduce((sum,question,index)=>sum+scoreForQuestion(question,index),0);const cells=config.questions.map((question,index)=>{const attempts=submissions.filter(item=>item.problemId===question.id).length,accepted=results[index]==='accepted';return `<td class="score-problem ${accepted?'accepted':''}"><b>${accepted?'✓':attempts?`−${attempts}`:'—'}</b><span>${accepted?`${scoreForQuestion(question,index)} 分`:attempts?`${attempts} 次尝试`:'未提交'}</span></td>`;}).join('');const heads=config.questions.map((question,index)=>`<th><b>${escape(question.id)}</b><span>${escape(question.name)}</span></th>`).join('');return `<section class="scoreboard-page"><header><h1>成绩表</h1></header><div class="scoreboard-scroll"><table class="scoreboard-table"><thead><tr><th>#</th><th>用户</th><th><b>Solved</b><span>总得分</span></th>${heads}</tr></thead><tbody><tr><td>1</td><td class="score-user"><span>${escape(String(config.candidateName||'U').slice(0,1).toUpperCase())}</span><b>${escape(config.studentId||config.candidateName)}</b><small>${escape(config.candidateName)}</small></td><td class="score-total"><b>${solved}</b><span>${totalScore} 分</span></td>${cells}</tr></tbody></table></div></section>`;
}
function examDate(exam){return exam.date||String(exam.title||'').match(/\d{4}-\d{2}-\d{2}/)?.[0]||'日期未记录';}
function renderExamCards(exams){
  if(!exams.length)return '<div class="exam-center-empty"><b>暂无试卷</b><span>该分区暂时没有可查看的试卷。</span></div>';
  return exams.map((exam,index)=>{
    const total=exam.questions.reduce((sum,question)=>sum+(Number(question.score)||0),0);
    const questions=exam.questions.map((question,questionIndex)=>exam.selectable
      ?`<button type="button" class="archive-question-row" data-exam-version="${escape(exam.examVersion)}" data-question-open="${questionIndex}"><span>${escape(question.id)}</span><div><b>${escape(question.name)}</b><small>编程题</small></div><strong>${Number(question.score)||0} 分</strong><em>进入作答 ›</em></button>`
      :`<div class="archive-question-row"><span>${escape(question.id)}</span><div><b>${escape(question.name)}</b><small>编程题</small></div><strong>${Number(question.score)||0} 分</strong></div>`).join('');
    return `<details class="exam-archive-card" ${index===0||exam.current?'open':''}><summary><div class="archive-card-title"><span class="archive-status ${exam.current?'current':''}">${escape(exam.current?'正在作答':exam.status||'可作答')}</span><div><h2>${escape(exam.title)}</h2></div></div><div class="archive-metrics"><span><small>题目</small><b>${exam.questions.length} 题</b></span><span><small>时长</small><b>${formatDuration(exam.duration)}</b></span><span><small>总分</small><b>${total} 分</b></span></div><i>⌄</i></summary><div class="archive-question-list"><header><span>题目清单</span><span>满分</span></header>${questions}</div></details>`;
  }).join('');
}
function renderPortalContests(filters={status:'all',rule:'',keyword:''},page=0){
  const archive=window.OMS_EXAM_ARCHIVE||[];
  const exams=[primaryConfig,...archive]
    .filter((exam,index,list)=>list.findIndex(item=>item.examVersion===exam.examVersion)===index)
    .sort((a,b)=>Date.parse(b.startAt||b.date||0)-Date.parse(a.startAt||a.date||0));
  const ruleOf=exam=>exam.rule||exam.type||'OI';
  const filtered=exams.filter(exam=>{
    const status=portalExamStatus(exam);
    return (filters.status==='all'||status===filters.status)&&(!filters.rule||ruleOf(exam)===filters.rule)&&(!filters.keyword||String(exam.title||'').toLowerCase().includes(filters.keyword.toLowerCase()));
  });
  const pageSize=10,pageCount=Math.max(1,Math.ceil(filtered.length/pageSize)),safePage=Math.min(Math.max(0,page),pageCount-1);
  const rows=filtered.slice(safePage*pageSize,(safePage+1)*pageSize).map(exam=>{
    const status=portalExamStatus(exam),tone=status==='进行中'?'running':status==='未开始'?'pending':'ended';
    const title=String(exam.title||'').replace(/^已结束\s*/, '');
    const registered=examParticipantCount(exam)>0?`${examParticipantCount(exam)} 人`:'—';
    return `<button type="button" class="contest-directory-row" data-contest-open="${escape(exam.examVersion)}"><span class="fzuoj-status ${tone}">${status}</span><span class="contest-directory-copy"><b>${escape(title)}</b><small><span>${portalIcon('award')}${escape(ruleOf(exam))}</span><span>${portalIcon('calendar')}${formatExamTime(exam.startAt||exam.date)}</span><span>${portalIcon('clock')}${portalDuration(exam.duration)}</span><span>${portalIcon('users')}${registered}</span></small></span><i>${portalIcon('arrow')}</i></button>`;
  }).join('');
  const statuses=['all','进行中','未开始','已结束'];
  const statusLabels={all:'全部',进行中:'进行中',未开始:'未开始',已结束:'已结束'};
  const activeRules=[...new Set(exams.map(ruleOf))];
  return `<section class="contest-directory"><header class="contest-directory-head"><div><h1>考试</h1></div><span>${filtered.length} 场考试</span></header><form class="contest-directory-filters" data-contest-filter-form><div class="contest-status-tabs" role="group" aria-label="考试状态">${statuses.map(status=>`<button type="button" data-contest-status="${status}" class="${filters.status===status?'active':''}">${statusLabels[status]}</button>`).join('')}</div><div class="contest-directory-search"><select name="rule" aria-label="考试规则"><option value="">全部规则</option>${activeRules.map(rule=>`<option value="${escape(rule)}" ${filters.rule===rule?'selected':''}>${escape(rule)}</option>`).join('')}</select><input name="keyword" value="${escape(filters.keyword)}" placeholder="搜索考试名称" aria-label="搜索考试名称"><button type="submit">搜索</button><button type="button" data-contest-reset>重置</button></div></form><section class="contest-directory-list" aria-label="考试列表">${rows||`<div class="contest-directory-empty"><b>${exams.length?'没有符合条件的考试':'暂无考试'}</b><span>可以调整筛选条件后再试。</span></div>`}</section><nav class="contest-directory-pagination" aria-label="考试列表分页"><span>第 ${safePage+1} / ${pageCount} 页</span><div><button type="button" data-contest-page="${safePage-1}" ${safePage===0?'disabled':''}>‹ 上一页</button><button type="button" data-contest-page="${safePage+1}" ${safePage>=pageCount-1?'disabled':''}>下一页 ›</button></div></nav></section>`;
}
function renderExamCenter(){
  const currentExam={...primaryConfig,date:examDate(primaryConfig),status:'模拟卷',current:config.examVersion===primaryExamVersion,selectable:true,category:'mock'};
  const archive=(window.OMS_EXAM_ARCHIVE||[]).filter(exam=>exam.examVersion!==config.examVersion);
  const pastExams=(window.OMS_EXAM_ARCHIVE||[]).filter(exam=>exam.category==='past').map(exam=>({...exam,current:config.examVersion===exam.examVersion,selectable:true}));
  const mockExams=[currentExam,...archive.filter(exam=>exam.category==='mock').map(exam=>({...exam,current:config.examVersion===exam.examVersion,selectable:true}))];
  const activeCategory=config.examVersion===primaryExamVersion?'mock':'past';
  return `<div class="exam-center-head"><h1>考试中心</h1></div><div class="exam-center-tabs" role="tablist"><button type="button" class="${activeCategory==='past'?'active':''}" data-exam-center-tab="past" role="tab" aria-selected="${activeCategory==='past'}">历年卷</button><button type="button" class="${activeCategory==='mock'?'active':''}" data-exam-center-tab="mock" role="tab" aria-selected="${activeCategory==='mock'}">模拟卷</button></div><section class="exam-center-panel ${activeCategory==='past'?'active':''}" data-exam-center-panel="past" ${activeCategory==='past'?'':'hidden'}><header><h2>历年卷</h2><span>历年考试试卷</span></header><div class="exam-archive-list">${renderExamCards(pastExams)}</div></section><section class="exam-center-panel ${activeCategory==='mock'?'active':''}" data-exam-center-panel="mock" ${activeCategory==='mock'?'':'hidden'}><header><h2>模拟卷</h2><span>周练与模拟考试</span></header><div class="exam-archive-list">${renderExamCards(mockExams)}</div></section>`;
}
function renderProblemDirectory(filters={status:'all',keyword:''},page=0){
  const archive=window.OMS_EXAM_ARCHIVE||[];
  const exams=[primaryConfig,...archive]
    .filter((exam,index,list)=>list.findIndex(item=>item.examVersion===exam.examVersion)===index)
    .sort((a,b)=>Date.parse(b.startAt||b.date||0)-Date.parse(a.startAt||a.date||0));
  const seen=new Set(),problems=[];
  exams.forEach(exam=>(exam.questions||[]).forEach((question,index)=>{
    const key=String(question.id||`${exam.examVersion}-${index}`);
    if(seen.has(key))return;
    seen.add(key);problems.push({exam,question,index,key});
  }));
  const statusFor=({exam,question})=>{
    if(question.judgeable===false)return '暂不可评测';
    const latest=submissions.find(item=>item.problemId===question.id);
    const currentIndex=config.questions.findIndex(item=>item.id===question.id);
    if((currentIndex>=0&&results[currentIndex]==='accepted')||latest?.verdict==='答案正确'||latest?.verdict==='Accepted')return '已通过';
    return latest?'未通过':'未提交';
  };
  const filtered=problems.filter(item=>{
    const status=statusFor(item),text=`${item.question.id||''} ${item.question.name||''} ${(item.question.tags||[]).toString()}`.toLowerCase();
    return (filters.status==='all'||status===filters.status)&&(!filters.keyword||text.includes(filters.keyword.toLowerCase()));
  });
  const pageSize=20,pageCount=Math.max(1,Math.ceil(filtered.length/pageSize)),safePage=Math.min(Math.max(0,page),pageCount-1);
  const rows=filtered.slice(safePage*pageSize,(safePage+1)*pageSize).map(item=>{
    const status=statusFor(item),tone=status==='已通过'?'accepted':status==='未通过'?'wrong':status==='暂不可评测'?'unavailable':'pending';
    const rawTags=item.question.tags||[],tags=(Array.isArray(rawTags)?rawTags:[rawTags]).filter(Boolean).map(escape).join(' · ')||'—';
    const ratio=item.question.passRate??item.question.acceptanceRate;
    const passRate=ratio===undefined||ratio===null?'—':`${escape(ratio)}${Number.isFinite(Number(ratio))?'%':''}`;
    return `<button type="button" class="problem-directory-row" data-problem-exam="${escape(item.exam.examVersion)}" data-problem-index="${item.index}"><span class="problem-directory-status ${tone}" title="${status}">${status==='已通过'?'✓':status==='未通过'?'×':status==='暂不可评测'?'!':'—'}</span><span class="problem-directory-id">${escape(item.question.id||item.index+1)}</span><b>${escape(item.question.name||'未命名题目')}</b><span class="problem-directory-tags">${tags}</span><em>${passRate}</em></button>`;
  }).join('');
  const statuses=['all','未提交','已通过','未通过','暂不可评测'],labels={all:'全部',未提交:'未提交',已通过:'已通过',未通过:'未通过',暂不可评测:'暂不可评测'};
  return `<section class="problem-directory"><header class="problem-directory-head"><div><h1>题目</h1></div><span>${filtered.length} 道题</span></header><form class="problem-directory-filters" data-problem-filter-form><div class="problem-status-tabs" role="group" aria-label="题目状态">${statuses.map(status=>`<button type="button" data-problem-status="${status}" class="${filters.status===status?'active':''}">${labels[status]}</button>`).join('')}</div><div class="problem-directory-search"><input name="keyword" value="${escape(filters.keyword)}" placeholder="搜索题号或题目名称" aria-label="搜索题号或题目名称"><button type="submit">搜索</button><button type="button" data-problem-reset>重置</button></div></form><div class="problem-directory-table-wrap"><div class="problem-directory-table"><div class="problem-directory-columns"><span>状态</span><span>题号</span><span>题目名称</span><span>标签</span><span>通过率</span></div>${rows||`<div class="problem-directory-empty">${problems.length?'没有符合条件的题目':'暂无题目'}</div>`}</div></div><nav class="problem-directory-pagination" aria-label="题目列表分页"><span>第 ${safePage+1} / ${pageCount} 页</span><div><button type="button" data-problem-page="${safePage-1}" ${safePage===0?'disabled':''}>‹ 上一页</button><button type="button" data-problem-page="${safePage+1}" ${safePage>=pageCount-1?'disabled':''}>下一页 ›</button></div></nav></section>`;
}
function renderAdviceQuestionRows(questions,emptyText){
  if(!questions.length)return `<div class="study-advice-empty"><b>${escape(emptyText)}</b><span>完成题目评测后，这里会自动更新。</span></div>`;
  return `<div class="study-advice-question-list">${questions.map(({question,index},order)=>`<button type="button" data-question-open="${index}"><span>${escape(question.id)}</span><div><b>${escape(question.name)}</b><small>${Number(question.score)||0} 分 · 编程题</small></div><em>进入作答 ›</em></button>`).join('')}</div>`;
}
const fallbackExperiencePosts=[
  {label:'备考策略',title:'先拿稳分，再攻难题',summary:'用稳定得分建立节奏，再把剩余时间留给复杂题。',sections:[
    {key:'idea',title:'核心思路',body:'机试不是按题号顺序完成的比赛。开场先快速浏览全部题目，把题目分成“立即能写”“需要推导”和“暂时没思路”三类，优先完成边界清晰、验证成本低的题目。'},
    {key:'opening',title:'开场十分钟',body:'先确认每道题的输入输出、数据范围和分值，再选择最稳的一题开始。第一题通过后再继续扩大战果，避免在单题上持续消耗时间。',items:['读清数据范围，判断是否需要特殊算法。','手算样例，确认自己理解了题意。','预估编码与调试时间，决定作答顺序。']},
    {key:'order',title:'推荐作答顺序',body:'先完成能独立写出并能快速验证的题，再处理中等难度题，最后集中处理复杂模拟或算法题。卡住超过预设时间就做标记并暂时跳过。'}
  ]},
  {label:'提交检查',title:'提交前做三项检查',summary:'把低级错误挡在提交按钮之前。',sections:[
    {key:'input',title:'检查输入',body:'确认读取顺序、数据类型和多组数据的结束条件。字符串与整行输入混用时，额外检查换行是否被正确处理。'},
    {key:'boundary',title:'检查边界',body:'至少覆盖最小值、最大值、空结果、只有一个元素和全部相同等情况。循环初值、终止条件和数组下标要逐项核对。'},
    {key:'output',title:'检查输出',body:'确认空格、换行、精度与大小写完全符合题目要求。提交前用样例和一个自造极端数据各运行一次。',items:['不要输出调试文字。','检查整数溢出和浮点精度。','确认末尾空格与换行格式。']}
  ]},
  {label:'错题复盘',title:'错题必须重新独立完成',summary:'复盘的目标是重新建立解题过程，而不是记住旧代码。',sections:[
    {key:'reason',title:'先记录错误原因',body:'把问题归类为读题、思路、边界、实现或调试错误，并用一句话写出真正原因。只记录“粗心”无法指导下一次改进。'},
    {key:'rewrite',title:'关闭旧代码再重写',body:'隔一段时间后不看原代码，从题意、样例和数据范围重新推导并独立实现。只有能够重新写出，才说明已经掌握。'},
    {key:'verify',title:'用同类变化验证',body:'在原测试点之外，再改变数据规模、边界位置或输入形式进行验证，确认方法可以迁移到相似题目。',items:['当天定位错误原因。','间隔后完成一次独立重写。','再做一道同类变化题。']}
  ]}
];
function experienceYear(post){
  const matched=String(post.year||post.label||post.title||'').match(/(?:19|20)\d{2}/);
  return matched?Number(matched[0]):0;
}
const experiencePosts=(Array.isArray(window.OMS_EXPERIENCE_POSTS)&&window.OMS_EXPERIENCE_POSTS.length?window.OMS_EXPERIENCE_POSTS:fallbackExperiencePosts)
  .slice()
  .sort((left,right)=>experienceYear(right)-experienceYear(left)||Array.from(String(left.title||'')).length-Array.from(String(right.title||'')).length||String(left.title||'').localeCompare(String(right.title||''),'zh-CN'));
const EXPERIENCE_FONT_STORAGE='oms-pta-experience-font-size';
const EXPERIENCE_LIBRARY_STORAGE='oms-pta-experience-library-collapsed';
let experienceFontSize='medium';
let experienceLibraryCollapsed=false;
try{const storedFontSize=localStorage.getItem(EXPERIENCE_FONT_STORAGE);if(['small','medium','large'].includes(storedFontSize))experienceFontSize=storedFontSize;}catch{}
try{experienceLibraryCollapsed=localStorage.getItem(EXPERIENCE_LIBRARY_STORAGE)==='true';}catch{}
function renderExperienceReader(){
  const list=experiencePosts.map((post,index)=>`<button type="button" class="${index===0?'active':''}" data-experience-post="${index}" aria-selected="${index===0}"><small>${escape(post.label)}</small><b>${escape(post.title)}</b></button>`).join('');
  const articles=experiencePosts.map((post,index)=>`<article class="experience-article ${index===0?'active':''}" data-experience-article="${index}" ${index===0?'':'hidden'}><header><small>${escape(post.label)}</small><h2>${escape(post.title)}</h2></header>${post.sections.map(section=>`<section id="experience-${index}-${section.key}"><h3>${escape(section.title)}</h3>${section.markdown?`<div class="experience-markdown">${markdownToHtml(section.markdown)}</div>`:`<p>${escape(section.body)}</p>${section.items?`<ul>${section.items.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>`:''}`}</section>`).join('')}</article>`).join('');
  const outlines=experiencePosts.map((post,index)=>`<nav class="${index===0?'active':''}" data-experience-outline="${index}" ${index===0?'':'hidden'}>${post.sections.map(section=>`<a href="#experience-${index}-${section.key}">${escape(section.title)}</a>`).join('')}</nav>`).join('');
  return `<div class="experience-reader ${experienceLibraryCollapsed?'library-collapsed':''}" data-experience-font-size="${experienceFontSize}"><aside class="experience-library"><div class="experience-library-head"><h3>经验文章</h3><button type="button" class="experience-library-toggle" data-experience-library-toggle aria-expanded="${!experienceLibraryCollapsed}" aria-label="${experienceLibraryCollapsed?'展开经验文章列表':'折叠经验文章列表'}" title="${experienceLibraryCollapsed?'展开经验文章列表':'折叠经验文章列表'}">${experienceLibraryCollapsed?'›':'‹'}</button></div><div class="experience-library-list">${list}</div></aside><main class="experience-main">${articles}</main><aside class="experience-outline"><h3>目录</h3>${outlines}</aside></div>`;
}
function renderStudyAdvice(){
  const wrongQuestions=config.questions.map((question,index)=>({question,index})).filter(item=>results[item.index]==='wrong');
  const keyQuestions=config.questions.map((question,index)=>({question,index})).filter(item=>item.question.judgeable!==false).slice(0,6);
  const fontOptions=[['small','小'],['medium','中'],['large','大']].map(([value,label])=>`<button type="button" class="${experienceFontSize===value?'active':''}" data-experience-font="${value}" aria-pressed="${experienceFontSize===value}">${label}</button>`).join('');
  return `<div class="study-advice-head"><h1>备考建议</h1></div><div class="study-advice-tabs" role="tablist"><button type="button" class="active" data-study-tab="experience" role="tab" aria-selected="true">经验贴</button><button type="button" data-study-tab="mistakes" role="tab" aria-selected="false">错题集</button><button type="button" data-study-tab="key" role="tab" aria-selected="false">关键题目</button><button type="button" data-study-tab="knowledge" role="tab" aria-selected="false">知识讲解</button></div><section class="study-advice-panel active" data-study-panel="experience"><header><h2>经验贴</h2><div class="experience-header-tools"><div class="experience-font-controls" role="group" aria-label="经验贴字号"><span>字号</span>${fontOptions}</div></div></header>${renderExperienceReader()}</section><section class="study-advice-panel" data-study-panel="mistakes" hidden><header><h2>错题集</h2></header>${renderAdviceQuestionRows(wrongQuestions,'暂无错题记录')}</section><section class="study-advice-panel" data-study-panel="key" hidden><header><h2>关键题目</h2></header>${renderAdviceQuestionRows(keyQuestions,'暂无可复习题目')}</section><section class="study-advice-panel" data-study-panel="knowledge" hidden><header><h2>知识讲解</h2></header><div class="study-advice-grid knowledge"><article><i>IO</i><div><h3>输入输出与格式</h3><p>掌握多组数据读取、行输入、精度控制以及末尾空格和换行处理。</p></div></article><article><i>01</i><div><h3>循环与边界</h3><p>重点检查初值、终止条件、数组下标和空数据等容易出错的位置。</p></div></article><article><i>AZ</i><div><h3>数组与字符串</h3><p>熟悉遍历、计数、切分、字符判断和常用容器的使用方式。</p></div></article><article><i>↕</i><div><h3>排序与查找</h3><p>理解自定义排序规则、二分边界以及去重和频次统计。</p></div></article></div></section>`;
}
function setPortalSession(data){
  portalSessionRevision++;
  const next=data.authenticated?data.user:null,changed=portalUser?.id!==next?.id,profileChanged=JSON.stringify(portalUser)!==JSON.stringify(next);
  if(changed)persistActiveDraft();
  portalUser=next;portalAuthenticated=Boolean(next);portalCsrf=data.csrfToken||'';
  portalAuthAvailable=Boolean(data.available);portalRegistrationEnabled=data.registrationEnabled!==false;portalAuthMessage=data.message||'';
  config.candidateName=primaryConfig.candidateName=next?(next.nickname||next.username):fallback.candidateName;
  config.studentId=primaryConfig.studentId=next?next.username:fallback.studentId;
  if(changed){
    for(const key of Object.keys(results))delete results[key];submissions.length=0;
    loadCodeStores(config.examVersion);restoreSavedCode();$('#submit-state').textContent='本站草稿已加载';
  }
  if(profileChanged){render();document.dispatchEvent(new CustomEvent('oms:auth-change',{detail:next}));}
}
async function portalRequest(endpoint,payload){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
  try{
    const response=await fetch(endpoint,{method:payload?'POST':'GET',credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:payload?{'Content-Type':'application/json','X-OMS-Request':'1','X-OMS-CSRF':portalCsrf}:{},...(payload?{body:JSON.stringify(payload)}:{})});
    let data;try{data=await response.json();}catch{throw Error('账号服务不可用，请通过本站服务器打开页面。');}
    if(!response.ok){const failure=Error(data.message||'请求失败，请稍后重试。');failure.status=response.status;throw failure;}
    return data;
  }catch(failure){if(failure.name==='AbortError')throw Error('账号服务响应超时，请稍后重试。');throw failure;}
  finally{clearTimeout(timer);}
}
async function refreshPortalSession(){const revision=portalSessionRevision,data=await portalRequest('/api/auth/session');if(revision===portalSessionRevision)setPortalSession(data);return portalAuthenticated;}
async function requirePortalSession(target='profile'){
  try{if(await refreshPortalSession())return true;}
  catch{portalAuthMessage='账号服务暂不可用，请确认本地服务已启动后重试。';}
  openLogin(target);return false;
}
async function logoutPortal(){
  try{
    if(await refreshPortalSession())await portalRequest('/api/auth/logout',{});
    setPortalSession({available:portalAuthAvailable,authenticated:false});
    document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
    $('#login-screen').hidden=true;await route('home',true);
  }catch(failure){alert(failure.message||'退出失败，请稍后重试。');}
}
function openLogin(target='home',mode='login',accountValue=''){
  pendingLoginRoute=target;
  const screen=$('#login-screen'),register=mode==='register'&&portalRegistrationEnabled,passwordMin=portalRegistrationEnabled?10:1;
  screen.innerHTML=`<main class="portal-login"><section class="portal-login-brand"><div class="portal-login-mark"><img src="/fzu-logo.png" alt="福州大学校徽"><div><img src="/fzu-wordmark-official.jpg" alt="福州大学（郭沫若题写）" style="display:block;width:190px;height:auto;background:#fff;border-radius:2px"></div></div><div class="portal-login-intro"><h1>让每一次练习<br>都有清晰的进步</h1><p>进入题库、考试与评测空间，继续你的程序设计学习。</p></div><div class="portal-login-foot"><span>本站独立账号</span><span>暂未绑定校园身份</span></div></section><section class="portal-login-panel"><div class="portal-login-heading"><h2>${register?'注册本站账号':'登录平台'}</h2><p>${register?'创建专用于本站的账号与密码':'使用本站账号继续访问'}</p></div><form class="portal-login-form" id="portal-login-form"><label for="portal-login-account">本站账号 / 学号</label><input id="portal-login-account" name="account" autocomplete="username" required minlength="3" maxlength="32" pattern="[A-Za-z0-9_-]{3,32}" title="3–32 位字母、数字、下划线或连字符" placeholder="请输入本站账号" value="${escape(accountValue)}">${register?'<label for="portal-login-nickname">昵称</label><input id="portal-login-nickname" name="nickname" autocomplete="nickname" required maxlength="32" placeholder="你希望显示的名字">':''}<label for="portal-login-password">本站密码</label><input id="portal-login-password" name="password" type="password" required minlength="${passwordMin}" maxlength="128" autocomplete="${register?'new-password':'current-password'}" placeholder="${register?'10–128 个字符，请勿使用校园密码':'请输入本站密码'}">${register?'<label for="portal-login-confirm">确认密码</label><input id="portal-login-confirm" name="passwordConfirm" type="password" autocomplete="new-password" required minlength="10" maxlength="128" placeholder="再次输入本站密码">':''}<p class="portal-login-note" id="portal-login-note" role="status">${escape(portalAuthMessage||(portalRegistrationEnabled?'本站独立登录，不是学校统一身份认证。请勿使用校园密码。':'仅限管理员配置的账号登录。'))}</p><button type="submit" class="portal-login-submit" ${portalAuthAvailable?'':'disabled'}>${register?'注册并登录':'登录'}</button></form><div class="portal-login-divider"><span>${portalRegistrationEnabled?(register?'已有本站账号？':'首次使用？'):'仅限指定账号'}</span></div>${portalRegistrationEnabled?`<button type="button" class="portal-demo-login" data-auth-mode>${register?'返回登录':'注册本站账号'} <span>→</span></button>`:''}<button type="button" class="portal-login-back" data-login-back>暂不登录，返回主页</button></section></main>`;
  screen.querySelector('.portal-login-mark').innerHTML='<img src="/fzu-brand-lockup-red.jpg" alt="福州大学校徽与书法校名" style="display:block;width:min(320px,100%);height:auto;mix-blend-mode:screen">';
  screen.hidden=false;
  const form=screen.querySelector('#portal-login-form');
  form.onsubmit=async event=>{
    event.preventDefault();const note=screen.querySelector('#portal-login-note');
    const data=Object.fromEntries(new FormData(form));
    if(register&&data.password!==data.passwordConfirm){note.textContent='两次输入的密码不一致。';return;}
    const buttons=screen.querySelectorAll('button');buttons.forEach(button=>button.disabled=true);note.textContent=register?'正在注册…':'正在验证…';
    try{
      const session=await portalRequest(`/api/auth/${register?'register':'login'}`,data);setPortalSession(session);
      form.reset();screen.hidden=true;const destination=pendingLoginRoute;pendingLoginRoute='home';
      if(destination==='profile'){await route('home',true);document.dispatchEvent(new CustomEvent('oms:open-profile'));}
      else await route(destination);
    }catch(failure){form.elements.password.value='';if(register)form.elements.passwordConfirm.value='';note.textContent=failure.message||'登录失败，请稍后重试。';}
    finally{buttons.forEach(button=>button.disabled=false);}
  };
  const authMode=screen.querySelector('[data-auth-mode]');if(authMode)authMode.onclick=()=>openLogin(target,register?'login':'register',form.elements.account.value);
  screen.querySelector('[data-login-back]').onclick=()=>{screen.hidden=true;pendingLoginRoute='home';route('home',true);};
  screen.querySelector('#portal-login-account').focus();
}
window.omsAuth={get user(){return portalUser;},request:portalRequest,refresh:refreshPortalSession,require:requirePortalSession,logout:logoutPortal,update:setPortalSession};
// The existing judge widget also calls this endpoint. Keep its requests authenticated
// without changing the independent compiler / editor implementation.
const portalNativeFetch=window.fetch.bind(window);
window.fetch=async(input,options={})=>{
  const url=new URL(input instanceof Request?input.url:String(input),location.href);
  if(url.origin!==location.origin||url.pathname!=='/api/judge')return portalNativeFetch(input,options);
  const question=config.questions[current],examVersion=config.examVersion;
  const rawBody=options.body??(input instanceof Request?await input.clone().text():null);
  if(typeof rawBody==='string'){
    const payload=JSON.parse(rawBody);
    options={...options,body:JSON.stringify({...payload,problemId:question.id,examVersion})};
  }
  if(!await requirePortalSession('exam'))throw Error('请先登录后再运行或提交。');
  const headers=new Headers(options.headers||(input instanceof Request?input.headers:undefined));
  headers.set('X-OMS-Request','1');headers.set('X-OMS-CSRF',portalCsrf);
  const response=await portalNativeFetch(input,{...options,credentials:'same-origin',headers});
  if(response.status===401){setPortalSession({available:true,authenticated:false});openLogin('exam');}
  return response;
};
window.addEventListener('DOMContentLoaded',async()=>{
  try{await refreshPortalSession();}catch{portalAuthMessage='账号服务暂不可用，请确认本地服务已启动后重试。';}
  if(routeRevision===1&&activeRoute==='home'&&$('#login-screen').hidden)route('home',true);
});
let initialRoutePending=true;
function finishAppBoot(){const app=$('#pta-app');if(!app.classList.contains('app-booting'))return;app.classList.remove('app-booting');app.removeAttribute('aria-busy');$('#app-boot-screen')?.remove();}
async function route(name,allowGuest=false){
  const revision=++routeRevision;
  const startup=initialRoutePending;
  if(initialRoutePending){initialRoutePending=false;name='home';}
  if(name==='center')name='home-contests';
  const guest=startup||(allowGuest&&name==='home');
  if(!guest){
    try{await refreshPortalSession();}catch{portalAuthMessage='账号服务暂不可用，请确认本地服务已启动后重试。';if(revision===routeRevision)openLogin(name);return;}
    if(revision!==routeRevision)return;
    if(!portalAuthenticated){openLogin(name);return;}
  }
  const previousRoute=activeRoute;activeRoute=name;
  if(previousRoute==='exam'&&name!=='exam')persistActiveDraft();
  const app=$('#pta-app'),isPortalPage=['home','problemset','home-contests','home-submissions','about','advice'].includes(name);app.classList.toggle('portal-mode',isPortalPage);
  const activeNavRoute=name==='problemset'?'exam':name==='home-submissions'?'submissions':name==='home-contests'?'center':name;
  document.querySelectorAll('.rail-button').forEach(button=>button.classList.toggle('active',button.dataset.route===activeNavRoute));
  $('.remain').hidden=name==='home-contests'||name==='problemset'||name==='home-submissions'||name==='advice'||isPortalPage;
  const secondary=$('#secondary'),workspace=$('#workspace'),overview=$('#overview');
  if(name==='exam'){if(previousRoute!=='exam')restoreSavedCode();secondary.hidden=true;workspace.hidden=false;overview.hidden=false;return;}
  workspace.hidden=true;overview.hidden=true;secondary.hidden=false;secondary.dataset.page=isPortalPage?'portal':name;
  let portalContent=null,paintPortalPage=null;
  if(isPortalPage){
    secondary.innerHTML=renderFzuOjHome(name);
    portalContent=secondary.querySelector('.fzuoj-content');
    paintPortalPage=html=>{portalContent.innerHTML=`<div class="fzuoj-primary fzuoj-page-content">${html}</div>`;};
    secondary.querySelectorAll('[data-portal-route]').forEach(button=>button.onclick=()=>route(button.dataset.portalRoute));
    secondary.querySelectorAll('[data-portal-exam]').forEach(button=>button.onclick=()=>{if(activateExam(button.dataset.portalExam,0))route('info');});
    secondary.querySelectorAll('[data-portal-question]').forEach(button=>button.onclick=()=>{if(activateExam(primaryExamVersion,Number(button.dataset.portalQuestion)))route('exam');});
    const themeButton=secondary.querySelector('[data-portal-theme]');if(themeButton)themeButton.onclick=()=>{const light=app.classList.toggle('light-mode');try{localStorage.setItem('oms-pta-theme',light?'light':'dark');}catch{}};
    const logoutButton=secondary.querySelector('[data-portal-logout]');if(logoutButton)logoutButton.onclick=logoutPortal;
    const homeShell=secondary.querySelector('.fzuoj-shell');
    const sidebarToggles=secondary.querySelectorAll('[data-fzuoj-sidebar-toggle]');
    const setSidebarCollapsed=collapsed=>{
      homeShell?.classList.toggle('sidebar-collapsed',collapsed);
      sidebarToggles.forEach(button=>{button.setAttribute('aria-expanded',String(!collapsed));button.setAttribute('aria-label',collapsed?'展开侧栏':'收起侧栏');button.title=collapsed?'展开侧栏':'收起侧栏';});
      try{localStorage.setItem('oms-fzuoj-sidebar-collapsed',collapsed?'1':'0');}catch{}
    };
    let sidebarCollapsed=false;try{sidebarCollapsed=localStorage.getItem('oms-fzuoj-sidebar-collapsed')==='1';}catch{}
    setSidebarCollapsed(sidebarCollapsed);
    sidebarToggles.forEach(button=>button.onclick=()=>setSidebarCollapsed(!homeShell.classList.contains('sidebar-collapsed')));
    const profileButton=secondary.querySelector('[data-profile-open]');if(profileButton){if(!portalAuthenticated){profileButton.setAttribute('aria-label','登录或打开个人中心');profileButton.querySelector('p b').textContent='未登录';profileButton.querySelector('p small').textContent='点击登录';profileButton.querySelector(':scope > span').textContent='U';}else if(portalUser?.avatar){const image=profileButton.querySelector(':scope > span');image.style.backgroundImage=`url("${portalUser.avatar}")`;image.classList.add('has-image');image.textContent='';}profileButton.onclick=()=>{if(!portalAuthenticated){openLogin('profile');return;}document.dispatchEvent(new CustomEvent('oms:open-profile'));};}
    if(name==='home'){finishAppBoot();return;}
    if(name==='about')paintPortalPage('<section class="fzuoj-card fzuoj-bulletin"><h1>关于 FZU PTA Online Judge</h1><p>福州大学程序设计练习与考试平台。</p></section>');
  }
  if(name==='submissions')secondary.innerHTML=`<h1>提交列表</h1><div class="card"><div class="row head"><span>题目</span><span>语言</span><span>状态</span><span>提交时间</span></div>${renderSubmissions()}</div>`;
  if(name==='home-submissions'){
    let filters={},page=0;
    const paint=()=>{
      paintPortalPage(renderPortalSubmissions(filters,page));
      const form=portalContent.querySelector('[data-evaluation-form]');
      form.onsubmit=event=>{event.preventDefault();filters=Object.fromEntries(new FormData(form));page=0;paint();};
      portalContent.querySelector('[data-evaluation-reset]').onclick=()=>{filters={};page=0;paint();};
      portalContent.querySelectorAll('[data-evaluation-page]').forEach(button=>button.onclick=()=>{page=Number(button.dataset.evaluationPage);paint();});
    };
    paint();
  }
  if(name==='problemset'){
    let filters={status:'all',keyword:''},page=0;
    const paint=()=>{
      paintPortalPage(renderProblemDirectory(filters,page));
      const form=portalContent.querySelector('[data-problem-filter-form]');
      form.onsubmit=event=>{event.preventDefault();filters={...filters,...Object.fromEntries(new FormData(form))};page=0;paint();};
      portalContent.querySelector('[data-problem-reset]').onclick=()=>{filters={status:'all',keyword:''};page=0;paint();};
      portalContent.querySelectorAll('[data-problem-status]').forEach(button=>button.onclick=()=>{filters.status=button.dataset.problemStatus;page=0;paint();});
      portalContent.querySelectorAll('[data-problem-page]').forEach(button=>button.onclick=()=>{page=Number(button.dataset.problemPage);paint();});
      portalContent.querySelectorAll('[data-problem-exam]').forEach(button=>button.onclick=()=>{if(activateExam(button.dataset.problemExam,Number(button.dataset.problemIndex)))route('exam');});
    };
    paint();
  }
  if(name==='info'){
    secondary.innerHTML=renderExamInfo();
    secondary.querySelectorAll('[data-question-open]').forEach(button=>button.onclick=()=>{const target=Number(button.dataset.questionOpen);if(activateExam(button.dataset.examVersion||config.examVersion,target))route('exam');});
  }
  if(name==='realtime')secondary.innerHTML=renderScoreboard();
  if(name==='home-contests'){
    let filters={status:'all',rule:'',keyword:''},page=0;
    const paint=()=>{
      paintPortalPage(renderPortalContests(filters,page));
      const form=portalContent.querySelector('[data-contest-filter-form]');
      form.onsubmit=event=>{event.preventDefault();const values=Object.fromEntries(new FormData(form));filters={...filters,...values};page=0;paint();};
      portalContent.querySelector('[data-contest-reset]').onclick=()=>{filters={status:'all',rule:'',keyword:''};page=0;paint();};
      portalContent.querySelectorAll('[data-contest-status]').forEach(button=>button.onclick=()=>{filters.status=button.dataset.contestStatus;page=0;paint();});
      portalContent.querySelectorAll('[data-contest-page]').forEach(button=>button.onclick=()=>{page=Number(button.dataset.contestPage);paint();});
      portalContent.querySelectorAll('[data-contest-open]').forEach(button=>button.onclick=()=>{if(activateExam(button.dataset.contestOpen,0))route('info');});
    };
    paint();
  }
  if(name==='advice'){
    paintPortalPage(renderStudyAdvice());
    const showAdvicePanel=category=>{
      secondary.querySelectorAll('[data-study-tab]').forEach(button=>{const active=button.dataset.studyTab===category;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));});
      secondary.querySelectorAll('[data-study-panel]').forEach(panel=>{const active=panel.dataset.studyPanel===category;panel.hidden=!active;panel.classList.toggle('active',active);});
    };
    secondary.querySelectorAll('[data-study-tab]').forEach(button=>button.onclick=()=>showAdvicePanel(button.dataset.studyTab));
    const setExperienceFontSize=size=>{
      if(!['small','medium','large'].includes(size))return;
      experienceFontSize=size;
      secondary.querySelector('.experience-reader')?.setAttribute('data-experience-font-size',size);
      secondary.querySelectorAll('[data-experience-font]').forEach(button=>{const active=button.dataset.experienceFont===size;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
      try{localStorage.setItem(EXPERIENCE_FONT_STORAGE,size);}catch{}
    };
    secondary.querySelectorAll('[data-experience-font]').forEach(button=>button.onclick=()=>setExperienceFontSize(button.dataset.experienceFont));
    const libraryToggle=secondary.querySelector('[data-experience-library-toggle]');
    if(libraryToggle)libraryToggle.onclick=()=>{
      experienceLibraryCollapsed=!experienceLibraryCollapsed;
      secondary.querySelector('.experience-reader')?.classList.toggle('library-collapsed',experienceLibraryCollapsed);
      libraryToggle.textContent=experienceLibraryCollapsed?'›':'‹';
      libraryToggle.setAttribute('aria-expanded',String(!experienceLibraryCollapsed));
      const label=experienceLibraryCollapsed?'展开经验文章列表':'折叠经验文章列表';
      libraryToggle.setAttribute('aria-label',label);libraryToggle.title=label;
      try{localStorage.setItem(EXPERIENCE_LIBRARY_STORAGE,String(experienceLibraryCollapsed));}catch{}
    };
    const showExperiencePost=post=>{
      secondary.querySelectorAll('[data-experience-post]').forEach(button=>{const active=button.dataset.experiencePost===post;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));});
      secondary.querySelectorAll('[data-experience-article]').forEach(article=>{const active=article.dataset.experienceArticle===post;article.hidden=!active;article.classList.toggle('active',active);});
      secondary.querySelectorAll('[data-experience-outline]').forEach(outline=>{const active=outline.dataset.experienceOutline===post;outline.hidden=!active;outline.classList.toggle('active',active);});
    };
    secondary.querySelectorAll('[data-experience-post]').forEach(button=>button.onclick=()=>showExperiencePost(button.dataset.experiencePost));
    secondary.querySelectorAll('[data-question-open]').forEach(button=>button.onclick=()=>{const target=Number(button.dataset.questionOpen);if(activateExam(config.examVersion,target))route('exam');});
  }
}
function syncTesterToggle(){const tester=$('#tester'),collapsed=tester.classList.contains('collapsed'),toggle=$('#tester-toggle');toggle.setAttribute('aria-label',collapsed?'展开测试用例':'收起测试用例');toggle.title=toggle.getAttribute('aria-label');}
function setTab(tab){const tester=$('#tester');tester.classList.toggle('compiler',tab==='compiler');tester.classList.remove('collapsed');document.querySelectorAll('[data-tab]').forEach(button=>button.classList.toggle('active',button.dataset.tab===tab));syncTesterToggle();}
async function judge(mode){if(!await requirePortalSession('exam'))return;const state=$('#run-state'),q=config.questions[current],questionIndex=current,source=editorCode();if(q.judgeable===false){state.textContent='暂不可评测';$('#compiler-output').textContent=q.unjudgeableReason||'该题原始资料不完整，未提供可靠的输入、输出和测试点。';setTab('compiler');return;}state.textContent='正在运行…';$('#tester').classList.remove('collapsed');$('#tester').classList.add('expanded');syncTesterToggle();try{if(!['127.0.0.1','localhost'].includes(location.hostname))throw Error('在线演示不运行 Dev-C++；请通过本机评测服务运行。');const response=await fetch('/api/judge',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-OMS-Request':'1','X-OMS-CSRF':portalCsrf},body:JSON.stringify({code:source,language:$('#language').value,problemId:q.id,examVersion:config.examVersion,input:$('#sample-input').value,mode})});if(response.status===401){setPortalSession({available:true,authenticated:false});openLogin('exam');throw Error('登录已过期，请重新登录。');}if(!response.ok)throw Error('本机评测服务不可用');const result=await response.json();$('#compiler-output').textContent=result.compilerOutput||result.message||'评测完成。';setTab('compiler');state.textContent=result.verdict==='Accepted'?'答案正确':'答案错误';if(mode==='submit'){results[questionIndex]=result.verdict==='Accepted'?'accepted':'wrong';submissions.unshift({problemId:q.id,language:$('#language').value,verdict:state.textContent,candidate:config.candidateName,time:'刚刚'});saveSubmittedCode(q.id,source);if(activeQuestionId===q.id)loadedCode=source;$('#submit-state').textContent='刚刚提交 · '+state.textContent;render();}}catch(error){$('#compiler-output').textContent=error.message;setTab('compiler');state.textContent='运行失败';}}
function renderSettings(){const area=$('#question-settings');area.innerHTML=config.questions.map((q,i)=>`<div class="question-setting"><span>${escape(q.id)}</span><input data-i="${i}" data-k="name" value="${escape(q.name)}"><input data-i="${i}" data-k="score" type="number" value="${q.score}"><input data-i="${i}" data-k="tests" type="number" value="${q.tests}"></div>`).join('');}
function markdownTestCases(statement){const source=String(statement).replace(/\r\n?/g,'\n');const markers=[...source.matchAll(/^\s*(?:#{1,6}\s*)?(?:测试点|测试用例|test\s*case)\s*(\d+)?(?:\s*[（(][^）)\n]*[）)])?\s*[：:]?\s*$/gmi)];const getValue=(block,names)=>{const label=names.join('|');const fenced=new RegExp('(?:^|\\n)\\s*(?:#{1,6}\\s*)?(?:'+label+')\\s*[：:]?\\s*\\n\\s*```[^\\n]*\\n([\\s\\S]*?)\\n\\s*```','i').exec(block);if(fenced)return fenced[1];const inline=new RegExp('(?:^|\\n)\\s*(?:'+label+')\\s*[：:]\\s*([^\\n]+)','i').exec(block);return inline?inline[1].trim():'';};return markers.map((marker,index)=>{const end=markers[index+1]?markers[index+1].index:source.length;const block=source.slice(marker.index+marker[0].length,end);const input=getValue(block,['标准输入','输入','input']);const expected=getValue(block,['预期输出','输出','output','expected']);return input||expected?{input,expected}:null;}).filter(Boolean);}
function markdownTestCount(statement,cases){const matched=[...String(statement).matchAll(/(?:测试点(?:数|数量|个数)?|(?:测试点|测试用例)\s*总数)\s*[：:]?\s*(\d+)|(\d+)\s*(?:个)?测试点/g)];const declared=matched.reduce((max,item)=>Math.max(max,Number(item[1]||item[2])||0),0);return Math.max(1,declared,cases.length);}
function markdownSample(statement,label){const match=new RegExp('(?:^|\\n)\\s*#{1,6}\\s*'+label+'\\s*\\n\\s*```[^\\n]*\\n([\\s\\S]*?)\\n\\s*```','i').exec(statement);return match?match[1]:'';}
function parseMd(text){const score=Number((text.match(/每题\s*(\d+)\s*分/)||[])[1])||20;const found=[...text.matchAll(/^#{1,4}\s*(\d+)\s*[\.、．\s]+(.+?)\s*$/gm)];if(!found.length)throw Error('未发现“# 1001 题目名称”格式的标题');return found.map((m,i)=>{const begin=m.index+m[0].length,end=found[i+1]?found[i+1].index:text.length,rawStatement=text.slice(begin,end).trim(),testCases=markdownTestCases(rawStatement),statement=rawStatement.split(/^##\s+测试点\s*$/m)[0].replace(/^分数\s+\d+\s*$/m,'').trim();return{id:m[1],name:m[2].trim(),score:Number((rawStatement.match(/(?:分值|分数)\s*[：:]?\s*(\d+)\s*分?/)||[])[1])||score,tests:markdownTestCount(rawStatement,testCases),sampleInput:markdownSample(statement,'样例输入'),sampleOutput:markdownSample(statement,'样例输出'),testCases,statement};});}
async function importNumberedQuestions(event){
  const file=event.target.files[0];if(!file)return;
  try{
    const text=await file.text();let questions;
    if(/\.md$/i.test(file.name))questions=parseMd(text);
    else if(/\.json$/i.test(file.name)){const data=JSON.parse(text);questions=Array.isArray(data)?data:data.questions;}
    else throw Error('请使用 JSON 或 Markdown 导入');
    const isNewMock=config.category!=='past';
    const numbered=window.OMS_NUMBER_EXAM({...config,questions},[primaryConfig,...(window.OMS_EXAM_ARCHIVE||[])],{newBatch:isNewMock});
    // A new batch is new content, not a migration of an older question's draft.
    if(isNewMock)numbered.questions=numbered.questions.map(question=>({...question,legacyIds:[]}));
    persistActiveDraft();Object.assign(config,numbered);current=0;
    for(const key of Object.keys(results))delete results[key];
    loadCodeStores(config.examVersion);activeQuestionId=config.questions[current].id;
    render();restoreSavedCode();renderSettings();
    const tests=config.questions.reduce((total,q)=>total+(Number(q.tests)||0),0),configured=config.questions.reduce((total,q)=>total+(q.testCases||[]).length,0);
    $('#import-note').textContent=`已识别 ${config.questions.length} 道题，题号 ${config.questions[0].id}–${config.questions.at(-1).id}，${tests} 个测试点；其中 ${configured} 个已导入输入与预期输出。正式评测仍需同步服务端题库。`;
  }catch(error){$('#import-note').textContent='导入失败：'+error.message;}
  event.target.value='';
}
$('#overview-toggle').onclick=()=>{$('#pta-app').classList.toggle('overview-collapsed');const closed=$('#pta-app').classList.contains('overview-collapsed');$('#overview-toggle').textContent=closed?'▯':'▮';};$('#previous').onclick=()=>changeQuestion((current+config.questions.length-1)%config.questions.length);$('#next').onclick=()=>changeQuestion((current+1)%config.questions.length);function updateDraftState(){const saved=persistActiveDraft();$('#submit-state').textContent=saved?(hasUnsavedCode()?'草稿已自动保存':'当前代码与最近一次提交一致'):'草稿保存失败，请复制代码后重试';}window.addEventListener('oms-code-save-draft',updateDraftState);window.addEventListener('beforeunload',persistActiveDraft);document.querySelectorAll('.rail-button').forEach(button=>button.onclick=()=>route(button.dataset.route));$('#home-button').onclick=()=>route('home');code.oninput=()=>{lines();updateDraftState();};lines();document.querySelectorAll('[data-tab]').forEach(button=>button.onclick=()=>setTab(button.dataset.tab));$('#tester-toggle').onclick=()=>{const tester=$('#tester');tester.classList.toggle('collapsed');tester.classList.remove('expanded');syncTesterToggle();};syncTesterToggle();$('#reset-test').onclick=()=>{const q=config.questions[current],sample=q.testCases?.[0]||{input:q.sampleInput||'',expected:q.sampleOutput||''};$('#sample-input').value=sample.input||'';$('#expected').textContent=sample.expected||'';$('#run-state').textContent='等待运行';};$('#run-test').onclick=()=>judge('sample');$('#submit').onclick=()=>judge('submit');
const dialog=$('#admin-dialog'),form=$('#admin-form');$('#open-admin').onclick=()=>{for(const [key,value] of Object.entries(config))if(form.elements[key])form.elements[key].value=value;renderSettings();dialog.showModal();};dialog.querySelector('.close').onclick=()=>dialog.close();dialog.querySelector('.cancel').onclick=()=>dialog.close();$('#import-file').onchange=importNumberedQuestions;form.onsubmit=event=>{event.preventDefault();const data=new FormData(form);for(const key of ['title','duration','startAt','endAt','seat','candidateName','studentId','registered'])config[key]=key==='duration'||key==='registered'?Number(data.get(key)):data.get(key);const start=Date.parse(config.startAt),end=Date.parse(config.endAt);if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start){$('#import-note').textContent='结束时间必须晚于开始时间。';return;}config.duration=Math.round((end-start)/60000);document.querySelectorAll('.question-setting').forEach(row=>{const q=config.questions[Number(row.querySelector('[data-k="name"]').dataset.i)];q.name=row.querySelector('[data-k="name"]').value;q.score=Number(row.querySelector('[data-k="score"]').value)||1;q.tests=Number(row.querySelector('[data-k="tests"]').value)||1;});localStorage.setItem(STORAGE,JSON.stringify(config));current=Math.min(current,config.questions.length-1);dialog.close();render();updateCountdown();};render();route('info');updateCountdown();window.setInterval(updateCountdown,1000);
