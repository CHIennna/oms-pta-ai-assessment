import {Compartment, EditorSelection, EditorState} from '@codemirror/state';
import {EditorView, Decoration, ViewPlugin, drawSelection, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, lineNumbers, rectangularSelection} from '@codemirror/view';
import {HighlightStyle, bracketMatching, syntaxHighlighting} from '@codemirror/language';
import {cpp} from '@codemirror/lang-cpp';
import {python} from '@codemirror/lang-python';
import {java} from '@codemirror/lang-java';
import {tags} from '@lezer/highlight';
import {indentationDeleteSize} from './indentation-backspace.js';
import {lineCommentChanges} from './line-comment.js';

const input = document.querySelector('#code');
const legacyGutter = document.querySelector('#lines');
const languageSelect = document.querySelector('#language');
const settingsButton = document.querySelector('#editor-settings-button');
const settingsDialog = document.querySelector('#editor-settings-dialog');
const settingsForm = document.querySelector('#editor-settings-form');
const codingPanel = document.querySelector('.coding');
if (!input || !legacyGutter || !languageSelect) throw new Error('未找到代码编辑器容器。');

const mono = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
const settingsStorageKey = 'oms-editor-settings-v2';
const defaultSettings = {fontSize: 14, tabSize: 4, theme: 'follow-page', keymap: 'default', showWhitespace: true};
let editorSettings = {...defaultSettings};
let indentation = ' '.repeat(editorSettings.tabSize);
const bracketPairs = {'(': ')', '[': ']', '{': '}', "'": "'", '"': '"'};
const closingBrackets = new Set(Object.values(bracketPairs));
const language = new Compartment();
const tabSize = new Compartment();
const whitespace = new Compartment();
const fontSize = new Compartment();
const languageFor = () => ({
  'C++ (g++)': cpp(),
  'C++ (clang++)': cpp(),
  'C (gcc)': cpp(),
  'C (clang)': cpp(),
  'Python 3': python(),
  'Python 2': python(),
  'PyPy': python(),
  'Java': java(),
  'Java 17': java()
}[languageSelect.value] || cpp());
const isPythonLanguage = () => languageSelect.value.startsWith('Python') || languageSelect.value === 'PyPy';

function whitespaceDots(view) {
  const marks = [];
  for (const range of view.visibleRanges) {
    for (let line = view.state.doc.lineAt(range.from);; line = view.state.doc.line(line.number + 1)) {
      for (const match of line.text.matchAll(/[\t ]+/g)) {
        marks.push(Decoration.mark({class: 'cm-indent-marker'}).range(line.from + match.index, line.from + match.index + match[0].length));
      }
      if (line.to >= range.to || line.number === view.state.doc.lines) break;
    }
  }
  return Decoration.set(marks, true);
}
const indentationDotPlugin = ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = whitespaceDots(view); }
  update(update) { if (update.docChanged || update.viewportChanged) this.decorations = whitespaceDots(update.view); }
}, {decorations: value => value.decorations});

function localLoopVariables(view) {
  const names = new Set();
  for (let number = 1; number <= view.state.doc.lines; number++) {
    const declaration = view.state.doc.line(number).text.match(/\bfor\s*\(\s*(?:(?:const|unsigned|signed|long|short)\s+)*(?:[A-Za-z_]\w*(?:::[A-Za-z_]\w*)?(?:\s*<[^>]+>)?\s+)+([A-Za-z_]\w*)\s*(?:=|:)/);
    if (declaration) names.add(declaration[1]);
  }
  if (!names.size) return Decoration.none;
  const matcher = new RegExp(`\\b(?:${[...names].map(name => name.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')).join('|')})\\b`, 'g');
  const marks = [];
  for (const range of view.visibleRanges) {
    for (let line = view.state.doc.lineAt(range.from);; line = view.state.doc.line(line.number + 1)) {
      for (let match; (match = matcher.exec(line.text));) marks.push(Decoration.mark({class: 'cm-loop-variable'}).range(line.from + match.index, line.from + match.index + match[0].length));
      matcher.lastIndex = 0;
      if (line.to >= range.to || line.number === view.state.doc.lines) break;
    }
  }
  return Decoration.set(marks, true);
}
const localLoopVariablePlugin = ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = localLoopVariables(view); }
  update(update) { if (update.docChanged || update.viewportChanged) this.decorations = localLoopVariables(update.view); }
}, {decorations: value => value.decorations});

