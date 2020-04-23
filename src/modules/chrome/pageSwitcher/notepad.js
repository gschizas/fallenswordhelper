import runDefault from '../../common/runDefault';
import {
  injectAuctionSearch,
  injectBuffLog,
  injectFindBuffs,
  injectFindOther,
  injectFsBoxContent,
  injectMonsterLog,
  injectNotepadShowLogs,
  injectOnlinePlayers,
  injectQuickLinkManager,
  injectRecipeManager,
  insertQuickExtract,
  insertQuickWear,
} from './loader';

const injectInventoryManagerNew = () => {
  runDefault(import('../../notepad/inventory/inventory'));
};
const injectNewGuildLog = () => {
  runDefault(import('../../guild/newGuildLog/newGuildLog'));
};
const injectNotepad = () => {
  runDefault(import('../../notepad/injectNotepad'));
};
const injectSaveSettings = () => { runDefault(import('../../settings/load')); };
// #if _BETA  //  reliclist
const reliclist = () => {
  runDefault(import('../../notepad/reliclist/reliclist'));
};
// #endif
// #if _DEV  //  advisor, crawler, newGuildLog5, whosGotWhat
const advisor = () => { runDefault(import('../../notepad/advisor/advisor')); };
const crawler = () => {
  runDefault(import('../../notepad/arenaCrawler/crawler'));
};
const newGuildLog5 = () => {
  runDefault(import('../../notepad/newGuildLog5/newGuildLog5'));
};
const whosGotWhat = () => {
  runDefault(import('../../notepad/whosGotWhat/whosGotWhat'));
};
// #endif

export default {
  showlogs: { '-': injectNotepadShowLogs },
  invmanagernew: { '-': injectInventoryManagerNew }, // TODO
  guildinvmgr: { '-': injectInventoryManagerNew }, // TODO
  recipemanager: { '-': injectRecipeManager },
  auctionsearch: { '-': injectAuctionSearch },
  onlineplayers: { '-': injectOnlinePlayers },
  quicklinkmanager: { '-': injectQuickLinkManager },
  monsterlog: { '-': injectMonsterLog },
  quickextract: { '-': insertQuickExtract },
  quickwear: { '-': insertQuickWear },
  fsboxcontent: { '-': injectFsBoxContent },
  bufflogcontent: { '-': injectBuffLog },
  newguildlog: { '-': injectNewGuildLog }, // TODO
  findbuffs: { '-': injectFindBuffs },
  findother: { '-': injectFindOther },
  savesettings: { '-': injectSaveSettings }, // TODO
  // #if _BETA  //  reliclist
  reliclist: { '-': reliclist },
  // #endif
  // #if _DEV  //  advisor, crawler, newGuildLog5, whosGotWhat
  newGuildLog5: { '-': newGuildLog5 },
  advisor: { '-': advisor },
  crawler: { '-': crawler },
  whosgotwhat: { '-': whosGotWhat },
  // #endif
  '-': { '-': injectNotepad },
};
