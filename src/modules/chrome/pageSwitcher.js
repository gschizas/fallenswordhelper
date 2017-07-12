import addHistoryWidgets from '../guild/addHistoryWidgets';
import completedArenas from '../arena/completedArenas';
import composingBreakdown from '../composing/breakdown';
import guildMailbox from '../mailbox/guildMailbox';
import injectAdvisor from '../guildAdvisor';
import injectArena from '../arena/arena';
import injectBazaar from '../bazaar';
import injectBioWidgets from '../profile/bio/bioWidgets';
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
import injectRPUpgrades from '../guild/injectRPUpgrades';
import injectRecipeManager from '../recipeMgr/recipeMgr';
import injectReportPaint from '../guildReport';
import injectSaveSettings from '../settings/load';
import injectScavenging from '../scavenging';
import injectTrade from '../trade';
import injectViewGuild from '../guild/injectViewGuild';
import injectWorld from '../legacy';
import insertQuickExtract from '../quickExtract';
import insertQuickWear from '../quickWear';
import inventing from '../recipes';
import ladder from '../ladder';
import setupMoves from '../arena/setup';
import storeMoves from '../arena/store';
import storePlayerUpgrades from '../upgrades';
import unknownPage from './unknownPage';
import viewArchive from '../news/viewArchive';
import * as auctionHouse from '../auctionHouse';
import * as bank from '../bank';
import * as composing from '../composing/composing';
import * as dropItems from '../dropItems';
import * as findBuffs from '../findBuffs';
import * as groups from '../groups';
import * as guide from '../guide';
import * as lists from '../lists';
import * as logs from '../logs/logs';
import * as misc from '../misc';
import * as news from '../news/news';
import * as notification from '../notification';
import * as questBook from '../questBook';
import * as quickBuff from '../quickBuff';
import * as scoutTower from '../scoutTower';
import * as settingsPage from '../settings/settingsPage';
import * as toprated from '../toprated';

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
    '-': {
      '-': {
        '-': {'-': questBook.injectQuestBookFull},
        '0': {'-': questBook.injectQuestBookFull}, // Normal
        '1': {'-': questBook.injectQuestBookFull} // Seasonal
      }
    },
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
    dropitems: {
      '-': {
        '-': {
          '-': dropItems.injectProfileDropItems,
          '1': dropItems.injectProfileDropItems
        }
      }
    }
  },
  auctionhouse: {
    '-': {
      '-': {
        '-': {'-': auctionHouse.injectAuctionHouse},
        '-1': {'-': auctionHouse.injectAuctionHouse},
        '-2': {'-': auctionHouse.injectAuctionHouse},
        '-3': {'-': auctionHouse.injectAuctionHouse}
      }
    },
    quickcreate: {'-': {'-': {'-': auctionHouse.quickCreate}}}
  },
  guild: {
    inventory: {
      report: {'-': {'-': injectReportPaint}},
      addtags: {
        '-': {'-': injectGuildAddTagsWidgets},
        '-1': {'-': injectGuildAddTagsWidgets},
        '0': {'-': injectGuildAddTagsWidgets},
        '1': {'-': injectGuildAddTagsWidgets},
        '2': {'-': injectGuildAddTagsWidgets},
        '3': {'-': injectGuildAddTagsWidgets},
        '4': {'-': injectGuildAddTagsWidgets},
        '5': {'-': injectGuildAddTagsWidgets},
        '6': {'-': injectGuildAddTagsWidgets},
        '7': {'-': injectGuildAddTagsWidgets},
        '8': {'-': injectGuildAddTagsWidgets},
        '10': {'-': injectGuildAddTagsWidgets},
        '15': {'-': injectGuildAddTagsWidgets},
        '16': {'-': injectGuildAddTagsWidgets}
      },
      removetags: {
        '-': {'-': injectGuildAddTagsWidgets},
        '-1': {'-': injectGuildAddTagsWidgets},
        '0': {'-': injectGuildAddTagsWidgets},
        '1': {'-': injectGuildAddTagsWidgets},
        '2': {'-': injectGuildAddTagsWidgets},
        '3': {'-': injectGuildAddTagsWidgets},
        '4': {'-': injectGuildAddTagsWidgets},
        '5': {'-': injectGuildAddTagsWidgets},
        '6': {'-': injectGuildAddTagsWidgets},
        '7': {'-': injectGuildAddTagsWidgets},
        '8': {'-': injectGuildAddTagsWidgets},
        '10': {'-': injectGuildAddTagsWidgets},
        '16': {'-': injectGuildAddTagsWidgets}
      },
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
    scouttower: {'-': {'-': {'-': scoutTower.injectScouttower}}},
    mailbox: {'-': {'-': {'-': guildMailbox}}},
    ranks: {'-': {'-': {'-': injectGuildRanks}}},
    conflicts: {rpupgrades: {'-': {'-': injectRPUpgrades}}},
    bank: {'-': {'-': {'-': bank.injectGuildBank}}}
  },
  bank: {'-': {'-': {'-': {'-': bank.injectBank}}}},
  log: {
    '-': {
      '-': {
        '-': {'-': logs.playerLog},
        '-1': {'-': logs.playerLog},
        '0': {'-': logs.playerLog},
        '1': {'-': logs.playerLog},
        '2': {'-': logs.playerLog},
        '3': {'-': logs.playerLog}
      }
    },
    outbox: {'-': {'-': {'-': logs.outbox}}}
  },
  potionbazaar: {'-': {'-': {'-': {'-': injectBazaar}}}},
  marketplace: {createreq: {'-': {'-': {'-': misc.addMarketplaceWidgets}}}},
  quickbuff: {'-': {'-': {'-': {'-': quickBuff.injectQuickBuff}}}}, // No ga
  notepad: {
    showlogs: {'-': {'-': {'-': injectNotepadShowLogs}}},
    invmanagernew: {'-': {'-': {'-': injectInventoryManagerNew}}},
    guildinvmgr: {'-': {'-': {'-': injectInventoryManagerNew}}},
    recipemanager: {'-': {'-': {'-': injectRecipeManager}}},
    auctionsearch: {'-': {'-': {'-': lists.injectAuctionSearch}}},
    onlineplayers: {'-': {'-': {'-': injectOnlinePlayers}}},
    quicklinkmanager: {'-': {'-': {'-': lists.injectQuickLinkManager}}},
    monsterlog: {'-': {'-': {'-': injectMonsterLog}}},
    quickextract: {'-': {'-': {'-': insertQuickExtract}}},
    quickwear: {'-': {'-': {'-': insertQuickWear}}},
    fsboxcontent: {'-': {'-': {'-': misc.injectFsBoxContent}}},
    bufflogcontent: {'-': {'-': {'-': quickBuff.injectBuffLog}}},
    newguildlog: {'-': {'-': {'-': injectNewGuildLog}}},
    findbuffs: {'-': {'-': {'-': findBuffs.injectFindBuffs}}},
    findother: {'-': {'-': {'-': findBuffs.injectFindOther}}},
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
  titan: {'-': {'-': {'-': {'-': scoutTower.injectTitan}}}},
  toprated: {
    xp: {'-': {'-': {'-': toprated.injectTopRated}}},
    monthlyxp: {'-': {'-': {'-': toprated.injectTopRated}}},
    gold: {'-': {'-': {'-': toprated.injectTopRated}}},
    killstreak: {'-': {'-': {'-': toprated.injectTopRated}}},
    bounties: {'-': {'-': {'-': toprated.injectTopRated}}},
    risingstars: {'-': {'-': {'-': toprated.injectTopRated}}},
    arena: {'-': {'-': {'-': toprated.injectTopRated}}},
    superelites: {'-': {'-': {'-': toprated.injectTopRated}}},
    smasher: {'-': {'-': {'-': toprated.injectTopRated}}},
    globalquest: {'-': {'-': {'-': toprated.globalQuest}}}
  },
  inventing: {viewrecipe: {'-': {'-': {'-': inventing}}}},
  tempinv: {'-': {'-': {'-': {'-': injectMailbox}}}},
  findplayer: {'-': {'-': {'-': {'-': misc.injectFindPlayer}}}},
  quests: { // UFSG
    '-': {'-': {'-': {'-': guide.allowBack}}},
    view: {'-': {'-': {'-': guide.showAllQuestSteps}}}
  },
  items: {'-': {'-': {'-': {'-': guide.allowBack}}}}, // UFSG
  creatures: {'-': {'-': {'-': {'-': guide.allowBack}}}}, // UFSG
  masterrealms: {'-': {'-': {'-': {'-': guide.allowBack}}}}, // UFSG
  realms: {'-': {'-': {'-': {'-': guide.allowBack}}}}, // UFSG
  relics: {'-': {'-': {'-': {'-': guide.allowBack}}}}, // UFSG
  shops: {'-': {'-': {'-': {'-': guide.allowBack}}}}, // UFSG
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
