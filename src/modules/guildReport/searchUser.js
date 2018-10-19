import batch from '../common/batch';
import getUrlParameter from '../system/getUrlParameter';

var findUser;
var foundUser;

function hideOther(el) {
  if (el.firstChild.hasAttribute('bgcolor')) {
    foundUser = el.firstChild.firstElementChild.textContent === findUser;
  }
  if (!foundUser) {
    el.className = 'fshHide';
  }
}

export default function searchUser() {
  findUser = getUrlParameter('user');
  if (!findUser) {return;}
  var userNodes = document.querySelectorAll(
    '#pCC table table td[bgcolor="#DAA534"] b');
  var userNode = Array.prototype.some.call(userNodes, function(el) {
    return el.textContent === findUser;
  });
  if (!userNode) {return;}
  var nodeList = document.querySelectorAll('#pCC table table tr');
  batch(nodeList, 0, hideOther);
}
