import allowBack from '../guide/allowBack';
import completedArenas from '../arena/completedArenas';
import composingBreakdown from '../composing/breakdown';
import craftForge from '../craftForge/craftForge';
import globalQuest from '../topRated/globalQuest';
import guildHall from '../guild/hall';
import guildMailbox from '../mailbox/guildMailbox';
import injectAdvisor from '../guildAdvisor';
import injectArena from '../arena/arena';
import injectBazaar from '../bazaar';
import injectBioWidgets from '../profile/bio/bioWidgets';
import injectBuffLog from '../buffLog/injectBuffLog';
import injectGroupStats from '../groups/injectGroupStats';
import injectGroups from '../groups/groups';
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
import injectProfileDropItems from '../dropItems/injectProfileDropItems';
import injectQuickBuff from '../quickBuff';
import injectRPUpgrades from '../guild/injectRPUpgrades';
import injectRecipeManager from '../recipeMgr/recipeMgr';
import injectReportPaint from '../guildReport/guildReport';
import injectSaveSettings from '../settings/load';
import injectScavenging from '../scavenging';
import injectScouttower from '../scoutTower/injectScouttower';
import injectSettings from '../settings/injectSettings';
import injectStoreItems from '../dropItems/injectStoreItems';
import injectTitan from '../scoutTower/injectTitan';
import injectTopRated from '../topRated/toprated';
import injectTrade from '../trade/trade';
import injectViewGuild from '../guild/injectViewGuild';
import injectWorld from '../legacy/legacy';
import insertQuickExtract from '../quickExtract';
import insertQuickWear from '../quickWear/quickWear';
import inventing from '../recipes/inventing';
import ladder from '../ladder';
import marketplace from '../marketplace';
import parseGoldUpgrades from '../notification/parseGoldUpgrades';
import {parseTemplePage} from '../notification/parseTemplePage';
import setupMoves from '../arena/setup';
import showAllQuestSteps from '../guide/showAllQuestSteps';
import storeMoves from '../arena/store';
import storePlayerUpgrades from '../upgrades';
import superelite from '../seLog/superelite';
import unknownPage from './unknownPage';
import viewArchive from '../news/viewArchive';
import {composingCreate, injectComposing} from '../composing/composing';
import {guildChat, guildLog, outbox, playerLog} from '../logs/logs';
import {injectAuctionHouse, quickCreate} from '../auctionHouse';
import {injectAuctionSearch, injectQuickLinkManager} from '../lists/lists';
import {injectBank, injectGuildBank} from '../bank';
import {injectFindBuffs, injectFindOther} from '../findBuffs/findBuffs';
import {
  injectFindPlayer,
  injectFsBoxContent,
  injectNotepad
} from '../misc';
import {injectQuestBookFull, injectQuestTracker} from '../questBook';
import {newsFsbox, newsShoutbox} from '../news/news';

