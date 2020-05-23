var undefined$1 = undefined;

var undefined$2 = undefined;

var undefined$3 = undefined;

var undefined$4 = undefined;

var undefined$5 = undefined;

function fallback(a, b) {
  return a || b;
}

const isArray = (e) => Array.isArray(e);

function isFunction(e) { return typeof e === 'function'; }

function isUndefined(e) { return typeof e === 'undefined'; }

function on(target, type, listener, options) {
  if (target instanceof EventTarget) {
    target.addEventListener(type, listener, options);
  }
}

function parseStack(e) {
  const concatStack = e.stack.replace(/\n +/g, '|');
  if (e.stack.includes(e.message)) {
    return concatStack;
  }
  return `${e.message}|${concatStack}`;
}

function isError(e) {
  if (e.stack) { return parseStack(e); }
  if (e.message) { return e.message; }
  return String(e);
}

function parseError(e) {
  if (e instanceof Error) { return isError(e); }
  return String(e);
}

var calf = {};

function getElementById(id, doc) {
  if (doc) { return doc.getElementById(id); }
  return document.getElementById(id);
}

function insertHtml(parent, where, html) {
  if (parent instanceof Element) {
    parent.insertAdjacentHTML(where, html);
  }
}

function insertHtmlBeforeEnd(parent, html) {
  insertHtml(parent, 'beforeend', html);
}

const timers = {};
let footWrap;

function getFootWrap() {
  if (!footWrap) { footWrap = getElementById('foot-wrap'); }
  return footWrap;
}

function log(text, value) {
  if (getFootWrap()) {
    insertHtmlBeforeEnd(footWrap,
      `<br>${text}: ${value} (${typeof value})`);
  }
}

function time(name) {
  if (name) { timers[name] = performance.now() * 1000; }
}

function timeEnd(name) {
  if (timers[name]) {
    log(name, `${Math.round(performance.now() * 1000
      - timers[name]) / 1000}ms`);
    delete timers[name];
  }
}

function getText(node) {
  if (node instanceof Node) {
    return node.textContent;
  }
}

let thePlayerId;

function playerId() {
  if (!thePlayerId) {
    thePlayerId = Number(
      getText(getElementById('holdtext'))
        .match(/fallensword.com\/\?ref=(\d+)/)[1],
    );
  }
  return thePlayerId;
}

const times = {};
const refAry = ['pagereboot.com', 'refreshthing.com', 'refreshthis.com',
  'lazywebtools.co.uk'];
const urlPatch = [
  [/&m=.*/],
  [/&subcmd=&.*/],
  [/&subcmd2=&.*/],
  [/&[a-z_]+_id=.+/],
  [/&id=.+/],
  [/&target_player=.+/],
  [/&[a-z]+_username=.+/],
  [/\?cmd=auctionhouse.+/, '?cmd=auctionhouse'],
  [/&subcmd=[0-9a-f]{32}/],
  [/&search_active=.+/],
  [/&letter=.+/],
  [/&guild_name=.+/],
  [/&user=.+/],
  [/&[a-z_]*page=.+/],
  [/&prestige=.+/],
  [/&withdraw_amount=.+/],
  [/&amount=.+/],
  [/&tickets=.+/],
  [/&search=.+/],
  [/&target=.+/],
  [/&xcv=[0-9a-f]{32}/],
  [/\?ref=[0-9]+/],
];

function isAuto() {
  let docRef = document.referrer
    .match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  if (docRef) { [, docRef] = docRef; }
  return refAry.includes(docRef);
}

function noGa() {
  return isAuto() || isUndefined(window.ga);
}

function start(category, variable, label) {
  if (noGa()) { return; }
  times[`${category}:${variable}:${label}`] = performance.now() * 1000;
}

function sendTiming(category, variable, label) {
  const myTime = Math.round(performance.now() * 1000
    - times[`${category}:${variable}:${label}`]) / 1000;
  if (myTime > 10) {
    ga('fshApp.send', 'timing', category, variable, Math.round(myTime),
      label);
  }
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    log(variable, `${myTime}ms`);
  }
}

function end(category, variable, label) {
  if (noGa()) { return; }
  sendTiming(category, variable, label);
}

function stripExtra(acc, curr) {
  return acc.replace(curr[0], curr[1] || '');
}

function fixupUrl() {
  const origPath = window.location.pathname + window.location.search;
  const page = urlPatch.reduce(stripExtra, origPath);
  ga('fsh.set', 'page', page);
}

function setup() {
  if (noGa()) { return; }

  ga('create', 'UA-76488113-1', 'auto', 'fshApp', {
    userId: playerId(),
    siteSpeedSampleRate: 10,
  });
  ga('fshApp.set', 'appName', 'fshApp');
  ga('fshApp.set', 'appVersion', `${calf.fshVer}(${calf.calfVer})`);
  ga('create', 'UA-76488113-2', 'auto', 'fsh', {
    userId: playerId(),
    siteSpeedSampleRate: 10,
  });
  fixupUrl();
  ga('fsh.send', 'pageview');
}

function screenview(funcName) {
  if (noGa()) { return; }
  ga('fshApp.send', 'screenview', { screenName: funcName });
}

function sendEvent(eventCategory, eventAction, eventLabel) {
  if (noGa()) { return; }
  ga('fshApp.send', 'event', eventCategory, eventAction, eventLabel);
}

function sendException(desc, fatal) {
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  sendException
    // eslint-disable-next-line no-console
    console.log('sendException', desc);
  }
  if (noGa()) { return; }
  ga('fshApp.send', 'exception', {
    exDescription: desc,
    exFatal: fatal,
  });
}

/*
Based on
fiddle.jshell.net/GRIFFnDOOR/r7tvg/
*/

const heap = [null];

function cmp(i, j) {
  return heap[i] && heap[i].priority < heap[j].priority;
}

function swp(i, j) {
  const temp = heap[i];
  heap[i] = heap[j];
  heap[j] = temp;
}

function calcChildIndex(leftHigher, i) {
  if (leftHigher) { return i * 2; }
  return i * 2 + 1;
}

function sink(j) {
  let i = j;
  while (i * 2 < heap.length) {
    const leftHigher = !cmp(i * 2 + 1, i * 2);
    const childIndex = calcChildIndex(leftHigher, i);
    if (cmp(i, childIndex)) { break; }
    swp(i, childIndex);
    i = childIndex;
  }
}

function bubble(j) {
  let i = j;
  while (i > 1) {
    // eslint-disable-next-line no-bitwise
    const parentIndex = i >> 1;
    if (!cmp(i, parentIndex)) { break; }
    swp(i, parentIndex);
    i = parentIndex;
  }
}

function pop() {
  if (heap.length === 1) { return; }
  const topVal = heap[1].data;
  const last = heap.pop();
  if (heap.length > 1) {
    heap[1] = last;
    sink(1);
  }
  return topVal;
}

function push(data, priority) {
  bubble(heap.push({ data, priority }) - 1);
}

function getLength() {
  return heap.length - 1;
}

let paused = true;
const message = 'fshMessage';
let messageHandler;

function taskRunner() {
  if (getLength() === 0) {
    paused = true;
  } else {
    paused = false;
    window.postMessage(message, '*');
  }
}

function popError(fn) {
  if (!isUndefined(fn)) {
    sendException(`pop() was not a function (${typeof fn})`, false);
  }
}

function testPop() {
  const testFn = pop();
  if (isFunction(testFn)) {
    testFn();
  } else { popError(testFn); }
}

function asyncTask() {
  try {
    testPop();
  } catch (e) {
    sendException(parseError(e), false);
  } finally {
    taskRunner();
  }
}

function callback(event) {
  const key = event.data;
  if (typeof key === 'string' && key.indexOf(message) === 0) {
    asyncTask();
  }
}

function initMessageHandler() {
  if (!messageHandler) {
    on(window, 'message', callback);
    messageHandler = true;
  }
}

function devLog(args) {
  if (args && !isArray(args)) {
    // eslint-disable-next-line no-console
    console.log('addTask isArray(args)', isArray(args));
  }
}

function add(priority, fn, args, scope) {
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  Not sending args as Array
    devLog(args);
  }
  if (isFunction(fn)) {
    initMessageHandler();
    const scopeGuard = fallback(scope, window);
    const argsGuard = fallback(args, []);
    push(fn.bind(scopeGuard, ...argsGuard), priority);
    if (paused) { taskRunner(); }
  }
}

function off(target, type, listener, options) {
  if (target instanceof EventTarget) {
    target.removeEventListener(type, listener, options);
  }
}

function isBoolean(e) { return typeof e === 'boolean'; }

function listenerOptions(options) {
  if (isBoolean(options)) {
    return { capture: options };
  }
  return options;
}

function once(target, type, listener, addOptions) {
  on(target, type, listener, { once: true, ...listenerOptions(addOptions) });
}

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

let dragTarget;
let mouseX;
let mouseY;
let offsetX;
let offsetY;
let timer;

function setDragTarget(parent, event) {
  if (parent) {
    dragTarget = parent;
  } else {
    dragTarget = event.target;
  }
}

