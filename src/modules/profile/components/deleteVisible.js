import getElementsByTagName from '../../common/getElementsByTagName';
import getInvTable from './getInvTable';
import {itemRE} from '../../support/constants';

var visibleCache;

function getComponents(prev, x) {
  var matches = x.dataset.tipped.match(itemRE);
  prev[matches[2]] = x.parentNode.parentNode;
  return prev;
}

function getVisibleComponents() {
  if (!visibleCache) {
    var nodeList = getElementsByTagName('img', getInvTable());
    visibleCache = Array.from(nodeList).reduce(getComponents, {});
  }
  return visibleCache;
}

export default function deleteVisible(ary) {
  var visibleComponents = getVisibleComponents();
  ary.forEach(function(a) {
    if (visibleComponents[a]) {visibleComponents[a].innerHTML = '';}
  });
}
