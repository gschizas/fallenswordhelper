import { T as nowSecs } from './calfSystem-91adbec8.js';
import { o as outputFormat } from './outputFormat-bb38e6d1.js';
import { s as splitTime } from './splitTime-4002dc84.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-571fffdc.js.map