function setMouseCoord(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function getTransformXY(trans) {
  if (trans === 'none') { return [0, 0]; }
  const matrix = trans.match(/(\d+), (\d+), (\d+), (\d+), (-?\d+), (-?\d+)/);
  return [Number(matrix[5]), Number(matrix[6])];
}

function setOffsets() {
  const style = window.getComputedStyle(dragTarget, null);
  const transformXY = getTransformXY(style.transform);
  offsetX = transformXY[0] - mouseX;
  offsetY = transformXY[1] - mouseY;
}

function drawElement(event) {
  if (event.clientX !== mouseX || event.clientY !== mouseY) {
    dragTarget.style.transform = `matrix(1, 0, 0, 1, ${(event.clientX + offsetX).toString()
    }, ${(event.clientY + offsetY).toString()})`;
    setMouseCoord(event);
  }
}

function checkInterval(event) {
  const now = performance.now();
  if (now - timer > 16) {
    drawElement(event);
    timer = now;
  }
}

function dragOver(event) {
  checkInterval(event);
  event.preventDefault();
  return false;
}

function dragDrop(event) {
  drawElement(event);
  off(document.body, 'dragover', dragOver);
  event.preventDefault();
  return false;
}

function setDragImage(event) {
  const img = new Image();
  img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  event.dataTransfer.setDragImage(img, 0, 0);
}

function dragStart(parent, event) {
  setDragTarget(parent, event);
  setDragImage(event);
  setMouseCoord(event);
  setOffsets();
  timer = 0;
  event.dataTransfer.setData('text/plain', '');
  on(document.body, 'dragover', dragOver);
  once(document.body, 'drop', dragDrop);
}

function draggable(element, parent) {
  // eslint-disable-next-line no-param-reassign
  element.draggable = true;
  on(element, 'dragstart', partial(dragStart, parent));
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const server = `${document.location.protocol}//${
  document.location.host}/`;
const cdn = window.HCS && window.HCS.defines && window.HCS.defines.cdn;

const rarity = [
  { colour: '#ffffff', clas: 'fshCommon' },
  { colour: '#0099ff', clas: 'fshRare' },
  { colour: '#cc00ff', clas: 'fshUnique' },
  { colour: '#ffff33', clas: 'fshLegendary' },
  { colour: '#cc0033', clas: 'fshSuper' },
  { colour: '#6633ff', clas: 'fshCrystal' },
  { colour: '#009900', clas: 'fshEpic' },
];

const places = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth',
  'fourteenth'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'];

const mercRE = [
  /<td>Attack:<\/td><td>(\d+)<\/td>/,
  /<td>Defense:<\/td><td>(\d+)<\/td>/,
  /<td>Armor:<\/td><td>(\d+)<\/td>/,
  /<td>Damage:<\/td><td>(\d+)<\/td>/,
  /<td>HP:<\/td><td>(\d+)<\/td>/,
];

const lastActivityRE = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;
const playerIDRE = /player_id=(\d+)/;
const itemRE = /item_id=(\d+)&inv_id=(\d+)/;
const defenderMultiplier = 0.2;

const defJoinallgroupsundersize = 'joinallgroupsundersize';

const indexPhp = 'index.php';
const defCmd = '?cmd=';
const cmdUrl = indexPhp + defCmd;
const defSubcmd = '&subcmd=';
const defTargetUsername = '&target_username=';
const notepadBlank = `${defCmd}notepad&blank=1${defSubcmd}`;
const newGuildLogLoc = `${notepadBlank}newguildlog`;
const newGuildLogUrl = indexPhp + newGuildLogLoc;
const auctionhouseUrl = `${cmdUrl}auctionhouse`;
const ahSearchUrl = `${auctionhouseUrl}&search=`;
const logUrl = `${cmdUrl}log`;
const doAddIgnore = `${logUrl + defSubcmd}doaddignore&ignore_username=`;
const profileUrl = `${cmdUrl}profile`;
const playerIdUrl = `${profileUrl}&player_id=`;
const dropItemsUrl = `${profileUrl + defSubcmd}dropitems`;
const tradeUrl = `${cmdUrl}trade&target_player=`;
const secureUrl = `${cmdUrl}trade${defSubcmd}createsecure${
  defTargetUsername}`;
const arenaUrl = `${cmdUrl}arena${defSubcmd}`;
const notepadBlankUrl = indexPhp + notepadBlank;
const auctionSearchUrl = `${notepadBlankUrl}auctionsearch`;
const pointsUrl = `${cmdUrl}points`;
const guildSubcmdUrl = `${cmdUrl}guild${defSubcmd}`;
const guildLogUrl = `${guildSubcmdUrl}log`;
const scouttowerUrl = `${guildSubcmdUrl}scouttower`;
const groupsSubcmdUrl = `${guildSubcmdUrl}groups&subcmd2=`;
const recallUserUrl = `${guildSubcmdUrl}inventory&subcmd2=report&user=`;
const guildViewUrl = `${guildSubcmdUrl}view&guild_id=`;
const joinallUrl = `${groupsSubcmdUrl}joinall`;
const joinUnderUrl = groupsSubcmdUrl + defJoinallgroupsundersize;
const worldUrl = `${cmdUrl}world`;
const searchPlayerUrl = `${cmdUrl}findplayer`;
const showPlayerUrl = `${searchPlayerUrl
}&search_show_first=1&search_username=`;
const blacksmithUrl = `${cmdUrl}blacksmith`;
const quickbuffUrl = `${cmdUrl}quickbuff`;
const composingUrl = `${cmdUrl}composing`;
const attackplayerUrl = `${cmdUrl}attackplayer${defTargetUsername}`;
const updateArchiveUrl = `${cmdUrl + defSubcmd}viewupdatearchive`;
const archiveUrl = `${cmdUrl + defSubcmd}viewarchive`;
const bountyUrl = `${cmdUrl}bounty`;

const guideUrl = `https://guide.fallensword.com/${cmdUrl}`;

const defAfterUpdateActionlist = 'after-update.actionlist';
const defPlayerBuffs = 'buffs.player';
const defPlayerUpdate = 'update.player';
const defPlayerLevel = 'level.stats-player';
const defPlayerGold = 'gold.stats-player';
const defShopPrompt = 'prompt.worldDialogShop';
const defControlsKeydown = 'keydown.controls';
const defRealmUpdate = 'update.realm';

const defSuffixSuccessActionResponse = '-success.action-response';
const defRefreshActionList = `-1${defSuffixSuccessActionResponse}`;
const defViewCreature = `1${defSuffixSuccessActionResponse}`;
const defPvE = `2${defSuffixSuccessActionResponse}`;
const defRelicView = `9${defSuffixSuccessActionResponse}`;
const defStairway = `5${defSuffixSuccessActionResponse}`;
const defTeleport = `25${defSuffixSuccessActionResponse}`;

const defCreatureCombat = 2;
const defRepairAll = 15;

const defFetchPlayerStats = 1;
const defFetchPlayerBackpackCount = 2;
const defFetchPlayerBackpackItems = 4;
const defFetchPlayerPrefs = 8;

const defFetchPlayerBuffs = 16;
const defFetchWorldDefines = 32;
const defFetchWorldRealmStatic = 64;
const defFetchWorldRealmDynamic = 128;

const defFetchWorldRealmActions = 256;
const defFetchPlayerEquipment = 512;
const defFetchPlayerNotifications = 1024;

const defNeedToCompose = 'needToCompose';
const defLastComposeCheck = 'lastComposeCheck';
const defCharacterVirtualLevel = 'characterVirtualLevel';
const defEnableGuildActivityTracker = 'enableGuildActivityTracker';

const defTable = 'table';

const fshBuffLog = 'fsh_buffLog';

const defStatbarLevel = 'statbar-level-tooltip-general';
const defStatLevel = 'stat-level';
const defStatDefense = 'stat-defense';
const defStatAttack = 'stat-attack';
const defStatDamage = 'stat-damage';
const defStatArmor = 'stat-armor';
const defStatHp = 'stat-hp';
const defStatVl = 'stat-vl';

const GMSTORAGE_PATH = 'GM_';

const composingFragmentType = [
  'Common', 'Rare', 'Unique', 'Legendary', 'Super Elite', 'Crystalline'];

const attribType = ['Attack', 'Defense', 'Armor', 'HP', 'Damage',
  'Stamina', 'Stamina Gain', 'Gold Gain', 'XP Gain'];

const enhancementType = ['Piercing Strike', 'Reinforced Armor',
  'Thievery', 'Critical Hit', 'Holy', 'Breaker', 'Nullify', 'Banishment',
  'Protection', 'Oceanic', 'Master Thief', 'Protect Gold', 'Dodge', 'Disarm',
  'Master Blacksmith', 'Elite Hunter', 'Sustain', 'Master Crafter',
  'Fury Caster', 'Greenskin Slayer', 'Beast Slayer', 'Duelist', 'Glory Seeker',
  'First Strike', 'Hypnotize', 'Master Inventor', 'Soulless', 'Temporal Shift',
];

const itemType = ['Helmet', 'Armor', 'Gloves', 'Boots', 'Weapon',
  'Shield', 'Ring', 'Amulet', 'Rune', 'Quest Item', 'Potion', 'Component',
  'Resource', 'Recipe', 'Container', 'Composed', 'Frag Stash'];

const oldActionSpinner = `${cdn}ui/world/action_spinner.gif`;

var lastScavPage="";var lastActiveQuestPage="";var lastNormalActiveQuestPage="";var lastNormalCompletedQuestPage="";var lastNormalNotStartedQuestPage="";var lastSeasonalActiveQuestPage="";var lastSeasonalCompletedQuestPage="";var lastSeasonalNotStartedQuestPage="";var enableLogColoring=false;var enableChatParsing=false;var enableCreatureColoring=false;var showCombatLog=false;var showCreatureInfo=false;var keepLogs=false;var showExtraLinks=false;var huntingBuffs="Doubler,Librarian,Adept Learner,Merchant,Treasure Hunter,Animal Magnetism,Conserve";var huntingBuffsName="default";var huntingBuffs2="Deflect";var huntingBuffs2Name="PvP";var huntingBuffs3="Super Elite Slayer";var huntingBuffs3Name="SE";var showHuntingBuffs=false;var moveFSBox=false;var moveDailyQuest=false;var guildSelf="";var guildSelfMessage="Member of your own guild!";var guildFrnd="";var guildFrndMessage="Do not attack - Guild is friendly!";var guildPast="";var guildPastMessage="Do not attack - You've been in that guild once!";var guildEnmy="";var guildEnmyMessage="Enemy guild. Attack at will!";var goldRecipient="";var goldAmount="";var sendGoldonWorld=false;var hideQuests=false;var hideQuestNames="";var hideRecipes=false;var hideRecipeNames="";var enableGuildInfoWidgets=false;var enableOnlineAlliesWidgets=false;var guildOnlineRefreshTime=300;var hideGuildInfoSecureTrade=false;var hideGuildInfoTrade=false;var hideGuildInfoMessage=false;var hideGuildInfoBuff=false;var buyBuffsGreeting="Hello {playername}, can I buy {buffs} for {cost} please?";var renderSelfBio=false;var bioEditLines=10;var renderOtherBios=false;var playNewMessageSound=false;var showSpeakerOnWorld=false;var defaultMessageSound="https://fallenswordhelper.github.io/fallenswordhelper/audio/sms-alert-2-daniel_simon.wav";var highlightPlayersNearMyLvl=false;var highlightGvGPlayersNearMyLvl=false;var detailedConflictInfo=false;var gameHelpLink=true;var navigateToLogAfterMsg=false;var enableAllyOnlineList=false;var enableEnemyOnlineList=false;var allyEnemyOnlineRefreshTime=300;var moveGuildList=false;var moveOnlineAlliesList=false;var hideMatchesForCompletedMoves=false;var doNotKillList="";var enableBioCompressor=false;var currentGoldSentTotal=0;var keepBuffLog=false;var buffLog="";var enableActiveBountyList=false;var bountyListRefreshTime=300;var enableWantedList=false;var wantedNames="";var wantedGuildMembers=false;var bwNeedsRefresh=true;var fsboxlog=false;var fsboxcontent="";var itemRecipient="";var quickLinks="[]";var enableAttackHelper=false;var minGroupLevel=1;var combatEvaluatorBias=0;var huntingMode=false;var enabledHuntingMode="1";var hideRelicOffline=false;var enterForSendMessage=false;var trackKillStreak=false;var storeLastQuestPage=false;var addAttackLinkToLog=false;var showStatBonusTotal=false;var newGuildLogHistoryPages=3;var useNewGuildLog=false;var enhanceChatTextEntry=false;var ajaxifyRankControls=false;var enableMaxGroupSizeToJoin=false;var maxGroupSizeToJoin=11;var enableTempleAlert=false;var enableUpgradeAlert=false;var enableComposingAlert=false;var autoFillMinBidPrice=false;var showPvPSummaryInLog=false;var enableQuickDrink=false;var enhanceOnlineDots=false;var hideBuffSelected=false;var hideHelperMenu=false;var keepHelperMenuOnScreen=true;var draggableHelperMenu=false;var quickLinksTopPx=22;var quickLinksLeftPx=0;var draggableQuickLinks=false;var showNextQuestSteps=true;var showRecallMessages=true;var showRelicMessages=true;var showMercenaryMessages=true;var showGroupCombatMessages=true;var showDonationMessages=true;var showRankingMessages=true;var showGvGMessages=true;var showTaggingMessages=true;var showTitanMessages=true;var showQuickDropLinks=false;var onlinePlayerMinLvl=1;var onlinePlayerMaxLvl=9999;var arenaMinLvl=1;var arenaMaxLvl=9999;var showMonsterLog=false;var lastTempleCheck=0;var needToPray=false;var lastChatCheck="0";var lastGuildLogCheck="0";var lastOutBoxCheck="0";var lastPlayerLogCheck="0";var showAdmin=false;var alliestotal=0;var enemiestotal=0;var footprints=false;var hideNonPlayerGuildLogMessages=false;var listOfAllies="";var listOfEnemies="";var contactList="";var lastUpgradeCheck=0;var needToDoUpgrade=false;var characterVirtualLevel=0;var guildLogoControl=false;var statisticsControl=false;var guildStructureControl=false;var lastMembrListCheck=0;var disableItemColoring=true;var showQuickSendLinks=false;var needToCompose=false;var lastComposeCheck=0;var lastOnlineCheck=0;var bountyList="";var wantedList="";var lowestLevelInTop250=0;var quickMsg="[\"Thank you very much ^_^\",\"Happy hunting, {playername}\"]";var sendClasses="[\"Composed Pots\", \"13699\"], [\"Amber\", \"5611\"], [\"Amethyst Weed\", \"9145\"], [\"Blood Bloom\", \"5563\"], [\"Cerulean Rose\", \"9156\"], [\"Coleoptera Body\", \"9287\"], [\"Dark Shade\", \"5564\"], [\"Deathbloom\", \"9140\"], [\"Deathly Mold\", \"9153\"], [\"Greenskin Fungus\", \"9148\"], [\"Heffle\", \"5565\"], [\"Jademare\", \"5566\"], [\"Ruby Thistle\", \"9143\"], [\"Toad Corpse\",\"9288\"], [\"Trinettle\", \"5567\"], [\"Viridian Vine\", \"9151\"], [\"Mortar & Pestle\", \"9157\"], [\"Beetle Juice\", \"9158\"]";var quickSearchList="[{\"category\":\"Plants\",\"searchname\":\"Amber\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Blood Bloom\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Jademare\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Dark Shade\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Trinettle\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Heffle Wart\",\"nickname\":\"\"},{\"category\":\"Potions\",\"searchname\":\"Sludge Brew\",\"nickname\":\"DC 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Black Death\",\"nickname\":\"DC 225\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Aid\",\"nickname\":\"Assist\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Supreme Doubling\",\"nickname\":\"DB 450\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Acceleration\",\"nickname\":\"DB 500\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Lesser Death Dealer\",\"nickname\":\"DD\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Runic Potion\",\"nickname\":\"FI 250\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of the Bookworm\",\"nickname\":\"Lib 225\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Truth\",\"nickname\":\"EW 1k\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Dull Edge\",\"nickname\":\"DE 25\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Notched Blade\",\"nickname\":\"DE 80\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Death\",\"nickname\":\"DW 125\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Decay\",\"nickname\":\"WI 150\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Fatality\",\"nickname\":\"WI 350\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Annihilation\",\"nickname\":\"DW 150\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of the Wise\",\"nickname\":\"Lib 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Shattering\",\"nickname\":\"SA\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Dragons Blood Potion\",\"nickname\":\"ZK 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Berserkers Potion\",\"nickname\":\"ZK 300\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Fury\",\"nickname\":\"ZK 350\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Supreme Luck\",\"nickname\":\"FI 1k\",\"displayOnAH\":true}]";var arenaMoves="[]";var arenaMatches="[]";var CombatLog="";var hideChampionsGroup=false;var hideElitesGroup=false;var hideSEGroup=false;var hideTitanGroup=false;var hideLegendaryGroup=false;var disableDeactivatePrompts=false;var moveComposingButtons=false;var expandMenuOnKeyPress=false;var disableBreakdownPrompts=false;var collapseNewsArchive=false;var collapseHallPosts=false;var lastmyGuildLogCheck=0;var hideSubLvlCreature=false;var hidePlayerActions=false;var extraProfile="";var textToSearchFor="";var lastLadderReset=0;var disableQuickWearPrompts=false;var enableGuildActivityTracker=false;var enableSeTracker=false;var showTitanInfo=false;var highlightPvpProtection=false;var showBuffInfo=false;var enableHistoryCompressor=false;var enableStamBars=false;var appBad=[0,false];var defaults = {lastScavPage:lastScavPage,lastActiveQuestPage:lastActiveQuestPage,lastNormalActiveQuestPage:lastNormalActiveQuestPage,lastNormalCompletedQuestPage:lastNormalCompletedQuestPage,lastNormalNotStartedQuestPage:lastNormalNotStartedQuestPage,lastSeasonalActiveQuestPage:lastSeasonalActiveQuestPage,lastSeasonalCompletedQuestPage:lastSeasonalCompletedQuestPage,lastSeasonalNotStartedQuestPage:lastSeasonalNotStartedQuestPage,enableLogColoring:enableLogColoring,enableChatParsing:enableChatParsing,enableCreatureColoring:enableCreatureColoring,showCombatLog:showCombatLog,showCreatureInfo:showCreatureInfo,keepLogs:keepLogs,showExtraLinks:showExtraLinks,huntingBuffs:huntingBuffs,huntingBuffsName:huntingBuffsName,huntingBuffs2:huntingBuffs2,huntingBuffs2Name:huntingBuffs2Name,huntingBuffs3:huntingBuffs3,huntingBuffs3Name:huntingBuffs3Name,showHuntingBuffs:showHuntingBuffs,moveFSBox:moveFSBox,moveDailyQuest:moveDailyQuest,guildSelf:guildSelf,guildSelfMessage:guildSelfMessage,guildFrnd:guildFrnd,guildFrndMessage:guildFrndMessage,guildPast:guildPast,guildPastMessage:guildPastMessage,guildEnmy:guildEnmy,guildEnmyMessage:guildEnmyMessage,goldRecipient:goldRecipient,goldAmount:goldAmount,sendGoldonWorld:sendGoldonWorld,hideQuests:hideQuests,hideQuestNames:hideQuestNames,hideRecipes:hideRecipes,hideRecipeNames:hideRecipeNames,enableGuildInfoWidgets:enableGuildInfoWidgets,enableOnlineAlliesWidgets:enableOnlineAlliesWidgets,guildOnlineRefreshTime:guildOnlineRefreshTime,hideGuildInfoSecureTrade:hideGuildInfoSecureTrade,hideGuildInfoTrade:hideGuildInfoTrade,hideGuildInfoMessage:hideGuildInfoMessage,hideGuildInfoBuff:hideGuildInfoBuff,buyBuffsGreeting:buyBuffsGreeting,renderSelfBio:renderSelfBio,bioEditLines:bioEditLines,renderOtherBios:renderOtherBios,playNewMessageSound:playNewMessageSound,showSpeakerOnWorld:showSpeakerOnWorld,defaultMessageSound:defaultMessageSound,highlightPlayersNearMyLvl:highlightPlayersNearMyLvl,highlightGvGPlayersNearMyLvl:highlightGvGPlayersNearMyLvl,detailedConflictInfo:detailedConflictInfo,gameHelpLink:gameHelpLink,navigateToLogAfterMsg:navigateToLogAfterMsg,enableAllyOnlineList:enableAllyOnlineList,enableEnemyOnlineList:enableEnemyOnlineList,allyEnemyOnlineRefreshTime:allyEnemyOnlineRefreshTime,moveGuildList:moveGuildList,moveOnlineAlliesList:moveOnlineAlliesList,hideMatchesForCompletedMoves:hideMatchesForCompletedMoves,doNotKillList:doNotKillList,enableBioCompressor:enableBioCompressor,currentGoldSentTotal:currentGoldSentTotal,keepBuffLog:keepBuffLog,buffLog:buffLog,enableActiveBountyList:enableActiveBountyList,bountyListRefreshTime:bountyListRefreshTime,enableWantedList:enableWantedList,wantedNames:wantedNames,wantedGuildMembers:wantedGuildMembers,bwNeedsRefresh:bwNeedsRefresh,fsboxlog:fsboxlog,fsboxcontent:fsboxcontent,itemRecipient:itemRecipient,quickLinks:quickLinks,enableAttackHelper:enableAttackHelper,minGroupLevel:minGroupLevel,combatEvaluatorBias:combatEvaluatorBias,huntingMode:huntingMode,enabledHuntingMode:enabledHuntingMode,hideRelicOffline:hideRelicOffline,enterForSendMessage:enterForSendMessage,trackKillStreak:trackKillStreak,storeLastQuestPage:storeLastQuestPage,addAttackLinkToLog:addAttackLinkToLog,showStatBonusTotal:showStatBonusTotal,newGuildLogHistoryPages:newGuildLogHistoryPages,useNewGuildLog:useNewGuildLog,enhanceChatTextEntry:enhanceChatTextEntry,ajaxifyRankControls:ajaxifyRankControls,enableMaxGroupSizeToJoin:enableMaxGroupSizeToJoin,maxGroupSizeToJoin:maxGroupSizeToJoin,enableTempleAlert:enableTempleAlert,enableUpgradeAlert:enableUpgradeAlert,enableComposingAlert:enableComposingAlert,autoFillMinBidPrice:autoFillMinBidPrice,showPvPSummaryInLog:showPvPSummaryInLog,enableQuickDrink:enableQuickDrink,enhanceOnlineDots:enhanceOnlineDots,hideBuffSelected:hideBuffSelected,hideHelperMenu:hideHelperMenu,keepHelperMenuOnScreen:keepHelperMenuOnScreen,draggableHelperMenu:draggableHelperMenu,quickLinksTopPx:quickLinksTopPx,quickLinksLeftPx:quickLinksLeftPx,draggableQuickLinks:draggableQuickLinks,showNextQuestSteps:showNextQuestSteps,showRecallMessages:showRecallMessages,showRelicMessages:showRelicMessages,showMercenaryMessages:showMercenaryMessages,showGroupCombatMessages:showGroupCombatMessages,showDonationMessages:showDonationMessages,showRankingMessages:showRankingMessages,showGvGMessages:showGvGMessages,showTaggingMessages:showTaggingMessages,showTitanMessages:showTitanMessages,showQuickDropLinks:showQuickDropLinks,onlinePlayerMinLvl:onlinePlayerMinLvl,onlinePlayerMaxLvl:onlinePlayerMaxLvl,arenaMinLvl:arenaMinLvl,arenaMaxLvl:arenaMaxLvl,showMonsterLog:showMonsterLog,lastTempleCheck:lastTempleCheck,needToPray:needToPray,lastChatCheck:lastChatCheck,lastGuildLogCheck:lastGuildLogCheck,lastOutBoxCheck:lastOutBoxCheck,lastPlayerLogCheck:lastPlayerLogCheck,showAdmin:showAdmin,alliestotal:alliestotal,enemiestotal:enemiestotal,footprints:footprints,hideNonPlayerGuildLogMessages:hideNonPlayerGuildLogMessages,listOfAllies:listOfAllies,listOfEnemies:listOfEnemies,contactList:contactList,lastUpgradeCheck:lastUpgradeCheck,needToDoUpgrade:needToDoUpgrade,characterVirtualLevel:characterVirtualLevel,guildLogoControl:guildLogoControl,statisticsControl:statisticsControl,guildStructureControl:guildStructureControl,lastMembrListCheck:lastMembrListCheck,disableItemColoring:disableItemColoring,showQuickSendLinks:showQuickSendLinks,needToCompose:needToCompose,lastComposeCheck:lastComposeCheck,lastOnlineCheck:lastOnlineCheck,bountyList:bountyList,wantedList:wantedList,lowestLevelInTop250:lowestLevelInTop250,quickMsg:quickMsg,sendClasses:sendClasses,quickSearchList:quickSearchList,arenaMoves:arenaMoves,arenaMatches:arenaMatches,CombatLog:CombatLog,hideChampionsGroup:hideChampionsGroup,hideElitesGroup:hideElitesGroup,hideSEGroup:hideSEGroup,hideTitanGroup:hideTitanGroup,hideLegendaryGroup:hideLegendaryGroup,disableDeactivatePrompts:disableDeactivatePrompts,moveComposingButtons:moveComposingButtons,expandMenuOnKeyPress:expandMenuOnKeyPress,disableBreakdownPrompts:disableBreakdownPrompts,collapseNewsArchive:collapseNewsArchive,collapseHallPosts:collapseHallPosts,lastmyGuildLogCheck:lastmyGuildLogCheck,hideSubLvlCreature:hideSubLvlCreature,hidePlayerActions:hidePlayerActions,extraProfile:extraProfile,textToSearchFor:textToSearchFor,lastLadderReset:lastLadderReset,disableQuickWearPrompts:disableQuickWearPrompts,enableGuildActivityTracker:enableGuildActivityTracker,enableSeTracker:enableSeTracker,showTitanInfo:showTitanInfo,highlightPvpProtection:highlightPvpProtection,showBuffInfo:showBuffInfo,enableHistoryCompressor:enableHistoryCompressor,enableStamBars:enableStamBars,appBad:appBad};

const reviver = [
  ['S]', (value) => value.substr(2)],
  ['N]', (value) => parseInt(value.substr(2), 10)],
  ['B]', (value) => value.substr(2) === 'true'],
];

function retrieve(value) {
  const test = reviver.find((el) => value.startsWith(el[0]));
  if (test) { return test[1](value); }
  return value;
}

function fshGetValue(name, defValue) {
  const value = window.localStorage.getItem(GMSTORAGE_PATH + name);
  if (value === null || isUndefined(value)) { return defValue; }
  return retrieve(value);
}

function getValue(name) {
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  No default setting available
    if (isUndefined(defaults[name])) {
      // eslint-disable-next-line no-console
      console.log('No default setting available', name, defaults[name]);
    }
  }
  return fshGetValue(name, defaults[name]);
}

function jsonParse(str, reviver) {
  try {
    return JSON.parse(str, reviver);
  } catch (e) {
    // Ignore bad json
  }
}

function reviver$1(key, value) {
  if (typeof value === 'string') {
    const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
      .exec(value);
    if (a) {
      return new Date(Date.UTC(Number(a[1]), Number(a[2]) - 1, Number(a[3]),
        Number(a[4]), Number(a[5]), Number(a[6])));
    }
  }
  return value;
}

function getValueJSON(name) {
  const resultJSON = getValue(name);
  let result;
  if (resultJSON) { result = jsonParse(resultJSON, reviver$1); }
  return result;
}

function retBool(bool, ifTrue, ifFalse) {
  if (bool) {
    return ifTrue;
  }
  return ifFalse;
}

function retOption(option, ifTrue, ifFalse) {
  return retBool(getValue(option), ifTrue, ifFalse);
}

function isDraggable(draggableQuickLinks) {
  if (draggableQuickLinks) {
    draggable(getElementById('fshQuickLinks'));
  }
}

function invalid(link) {
  return !('newWindow' in link) || !link.url || !link.name;
}

function linkHtml(link) {
  if (invalid(link)) { return ''; }
  const newWindow = retBool(link.newWindow, ' target="new"', '');
  return `<li><a href="${escapeHtml(link.url)}"${
    newWindow}>${link.name}</a></li>`;
}

function makeQuickLinks(quickLinks) {
  return quickLinks.map(linkHtml).join('');
}

function haveLinks(quickLinks) {
  const draggableQuickLinks = getValue('draggableQuickLinks');
  const html = `<div style="top:${getValue('quickLinksTopPx')}px; left:${
    getValue('quickLinksLeftPx')}px;" id="fshQuickLinks" `
    + `class="fshQuickLinks fshInnerBg${
      retOption('keepHelperMenuOnScreen', ' fshFixed', '')
    }${retBool(draggableQuickLinks, ' fshMove', '')}">${
      makeQuickLinks(quickLinks)}</div>`;
  insertHtmlBeforeEnd(document.body, html);
  isDraggable(draggableQuickLinks);
}

function haveNode() {
  const quickLinks = getValueJSON('quickLinks') || [];
  if (quickLinks.length > 0) { haveLinks(quickLinks); }
}

function injectQuickLinks() {
  const node = getElementById('statbar-container');
  if (node) { haveNode(); }
}

function doQuickLinks() {
  if (!calf.huntingMode) {
    add(3, injectQuickLinks);
  }
}

function outputParamVal(param) {
  if (isUndefined(param)) { return true; }
  return param;
}

function getCustomUrlParameter(sPageURL, sParam) {
  const sURLVariables = sPageURL.split('&');
  let sParameterName;
  for (let i = 0; i < sURLVariables.length; i += 1) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return outputParamVal(sParameterName[1]);
    }
  }
}

