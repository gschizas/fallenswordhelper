import {componentList} from './prepareComponentList';
import deleteVisible from './deleteVisible';
import destroyComponent from '../../app/profile/destroycomponent';
import {imageServer} from '../../system/system';
import partial from '../../common/partial';
import updateUsedCount from './updateUsedCount';
import when from '../../common/when';

function doSpinner(td) {
  td.innerHTML = '';
  td.className = 'guildTagSpinner';
  td.style.backgroundImage = 'url(\'' + imageServer +
    '/skin/loading.gif\')';
}

function destroyed(data) {
  if (data.s) {
    deleteVisible(data.r);
    updateUsedCount(data.r.length);
  }
}

function removeSpinner(td) {td.parentNode.remove();}

export default function delCompType(self) { // jQuery.min
  var toDelete = componentList[self.dataset.compid].del;
  var td = self.parentNode;
  doSpinner(td);
  var batchSize = 40;
  var prm = [];
  for (var i = 0; i < toDelete.length; i += batchSize) {
    prm.push(destroyComponent(toDelete.slice(i, i + batchSize))
      .done(destroyed));
  }
  when(prm, partial(removeSpinner, td));
}
