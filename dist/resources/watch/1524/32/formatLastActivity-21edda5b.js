import { U as nowSecs } from './calfSystem-e64be67d.js';
import { o as outputFormat } from './outputFormat-264fcef1.js';
import { s as splitTime } from './splitTime-b1d0d296.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-21edda5b.js.map
