import daDestroyComponent from '../../_dataAccess/daDestroyComponent';
import errorDialog from '../../common/errorDialog';
import getText from '../../common/getText';
import { itemRE } from '../../support/constants';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import setInnerHtml from '../../dom/setInnerHtml';
import setText from '../../dom/setText';
import updateUsedCount from './updateUsedCount';

function updateComponentCounts(itemId) {
  const delBtn = querySelector(`#fshTally [data-compid="${itemId}"]`);
  if (!delBtn) { return; }
  const countDom = delBtn.parentNode.parentNode.children[1];
  const count = Number(getText(countDom)) - 1;
  setText(count, countDom);
}

function compDeleted(target, itemId, data) {
  if (data.s) {
    updateComponentCounts(itemId);
    updateUsedCount(1);
    if (target.parentNode) { setInnerHtml('', target.parentNode); }
  }
}

export default function delComponent(target) { // jQuery.min
  const { tipped } = target.parentNode.children[0].children[0].dataset;
  const matches = tipped.match(itemRE);
  const itemId = matches[1];
  const componentId = matches[2];
  daDestroyComponent([componentId])
    .then(errorDialog)
    .then(partial(compDeleted, target, itemId));
}
