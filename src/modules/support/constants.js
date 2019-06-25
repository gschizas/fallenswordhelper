export var rarity = [
  {colour: '#ffffff', clas: 'fshCommon'},
  {colour: '#0099ff', clas: 'fshRare'},
  {colour: '#cc00ff', clas: 'fshUnique'},
  {colour: '#ffff33', clas: 'fshLegendary'},
  {colour: '#cc0033', clas: 'fshSuper'},
  {colour: '#6633ff', clas: 'fshCrystal'},
  {colour: '#009900', clas: 'fshEpic'}
];

export var places = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth',
  'fourteenth'];

export var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'];

export var mercRE = [
  /<td>Attack:<\/td><td>(\d+)<\/td>/,
  /<td>Defense:<\/td><td>(\d+)<\/td>/,
  /<td>Armor:<\/td><td>(\d+)<\/td>/,
  /<td>Damage:<\/td><td>(\d+)<\/td>/,
  /<td>HP:<\/td><td>(\d+)<\/td>/
];

export var lastActivityRE =
  /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;

export var itemRE = /item_id=(\d+)&inv_id=(\d+)/;
export var defenderMultiplier = 0.2;

export var def_joinallgroupsundersize = 'joinallgroupsundersize';

export var indexPhp = 'index.php';
export var def_cmd = '?cmd=';
export var cmdUrl = indexPhp + def_cmd;
export var def_subcmd = '&subcmd=';
var def_targetUsername = '&target_username=';
var notepadBlank = def_cmd + 'notepad&blank=1' + def_subcmd;
export var newGuildLogLoc = notepadBlank + 'newguildlog';
export var newGuildLogUrl = indexPhp + newGuildLogLoc;
export var auctionhouseUrl = cmdUrl + 'auctionhouse';
export var ahSearchUrl = auctionhouseUrl + '&search=';
export var logUrl = cmdUrl + 'log';
export var doAddIgnore = logUrl + def_subcmd + 'doaddignore&ignore_username=';
export var profileUrl = cmdUrl + 'profile';
export var playerIdUrl = profileUrl + '&player_id=';
export var dropItemsUrl = profileUrl + def_subcmd + 'dropitems';
export var tradeUrl = cmdUrl + 'trade&target_player=';
export var secureUrl = cmdUrl + 'trade' + def_subcmd + 'createsecure' +
  def_targetUsername;
export var arenaUrl = cmdUrl + 'arena' + def_subcmd;
export var notepadBlankUrl = indexPhp + notepadBlank;
export var auctionSearchUrl = notepadBlankUrl + 'auctionsearch';
export var pointsUrl = cmdUrl + 'points';
export var guildSubcmdUrl = cmdUrl + 'guild' + def_subcmd;
export var guildLogUrl = guildSubcmdUrl + 'log';
export var scouttowerUrl = guildSubcmdUrl + 'scouttower';
export var groupsSubcmdUrl = guildSubcmdUrl + 'groups&subcmd2=';
export var recallUserUrl = guildSubcmdUrl + 'inventory&subcmd2=report&user=';
export var guildViewUrl = guildSubcmdUrl + 'view&guild_id=';
export var joinallUrl = groupsSubcmdUrl + 'joinall';
export var joinUnderUrl = groupsSubcmdUrl + def_joinallgroupsundersize;
export var worldUrl = cmdUrl + 'world';
export var searchPlayerUrl = cmdUrl + 'findplayer';
export var showPlayerUrl = searchPlayerUrl +
  '&search_show_first=1&search_username=';
export var blacksmithUrl = cmdUrl + 'blacksmith';
export var quickbuffUrl = cmdUrl + 'quickbuff';
export var composingUrl = cmdUrl + 'composing';
export var attackplayerUrl = cmdUrl + 'attackplayer' + def_targetUsername;
export var updateArchiveUrl = cmdUrl + def_subcmd + 'viewupdatearchive';
export var archiveUrl = cmdUrl + def_subcmd + 'viewarchive';
export var bountyUrl = cmdUrl + 'bounty';

export var guideUrl = 'https://guide.fallensword.com/' + cmdUrl;

export var def_afterUpdateActionlist = 'after-update.actionlist';
export var def_playerBuffs = 'buffs.player';
export var def_playerUpdate = 'update.player';
export var def_playerLevel = 'level.stats-player';
export var def_playerGold = 'gold.stats-player';
export var def_shopPrompt = 'prompt.worldDialogShop';
export var def_controlsKeydown = 'keydown.controls';
export var def_realmUpdate = 'update.realm';

export var def_suffixSuccessActionResponse = '-success.action-response';
export var def_refreshActionList = '-1' + def_suffixSuccessActionResponse;
export var def_viewCreature = '1' + def_suffixSuccessActionResponse;
export var def_PvE = '2' + def_suffixSuccessActionResponse;
export var def_relicView = '9' + def_suffixSuccessActionResponse;
export var def_stairway = '5' + def_suffixSuccessActionResponse;
export var def_teleport = '25' + def_suffixSuccessActionResponse;

export var def_creatureCombat = 2;
export var def_repairAll = 15;

export var def_fetch_playerStats = 1;
export var def_fetch_playerBackpackCount = 2;
export var def_fetch_playerBackpackItems = 4;
export var def_fetch_playerPrefs = 8;

export var def_fetch_playerBuffs = 16;
export var def_fetch_worldDefines = 32;
export var def_fetch_worldRealmStatic = 64;
export var def_fetch_worldRealmDynamic = 128;

export var def_fetch_worldRealmActions = 256;
export var def_fetch_playerEquipment = 512;
export var def_fetch_playerNotifications = 1024;

export var def_needToCompose = 'needToCompose';
export var def_lastComposeCheck = 'lastComposeCheck';
export var def_characterVirtualLevel = 'characterVirtualLevel';
export var def_enableGuildActivityTracker = 'enableGuildActivityTracker';

export var def_table = 'table';

export var fshBuffLog = 'fsh_buffLog';

export var def_statbarLevel = 'statbar-level-tooltip-general';
export var def_statLevel = 'stat-level';
export var def_statDefense = 'stat-defense';
export var def_statAttack = 'stat-attack';
export var def_statDamage = 'stat-damage';
export var def_statArmor = 'stat-armor';
export var def_statHp = 'stat-hp';
export var def_statVl = 'stat-vl';

export var GMSTORAGE_PATH = 'GM_';

export const composingFragmentType = [
  'Common', 'Rare', 'Unique', 'Legendary', 'Super Elite', 'Crystalline'];
