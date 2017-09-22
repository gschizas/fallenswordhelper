import addHistoryWidgets from '../guild/addHistoryWidgets';
import allowBack from '../guide/allowBack';
import completedArenas from '../arena/completedArenas';
import composingBreakdown from '../composing/breakdown';
import globalQuest from '../topRated/globalQuest';
import guildMailbox from '../mailbox/guildMailbox';
import injectAdvisor from '../guildAdvisor';
import injectArena from '../arena/arena';
import injectBazaar from '../bazaar';
import injectBioWidgets from '../profile/bio/bioWidgets';
import injectBuffLog from '../buffLog/injectBuffLog';
import injectGuild from '../guild/guild';
import injectGuildAddTagsWidgets from '../guild/injectGuildAddTagsWidgets';
import injectGuildRanks from '../rank';
import {injectInventoryManagerNew} from '../inventory/inventory';
import injectMailbox from '../mailbox/mailbox';
import injectMonsterLog from '../monstorLog';
import injectNewGuildLog from '../newGuildLog/newGuildLog';
import injectNotepadShowLogs from '../combatLog';
import injectOnlinePlayers from '../onlinePlayers';
import injectProfile from '../profile/profile';
import injectQuickBuff from '../quickBuff';
import injectRPUpgrades from '../guild/injectRPUpgrades';
import injectRecipeManager from '../recipeMgr/recipeMgr';
import injectReportPaint from '../guildReport/guildReport';
import injectSaveSettings from '../settings/load';
import injectScavenging from '../scavenging';
import injectScouttower from '../scoutTower/injectScouttower';
import injectTitan from '../scoutTower/injectTitan';
import injectTopRated from '../topRated/toprated';
import injectTrade from '../trade';
import injectViewGuild from '../guild/injectViewGuild';
import injectWorld from '../legacy';
import insertQuickExtract from '../quickExtract';
import insertQuickWear from '../quickWear/quickWear';
import inventing from '../recipes';
import ladder from '../ladder';
import setupMoves from '../arena/setup';
import showAllQuestSteps from '../guide/showAllQuestSteps';
import storeMoves from '../arena/store';
import storePlayerUpgrades from '../upgrades';
import unknownPage from './unknownPage';
import viewArchive from '../news/viewArchive';
import {injectAuctionSearch, injectQuickLinkManager} from '../lists';
import {injectFindBuffs, injectFindOther} from '../findBuffs';
import * as auctionHouse from '../auctionHouse';
import * as bank from '../bank';
import * as composing from '../composing/composing';
import * as dropItems from '../dropItems/dropItems';
import * as groups from '../groups';
import * as logs from '../logs/logs';
import * as misc from '../misc';
import * as news from '../news/news';
import * as notification from '../notification';
import * as questBook from '../questBook';
import * as settingsPage from '../settings/settingsPage';

