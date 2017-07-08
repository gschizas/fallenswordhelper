import injectBioWidgets from '../profile/bio/bioWidgets';
import injectProfile from '../profile/profile';
import * as arena from '../arena/arena';
import * as auctionHouse from '../auctionHouse';
import * as bank from '../bank';
import * as bazaar from '../bazaar';
import * as breakdown from '../composing/breakdown';
import * as combatLog from '../combatLog';
import * as complete from '../arena/complete';
import * as composing from '../composing/composing';
import * as dropItems from '../dropItems';
import * as findBuffs from '../findBuffs';
import * as groups from '../groups';
import * as guide from '../guide';
import * as guild from '../guild';
import * as guildAdvisor from '../guildAdvisor';
import * as guildReport from '../guildReport';
import * as inventory from '../inventory/inventory';
import * as legacy from '../legacy';
import * as lists from '../lists';
import * as load from '../settings/load';
import * as logs from '../logs';
import * as mailbox from '../mailbox';
import * as misc from '../misc';
import * as monstorLog from '../monstorLog';
import * as newGuildLog from '../newGuildLog/newGuildLog';
import * as news from '../news';
import * as notification from '../notification';
import * as onlinePlayers from '../onlinePlayers';
import * as questBook from '../questBook';
import * as quickBuff from '../quickBuff';
import * as quickExtract from '../quickExtract';
import * as quickWear from '../quickWear';
import * as rank from '../rank';
import * as recipeMgr from '../recipeMgr/recipeMgr';
import * as recipes from '../recipes';
import * as scavenging from '../scavenging';
import * as scoutTower from '../scoutTower';
import * as settingsPage from '../settings/settingsPage';
import * as setup from '../arena/setup';
import * as store from '../arena/store';
import * as toprated from '../toprated';
import * as trade from '../trade';
import * as unknownPage from './unknownPage';
import * as upgrades from '../upgrades';

