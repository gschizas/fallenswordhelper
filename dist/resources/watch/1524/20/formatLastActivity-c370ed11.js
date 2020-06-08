import { T as nowSecs } from './calfSystem-c0288c6c.js';
import { o as outputFormat } from './outputFormat-0d150677.js';
import { s as splitTime } from './splitTime-f5ec527d.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-c370ed11.js.map
