import { T as nowSecs } from './calfSystem-2b1fed3f.js';
import { o as outputFormat } from './outputFormat-989c4647.js';
import { s as splitTime } from './splitTime-3bc21465.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-b1e3d4b1.js.map
