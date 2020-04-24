import calf from '../../support/calf';
import createTd from '../../common/cElement/createTd';
import createTr from '../../common/cElement/createTr';
import { defTable } from '../../support/constants';
import getElementsByTagName from '../../common/getElementsByTagName';
import insertElement from '../../common/insertElement';
import insertElementBefore from '../../common/insertElementBefore';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import makeFolderSpans from '../../common/makeFolderSpans';
import { pCC } from '../../support/layout';
import setInnerHtml from '../../dom/setInnerHtml';

function extraButtons() {
  const tRows = getElementsByTagName(defTable, pCC)[0].rows;
  insertHtmlAfterBegin(tRows[tRows.length - 2].cells[0],
    '<input id="fshChkAll" value="Check All" type="button">&nbsp;');
}

export default function doFolderButtons(folders) {
  if (calf.subcmd2 === 'storeitems') {
    const formNode = getElementsByTagName('form', pCC)[0];
    if (formNode) {
      const tr = createTr({ className: 'fshCenter' });
      const insertHere = createTd({ colSpan: 3 });
      insertElement(tr, insertHere);
      insertElementBefore(tr, formNode);
      setInnerHtml(makeFolderSpans(folders), insertHere);
      extraButtons();
    }
  }
}
