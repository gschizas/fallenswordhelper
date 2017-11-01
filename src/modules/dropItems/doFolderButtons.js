import calf from '../support/calf';
import makeFolderSpans from '../common/makeFolderSpans';
import {pCC} from '../support/layout';
import {createTd, createTr} from '../common/cElement';

function extraButtons() {
  var tRows = pCC.getElementsByTagName('table')[0].rows;
  tRows[tRows.length - 2].cells[0].insertAdjacentHTML('afterbegin',
    '<input id="fshChkAll" value="Check All" type="button">&nbsp;');
}

export default function doFolderButtons(folders) {
  if (calf.subcmd2 === 'storeitems') {
    var formNode = pCC.getElementsByTagName('form')[0];
    var tr = createTr({className: 'fshCenter'});
    var insertHere = createTd({colSpan: 3});
    tr.appendChild(insertHere);
    formNode.parentNode.insertBefore(tr, formNode);
    insertHere.innerHTML = makeFolderSpans(folders);
    extraButtons();
  }
}
