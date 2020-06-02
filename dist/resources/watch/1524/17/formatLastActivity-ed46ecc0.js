import { R as nowSecs } from './calfSystem-f6498976.js';
import { o as outputFormat } from './outputFormat-c5867fec.js';
import { s as splitTime } from './splitTime-f2299af4.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-ed46ecc0.js.map
