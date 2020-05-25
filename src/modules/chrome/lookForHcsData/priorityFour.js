import add from '../../support/task';
import guildActivity from '../../guild/guildActivity';
import { seLog } from '../../seLog/seLog';

function asyncPFour(fn) { add(4, fn); }

export default function priorityFour() {
  [
    guildActivity,
    seLog,
  ].forEach(asyncPFour);
}
