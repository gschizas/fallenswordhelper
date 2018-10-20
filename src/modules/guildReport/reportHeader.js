import batch from '../common/batch';
import calf from '../support/calf';
import onlineDot from '../common/onlineDot';

function memberHeader(oldhtml) {
  return onlineDot({last_login: calf.membrList[oldhtml].last_login}) +
    '<a href="index.php?cmd=profile&player_id=' + calf.membrList[oldhtml].id +
    '">' + oldhtml + '</a> [ <span class="a-reply fshLink" target_player=' +
    oldhtml + '>m</span> ]';
}

function updateMemberHeader(el) {
  var oldhtml = el.textContent;
  if (calf.membrList[oldhtml]) {
    el.innerHTML = memberHeader(oldhtml);
  }
}

export default function reportHeader() {
  var headers = document.querySelectorAll('#pCC table table ' +
    'tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b');
  batch(3, headers, 0, updateMemberHeader);
}