function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1));
  return getCustomUrlParameter(sPageURL, sParam);
}

let enabled;

function handleMsgStack(type, stuff) {
  const msg = parseError(stuff);
  if (msg.includes('calfSystem')) {
    sendException(type + msg, true);
    return true;
  }
}

function handleError(type, stuff) {
  if (stuff) {
    return handleMsgStack(type, stuff);
  }
}

function logError(e) {
  handleError('window onerror ', e.error);
}

function unhandledrejection(e) {
  if (handleError('Uncaught (in promise) ', e.reason)) {
    e.preventDefault();
  }
}

function globalErrorHandler() {
  if (!enabled) {
    on(window, 'error', logError);
    on(window, 'unhandledrejection', unhandledrejection);
    enabled = true;
  }
}

let now;
let nowSecs;

function initNow() {
  if (!now) {
    now = Date.now();
    nowSecs = Math.floor(now / 1000);
  }
}

let pCL;
let pCC;
let pCR;

function initPcc() {
  if (!pCC) {
    pCL = getElementById('pCL');
    pCC = getElementById('pCC');
    pCR = getElementById('pCR');
  }
}

const arrayFrom = (e, mapFn) => Array.from(e, mapFn);

function getElementsByTagName(tagName, element) {
  if (element) { return element.getElementsByTagName(tagName); }
  return document.getElementsByTagName(tagName);
}

function getArrayByTagName(tagName, element) {
  return arrayFrom(getElementsByTagName(tagName, element));
}

function getTextTrim(node) {
  return getText(node).trim();
}

function includesText(text, el) {
  return getTextTrim(el).includes(text);
}

function includes(text) {
  return partial(includesText, text);
}

function doMsgSound() {
  const msg = getArrayByTagName('a', pCL).filter(includes('message'));
  if (msg.length) {
    insertHtmlBeforeEnd(document.body,
      `<audio src="${getValue('defaultMessageSound')}" autoplay=true />`);
  }
}

function isMessageSound() {
  if (getValue('playNewMessageSound')) {
    add(3, doMsgSound);
  }
}

function isObject(e) { return typeof e === 'object'; }

function loadCss(c) {
  return new Promise((resolve) => {
    const linkTag = document.createElement('link');
    linkTag.type = 'text/css';
    linkTag.rel = 'stylesheet';
    linkTag.onload = () => { resolve(); };
    linkTag.href = c;
    document.body.appendChild(linkTag);
  });
}

function containsText(text, el) {
  return getTextTrim(el) === text;
}

function contains(text) {
  return partial(containsText, text);
}

function querySelectorAll(selector, scope) {
  if (scope) { return scope.querySelectorAll(selector); }
  return document.querySelectorAll(selector);
}

function querySelectorArray(selector, scope) {
  return arrayFrom(querySelectorAll(selector, scope));
}

function setInnerHtml(html, element) {
  if (element instanceof Element) {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = String(html);
  }
}

function toSettings(el) {
  setInnerHtml(`<a href="${cmdUrl}settings">Game Help</a>`, el);
}

function gameHelpLink$1() {
  querySelectorArray('#pCR h3').filter(contains('Game Help'))
    .forEach(toSettings);
}

const entries = (obj) => Object.entries(obj);

function mutate(fn, obj, arr) {
  if (isObject(arr[1]) && arr[1] !== null) {
    fn(obj[arr[0]], arr[1]);
  } else {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    obj[arr[0]] = arr[1];
  }
}

function mixin(obj, mixins) {
  entries(mixins).forEach(partial(mutate, mixin, obj));
}

function cElement(type, props) {
  const el = document.createElement(type);
  if (props) { mixin(el, props); }
  return el;
}

function createDiv(props) {
  return cElement('div', props);
}

function insertElement(parent, child) {
  if (parent instanceof Node && child instanceof Node) {
    parent.appendChild(child);
  }
  return child;
}

function jQueryDialog(fn) { // jQuery
  let content = getElementById('content');
  if (content) {
    setInnerHtml('', content);
  } else {
    content = createDiv({
      id: 'content',
      style: { display: 'none' },
    });
    insertElement(document.body, content);
  }
  $(content).dialog({
    width: 640,
    modal: true,
    position: {
      my: 'top', at: 'top', offset: '0 60', collision: 'none',
    },
    resizable: false,
  });
  fn(content);
}

function jQueryPresent() { return isFunction(window.$); }

function onclick(target, listener, options) {
  on(target, 'click', listener, options);
}

function runDefault(prm) {
  prm.then((m) => m.default());
}

const allowBack = () => { runDefault(import('./allowBack-e1d1014c.js')); };
const injectBioWidgets = () => { runDefault(import('./bioWidgets-268a8f91.js')); };
const injectGuild = () => { runDefault(import('./guild-a2523b09.js')); };
const injectProfile = () => { runDefault(import('./profile-5296534a.js')); };
const injectProfileDropItems = () => { runDefault(import('./injectProfileDropItems-15b5e788.js')); };
const injectQuestBookFull = () => { runDefault(import('./injectQuestBookFull-68bd29af.js')); };
const injectStoreItems = () => { runDefault(import('./injectStoreItems-a60918f4.js')); };
const inventing = () => { runDefault(import('./inventing-e1c2002d.js')); };
const viewArchive = () => { runDefault(import('./viewArchive-33ec915c.js')); };

const injectBuffLog = (i) => { import('./injectBuffLog-e0356b70.js').then((m) => m.default(i)); };
const injectFsBoxContent = (i) => { import('./injectFsBoxContent-03de812e.js').then((m) => m.default(i)); };
const injectMonsterLog = (i) => { import('./monstorLog-8cff5f6d.js').then((m) => m.default(i)); };
const injectNotepadShowLogs = (i) => { import('./combatLog-0880d72d.js').then((m) => m.default(i)); };
const injectOnlinePlayers = (i) => { import('./injectOnlinePlayers-cbf1f6ef.js').then((m) => m.default(i)); };
const injectRecipeManager = (i) => { import('./recipeMgr-86de69e3.js').then((m) => m.default(i)); };
const insertQuickExtract = (i) => { import('./quickExtract-521fd71f.js').then((m) => m.default(i)); };
const insertQuickWear = (i) => { import('./quickWear-f41f6c01.js').then((m) => m.default(i)); };

const injectAuctionSearch = (i) => { import('./lists-4103761a.js').then((m) => m.injectAuctionSearch(i)); };
const injectQuickLinkManager = (i) => { import('./lists-4103761a.js').then((m) => m.injectQuickLinkManager(i)); };
const injectFindBuffs = (i) => { import('./findBuffs-94f655f9.js').then((m) => m.injectFindBuffs(i)); };
const injectFindOther = (i) => { import('./findBuffs-94f655f9.js').then((m) => m.injectFindOther(i)); };

const helperMenuBlob = '<div class="column"><h3>Character</h3><ul>'
  + '<li><span class="fshLink">Buff Log</span></li>'
  + '<li><span class="fshLink">Combat Log</span></li>'
  + '<li><span class="fshLink">Creature Log</span></li>'
  + '<li><span class="fshLink">Recipe Manager</span></li>'
  + '<li><span class="fshLink">Quick Links</span></li>'
  + '</ul><h3>Actions</h3><ul>'
  + '<li><span class="fshLink">Find Buffs</span></li>'
  + '<li><span class="fshLink">Find Other</span></li>'
  + '<li><span class="fshLink">Online Players</span></li>'
  + '<li><span class="fshLink">AH Quick Search</span></li>'
  + '</ul><h3>Extra</h3><ul>'
  + '<li><span class="fshLink">Quick Extract</span></li>'
  + '<li><span class="fshLink">Quick Wear</span></li>'
  + '<li><span class="fshLink">FS Box Log</span></li>'
  + '</ul><h3>FSH developer quick links</h3><ul>'
  + '<li><span class="a-reply" target_player="PointyHair">PM</span> '
  + `<a href="${playerIdUrl}1963510">PointyHair</a></li>`
  + '</ul></div>';

function toggleMenu(evt) {
  if (evt.target.id !== 'helperMenu') { return; }
  const menu = evt.target.children[0];
  menu.classList.toggle('showMenuDiv');
}

const functionLookup = {
  'Buff Log': injectBuffLog,
  'Combat Log': injectNotepadShowLogs,
  'Creature Log': injectMonsterLog,
  'Recipe Manager': injectRecipeManager,
  'Quick Links': injectQuickLinkManager,
  'Find Buffs': injectFindBuffs,
  'Find Other': injectFindOther,
  'Online Players': injectOnlinePlayers,
  'AH Quick Search': injectAuctionSearch,
  'Quick Extract': insertQuickExtract,
  'Quick Wear': insertQuickWear,
  'FS Box Log': injectFsBoxContent,
};

function callHelperFunction(evt) {
  const functionPath = getText(evt.target);
  const fn = functionLookup[functionPath];
  if (jQueryPresent() && isFunction(fn)) {
    sendEvent('helperMenu', functionPath);
    jQueryDialog(fn);
  }
}

function eventHandler(evt) {
  if (evt.target.classList.contains('fshLink')) {
    callHelperFunction(evt);
    return;
  }
  if (evt.target.classList.contains('a-reply')) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
  }
}

function showHelperMenu(evt) {
  const helperMenu = evt.target;
  const helperMenuDiv = createDiv({
    id: 'helperMenuDiv',
    className: 'helperMenuDiv fshInnerBg',
  });
  insertHtmlBeforeEnd(helperMenuDiv, helperMenuBlob);
  insertElement(helperMenu, helperMenuDiv);
  onclick(helperMenu, toggleMenu);
  onclick(helperMenuDiv, eventHandler);
}

function haveNode$1() {
  const helperMenu = createDiv({
    id: 'helperMenu',
    className: 'helperMenu',
    innerHTML: 'Helper&nbsp;Menu',
  });
  if (getValue('keepHelperMenuOnScreen')) {
    helperMenu.classList.add('fshFixed');
  }
  once(helperMenu, 'mouseenter', showHelperMenu);
  if (getValue('draggableHelperMenu')) {
    helperMenu.classList.add('fshMove');
    draggable(helperMenu);
  }
  insertElement(document.body, helperMenu);
}

function injectHelperMenu() {
  // don't put all the menu code here (but call if clicked) to minimize lag
  const node = getElementById('statbar-container');
  if (node) { haveNode$1(); }
}

function getElementsByClassName(names, element) {
  if (element) { return element.getElementsByClassName(names); }
  return document.getElementsByClassName(names);
}

function getArrayByClassName(names, element) {
  return arrayFrom(getElementsByClassName(names, element));
}

function colouring(parent, colourFn) {
  getArrayByClassName('player-name', parent).forEach(colourFn);
}

function contactColour(el, obj) {
  const onMouseOver = el.dataset.tipped;
  const lastActivityMinutes = /Last Activity:<\/td><td>(\d+) mins/.exec(onMouseOver)[1];
  if (lastActivityMinutes < 2) {
    el.classList.add(obj.l1);
  } else if (lastActivityMinutes < 5) {
    el.classList.add(obj.l2);
  } else {
    el.classList.add(obj.l3);
  }
}

function hideElement(el) {
  if (el && el.classList) { el.classList.add('fshHide'); }
}

function hideNodeList(nodeList) {
  arrayFrom(nodeList).forEach(hideElement);
}

const hideBtn = [
  [
    'hideGuildInfoTrade',
    '#guild-minibox-action-trade',
    '#online-allies-action-trade',
  ],
  [
    'hideGuildInfoSecureTrade',
    '#guild-minibox-action-secure-trade',
    '#online-allies-action-secure-trade',
  ],
  [
    'hideGuildInfoBuff',
    '#guild-minibox-action-quickbuff',
    '#online-allies-action-quickbuff',
  ],
  [
    'hideGuildInfoMessage',
    '#guild-minibox-action-send-message',
    '#online-allies-action-send-message',
  ],
];

function hideType(context, selector, el) {
  if (calf[el[0]]) {
    hideNodeList(querySelectorAll(el[selector], context));
  }
}

function doHideBtn(context, selector) {
  hideBtn.forEach(partial(hideType, context, selector));
}

function doHideBuffSelected(parent, checkOn, quickBuff) {
  if (calf.hideBuffSelected) {
    hideNodeList(getElementsByClassName(checkOn, parent));
    hideElement(getElementById(quickBuff));
  }
}

function guildColour(el) {
  contactColour(el, {
    l1: 'fshGreen',
    l2: 'fshWhite',
    l3: 'fshGrey',
  });
}

function makeLink(el) {
  setInnerHtml(`<a href="${guildSubcmdUrl}chat">Chat</a>`, el);
}

function updateChatLink() {
  querySelectorArray('#pCR h4').filter(contains('Chat')).forEach(makeLink);
}

function addGuildInfoWidgets() {
  const guildMembrList = getElementById('minibox-guild-members-list');
  if (!guildMembrList) { return; } // list exists
  // hide guild info links
  doHideBtn(guildMembrList, 1);
  doHideBuffSelected(guildMembrList, 'guild-buff-check-on', 'guild-quick-buff');
  // add coloring for offline time
  colouring(guildMembrList, guildColour);
  updateChatLink();
}

function alliesColour(el) {
  contactColour(el, {
    l1: 'fshDodgerBlue',
    l2: 'fshLightSkyBlue',
    l3: 'fshPowderBlue',
  });
}

function addOnlineAlliesWidgets() {
  const onlineAlliesList = getElementById('minibox-allies-list');
  if (!onlineAlliesList) { return; }
  doHideBtn(onlineAlliesList, 2);
  doHideBuffSelected(onlineAlliesList, 'ally-buff-check-on', 'ally-quick-buff');
  // add coloring for offline time
  colouring(onlineAlliesList, alliesColour);
}

const keys = (obj) => Object.keys(obj);

function overwriteKey(obj, mixins, fn, key) {
  if (isObject(mixins[key]) && mixins[key] !== null) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = fn(mixins[key].constructor(), mixins[key]);
  } else {
    // eslint-disable-next-line no-param-reassign
    obj[key] = mixins[key];
  }
}

function extend(obj, mixins) {
  if (isObject(mixins)) {
    keys(mixins).forEach(partial(overwriteKey, obj, mixins, extend));
  }
  return obj;
}

function url(opt) {
  if (opt.data) {
    // eslint-disable-next-line no-param-reassign
    delete opt.data.fshrnd;
    return $.param(opt.data);
  }
  return opt.url;
}

function buildErrorMsg(opt, jqXhr, textStatus, errorThrown) {
  const xhrStatus = `${jqXhr.status} ${jqXhr.statusText} - `;
  if (jqXhr.statusText === errorThrown.toString()) {
    return xhrStatus + url(opt);
  }
  const jqStatus = `${xhrStatus + textStatus} ${errorThrown} - ${url(opt)}`;
  if (textStatus === 'parsererror') {
    return `${jqStatus} - ${jqXhr.responseText}`;
  }
  return jqStatus;
}

class AjaxError extends Error {
  constructor([opt, jqXhr, textStatus, errorThrown], ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(buildErrorMsg(opt, jqXhr, textStatus, errorThrown), ...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AjaxError);
    }

    // Custom debugging information
    this.jqSettings = opt;
    this.jqXhr = jqXhr;
    this.jqTextStatus = textStatus;
    this.jqErrorThrown = errorThrown;
  }
}

let paused$1 = true;
let queue = [];
let globalHandler;

function setOpts(options) {
  if (typeof options === 'string') {
    return { url: options };
  }
  return options;
}

function clearXhr(xhr) {
  xhr.abort();
  queue = [];
}

function beforeSend(xhr) {
  on(window, 'beforeunload', partial(clearXhr, xhr));
}

const ignoreStatus = [0, 503, 504];
const ignoreTextStatus = ['abort'];
const ignoreResponse = [
  'We have encountered an issue with a server connection',
  'We\'re performing maintenance on the game',
  'the team have been notified and will get it fixed soon',
  'uUDRezBqFM4',
];

function ignore(ajaxErr) {
  return ignoreStatus.includes(ajaxErr.jqXhr.status)
    || ignoreTextStatus.includes(ajaxErr.jqTextStatus)
    || ignoreResponse.some(
      (substring) => ajaxErr.jqXhr.responseText.includes(substring),
    );
}

function handleFailure(reject, ajaxErr) {
  if (!ignore(ajaxErr)) {
    sendException(ajaxErr.toString(), false);
    reject(ajaxErr);
  }
}

function failFilter([fn, opt, retries, resolve, reject]) {
  return function ajaxFail(jqXhr, textStatus, errorThrown) { // Closure
    if (retries > 0 && jqXhr.status === 503) {
      setTimeout(fn, 100, opt, retries - 1, resolve, reject);
    } else {
      handleFailure(reject,
        new AjaxError([opt, jqXhr, textStatus, errorThrown]));
    }
  };
}

