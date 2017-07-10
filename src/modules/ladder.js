import * as system from './support/system';

function dontPost() { // Native
  var submitButton = document.querySelector('#pCC input[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.location = 'index.php?cmd=pvpladder&viewing_band_id=' +
        document.querySelector('#pCC select[name="viewing_band_id"]').value;
    });
  }
}

function formatTime() { // Native
  var lastLadderReset = system.getValue('lastLadderReset');
  var now = Date.now();
  if (lastLadderReset < now - 48 * 60 * 60 * 1000) {
    return '<span class="fshLink tip-static" data-tipped="FSH has not seen ' +
      'the last ladder reset.<br>You can find it in your log if you ' +
      'qualified<br>or Tavern Rumours.">???</span>';
  }
  return system.formatLastActivity(lastLadderReset / 1000);
}

function lastReset() { // Native
  var topTable = document.querySelector('#pCC table');
  var newRow = document.createElement('tr');
  var leftCell = newRow.insertCell(-1);
  leftCell.height = 25;
  leftCell.textContent = 'Last Reset:';
  var rightCell = newRow.insertCell(-1);
  rightCell.align = 'right';
  rightCell.innerHTML = formatTime();
  topTable.appendChild(newRow);
}

export default function ladder() { // Native
  dontPost();
  lastReset();
}
