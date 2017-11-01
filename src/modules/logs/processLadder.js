import calf from '../support/calf';
import {parseDateAsTimestamp, setValue} from '../support/system';

export default function processLadder(aRow, messageType) {
  if (messageType === 'Notification' &&
      aRow.cells[2].firstElementChild &&
      aRow.cells[2].firstElementChild.tagName === 'IMG' &&
      aRow.cells[2].firstElementChild.src.indexOf('pvp_icon.gif') !== -1) {
    var logTime = parseDateAsTimestamp(aRow.cells[1].textContent);
    if (logTime > calf.lastLadderReset) {
      setValue('lastLadderReset', logTime);
      calf.lastLadderReset = logTime;
    }
  }
}
