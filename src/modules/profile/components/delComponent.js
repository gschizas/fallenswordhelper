import {daDestroyComponent} from '../../_dataAccess/_dataAccess';
import errorDialog from '../../common/errorDialog';
import getText from '../../common/getText';
import {itemRE} from '../../support/constants';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import setText from '../../common/setText';
import updateUsedCount from './updateUsedCount';

function updateComponentCounts(itemId) {
  var delBtn = querySelector('#fshTally [data-compid="' + itemId + '"]');
  if (!delBtn) {return;}
  var countDom = delBtn.parentNode.parentNode.children[1];
  var count = Number(getText(countDom)) - 1;
  setText(count, countDom);
}

function compDeleted(target, itemId, data) {
  if (data.s) {
    updateComponentCounts(itemId);
    updateUsedCount(1);
    if (target.parentNode) {target.parentNode.innerHTML = '';}
  }
}

export default function delComponent(target) { // jQuery.min
  var tipped = target.parentNode.children[0].children[0].dataset.tipped;
  var matches = tipped.match(itemRE);
  var itemId = matches[1];
  var componentId = matches[2];
  daDestroyComponent([componentId])
    .then(errorDialog)
    .then(partial(compDeleted, target, itemId));
}
