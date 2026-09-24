import {Compartment, EditorState} from '@codemirror/state';
import {EditorView, drawSelection, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, lineNumbers, rectangularSelection} from '@codemirror/view';
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

const ptaTheme = EditorView.theme({
  '&': {height: '100%', color: '#e2e2e2', backgroundColor: '#3e3e3e'},
  '.cm-scroller': {fontFamily: mono, lineHeight: '1.75'},
  '.cm-content': {padding: '0.5rem 0', caretColor: '#f2f2f2'},
  '.cm-line': {paddingLeft: '0.5rem'},
  '.cm-gutters': {minWidth: '58px', color: '#999', backgroundColor: '#3e3e3e', borderRight: '1px solid #505050'},
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
const view = new EditorView({
  state: EditorState.create({
    doc: input.value,
    extensions: [
      lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(), drawSelection(), rectangularSelection(), highlightActiveLine(),
      ptaTheme, syntaxHighlighting(ptaHighlight), language.of(languageFor()),
      EditorView.updateListener.of(update => {
        if (!update.docChanged || replacing) return;
        input.value = update.state.doc.toString();
        input.dispatchEvent(new Event('input', {bubbles: true}));
      })
    ]
  }),
  parent: input.parentElement
});

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
