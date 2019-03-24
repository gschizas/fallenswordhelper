//#if _DEV  //  reliclist
import advisor from '../../notepad/advisor/advisor';
//#endif
import injectBuffLog from '../../notepad/buffLog/injectBuffLog';
import injectFsBoxContent from '../../notepad/injectFsBoxContent';
import {injectInventoryManagerNew} from '../../notepad/inventory/inventory';
import injectMonsterLog from '../../notepad/monstorLog/monstorLog';
import injectNewGuildLog from '../../guild/newGuildLog/newGuildLog';
import injectNotepad from '../../notepad/injectNotepad';
import injectNotepadShowLogs from '../../notepad/combatLog';
import injectOnlinePlayers from
  '../../notepad/onlinePlayers/injectOnlinePlayers';
import injectRecipeManager from '../../notepad/recipeMgr/recipeMgr';
import injectSaveSettings from '../../settings/load';
import insertQuickExtract from '../../notepad/quickExtract/quickExtract';
import insertQuickWear from '../../notepad/quickWear/quickWear';
//#if _DEV  //  reliclist
import reliclist from '../../notepad/reliclist/reliclist';
//#endif
import {injectAuctionSearch, injectQuickLinkManager} from
  '../../notepad/lists/lists';
import {injectFindBuffs, injectFindOther}
  from '../../notepad/findBuffs/findBuffs';

export default {
  showlogs: {'-': injectNotepadShowLogs},
  invmanagernew: {'-': injectInventoryManagerNew}, // TODO
  guildinvmgr: {'-': injectInventoryManagerNew}, // TODO
  recipemanager: {'-': injectRecipeManager},
  auctionsearch: {'-': injectAuctionSearch},
  onlineplayers: {'-': injectOnlinePlayers},
  quicklinkmanager: {'-': injectQuickLinkManager},
  monsterlog: {'-': injectMonsterLog},
  quickextract: {'-': insertQuickExtract},
  quickwear: {'-': insertQuickWear},
  fsboxcontent: {'-': injectFsBoxContent},
  bufflogcontent: {'-': injectBuffLog},
  newguildlog: {'-': injectNewGuildLog}, // TODO
  findbuffs: {'-': injectFindBuffs},
  findother: {'-': injectFindOther},
  savesettings: {'-': injectSaveSettings}, // TODO
  //#if _DEV  //  reliclist, advisor
  reliclist: {'-': reliclist},
  advisor: {'-': advisor},
  //#endif
  '-': {'-': injectNotepad}
};
