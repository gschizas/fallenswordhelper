import add from '../support/task';
import {getUrlParameter} from '../support/system';
import moreToDo from '../common/moreToDo';

var counter;
var nodeList;
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

function hideOthers() {
  var limit = performance.now() + 5;
  while (moreToDo(limit, counter, nodeList)) {
    var el = nodeList[counter];

    hideOther(el);

    counter += 1;
  }
  if (counter < nodeList.length) {
    add(2, hideOthers);
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
  nodeList = document.querySelectorAll('#pCC table table tr');
  counter = 0;
  add(2, hideOthers);
}
