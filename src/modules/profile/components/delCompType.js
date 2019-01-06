import chunk from '../../common/chunk';
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
  var prm = chunk(40, toDelete).map(function(el) {
    return destroyComponent(el).done(destroyed);
  });
  when(prm, partial(removeSpinner, td));
}
