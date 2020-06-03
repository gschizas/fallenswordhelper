import { R as nowSecs } from './calfSystem-03895320.js';
import { o as outputFormat } from './outputFormat-99ee138d.js';
import { s as splitTime } from './splitTime-b0e7ea41.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-08061168.js.map
