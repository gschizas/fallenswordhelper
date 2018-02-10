import add from '../support/task';
import calf from '../support/calf';
import moreToDo from '../common/moreToDo';
import {onlineDot} from '../support/colouredDots';

var headerCount;
var headers;

function memberHeader(oldhtml) {
  if (!calf.membrList[oldhtml]) {return oldhtml;}
  return onlineDot({last_login: calf.membrList[oldhtml].last_login}) +
    '<a href="index.php?cmd=profile&player_id=' + calf.membrList[oldhtml].id +
    '">' + oldhtml + '</a> [ <span class="a-reply fshLink" target_player=' +
    oldhtml + '>m</span> ]';
}

function paintHeader() {
  var limit = performance.now() + 10;
  while (moreToDo(limit, headerCount, headers)) {
    // while (performance.now() < limit && headerCount < headers.length) {
    var el = headers[headerCount];
    var oldhtml = el.textContent;
    el.innerHTML = memberHeader(oldhtml);
    headerCount += 1;
  }
  if (headerCount < headers.length) {
    add(3, paintHeader);
  }
}

export default function reportHeader() {
  headers = document.querySelectorAll('#pCC table table ' +
    'tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b');
  headerCount = 0;
  add(3, paintHeader);
}
