import add from '../support/task';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import moreToDo from '../common/moreToDo';
import on from '../common/on';
import openQuickBuffByName from '../common/openQuickBuffByName';
import {pCC} from '../support/layout';

var members;
var memCount;

function batchBuffLinks() {
  var limit = performance.now() + 5;
  while (moreToDo(limit, memCount, members)) {
    insertHtmlBeforeEnd(members[memCount].parentNode,
      ' <span class="smallLink">[b]</span>');
    memCount += 1;
  }
  if (memCount < members.length) {
    add(3, batchBuffLinks);
  }
}

function openQuickBuff(evt) {
  if (evt.target.className !== 'smallLink') {return;}
  openQuickBuffByName(evt.target.previousElementSibling.text);
}

export default function buffLinks() {
  // TODO preference
  memCount = 0;
  members = document.querySelectorAll(
    '#pCC a[href^="index.php?cmd=profile&player_id="]');
  add(3, batchBuffLinks);
  on(pCC, 'click', openQuickBuff);
}
