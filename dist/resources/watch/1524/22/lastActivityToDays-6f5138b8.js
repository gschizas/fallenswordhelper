import { T as nowSecs } from './calfSystem-995e3482.js';
import { g as guild } from './guild-fdf8a2a5.js';

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
//# sourceMappingURL=lastActivityToDays-6f5138b8.js.map
