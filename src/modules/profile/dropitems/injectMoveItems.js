import getArrayByTagName from '../../common/getArrayByTagName';
import getElementsByTagName from '../../common/getElementsByTagName';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import {pCC} from '../../support/layout';

function otherFolders(el) {
  return el.src.includes('/folder.gif');
}

function makeOption(e) {
  return '<option value=' +
    e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1] + '>' +
    e.parentNode.parentNode.textContent + '</option>';
}

export default function injectMoveItems() {
  var flrRow = getElementsByTagName('form', pCC)[0]
    .nextElementSibling.nextElementSibling.nextElementSibling;
  var folders = getArrayByTagName('img', flrRow).filter(otherFolders);
  if (folders.length === 0) {return;}
  insertHtmlAfterEnd(flrRow,
    '<tr><td class="fshCenter">Move selected items to: ' +
    '<select name="folder" id="selectFolderId" class="customselect">' +
    folders.map(makeOption).join('') +
    '</select>&nbsp;<input type="button" class="custombutton" ' +
    'id="fshMove" value="Move"></td></tr>'
  );
}
