import { R as nowSecs } from './calfSystem-940bc1b5.js';
import { g as guild } from './guild-4e364634.js';

let cache;

function guildManage() {
  if (!cache) {
    cache = guild({ subcmd: 'manage' });
  }
  return cache;
}

// import { $dataAccess } from './_dataAccess';
// import guildManage from './fallbacks/guildManage';

function daGuildManage() {
  // return $dataAccess(appGuildManage, guildManage);
  return guildManage();
}

function lastActivityToDays(lastActivity) {
  return Math.floor(Math.max(0, nowSecs - lastActivity) / 86400);
}

export { daGuildManage as d, lastActivityToDays as l };
//# sourceMappingURL=lastActivityToDays-4f2c58e4.js.map
