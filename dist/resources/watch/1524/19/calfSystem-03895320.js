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

let autoRefferer = false;
let haveRefferer = false;

function isAuto() {
  if (!haveRefferer) {
    const referrer = document.referrer
      .match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    let docRef;
    if (referrer) { [, docRef] = referrer; }
    autoRefferer = refAry.includes(docRef);
    haveRefferer = true;
  }
  return autoRefferer;
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
  ga('fshApp.set', 'screenName', page);
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
  ga('fshApp.set', 'screenName', funcName);
  ga('fshApp.send', 'screenview');
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
const cmdUrl = `${indexPhp}${defCmd}`;
const defSubcmd = '&subcmd=';
const defTargetUsername = '&target_username=';
const notepadBlank = `${defCmd}notepad&blank=1${defSubcmd}`;
const newGuildLogLoc = `${notepadBlank}newguildlog`;
const newGuildLogUrl = `${indexPhp}${newGuildLogLoc}`;
const auctionhouseUrl = `${cmdUrl}auctionhouse`;
const ahSearchUrl = `${auctionhouseUrl}&search=`;
const logUrl = `${cmdUrl}log`;
const doAddIgnore = `${logUrl}${defSubcmd}doaddignore&ignore_username=`;
const profileUrl = `${cmdUrl}profile`;
const playerIdUrl = `${profileUrl}&player_id=`;
const dropItemsUrl = `${profileUrl}${defSubcmd}dropitems`;
const tradeUrl = `${cmdUrl}trade&target_player=`;
const secureUrl = `${cmdUrl}trade${defSubcmd}createsecure${
  defTargetUsername}`;
const arenaUrl = `${cmdUrl}arena${defSubcmd}`;
const notepadBlankUrl = `${indexPhp}${notepadBlank}`;
const auctionSearchUrl = `${notepadBlankUrl}auctionsearch`;
const pointsUrl = `${cmdUrl}points`;
const guildSubcmdUrl = `${cmdUrl}guild${defSubcmd}`;
const guildLogUrl = `${guildSubcmdUrl}log`;
const scouttowerUrl = `${guildSubcmdUrl}scouttower`;
const groupsSubcmdUrl = `${guildSubcmdUrl}groups&subcmd2=`;
const recallUserUrl = `${guildSubcmdUrl}inventory&subcmd2=report&user=`;
const guildViewUrl = `${guildSubcmdUrl}view&guild_id=`;
const joinallUrl = `${groupsSubcmdUrl}joinall`;
const joinUnderUrl = `${groupsSubcmdUrl}${defJoinallgroupsundersize}`;
const worldUrl = `${cmdUrl}world`;
const searchPlayerUrl = `${cmdUrl}findplayer`;
const showPlayerUrl = `${searchPlayerUrl
}&search_show_first=1&search_username=`;
const blacksmithUrl = `${cmdUrl}blacksmith`;
const quickbuffUrl = `${cmdUrl}quickbuff`;
const composingUrl = `${cmdUrl}composing`;
const attackplayerUrl = `${cmdUrl}attackplayer${defTargetUsername}`;
const updateArchiveUrl = `${cmdUrl}${defSubcmd}viewupdatearchive`;
const archiveUrl = `${cmdUrl}${defSubcmd}viewarchive`;
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
const defLastLadderReset = 'lastLadderReset';

const defForm = 'form';
const defTable = 'table';
const defTd = 'td';
const defTr = 'tr';

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

const chatSelector = 'img[title="Chat"], img[oldtitle="Chat"]';
const combatSelector = 'img[title="Combat"], img[oldtitle="Combat"]';
const noteSelector = 'img[title="Notification"], img[oldtitle="Notification"]';
const playerLinkSelector = 'a[href*="&player_id="]';

var lastScavPage="";var lastActiveQuestPage="";var lastNormalActiveQuestPage="";var lastNormalCompletedQuestPage="";var lastNormalNotStartedQuestPage="";var lastSeasonalActiveQuestPage="";var lastSeasonalCompletedQuestPage="";var lastSeasonalNotStartedQuestPage="";var enableLogColoring=false;var enableChatParsing=false;var enableCreatureColoring=false;var showCombatLog=false;var showCreatureInfo=false;var keepLogs=false;var showExtraLinks=false;var huntingBuffs="Doubler,Librarian,Adept Learner,Merchant,Treasure Hunter,Animal Magnetism,Conserve";var huntingBuffsName="default";var huntingBuffs2="Deflect";var huntingBuffs2Name="PvP";var huntingBuffs3="Super Elite Slayer";var huntingBuffs3Name="SE";var showHuntingBuffs=false;var moveFSBox=false;var moveDailyQuest=false;var guildSelf="";var guildSelfMessage="Member of your own guild!";var guildFrnd="";var guildFrndMessage="Do not attack - Guild is friendly!";var guildPast="";var guildPastMessage="Do not attack - You've been in that guild once!";var guildEnmy="";var guildEnmyMessage="Enemy guild. Attack at will!";var goldRecipient="";var goldAmount="";var sendGoldonWorld=false;var hideQuests=false;var hideQuestNames="";var hideRecipes=false;var hideRecipeNames="";var enableGuildInfoWidgets=false;var enableOnlineAlliesWidgets=false;var guildOnlineRefreshTime=300;var hideGuildInfoSecureTrade=false;var hideGuildInfoTrade=false;var hideGuildInfoMessage=false;var hideGuildInfoBuff=false;var buyBuffsGreeting="Hello {playername}, can I buy {buffs} for {cost} please?";var renderSelfBio=false;var bioEditLines=10;var renderOtherBios=false;var playNewMessageSound=false;var showSpeakerOnWorld=false;var defaultMessageSound="https://fallenswordhelper.github.io/fallenswordhelper/audio/sms-alert-2-daniel_simon.wav";var highlightPlayersNearMyLvl=false;var highlightGvGPlayersNearMyLvl=false;var detailedConflictInfo=false;var gameHelpLink=true;var enableAllyOnlineList=false;var enableEnemyOnlineList=false;var allyEnemyOnlineRefreshTime=300;var moveGuildList=false;var moveOnlineAlliesList=false;var hideMatchesForCompletedMoves=false;var doNotKillList="";var enableBioCompressor=false;var currentGoldSentTotal=0;var keepBuffLog=false;var buffLog="";var enableActiveBountyList=false;var bountyListRefreshTime=300;var enableWantedList=false;var wantedNames="";var wantedGuildMembers=false;var bwNeedsRefresh=true;var fsboxlog=false;var fsboxcontent="";var itemRecipient="";var quickLinks="[]";var enableAttackHelper=false;var minGroupLevel=1;var combatEvaluatorBias=0;var huntingMode=false;var enabledHuntingMode="1";var hideRelicOffline=false;var enterForSendMessage=false;var trackKillStreak=false;var storeLastQuestPage=false;var addAttackLinkToLog=false;var showStatBonusTotal=false;var newGuildLogHistoryPages=3;var useNewGuildLog=false;var enhanceChatTextEntry=false;var ajaxifyRankControls=false;var enableMaxGroupSizeToJoin=false;var maxGroupSizeToJoin=11;var enableTempleAlert=false;var enableUpgradeAlert=false;var enableComposingAlert=false;var autoFillMinBidPrice=false;var showPvPSummaryInLog=false;var enableQuickDrink=false;var enhanceOnlineDots=false;var hideBuffSelected=false;var hideHelperMenu=false;var keepHelperMenuOnScreen=true;var draggableHelperMenu=false;var quickLinksTopPx=22;var quickLinksLeftPx=0;var draggableQuickLinks=false;var showNextQuestSteps=true;var showRecallMessages=true;var showRelicMessages=true;var showMercenaryMessages=true;var showGroupCombatMessages=true;var showDonationMessages=true;var showRankingMessages=true;var showGvGMessages=true;var showTaggingMessages=true;var showTitanMessages=true;var showQuickDropLinks=false;var onlinePlayerMinLvl=1;var onlinePlayerMaxLvl=9999;var arenaMinLvl=1;var arenaMaxLvl=9999;var showMonsterLog=false;var lastTempleCheck=0;var needToPray=false;var lastChatCheck="0";var lastGuildLogCheck="0";var lastOutBoxCheck="0";var lastPlayerLogCheck="0";var showAdmin=false;var alliestotal=0;var enemiestotal=0;var footprints=false;var hideNonPlayerGuildLogMessages=false;var listOfAllies="";var listOfEnemies="";var contactList="";var lastUpgradeCheck=0;var needToDoUpgrade=false;var characterVirtualLevel=0;var guildLogoControl=false;var statisticsControl=false;var guildStructureControl=false;var lastMembrListCheck=0;var disableItemColoring=true;var showQuickSendLinks=false;var needToCompose=false;var lastComposeCheck=0;var lastOnlineCheck=0;var bountyList="";var wantedList="";var lowestLevelInTop250=0;var quickMsg="[\"Thank you very much ^_^\",\"Happy hunting, {playername}\"]";var sendClasses="[\"Composed Pots\", \"13699\"], [\"Amber\", \"5611\"], [\"Amethyst Weed\", \"9145\"], [\"Blood Bloom\", \"5563\"], [\"Cerulean Rose\", \"9156\"], [\"Coleoptera Body\", \"9287\"], [\"Dark Shade\", \"5564\"], [\"Deathbloom\", \"9140\"], [\"Deathly Mold\", \"9153\"], [\"Greenskin Fungus\", \"9148\"], [\"Heffle\", \"5565\"], [\"Jademare\", \"5566\"], [\"Ruby Thistle\", \"9143\"], [\"Toad Corpse\",\"9288\"], [\"Trinettle\", \"5567\"], [\"Viridian Vine\", \"9151\"], [\"Mortar & Pestle\", \"9157\"], [\"Beetle Juice\", \"9158\"]";var quickSearchList="[{\"category\":\"Plants\",\"searchname\":\"Amber\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Blood Bloom\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Jademare\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Dark Shade\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Trinettle\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Heffle Wart\",\"nickname\":\"\"},{\"category\":\"Potions\",\"searchname\":\"Sludge Brew\",\"nickname\":\"DC 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Black Death\",\"nickname\":\"DC 225\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Aid\",\"nickname\":\"Assist\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Supreme Doubling\",\"nickname\":\"DB 450\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Acceleration\",\"nickname\":\"DB 500\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Lesser Death Dealer\",\"nickname\":\"DD\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Runic Potion\",\"nickname\":\"FI 250\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of the Bookworm\",\"nickname\":\"Lib 225\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Truth\",\"nickname\":\"EW 1k\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Dull Edge\",\"nickname\":\"DE 25\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Notched Blade\",\"nickname\":\"DE 80\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Death\",\"nickname\":\"DW 125\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Decay\",\"nickname\":\"WI 150\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Fatality\",\"nickname\":\"WI 350\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Annihilation\",\"nickname\":\"DW 150\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of the Wise\",\"nickname\":\"Lib 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Shattering\",\"nickname\":\"SA\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Dragons Blood Potion\",\"nickname\":\"ZK 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Berserkers Potion\",\"nickname\":\"ZK 300\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Fury\",\"nickname\":\"ZK 350\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Supreme Luck\",\"nickname\":\"FI 1k\",\"displayOnAH\":true}]";var arenaMoves="[]";var arenaMatches="[]";var CombatLog="";var hideChampionsGroup=false;var hideElitesGroup=false;var hideSEGroup=false;var hideTitanGroup=false;var hideLegendaryGroup=false;var disableDeactivatePrompts=false;var moveComposingButtons=false;var expandMenuOnKeyPress=false;var disableBreakdownPrompts=false;var collapseNewsArchive=false;var collapseHallPosts=false;var lastmyGuildLogCheck=0;var hideSubLvlCreature=false;var hidePlayerActions=false;var extraProfile="";var textToSearchFor="";var lastLadderReset=0;var disableQuickWearPrompts=false;var enableGuildActivityTracker=false;var enableSeTracker=false;var showTitanInfo=false;var highlightPvpProtection=false;var showBuffInfo=false;var enableHistoryCompressor=false;var enableStamBars=false;var appBad=[0,false];var ajaxifyDestroy=false;var statBarLinks=false;var staminaCalculator=false;var levelUpCalculator=false;var resizeQuickBuff=false;var joinAllLink=false;var pageTwoLinks=false;var addUfsgLinks=false;var trackLadderReset=false;var addServerNode=false;var addScoutTowerLink=false;var storeLastScavPage=false;var recipeManagerLink=false;var medalGuideLink=false;var inventoryManagerLink=false;var buffLogLink=false;var combatLogLink=false;var creatureLogLink=false;var quickLinksLink=false;var auctionSearchLink=false;var onlinePlayersLink=false;var findOtherLink=false;var findBuffsLink=false;var guildInventoryLink=false;var newGuildLogLink=false;var topRatedLink=false;var enableMessageTemplates=false;var wrapGuildChat=false;var colorPlayerNames=false;var addIgnoreLink=false;var changeButtonLabels=false;var notificationWidgets=false;var defaults = {lastScavPage:lastScavPage,lastActiveQuestPage:lastActiveQuestPage,lastNormalActiveQuestPage:lastNormalActiveQuestPage,lastNormalCompletedQuestPage:lastNormalCompletedQuestPage,lastNormalNotStartedQuestPage:lastNormalNotStartedQuestPage,lastSeasonalActiveQuestPage:lastSeasonalActiveQuestPage,lastSeasonalCompletedQuestPage:lastSeasonalCompletedQuestPage,lastSeasonalNotStartedQuestPage:lastSeasonalNotStartedQuestPage,enableLogColoring:enableLogColoring,enableChatParsing:enableChatParsing,enableCreatureColoring:enableCreatureColoring,showCombatLog:showCombatLog,showCreatureInfo:showCreatureInfo,keepLogs:keepLogs,showExtraLinks:showExtraLinks,huntingBuffs:huntingBuffs,huntingBuffsName:huntingBuffsName,huntingBuffs2:huntingBuffs2,huntingBuffs2Name:huntingBuffs2Name,huntingBuffs3:huntingBuffs3,huntingBuffs3Name:huntingBuffs3Name,showHuntingBuffs:showHuntingBuffs,moveFSBox:moveFSBox,moveDailyQuest:moveDailyQuest,guildSelf:guildSelf,guildSelfMessage:guildSelfMessage,guildFrnd:guildFrnd,guildFrndMessage:guildFrndMessage,guildPast:guildPast,guildPastMessage:guildPastMessage,guildEnmy:guildEnmy,guildEnmyMessage:guildEnmyMessage,goldRecipient:goldRecipient,goldAmount:goldAmount,sendGoldonWorld:sendGoldonWorld,hideQuests:hideQuests,hideQuestNames:hideQuestNames,hideRecipes:hideRecipes,hideRecipeNames:hideRecipeNames,enableGuildInfoWidgets:enableGuildInfoWidgets,enableOnlineAlliesWidgets:enableOnlineAlliesWidgets,guildOnlineRefreshTime:guildOnlineRefreshTime,hideGuildInfoSecureTrade:hideGuildInfoSecureTrade,hideGuildInfoTrade:hideGuildInfoTrade,hideGuildInfoMessage:hideGuildInfoMessage,hideGuildInfoBuff:hideGuildInfoBuff,buyBuffsGreeting:buyBuffsGreeting,renderSelfBio:renderSelfBio,bioEditLines:bioEditLines,renderOtherBios:renderOtherBios,playNewMessageSound:playNewMessageSound,showSpeakerOnWorld:showSpeakerOnWorld,defaultMessageSound:defaultMessageSound,highlightPlayersNearMyLvl:highlightPlayersNearMyLvl,highlightGvGPlayersNearMyLvl:highlightGvGPlayersNearMyLvl,detailedConflictInfo:detailedConflictInfo,gameHelpLink:gameHelpLink,enableAllyOnlineList:enableAllyOnlineList,enableEnemyOnlineList:enableEnemyOnlineList,allyEnemyOnlineRefreshTime:allyEnemyOnlineRefreshTime,moveGuildList:moveGuildList,moveOnlineAlliesList:moveOnlineAlliesList,hideMatchesForCompletedMoves:hideMatchesForCompletedMoves,doNotKillList:doNotKillList,enableBioCompressor:enableBioCompressor,currentGoldSentTotal:currentGoldSentTotal,keepBuffLog:keepBuffLog,buffLog:buffLog,enableActiveBountyList:enableActiveBountyList,bountyListRefreshTime:bountyListRefreshTime,enableWantedList:enableWantedList,wantedNames:wantedNames,wantedGuildMembers:wantedGuildMembers,bwNeedsRefresh:bwNeedsRefresh,fsboxlog:fsboxlog,fsboxcontent:fsboxcontent,itemRecipient:itemRecipient,quickLinks:quickLinks,enableAttackHelper:enableAttackHelper,minGroupLevel:minGroupLevel,combatEvaluatorBias:combatEvaluatorBias,huntingMode:huntingMode,enabledHuntingMode:enabledHuntingMode,hideRelicOffline:hideRelicOffline,enterForSendMessage:enterForSendMessage,trackKillStreak:trackKillStreak,storeLastQuestPage:storeLastQuestPage,addAttackLinkToLog:addAttackLinkToLog,showStatBonusTotal:showStatBonusTotal,newGuildLogHistoryPages:newGuildLogHistoryPages,useNewGuildLog:useNewGuildLog,enhanceChatTextEntry:enhanceChatTextEntry,ajaxifyRankControls:ajaxifyRankControls,enableMaxGroupSizeToJoin:enableMaxGroupSizeToJoin,maxGroupSizeToJoin:maxGroupSizeToJoin,enableTempleAlert:enableTempleAlert,enableUpgradeAlert:enableUpgradeAlert,enableComposingAlert:enableComposingAlert,autoFillMinBidPrice:autoFillMinBidPrice,showPvPSummaryInLog:showPvPSummaryInLog,enableQuickDrink:enableQuickDrink,enhanceOnlineDots:enhanceOnlineDots,hideBuffSelected:hideBuffSelected,hideHelperMenu:hideHelperMenu,keepHelperMenuOnScreen:keepHelperMenuOnScreen,draggableHelperMenu:draggableHelperMenu,quickLinksTopPx:quickLinksTopPx,quickLinksLeftPx:quickLinksLeftPx,draggableQuickLinks:draggableQuickLinks,showNextQuestSteps:showNextQuestSteps,showRecallMessages:showRecallMessages,showRelicMessages:showRelicMessages,showMercenaryMessages:showMercenaryMessages,showGroupCombatMessages:showGroupCombatMessages,showDonationMessages:showDonationMessages,showRankingMessages:showRankingMessages,showGvGMessages:showGvGMessages,showTaggingMessages:showTaggingMessages,showTitanMessages:showTitanMessages,showQuickDropLinks:showQuickDropLinks,onlinePlayerMinLvl:onlinePlayerMinLvl,onlinePlayerMaxLvl:onlinePlayerMaxLvl,arenaMinLvl:arenaMinLvl,arenaMaxLvl:arenaMaxLvl,showMonsterLog:showMonsterLog,lastTempleCheck:lastTempleCheck,needToPray:needToPray,lastChatCheck:lastChatCheck,lastGuildLogCheck:lastGuildLogCheck,lastOutBoxCheck:lastOutBoxCheck,lastPlayerLogCheck:lastPlayerLogCheck,showAdmin:showAdmin,alliestotal:alliestotal,enemiestotal:enemiestotal,footprints:footprints,hideNonPlayerGuildLogMessages:hideNonPlayerGuildLogMessages,listOfAllies:listOfAllies,listOfEnemies:listOfEnemies,contactList:contactList,lastUpgradeCheck:lastUpgradeCheck,needToDoUpgrade:needToDoUpgrade,characterVirtualLevel:characterVirtualLevel,guildLogoControl:guildLogoControl,statisticsControl:statisticsControl,guildStructureControl:guildStructureControl,lastMembrListCheck:lastMembrListCheck,disableItemColoring:disableItemColoring,showQuickSendLinks:showQuickSendLinks,needToCompose:needToCompose,lastComposeCheck:lastComposeCheck,lastOnlineCheck:lastOnlineCheck,bountyList:bountyList,wantedList:wantedList,lowestLevelInTop250:lowestLevelInTop250,quickMsg:quickMsg,sendClasses:sendClasses,quickSearchList:quickSearchList,arenaMoves:arenaMoves,arenaMatches:arenaMatches,CombatLog:CombatLog,hideChampionsGroup:hideChampionsGroup,hideElitesGroup:hideElitesGroup,hideSEGroup:hideSEGroup,hideTitanGroup:hideTitanGroup,hideLegendaryGroup:hideLegendaryGroup,disableDeactivatePrompts:disableDeactivatePrompts,moveComposingButtons:moveComposingButtons,expandMenuOnKeyPress:expandMenuOnKeyPress,disableBreakdownPrompts:disableBreakdownPrompts,collapseNewsArchive:collapseNewsArchive,collapseHallPosts:collapseHallPosts,lastmyGuildLogCheck:lastmyGuildLogCheck,hideSubLvlCreature:hideSubLvlCreature,hidePlayerActions:hidePlayerActions,extraProfile:extraProfile,textToSearchFor:textToSearchFor,lastLadderReset:lastLadderReset,disableQuickWearPrompts:disableQuickWearPrompts,enableGuildActivityTracker:enableGuildActivityTracker,enableSeTracker:enableSeTracker,showTitanInfo:showTitanInfo,highlightPvpProtection:highlightPvpProtection,showBuffInfo:showBuffInfo,enableHistoryCompressor:enableHistoryCompressor,enableStamBars:enableStamBars,appBad:appBad,ajaxifyDestroy:ajaxifyDestroy,statBarLinks:statBarLinks,staminaCalculator:staminaCalculator,levelUpCalculator:levelUpCalculator,resizeQuickBuff:resizeQuickBuff,joinAllLink:joinAllLink,pageTwoLinks:pageTwoLinks,addUfsgLinks:addUfsgLinks,trackLadderReset:trackLadderReset,addServerNode:addServerNode,addScoutTowerLink:addScoutTowerLink,storeLastScavPage:storeLastScavPage,recipeManagerLink:recipeManagerLink,medalGuideLink:medalGuideLink,inventoryManagerLink:inventoryManagerLink,buffLogLink:buffLogLink,combatLogLink:combatLogLink,creatureLogLink:creatureLogLink,quickLinksLink:quickLinksLink,auctionSearchLink:auctionSearchLink,onlinePlayersLink:onlinePlayersLink,findOtherLink:findOtherLink,findBuffsLink:findBuffsLink,guildInventoryLink:guildInventoryLink,newGuildLogLink:newGuildLogLink,topRatedLink:topRatedLink,enableMessageTemplates:enableMessageTemplates,wrapGuildChat:wrapGuildChat,colorPlayerNames:colorPlayerNames,addIgnoreLink:addIgnoreLink,changeButtonLabels:changeButtonLabels,notificationWidgets:notificationWidgets};

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

function jQueryPresent() { return isFunction(window.jQuery); }

function onclick(target, listener, options) {
  on(target, 'click', listener, options);
}

function runDefault(prm) {
  prm.then((m) => m.default());
}

const allowBack = () => { runDefault(import('./allowBack-a1a88c78.js')); };
const injectBioWidgets = () => { runDefault(import('./bioWidgets-6730c33b.js')); };
const injectGuild = () => { runDefault(import('./guild-79fb989c.js')); };
const injectProfile = () => { runDefault(import('./profile-3e3c818d.js')); };
const injectProfileDropItems = () => { runDefault(import('./injectProfileDropItems-2e8bf38f.js')); };
const injectQuestBookFull = () => { runDefault(import('./injectQuestBookFull-51cccbcd.js')); };
const injectStoreItems = () => { runDefault(import('./injectStoreItems-15b059d8.js')); };
const inventing = () => { runDefault(import('./inventing-12f2663e.js')); };
const news = () => { runDefault(import('./news-f5b80053.js')); };
const viewArchive = () => { runDefault(import('./viewArchive-3dbf82ab.js')); };

const injectBuffLog = (i) => { import('./injectBuffLog-04d9c1c0.js').then((m) => m.default(i)); };
const injectFsBoxContent = (i) => { import('./injectFsBoxContent-c5a569c7.js').then((m) => m.default(i)); };
const injectMonsterLog = (i) => { import('./monstorLog-7ced9750.js').then((m) => m.default(i)); };
const injectNotepadShowLogs = (i) => { import('./combatLog-76a4f87e.js').then((m) => m.default(i)); };
const injectOnlinePlayers = (i) => { import('./injectOnlinePlayers-580d45b4.js').then((m) => m.default(i)); };
const injectRecipeManager = (i) => { import('./recipeMgr-19d722af.js').then((m) => m.default(i)); };
const insertQuickExtract = (i) => { import('./quickExtract-03022852.js').then((m) => m.default(i)); };
const insertQuickWear = (i) => { import('./quickWear-450cfdf9.js').then((m) => m.default(i)); };

const injectAuctionSearch = (i) => { import('./lists-5744cea5.js').then((m) => m.injectAuctionSearch(i)); };
const injectQuickLinkManager = (i) => { import('./lists-5744cea5.js').then((m) => m.injectQuickLinkManager(i)); };
const injectFindBuffs = (i) => { import('./findBuffs-13a0aac2.js').then((m) => m.injectFindBuffs(i)); };
const injectFindOther = (i) => { import('./findBuffs-13a0aac2.js').then((m) => m.injectFindOther(i)); };

const helperMenuBlob = '<div class="column"><h3>Character</h3><ul>'
  + '<li><span class="fshLink">Buff Log</span></li>'
  + '<li><span class="fshLink">Combat Log</span></li>'
  + '<li><span class="fshLink">Creature Log</span></li>'
  + '<li><span class="fshLink">Recipe Manager</span></li>'
  + '<li><span class="fshLink">Quick Links</span></li>'
  + `<li><a href="${notepadBlankUrl}invmanagernew">Inventory Manager</a></li>`
  + '</ul><h3>Actions</h3><ul>'
  + '<li><span class="fshLink">Find Buffs</span></li>'
  + '<li><span class="fshLink">Find Other</span></li>'
  + '<li><span class="fshLink">Online Players</span></li>'
  + '<li><span class="fshLink">AH Quick Search</span></li>'
  + '</ul><h3>Guild</h3><ul>'
  + `<li><a href="${notepadBlankUrl}guildinvmgr">Guild Inventory</a></li>`
  + `<li><a href="${newGuildLogUrl}">New Guild Log</a></li>`
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

function execute(fn) {
  fn();
}

function executeAll(ary) {
  ary.forEach(execute);
}

function getCalfPrefs(pref) { calf[pref] = getValue(pref); }

const fromEntries = (entries) => Object.fromEntries(entries);

function jQueryNotPresent() { return !isFunction(window.jQuery); }

function querySelector(selector, scope) {
  if (scope) { return scope.querySelector(selector); }
  return document.querySelector(selector);
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

var theLinks = ["recipeManagerLink","medalGuideLink","inventoryManagerLink","buffLogLink","combatLogLink","creatureLogLink","quickLinksLink","auctionSearchLink","onlinePlayersLink","findOtherLink","findBuffsLink","guildInventoryLink","newGuildLogLink","topRatedLink"];

function updateQuestLink() {
  const lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (getValue('storeLastQuestPage') && lastActiveQuestPage.length > 0) {
    getElementById('nav-character-questbook').href = lastActiveQuestPage;
  }
}

function updateScavLink() {
  const lastScavPage = getValue('lastScavPage');
  if (getValue('storeLastScavPage') && lastScavPage.length > 0) {
    getElementById('nav-actions-artisanship-scavenging').href = lastScavPage;
  }
}

function updateLinks() {
  updateQuestLink();
  updateScavLink();
}

function getLinkConfig(theNav, myNav) {
  const linkConfig = theLinks.map((c) => [c, getValue(c)]);
  if (linkConfig.some(([, b]) => b)) {
    import('./injectItems-c6c86283.js')
      .then((m) => m.default(theNav, myNav, fromEntries(linkConfig)));
  }
}

function doAccordion() {
  const [theNav, myNav] = preFlight();
  if (theNav && myNav) {
    updateLinks();
    getLinkConfig(theNav, myNav);
    navMenu(myNav);
  }
}

function injectMenu() {
  if (!pCL || jQueryNotPresent()) { return; }
  doAccordion();
}

var undefined$6 = undefined;

function getElementsByClassName(names, element) {
  if (element) { return element.getElementsByClassName(names); }
  return document.getElementsByClassName(names);
}

let quickMsgDialog;

function getQuickMessageDialog() {
  if (!quickMsgDialog) {
    quickMsgDialog = getElementById('quickMessageDialog');
  }
  return quickMsgDialog;
}

function setText(text, node) {
  if (node instanceof Node) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = String(text);
  }
}

let validateTips;

function getValidateTips() {
  if (!validateTips) {
    const nodes = getElementsByClassName('validateTips',
      getQuickMessageDialog());
    if (nodes.length === 1) {
      [validateTips] = nodes;
    }
  }
  return validateTips;
}

function doValidateTip(text) {
  if (getValidateTips()) {
    setText(fallback(text, ''), validateTips);
  }
}

let dialogMsg;

function getMsg() {
  if (!dialogMsg) {
    dialogMsg = getElementById('quickMsgDialog_msg');
  }
  return dialogMsg;
}

let enterForSendMessage$1;
let handlerEnabled;
let sendMessage;

function getSendMessage() { // jQuery
  if (!sendMessage) {
    const buttons = $(getQuickMessageDialog()).dialog('option', 'buttons');
    sendMessage = buttons['Send Message'];
  }
  return sendMessage;
}

function getEnterForSendMessage() {
  if (isUndefined(enterForSendMessage$1)) {
    enterForSendMessage$1 = getValue('enterForSendMessage');
  }
  return enterForSendMessage$1;
}

function keypress(evt) {
  if (evt.key === 'Enter' && !evt.shiftKey) {
    evt.preventDefault();
    getSendMessage()();
  }
}

function sendOnEnter() {
  if (getEnterForSendMessage() && !handlerEnabled) {
    on(getMsg(), 'keypress', keypress);
    handlerEnabled = true;
  }
}

let targetPlayer;

function getName() {
  return targetPlayer;
}

function setName(name) {
  targetPlayer = name;
  setText(name, getElementById('quickMsgDialog_targetUsername'));
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

function setValueJSON(name, value) {
  setValue(name, JSON.stringify(value));
}

let fshTemplate;
let msgTbl;
let showingTemplates;

function getFshTemplate() {
  if (!fshTemplate) {
    fshTemplate = getValueJSON('quickMsg');
  }
  return fshTemplate;
}

function getTable() {
  if (!msgTbl) {
    msgTbl = getQuickMessageDialog().lastElementChild;
  }
  return msgTbl;
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

function insertTemplate(target) {
  getMsg().value += `${getText(target)
    .replace(/\{playername\}/g, getName())}\n`;
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

const classEvents = [
  ['del-button', deleteTemplate],
  ['add-button', addNewTemplate],
  ['add-template', insertTemplate],
];

function makeRows(text) { addTemplateRow(-1, text); }

function showMsgTemplate() {
  if (getValue('enableMessageTemplates') && !showingTemplates) {
    onclick(getTable(), classHandler(classEvents));
    getFshTemplate().forEach(makeRows);
    addRow(-1,
      fshButton('add', 'Add'),
      '<input id="newTmpl" class="ui-widget-content fshTmpl">');
    showingTemplates = true;
  }
}

function setMsg(msg) {
  const dialogMsg = getMsg();
  dialogMsg.value = fallback(msg, '');
  dialogMsg.disabled = false;
}

function openQuickMsgDialog(name, msg, tip) { // jQuery
  const quickMsgDialog = getQuickMessageDialog();
  if (quickMsgDialog.classList.contains('ui-dialog-content')) {
    setName(name);
    setMsg(msg);
    doValidateTip(tip);
    showMsgTemplate();
    sendOnEnter();
    $(quickMsgDialog).dialog('open');
  }
}

// enterOnMsgSend
// renderSelfBio
// renderOtherBios
// enableChatParsing
// enableMessageTemplates

function injectQuickMsgDialogJQ() {
  if (jQueryNotPresent()) { return; }
  window.openQuickMsgDialog = openQuickMsgDialog;
}

function moveUp(title) {
  import('./moveRHSBoxUpOnRHS-a3c00a6c.js').then((m) => m.default(title));
}

function moveLeft(title) {
  import('./moveRHSBoxToLHS-c6221038.js').then((m) => m.default(title));
}

function doMoveGuildList() {
  if (getValue('moveGuildList')) {
    moveUp('minibox-guild');
  }
}

function doMoveAllyList() {
  if (getValue('moveOnlineAlliesList')) {
    moveUp('minibox-allies');
  }
}

function doMoveFsBox() {
  if (getValue('moveFSBox')) {
    moveLeft('minibox-fsbox');
  }
}

function doMoveDailyQuest() {
  if (getValue('moveDailyQuest')) {
    moveLeft('minibox-daily-quest');
  }
}

// function doMoveXmas() {
//   if (getValue('moveXmasBox')) {
//     moveLeft('minibox-xmas');
//   }
// }

function callAllyEnemy() {
  if (calf.enableAllyOnlineList
      || calf.enableEnemyOnlineList) {
    runDefault(import('./allyEnemy-637a0987.js'));
  }
}

function callBounties() {
  if (calf.enableWantedList
      || calf.enableActiveBountyList) {
    runDefault(import('./activeWantedBounties-5ae125b3.js'));
  }
}

function callGuildInfo() {
  if (calf.enableGuildInfoWidgets) {
    runDefault(import('./addGuildInfoWidgets-cece159d.js'));
  }
}

function callAllies() {
  if (calf.enableOnlineAlliesWidgets) {
    runDefault(import('./addOnlineAlliesWidgets-ea4b56fb.js'));
  }
}

function callTemple() {
  if (calf.enableTempleAlert) {
    runDefault(import('./injectTempleAlert-0a5103c7.js'));
  }
}

function callUpgrade() {
  if (calf.enableUpgradeAlert) {
    runDefault(import('./injectUpgradeAlert-553579ee.js'));
  }
}

function callComposing() {
  if (calf.enableComposingAlert) {
    runDefault(import('./injectComposeAlert-b9fd35a5.js'));
  }
}

function statbar() {
  if (getValue('statBarLinks')) {
    runDefault(import('./statBar-e829785d.js'));
  }
}

function staminaCalc() {
  if (getValue('staminaCalculator')) {
    runDefault(import('./injectStaminaCalculator-00e38ac0.js'));
  }
}

function levelCalc() {
  if (getValue('levelUpCalculator')) {
    runDefault(import('./injectLevelupCalculator-10bde417.js'));
  }
}

function fsBoxLog() {
  if (getValue('fsboxlog')) {
    runDefault(import('./injectFSBoxLog-0bce0422.js'));
  }
}

function expandQb() {
  if (getValue('resizeQuickBuff')) {
    runDefault(import('./interceptQuickBuff-efe1fa82.js'));
  }
}

function joinAll() {
  if (getValue('joinAllLink')) {
    runDefault(import('./injectJoinAllLink-0a460408.js'));
  }
}

function guildLogHref() {
  if (getValue('useNewGuildLog')) {
    runDefault(import('./changeGuildLogHREF-979005d6.js'));
  }
}

function gameStats() {
  if (getValue('addServerNode')) {
    runDefault(import('./injectServerNode-dff3b075.js'));
  }
}

function scoutTower() {
  if (getValue('addScoutTowerLink')) {
    runDefault(import('./scoutTowerLink-256d556b.js'));
  }
}

function guildActivityTracker() {
  if (jQueryPresent() && getValue(defEnableGuildActivityTracker)) {
    runDefault(import('./guildActivity-dbe8f01b.js'));
  }
}

function seTracker() {
  if (jQueryPresent() && calf.enableSeTracker && calf.cmd !== 'superelite') {
    import('./seLog-c2141ce2.js').then((m) => m.seLog());
  }
}

// move boxes in opposite order that you want them to appear.
const p3functions = [
  doMoveGuildList,
  doMoveAllyList,
  doMoveDailyQuest,
  doMoveFsBox,
  callAllyEnemy,
  callBounties,
  callGuildInfo,
  callAllies,
  callTemple,
  callUpgrade,
  callComposing,
  injectMenu,
  injectQuickMsgDialogJQ,
  statbar,
  staminaCalc,
  levelCalc,
  fsBoxLog,
  expandQb,
  joinAll,
  guildLogHref,
  gameStats,
  scoutTower,
  guildActivityTracker,
  seTracker,
];

function asyncPThree(fn) { add(3, fn); }

function priorityThree() {
  // eslint-disable-next-line no-unused-labels, no-labels
  // devLbl: { //  doMoveXmas
  //   doMoveXmas();
  // }
  p3functions.forEach(asyncPThree);
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
  calf.allyEnemyOnlineRefreshTime = getValue('allyEnemyOnlineRefreshTime')
    * 1000;
}

const notHuntModeFunctions = [
  getEnvVars,
  priorityThree,
];

function notHuntMode() {
  if (calf.huntingMode) { return; }
  executeAll(notHuntModeFunctions);
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

function keys(obj) {
  return Object.keys(obj);
}

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

function profile(data) {
  return callApp(extend({ cmd: 'profile' }, data));
}

function view() {
  return profile({ subcmd: 'view' });
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

function indexAjax(options) {
  mixin(options, { url: indexPhp, data: { no_mobile: 1 } });
  return retryAjax(options);
}

function indexAjaxData(data) {
  return indexAjax({ data });
}

function createDocument(details) {
  // Use DOMParser to prevent img src tags downloading
  const parser = new DOMParser();
  const doc = parser.parseFromString(details, 'text/html');
  return doc;
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

let sendGoldonWorld$1;

function initSendGoldOnWorld() {
  sendGoldonWorld$1 = getValue('sendGoldonWorld');
}

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

function profile$1() {
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
  ['p', profile$1], // profile [p]
  ['r', doRepair], // repair [r]
  ['v', fastWearMgr], // fast wear manager [v]
  ['y', doSendGold], // fast send gold [y]
];

function handleKey(key) {
  const mapping = keyLookup.find(([mapped]) => key === mapped);
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

const injectArena = () => { runDefault(import('./arena-2b818dc1.js').then(function (n) { return n.a; })); };
const arenaDoJoin = () => { runDefault(import('./arenaDoJoin-48031abc.js')); };
const arenaJoin = () => {
  runDefault(import('./arenaJoin-b1b3b681.js'));
};
const completedArenas = () => {
  runDefault(import('./completedArenas-53c6ce4f.js'));
};
const setupMoves = () => {
  runDefault(import('./setup-3bb01ee5.js'));
};
const storeMoves = () => { runDefault(import('./store-73805016.js')); };
const results = () => { runDefault(import('./results-c8a6ef6e.js')); };

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
  runDefault(import('./injectAuctionHouse-6e4aac08.js'));
};
const quickCreate = () => {
  runDefault(import('./quickCreate-1594d1b1.js'));
};

var auctionhouse = {
  '-': { '-': injectAuctionHouse },
  quickcreate: { '-': quickCreate },
};

const composingBreakdown = () => { runDefault(import('./breakdown-eda89ec6.js')); };
const composingCreate = () => { runDefault(import('./composingCreate-4b62fffe.js')); };
const injectComposing = () => { runDefault(import('./composing-d5640eb1.js')); };

var composing = {
  '-': { '-': injectComposing },
  breakdown: { '-': composingBreakdown },
  create: { '-': composingCreate },
};

const injectAdvisor = () => {
  runDefault(import('./guildAdvisor-e7a1e117.js'));
};

var advisor = {
  '-': injectAdvisor,
  weekly: injectAdvisor,
};

const injectGroups = () => {
  runDefault(import('./groups-bd7f98c8.js'));
};
const injectGroupStats = () => {
  runDefault(import('./injectGroupStats-3f30c9fc.js'));
};

var groups = {
  viewstats: injectGroupStats,
  joinallgroupsundersize: injectGroups,
  joinall: injectGroups,
  '-': injectGroups,
};

const guildHall = () => { runDefault(import('./hall-8021cefc.js')); };

var hall = {
  '-': guildHall,
  post: injectBioWidgets,
};

const injectGuildAddTagsWidgets = () => {
  runDefault(import('./injectGuildAddTagsWidgets-595fe570.js'));
};
const injectReportPaint = () => {
  runDefault(import('./guildReport-0d6bdd75.js'));
};

var inventory = {
  report: injectReportPaint,
  addtags: injectGuildAddTagsWidgets,
  removetags: injectGuildAddTagsWidgets,
  storeitems: injectStoreItems,
};

const guildChat = () => { runDefault(import('./guildChat-e493a05a.js')); };
const guildLog = () => { runDefault(import('./guildLog-130ab506.js')); };
const guildMailbox = () => {
  runDefault(import('./guildMailbox-0367bda0.js'));
};
const injectGuildBank = () => {
  runDefault(import('./injectGuildBank-0b0aae8e.js'));
};
const injectGuildRanks = () => {
  runDefault(import('./rank-8bd430cb.js'));
};
const injectRPUpgrades = () => {
  runDefault(import('./injectRPUpgrades-c40870c7.js'));
};
const injectScouttower = () => {
  runDefault(import('./injectScouttower-4b1c7e70.js'));
};

var guild = {
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

function isNewMap() {
  return jQueryPresent() && getElementById('worldPage') && window.GameData;
}

function injectWorld() {
  if (isNewMap()) {
    runDefault(import('./newMap-5e92a414.js'));
  }
}

const itemsView = () => { runDefault(import('./itemsView-0513076b.js')); };

var items = {
  '-': { '-': allowBack },
  view: { '-': itemsView },
};

const playerLog = () => { runDefault(import('./playerLog-41f04f8f.js')); };
const outbox = () => { runDefault(import('./outbox-b9c4d865.js')); };

var log$1 = {
  '-': { '-': playerLog },
  outbox: { '-': outbox },
};

const newsFsbox = () => { runDefault(import('./newsFsbox-b23558d7.js')); };
const newsShoutbox = () => { runDefault(import('./newsShoutbox-4d7b27ee.js')); };

var news$1 = {
  fsbox: { '-': newsFsbox },
  '-': { '-': news },
  shoutbox: { '-': newsShoutbox },
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
};

const unknownPage = () => { runDefault(import('./unknownPage-4b12893c.js')); };

var noCmd = {
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
  '-': { '-': unknownPage },
};

const injectInventoryManagerNew = () => {
  runDefault(import('./inventory-2eb88805.js'));
};
const injectNewGuildLog = () => {
  runDefault(import('./newGuildLog-ee49e547.js'));
};
const injectNotepad = () => {
  runDefault(import('./injectNotepad-1e4e7eba.js'));
};
const injectSaveSettings = () => { runDefault(import('./load-e4334786.js')); };
const reliclist = () => {
  runDefault(import('./reliclist-7e03fdf8.js'));
};
const advisor$1 = () => { runDefault(import('./advisor-d950e3e0.js')); };
const crawler = () => {
  runDefault(import('./crawler-afa8da96.js'));
};
const newGuildLog5 = () => {
  runDefault(import('./newGuildLog5-63d7b916.js'));
};
const whosGotWhat = () => {
  runDefault(import('./whosGotWhat-0b1e8e48.js'));
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

function hideQTip(el) {
  $(el).qtip('hide');
}

function insertHtmlAfterBegin(parent, html) {
  insertHtml(parent, 'afterbegin', html);
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

var profile$2 = {
  '-': { '-': injectProfile },
  managecombatset: { '-': injectProfile },
  report: { '-': injectProfile },
  equipitem: { '-': injectProfile },
  useitem: { '-': injectProfile },
  changebio: { '-': injectBioWidgets },
  dropitems: { '-': injectProfileDropItems },
};

const injectQuestTracker = () => {
  runDefault(import('./injectQuestTracker-09d890ff.js'));
};

var questbook = {
  '-': { '-': injectQuestBookFull },
  atoz: { '-': injectQuestBookFull },
  viewquest: { '-': injectQuestTracker },
};

const showAllQuestSteps = () => {
  runDefault(import('./showAllQuestSteps-4a97b449.js'));
};

var quests = {
  '-': { '-': allowBack },
  view: { '-': showAllQuestSteps },
};

const injectScavenging = () => {
  runDefault(import('./scavenging-b49e3116.js'));
};

var scavenging = {
  '-': { '-': injectScavenging },
  process: { '-': injectScavenging },
};

const globalQuest = () => { runDefault(import('./globalQuest-7887b461.js')); };
const injectTopRated = () => { runDefault(import('./toprated-38a7a861.js')); };

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

const injectTrade = () => { runDefault(import('./trade-0081738a.js')); };

var trade = {
  '-': { '-': injectTrade },
  sendgold: { '-': injectTrade },
  createsecure: { '-': injectTrade },
  docreatesecure: { '-': injectTrade },
};

const craftForge = () => { runDefault(import('./craftForge-814e3f00.js')); };
const injectBank = () => { runDefault(import('./injectBank-1afdf6ce.js')); };
const injectBazaar = () => { runDefault(import('./bazaar-aa4002df.js')); };
const injectFindPlayer = () => {
  runDefault(import('./injectFindPlayer-f2b8a6c8.js'));
};
const injectMailbox = () => { runDefault(import('./mailbox-6da963fb.js')); };
const injectQuickBuff = () => {
  runDefault(import('./quickBuff-181f4b67.js'));
};
const injectTitan = () => { runDefault(import('./injectTitan-0cd64d13.js')); };
const injectSettings = () => {
  runDefault(import('./injectSettings-0c29a5df.js'));
};
const ladder = () => { runDefault(import('./ladder-a83a74e6.js')); };
const marketplace = () => { runDefault(import('./marketplace-5b9f6231.js')); };
const points = () => { runDefault(import('./points-af61a52e.js')); };
const superelite = () => { runDefault(import('./superelite-e04242d6.js')); };

var pageSwitcher = {
  settings: { '-': { '-': injectSettings } },
  world: { '-': { '-': injectWorld } },
  news: news$1,
  arena,
  questbook,
  profile: profile$2,
  auctionhouse,
  guild,
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
  composing,
  pvpladder: { '-': { '-': ladder } },
  crafting: { '-': { '-': craftForge } },
  hellforge: { '-': { '-': craftForge } },
  superelite: { '-': { '-': superelite } },
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
  calf.calfVer = '19';
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

export { playerIdUrl as $, getText as A, searchPlayerUrl as B, playerIDRE as C, getValue as D, defCharacterVirtualLevel as E, getElementsByClassName as F, defStatLevel as G, querySelectorArray as H, indexPhp as I, defForm as J, quickbuffUrl as K, isArray as L, once as M, querySelector as N, getUrlParameter as O, clickThis as P, insertHtml as Q, nowSecs as R, scouttowerUrl as S, setValue as T, sendEvent as U, jQueryDialog as V, injectNotepadShowLogs as W, injectMonsterLog as X, getCalfPrefs as Y, escapeHtml as Z, theLinks as _, add as a, defTr as a$, notepadBlankUrl as a0, fallback as a1, contains as a2, arrayFrom as a3, getTextTrim as a4, insertHtmlAfterBegin as a5, now as a6, defLastLadderReset as a7, server as a8, cmdUrl as a9, sendGoldonWorld$1 as aA, defStatAttack as aB, defStatDefense as aC, defStatArmor as aD, defStatDamage as aE, defStatHp as aF, cdn as aG, hasClass as aH, months as aI, defRefreshActionList as aJ, defStairway as aK, defShopPrompt as aL, defViewCreature as aM, jsonParse as aN, executeAll as aO, defFetchPlayerBackpackCount as aP, defControlsKeydown as aQ, retryAjax as aR, places as aS, mercRE as aT, handleEvent as aU, fromEntries as aV, isObject as aW, defaults as aX, time as aY, timeEnd as aZ, loadCss as a_, pointsUrl as aa, querySelectorAll as ab, sendException as ac, parseError as ad, defFetchPlayerBuffs as ae, defPlayerBuffs as af, defPlayerUpdate as ag, defTeleport as ah, defPvE as ai, isUndefined as aj, isFunction as ak, defAfterUpdateActionlist as al, defFetchWorldRealmDynamic as am, defFetchWorldRealmActions as an, hideQTip as ao, worldUrl as ap, defSubcmd as aq, guideUrl as ar, defRealmUpdate as as, defPlayerLevel as at, keys as au, defenderMultiplier as av, defRelicView as aw, doSendGold as ax, defPlayerGold as ay, initSendGoldOnWorld as az, createDiv as b, parseTemplePage as b$, infoBox as b0, profile as b1, off as b2, attribType as b3, itemType as b4, arenaUrl as b5, oldActionSpinner as b6, defTd as b7, playerId as b8, showPlayerUrl as b9, joinUnderUrl as bA, auctionhouseUrl as bB, insertQuickWear as bC, dropItemsUrl as bD, defStatVl as bE, updateArchiveUrl as bF, archiveUrl as bG, fshBuffLog as bH, composingFragmentType as bI, auctionSearchUrl as bJ, getValueJSON as bK, setValueJSON as bL, profileUrl as bM, defCmd as bN, composingUrl as bO, defNeedToCompose as bP, defLastComposeCheck as bQ, screenview as bR, news as bS, injectQuestBookFull as bT, inventing as bU, injectGuild as bV, classPair as bW, defJoinallgroupsundersize as bX, pCR as bY, pCL as bZ, bountyUrl as b_, infoBoxFrom as ba, containsText as bb, attackplayerUrl as bc, chatSelector as bd, doAddIgnore as be, combatSelector as bf, playerLinkSelector as bg, noteSelector as bh, tradeUrl as bi, secureUrl as bj, ahSearchUrl as bk, rarity as bl, isString as bm, guildLogUrl as bn, GMSTORAGE_PATH as bo, enhancementType as bp, guildViewUrl as bq, daViewProfile as br, lastActivityRE as bs, defEnableGuildActivityTracker as bt, draggable as bu, recallUserUrl as bv, getCustomUrlParameter as bw, insertQuickExtract as bx, classHandler as by, joinallUrl as bz, calf as c, displayDisconnectedFromGodsMessage as c0, blacksmithUrl as c1, defStatbarLevel as c2, injectFsBoxContent as c3, newGuildLogLoc as c4, newGuildLogUrl as c5, injectAuctionSearch as c6, injectOnlinePlayers as c7, injectFindOther as c8, injectFindBuffs as c9, injectRecipeManager as ca, injectBuffLog as cb, injectQuickLinkManager as cc, dispatch as cd, defTable as d, insertHtmlBeforeEnd as e, on as f, getElementsByTagName as g, itemRE as h, insertElement as i, jQueryPresent as j, getArrayByTagName as k, entries as l, cElement as m, extend as n, onclick as o, pCC as p, indexAjax as q, partial as r, createDocument as s, indexAjaxData as t, guildSubcmdUrl as u, callApp as v, jQueryNotPresent as w, getElementById as x, setText as y, setInnerHtml as z };
//# sourceMappingURL=calfSystem-03895320.js.map
