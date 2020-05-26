import { Q as nowSecs } from './calfSystem-b469667c.js';
import { o as outputFormat } from './outputFormat-4ee3cbd2.js';
import { s as splitTime } from './splitTime-d5c60ce1.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-19852f33.js.map