function includeHeaders(view) {
  const marks = [];
  for (const range of view.visibleRanges) {
    for (let line = view.state.doc.lineAt(range.from);; line = view.state.doc.line(line.number + 1)) {
      const header = /^\s*#\s*include\s*(<[^>\n]+>|"[^"\n]+")/.exec(line.text);
      if (header) { const start = line.text.indexOf(header[1]); marks.push(Decoration.mark({class: 'cm-include-header'}).range(line.from + start, line.from + start + header[1].length)); }
      if (line.to >= range.to || line.number === view.state.doc.lines) break;
    }
  }
  return Decoration.set(marks, true);
}
const includeHeaderPlugin = ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = includeHeaders(view); }
  update(update) { if (update.docChanged || update.viewportChanged) this.decorations = includeHeaders(update.view); }
}, {decorations: value => value.decorations});

function preciseSelectionMarks(view) {
  const marks = [];
  for (const range of view.state.selection.ranges) {
    if (range.empty) continue;
    let line = view.state.doc.lineAt(range.from);
    while (true) {
      const from = Math.max(range.from, line.from);
      const to = Math.min(range.to, line.to);
      if (from < to) marks.push(Decoration.mark({class: 'cm-precise-selection'}).range(from, to));
      if (line.to >= range.to || line.number === view.state.doc.lines) break;
      line = view.state.doc.line(line.number + 1);
    }
  }
  return Decoration.set(marks, true);
}
const preciseSelectionPlugin = ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = preciseSelectionMarks(view); }
  update(update) {
    if (update.docChanged || update.selectionSet || update.viewportChanged) this.decorations = preciseSelectionMarks(update.view);
  }
}, {decorations: value => value.decorations});

const ptaTheme = EditorView.theme({
  '&': {height: '100%', width: '100%', maxWidth: '100%', minWidth: '0', flex: '1 1 auto', color: 'var(--code-text, #d9d9d9)', backgroundColor: 'var(--code-bg, #404040)'},
  '.cm-scroller': {minWidth: '0', maxWidth: '100%', overflow: 'auto', fontFamily: mono, lineHeight: '1.55'},
  '.cm-content': {padding: '0.5rem 0', caretColor: 'var(--code-caret, #f2f2f2)'},
  '.cm-line': {paddingLeft: '0.5rem'},
  '.cm-indent-marker': {backgroundImage: 'radial-gradient(circle, var(--code-indent, #797979) 1px, transparent 1.2px)', backgroundPosition: '0 52%', backgroundRepeat: 'repeat-x', backgroundSize: '8.4px 4px'},
  '.cm-loop-variable': {color: 'var(--code-text, #d9d9d9) !important'},
  '.cm-include-header': {color: 'var(--syntax-meta, #80baff) !important'},
  '.cm-gutters': {minWidth: '58px', color: 'var(--code-gutter, #999)', backgroundColor: 'var(--code-bg, #404040)', borderRight: '1px solid var(--code-border, rgba(255,255,255,.06))'},
  '.cm-lineNumbers .cm-gutterElement': {padding: '0 1rem', boxSizing: 'content-box'},
  '.cm-activeLine': {backgroundColor: 'var(--code-active-line, #444)'},
  '.cm-activeLineGutter': {backgroundColor: 'var(--code-active-line, #444)'},
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {backgroundColor: 'transparent !important'},
  '.cm-precise-selection': {backgroundColor: 'var(--code-selection, rgba(49,135,235,.55)) !important'},
  '.cm-matchingBracket': {backgroundColor: 'var(--code-bracket-match, rgba(47, 143, 255, .2))', outline: 'none', boxShadow: 'inset 0 0 0 1px var(--code-bracket-outline, #2f8fff)', borderBottom: 'none', borderRadius: '1px', padding: '0', margin: '0'},
  '.cm-nonmatchingBracket': {backgroundColor: 'var(--code-bracket-error, rgba(238, 76, 76, .2))', outline: 'none', boxShadow: 'inset 0 0 0 1px var(--code-bracket-error-outline, #ee4c4c)', borderBottom: 'none', borderRadius: '1px', padding: '0', margin: '0'},
  '.cm-cursor, .cm-dropCursor': {borderLeftColor: 'var(--code-caret, #f2f2f2)'}
}, {dark: true});

