export const rarity = [
  {colour: '#ffffff', clas: 'fshCommon'},
  {colour: '#0099ff', clas: 'fshRare'},
  {colour: '#cc00ff', clas: 'fshUnique'},
  {colour: '#ffff33', clas: 'fshLegendary'},
  {colour: '#cc0033', clas: 'fshSuper'},
  {colour: '#6633ff', clas: 'fshCrystal'},
  {colour: '#009900', clas: 'fshEpic'}
];

export const places = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth',
  'fourteenth'];

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'];

export const mercRE = [
  /<td>Attack:<\/td><td>(\d+)<\/td>/,
  /<td>Defense:<\/td><td>(\d+)<\/td>/,
  /<td>Armor:<\/td><td>(\d+)<\/td>/,
  /<td>Damage:<\/td><td>(\d+)<\/td>/,
  /<td>HP:<\/td><td>(\d+)<\/td>/
];

export const lastActivityRE =
  /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;
export const playerIDRE = /player_id=(\d+)/;
export const itemRE = /item_id=(\d+)&inv_id=(\d+)/;
export const defenderMultiplier = 0.2;

export const def_joinallgroupsundersize = 'joinallgroupsundersize';

export const indexPhp = 'index.php';
export const def_cmd = '?cmd=';
export const cmdUrl = indexPhp + def_cmd;
export const def_subcmd = '&subcmd=';
const def_targetUsername = '&target_username=';
const notepadBlank = def_cmd + 'notepad&blank=1' + def_subcmd;
export const newGuildLogLoc = notepadBlank + 'newguildlog';
export const newGuildLogUrl = indexPhp + newGuildLogLoc;
export const auctionhouseUrl = cmdUrl + 'auctionhouse';
export const ahSearchUrl = auctionhouseUrl + '&search=';
export const logUrl = cmdUrl + 'log';
export const doAddIgnore = logUrl + def_subcmd + 'doaddignore&ignore_username=';
export const profileUrl = cmdUrl + 'profile';
export const playerIdUrl = profileUrl + '&player_id=';
export const dropItemsUrl = profileUrl + def_subcmd + 'dropitems';
export const tradeUrl = cmdUrl + 'trade&target_player=';
export const secureUrl = cmdUrl + 'trade' + def_subcmd + 'createsecure' +
  def_targetUsername;
export const arenaUrl = cmdUrl + 'arena' + def_subcmd;
export const notepadBlankUrl = indexPhp + notepadBlank;
export const auctionSearchUrl = notepadBlankUrl + 'auctionsearch';
export const pointsUrl = cmdUrl + 'points';
export const guildSubcmdUrl = cmdUrl + 'guild' + def_subcmd;
export const guildLogUrl = guildSubcmdUrl + 'log';
export const scouttowerUrl = guildSubcmdUrl + 'scouttower';
export const groupsSubcmdUrl = guildSubcmdUrl + 'groups&subcmd2=';
export const recallUserUrl = guildSubcmdUrl + 'inventory&subcmd2=report&user=';
export const guildViewUrl = guildSubcmdUrl + 'view&guild_id=';
export const joinallUrl = groupsSubcmdUrl + 'joinall';
export const joinUnderUrl = groupsSubcmdUrl + def_joinallgroupsundersize;
export const worldUrl = cmdUrl + 'world';
export const searchPlayerUrl = cmdUrl + 'findplayer';
export const showPlayerUrl = searchPlayerUrl +
  '&search_show_first=1&search_username=';
export const blacksmithUrl = cmdUrl + 'blacksmith';
export const quickbuffUrl = cmdUrl + 'quickbuff';
export const composingUrl = cmdUrl + 'composing';
export const attackplayerUrl = cmdUrl + 'attackplayer' + def_targetUsername;
export const updateArchiveUrl = cmdUrl + def_subcmd + 'viewupdatearchive';
export const archiveUrl = cmdUrl + def_subcmd + 'viewarchive';
export const bountyUrl = cmdUrl + 'bounty';

export const guideUrl = 'https://guide.fallensword.com/' + cmdUrl;

export const def_afterUpdateActionlist = 'after-update.actionlist';
export const def_playerBuffs = 'buffs.player';
export const def_playerUpdate = 'update.player';
export const def_playerLevel = 'level.stats-player';
export const def_playerGold = 'gold.stats-player';
export const def_shopPrompt = 'prompt.worldDialogShop';
export const def_controlsKeydown = 'keydown.controls';
export const def_realmUpdate = 'update.realm';

export const def_suffixSuccessActionResponse = '-success.action-response';
export const def_refreshActionList = '-1' + def_suffixSuccessActionResponse;
export const def_viewCreature = '1' + def_suffixSuccessActionResponse;
export const def_PvE = '2' + def_suffixSuccessActionResponse;
export const def_relicView = '9' + def_suffixSuccessActionResponse;
export const def_stairway = '5' + def_suffixSuccessActionResponse;
export const def_teleport = '25' + def_suffixSuccessActionResponse;

export const def_creatureCombat = 2;
export const def_repairAll = 15;

export const def_fetch_playerStats = 1;
export const def_fetch_playerBackpackCount = 2;
export const def_fetch_playerBackpackItems = 4;
export const def_fetch_playerPrefs = 8;

export const def_fetch_playerBuffs = 16;
export const def_fetch_worldDefines = 32;
export const def_fetch_worldRealmStatic = 64;
export const def_fetch_worldRealmDynamic = 128;

export const def_fetch_worldRealmActions = 256;
export const def_fetch_playerEquipment = 512;
export const def_fetch_playerNotifications = 1024;

export const def_needToCompose = 'needToCompose';
export const def_lastComposeCheck = 'lastComposeCheck';
export const def_characterVirtualLevel = 'characterVirtualLevel';
export const def_enableGuildActivityTracker = 'enableGuildActivityTracker';

export const def_table = 'table';

export const fshBuffLog = 'fsh_buffLog';

export const def_statbarLevel = 'statbar-level-tooltip-general';
export const def_statLevel = 'stat-level';
export const def_statDefense = 'stat-defense';
export const def_statAttack = 'stat-attack';
export const def_statDamage = 'stat-damage';
export const def_statArmor = 'stat-armor';
export const def_statHp = 'stat-hp';
export const def_statVl = 'stat-vl';

export const GMSTORAGE_PATH = 'GM_';

export const composingFragmentType = [
  'Common', 'Rare', 'Unique', 'Legendary', 'Super Elite', 'Crystalline'];

export const attribType = ['Attack', 'Defense', 'Armor', 'HP', 'Damage',
  'Stamina', 'Stamina Gain', 'Gold Gain', 'XP Gain'];

export const enhancementType = ['Piercing Strike', 'Reinforced Armor',
  'Thievery', 'Critical Hit', 'Holy', 'Breaker', 'Nullify', 'Banishment',
  'Protection', 'Oceanic', 'Master Thief', 'Protect Gold', 'Dodge', 'Disarm',
  'Master Blacksmith', 'Elite Hunter', 'Sustain', 'Master Crafter',
  'Fury Caster', 'Greenskin Slayer', 'Beast Slayer', 'Duelist', 'Glory Seeker',
  'First Strike', 'Hypnotize', 'Master Inventor', 'Soulless', 'Temporal Shift'
];
