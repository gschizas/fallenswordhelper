import allthen from '../../common/allthen';
import chunk from '../../common/chunk';
import {componentList} from './prepareComponentList';
import daDestroyComponent from '../../_dataAccess/daDestroyComponent';
import deleteVisible from './deleteVisible';
import {imageServer} from '../../system/system';
import partial from '../../common/partial';
import updateUsedCount from './updateUsedCount';

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

function destroy(el) {
  return daDestroyComponent(el).then(destroyed);
}

export default function delCompType(self) { // jQuery.min
  var toDelete = componentList[self.dataset.compid].del;
  var td = self.parentNode;
  doSpinner(td);
  var prm = chunk(30, toDelete).map(destroy);
  allthen(prm, partial(removeSpinner, td));
}
