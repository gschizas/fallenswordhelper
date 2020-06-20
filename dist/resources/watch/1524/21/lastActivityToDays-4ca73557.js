import { T as nowSecs } from './calfSystem-b0234231.js';
import { g as guild } from './guild-8a5936aa.js';

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
//# sourceMappingURL=lastActivityToDays-4ca73557.js.map
