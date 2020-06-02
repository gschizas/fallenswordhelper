import { R as nowSecs } from './calfSystem-6e4b53e3.js';
import { o as outputFormat } from './outputFormat-00dcb509.js';
import { s as splitTime } from './splitTime-50fe60d5.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-bff9892e.js.map
