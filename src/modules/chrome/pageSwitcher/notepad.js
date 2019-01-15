import injectBuffLog from '../../notepad/buffLog/injectBuffLog';
import {injectInventoryManagerNew} from '../../notepad/inventory/inventory';
import injectMonsterLog from '../../notepad/monstorLog/monstorLog';
import injectNewGuildLog from '../../guild/newGuildLog/newGuildLog';
import injectNotepadShowLogs from '../../combatLog';
import injectOnlinePlayers from
  '../../notepad/onlinePlayers/injectOnlinePlayers';
import injectRecipeManager from '../../notepad/recipeMgr/recipeMgr';
import injectSaveSettings from '../../settings/load';
import insertQuickExtract from '../../quickExtract';
import insertQuickWear from '../../notepad/quickWear/quickWear';
import {injectAuctionSearch, injectQuickLinkManager} from
  '../../notepad/lists/lists';
import {injectFindBuffs, injectFindOther}
  from '../../notepad/findBuffs/findBuffs';
import {
  injectFsBoxContent,
  injectNotepad
} from '../../misc';

export default {
  showlogs: {'-': {'-': {'-': injectNotepadShowLogs}}}, // done
  invmanagernew: {'-': {'-': {'-': injectInventoryManagerNew}}},
  guildinvmgr: {'-': {'-': {'-': injectInventoryManagerNew}}},
  recipemanager: {'-': {'-': {'-': injectRecipeManager}}}, // done
  auctionsearch: {'-': {'-': {'-': injectAuctionSearch}}}, // done
  onlineplayers: {'-': {'-': {'-': injectOnlinePlayers}}}, // done
  quicklinkmanager: {'-': {'-': {'-': injectQuickLinkManager}}}, // done
  monsterlog: {'-': {'-': {'-': injectMonsterLog}}}, // done
  quickextract: {'-': {'-': {'-': insertQuickExtract}}}, // done
  quickwear: {'-': {'-': {'-': insertQuickWear}}}, // done
  fsboxcontent: {'-': {'-': {'-': injectFsBoxContent}}}, // done
  bufflogcontent: {'-': {'-': {'-': injectBuffLog}}}, // done
  newguildlog: {'-': {'-': {'-': injectNewGuildLog}}},
  findbuffs: {'-': {'-': {'-': injectFindBuffs}}}, // done
  findother: {'-': {'-': {'-': injectFindOther}}}, // done
  savesettings: {'-': {'-': {'-': injectSaveSettings}}},
  '-': {'-': {'-': {'-': injectNotepad}}}
};