export default {
  settings: {'-': {'-': {'-': {'-': settingsPage.injectSettings}}}},
  world: {'-': {'-': {'-': {'-': injectWorld}}}},
  news: {
    fsbox: {'-': {'-': {'-': news.newsFsbox}}},
    shoutbox: {'-': {'-': {'-': news.newsShoutbox}}}
  },
  blacksmith: {repairall: {'-': {'-': {'1': injectWorld}}}},
  arena: {
    '-': {'-': {'-': {'-': injectArena}}},
    join: {'-': {'-': {'-': injectArena}}},
    completed: {'-': {'-': {'-': completedArenas}}},
    pickmove: {'-': {'-': {'-': storeMoves}}},
    setup: {'-': {'-': {'-': setupMoves}}}
  },
  questbook: {
    '-': {'-': {'-': {'-': questBook.injectQuestBookFull}}},
    atoz: {'-': {'-': {'-': questBook.injectQuestBookFull}}},
    viewquest: {'-': {'-': {'-': questBook.injectQuestTracker}}}
  },
  profile: {
    '-': {'-': {'-': {'-': injectProfile}}},
    managecombatset: {'-': {'-': {'-': injectProfile}}},
    report: {'-': {'-': {'-': injectProfile}}},
    equipitem: {'-': {'-': {'-': injectProfile}}},
    useitem: {'-': {'-': {'-': injectProfile}}},
    changebio: {'-': {'-': {'-': injectBioWidgets}}},
    dropitems: {'-': {'-': {'-': dropItems.injectProfileDropItems}}}
  },
  auctionhouse: {
    '-': {'-': {'-': {'-': auctionHouse.injectAuctionHouse}}},
    quickcreate: {'-': {'-': {'-': auctionHouse.quickCreate}}}
  },
  guild: {
    inventory: {
      report: {'-': {'-': injectReportPaint}},
      addtags: {'-': {'-': injectGuildAddTagsWidgets}},
      removetags: {'-': {'-': injectGuildAddTagsWidgets}},
      storeitems: {'-': {'-': dropItems.injectStoreItems}}
    },
    chat: {'-': {'-': {'-': logs.guildChat}}},
    log: {'-': {'-': {'-': logs.guildLog}}},
    groups: {
      viewstats: {'-': {'-': groups.injectGroupStats}},
      joinallgroupsundersize: {'-': {'-': groups.injectGroups}},
      joinall: {'-': {'-': groups.injectGroups}},
      '-': {'-': {'-': groups.injectGroups}}
    },
    manage: {'-': {'-': {'-': injectGuild}}},
    advisor: {
      '-': {'-': {'-': injectAdvisor}},
      weekly: {'-': {'-': injectAdvisor}}
    },
    history: {'-': {'-': {'-': addHistoryWidgets}}},
    view: {'-': {'-': {'-': injectViewGuild}}},
    scouttower: {'-': {'-': {'-': injectScouttower}}},
    mailbox: {'-': {'-': {'-': guildMailbox}}},
    ranks: {'-': {'-': {'-': injectGuildRanks}}},
    conflicts: {rpupgrades: {'-': {'-': injectRPUpgrades}}},
    bank: {'-': {'-': {'-': bank.injectGuildBank}}}
  },
  bank: {'-': {'-': {'-': {'-': bank.injectBank}}}},
  log: {
    '-': {'-': {'-': {'-': logs.playerLog}}},
    outbox: {'-': {'-': {'-': logs.outbox}}}
  },
  potionbazaar: {'-': {'-': {'-': {'-': injectBazaar}}}},
  marketplace: {createreq: {'-': {'-': {'-': misc.addMarketplaceWidgets}}}},
  quickbuff: {'-': {'-': {'-': {'-': injectQuickBuff}}}}, // No ga
  notepad: {
    showlogs: {'-': {'-': {'-': injectNotepadShowLogs}}}, // done
    invmanagernew: {'-': {'-': {'-': injectInventoryManagerNew}}},
    guildinvmgr: {'-': {'-': {'-': injectInventoryManagerNew}}},
    recipemanager: {'-': {'-': {'-': injectRecipeManager}}}, // done
    auctionsearch: {'-': {'-': {'-': injectAuctionSearch}}},
    onlineplayers: {'-': {'-': {'-': injectOnlinePlayers}}}, // done
    quicklinkmanager: {'-': {'-': {'-': injectQuickLinkManager}}}, // done
    monsterlog: {'-': {'-': {'-': injectMonsterLog}}}, // done
    quickextract: {'-': {'-': {'-': insertQuickExtract}}}, // done
    quickwear: {'-': {'-': {'-': insertQuickWear}}}, // done
    fsboxcontent: {'-': {'-': {'-': misc.injectFsBoxContent}}}, // done
    bufflogcontent: {'-': {'-': {'-': injectBuffLog}}}, // done
    newguildlog: {'-': {'-': {'-': injectNewGuildLog}}},
    findbuffs: {'-': {'-': {'-': injectFindBuffs}}}, // done
    findother: {'-': {'-': {'-': injectFindOther}}}, // done
    savesettings: {'-': {'-': {'-': injectSaveSettings}}},
    '-': {'-': {'-': {'-': misc.injectNotepad}}}
  },
  points: {
    '-': {
      '-': {
        '-': {'-': storePlayerUpgrades},
        '0': {'-': storePlayerUpgrades},
        '1': {'-': notification.parseGoldUpgrades}
      }
    }
  },
  trade: {
    '-': {'-': {'-': {'-': injectTrade}}},
    createsecure: {'-': {'-': {'-': injectTrade}}},
    docreatesecure: {'-': {'-': {'-': injectTrade}}}
  },
  titan: {'-': {'-': {'-': {'-': injectTitan}}}},
  toprated: {
    xp: {'-': {'-': {'-': injectTopRated}}},
    monthlyxp: {'-': {'-': {'-': injectTopRated}}},
    gold: {'-': {'-': {'-': injectTopRated}}},
    killstreak: {'-': {'-': {'-': injectTopRated}}},
    bounties: {'-': {'-': {'-': injectTopRated}}},
    risingstars: {'-': {'-': {'-': injectTopRated}}},
    arena: {'-': {'-': {'-': injectTopRated}}},
    superelites: {'-': {'-': {'-': injectTopRated}}},
    smasher: {'-': {'-': {'-': injectTopRated}}},
    globalquest: {'-': {'-': {'-': globalQuest}}}
  },
  inventing: {viewrecipe: {'-': {'-': {'-': inventing}}}},
  tempinv: {'-': {'-': {'-': {'-': injectMailbox}}}},
  findplayer: {'-': {'-': {'-': {'-': misc.injectFindPlayer}}}},
  quests: { // UFSG
    '-': {'-': {'-': {'-': allowBack}}},
    view: {'-': {'-': {'-': showAllQuestSteps}}}
  },
  items: {'-': {'-': {'-': {'-': allowBack}}}}, // UFSG
  creatures: {'-': {'-': {'-': {'-': allowBack}}}}, // UFSG
  masterrealms: {'-': {'-': {'-': {'-': allowBack}}}}, // UFSG
  realms: {'-': {'-': {'-': {'-': allowBack}}}}, // UFSG
  relics: {'-': {'-': {'-': {'-': allowBack}}}}, // UFSG
  shops: {'-': {'-': {'-': {'-': allowBack}}}}, // UFSG
  scavenging: {'-': {'-': {'-': {'-': injectScavenging}}}},
  temple: {'-': {'-': {'-': {'-': notification.parseTemplePage}}}},
  composing: {
    '-': {'-': {'-': {'-': composing.injectComposing}}},
    breakdown: {'-': {'-': {'-': composingBreakdown}}},
    create: {'-': {'-': {'-': composing.composingCreate}}}
  },
  pvpladder: {'-': {'-': {'-': {'-': ladder}}}},
  '-': {
    viewupdatearchive: {'-': {'-': {'-': viewArchive}}},
    viewarchive: {'-': {'-': {'-': viewArchive}}},
    '-': {'-': {'-': {'-': unknownPage}}}
  }
};
