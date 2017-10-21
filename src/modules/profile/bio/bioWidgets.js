import bioEvtHdl from './bioEvtHdl';
import {pCC} from '../../support/layout';
import renderBio from './render';
import {convertTextToHtml, getValue, setValue} from '../../support/system';
import {createDiv, createInput} from '../../common/cElement';

var bioEditLines;

function bioPreview() {
  var textArea = document.getElementById('textInputBox');
  var bioPreviewHTML = convertTextToHtml(textArea.value);
  textArea.parentNode.insertAdjacentHTML('beforeend', '<div>' +
    '<table align="center" width="325" border="1">' +
    '<tbody><tr><td style="text-align:center;color:#7D2252;' +
    'background-color:#CD9E4B">Preview</td></tr><tr>' +
    '<td align="left" width="325"><span id="biopreview">' +
    bioPreviewHTML + '</span></td></tr></tbody></table></div>');
}

function bioWords() {
  // Add description text for the new tags
  pCC.insertAdjacentHTML('beforeend', '<div>' +
    '`~This will allow FSH Script users to ' +
    'select buffs from your bio~`<br>You can use the [cmd] tag as well to ' +
    'determine where to put the "Ask For Buffs" button<br><br>' +
    '&nbsp;&nbsp;&nbsp;- Note 1: The ` and ~ characters are on the same ' +
    'key on QWERTY keyboards. ` is <b>NOT</b> an apostrophe.<br>' +
    '&nbsp;&nbsp;&nbsp;- Note 2: Inner text will not contain special ' +
    'characters (non-alphanumeric).<br>' +
    '&nbsp;&nbsp;&nbsp;- P.S. Be creative with these! Wrap your buff ' +
    'pack names in them to make buffing even easier!</div>');
}

function testHeightValid(boxVal) {
  return isNaN(boxVal) || boxVal < '1' || boxVal > '99';
}

function changeHeight() {
  var theBox = document.getElementById('fshLinesToShow');
  var boxVal = parseInt(theBox.value, 10);
  if (testHeightValid(boxVal)) {return;}
  bioEditLines = boxVal;
  setValue('bioEditLines', boxVal);
  document.getElementById('textInputBox').rows = bioEditLines;
}

function bioHeight() {
  var bioEditLinesDiv = createDiv({
    innerHTML: ' Display <input id="fshLinesToShow"' +
      ' type="number" min="1" max="99" value="' +
      bioEditLines + '"/> Lines '
  });
  var saveLines = createInput({
    className: 'custombutton',
    value: 'Update Rows To Show',
    type: 'button'
  });
  saveLines.addEventListener('click', changeHeight);
  bioEditLinesDiv.appendChild(saveLines);
  pCC.appendChild(bioEditLinesDiv);
}

function updateBioCharacters() {
  var textArea = document.getElementById('textInputBox');
  var previewArea = document.getElementById('biopreview');
  var bioContents = convertTextToHtml(textArea.value);
  bioContents = renderBio(bioContents);
  if (bioContents) {
    previewArea.innerHTML = bioContents;
  }
}

export default function injectBioWidgets() {
  bioEditLines = getValue('bioEditLines');
  var textArea = document.getElementById('textInputBox');
  bioPreview();
  bioWords();
  bioHeight();
  textArea.rows = bioEditLines;

  textArea.parentNode.addEventListener('click', bioEvtHdl);
  textArea.addEventListener('keyup', updateBioCharacters);
  // Force the preview area to render
  updateBioCharacters();
}
