import {createTr} from './common/cElement';
import getValue from './system/getValue';
import {now} from './support/dataObj';
import {outputFormat} from './system/system';

function dontPost() {
  var submitButton = document.querySelector('#pCC input[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.location = 'index.php?cmd=pvpladder&viewing_band_id=' +
        document.querySelector('#pCC select[name="viewing_band_id"]').value;
    });
  }
}

function formatLastReset(lastLadderReset) {
  var m = Math.floor((now - lastLadderReset) / 60000);
  var h = Math.floor(m / 60);
  m %= 60;
  return outputFormat(h, ' hours, ') + m + ' mins';
}

function formatTime() {
  var lastLadderReset = getValue('lastLadderReset');
  if (lastLadderReset < now - 48 * 60 * 60 * 1000) {
    return '<span class="fshLink tip-static" data-tipped="FSH has not seen ' +
      'the last ladder reset.<br>You can find it in your log if you ' +
      'qualified<br>or Tavern Rumours.">???</span>';
  }
  return formatLastReset(lastLadderReset);
}

function lastReset() {
  var topTable = document.querySelector('#pCC table');
  var newRow = createTr();
  var leftCell = newRow.insertCell(-1);
  leftCell.height = 25;
  leftCell.textContent = 'Last Reset:';
  var rightCell = newRow.insertCell(-1);
  rightCell.align = 'right';
  rightCell.innerHTML = formatTime();
  topTable.appendChild(newRow);
}

export default function ladder() {
  dontPost();
  lastReset();
}
