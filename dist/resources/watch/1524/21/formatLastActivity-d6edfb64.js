import { T as nowSecs } from './calfSystem-b0234231.js';
import { o as outputFormat } from './outputFormat-d84ad227.js';
import { s as splitTime } from './splitTime-e6d304de.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-d6edfb64.js.map
