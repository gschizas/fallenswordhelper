import batch from '../../common/batch';
import getUrlParameter from '../../system/getUrlParameter';
import querySelectorAll from '../../common/querySelectorAll';
import querySelectorArray from '../../common/querySelectorArray';

var findUser;
var foundUser;

function hideOther(el) {
  if (el.firstChild.hasAttribute('bgcolor')) {
    foundUser = el.firstChild.children[0].textContent === findUser;
  }
  if (!foundUser) {
    el.className = 'fshHide';
  }
}

function thisUser(el) {
  return el.textContent === findUser;
}

export default function searchUser() {
  findUser = getUrlParameter('user');
  if (!findUser) {return;}
  var userNodes = querySelectorArray(
    '#pCC table table td[bgcolor="#DAA534"] b');
  var userNode = userNodes.some(thisUser);
  if (!userNode) {return;}
  var nodeList = querySelectorAll('#pCC table table tr');
  batch(2, nodeList, 0, hideOther);
}
