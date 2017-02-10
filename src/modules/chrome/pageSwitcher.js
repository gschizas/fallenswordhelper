import * as composing from '../composing';
import * as notification from '../notification';
import * as guildReport from '../guildReport';
import * as guildAdvisor from '../guildAdvisor';
import * as bazaar from '../bazaar';
import * as groups from '../groups';
import * as rank from '../rank';
import * as inventory from '../inventory';
import * as quickBuff from '../quickBuff';
import * as toprated from '../toprated';
import * as misc from '../misc';
import * as bio from '../profile/bio';
import * as profile from '../profile/profile';
import * as logs from '../logs';
import * as lists from '../lists';
import * as recipes from '../recipes';
import * as quickWear from '../quickWear';
import * as onlinePlayers from '../onlinePlayers';
import * as dropItems from '../dropItems';
import * as questBook from '../questBook';
import * as settingsPage from '../settings/settingsPage';
import * as news from '../news';
import * as mailbox from '../mailbox';
import * as bank from '../bank';
import * as guild from '../guild';
import * as upgrades from '../upgrades';
import * as newGuildLog from '../newGuildLog/newGuildLog';
import * as scoutTower from '../scoutTower';
import * as trade from '../trade';
import * as recipeMgr from '../recipeMgr/recipeMgr';
import * as quickExtract from '../quickExtract';
import * as scavenging from '../scavenging';
import * as findBuffs from '../findBuffs';
import * as monstorLog from '../monstorLog';
import * as arena from '../arena';
import * as combatLog from '../combatLog';
import * as guide from '../guide';
import * as legacy from '../legacy';

