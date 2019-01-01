import calf from '../../support/calf';
import {def_table} from '../../support/constants';
import getElementsByTagName from '../../common/getElementsByTagName';
import insertElement from '../../common/insertElement';
import insertElementBefore from '../../common/insertElementBefore';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import makeFolderSpans from '../../common/makeFolderSpans';
import {pCC} from '../../support/layout';
import {createTd, createTr} from '../../common/cElement';

function extraButtons() {
  var tRows = getElementsByTagName(def_table, pCC)[0].rows;
  insertHtmlAfterBegin(tRows[tRows.length - 2].cells[0],
    '<input id="fshChkAll" value="Check All" type="button">&nbsp;');
}

export default function doFolderButtons(folders) {
  if (calf.subcmd2 === 'storeitems') {
    var formNode = getElementsByTagName('form', pCC)[0];
    if (formNode) {
      var tr = createTr({className: 'fshCenter'});
      var insertHere = createTd({colSpan: 3});
      insertElement(tr, insertHere);
      insertElementBefore(tr, formNode);
      insertHere.innerHTML = makeFolderSpans(folders);
      extraButtons();
    }
  }
}