function doAjax(options, retries, resolve, reject) {
  const opt = setOpts(options);
  opt.beforeSend = beforeSend;
  return $.ajax(opt).then(resolve)
    .catch(failFilter([doAjax, opt, retries, resolve, reject]));
}

function attemptTask(runner) {
  if ($.active < 5) {
    const opts = queue.shift();
    doAjax(...opts);
    runner();
  }
}

function taskRunner$1() {
  if (queue.length === 0) {
    paused$1 = true;
  } else {
    paused$1 = false;
    attemptTask(taskRunner$1);
  }
}

function initGlobalHandler() {
  if (!globalHandler) {
    $(document).ajaxComplete(taskRunner$1);
    globalHandler = true;
  }
}

function add$1(options, retries, resolve, reject) {
  queue.push([options, retries, resolve, reject]);
  if (paused$1) { taskRunner$1(); }
}

function retryAjax(options) {
  initGlobalHandler();
  if (options) {
    return new Promise(((resolve, reject) => {
      add$1(options, 10, resolve, reject);
    }));
  }
}

function callApp(data) {
  return retryAjax({
    url: 'app.php',
    data: extend(data, { browser: 1 }),
    dataType: 'json',
  });
}

function composing(data) {
  return callApp(extend({ cmd: 'composing' }, data));
}

function composingView() {
  return composing({ subcmd: 'view' });
}

// import { $dataAccess } from './_dataAccess';

function daComposing() {
  // return $dataAccess(composingView, composing);
  return composingView();
}

function insertHtmlAfterBegin(parent, html) {
  insertHtml(parent, 'afterbegin', html);
}

const composeMsg = `<li class="notification"><a href="${composingUrl}"><span`
  + ' class="notification-icon"></span><p class="notification-content">'
  + 'Composing to do</p></a></li>';

function displayComposeMsg() {
  insertHtmlAfterBegin(getElementById('notifications'), composeMsg);
}

function isNumber(e) { return typeof e === 'number'; }

function isString(e) { return typeof e === 'string'; }

function storItem(name, type, value) {
  if (!isUndefined(Modernizr) && Modernizr.localstorage) {
    window.localStorage.setItem(GMSTORAGE_PATH + name, type + value);
  }
}

const cold = [
  [isString, (name, value) => { storItem(name, 'S]', value); }],
  [
    isNumber,
    (name, value) => {
      if (value.toString().indexOf('.') < 0) { storItem(name, 'N]', value); }
    },
  ],
  [isBoolean, (name, value) => { storItem(name, 'B]', value); }],
];

function setValue(name, value) {
  const storType = cold.find((pair) => pair[0](value));
  if (storType) {
    storType[1](name, value);
  }
}

function getTime(pot) {
  return pot.time_remaining;
}

function displayAlert() {
  displayComposeMsg();
  setValue(defNeedToCompose, true);
}

function potsBrewing(potions) {
  const minTimeInSecs = Math.min.apply(null, potions.map(getTime));
  if (minTimeInSecs > 0) {
    setValue(defNeedToCompose, false);
    setValue(defLastComposeCheck, now + minTimeInSecs * 1000);
  } else {
    displayAlert();
  }
}

function parseComposingApp(result) {
  if (result.potions.length !== result.max_potions) {
    displayAlert();
  } else {
    potsBrewing(result.potions);
  }
}

function checkAppResponse(json) {
  if (json.s) { parseComposingApp(json.r); }
}

function checkLastCompose() { // jQuery.min
  const lastComposeCheck = getValue(defLastComposeCheck);
  if (lastComposeCheck && now < lastComposeCheck) { return; }
  daComposing().then(checkAppResponse);
}

function composeAlert() {
  if (getValue(defNeedToCompose)) {
    displayComposeMsg();
  } else {
    checkLastCompose();
  }
}

function injectComposeAlert() {
  if (calf.cmd !== 'composing' && jQueryPresent()) { composeAlert(); }
}

function hideQTip(el) {
  $(el).qtip('hide');
}

function indexAjax(options) {
  mixin(options, { url: indexPhp, data: { no_mobile: 1 } });
  return retryAjax(options);
}

function indexAjaxData(data) {
  return indexAjax({ data });
}

function saveTempleSettings(needToPray) {
  setValue('needToPray', needToPray);
  setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // midnight
}

const havePrayedMsg = '<span class="notification-icon"></span>'
  + '<p class="notification-content">'
  + 'You are currently praying at the temple.</p>';
const godsNotification = '<li class="notification">'
  + '<span id="helperPrayToGods" class="fastPray">'
  + '<table><tbody><tr><td>'
  + '<span class="tip-static fshTempleZero" data-tipped="Pray to Sahria" '
  + 'praytype="0"></span></td><td>'
  + '<span class="tip-static fshTempleOne" data-tipped="Pray to Osverin" '
  + 'praytype="1"></span></td></tr><tr><td>'
  + '<span class="tip-static fshTempleTwo" data-tipped="Pray to Gurgriss" '
  + 'praytype="2"></span></td><td>'
  + '<span class="tip-static fshTempleThree" data-tipped="Pray to Lindarsil" '
  + 'praytype="3"></span></td></tr></tbody></table>'
  + `<a href="${cmdUrl}temple">`
  + '<p class="notification-content">Bow down to the gods</p>'
  + '</a></span></li>';

function havePrayed() {
  getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
  saveTempleSettings(false);
}

function prayToGods(e) { // jQuery
  const myGod = e.target.getAttribute('praytype');
  if (!myGod) { return; }
  indexAjaxData({ cmd: 'temple', subcmd: 'pray', type: myGod })
    .then(havePrayed);
  hideQTip(e.target);
}

function displayDisconnectedFromGodsMessage() {
  insertHtmlAfterBegin(getElementById('notifications'), godsNotification);
  once(getElementById('helperPrayToGods'), 'click', prayToGods);
}

function jQueryNotPresent() { return !isFunction(window.$); }

function createDocument(details) {
  // Use DOMParser to prevent img src tags downloading
  const parser = new DOMParser();
  const doc = parser.parseFromString(details, 'text/html');
  return doc;
}

function querySelector(selector, scope) {
  if (scope) { return scope.querySelector(selector); }
  return document.querySelector(selector);
}

function templeAlertEnabled(responseText) {
  let doc;
  if (calf.cmd !== 'temple') {
    doc = createDocument(responseText);
  } else {
    doc = document;
  }
  const checkNeedToPray = querySelector('input[value="Pray to Osverin"]', doc);
  let needToPray = false;
  if (checkNeedToPray) {
    displayDisconnectedFromGodsMessage();
    needToPray = true;
  }
  saveTempleSettings(needToPray);
}

function parseTemplePage(responseText) {
  if (calf.enableTempleAlert) { templeAlertEnabled(responseText); }
}

function checkLastUpdate(templeAlertLastUpdate) {
  return !templeAlertLastUpdate || now > templeAlertLastUpdate;
}

function doWeNeedToParse() {
  if (checkLastUpdate(getValue('lastTempleCheck'))) {
    indexAjaxData({ cmd: 'temple' }).then(parseTemplePage);
  } else if (getValue('needToPray')) {
    displayDisconnectedFromGodsMessage();
  }
}

function injectTempleAlert() { // jQuery
  // Checks to see if the temple is open for business.
  if (calf.cmd === 'temple' || jQueryNotPresent()) { return; }
  doWeNeedToParse();
}

function notGoldUpgradesPage() {
  return window.location.search.indexOf('cmd=points&type=1') === -1;
}

const goldUpgradeMsg = `<li class="notification"><a href="${pointsUrl}&type=1"><span`
+ ' class="notification-icon"></span><p class="notification-content">Up'
+ 'grade stamina with gold</p></a></li>';

function displayUpgradeMsg() {
  if (notGoldUpgradesPage()) {
    insertHtmlAfterBegin(getElementById('notifications'), goldUpgradeMsg);
  }
}

function findDoc(data) {
  if (notGoldUpgradesPage()) {
    return createDocument(data);
  }
  const boxes = querySelectorAll('#pCC input[name="quantity"]');
  boxes[0].value = '100';
  boxes[1].value = '10';
  return document;
}

function checkUpgrade(limit) {
  const checkDoneUpgrade = getTextTrim(limit).split(' / ');
  if (checkDoneUpgrade[0] !== checkDoneUpgrade[1]) {
    displayUpgradeMsg();
    setValue('needToDoUpgrade', true);
  } else {
    setValue('needToDoUpgrade', false);
    setValue('lastUpgradeCheck',
      Date.parse(`${getTextTrim(limit.nextElementSibling)} GMT`));
  }
}

function parseGoldUpgrades(data) {
  if (!calf.enableUpgradeAlert) { return; }
  const doc = findDoc(data);
  const tables = querySelectorAll('#pCC > table', doc);
  if (tables.length > 0) {
    const limit = tables[tables.length - 1].rows[3].cells[2];
    checkUpgrade(limit);
  }
}

function upgradesGold() {
  return indexAjaxData({
    cmd: 'points',
    type: 1,
  });
}

function asyncParse(data) {
  add(3, parseGoldUpgrades, [data]);
}

function checkLastUpgrade() {
  const lastUpgradeCheck = getValue('lastUpgradeCheck');
  if (lastUpgradeCheck && now < lastUpgradeCheck) { return; }
  upgradesGold().then(asyncParse);
}

function notUpgradesPage() {
  if (getValue('needToDoUpgrade')) {
    displayUpgradeMsg();
    return;
  }
  checkLastUpgrade();
}

function injectUpgradeAlert() {
  if (jQueryPresent() && notGoldUpgradesPage()) {
    notUpgradesPage();
  }
}

function outputFormat(value, suffix) {
  if (value === 0) { return ''; }
  return String(value) + suffix;
}

function splitTime(timeInSecs) {
  let s = timeInSecs;
  let m = Math.floor(s / 60);
  s %= 60;
  let h = Math.floor(m / 60);
  m %= 60;
  const d = Math.floor(h / 24);
  h %= 24;
  return [d, h, m, s];
}

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

const enemyBuffCheckOn = 'enemy-buff-check-on';
const enemyBuffCheckOff = 'enemy-buff-check-off';
const enemySendMessage = 'enemy-send-message';
const enemyQuickbuff = 'enemy-quickbuff';
const enemySelectedBuff = 'enemy-quick-buff';

const contactClass = [
  [(n) => n < 120, 'fshDodgerBlue', 'fshRed'],
  [(n) => n < 300, 'fshDodgerBlue', 'fshRed'],
  [() => true, 'fshPowderBlue', 'fshPink'],
];

function allyOrEnemy(type, test) {
  if (type) { return test[1]; }
  return test[2];
}

function band(lastLogin, ary) {
  return ary[0](nowSecs - lastLogin);
}

function contactColor(lastLogin, type) {
  const test = contactClass.find(partial(band, lastLogin));
  if (test) { return allyOrEnemy(type, test); }
  return 'fshWhite';
}

function playerName(val, type) {
  return `<a class="player-name tip-static ${
    contactColor(val.last_login, type)}" data-tipped="<b>${val.username
  }</b><br><table><tbody><tr><td>Level:</td><td>${val.level
  }</td></tr><tr><td>Last Activity:</td><td>${
    formatLastActivity(val.last_login)}</td></tr></tbody></table>" href="${
    playerIdUrl}${val.id}">${val.username}</a>`;
}

function doBuffCheck() {
  if (!calf.hideBuffSelected) {
    return `<span class="${enemyBuffCheckOn}"></span>`;
  }
  return '';
}

function doMsgButton() {
  if (!calf.hideGuildInfoMessage) {
    return `<span class="${enemySendMessage} guild-icon left `
      + 'guild-minibox-action tip-static" data-tipped="Send Message"></span>';
  }
  return '';
}

function doBuffButton() {
  if (!calf.hideGuildInfoBuff) {
    return `<span class="${enemyQuickbuff} guild-icon left `
      + 'guild-minibox-action tip-static" data-tipped="Quick Buff"></span>';
  }
  return '';
}

function doSecureButton(val) {
  if (!calf.hideGuildInfoSecureTrade) {
    return '<a class="enemy-secure-trade guild-icon left guild-minibox-action'
      + ` tip-static" href="${secureUrl}${
        val.username}" data-tipped="Secure Trade"></a>`;
  }
  return '';
}

function doTradeButton(val) {
  if (!calf.hideGuildInfoTrade) {
    return '<a class="enemy-trade guild-icon left guild-minibox-action '
      + `tip-static" href="${tradeUrl}${
        val.username}" data-tipped="Send Gold/Items/FSP"></a>`;
  }
  return '';
}

function recent(val) {
  return nowSecs - val.last_login < 1800;
}

function addContact(type, val) {
  return `<li class="player"><div class="player-row">${
    doBuffCheck()
  }${playerName(val, type)
  }</div><div class="guild-minibox-actions">${
    doMsgButton()
  }${doBuffButton()
  }${doSecureButton(val)
  }${doTradeButton(val)
  }</div></li>`;
}

function addContacts(contactList, type) {
  return contactList.filter(recent).map(partial(addContact, type)).join('');
}

function hasClass(className, el) {
  return el.classList.contains(className);
}

function classPair(target, el) { return hasClass(el[0], target); }

function handleEvent(passingTest, evtAry, evt) {
  const { target } = evt;
  const hdl = evtAry.find(partial(passingTest, target));
  if (hdl) { return hdl[1](target); }
}

function classHandler(evtAry) {
  return partial(handleEvent, classPair, evtAry);
}

function validRef(referenceNode) {
  return referenceNode instanceof Node
    && referenceNode.parentNode instanceof Node;
}

function insertElementBefore(newNode, referenceNode) {
  if (validRef(referenceNode)) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode);
  }
}

function noChildren(parentNode, newNode) {
  if (parentNode.firstChild instanceof Node) { // Text Node
    return insertElementBefore(newNode, parentNode.firstChild); // Text Node
  }
  return insertElement(parentNode, newNode);
}

function insertElementAfterBegin(parentNode, newNode) {
  if (parentNode instanceof Element) {
    return noChildren(parentNode, newNode);
  }
}

function indexAjaxJson(data) {
  return indexAjax({ data, dataType: 'json' });
}

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

const cache = {};

function profile(username) {
  // return cmdExport({player_username: username, subcmd: 'profile'});
  if (!cache[username]) {
    cache[username] = cmdExport({ player_username: username, subcmd: 'profile' });
  }
  return cache[username];
}

function getProfile(username) {
  return profile(username);
}

let thisPlayerName;

function playerName$1() {
  if (!thisPlayerName) {
    const statBarCharacter = getElementById('statbar-character');
    if (statBarCharacter) {
      thisPlayerName = getText(statBarCharacter);
    }
  }
  return thisPlayerName;
}

class Store {
    constructor(dbName = 'keyval-store', storeName = 'keyval') {
        this.storeName = storeName;
        this._dbp = new Promise((resolve, reject) => {
            const openreq = indexedDB.open(dbName, 1);
            openreq.onerror = () => reject(openreq.error);
            openreq.onsuccess = () => resolve(openreq.result);
            // First time setup: create an empty object store
            openreq.onupgradeneeded = () => {
                openreq.result.createObjectStore(storeName);
            };
        });
    }
    _withIDBStore(type, callback) {
        return this._dbp.then(db => new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, type);
            transaction.oncomplete = () => resolve();
            transaction.onabort = transaction.onerror = () => reject(transaction.error);
            callback(transaction.objectStore(this.storeName));
        }));
    }
}
let store;
function getDefaultStore() {
    if (!store)
        store = new Store();
    return store;
}
function get(key, store = getDefaultStore()) {
    let req;
    return store._withIDBStore('readonly', store => {
        req = store.get(key);
    }).then(() => req.result);
}
function set(key, value, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.put(value, key);
    });
}
function del(key, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.delete(key);
    });
}
function clear(store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.clear();
    });
}
function keys$1(store = getDefaultStore()) {
    const keys = [];
    return store._withIDBStore('readonly', store => {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
        (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
            if (!this.result)
                return;
            keys.push(this.result.key);
            this.result.continue();
        };
    }).then(() => keys);
}

const processError = (e) => {
  if (e && e.name !== 'NotFoundError') {
    sendException(parseError(e), false);
  }
};

async function get$1(key, store) {
  try {
    return await get(key, store);
  } catch (e) {
    processError(e);
  }
}

async function set$1(key, value, store) {
  try {
    return await set(key, value, store);
  } catch (e) {
    processError(e);
  }
}

function sendMyProfileToForage(data) {
  set$1('fsh_selfProfile', data);
  return data;
}

function addLastUpdateDate(data) {
  if (data) {
    return { ...data, lastUpdate: now };
  }
  return data;
}

function getMyProfile() {
  return getProfile(playerName$1())
    .then(addLastUpdateDate)
    .then(sendMyProfileToForage);
}

function getProfileFromForage(data) {
  if (!data || data.lastUpdate < now - calf.allyEnemyOnlineRefreshTime) {
    return getMyProfile();
  }
  return data;
}

function myStats(force) {
  if (force) { return getMyProfile(); }
  return get$1('fsh_selfProfile')
    .then(getProfileFromForage);
}

function getPos(available, desired, offset) {
  return Math.floor(Math.max(available - desired, 0) / 2 + offset);
}

function fshOpen(url, title, w, _h, features) {
  let h = _h;
  if (_h === 500) { h = 1000; }
  const top = getPos(window.screen.availHeight, h, window.screenY);
  const left = getPos(document.documentElement.clientWidth, w, window.screenX);
  window.open(url, title, `width=${w}, height=${h}, left=${left
  }, top=${top}${features}`);
}

