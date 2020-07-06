import { G as getValue, y as getElementById, c as calf, o as onclick, k as on, b as createDiv, i as insertElement, f as insertHtmlBeforeEnd, p as pCC, V as setValue, A as setInnerHtml } from './calfSystem-2b1fed3f.js';
import './numberIsNaN-cb2409eb.js';
import './round-ef0af241.js';
import './roundToString-05064d9d.js';
import { b as bioEvtHdl, r as renderBio } from './render-965ec491.js';
import './playerName-12a90d68.js';
import './toLowerCase-dda30e6b.js';
import { c as createInput } from './createInput-1f3f2b8b.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-ae6e5084.js';
import './testRange-6fc07a5c.js';
import { t as testQuant } from './testQuant-c04cb2a1.js';

const css = ".fshBioContainer {\r\n  border: 1px solid;\r\n  border-color: grey black black grey;\r\n  margin: 1em auto 0;\r\n  overflow-wrap: break-word;\r\n}\r\n.fshBioProfile {\r\n  width: 327px;\r\n}\r\n.fshBioGuild {\r\n  width: 334px;\r\n}\r\n.fshBioHall {\r\n  max-width: 609px;\r\n}\r\n.fshBioHeader {\r\n  background-color: #CD9E4B;\r\n  color: #7D2252;\r\n}\r\n.fshBioPreview {\r\n  padding: 2px;\r\n  text-align: left;\r\n}\r\n.fshBioInner {\r\n  border: 1px solid;\r\n  border-color: black grey grey black;\r\n  margin: 1.5px;\r\n}\r\n";
const modules_2840467c = {};

let bioEditLines;
let textArea;
let previewArea;
let theBox;

const basicTagReplacements = [
  [/</g, '&lt'],
  [/>/g, '&gt'],
  [/\n/g, '<br>'],
  [/\[(\/?[biu])\]/g, '<$1>'],
  [/\\\\/g, '&#92'],
  [/\\/g, ''],
];

const guildTagReplacements = [
  [/\[(\/?block)\]/g, '<$1quote>'],
  [/\[list\]/g, '<ul class="list">'],
  [/\[\/list\]/g, '</ul>'],
  [/\[\*\](.*?)<br>/g, '<li>$1</li>'],
];

function replaceTag(acc, re) { return acc.replace(re[0], re[1]); }

function replaceTags(inputText, ary) { return ary.reduce(replaceTag, inputText); }

function convertTextToHtml(inputText) {
  let ret = replaceTags(inputText, basicTagReplacements);
  if (calf.cmd === 'guild') {
    ret = replaceTags(ret, guildTagReplacements);
  }
  return ret;
}

function bioPreview() {
  let widthClass = 'fshBioProfile';
  if (calf.cmd === 'guild') {
    if (calf.subcmd === 'hall') { widthClass = 'fshBioHall'; } else {
      widthClass = 'fshBioGuild';
    }
  }
  const previewContainer = createDiv({
    className:
      `fshBioContainer ${widthClass}`,
  });
  const previewHeader = createDiv({
    className: 'fshBioHeader fshBioInner',
    innerHTML: 'Preview',
  });
  insertElement(previewContainer, previewHeader);
  previewArea = createDiv({ className: 'fshBioPreview fshBioInner' });
  insertElement(previewContainer, previewArea);
  insertElement(textArea.parentNode, previewContainer);
}

function bioWords() {
  if (calf.cmd === 'profile') {
    // Add description text for the new tags
    insertHtmlBeforeEnd(pCC, '<div>'
      + '`~This will allow FSH Script users to select buffs from your bio~`<br>'
      + 'You can use the [cmd] tag as well to determine where to put the "Ask '
      + 'For Buffs" button<br><br><blockquote><ul class="list">'
      + '<li>Note 1: The ` and ~ characters are on the same key on US QWERTY '
      + 'keyboards. ` is <b>NOT</b> an apostrophe.</li>'
      + '<li>Note 2: Inner text will not contain special characters '
      + '(non-alphanumeric).</li>'
      + '<li>P.S. Be creative with these! Wrap your buff pack names in '
      + 'them to make buffing even easier!</li>'
      + '</ul></blockquote></div>');
  }
}

function changeHeight() {
  const boxVal = testQuant(theBox.value);
  if (boxVal) {
    bioEditLines = boxVal;
    setValue('bioEditLines', boxVal);
    textArea.rows = bioEditLines;
  }
}

function bioHeight() {
  const bioEditLinesDiv = createDiv({ innerHTML: '<br>Display ' });
  theBox = createInput({
    min: 1, max: 99, type: 'number', value: bioEditLines,
  });
  insertElement(bioEditLinesDiv, theBox);
  insertTextBeforeEnd(bioEditLinesDiv, ' Lines ');
  const saveLines = createInput({
    className: 'custombutton',
    value: 'Update Rows To Show',
    type: 'button',
  });
  onclick(saveLines, changeHeight);
  insertElement(bioEditLinesDiv, saveLines);
  insertElement(pCC, bioEditLinesDiv);
}

function updateBioCharacters() {
  const bioContents = convertTextToHtml(textArea.value);
  const rendered = renderBio(bioContents);
  setInnerHtml(rendered || bioContents, previewArea);
}

function injectBioWidgets() {
  bioEditLines = getValue('bioEditLines');
  textArea = getElementById('textInputBox');
  if (!textArea) { return; }
  bioPreview();
  bioWords();
  bioHeight();
  textArea.rows = bioEditLines;
  if (calf.cmd === 'profile') {
    onclick(textArea.parentNode, bioEvtHdl);
  }
  on(textArea, 'keyup', updateBioCharacters);
  // Force the preview area to render
  updateBioCharacters();
}

export default injectBioWidgets;
//# sourceMappingURL=bioWidgets-ced474c0.js.map