export default {
  settings: {'-': {'-': {'-': {'-': settingsPage.injectSettings}}}},
  world: {'-': {'-': {'-': {'-': legacy.injectWorld}}}},
  news: {
    fsbox: {'-': {'-': {'-': news.newsFsbox}}},
    shoutbox: {'-': {'-': {'-': news.newsShoutbox}}}
  },
  blacksmith: {repairall: {'-': {'-': {'1': legacy.injectWorld}}}},
  arena: {
    '-': {'-': {'-': {'-': arena.injectArena}}},
    join: {'-': {'-': {'-': arena.injectArena}}},
    completed: {'-': {'-': {'-': complete.completedArenas}}},
    pickmove: {'-': {'-': {'-': store.storeMoves}}},
    setup: {'-': {'-': {'-': setup.setupMoves}}}
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
      report: {'-': {'-': guildReport.injectReportPaint}},
      addtags: {
        '-': {'-': guild.injectGuildAddTagsWidgets},
        '-1': {'-': guild.injectGuildAddTagsWidgets},
        '0': {'-': guild.injectGuildAddTagsWidgets},
        '1': {'-': guild.injectGuildAddTagsWidgets},
        '2': {'-': guild.injectGuildAddTagsWidgets},
        '3': {'-': guild.injectGuildAddTagsWidgets},
        '4': {'-': guild.injectGuildAddTagsWidgets},
        '5': {'-': guild.injectGuildAddTagsWidgets},
        '6': {'-': guild.injectGuildAddTagsWidgets},
        '7': {'-': guild.injectGuildAddTagsWidgets},
        '8': {'-': guild.injectGuildAddTagsWidgets},
        '10': {'-': guild.injectGuildAddTagsWidgets},
        '15': {'-': guild.injectGuildAddTagsWidgets},
        '16': {'-': guild.injectGuildAddTagsWidgets}
      },
      removetags: {
        '-': {'-': guild.injectGuildAddTagsWidgets},
        '-1': {'-': guild.injectGuildAddTagsWidgets},
        '0': {'-': guild.injectGuildAddTagsWidgets},
        '1': {'-': guild.injectGuildAddTagsWidgets},
        '2': {'-': guild.injectGuildAddTagsWidgets},
        '3': {'-': guild.injectGuildAddTagsWidgets},
        '4': {'-': guild.injectGuildAddTagsWidgets},
        '5': {'-': guild.injectGuildAddTagsWidgets},
        '6': {'-': guild.injectGuildAddTagsWidgets},
        '7': {'-': guild.injectGuildAddTagsWidgets},
        '8': {'-': guild.injectGuildAddTagsWidgets},
        '10': {'-': guild.injectGuildAddTagsWidgets},
        '16': {'-': guild.injectGuildAddTagsWidgets}
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
    manage: {'-': {'-': {'-': guild.injectGuild}}},
    advisor: {
      '-': {'-': {'-': guildAdvisor.injectAdvisor}},
      weekly: {'-': {'-': guildAdvisor.injectAdvisor}}
    },
    history: {'-': {'-': {'-': guild.addHistoryWidgets}}},
    view: {'-': {'-': {'-': guild.injectViewGuild}}},
    scouttower: {'-': {'-': {'-': scoutTower.injectScouttower}}},
    mailbox: {'-': {'-': {'-': mailbox.guildMailbox}}},
    ranks: {'-': {'-': {'-': rank.injectGuildRanks}}},
    conflicts: {rpupgrades: {'-': {'-': guild.injectRPUpgrades}}},
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
  potionbazaar: {'-': {'-': {'-': {'-': bazaar.injectBazaar}}}},
  marketplace: {createreq: {'-': {'-': {'-': misc.addMarketplaceWidgets}}}},
  quickbuff: {'-': {'-': {'-': {'-': quickBuff.injectQuickBuff}}}}, // No ga
  notepad: {
    showlogs: {'-': {'-': {'-': combatLog.injectNotepadShowLogs}}},
    invmanagernew: {'-': {'-': {'-': inventory.injectInventoryManagerNew}}},
    guildinvmgr: {'-': {'-': {'-': inventory.injectInventoryManagerNew}}},
    recipemanager: {'-': {'-': {'-': recipeMgr.injectRecipeManager}}},
    auctionsearch: {'-': {'-': {'-': lists.injectAuctionSearch}}},
    onlineplayers: {'-': {'-': {'-': onlinePlayers.injectOnlinePlayers}}},
    quicklinkmanager: {'-': {'-': {'-': lists.injectQuickLinkManager}}},
    monsterlog: {'-': {'-': {'-': monstorLog.injectMonsterLog}}},
    quickextract: {'-': {'-': {'-': quickExtract.insertQuickExtract}}},
    quickwear: {'-': {'-': {'-': quickWear.insertQuickWear}}},
    fsboxcontent: {'-': {'-': {'-': misc.injectFsBoxContent}}},
    bufflogcontent: {'-': {'-': {'-': quickBuff.injectBuffLog}}},
    newguildlog: {'-': {'-': {'-': newGuildLog.injectNewGuildLog}}},
    findbuffs: {'-': {'-': {'-': findBuffs.injectFindBuffs}}},
    findother: {'-': {'-': {'-': findBuffs.injectFindOther}}},
    savesettings: {'-': {'-': {'-': load.injectSaveSettings}}},
    '-': {'-': {'-': {'-': misc.injectNotepad}}}
  },
  points: {
    '-': {
      '-': {
        '-': {'-': upgrades.storePlayerUpgrades},
        '0': {'-': upgrades.storePlayerUpgrades},
        '1': {'-': notification.parseGoldUpgrades}
      }
    }
  },
  trade: {
    '-': {'-': {'-': {'-': trade.injectTrade}}},
    createsecure: {'-': {'-': {'-': trade.injectTrade}}},
    docreatesecure: {'-': {'-': {'-': trade.injectTrade}}}
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
  inventing: {viewrecipe: {'-': {'-': {'-': recipes.inventing}}}},
  tempinv: {'-': {'-': {'-': {'-': mailbox.injectMailbox}}}},
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
  scavenging: {'-': {'-': {'-': {'-': scavenging.injectScavenging}}}},
  temple: {'-': {'-': {'-': {'-': notification.parseTemplePage}}}},
  composing: {
    '-': {'-': {'-': {'-': composing.injectComposing}}},
    breakdown: {'-': {'-': {'-': breakdown.composingBreakdown}}},
    create: {'-': {'-': {'-': composing.composingCreate}}}
  },
  pvpladder: {'-': {'-': {'-': {'-': misc.ladder}}}},
  '-': {
    viewupdatearchive: {'-': {'-': {'-': news.viewArchive}}},
    viewarchive: {'-': {'-': {'-': news.viewArchive}}},
    '-': {'-': {'-': {'-': unknownPage.unknownPage}}}
  }
};
