import { G as getValue, y as getElementById, c as calf, o as onclick, k as on, b as createDiv, i as insertElement, f as insertHtmlBeforeEnd, p as pCC, V as setValue, A as setInnerHtml } from './calfSystem-995e3482.js';
import './numberIsNaN-4e564176.js';
import './round-1ea4ca21.js';
import './roundToString-6e389246.js';
import { b as bioEvtHdl, r as renderBio } from './render-371490c9.js';
import './playerName-f1d5dedf.js';
import './toLowerCase-02326a77.js';
import { c as createInput } from './createInput-8a491535.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-479935f8.js';
import './testRange-0bee8de3.js';
import { t as testQuant } from './testQuant-de727abf.js';

var undefined$1 = undefined;

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
//# sourceMappingURL=bioWidgets-cb58df23.js.map
