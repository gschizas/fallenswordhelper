import destroyComponent from '../../app/profile/destroycomponent';
import errorDialog from '../../app/errorDialog';
import {itemRE} from '../../support/constants';
import updateUsedCount from './updateUsedCount';

function updateComponentCounts(itemId) {
  var delBtn = document.querySelector('#fshTally [data-compid="' + itemId +
    '"]');
  if (!delBtn) {return;}
  var countDom = delBtn.parentNode.parentNode.children[1];
  var count = Number(countDom.textContent) - 1;
  countDom.textContent = count.toString();
}

function compDeleted(self, itemId) {
  return function(data) {
    // console.log('data', data);
    if (data.s) {
      updateComponentCounts(itemId);
      updateUsedCount(1);
      if (self.parentNode) {self.parentNode.innerHTML = '';}
    }
  };
}

function delComponent(self) { // jQuery.min
  var tipped = self.parentNode.children[0].children[0].dataset.tipped;
  var matches = tipped.match(itemRE);
  var itemId = matches[1];
  var componentId = matches[2];
  // console.log('a=', componentId, 'b=', itemId);
  destroyComponent([componentId])
    .pipe(errorDialog)
    .done(compDeleted(self, itemId));
}

export default function componentDeleteHandler(evt) {
  if (evt.target.classList.contains('compDelBtn')) {
    delComponent(evt.target);
    return true;
  }
}
