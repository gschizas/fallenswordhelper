import containsText from '../common/containsText';
import { defLastLadderReset } from '../support/constants';
import getArrayByClassName from '../common/getArrayByClassName';
import getText from '../common/getText';
import getValue from '../system/getValue';
import { pCC } from '../support/layout';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import setValue from '../system/setValue';

const pvpLadder = (head) => containsText('PvP Ladder', head.children[1]);

const timestamp = (head) => parseDateAsTimestamp(getText(head.children[2]));

export default function lookForPvPLadder() {
  const rumours = getArrayByClassName('news_head_tavern', pCC);
  const pvpTimes = rumours.filter(pvpLadder).map(timestamp);
  const logTime = Math.max.apply(null, pvpTimes);
  if (logTime > getValue(defLastLadderReset)) {
    setValue(defLastLadderReset, logTime);
  }
}
