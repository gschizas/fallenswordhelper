import { T as nowSecs } from './calfSystem-d357ca6f.js';
import { o as outputFormat } from './outputFormat-08e5d29d.js';
import { s as splitTime } from './splitTime-9c9a4e4d.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-64e1bd03.js.map
