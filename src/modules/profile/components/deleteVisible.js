import getArrayByTagName from '../../common/getArrayByTagName';
import getInvTable from './getInvTable';
import {itemRE} from '../../support/constants';
import partial from '../../common/partial';

var visibleCache;

function getComponents(prev, x) {
  var matches = x.dataset.tipped.match(itemRE);
  prev[matches[2]] = x.parentNode.parentNode;
  return prev;
}

function getVisibleComponents() {
  if (!visibleCache) {
    var nodeList = getArrayByTagName('img', getInvTable());
    visibleCache = nodeList.reduce(getComponents, {});
  }
  return visibleCache;
}

function blatElement(visibleComponents, a) {
  if (visibleComponents[a]) {visibleComponents[a].innerHTML = '';}
}

export default function deleteVisible(ary) {
  ary.forEach(partial(blatElement, getVisibleComponents()));
}