function openQuickBuffByName(aPlayerName) {
  fshOpen(`${quickbuffUrl}&t=${aPlayerName}`,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

const noAlliesTests = [
  (allies, enemies) => allies.length + enemies.length,
  (allies, enemies) => {
    if (!calf.enableAllyOnlineList) { return enemies.length; }
  },
  (allies) => {
    if (!calf.enableEnemyOnlineList) { return allies.length; }
  },
];

function condition(allies, enemies, e) { return e(allies, enemies) === 0; }

function noAllies(allies, enemies) {
  return noAlliesTests.every(partial(condition, allies, enemies));
}

function hazAllies(allies, enemies) {
  let output = '';
  if (calf.enableAllyOnlineList) {
    output += addContacts(allies, true);
  }
  if (calf.enableEnemyOnlineList) {
    output += addContacts(enemies, false);
  }
  const fshContactList = getElementById('fshContactList');
  setInnerHtml('', fshContactList);
  insertHtmlBeforeEnd(fshContactList, output);
}

function injectAllyEnemyList(data) {
  const allies = fallback(data._allies, []);
  const enemies = fallback(data._enemies, []);
  if (noAllies(allies, enemies)) { return; }
  hazAllies(allies, enemies);
}

function resetList() {
  myStats(true).then(injectAllyEnemyList);
}

function toggleBuffSelected(target) {
  target.classList.toggle(enemyBuffCheckOn);
  target.classList.toggle(enemyBuffCheckOff);
}

function msgPlayer(target) {
  window.openQuickMsgDialog(getText(target.parentNode.previousElementSibling
    .lastElementChild));
}

function buffPlayer(target) {
  openQuickBuffByName(getText(target.parentNode
    .previousElementSibling.lastElementChild));
}

function selectedBuff() {
  const buffBalls = getArrayByClassName(enemyBuffCheckOn,
    getElementById('fshContactList'));
  const sendstring = buffBalls.map(
    (el) => getText(el.nextElementSibling),
  );
  openQuickBuffByName(sendstring.join());
}

const classEvt = [
  [enemyBuffCheckOn, toggleBuffSelected],
  [enemyBuffCheckOff, toggleBuffSelected],
  [enemySendMessage, msgPlayer],
  [enemyQuickbuff, buffPlayer],
  [enemySelectedBuff, selectedBuff],
];

function eventHandler$1(evt) {
  const { target } = evt;
  if (target.id === 'fshResetEnemy') {
    resetList();
    return;
  }
  classHandler(classEvt)(evt);
}

function makeDiv(data) {
  const fshAllyEnemy = createDiv({
    id: 'fshAllyEnemy',
    className: 'minibox',
  });
  let wrapper = '<h3>Allies/Enemies</h3><div class="minibox-content">'
    + '<h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4>'
    + '<div id="minibox-enemy"><ul id="fshContactList"></ul>';
  if (!calf.hideBuffSelected) {
    wrapper += `<ul class="${enemySelectedBuff}">Quick Buff Selected</ul>`;
  }
  wrapper += '</div></div>';
  insertHtmlBeforeEnd(fshAllyEnemy, wrapper);
  insertElementAfterBegin(pCR, fshAllyEnemy);
  onclick(fshAllyEnemy, eventHandler$1);
  injectAllyEnemyList(data);
}

function nextTick(data) {
  if (data) {
    add(3, makeDiv, [data]);
  }
}

function prepareAllyEnemyList() {
  if (jQueryNotPresent()) { return; }
  myStats(false).then(nextTick);
}

var undefined$6 = undefined;

function bountyPage(page) {
  return indexAjaxData({
    cmd: 'bounty',
    page,
  });
}

function functionPasses(fn) { return fn(); }

function getTarget(firstCell) {
  if (firstCell.children[0].tagName === 'A') { return firstCell.children[0]; }
  return firstCell.children[0].children[0];
}

function rewardType(theCells) {
  return querySelector('img', theCells[2]).title;
}

function basicBounty(theCells) {
  const targetData = getTarget(theCells[0]);
  return {
    target: getText(targetData),
    link: targetData.href,
    lvl: getText(targetData.nextSibling).replace(/[[|\]]/g, ''), // Text Node
    reward: getText(theCells[2]),
    rewardType: rewardType(theCells),
    posted: getText(theCells[3]),
    xpLoss: getText(theCells[4]),
  };
}

function csvSplit(csv) {
  return csv.split(/\s*,\s*/);
}

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

let bountyList$1;
let wantedList$1;
let activeBountyListPosted;
let bountyListRefreshTime$1;
let bwNeedsRefresh$1;
let wantedArray;

function hasActiveBounties(activeTable) {
  return !/No bounties active/.test(activeTable.rows[1].cells[0].innerHTML);
}

function bountyData(theCells) {
  return extend(basicBounty(theCells), { progress: getText(theCells[5]) });
}

function getAllBounties(activeTable) {
  for (let i = 1; i < activeTable.rows.length - 2; i += 2) {
    const theCells = activeTable.rows[i].cells;
    const thisBounty = bountyData(theCells);
    bountyList$1.bounty.push(thisBounty);
  }
}

function parseActiveBounty(activeTable) { // Legacy
  if (hasActiveBounties(activeTable)) {
    getAllBounties(activeTable);
  }
}

function getActiveBountyList(doc) { // Legacy
  const bountyInfo = getElementById('bounty-info', doc);
  if (!bountyInfo) { return; }
  const activeTable = bountyInfo.parentNode.parentNode
    .previousElementSibling.children[0].children[0];
  bountyList$1 = {};
  bountyList$1.bounty = [];
  bountyList$1.isRefreshed = true;
  bountyList$1.lastUpdate = nowSecs;
  if (activeTable) { parseActiveBounty(activeTable); }
  activeBountyListPosted = true;
}

function testBountyList() {
  return bountyList$1
    && nowSecs - bountyList$1.lastUpdate > bountyListRefreshTime$1;
}

function testWantedList() {
  return wantedList$1
    && nowSecs - wantedList$1.lastUpdate > bountyListRefreshTime$1;
}

function testCacheInvalid() {
  return testBountyList() || testWantedList();
}

function invalidateCache() {
  bountyList$1 = getValueJSON('bountyList');
  wantedList$1 = getValueJSON('wantedList');
  bountyListRefreshTime$1 = getValue('bountyListRefreshTime');
  bwNeedsRefresh$1 = getValue('bwNeedsRefresh');
  if (bwNeedsRefresh$1) { return; }
  if (testCacheInvalid()) {
    bwNeedsRefresh$1 = true; // invalidate cache
  }
}

function doRefresh() {
  wantedList$1 = {};
  wantedList$1.bounty = [];
  wantedList$1.isRefreshed = true;
  wantedList$1.lastUpdate = nowSecs;
  activeBountyListPosted = false;
  wantedArray = shouldBeArray('wantedNames');
  setValue('bwNeedsRefresh', false);
}

function acceptBtn(theCells) {
  const cell = theCells[6];
  if (getTextTrim(cell) !== '[n/a]') {
    return cell.children[0].children[0].getAttribute('onclick');
  }
  return '';
}

function getTarget$1(theCells) {
  return extend(basicBounty(theCells), {
    offerer: getTextTrim(theCells[1].children[0].children[0]),
    tickets: getTextTrim(theCells[5]),
    accept: acceptBtn(theCells),
  });
}

const isWanted = [
  () => wantedArray.includes('*'),
  (target) => wantedArray.includes(target),
  (target, theRow) => calf.wantedGuildMembers
    && getTextTrim(theRow.cells[6]) === '[n/a]',
];

function wanted(target, theRow) {
  return getTextTrim(theRow.cells[6]) !== '[active]'
    && isWanted.some((el) => el(target, theRow));
}

function wantedTarget(target, theRow) {
  if (wanted(target, theRow)) {
    wantedList$1.bounty.push(getTarget$1(theRow.cells));
  }
}

function findTarget(activeTable) {
  for (let i = 1; i < activeTable.rows.length - 2; i += 2) {
    const theRow = activeTable.rows[i];
    const target = getTextTrim(theRow.cells[0].children[0].children[0]);
    if (target === '[ No bounties available. ]') { break; }
    wantedTarget(target, theRow);
  }
}

let bountyListDiv;
let wantedListDiv;

function createMiniBox() {
  return createDiv({ className: 'minibox' });
}

function createDivs() {
  if (calf.enableWantedList) {
    wantedListDiv = createMiniBox();
    insertElementAfterBegin(pCR, wantedListDiv);
  }
  if (calf.enableActiveBountyList) {
    bountyListDiv = createMiniBox();
    insertElementAfterBegin(pCR, bountyListDiv);
  }
}

function createSpan(props) {
  return cElement('span', props);
}

function setValueJSON(name, value) {
  setValue(name, JSON.stringify(value));
}

let bountyListReset;

function makeMouseOver(el) {
  return `Level:  ${el.lvl
  }<br>Reward: ${el.reward} ${el.rewardType
  }<br>XP Loss Remaining: ${el.xpLoss
  }<br>Progress:  ${el.progress}`;
}

function injectBountyList() { // Legacy
  setValueJSON('bountyList', bountyList$1);
  setInnerHtml('', bountyListDiv);
  const heading = createDiv(
    { innerHTML: `<a href="${bountyUrl}">Active Bounties</a> ` },
  );
  bountyListReset = createSpan({ className: 'xxsLink', textContent: 'Reset' });
  insertElement(heading, bountyListReset);
  insertElement(bountyListDiv, heading);
  let output = '';
  if (bountyList$1.bounty.length === 0) {
    output += '<div class="xsOrange">[No active bounties]</div>';
  } else {
    for (let i = 0; i < bountyList$1.bounty.length; i += 1) {
      output += `<a href="${bountyList$1.bounty[i].link
      }" class="tip-static" data-tipped="${
        makeMouseOver(bountyList$1.bounty[i])}">${
        bountyList$1.bounty[i].target}</a><br>`;
    }
  }
  insertHtmlBeforeEnd(bountyListDiv, output);
}

let wantedListReset;

function makeMouseOver$1(el) {
  return `Target Level:  ${el.lvl
  }<br>Offerer: ${el.offerer
  }<br>Reward: ${el.reward} ${el.rewardType
  }<br>XP Loss Remaining: ${el.xpLoss
  }<br>Posted: ${el.posted
  }<br>Tickets Req.:  ${el.tickets}`;
}

function acceptBtn$1(bounty) {
  if (bounty.accept) {
    return `<span class="xsGreen" onclick="${bounty.accept
    }">[a]</span>&nbsp;`;
  }
  return '';
}

function injectWantedList() { // Legacy
  setValueJSON('wantedList', wantedList$1);
  setInnerHtml('', wantedListDiv);
  const heading = createDiv(
    { innerHTML: `<a href="${bountyUrl}">Wanted Bounties</a> ` },
  );
  wantedListReset = createSpan({ className: 'xxsLink', textContent: 'Reset' });
  insertElement(heading, wantedListReset);
  insertElement(wantedListDiv, heading);
  let output = '';
  if (wantedList$1.bounty.length === 0) {
    output += '<div class="xsOrange">[No wanted bounties]</div>';
  } else {
    for (let i = 0; i < wantedList$1.bounty.length; i += 1) {
      output += `${acceptBtn$1(wantedList$1.bounty[i])
      }<a class="xsKhaki tip-static" data-tipped="${
        makeMouseOver$1(wantedList$1.bounty[i])
      }" href="${wantedList$1.bounty[i].link}">${
        wantedList$1.bounty[i].target}</a><br>`;
    }
  }
  insertHtmlBeforeEnd(wantedListDiv, output);
}

let curPage;
let maxPage;

function getWantedBountyList(doc) {
  const page = querySelector('#pCC input[name="page"]', doc);
  if (!page) { return; }
  curPage = Number(page.value);
  maxPage = Number(page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1]);
  const activeTable = getElementById('bounty-info', doc).parentNode.parentNode
    .nextElementSibling.children[0].children[0];
  if (activeTable) { findTarget(activeTable); }
}

function hazActiveBountyList(doc) {
  if (calf.enableActiveBountyList && !activeBountyListPosted) {
    getActiveBountyList(doc);
    injectBountyList();
  }
}

function parseBountyPageForWorld(details) {
  const doc = createDocument(details);
  hazActiveBountyList(doc);
  if (calf.enableWantedList) {
    getWantedBountyList(doc);
    if (curPage < maxPage) {
      bountyPage(curPage + 1).then(parseBountyPageForWorld);
    } else {
      injectWantedList();
    }
  }
}

function notRefreshed(enableActiveBountyList, enableWantedList) {
  if (enableWantedList) {
    wantedList$1.isRefreshed = false;
    injectWantedList();
  }
  if (enableActiveBountyList) {
    bountyList$1.isRefreshed = false;
    injectBountyList();
  }
}

const refreshConditions = [
  () => !bountyList$1,
  () => !wantedList$1,
  () => bwNeedsRefresh$1,
];

function needsRefresh() {
  return refreshConditions.some(functionPasses);
}

function retrieveBountyInfo(enableActiveList, enableWantedList) {
  invalidateCache();
  if (needsRefresh()) {
    doRefresh();
    bountyPage(1).then(parseBountyPageForWorld);
  } else {
    notRefreshed(enableActiveList, enableWantedList);
  }
}

function resetList$1(e) {
  if (e.target === bountyListReset) {
    setValueJSON('bountyList', null);
    retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
  }
  if (e.target === wantedListReset) {
    setValueJSON('wantedList', null);
    retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
  }
}

function doHandlers() {
  if (bountyListDiv) { onclick(bountyListDiv, resetList$1); }
  if (wantedListDiv) { onclick(wantedListDiv, resetList$1); }
}

function prepareBountyData() {
  if (jQueryNotPresent()) { return; }
  createDivs();
  doHandlers();
  retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
}

function callAllyEnemy() {
  if (calf.enableAllyOnlineList
      || calf.enableEnemyOnlineList) {
    add(3, prepareAllyEnemyList);
  }
}

function callBounties() {
  if (calf.enableWantedList
      || calf.enableActiveBountyList) {
    add(3, prepareBountyData);
  }
}

function callGuildInfo() {
  if (calf.enableGuildInfoWidgets) {
    add(3, addGuildInfoWidgets);
  }
}

function callAllies() {
  if (calf.enableOnlineAlliesWidgets) {
    add(3, addOnlineAlliesWidgets);
  }
}

function callTemple() {
  if (calf.enableTempleAlert) {
    add(3, injectTempleAlert);
  }
}

function callUpgrade() {
  if (calf.enableUpgradeAlert) {
    add(3, injectUpgradeAlert);
  }
}

function callComposing() {
  if (calf.enableComposingAlert) {
    add(3, injectComposeAlert);
  }
}

function conditional() {
  callAllyEnemy();
  callBounties();
  callGuildInfo();
  callAllies();
  callTemple();
  callUpgrade();
  callComposing();
}

function execute(fn) {
  fn();
}

function executeAll(ary) {
  ary.forEach(execute);
}

function getCalfPrefs(pref) { calf[pref] = getValue(pref); }

function guild(data) {
  return callApp(extend({ cmd: 'guild' }, data));
}

let cache$1;

function guildManage() {
  if (!cache$1) {
    cache$1 = guild({ subcmd: 'manage' });
  }
  return cache$1;
}

// import { $dataAccess } from './_dataAccess';
// import guildManage from './fallbacks/guildManage';

function daGuildManage() {
  // return $dataAccess(appGuildManage, guildManage);
  return guildManage();
}

function lastActivityToDays(lastActivity) {
  return Math.floor(Math.max(0, nowSecs - lastActivity) / 86400);
}

const act = 0;
const cur = 1;
const lvl = 2;
const max = 3;
const utc = 4;
const vl = 5;
const gxp = 6;

let oldArchive;
let guild$1;

function pushNewRecord(member) {
  oldArchive.members[member.name].push([
    lastActivityToDays(member.last_activity),
    member.current_stamina,
    member.level,
    member.max_stamina,
    nowSecs,
    member.vl,
    member.guild_xp,
  ]);
}

function initMember(member) {
  if (!oldArchive.members[member.name]) {
    oldArchive.members[member.name] = [];
    pushNewRecord(member);
  }
}

const type2tests = [
  // Has current stam changed ?
  // probably want a weighted percentage here
  // Might only care if it has dropped significantly ?
  (archive, current) => current.current_stamina !== archive[cur],
  // Has Max Stam increased ?
  // probably want a weighted percentage here
  (archive, current) => current.max_stamina > archive[max],
  // Has level changed ?
  (archive, current) => current.level !== archive[lvl],
  // Has VL changed ?
  (archive, current) => current.vl !== archive[vl],
  // Has GXP changed ?
  // probably want a weighted percentage here
  (archive, current) => current.guild_xp !== archive[gxp],
];

function change(archiveRecord, member, test) {
  return test(archiveRecord, member);
}

function hasChanged(archiveRecord, member) {
  return type2tests.some(partial(change, archiveRecord, member));
}

function upsert(archiveRecord, member) {
  if (hasChanged(archiveRecord, member)) {
    pushNewRecord(member);
  } else {
    // eslint-disable-next-line no-param-reassign
    archiveRecord[act] = lastActivityToDays(member.last_activity);
    // eslint-disable-next-line no-param-reassign
    archiveRecord[utc] = nowSecs;
  }
}

function processMemberRecord(newArchive, member) {
  initMember(member);
  const archiveMember = oldArchive.members[member.name];
  const archiveRecord = archiveMember[archiveMember.length - 1];
  const archiveAge = nowSecs - archiveRecord[utc];
  if (archiveAge >= 86100) {
    upsert(archiveRecord, member);
  }
  // eslint-disable-next-line no-param-reassign
  newArchive.members[member.name] = oldArchive.members[member.name];
}

function processRank(newArchive, rank) {
  rank.members.forEach(partial(processMemberRecord, newArchive));
}

function doMerge() { // jQuery.min
  const newArchive = { lastUpdate: nowSecs, members: {} };
  guild$1.r.ranks.forEach(partial(processRank, newArchive));
  set$1('fsh_guildActivity', newArchive);
}

function gotGuild(data) {
  if (data && data.r) {
    guild$1 = data;
    doMerge();
  }
}

function gotActivity(data) { // jQuery.min
  if (data) {
    oldArchive = data;
  } else {
    oldArchive = { lastUpdate: 0, members: {} };
  }
  if (nowSecs > fallback(oldArchive.lastUpdate, 0) + 300) { // 5 mins - probably want to increase
    daGuildManage().then(gotGuild);
  }
}

function guildActivity() { // jQuery.min
  if (jQueryPresent() && getValue('enableGuildActivityTracker')) {
    get$1('fsh_guildActivity').then(gotActivity);
  }
}

function testForGuildLogMsg(guildLogNode) {
  return window.location.search !== newGuildLogLoc
    || guildLogNode.parentNode.id !== 'notification-guild-log';
}

function hideGuildLogMsg(guildLogNode) {
  // hide the lhs box
  if (testForGuildLogMsg(guildLogNode)) { return; }
  const messageBox = guildLogNode.parentNode;
  if (messageBox) {
    hideElement(messageBox);
  }
}

// eslint-disable-next-line no-param-reassign
function updateHref(el) { el.href = newGuildLogUrl; }

function gotGuildLogNodes(guildLogNodes) {
  guildLogNodes.forEach(updateHref);
  hideGuildLogMsg(guildLogNodes[guildLogNodes.length - 1]);
}

function changeGuildLogHREF() {
  if (!getValue('useNewGuildLog')) { return; }
  const guildLogNodes = querySelectorArray(
    `#pCL a[href="${guildLogUrl}"]`,
  );
  if (guildLogNodes.length > 0) { gotGuildLogNodes(guildLogNodes); }
}

function getBoxList(boxList) {
  if (boxList) { return boxList; }
  return '';
}

function storeFSBox(_boxList) {
  let boxList = getBoxList(_boxList);
  const fsbox = getElementsByClassName('message',
    getElementById('minibox-fsbox'))[0].innerHTML;
  if (boxList.indexOf(fsbox) < 0) { boxList = `<br>${fsbox}${boxList}`; }
  if (boxList.length > 10000) { boxList = boxList.substring(0, 10000); }
  set$1('fsh_fsboxcontent', boxList);
}

function storeMsg(nodediv) {
  let playerName = getElementsByTagName('a', nodediv);
  if (playerName.length === 0) { return; }
  get$1('fsh_fsboxcontent').then(storeFSBox);
  playerName = getText(playerName[0]);
  insertHtmlBeforeEnd(nodediv,
    `<span class="fshPaleVioletRed">[ <a href="${doAddIgnore
    }${playerName}">Ignore</a> ]</span> `);
}

function openDialog() {
  sendEvent('injectFSBoxLog', 'injectFsBoxContent');
  jQueryDialog(injectFsBoxContent);
}

function fSBoxExists(node) {
  const nodediv = node.lastElementChild;
  insertHtmlBeforeEnd(nodediv, '<br>');
  storeMsg(nodediv);
  const log = createSpan({
    className: 'fshYellow',
    innerHTML: '[ <span class="fshLink">Log</span> ]',
  });
  onclick(log, openDialog);
  insertElement(nodediv, log);
}

function findFsBox() {
  const node = getElementById('minibox-fsbox');
  if (jQueryPresent() && node) { fSBoxExists(node); }
}

function injectFSBoxLog() {
  if (!getValue('fsboxlog')) { return; }
  findFsBox();
}

function createAnchor(props) {
  return cElement('a', props);
}

function getTitle(el) {
  return el.getAttribute('oldtitle') || el.getAttribute('title');
}

const titanRe = /(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/;

function makeALink(href, label) {
  return `<a href="${href}" target="_blank">${label}</a>`;
}

function creatureSearchHref(name) {
  return `${guideUrl}creatures&search_name=${name}`;
}

function realmSearchHref(name) {
  return `${guideUrl}realms&search_name=${name}`;
}

function makeUfsgLink(img) {
  const myName = encodeURIComponent(getTitle(img));
  const myLink = createAnchor({
    href: creatureSearchHref(myName),
    target: '_blank',
  });
  insertElementBefore(myLink, img);
  insertElement(myLink, img);
}

function titanSpotted(el) {
  return titanRe.test(el.firstChild.nodeValue); // Text Node
}

function reformatNews(el) {
  const news = el.firstChild.nodeValue.match(titanRe); // Text Node
  news[2] = makeALink(creatureSearchHref(news[2]), news[2]);
  news[4] = makeALink(realmSearchHref(news[4]), news[4]);
  return news.slice(1).join('');
}

function titanLink(el) {
  const newSpan = createSpan({ innerHTML: reformatNews(el) });
  el.replaceChild(newSpan, el.firstChild); // Text Node
}

function addUfsgLinks() {
  querySelectorArray('.news_body img[src*="/creatures/"]')
    .forEach(makeUfsgLink);
  getArrayByClassName('news_body_tavern', pCC)
    .filter(titanSpotted).forEach(titanLink);
}

function insertHtmlAfterEnd(parent, html) {
  insertHtml(parent, 'afterend', html);
}

function parseDateAsTimestamp(textDate) {
  const dateAry = textDate.split(/[: /[]/);
  return Date.UTC(Number(dateAry[4]), months.indexOf(dateAry[3]),
    Number(dateAry[2]), Number(dateAry[0]), Number(dateAry[1]), 0);
}

const pvpLadder = (head) => containsText('PvP Ladder', head.children[1]);

const timestamp = (head) => parseDateAsTimestamp(getText(head.children[2]));

function lookForPvPLadder() {
  const rumours = getArrayByClassName('news_head_tavern', pCC);
  const pvpTimes = rumours.filter(pvpLadder).map(timestamp);
  const logTime = Math.max.apply(null, pvpTimes);
  if (logTime > getValue('lastLadderReset')) {
    setValue('lastLadderReset', logTime);
  }
}

const pageTwoLink = (url, type) => `&nbsp;<a href="${
  url}&page=2">View ${type} Page 2</a>`;

function injectHomePageTwoLink() { // Pref
  const updateLink = querySelector(`#pCC a[href="${updateArchiveUrl}"]`);
  if (!updateLink) { return; }
  insertHtmlAfterEnd(updateLink, pageTwoLink(updateArchiveUrl, 'Updates'));
  const archiveLink = querySelector(`#pCC a[href="${archiveUrl}"]`);
  insertHtmlAfterEnd(archiveLink, pageTwoLink(archiveUrl, 'News'));
  lookForPvPLadder(); // Pref
  addUfsgLinks(); // Pref
}

function findNewGroup(el) {
  if (!getText(el).includes('New attack group created.')) { return; }
  let groupJoinHTML = '';
  if (!getValue('enableMaxGroupSizeToJoin')) {
    groupJoinHTML = `<a href="${joinallUrl}"><span `
      + 'class="notification-icon"></span><p class="notification-content">'
      + 'Join all attack groups.</p></a>';
  } else {
    const maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    groupJoinHTML = `<a href="${joinUnderUrl}"><span `
      + 'class="notification-icon"></span><p class="notification-content">'
      + `Join all attack groups less than size ${maxGroupSizeToJoin
      }.</p></a>`;
  }
  insertHtmlAfterEnd(el, `<li class="notification">${groupJoinHTML}</li>`);
}

function injectJoinAllLink() {
  getArrayByTagName('li', getElementById('pCL')).forEach(findNewGroup);
}

function intValue(theText) {
  if (!theText) { return 0; }
  return Number(theText.replace(/,/g, ''));
}

function valueText(collection) {
  return getText(collection[0].nextElementSibling);
}

function asInt(className) {
  return intValue(
    valueText(getElementsByClassName(className)),
  );
}

function padZ(n) {
  let ret = n.toString();
  if (n < 10) { ret = `0${ret}`; }
  return ret;
}

function formatShortDate(aDate) {
  return `${padZ(aDate.getHours())}:${
    padZ(aDate.getMinutes())} ${
    aDate.toLocaleString('en', { weekday: 'short' })} ${
    padZ(aDate.getDate())}/${
    months[aDate.getMonth()]}/${
    aDate.getFullYear()}`;
}

function timeBox(nextGainTime, hrsToGo) {
  const nextGain = /([0-9]+)m ([0-9]+)s/.exec(nextGainTime);
  if (!nextGain) { return; }
  return `<dd>${formatShortDate(new Date(
    now + ((hrsToGo * 60 + Number(nextGain[1])) * 60
    + Number(nextGain[2])) * 1000,
  ))}</dd>`;
}

function injectLevelupCalculator() {
  const nextGain = getElementsByClassName('stat-xp-nextGain');
  if (nextGain.length === 0) { return; }
  insertHtmlBeforeEnd(getElementById(defStatbarLevel),
    `<dt class="stat-xp-nextLevel">Next Level At</dt>${
      timeBox(
        valueText(nextGain),
        Math.ceil(asInt('stat-xp-remaining') / asInt('stat-xp-gainPerHour')),
      )}`);
}

function createLi(props) {
  return cElement('li', props);
}

function insertAfterParent(target, fn, listItem) {
  const tgt = getElementById(target);
  if (tgt instanceof Node) {
    const parent = tgt.parentNode;
    fn(parent, listItem);
  } else { sendException(`#${target} is not a Node`, false); }
}

function refIsLast(newNode, referenceNode) {
  if (referenceNode.nextSibling instanceof Node) { // Text Node
    return insertElementBefore(newNode, referenceNode.nextSibling); // Text Node
  }
  return insertElement(referenceNode.parentNode, newNode);
}

function insertElementAfter(newNode, referenceNode) {
  if (referenceNode instanceof Node
      && referenceNode.parentNode instanceof Node) {
    return refIsLast(newNode, referenceNode);
  }
}

function openDialog$1(text, fn) {
  sendEvent('accordion', text);
  jQueryDialog(fn);
}

function insertAdjElement(parent, listItem) {
  insertElementAfter(listItem, parent);
}

function anchorButton(navLvl, text, fn, target) {
  const li = createLi({ className: `nav-level-${navLvl}` });
  const al = createAnchor({
    className: 'nav-link fshPoint',
    textContent: text,
  });
  onclick(al, partial(openDialog$1, text, fn));
  insertElement(li, al);
  insertAfterParent(target, insertAdjElement, li);
}

function actionButtons() {
  anchorButton('2', 'AH Quick Search', injectAuctionSearch,
    'nav-actions-trade-auctionhouse');
  anchorButton('2', 'Online Players', injectOnlinePlayers,
    'nav-actions-interaction-findplayer');
  anchorButton('2', 'Find Other', injectFindOther,
    'nav-actions-interaction-findplayer');
  anchorButton('2', 'Find Buffs', injectFindBuffs,
    'nav-actions-interaction-findplayer');
}

const calcHeight = (collection) => collection.length * 22;

const byLink = (type) => calcHeight(
  getElementById(`nav-${type}`).nextElementSibling.children,
);

const bySection = (section) => calcHeight(
  querySelectorAll(`#nav-${section} > ul li`),
);

function adjustHeight(theNav, myNav) {
  // first the closed saved variables
  // eslint-disable-next-line no-param-reassign
  myNav.heights = [
    null,
    null,
    byLink('character'),
    bySection('actions'),
    bySection('guild'),
    bySection('toprated'),
    bySection('upgrades'),
    byLink('resources'),
    null,
  ];
  if (Number(myNav.state) !== -1) {
    // and now the open one
    // eslint-disable-next-line no-param-reassign
    theNav.children[myNav.state].children[1].style
      .height = `${myNav.heights[myNav.state]}px`;
  }
}

function buffLogLink() {
  if (getValue('keepBuffLog')) {
    anchorButton('1', 'Buff Log', injectBuffLog, 'nav-character-log');
  }
}

function combatLogLink() {
  if (getValue('keepLogs')) {
    anchorButton('1', 'Combat Logs', injectNotepadShowLogs,
      'nav-character-notepad');
  }
}

function creatureLogLink() {
  if (getValue('showMonsterLog')) {
    anchorButton('1', 'Creature Logs', injectMonsterLog,
      'nav-character-notepad');
  }
}

function characterButtons() {
  anchorButton('1', 'Recipe Manager', injectRecipeManager, 'nav-character-log');
  insertAfterParent('nav-character-log', insertHtmlAfterEnd,
    '<li class="nav-level-1"><a class="nav-link" id="nav-character-medalguide"'
    + ` href="${profileUrl}${defSubcmd}medalguide">Medal Guide</a></li>`
    + '<li class="nav-level-1"><a class="nav-link" '
    + `id="nav-character-invmanager" href="${
      notepadBlankUrl}invmanagernew">Inventory Manager</a></li>`);
  buffLogLink();
  combatLogLink();
  creatureLogLink();
  anchorButton('1', 'Quick Links', injectQuickLinkManager,
    'nav-character-notepad');
}

let guildId;

function getGuildId(el) {
  const match = getText(el).match(/\s+guildId: ([0-9]+),/);
  if (match) { guildId = Number(match[1]); }
}

function currentGuildId() {
  if (!guildId) {
    getArrayByTagName('script', document.body).forEach(getGuildId);
  }
  return guildId;
}

function sectionClosed(id) {
  return id !== -1
    && querySelector(`#nav li.nav-level-0:nth-child(${id + 1}) ul`)
      .offsetHeight === 0;
}

function validateId(id) {
  if (sectionClosed(id)) {
    sendEvent('accordion', 'collapse');
    return -1;
  }
  return id;
}

function navMenu(myNav) {
  const oldSave = myNav._saveState;
  // eslint-disable-next-line no-param-reassign
  myNav._saveState = function _saveState(id) {
    oldSave.call(myNav, validateId(id));
  };
}

function foundNav(myNav) {
  if (isObject(myNav)) { return true; }
  sendException('$(\'#nav\').data(\'hcsNav\') is not an object', false);
}

function foundHeights(myNav) {
  if ('heights' in myNav) { return true; }
  sendException('$(\'#nav\').data(\'hcsNav\').heights does not exist', false);
}

function foundWidget(myNav) {
  if (foundNav(myNav) && foundHeights(myNav)) { return true; }
}

function preFlight() { // jQuery.min
  const theNav = getElementById('nav');
  const myNav = $(theNav).data('hcsNav');
  if (myNav && foundWidget(myNav)) {
    return [theNav, myNav];
  }
  return [];
}

function updateQuestLink() {
  const lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    getElementById('nav-character-questbook').href = lastActiveQuestPage;
  }
}

function updateScavLink() {
  const lastScavPage = getValue('lastScavPage');
  if (lastScavPage.length > 0) {
    getElementById('nav-actions-artisanship-scavenging').href = lastScavPage;
  }
}

function guildInventory() {
  if (currentGuildId()) {
    insertAfterParent('nav-guild-storehouse-inventory', insertHtmlAfterEnd,
      '<li class="nav-level-2"><a class="nav-link" '
      + `id="nav-guild-guildinvmanager" href="${
        notepadBlankUrl}guildinvmgr">Guild Inventory</a></li>`);
  }
}

function newGuildLogLink() {
  if (currentGuildId() && !getValue('useNewGuildLog')) {
    // if not using the new guild log, show it as a separate menu entry
    insertAfterParent('nav-guild-ledger-advisor', insertHtmlAfterEnd,
      `<li class="nav-level-2"><a class="nav-link" href="${
        newGuildLogUrl}">New Guild Log</a></li>`);
  }
}

function topRatedLink() {
  insertAfterParent('nav-toprated-players-level', insertHtmlAfterEnd,
    '<li class="nav-level-2"><a class="nav-link" id="nav-toprated-top250" '
    + `href="${cmdUrl}toprated${defSubcmd}xp">Top 250 Players</a></li>`);
}

function injectItems() {
  executeAll([
    updateQuestLink,
    updateScavLink,
    characterButtons,
    guildInventory,
    newGuildLogLink,
    topRatedLink,
    actionButtons,
  ]);
}

function doAccordion() {
  const [theNav, myNav] = preFlight();
  if (theNav && myNav) {
    injectItems();
    adjustHeight(theNav, myNav);
    navMenu(myNav);
  }
}

function injectMenu() {
  if (!pCL || jQueryNotPresent()) { return; }
  doAccordion();
}

var undefined$7 = undefined;

function setText(text, node) {
  if (node instanceof Node) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = String(text);
  }
}

let enterForSendMessage$1;
let quickMsgDialog;
let $quickMessageDialog;
let fshTemplate;
let msgTbl;
let sendMessage;
let targetPlayer;
let dialogMsg;
let validateTips;
let showingTemplates;

function getQuickMessageDialog() { // jQuery
  if (!quickMsgDialog) {
    quickMsgDialog = getElementById('quickMessageDialog');
  }
  if (!$quickMessageDialog) {
    $quickMessageDialog = $(quickMsgDialog);
  }
}

function getTable() {
  if (!msgTbl) {
    msgTbl = quickMsgDialog.lastElementChild;
  }
}

function setName(name) {
  targetPlayer = name;
  setText(name, getElementById('quickMsgDialog_targetUsername'));
}

function setMsg(msg) {
  dialogMsg = getElementById('quickMsgDialog_msg');
  dialogMsg.value = fallback(msg, '');
  dialogMsg.disabled = false;
}

function keypress(evt) {
  if (evt.key === 'Enter' && !evt.shiftKey) {
    evt.preventDefault();
    sendMessage();
  }
}

function captureEnter() {
  if (enterForSendMessage$1) {
    on(dialogMsg, 'keypress', keypress);
  }
}

function getValidateTips() {
  if (!validateTips) {
    const nodes = getElementsByClassName('validateTips', quickMsgDialog);
    if (nodes.length === 1) {
      [validateTips] = nodes;
    }
  }
}

function doValidateTip(text) {
  getValidateTips();
  if (validateTips) {
    setText(text, validateTips);
  }
}

function addRow(index, myBtn, html) {
  const newRow = msgTbl.insertRow(index);
  let newCell = newRow.insertCell(-1);
  insertHtmlBeforeEnd(newCell, myBtn);
  newCell = newRow.insertCell(-1);
  insertHtmlBeforeEnd(newCell, html);
}

function fshButton(classPrefix, label) {
  return `<button class="fshButton ui-corner-all ${classPrefix
  }-button">${label}</button>`;
}

function addTemplateRow(index, text) {
  addRow(index, fshButton('del', 'Del'),
    `<span class="ui-widget-content fshBlck add-template">${
      text}</span>`);
}

function deleteTemplate(target) {
  const myRow = target.parentNode.parentNode.rowIndex;
  msgTbl.deleteRow(myRow);
  fshTemplate.splice(myRow - 2, 1);
  setValueJSON('quickMsg', fshTemplate);
}

function addNewTemplate(target) {
  const templateInput = target.parentNode.nextElementSibling.children[0];
  const templateValue = templateInput.value;
  if (templateValue !== '') {
    const myRow = target.parentNode.parentNode.rowIndex;
    addTemplateRow(myRow, templateValue);
    templateInput.value = '';
    fshTemplate.push(templateValue);
    setValueJSON('quickMsg', fshTemplate);
  }
}

function insertTemplate(target) {
  dialogMsg.value += `${getText(target)
    .replace(/\{playername\}/g, targetPlayer)}\n`;
}

const classEvents = [
  ['del-button', deleteTemplate],
  ['add-button', addNewTemplate],
  ['add-template', insertTemplate],
];

function makeRows(text) { addTemplateRow(-1, text); }

function showMsgTemplate() {
  if (!showingTemplates) {
    getTable();
    fshTemplate.forEach(makeRows);
    addRow(-1,
      fshButton('add', 'Add'),
      '<input id="newTmpl" class="ui-widget-content fshTmpl">');
    showingTemplates = true;
    onclick(msgTbl, classHandler(classEvents));
  }
}

function getFshTemplate() { // jQuery
  if (!fshTemplate) {
    fshTemplate = getValueJSON('quickMsg');
    const buttons = $quickMessageDialog.dialog('option', 'buttons');
    sendMessage = buttons['Send Message'];
  }
}

function openQuickMsgDialog(name, msg, tip) { // jQuery
  getQuickMessageDialog();
  if (quickMsgDialog.classList.contains('ui-dialog-content')) {
    getFshTemplate();
    showMsgTemplate();
    setName(name);
    setMsg(msg);
    captureEnter();
    doValidateTip(fallback(tip, ''));
    $quickMessageDialog.dialog('open');
  }
}

function injectQuickMsgDialogJQ() {
  if (jQueryNotPresent()) { return; }
  enterForSendMessage$1 = getValue('enterForSendMessage');
  window.openQuickMsgDialog = openQuickMsgDialog;
}

function toggleForce(el, force) {
  if (el instanceof Element) {
    el.classList.toggle('fshHide', force);
  }
}

function doServerNode(topbannerStats, miniboxList) {
  const nodeName = getText(miniboxList.children[7]);
  const serverDiv = createDiv({
    className: 'tip-static',
    dataset: { tipped: 'Server' },
    textContent: `Server: ${nodeName}`,
  });
  insertElement(topbannerStats, serverDiv);
}

function doOnlinePlayers(topbannerStats, miniboxList) {
  const playersOnline = miniboxList.children[3].innerHTML;
  const bannerPlayers = topbannerStats.children[0];
  setInnerHtml(`Online: ${playersOnline}`, bannerPlayers);
}

function statBoxesExist(topbannerStats, gameStats) {
  const miniboxList = gameStats.nextElementSibling.children[0];
  if (miniboxList.children.length === 8) {
    doServerNode(topbannerStats, miniboxList);
    doOnlinePlayers(topbannerStats, miniboxList);
    toggleForce(gameStats.parentNode, true);
  }
}

function validStatBoxes(topbannerStats, gameStats) {
  const hidden = topbannerStats
    && hasClass('topbanner-stats-hidden', topbannerStats);
  return !hidden && gameStats;
}

function injectServerNode() {
  const topbannerStats = getElementById('topbanner-stats');
  const gameStats = querySelectorArray('#pCR h3').find(contains('Game Stats'));
  if (validStatBoxes(topbannerStats, gameStats)) {
    statBoxesExist(topbannerStats, gameStats);
  }
}

function getStamVals(staminaMouseover) {
  return /([,0-9]+)\s\/\s([,0-9]+)/.exec(
    valueText(getElementsByClassName('stat-name', staminaMouseover)),
  );
}

function maxStamAt(nextGain, stamVals) {
  return `<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>${
    timeBox(
      valueText(nextGain),
      // get the max hours to still be inside stamina maximum
      Math.floor(
        (intValue(stamVals[2]) - intValue(stamVals[1]))
        / asInt('stat-stamina-gainPerHour'),
      ),
    )}`;
}

function injectStaminaCalculator() {
  const nextGain = getElementsByClassName('stat-stamina-nextGain');
  if (nextGain.length === 0) { return; }
  const staminaMouseover = getElementById('statbar-stamina-tooltip-stamina');
  const stamVals = getStamVals(staminaMouseover);
  insertHtmlBeforeEnd(staminaMouseover, maxStamAt(nextGain, stamVals));
}

function interceptQuickBuff() {
  window.openWindow = fshOpen;
}

function scoutTowerLink() {
  const spoils = getElementById('minibox-spoilsofwar');
  if (spoils) {
    const parent = spoils.children[1].children[0];
    insertHtmlBeforeEnd(parent, `&nbsp;<a href="${scouttowerUrl
    }" class="tip-static" data-tipped="View Scout Report">`
      + '<img id="fshScoutTower" '
      + `src="${cdn}/structures/27.png"></a>`);
  }
}

function preventHcs(evt) {
  evt.stopPropagation();
}

function statbarWrapper(href, id) {
  const character = getElementById(`statbar-${id}`);
  if (!character) { return; }
  const myWrapper = createAnchor({ href });
  const statWrapper = character.parentNode;
  insertElement(myWrapper, character);
  insertElementAfterBegin(statWrapper, myWrapper);
  onclick(myWrapper, preventHcs, true);
}

function statbar() {
  statbarWrapper(profileUrl, 'character');
  statbarWrapper(`${pointsUrl + defSubcmd}reserve`, 'stamina');
  statbarWrapper(blacksmithUrl, 'equipment');
  statbarWrapper(dropItemsUrl, 'inventory');
  statbarWrapper(pointsUrl, 'fsp');
  statbarWrapper(`${cmdUrl}bank`, 'gold');
}

function asyncPThree(fn) { add(3, fn); }

function priorityThree() {
  [
    statbar,
    injectStaminaCalculator,
    injectLevelupCalculator,
    injectMenu,
    injectFSBoxLog,
    interceptQuickBuff,
    injectJoinAllLink,
    changeGuildLogHREF,
    injectHomePageTwoLink,
    injectQuickMsgDialogJQ,
    injectServerNode,
    scoutTowerLink,
  ].forEach(asyncPThree);
}

function superelite() {
  return callApp({ cmd: 'superelite' });
}

// import { $dataAccess } from './_dataAccess';
// import superelite from './fallbacks/superelite';

function daSuperElite() {
  // return $dataAccess(appSe, superelite);
  return superelite();
}

let oldLog;
let timeoutId;
let intervalId;

function disableBackgroundChecks() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = false;
  }
  if (intervalId) {
    window.clearInterval(intervalId);
    intervalId = false;
  }
}

