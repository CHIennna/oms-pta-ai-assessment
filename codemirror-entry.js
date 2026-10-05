import {Compartment, EditorSelection, EditorState} from '@codemirror/state';
import {EditorView, Decoration, ViewPlugin, drawSelection, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, lineNumbers, rectangularSelection} from '@codemirror/view';
import {HighlightStyle, syntaxHighlighting} from '@codemirror/language';
import {cpp} from '@codemirror/lang-cpp';
import {python} from '@codemirror/lang-python';
import {java} from '@codemirror/lang-java';
import {tags} from '@lezer/highlight';

const input = document.querySelector('#code');
const legacyGutter = document.querySelector('#lines');
const languageSelect = document.querySelector('#language');
if (!input || !legacyGutter || !languageSelect) throw new Error('未找到代码编辑器容器。');

const mono = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
const indentation = '    ';
const bracketPairs = {'(': ')', '[': ']', '{': '}', "'": "'", '"': '"'};
const closingBrackets = new Set(Object.values(bracketPairs));
const language = new Compartment();
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
  '&': {height: '100%', color: 'var(--code-text, #d9d9d9)', backgroundColor: 'var(--code-bg, #404040)'},
  '.cm-scroller': {fontFamily: mono, lineHeight: '1.55'},
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
function replaceDocument(text) {
  replacing = true;
  view.dispatch({changes: {from: 0, to: view.state.doc.length, insert: text}});
  input.value = text;
  input.dispatchEvent(new Event('input', {bubbles: true}));
  replacing = false;
}
function handleShortcut(event, editor) {
    if (!(event.ctrlKey || event.metaKey) || event.altKey) return false;
    const key = event.key.toLowerCase();
    if (key === 'a') { editor.dispatch({selection: {anchor: 0, head: editor.state.doc.length}}); event.preventDefault(); return true; }
    if (key === 'z' && !event.shiftKey && editingHistory.undo.length) { editingHistory.redo.push(editor.state.doc.toString()); replaceDocument(editingHistory.undo.pop()); event.preventDefault(); return true; }
    if ((key === 'y' || (key === 'z' && event.shiftKey)) && editingHistory.redo.length) { editingHistory.undo.push(editor.state.doc.toString()); replaceDocument(editingHistory.redo.pop()); event.preventDefault(); return true; }
    if (key === 's') { window.dispatchEvent(new Event('oms-code-save-draft')); event.preventDefault(); return true; }
    return false;
}
function insertIndentation(event, editor) {
  if (event.key !== 'Tab' || event.ctrlKey || event.metaKey || event.altKey) return false;
  const transaction = editor.state.changeByRange(range => ({
    changes: {from: range.from, to: range.to, insert: indentation},
    range: EditorSelection.cursor(range.from + indentation.length)
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
const commonShortcuts = EditorView.domEventHandlers({keydown: handleShortcut});
const view = new EditorView({
  state: EditorState.create({
    doc: input.value,
    extensions: [
      lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(), drawSelection(), preciseSelectionPlugin, rectangularSelection(), highlightActiveLine(), indentationDotPlugin, localLoopVariablePlugin, includeHeaderPlugin, commonShortcuts,
      ptaTheme, syntaxHighlighting(ptaHighlight), language.of(languageFor()),
      EditorView.updateListener.of(update => {
        if (!update.docChanged || replacing) return;
        editingHistory.undo.push(update.startState.doc.toString());
        if (editingHistory.undo.length > 200) editingHistory.undo.shift();
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
  replacing = true;
  view.dispatch({changes: {from: 0, to: view.state.doc.length, insert: input.value}});
  replacing = false;
});
languageSelect.addEventListener('change', () => view.dispatch({effects: language.reconfigure(languageFor())}));
window.omsCodeEditor = {getValue: () => view.state.doc.toString(), focus: () => view.focus()};
