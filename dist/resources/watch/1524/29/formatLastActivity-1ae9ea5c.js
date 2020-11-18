import { T as nowSecs } from './calfSystem-b31646eb.js';
import { o as outputFormat } from './outputFormat-f5e04ec1.js';
import { s as splitTime } from './splitTime-07b18471.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-1ae9ea5c.js.map
