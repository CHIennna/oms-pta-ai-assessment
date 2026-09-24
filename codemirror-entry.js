import {Compartment, EditorState} from '@codemirror/state';
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
const language = new Compartment();
const languageFor = () => ({
  'C++ (g++)': cpp(),
  'Python 3': python(),
  'Java 17': java()
}[languageSelect.value] || cpp());

function indentationDots(view) {
  const marks = [];
  for (const range of view.visibleRanges) {
    for (let line = view.state.doc.lineAt(range.from);; line = view.state.doc.line(line.number + 1)) {
      const indentation = line.text.match(/^[\t ]+/)?.[0] || '';
      if (indentation) marks.push(Decoration.mark({class: 'cm-indent-marker'}).range(line.from, line.from + indentation.length));
      if (line.to >= range.to || line.number === view.state.doc.lines) break;
    }
  }
  return Decoration.set(marks, true);
}
const indentationDotPlugin = ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = indentationDots(view); }
  update(update) { if (update.docChanged || update.viewportChanged) this.decorations = indentationDots(update.view); }
}, {decorations: value => value.decorations});

function localLoopVariables(view) {
  const marks = [];
  for (const range of view.visibleRanges) {
    for (let line = view.state.doc.lineAt(range.from);; line = view.state.doc.line(line.number + 1)) {
      const matcher = /\b(?:ch|i)\b/g;
      for (let match; (match = matcher.exec(line.text));) marks.push(Decoration.mark({class: 'cm-loop-variable'}).range(line.from + match.index, line.from + match.index + match[0].length));
      if (line.to >= range.to || line.number === view.state.doc.lines) break;
    }
  }
  return Decoration.set(marks, true);
}
const localLoopVariablePlugin = ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = localLoopVariables(view); }
  update(update) { if (update.docChanged || update.viewportChanged) this.decorations = localLoopVariables(update.view); }
}, {decorations: value => value.decorations});

const ptaTheme = EditorView.theme({
  '&': {height: '100%', color: '#d9d9d9', backgroundColor: '#404040'},
  '.cm-scroller': {fontFamily: mono, lineHeight: '1.75'},
  '.cm-content': {padding: '0.5rem 0', caretColor: '#f2f2f2'},
  '.cm-line': {paddingLeft: '0.5rem'},
  '.cm-indent-marker': {backgroundImage: 'radial-gradient(circle, #797979 1px, transparent 1.2px)', backgroundPosition: '0 52%', backgroundRepeat: 'repeat-x', backgroundSize: '8.4px 4px'},
  '.cm-loop-variable': {color: '#d9d9d9 !important'},
  '.cm-gutters': {minWidth: '58px', color: '#999', backgroundColor: '#404040', borderRight: '1px solid rgba(255,255,255,.06)'},
  '.cm-lineNumbers .cm-gutterElement': {padding: '0 1rem', boxSizing: 'content-box'},
  '.cm-activeLine': {backgroundColor: '#444'},
  '.cm-activeLineGutter': {backgroundColor: '#444'},
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {backgroundColor: 'rgba(49,135,235,.45) !important'},
  '.cm-cursor, .cm-dropCursor': {borderLeftColor: '#f2f2f2'}
}, {dark: true});

const ptaHighlight = HighlightStyle.define([
  {tag: [tags.meta, tags.processingInstruction], color: '#80baff'},
  {tag: [tags.keyword, tags.controlKeyword, tags.definitionKeyword, tags.operatorKeyword], color: '#ff7587'},
  {tag: [tags.typeName, tags.className, tags.namespace], color: '#7dbbff'},
  {tag: [tags.name, tags.variableName, tags.definition(tags.variableName), tags.function(tags.variableName), tags.function(tags.name), tags.standard(tags.variableName), tags.standard(tags.name), tags.propertyName, tags.labelName], color: '#80c7ff'},
  {tag: [tags.string, tags.special(tags.string)], color: '#c3d880'},
  {tag: [tags.number, tags.bool, tags.null], color: '#d1a1ff'},
  {tag: [tags.comment, tags.lineComment, tags.blockComment], color: '#85909a'}
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
    if (key === 's') { localStorage.setItem('oms-pta-code-draft', editor.state.doc.toString()); event.preventDefault(); return true; }
    return false;
}
const commonShortcuts = EditorView.domEventHandlers({keydown: handleShortcut});
const view = new EditorView({
  state: EditorState.create({
    doc: input.value,
    extensions: [
      lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(), drawSelection(), rectangularSelection(), highlightActiveLine(), indentationDotPlugin, localLoopVariablePlugin, commonShortcuts,
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
  if (handleShortcut(event, view)) event.stopImmediatePropagation();
}, true);

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
