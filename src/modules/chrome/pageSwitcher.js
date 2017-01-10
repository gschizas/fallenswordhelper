import composing from '../composing';
import notification from '../notification';
import guildReport from '../guildReport';
import guildAdvisor from '../guildAdvisor';
import bazaar from '../bazaar';
import groups from '../groups';
import rank from '../rank';
import inventory from '../inventory';
import quickBuff from '../quickBuff';
import toprated from '../toprated';
import misc from '../misc';
import bio from '../profile/bio';
import profile from '../profile/profile';
import logs from '../logs';
import lists from '../lists';
import recipes from '../recipes';
import quickWear from '../quickWear';
import onlinePlayers from '../onlinePlayers';
import dropItems from '../dropItems';
import questBook from '../questBook';
import settingsPage from '../settings/settingsPage';
import news from '../news';
import mailbox from '../mailbox';
import bank from '../bank';
import guild from '../guild';
import upgrades from '../upgrades';
import newGuildLog from '../newGuildLog';
import scoutTower from '../scoutTower';
import trade from '../trade';
import recipeMgr from '../recipeMgr';
import quickExtract from '../quickExtract';
import scavenging from '../scavenging';
import findBuffs from '../findBuffs';
import monstorLog from '../monstorLog';
import arena from '../arena';
import combatLog from '../combatLog';
import guide from '../guide';
import legacy from '../legacy';

var pageSwitcher = {
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
    'structures': {'-': {'-': {'-': guild.injectGuild}}},
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
  '-': {
    'viewupdatearchive': {'-': {'-': {'-': news.viewArchive}}},
    'viewarchive': {'-': {'-': {'-': news.viewArchive}}},
    '-': {'-': {'-': {'-': legacy.unknownPage}}}}
};

export default pageSwitcher;