function dataLooksOk(data) {
  return data && data.t;
}

function updateSeLog(serverTime, element) {
  const myTime = serverTime - element.time;
  const mobName = element.creature.name.replace(' (Super Elite)', '');
  if (!oldLog.se[mobName] || oldLog.se[mobName] < myTime) {
    oldLog.se[mobName] = myTime;
  }
}

function processSeData(data) {
  const serverTime = Number(data.t.split(' ')[1]);
  if (!oldLog) { oldLog = { lastUpdate: 0, se: {} }; }
  oldLog.lastUpdate = serverTime;
  const resultAry = data.r;
  if (resultAry) {
    resultAry.forEach(partial(updateSeLog, serverTime));
    set$1('fsh_seLog', oldLog);
  }
}

function gotSe(data) {
  if (dataLooksOk(data)) { processSeData(data); }
}

function getSeLog() { // jQuery.min
  return daSuperElite().then(gotSe);
}

function doBackgroundCheck() {
  disableBackgroundChecks();
  intervalId = window.setInterval(getSeLog, 300000);
  return getSeLog();
}

function whenWasLastCheck() {
  return nowSecs - ((oldLog && oldLog.lastUpdate) || 0);
}

function setupBackgroundCheck() {
  const lastCheckSecs = whenWasLastCheck();
  if (lastCheckSecs >= 600) {
    doBackgroundCheck();
  } else {
    timeoutId = window.setTimeout(doBackgroundCheck,
      (600 - lastCheckSecs) * 1000);
  }
}

