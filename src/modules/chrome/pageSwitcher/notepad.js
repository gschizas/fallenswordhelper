//#if _DEV  //  advisor, crawler
import advisor from '../../notepad/advisor/advisor';
import crawler from '../../notepad/arenaCrawler/crawler';
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
//#if _BETA  //  reliclist
import reliclist from '../../notepad/reliclist/reliclist';
//#endif
//#if _DEV  //  whosGotWhat
import whosGotWhat from '../../notepad/whosGotWhat/whosGotWhat';
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
  //#if _BETA  //  reliclist
  reliclist: {'-': reliclist},
  //#endif
  //#if _DEV  //  advisor, whosGotWhat
  advisor: {'-': advisor},
  crawler: {'-': crawler},
  whosgotwhat: {'-': whosGotWhat},
  //#endif
  '-': {'-': injectNotepad}
};