export default {
  settings: {'-': {'-': {'-': {'-': settingsPage.injectSettings}}}},
  world: {'-': {'-': {'-': {'-': legacy.injectWorld}}}},
  news: {
    'fsbox': {'-': {'-': {'-': news.newsFsbox}}},
    'shoutbox': {'-': {'-': {'-': news.newsShoutbox}}}},
  blacksmith: {
    'repairall': {'-': {'-': {'1': legacy.injectWorld}}}},
  arena: {
    '-': {'-': {'-': {'-': arena.injectArena}}},
    'join': {'-': {'-': {'-': arena.injectArena}}},
    'completed': {'-': {'-': {'-': arena.completedArenas}}},
    'pickmove': {'-': {'-': {'-': arena.storeMoves}}},
    'setup': {'-': {'-': {'-': arena.setupMoves}}}
  },
  questbook: {
    '-': {'-': {
      '-': {'-': questBook.injectQuestBookFull},
      '0': {'-': questBook.injectQuestBookFull}, // Normal
      '1': {'-': questBook.injectQuestBookFull}}}, // Seasonal
    'atoz': {'-': {'-': {'-': questBook.injectQuestBookFull}}},
    'viewquest': {'-': {'-': {'-': questBook.injectQuestTracker}}}},
  profile: {
    '-': {'-': {'-': {'-': profile.injectProfile}}},
    'managecombatset': {'-': {'-': {'-': profile.injectProfile}}},
    'report': {'-': {'-': {'-': profile.injectProfile}}},
    'equipitem': {'-': {'-': {'-': profile.injectProfile}}},
    'useitem': {'-': {'-': {'-': profile.injectProfile}}},
    'changebio': {'-': {'-': {'-': bio.injectBioWidgets}}},
    'dropitems': {'-': {'-': {'-': dropItems.injectProfileDropItems,
      '1': dropItems.injectProfileDropItems}}}},
  auctionhouse: {'-': {'-': {'-': {'-': misc.injectAuctionHouse},
    '-1': {'-': misc.injectAuctionHouse},
    '-2': {'-': misc.injectAuctionHouse},
    '-3': {'-': misc.injectAuctionHouse}}}},
  guild: {
    'inventory': {
      'report': {'-': {'-': guildReport.injectReportPaint}},
      'addtags': {
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
        '16': {'-': guild.injectGuildAddTagsWidgets}},
      'removetags': {
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
        '16': {'-': guild.injectGuildAddTagsWidgets}},
      'storeitems': {'-': {'-': dropItems.injectStoreItems}}},
    'chat': {'-': {'-': {'-': logs.guildChat}}},
    'log': {'-': {'-': {'-': logs.guildLog}}},
    'groups': {
      'viewstats': {'-': {'-': groups.injectGroupStats}},
      'joinallgroupsundersize': {'-': {'-': groups.injectGroups}},
      'joinall': {'-': {'-': groups.injectGroups}},
      '-': {'-': {'-': groups.injectGroups}}},
    'manage': {'-': {'-': {'-': guild.injectGuild}}},
    // 'structures': {'-': {'-': {'-': guild.injectGuild}}},
    'advisor': {
      '-': {'-': {'-': guildAdvisor.injectAdvisor}},
      'weekly': {'-': {'-': guildAdvisor.injectAdvisor}}},
    'history': {'-': {'-': {'-': guild.addHistoryWidgets}}},
    'view': {'-': {'-': {'-': guild.injectViewGuild}}},
    'scouttower': {'-': {'-': {'-': scoutTower.injectScouttower}}},
    'mailbox': {'-': {'-': {'-': mailbox.guildMailbox}}},
    'ranks': {'-': {'-': {'-': rank.injectGuildRanks}}},
    'conflicts': {'rpupgrades': {'-': {'-': guild.injectRPUpgrades}}},
    'bank': {'-': {'-': {'-': bank.injectGuildBank}}}},
  bank: {'-': {'-': {'-': {'-': bank.injectBank}}}},
  log: {
    '-': {'-': {
      '-': {'-': logs.playerLog},
      '-1': {'-': logs.playerLog},
      '0': {'-': logs.playerLog},
      '1': {'-': logs.playerLog},
      '2': {'-': logs.playerLog},
      '3': {'-': logs.playerLog}}},
    'outbox': {'-': {'-': {'-': logs.outbox}}}},
  potionbazaar: {'-': {'-': {'-': {'-': bazaar.injectBazaar}}}},
  marketplace: {
    'createreq': {'-': {'-': {'-': misc.addMarketplaceWidgets}}}},
  quickbuff: {'-': {'-': {'-': {'-': quickBuff.injectQuickBuff}}}},
  notepad: {
    'showlogs': {'-': {'-': {'-': combatLog.injectNotepadShowLogs}}},
    'invmanagernew': {'-': {'-': {
      '-': inventory.injectInventoryManagerNew}}},
    'guildinvmgr': {'-': {'-': {
      '-': inventory.injectInventoryManagerNew}}},
    'recipemanager': {'-': {'-': {'-': recipeMgr.injectRecipeManager}}},
    'auctionsearch': {'-': {'-': {'-': lists.injectAuctionSearch}}},
    'onlineplayers': {'-': {'-': {'-': onlinePlayers.injectOnlinePlayers}}},
    'quicklinkmanager': {'-': {'-': {'-': lists.injectQuickLinkManager}}},
    'monsterlog': {'-': {'-': {'-': monstorLog.injectMonsterLog}}},
    'quickextract': {'-': {'-': {'-': quickExtract.insertQuickExtract}}},
    'quickwear': {'-': {'-': {'-': quickWear.insertQuickWear}}},
    'fsboxcontent': {'-': {'-': {'-': misc.injectFsBoxContent}}},
    'bufflogcontent': {'-': {'-': {'-': quickBuff.injectBuffLog}}},
    'newguildlog': {'-': {'-': {'-': newGuildLog.injectNewGuildLog}}},
    'findbuffs': {'-': {'-': {'-': findBuffs.injectFindBuffs}}},
    'findother': {'-': {'-': {'-': findBuffs.injectFindOther}}},
    'savesettings': {'-': {'-': {'-': settingsPage.injectSaveSettings}}},
    '-': {'-': {'-': {'-': misc.injectNotepad}}}},
  points: {'-': {'-': {
    '-': {'-': upgrades.storePlayerUpgrades},
    '0': {'-': upgrades.storePlayerUpgrades},
    '1': {'-': notification.parseGoldUpgrades}}}},
  trade: {
    '-': {'-': {'-': {'-': trade.injectTrade}}},
    'createsecure': {'-': {'-': {'-': trade.injectTrade}}},
    'docreatesecure': {'-': {'-': {'-': trade.injectTrade}}}},
  titan: {'-': {'-': {'-': {'-': scoutTower.injectTitan}}}},
  toprated: {
    'xp': {'-': {'-': {'-': toprated.injectTopRated}}},
    'monthlyxp': {'-': {'-': {'-': toprated.injectTopRated}}},
    'gold': {'-': {'-': {'-': toprated.injectTopRated}}},
    'killstreak': {'-': {'-': {'-': toprated.injectTopRated}}},
    'bounties': {'-': {'-': {'-': toprated.injectTopRated}}},
    'risingstars': {'-': {'-': {'-': toprated.injectTopRated}}},
    'arena': {'-': {'-': {'-': toprated.injectTopRated}}},
    'superelites': {'-': {'-': {'-': toprated.injectTopRated}}},
    'smasher': {'-': {'-': {'-': toprated.injectTopRated}}}},
  inventing: {'viewrecipe': {'-': {'-': {'-': recipes.inventing}}}},
  tempinv: {'-': {'-': {'-': {'-': mailbox.injectMailbox}}}},
  //attackplayer: {'-': {'-': {'-': {'-': 'attackPlayer.injectAttackPlayer'}}}},
  findplayer: {'-': {'-': {'-': {'-': misc.injectFindPlayer}}}},
  quests: {'-': {'-': {'-': {'-': guide.allowBack}}},
    'view': {'-': {'-': {'-': guide.showAllQuestSteps}}}}, //UFSG
  items: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
  creatures: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
  masterrealms: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
  realms: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
  relics: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
  shops: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
  scavenging: {'-': {'-': {'-': {'-': scavenging.injectScavenging}}}},
  temple: {'-': {'-': {'-': {'-': notification.parseTemplePage}}}},
  composing: {'-': {'-': {'-': {'-': composing.injectComposing}}},
    'breakdown': {'-': {'-': {'-': composing.composingBreakdown}}},
    'create': {'-': {'-': {'-': composing.composingCreate}}}},
  pvpladder: {'-': {'-': {'-': {'-': misc.ladder}}}},
  shop: {'-': {'-': {'-': {'-': legacy.injectShop}}}},
  '-': {
    'viewupdatearchive': {'-': {'-': {'-': news.viewArchive}}},
    'viewarchive': {'-': {'-': {'-': news.viewArchive}}},
    '-': {'-': {'-': {'-': legacy.unknownPage}}}}
};