function gotLog(data) {
  if (data) { oldLog = data; }
}

function getFshSeLog() { // jQuery.min
  return get$1('fsh_seLog').then(gotLog);
}

function shouldLog() {
  return jQueryPresent() && calf.enableSeTracker && calf.cmd !== 'superelite';
}

function seLog() { // jQuery.min
  if (shouldLog()) {
    getFshSeLog().then(setupBackgroundCheck);
  }
}

function getEnvVars() {
  [
    'enableAllyOnlineList',
    'enableEnemyOnlineList',
    'enableGuildInfoWidgets',
    'enableOnlineAlliesWidgets',
    'enableSeTracker',
    'hideGuildInfoTrade',
    'hideGuildInfoSecureTrade',
    'hideGuildInfoBuff',
    'hideGuildInfoMessage',
    'hideBuffSelected',
    'enableTempleAlert',
    'enableUpgradeAlert',
    'enableComposingAlert',
    'enableActiveBountyList',
    'enableWantedList',
    'wantedGuildMembers',
  ].forEach(getCalfPrefs);
  calf.allyEnemyOnlineRefreshTime = getValue('allyEnemyOnlineRefreshTime') * 1000;
}

function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

function moveRHSBoxToLHS(title) {
  const boxDiv = getElementById(title);
  if (boxDiv) {
    boxDiv.classList.add('pCR');
    insertElement(pCL, boxDiv);
  }
}

function doMoveGuildList() {
  if (getValue('moveGuildList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-guild']);
  }
}

function doMoveAllyList() {
  if (getValue('moveOnlineAlliesList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-allies']);
  }
}

function doMoveFsBox() {
  if (getValue('moveFSBox')) {
    add(3, moveRHSBoxToLHS, ['minibox-fsbox']);
  }
}

function doMoveDailyQuest() {
  if (getValue('moveDailyQuest')) {
    add(3, moveRHSBoxToLHS, ['minibox-daily-quest']);
  }
}

function doMoveXmas() {
  // if (getValue('moveFSBox')) {
  add(3, moveRHSBoxToLHS, ['minibox-xmas']);
  // }
}

function asyncPFour(fn) { add(4, fn); }

function priorityFour() {
  [
    guildActivity,
    seLog,
  ].forEach(asyncPFour);
}

function notHuntMode() {
  if (calf.huntingMode) { return; }
  // move boxes in opposite order that you want them to appear.
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  doMoveXmas
    doMoveXmas();
  }
  executeAll([
    doMoveGuildList,
    doMoveAllyList,
    doMoveDailyQuest,
    doMoveFsBox,
    getEnvVars,
    conditional,
    priorityThree,
    priorityFour,
  ]);
}

function expandMenu(section) {
  if (getValue('expandMenuOnKeyPress')) {
    localStorage.setItem('hcs.nav.openIndex', section);
  }
}

function keyHandlerEvent(func) {
  sendEvent('keyHandler', func);
}

function backpack() {
  keyHandlerEvent('backpack');
  expandMenu('2');
  window.location.href = dropItemsUrl;
}

function profile$1(data) {
  return callApp(extend({ cmd: 'profile' }, data));
}

function view() {
  return profile$1({ subcmd: 'view' });
}

// import { $dataAccess } from './_dataAccess';
// import viewProfile from './fallbacks/viewProfile';

function daViewProfile() {
  // return $dataAccess(appViewProfile, viewProfile);
  return view();
}

const jsonTests = [
  (itemIndex, json) => json,
  (itemIndex, json) => json.s,
  (itemIndex, json) => json.r,
  (itemIndex, json) => json.r.equip_sets,
  (itemIndex, json) => json.r.equip_sets.length > itemIndex,
];

function funcPasses(itemIndex, json, fn) { return fn(itemIndex, json); }

function goodData(itemIndex, json) {
  return jsonTests.every(partial(funcPasses, itemIndex, json));
}

function changeCombatSet(itemIndex, json) {
  if (goodData(itemIndex, json)) {
    const cbsIndex = json.r.equip_sets[itemIndex].id;
    expandMenu('2');
    window.location.href = `${profileUrl + defSubcmd
    }managecombatset&submit=Use&combatSetId=${cbsIndex}`;
  }
}

function combatSetKey(itemIndex) {
  keyHandlerEvent('changeCombatSet');
  daViewProfile().then(partial(changeCombatSet, itemIndex));
}

function createGroup() {
  keyHandlerEvent('createGroup');
  expandMenu('4');
  window.location.href = `${groupsSubcmdUrl}create`;
}

function notWorld(type, href) {
  if (!getElementById('worldPage')) {
    keyHandlerEvent(type);
    window.location.href = href;
  }
}

function doRepair() {
  // do not use repair link for new map
  notWorld('doRepair', `${blacksmithUrl + defSubcmd}repairall`);
}

function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function infoBox(scope) {
  const infoMsg = getElementById('info-msg', scope);
  if (infoMsg) {
    const infoMatch = infoMsg.innerHTML;
    if (infoMatch) {
      return infoMatch.replace(/<br.*/, '');
    }
    return '';
  }
}

function infoBoxFrom(documentText) {
  const doc = createDocument(documentText);
  return infoBox(doc);
}

let goldAmount$1;
let sendGoldonWorld$1;

function doneSendGold(data) {
  const info = infoBoxFrom(data);
  if (info === 'You successfully sent gold!' || info === '') {
    setValue('currentGoldSentTotal',
      parseInt(getValue('currentGoldSentTotal'), 10)
      + parseInt(getValue('goldAmount'), 10));
    GameData.fetch(defFetchPlayerStats);
  }
}

function doSendGold() { // jQuery
  if (!sendGoldonWorld$1) { return; }
  indexAjaxData({
    cmd: 'trade',
    subcmd: 'sendgold',
    xc: window.ajaxXC,
    target_username: $('#HelperSendTo').html(),
    gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g, ''),
  }).then(doneSendGold);
}

function statbarGoldBackground(colour) {
  $('#statbar-gold').css('background-color', colour);
}

function updateSendGoldOnWorld() { // jQuery
  $('#HelperSendTotal').html(addCommas(getValue('currentGoldSentTotal')));
  if (Number(GameData.player().gold) > goldAmount$1) {
    statbarGoldBackground('red');
  } else {
    statbarGoldBackground('inherit');
  }
}

function extraHtml() {
  return '<dt class="stat-gold-sendTo">Send To:</dt>'
    + `<dd id="HelperSendTo">${getValue('goldRecipient')}</dd>`
    + '<dt class="stat-gold-sendAmt">Amount:</dt>'
    + `<dd id="HelperSendAmt">${addCommas(goldAmount$1)}</dd>`
    + '<dt class="stat-gold-sendTo">Send?</dt>'
    + '<dd><input id="HelperSendGold" value="Send!" class="custombutton" '
    + 'type="submit"><input type="hidden" id="xc" value=""</dd>'
    + '<dt class="stat-gold-sendTotal">Total Sent:</dt>'
    + `<dd id="HelperSendTotal">${
      addCommas(getValue('currentGoldSentTotal'))}</dd>`;
}

function prepareSendGoldOnWorld() {
  goldAmount$1 = getValue('goldAmount');
  $('#statbar-gold-tooltip-general').append(extraHtml());
  $('#HelperSendGold').on('click', doSendGold);
  updateSendGoldOnWorld();
  $.subscribe(defPlayerGold, updateSendGoldOnWorld);
}

function injectSendGoldOnWorld() { // jQuery
  sendGoldonWorld$1 = getValue('sendGoldonWorld');
  if (sendGoldonWorld$1) { prepareSendGoldOnWorld(); }
}

function fastWearMgr() {
  if (!('dialogIsClosed' in calf) || calf.dialogIsClosed()) {
    keyHandlerEvent('insertQuickWear');
    jQueryDialog(insertQuickWear);
  }
}

function gotoGuild() {
  keyHandlerEvent('gotoGuild');
  expandMenu('4');
  window.location.href = `${guildSubcmdUrl}manage`;
}

function joinAllGroup() {
  keyHandlerEvent('joinAllGroup');
  expandMenu('4');
  if (!getValue('enableMaxGroupSizeToJoin')) {
    window.location.href = joinallUrl;
  } else {
    window.location.href = joinUnderUrl;
  }
}

function logPage() {
  keyHandlerEvent('logPage');
  expandMenu('2');
  window.location.href = logUrl;
}

function clickThis(el) {
  el.click();
}

function movePage(dir) {
  const dirButton = querySelector(`#pCC input[value="${dir}"]`);
  if (!dirButton) { return; }
  keyHandlerEvent('movePage');
  clickThis(dirButton);
}

function profile$2() {
  keyHandlerEvent('profile');
  expandMenu('2');
  window.location.href = profileUrl;
}

function toWorld() {
  // do not use for new map
  notWorld('toWorld', worldUrl);
}

const keyLookup = [
  ['!', combatSetKey, 0], // Shift+1
  ['@', combatSetKey, 1], // Shift+2
  ['"', combatSetKey, 1], // Shift+2 -- for UK keyboards
  ['#', combatSetKey, 2], // Shift+3
  ['£', combatSetKey, 2], // Shift+3 -- for UK keyboards
  ['$', combatSetKey, 3], // Shift+4
  ['%', combatSetKey, 4], // Shift+5
  ['^', combatSetKey, 5], // Shift+6
  ['&', combatSetKey, 6], // Shift+7
  ['*', combatSetKey, 7], // Shift+8
  ['(', combatSetKey, 8], // Shift+9
  ['0', toWorld], // go to world [0]
  ['<', movePage, '<'], // move to prev page [<]
  ['>', movePage, '>'], // move to next page [>]
  ['G', createGroup], // create group [G]
  ['L', logPage], // Log Page [L]
  ['b', backpack], // backpack [b]
  ['g', gotoGuild], // go to guild [g]
  ['j', joinAllGroup], // join all group [j]
  ['l', logPage], // Log Page [l]
  ['p', profile$2], // profile [p]
  ['r', doRepair], // repair [r]
  ['v', fastWearMgr], // fast wear manager [v]
  ['y', doSendGold], // fast send gold [y]
];

function handleKey(key) {
  const mapping = keyLookup.find((arr) => key === arr[0]);
  if (mapping) { mapping[1](mapping[2]); }
}

const bailOut = [
  (evt) => ['HTML', 'BODY'].every((tag) => evt.target.tagName !== tag),
  /* ignore control, alt and meta keys
  (I think meta is the command key in Macintoshes) */
  (evt) => evt.ctrlKey,
  (evt) => evt.metaKey,
  (evt) => evt.altKey,
];

function doNotHandle(evt) {
  return bailOut.some((fn) => fn(evt));
}

function handleKeyUp(e) {
  if (doNotHandle(e)) { return; }
  handleKey(e.key);
}

function replaceKeyHandler() {
  on(document, 'keyup', handleKeyUp);
}

function prepareEnv() {
  if (getValue('gameHelpLink')) {
    add(3, gameHelpLink$1);
  }
  calf.huntingMode = getValue('huntingMode');
  add(3, replaceKeyHandler);
  notHuntMode();
  if (!getValue('hideHelperMenu')) {
    add(3, injectHelperMenu);
  }
}

function findHcsData() {
  const hcsHtml = getElementById('html');
  if (hcsHtml && hcsHtml.dataset) {
    return hcsHtml.dataset.hcs;
  }
}

function lookForUi(hcsData) {
  const thisJson = jsonParse(hcsData);
  if (thisJson && thisJson['new-ui']) {
    prepareEnv();
  }
}

function lookForHcsData() {
  const hcsData = findHcsData();
  if (hcsData) {
    lookForUi(hcsData);
  }
}

