import calf from '../support/calf';
import * as system from '../support/system';

export default function processLadder(aRow, messageType) {
  if (messageType === 'Notification' &&
      aRow.cells[2].firstElementChild &&
      aRow.cells[2].firstElementChild.tagName === 'IMG' &&
      aRow.cells[2].firstElementChild.src.indexOf('pvp_icon.gif') !== -1) {
    var logTime = system.parseDateAsTimestamp(aRow.cells[1].textContent);
    if (logTime > calf.lastLadderReset) {
      system.setValue('lastLadderReset', logTime);
      calf.lastLadderReset = logTime;
    }
  }
}
