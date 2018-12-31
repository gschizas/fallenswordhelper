import destroyComponent from '../../app/profile/destroycomponent';
import errorDialog from '../../app/errorDialog';
import {itemRE} from '../../support/constants';
import partial from '../../common/partial';
import updateUsedCount from './updateUsedCount';

function updateComponentCounts(itemId) {
  var delBtn = document.querySelector('#fshTally [data-compid="' + itemId +
    '"]');
  if (!delBtn) {return;}
  var countDom = delBtn.parentNode.parentNode.children[1];
  var count = Number(countDom.textContent) - 1;
  countDom.textContent = count.toString();
}

function compDeleted(self, itemId, data) {
  if (data.s) {
    updateComponentCounts(itemId);
    updateUsedCount(1);
    if (self.parentNode) {self.parentNode.innerHTML = '';}
  }
}

export default function delComponent(self) { // jQuery.min
  var tipped = self.parentNode.children[0].children[0].dataset.tipped;
  var matches = tipped.match(itemRE);
  var itemId = matches[1];
  var componentId = matches[2];
  destroyComponent([componentId])
    .pipe(errorDialog)
    .done(partial(compDeleted, self, itemId));
}
