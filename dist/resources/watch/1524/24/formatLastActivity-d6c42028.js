import { T as nowSecs } from './calfSystem-dea093d3.js';
import { o as outputFormat } from './outputFormat-e549127b.js';
import { s as splitTime } from './splitTime-95f1d273.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-d6c42028.js.map
