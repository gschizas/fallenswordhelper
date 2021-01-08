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
const reliclist = () => {
  runDefault(import('../../notepad/reliclist/reliclist'));
};
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

const notepad = {
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
  '-': { '-': injectNotepad },
};

// eslint-disable-next-line no-unused-labels, no-labels
devLbl: { //  advisor, crawler, newGuildLog5, whosGotWhat
  notepad.newGuildLog5 = { '-': newGuildLog5 };
  notepad.advisor = { '-': advisor };
  notepad.crawler = { '-': crawler };
  notepad.whosgotwhat = { '-': whosGotWhat };
}

// eslint-disable-next-line no-unused-labels, no-labels
betaLbl: { //  reliclist
  notepad.reliclist = { '-': reliclist };
}

export default notepad;
