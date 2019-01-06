import batch from '../../common/batch';
import contains from '../../common/contains';
import containsText from '../../common/containsText';
import getUrlParameter from '../../system/getUrlParameter';
import querySelectorAll from '../../common/querySelectorAll';
import querySelectorArray from '../../common/querySelectorArray';

var findUser;
var foundUser;

function hideOther(el) {
  if (el.firstChild.hasAttribute('bgcolor')) {
    foundUser = containsText(findUser, el.firstChild.children[0]);
  }
  if (!foundUser) {
    el.className = 'fshHide';
  }
}

export default function searchUser() {
  findUser = getUrlParameter('user');
  if (!findUser) {return;}
  var userNodes = querySelectorArray(
    '#pCC table table td[bgcolor="#DAA534"] b');
  var userNode = userNodes.some(contains(findUser));
  if (!userNode) {return;}
  var nodeList = querySelectorAll('#pCC table table tr');
  batch(2, nodeList, 0, hideOther);
}
