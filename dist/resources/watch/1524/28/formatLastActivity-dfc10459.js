import { T as nowSecs } from './calfSystem-21d16a0e.js';
import { o as outputFormat } from './outputFormat-5b66d2aa.js';
import { s as splitTime } from './splitTime-b2416eda.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-dfc10459.js.map
