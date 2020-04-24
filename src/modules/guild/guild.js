import activeMembers from './activeMembers';
import add from '../support/task';
import calf from '../support/calf';
import colouredDots from '../common/colouredDots';
// #if _DEV  //  guildXPLock
import guildXPLock from './guildXPLock';
// #endif
import injectViewGuild from './injectViewGuild';
import manage from './manage';
import removeGuildAvyImgBorder from './removeGuildAvyImgBorder';

export default function injectGuild() {
  add(3, colouredDots);
  add(3, removeGuildAvyImgBorder);
  // #if _DEV  //  guildXPLock
  add(3, guildXPLock);
  // #endif
  add(3, activeMembers);

  if (calf.subcmd === 'manage') { manage(); }
  if (calf.subcmd === 'view') { injectViewGuild(); }
}