const injectArena = () => { runDefault(import('./arena-d1e5a819.js').then(function (n) { return n.a; })); };
const arenaDoJoin = () => { runDefault(import('./arenaDoJoin-6ed5e7bb.js')); };
const arenaJoin = () => {
  runDefault(import('./arenaJoin-e600f63a.js'));
};
const completedArenas = () => {
  runDefault(import('./completedArenas-620791a6.js'));
};
const setupMoves = () => {
  runDefault(import('./setup-84c642b4.js'));
};
const storeMoves = () => { runDefault(import('./store-84d8284d.js')); };
const results = () => { runDefault(import('./results-deba323e.js')); };

const arena = {
  '-': { '-': injectArena },
  dojoin: { '-': arenaDoJoin },
  join: { '-': arenaJoin },
  completed: { '-': completedArenas },
  pickmove: { '-': storeMoves },
  setup: { '-': setupMoves },
};

// eslint-disable-next-line no-unused-labels, no-labels
devLbl: { //  arena results
  arena.results = { '-': results };
}

const injectAuctionHouse = () => {
  runDefault(import('./injectAuctionHouse-6bcd0f38.js'));
};
const quickCreate = () => {
  runDefault(import('./quickCreate-e6c00db9.js'));
};

var auctionhouse = {
  '-': { '-': injectAuctionHouse },
  quickcreate: { '-': quickCreate },
};

const composingBreakdown = () => { runDefault(import('./breakdown-f81e3847.js')); };
const composingCreate = () => { runDefault(import('./composingCreate-0697ce9d.js')); };
const injectComposing = () => { runDefault(import('./composing-ff39cbba.js')); };

var composing$1 = {
  '-': { '-': injectComposing },
  breakdown: { '-': composingBreakdown },
  create: { '-': composingCreate },
};

const injectAdvisor = () => {
  runDefault(import('./guildAdvisor-7743b628.js'));
};

var advisor = {
  '-': injectAdvisor,
  weekly: injectAdvisor,
};

const injectGroups = () => {
  runDefault(import('./groups-e403f988.js'));
};
const injectGroupStats = () => {
  runDefault(import('./injectGroupStats-23d0c4f0.js'));
};

var groups = {
  viewstats: injectGroupStats,
  joinallgroupsundersize: injectGroups,
  joinall: injectGroups,
  '-': injectGroups,
};

const guildHall = () => { runDefault(import('./hall-32cbd491.js')); };

var hall = {
  '-': guildHall,
  post: injectBioWidgets,
};

const injectGuildAddTagsWidgets = () => {
  runDefault(import('./injectGuildAddTagsWidgets-748b5866.js'));
};
const injectReportPaint = () => {
  runDefault(import('./guildReport-41715dc3.js'));
};

var inventory = {
  report: injectReportPaint,
  addtags: injectGuildAddTagsWidgets,
  removetags: injectGuildAddTagsWidgets,
  storeitems: injectStoreItems,
};

const guildChat = () => { runDefault(import('./guildChat-1de4a19d.js')); };
const guildLog = () => { runDefault(import('./guildLog-409a1068.js')); };
const guildMailbox = () => {
  runDefault(import('./guildMailbox-36502b3c.js'));
};
const injectGuildBank = () => {
  runDefault(import('./injectGuildBank-9aca84b4.js'));
};
const injectGuildRanks = () => {
  runDefault(import('./rank-c985a47f.js'));
};
const injectRPUpgrades = () => {
  runDefault(import('./injectRPUpgrades-d1c7618f.js'));
};
const injectScouttower = () => {
  runDefault(import('./injectScouttower-3c01aa50.js'));
};

var guild$2 = {
  inventory,
  chat: { '-': guildChat },
  dochat: { '-': guildChat },
  log: { '-': guildLog },
  groups,
  manage: { '-': injectGuild },
  advisor,
  history: { '-': injectBioWidgets },
  view: { '-': injectGuild },
  scouttower: { '-': injectScouttower },
  mailbox: { '-': guildMailbox },
  ranks: { '-': injectGuildRanks },
  conflicts: { rpupgrades: injectRPUpgrades },
  bank: { '-': injectGuildBank },
  hall,
};

const itemsView = () => { runDefault(import('./itemsView-7d6460d8.js')); };

var items = {
  '-': { '-': allowBack },
  view: { '-': itemsView },
};

const playerLog = () => { runDefault(import('./playerLog-b55a7362.js')); };
const outbox = () => { runDefault(import('./outbox-8928073a.js')); };

var log$1 = {
  '-': { '-': playerLog },
  outbox: { '-': outbox },
};

const newsFsbox = () => { runDefault(import('./newsFsbox-505b26a4.js')); };
const newsShoutbox = () => { runDefault(import('./newsShoutbox-245484a0.js')); };

var news = {
  fsbox: { '-': newsFsbox },
  shoutbox: { '-': newsShoutbox },
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
};

const unknownPage = () => { runDefault(import('./unknownPage-cea2883c.js')); };

var noCmd = {
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
  '-': { '-': unknownPage },
};

const injectInventoryManagerNew = () => {
  runDefault(import('./inventory-0eea9887.js'));
};
const injectNewGuildLog = () => {
  runDefault(import('./newGuildLog-b47eca3e.js'));
};
const injectNotepad = () => {
  runDefault(import('./injectNotepad-11a83ee8.js'));
};
const injectSaveSettings = () => { runDefault(import('./load-cf6e9a00.js')); };
const reliclist = () => {
  runDefault(import('./reliclist-04ba4b7f.js'));
};
const advisor$1 = () => { runDefault(import('./advisor-79e40a9b.js')); };
const crawler = () => {
  runDefault(import('./crawler-9df91827.js'));
};
const newGuildLog5 = () => {
  runDefault(import('./newGuildLog5-4296ef03.js'));
};
const whosGotWhat = () => {
  runDefault(import('./whosGotWhat-02faffcf.js'));
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
  notepad.advisor = { '-': advisor$1 };
  notepad.crawler = { '-': crawler };
  notepad.whosgotwhat = { '-': whosGotWhat };
}

// eslint-disable-next-line no-unused-labels, no-labels
betaLbl: { //  reliclist
  notepad.reliclist = { '-': reliclist };
}

var profile$3 = {
  '-': { '-': injectProfile },
  managecombatset: { '-': injectProfile },
  report: { '-': injectProfile },
  equipitem: { '-': injectProfile },
  useitem: { '-': injectProfile },
  changebio: { '-': injectBioWidgets },
  dropitems: { '-': injectProfileDropItems },
};

const injectQuestTracker = () => {
  runDefault(import('./injectQuestTracker-92e0a825.js'));
};

var questbook = {
  '-': { '-': injectQuestBookFull },
  atoz: { '-': injectQuestBookFull },
  viewquest: { '-': injectQuestTracker },
};

const showAllQuestSteps = () => {
  runDefault(import('./showAllQuestSteps-96d4a0b8.js'));
};

var quests = {
  '-': { '-': allowBack },
  view: { '-': showAllQuestSteps },
};

const injectScavenging = () => {
  runDefault(import('./scavenging-b76cc7e3.js'));
};

var scavenging = {
  '-': { '-': injectScavenging },
  process: { '-': injectScavenging },
};

const globalQuest = () => { runDefault(import('./globalQuest-1aea4b6d.js')); };
const injectTopRated = () => { runDefault(import('./toprated-565beb0d.js')); };

var toprated = {
  xp: { '-': injectTopRated },
  monthlyxp: { '-': injectTopRated },
  gold: { '-': injectTopRated },
  killstreak: { '-': injectTopRated },
  bounties: { '-': injectTopRated },
  risingstars: { '-': injectTopRated },
  arena: { '-': injectTopRated },
  superelites: { '-': injectTopRated },
  smasher: { '-': injectTopRated },
  globalquest: { '-': globalQuest },
};

const injectTrade = () => { runDefault(import('./trade-cd6e779f.js')); };

var trade = {
  '-': { '-': injectTrade },
  sendgold: { '-': injectTrade },
  createsecure: { '-': injectTrade },
  docreatesecure: { '-': injectTrade },
};

const craftForge = () => { runDefault(import('./craftForge-32bcd0da.js')); };
const injectBank = () => { runDefault(import('./injectBank-c9b834b5.js')); };
const injectBazaar = () => { runDefault(import('./bazaar-e78fbe5b.js')); };
const injectFindPlayer = () => {
  runDefault(import('./injectFindPlayer-e8b8e686.js'));
};
const injectMailbox = () => { runDefault(import('./mailbox-60d86453.js')); };
const injectQuickBuff = () => {
  runDefault(import('./quickBuff-494fd8f6.js'));
};
const injectTitan = () => { runDefault(import('./injectTitan-335996ce.js')); };
const injectSettings = () => {
  runDefault(import('./injectSettings-7878dab5.js'));
};
const injectWorld = () => { runDefault(import('./injectWorld-53e2bab3.js')); };
const ladder = () => { runDefault(import('./ladder-6152a8ef.js')); };
const marketplace = () => { runDefault(import('./marketplace-b1a4bab3.js')); };
const points = () => { runDefault(import('./points-11ef8e9d.js')); };
const superelite$1 = () => { runDefault(import('./superelite-7b4d4efb.js')); };

var pageSwitcher = {
  settings: { '-': { '-': injectSettings } },
  world: { '-': { '-': injectWorld } },
  news,
  arena,
  questbook,
  profile: profile$3,
  auctionhouse,
  guild: guild$2,
  bank: { '-': { '-': injectBank } },
  log: log$1,
  potionbazaar: { '-': { '-': injectBazaar } },
  marketplace: { createreq: { '-': marketplace } },
  quickbuff: { '-': { '-': injectQuickBuff } }, // No ga
  notepad,
  points: { '-': { '-': points } },
  trade,
  titan: { '-': { '-': injectTitan } },
  toprated,
  inventing: { viewrecipe: { '-': inventing } },
  tempinv: { '-': { '-': injectMailbox } },
  findplayer: { '-': { '-': injectFindPlayer } },
  quests, // UFSG
  items, // UFSG
  creatures: { '-': { '-': allowBack } }, // UFSG
  masterrealms: { '-': { '-': allowBack } }, // UFSG
  realms: { '-': { '-': allowBack } }, // UFSG
  relics: { '-': { '-': allowBack } }, // UFSG
  shops: { '-': { '-': allowBack } }, // UFSG
  scavenging,
  temple: { '-': { '-': parseTemplePage } },
  composing: composing$1,
  pvpladder: { '-': { '-': ladder } },
  crafting: { '-': { '-': craftForge } },
  hellforge: { '-': { '-': craftForge } },
  superelite: { '-': { '-': superelite$1 } },
  '-': noCmd,
  combat: { attackplayer: { '-': injectProfile } },
};

let cmd;
let subcmd;
let subcmd2;
let type = '';
let coreFunction;
let functionPath;

function getParam(param) {
  return getUrlParameter(param) || '-';
}

function newSelector(selector) {
  const testCmd = querySelector(selector);
  return (testCmd && testCmd.value) || '-';
}

function isValid() {
  return isObject(pageSwitcher[cmd])
    && isObject(pageSwitcher[cmd][subcmd])
    && isFunction(pageSwitcher[cmd][subcmd][subcmd2]);
}

function testCoreFunction() {
  if (isValid()) {
    return pageSwitcher[cmd][subcmd][subcmd2];
  }
}

function getParamsFromUrl() {
  cmd = getParam('cmd');
  subcmd = getParam('subcmd');
  subcmd2 = getParam('subcmd2');
  if (cmd === 'points') { type = `/${getParam('type')}`; }
}

function getParamsFromPage() {
  cmd = newSelector('input[name="cmd"]');
  subcmd = newSelector('input[name="subcmd"]');
  subcmd2 = newSelector('input[name="subcmd2"]');
}

function setCalfParams() {
  calf.cmd = cmd;
  calf.subcmd = subcmd;
  calf.subcmd2 = subcmd2;
}

function getCoreFunction() {
  if (document.location.search !== '') {
    getParamsFromUrl();
  } else {
    getParamsFromPage();
  }
  setCalfParams();
  functionPath = `${cmd}/${subcmd}/${subcmd2}${type}`;
  coreFunction = testCoreFunction();
}

function devHooks() {
  /* eslint-disable no-console */
  console.log('functionPath', functionPath);
  if (!coreFunction) {
    console.log('No Core Function.');
  } else if (!isFunction(coreFunction)) {
    console.log('Not Core Function.');
  }
  /* eslint-enable no-console */
}

function asyncDispatcher() {
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  asyncDispatcher messages
    devHooks();
  }
  if (isFunction(coreFunction)) {
    screenview(functionPath);
    start('JS Perf', functionPath);
    coreFunction();
    end('JS Perf', functionPath);
  }
}

function runCore() {
  start('JS Perf', 'FSH.runCore');
  initNow();
  initPcc();
  getCoreFunction();
  lookForHcsData();
  add(3, asyncDispatcher);
  isMessageSound();
  /* This must be at the end in order not to
  screw up other findNode calls (Issue 351) */
  doQuickLinks();
  end('JS Perf', 'FSH.runCore');
}

function badEnv() {
  return !isFunction(Object.fromEntries) || !navigator.cookieEnabled;
}

function setVer(fshVer, gmInfo) {
  calf.gmInfo = jsonParse(decodeURIComponent(gmInfo));
  if (calf.gmInfo) {
    calf.fshVer = fshVer;
  } else {
    calf.fshVer = `${fshVer}_native`;
  }
  calf.calfVer = '13';
}

// main event dispatcher
function dispatch(fshVer, gmInfo) {
  start('JS Perf', 'FSH.dispatch');
  if (badEnv()) { return; }
  globalErrorHandler();
  setVer(fshVer, gmInfo);
  setup();
  loadCss('https://localhost:9966/dist/resources/watch/1524/calfSystem.css').then(runCore);
  end('JS Perf', 'FSH.dispatch');
}

export { insertHtmlAfterEnd as $, getElementById as A, setText as B, setInnerHtml as C, getText as D, searchPlayerUrl as E, playerIDRE as F, getValue as G, defCharacterVirtualLevel as H, intValue as I, valueText as J, getElementsByClassName as K, defStatLevel as L, querySelectorArray as M, indexPhp as N, quickbuffUrl as O, insertElementBefore as P, isArray as Q, once as R, querySelector as S, createSpan as T, insertElementAfter as U, formatLastActivity as V, csvSplit as W, getProfile as X, getUrlParameter as Y, clickThis as Z, outputFormat as _, add as a, retryAjax as a$, scouttowerUrl as a0, setValue as a1, sendEvent as a2, jQueryDialog as a3, injectNotepadShowLogs as a4, injectMonsterLog as a5, getCalfPrefs as a6, escapeHtml as a7, playerIdUrl as a8, functionPasses as a9, querySelectorAll as aA, defenderMultiplier as aB, defRelicView as aC, defStatAttack as aD, defStatDefense as aE, defStatArmor as aF, defStatDamage as aG, defStatHp as aH, cdn as aI, arrayFrom as aJ, hasClass as aK, guild as aL, now as aM, padZ as aN, months as aO, defRefreshActionList as aP, defStairway as aQ, defShopPrompt as aR, extend as aS, myStats as aT, defViewCreature as aU, jsonParse as aV, shouldBeArray as aW, executeAll as aX, defFetchPlayerBackpackCount as aY, defControlsKeydown as aZ, injectSendGoldOnWorld as a_, notepadBlankUrl as aa, fallback as ab, addCommas as ac, defFetchPlayerBuffs as ad, playerName$1 as ae, defPlayerBuffs as af, defPlayerUpdate as ag, defTeleport as ah, set$1 as ai, defPvE as aj, get$1 as ak, getArrayByClassName as al, isUndefined as am, isFunction as an, defAfterUpdateActionlist as ao, defFetchWorldRealmDynamic as ap, defFetchWorldRealmActions as aq, hideQTip as ar, openQuickBuffByName as as, worldUrl as at, defSubcmd as au, guideUrl as av, defRealmUpdate as aw, defPlayerLevel as ax, nowSecs as ay, keys as az, defTable as b, insertQuickExtract as b$, places as b0, createLi as b1, mercRE as b2, handleEvent as b3, currentGuildId as b4, isObject as b5, contains as b6, getTextTrim as b7, insertHtmlAfterBegin as b8, server as b9, tradeUrl as bA, secureUrl as bB, attackplayerUrl as bC, ahSearchUrl as bD, rarity as bE, indexAjaxJson as bF, isString as bG, guildLogUrl as bH, GMSTORAGE_PATH as bI, enhancementType as bJ, guildViewUrl as bK, splitTime as bL, lastActivityToDays as bM, daGuildManage as bN, daViewProfile as bO, lastActivityRE as bP, utc as bQ, lvl as bR, vl as bS, cur as bT, max as bU, act as bV, gxp as bW, draggable as bX, defEnableGuildActivityTracker as bY, recallUserUrl as bZ, getCustomUrlParameter as b_, cmdUrl as ba, parseGoldUpgrades as bb, getFshSeLog as bc, oldLog as bd, disableBackgroundChecks as be, doBackgroundCheck as bf, defaults as bg, time as bh, timeEnd as bi, loadCss as bj, infoBox as bk, profile$1 as bl, off as bm, attribType as bn, itemType as bo, arenaUrl as bp, insertHtml as bq, oldActionSpinner as br, parseDateAsTimestamp as bs, playerId as bt, showPlayerUrl as bu, infoBoxFrom as bv, containsText as bw, getTitle as bx, createAnchor as by, doAddIgnore as bz, calf as c, classHandler as c0, pointsUrl as c1, joinallUrl as c2, joinUnderUrl as c3, auctionhouseUrl as c4, insertQuickWear as c5, dropItemsUrl as c6, defStatVl as c7, sendException as c8, fshBuffLog as c9, composingFragmentType as ca, auctionSearchUrl as cb, getValueJSON as cc, setValueJSON as cd, profileUrl as ce, defCmd as cf, indexAjax as cg, composingUrl as ch, defNeedToCompose as ci, defLastComposeCheck as cj, screenview as ck, injectQuestBookFull as cl, inventing as cm, injectGuild as cn, classPair as co, defJoinallgroupsundersize as cp, dispatch as d, createDiv as e, insertElementAfterBegin as f, getElementsByTagName as g, hideElement as h, insertElement as i, jQueryPresent as j, insertHtmlBeforeEnd as k, on as l, itemRE as m, getArrayByTagName as n, onclick as o, pCC as p, entries as q, cElement as r, cmdExport as s, toggleForce as t, partial as u, createDocument as v, indexAjaxData as w, guildSubcmdUrl as x, callApp as y, jQueryNotPresent as z };
//# sourceMappingURL=calfSystem-5ce1fc75.js.map
