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
export var now = Date.now();
export var nowSecs = Math.floor(now / 1000);
export var newGuildLogLoc = '?cmd=notepad&blank=1&subcmd=newguildlog';
export var newGuildLogUrl = 'index.php' + newGuildLogLoc;
export var beginFolderSpanElement =
  '<span class="fshLink fshNoWrap fshFolder fshVMid" data-folder="';
export var guideUrl = 'https://guide.fallensword.com/index.php?&cmd=';

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

export var def_table = 'table';

export var fshBuffLog = 'fsh_buffLog';
