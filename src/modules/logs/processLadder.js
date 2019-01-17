import calf from '../support/calf';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import setValue from '../system/setValue';

function isLadderReset(aRow) {
  return aRow.cells[2] &&
    /You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
      .test(aRow.cells[2].textContent);
}

function saveLastResetTime(aRow) {
  var logTime = parseDateAsTimestamp(aRow.cells[1].textContent);
  if (logTime > calf.lastLadderReset) {
    setValue('lastLadderReset', logTime);
    calf.lastLadderReset = logTime;
  }
}

export default function processLadder(aRow, messageType) {
  if (messageType === 'Notification' && isLadderReset(aRow)) {
    saveLastResetTime(aRow);
  }
}
