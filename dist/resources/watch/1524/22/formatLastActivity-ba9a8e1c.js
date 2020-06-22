import { T as nowSecs } from './calfSystem-995e3482.js';
import { o as outputFormat } from './outputFormat-667ce8b8.js';
import { s as splitTime } from './splitTime-bc7daa54.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-ba9a8e1c.js.map
