const STORAGE = 'oms-pta-admin-config-v1';
const toLocalDateTime = date => new Date(date.getTime()-date.getTimezoneOffset()*60000).toISOString().slice(0,16);
const defaultExam=window.OMS_EXAM_DATA||{examVersion:'fallback-exam',title:'程序设计考试',duration:120,questions:[{id:'1001',name:'示例题目',score:20,tests:3}]};
const defaultStart = defaultExam.startAt?new Date(defaultExam.startAt):new Date(),defaultEnd=defaultExam.endAt?new Date(defaultExam.endAt):new Date(defaultStart.getTime()+(Number(defaultExam.duration)||120)*60*1000);
const fallback={...defaultExam,startAt:defaultExam.startAt||toLocalDateTime(defaultStart),endAt:defaultExam.endAt||toLocalDateTime(defaultEnd),seat:'PC-08',candidateName:'admin',studentId:'102500000',registered:48};
let config,saved={};try{saved=JSON.parse(localStorage.getItem(STORAGE)||'{}');config=saved.examVersion===fallback.examVersion?{...fallback,...saved}:{...fallback,seat:saved.seat||fallback.seat,candidateName:saved.candidateName||fallback.candidateName,studentId:saved.studentId||fallback.studentId,registered:saved.registered||fallback.registered};}catch{config={...fallback};}if(defaultExam.scheduleVersion&&saved.scheduleVersion!==defaultExam.scheduleVersion){config.startAt=fallback.startAt;config.endAt=fallback.endAt;config.duration=defaultExam.duration;config.scheduleVersion=defaultExam.scheduleVersion;localStorage.setItem(STORAGE,JSON.stringify(config));}if(config.candidateName==='陈小雅')config.candidateName=fallback.candidateName;if(config.studentId==='202401050128')config.studentId=fallback.studentId;if(!config.startAt)config.startAt=fallback.startAt;if(!config.endAt)config.endAt=fallback.endAt;if(!Array.isArray(config.questions)||!config.questions.length)config.questions=fallback.questions;const primaryExamVersion=fallback.examVersion;let primaryConfig=config;let current=0,activeRoute='info',submissionPending=false;const results={},scores={};const submissions=[],progressByExam=new Map();let progressOwner='';const code=document.querySelector('#code');
config.title=fallback.title;
config.questions=fallback.questions;primaryConfig=config;
if(config.studentId==='102505201')config.studentId=fallback.studentId;
if(window.OMS_NUMBER_EXAM){config=window.OMS_NUMBER_EXAM(config,[config,...(window.OMS_EXAM_ARCHIVE||[])]);primaryConfig=config;}
let portalUser=null,portalAuthenticated=false,portalCsrf='',pendingLoginRoute='home',portalAuthAvailable=false,portalRegistrationEnabled=true,portalAuthMessage='',routeRevision=0,portalSessionRevision=0,portalIdentityRevision=0,loadingCode=false;
let SUBMITTED_CODE_STORAGE='',DRAFT_CODE_STORAGE='',DRAFT_META_STORAGE='',submittedCodes={},draftCodes={},draftMeta={};
const draftSyncTimers=new Map(),draftSyncQueues=new Map();
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
  DRAFT_META_STORAGE=`oms-pta-draft-meta-${owner}-${examVersion}`;
  const questions=config.examVersion===examVersion?config.questions:[];
  submittedCodes=migrateQuestionCodes(readCodeMap(SUBMITTED_CODE_STORAGE),questions);
  draftCodes=migrateQuestionCodes(readCodeMap(DRAFT_CODE_STORAGE),questions);
  draftMeta=migrateQuestionCodes(readCodeMap(DRAFT_META_STORAGE),questions);
  try{localStorage.setItem(SUBMITTED_CODE_STORAGE,JSON.stringify(submittedCodes));localStorage.setItem(DRAFT_CODE_STORAGE,JSON.stringify(draftCodes));localStorage.setItem(DRAFT_META_STORAGE,JSON.stringify(draftMeta));}catch{/* Keep readable drafts in memory if storage is full. */}
}
loadCodeStores(config.examVersion);function submittedCodeForQuestion(questionId){return Object.prototype.hasOwnProperty.call(submittedCodes,questionId)?submittedCodes[questionId]:'';}function codeForQuestion(questionId){return Object.prototype.hasOwnProperty.call(draftCodes,questionId)?draftCodes[questionId]:submittedCodeForQuestion(questionId);}let activeQuestionId=config.questions[current].id;let loadedCode=submittedCodeForQuestion(activeQuestionId);code.value=codeForQuestion(activeQuestionId);
const $=s=>document.querySelector(s);const escape=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function lines(){ $('#lines').textContent=Array.from({length:Math.max(18,code.value.split('\n').length)},(_,i)=>i+1).join('\n'); }
function renderTexFragment(value){let rendered=value.replace(/\\sum\s*_\{([^{}]*)\}\s*\^\{([^{}]*)\}/g,(_,lower,upper)=>`<span class="math-sum"><span class="math-upper">${renderTexFragment(upper)}</span><span class="math-symbol">∑</span><span class="math-lower">${renderTexFragment(lower)}</span></span>`).replace(/\\(?:texttt|mathtt)\{([^{}]*)\}/g,'<code>$1</code>').replace(/\\mathrm\{([^{}]*)\}/g,'$1').replace(/\\boldsymbol\{([^{}]*)\}/g,'<strong>$1</strong>').replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g,'<span style="white-space:nowrap"><sup>$1</sup>&frasl;<sub>$2</sub></span>').replace(/\^\{([^{}]+)\}/g,'<sup>$1</sup>').replace(/_\{([^{}]+)\}/g,'<sub>$1</sub>').replace(/\^([a-zA-Z0-9])/g,'<sup>$1</sup>').replace(/_([a-zA-Z0-9])/g,'<sub>$1</sub>');const symbols={cdots:'⋯',dots:'…',dagger:'†',sim:'∼',leq:'≤',le:'≤',geq:'≥',neq:'≠',times:'×',to:'→',leftarrow:'←',pm:'±',land:'∧',oplus:'⊕',lceil:'⌈',rceil:'⌉',sum:'∑',infty:'∞',max:'max',min:'min',left:'',right:'',quad:'  '};rendered=rendered.replace(/\\([a-zA-Z]+)\b/g,(_,command)=>symbols[command]??command).replace(/[{}]/g,'');return rendered;}
function inlineMarkdown(text){
  const fragments=[];
  const hold=html=>{const key=`OMSINLINE${fragments.length}TOKEN`;fragments.push(html);return key;};
  let html=escape(text).replace(/`([^`]+)`/g,(_,code)=>hold(`<code>${code}</code>`));
  html=html.replace(/\$\$([^$\n]+)\$\$|\$([^$\n]+)\$|\\\(([^\n]*?)\\\)/g,(_,doubleDollar,dollar,paren)=>{
    const formula=doubleDollar??dollar??paren;
    const color=formula.match(/^\s*\{?\s*\\color\{(green|red|purple|orange|blue)\}\s*([\s\S]*?)\s*\}?\s*$/i);
    if(color){const palette={green:'#4ade80',red:'#f87171',purple:'#c084fc',orange:'#fb923c',blue:'#60a5fa'};return hold(`<span style="color:${palette[color[1].toLowerCase()]}">${renderTexFragment(color[2])}</span>`);}
    return hold(`<span class="inline-math">${renderTexFragment(formula)}</span>`);
  });
  html=html.replace(/&lt;span\s+style\s*=\s*(?:&quot;\s*color\s*:\s*#039ced\s*;?\s*&quot;|&#39;\s*color\s*:\s*#039ced\s*;?\s*&#39;)\s*&gt;([\s\S]*?)&lt;\/span\s*&gt;/gi,'<span style="color:#039CED">$1</span>').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/__([^_]+)__/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/_([^_]+)_/g,'<em>$1</em>');
  return html.replace(/OMSINLINE(\d+)TOKEN/g,(_,index)=>fragments[index]??_);
}
function highlightCpp(source){
  source=String(source);
  const keywords=new Set('using namespace return for while if else switch case break continue struct class public private protected const auto typedef template typename static inline new delete try catch throw sizeof true false nullptr do enum virtual override'.split(' '));
  const types=new Set('int long double float char bool void short unsigned signed string vector map unordered_map unordered_set set pair queue deque stack size_t'.split(' '));
  const tokens=/\/\*[\s\S]*?(?:\*\/|$)|\/\/[^\n]*|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|^\s*#\s*[a-zA-Z_]+|\b(?:0[xX][\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)[uUlLfF]*\b|\b[a-zA-Z_]\w*\b/gm;
  let html='',offset=0;
  for(const match of source.matchAll(tokens)){
    const token=match[0];
    let kind='';
    if(token.startsWith('//')||token.startsWith('/*'))kind='comment';
    else if(/^["']/.test(token))kind='str';
    else if(/^\s*#/.test(token))kind='pp';
    else if(/^\d/.test(token))kind='num';
    else if(keywords.has(token))kind='key';
    else if(types.has(token))kind='type';
    else if(/^\s*\(/.test(source.slice(match.index+token.length)))kind='fn';
    html+=escape(source.slice(offset,match.index));
    html+=kind?`<span class="${kind}">${escape(token)}</span>`:escape(token);
    offset=match.index+token.length;
  }
  return html+escape(source.slice(offset));
}
function markdownToHtml(source){
  const lines=String(source).replace(/\r\n?/g,'\n').split('\n');
  let html='',inCode=false,codeLanguage='',codeLines=[],list='',paragraph=[];
  const closeParagraph=()=>{if(paragraph.length){html+=`<p>${paragraph.join('<br>')}</p>`;paragraph=[];}};
  const closeList=()=>{if(list){html+=`</${list}>`;list='';}};
  const closeCode=()=>{
    const source=codeLines.join('\n')+(codeLines.length?'\n':'');
    const cpp=/^(cpp|c\+\+|c|cc|cxx)$/i.test(codeLanguage);
    const highlighted=cpp;
    const attributes=codeLanguage?` class="language-${escape(codeLanguage)}${highlighted?' rendered-code':''}"`:'';
    html+=`<pre><code${attributes}>${highlighted?highlightCpp(source):escape(source)}</code></pre>`;
    inCode=false;codeLines=[];
  };
  const cells=line=>line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim());
  const divider=line=>/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  for(let index=0;index<lines.length;index++){
    const raw=lines[index],line=raw.trimEnd();
    if(/^```/.test(line)){
      closeParagraph();closeList();
      if(inCode)closeCode();else{inCode=true;codeLanguage=line.slice(3).trim().split(/\s+/)[0];}
      continue;
    }
    if(inCode){codeLines.push(raw);continue;}
    const display=line.trim().match(/^(\\\[|\$\$)(.*)$/);
    if(display){
      closeParagraph();closeList();
      const delimiter=display[1]==='$$'?'$$':'\\]';
      let formula=display[2],end=formula.indexOf(delimiter);
      while(end<0&&index+1<lines.length){formula+='\n'+lines[++index];end=formula.indexOf(delimiter);}
      const tail=end>=0?formula.slice(end+delimiter.length):'';
      if(end>=0)formula=formula.slice(0,end);
      html+=`<div class="math-display" role="math"><span class="math-expression">${renderTexFragment(escape(formula.trim()))}</span></div>`;
      if(tail.trim())paragraph.push(inlineMarkdown(tail));
      continue;
    }
    if(line.includes('|')&&index+1<lines.length&&divider(lines[index+1])){closeParagraph();closeList();const header=cells(line);html+='<table><thead><tr>'+header.map(cell=>`<th>${inlineMarkdown(cell)}</th>`).join('')+'</tr></thead><tbody>';index+=2;while(index<lines.length&&lines[index].trim()&&lines[index].includes('|')&&!divider(lines[index])){html+='<tr>'+cells(lines[index]).map(cell=>`<td>${inlineMarkdown(cell)}</td>`).join('')+'</tr>';index++;}html+='</tbody></table>';index--;continue;}
    if(!line.trim()){closeParagraph();closeList();continue;}
    if(/^([-*_])\1\1+\s*$/.test(line)){closeParagraph();closeList();html+='<hr>';continue;}
    const heading=line.match(/^(#{1,6})\s+(.+)$/);
    if(heading){closeParagraph();closeList();const level=Math.min(3,heading[1].length+1);html+=`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;continue;}
    const item=line.match(/^[-*+]\s+(.+)$/),ordered=line.match(/^\d+[.)]\s+(.+)$/);
    if(item||ordered){closeParagraph();const type=item?'ul':'ol';if(list&&list!==type)closeList();if(!list){html+=`<${type}>`;list=type;}html+=`<li>${inlineMarkdown((item||ordered)[1])}</li>`;continue;}
    if(/^>\s?/.test(line)){closeParagraph();closeList();html+=`<blockquote><p>${inlineMarkdown(line.replace(/^>\s?/,''))}</p></blockquote>`;continue;}
    closeList();paragraph.push(inlineMarkdown(line));
  }
  closeParagraph();closeList();if(inCode)closeCode();return html;
}
function sampleBlock(kind,value){const rows=String(value||'').split('\n');return `<div class="sample-block"><div class="sample-toolbar"><span>[ ${kind} ]</span><div><button type="button">复制内容</button><button type="button">格式</button><button type="button">全屏</button></div></div><div class="sample-rows">${rows.map((row,index)=>`<div><span>${index+1}</span><code>${escape(row)||' '}</code></div>`).join('')}</div></div>`;}
function resourceLimits(){return `<section class="problem-limits" aria-label="资源限制"><div><span>代码长度限制</span><b>16 KB</b></div><div><span>时间限制</span><b>250 ms</b></div><div><span>内存限制</span><b>64 MB</b></div><div><span>栈限制</span><b>8192 KB</b></div></section>`;}
function enhanceStatementSamples(text,q){let html=markdownToHtml(text);const replaceSample=(label,kind,value)=>{if(!value)return;const heading=`(<h[2-4]>${label}[：:]?</h[2-4]>)`,block='<pre><code(?:\\s[^>]*)?>[\\s\\S]*?</code></pre>';html=html.replace(new RegExp(`${heading}\\s*${block}`),`$1${sampleBlock(kind,value)}`);};replaceSample('样例输入','in',q.sampleInput||markdownSample(text,'样例输入'));replaceSample('样例输出','out',q.sampleOutput||markdownSample(text,'样例输出'));return html;}
function cleanStatementDecoration(text){return String(text||'').replace(/^[ \t]*\[【原题配图 photo1\.png：HTML 未附图像文件，点此查看原题】\]\([^)]+\)[ \t]*(?:\r?\n|$)/gmi,'FZUTRIANGLEFIGUREMARKER\n').replace(/^[ \t]*(?:\*\*原题\*\*|原题)\s*[:：]\s*\[FZU Online Judge\]\([^)]+\)(?=[^\r\n]*(?:时间|time))(?=[^\r\n]*(?:内存|memory))[^\r\n]*(?:\r?\n|$)/gmi,'').replace(/(^|\r?\n)[ \t]*(?:\*\*)?(?:原题链接|题型|题目类型|时间限制|内存限制)[：:](?:\*\*)?[\s\S]*?(?=\r?\n[ \t]*\r?\n|$)/gi,'$1').replace(/^[ \t]*\[?【原题配图[^\r\n]*HTML 未附图像文件[^\r\n]*】\]?(?:\([^)]+\))?[ \t]*(?:\r?\n|$)/gmi,'').replace(/\n{3,}/g,'\n\n').trim();}
function formatStatement(text,q){const limits=resourceLimits();if(!text)return `<div class="rendered-markdown problem-copy"><p>请根据题目要求完成程序。提交后，AI 助教将检查程序逻辑、边界条件和代码风格。</p><h3>输入格式：</h3><p>输入数据由题目给定。</p><h3>输出格式：</h3><p>按题目要求输出计算结果。</p><h3>输入样例：</h3>${sampleBlock('in',q.sampleInput||'100311')}<h3>输出样例：</h3>${sampleBlock('out',q.sampleOutput||'0:2\n1:3\n3:1')}${limits}</div>`;const statementHtml=enhanceStatementSamples(cleanStatementDecoration(text),q).replaceAll('FZUTRIANGLEFIGUREMARKER','<img src="./src/client/assets/fzu-triangle-lattice.svg" alt="n = 4 时的三角形网格示意图" style="display:block;max-width:100%;height:auto;margin:12px auto">');return `<div class="rendered-markdown problem-copy">${statementHtml}${limits}</div>`;}
function statusGlyph(status,label){if(status==='accepted')return '<svg viewBox="0 0 24 24" aria-label="答案正确"><path d="m5.5 12.5 4.1 4.1L18.5 7.5"/></svg>';if(status==='wrong')return '<svg viewBox="0 0 24 24" aria-label="答案错误"><path d="m8 8 8 8M16 8l-8 8"/></svg>';return label;}
function updateCountdown(){const timestamp=value=>{const text=String(value||'').trim().replace(' ','T');return Date.parse(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/.test(text)?`${text}+08:00`:text);};const practice=config.category==='practice',start=timestamp(config.startAt),end=timestamp(config.endAt),now=Date.now(),remain=$('.remain'),archived=config.category==='past'||practice,invalid=!archived&&(!Number.isFinite(start)||!Number.isFinite(end)||end<=start),beforeStart=!archived&&now<start,displayEnded=!practice&&(archived||now>=end),judgeable=config.questions[current]?.judgeable!==false;let milliseconds=archived||invalid?0:Math.max(0,beforeStart?start-now:end-now);const seconds=Math.floor(milliseconds/1000),hours=String(Math.floor(seconds/3600)).padStart(2,'0'),minutes=String(Math.floor(seconds%3600/60)).padStart(2,'0'),secs=String(seconds%60).padStart(2,'0');$('#countdown-label').textContent=practice?'不限时':invalid?'时间异常':beforeStart?'距开始':displayEnded?'已结束':'剩余';$('#countdown').textContent=`${hours}:${minutes}:${secs}`;remain.classList.toggle('warning',!archived&&!displayEnded&&!invalid&&milliseconds<=5*60*1000);remain.classList.toggle('expired',displayEnded);$('#submit').disabled=invalid||beforeStart||!judgeable||submissionPending;$('#run-test').disabled=invalid||beforeStart||!judgeable||submissionPending;if(!judgeable)$('#submit-state').textContent=config.questions[current]?.unjudgeableReason||'题面资料不完整，暂不支持评测';else if(invalid)$('#submit-state').textContent='考试时间配置无效';else if(beforeStart)$('#submit-state').textContent='考试尚未开始';else if(displayEnded)$('#submit-state').textContent='考试已结束，可继续运行和提交';}
function editorCode(){return window.omsCodeEditor?.getValue?.()??code.value;}
function updateDraftCloudRevision(snapshot,cloudUpdatedAt){
  const stored=readCodeMap(snapshot.metaStorage),entry=stored[snapshot.problemId]||{};
  stored[snapshot.problemId]={...entry,cloudUpdatedAt};
  try{localStorage.setItem(snapshot.metaStorage,JSON.stringify(stored));}catch{}
  if(DRAFT_META_STORAGE===snapshot.metaStorage)draftMeta=stored;
}
async function syncDraftSnapshot(snapshot){
  if(!portalAuthenticated||portalUser?.id!==snapshot.owner)return false;
  try{
    const result=await portalRequest('/api/drafts',{examVersion:snapshot.examVersion,problemId:snapshot.problemId,code:snapshot.source,language:snapshot.language,baseUpdatedAt:snapshot.baseUpdatedAt});
    if(!portalAuthenticated||portalUser?.id!==snapshot.owner)return false;
    updateDraftCloudRevision(snapshot,result.draft.updatedAt);
    if(config.examVersion===snapshot.examVersion&&activeQuestionId===snapshot.problemId&&Number(draftMeta[snapshot.problemId]?.updatedAt)===snapshot.localUpdatedAt)$('#submit-state').textContent='草稿已长期保存';
    return true;
  }catch(failure){
    if(failure.status===409&&failure.payload?.draft?.updatedAt)updateDraftCloudRevision(snapshot,failure.payload.draft.updatedAt);
    if(config.examVersion===snapshot.examVersion&&activeQuestionId===snapshot.problemId)$('#submit-state').textContent=failure.status===409?'云端已有更新，本地草稿仍保留':'本地草稿已保存，云端同步待重试';
    return false;
  }
}
function scheduleDraftSync(questionId,source,localUpdatedAt,delay=900){
  if(!portalAuthenticated||!portalUser||!questionId)return;
  const owner=portalUser.id,examVersion=config.examVersion,key=`${owner}:${examVersion}:${questionId}`,metaStorage=DRAFT_META_STORAGE;
  clearTimeout(draftSyncTimers.get(key));
  const snapshot={owner,examVersion,problemId:questionId,source,language:$('#language')?.value||'',localUpdatedAt,metaStorage};
  draftSyncTimers.set(key,setTimeout(()=>{
    draftSyncTimers.delete(key);
    const previous=draftSyncQueues.get(key)||Promise.resolve();
    const queued=previous.then(()=>{
      const latestMeta=readCodeMap(metaStorage)[questionId]||{};
      return syncDraftSnapshot({...snapshot,baseUpdatedAt:latestMeta.cloudUpdatedAt||null});
    });
    draftSyncQueues.set(key,queued);
    queued.finally(()=>{if(draftSyncQueues.get(key)===queued)draftSyncQueues.delete(key);});
  },delay));
}
function saveDraftCode(questionId,source,{sync=true,updatedAt}={}){
  if(!questionId)return false;
  const language=$('#language')?.value||'',previous=draftMeta[questionId]||{},changed=draftCodes[questionId]!==source||previous.language!==language||!Number(previous.updatedAt);
  const localUpdatedAt=Number(updatedAt)||Number(previous.updatedAt)||(changed?Date.now():0);
  draftCodes[questionId]=source;draftMeta[questionId]={...previous,updatedAt:localUpdatedAt,language};
  try{localStorage.setItem(DRAFT_CODE_STORAGE,JSON.stringify(draftCodes));localStorage.setItem(DRAFT_META_STORAGE,JSON.stringify(draftMeta));if(sync&&changed)scheduleDraftSync(questionId,source,localUpdatedAt);return true;}catch{return false;}
}
function persistActiveDraft(){if(loadingCode)return false;return saveDraftCode(activeQuestionId,editorCode());}
function saveSubmittedCode(questionId,source){if(!questionId)return;submittedCodes[questionId]=source;try{localStorage.setItem(SUBMITTED_CODE_STORAGE,JSON.stringify(submittedCodes));}catch{}saveDraftCode(questionId,source);}
function hasUnsavedCode(){return editorCode()!==loadedCode;}
function loadCode(source){loadingCode=true;try{code.value=source;code.dispatchEvent(new Event('input',{bubbles:true}));}finally{loadingCode=false;}lines();requestAnimationFrame(()=>document.querySelectorAll('.editor .cm-scroller,.editor textarea').forEach(scroller=>{scroller.scrollLeft=0;}));}
function restoreSavedCode(){const source=codeForQuestion(activeQuestionId),language=draftMeta[activeQuestionId]?.language;loadedCode=submittedCodeForQuestion(activeQuestionId);if(language&&[...$('#language').options].some(option=>option.value===language))$('#language').value=language;loadCode(source);}
function changeQuestion(index){if(index===current)return;persistActiveDraft();current=index;activeQuestionId=config.questions[current].id;render();restoreSavedCode();}
function activateExam(examVersion,questionIndex=0){
  const archive=window.OMS_EXAM_ARCHIVE||[];
  const exam=examVersion===primaryExamVersion?primaryConfig:[...archive,...(window.OMS_PRACTICE_EXAMS||[])].find(item=>item.examVersion===examVersion);
  if(!exam)return false;
  const target=Math.max(0,Math.min(Number(questionIndex)||0,exam.questions.length-1));
  if(config.examVersion===exam.examVersion){changeQuestion(target);return current===target;}
  const identity={seat:primaryConfig.seat,candidateName:primaryConfig.candidateName,studentId:primaryConfig.studentId};
  persistActiveDraft();config={...exam,...identity,registered:exam.registered??exam.participants??primaryConfig.registered};current=target;loadCodeStores(config.examVersion);activeQuestionId=config.questions[current].id;applyPersistedProgress(config.examVersion);mergePersistedDrafts(config.examVersion);restoreSavedCode();updateCountdown();return true;
}
function renderOmsClientChrome(routeName=activeRoute){const question=config.questions?.[current],student=$('#oms-client-student-session'),name=$('#oms-client-name-session'),seat=$('#oms-client-seat-session'),user=$('#oms-client-user-session'),avatar=$('#oms-client-user-avatar'),address=$('#oms-client-address');if(student)student.textContent=config.studentId||'—';if(name)name.textContent=config.candidateName||'—';if(seat)seat.textContent=config.seat||'—';const displayUser=portalUser?.username||config.studentId||'未登录',displayName=portalUser?.nickname||portalUser?.username||config.candidateName||'U';if(user)user.textContent=displayUser;if(avatar)avatar.textContent=String(displayName).trim().slice(0,1).toUpperCase()||'U';if(address)address.value=`${location.origin}/#${routeName||'home'}${routeName==='exam'&&question?`-${question.id}`:''}`;}
const OMS_CONTENT_ZOOM_KEY='oms-pta-content-zoom',OMS_CONTENT_ZOOM_MIN=.8,OMS_CONTENT_ZOOM_MAX=1.5,OMS_CONTENT_ZOOM_STEP=.1;
let omsContentZoom=Math.min(OMS_CONTENT_ZOOM_MAX,Math.max(OMS_CONTENT_ZOOM_MIN,Number(localStorage.getItem(OMS_CONTENT_ZOOM_KEY))||1));
function applyOmsContentZoom(next=omsContentZoom){const target=$('#pta-app');if(!target)return;omsContentZoom=Math.round(Math.min(OMS_CONTENT_ZOOM_MAX,Math.max(OMS_CONTENT_ZOOM_MIN,next))*10)/10;const chromeHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--oms-client-chrome-height'))||0,viewportWidth=window.innerWidth||document.documentElement.clientWidth,scrollbarAllowance=Math.max(20,Math.abs(viewportWidth-document.documentElement.clientWidth)+2);target.style.transform='';target.style.transformOrigin='';target.style.zoom=String(omsContentZoom);target.style.width=`${100/omsContentZoom}%`;target.style.height=`${Math.max(0,window.innerHeight-chromeHeight)/omsContentZoom}px`;if(Math.abs(target.getBoundingClientRect().width-viewportWidth)>scrollbarAllowance){target.style.zoom='1';target.style.transformOrigin='top left';target.style.transform=`scale(${omsContentZoom})`;}localStorage.setItem(OMS_CONTENT_ZOOM_KEY,String(omsContentZoom));const percent=Math.round(omsContentZoom*100),zoomIn=$('#oms-client-zoom-in'),zoomOut=$('#oms-client-zoom-out');if(zoomIn){zoomIn.disabled=omsContentZoom>=OMS_CONTENT_ZOOM_MAX;zoomIn.title=`放大页面（当前 ${percent}%）`;zoomIn.setAttribute('aria-label',zoomIn.title);}if(zoomOut){zoomOut.disabled=omsContentZoom<=OMS_CONTENT_ZOOM_MIN;zoomOut.title=`缩小页面（当前 ${percent}%）`;zoomOut.setAttribute('aria-label',zoomOut.title);}}
function initOmsClientChrome(){const back=$('#oms-client-back'),forward=$('#oms-client-forward'),refresh=$('#oms-client-refresh'),zoomIn=$('#oms-client-zoom-in'),zoomOut=$('#oms-client-zoom-out');if(back)back.onclick=exitDefaultFullscreen;if(forward)forward.onclick=enterDefaultFullscreen;if(refresh)refresh.onclick=()=>location.reload();if(zoomIn)zoomIn.onclick=()=>applyOmsContentZoom(omsContentZoom+OMS_CONTENT_ZOOM_STEP);if(zoomOut)zoomOut.onclick=()=>applyOmsContentZoom(omsContentZoom-OMS_CONTENT_ZOOM_STEP);applyOmsContentZoom();window.addEventListener('resize',()=>applyOmsContentZoom());['fullscreenchange','webkitfullscreenchange','MSFullscreenChange'].forEach(name=>document.addEventListener(name,handleFullscreenChange));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.documentElement.classList.contains('oms-fullscreen-fallback'))exitDefaultFullscreen();});renderOmsClientChrome();}
function render(){const q=config.questions[current],sample=q.testCases?.[0]||{input:q.sampleInput||'',expected:q.sampleOutput||''};$('#exam-name').textContent=config.title;$('#seat').textContent=config.seat;$('#candidate').textContent=config.candidateName;$('#student-id').textContent=config.studentId;$('#bar-title').textContent=`${q.id} ${q.name}`;$('#problem-title').textContent=`${q.id} ${q.name}`;$('#score').textContent=`分数 ${q.score}`;$('#problem-text').innerHTML=formatStatement(q.statement,q);$('#sample-input').value=sample.input||'';$('#expected').textContent=sample.expected||'';const complete=Object.keys(results).length;$('#answer-count').textContent=`${complete} / ${config.questions.length}`;$('#question-grid').innerHTML=config.questions.map((item,index)=>`<button class="${results[index]||''} ${index===current?'current':''}" data-i="${index}" title="${escape(item.id)} ${escape(item.name)}">${statusGlyph(results[index],escape(item.id))}</button>`).join('');document.querySelectorAll('#question-grid button').forEach(button=>button.onclick=()=>changeQuestion(Number(button.dataset.i)));renderOmsClientChrome();updateCountdown();}
  function renderPortalSubmissions(filters={},page=0){
   const pageSize=20,query=value=>String(value||'').trim().toLowerCase();
   const examConfigs=[primaryConfig,...(window.OMS_EXAM_ARCHIVE||[]),...(window.OMS_PRACTICE_EXAMS||[]),config];
   const examsByVersion=new Map(examConfigs.filter(exam=>exam?.examVersion).map(exam=>[exam.examVersion,exam]));
   const allSubmissions=[...progressByExam.entries()].flatMap(([examVersion,progress])=>(Array.isArray(progress.submissions)?progress.submissions:[]).map(item=>({
     ...item,examVersion:item.examVersion||examVersion,contestId:item.examVersion||examVersion,
     contestTitle:examsByVersion.get(item.examVersion||examVersion)?.title||item.contestTitle||item.examVersion||examVersion,
     candidateId:portalUser?.username||item.candidateId||config.studentId,
     candidate:portalUser?.nickname||item.candidate||portalUser?.username||config.candidateName,
     verdict:storedVerdictLabel(item)
   }))).sort((a,b)=>(Date.parse(b.createdAt||'')||0)-(Date.parse(a.createdAt||'')||0));
   const examFor=item=>examsByVersion.get(item.examVersion||item.contestId)||config;
   const filtered=allSubmissions.filter(item=>{
     const exam=examFor(item),questions=exam.questions||[];
     const question=questions.find(candidate=>String(candidate.id)===String(item.problemId)),index=question?questions.indexOf(question):-1;
     const problem=`${item.problemId} ${index>=0?index+1:''} ${question?.name||''}`.toLowerCase();
     const submitter=`${item.candidateId||config.studentId||''} ${item.candidate||config.candidateName||''}`.toLowerCase();
     const contest=`${item.contestId||config.examVersion||''} ${item.contestTitle||config.title||''}`.toLowerCase();
     return (!query(filters.user)||submitter.includes(query(filters.user)))&&(!query(filters.problem)||problem.includes(query(filters.problem)))&&(!query(filters.contest)||contest.includes(query(filters.contest)))&&(!filters.status||item.verdict===filters.status)&&(!filters.language||item.language===filters.language);
   });
   const pageCount=Math.max(1,Math.ceil(filtered.length/pageSize)),safePage=Math.min(Math.max(0,page),pageCount-1),items=filtered.slice(safePage*pageSize,(safePage+1)*pageSize);
   const rows=items.map(item=>{
     const questions=examFor(item).questions||[],index=questions.findIndex(question=>String(question.id)===String(item.problemId)),question=index>=0?questions[index]:null;
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
function examHasEnded(){return contestStatus()==='已结束';}
function syncSolutionNavigation(){const button=document.querySelector('.rail-button[data-route="solutions"]');if(button)button.hidden=!examHasEnded();}
function lastSubmissionFor(question){return submissions.find(item=>item.problemId===question.id);}
function renderContestQuestionTable(){const rows=config.questions.map((question,index)=>{const last=lastSubmissionFor(question),status=question.judgeable===false?'暂不可评测':results[index]==='accepted'?'答案正确':results[index]==='partial'?'部分正确':results[index]==='wrong'?'答案错误':'未提交',tone=results[index]||'pending';return `<button type="button" class="contest-question-row" data-question-open="${index}"><span class="${tone}">${status}</span><span>${last?escape(last.time):'—'}</span><strong>${escape(question.id)} ${escape(question.name)}</strong><em>${scoreForQuestion(question,index)} / ${Number(question.score)||0}</em></button>`;}).join('');return `<section class="contest-question-table"><header><h2>题目列表</h2></header><div class="contest-question-columns"><span>状态</span><span>上次递交</span><span>题目</span><span>分值</span></div>${rows}</section>`;}
function scoreForQuestion(question,index){const earned=Number(scores[index]);return Number.isFinite(earned)?Math.max(0,Math.min(Number(question.score)||0,earned)):(results[index]==='accepted'?Number(question.score)||0:0);}
function renderExamInfo(){
  const total=config.questions.reduce((sum,question)=>sum+(Number(question.score)||0),0);
  const title=String(config.title||'').replace(/^已结束\s*/, '');
  const setterLabel=config.setter?.label?escape(config.setter.label):'';
  const metadataIdentity=setterLabel||escape(config.candidateName);
  const participantCount=examParticipantCount(config);
  const contestType=escape(contestRuleLabel(config.contestType||'程序设计'));
  return `<section class="contest-overview"><div class="contest-heading"><span class="contest-status">${contestStatus()}</span><div><h1>${escape(title)}</h1><p><span>${portalIcon('award')}${contestType}</span><span>${portalIcon('calendar')}${formatExamTime(config.startAt)}</span><span>${portalIcon('clock')}${formatDuration(config.duration)}</span><span>${portalIcon('users')}${participantCount} 人</span><span>${portalIcon('user')}${metadataIdentity}</span></p></div></div><div class="contest-home-layout"><main class="contest-home-main"><section class="contest-intro"><h2>比赛介绍</h2><p>Let's go!</p></section>${renderContestQuestionTable()}</main><aside class="contest-facts"><h2>比赛信息</h2><dl><div><dt>状态</dt><dd>${contestStatus()}</dd></div><div><dt>规则</dt><dd>${escape(contestRuleLabel(config.contestType||'OI'))}</dd></div><div><dt>题数</dt><dd>${config.questions.length}</dd></div><div><dt>开始</dt><dd>${formatExamTime(config.startAt)}</dd></div><div><dt>结束</dt><dd>${formatExamTime(config.endAt)}</dd></div><div><dt>限时</dt><dd>${formatDuration(config.duration)}</dd></div><div><dt>人数</dt><dd>${participantCount}</dd></div><div><dt>所有者</dt><dd>${escape(config.candidateName)}</dd></div>${setterLabel?`<div><dt>命题人</dt><dd>${setterLabel}</dd></div>`:''}<div><dt>总分</dt><dd>${total} 分</dd></div></dl></aside></div></section>`;
}
function renderSolutions(){
  const items=config.questions.map((question,index)=>{
    const content=[question.solution,question.editorial,question.analysis].find(value=>typeof value==='string'&&value.trim());
    return `<article class="solution-card"><header><span>${index+1}</span><div><h2>${escape(question.id)} ${escape(question.name)}</h2><p>${Number(question.score)||0} 分</p></div></header>${content?`<div class="rendered-markdown solution-copy">${markdownToHtml(content)}</div>`:'<p class="solution-empty">题解暂未发布</p>'}</article>`;
  }).join('');
  return `<section class="solution-page"><header class="solution-heading"><div><h1>题解</h1><p>考试结束后可查看本场题解。</p></div><span>${config.questions.length} 道题</span></header><div class="solution-list">${items}</div></section>`;
}
function portalExamStatus(exam){const now=Date.now(),start=Date.parse(exam.startAt),end=Date.parse(exam.endAt);if(exam.category==='past'||(Number.isFinite(end)&&now>=end))return '已结束';if(Number.isFinite(start)&&now<start)return '未开始';return '进行中';}
function contestRuleOf(exam){return exam.rule||exam.type||exam.contestType||'OI';}
function contestRuleLabel(rule){const value=String(rule||'');return value.trim().toUpperCase()==='OI'?'IOI':value;}
function portalDuration(value){const minutes=Number(value)||0;if(!minutes)return '未记录';if(minutes%60===0)return `${minutes/60} 小时`;return `${minutes} 分钟`;}
const publishedWeeklyPracticeScores={
  examVersion:'2026-10-11-second-stage-weekly-practice-2',
  participantCount:6,
  rows:[
    {userId:'102500000',userName:'ciena',total:400,scores:null}
  ]
};
function examParticipantCount(exam){if(exam.examVersion===publishedWeeklyPracticeScores.examVersion)return publishedWeeklyPracticeScores.participantCount;const value=Number(exam.registered??exam.participants);return Number.isFinite(value)&&value>=0?value:1;}
const PORTAL_ICONS={home:'<path d="M3.5 11.2 12 4l8.5 7.2"/><path d="M5.5 9.8V20h13V9.8M9.5 20v-6h5v6"/>',problems:'<rect x="5" y="3.5" width="14" height="17" rx="1.8"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4.5"/>',training:'<path d="M5 4.5h14v15H5zM8 8h8M8 12h8M8 16h5"/>',contest:'<path d="M8 4h8v3.5a4 4 0 0 1-8 0zM12 11.5V16M8.5 20h7M9 16h6"/><path d="M8 6H4.5v1.5A3.5 3.5 0 0 0 8 11M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11"/>',assignment:'<path d="M8 5h11v16H5V8z"/><path d="M8 5v3H5M9 12h6M9 16h6"/>',judge:'<path d="M8.5 6.5H20M8.5 12H20M8.5 17.5H20"/><path d="m3.5 6.5 1.3 1.3 2.3-2.6M3.5 12l1.3 1.3 2.3-2.6M3.5 17.5l1.3 1.3 2.3-2.6"/>',advice:'<path d="M9 18h6M10 21h4M8.5 14.5A6 6 0 1 1 15.5 14.5C14.5 15.3 14 16.1 14 18h-4c0-1.9-.5-2.7-1.5-3.5Z"/>',theme:'<path d="M20 15.2A8.4 8.4 0 0 1 8.8 4a8.4 8.4 0 1 0 11.2 11.2Z"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 10.5V17M12 7.2h.01"/>',panel:'<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8.5 3.5v17M11.5 8h5M11.5 12h5M11.5 16h3"/>',calendar:'<rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M7.5 3v5M16.5 3v5M3.5 10h17"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',users:'<path d="M8.5 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6 6 0 0 1 12 0M16 12a3 3 0 1 0 0-6M16 14a5.5 5.5 0 0 1 5.5 5.5"/>',award:'<circle cx="12" cy="9" r="5"/><path d="m9 13-1 8 4-2 4 2-1-8"/>',arrow:'<path d="m9 5 7 7-7 7"/>',chevron:'<path d="m7 14 5-5 5 5"/>'};
PORTAL_ICONS.user='<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>';
function portalIcon(name){return `<svg class="portal-icon" viewBox="0 0 24 24" aria-hidden="true">${PORTAL_ICONS[name]||''}</svg>`;}
function renderPortalHome(){
  const archive=window.OMS_EXAM_ARCHIVE||[],exams=[primaryConfig,...archive].filter((exam,index,list)=>list.findIndex(item=>item.examVersion===exam.examVersion)===index).sort((a,b)=>Date.parse(b.startAt||b.date||0)-Date.parse(a.startAt||a.date||0));
  const contests=exams.slice(0,5).map(exam=>{const status=portalExamStatus(exam);return `<button type="button" class="portal-contest" data-portal-exam="${escape(exam.examVersion)}"><span class="portal-status ${status==='进行中'?'running':status==='未开始'?'pending':'ended'}">${status}</span><span class="portal-contest-copy"><b>${escape(exam.title)}</b><small><span>${portalIcon('award')}${escape(contestRuleLabel(contestRuleOf(exam)))}</span><span>${portalIcon('calendar')}${formatExamTime(exam.startAt||exam.date)}</span><span>${portalIcon('clock')}${portalDuration(exam.duration)}</span><span>${portalIcon('users')}${examParticipantCount(exam)}</span></small></span><span class="portal-arrow">${portalIcon('arrow')}</span></button>`;}).join('');
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
  const activeNavRoute=activePage==='problemset'?'problems':activePage==='practice'?'practice':activePage==='home-contests'?'contest':activePage==='home-submissions'?'judge':activePage==='advice'?'advice':'home';
  const navItems=[['home','首页','home'],['problems','题目','problemset'],['training','练习','practice'],['contest','考试','home-contests'],['judge','评测','home-submissions'],['advice','备考','advice']]
    .map(([icon,label,route])=>`<button type="button" class="fzuoj-nav-item ${route===activeNavRoute?'active':''}" data-portal-route="${route}"><span>${portalIcon(icon)}</span><b>${label}</b></button>`).join('');
  const contestTime=exam=>formatExamTime(exam.startAt||exam.date);
  const contests=exams.slice(0,5).map(exam=>{
    const status=portalExamStatus(exam);
    const tone=status==='进行中'?'running':status==='未开始'?'pending':'ended';
    return `<button type="button" class="fzuoj-list-row" data-portal-exam="${escape(exam.examVersion)}"><span class="fzuoj-status ${tone}">${status}</span><span class="fzuoj-list-main"><b>${escape(exam.title)}</b><small><span>${portalIcon('award')}${escape(contestRuleLabel(contestRuleOf(exam)))}</span><span>${portalIcon('calendar')}${contestTime(exam)}</span><span>${portalIcon('clock')}${portalDuration(exam.duration)}</span><span>${portalIcon('users')}${examParticipantCount(exam)}</span></small></span><i>${portalIcon('arrow')}</i></button>`;
  }).join('');
  const latest=(primaryConfig.questions||[]).slice(0,10).map((question,index)=>`<button type="button" class="fzuoj-problem-row" data-portal-question="${index}"><i>—</i><span>${escape(question.id||String(index+1).padStart(4,'0'))}</span><b>${escape(question.name)}</b></button>`).join('');
  const initial=escape(String(config.candidateName||'U').trim().slice(0,1).toUpperCase()||'U');
  const trainingStatus=portalExamStatus(primaryConfig);
  const trainingTone=trainingStatus==='进行中'?'running':trainingStatus==='未开始'?'pending':'ended';
  return `<div class="fzuoj-shell">
    <aside class="fzuoj-sidebar">
      <header class="fzuoj-domain"><span class="fzuoj-seal"><img src="/fzu-logo.png?v=20261007" alt="福州大学校徽" onerror="this.onerror=null;this.src='https://www.fzu.edu.cn/__local/B/00/85/7E40A9947CCADB9BCCF7F6A8AA0_9BDD11BE_23796.png';"></span><b>福州大学</b></header>
      <nav class="fzuoj-nav" aria-label="主页面导航">${navItems}</nav>
      <footer class="fzuoj-sidebar-footer">
        <button type="button" class="fzuoj-nav-item" data-portal-theme><span>${portalIcon('theme')}</span><b>主题切换</b></button>
        <div class="fzuoj-service"><span></span><b>服务状态</b></div>
        <button type="button" class="fzuoj-nav-item ${activePage==='about'?'active':''}" data-portal-route="about"><span>${portalIcon('info')}</span><b>关于</b></button>
        <button type="button" class="fzuoj-account" data-profile-open aria-label="打开个人中心"><span>${initial}</span><p><b>${escape(config.studentId||config.candidateName)}</b><small>${escape(config.candidateName)}</small></p><i>${portalIcon('chevron')}</i></button>
      </footer>
    </aside>
    <div class="fzuoj-page">
      <header class="fzuoj-topbar"><button type="button" data-fzuoj-sidebar-toggle aria-label="收起侧栏">${portalIcon('panel')}</button></header>
      <main class="fzuoj-content">
        <div class="fzuoj-primary">
          <section class="fzuoj-card fzuoj-bulletin"><h1>欢迎来到 FZU PTA Online Judge！</h1><p>请点击左侧的导航栏寻找你需要的功能。<br>明德至诚，博学远志。<br>选择福大，就是选择奋斗。</p></section>
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
        <section class="pta-home-shortcuts"><button type="button" data-portal-route="center"><span>${portalIcon('contest')}</span><b>考试中心</b></button><button type="button" data-portal-route="advice"><span>${portalIcon('training')}</span><b>备考</b></button><button type="button" data-portal-route="submissions"><span>${portalIcon('judge')}</span><b>提交列表</b></button><button type="button" data-portal-route="realtime"><span>${portalIcon('award')}</span><b>成绩排名</b></button></section>
        <section class="pta-home-promo"><span>${portalIcon('problems')}</span><b>PTA</b><strong>让程序设计学习更高效</strong><small>练习 · 考试 · 评测 · 复盘</small><button type="button" data-portal-route="exam">开始练习</button></section>
        <footer class="pta-home-footer"><b>${portalIcon('problems')} PTA</b><p><button type="button" data-portal-route="home">首页</button><button type="button" data-portal-route="info">关于我们</button><button type="button" data-portal-route="advice">备考</button></p><small>FZU Programming Teaching Assistant</small></footer>
      </aside>
    </div>
  </div>`;
}
function scoreboardUserCell(userId,userName,avatar=''){
  const safeId=String(userId||'—'),safeName=String(userName||'—'),initial=String(userName||userId||'U').trim().slice(0,1).toUpperCase()||'U';
  return `<td class="score-user"><span>${avatar||escape(initial)}</span><b>${escape(safeId)}</b><small>${escape(safeName)}</small></td>`;
}
function scoreboardScoreCell(score,maximum,attempted=true){
  const points=Number(score)||0,tone=!attempted?'unsubmitted':points>=maximum?'full':points>0?'partial':'zero';
  return `<td class="score-problem score-${tone}"><b>${attempted?escape(points):'—'}</b></td>`;
}
function renderScoreboard(){
  if(config.examVersion===publishedWeeklyPracticeScores.examVersion){
    const heads=config.questions.map((question,index)=>`<th><b>${index+1}</b></th>`).join('');
    const scoreCell=(score,index,attempted=true)=>scoreboardScoreCell(score,Number(config.questions[index]?.score)||100,attempted);
    const unsyncedCell='<td class="score-problem score-unsubmitted" title="逐题成绩未同步"><b>—</b><span>未同步</span></td>';
    const publishedRows=publishedWeeklyPracticeScores.rows.map(user=>{const scores=Array.isArray(user.scores)?user.scores:null;return {...user,total:Number.isFinite(Number(user.total))?Number(user.total):(scores||[]).reduce((sum,score)=>sum+Number(score||0),0),cells:config.questions.map((question,index)=>scores&&index<scores.length?scoreCell(scores[index],index):unsyncedCell).join('')}});
    const participants=publishedRows
      .filter((user,index,array)=>array.findIndex(candidate=>candidate.userId===user.userId)===index)
      .sort((left,right)=>right.total-left.total);
    const rows=participants.map((user,index)=>`<tr><td class="score-rank">${index+1}</td>${scoreboardUserCell(user.userId,user.userName)}<td class="score-total"><b>${user.total}</b></td>${user.cells}</tr>`).join('');
    return `<section class="scoreboard-page scoreboard-weekly"><header><h1>成绩表</h1></header><div class="scoreboard-scroll"><table class="scoreboard-table"><thead><tr><th>#</th><th>用户</th><th><b>总分</b></th>${heads}</tr></thead><tbody>${rows}</tbody></table></div></section>`;
  }
  const imported=config.scoreboard;
  if(Array.isArray(imported?.rows)&&imported.rows.length){
    const ioi=imported.rule==='IOI';
    const heads=(imported.problems||[]).map(problem=>`<th><b>${escape(problem.letter)}</b><span>${Number(problem.accepted)||0} / ${Number(problem.submissions)||0}</span></th>`).join('');
    const rows=imported.rows.map(row=>{
      const problems=(row.problems||[]).map(value=>{const text=String(value??'').trim();if(ioi){const points=Number(text.match(/^\s*(\d+)/)?.[1]),hasScore=Number.isFinite(points)&&text!=='-',tone=!hasScore?'unsubmitted':points>=100?'full':points>0?'partial':'zero',visible=text||'—';return `<td class="score-problem score-${tone}"><b>${escape(visible)}</b></td>`;}const accepted=text.match(/^(?:\+(\d+)\s+)?(\d+:\d{2})$/),wrong=text.match(/^-(\d+)$/),top=accepted?(accepted[1]?`+${accepted[1]}`:'✓'):wrong?`-${wrong[1]}`:text,time=accepted?.[2]||'';return `<td class="score-problem ${accepted?'accepted':text?'attempted':''}"><b>${top?escape(top):'—'}</b></td>`;}).join('');
      const displayUserId=String(row.userId||'').replace(/^B\s*/, '');
      const userUrl=/^https:\/\/oj\.fzu\.edu\.cn\/user\/\d+$/.test(String(row.userUrl||''))?`<a href="${escape(row.userUrl)}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">${escape(displayUserId)}</a>`:escape(displayUserId);
      const avatarPath=String(row.avatarUrl||'');
      const avatar=/^\.\/比赛成绩表 - FZU Online Judge_files\/[^?#]+$/.test(avatarPath)?`<img src="${escape(avatarPath)}" alt="" loading="lazy" style="display:block;width:38px;height:38px;object-fit:cover;border-radius:50%" onerror="this.onerror=null;this.parentElement.textContent='B'">`:'B';
      const totalValue=ioi?Number(row.totalScore)||0:Number(row.solved)||0;
      const totalDetail=ioi?'':escape(row.penalty||'0:00');
      return `<tr><td class="score-rank">${escape(row.rank)}</td><td class="score-user"><span>${avatar}</span><b>${userUrl}</b><small>${escape(row.userName)}</small></td><td class="score-total"><b>${totalValue}</b>${totalDetail?`<small>${totalDetail}</small>`:''}</td>${problems}</tr>`;
    }).join('');
    const totalHead=ioi?'<th><b>总分</b></th>':'<th><b>Solved</b><span>总耗时</span></th>';
    return `<section class="scoreboard-page"><header><h1>成绩表</h1></header><div class="scoreboard-scroll"><table class="scoreboard-table"><thead><tr><th>#</th><th>用户</th>${totalHead}${heads}</tr></thead><tbody>${rows}</tbody></table></div></section>`;
  }
  const totalScore=config.questions.reduce((sum,question,index)=>sum+scoreForQuestion(question,index),0);
  const solved=config.questions.filter((question,index)=>results[index]==='accepted'||submissions.some(item=>item.problemId===question.id&&(item.verdict==='答案正确'||item.verdict==='Accepted'))).length;
  const cells=config.questions.map((question,index)=>{const attempts=submissions.filter(item=>item.problemId===question.id).length,attempted=Boolean(results[index]||attempts),earned=scoreForQuestion(question,index);return scoreboardScoreCell(earned,Number(question.score)||100,attempted);}).join('');
  const heads=config.questions.map(question=>`<th><b>${escape(question.id)}</b><span>${escape(question.name)}</span></th>`).join('');
  const userId=config.studentId||config.candidateName,userName=config.candidateName;
  const rows=`<tr><td class="score-rank">1</td>${scoreboardUserCell(userId,userName)}<td class="score-total"><b>${solved}</b><small>${totalScore}</small></td>${cells}</tr>`;
  return `<section class="scoreboard-page"><header><h1>成绩表</h1></header><div class="scoreboard-scroll"><table class="scoreboard-table"><thead><tr><th>#</th><th>用户</th><th><b>Solved</b><span>总分</span></th>${heads}</tr></thead><tbody>${rows}</tbody></table></div></section>`;
}
function examDate(exam){return exam.date||String(exam.title||'').match(/\d{4}-\d{2}-\d{2}/)?.[0]||'日期未记录';}
function renderExamCards(exams){
  if(!exams.length)return '<div class="exam-center-empty"><b>暂无试卷</b><span>该分区暂时没有可查看的试卷。</span></div>';
  return exams.map((exam,index)=>{
    const total=exam.questions.reduce((sum,question)=>sum+(Number(question.score)||0),0);
    const isGplt=exam.homeworkGroup==='gplt';
    const questions=exam.questions.map((question,questionIndex)=>exam.selectable
      ?`<button type="button" class="archive-question-row" data-exam-version="${escape(exam.examVersion)}" data-question-open="${questionIndex}"><span>${escape(question.id)}</span><div><b>${escape(question.name)}</b><small>${isGplt?`${escape(question.originalId)} · ${escape(question.difficulty)}`:'编程题'}</small></div><strong>${Number(question.score)||0} 分</strong><em>进入作答 ›</em></button>`
      :`<div class="archive-question-row"><span>${escape(question.id)}</span><div><b>${escape(question.name)}</b><small>编程题</small></div><strong>${Number(question.score)||0} 分</strong></div>`).join('');
    return `<details class="exam-archive-card" ${index===0||exam.current?'open':''}><summary><div class="archive-card-title"><span class="archive-status ${exam.current?'current':''}">${escape(exam.current?'正在作答':exam.status||'可作答')}</span><div><h2>${escape(exam.title)}</h2></div></div><div class="archive-metrics"><span><small>题目</small><b>${exam.questions.length} 题</b></span><span><small>时长</small><b>${exam.category==='practice'?'不限时':formatDuration(exam.duration)}</b></span><span><small>总分</small><b>${total} 分</b></span></div><i>⌄</i></summary><div class="archive-question-list"><header><span>${isGplt?'8 道 L1＋4 道 L2 · 每题 5 个自建测试点':'题目清单'}</span><span>满分</span></header>${questions}</div></details>`;
  }).join('');
}
function renderPortalContests(filters={status:'all',rule:'',keyword:''},page=0){
  const archive=window.OMS_EXAM_ARCHIVE||[];
  const exams=[primaryConfig,...archive]
    .filter((exam,index,list)=>list.findIndex(item=>item.examVersion===exam.examVersion)===index)
    .sort((a,b)=>Date.parse(b.startAt||b.date||0)-Date.parse(a.startAt||a.date||0));
  const ruleOf=contestRuleOf;
  const filtered=exams.filter(exam=>{
    const status=portalExamStatus(exam);
    return (filters.status==='all'||status===filters.status)&&(!filters.rule||ruleOf(exam)===filters.rule)&&(!filters.keyword||String(exam.title||'').toLowerCase().includes(filters.keyword.toLowerCase()));
  });
  const pageSize=10,pageCount=Math.max(1,Math.ceil(filtered.length/pageSize)),safePage=Math.min(Math.max(0,page),pageCount-1);
  const rows=filtered.slice(safePage*pageSize,(safePage+1)*pageSize).map(exam=>{
    const status=portalExamStatus(exam),tone=status==='进行中'?'running':status==='未开始'?'pending':'ended';
    const title=String(exam.title||'').replace(/^已结束\s*/, '');
    const registered=examParticipantCount(exam)>0?`${examParticipantCount(exam)} 人`:'—';
    return `<button type="button" class="contest-directory-row" data-contest-open="${escape(exam.examVersion)}"><span class="fzuoj-status ${tone}">${status}</span><span class="contest-directory-copy"><b>${escape(title)}</b><small><span>${portalIcon('award')}${escape(contestRuleLabel(ruleOf(exam)))}</span><span>${portalIcon('calendar')}${formatExamTime(exam.startAt||exam.date)}</span><span>${portalIcon('clock')}${portalDuration(exam.duration)}</span><span>${portalIcon('users')}${registered}</span></small></span><i>${portalIcon('arrow')}</i></button>`;
  }).join('');
  const statuses=['all','进行中','未开始','已结束'];
  const statusLabels={all:'全部',进行中:'进行中',未开始:'未开始',已结束:'已结束'};
  const activeRules=[...new Set(exams.map(ruleOf))];
  return `<section class="contest-directory"><header class="contest-directory-head"><div><h1>考试</h1></div><span>${filtered.length} 场考试</span></header><form class="contest-directory-filters" data-contest-filter-form><div class="contest-status-tabs" role="group" aria-label="考试状态">${statuses.map(status=>`<button type="button" data-contest-status="${status}" class="${filters.status===status?'active':''}">${statusLabels[status]}</button>`).join('')}</div><div class="contest-directory-search"><select name="rule" aria-label="考试规则"><option value="">全部规则</option>${activeRules.map(rule=>`<option value="${escape(rule)}" ${filters.rule===rule?'selected':''}>${escape(contestRuleLabel(rule))}</option>`).join('')}</select><input name="keyword" value="${escape(filters.keyword)}" placeholder="搜索考试名称" aria-label="搜索考试名称"><button type="submit">搜索</button><button type="button" data-contest-reset>重置</button></div></form><section class="contest-directory-list" aria-label="考试列表">${rows||`<div class="contest-directory-empty"><b>${exams.length?'没有符合条件的考试':'暂无考试'}</b><span>可以调整筛选条件后再试。</span></div>`}</section><nav class="contest-directory-pagination" aria-label="考试列表分页"><span>第 ${safePage+1} / ${pageCount} 页</span><div><button type="button" data-contest-page="${safePage-1}" ${safePage===0?'disabled':''}>‹ 上一页</button><button type="button" data-contest-page="${safePage+1}" ${safePage>=pageCount-1?'disabled':''}>下一页 ›</button></div></nav></section>`;
}
function renderHomeworkCards(exams){
  return exams.map((exam,index)=>{
    const progress=progressByExam.get(exam.examVersion);
    const localCount=exam.questions.filter(question=>!question.externalOnly).length;
    const solved=exam.questions.filter(question=>progress?.statuses?.[question.id]==='accepted').length;
    const rows=exam.questions.map((question,questionIndex)=>{
      const status=progress?.statuses?.[question.id]==='accepted'?'已通过':question.externalOnly?'原站练习':'进入作答';
      const body=`<span>${question.externalOnly?'FZU ':''}${escape(question.id)}</span><div><b>${escape(question.name)}${question.homeworkOptional?' · 选做':''}</b><small>${escape(question.difficulty)} · ${escape(question.homeworkTraining)}</small><small>${escape(question.homeworkRequirement)}</small></div><strong>${question.homeworkOptional?'选做':'核心'}</strong><em>${status} ›</em>`;
      return question.externalOnly
        ?`<a class="archive-question-row" href="${escape(question.sourceUrl)}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">${body}</a>`
        :`<button type="button" class="archive-question-row" data-exam-version="${escape(exam.examVersion)}" data-question-open="${questionIndex}">${body}</button>`;
    }).join('');
    return `<details class="exam-archive-card" ${index===0||config.examVersion===exam.examVersion?'open':''}><summary><div class="archive-card-title"><span class="archive-status">不限时</span><div><h2>${escape(exam.title)}</h2></div></div><div class="archive-metrics"><span><small>核心</small><b>4 题</b></span><span><small>选做</small><b>1 题</b></span><span><small>本站通过</small><b>${solved} / ${localCount}</b></span></div><i>⌄</i></summary><div class="archive-question-list"><header><span>题目与作业要求</span><span>类型</span></header>${rows}</div></details>`;
  }).join('');
}
function renderExamCenter(){
  const currentExam={...primaryConfig,date:examDate(primaryConfig),status:'模拟卷',current:config.examVersion===primaryExamVersion,selectable:true,category:'mock'};
  const archive=(window.OMS_EXAM_ARCHIVE||[]).filter(exam=>exam.examVersion!==primaryExamVersion);
  const pastExams=(window.OMS_EXAM_ARCHIVE||[]).filter(exam=>exam.category==='past').map(exam=>({...exam,current:config.examVersion===exam.examVersion,selectable:true}));
  const gplt=archive.filter(exam=>exam.homeworkGroup==='gplt').sort((a,b)=>a.practiceYear-b.practiceYear).map(exam=>({...exam,current:config.examVersion===exam.examVersion,selectable:true,status:'真题作业'}));
  const mockExams=[currentExam,...archive.filter(exam=>(exam.category==='mock'||exam.category==='practice')&&exam.homeworkGroup!=='gplt').map(exam=>({...exam,current:config.examVersion===exam.examVersion,selectable:true}))];
  const homework=window.OMS_PRACTICE_EXAMS||[];
  const activeCategory=config.homeworkGroup==='gplt'?'gplt':homework.length?'homework':gplt.length?'gplt':config.examVersion===primaryExamVersion?'mock':'past';
  const tabs=[['resources','常用题单',5],...(homework.length?[['homework','专项作业',homework.length]]:[]),...(gplt.length?[['gplt','天梯赛 L1/L2',gplt.length]]:[]),['past','历年题',pastExams.length],['mock','模拟练习',mockExams.length]];
  const tabHtml=tabs.map(([key,label,count])=>`<button type="button" class="${activeCategory===key?'active':''}" data-exam-center-tab="${key}" role="tab" aria-selected="${activeCategory===key}"><span>${label}</span><em>${count}</em></button>`).join('');
  const resourcesHtml=`<section class="exam-center-panel ${activeCategory==='resources'?'active':''}" data-exam-center-panel="resources" ${activeCategory==='resources'?'':'hidden'}><header><div><h2>常用题单</h2><p>在 OMS 内集中打开常用题库与专题训练入口。</p></div><span>5 个入口</span></header>${renderKeyQuestionLinks()}</section>`;
  const homeworkHtml=homework.length?`<section class="exam-center-panel ${activeCategory==='homework'?'active':''}" data-exam-center-panel="homework" ${activeCategory==='homework'?'':'hidden'}><header><h2>FZU 竞赛精选 · 五次专项作业</h2><span>每次 4 道核心＋1 道选做，不限时</span></header><p>可以每天完成 1～2 题。原站练习题打开 FZU 页面，不计入本站通过记录。</p><div class="exam-archive-list">${renderHomeworkCards(homework)}</div></section>`:'';
  const gpltHtml=gplt.length?`<section class="exam-center-panel ${activeCategory==='gplt'?'active':''}" data-exam-center-panel="gplt" ${activeCategory==='gplt'?'':'hidden'}><header><h2>历年真题作业 · 天梯赛 L1/L2</h2><span>2024、2025、2026 · 三套独立练习</span></header><p>每年 8 道 L1＋4 道 L2，200 分，不限时；作答记录按年份独立保存。</p><p>题面为非官方重述，测试点为自建练习数据，不是官方隐藏测试。部分题目有练习版规则差异，请阅读题面中的勘误提示。难度标签沿用包内参考评级。</p><div class="exam-archive-list">${renderExamCards(gplt)}</div></section>`:'';
  return `<div class="exam-center-head"><small>PRACTICE CENTER</small><h1>练习</h1><p>从专题题单到历年真题，按目标选择训练内容。</p></div><div class="exam-center-tabs" role="tablist">${tabHtml}</div>${resourcesHtml}${homeworkHtml}${gpltHtml}<section class="exam-center-panel ${activeCategory==='past'?'active':''}" data-exam-center-panel="past" ${activeCategory==='past'?'':'hidden'}><header><h2>历年题</h2><span>历年考试题目练习</span></header><div class="exam-archive-list">${renderExamCards(pastExams)}</div></section><section class="exam-center-panel ${activeCategory==='mock'?'active':''}" data-exam-center-panel="mock" ${activeCategory==='mock'?'':'hidden'}><header><h2>模拟练习</h2><span>周练与模拟题目</span></header><div class="exam-archive-list">${renderExamCards(mockExams)}</div></section>`;
}
const PROBLEM_DIFFICULTY_GROUPS=[
  [1,['普及-','普及','普及+/提高-','普及-','普及+/提高-','普及-','普及-','待定']],
  [9,['普及','待定','普及','普及+/提高-','普及+/提高-','普及-','普及-','普及-']],
  [17,['普及-','普及','普及','入门','普及','普及+/提高-','入门','入门','普及','普及-']],
  [27,['提高','普及-','普及','普及','普及','普及','普及+/提高-','普及+/提高-']],
  [1001,['普及-','普及-','普及-','普及','普及','普及','普及','普及']],
  [1009,['普及','普及','普及-','普及+/提高-','普及+/提高-','普及-','普及','普及','普及+/提高-','提高','入门']],
  [1020,['普及+/提高-','普及','普及+/提高-','提高','提高','普及','普及-','提高','提高+/省选-','普及+/提高-','入门']],
  [1031,['提高','提高+/省选-','提高','省选/NOI-','普及+/提高-','提高+/省选-','提高','提高+/省选-','普及','提高','入门']],
  [1042,['普及','普及','入门','入门','提高+/省选-','普及+/提高-','提高+/省选-','普及','普及','提高','普及-','普及+/提高-']],
  [1054,['普及+/提高-','普及+/提高-','普及+/提高-','普及','提高','普及+/提高-','入门','提高','普及+/提高-','普及-','普及+/提高-']],
  [1065,['普及','普及+/提高-','普及-','普及+/提高-','提高','普及','提高+/省选-','普及','提高','提高+/省选-','普及+/提高-']],
  [1076,['普及-','入门','普及','普及+/提高-','提高+/省选-','普及','普及','普及']],
  [1084,['普及-','普及','普及','普及+/提高-','普及','普及+/提高-','普及+/提高-','提高']]
];
const PROBLEM_DIFFICULTY=new Map(PROBLEM_DIFFICULTY_GROUPS.flatMap(([start,ratings])=>ratings.map((rating,index)=>[String(start+index),rating])));
const difficultyTone=rating=>({
  '入门':'beginner','普及-':'basic','普及':'popular','普及+/提高-':'improving',
  '提高':'advanced','提高+/省选-':'provincial','省选/NOI-':'noi','NOI/NOI+/CTS':'expert','待定':'pending'
}[rating]||'pending');
function renderProblemDirectory(filters={status:'all',difficulty:'all',keyword:''},page=0){
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
    const difficulty=item.question.difficulty||PROBLEM_DIFFICULTY.get(String(item.question.id||''))||'';
    const tags=Array.isArray(item.question.tags)?item.question.tags.join(' '):String(item.question.tags||'');
    const status=statusFor(item),text=`${item.question.id||''} ${item.question.name||''} ${difficulty} ${tags}`.toLowerCase();
    return (filters.status==='all'||status===filters.status)&&(filters.difficulty==='all'||difficulty===filters.difficulty)&&(!filters.keyword||text.includes(filters.keyword.trim().toLowerCase()));
  });
  const pageSize=20,pageCount=Math.max(1,Math.ceil(filtered.length/pageSize)),safePage=Math.min(Math.max(0,page),pageCount-1);
  const rows=filtered.slice(safePage*pageSize,(safePage+1)*pageSize).map(item=>{
    const status=statusFor(item),tone=status==='已通过'?'accepted':status==='未通过'?'wrong':status==='暂不可评测'?'unavailable':'pending';
    const difficulty=item.question.difficulty||PROBLEM_DIFFICULTY.get(String(item.question.id||''))||'—';
    const tags=Array.isArray(item.question.tags)?item.question.tags.join('、'):String(item.question.tags||'');
    const ratio=item.question.passRate??item.question.acceptanceRate;
    const passRate=ratio===undefined||ratio===null?'—':`${escape(ratio)}${Number.isFinite(Number(ratio))?'%':''}`;
    return `<button type="button" class="problem-directory-row" data-problem-exam="${escape(item.exam.examVersion)}" data-problem-index="${item.index}"><span class="problem-directory-status ${tone}" title="${status}">${status==='已通过'?'✓':status==='未通过'?'×':status==='暂不可评测'?'!':'—'}</span><span class="problem-directory-id">${escape(item.question.id||item.index+1)}</span><b>${escape(item.question.name||'未命名题目')}</b><span class="problem-directory-tags difficulty-${difficultyTone(difficulty)}" title="${escape(tags||difficulty)}">${escape(difficulty)}</span><em>${passRate}</em></button>`;
  }).join('');
  const statuses=['all','未提交','已通过','未通过','暂不可评测'],labels={all:'全部',未提交:'未提交',已通过:'已通过',未通过:'未通过',暂不可评测:'暂不可评测'};
  const difficulties=['入门','普及-','普及','普及+/提高-','提高','提高+/省选-','省选/NOI-','NOI/NOI+/CTS','待定'];
  const difficultyOptions=difficulties.map(difficulty=>`<button type="button" role="option" aria-selected="${filters.difficulty===difficulty}" class="problem-difficulty-option difficulty-${difficultyTone(difficulty)}" data-problem-difficulty="${escape(difficulty)}">${escape(difficulty)}</button>`).join('');
  const difficultyLabel=filters.difficulty==='all'?'题目难度范围':filters.difficulty;
  const difficultyPicker=`<div class="problem-difficulty-picker" data-problem-difficulty-picker><input type="hidden" name="difficulty" value="${escape(filters.difficulty)}"><button type="button" class="problem-difficulty-toggle" data-problem-difficulty-toggle aria-haspopup="listbox" aria-expanded="false"><span>${escape(difficultyLabel)}</span></button><div class="problem-difficulty-menu" data-problem-difficulty-menu role="listbox" aria-label="题目难度筛选" hidden>${difficultyOptions}</div></div>`;
  return `<section class="problem-directory"><header class="problem-directory-head"><div><h1>题目</h1></div><span>${filtered.length} 道题</span></header><form class="problem-directory-filters" data-problem-filter-form><div class="problem-status-tabs" role="group" aria-label="题目状态">${statuses.map(status=>`<button type="button" data-problem-status="${status}" class="${filters.status===status?'active':''}">${labels[status]}</button>`).join('')}</div><div class="problem-directory-search">${difficultyPicker}<input name="keyword" value="${escape(filters.keyword)}" placeholder="输入题号、题目名称或关键词" aria-label="题目关键词筛选"><button type="submit">筛选</button><button type="button" data-problem-reset>重置</button></div></form><div class="problem-directory-table-wrap"><div class="problem-directory-table"><div class="problem-directory-columns"><span>状态</span><span>题号</span><span>题目名称</span><span>标签</span><span>通过率</span></div>${rows||`<div class="problem-directory-empty">${problems.length?'没有符合条件的题目':'暂无题目'}</div>`}</div></div><nav class="problem-directory-pagination" aria-label="题目列表分页"><span>第 ${safePage+1} / ${pageCount} 页</span><div><button type="button" data-problem-page="${safePage-1}" ${safePage===0?'disabled':''}>‹ 上一页</button><button type="button" data-problem-page="${safePage+1}" ${safePage>=pageCount-1?'disabled':''}>下一页 ›</button></div></nav></section>`;
}
function renderAdviceQuestionRows(questions,emptyText){
  if(!questions.length)return `<div class="study-advice-empty"><b>${escape(emptyText)}</b><span>完成题目评测后，这里会自动更新。</span><button type="button" data-study-go-problems>去题目列表</button></div>`;
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
const STUDY_TAB_STORAGE='oms-pta-study-tab';
const STUDY_TABS=['knowledge','mistakes','experience'];
let experienceFontSize='medium';
let experienceLibraryCollapsed=false;
let studyActiveTab='knowledge';
try{const storedFontSize=localStorage.getItem(EXPERIENCE_FONT_STORAGE);if(['small','medium','large'].includes(storedFontSize))experienceFontSize=storedFontSize;}catch{}
try{experienceLibraryCollapsed=localStorage.getItem(EXPERIENCE_LIBRARY_STORAGE)==='true';}catch{}
try{const storedStudyTab=localStorage.getItem(STUDY_TAB_STORAGE);if(STUDY_TABS.includes(storedStudyTab))studyActiveTab=storedStudyTab;}catch{}
function renderExperienceReader(){
  const list=experiencePosts.map((post,index)=>`<button type="button" class="${index===0?'active':''}" data-experience-post="${index}" aria-selected="${index===0}"><small>${escape(post.label)}</small><b>${escape(post.title)}</b></button>`).join('');
  const articles=experiencePosts.map((post,index)=>`<article class="experience-article ${index===0?'active':''}" data-experience-article="${index}" ${index===0?'':'hidden'}><header><small>${escape(post.label)}</small><h2>${escape(post.title)}</h2></header>${post.sections.map(section=>`<section id="experience-${index}-${section.key}"><h3>${escape(section.title)}</h3>${section.markdown?`<div class="experience-markdown">${markdownToHtml(section.markdown)}</div>`:`<p>${escape(section.body)}</p>${section.items?`<ul>${section.items.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>`:''}`}</section>`).join('')}</article>`).join('');
  const outlines=experiencePosts.map((post,index)=>`<nav class="${index===0?'active':''}" data-experience-outline="${index}" ${index===0?'':'hidden'}>${post.sections.map(section=>`<a href="#experience-${index}-${section.key}">${escape(section.title)}</a>`).join('')}</nav>`).join('');
  return `<div class="experience-reader ${experienceLibraryCollapsed?'library-collapsed':''}" data-experience-font-size="${experienceFontSize}"><aside class="experience-library"><div class="experience-library-head"><h3>经验文章</h3><button type="button" class="experience-library-toggle" data-experience-library-toggle aria-expanded="${!experienceLibraryCollapsed}" aria-label="${experienceLibraryCollapsed?'展开经验文章列表':'折叠经验文章列表'}" title="${experienceLibraryCollapsed?'展开经验文章列表':'折叠经验文章列表'}">${experienceLibraryCollapsed?'›':'‹'}</button></div><div class="experience-library-list">${list}</div></aside><main class="experience-main">${articles}</main><aside class="experience-outline"><h3>目录</h3>${outlines}</aside></div>`;
}
function renderKnowledgeReader(){
  return `<div class="carl-reader"><div class="carl-reader-toolbar"><div class="carl-reader-title"><strong>代码随想录</strong><span>程序员 Carl · 图文讲解与算法学习路线</span></div><div class="carl-reader-actions"><button type="button" data-carl-back disabled>返回讲解</button><button type="button" data-carl-home>讲解首页</button><a data-carl-source href="https://programmercarl.com/algo/" target="_blank" rel="noopener noreferrer">打开原文 ↗</a></div></div><div class="carl-reader-tabs" role="tablist" aria-label="学习阅读器"><button type="button" role="tab" aria-selected="true" aria-controls="carl-lesson-panel" id="carl-lesson-tab" data-carl-tab="lesson">讲解</button><button type="button" role="tab" aria-selected="false" aria-controls="carl-leetcode-panel" id="carl-leetcode-tab" data-carl-tab="leetcode" disabled>力扣</button></div><section id="carl-lesson-panel" role="tabpanel" aria-labelledby="carl-lesson-tab"><div class="carl-reader-notice" role="status" data-carl-notice></div><div class="carl-lesson" data-carl-lesson tabindex="0" aria-label="讲解正文"></div></section><section id="carl-leetcode-panel" role="tabpanel" aria-labelledby="carl-leetcode-tab" hidden><div class="carl-reader-help">正在 OMS 内打开力扣；登录与提交由力扣处理。若页面被浏览器限制，<a data-carl-leetcode-source target="_blank" rel="noopener noreferrer">打开力扣原页 ↗</a></div><iframe class="carl-reader-frame" data-carl-leetcode title="力扣题目" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads" allowfullscreen></iframe></section><p class="carl-reader-help">点击专题阅读讲解；力扣题目链接将在上方“力扣”页签打开，切回“讲解”可继续阅读。</p></div>`;
}
function renderKeyQuestionLinks(){
  const links=[
    {name:'FZU OJ',description:'福州大学在线评测与竞赛平台',url:'https://oj.fzu.edu.cn/',mark:'FZU',mode:'frame'},
    {name:'PAT 乙级题库',description:'程序设计能力考试 · Basic Level',url:'https://pintia.cn/problem-sets/994805260223102976',mark:'PAT',mode:'pat'},
    {name:'Codeforces',description:'国际算法竞赛与题库',url:'https://codeforces.com/problemset',mark:'CF',mode:'frame'},
    {name:'代码随想录题单',description:'按专题循序练习算法与数据结构',url:'https://programmercarl.com/qita/12.list.html',mark:'题单',mode:'frame'},
    {name:'洛谷首页',description:'题库、比赛与在线评测',url:'https://www.luogu.com.cn/',mark:'洛谷',mode:'frame'}
  ];
  return `<div class="key-question-browser"><div class="key-question-links" data-key-links>${links.map(item=>`<button type="button" class="key-question-link" data-key-resource data-key-name="${item.name}" data-key-url="${item.url}" data-key-mode="${item.mode}"><span class="key-question-mark" aria-hidden="true">${item.mark}</span><span class="key-question-copy"><b>${item.name}</b><small>${item.description}</small></span><span class="key-question-arrow" aria-hidden="true">›</span></button>`).join('')}</div><section class="key-question-viewer" data-key-viewer hidden><div class="key-question-toolbar"><button type="button" data-key-back>‹ 返回入口</button><strong data-key-title></strong><div><button type="button" data-key-refresh>刷新</button><a data-key-source target="_blank" rel="noopener noreferrer">打开原页 ↗</a></div></div><iframe class="key-question-frame" data-key-frame title="练习题单资源" referrerpolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads" allowfullscreen></iframe><div class="pat-basic-viewer" data-key-pat hidden><div data-pat-index><div class="pat-basic-filter"><input type="search" data-pat-search placeholder="搜索题号或题目名称" aria-label="搜索 PAT 乙级题目"><span data-pat-count></span></div><div class="pat-basic-list" data-pat-list role="table" aria-label="PAT 乙级题单"><div class="pat-basic-row pat-basic-head" role="row"><span>题号</span><span>题目名称</span><span>分值</span><span>通过率</span></div><div class="pat-basic-state" data-pat-state>正在加载 PAT 乙级题单…</div></div></div><article class="pat-basic-detail" data-pat-detail hidden><div class="pat-basic-detail-nav"><button type="button" data-pat-detail-back>‹ 返回题单</button></div><div class="pat-basic-state" data-pat-detail-state>正在加载题面…</div><div data-pat-detail-content></div></article></div></section></div>`;
}
function setupKeyQuestionLinks(root){
  if(!root)return;
  const links=root.querySelector('[data-key-links]');
  const viewer=root.querySelector('[data-key-viewer]');
  const frame=root.querySelector('[data-key-frame]');
  const pat=root.querySelector('[data-key-pat]');
  const refresh=root.querySelector('[data-key-refresh]');
  const source=root.querySelector('[data-key-source]');
  const patList=root.querySelector('[data-pat-list]');
  const patSearch=root.querySelector('[data-pat-search]');
  const patCount=root.querySelector('[data-pat-count]');
  const patIndex=root.querySelector('[data-pat-index]');
  const patDetail=root.querySelector('[data-pat-detail]');
  const patDetailState=root.querySelector('[data-pat-detail-state]');
  const patDetailContent=root.querySelector('[data-pat-detail-content]');
  let current='',mode='',patProblems=null,patLoading=null,patDetailController=null;
  const patProblemUrl=id=>`https://pintia.cn/problem-sets/994805260223102976/exam/problems/type/7?problemSetProblemId=${id}`;
  const paintPat=()=>{
    if(!patProblems)return;
    const keyword=patSearch.value.trim().toLowerCase();
    const visible=patProblems.filter(problem=>!keyword||problem.label.includes(keyword)||problem.title.toLowerCase().includes(keyword));
    patCount.textContent=`${visible.length} / ${patProblems.length} 道题`;
    patList.querySelectorAll('.pat-basic-row:not(.pat-basic-head),.pat-basic-state').forEach(node=>node.remove());
    if(!visible.length){patList.insertAdjacentHTML('beforeend','<div class="pat-basic-state">没有匹配的题目</div>');return;}
    patList.insertAdjacentHTML('beforeend',visible.map(problem=>{const rate=problem.submitCount?`${(problem.acceptCount/problem.submitCount*100).toFixed(1)}%`:'—';return `<button type="button" class="pat-basic-row" role="row" data-pat-problem="${problem.id}"><b>${escape(problem.label)}</b><span>${escape(problem.title)}</span><span>${problem.score}</span><span>${rate}</span></button>`;}).join(''));
  };
  const loadPat=()=>{
    if(patProblems){paintPat();return Promise.resolve();}
    if(patLoading)return patLoading;
    patLoading=fetch('/api/learning/pat-basic').then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.message||'题单加载失败');patProblems=data.problems;paintPat();}).catch(error=>{patList.querySelectorAll('.pat-basic-state').forEach(node=>node.remove());patList.insertAdjacentHTML('beforeend',`<div class="pat-basic-state">${escape(error.message)} <button type="button" data-pat-retry>重试</button></div>`);patList.querySelector('[data-pat-retry]').onclick=()=>{patLoading=null;loadPat();};}).finally(()=>{patLoading=null;});
    return patLoading;
  };
  const showPatList=()=>{
    patDetailController?.abort();patDetailController=null;
    patDetail.hidden=true;patIndex.hidden=false;
    root.querySelector('[data-key-title]').textContent='PAT 乙级题库';
    source.href='https://pintia.cn/problem-sets/994805260223102976';
  };
  const openPatProblem=async id=>{
    const summary=patProblems?.find(problem=>problem.id===id);
    patIndex.hidden=true;patDetail.hidden=false;patDetailContent.replaceChildren();patDetailState.hidden=false;
    patDetailState.textContent='正在加载题面…';
    root.querySelector('[data-key-title]').textContent=summary?`${summary.label} ${summary.title}`:'PAT 乙级题目';
    source.href=patProblemUrl(id);
    patDetailController?.abort();patDetailController=new AbortController();
    try{
      const response=await fetch(`/api/learning/pat-basic/${encodeURIComponent(id)}`,{signal:patDetailController.signal});
      const problem=await response.json();
      if(!response.ok)throw new Error(problem.message||'题面加载失败');
      const limits=[problem.limits?.code?`代码 ${problem.limits.code} KB`:'',problem.limits?.time?`时间 ${problem.limits.time} ms`:'',problem.limits?.memory?`内存 ${Math.round(problem.limits.memory/1024)} MB`:'',problem.limits?.stack?`栈 ${problem.limits.stack} KB`:''].filter(Boolean);
      patDetailState.hidden=true;
      patDetailContent.innerHTML=`<header class="pat-basic-problem-head"><span>${escape(problem.label)}</span><div><h3>${escape(problem.title)}</h3><p>${escape([problem.author,problem.organization].filter(Boolean).join(' · '))}</p></div><b>${problem.score} 分</b></header><div class="pat-basic-problem-meta">${limits.map(item=>`<span>${escape(item)}</span>`).join('')}</div><div class="rendered-markdown problem-copy pat-basic-problem-copy">${markdownToHtml(problem.content)}</div>`;
      patDetail.scrollTop=0;
    }catch(error){
      if(error.name==='AbortError')return;
      patDetailState.hidden=false;patDetailState.innerHTML=`${escape(error.message)} <button type="button" data-pat-detail-retry>重试</button>`;
      patDetailState.querySelector('[data-pat-detail-retry]').onclick=()=>openPatProblem(id);
    }
  };
  const open=button=>{
    current=button.dataset.keyUrl;
    mode=button.dataset.keyMode;
    const embedded=mode==='frame';
    root.querySelector('[data-key-title]').textContent=button.dataset.keyName;
    source.href=current;
    links.hidden=true;viewer.hidden=false;frame.hidden=!embedded;pat.hidden=mode!=='pat';refresh.hidden=!embedded;
    if(embedded)frame.src=current;else{frame.removeAttribute('src');showPatList();loadPat();}
  };
  root.querySelectorAll('[data-key-resource]').forEach(button=>button.onclick=()=>open(button));
  root.querySelector('[data-key-back]').onclick=()=>{patDetailController?.abort();viewer.hidden=true;links.hidden=false;frame.removeAttribute('src');current='';mode='';};
  refresh.onclick=()=>{if(current&&mode==='frame')frame.src=current;};
  patSearch.oninput=paintPat;
  patList.onclick=event=>{const button=event.target.closest('[data-pat-problem]');if(button)openPatProblem(button.dataset.patProblem);};
  root.querySelector('[data-pat-detail-back]').onclick=showPatList;
}
function carlLinkUrl(value, base){
  if(!value)return null;
  try { const url=new URL(value,base);return url.protocol==='https:'&&!url.username&&!url.password?url:null; } catch { return null; }
}
function carlLinkKind(url){
  if(url.origin==='https://programmercarl.com'&&!url.search&&/\/$|\.html$/.test(url.pathname))return 'lesson';
  if(['https://leetcode.cn','https://leetcode.com'].includes(url.origin)&&/^\/problems\/[a-z0-9-]+(?:\/|$)/i.test(url.pathname))return 'leetcode';
  return 'external';
}
function safeCarlContent(html,base){
  const parsed=new DOMParser().parseFromString(html,'text/html');
  const source=parsed.querySelector('.theme-default-content, .content__default');
  if(!source)throw new Error('暂时无法识别讲解正文，请打开原文阅读。');
  const allowed=new Set('DIV ARTICLE SECTION P H1 H2 H3 H4 H5 H6 UL OL LI BLOCKQUOTE PRE CODE SPAN STRONG EM B I S DEL BR HR A IMG TABLE THEAD TBODY TR TH TD DETAILS SUMMARY SUP SUB KBD'.split(' '));
  const dropped=new Set('SCRIPT STYLE IFRAME OBJECT EMBED FORM INPUT BUTTON TEXTAREA SELECT SVG MATH LINK META TEMPLATE NOSCRIPT'.split(' '));
  const copy=node=>{
    if(node.nodeType===Node.TEXT_NODE)return document.createTextNode(node.textContent);
    if(node.nodeType!==Node.ELEMENT_NODE||dropped.has(node.tagName))return document.createDocumentFragment();
    // The source site's line-number gutters depend on its CSS; omit their entire subtree.
    if(node.classList.contains('line-numbers-wrapper')||node.classList.contains('line-numbers-rows'))return document.createDocumentFragment();
    if(node.classList.contains('header-anchor')||(node.classList.contains('sr-only')&&node.textContent.trim()==='(opens new window)'))return document.createDocumentFragment();
    const result=allowed.has(node.tagName)?document.createElement(node.tagName.toLowerCase()):document.createDocumentFragment();
    if(result.nodeType===Node.ELEMENT_NODE){
      // Rebuild a small attribute allowlist; never copy styles or event handlers.
      if(node.id)result.id='carl-content-'+node.id;
      if(node.title)result.title=node.title;
      if(['SPAN','CODE','PRE'].includes(node.tagName))result.className=[...node.classList].filter(c=>/^(token|comment|prolog|doctype|cdata|punctuation|keyword|string|char|number|boolean|function|class-name|operator|builtin|constant|property|tag|attr-name|attr-value|namespace|language-[\w-]+)$/.test(c)).join(' ');
      if(node.tagName==='A'){
        const url=carlLinkUrl(node.getAttribute('href'),base);
        if(url){result.href=url.href;result.target='_blank';result.rel='noopener noreferrer';}
      }
      if(node.tagName==='IMG'){
        const url=carlLinkUrl(node.getAttribute('src'),base);
        if(url){result.src=url.href;result.loading='lazy';result.referrerPolicy='no-referrer';}
        result.alt=node.getAttribute('alt')||'';
      }
      for(const attr of ['colspan','rowspan'])if(['TD','TH'].includes(node.tagName)&&/^\d{1,2}$/.test(node.getAttribute(attr)||''))result.setAttribute(attr,node.getAttribute(attr));
    }
    for(const child of node.childNodes)result.appendChild(copy(child));
    return result;
  };
  return copy(source);
}
function setupKnowledgeReader(root){
  const lesson=root.querySelector('[data-carl-lesson]');
  const notice=root.querySelector('[data-carl-notice]');
  const back=root.querySelector('[data-carl-back]');
  const source=root.querySelector('[data-carl-source]');
  const frame=root.querySelector('[data-carl-leetcode]');
  const history=[];
  let current='https://programmercarl.com/algo/',requestId=0,controller;
  function selectTab(name){
    root.querySelectorAll('[data-carl-tab]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.carlTab===name)));
    root.querySelector('#carl-lesson-panel').hidden=name!=='lesson';
    root.querySelector('#carl-leetcode-panel').hidden=name!=='leetcode';
  }
  function scrollToHash(hash){
    if(!hash)return;
    let id;try{id='carl-content-'+decodeURIComponent(hash.slice(1));}catch{return;}
    const target=[...lesson.querySelectorAll('[id]')].find(el=>el.id===id);
    if(target)lesson.scrollTop+=target.getBoundingClientRect().top-lesson.getBoundingClientRect().top;
  }
  async function load(url,push=true){
    const id=++requestId;
    controller?.abort();controller=new AbortController();
    selectTab('lesson');notice.textContent='正在加载讲解…';lesson.setAttribute('aria-busy','true');
    try{
      const response=await fetch('/api/learning/carl?url='+encodeURIComponent(url),{signal:controller.signal});
      const data=await response.json();
      if(!response.ok)throw new Error(data.message||'加载失败，请重试。');
      const content=safeCarlContent(data.html,data.url);
      if(id!==requestId||!root.isConnected)return;
      if(push&&lesson.firstChild){history.push({url:current,scroll:lesson.scrollTop,content:lesson.firstChild});if(history.length>12)history.shift();}
      lesson.replaceChildren(content);current=data.url+new URL(url).hash;source.href=data.url;lesson.scrollTop=0;
      scrollToHash(new URL(url).hash);notice.replaceChildren();back.disabled=!history.length;
    }catch(error){
      if(id!==requestId||error.name==='AbortError')return;
      notice.textContent=error.message+' ';
      const retry=document.createElement('button');retry.type='button';retry.textContent='重试';retry.onclick=()=>load(url,push);notice.appendChild(retry);
    }finally{if(id===requestId)lesson.removeAttribute('aria-busy');}
  }
  root.querySelectorAll('[data-carl-tab]').forEach(button=>button.onclick=()=>selectTab(button.dataset.carlTab));
  root.querySelector('[data-carl-home]').onclick=()=>load('https://programmercarl.com/algo/');
  back.onclick=()=>{
    const previous=history.pop();if(!previous)return;
    requestId++;controller?.abort();selectTab('lesson');notice.replaceChildren();lesson.removeAttribute('aria-busy');
    current=previous.url;source.href=current;lesson.replaceChildren(previous.content);lesson.scrollTop=previous.scroll;back.disabled=!history.length;
  };
  lesson.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');if(!link)return;
    const url=carlLinkUrl(link.href,current);if(!url)return;
    const kind=carlLinkKind(url);
    if(kind==='external')return;
    event.preventDefault();
    if(kind==='leetcode'){
      // Chinese LeetCode supports the embedded reader; no OMS credentials are passed.
      url.hostname='leetcode.cn';
      if(frame.getAttribute('src')!==url.href)frame.src=url.href;
      root.querySelector('[data-carl-leetcode-source]').href=url.href;
      root.querySelector('[data-carl-tab="leetcode"]').disabled=false;selectTab('leetcode');
    }else{
      const here=new URL(current);
      if(url.pathname===here.pathname&&url.hash){scrollToHash(url.hash);return;}
      load(url.href);
    }
  });
  load(current,false);
}
function renderStudyAdvice(){
  const wrongQuestions=config.questions.map((question,index)=>({question,index})).filter(item=>results[item.index]==='wrong');
  const fontOptions=[['small','小'],['medium','中'],['large','大']].map(([value,label])=>`<button type="button" class="${experienceFontSize===value?'active':''}" data-experience-font="${value}" aria-pressed="${experienceFontSize===value}">${label}</button>`).join('');
  const isActive=category=>studyActiveTab===category;
  const tab=(category,label,badge)=>`<button type="button" class="${isActive(category)?'active':''}" data-study-tab="${category}" role="tab" aria-selected="${isActive(category)}"><span>${label}</span><em>${badge}</em></button>`;
  const panel=(category,title,description,content,tools='')=>`<section class="study-advice-panel ${isActive(category)?'active':''}" data-study-panel="${category}" ${isActive(category)?'':'hidden'}><header><div><h2>${title}</h2><p>${description}</p></div>${tools}</header>${content}</section>`;
  const summary=[
    ['knowledge','知识路线','代码随想录','按专题学习与查看力扣题面'],
    ['mistakes','待复盘',`${wrongQuestions.length} 道`,'从错误提交返回重新作答'],
    ['experience','经验文章',`${experiencePosts.length} 篇`,'复盘方法与考场策略']
  ].map(([category,label,value,description])=>`<button type="button" data-study-jump="${category}" class="${isActive(category)?'active':''}"><span>${label}</span><strong>${value}</strong><small>${description}</small></button>`).join('');
  const experienceTools=`<div class="experience-header-tools"><div class="experience-font-controls" role="group" aria-label="经验贴字号"><span>字号</span>${fontOptions}</div></div>`;
  return `<div class="study-advice-head"><div class="study-advice-title"><h1>备考</h1><p>讲解、复盘与经验集中在一个学习工作台。</p></div><div class="study-advice-summary" aria-label="备考概览">${summary}</div></div><div class="study-advice-tabs" role="tablist">${tab('knowledge','知识讲解','路线')}${tab('mistakes','错题集',wrongQuestions.length)}${tab('experience','经验贴',experiencePosts.length)}</div>${panel('knowledge','知识讲解','按专题阅读讲解，并在 OMS 内查看对应力扣题面。',renderKnowledgeReader())}${panel('mistakes','错题集','优先重做本场错误题，完成后列表会自动更新。',renderAdviceQuestionRows(wrongQuestions,'暂无错题记录'))}${panel('experience','经验贴','将复盘方法、备考节奏和考场策略沉淀为可查阅文章。',renderExperienceReader(),experienceTools)}`;
}
function storedVerdictLabel(item){
  if(item.status==='partial')return '部分正确';
  return {Accepted:'答案正确',WrongAnswer:'答案错误',CompilationError:'编译错误',RuntimeError:'运行时错误',TimeLimitExceeded:'运行超时'}[item.verdict]||'答案错误';
}
function mergePersistedDrafts(examVersion=config.examVersion){
  if(!portalAuthenticated||!portalUser||config.examVersion!==examVersion)return false;
  const cloudDrafts=progressByExam.get(examVersion)?.drafts||{},pending=[],now=Date.now();
  let restored=false;
  for(const [problemId,cloud] of Object.entries(cloudDrafts)){
    if(!cloud||typeof cloud.code!=='string')continue;
    const hasLocal=Object.prototype.hasOwnProperty.call(draftCodes,problemId),localTime=Number(draftMeta[problemId]?.updatedAt)||0,cloudTime=Date.parse(cloud.updatedAt)||0;
    if(!hasLocal||cloudTime>=localTime){
      restored=restored||draftCodes[problemId]!==cloud.code;
      draftCodes[problemId]=cloud.code;
      draftMeta[problemId]={updatedAt:cloudTime||now,cloudUpdatedAt:cloud.updatedAt,language:cloud.language||draftMeta[problemId]?.language||''};
    }else if(draftCodes[problemId]===cloud.code){
      draftMeta[problemId]={...draftMeta[problemId],cloudUpdatedAt:cloud.updatedAt,language:draftMeta[problemId]?.language||cloud.language||''};
    }else{
      draftMeta[problemId]={...draftMeta[problemId],cloudUpdatedAt:cloud.updatedAt};
      pending.push([problemId,draftCodes[problemId],localTime]);
    }
  }
  for(const [problemId,source] of Object.entries(draftCodes)){
    if(Object.prototype.hasOwnProperty.call(cloudDrafts,problemId))continue;
    const localTime=Number(draftMeta[problemId]?.updatedAt)||now;
    draftMeta[problemId]={...draftMeta[problemId],updatedAt:localTime};
    pending.push([problemId,source,localTime]);
  }
  try{localStorage.setItem(DRAFT_CODE_STORAGE,JSON.stringify(draftCodes));localStorage.setItem(DRAFT_META_STORAGE,JSON.stringify(draftMeta));}catch{}
  pending.forEach(([problemId,source,localTime])=>scheduleDraftSync(problemId,source,localTime,50));
  if(restored){restoreSavedCode();$('#submit-state').textContent='长期草稿已恢复';}
  return restored;
}
function applyPersistedProgress(examVersion=config.examVersion){
  for(const key of Object.keys(results))delete results[key];
  for(const key of Object.keys(scores))delete scores[key];
  submissions.length=0;
  const progress=progressByExam.get(examVersion);
  if(progress){
    config.questions.forEach((question,index)=>{
      const score=Number(progress.scores?.[question.id]);
      if(Number.isFinite(score))scores[index]=score;
      if(progress.statuses?.[question.id])results[index]=progress.statuses[question.id];
    });
    submissions.push(...(Array.isArray(progress.submissions)?progress.submissions:[]).map(item=>({
      ...item, verdict:storedVerdictLabel(item), candidateId:portalUser?.username||config.studentId,
      candidate:portalUser?.nickname||config.candidateName, contestId:item.examVersion, contestTitle:config.title,
      time:item.createdAt?formatExamTime(item.createdAt):'—'
    })));
  }
  render();
}
async function refreshPersistedProgress(force=false){
  if(!portalAuthenticated||!portalUser)return;
  const owner=portalUser.id;
  if(!force&&progressOwner===owner)return;
  const data=await portalRequest('/api/progress');
  if(!portalAuthenticated||portalUser?.id!==owner)return;
  progressByExam.clear();
  for(const [examVersion,progress] of Object.entries(data.exams||{}))progressByExam.set(examVersion,progress);
  progressOwner=owner;
  applyPersistedProgress(config.examVersion);
  mergePersistedDrafts(config.examVersion);
}
function setPortalSession(data){
  portalSessionRevision++;
  const next=data.authenticated?data.user:null,changed=portalUser?.id!==next?.id,profileChanged=JSON.stringify(portalUser)!==JSON.stringify(next);
  if(changed||portalCsrf!==(data.csrfToken||''))portalIdentityRevision++;
  if(changed)persistActiveDraft();
  portalUser=next;portalAuthenticated=Boolean(next);portalCsrf=data.csrfToken||'';
  portalAuthAvailable=Boolean(data.available);portalRegistrationEnabled=data.registrationEnabled!==false;portalAuthMessage=data.message||'';
  config.candidateName=primaryConfig.candidateName=next?(next.nickname||next.username):fallback.candidateName;
  config.studentId=primaryConfig.studentId=next?next.username:fallback.studentId;
  if(changed){
    progressByExam.clear();progressOwner='';
    for(const key of Object.keys(results))delete results[key];for(const key of Object.keys(scores))delete scores[key];submissions.length=0;
    loadCodeStores(config.examVersion);restoreSavedCode();$('#submit-state').textContent='本地草稿已加载';
  }
  if(profileChanged){render();document.dispatchEvent(new CustomEvent('oms:auth-change',{detail:next}));}
}
async function portalRequest(endpoint,payload){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
  try{
    const response=await fetch(endpoint,{method:payload?'POST':'GET',credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:payload?{'Content-Type':'application/json','X-OMS-Request':'1','X-OMS-CSRF':portalCsrf}:{},...(payload?{body:JSON.stringify(payload)}:{})});
    let data;try{data=await response.json();}catch{throw Error('账号服务不可用，请通过本站服务器打开页面。');}
    if(!response.ok){const failure=Error(data.message||'请求失败，请稍后重试。');failure.status=response.status;failure.payload=data;throw failure;}
    return data;
  }catch(failure){if(failure.name==='AbortError')throw Error('账号服务响应超时，请稍后重试。');throw failure;}
  finally{clearTimeout(timer);}
}
async function refreshPortalSession(){const revision=portalSessionRevision,data=await portalRequest('/api/auth/session');if(revision===portalSessionRevision){setPortalSession(data);if(portalAuthenticated)try{await refreshPersistedProgress();}catch{progressOwner='';}}return portalAuthenticated;}
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
function portalLoginBrand(){return '<section class="portal-login-brand"><div class="portal-login-mark"><img src="/fzu-brand-lockup-red.jpg" alt="福州大学校徽与书法校名" style="display:block;width:min(320px,100%);height:auto;mix-blend-mode:screen"></div><div class="portal-login-intro"><h1>让每一次练习<br>都有清晰的进步</h1><p>进入题库、考试与评测空间，继续你的程序设计学习。</p></div><div class="portal-login-foot"><span>本站独立账号</span><span>暂未绑定校园身份</span></div></section>';}
async function continuePortalLogin(destination){const screen=$('#login-screen');screen.hidden=true;screen.replaceChildren();pendingLoginRoute='home';if(destination==='profile'){await route('home',true);document.dispatchEvent(new CustomEvent('oms:open-profile'));}else await route(destination);}
function showRecoveryCode(recoveryCode,destination){
  const screen=$('#login-screen');
  screen.innerHTML=`<main class="portal-login">${portalLoginBrand()}<section class="portal-login-panel"><div class="portal-login-heading"><h2>请保存恢复码</h2><p>忘记密码时，需要使用此恢复码。关闭后本站不会再次显示原码。</p></div><div class="portal-login-form"><label for="portal-recovery-code">账号恢复码</label><input id="portal-recovery-code" value="${escape(recoveryCode)}" readonly autocomplete="off"><p class="portal-login-note" id="portal-recovery-note" role="status">请保存到安全位置，不要发送给他人。</p><button type="button" class="portal-login-submit" data-copy-recovery>复制恢复码</button></div><div class="portal-login-divider"><span>确认已妥善保存</span></div><button type="button" class="portal-demo-login" data-recovery-continue>继续进入平台 <span>→</span></button></section></main>`;
  screen.hidden=false;
  screen.querySelector('[data-copy-recovery]').onclick=async()=>{const input=screen.querySelector('#portal-recovery-code'),note=screen.querySelector('#portal-recovery-note');try{await navigator.clipboard.writeText(recoveryCode);note.textContent='恢复码已复制。';}catch{input.select();note.textContent='请手动复制选中的恢复码。';}};
  screen.querySelector('[data-recovery-continue]').onclick=()=>continuePortalLogin(destination);
  screen.querySelector('#portal-recovery-code').focus();
}
function openLogin(target='home',mode='login',accountValue=''){
  pendingLoginRoute=target;
  const screen=$('#login-screen'),register=mode==='register'&&portalRegistrationEnabled,recover=mode==='recover'&&portalRegistrationEnabled,passwordMin=register||recover?10:1;
  const heading=register?'注册本站账号':recover?'重设密码':'登录平台',description=register?'创建专用于本站的账号与密码':recover?'使用注册时保存的恢复码设置新密码':'使用本站账号继续访问';
  const passwordLabel=recover?'新密码':'本站密码',passwordHint=register||recover?'10–128 个字符，请勿使用校园密码':'请输入本站密码';
  screen.innerHTML=`<main class="portal-login">${portalLoginBrand()}<section class="portal-login-panel"><div class="portal-login-heading"><h2>${heading}</h2><p>${description}</p></div><form class="portal-login-form" id="portal-login-form"><label for="portal-login-account">本站账号 / 学号</label><input id="portal-login-account" name="account" autocomplete="username" required minlength="3" maxlength="32" pattern="[A-Za-z0-9_-]{3,32}" title="3–32 位字母、数字、下划线或连字符" placeholder="请输入本站账号" value="${escape(accountValue)}">${register?'<label for="portal-login-nickname">昵称</label><input id="portal-login-nickname" name="nickname" autocomplete="nickname" required maxlength="32" placeholder="你希望显示的名字">':''}${recover?'<label for="portal-login-recovery">恢复码</label><input id="portal-login-recovery" name="recoveryCode" autocomplete="off" required maxlength="32" placeholder="例如 ABCD-EF12-3456-7890-ABCD">':''}<label for="portal-login-password">${passwordLabel}</label><input id="portal-login-password" name="password" type="password" required minlength="${passwordMin}" maxlength="128" autocomplete="${register||recover?'new-password':'current-password'}" placeholder="${passwordHint}">${register||recover?'<label for="portal-login-confirm">确认新密码</label><input id="portal-login-confirm" name="passwordConfirm" type="password" autocomplete="new-password" required minlength="10" maxlength="128" placeholder="再次输入新密码">':''}<p class="portal-login-note" id="portal-login-note" role="status">${escape(portalAuthMessage||(portalRegistrationEnabled?(recover?'恢复成功后，旧登录会话将全部失效。':'本站独立登录，不是学校统一身份认证。请勿使用校园密码。'):'仅限管理员配置的账号登录。'))}</p><button type="submit" class="portal-login-submit" ${portalAuthAvailable?'':'disabled'}>${register?'注册并登录':recover?'重设密码并登录':'登录'}</button></form><div class="portal-login-divider"><span>${portalRegistrationEnabled?(register?'已有本站账号？':recover?'还记得密码？':'首次使用？'):'仅限指定账号'}</span></div>${portalRegistrationEnabled?`<button type="button" class="portal-demo-login" data-auth-mode>${register?'返回登录':'注册本站账号'} <span>→</span></button>${register?'':`<button type="button" class="portal-login-back" data-auth-recover>${recover?'返回账号登录':'忘记密码'}</button>`}`:''}<button type="button" class="portal-login-back" data-login-back>暂不登录，返回主页</button></section></main>`;
  screen.hidden=false;
  const form=screen.querySelector('#portal-login-form');
  form.onsubmit=async event=>{
    event.preventDefault();const note=screen.querySelector('#portal-login-note'),data=Object.fromEntries(new FormData(form));
    if((register||recover)&&data.password!==data.passwordConfirm){note.textContent='两次输入的密码不一致。';return;}
    const buttons=screen.querySelectorAll('button');buttons.forEach(button=>button.disabled=true);note.textContent=register?'正在注册…':recover?'正在重设密码…':'正在验证…';
    try{
      const endpoint=register?'register':recover?'reset-password':'login',session=await portalRequest(`/api/auth/${endpoint}`,data),destination=pendingLoginRoute;
      setPortalSession(session);form.reset();
      if(session.recoveryCode)showRecoveryCode(session.recoveryCode,destination);else await continuePortalLogin(destination);
    }catch(failure){if(form.elements.password)form.elements.password.value='';if(form.elements.passwordConfirm)form.elements.passwordConfirm.value='';note.textContent=failure.message||'账号操作失败，请稍后重试。';}
    finally{buttons.forEach(button=>button.disabled=false);}
  };
  const authMode=screen.querySelector('[data-auth-mode]');if(authMode)authMode.onclick=()=>openLogin(target,register?'login':'register',form.elements.account.value);
  const recoverMode=screen.querySelector('[data-auth-recover]');if(recoverMode)recoverMode.onclick=()=>openLogin(target,recover?'login':'recover',form.elements.account.value);
  screen.querySelector('[data-login-back]').onclick=()=>{screen.hidden=true;screen.replaceChildren();pendingLoginRoute='home';route('home',true);};
  screen.querySelector('#portal-login-account').focus();
}
window.omsAuth={get user(){return portalUser;},request:portalRequest,refresh:refreshPortalSession,require:requirePortalSession,logout:logoutPortal,update:setPortalSession};
// The existing judge widget also calls this endpoint. Keep its requests authenticated
// without changing the independent compiler / editor implementation.
const portalNativeFetch=window.fetch.bind(window);
window.fetch=async(input,options={})=>{
  const url=new URL(input instanceof Request?input.url:String(input),location.href);
  if(url.origin!==location.origin||url.pathname!=='/api/judge')return portalNativeFetch(input,options);
  const question=config.questions[current],examVersion=config.examVersion,owner=portalUser?.id,identityRevision=portalIdentityRevision;
  const rawBody=options.body??(input instanceof Request?await input.clone().text():null);
  if(typeof rawBody==='string'){
    const payload=JSON.parse(rawBody);
    options={...options,body:JSON.stringify({...payload,problemId:payload.problemId??question.id,examVersion:payload.examVersion??examVersion})};
  }
  if(!await requirePortalSession('exam'))throw Error('请先登录后再运行或提交。');
  if(!owner||portalUser?.id!==owner||portalIdentityRevision!==identityRevision)throw Error('登录状态已变化，请重新运行或提交。');
  const headers=new Headers(options.headers||(input instanceof Request?input.headers:undefined));
  headers.set('X-OMS-Request','1');headers.set('X-OMS-CSRF',portalCsrf);
  const response=await portalNativeFetch(input,{...options,credentials:'same-origin',headers});
  if(response.status===401&&portalUser?.id===owner&&portalIdentityRevision===identityRevision){setPortalSession({available:true,authenticated:false});openLogin('exam');}
  return response;
};
let fullscreenHintTimer=0;
function activeFullscreenElement(){return document.fullscreenElement||document.webkitFullscreenElement||document.msFullscreenElement||null;}
function showFullscreenHint(message='按 Esc 退出全屏'){const hint=$('#fullscreen-hint');if(!hint)return;clearTimeout(fullscreenHintTimer);hint.textContent=message;hint.hidden=false;hint.classList.remove('visible');void hint.offsetWidth;hint.classList.add('visible');fullscreenHintTimer=window.setTimeout(()=>{hint.hidden=true;hint.classList.remove('visible');},5000);}
function handleFullscreenChange(){const native=Boolean(activeFullscreenElement());document.documentElement.classList.toggle('oms-native-fullscreen',native);if(native)document.documentElement.classList.remove('oms-fullscreen-fallback');applyOmsContentZoom();}
async function enterDefaultFullscreen(){if(activeFullscreenElement()||document.documentElement.classList.contains('oms-fullscreen-fallback')){showFullscreenHint();return;}const target=document.body||document.documentElement,request=target.requestFullscreen||target.webkitRequestFullscreen||target.msRequestFullscreen;try{if(request){const result=request===target.requestFullscreen?request.call(target,{navigationUI:'hide'}):request.call(target);await Promise.resolve(result);if(activeFullscreenElement()){showFullscreenHint();return;}}}catch{}document.documentElement.classList.add('oms-fullscreen-fallback');applyOmsContentZoom();showFullscreenHint('Edge 未允许网页全屏，已进入沉浸模式；按 F11 可隐藏浏览器栏');}
async function exitDefaultFullscreen(){document.documentElement.classList.remove('oms-fullscreen-fallback');const exit=document.exitFullscreen||document.webkitExitFullscreen||document.msExitFullscreen;try{if(activeFullscreenElement()&&exit)await Promise.resolve(exit.call(document));}catch{}handleFullscreenChange();const hint=$('#fullscreen-hint');clearTimeout(fullscreenHintTimer);if(hint){hint.hidden=true;hint.classList.remove('visible');}}
function showExamReminder(){const dialog=$('#exam-reminder-dialog');if(!dialog)return;const confirm=()=>dialog.close();dialog.querySelectorAll('[data-reminder-close]').forEach(button=>button.onclick=confirm);dialog.addEventListener('cancel',event=>event.preventDefault());if(!dialog.open)dialog.showModal();}
window.addEventListener('DOMContentLoaded',async()=>{
  initOmsClientChrome();
  showExamReminder();
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
  if(name==='solutions'&&!examHasEnded())name='info';
  const guest=startup||(allowGuest&&name==='home');
  if(!guest){
    try{await refreshPortalSession();}catch{portalAuthMessage='账号服务暂不可用，请确认本地服务已启动后重试。';if(revision===routeRevision)openLogin(name);return;}
    if(revision!==routeRevision)return;
    if(!portalAuthenticated){openLogin(name);return;}
  }
  const previousRoute=activeRoute;activeRoute=name;renderOmsClientChrome(name);
  if(previousRoute==='exam'&&name!=='exam')persistActiveDraft();
  const app=$('#pta-app'),isPortalPage=['home','problemset','practice','home-contests','home-submissions','about','advice'].includes(name);app.classList.toggle('portal-mode',isPortalPage);
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
    const profileButton=secondary.querySelector('[data-profile-open]');
    if(profileButton){if(!portalAuthenticated){profileButton.setAttribute('aria-label','登录或打开个人中心');profileButton.querySelector('p b').textContent='未登录';profileButton.querySelector('p small').textContent='点击登录';profileButton.querySelector(':scope > span').textContent='U';}else if(portalUser?.avatar){const image=profileButton.querySelector(':scope > span');image.style.backgroundImage=`url("${portalUser.avatar}")`;image.classList.add('has-image');image.textContent='';}profileButton.onclick=()=>{if(!portalAuthenticated){openLogin('profile');return;}document.dispatchEvent(new CustomEvent('oms:open-profile'));};}
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
    let filters={status:'all',difficulty:'all',keyword:''},page=0;
    const paint=()=>{
      paintPortalPage(renderProblemDirectory(filters,page));
      const form=portalContent.querySelector('[data-problem-filter-form]');
      form.onsubmit=event=>{event.preventDefault();filters={...filters,...Object.fromEntries(new FormData(form))};page=0;paint();};
      portalContent.querySelector('[data-problem-reset]').onclick=()=>{filters={status:'all',difficulty:'all',keyword:''};page=0;paint();};
      portalContent.querySelectorAll('[data-problem-status]').forEach(button=>button.onclick=()=>{filters={...filters,...Object.fromEntries(new FormData(form)),status:button.dataset.problemStatus};page=0;paint();});
      const difficultyPicker=portalContent.querySelector('[data-problem-difficulty-picker]'),difficultyToggle=difficultyPicker.querySelector('[data-problem-difficulty-toggle]'),difficultyMenu=difficultyPicker.querySelector('[data-problem-difficulty-menu]');
      const closeDifficultyMenu=()=>{difficultyMenu.hidden=true;difficultyPicker.classList.remove('open');difficultyToggle.setAttribute('aria-expanded','false');};
      difficultyToggle.onclick=()=>{const opening=difficultyMenu.hidden;difficultyMenu.hidden=!opening;difficultyPicker.classList.toggle('open',opening);difficultyToggle.setAttribute('aria-expanded',String(opening));};
      difficultyPicker.onfocusout=event=>{if(!difficultyPicker.contains(event.relatedTarget))closeDifficultyMenu();};
      difficultyMenu.querySelectorAll('[data-problem-difficulty]').forEach(button=>button.onclick=()=>{filters={...filters,...Object.fromEntries(new FormData(form)),difficulty:button.dataset.problemDifficulty};page=0;paint();});
      portalContent.querySelectorAll('[data-problem-page]').forEach(button=>button.onclick=()=>{page=Number(button.dataset.problemPage);paint();});
      portalContent.querySelectorAll('[data-problem-exam]').forEach(button=>button.onclick=()=>{if(activateExam(button.dataset.problemExam,Number(button.dataset.problemIndex)))route('exam');});
    };
    paint();
  }
  if(name==='practice'){
    paintPortalPage(renderExamCenter());
    const showPracticePanel=category=>{
      secondary.querySelectorAll('[data-exam-center-tab]').forEach(button=>{const active=button.dataset.examCenterTab===category;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));});
      secondary.querySelectorAll('[data-exam-center-panel]').forEach(panel=>{const active=panel.dataset.examCenterPanel===category;panel.hidden=!active;panel.classList.toggle('active',active);});
    };
    secondary.querySelectorAll('[data-exam-center-tab]').forEach(button=>button.onclick=()=>showPracticePanel(button.dataset.examCenterTab));
    secondary.querySelectorAll('[data-exam-version][data-question-open]').forEach(button=>button.onclick=()=>{if(activateExam(button.dataset.examVersion,Number(button.dataset.questionOpen)))route('exam');});
    setupKeyQuestionLinks(secondary.querySelector('.key-question-browser'));
  }
  if(name==='info'){
    secondary.innerHTML=renderExamInfo();
    secondary.querySelectorAll('[data-question-open]').forEach(button=>button.onclick=()=>{const target=Number(button.dataset.questionOpen);if(activateExam(button.dataset.examVersion||config.examVersion,target))route('exam');});
  }
  if(name==='realtime')secondary.innerHTML=renderScoreboard();
  if(name==='solutions')secondary.innerHTML=renderSolutions();
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
    const initializedAdvicePanels=new Set();
    const initializeAdvicePanel=category=>{
      if(initializedAdvicePanels.has(category))return;
      if(category==='knowledge')setupKnowledgeReader(secondary.querySelector('.carl-reader'));
      initializedAdvicePanels.add(category);
    };
    const showAdvicePanel=category=>{
      if(!STUDY_TABS.includes(category))category='knowledge';
      studyActiveTab=category;
      secondary.querySelectorAll('[data-study-tab]').forEach(button=>{const active=button.dataset.studyTab===category;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));});
      secondary.querySelectorAll('[data-study-panel]').forEach(panel=>{const active=panel.dataset.studyPanel===category;panel.hidden=!active;panel.classList.toggle('active',active);});
      secondary.querySelectorAll('[data-study-jump]').forEach(button=>button.classList.toggle('active',button.dataset.studyJump===category));
      try{localStorage.setItem(STUDY_TAB_STORAGE,category);}catch{}
      initializeAdvicePanel(category);
    };
    secondary.querySelectorAll('[data-study-tab]').forEach(button=>button.onclick=()=>showAdvicePanel(button.dataset.studyTab));
    secondary.querySelectorAll('[data-study-jump]').forEach(button=>button.onclick=()=>showAdvicePanel(button.dataset.studyJump));
    secondary.querySelector('[data-study-go-problems]')?.addEventListener('click',()=>route('problemset'));
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
    showAdvicePanel(studyActiveTab);
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
    for(const key of Object.keys(results))delete results[key];for(const key of Object.keys(scores))delete scores[key];
    loadCodeStores(config.examVersion);activeQuestionId=config.questions[current].id;
    render();restoreSavedCode();renderSettings();
    const tests=config.questions.reduce((total,q)=>total+(Number(q.tests)||0),0),configured=config.questions.reduce((total,q)=>total+(q.testCases||[]).length,0);
    $('#import-note').textContent=`已识别 ${config.questions.length} 道题，题号 ${config.questions[0].id}–${config.questions.at(-1).id}，${tests} 个测试点；其中 ${configured} 个已导入输入与预期输出。正式评测仍需同步服务端题库。`;
  }catch(error){$('#import-note').textContent='导入失败：'+error.message;}
  event.target.value='';
}
$('#overview-toggle').onclick=()=>{$('#pta-app').classList.toggle('overview-collapsed');const closed=$('#pta-app').classList.contains('overview-collapsed');$('#overview-toggle').textContent=closed?'▯':'▮';};$('#previous').onclick=()=>changeQuestion((current+config.questions.length-1)%config.questions.length);$('#next').onclick=()=>changeQuestion((current+1)%config.questions.length);function updateDraftState(){const saved=persistActiveDraft();$('#submit-state').textContent=saved?(portalAuthenticated?'本地草稿已保存，正在同步':'草稿已保存在本机'):'草稿保存失败，请复制代码后重试';}window.addEventListener('oms-code-save-draft',updateDraftState);window.addEventListener('beforeunload',persistActiveDraft);document.querySelectorAll('.rail-button').forEach(button=>button.onclick=()=>route(button.dataset.route));$('#home-button').onclick=()=>route('home');code.oninput=()=>{lines();updateDraftState();};$('#language').addEventListener('change',updateDraftState);lines();document.querySelectorAll('[data-tab]').forEach(button=>button.onclick=()=>setTab(button.dataset.tab));$('#tester-toggle').onclick=()=>{const tester=$('#tester');tester.classList.toggle('collapsed');tester.classList.remove('expanded');syncTesterToggle();};syncTesterToggle();$('#reset-test').onclick=()=>{const q=config.questions[current],sample=q.testCases?.[0]||{input:q.sampleInput||'',expected:q.sampleOutput||''};$('#sample-input').value=sample.input||'';$('#expected').textContent=sample.expected||'';$('#run-state').textContent='等待运行';};$('#run-test').onclick=()=>judge('sample');$('#submit').onclick=()=>judge('submit');
const dialog=$('#admin-dialog'),form=$('#admin-form');$('#open-admin').onclick=()=>{for(const [key,value] of Object.entries(config))if(form.elements[key])form.elements[key].value=value;renderSettings();dialog.showModal();};dialog.querySelector('.close').onclick=()=>dialog.close();dialog.querySelector('.cancel').onclick=()=>dialog.close();$('#import-file').onchange=importNumberedQuestions;form.onsubmit=event=>{event.preventDefault();const data=new FormData(form);for(const key of ['title','duration','startAt','endAt','seat','candidateName','studentId','registered'])config[key]=key==='duration'||key==='registered'?Number(data.get(key)):data.get(key);const start=Date.parse(config.startAt),end=Date.parse(config.endAt);if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start){$('#import-note').textContent='结束时间必须晚于开始时间。';return;}config.duration=Math.round((end-start)/60000);document.querySelectorAll('.question-setting').forEach(row=>{const q=config.questions[Number(row.querySelector('[data-k="name"]').dataset.i)];q.name=row.querySelector('[data-k="name"]').value;q.score=Number(row.querySelector('[data-k="score"]').value)||1;q.tests=Number(row.querySelector('[data-k="tests"]').value)||1;});localStorage.setItem(STORAGE,JSON.stringify(config));current=Math.min(current,config.questions.length-1);dialog.close();render();updateCountdown();syncSolutionNavigation();};render();route('info');updateCountdown();syncSolutionNavigation();window.setInterval(()=>{updateCountdown();syncSolutionNavigation();},1000);