export default {
  settings: {'-': {'-': {'-': {'-': injectSettings}}}},
  world: {'-': {'-': {'-': {'-': injectWorld}}}},
  news: {
    fsbox: {'-': {'-': {'-': newsFsbox}}},
    shoutbox: {'-': {'-': {'-': newsShoutbox}}},
    viewupdatearchive: {'-': {'-': {'-': viewArchive}}},
    viewarchive: {'-': {'-': {'-': viewArchive}}}
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
    '-': {'-': {'-': {'-': injectQuestBookFull}}},
    atoz: {'-': {'-': {'-': injectQuestBookFull}}},
    viewquest: {'-': {'-': {'-': injectQuestTracker}}}
  },
  profile: {
    '-': {'-': {'-': {'-': injectProfile}}},
    managecombatset: {'-': {'-': {'-': injectProfile}}},
    report: {'-': {'-': {'-': injectProfile}}},
    equipitem: {'-': {'-': {'-': injectProfile}}},
    useitem: {'-': {'-': {'-': injectProfile}}},
    changebio: {'-': {'-': {'-': injectBioWidgets}}},
    dropitems: {'-': {'-': {'-': injectProfileDropItems}}}
  },
  auctionhouse: {
    '-': {'-': {'-': {'-': injectAuctionHouse}}},
    quickcreate: {'-': {'-': {'-': quickCreate}}}
  },
  guild: {
    inventory: {
      report: {'-': {'-': injectReportPaint}},
      addtags: {'-': {'-': injectGuildAddTagsWidgets}},
      removetags: {'-': {'-': injectGuildAddTagsWidgets}},
      storeitems: {'-': {'-': injectStoreItems}}
    },
    chat: {'-': {'-': {'-': guildChat}}},
    log: {'-': {'-': {'-': guildLog}}},
    groups: {
      viewstats: {'-': {'-': injectGroupStats}},
      joinallgroupsundersize: {'-': {'-': injectGroups}},
      joinall: {'-': {'-': injectGroups}},
      '-': {'-': {'-': injectGroups}}
    },
    manage: {'-': {'-': {'-': injectGuild}}},
    advisor: {
      '-': {'-': {'-': injectAdvisor}},
      weekly: {'-': {'-': injectAdvisor}}
    },
    history: {'-': {'-': {'-': injectBioWidgets}}},
    view: {'-': {'-': {'-': injectViewGuild}}},
    scouttower: {'-': {'-': {'-': injectScouttower}}},
    mailbox: {'-': {'-': {'-': guildMailbox}}},
    ranks: {'-': {'-': {'-': injectGuildRanks}}},
    conflicts: {rpupgrades: {'-': {'-': injectRPUpgrades}}},
    bank: {'-': {'-': {'-': injectGuildBank}}},
    hall: {
      '-': {'-': {'-': guildHall}},
      post: {'-': {'-': injectBioWidgets}}
    }
  },
  bank: {'-': {'-': {'-': {'-': injectBank}}}},
  log: {
    '-': {'-': {'-': {'-': playerLog}}},
    outbox: {'-': {'-': {'-': outbox}}}
  },
  potionbazaar: {'-': {'-': {'-': {'-': injectBazaar}}}},
  marketplace: {createreq: {'-': {'-': {'-': marketplace}}}},
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
    fsboxcontent: {'-': {'-': {'-': injectFsBoxContent}}}, // done
    bufflogcontent: {'-': {'-': {'-': injectBuffLog}}}, // done
    newguildlog: {'-': {'-': {'-': injectNewGuildLog}}},
    findbuffs: {'-': {'-': {'-': injectFindBuffs}}}, // done
    findother: {'-': {'-': {'-': injectFindOther}}}, // done
    savesettings: {'-': {'-': {'-': injectSaveSettings}}},
    '-': {'-': {'-': {'-': injectNotepad}}}
  },
  points: {
    '-': {
      '-': {
        '-': {'-': storePlayerUpgrades},
        '0': {'-': storePlayerUpgrades},
        '1': {'-': parseGoldUpgrades}
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
  findplayer: {'-': {'-': {'-': {'-': injectFindPlayer}}}},
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
  temple: {'-': {'-': {'-': {'-': parseTemplePage}}}},
  composing: {
    '-': {'-': {'-': {'-': injectComposing}}},
    breakdown: {'-': {'-': {'-': composingBreakdown}}},
    create: {'-': {'-': {'-': composingCreate}}}
  },
  pvpladder: {'-': {'-': {'-': {'-': ladder}}}},
  crafting: {'-': {'-': {'-': {'-': craftForge}}}},
  hellforge: {'-': {'-': {'-': {'-': craftForge}}}},
  superelite: {'-': {'-': {'-': {'-': superelite}}}},
  '-': {
    viewupdatearchive: {'-': {'-': {'-': viewArchive}}},
    viewarchive: {'-': {'-': {'-': viewArchive}}},
    '-': {'-': {'-': {'-': unknownPage}}}
  }
};
