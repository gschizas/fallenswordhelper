import bioEvtHdl from './bioEvtHdl';
import calf from '../../support/calf';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import insertTextBeforeEnd from '../../common/insertTextBeforeEnd';
import {pCC} from '../../support/layout';
import renderBio from './render';
import setValue from '../../system/setValue';
import testQuant from '../../system/testQuant';
import {createDiv, createInput} from '../../common/cElement';

var bioEditLines;
var textArea;
var previewArea;
var theBox;

function convertTextToHtml(inputText) {
  var ret = inputText
    .replace(/</g, '&lt')
    .replace(/>/g, '&gt')
    .replace(/\n/g, '<br>')
    .replace(/\[(\/?)([biu])\]/g, '<$1$2>')
    .replace(/\\\\/g, '&#92')
    .replace(/\\/g, '');
  if (calf.cmd === 'guild') {
    ret = ret
      .replace(/\[(\/?)block\]/g, '<$1blockquote>')
      .replace(/\[list\]/g, '<ul class="list">')
      .replace(/\[\/list\]/g, '</ul>')
      .replace(/\[\*\](.*?)<br>/g, '<li>$1</li>');
  }
  return ret;
}

function bioPreview() {
  var widthClass = 'fshBioProfile';
  if (calf.cmd === 'guild') {widthClass = 'fshBioGuild';}
  var previewContainer = createDiv({
    className:
      'fshBioContainer ' + widthClass
  });
  var previewHeader = createDiv({
    className: 'fshBioHeader fshBioInner',
    innerHTML: 'Preview'
  });
  insertElement(previewContainer, previewHeader);
  previewArea = createDiv({className: 'fshBioPreview fshBioInner'});
  insertElement(previewContainer, previewArea);
  insertElement(textArea.parentNode, previewContainer);
}

function bioWords() {
  if (calf.cmd === 'profile') {
    // Add description text for the new tags
    insertHtmlBeforeEnd(pCC, '<div>' +
      '`~This will allow FSH Script users to select buffs from your bio~`<br>' +
      'You can use the [cmd] tag as well to determine where to put the "Ask ' +
      'For Buffs" button<br><br><blockquote><ul class="list">' +
      '<li>Note 1: The ` and ~ characters are on the same key on US QWERTY ' +
      'keyboards. ` is <b>NOT</b> an apostrophe.</li>' +
      '<li>Note 2: Inner text will not contain special characters ' +
      '(non-alphanumeric).</li>' +
      '<li>P.S. Be creative with these! Wrap your buff pack names in ' +
      'them to make buffing even easier!</li>' +
      '</ul></blockquote></div>');
  }
}

function changeHeight() {
  var boxVal = testQuant(theBox.value);
  if (boxVal) {
    bioEditLines = boxVal;
    setValue('bioEditLines', boxVal);
    textArea.rows = bioEditLines;
  }
}

function bioHeight() {
  var bioEditLinesDiv = createDiv({innerHTML: '<br>Display '});
  theBox = createInput({min: 1, max: 99, type: 'number', value: bioEditLines});
  insertElement(bioEditLinesDiv, theBox);
  insertTextBeforeEnd(bioEditLinesDiv, ' Lines ');
  var saveLines = createInput({
    className: 'custombutton',
    value: 'Update Rows To Show',
    type: 'button'
  });
  saveLines.addEventListener('click', changeHeight);
  insertElement(bioEditLinesDiv, saveLines);
  insertElement(pCC, bioEditLinesDiv);
}

function updateBioCharacters() {
  var bioContents = convertTextToHtml(textArea.value);
  bioContents = renderBio(bioContents);
  previewArea.innerHTML = bioContents;
}

export default function injectBioWidgets() {
  bioEditLines = getValue('bioEditLines');
  textArea = getElementById('textInputBox');
  bioPreview();
  bioWords();
  bioHeight();
  textArea.rows = bioEditLines;
  if (calf.cmd === 'profile') {
    textArea.parentNode.addEventListener('click', bioEvtHdl);
  }
  textArea.addEventListener('keyup', updateBioCharacters);
  // Force the preview area to render
  updateBioCharacters();
}