const ptaHighlight = HighlightStyle.define([
  {tag: [tags.meta, tags.processingInstruction], color: 'var(--syntax-meta, #80baff)'},
  {tag: [tags.keyword, tags.controlKeyword, tags.definitionKeyword, tags.operatorKeyword], color: 'var(--syntax-keyword, #ff7587)'},
  {tag: [tags.typeName, tags.className, tags.namespace], color: 'var(--syntax-type, #7dbbff)'},
  {tag: [tags.name, tags.variableName, tags.definition(tags.variableName), tags.function(tags.variableName), tags.function(tags.name), tags.standard(tags.variableName), tags.standard(tags.name), tags.propertyName, tags.labelName], color: 'var(--syntax-name, #80c7ff)'},
  {tag: [tags.string, tags.special(tags.string)], color: 'var(--syntax-string, #c3d880)'},
  {tag: [tags.number, tags.bool, tags.null], color: 'var(--syntax-number, #d1a1ff)'},
  {tag: [tags.comment, tags.lineComment, tags.blockComment], color: 'var(--syntax-comment, #85909a)'}
]);

let replacing = false;
const editingHistory = {undo: [], redo: []};
function editorSnapshot(editor) {
  return {
    text: editor.state.doc.toString(),
    selection: editor.state.selection.toJSON(),
    scrollTop: editor.scrollDOM.scrollTop,
    scrollLeft: editor.scrollDOM.scrollLeft
  };
}
function pushHistory(stack, snapshot) {
  stack.push(snapshot);
  if (stack.length > 200) stack.shift();
}
function snapshotForCurrentViewport(editor, snapshot) {
  const selection = EditorSelection.fromJSON(snapshot.selection);
  const head = selection.main.head;
  return head >= editor.viewport.from && head <= editor.viewport.to
    ? {...snapshot, scrollTop: editor.scrollDOM.scrollTop, scrollLeft: editor.scrollDOM.scrollLeft}
    : snapshot;
}
function replaceDocument(snapshot) {
  replacing = true;
  view.dispatch({
    changes: {from: 0, to: view.state.doc.length, insert: snapshot.text},
    selection: EditorSelection.fromJSON(snapshot.selection)
  });
  input.value = snapshot.text;
  input.dispatchEvent(new Event('input', {bubbles: true}));
  replacing = false;
  requestAnimationFrame(() => {
    view.scrollDOM.scrollTop = snapshot.scrollTop;
    view.scrollDOM.scrollLeft = snapshot.scrollLeft;
  });
}
function handleShortcut(event, editor) {
    if (!(event.ctrlKey || event.metaKey) || event.altKey) return false;
    const key = event.key.toLowerCase();
    if (key === 'a') { editor.dispatch({selection: {anchor: 0, head: editor.state.doc.length}}); event.preventDefault(); return true; }
    if (key === 'z' && !event.shiftKey && editingHistory.undo.length) { pushHistory(editingHistory.redo, editorSnapshot(editor)); replaceDocument(snapshotForCurrentViewport(editor, editingHistory.undo.pop())); event.preventDefault(); return true; }
    if ((key === 'y' || (key === 'z' && event.shiftKey)) && editingHistory.redo.length) { pushHistory(editingHistory.undo, editorSnapshot(editor)); replaceDocument(snapshotForCurrentViewport(editor, editingHistory.redo.pop())); event.preventDefault(); return true; }
    if (!event.shiftKey && (key === '/' || event.code === 'Slash')) {
      const token = isPythonLanguage() ? '#' : '//';
      const ranges = editor.state.selection.ranges.map(range => ({from: range.from, to: range.to}));
      const changes = lineCommentChanges(editor.state.doc.toString(), ranges, token);
      if (changes.length) editor.dispatch({changes, scrollIntoView: true});
      event.preventDefault();
      return true;
    }
    if (key === 's') { window.dispatchEvent(new Event('oms-code-save-draft')); event.preventDefault(); return true; }
    return false;
}
function insertIndentation(event, editor) {
  if (event.key !== 'Tab' || event.ctrlKey || event.metaKey || event.altKey) return false;
  const ranges = editor.state.selection.ranges;
  if (event.shiftKey || ranges.some(range => !range.empty)) {
    const lineNumbers = new Set();
    for (const range of ranges) {
      const fromLine = editor.state.doc.lineAt(range.from).number;
      const effectiveTo = range.to > range.from && editor.state.doc.lineAt(range.to).from === range.to
        ? range.to - 1
        : range.to;
      const toLine = editor.state.doc.lineAt(effectiveTo).number;
      for (let number = fromLine; number <= toLine; number++) lineNumbers.add(number);
    }
    const changes = [...lineNumbers].sort((left, right) => left - right).flatMap(number => {
      const line = editor.state.doc.line(number);
      if (!event.shiftKey) return [{from: line.from, insert: indentation}];
      if (line.text.startsWith('\t')) return [{from: line.from, to: line.from + 1, insert: ''}];
      const spaces = Math.min(indentation.length, (line.text.match(/^ +/) || [''])[0].length);
      return spaces ? [{from: line.from, to: line.from + spaces, insert: ''}] : [];
    });
    if (changes.length) editor.dispatch({changes});
    event.preventDefault();
    return true;
  }
  const transaction = editor.state.changeByRange(range => ({
    changes: {
      from: range.from,
      to: range.to,
      insert: indentation.slice((range.from - editor.state.doc.lineAt(range.from).from) % indentation.length)
    },
    range: EditorSelection.cursor(range.from + (indentation.length - ((range.from - editor.state.doc.lineAt(range.from).from) % indentation.length)))
  }));
  editor.dispatch(transaction);
  event.preventDefault();
  return true;
}
function insertSmartNewline(event, editor) {
  if (event.key !== 'Enter' || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return false;
  const transaction = editor.state.changeByRange(range => {
    const startLine = editor.state.doc.lineAt(range.from);
    const endLine = editor.state.doc.lineAt(range.to);
    const before = startLine.text.slice(0, range.from - startLine.from);
    const after = endLine.text.slice(range.to - endLine.from);
    const baseIndent = (before.match(/^\s*/) || [''])[0];
    const opening = before.trimEnd().slice(-1);
    const closing = after.trimStart().slice(0, 1);
    const betweenPair = bracketPairs[opening] === closing;
    const needsIndent = ['(', '[', '{'].includes(opening)
      || (isPythonLanguage() && before.trimEnd().endsWith(':'));
    const firstIndent = baseIndent + (needsIndent ? indentation : '');
    const insert = betweenPair
      ? `\n${firstIndent}\n${baseIndent}`
      : `\n${firstIndent}`;
    return {
      changes: {from: range.from, to: range.to, insert},
      range: EditorSelection.cursor(range.from + 1 + firstIndent.length)
    };
  });
  editor.dispatch(transaction);
  event.preventDefault();
  return true;
}
function insertMatchingBracket(event, editor) {
  if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return false;
  const key = event.key;
  if (!bracketPairs[key] && !closingBrackets.has(key)) return false;
  const transaction = editor.state.changeByRange(range => {
    const nextCharacter = editor.state.sliceDoc(range.from, range.from + 1);
    if (range.empty && closingBrackets.has(key) && nextCharacter === key) {
      return {range: EditorSelection.cursor(range.from + 1)};
    }
    const selected = editor.state.sliceDoc(range.from, range.to);
    if (bracketPairs[key]) {
      const insert = `${key}${selected}${bracketPairs[key]}`;
      return {
        changes: {from: range.from, to: range.to, insert},
        range: selected
          ? EditorSelection.range(range.from + 1, range.from + 1 + selected.length)
          : EditorSelection.cursor(range.from + 1)
      };
    }
    return {
      changes: {from: range.from, to: range.to, insert: key},
      range: EditorSelection.cursor(range.from + 1)
    };
  });
  editor.dispatch(transaction);
  event.preventDefault();
  return true;
}
function deleteEmptyBracketPair(event, editor) {
  if (event.key !== 'Backspace' || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return false;
  const ranges = editor.state.selection.ranges;
  if (ranges.some(range => !range.empty || range.from === 0)) return false;
  if (ranges.some(range => bracketPairs[editor.state.sliceDoc(range.from - 1, range.from)] !== editor.state.sliceDoc(range.from, range.from + 1))) return false;
  const transaction = editor.state.changeByRange(range => ({
    changes: {from: range.from - 1, to: range.from + 1},
    range: EditorSelection.cursor(range.from - 1)
  }));
  editor.dispatch(transaction);
  event.preventDefault();
  return true;
}
function deleteIndentation(event, editor) {
  if (event.key !== 'Backspace' || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return false;
  const ranges = editor.state.selection.ranges;
  if (ranges.some(range => {
    if (!range.empty) return true;
    const line = editor.state.doc.lineAt(range.from);
    const before = line.text.slice(0, range.from - line.from);
    return !/^ +$/.test(before);
  })) return false;
  const transaction = editor.state.changeByRange(range => {
    const line = editor.state.doc.lineAt(range.from);
    const spaceCount = range.from - line.from;
    const deleteSize = indentationDeleteSize(spaceCount, indentation.length);
    return {
      changes: {from: range.from - deleteSize, to: range.from},
      range: EditorSelection.cursor(range.from - deleteSize)
    };
  });
  editor.dispatch(transaction);
  event.preventDefault();
  return true;
}
const commonShortcuts = EditorView.domEventHandlers({keydown: handleShortcut});
const fontSizeExtension = value => EditorView.theme({
  '&': {fontSize: `${value}px`},
  '.cm-scroller': {fontFamily: mono}
});
const view = new EditorView({
  state: EditorState.create({
    doc: input.value,
    extensions: [
      lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(), drawSelection(), preciseSelectionPlugin, rectangularSelection(), highlightActiveLine(), localLoopVariablePlugin, includeHeaderPlugin, commonShortcuts,
      ptaTheme, syntaxHighlighting(ptaHighlight), language.of(languageFor()), tabSize.of(EditorState.tabSize.of(editorSettings.tabSize)), whitespace.of(indentationDotPlugin), fontSize.of(fontSizeExtension(editorSettings.fontSize)), bracketMatching({afterCursor: true}),
      EditorView.updateListener.of(update => {
        if (!update.docChanged || replacing) return;
        pushHistory(editingHistory.undo, {
          text: update.startState.doc.toString(),
          selection: update.startState.selection.toJSON(),
          scrollTop: update.view.scrollDOM.scrollTop,
          scrollLeft: update.view.scrollDOM.scrollLeft
        });
        editingHistory.redo.length = 0;
        input.value = update.state.doc.toString();
        input.dispatchEvent(new Event('input', {bubbles: true}));
      })
    ]
  }),
  parent: input.parentElement
});

view.contentDOM.addEventListener('keydown', event => {
  if (insertIndentation(event, view)
    || insertSmartNewline(event, view)
    || insertMatchingBracket(event, view)
    || deleteIndentation(event, view)
    || deleteEmptyBracketPair(event, view)
    || handleShortcut(event, view)) event.stopImmediatePropagation();
}, true);

let mouseSelection = null;
const selectionPosition = event => view.posAtCoords({x: event.clientX, y: event.clientY}, true)
  ?? view.posAtCoords({x: event.clientX, y: event.clientY}, false);
view.contentDOM.addEventListener('pointerdown', event => {
  if (event.button !== 0 || event.shiftKey || event.detail !== 1) return;
  const start = selectionPosition(event);
  if (start == null) return;
  mouseSelection = {pointerId: event.pointerId, anchor: start};
  view.focus();
  view.dispatch({selection: {anchor: start, head: start}});
  view.contentDOM.setPointerCapture(event.pointerId);
  event.preventDefault();
  event.stopImmediatePropagation();
}, true);
view.contentDOM.addEventListener('pointermove', event => {
  if (!mouseSelection || event.pointerId !== mouseSelection.pointerId) return;
  const head = selectionPosition(event);
  if (head == null) return;
  view.dispatch({selection: {anchor: mouseSelection.anchor, head}});
  event.preventDefault();
}, true);
const finishMouseSelection = event => {
  if (!mouseSelection || event.pointerId !== mouseSelection.pointerId) return;
  if (view.contentDOM.hasPointerCapture(event.pointerId)) view.contentDOM.releasePointerCapture(event.pointerId);
  mouseSelection = null;
};
view.contentDOM.addEventListener('pointerup', finishMouseSelection, true);
view.contentDOM.addEventListener('pointercancel', finishMouseSelection, true);

input.hidden = true;
legacyGutter.hidden = true;
input.addEventListener('input', () => {
  if (replacing || input.value === view.state.doc.toString()) return;
  editingHistory.undo.length = 0;
  editingHistory.redo.length = 0;
  replacing = true;
  view.dispatch({
    changes: {from: 0, to: view.state.doc.length, insert: input.value},
    selection: {anchor: 0}
  });
  view.scrollDOM.scrollTop = 0;
  view.scrollDOM.scrollLeft = 0;
  replacing = false;
});
languageSelect.addEventListener('change', () => view.dispatch({effects: language.reconfigure(languageFor())}));

function normalizedSettings(value = {}) {
  const font = Number(value.fontSize);
  const tab = Number(value.tabSize);
  return {
    fontSize: [12, 14, 16, 18, 20].includes(font) ? font : defaultSettings.fontSize,
    tabSize: [2, 4, 8].includes(tab) ? tab : defaultSettings.tabSize,
    theme: ['follow-page', 'github-dark', 'github-light'].includes(value.theme) ? value.theme : defaultSettings.theme,
    keymap: 'default',
    showWhitespace: value.showWhitespace !== false
  };
}

function readSavedSettings() {
  try { return normalizedSettings(JSON.parse(localStorage.getItem(settingsStorageKey) || '{}')); }
  catch { return {...defaultSettings}; }
}

function applyEditorSettings(nextSettings, persist = false) {
  editorSettings = normalizedSettings(nextSettings);
  indentation = ' '.repeat(editorSettings.tabSize);
  codingPanel?.classList.toggle('editor-theme-github-dark', editorSettings.theme === 'github-dark');
  codingPanel?.classList.toggle('editor-theme-github-light', editorSettings.theme === 'github-light');
  view.dispatch({effects: [
    tabSize.reconfigure(EditorState.tabSize.of(editorSettings.tabSize)),
    whitespace.reconfigure(editorSettings.showWhitespace ? indentationDotPlugin : []),
    fontSize.reconfigure(fontSizeExtension(editorSettings.fontSize))
  ]});
  if (persist) {
    try { localStorage.setItem(settingsStorageKey, JSON.stringify(editorSettings)); }
    catch { /* 设置仍在当前页面生效；隐私模式下允许存储失败。 */ }
  }
}

function fillSettingsForm() {
  if (!settingsForm) return;
  settingsForm.elements.fontSize.value = String(editorSettings.fontSize);
  settingsForm.elements.tabSize.value = String(editorSettings.tabSize);
  settingsForm.elements.theme.value = editorSettings.theme;
  settingsForm.elements.keymap.value = editorSettings.keymap;
  settingsForm.elements.showWhitespace.checked = editorSettings.showWhitespace;
}

applyEditorSettings(readSavedSettings());
function positionSettingsDialog() {
  if (!settingsButton || !settingsDialog) return;
  const anchor = settingsButton.getBoundingClientRect();
  const width = settingsDialog.offsetWidth || 470;
  const height = settingsDialog.offsetHeight || 390;
  const gap = 8;
  const left = Math.min(Math.max(12, anchor.right - width), window.innerWidth - width - 12);
  const below = anchor.bottom + gap;
  const top = below + height <= window.innerHeight - 12
    ? below
    : Math.max(12, anchor.top - height - gap);
  settingsDialog.style.left = `${left}px`;
  settingsDialog.style.top = `${top}px`;
}

settingsButton?.addEventListener('click', event => {
  event.stopPropagation();
  if (settingsDialog?.open) {
    settingsDialog.close('toggle');
    view.focus();
    return;
  }
  fillSettingsForm();
  settingsDialog?.show();
  positionSettingsDialog();
});
settingsForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(settingsForm);
  applyEditorSettings({
    fontSize: data.get('fontSize'),
    tabSize: data.get('tabSize'),
    theme: data.get('theme'),
    keymap: data.get('keymap'),
    showWhitespace: settingsForm.elements.showWhitespace.checked
  }, true);
  settingsDialog?.close('confirm');
  view.focus();
});
settingsForm?.querySelector('[data-editor-settings-cancel]')?.addEventListener('click', () => settingsDialog?.close('cancel'));
document.addEventListener('pointerdown', event => {
  if (!settingsDialog?.open || settingsDialog.contains(event.target) || settingsButton?.contains(event.target)) return;
  settingsDialog.close('outside');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && settingsDialog?.open) {
    settingsDialog.close('escape');
    view.focus();
  }
});
window.addEventListener('resize', () => {
  if (settingsDialog?.open) positionSettingsDialog();
});
window.omsCodeEditor = {
  getValue: () => view.state.doc.toString(),
  focus: () => view.focus(),
  getSettings: () => ({...editorSettings})
};
