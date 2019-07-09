(function () {
  'use strict';

  function fallback(a, b) {
    return a || b;
  }

  const isArray = e => Array.isArray(e);

  function isType(e, t) {return typeof e === t;}

  function isFunction(e) {return isType(e, 'function');}

  function isUndefined(e) {return isType(e, 'undefined');}

  function on(target, type, listener, options) {
    if (target instanceof EventTarget) {
      target.addEventListener(type, listener, options);
    }
  }

  function parseStack(e) {
    var concatStack = e.stack.replace(/\n +/g, '|');
    if (e.stack.includes(e.message)) {
      return concatStack;
    }
    return e.message + '|' + concatStack;
  }

  function parseError(e) {
    if (e.stack) {return parseStack(e);}
    if (e.message) {return e.message;}
    return String(e);
  }

  function getElementById(id, doc) {
    if (doc) {return doc.getElementById(id);}
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

  var timers = {};
  var footWrap;

  function getFootWrap() {
    if (!footWrap) {footWrap = getElementById('foot-wrap');}
    return footWrap;
  }

  function log(text, value) {
    if (getFootWrap()) {
      insertHtmlBeforeEnd(footWrap,
        '<br>' + text + ': ' + value + ' (' + typeof value + ')');
    }
  }

  function time(name) {
    if (name) {timers[name] = performance.now() * 1000;}
  }

  function timeEnd(name) {
    if (timers[name]) {
      log(name, Math.round(performance.now() * 1000 -
        timers[name]) / 1000 + 'ms');
      delete timers[name];
    }
  }

  function getText(node) {
    if (node instanceof Node) {
      return node.textContent;
    }
  }

  var thePlayerId;

  function playerId() {
    if (!thePlayerId) {
      thePlayerId = Number(
        getText(getElementById('holdtext'))
          .match(/fallensword.com\/\?ref=(\d+)/)[1]
      );
    }
    return thePlayerId;
  }

  var times = {};
  var refAry = ['pagereboot.com', 'refreshthing.com', 'refreshthis.com',
    'lazywebtools.co.uk'];
  var urlPatch = [
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
    [/\?ref=[0-9]+/]
  ];

  function isAuto() {
    var docRef = document.referrer
      .match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    if (docRef) {docRef = docRef[1];}
    return refAry.includes(docRef);
  }

  function noGa() {
    return isAuto() || isUndefined(window.ga);
  }

  function start(category, variable, label) {
    if (noGa()) {return;}
    times[category + ':' + variable + ':' + label] =
      performance.now() * 1000;
  }

  function sendTiming(category, variable, label) {
    var myTime = Math.round(performance.now() * 1000 -
      times[category + ':' + variable + ':' + label]) / 1000;
    if (myTime > 10) {
      ga('fshApp.send', 'timing', category, variable, Math.round(myTime),
        label);
    }
    log(variable, myTime + 'ms');
  }

  function end(category, variable, label) {
    if (noGa()) {return;}
    sendTiming(category, variable, label);
  }

  function stripExtra(prev, curr) {
    return prev.replace(curr[0], curr[1] || '');
  }

  function fixupUrl() {
    var origPath = window.location.pathname + window.location.search;
    var page = urlPatch.reduce(stripExtra, origPath);
    ga('fsh.set', 'page', page);
  }

  function setup() {
    if (noGa()) {return;}

    ga('create', 'UA-76488113-1', 'auto', 'fshApp', {
      userId: playerId(),
      siteSpeedSampleRate: 10
    });
    ga('fshApp.set', 'appName', 'fshApp');
    ga('fshApp.set', 'appVersion', FSH.version + '(' + FSH.calf + ')');
    ga('create', 'UA-76488113-2', 'auto', 'fsh', {
      userId: playerId(),
      siteSpeedSampleRate: 10
    });
    fixupUrl();
    ga('fsh.send', 'pageview');
  }

  function screenview(funcName) {
    if (noGa()) {return;}
    ga('fshApp.send', 'screenview', {screenName: funcName});
  }

  function sendEvent(eventCategory, eventAction, eventLabel) {
    if (noGa()) {return;}
    ga('fshApp.send', 'event', eventCategory, eventAction, eventLabel);
  }

  function sendException(desc, fatal) {
    console.log('sendException', desc); // eslint-disable-line no-console
    if (noGa()) {return;}
    ga('fshApp.send', 'exception', {
      exDescription: desc,
      exFatal: fatal
    });
  }

  /*
  Based on
  fiddle.jshell.net/GRIFFnDOOR/r7tvg/
  */

  var heap = [null];

  function cmp(i, j) {
    return heap[i] && heap[i].priority < heap[j].priority;
  }

  function swp(i, j) {
    var temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  function calcChildIndex(leftHigher, i) {
    if (leftHigher) {return i * 2;}
    return i * 2 + 1;
  }

  function sink(j) {
    var i = j;
    while (i * 2 < heap.length) {
      var leftHigher = !cmp(i * 2 + 1, i * 2);
      var childIndex = calcChildIndex(leftHigher, i);
      if (cmp(i, childIndex)) {break;}
      swp(i, childIndex);
      i = childIndex;
    }
  }

  function bubble(j) {
    var i = j;
    while (i > 1) {
      // eslint-disable-next-line no-bitwise
      var parentIndex = i >> 1;
      if (!cmp(i, parentIndex)) {break;}
      swp(i, parentIndex);
      i = parentIndex;
    }
  }

  function pop() {
    if (heap.length === 1) {return;}
    var topVal = heap[1].data;
    var last = heap.pop();
    if (heap.length > 1) {
      heap[1] = last;
      sink(1);
    }
    return topVal;
  }

  function push(data, priority) {
    bubble(heap.push({data: data, priority: priority}) - 1);
  }

  function getLength() {
    return heap.length - 1;
  }

  var paused = true;
  var message = 'fshMessage';
  var messageHandler;

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
      sendException('pop() was not a function (' + typeof fn + ')', false);
    }
  }

  function testPop() {
    var testFn = pop();
    if (isFunction(testFn)) {
      testFn();
    } else {popError(testFn);}
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
    var key = event.data;
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
    devLog(args);
    if (isFunction(fn)) {
      initMessageHandler();
      var _scope = fallback(scope, window);
      var _args = fallback(args, []);
      push(fn.bind.apply(fn, [_scope].concat(_args)), priority);
      if (paused) {taskRunner();}
    }
  }

  var calf = {};

  function off(target, type, listener, options) {
    if (target instanceof EventTarget) {
      target.removeEventListener(type, listener, options);
    }
  }

  function listenerOptions(options) {
    if (isType(options, 'boolean')) {
      return {capture: options};
    }
    return options;
  }

  function once(target, type, listener, addOptions) {
    on(target, type, listener,
      Object.assign({once: true}, listenerOptions(addOptions)));
  }

  function partial(fn, ...args) {
    return fn.bind(fn, ...args);
  }

  var dragTarget;
  var mouseX;
  var mouseY;
  var offsetX;
  var offsetY;
  var timer;

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
    if (trans === 'none') {return [0, 0];}
    var matrix = trans.match(/(\d+), (\d+), (\d+), (\d+), (-?\d+), (-?\d+)/);
    return [Number(matrix[5]), Number(matrix[6])];
  }

  function setOffsets() {
    var style = window.getComputedStyle(dragTarget, null);
    var transformXY = getTransformXY(style.transform);
    offsetX = transformXY[0] - mouseX;
    offsetY = transformXY[1] - mouseY;
  }

  function drawElement(event) {
    if (event.clientX !== mouseX || event.clientY !== mouseY) {
      dragTarget.style.transform =
        'matrix(1, 0, 0, 1, ' + (event.clientX + offsetX).toString() +
        ', ' + (event.clientY + offsetY).toString() + ')';
      setMouseCoord(event);
    }
  }

  function checkInterval(event) {
    var now = performance.now();
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
    var img = new Image();
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
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

  var rarity = [
    {colour: '#ffffff', clas: 'fshCommon'},
    {colour: '#0099ff', clas: 'fshRare'},
    {colour: '#cc00ff', clas: 'fshUnique'},
    {colour: '#ffff33', clas: 'fshLegendary'},
    {colour: '#cc0033', clas: 'fshSuper'},
    {colour: '#6633ff', clas: 'fshCrystal'},
    {colour: '#009900', clas: 'fshEpic'}
  ];

  var places = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth',
    'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth',
    'fourteenth'];

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];

  var mercRE = [
    /<td>Attack:<\/td><td>(\d+)<\/td>/,
    /<td>Defense:<\/td><td>(\d+)<\/td>/,
    /<td>Armor:<\/td><td>(\d+)<\/td>/,
    /<td>Damage:<\/td><td>(\d+)<\/td>/,
    /<td>HP:<\/td><td>(\d+)<\/td>/
  ];

  var lastActivityRE =
    /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;

  var itemRE = /item_id=(\d+)&inv_id=(\d+)/;
  var defenderMultiplier = 0.2;

  var def_joinallgroupsundersize = 'joinallgroupsundersize';

  var indexPhp = 'index.php';
  var def_cmd = '?cmd=';
  var cmdUrl = indexPhp + def_cmd;
  var def_subcmd = '&subcmd=';
  var def_targetUsername = '&target_username=';
  var notepadBlank = def_cmd + 'notepad&blank=1' + def_subcmd;
  var newGuildLogLoc = notepadBlank + 'newguildlog';
  var newGuildLogUrl = indexPhp + newGuildLogLoc;
  var auctionhouseUrl = cmdUrl + 'auctionhouse';
  var ahSearchUrl = auctionhouseUrl + '&search=';
  var logUrl = cmdUrl + 'log';
  var doAddIgnore = logUrl + def_subcmd + 'doaddignore&ignore_username=';
  var profileUrl = cmdUrl + 'profile';
  var playerIdUrl = profileUrl + '&player_id=';
  var dropItemsUrl = profileUrl + def_subcmd + 'dropitems';
  var tradeUrl = cmdUrl + 'trade&target_player=';
  var secureUrl = cmdUrl + 'trade' + def_subcmd + 'createsecure' +
    def_targetUsername;
  var arenaUrl = cmdUrl + 'arena' + def_subcmd;
  var notepadBlankUrl = indexPhp + notepadBlank;
  var auctionSearchUrl = notepadBlankUrl + 'auctionsearch';
  var pointsUrl = cmdUrl + 'points';
  var guildSubcmdUrl = cmdUrl + 'guild' + def_subcmd;
  var guildLogUrl = guildSubcmdUrl + 'log';
  var scouttowerUrl = guildSubcmdUrl + 'scouttower';
  var groupsSubcmdUrl = guildSubcmdUrl + 'groups&subcmd2=';
  var recallUserUrl = guildSubcmdUrl + 'inventory&subcmd2=report&user=';
  var guildViewUrl = guildSubcmdUrl + 'view&guild_id=';
  var joinallUrl = groupsSubcmdUrl + 'joinall';
  var joinUnderUrl = groupsSubcmdUrl + def_joinallgroupsundersize;
  var worldUrl = cmdUrl + 'world';
  var searchPlayerUrl = cmdUrl + 'findplayer';
  var showPlayerUrl = searchPlayerUrl +
    '&search_show_first=1&search_username=';
  var blacksmithUrl = cmdUrl + 'blacksmith';
  var quickbuffUrl = cmdUrl + 'quickbuff';
  var composingUrl = cmdUrl + 'composing';
  var attackplayerUrl = cmdUrl + 'attackplayer' + def_targetUsername;
  var updateArchiveUrl = cmdUrl + def_subcmd + 'viewupdatearchive';
  var archiveUrl = cmdUrl + def_subcmd + 'viewarchive';
  var bountyUrl = cmdUrl + 'bounty';

  var guideUrl = 'https://guide.fallensword.com/' + cmdUrl;

  var def_afterUpdateActionlist = 'after-update.actionlist';
  var def_playerBuffs = 'buffs.player';
  var def_playerUpdate = 'update.player';
  var def_playerLevel = 'level.stats-player';
  var def_playerGold = 'gold.stats-player';
  var def_shopPrompt = 'prompt.worldDialogShop';
  var def_controlsKeydown = 'keydown.controls';
  var def_realmUpdate = 'update.realm';

  var def_suffixSuccessActionResponse = '-success.action-response';
  var def_refreshActionList = '-1' + def_suffixSuccessActionResponse;
  var def_viewCreature = '1' + def_suffixSuccessActionResponse;
  var def_PvE = '2' + def_suffixSuccessActionResponse;
  var def_relicView = '9' + def_suffixSuccessActionResponse;
  var def_stairway = '5' + def_suffixSuccessActionResponse;
  var def_teleport = '25' + def_suffixSuccessActionResponse;

  var def_creatureCombat = 2;
  var def_repairAll = 15;

  var def_fetch_playerStats = 1;
  var def_fetch_playerBackpackCount = 2;
  var def_fetch_playerBackpackItems = 4;
  var def_fetch_playerPrefs = 8;

  var def_fetch_playerBuffs = 16;
  var def_fetch_worldDefines = 32;
  var def_fetch_worldRealmStatic = 64;
  var def_fetch_worldRealmDynamic = 128;

  var def_fetch_worldRealmActions = 256;
  var def_fetch_playerEquipment = 512;
  var def_fetch_playerNotifications = 1024;

  var def_needToCompose = 'needToCompose';
  var def_lastComposeCheck = 'lastComposeCheck';
  var def_characterVirtualLevel = 'characterVirtualLevel';
  var def_enableGuildActivityTracker = 'enableGuildActivityTracker';

  var def_table = 'table';

  var fshBuffLog = 'fsh_buffLog';

  var def_statbarLevel = 'statbar-level-tooltip-general';
  var def_statLevel = 'stat-level';
  var def_statDefense = 'stat-defense';
  var def_statAttack = 'stat-attack';
  var def_statDamage = 'stat-damage';
  var def_statArmor = 'stat-armor';
  var def_statHp = 'stat-hp';
  var def_statVl = 'stat-vl';

  var GMSTORAGE_PATH = 'GM_';

  const composingFragmentType = [
    'Common', 'Rare', 'Unique', 'Legendary', 'Super Elite', 'Crystalline'];

  const attribType = ['Attack', 'Defense', 'Armor', 'HP', 'Damage',
    'Stamina', 'Stamina Gain', 'Gold Gain', 'XP Gain'];

  const enhancementType = ['Piercing Strike', 'Reinforced Armor',
    'Thievery', 'Critical Hit', 'Holy', 'Breaker', 'Nullify', 'Banishment',
    'Protection', 'Oceanic', 'Master Thief', 'Protect Gold', 'Dodge', 'Disarm',
    'Master Blacksmith', 'Elite Hunter', 'Sustain', 'Master Crafter',
    'Fury Caster', 'Greenskin Slayer', 'Beast Slayer', 'Duelist', 'Glory Seeker',
    'First Strike', 'Hypnotize', 'Master Inventor', 'Soulless', 'Temporal Shift'
  ];

  var lastScavPage="";var lastActiveQuestPage="";var lastNormalActiveQuestPage="";var lastNormalCompletedQuestPage="";var lastNormalNotStartedQuestPage="";var lastSeasonalActiveQuestPage="";var lastSeasonalCompletedQuestPage="";var lastSeasonalNotStartedQuestPage="";var enableLogColoring=false;var enableChatParsing=false;var enableCreatureColoring=false;var showCombatLog=false;var showCreatureInfo=false;var keepLogs=false;var showExtraLinks=false;var huntingBuffs="Doubler,Librarian,Adept Learner,Merchant,Treasure Hunter,Animal Magnetism,Conserve";var huntingBuffsName="default";var huntingBuffs2="Deflect";var huntingBuffs2Name="PvP";var huntingBuffs3="Super Elite Slayer";var huntingBuffs3Name="SE";var showHuntingBuffs=false;var moveFSBox=false;var moveDailyQuest=false;var guildSelf="";var guildSelfMessage="Member of your own guild!";var guildFrnd="";var guildFrndMessage="Do not attack - Guild is friendly!";var guildPast="";var guildPastMessage="Do not attack - You've been in that guild once!";var guildEnmy="";var guildEnmyMessage="Enemy guild. Attack at will!";var goldRecipient="";var goldAmount="";var sendGoldonWorld=false;var hideQuests=false;var hideQuestNames="";var hideRecipes=false;var hideRecipeNames="";var enableGuildInfoWidgets=false;var enableOnlineAlliesWidgets=false;var guildOnlineRefreshTime=300;var hideGuildInfoSecureTrade=false;var hideGuildInfoTrade=false;var hideGuildInfoMessage=false;var hideGuildInfoBuff=false;var buyBuffsGreeting="Hello {playername}, can I buy {buffs} for {cost} please?";var renderSelfBio=false;var bioEditLines=10;var renderOtherBios=false;var playNewMessageSound=false;var showSpeakerOnWorld=false;var defaultMessageSound="https://fallenswordhelper.github.io/fallenswordhelper/audio/sms-alert-2-daniel_simon.wav";var highlightPlayersNearMyLvl=false;var highlightGvGPlayersNearMyLvl=false;var detailedConflictInfo=false;var gameHelpLink=true;var navigateToLogAfterMsg=false;var enableAllyOnlineList=false;var enableEnemyOnlineList=false;var allyEnemyOnlineRefreshTime=300;var moveGuildList=false;var moveOnlineAlliesList=false;var hideMatchesForCompletedMoves=false;var doNotKillList="";var enableBioCompressor=false;var currentGoldSentTotal=0;var keepBuffLog=false;var buffLog="";var enableActiveBountyList=false;var bountyListRefreshTime=300;var enableWantedList=false;var wantedNames="";var wantedGuildMembers=false;var bwNeedsRefresh=true;var fsboxlog=false;var fsboxcontent="";var itemRecipient="";var quickLinks="[]";var enableAttackHelper=false;var minGroupLevel=1;var combatEvaluatorBias=0;var huntingMode=false;var enabledHuntingMode="1";var hideRelicOffline=false;var enterForSendMessage=false;var trackKillStreak=false;var storeLastQuestPage=false;var addAttackLinkToLog=false;var showStatBonusTotal=false;var newGuildLogHistoryPages=3;var useNewGuildLog=false;var enhanceChatTextEntry=false;var ajaxifyRankControls=false;var enableMaxGroupSizeToJoin=false;var maxGroupSizeToJoin=11;var enableTempleAlert=false;var enableUpgradeAlert=false;var enableComposingAlert=false;var autoFillMinBidPrice=false;var showPvPSummaryInLog=false;var enableQuickDrink=false;var enhanceOnlineDots=false;var hideBuffSelected=false;var hideHelperMenu=false;var keepHelperMenuOnScreen=true;var draggableHelperMenu=false;var quickLinksTopPx=22;var quickLinksLeftPx=0;var draggableQuickLinks=false;var showNextQuestSteps=true;var showRecallMessages=true;var showRelicMessages=true;var showMercenaryMessages=true;var showGroupCombatMessages=true;var showDonationMessages=true;var showRankingMessages=true;var showGvGMessages=true;var showTaggingMessages=true;var showTitanMessages=true;var showQuickDropLinks=false;var onlinePlayerMinLvl=1;var onlinePlayerMaxLvl=9999;var arenaMinLvl=1;var arenaMaxLvl=9999;var showMonsterLog=false;var lastTempleCheck=0;var needToPray=false;var lastChatCheck="0";var lastGuildLogCheck="0";var lastOutBoxCheck="0";var lastPlayerLogCheck="0";var showAdmin=false;var alliestotal=0;var enemiestotal=0;var footprints=false;var hideNonPlayerGuildLogMessages=false;var listOfAllies="";var listOfEnemies="";var contactList="";var lastUpgradeCheck=0;var needToDoUpgrade=false;var characterVirtualLevel=0;var guildLogoControl=false;var statisticsControl=false;var guildStructureControl=false;var lastMembrListCheck=0;var disableItemColoring=true;var showQuickSendLinks=false;var needToCompose=false;var lastComposeCheck=0;var lastOnlineCheck=0;var bountyList="";var wantedList="";var lowestLevelInTop250=0;var quickMsg="[\"Thank you very much ^_^\",\"Happy hunting, {playername}\"]";var sendClasses="[\"Composed Pots\", \"13699\"], [\"Amber\", \"5611\"], [\"Amethyst Weed\", \"9145\"], [\"Blood Bloom\", \"5563\"], [\"Cerulean Rose\", \"9156\"], [\"Coleoptera Body\", \"9287\"], [\"Dark Shade\", \"5564\"], [\"Deathbloom\", \"9140\"], [\"Deathly Mold\", \"9153\"], [\"Greenskin Fungus\", \"9148\"], [\"Heffle\", \"5565\"], [\"Jademare\", \"5566\"], [\"Ruby Thistle\", \"9143\"], [\"Toad Corpse\",\"9288\"], [\"Trinettle\", \"5567\"], [\"Viridian Vine\", \"9151\"], [\"Mortar & Pestle\", \"9157\"], [\"Beetle Juice\", \"9158\"]";var quickSearchList="[{\"category\":\"Plants\",\"searchname\":\"Amber\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Blood Bloom\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Jademare\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Dark Shade\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Trinettle\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Heffle Wart\",\"nickname\":\"\"},{\"category\":\"Potions\",\"searchname\":\"Sludge Brew\",\"nickname\":\"DC 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Black Death\",\"nickname\":\"DC 225\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Aid\",\"nickname\":\"Assist\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Supreme Doubling\",\"nickname\":\"DB 450\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Acceleration\",\"nickname\":\"DB 500\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Lesser Death Dealer\",\"nickname\":\"DD\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Runic Potion\",\"nickname\":\"FI 250\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of the Bookworm\",\"nickname\":\"Lib 225\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Truth\",\"nickname\":\"EW 1k\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Dull Edge\",\"nickname\":\"DE 25\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Notched Blade\",\"nickname\":\"DE 80\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Death\",\"nickname\":\"DW 125\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Decay\",\"nickname\":\"WI 150\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Fatality\",\"nickname\":\"WI 350\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Annihilation\",\"nickname\":\"DW 150\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of the Wise\",\"nickname\":\"Lib 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Shattering\",\"nickname\":\"SA\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Dragons Blood Potion\",\"nickname\":\"ZK 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Berserkers Potion\",\"nickname\":\"ZK 300\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Fury\",\"nickname\":\"ZK 350\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Supreme Luck\",\"nickname\":\"FI 1k\",\"displayOnAH\":true}]";var arenaMoves="[]";var arenaMatches="[]";var CombatLog="";var hideChampionsGroup=false;var hideElitesGroup=false;var hideSEGroup=false;var hideTitanGroup=false;var hideLegendaryGroup=false;var disableDeactivatePrompts=false;var moveComposingButtons=false;var expandMenuOnKeyPress=false;var disableBreakdownPrompts=false;var collapseNewsArchive=false;var collapseHallPosts=false;var lastmyGuildLogCheck=0;var hideSubLvlCreature=false;var hidePlayerActions=false;var extraProfile="";var textToSearchFor="";var lastLadderReset=0;var disableQuickWearPrompts=false;var enableGuildActivityTracker=false;var enableSeTracker=false;var showTitanInfo=false;var highlightPvpProtection=false;var showBuffInfo=false;var enableHistoryCompressor=false;var enableStamBars=false;var appBad=[0,false];var defaults = {lastScavPage:lastScavPage,lastActiveQuestPage:lastActiveQuestPage,lastNormalActiveQuestPage:lastNormalActiveQuestPage,lastNormalCompletedQuestPage:lastNormalCompletedQuestPage,lastNormalNotStartedQuestPage:lastNormalNotStartedQuestPage,lastSeasonalActiveQuestPage:lastSeasonalActiveQuestPage,lastSeasonalCompletedQuestPage:lastSeasonalCompletedQuestPage,lastSeasonalNotStartedQuestPage:lastSeasonalNotStartedQuestPage,enableLogColoring:enableLogColoring,enableChatParsing:enableChatParsing,enableCreatureColoring:enableCreatureColoring,showCombatLog:showCombatLog,showCreatureInfo:showCreatureInfo,keepLogs:keepLogs,showExtraLinks:showExtraLinks,huntingBuffs:huntingBuffs,huntingBuffsName:huntingBuffsName,huntingBuffs2:huntingBuffs2,huntingBuffs2Name:huntingBuffs2Name,huntingBuffs3:huntingBuffs3,huntingBuffs3Name:huntingBuffs3Name,showHuntingBuffs:showHuntingBuffs,moveFSBox:moveFSBox,moveDailyQuest:moveDailyQuest,guildSelf:guildSelf,guildSelfMessage:guildSelfMessage,guildFrnd:guildFrnd,guildFrndMessage:guildFrndMessage,guildPast:guildPast,guildPastMessage:guildPastMessage,guildEnmy:guildEnmy,guildEnmyMessage:guildEnmyMessage,goldRecipient:goldRecipient,goldAmount:goldAmount,sendGoldonWorld:sendGoldonWorld,hideQuests:hideQuests,hideQuestNames:hideQuestNames,hideRecipes:hideRecipes,hideRecipeNames:hideRecipeNames,enableGuildInfoWidgets:enableGuildInfoWidgets,enableOnlineAlliesWidgets:enableOnlineAlliesWidgets,guildOnlineRefreshTime:guildOnlineRefreshTime,hideGuildInfoSecureTrade:hideGuildInfoSecureTrade,hideGuildInfoTrade:hideGuildInfoTrade,hideGuildInfoMessage:hideGuildInfoMessage,hideGuildInfoBuff:hideGuildInfoBuff,buyBuffsGreeting:buyBuffsGreeting,renderSelfBio:renderSelfBio,bioEditLines:bioEditLines,renderOtherBios:renderOtherBios,playNewMessageSound:playNewMessageSound,showSpeakerOnWorld:showSpeakerOnWorld,defaultMessageSound:defaultMessageSound,highlightPlayersNearMyLvl:highlightPlayersNearMyLvl,highlightGvGPlayersNearMyLvl:highlightGvGPlayersNearMyLvl,detailedConflictInfo:detailedConflictInfo,gameHelpLink:gameHelpLink,navigateToLogAfterMsg:navigateToLogAfterMsg,enableAllyOnlineList:enableAllyOnlineList,enableEnemyOnlineList:enableEnemyOnlineList,allyEnemyOnlineRefreshTime:allyEnemyOnlineRefreshTime,moveGuildList:moveGuildList,moveOnlineAlliesList:moveOnlineAlliesList,hideMatchesForCompletedMoves:hideMatchesForCompletedMoves,doNotKillList:doNotKillList,enableBioCompressor:enableBioCompressor,currentGoldSentTotal:currentGoldSentTotal,keepBuffLog:keepBuffLog,buffLog:buffLog,enableActiveBountyList:enableActiveBountyList,bountyListRefreshTime:bountyListRefreshTime,enableWantedList:enableWantedList,wantedNames:wantedNames,wantedGuildMembers:wantedGuildMembers,bwNeedsRefresh:bwNeedsRefresh,fsboxlog:fsboxlog,fsboxcontent:fsboxcontent,itemRecipient:itemRecipient,quickLinks:quickLinks,enableAttackHelper:enableAttackHelper,minGroupLevel:minGroupLevel,combatEvaluatorBias:combatEvaluatorBias,huntingMode:huntingMode,enabledHuntingMode:enabledHuntingMode,hideRelicOffline:hideRelicOffline,enterForSendMessage:enterForSendMessage,trackKillStreak:trackKillStreak,storeLastQuestPage:storeLastQuestPage,addAttackLinkToLog:addAttackLinkToLog,showStatBonusTotal:showStatBonusTotal,newGuildLogHistoryPages:newGuildLogHistoryPages,useNewGuildLog:useNewGuildLog,enhanceChatTextEntry:enhanceChatTextEntry,ajaxifyRankControls:ajaxifyRankControls,enableMaxGroupSizeToJoin:enableMaxGroupSizeToJoin,maxGroupSizeToJoin:maxGroupSizeToJoin,enableTempleAlert:enableTempleAlert,enableUpgradeAlert:enableUpgradeAlert,enableComposingAlert:enableComposingAlert,autoFillMinBidPrice:autoFillMinBidPrice,showPvPSummaryInLog:showPvPSummaryInLog,enableQuickDrink:enableQuickDrink,enhanceOnlineDots:enhanceOnlineDots,hideBuffSelected:hideBuffSelected,hideHelperMenu:hideHelperMenu,keepHelperMenuOnScreen:keepHelperMenuOnScreen,draggableHelperMenu:draggableHelperMenu,quickLinksTopPx:quickLinksTopPx,quickLinksLeftPx:quickLinksLeftPx,draggableQuickLinks:draggableQuickLinks,showNextQuestSteps:showNextQuestSteps,showRecallMessages:showRecallMessages,showRelicMessages:showRelicMessages,showMercenaryMessages:showMercenaryMessages,showGroupCombatMessages:showGroupCombatMessages,showDonationMessages:showDonationMessages,showRankingMessages:showRankingMessages,showGvGMessages:showGvGMessages,showTaggingMessages:showTaggingMessages,showTitanMessages:showTitanMessages,showQuickDropLinks:showQuickDropLinks,onlinePlayerMinLvl:onlinePlayerMinLvl,onlinePlayerMaxLvl:onlinePlayerMaxLvl,arenaMinLvl:arenaMinLvl,arenaMaxLvl:arenaMaxLvl,showMonsterLog:showMonsterLog,lastTempleCheck:lastTempleCheck,needToPray:needToPray,lastChatCheck:lastChatCheck,lastGuildLogCheck:lastGuildLogCheck,lastOutBoxCheck:lastOutBoxCheck,lastPlayerLogCheck:lastPlayerLogCheck,showAdmin:showAdmin,alliestotal:alliestotal,enemiestotal:enemiestotal,footprints:footprints,hideNonPlayerGuildLogMessages:hideNonPlayerGuildLogMessages,listOfAllies:listOfAllies,listOfEnemies:listOfEnemies,contactList:contactList,lastUpgradeCheck:lastUpgradeCheck,needToDoUpgrade:needToDoUpgrade,characterVirtualLevel:characterVirtualLevel,guildLogoControl:guildLogoControl,statisticsControl:statisticsControl,guildStructureControl:guildStructureControl,lastMembrListCheck:lastMembrListCheck,disableItemColoring:disableItemColoring,showQuickSendLinks:showQuickSendLinks,needToCompose:needToCompose,lastComposeCheck:lastComposeCheck,lastOnlineCheck:lastOnlineCheck,bountyList:bountyList,wantedList:wantedList,lowestLevelInTop250:lowestLevelInTop250,quickMsg:quickMsg,sendClasses:sendClasses,quickSearchList:quickSearchList,arenaMoves:arenaMoves,arenaMatches:arenaMatches,CombatLog:CombatLog,hideChampionsGroup:hideChampionsGroup,hideElitesGroup:hideElitesGroup,hideSEGroup:hideSEGroup,hideTitanGroup:hideTitanGroup,hideLegendaryGroup:hideLegendaryGroup,disableDeactivatePrompts:disableDeactivatePrompts,moveComposingButtons:moveComposingButtons,expandMenuOnKeyPress:expandMenuOnKeyPress,disableBreakdownPrompts:disableBreakdownPrompts,collapseNewsArchive:collapseNewsArchive,collapseHallPosts:collapseHallPosts,lastmyGuildLogCheck:lastmyGuildLogCheck,hideSubLvlCreature:hideSubLvlCreature,hidePlayerActions:hidePlayerActions,extraProfile:extraProfile,textToSearchFor:textToSearchFor,lastLadderReset:lastLadderReset,disableQuickWearPrompts:disableQuickWearPrompts,enableGuildActivityTracker:enableGuildActivityTracker,enableSeTracker:enableSeTracker,showTitanInfo:showTitanInfo,highlightPvpProtection:highlightPvpProtection,showBuffInfo:showBuffInfo,enableHistoryCompressor:enableHistoryCompressor,enableStamBars:enableStamBars,appBad:appBad};

  var reviver = [
    ['S]', function(value) {return value.substr(2);}],
    ['N]', function(value) {return parseInt(value.substr(2), 10);}],
    ['B]', function(value) {return value.substr(2) === 'true';}]
  ];

  function getType(value, el) {return value.substr(0, 2) === el[0];}

  function retrieve(value) {
    var test = reviver.find(partial(getType, value));
    if (test) {return test[1](value);}
    return value;
  }

  function fshGetValue(name, defValue) {
    var value = window.localStorage.getItem(GMSTORAGE_PATH + name);
    if (value === null || isUndefined(value)) {return defValue;}
    return retrieve(value);
  }

  function getValue(name) {
    if (isUndefined(defaults[name])) {
      console.log('No default setting available', name, defaults[name]); // eslint-disable-line no-console
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
      var a =
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
          .exec(value);
      if (a) {
        return new Date(Date.UTC(Number(a[1]), Number(a[2]) - 1, Number(a[3]),
          Number(a[4]), Number(a[5]), Number(a[6])));
      }
    }
    return value;
  }

  function getValueJSON(name) {
    var resultJSON = getValue(name);
    var result;
    if (resultJSON) {result = jsonParse(resultJSON, reviver$1);}
    return result;
  }

  var server = document.location.protocol + '//' +
    document.location.host + '/';
  var imageServer = window.HCS && window.HCS.defines &&
    window.HCS.defines.fileserver &&
    window.HCS.defines.fileserver.slice(0, -1);

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
    if (invalid(link)) {return '';}
    var newWindow = retBool(link.newWindow, ' target="new"', '');
    return '<li><a href="' + escapeHtml(link.url) + '"' +
      newWindow + '>' + link.name + '</a></li>';
  }

  function makeQuickLinks(quickLinks) {
    return quickLinks.map(linkHtml).join('');
  }

  function haveLinks(quickLinks) {
    var draggableQuickLinks = getValue('draggableQuickLinks');
    var html = '<div style="top:' + getValue('quickLinksTopPx') + 'px; left:' +
      getValue('quickLinksLeftPx') + 'px; background-image:url(\'' + imageServer +
      '/skin/inner_bg.jpg\');" id="fshQuickLinks" class="fshQuickLinks' +
      retOption('keepHelperMenuOnScreen', ' fshFixed', '') +
      retBool(draggableQuickLinks, ' fshMove', '') + '">' +
      makeQuickLinks(quickLinks) + '</div>';
    insertHtmlBeforeEnd(document.body, html);
    isDraggable(draggableQuickLinks);
  }

  function haveNode() {
    var quickLinks = getValueJSON('quickLinks') || [];
    if (quickLinks.length > 0) {haveLinks(quickLinks);}
  }

  function injectQuickLinks() {
    var node = getElementById('statbar-container');
    if (node) {haveNode();}
  }

  function doQuickLinks() {
    if (!calf.huntingMode) {
      add(3, injectQuickLinks);
    }
  }

  function outputParamVal(param) {
    if (isUndefined(param)) {return true;}
    return param;
  }

  function getCustomUrlParameter(sPageURL, sParam) {
    var sURLVariables = sPageURL.split('&');
    var sParameterName;
    for (var i = 0; i < sURLVariables.length; i += 1) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return outputParamVal(sParameterName[1]);
      }
    }
  }

  function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    return getCustomUrlParameter(sPageURL, sParam);
  }

  var enabled;

  function handleMsgStack(type, stuff) {
    var msg = parseError(stuff);
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

  var now;
  var nowSecs;

  function initNow() {
    if (!now) {
      now = Date.now();
      nowSecs = Math.floor(now / 1000);
    }
  }

  var pCL;
  var pCC;
  var pCR;

  function initPcc() {
    if (!pCC) {
      pCL = getElementById('pCL');
      pCC = getElementById('pCC');
      pCR = getElementById('pCR');
    }
  }

  const arrayFrom = (e, mapFn) => Array.from(e, mapFn);

  function getElementsByTagName(tagName, element) {
    if (element) {return element.getElementsByTagName(tagName);}
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
    var msg = getArrayByTagName('a', pCL).filter(includes('message'));
    if (msg.length) {
      insertHtmlBeforeEnd(document.body,
        '<audio src="' + getValue('defaultMessageSound') + '" autoplay=true />');
    }
  }

  function isMessageSound() {
    if (getValue('playNewMessageSound')) {
      add(3, doMsgSound);
    }
  }

  function isObject(e) {return isType(e, 'object');}

  function containsText(text, el) {
    return getTextTrim(el) === text;
  }

  function contains(text) {
    return partial(containsText, text);
  }

  function querySelectorAll(selector, scope) {
    if (scope) {return scope.querySelectorAll(selector);}
    return document.querySelectorAll(selector);
  }

  function querySelectorArray(selector, scope) {
    return arrayFrom(querySelectorAll(selector, scope));
  }

  function toSettings(el) {
    el.innerHTML = '<a href="' + cmdUrl + 'settings">Game Help</a>';
  }

  function gameHelpLink$1() {
    querySelectorArray('#pCR h3').filter(contains('Game Help'))
      .forEach(toSettings);
  }

  function mutate(fn, obj, arr) {
    if (isObject(arr[1]) && arr[1] !== null) {
      fn(obj[arr[0]], arr[1]);
    } else {
      obj[arr[0]] = arr[1];
    }
  }

  function mixin(obj, mixins) {
    Object.entries(mixins).forEach(partial(mutate, mixin, obj));
  }

  function cElement(type, props) {
    var el = document.createElement(type);
    if (props) {mixin(el, props);}
    return el;
  }

  function createDiv(props) {
    return cElement('div', props);
  }

  function createSpan(props) {
    return cElement('span', props);
  }

  function createTable(props) {
    return cElement(def_table, props);
  }

  function createTHead(props) {
    return cElement('thead', props);
  }

  function createTBody(props) {
    return cElement('tbody', props);
  }

  function createTr(props) {
    return cElement('tr', props);
  }

  function createTd(props) {
    return cElement('td', props);
  }

  function createTFoot(props) {
    return cElement('tfoot', props);
  }

  function createUl(props) {
    return cElement('ul', props);
  }

  function createOl(props) {
    return cElement('ol', props);
  }

  function createLi(props) {
    return cElement('li', props);
  }

  function createButton(props) {
    return cElement('button', props);
  }

  function createBr() {
    return cElement('br');
  }

  function createAnchor(props) {
    return cElement('a', props);
  }

  function createInput(props) {
    return cElement('input', props);
  }

  function createTextArea(props) {
    return cElement('textarea', props);
  }

  function createTh(props) {
    return cElement('th', props);
  }

  function createLabel(props) {
    return cElement('label', props);
  }

  function textSpan(text) {
    return createSpan({textContent: text});
  }

  function createStyle(style) {
    return cElement('style', {innerHTML: style});
  }

  function createSelect(props) {
    return cElement('select', props);
  }

  function createOption(props) {
    return cElement('option', props);
  }

  function dialogMsg(msg) {
    $('#dialog_msg').html(msg).dialog('open');
  }

  function stringifyError(err) {
    return JSON.stringify(err,
      Object.getOwnPropertyNames(Object.getPrototypeOf(err)), 1)
      .replace(/\n/g, '');
  }

  function getForageError(forage, err) {
    if (err.name === 'UnknownError') {
      dialogMsg('Firefox IndexedDB - UnknownError<br>' +
        err.message + '<br>' +
        '<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=944918">' +
        'More Info</a>');
    } else {
      sendException(forage + ' localforage.getItem error ' +
        stringifyError(err), false);
    }
  }

  function getForage(forage) {
    return localforage.getItem(forage).catch(partial(getForageError, forage));
  }

  function jQueryNotPresent() {return !isFunction(window.$);}

  function makePageHeader(title, comment, spanId, button) {
    var _comment = '';
    if (comment !== '') {_comment = '&nbsp;(' + comment + ')';}
    var _span = '';
    if (spanId) {
      _span = '[<span class="fshLink" id="' +
        spanId + '">' + button + '</span>]';
    }
    return '<table width=100%><tbody><tr class="fshHeader">' +
      '<td width="90%"><b>&nbsp;' + title + '</b>' + _comment +
      '<td width="10%" class="fshBtnBox">' + _span +
      '</td></tr><tbody></table>';
  }

  function makePageTemplate(o) {
    return makePageHeader(o.title, o.comment, o.spanId, o.button) +
      '<div class="fshSmall" id="' + o.divId + '"></div>';
  }

  function insertElement(parent, child) {
    if (parent instanceof Node && child instanceof Node) {
      parent.appendChild(child);
    }
    return child;
  }

  function setText(text, node) {
    if (node instanceof Node) {
      node.textContent = String(text);
    }
  }

  function makeFshMsg() {
    var fshMsg = getElementById('fshmsg');
    if (!fshMsg) {
      fshMsg = createDiv({id: 'fshmsg'});
      insertElement(document.body, fshMsg);
      $(fshMsg).dialog({
        autoOpen: false,
        dialogClass: 'no-close',
        draggable: false,
        modal: true,
        resizable: false,
      });
    }
    return fshMsg;
  }

  function openFshMsg(title, fn, fshMsg) {
    $(fshMsg).dialog('option', {
      buttons: {
        Yes: function() {
          fn();
          $(this).dialog('close');
        },
        No: function() {$(this).dialog('close');}
      },
      title: title
    }).dialog('open');
  }

  function jConfirm(title, msgText, fn) { // jQuery
    var fshMsg = makeFshMsg();
    setText(msgText, fshMsg);
    openFshMsg(title, fn, fshMsg);
  }

  function clearError(err) {
    sendException('localforage.clear error ' + stringifyError(err), false);
  }

  function clearForage() {
    localforage.clear().catch(clearError);
  }

  function setForageError(forage, err) {
    if (err.name === 'QuotaExceededError') {
      jConfirm('IndexedDB Quota Exceeded Error',
        'Not enough disk space. Would you like to clear IndexedDB?',
        clearForage
      );
    } else {
      sendException(forage + ' localforage.setItem error ' +
        stringifyError(err), false);
    }
  }

  function setForage(forage, data) {
    return localforage.setItem(forage, data)
      .catch(partial(setForageError, forage));
  }

  function displayBuffLog(buffLog) {
    getElementById('bufflog').innerHTML = buffLog;
  }

  function clearBuffLog() {
    setForage(fshBuffLog, '').then(displayBuffLog);
  }

  function injectBuffLog(injector) { // jQuery.min
    if (jQueryNotPresent()) {return;}
    var content = injector || pCC;
    content.innerHTML = makePageTemplate({
      title: 'Buff Log',
      comment: '',
      spanId: 'clearBuffs',
      button: 'Clear',
      divId: 'bufflog'
    });
    on(getElementById('clearBuffs'), 'click', clearBuffLog);
    getForage(fshBuffLog).then(displayBuffLog);
  }

  function inject(fsboxcontent) {
    getElementById('fsboxdetail').innerHTML = fsboxcontent;
  }

  function clearFsBox() {
    setForage('fsh_fsboxcontent', '');
    location.reload();
  }

  function injectFsBoxContent(injector) { // jQuery.min
    if (jQueryNotPresent()) {return;}
    var content = injector || pCC;
    content.innerHTML = makePageTemplate({
      title: 'FS Box Log',
      comment: '',
      spanId: 'fsboxclear',
      button: 'Clear',
      divId: 'fsboxdetail'
    });
    getForage('fsh_fsboxcontent').then(inject);
    on(getElementById('fsboxclear'), 'click', clearFsBox, true);
  }

  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function overwriteKey(obj, mixins, fn, key) {
    if (isObject(mixins[key]) && mixins[key] !== null) {
      obj[key] = fn(mixins[key].constructor(), mixins[key]);
    } else {
      obj[key] = mixins[key];
    }
  }

  function extend(obj, mixins) {
    if (isObject(mixins)) {
      Object.keys(mixins).forEach(partial(overwriteKey, obj, mixins, extend));
    }
    return obj;
  }

  function imgHtml(image_id) {
    return '<img class="tip-static" src="' + imageServer +
      '/creatures/' + image_id + '.jpg" data-tipped="<img src=\'' +
      imageServer + '/creatures/' + image_id +
      '.jpg\' width=200 height=200>" width=40 height=40>';
  }

  function hazEnhancements(enhancements) {
    return enhancements && Object.keys(enhancements).length > 0;
  }

  function statMinMax(stat) {
    return stat.min.toString() + ' - ' + stat.max.toString();
  }

  function buildEnhancements(pair) {
    return '<span class="fshNoWrap">' + pair[0] + ': ' +
      statMinMax(pair[1]) + '</span>';
  }

  function formatEnhancements(enhancements) {
    if (hazEnhancements(enhancements)) {
      var tmp = '<span class="fshXXSmall">';
      tmp += Object.entries(enhancements).map(buildEnhancements).join('<br>');
      return tmp + '</span>';
    }
    return '<span class="fshGrey">**Missing**</span>';
  }

  function buildHtml(data, key) {
    return extend(data[key], {
      name: key,
      image: imgHtml(data[key].image_id),
      level: addCommas(data[key].level),
      attack: statMinMax(data[key].attack),
      defense: statMinMax(data[key].defense),
      armor: statMinMax(data[key].armor),
      damage: statMinMax(data[key].damage),
      hp: statMinMax(data[key].hp),
      enhancements: formatEnhancements(data[key].enhancements)
    });
  }

  function reverseSort(headerClicked) {
    return calf.sortBy && calf.sortBy === headerClicked;
  }

  function doSortParams(target) {
    var headerClicked = target.getAttribute('sortKey');
    if (isUndefined(calf.sortAsc)) {calf.sortAsc = true;}
    if (reverseSort(headerClicked)) {
      calf.sortAsc = !calf.sortAsc;
    }
    calf.sortBy = headerClicked;
  }

  function jQueryPresent() {return isFunction(window.$);}

  function getPath(obj, aPath, def) {
    var _obj = obj;
    var _path = aPath.split('.');
    var len = _path.length;
    for (var i = 0; i < len; i += 1) {
      // if (fallback(!_obj, typeof _obj !== 'object')) {return def;}
      if (fallback(!_obj, !isObject(_obj))) {return def;}
      _obj = _obj[_path[i]];
    }
    return _obj;
  }

  function path(obj, aPath, def) {
    var _obj = getPath(obj, aPath, def);
    if (isUndefined(_obj)) {return def;}
    return _obj;
  }

  function sortDesc(result) {
    if (calf.sortAsc) {return result;}
    return -result;
  }

  function intFromString(val) {
    if (typeof val === 'string') {
      return parseInt(val.replace(/,|#/g, ''), 10);
    }
    return val;
  }

  function aIsNotEquipment(a) {
    return !isUndefined(a.type) && a.type > 8;
  }

  function bIsNotEquipment(a, b) {
    return !isUndefined(a.type) && b.type > 8;
  }

  function numberSort(a, b) {
    if (aIsNotEquipment(a)) {return 1;} // non equipment items
    if (bIsNotEquipment(a, b)) {return -1;}
    var valueA = path(a, calf.sortBy, 1);
    var valueB = path(b, calf.sortBy, 1);
    valueA = intFromString(valueA);
    valueB = intFromString(valueB);
    var result = valueA - valueB;
    return sortDesc(result);
  }

  function toLowerCase(str) {
    return str.toLowerCase();
  }

  function alpha(a, b) {
    if (toLowerCase(a) < toLowerCase(b)) {return -1;}
    if (toLowerCase(a) > toLowerCase(b)) {return 1;}
    return 0;
  }

  function stringSort(aa, bb) {
    var a = path(aa, calf.sortBy, 'a');
    var b = path(bb, calf.sortBy, 'a');
    return sortDesc(alpha(a, b));
  }

  var content;
  var monsterAry;

  function noMobs() {
    content.innerHTML = '<span>No monster information! ' +
      'Please enable entity log and travel a bit to see the world</span>';
  }

  function makeRow(el) {
    return '<tr>' +
      '<td class="fshCenter">' + el.image + '</td>' +
      '<td>' + el.name + '</td>' +
      '<td class="fshCenter">' + el.creature_class + '</td>' +
      '<td class="fshCenter">' + el.level + '</td>' +
      '<td class="fshCenter">' + el.attack + '</td>' +
      '<td class="fshCenter">' + el.defense + '</td>' +
      '<td class="fshCenter">' + el.armor + '</td>' +
      '<td class="fshCenter">' + el.damage + '</td>' +
      '<td class="fshCenter">' + el.hp + '</td>' +
      '<td class="fshCenter">' + el.enhancements + '</td></tr>';
  }

  function mobRows() {
    return monsterAry.map(makeRow).join('');
  }

  function drawMobs() {
    var inject = getElementById('entityTableOutput');
    if (!monsterAry || !inject) {return;}
    inject.innerHTML = mobRows();
  }

  function findSortType(target) {
    return target.getAttribute('sortType') || 'string';
  }

  function sortMonsterAry(sortType) {
    if (sortType === 'string') {
      monsterAry.sort(stringSort);
    } else {
      monsterAry.sort(numberSort);
    }
  }

  function sortCol(target) {
    doSortParams(target);
    var sortType = findSortType(target);
    sortMonsterAry(sortType);
    drawMobs();
  }

  function isSortHeader(target) {
    return target.classList.contains('fshLink') &&
      target.hasAttribute('sortkey');
  }

  function doHandlers(evt) {
    var target = evt.target;
    if (target.id === 'clearEntityLog') {
      setForage('fsh_monsterLog', '');
      noMobs();
      return;
    }
    if (isSortHeader(target)) {
      sortCol(target);
    }
  }

  function drawTable() {
    if (!monsterAry) {return;}
    content.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" ' +
      'width="100%"><tr class="fshBlack fshWhite">' +
      '<td width="90%" class="fshCenter"><b>Entity Information</b></td>' +
      '<td width="10%">[<span id="clearEntityLog" class="fshPoint">Clear' +
      '</span>]</td></tr></table>' +
      '<table cellspacing="1" cellpadding="2" border="0"><thead>' +
      '<tr class="fshVerySoftOrange">' +
      '<th width="25%" class="fshLink" sortkey="name" colspan="2">Entity</th>' +
      '<th class="fshCenter fshLink" sortkey="creature_class">Class</th>' +
      '<th class="fshCenter fshLink" sortkey="level" sorttype="number">Lvl</th>' +
      '<th class="fshCenter">Attack</th>' +
      '<th class="fshCenter">Defence</th>' +
      '<th class="fshCenter">Armor</th>' +
      '<th class="fshCenter">Damage</th>' +
      '<th class="fshCenter">HP</th>' +
      '<th class="fshCenter">Enhancements</th>' +
      '</tr></thead><tbody id="entityTableOutput"></tbody></table>';
    on(content, 'click', doHandlers);
  }

  function prepMonster(data) {
    monsterAry = Object.keys(data).map(partial(buildHtml, data));
  }

  function prepAry(data) {
    if (!data) {
      noMobs();
      return;
    }
    prepMonster(data);
    calf.sortBy = 'level';
    calf.sortAsc = true;
    monsterAry.sort(numberSort);
    drawTable();
    drawMobs();
  }

  function haveJquery(injector) { // jQuery.min
    content = injector || pCC;
    if (!content) {return;}
    getForage('fsh_monsterLog').then(prepAry);
  }

  function injectMonsterLog(injector) {
    if (jQueryPresent()) {haveJquery(injector);}
  }

  var content$1;
  var combatLog = [];
  var textArea;
  var yuuzParser = '<tr><td align="center" colspan="4"><b>Log Parser</b>' +
    '</td></tr>' +
    '<tr><td colspan="4" align="center">WARNING: this links to an ' +
    'external site not related to HCS.<br />' +
    'If you wish to visit site directly URL is: http://evolutions.' +
    'yvong.com/fshlogparser.php<br />' +
    '<tr><td colspan=4 align="center"><input type="hidden" value="true" ' +
    'name="submit"><input type="submit" value="Analyze!"></td></tr>';

  function notepadCopyLog() {
    textArea.focus();
    textArea.select();
  }

  function clearCombatLog() {
    combatLog = [];
    textArea.value = '[]';
    setForage('fsh_combatLog', combatLog);
  }

  function notepadClearLog() { // jQuery
    jConfirm('Clear Combat Log',
      'Are you sure you want to clear your log?', clearCombatLog
    );
  }

  function gotCombatLog(data) {
    if (data) {combatLog = data;}
    content$1.innerHTML = '<h1>Combat Logs</h1><br /><form action="http://' +
      'evolutions.yvong.com/fshlogparser.php" method="post" target="_blank">' +
      '<div align="center"><textarea align="center" cols="80" rows="25" ' +
      'readonly style="background-color:white;font-family:Consolas,\'' +
      'Lucida Console\',\'Courier New\',monospace;" id="combatLog" ' +
      'name="logs">' + JSON.stringify(combatLog) + '</textarea></div>' +
      '<br /><br /><table width="100%"><tr>' +
      '<td colspan="2" align=center>' +
      '<input type="button" class="custombutton" value="Select All" ' +
      'id="copyLog"></td>' +
      '<td colspan="2" align=center>' +
      '<input type="button" class="custombutton" value="Clear" ' +
      'id="clearLog"></td>' +
      '</tr>' + yuuzParser + '</table></div>' +
      '</form>';
    textArea = getElementById('combatLog');
    on(getElementById('copyLog'), 'click', notepadCopyLog);
    on(getElementById('clearLog'), 'click', notepadClearLog);
  }

  function injectNotepadShowLogs(injector) { // jQuery.min
    if (jQueryNotPresent()) {return;}
    content$1 = injector || pCC;
    getForage('fsh_combatLog').then(gotCombatLog);
  }

  function onlinePlayer(onlinePlayers, player) {
    var guildImage = $('<div/>').append(onlinePlayers[player][0]);
    $('img', guildImage).addClass('fshImgCntr');
    return [
      guildImage.html(),
      onlinePlayers[player][1],
      onlinePlayers[player][2],
      onlinePlayers[player][3] * 100 +
      onlinePlayers[player][4] + 1,
    ];
  }

  function buildOnlinePlayerData(onlinePlayers) { // jQuery
    return Object.keys(onlinePlayers).map(partial(onlinePlayer, onlinePlayers));
  }

  function getElementsByClassName(names, element) {
    if (element) {return element.getElementsByClassName(names);}
    return document.getElementsByClassName(names);
  }

  function intValue(theText) {
    if (!theText) {return 0;}
    return Number(theText.replace(/,/g, ''));
  }

  function valueText(collection) {
    return getText(collection[0].nextElementSibling);
  }

  var pvpLowerLevel;
  var pvpUpperLevel;
  var gvgLowerLevel;
  var gvgUpperLevel;

  var lowerGvgCalcs = [
    function(levelToTest) {if (levelToTest >= 801) {return 100;}},
    function(levelToTest) {if (levelToTest >= 752) {return levelToTest - 701;}},
    function(levelToTest) {if (levelToTest >= 351) {return 50;}},
    function(levelToTest) {if (levelToTest >= 326) {return levelToTest - 301;}},
    function() {return 25;}
  ];

  function calcLvlToTest() {
    return getValue(def_characterVirtualLevel) ||
      intValue(valueText(getElementsByClassName(def_statLevel)));
  }

  function band(levelToTest, ary) {return ary(levelToTest);}

  function lowerModifier(levelToTest) {
    return lowerGvgCalcs.find(partial(band, levelToTest))(levelToTest);
  }

  function calcLowerGvGLevel(levelToTest) {
    return levelToTest - lowerModifier(levelToTest);
  }

  function calcLowerPvpLevel(levelToTest) {
    var modifier = 10;
    if (levelToTest <= 209) {modifier = levelToTest - 200;}
    if (levelToTest <= 205) {modifier = 5;}
    return levelToTest - modifier;
  }

  function calcUpperPvpLevel(levelToTest) {
    var modifier = 10;
    if (levelToTest < 200) {modifier = 5;}
    return levelToTest + modifier;
  }

  function calcUpperGvgLevel(levelToTest) {
    var modifier = 100;
    if (levelToTest <= 700) {modifier = 50;}
    if (levelToTest <= 300) {modifier = 25;}
    return levelToTest + modifier;
  }

  function calculateBoundaries() {
    var levelToTest = calcLvlToTest();
    pvpLowerLevel = calcLowerPvpLevel(levelToTest);
    pvpUpperLevel = calcUpperPvpLevel(levelToTest);
    gvgLowerLevel = calcLowerGvGLevel(levelToTest);
    gvgUpperLevel = calcUpperGvgLevel(levelToTest);
  }

  var guildId;

  function getGuildId(el) {
    var match = getText(el).match(/\s+guildId: ([0-9]+),/);
    if (match) {guildId = Number(match[1]);}
  }

  function currentGuildId() {
    if (!guildId) {
      getArrayByTagName('script', document.body).forEach(getGuildId);
    }
    return guildId;
  }

  var highlightPlayersNearMyLvl$1;
  var table;

  function guildNumber(html) {
    var match = html.match(/;guild_id=([0-9]+)"/);
    if (match) {return Number(match[1]);}
  }

  var highlightTests = [
    function() {return highlightPlayersNearMyLvl$1;},
    function(data) {return guildNumber(data[0]) !== currentGuildId();},
    function(data) {return intValue(data[2]) >= pvpLowerLevel;},
    function(data) {return intValue(data[2]) <= pvpUpperLevel;}
  ];

  function condition(data, el) {return el(data);}

  function pvpHighlight(data) {
    return highlightTests.every(partial(condition, data));
  }

  function createdRow(row, data) {
    if (pvpHighlight(data)) {
      $('td', row).eq(2).addClass('lvlHighlight');
    }
  }

  function tableOpts(onlineData) {
    return {
      columns: [
        {title: 'Guild', 'class': 'dt-center', orderable: false},
        {title: 'Name', 'class': 'dt-center'},
        {title: 'Level', 'class': 'dt-center'},
        {title: 'Page/Index', 'class': 'dt-center'}
      ],
      createdRow: createdRow,
      data: onlineData,
      deferRender: true,
      lengthMenu: [[30, 60, -1], [30, 60, 'All']],
      order: [3, 'desc'],
      pageLength: 30,
      stateDuration: 0,
      stateSave: true
    };
  }

  function doTable(context, onlineData) {
    highlightPlayersNearMyLvl$1 = getValue('highlightPlayersNearMyLvl');
    table = $('#fshInv', context).DataTable(tableOpts(onlineData));
  }

  function tableDraw() {
    table.draw();
  }

  function changeLvl(e) { // jQuery
    if (e.target.id === 'fshMinLvl' || e.target.id === 'fshMaxLvl') {
      tableDraw();
    }
  }

  function createDocument(details) {
    // Use DOMParser to prevent img src tags downloading
    var parser = new DOMParser();
    var doc = parser.parseFromString(details, 'text/html');
    return doc;
  }

  function doRefreshButton() {
    var lastCheck = getValue('lastOnlineCheck');
    if (now - lastCheck > 300000) {
      return '<span> (takes a while to refresh so only do it ' +
        'if you really need to) </span><span id="fshRefresh" class="fshLink"' +
        '>[Refresh]</span>';
    }
    return '<span>[ Wait ' + Math.round(300 - (now -
      lastCheck) / 1000) + 's ]</span>';
  }

  function storItem(name, type, value) {
    window.localStorage.setItem(GMSTORAGE_PATH + name, type + value);
  }

  var cold = [
    ['string', function(name, value) {storItem(name, 'S]', value);}],
    [
      'number',
      function(name, value) {
        if (value.toString().indexOf('.') < 0) {storItem(name, 'N]', value);}
      }
    ],
    ['boolean', function(name, value) {storItem(name, 'B]', value);}]
  ];

  function typeStor(value, el) {return typeof value === el[0];}

  function setValue(name, value) {
    var storType = cold.find(partial(typeStor, value));
    if (storType) {storType[1](name, value);}
  }

  var playerLvlTest = [
    function(level, min) {return !min;},
    function(level, min, max) {return !max;},
    function(level, min, max) {return isNaN(min) && isNaN(max);},
    function(level, min, max) {return isNaN(min) && level <= max;},
    function(level, min, max) {return min <= level && isNaN(max);},
    function(level, min, max) {return min <= level && level <= max;}
  ];

  function condition$1(level, min, max, fn) {return fn(level, min, max);}

  function lvlTest(ary, level, min, max) {
    return ary.some(partial(condition$1, level, min, max));
  }

  function getVal(el, context) {
    return parseInt($(el, context).val(), 10);
  }

  function saveVal(key, val) {
    if (!isNaN(val)) {setValue(key, val);}
  }

  function dataTableSearch(context, _settings, data) { // jQuery
    var min = getVal('#fshMinLvl', context);
    var max = getVal('#fshMaxLvl', context);
    saveVal('onlinePlayerMinLvl', min);
    saveVal('onlinePlayerMaxLvl', max);
    var level = fallback(intValue(data[2]), 0);
    return lvlTest(playerLvlTest, level, min, max);
  }

  function filterHeaderOnlinePlayers(context) { // jQuery
    $.fn.dataTable.ext.search.push(partial(dataTableSearch, context));
    $('#fshOutput', context).html(
      '<div align=right>' +
      'Min lvl:<input value="' + getValue('onlinePlayerMinLvl') +
        '" size=5 id="fshMinLvl" /> ' +
      'Max lvl:<input value="' + getValue('onlinePlayerMaxLvl') +
        '" size=5 id="fshMaxLvl" /> ' +
      '<input id="fshReset" type="button" value="Reset"/>' +
      '</div><table id="fshInv" class="allow stripe hover"></table>');
  }

  function url(opt) {
    if (opt.data) {
      delete opt.data._rnd;
      return $.param(opt.data);
    }
    return opt.url;
  }

  function buildErrorMsg(opt, jqXhr, textStatus, errorThrown) {
    var xhrStatus = jqXhr.status + ' ' + jqXhr.statusText + ' - ';
    if (jqXhr.statusText === errorThrown.toString()) {
      return xhrStatus + url(opt);
    }
    var jqStatus = xhrStatus + textStatus + ' ' + errorThrown + ' - ' + url(opt);
    if (textStatus === 'parsererror') {
      return jqStatus + ' - ' + jqXhr.responseText;
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

  var paused$1 = true;
  var queue = [];
  var globalHandler;

  function setOpts(options) {
    if (typeof options === 'string') {
      return {url: options};
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

  var ignoreStatus = [0];
  var ignoreTextStatus = ['abort'];

  function ignore(ajaxErr) {
    return ignoreStatus.includes(ajaxErr.jqXhr.status) ||
      ignoreTextStatus.includes(ajaxErr.jqTextStatus);
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
    var opt = setOpts(options);
    opt.beforeSend = beforeSend;
    return $.ajax(opt).then(resolve)
      .catch(failFilter([doAjax, opt, retries, resolve, reject]));
  }

  function attemptTask(runner) {
    if ($.active < 4) {
      var opts = queue.shift();
      doAjax.apply(null, opts);
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
    if (paused$1) {taskRunner$1();}
  }

  function retryAjax(options) {
    initGlobalHandler();
    if (options) {
      return new Promise(function(resolve, reject) {
        add$1(options, 10, resolve, reject);
      });
    }
  }

  function indexAjax(options) {
    mixin(options, {url: indexPhp, data: {no_mobile: 1}});
    return retryAjax(options);
  }

  function indexAjaxData(data) {
    return indexAjax({data: data});
  }

  function onlinePlayersPage(page) {
    return indexAjaxData({
      cmd: 'onlineplayers',
      page: page
    });
  }

  function resetEvt(context) {
    setValue('onlinePlayerMinLvl', defaults.onlinePlayerMinLvl);
    setValue('onlinePlayerMaxLvl', defaults.onlinePlayerMaxLvl);
    $('#fshMinLvl', context).val(defaults.onlinePlayerMinLvl);
    $('#fshMaxLvl', context).val(defaults.onlinePlayerMaxLvl);
    tableDraw();
  }

  var context;
  var onlinePlayers;
  var onlinePages;
  var lastPage;

  function gotOnlinePlayers(value) { // jQuery
    onlinePlayers = value || {};
    filterHeaderOnlinePlayers(context);
    calculateBoundaries();
    doTable(context, buildOnlinePlayerData(onlinePlayers));
  }

  function checkLastPage() {
    if (onlinePages === lastPage) {
      setForage('fsh_onlinePlayers', onlinePlayers);
      gotOnlinePlayers(onlinePlayers);
    }
  }

  function seenPlayer(player, thePage) {
    return onlinePlayers[player] && onlinePlayers[player][3] > thePage;
  }

  function playerRecord(thePage, index, tds) {
    return [
      tds.eq(0).html(),
      tds.eq(1).html(),
      tds.eq(2).text(),
      thePage,
      index
    ];
  }

  function buildElements(thePage, index, element) {
    var tds = $('td', $(element));
    var player = tds.eq(1).text();
    if (seenPlayer(player, thePage)) {return;}
    onlinePlayers[player] = playerRecord(thePage, index, tds);
  }

  function processTheRows(doc, input) {
    var thePage = input.attr('value');
    var theRows = $('#pCC img[src$="/skin/icon_action_view.gif',
      doc).parent().parent().parent();
    theRows.each(partial(buildElements, thePage));
  }

  function getLastPage(input) {
    return parseInt(input.parent().text().match(/(\d+)/g)[0], 10);
  }

  function getOtherPages(callback, input) {
    lastPage = getLastPage(input);
    for (var i = 2; i <= lastPage; i += 1) {
      onlinePlayersPage(i).then(callback);
    }
  }

  function updateStatus(text) {
    $('#fshOutput', context).append(text);
  }

  function getOnlinePlayers(data) { // Bad jQuery
    updateStatus(' ' + (onlinePages + 1));
    var doc = createDocument(data);
    var input = $('#pCC input.custominput', doc).first();
    processTheRows(doc, input);
    onlinePages += 1;
    if (onlinePages === 1) {
      getOtherPages(getOnlinePlayers, input);
    }
    checkLastPage();
  }

  function refreshEvt() { // Bad jQuery
    $('#fshRefresh', context).hide();
    onlinePages = 0;
    onlinePlayers = {};
    onlinePlayersPage(1).then(getOnlinePlayers);
    setValue('lastOnlineCheck', now);
    updateStatus('Parsing online players...');
  }

  function clickHandler(e) {
    if (e.target.id === 'fshRefresh') {refreshEvt();}
    if (e.target.id === 'fshReset') {resetEvt(context);}
  }

  function injectOnlinePlayersNew() { // jQuery
    context.html(
      '<span><b>Online Players</b></span>' + doRefreshButton() +
      '<div id="fshOutput"></div>');
    getForage('fsh_onlinePlayers').then(gotOnlinePlayers);
    on(context[0], 'click', clickHandler);
    on(context[0], 'keyup', changeLvl);
  }

  function injectOnlinePlayers(content) { // jQuery
    if (jQueryNotPresent()) {return;}
    if (content) {
      context = $(content);
    } else {
      context = $('#pCC');
    }
    injectOnlinePlayersNew();
  }

  function csvSplit(csv) {
    return csv.split(/\s*,\s*/);
  }

  function shouldBeArray(pref) {
    var stored = getValue(pref);
    if (stored) {return csvSplit(stored);}
    return [];
  }

  var currentPlayerId;
  var hideRecipes$1 = [];

  function itemImg(itm) {
    return '<div class="rmItem"><img class="tip-dynamic" ' +
      'data-tipped="fetchitem.php?item_id=' +
      itm.id + '&inv_id=-1&t=2&p=' +
      currentPlayerId + '&vcode=' +
      itm.verify + '" src="' +
      itm.img + '" height="20px" width="20px"><p>' +
      itm.amountPresent + '/' +
      itm.amountNeeded + '</p></div>';
  }

  function getRecipeItems(recipe) {
    if (recipe.items) {
      return recipe.items.map(itemImg).join('');
    }
    return '';
  }

  function componentImg(comp) {
    return '<div class="rmItem"><img class="tip-dynamic" ' +
      'data-tipped="fetchitem.php?item_id=' +
      comp.id + '&inv_id=-1&t=2&p=' +
      currentPlayerId + '&vcode=' +
      comp.verify + '" src="' +
      comp.img + '" height="20px" width="20px"><p>' +
      comp.amountPresent + '/' +
      comp.amountNeeded + '</p></div>';
  }

  function getComponents(recipe) {
    if (recipe.components) {
      return recipe.components.map(componentImg).join('');
    }
    return '';
  }

  function getImg(recipe) {
    if (recipe.target) {
      return ' <img class="tip-dynamic" ' +
        'data-tipped="fetchitem.php?item_id=' +
        recipe.target.id + '&inv_id=-1&t=2&p=' + currentPlayerId +
        '&vcode=' + recipe.target.verify + '" ' +
        'src="' + recipe.target.img +
        '" height="30px" width="30px"><br/>';
    }
    return '';
  }

  function hidden(recipe) {
    return !hideRecipes$1.includes(recipe.name);
  }

  function makeRow$1(recipe) {
    return '<tr class="rmTr">' +
        '<td class="rmTd">' +
          '<a href="' + recipe.link + '">' +
            '<img src="' + recipe.img + '" height="30px" width="30px">' +
          '</a>' +
        '</td>' +
        '<td class="rmTd">' +
          '<a href="' + recipe.link + '">' + recipe.name + '</a>' +
        '</td>' +
        '<td class="rmTd">' + getRecipeItems(recipe) + '</td>' +
        '<td class="rmTd">' + getComponents(recipe) + '</td>' +
        '<td class="rmTd">' + getImg(recipe) + '</td>' +
      '</tr>';
  }

  function drawRecipeTable(output, recipebook) { // Legacy
    currentPlayerId = playerId();
    var result = '<table width="100%"><tr class="rmTh"><th>Recipe</th>' +
      '<th><span id="sortName" class="fshLink" sortkey="name">Name</span>' +
      '</th><th>Items</th><th>Components</th><th>Target</th></tr>';
    result += recipebook.recipe.filter(hidden).map(makeRow$1).join('');
    result += '</table>';
    output.innerHTML = result;
    recipebook.lastUpdate = new Date();
    setForage('fsh_recipeBook', recipebook);
  }

  function generateRecipeTable(output, recipebook) { // Legacy
    if (recipebook) {
      if (getValue('hideRecipes')) {
        hideRecipes$1 = shouldBeArray('hideRecipeNames');
      }
      drawRecipeTable(output, recipebook);
    }
  }

  function all(prm) {
    return Promise.all(prm);
  }

  function getFolderImgs(doc) {
    var el = getElementById('pCC', doc).children[0].rows[4].cells[0].children[0];
    return getArrayByTagName('img', el);
  }

  var itmRE =
    /fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i;

  function getTblCells(doc) {
    return getArrayByTagName('td', getElementById('pCC', doc));
  }

  function background(bgGif, el) {
    var bg = el.getAttribute('background');
    return bg && bg.includes(bgGif);
  }

  function splitMouseover(img) {
    var mouseOver = img.dataset.tipped;
    return mouseOver.match(itmRE);
  }

  function buildResult(img, mouseOverRX) {
    return {
      img: img.getAttribute('src'),
      id: mouseOverRX[1],
      verify: mouseOverRX[3]
    };
  }

  function hasAmounts(result, amounts) {
    if (amounts) {
      var resultAmounts = getText(amounts).split('/');
      result.amountPresent = parseInt(resultAmounts[0], 10);
      result.amountNeeded = parseInt(resultAmounts[1], 10);
    }
  }

  function attribs(el) {
    var img = el.children[0].children[0];
    var mouseOverRX = splitMouseover(img);
    var result = buildResult(img, mouseOverRX);
    hasAmounts(result, el.parentNode.nextElementSibling);
    return result;
  }

  function parseRecipe(tblCells, bgGif) {
    return tblCells
      .filter(partial(background, bgGif))
      .map(attribs);
  }

  function processRecipe(output, recipebook, recipe, html) {
    var doc = createDocument(html);
    insertHtmlBeforeEnd(output,
      'Parsing blueprint ' + recipe.name + '...<br>');
    var tblCells = getTblCells(doc);
    recipe.items = parseRecipe(tblCells, '/inventory/2x3.gif');
    recipe.components = parseRecipe(tblCells, '/inventory/1x1mini.gif');
    recipe.target = parseRecipe(tblCells, '/hellforge/2x3.gif')[0];
    recipebook.recipe.push(recipe);
  }

  function recipeAry(doc) {
    var innerPcc = getElementById('pCC', doc);
    var scope = innerPcc.children[0].rows[6].cells[0].children[0];
    return getArrayByTagName('a', scope);
  }

  function makeRecipe(el) {
    return {
      img: el.parentNode.previousElementSibling.children[0].getAttribute('src'),
      link: el.href,
      name: getText(el),
      id: getCustomUrlParameter(el.href, 'recipe_id')
    };
  }

  function getRecipe(output, recipebook, el) {
    insertHtmlBeforeEnd(output, 'Found blueprint "' + getText(el) + '".<br>');
    var recipe = makeRecipe(el);
    return retryAjax(el.href)
      .then(partial(processRecipe, output, recipebook, recipe));
  }

  function processFolderAnyPage(output, recipebook, html) { // jQuery.min
    var doc = createDocument(html);
    var prm = recipeAry(doc).map(partial(getRecipe, output, recipebook));
    return all(prm);
  }

  function thisInventFolder(el) {
    return /\/folder_on\.gif/.test(el.getAttribute('src'));
  }

  function thisFolderHref(doc) {
    return getFolderImgs(doc).find(thisInventFolder).parentNode.href;
  }

  function notThisPage(el, i) {return i !== 0;}

  function pageNumber(el) {return el.value;}

  function otherPages(doc) {
    return getArrayByTagName('option',
      getElementsByClassName('customselect', getElementById('pCC', doc))[0])
      .filter(notThisPage).map(pageNumber);
  }

  function getPage(thisFolder, bindFolderAnyPage, i) {
    return retryAjax(thisFolder + '&page=' + i)
      .then(bindFolderAnyPage);
  }

  function ajaxOtherPages(doc, thisFolder, bindFolderAnyPage) {
    return otherPages(doc).map(partial(getPage, thisFolder, bindFolderAnyPage));
  }

  function processFolderFirstPage(output, recipebook, html) { // jQuery.min
    var doc = createDocument(html);
    var thisFolder = thisFolderHref(doc);
    var bindFolderAnyPage = partial(processFolderAnyPage, output, recipebook);
    var prm = ajaxOtherPages(doc, thisFolder, bindFolderAnyPage);
    prm.push(bindFolderAnyPage(html));
    return all(prm);
  }

  function notUnassigned(el) {
    return getCustomUrlParameter(el.parentNode.href, 'folder_id') !== '-1';
  }

  function noQuests(output, el) {
    var folderName = getText(
      el.parentNode.nextElementSibling.nextElementSibling.firstChild); // Text Node
    var hasQuest = /quest/i.test(folderName);
    if (hasQuest) {
      insertHtmlBeforeEnd(output, 'Skipping folder "' +
        folderName + '"  as it has the word "quest" in folder name.<br>');
    }
    return !hasQuest;
  }

  function doAjax$1(bindFolderFirstPage, el) {
    return retryAjax(el.parentNode.href).then(bindFolderFirstPage);
  }

  function buildPrm(output, html, bindFolderFirstPage) {
    var doc = createDocument(html);
    var folderImgs = getFolderImgs(doc);
    return folderImgs
      .filter(notUnassigned)
      .filter(partial(noQuests, output))
      .map(partial(doAjax$1, bindFolderFirstPage));
  }

  function processFirstPage(output, recipebook, html) { // jQuery.min
    var bindFolderFirstPage = partial(processFolderFirstPage, output, recipebook);
    var prm = buildPrm(output, html, bindFolderFirstPage);
    prm.push(bindFolderFirstPage(html));
    return all(prm);
  }

  var recipebook;
  var output;

  function displayStuff() {
    insertHtmlBeforeEnd(output, 'Finished parsing ... formatting ...');
    setForage('fsh_recipeBook', recipebook);
    generateRecipeTable(output, recipebook);
  }

  function parseInventingStart() { // jQuery.min
    recipebook = {};
    recipebook.recipe = [];
    output.innerHTML = '<br>Parsing inventing screen ...<br>';
    indexAjaxData({cmd: 'inventing'})
      .then(partial(processFirstPage, output, recipebook))
      .then(displayStuff);
  }

  function gotRecipeBook(content, data) {
    recipebook = data;
    content.innerHTML = '<table class="fshInvFilter"><thead><tr>' +
      '<th width="90%"><b>&nbsp;Recipe Manager</b></th>' +
      '<th width="10%" class="fshBtnBox">[' +
      '<span id="rfsh" class="fshLink">' +
      'Refresh</span>]</th>' +
      '</tr></thead></table>';
    output = createDiv();
    insertElement(content, output);
    if (!recipebook) {
      parseInventingStart();
    } else {
      generateRecipeTable(output, recipebook);
    }
  }

  function sortRecipeTable(evt) { // Legacy
    doSortParams(evt.target);
    recipebook.recipe.sort(stringSort);
    generateRecipeTable(output, recipebook);
  }

  function rmEvtHdl(evt) {
    if (evt.target.id === 'rfsh') {
      parseInventingStart();
    }
    if (evt.target.id === 'sortName') {
      sortRecipeTable(evt);
    }
  }

  function injectRecipeManager(injector) { // jQuery.min
    if (jQueryNotPresent()) {return;}
    var content = injector || pCC;
    getForage('fsh_recipeBook').then(partial(gotRecipeBook, content));
    on(content, 'click', rmEvtHdl);
  }

  function validRef(referenceNode) {
    return referenceNode instanceof Node &&
      referenceNode.parentNode instanceof Node;
  }

  function insertElementBefore(newNode, referenceNode) {
    if (validRef(referenceNode)) {
      return referenceNode.parentNode.insertBefore(newNode, referenceNode);
    }
  }

  function callApp(data) {
    return retryAjax({
      url: 'app.php',
      data: extend(data, {app: 1}),
      dataType: 'json'
    });
  }

  function guild(data) {
    return callApp(extend({cmd: 'guild'}, data));
  }

  function advisorView(period) {
    return guild({subcmd: 'advisor', subcmd2: 'view', period: period});
  }

  let transform;

  function buildTransform() {
    if (!transform) {
      transform = new RegExp(
        'Skill ([\\w ]*) level (\\d*) was activated on \'(\\w*)\'|' +
        'The skill ([\\w ]*) of (current or higher ' +
        'level is currently active) on \'(\\w*)\'|' +
        'Player \'(\\w*)\' (has set their preferences to block ' +
        'the skill) \'([\\w ]*)\' from being cast on them.'
      );
    }
  }

  function meta(report) {
    return transform.exec(report);
  }

  function buffReportParser(scope) {
    buildTransform();
    const buffsAttempted = querySelectorArray('#quickbuff-report font', scope)
      .map(getTextTrim).map(meta);
    return buffsAttempted;
  }

  var buffList = [{name:"Rage",stam:10,lvl:1,id:0,nicks:"rage"},{name:"Stun",stam:15,lvl:1,id:1,nicks:"stun,st"},{name:"Fury",stam:10,lvl:25,id:2,nicks:"fury"},{name:"Blood Thirst",stam:10,lvl:25,id:4,nicks:"blood thirst,bloodthirst,bt"},{name:"Enchant Weapon",stam:10,lvl:25,id:5,nicks:"enchant weapon,ew"},{name:"Berserk",stam:15,lvl:75,id:3,nicks:"berserk"},{name:"Holy Flame",stam:15,lvl:75,id:6,nicks:"holy flame,hf"},{name:"Dark Curse",stam:20,lvl:150,id:7,nicks:"dark curse,dc"},{name:"Shockwave",stam:20,lvl:200,id:29,nicks:"shockwave,sw,shock"},{name:"Ignite",stam:10,lvl:200,id:30,nicks:"ignite,ign"},{name:"Super Elite Slayer",stam:25,lvl:250,id:31,nicks:"super elite slayer,ses,se slayer"},{name:"Wither",stam:15,lvl:250,id:32,nicks:"wither,with"},{name:"Shatter Armor",stam:20,lvl:300,id:33,nicks:"shatter armor,sa"},{name:"Death Wish",stam:20,lvl:300,id:34,nicks:"deathwish,dw,deathw,death wish"},{name:"Spell Breaker",stam:35,lvl:300,id:35,nicks:"spell breaker,sb"},{name:"Spectral Knight",stam:15,lvl:400,id:48,nicks:"spectral knight,sk,spec knight"},{name:"Keen Edge",stam:10,lvl:400,id:47,nicks:"keen edge,ke"},{name:"Arterial Strike",stam:20,lvl:500,id:49,nicks:"arterial strike,as,art strike,art str"},{name:"Death Dealer",stam:20,lvl:500,id:50,nicks:"death dealer,dd"},{name:"Savagery",stam:15,lvl:600,id:51,nicks:"savagery,savage"},{name:"Chi Strike",stam:20,lvl:700,id:52,nicks:"chi strike,chi,chis,chi str"},{name:"Shield Strike",stam:20,lvl:700,id:53,nicks:"shield strike,ss,sh str"},{name:"Demoralize",stam:25,lvl:800,id:73,nicks:"demoralize,dem"},{name:"Poison",stam:25,lvl:800,id:70,nicks:"poison,poi"},{name:"Iron Fist",stam:25,lvl:900,id:74,nicks:"iron fist,if"},{name:"Spell Leech",stam:50,lvl:900,id:79,nicks:"spell leech,sl"},{name:"Distraction",stam:25,lvl:900,id:78,nicks:"distraction,dis"},{name:"Coordinated Attack",stam:30,lvl:1000,id:118,nicks:"coordinated attack,coorda"},{name:"Undermine",stam:30,lvl:1000,id:108,nicks:"undermine,um"},{name:"Cursed Rune",stam:30,lvl:1000,id:89,nicks:"cursed rune,crune"},{name:"Anti Deflect",stam:30,lvl:1000,id:105,nicks:"anti deflect,ad"},{name:"Overkill",stam:30,lvl:1200,id:109,nicks:"overkill,ok"},{name:"Smashing Hammer",stam:30,lvl:1200,id:111,nicks:"smashing hammer,sh"},{name:"Mighty Vigor",stam:35,lvl:1200,id:113,nicks:"mighty vigor,mv"},{name:"Fist Fight",stam:30,lvl:1200,id:115,nicks:"fist fight,ff"},{name:"Cursed Ring",stam:30,lvl:1400,id:88,nicks:"cursed ring,cring"},{name:"Sharpen",stam:30,lvl:1400,id:106,nicks:"sharpen,sharp"},{name:"Balanced Attack",stam:30,lvl:1400,id:116,nicks:"balanced attack,ba"},{name:"Heavy Weight",stam:20,lvl:1600,id:146,nicks:"heavy weight, hw"},{name:"Armored Strike",stam:30,lvl:1600,id:130,nicks:"armored strike, armstr"},{name:"Invert",stam:40,lvl:2000,id:173,nicks:"invert"},{name:"Reign of Terror",stam:40,lvl:2500,id:174,nicks:"reign of terror"},{name:"Critical Strike",stam:40,lvl:3000,id:175,nicks:"critical strike"},{name:"Great Vigor",stam:10,lvl:1,id:12,nicks:"great vigor,vigor,gv"},{name:"Fortify",stam:10,lvl:25,id:8,nicks:"fortify"},{name:"Evade",stam:10,lvl:25,id:10,nicks:"evade"},{name:"Absorb",stam:20,lvl:25,id:13,nicks:"absorb,abs"},{name:"Rock Skin",stam:15,lvl:75,id:11,nicks:"rock skin,rs"},{name:"Enchanted Armor",stam:10,lvl:75,id:9,nicks:"enchanted armor,enchant armor,ea,ench arm,ench armor"},{name:"Aura of Protection",stam:20,lvl:150,id:15,nicks:"aura of protection,aop,aofp"},{name:"Deflect",stam:25,lvl:150,id:14,nicks:"deflect,defl"},{name:"Force Shield",stam:10,lvl:200,id:27,nicks:"force shield,fs"},{name:"Unbreakable",stam:20,lvl:200,id:28,nicks:"unbreakable,ub,unb,unbr"},{name:"Honor",stam:10,lvl:800,id:82,nicks:"honor"},{name:"Assist",stam:30,lvl:250,id:36,nicks:"assist,ass"},{name:"Constitution",stam:25,lvl:300,id:37,nicks:"constitution,const"},{name:"Counter Attack",stam:20,lvl:400,id:54,nicks:"counter attack,ca"},{name:"Summon Shield Imp",stam:50,lvl:400,id:55,nicks:"summon shield imp,ssi,imp"},{name:"Vision",stam:20,lvl:500,id:56,nicks:"vision,vis"},{name:"Fortitude",stam:15,lvl:500,id:57,nicks:"fortitude,fort"},{name:"Flinch",stam:20,lvl:600,id:58,nicks:"flinch"},{name:"Terrorize",stam:20,lvl:700,id:59,nicks:"terrorize,terror"},{name:"Nightmare Visage",stam:40,lvl:700,id:60,nicks:"nightmare visage,nv,visage"},{name:"Sanctuary",stam:25,lvl:800,id:44,nicks:"sanctuary,sanc"},{name:"Dull Edge",stam:10,lvl:800,id:46,nicks:"dull edge,de"},{name:"Erosion",stam:25,lvl:900,id:80,nicks:"erosion,ero"},{name:"Avert Gaze",stam:10,lvl:900,id:71,nicks:"avert gaze,ag"},{name:"Enchant Shield",stam:25,lvl:900,id:77,nicks:"enchant shield,es"},{name:"Smite",stam:30,lvl:1000,id:97,nicks:"smite,sm"},{name:"Balanced Defense",stam:30,lvl:1000,id:117,nicks:"balanced defense,bd"},{name:"Bastion",stam:30,lvl:1000,id:122,nicks:"bastion,bast"},{name:"Side Step",stam:30,lvl:1000,id:86,nicks:"side step,sstep"},{name:"High Guard",stam:30,lvl:1200,id:96,nicks:"high guard,hg"},{name:"Barricade",stam:30,lvl:1200,id:98,nicks:"barricade,bar"},{name:"Coordinated Defense",stam:30,lvl:1200,id:119,nicks:"coordinated defense,cd"},{name:"Degrade",stam:30,lvl:1200,id:121,nicks:"degrade,deg,dg"},{name:"Retaliate",stam:30,lvl:1400,id:123,nicks:"retaliate,ret"},{name:"Shame",stam:35,lvl:1400,id:110,nicks:"shame"},{name:"Dispel Curse",stam:35,lvl:1400,id:114,nicks:"dispel curse,dispel"},{name:"Anchored",stam:30,lvl:1600,id:154,nicks:"anchored, anch, anchor"},{name:"Hardened",stam:30,lvl:1600,id:153,nicks:"hardened, hard, harden"},{name:"Armor Boost",stam:30,lvl:1600,id:136,nicks:"armor boost, armbst, arm bst, armb"},{name:"Shield Wall",stam:30,lvl:1600,id:135,nicks:"shield wall, shldwll, sw"},{name:"Layered Armor",stam:40,lvl:2000,id:170,nicks:"layered armor"},{name:"Defensive Aura",stam:40,lvl:2500,id:171,nicks:"defensive aura"},{name:"Fumble",stam:40,lvl:3000,id:172,nicks:"fumble"},{name:"Find Item",stam:10,lvl:1,id:16,nicks:"find item,fi"},{name:"Treasure Hunter",stam:15,lvl:1,id:17,nicks:"treasure hunter,th,treas hunter"},{name:"Deep Pockets",stam:10,lvl:1,id:22,nicks:"deep pockets,dp"},{name:"Quest Finder",stam:5,lvl:1,id:61,nicks:"quest finder,qf"},{name:"Adept Learner",stam:10,lvl:25,id:19,nicks:"adept learner,al"},{name:"Defiance",stam:15,lvl:25,id:18,nicks:"defiance"},{name:"Librarian",stam:10,lvl:75,id:20,nicks:"librarian,lib,libr"},{name:"Merchant",stam:10,lvl:75,id:21,nicks:"merchant,merch,merc"},{name:"Last Ditch",stam:15,lvl:150,id:23,nicks:"last ditch,ld"},{name:"Animal Magnetism",stam:10,lvl:200,id:24,nicks:"animal magnetism,animag,ani mag,am"},{name:"Empower",stam:20,lvl:200,id:25,nicks:"empower,emp"},{name:"Doubler",stam:5,lvl:200,id:26,nicks:"doubler,doub,db"},{name:"Conserve",stam:10,lvl:250,id:39,nicks:"conserve,cons,consv,con"},{name:"Brewing Master",stam:10,lvl:250,id:40,nicks:"brewing master,bm,brm,brewm"},{name:"Four Leaf",stam:20,lvl:250,id:41,nicks:"four leaf,4l,fl"},{name:"Extend",stam:30,lvl:300,id:42,nicks:"extend,ext"},{name:"Inventor",stam:15,lvl:400,id:62,nicks:"inventor,inv,invI,inv1,inventor1,inventor 1,inventor i,inv i,inv 1"},{name:"Extractor",stam:15,lvl:400,id:63,nicks:"extractor,extr"},{name:"Inventor II",stam:20,lvl:500,id:64,nicks:"inventor ii,inventorii,invii,inv2,inventor 2,inv ii,inv 2"},{name:"Buff Master",stam:10,lvl:500,id:65,nicks:"buff master,buffm,bum"},{name:"Reflection",stam:10,lvl:600,id:66,nicks:"reflection,ref,refl,reflect"},{name:"Guild Buffer",stam:10,lvl:600,id:160,nicks:"guild buffer, gldbfr, gb"},{name:"Light Foot",stam:15,lvl:700,id:67,nicks:"light foot,lf"},{name:"Mesmerize",stam:20,lvl:700,id:68,nicks:"mesmerize,mesmer,mes,mez"},{name:"Resource Finder",stam:25,lvl:800,id:76,nicks:"resource finder,rf"},{name:"Quest Hunter",stam:25,lvl:800,id:166,nicks:"quest hunter"},{name:"Gloat",stam:10,lvl:900,id:81,nicks:"gloat"},{name:"Sacrifice",stam:25,lvl:900,id:75,nicks:"sacrifice,sac"},{name:"Reckoning",stam:25,lvl:900,id:72,nicks:"reckoning,rec,rek"},{name:"Reinforce",stam:30,lvl:1000,id:126,nicks:"reinforce,rein"},{name:"Bodyguard",stam:30,lvl:1000,id:120,nicks:"bodyguard,bg"},{name:"Riposte",stam:30,lvl:1000,id:124,nicks:"riposte,rip"},{name:"Severe Condition",stam:30,lvl:1000,id:101,nicks:"severe condition,sc"},{name:"Sealed",stam:35,lvl:1200,id:112,nicks:"sealed,seal"},{name:"Righteous",stam:30,lvl:1200,id:107,nicks:"righteous,right"},{name:"Epic Forge",stam:30,lvl:1200,id:102,nicks:"epic forge,ef"},{name:"Golden Shield",stam:30,lvl:1200,id:103,nicks:"golden shield,gs"},{name:"Stalker",stam:35,lvl:1400,id:125,nicks:"stalker,stalk"},{name:"Ageless",stam:30,lvl:1400,id:100,nicks:"ageless,age"},{name:"Extractor II",stam:30,lvl:1400,id:104,nicks:"extractor ii,extractorii,extii,ext2,extractor 2,ext ii,ext 2"},{name:"Epic Craft",stam:30,lvl:1600,id:159,nicks:"epic craft, epc crft, epccrft, ec"},{name:"Gold Foot",stam:20,lvl:1600,id:137,nicks:"gold foot, goldfoot, gldft, gf"},{name:"Titan Doubler",stam:40,lvl:2000,id:167,nicks:"titan doubler"},{name:"Teleport",stam:40,lvl:2500,id:168,nicks:"teleport"},{name:"Invigorate",stam:40,lvl:3000,id:169,nicks:"invigorate"}];

  // function buff(thisBuff, el) {return el.name === thisBuff;}

  const getBuff = thisBuff => buffList.find(e => e.name === thisBuff);

  function getStamAsString(buffCast) {
    // var thisBuff = buffList.find(partial(buff, buffCast[1]));
    var thisBuff = getBuff(buffCast);
    if (thisBuff) {return thisBuff.stam.toString();}
    return '-';
  }

  function getBuffId(buff) {
    const thisBuff = getBuff(buff);
    if (thisBuff) {return thisBuff.id;}
    return -1;
  }

  const playerName = result => result[3] || result[6] || result[7];
  const successObject = result => (
    {id: getBuffId(result[1]), level: Number(result[2])}
  );

  function failObject(result) {
    if (result[4]) {
      return {id: getBuffId(result[4]), reason: result[5]};
    }
    return {id: getBuffId(result[9]), reason: result[8]};
  }

  function byPlayer(prev, curr) {
    const thisPlayer = playerName(curr);
    let thisObj = prev.find(o => o.player.name === thisPlayer);
    if (!thisObj) {
      thisObj = {player: {name: thisPlayer}, casts: [], failed: []};
      prev.push(thisObj);
    }
    if (curr[1]) {
      thisObj.casts.push(successObject(curr));
    } else {
      thisObj.failed.push(failObject(curr));
    }
    return prev;
  }

  function buffFormatter(buffsParsed) {
    const buffsByPlayer = buffsParsed.reduce(byPlayer, []);
    return {r: buffsByPlayer, s: true};
  }

  function formatResponse(html) {
    const buffsParsed = buffReportParser(createDocument(html));
    return buffFormatter(buffsParsed);
  }

  function quickbuff(userAry, buffAry) {
    return indexAjaxData({
      cmd: 'quickbuff',
      subcmd: 'activate',
      targetPlayers: userAry.join(),
      skills: buffAry
    }).then(formatResponse);
  }

  function fetchinv() {
    return guild({subcmd: 'fetchinv'});
  }

  function findplayer(username) {
    return callApp({
      cmd: 'findplayer',
      subcmd: 'view',
      search_username: username
    });
  }

  function guildManage() {
    return guild({subcmd: 'manage'});
  }

  function guildView(guildId) {
    return guild({subcmd: 'view', guild_id: guildId});
  }

  function quickbuff$1(userAry, buffAry) {
    return callApp({
      cmd: 'quickbuff',
      subcmd: 'activate',
      username: userAry,
      skill: buffAry
    });
  }

  function scouttower() {
    return guild({subcmd: 'scouttower'});
  }

  function superelite() {
    return callApp({cmd: 'superelite'});
  }

  function ajaxReturnCode(json) {
    if (!json.s) {json.r = 1;} else {json.r = 0;}
    return json;
  }

  function senditems(invIdAry) {
    return callApp({
      cmd: 'trade',
      subcmd: 'senditems',
      xc: window.ajaxXC,
      target_username: getValue('itemRecipient'),
      items: invIdAry
    }).then(ajaxReturnCode);
  }

  function viewCombat(id) {
    return callApp({
      cmd: 'combat',
      subcmd: 'view',
      combat_id: id
    });
  }

  function profile(data) {
    return callApp(extend({cmd: 'profile'}, data));
  }

  function view() {
    return profile({subcmd: 'view'});
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
    var doc = createDocument(documentText);
    return infoBox(doc);
  }

  function formatResults(html) {
    const info = infoBoxFrom(html);
    if (info === 'You purchased the item!') {return {s: true};}
    return {e: {message: info}, s: false};
  }

  function bazaarBuy(item) {
    return indexAjaxData({
      cmd: 'potionbazaar',
      subcmd: 'buyitem',
      item_id: item
    }).then(formatResults);
  }

  function buyitem(item) {
    return callApp({
      cmd: 'potionbazaar',
      subcmd: 'buyitem',
      item_id: item
    });
  }

  function allthen(prm, callback) {
    return all(prm).then(callback);
  }

  const componentRe = /\?item_id=(\d+)&inv_id=(\d+)&.*&vcode=([0-9a-f]+)/;

  function details(a) {
    const pattern = a.children[0].dataset.tipped.match(componentRe);
    return {
      a: Number(pattern[2]),
      b: Number(pattern[1]),
      v: pattern[3]
    };
  }

  const getComponents$1 = doc =>
    querySelectorArray('a[href*="=destroycomponent&"]', doc).map(details);

  const getSlots = doc =>
    querySelectorArray('td[background*="1x1mini"]', doc).length;

  function processPages(prm) {
    const asDocs = prm.map(createDocument);
    const perPage = asDocs.map(getComponents$1);
    const r = [].concat(...perPage);
    const cm = asDocs.map(getSlots).reduce((a, b) => a + b, 0);
    return {h: {cm}, r};
  }

  function firstPage(html) {
    const doc = createDocument(html);
    const pages = querySelectorArray('a[href*="profile&component_page="]', doc);
    const profiles = pages.map(a => retryAjax(a.href));
    return allthen(profiles, processPages);
  }

  // Incomplete
  function components() {
    return indexAjaxData({cmd: 'profile'}).then(firstPage);
  }

  function getArrayByClassName(names, element) {
    return arrayFrom(getElementsByClassName(names, element));
  }

  function formatTime(e) {
    const thisTime = e.match(/ETA: (\d+)h (\d+)m (\d+)s/);
    return {
      time_remaining: Number(thisTime[1]) * 60 * 60 +
      Number(thisTime[2]) * 60 +
      Number(thisTime[3])
    };
  }

  function parseReport(html) {
    const doc = createDocument(html);
    const slots = getArrayByClassName('composing-potion', doc);
    if (!slots) {return {s: false};}
    const max_potions = slots.length;
    const potions = getArrayByClassName('composing-potion-time', doc)
      .map(getTextTrim)
      .filter(e => e.endsWith('s'))
      .map(formatTime);
    return {r: {max_potions, potions}, s: true};
  }

  // Incomplete
  function composing() {
    return indexAjaxData({cmd: 'composing'}).then(parseReport);
  }

  function composing$1(data) {
    return callApp(extend({cmd: 'composing'}, data));
  }

  function composingView() {
    return composing$1({subcmd: 'view'});
  }

  function destroyComponent(componentIdAry) {
    return profile({subcmd: 'destroycomponent', removeIndex: componentIdAry});
  }

  function doinvent(recipe) {
    return callApp({
      cmd: 'inventing',
      subcmd: 'doinvent',
      recipe_id: recipe
    });
  }

  function guildInventory(data) {
    return guild(extend({subcmd: 'inventory'}, data));
  }

  function dostoreitems(invIdAry) {
    return guildInventory({
      subcmd2: 'dostoreitems',
      storeIndex: invIdAry
    });
  }

  function ajaxResult(componentId, html) {
    var info = infoBoxFrom(html);
    var _r = 1;
    if (info === 'Component destroyed.') {_r = 0;}
    return {r: _r, m: info, c: componentId};
  }

  function destroyComponent$1(componentId) {
    return indexAjaxData({
      cmd: 'profile',
      subcmd: 'destroycomponent',
      component_id: componentId
    }).then(partial(ajaxResult, componentId));
  }

  function formatResults$1(resultAry) {
    const good = resultAry.filter(e => e.r === 0);
    const bad = resultAry.filter(e => e.r === 1);
    if (good.length > 0) {
      return {r: good.map(e => e.c), s: true};
    }
    if (bad.length > 0) {
      return {e: {message: bad[0].m}, s: false};
    }
    return {e: {message: resultAry[0].m}, s: false};
  }

  function dropComponent(componentIdAry) {
    return allthen(componentIdAry.map(destroyComponent$1), formatResults$1);
  }

  function indexAjaxJson(data) {
    return indexAjax({data: data, dataType: 'json'});
  }

  function backpack() {
    return indexAjaxJson({
      cmd: 'profile',
      subcmd: 'fetchinv'
    });
  }

  function byFolder(items, folder) {
    return {
      id: folder.a,
      name: folder.n,
      items: items.filter(i => i.f === folder.a)
    };
  }

  function formatResponse$1(json) {
    const itemsByFolder = json.folders.map(partial(byFolder, json.items));
    return {r: itemsByFolder, s: true};
  }

  function fetchinv$1() {
    return backpack().then(formatResponse$1);
  }

  function cmdExport(data) {
    return indexAjaxJson(extend({cmd: 'export'}, data));
  }

  let cache = {};

  function profile$1(username) {
    // return cmdExport({player_username: username, subcmd: 'profile'});
    if (!cache[username]) {
      cache[username] = cmdExport({player_username: username, subcmd: 'profile'});
    }
    return cache[username];
  }

  function getProfile(username) {
    return profile$1(username);
  }

  function parseReport$1(json) {
    let last = json.last_login;
    if (!last) {last = 0;}
    return {
      r: [{last_activity: Number(last), vl: json.virtual_level}],
      s: true
    };
  }

  // Incomplete
  function findPlayer(username) {
    return getProfile(username).then(parseReport$1);
  }

  var attackElement;
  var defenseElement;
  var armorElement;
  var damageElement;
  var hpElement;

  function getElements(doc) {
    attackElement = getElementById(def_statAttack, doc);
    defenseElement = getElementById(def_statDefense, doc);
    armorElement = getElementById(def_statArmor, doc);
    damageElement = getElementById(def_statDamage, doc);
    hpElement = getElementById(def_statHp, doc);
  }

  function statAsNumber(el) {
    if (el) {
      return intValue(getText(el));
    }
    return 0;
  }

  function groupViewStats(doc) {
    getElements(doc);
    return {
      attack: statAsNumber(attackElement),
      attackElement: attackElement,
      defense: statAsNumber(defenseElement),
      defenseElement: defenseElement,
      armor: statAsNumber(armorElement),
      armorElement: armorElement,
      damage: statAsNumber(damageElement),
      damageElement: damageElement,
      hp: statAsNumber(hpElement),
      hpElement: hpElement
    };
  }

  function parseReport$2(html) {
    const doc = createDocument(html);
    const stats = groupViewStats(doc);
    // console.log(groupViewStats(doc));
    return {
      r: {
        attributes: [
          {value: stats.attack},
          {value: stats.defense},
          {value: stats.armor},
          {value: stats.damage},
          {value: stats.hp}
        ]
      }
    };
  }

  // Incomplete
  function groupStats(groupId) {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'groups',
      subcmd2: 'viewstats',
      group_id: groupId
    }).then(parseReport$2);
  }

  function guildGroups(data) {
    return guild(extend({subcmd: 'groups'}, data));
  }

  function groupsView() {
    return guildGroups({subcmd2: 'view'});
  }

  function groupsViewStats(groupId) {
    return guildGroups({subcmd2: 'viewstats', group_id: groupId});
  }

  function dialog(data) {
    if (data.r !== 0) {
      dialogMsg(data.m);
    }
    return data;
  }

  function takeItem(invId) {
    return indexAjaxJson({
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'takeitem',
      guildstore_id: invId,
      ajax: 1
    }).then(dialog);
  }

  function formatResults$2(json) {
    if (json.r === 0) {return {s: true};}
    return {e: {message: json.m}, s: false};
  }

  function gsTake(invId) {
    return takeItem(invId).then(formatResults$2);
  }

  function updateType(item) {
    item.a = Number(item.a);
    item.b = Number(item.b);
    item.l = Number(item.l);
    if (item.extra) {
      item.n = item.extra.name;
    }
    item.t = Number(item.t);
    return item;
  }

  function formatResponse$2(json) {
    return {r: json.map(updateType), s: true};
  }

  function guildFetchInv() {
    return indexAjaxJson({
      cmd: 'guild',
      subcmd: 'fetchinv'
    }).then(formatResponse$2);
  }

  function htmlResult(data) {
    var info = infoBoxFrom(data);
    if (info.includes('successfully')) {
      return {s: true};
    }
    return {e: {message: info}, s: false};
  }

  function guildInvRecall(invId, playerId, mode) {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'recall',
      id: invId,
      player_id: playerId,
      mode: mode
    }).then(htmlResult);
  }

  const dataRows = (cols, skip) =>
    (el, i) => el.children.length === cols && i > skip;

  let cache$1 = {};

  function lastActivity(tipped) {
    const activity = tipped.match(lastActivityRE);
    return nowSecs - (
      Number(activity[1]) * 24 * 60 * 60 +
      Number(activity[2]) * 60 * 60 +
      Number(activity[3]) * 60 +
      Number(activity[4])
    );
  }

  function formatRow(row, i) {
    const tipped = row.cells[1].children[0].dataset.tipped;
    const stamina = tipped.match(/Stamina:<\/td><td>(\d+) \/ (\d+)</);
    return {
      id: Number(row.cells[1].children[0].href.match(/player_id=(\d+)/)[1]),
      name: getTextTrim(row.cells[1].children[0]),
      level: Number(getTextTrim(row.cells[2])),
      current_stamina: Number(stamina[1]),
      max_stamina: Number(stamina[2]),
      xp: 0,
      vl: Number(tipped.match(/VL:<\/td><td>(\d+)</)[1]),
      last_activity: lastActivity(tipped),
      guild_xp: intValue(getTextTrim(row.cells[4])),
      rank_name: getTextTrim(row.cells[3]),
      rank_index: i
    };
  }

  function byRank(prev, member) {
    const thisRankName = member.rank_name;
    const thisRankIndex = member.rank_index;
    const thisRankObj = prev.find(e => e.name === thisRankName);
    if (thisRankObj) {
      thisRankObj.members.push(member);
    } else {
      prev.push({id: thisRankIndex, name: thisRankName, members: [member]});
    }
    return prev;
  }

  function parseReport$3(html) {
    const doc = createDocument(html);
    const pCC = getElementById('pCC', doc);
    const tables = getElementsByTagName(def_table, pCC);
    const memberList = tables[tables.length - 1];
    if (!memberList) {return {s: false};}
    const memberRows = arrayFrom(memberList.rows).filter(dataRows(5, 1));
    const memberData = memberRows.map(formatRow);
    const ranksData = memberData.reduce(byRank, []);
    return {r: {ranks: ranksData}, s: true};
  }

  // Incomplete
  function guildView$1(guildId) {
    // console.log('guildView...');
    // return indexAjaxData({cmd: 'guild', subcmd: 'view', guild_id: guildId})
    //   .then(parseReport);
    if (!cache$1[guildId]) {
      cache$1[guildId] = indexAjaxData({
        cmd: 'guild',
        subcmd: 'view',
        guild_id: guildId
      }).then(parseReport$3);
    }
    return cache$1[guildId];
  }

  // Incomplete
  function guildManage$1() {
    var guildId = currentGuildId();
    if (guildId) {
      return guildView$1(currentGuildId());
    }
    return Promise.reject(new Error('no guild id'));
  }

  function itemId(href) {
    return href.match(/&id=(\d+)/)[1];
  }

  function details$1(td) {
    if (!td.children[0].href) {return {a: -1, n: '-1', t: -1};}
    const thisId = Number(itemId(td.children[0].href));
    const thisName = getTextTrim(td.previousElementSibling);
    const ret = {a: thisId};
    if (thisName.endsWith(' (Potion)')) {
      ret.n = thisName.slice(0, -9);
      ret.t = 15;
    } else {
      ret.n = thisName;
      ret.t = -1;
    }
    return ret;
  }

  function parseReport$4(html) {
    const doc = createDocument(html);
    const nodeList = querySelectorArray('#pCC table table td:nth-of-type(3n)',
      doc);
    return {r: nodeList.map(details$1), s: true};
  }

  // Incomplete
  function guildReport() {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'report'
    }).then(parseReport$4);
  }

  const tests = [
    json => isObject(json),
    json => 's' in json,
    json => !json.s,
    json => 'e' in json,
    json => json.e.message === 'Unknown Command'
  ];

  function hasFailed(json) {
    return tests.every(f => f(json));
  }

  function formatResult(html) {
    var info = infoBoxFrom(html);
    if (info.includes('successfully')) {
      return {r: {item: {}}, s: true};
    }
    return {e: {message: info}, s: false};
  }

  function invent(recipe) {
    return indexAjaxData({
      cmd: 'inventing',
      subcmd: 'doinvent',
      recipe_id: recipe
    }).then(formatResult);
  }

  function loadComponents() {
    return profile({subcmd: 'loadcomponents'});
  }

  function loadInventory() {
    return profile({subcmd: 'loadinventory'});
  }

  function tempinvTake(invId) {
    return indexAjaxJson({
      cmd: 'tempinv',
      subcmd: 'takeitem',
      temp_id: invId,
      ajax: 1
    });
  }

  function formatResults$3(resultAry) {
    const good = resultAry.filter(e => e.r === 0);
    const bad = resultAry.filter(e => e.r !== 0);
    if (good.length > 0) {
      return {r: good.map(e => ({id: e.temp_id})), s: true};
    }
    if (bad.length > 0) {
      return {e: {message: bad[0].m}, s: false};
    }
    return {e: {message: resultAry[0].m}, s: false};
  }

  function mailboxTake(invIdAry) {
    return allthen(invIdAry.map(tempinvTake), formatResults$3);
  }

  function moveItem(invIdList, folderId) {
    return indexAjaxJson({
      cmd: 'profile',
      subcmd: 'sendtofolder',
      inv_list: JSON.stringify(invIdList),
      folder_id: folderId,
      ajax: 1
    }).then(dialog);
  }

  function moveItems(folderId, itemsAry) {
    return moveItem(itemsAry, folderId).then(() => ({r: itemsAry}));
  }

  function moveRank(direction, rankId) {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'ranks',
      subcmd2: direction,
      rank_id: rankId
    }).then(() => ({s: true}));
  }

  function ranks(data) {
    return guild(extend({subcmd: 'ranks'}, data));
  }

  function rankPosition(direction, rankId) {
    return ranks({subcmd2: direction, rank_id: rankId});
  }

  function querySelector(selector, scope) {
    if (scope) {return scope.querySelector(selector);}
    return document.querySelector(selector);
  }

  const rankPerms = rankId => indexAjaxData({
    cmd: 'guild',
    subcmd: 'ranks',
    subcmd2: 'add',
    rank_id: rankId
  });

  const rankFromInput = input =>
    rankPerms(input.getAttribute('onclick').match(/[=](\d+)/)[1]);

  const permFlags = doc =>
    querySelectorArray('input[name^="permission"]:checked', doc)
      .reduce((a, b) => a + 2 ** Number(b.name.match(/\[(\d+)\]/)[1]), 0);

  function parsePerms(doc) {
    return {
      id: Number(querySelector('input[name="rank_id"]', doc).value),
      name: querySelector('input[name="rank_name"]', doc).value,
      permissions: permFlags(doc),
      tax: Number(querySelector('input[name="rank_tax"]', doc).value)
    };
  }

  function formatPerms(ary) {
    const docs = ary.map(createDocument);
    const ranks = docs.map(parsePerms);
    return {r: {'0': ranks[0], ranks: ranks.slice(1)}, s: true};
  }

  function processRanks(html) {
    const doc = createDocument(html);
    const editButton = querySelectorArray('input[value="Edit"]', doc);
    return allthen(editButton.map(rankFromInput), formatPerms);
  }

  // Incomplete
  function ranksView() {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'ranks'
    }).then(processRanks);
  }

  function recall(invId, playerId, mode) {
    return guildInventory({
      subcmd2: 'recall',
      id: invId,
      player_id: playerId,
      mode: mode
    });
  }

  function report() {
    return guildInventory({subcmd2: 'report'});
  }

  function chunk(size, ary) {
    var ret = [];
    for (var i = 0; i < ary.length; i += size) {
      ret.push(ary.slice(i, i + size));
    }
    return ret;
  }

  function parseDateAsTimestamp(textDate) {
    var dateAry = textDate.split(/[: /[]/);
    return new Date(Number(dateAry[4]), months.indexOf(dateAry[3]),
      Number(dateAry[2]), Number(dateAry[0]), Number(dateAry[1]));
  }

  function calcCd(e) {
    const cdText = getTextTrim(e[1]);
    if (cdText === 'No active cooldown') {return 0;}
    return Math.ceil(
      (parseDateAsTimestamp(cdText.slice(16)) - now) / 1000);
  }

  function creature(e) {
    const mobImg = e[0].cells[0].children[0];
    return {
      base_id: Number(mobImg.src.match(/s\/(\w+)\.p/)[1].slice(0, -32)),
      name: mobImg.title,
    };
  }

  function testTitan(e) {
    const ret = {
      cooldown: calcCd(e),
      creature: creature(e),
      kills: Number(getTextTrim(e[0].cells[3]))
    };
    const loc = getTextTrim(e[0].cells[1]);
    if (loc !== 'n/a') {
      ret.realm = loc;
      const kills = getTextTrim(e[0].cells[2]).match(/(\d+)\/(\d+)/);
      ret.current_hp = Number(kills[1]);
      ret.max_hp = Number(kills[2]);
    }
    ret.three = getTextTrim(e[2]);
    const contribs = e[2].cells[0].children;
    if (contribs.length === 1) {
      const thisRows = arrayFrom(contribs[0].rows).filter(dataRows(3, 0));
      ret.contributors = thisRows.map(r => ({
        kills: Number(getTextTrim(r.cells[1])),
        player: {name: getTextTrim(r.cells[0])}
      }));
    }
    return ret;
  }

  function parseReport$5(html) {
    const doc = createDocument(html);
    const titanTable = querySelector('table[width="500"]', doc);
    if (!titanTable) {return {s: false};}
    const thisRows = arrayFrom(titanTable.rows)
      .filter((e, i, a) => i !== 0 && i < a.length - 1 && (i - 1) % 6 < 3);
    const titans = chunk(3, thisRows);
    return {r: titans.map(testTitan), s: true};
  }

  // Incomplete
  function scouttower$1() {
    return indexAjaxData({cmd: 'guild', subcmd: 'scouttower'}).then(parseReport$5);
  }

  function ajaxResult$1(html) {
    var info = infoBoxFrom(html);
    var _r = 1;
    if (info.includes('successfully')) {_r = 0;}
    return {r: _r, m: info};
  }

  function senditems$1(invIdAry) {
    return indexAjaxData({
      cmd: 'trade',
      subcmd: 'senditems',
      xc: window.ajaxXC,
      target_username: getValue('itemRecipient'),
      sendItemList: invIdAry
    }).then(ajaxResult$1);
  }

  function sendtofolder(folderId, itemsAry) {
    return callApp({
      cmd: 'profile',
      subcmd: 'sendtofolder',
      folder_id: folderId,
      folderItem: itemsAry
    });
  }

  function setValueJSON(name, value) {
    setValue(name, JSON.stringify(value));
  }

  function storeitems(invIdAry) {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'dostoreitems',
      storeIndex: invIdAry
    }).then(htmlResult);
  }

  function parseDateAsOffset(textDate) {
    var dateAry = textDate.replace('<br>', ' ').split(/[: /]/);
    return Math.floor(
      (now - Date.UTC(Number(dateAry[2]), months.indexOf(dateAry[1]),
        Number(dateAry[0]), Number(dateAry[3]), Number(dateAry[4]), 0)) / 1000
    );
  }

  function formatRow$1(row) {
    return {
      time: parseDateAsOffset(row.cells[0].innerHTML),
      creature: {name: getTextTrim(row.cells[1])}
    };
  }

  function parseReport$6(html) {
    const doc = createDocument(html);
    const logTable = querySelector('#pCC table table', doc);
    if (!logTable) {return {s: false};}
    const rows = arrayFrom(logTable.rows).filter(dataRows(4, 1));
    const data = rows.map(formatRow$1);
    return {r: data, s: true, t: '0 ' + String(nowSecs)};
  }

  // Incomplete
  function superelite$1() {
    return indexAjaxData({cmd: 'superelite'}).then(parseReport$6);
  }

  function takeitem(invId) {
    return guildInventory({
      subcmd2: 'takeitem',
      guildstore_id: invId,
    });
  }

  function takeitems(invIdAry) {
    return callApp({
      cmd: 'tempinv',
      subcmd: 'takeitems',
      item: invIdAry
    });
  }

  function formatResults$4(html) {
    const info = infoBoxFrom(html);
    if (!info) {return {s: true};}
    return {e: {message: info}, s: false};
  }

  function unequip(item) {
    return indexAjaxData({
      cmd: 'profile',
      subcmd: 'unequipitem',
      inventory_id: item
    }).then(formatResults$4);
  }

  function unequipitem(item) {
    return profile({
      subcmd: 'unequipitem',
      inventory_id: item
    });
  }

  const extract = info => ({r: {item: {n: info.match(/'(.*)'/)[1]}}, s: true});

  function fragObj(pair) {
    const thisResult = pair.match(/(\d+) x (.*)/);
    return {
      amount: thisResult[1],
      type: composingFragmentType.indexOf(thisResult[2])
    };
  }

  function stash(info) {
    const frags = info.match(/You gained (.*) Fragments/)[1].split(', ')
      .map(fragObj);
    return {r: {frags}, s: true};
  }

  const outputLookup = [
    ['You successfully used', () => ({s: true})],
    ['You successfully extracted', extract],
    ['You failed to extract', () => ({r: {}, s: true})],
    ['You gained', stash]
  ];

  function formatResults$5(html) {
    const info = infoBoxFrom(html);
    const thisResult = outputLookup.find(e => info.startsWith(e[0]));
    if (thisResult) {return thisResult[1](info);}
    return {e: {message: info}, s: false};
  }

  function useItem(backpackInvId) {
    return indexAjaxData({
      cmd: 'profile',
      subcmd: 'useitem',
      inventory_id: backpackInvId
    }).then(formatResults$5);
  }

  function useitem(item) {
    return profile({
      subcmd: 'useitem',
      inventory_id: item
    });
  }

  const getInt = cell => intValue(getTextTrim(cell));

  function formatData(row) {
    return {
      player: {level: 0, name: getTextTrim(row.cells[0])},
      stats: [
        getInt(row.cells[3]),
        getInt(row.cells[4]),
        getInt(row.cells[5]),
        getInt(row.cells[6]),
        getInt(row.cells[7]),
        getInt(row.cells[9]),
        getInt(row.cells[1]),
        getInt(row.cells[2]),
        getInt(row.cells[8])
      ]
    };
  }

  function parseReport$7(html) {
    const doc = createDocument(html);
    const advisorTable = querySelector('#pCC table table', doc);
    const advisorRows = arrayFrom(advisorTable.rows).slice(1, -1);
    const advisorData = advisorRows.map(formatData);
    return {r: advisorData, s: true};
  }

  // Incomplete
  function viewAdvisor(period) {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'advisor',
      subcmd2: 'view',
      period: period
    }).then(parseReport$7);
  }

  function combatView(id) {
    return indexAjaxData({
      cmd: 'combat',
      subcmd: 'view',
      combat_id: id
    });
  }

  function getId(e) {
    return Number(e.getAttribute('background').match(/\/(\d+)/)[1]);
  }

  function getResult(script, e) {
    const thisRe = new RegExp(e + ' = (\\d+)');
    return Number(script.match(thisRe)[1]);
  }

  const specialMask = [
    [18, /(\w+)+ leeched the buff '([A-Za-z ]+)'./],
    [21,
      /(\w+)+ was mesmerized by Spell Breaker, losing the '([A-Za-z ]+)' buff./]
  ];

  function gettokens(spec) {
    // const [specId, specMatch] = specialMask
    //   .map(([id, mask]) => [id, spec.match(mask)])
    //   .find(([, match]) => match);
    // return {id: specId, params: [specMatch[1], specMatch[2]]};
    const thisTests = specialMask
      .map(([id, mask]) => [id, spec.match(mask)])
      .find(([, match]) => match);
    if (!thisTests) {
      sendEvent('Logs', 'Missing PvP Special', spec);
      return {id: -1, params: ['-1', '-1']};
    }
    return {id: thisTests[0], params: [thisTests[1][1], thisTests[1][2]]};
  }

  function formatSpecial(pCC) {
    const spec = querySelectorArray('#specialsDiv', pCC)
      .map(getTextTrim)
      .filter(t => ['leeched', 'Spell'].some(s => t.includes(s)))
      .map(gettokens);
    return spec;
  }

  function parseReport$8(id, html) {
    const doc = createDocument(html);
    const pCC = getElementById('pCC', doc);
    const script = getText(pCC.children[1]);
    const header = pCC.children[0].rows[5].cells[0].children[0];
    return {
      r: {
        attacker: {
          id: getId(header.rows[1].cells[0]),
          name: getTextTrim(header.rows[0].cells[0])
        },
        defender: {
          id: getId(header.rows[1].cells[2]),
          name: getTextTrim(header.rows[0].cells[2])
        },
        gold_gain: getResult(script, 'goldGain'),
        gold_stolen: getResult(script, 'goldStolen'),
        id: Number(id),
        pvp_prestige_gain: getResult(script, 'prestigeGain'),
        pvp_rating_change: getResult(script, 'pvpRatingChange'),
        specials: formatSpecial(pCC),
        winner: getResult(script, 'winner'),
        xp_gain: getResult(script, 'xpGain')
      },
      s: true
    };
  }

  // Incomplete
  function viewCombat$1(id) {
    return combatView(id).then(partial(parseReport$8, id));
  }

  var thisPlayerName;

  function playerName$1() {
    if (!thisPlayerName) {
      var statBarCharacter = getElementById('statbar-character');
      if (statBarCharacter) {
        thisPlayerName = getText(statBarCharacter);
      }
    }
    return thisPlayerName;
  }

  function parseReport$9(html) {
    const doc = createDocument(html);
    const disband = querySelector('#pCC img[src$="disband.gif"]', doc);
    if (!disband) {return {};}
    const id = Number(disband.parentNode.href.match(/\((\d+)\)/)[1]);
    return {r: [{id: id, members: [{name: playerName$1()}]}]};
  }

  // Incomplete
  function viewGroups() {
    return indexAjaxData({cmd: 'guild', subcmd: 'groups'}).then(parseReport$9);
  }

  function parseReport$a(html) {
    const doc = createDocument(html);
    const select = querySelector('select[name="combatSetId"]', doc);
    if (!select) {return {s: false};}
    const sets = arrayFrom(select.children).filter((e, i) => i > 0)
      .map(o => ({id: Number(o.value)}));
    const vl = Number(getTextTrim(getElementById('stat-vl', doc)));
    return {
      r: {equip_sets: sets, last_activity: 0, virtual_level: vl},
      s: true
    };
  }

  // Incomplete
  function viewProfile() {
    return indexAjaxData({cmd: 'profile'}).then(parseReport$a);
  }

  let appBad$1;

  function resetAppBad() {
    if (appBad$1[0] < nowSecs - 24 * 60 * 60) {appBad$1 = [nowSecs, false];}
  }

  function initAppBad() {
    if (!appBad$1) {
      appBad$1 = getValueJSON('appBad') || [nowSecs, false];
      resetAppBad();
    }
  }

  function _dataAccess(appFn, fallbackFn, ...args) {
    initAppBad();
    if (appBad$1[1]) {return fallbackFn(...args);}
    return appFn(...args)
      .then(function(json) {
        if (hasFailed(json)) {
          appBad$1 = [nowSecs, true];
          setValueJSON('appBad', appBad$1);
          return fallbackFn(...args);
        }
        return json;
      })
      .catch(() => fallbackFn(...args));
  }

  const daAdvisor = period =>
    _dataAccess(advisorView, viewAdvisor, period);
  const daBazaarBuy = item => _dataAccess(buyitem, bazaarBuy, item);
  const daComponents = () => _dataAccess(loadComponents, components);
  const daComposing = () => _dataAccess(composingView, composing);
  const daDestroyComponent = componentIdAry =>
    _dataAccess(destroyComponent, dropComponent, componentIdAry);
  const daDoInvent = recipe => _dataAccess(doinvent, invent, recipe);
  const daFindPlayer = username =>
    _dataAccess(findplayer, findPlayer, username);
  const daGroupStats = groupId =>
    _dataAccess(groupsViewStats, groupStats, groupId);
  const daGsTake = invId =>
    _dataAccess(takeitem, gsTake, invId);
  const daGuildFetchInv = () => _dataAccess(fetchinv, guildFetchInv);
  const daGuildManage = () => _dataAccess(guildManage, guildManage$1);
  const daGuildRecall = (invId, playerId, mode) =>
    _dataAccess(recall, guildInvRecall, invId, playerId, mode);
  const daGuildReport = () => _dataAccess(report, guildReport);
  const daGuildView = guildId =>
    _dataAccess(guildView, guildView$1, guildId);
  const daLoadInventory = () => _dataAccess(loadInventory, fetchinv$1);
  const daMailboxTake = invIdAry =>
    _dataAccess(takeitems, mailboxTake, invIdAry);
  const daQuickbuff = (userAry, buffAry) =>
    _dataAccess(quickbuff$1, quickbuff, userAry, buffAry);
  const daRankPosition = (direction, rankId) =>
    _dataAccess(rankPosition, moveRank, direction, rankId);
  const daRanksView = () => _dataAccess(ranks, ranksView);
  const daScoutTower = () => _dataAccess(scouttower, scouttower$1);
  const daSendItems = invIdAry =>
    _dataAccess(senditems, senditems$1, invIdAry);
  const daSendToFolder = (folderId, itemsAry) =>
    _dataAccess(sendtofolder, moveItems, folderId, itemsAry);
  const daStoreItems = invIdAry =>
    _dataAccess(dostoreitems, storeitems, invIdAry);
  const daSuperElite = () => _dataAccess(superelite, superelite$1);
  const daUnequipItem = item => _dataAccess(unequipitem, unequip, item);
  const daUseItem = item => _dataAccess(useitem, useItem, item);
  const daViewCombat = id => _dataAccess(viewCombat, viewCombat$1, id);
  const daViewGroups = () => _dataAccess(groupsView, viewGroups);
  const daViewProfile = () => _dataAccess(view, viewProfile);

  function handleEvent(passingTest, evtAry, evt) {
    var self = evt.target;
    var hdl = evtAry.find(partial(passingTest, self));
    if (hdl) {return hdl[1](self);}
  }

  function passingTest(self, el) {return el[0](self);}

  function eventHandler5(evtAry) {
    return partial(handleEvent, passingTest, evtAry);
  }

  function guildStore() {
    return cmdExport({inc_tagged: '1', subcmd: 'guild_store'});
  }

  function inventory() {
    return cmdExport({subcmd: 'inventory'});
  }

  function getInventory() {
    if (calf.subcmd === 'guildinvmgr') {
      return guildStore();
    }
    return inventory();
  }

  function outputResult(result, handle) {
    insertHtmlBeforeEnd(handle,
      '<li class="fshNbrList">' + result + '</li>');
  }

  var lastMsg;

  function notSeenErrorMessage(json) {
    return !json.s && lastMsg !== json.e.message;
  }

  function jsonFail(json, handle) {
    if (notSeenErrorMessage(json)) {
      lastMsg = json.e.message;
      outputResult(json.e.message, handle);
    }
    if (!json.s) {return true;}
  }

  function idTest(id, self) {
    return self.id === id;
  }

  function selfIdIs(id) {
    return partial(idTest, id);
  }

  var extTbl;
  var playerId$1;
  var extractInv;
  var selectST;
  var selectMain;
  var resourceList;
  var buyResult;

  function thisItem(invId, el) {return el.inv_id === invId;}

  function backpackRemove(invId) {
    var thisIndex = extractInv.findIndex(partial(thisItem, invId));
    if (thisIndex >= 0) {
      extractInv.splice(thisIndex, 1);
    }
  }

  function expandFrags(frag) {
    return frag.amount + ' x ' + composingFragmentType[frag.type];
  }

  function processResult(r) {
    if (r.item) {
      return 'You successfully extracted 1 \'' + r.item.n +
        '\' component(s) from 1 resource(s).</span>';
    }
    if (r.frags) {
      return 'You gained ' + r.frags.map(expandFrags).join(', ') +
        ' Fragments by opening the Fragment Stash.';
    }
    return '<span class="fshRed">You failed to extract any components from ' +
      'resource(s).</span>';
  }

  function quickDoneExtracted(invId, json) {
    if (jsonFail(json, buyResult)) {return;}
    backpackRemove(invId);
    outputResult(processResult(json.r), buyResult);
  }

  function ajaxExtract(el) {daUseItem(el).then(partial(quickDoneExtracted, el));}

  function doExtract(target) {
    var inventoryIDs = resourceList[target.id.replace('fshExtr', '')].invIDs;
    target.parentNode.innerHTML = 'extracting all ' +
      inventoryIDs.length + ' resources';
    inventoryIDs.forEach(ajaxExtract);
  }

  function extractAllSimilar(self) {
    jConfirm('Extract Resources',
      'Are you sure you want to extract all similar items?',
      partial(doExtract, self)
    );
  }

  function inMain(item) {
    return selectMain && item.folder_id !== -1;
  }

  function inSt(item) {
    return !selectST && item.is_in_st;
  }

  function checkFlags(item) {
    return inMain(item) || inSt(item);
  }

  function resources(prev, item) {
    if (checkFlags(item)) {return prev;}
    if (prev[item.item_id]) {
      prev[item.item_id].invIDs.push(item.inv_id);
    } else {
      prev[item.item_id] = {
        invIDs: [item.inv_id],
        inv_id: item.inv_id,
        item_name: item.item_name
      };
    }
    return prev;
  }

  function tableRows(prev, item_id) {
    var res = resourceList[item_id];
    return prev + '<tr><td class="fshCenter"><span class="smallLink"' +
      ' id="fshExtr' + item_id +
      '">Extract all ' + res.invIDs.length + '</span></td>' +
      '<td><img src="' + imageServer + '/items/' +
      item_id + '.gif" class="tip-dynamic" data-tipped="' +
      'fetchitem.php?item_id=' + item_id + '&inv_id=' +
      res.inv_id + '&t=1&p=' + playerId$1 +
      '" border=0></td><td>' + res.item_name + '</td></tr>';
  }

  function showQuickExtract() {
    if (!extractInv) {return;}
    resourceList = extractInv.reduce(resources, {});
    var output =
      '<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr>' +
      '<tr><td colspan="3"><ol id="qeresult"></ol></td></tr>';
    output += Object.keys(resourceList).reduce(tableRows, '');
    extTbl.innerHTML = output;
    buyResult = getElementById('qeresult');
  }

  function isExtractable(item) {
    return item.item_name === 'Zombie Coffin' ||
      item.type === 12 ||
      item.type === 16;
  }

  function prepInv(data) {
    playerId$1 = data.player_id;
    extractInv = data.items.filter(isExtractable);
    showQuickExtract();
  }

  function toggleSelectSt() {
    selectST = !selectST;
    showQuickExtract();
  }

  function toggleSelectMain() {
    selectMain = !selectMain;
    showQuickExtract();
  }

  function extractable(self) {return self.id.startsWith('fshExtr');}

  function extractEvents() {
    return [
      [selfIdIs('fshInSt'), toggleSelectSt],
      [selfIdIs('fshInMain'), toggleSelectMain],
      [extractable, extractAllSimilar]
    ];
  }

  function insertQuickExtract(injector) { // jQuery.min
    if (jQueryNotPresent()) {return;}
    var content = injector || pCC;
    content.innerHTML = '<div class="qeHead"><b>Quick Extract</b></div>' +
      'Select which type of plants you wish to extract all of. Only ' +
      'select extractable resources.<br>' +
      '<label><input type="checkbox" id="fshInSt" checked>' +
      ' Select items in ST</label>&nbsp;&nbsp;' +
      '<label><input type="checkbox" id="fshInMain" checked>' +
      ' Only extract items in Main Folder</label>';
    extTbl = createTable({width: '100%'});
    insertElement(content, extTbl);
    selectST = true;
    selectMain = true;
    on(content, 'click', eventHandler5(extractEvents()));
    getInventory().then(prepInv);
  }

  function spacer(key) {
    if (key === '0') {return '';}
    return ' &ensp;';
  }

  function makeFolderSpan(key, value) {
    return spacer(key) +
      '<span class="fshLink fshNoWrap fshFolder fshVMid" data-folder="' +
      key + '">' + value + '</span>';
  }

  function initSort() {
    calf.sortBy = 'n';
    calf.sortAsc = true;
  }

  function isUseable(item) {
    if ([10, 12, 15, 16].indexOf(item.t) !== -1 ||
        item.n === 'Zombie Coffin') {
      return 'smallLink';
    }
    return 'notLink';
  }

  function itemImage(item) {
    var ret = imageServer + '/';
    if (item.b === 13699) {
      ret += 'composing/potions/' + item.extra.design + '_' +
        item.extra.color + '.gif';
    } else {
      ret += 'items/' + item.b + '.gif';
    }
    return ret;
  }

  function tableRows$1(tbl, currentPlayerId, item) {
    var newRow = tbl.insertRow(-1);
    item.dom = newRow;
    var equipClass = 'fshEq ';
    var useClass = 'fshUse ';
    if (item.t < 9) {equipClass += 'smallLink';} else {equipClass += 'notLink';}
    useClass += isUseable(item);
    newRow.innerHTML = '<td class="fshCenter"><span class="' + equipClass +
      '" data-itemid="' + item.a + '">Wear</span>&nbsp;|&nbsp;<span class="' +
      useClass + '" data-itemid="' + item.a +
      '">Use/Ext</span></td><td><img src="' + itemImage(item) +
      '" class="tip-dynamic" data-tipped="fetchitem.php?item_id=' + item.b +
      '&amp;inv_id=' + item.a + '&amp;t=1&amp;p=' + currentPlayerId +
      '&amp;currentPlayerId=' + currentPlayerId +
      '" width="30" height="30" border="0"></td><td width="90%">&nbsp;' +
      item.n + '</td>';
  }

  function folderHtml(folderObj) {
    return makeFolderSpan(String(folderObj.id), folderObj.name);
  }

  function makeFolderSpans(appInv) {
    return makeFolderSpan('0', 'All') + appInv.r.map(folderHtml).join('');
  }

  function addRows(tbody, currentPlayerId, aFolder) {
    aFolder.items.sort(stringSort)
      .forEach(partial(tableRows$1, tbody, currentPlayerId));
  }

  function makeQwTable(appInv) {
    var tbl = createTable({
      width: '100%',
      innerHTML: '<thead><tr><th class="fshCenter" colspan="3">' +
        makeFolderSpans(appInv) + '</th></tr>' +
        '<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th>' +
        '<th colspan="2">Items</th></tr></thead>'
    });
    var tbody = createTBody();
    insertElement(tbl, tbody);
    initSort();
    appInv.r.forEach(partial(addRows, tbody, playerId()));
    return tbl;
  }

  function createQuickWear(appInv) {
    var tbl = makeQwTable(appInv);
    var qw = createDiv();
    insertElement(qw, tbl);
    return qw;
  }

  function equipItem(backpackInvId) {
    return indexAjaxJson({
      cmd: 'profile',
      subcmd: 'equipitem',
      inventory_id: backpackInvId,
      ajax: 1
    }).then(dialog);
  }

  /*
  Based on
  https://github.com/addyosmani/pubsubz
  */

  var topics = {};
  var subUid = -1;

  function execute(args, el) {add(3, el.func, [args]);}

  function publish(topic, args) {
    console.log('publish', topic); // eslint-disable-line no-console
    if (!topics[topic]) {return;}
    topics[topic].forEach(partial(execute, args));
    return true; // probably not needed
  }

  function subscribe(topic, func) {
    if (!topics[topic]) {topics[topic] = [];}
    subUid += 1;
    var token = subUid.toString();
    topics[topic].push({token: token, func: func});
    return token;
  }

  function subscribeOnce(topic, func) {
    if (topics[topic]) {
      return topics[topic][0].token;
    }
    return subscribe(topic, func);
  }

  function hasSub(token, subs, el, i) {
    if (el.token === token) {
      subs.splice(i, 1);
      return true;
    }
  }

  function hasTopic(token, subs) {
    return subs.some(partial(hasSub, token, subs));
  }

  function unsubscribe(token) {
    if (topics.values().some(partial(hasTopic, token))) {return token;}
  }

  const toggleId = (groupName, i) => groupName + String(i);

  function makeRadio(groupName, e, i) {
    return createInput({
      checked: i === 0,
      id: toggleId(groupName, i),
      name: groupName,
      type: 'radio'
    });
  }

  function makeListItem(groupName, thisDivs, e, i) {
    const thisLi = createLi({className: 'ui-state-default ui-corner-top'});
    insertElement(thisLi, createLabel({
      htmlFor: toggleId(groupName, i),
      innerHTML: e
    }));
    if (i !== 0) {
      once(thisLi, 'click', function() {
        publish(toggleId(groupName, i), thisDivs[i]);
      });
    }
    return thisLi;
  }

  function makeUl(tabs, groupName, thisDivs) {
    const thisUl = createUl({
      className: 'ui-tabs-nav ui-helper-reset ui-helper-clearfix ' +
        'ui-widget-header ui-corner-all'
    });
    const thisItems = tabs.map(partial(makeListItem, groupName, thisDivs));
    thisItems.forEach(partial(insertElement, thisUl));
    return thisUl;
  }

  const makeDiv = () => createDiv({className: 'ui-tabs-panel ui-corner-bottom'});

  function fshTabSet(container, tabs, groupName) {
    const thisTabSet =
      createDiv({
        className: 'fshTabSet ' +
          'ui-tabs ui-widget-content ui-corner-all'
      });
    const appendToTabSet = partial(insertElement, thisTabSet);
    const thisRadios = tabs.map(partial(makeRadio, groupName));
    thisRadios.forEach(appendToTabSet);
    const thisDivs = tabs.map(makeDiv);
    publish(toggleId(groupName, 0), thisDivs[0]);
    const thisList = makeUl(tabs, groupName, thisDivs);
    publish(groupName + '-header', thisList);
    insertElement(thisTabSet, thisList);
    thisDivs.forEach(appendToTabSet);
    container.innerHTML = '';
    insertElement(container, thisTabSet);
    return 0;
  }

  function hasClass(className, el) {
    return el.classList.contains(className);
  }

  function exists(el, className) {return hasClass(className, el);}

  function hasClasses(classAry, el) {
    return classAry.every(partial(exists, el));
  }

  function foundInvItem(invCount, name) {
    if (invCount[name]) {
      invCount[name].count += 1;
    } else {
      invCount[name] = {count: 1, nicknameList: []};
    }
  }

  function ahLink(searchname, nickname) {
    return '<a href="' + ahSearchUrl + searchname + '">' + nickname + '</a>';
  }

  function found(pair) {return pair[1].nicknameList.length > 0;}

  function foundHtml(pair) {
    return '<tr><td>' + pair[0] + '</td><td>' +
      pair[1].nicknameList.map(partial(ahLink, pair[0])).join(' ') +
      '</td><td>' + pair[1].count + '</td><td></td><td></td></tr>';
  }

  function displayFoundCount(invCount) {
    return Object.entries(invCount).filter(found).map(foundHtml).join('');
  }

  function notFound(item) {return item.displayOnAH && !item.found;}

  function notFoundHtml(item) {return ahLink(item.searchname, item.nickname);}

  function displayNotFound(quickSL) {
    return quickSL.filter(notFound).map(notFoundHtml).join(', ');
  }

  function others(pair) {return pair[1].nicknameList.length === 0;}

  function otherHtml(pair) {
    return '<tr><td>' + pair[0] + '</td><td></td><td>' + pair[1].count +
      '</td><td></td><td></td></tr>';
  }

  function displayOtherCount(invCount) {
    return Object.entries(invCount).filter(others).map(otherHtml).join('');
  }

  function buildHTML(invCount, quickSL) {
    // TODO this is going to need significant rebuild
    return '<table width="100%" cellspacing="2" cellpadding="2"><thead>' +
      '<tr><th colspan="5" class="fshCenter">Items from ' +
      '<a href="' + auctionSearchUrl + '">' +
      'AH Quick Search</a> found in your inventory</th></tr>' +
      '<tr><th>Name</th><th>Nick Name</th><th>Inv Count</th>' +
      '<th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>' +
      // show inv & counter for item with nickname found
      displayFoundCount(invCount) +
      // show item from quick AH search that are not in our inv
      '<tr><td colspan="5"><hr></td></tr>' +
      '<tr><td>Did not find:</td><td colspan="4">' +
      displayNotFound(quickSL) +
      '</td></tr><tr><td colspan="5"><hr></td></tr></tbody>' +
      '<thead><tr><th colspan="5" class="fshCenter">Items NOT from ' +
      '<a href="' + auctionSearchUrl + '">' +
      'AH Quick Search</a> found in your inventory</td></thead><tbody>' +
      // show inv & counter for item with nickname NOT found
      displayOtherCount(invCount) +
      '</tbody></table>';
  }

  function inQuickSearchList(invCount, name, listItem) {
    if (name === listItem.searchname) {
      listItem.found = true;
      if (invCount[name].nicknameList.indexOf(listItem.nickname) < 0) {
        invCount[name].nicknameList.push(listItem.nickname);
      }
    }
  }

  function testItemList(invCount, quickSL, item) {
    var name = item.n;
    foundInvItem(invCount, name);
    quickSL.forEach(partial(inQuickSearchList, invCount, name));
  }

  function folder(invCount, quickSL, aFolder) {
    aFolder.items.forEach(partial(testItemList, invCount, quickSL));
  }

  function showAHInvManager(itemList) {
    var invCount = {};
    var quickSL = getValueJSON('quickSearchList') || [];
    // fill up the Inv Counter
    itemList.r.forEach(partial(folder, invCount, quickSL));
    var im = createDiv();
    insertHtmlBeforeEnd(im, buildHTML(invCount, quickSL));
    return im;
  }

  function isChecked(pref) {
    if (pref) {return ' checked';}
    return '';
  }

  function isValueChecked(pref) {
    return isChecked(getValue(pref));
  }

  var moveGuildList$1={helpTitle:"Move Guild Info List",helpText:"This will Move the Guild Info List higher on the bar on the right"};var moveOnlineAlliesList$1={helpTitle:"Move Online Allies List",helpText:"This will Move the Online Allies List higher on the bar on the right"};var enableOnlineAlliesWidgets$1={helpTitle:"Enable Online Allies Widgets",helpText:"Enabling this option will enable the Allies List Widgets (coloring on the Allies List panel)"};var moveFSBox$1={helpTitle:"Move FS box",helpText:"This will move the FS box to the left, under the menu, for better visibility (unless it is already hidden.)"};var moveDailyQuest$1={helpTitle:"Move Daily Quest",helpText:"This will move the Daily Quest to the left, under the menu, for better visibility (unless it is already hidden.)"};var gameHelpLink$2={helpTitle:"&quot;Game Help&quot; Settings Link",helpText:"This turns the Game Help text in the lower right box into a link to this settings page."};var enableTempleAlert$1={helpTitle:"Enable Temple Alert",helpText:"Puts an alert on the LHS if you have not prayed at the temple today.",network:true};var enableUpgradeAlert$1={helpTitle:"Enable Gold Upgrade Alert",helpText:"Puts an alert on the LHS if you have not upgraded your stamina with gold today.",network:true};var enableComposingAlert$1={helpTitle:"Enable Composing Alert",helpText:"Puts an alert on the LHS if you have composing slots available.",network:true};var enhanceOnlineDots$1={helpTitle:"Enhance Online Dots",helpText:"Enhances the green/grey dots by player names to show online/offline status."};var hideBuffSelected$1={helpTitle:"Hide Buff Selected",helpText:"Hides the buff selected functionality in the online allies and guild info section."};var hideHelperMenu$1={helpTitle:"Hide Helper Menu",helpText:"Hides the helper menu from top left."};var keepHelperMenuOnScreen$1={helpTitle:"Keep Helper Menu On Screen",helpText:"Keeps helper menu on screen as you scroll (helper menu must be enabled to work). Also works with quick links."};var showAdmin$1={helpTitle:"Show rank controls",helpText:"Show ranking controls for guild managemenet in member profile page - this works for guild founders only"};var ajaxifyRankControls$1={helpTitle:"AJAXify rank controls",helpText:"Enables guild founders with ranking rights to change rank positions without a screen refresh."};var detailedConflictInfo$1={helpTitle:"Show Conflict Details",helpText:"Inserts detailed conflict information onto your guild's manage page. Currently displays the target guild as well as the current score.",network:true};var showCombatLog$1={helpTitle:"Show Combat Log",helpText:"This will show the combat log for each automatic battle below the monster list."};var enableCreatureColoring$1={helpTitle:"Color Special Creatures",helpText:"Creatures will be colored according to their rarity. Champions will be colored green, Elites yellow and Super Elites red."};var showCreatureInfo$1={helpTitle:"Show Creature Info",helpText:"This will show the information from the view creature link when you mouseover the link.",network:true};var fsboxlog$1={helpTitle:"Enable FS Box Log",helpText:"This enables the functionality to keep a log of recent seen FS Box message."};var keepBuffLog$1={helpTitle:"Enable Buff Log",helpText:"This enables the functionality to keep a log of recently casted buffs"};var huntingMode$1={helpTitle:"Enable Hunting Mode",helpText:"This disable menu and some visual features to speed up the calf."};var hideNonPlayerGuildLogMessages$1={helpTitle:"Cleanup Guild Log",helpText:"Any log messages not related to the current player will be dimmed (e.g. recall messages from guild store)"};var useNewGuildLog$1={helpTitle:"Use New Guild Log",helpText:"This will replace the standard guild log with the helper version of the guild log."};var enableLogColoring$1={helpTitle:"Enable Log Coloring",helpText:"Three logs will be colored if this is enabled, Guild Chat, Guild Log and Player Log. It will show any new messages in yellow and anything 20 minutes old ones in brown."};var enableChatParsing$1={helpTitle:"Enable Chat Parsing",helpText:"If this is checked, your character log will be parsed for chat messages and show the chat message on the screen if you reply to that message."};var addAttackLinkToLog$1={helpTitle:"Add attack link to log",helpText:"If checked, this will add an Attack link to each message in your log."};var enhanceChatTextEntry$1={helpTitle:"Enhance Chat Text Entry",helpText:"If checked, this will enhance the entry field for entering chat text on the guild chat page."};var showExtraLinks$1={helpTitle:"Show Extra Links",helpText:"If checked, this will add AH and UFSG links to equipment screens."};var disableItemColoring$1={helpTitle:"Disable Item Coloring",helpText:"Disable the code that colors the item text based on the rarity of the item."};var showQuickDropLinks$1={helpTitle:"Show Quick Drop Item",helpText:"This will show a link beside each item which gives the option to drop the item.  WARNING: NO REFUNDS ON ERROR"};var storeLastQuestPage$1={helpTitle:"Store Last Quest Page",helpText:"This will store the page and sort order of each of the three quest selection pages for next time you visit. If you need to reset the links, turn this option off, click on the link you wish to reset and then turn this option back on again."};var showNextQuestSteps$1={helpTitle:"Show Next Quest Steps",helpText:"Shows all quest steps in the UFSG."};var renderSelfBio$1={helpTitle:"Render self bio",helpText:"This determines if your own bio will render the FSH special bio tags."};var renderOtherBios$1={helpTitle:"Render other players&#39; bios",helpText:"This determines if other players bios will render the FSH special bio tags."};var enableBioCompressor$1={helpTitle:"Enable Bio Compressor",helpText:"This will compress long bios and provide a link to expand the compressed section."};var showStatBonusTotal$1={helpTitle:"Show Stat Bonus Total",helpText:"This will show a total of the item stats when you mouseover an item on the profile screen."};var enableQuickDrink$1={helpTitle:"Enable Quick Drink/Wear",helpText:"This enables the quick drink/wear functionality on the profile page."};var disableDeactivatePrompts$1={helpTitle:"Disable Deactivate Prompts",helpText:"This disables the prompts for deactivating buffs on the profile page."};var enableAttackHelper$1={helpTitle:"Show Attack Helper",helpText:"This will show extra information on the attack player screen about stats and buffs on you and your target",network:true};var showPvPSummaryInLog$1={helpTitle:"Show PvP Summary in Log",helpText:"This will show a summary of the PvP results in the log.",network:true};var autoFillMinBidPrice$1={helpTitle:"Auto Fill Min Bid Price",helpText:"This enables the functionality to automatically fill in the min bid price so you just have to hit bid and your bid will be placed."};var hideRelicOffline$1={helpTitle:"Hide Relic Offline",helpText:"This hides the relic offline defenders checker."};var enterForSendMessage$1={helpTitle:"Enter Sends Message",helpText:"If enabled, will send a message from the Send Message screen if you press enter. You can still insert a new line by holding down shift when you press enter."};var navigateToLogAfterMsg$1={helpTitle:"Navigate After Message Sent",helpText:"If enabled, will navigate to the referring page after a successful message is sent. Example:  if you are on the world screen and hit message on the guild info panel after you send the message, it will return you to the world screen."};var moveComposingButtons$1={helpTitle:"Move Composing Buttons",helpText:"If enabled, will move composing buttons to the top of the composing screen."};var draggableHelperMenu$1={helpTitle:"Draggable Helper Menu",helpText:"If enabled, allows the helper menu to be dragged around the screen."};var draggableQuickLinks$1={helpTitle:"Draggable Quick Links",helpText:"If enabled, allows the quick link box to be dragged around the screen."};var expandMenuOnKeyPress$1={helpTitle:"Expand Menu on Key Press",helpText:"If enabled, expands the left hand menu when you use hotkeys."};var disableBreakdownPrompts$1={helpTitle:"Disable Breakdown Prompts",helpText:"If enabled, will disable prompts when you breakdown items.<br>NO REFUNDS OR DO-OVERS! Use at own risk."};var collapseNewsArchive$1={helpTitle:"Collapse News Archive",helpText:"If enabled, will collapse news archives."};var collapseHallPosts$1={helpTitle:"Collapse Hall Posts",helpText:"If enabled, will collapse hall posts."};var hideSubLvlCreature$1={helpTitle:"Hide Sub Level Creatures",helpText:"If enabled, will hide creatures that are lower than the current realm level."};var hidePlayerActions$1={helpTitle:"Hide Player Actions",helpText:"If enabled, will hide player actions."};var disableQuickWearPrompts$1={helpTitle:"Disable Use/Ext Prompts",helpText:"If enabled, will disable prompts when you Use/Ext items.<br>NO REFUNDS OR DO-OVERS! Use at own risk.",title:"Disable Use/Ext<br>Prompts"};var enableGuildActivityTracker$1={helpTitle:"Enable Guild Activity Tracker",helpText:"If enabled, will track guild member activity over time.",network:true,title:"Enable Tracker"};var enableSeTracker$1={helpTitle:"Enable SE Tracker",helpText:"If enabled, will track the last time each SE was killed.<br>This is DIFFERENT from the usual FSH network activity.<br>When this is enabled, if you have ANY game page open in a<br>browser tab it will scan the SE Log every 10 minutes.<br>You do not need auto-refresh for this to work.",network:true};var showMonsterLog$1={helpTitle:"Keep Creature Log",helpText:"This will show the creature log for each creature you see when you travel.",network:true};var showTitanInfo$1={helpTitle:"Show Titan Info",helpText:"This will show titan info in the action list.",network:true};var wantedGuildMembers$1={helpTitle:"Show Guild Members",helpText:"If enabled, will show guild members in the wanted bounty list."};var highlightPvpProtection$1={helpTitle:"Highlight Pvp Protection",helpText:"If enabled, will put a red box around PvP Protection."};var showBuffInfo$1={helpTitle:"Show Buff Info",helpText:"This will show buff info in the action list."};var enableHistoryCompressor$1={helpTitle:"Guild History Compressor",helpText:"This will compress long guild histories and provide a link to expand the compressed section."};var enableStamBars$1={helpTitle:"Stamina Bars",helpText:"This shows stamina as a coloured bar."};var mySimpleCheckboxes = {moveGuildList:moveGuildList$1,moveOnlineAlliesList:moveOnlineAlliesList$1,enableOnlineAlliesWidgets:enableOnlineAlliesWidgets$1,moveFSBox:moveFSBox$1,moveDailyQuest:moveDailyQuest$1,gameHelpLink:gameHelpLink$2,enableTempleAlert:enableTempleAlert$1,enableUpgradeAlert:enableUpgradeAlert$1,enableComposingAlert:enableComposingAlert$1,enhanceOnlineDots:enhanceOnlineDots$1,hideBuffSelected:hideBuffSelected$1,hideHelperMenu:hideHelperMenu$1,keepHelperMenuOnScreen:keepHelperMenuOnScreen$1,showAdmin:showAdmin$1,ajaxifyRankControls:ajaxifyRankControls$1,detailedConflictInfo:detailedConflictInfo$1,showCombatLog:showCombatLog$1,enableCreatureColoring:enableCreatureColoring$1,showCreatureInfo:showCreatureInfo$1,fsboxlog:fsboxlog$1,keepBuffLog:keepBuffLog$1,huntingMode:huntingMode$1,hideNonPlayerGuildLogMessages:hideNonPlayerGuildLogMessages$1,useNewGuildLog:useNewGuildLog$1,enableLogColoring:enableLogColoring$1,enableChatParsing:enableChatParsing$1,addAttackLinkToLog:addAttackLinkToLog$1,enhanceChatTextEntry:enhanceChatTextEntry$1,showExtraLinks:showExtraLinks$1,disableItemColoring:disableItemColoring$1,showQuickDropLinks:showQuickDropLinks$1,storeLastQuestPage:storeLastQuestPage$1,showNextQuestSteps:showNextQuestSteps$1,renderSelfBio:renderSelfBio$1,renderOtherBios:renderOtherBios$1,enableBioCompressor:enableBioCompressor$1,showStatBonusTotal:showStatBonusTotal$1,enableQuickDrink:enableQuickDrink$1,disableDeactivatePrompts:disableDeactivatePrompts$1,enableAttackHelper:enableAttackHelper$1,showPvPSummaryInLog:showPvPSummaryInLog$1,autoFillMinBidPrice:autoFillMinBidPrice$1,hideRelicOffline:hideRelicOffline$1,enterForSendMessage:enterForSendMessage$1,navigateToLogAfterMsg:navigateToLogAfterMsg$1,moveComposingButtons:moveComposingButtons$1,draggableHelperMenu:draggableHelperMenu$1,draggableQuickLinks:draggableQuickLinks$1,expandMenuOnKeyPress:expandMenuOnKeyPress$1,disableBreakdownPrompts:disableBreakdownPrompts$1,collapseNewsArchive:collapseNewsArchive$1,collapseHallPosts:collapseHallPosts$1,hideSubLvlCreature:hideSubLvlCreature$1,hidePlayerActions:hidePlayerActions$1,disableQuickWearPrompts:disableQuickWearPrompts$1,enableGuildActivityTracker:enableGuildActivityTracker$1,enableSeTracker:enableSeTracker$1,showMonsterLog:showMonsterLog$1,showTitanInfo:showTitanInfo$1,wantedGuildMembers:wantedGuildMembers$1,highlightPvpProtection:highlightPvpProtection$1,showBuffInfo:showBuffInfo$1,enableHistoryCompressor:enableHistoryCompressor$1,enableStamBars:enableStamBars$1};

  var networkIcon =
    '<img class="networkIcon tip-static" ' +
    'data-tipped="This function retrieves data from the network. ' +
    'Disable this to increase speed" src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA' +
    'B3RJTUUH1QgGDTMWk1twEwAAAAlwSFlzAAALEgAACxIB0t1+' +
    '/AAAAARnQU1BAACxjwv8YQUAAAC8SURBVHjahVPBEcQgCEQn' +
    'HdmTqUlr0qe16I8cufOiCGZnGCcIy4LEICJwmGgWJ3o0IOCQ' +
    'EqVg9Y4U3CoCHQhvxuPUZEiA3XYkxyI1/6S6R6rke8AlJbkV' +
    '7u95lleXq3yrdyUjLGxwnifmnHEXY3fJIQSIMcKOZCLgMltr' +
    'r+1ZWgxp8wi1VrEqxfeFWloYq4wKtOHeBNqeawqmeOnNvfdY' +
    'SvkbfaeUxP0w/G+k6WsT/xCBc25SuxDsnownEy4u5BHudpMF' +
    'egAAAABJRU5ErkJggg==" width="16" height="16" />';

  function helpLink(title, text) {
    return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="' +
      '<span class=\'fshHelpTitle\'>' + title + '</span><br><br>' +
      text + '">?</span>&nbsp;]';
  }

  function hasNetwork(o) {
    if (o.network) {return networkIcon;}
    return '';
  }

  function justLabel(name) {
    var o = mySimpleCheckboxes[name];
    return hasNetwork(o) +
      '<label for="' + name + '">' + fallback(o.title, o.helpTitle) +
      helpLink(o.helpTitle, o.helpText) +
      ':</label>';
  }

  function justCheckbox(name) {
    return '<input id="' + name + '" name="' + name +
      '" class="fshVMid" type="checkbox" value="on"' + isValueChecked(name) + '>';
  }

  function simpleCheckboxHtml(name) {
    return justLabel(name) + justCheckbox(name);
  }

  function simpleCheckbox(name) {
    return '<tr><td align="right">' + justLabel(name) +
      '</td><td>' + justCheckbox(name) + '</td></tr>';
  }

  function toggleForce(el, force) {
    if (el instanceof Element) {
      el.classList.toggle('fshHide', force);
    }
  }

  function hasErrorMsg(json) {
    return json.e && json.e.message;
  }

  function errorDialog(json) {
    if (!json.s && hasErrorMsg(json)) {
      dialogMsg(json.e.message);
    }
    return json;
  }

  function useItem$1(backpackInvId) {
    return daUseItem(backpackInvId).then(errorDialog).then(ajaxReturnCode);
  }

  const def_disableQuickWearPrompts = 'disableQuickWearPrompts';
  var disableQuickWearPrompts$2;
  var itemList;

  function actionResult(self, verb, data) {
    if (data.r !== 0) {return;}
    self.parentNode.innerHTML = '<span class="fastWorn">' + verb + '</span>';
  }

  function doAction(self, fn, verb) { // jQuery.min
    sendEvent('QuickWear', 'doAction - ' + verb);
    setText('', self);
    self.classList.remove('smallLink');
    self.classList.add('fshSpinner', 'fshSpin12');
    fn(self.dataset.itemid).then(partial(actionResult, self, verb));
  }

  function doUseItem(self) {
    doAction(self, useItem$1, 'Used');
  }

  function useProfileInventoryItem(self) {
    if (disableQuickWearPrompts$2) {
      doUseItem(self);
    } else {
      jConfirm('Use/Extract Item',
        'Are you sure you want to use/extract the item?',
        partial(doUseItem, self)
      );
    }
  }

  function equipProfileInventoryItem(self) {
    doAction(self, equipItem, 'Worn');
  }

  function processItems(folderId, thisFolder, o) {
    var tr = o.dom;
    if (folderId === '0') {
      tr.classList.remove('fshHide');
    } else {
      var force = folderId !== thisFolder.toString();
      toggleForce(tr, force);
    }
  }

  function processFolder(folderId, aFolder) {
    var thisFolder = aFolder.id;
    aFolder.items.forEach(partial(processItems, folderId, thisFolder));
  }

  function hideFolders(self) {
    var folderId = self.dataset.folder;
    itemList.r.forEach(partial(processFolder, folderId));
  }

  function togglePref() {
    disableQuickWearPrompts$2 = !disableQuickWearPrompts$2;
    setValue(def_disableQuickWearPrompts, disableQuickWearPrompts$2);
  }

  function evts5() {
    return [
      [partial(hasClasses, ['smallLink', 'fshEq']), equipProfileInventoryItem],
      [partial(hasClasses, ['smallLink', 'fshUse']), useProfileInventoryItem],
      [partial(hasClass, 'fshFolder'), hideFolders],
      [selfIdIs(def_disableQuickWearPrompts), togglePref]
    ];
  }

  function goodData(appInv) {
    return appInv && appInv.s && isArray(appInv.r);
  }

  function makePref(thisList) {
    insertElement(thisList, createDiv({
      className: 'qwPref',
      innerHTML: simpleCheckboxHtml(def_disableQuickWearPrompts)
    }));
  }

  function injectContent(thisFn, appInv, thisDiv) {
    insertElement(thisDiv, thisFn(appInv));
  }

  function buildQuickWear(content, appInv) {
    subscribeOnce('qwtab-header', makePref);
    subscribeOnce('qwtab0', partial(injectContent, createQuickWear, appInv));
    subscribeOnce('qwtab1', partial(injectContent, showAHInvManager, appInv));
    fshTabSet(content, ['Quick Wear / Use / Extract<br>Manager',
      'Inventory Manager Counter<br>filtered by AH Quick Search'], 'qwtab');
    on(content, 'click', eventHandler5(evts5()));
  }

  function showQuickWear(content, appInv) {
    if (goodData(appInv)) {
      itemList = appInv;
      buildQuickWear(content, appInv);
    }
  }

  function hasJquery(injector) { // jQuery.min
    const content = injector || pCC;
    if (!content) {return;}
    insertHtmlBeforeEnd(content, 'Getting item list from backpack...');
    daLoadInventory().then(partial(showQuickWear, content));
    disableQuickWearPrompts$2 = getValue(def_disableQuickWearPrompts);
  }

  function insertQuickWear(injector) {
    if (jQueryPresent()) {hasJquery(injector);}
  }

  function jQueryDialog(fn) { // jQuery
    var content = getElementById('content');
    if (content) {content.innerHTML = '';} else {
      content = createDiv({
        id: 'content',
        style: {display: 'none'}
      });
      insertElement(document.body, content);
    }
    $(content).dialog({
      width: 640,
      modal: true,
      position: {my: 'top', at: 'top', offset: '0 60', collision: 'none'},
      resizable: false
    });
    fn(content);
  }

  var auctionSearchBlurb =
    '<div>This screen allows you to set up some quick ' +
    'search templates for the Auction House. The Display on AH column ' +
    'indicates if the quick search will show on the short list on the ' +
    'Auction House main screen. A maximum of 36 items can show on this ' +
    'list (It will not show more than 36 even if you have more than 36 ' +
    'flagged). To edit items, either use the large text area below, or ' +
    'add a new entry and delete the old one. You can always reset the ' +
    'list to the default values.</div>' +
    '<div class="fshSmall" id="fshAso">' +
    '</div>';

  function auctionSearchParams() {
    return {
      id: 'fshAso',
      headers: ['Category', 'Nickname', 'Quick Search Text',
        'Display in AH?'],
      fields: ['category', 'nickname', 'searchname', 'displayOnAH'],
      tags: ['text', 'text', 'text', 'checkbox'],
      url: ['', '',
        ahSearchUrl + '@replaceme@', ''],
      currentItems: getValueJSON('quickSearchList') || [],
      gmname: 'quickSearchList',
      categoryField: 'category',
    };
  }

  var param;

  function hasUrl(j) {
    return param.url && param.url[j] !== '';
  }

  function detailRow(j, itemField) { // Legacy
    if (param.tags[j] === 'checkbox') {
      return '<input type="checkbox"' + isChecked(itemField) +
        ' disabled>';
    } else if (hasUrl(j)) {
      return '<a href="' + param.url[j].replace('@replaceme@', itemField) +
        '">' + itemField + '</a>';
    }
    return itemField;
  }

  function itemRow(item) { // Legacy
    var result = '';
    for (var j = 0; j < param.fields.length; j += 1) {
      result += '<td class="fshCenter">';
      var itemField = item[param.fields[j]];
      if (param.fields[j] === param.categoryField) {continue;}
      result += detailRow(j, itemField) + '</td>';
    }
    return result;
  }

  function headersToHtml(prev, curr) {
    return prev + '<th>' + curr + '</th>';
  }

  function needsCat(item, i, currentItems) {
    return param.categoryField && (i === 0 ||
      currentItems[i - 1][param.categoryField] !== item[param.categoryField]);
  }

  function itemRows(prev, item, i, currentItems) {
    var result = '<tr>';
    if (needsCat(item, i, currentItems)) {
      result += '<td><span class="fshQs">' + item[param.categoryField] +
        '</span></td><td></td><td></td><td></td><td></td></tr><tr>';
    }
    result += itemRow(item);
    result += '<td><span class="HelperTextLink" data-itemId="' + i +
      '" id="fshDel' + i + '">[Del]</span></td></tr>';
    return prev + result;
  }

  function doInputs() { // Legacy
    var result = '<tr>';
    for (var i = 0; i < param.tags.length; i += 1) {
      result += '<td align=center><input type="' + param.tags[i] +
        '" class="custominput" id="fshIn' + param.fields[i] + '"></td>';
    }
    return result;
  }

  function generateManageTable() { // Legacy
    var result = '<table cellspacing="2" cellpadding="2" class="fshGc" ' +
      'width="100%"><tr class="fshOr">';
    result += param.headers.reduce(headersToHtml, '');
    result += '<th>Action</th></tr>';
    result += param.currentItems.reduce(itemRows, '');
    result += doInputs();
    result += '<td><span class="HelperTextLink" id="fshAdd">' +
      '[Add]</span></td></tr></table>' +
      '<table width="100%"><tr><td class="fshCenter">' +
      '<textarea cols=70 rows=20 id="fshEd">' +
      JSON.stringify(param.currentItems) + '</textarea></td></tr>' +
      '<tr><td class="fshCenter"><input id="fshSave" ' +
      'type="button" value="Save" class="custombutton">' +
      '&nbsp;<input id="fshReset" type="button" value="Reset" ' +
      'class="custombutton"></td></tr>' +
      '</tbody></table>';
    var target = getElementById(param.id);
    if (target) {
      getElementById(param.id).innerHTML = result;
      setValueJSON(param.gmname, param.currentItems);
    }
  }

  function deleteQuickItem(self) { // Legacy
    var itemId = self.getAttribute('data-itemId');
    param.currentItems.splice(itemId, 1);
    generateManageTable();
  }

  function buildNewItem() { // Legacy
    var newItem = {};
    for (var i = 0; i < param.fields.length; i += 1) {
      if (param.tags[i] === 'checkbox') {
        newItem[param.fields[i]] =
          getElementById('fshIn' + param.fields[i]).checked;
      } else {
        newItem[param.fields[i]] =
          getElementById('fshIn' + param.fields[i]).value;
      }
    }
    return newItem;
  }

  function addQuickItem() { // Legacy
    var isArrayOnly = param.fields.length === 0;
    var newItem = {};
    if (isArrayOnly) {
      newItem = getElementById('fshIn0').value;
    } else {
      newItem = buildNewItem();
    }
    param.currentItems.push(newItem);
    generateManageTable();
  }

  function saveRawEditor() { // Legacy
    var userInput = jsonParse(getElementById('fshEd').value);
    if (isArray(userInput)) {
      param.currentItems = userInput;
      generateManageTable();
    }
  }

  function resetRawEditor() { // Legacy
    if (param.id === 'fshAso') {
      param.currentItems =
        jsonParse(defaults.quickSearchList);
    } else {param.currentItems = [];}
    generateManageTable();
  }

  function listEvents() {
    return [
      [selfIdIs('fshReset'), resetRawEditor],
      [selfIdIs('fshSave'), saveRawEditor],
      [selfIdIs('fshAdd'), addQuickItem],
      [function(self) {return self.id.startsWith('fshDel');}, deleteQuickItem]
    ];
  }

  function setupEventHandler(content) {
    on(content, 'click', eventHandler5(listEvents()));
  }

  function injectAuctionSearch(injector) { // Legacy
    var content = injector || pCC;
    content.innerHTML =
      makePageHeader('Trade Hub Quick Search', '', '', '') +
      auctionSearchBlurb;
    // global parameters for the meta function generateManageTable
    param = auctionSearchParams();
    generateManageTable();
    setupEventHandler(content);
  }

  function injectQuickLinkManager(injector) { // Legacy
    var content = injector || pCC;
    content.innerHTML = makePageTemplate({
      title: 'Quick Links',
      comment: '',
      spanId: '',
      button: '',
      divId: 'qla'
    });

    // global parameters for the meta function generateManageTable
    param = {
      id: 'qla',
      headers: ['Name', 'URL',
        'New [<span class="fshLink tip-static" ' +
        'data-tipped="Open page in a new window">?</span>]'],
      fields: ['name', 'url', 'newWindow'],
      tags: ['text', 'text', 'checkbox'],
      currentItems: getValueJSON('quickLinks') || [],
      gmname: 'quickLinks',
    };
    generateManageTable();
    setupEventHandler(content);
  }

  function guildManage$2() {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'manage'
    });
  }

  function header(o) {
    return '<tr><td rowspan="2" colspan="2" class="headCell"><h1>Find ' +
      o.header + '</h1></td><td class="findLabel">Select ' + o.what +
      ' to search for:</td><td>' + o.control() + '</td></tr>';
  }

  function cutoff(o) {
    return '<tr><td class="findLabel">Level ' + o.cutoff +
      'ers only:</td><td><input id="level175" type="checkbox"></td></tr>';
  }

  function searchGuildMembers(o) {
    return '<tr><td class="leftLabel">' + o.searched +
      ':&nbsp;</td><td id="buffNicks">&nbsp;</td>' +
      '<td class="findLabel">Search guild members:</td>' +
      '<td><input id="guildMembers" type="checkbox" checked></td></tr>';
  }

  function allyHelpLink() {
    return helpLink('Search Allies/Enemies',
      'The checkbox enables searching your own personal ' +
      'allies/enemies list for buffs.<br><br>' +
      'Additional profiles to search can be added in the text ' +
      'field to the right, separated by commas.');
  }

  function searchAlly(o, extraProfile) {
    return '<tr><td class="findLabel">' +
      '# potential ' + o.potential + 'ers to search:&nbsp;</td>' +
      '<td id="potentialBuffers"></td>' +
      '<td class="findLabel">Search allies/enemies:' +
      allyHelpLink() + '</td>' +
      '<td><input id="alliesEnemies" type="checkbox" checked>' +
      '<input class="extraProfile" class="custominput" id="extraProfile" ' +
      'type="text" title="Extra profiles to search" value="' +
      (extraProfile || '') + '"></td></tr>';
  }

  function onlineList(o) {
    return '<tr><td class="findLabel"># ' + o.processed + 'ers processed:' +
      '&nbsp;</td><td id="buffersProcessed">0</td>' +
      '<td class="findLabel">Search online list:</td>' +
      '<td><select class="selectOnline" id="onlinePlayers">' +
        '<option value="0">Disabled</option>' +
        '<option value="49">Short (fastest)</option>' +
        '<option value="47">Medium (medium)</option>' +
        '<option value="45">Long (slowest)</option>' +
      '</select></td></tr>';
  }

  function progress(o) {
    return '<tr><td class="findLabel">Find ' + o.progress + ' progress:' +
      '&nbsp;</td><td class="buffProg" id="bufferProgress">Idle</td>' +
      '<td align="center"><input id="clearresultsbutton" ' +
      'class="custombutton" type="button" value="Clear Results"></td>' +
      '<td align="center"><input id="findbuffsbutton" class="custombutton" ' +
      'type="button" value="Find Buffers"></td></tr>';
  }

  function outputTable(o) {
    return '<br><h1>Potential ' + o.processed + 'ers and Bio Info</h1><br>' +
      '<table class="fshResult" id="buffTable"><tbody>' +
      '<tr><th class="nameCol">&nbsp;Name</th>' +
      '<th class="infoCol">&nbsp;Player Info</th>' +
      '<th>&nbsp;Notable Bio Text</th></tr>' +
      '</tbody></table><br>';
  }

  function disclaimer() {
    return '<div class="disclaim">Disclaimer: This ' +
      'functionality does a simple text search for the terms above. ' +
      'It is not as smart as you are, so please do not judge the results ' +
      'too harshly. It does not search all online players, just a subset ' +
      'of those that have been on recently. ' +
      'The aim is to be fast and still return a good set of results. This ' +
      'feature is a work in progress, so it may be tweaked and enhanced ' +
      'over time.</div>';
  }

  function pageLayout(o, extraProfile) { // Legacy
    return '<table class="fshFind"><tbody>' +
      header(o) +
      cutoff(o) +
      searchGuildMembers(o) +
      searchAlly(o, extraProfile) +
      onlineList(o) +
      progress(o) +
      '</tbody></table>' +
      outputTable(o) +
      disclaimer();
  }

  var getMins = [
    function(obj, min) {
      if (obj.day) {return min + parseInt(obj.day, 10) * 1440;}
      return min;
    },
    function(obj, min) {
      if (obj.hour) {return min + parseInt(obj.hour, 10) * 60;}
      return min;
    },
    function(obj, min) {
      if (obj.min) {return min + parseInt(obj.min, 10);}
      return min;
    },
    function(obj, min) {
      if (obj.last_login) {
        return Math.floor((nowSecs - obj.last_login) / 60);
      }
      return min;
    },
    function(obj, min) {
      // last_login is 'false' over 30 days
      if ('last_login' in obj && !obj.last_login) {return 99999;}
      return min;
    }
  ];

  function sum(obj, prev, curr) {return curr(obj, prev);}

  function lastActivityMins(obj) {
    return getMins.reduce(partial(sum, obj), 0);
  }

  var getDot = [
    [2, 'greenDiamond'],
    [5, 'yellowDiamond'],
    [30, 'orangeDiamond'],
    [10080, 'offlineDot'],
    [44640, 'sevenDayDot']
  ];

  function activity(min, el) {return min < el[0];}

  function aDot(type) {
    var tip = 'Offline';
    if (type === 'greenDiamond') {tip = 'Online';}
    return '<span class="fshDot ' + type +
      ' tip-static" data-tipped="' + tip + '"></span>';
  }

  function onlineDot(obj) {
    var min = lastActivityMins(obj);
    var which = getDot.find(partial(activity, min));
    if (which) {return aDot(which[1]);}
    return aDot('redDot');
  }

  var bufferProgress;

  function getBufferProgress() {
    bufferProgress = getElementById('bufferProgress');
  }

  function updateProgress(html, colour) {
    bufferProgress.innerHTML = html;
    if (colour) {
      bufferProgress.style.color = colour;
    }
  }

  var sustainLevelRE = /Level<br>(\d+)%/;

  function getBioLines(bioCellHtml, findBuffNicks) {
    var myRe = new RegExp('^.*\\b(?:(?:' +
      findBuffNicks.replace(/,/g, ')|(?:') + '))\\b.*$', 'gim');
    var myArray;
    var res = [];
    while ((myArray = myRe.exec(bioCellHtml)) !== null) {
      res.push(myArray[0]);
    }
    return res;
  }

  function getSustain(doc) {
    var sustainLink = getArrayByTagName('a',
      getElementById('profileLeftColumn', doc)).find(contains('Sustain'));
    if (sustainLink) {
      var sustainText = sustainLink.parentNode.parentNode.parentNode
        .nextElementSibling.children[0].dataset.tipped;
      return parseInt(sustainLevelRE.exec(sustainText)[1], 10) || -1;
    }
    return 0;
  }

  function getInnerPlayerName(doc) {
    return getText(getElementsByTagName('h1', getElementById('pCC', doc))[0]);
  }

  function getInnerLevelValue(doc) {
    return intValue(getText(getElementById('profileLeftColumn', doc)
      .children[4].children[0].rows[0].cells[1]));
  }

  function getInnerVirtualLevel(doc) {
    return parseInt(getText(getElementById(def_statVl, doc)), 10);
  }

  function nameCell(doc, callback, lastActivity, bioCellHtml) { // Legacy
    var innerPlayerName = getInnerPlayerName(doc);
    var levelValue = getInnerLevelValue(doc);
    var virtualLevelValue = getInnerVirtualLevel(doc);
    var lastActivityMinutes = parseInt(lastActivity[1], 10);
    var lastActivityIMG = onlineDot({min: lastActivityMinutes});
    var playerHREF = callback.href;
    var bioTip = bioCellHtml.replace(/'|"|\n/g, '');
    return '<nobr>' + lastActivityIMG + '&nbsp;<a href="' +
      playerHREF + '" target="new" ' +
      // FIXME - It kind works now, but not guaranteed?
      'class="tip-static" ' +
      'data-tipped="' + bioTip + '">' + innerPlayerName + '</a>' +
      '&nbsp;<span class="fshBlue">[<span class="a-reply fshLink" ' +
      'target_player="' + innerPlayerName + '">m</span>]</span></nobr><br>' +
      '<span class="fshGrey">Level:&nbsp;</span>' + levelValue +
      '&nbsp;(' + virtualLevelValue + ')';
  }

  function openMsg(evt) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
  }

  function doNameCell(o) {
    var newCell = o.newRow.insertCell(0);
    newCell.style.verticalAlign = 'top';
    newCell.innerHTML = nameCell(o.doc, o.callback, o.lastActivity,
      o.bioCellHtml);
    $('.a-reply').on('click', openMsg);
  }

  function playerInfo(lastActivity, sustainLevel, hasExtendBuff) { // Legacy
    var sustain = 'fshRed';
    if (sustainLevel >= 100) {sustain = 'fshGreen';}
    var extend = '<span class="fshRed">No</span>';
    if (hasExtendBuff) {extend = '<span class="fshGreen">Yes</span>';}
    return '<table><tbody><tr>' +
      '<td colspan="2" class="resAct">Last Activity:</td>' +
      '<td colspan="2"><nobr>' + lastActivity[0] + '</nobr></td></tr>' +
      '<tr><td class="resLbl">Sustain:' +
      '</td><td class="resVal ' + sustain + '">' + sustainLevel + '%</td>' +
      '<td class="resLbl">Extend:</td>' +
      '<td class="resVal">' + extend + '</td></tr>';
  }

  function playerInfoCell(newRow, lastActivity, sustainLevel, hasExtendBuff) {
    var newCell = newRow.insertCell(1);
    newCell.innerHTML = playerInfo(lastActivity, sustainLevel, hasExtendBuff);
    newCell.style.verticalAlign = 'top';
  }

  function injectTextLine(newCell, el) {
    newCell.innerHTML += el + '<br>';
  }

  function buffCell(newRow, textLineArray) {
    var newCell = newRow.insertCell(2);
    textLineArray.forEach(partial(injectTextLine, newCell));
  }

  function updateProcessed() {
    var processedBuffers = getElementById('buffersProcessed');
    var potentialBuffers =
      parseInt(getText(getElementById('potentialBuffers')), 10);
    var processedBuffersCount = parseInt(getText(processedBuffers), 10);
    processedBuffers.innerHTML = processedBuffersCount + 1;
    if (potentialBuffers === processedBuffersCount + 1) {
      updateProgress('Done.', 'blue');
    }
  }

  function calcLastActivity(doc) {
    var innerPcc = getElementById('pCC', doc);
    var lastActivityElement = getElementsByTagName('p', innerPcc)[0];
    return /(\d+) mins, (\d+) secs/.exec(getText(lastActivityElement));
  }

  function getExtend(doc) {
    return querySelector('img.tip-static[data-tipped*="Extend"]', doc);
  }

  function addRowToTable(bioCellHtml, callback, doc, textLineArray) {
    var lastActivity = calcLastActivity(doc);
    var buffTable = getElementById('buffTable');
    var newRow = buffTable.insertRow(-1);
    doNameCell({
      newRow: newRow,
      doc: doc,
      callback: callback,
      lastActivity: lastActivity,
      bioCellHtml: bioCellHtml
    });
    playerInfoCell(newRow, lastActivity, getSustain(doc), getExtend(doc));
    buffCell(newRow, textLineArray);
  }

  function parseProfileAndDisplay(responseText, callback) { // Hybrid - Evil
    var doc = createDocument(responseText);
    var bioCellHtml = getElementById('profile-bio', doc).innerHTML;
    var textLineArray = getBioLines(bioCellHtml, callback.findBuffNicks);
    // add row to table
    if (textLineArray.length > 0) {
      addRowToTable(bioCellHtml, callback, doc, textLineArray);
    }
    updateProcessed();
  }

  function makeOptions(el) {
    return '<option value="' + el.id + '">' + el.name + '</option>';
  }

  var buffCustom = {
    header: 'Buff',
    what: 'buff',
    control: function() {
      return '<select style="width:140px;" id="selectedBuff">' +
        buffList.map(makeOptions).join('') + '</select>';
    },
    cutoff: '175 buff',
    searched: 'Nicknames of buff searched',
    potential: 'buff',
    processed: 'Buff',
    progress: 'buffers'
  };
  var otherCustom = {
    header: 'Other',
    what: 'text',
    control: function() {
      var textToSearchFor = getValue('textToSearchFor') || '';
      return '<input style="width:140px;" class="custominput" ' +
        'id="textToSearchFor" type="text" title="Text to search for" value="' +
        textToSearchFor + '">';
    },
    cutoff: '500+ play',
    searched: 'Text searched for',
    potential: 'play',
    processed: 'Play',
    progress: 'Other'
  };

  var findBuffsLevel175Only;

  function calcMinLvl() { // Legacy
    if (findBuffsLevel175Only) {return 500;}
    return 1;
  }

  function setMinLvl() {
    findBuffsLevel175Only = getElementById('level175').checked;
  }

  var findBuffNicks;
  var findBuffMinCastLevel;
  var onlinePlayers$1;
  var onlinePlayersSetting;
  var extraProfile$1;
  var profilePagesToSearch;
  var profilePagesToSearchProcessed;

  function gotProfile(j, html) {
    parseProfileAndDisplay(html, {
      href: j,
      findBuffNicks: findBuffNicks
    });
  }

  function getProfile$1(j) {
    retryAjax(j).then(partial(gotProfile, j));
  }

  function findBuffsParsePlayersForBuffs() { // Legacy
    // remove duplicates TODO
    // now need to parse player pages for buff ...
    getElementById('potentialBuffers').innerHTML =
      onlinePlayers$1.length;
    if (onlinePlayers$1.length <= 0) {
      updateProgress('Done.', 'blue');
      return;
    }
    updateProgress('Parsing player data ...', 'green');
    onlinePlayers$1.forEach(getProfile$1);
  }

  function calcNextPage(curPage, maxPage) { // Legacy
    if (curPage === 1) {return Math.round(onlinePlayersSetting * maxPage / 50);}
    return curPage + 1;
  }

  function addPlayerToSearchList(onlinePlayer, onlinePlayerName) {
    // add online player to search list (all but self)
    if (playerName$1() !== onlinePlayerName.trim()) {
      onlinePlayers$1.push(onlinePlayer);
    }
  }

  function getOnlinePlayerLevel(e) {
    return parseInt($(e).find('td:eq(2)').text().replace(/,/g, ''), 10);
  }

  function includePlayer(onlinePlayerLevel) {
    return onlinePlayerLevel >= findBuffMinCastLevel &&
      onlinePlayerLevel >= calcMinLvl();
  }

  function playerRow(i, e) {
    if (includePlayer(getOnlinePlayerLevel(e))) {
      var onlinePlayer = $(e).find('td:eq(1) a').attr('href');
      var onlinePlayerName = $(e).find('td:eq(1) a').text();
      addPlayerToSearchList(onlinePlayer, onlinePlayerName);
    }
  }

  function getMaxPage(doc) {
    return parseInt($(doc).find('td:has(input[name="page"]):last')
      .text().replace(/\D/g, ''), 10);
  }

  function getCurrPage(doc) {
    return parseInt($(doc).find('input[name="page"]:last').val()
      .replace(/\D/g, ''), 10);
  }

  function playerRows(doc) {
    $(doc).find('table:contains("Username")>tbody>tr:has' +
      '(td>a[href*="cmd=profile&player_id="])').each(playerRow);
  }

  function nextPage(curPage, maxPage, callback) {
    var newPage = calcNextPage(curPage, maxPage);
    updateProgress('Parsing online page ' + curPage + ' ...');
    onlinePlayersPage(newPage).then(callback);
  }

  function findBuffsParseOnlinePlayers(responseText) { // Legacy
    var doc = createDocument(responseText);
    var curPage = getCurrPage(doc);
    if (curPage !== 1) {
      playerRows(doc);
    }
    var maxPage = getMaxPage(doc);
    if (curPage < maxPage) {
      nextPage(curPage, maxPage, findBuffsParseOnlinePlayers);
    } else {
      // all done so moving on
      findBuffsParsePlayersForBuffs();
    }
  }

  function findBuffsParseOnlinePlayersStart() { // Legacy
    // if option enabled then parse online players
    onlinePlayersSetting =
      parseInt(getElementById('onlinePlayers').value, 10);
    if (onlinePlayersSetting !== 0) {
      onlinePlayersPage(1).then(findBuffsParseOnlinePlayers);
    } else {
      findBuffsParsePlayersForBuffs();
    }
  }

  function calcLastActMins(tipped) {
    var lastActivity = lastActivityRE.exec(tipped);
    var lastActivityDays = parseInt(lastActivity[1], 10);
    var lastActivityHours = parseInt(lastActivity[2], 10) + lastActivityDays * 24;
    return parseInt(lastActivity[3], 10) + lastActivityHours * 60;
  }

  function isValidPlayer(lastActivityMinutes, vlevel, minPlayerVirtualLevel) {
    return lastActivityMinutes < 5 && vlevel >= findBuffMinCastLevel &&
      vlevel >= minPlayerVirtualLevel;
  }

  function parsePlayerLink(el) {
    var tipped = el.dataset.tipped;
    var lastActivityMinutes = calcLastActMins(tipped);
    // check if they are high enough level to cast the buff
    var vlevel = Number(/VL:.+?(\d+)/.exec(tipped)[1]);
    var minPlayerVirtualLevel = calcMinLvl();
    if (isValidPlayer(lastActivityMinutes, vlevel, minPlayerVirtualLevel)) {
      addPlayerToSearchList(el.href, getText(el));
    }
  }

  function findBuffsParseProfilePage(responseText) {
    var doc = createDocument(responseText);
    querySelectorArray('#profileLeftColumn a[data-tipped*="Last Activity"]', doc)
      .forEach(parsePlayerLink);
    // continue with online players
    profilePagesToSearchProcessed += 1;
    if (profilePagesToSearchProcessed ===
      profilePagesToSearch.length) {
      findBuffsParseOnlinePlayersStart();
    }
  }

  function addExtraProfile(el) {profilePagesToSearch.push(showPlayerUrl + el);}

  function getAlliesEnemies(el) {retryAjax(el).then(findBuffsParseProfilePage);}

  function findBuffsParseProfilePageStart() { // Legacy
    // if option enabled then parse profiles
    profilePagesToSearch = [];
    profilePagesToSearch.push(profileUrl); // ???
    var extraProfileArray = csvSplit(extraProfile$1);
    extraProfileArray.forEach(addExtraProfile);
    profilePagesToSearchProcessed = 0;
    if (getElementById('alliesEnemies').checked) {
      profilePagesToSearch.forEach(getAlliesEnemies);
    } else {
      findBuffsParseOnlinePlayersStart();
    }
  }

  function findBuffsParseGuildManagePage(responseText) {
    var doc = createDocument(responseText);
    if (getElementById('guildMembers').checked) {
      querySelectorArray('#pCC a[data-tipped*="<td>VL:</td>"]', doc)
        .forEach(parsePlayerLink);
    }
    // continue with profile pages
    findBuffsParseProfilePageStart();
  }

  function notHeader(el, i) {return i !== 0;}

  function deleteRow(buffTable) {buffTable.deleteRow(-1);}

  function findBuffsClearResults() { // Legacy
    var buffTable = getElementById('buffTable');
    arrayFrom(buffTable.rows).filter(notHeader)
      .forEach(partial(deleteRow, buffTable));
    getElementById('buffNicks').innerHTML = '';
    updateProgress('Idle.', 'black');
    getElementById('potentialBuffers').innerHTML = '';
    getElementById('buffersProcessed').innerHTML = 0;
  }

  function findAnyStart(progMsg) { // jQuery
    if (jQueryNotPresent()) {return;}
    getElementById('buffNicks').innerHTML = findBuffNicks;
    updateProgress('Gathering list of ' + progMsg + ' ...', 'green');
    setMinLvl();
    getElementById('buffersProcessed').innerHTML = 0;
    onlinePlayers$1 = [];
    extraProfile$1 = getElementById('extraProfile').value;
    setValue('extraProfile', extraProfile$1);
    // get list of players to search, starting with guild>manage page
    guildManage$2().then(findBuffsParseGuildManagePage);
  }

  function thisBuff(selectedBuff, el) {return selectedBuff === el.id;}

  function findBuffsStart() { // Legacy
    var selectedBuff = parseInt($('#selectedBuff').val(), 10);
    var findThisBuff = buffList.find(partial(thisBuff, selectedBuff));
    findBuffNicks = findThisBuff.nicks;
    findBuffMinCastLevel = findThisBuff.lvl;
    findAnyStart('potential buffers');
  }

  function findOtherStart() { // Legacy
    var textToSearchFor = $('#textToSearchFor').val().replace(/\s*,\s*/, ',');
    setValue('textToSearchFor', textToSearchFor);
    findBuffNicks = textToSearchFor;
    findBuffMinCastLevel = 1;
    findAnyStart('profiles to search');
  }

  function getExtraProfile() {
    extraProfile$1 = getValue('extraProfile');
  }

  function setupFindEvent(fn) {
    on(getElementById('findbuffsbutton'), 'click', fn, true);
  }

  function setupClearEvent() {
    on(getElementById('clearresultsbutton'),
      'click', findBuffsClearResults, true);
  }

  function injectFindBuffs(injector) { // Legacy
    var content = injector || pCC;
    calf.sortBy = 'name';
    calf.sortAsc = true;
    buffList.sort(stringSort);
    getExtraProfile();
    content.innerHTML = pageLayout(buffCustom, extraProfile$1);
    getBufferProgress();
    setupFindEvent(findBuffsStart);
    setupClearEvent();
  }

  function injectFindOther(injector) { // Native - Bad
    var content = injector || pCC;
    getExtraProfile();
    content.innerHTML = pageLayout(otherCustom, extraProfile$1);
    getBufferProgress();
    setupFindEvent(findOtherStart);
    setupClearEvent();
  }

  var helperMenuBlob =
    '<div class="column"><h3>Character</h3><ul>' +
    '<li><span class="fshLink">Buff Log</span></li>' +
    '<li><span class="fshLink">Combat Log</span></li>' +
    '<li><span class="fshLink">Creature Log</span></li>' +
    '<li><span class="fshLink">Recipe Manager</span></li>' +
    '<li><span class="fshLink">Quick Links</span></li>' +
    '</ul><h3>Actions</h3><ul>' +
    '<li><span class="fshLink">Find Buffs</span></li>' +
    '<li><span class="fshLink">Find Other</span></li>' +
    '<li><span class="fshLink">Online Players</span></li>' +
    '<li><span class="fshLink">AH Quick Search</span></li>' +
    '</ul><h3>Extra</h3><ul>' +
    '<li><span class="fshLink">Quick Extract</span></li>' +
    '<li><span class="fshLink">Quick Wear</span></li>' +
    '<li><span class="fshLink">FS Box Log</span></li>' +
    '</ul><h3>FSH developer quick links</h3><ul>' +
    '<li><span class="a-reply" target_player="PointyHair">PM</span> ' +
    '<a href="' + playerIdUrl + '1963510">PointyHair</a></li>' +
    '</ul></div>';

  function toggleMenu(evt) {
    if (evt.target.id !== 'helperMenu') {return;}
    var menu = evt.target.children[0];
    menu.classList.toggle('showMenuDiv');
  }

  var functionLookup = {
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
    'FS Box Log': injectFsBoxContent
  };

  function callHelperFunction(evt) {
    var functionPath = getText(evt.target);
    var fn = functionLookup[functionPath];
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
    var helperMenu = evt.target;
    var helperMenuDiv = createDiv({
      id: 'helperMenuDiv',
      className: 'helperMenuDiv',
      style: {
        backgroundImage: 'url(' + imageServer +
          '/skin/inner_bg.jpg)'
      }
    });
    insertHtmlBeforeEnd(helperMenuDiv, helperMenuBlob);
    insertElement(helperMenu, helperMenuDiv);
    on(helperMenu, 'click', toggleMenu);
    on(helperMenuDiv, 'click', eventHandler);
  }

  function haveNode$1(node) {
    var helperMenu = createDiv({
      id: 'helperMenu',
      className: 'helperMenu',
      innerHTML: 'Helper&nbsp;Menu'
    });
    if (getValue('keepHelperMenuOnScreen')) {
      helperMenu.classList.add('fshFixed');
    }
    once(helperMenu, 'mouseenter', showHelperMenu);
    if (getValue('draggableHelperMenu')) {
      helperMenu.classList.add('fshMove');
      draggable(helperMenu);
    }
    insertElementBefore(helperMenu, node);
  }

  function injectHelperMenu() {
    // don't put all the menu code here (but call if clicked) to minimize lag
    var node = getElementById('statbar-container');
    if (node) {haveNode$1(node);}
  }

  function colouring(parent, colourFn) {
    getArrayByClassName('player-name', parent).forEach(colourFn);
  }

  function contactColour(el, obj) {
    var onMouseOver = el.dataset.tipped;
    var lastActivityMinutes =
      /Last Activity:<\/td><td>(\d+) mins/.exec(onMouseOver)[1];
    if (lastActivityMinutes < 2) {
      el.classList.add(obj.l1);
    } else if (lastActivityMinutes < 5) {
      el.classList.add(obj.l2);
    } else {
      el.classList.add(obj.l3);
    }
  }

  function hideElement(el) {
    if (el && el.classList) {el.classList.add('fshHide');}
  }

  function hideNodeList(nodeList) {
    arrayFrom(nodeList).forEach(hideElement);
  }

  var hideBtn = [
    [
      'hideGuildInfoTrade',
      '#guild-minibox-action-trade',
      '#online-allies-action-trade'
    ],
    [
      'hideGuildInfoSecureTrade',
      '#guild-minibox-action-secure-trade',
      '#online-allies-action-secure-trade'
    ],
    [
      'hideGuildInfoBuff',
      '#guild-minibox-action-quickbuff',
      '#online-allies-action-quickbuff'
    ],
    [
      'hideGuildInfoMessage',
      '#guild-minibox-action-send-message',
      '#online-allies-action-send-message'
    ]
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
      l3: 'fshGrey'
    });
  }

  function makeLink(el) {
    el.innerHTML = '<a href="' + guildSubcmdUrl + 'chat">Chat</a>';
  }

  function updateChatLink() {
    querySelectorArray('#pCR h4').filter(contains('Chat')).forEach(makeLink);
  }

  function addGuildInfoWidgets() {
    var guildMembrList = getElementById('minibox-guild-members-list');
    if (!guildMembrList) {return;} // list exists
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
      l3: 'fshPowderBlue'
    });
  }

  function addOnlineAlliesWidgets() {
    var onlineAlliesList = getElementById('minibox-allies-list');
    if (!onlineAlliesList) {return;}
    doHideBtn(onlineAlliesList, 2);
    doHideBuffSelected(onlineAlliesList, 'ally-buff-check-on', 'ally-quick-buff');
    // add coloring for offline time
    colouring(onlineAlliesList, alliesColour);
  }

  function insertHtmlAfterBegin(parent, html) {
    insertHtml(parent, 'afterbegin', html);
  }

  var composeMsg =
    '<li class="notification"><a href="' + composingUrl + '"><span' +
    ' class="notification-icon"></span><p class="notification-content">' +
    'Composing to do</p></a></li>';

  function displayComposeMsg() {
    insertHtmlAfterBegin(getElementById('notifications'), composeMsg);
  }

  function getTime(pot) {
    return pot.time_remaining;
  }

  function displayAlert() {
    displayComposeMsg();
    setValue(def_needToCompose, true);
  }

  function potsBrewing(potions) {
    var minTimeInSecs = Math.min.apply(null, potions.map(getTime));
    if (minTimeInSecs > 0) {
      setValue(def_needToCompose, false);
      setValue(def_lastComposeCheck, now + minTimeInSecs * 1000);
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
    if (json.s) {parseComposingApp(json.r);}
  }

  function checkLastCompose() { // jQuery.min
    var lastComposeCheck = getValue(def_lastComposeCheck);
    if (lastComposeCheck && now < lastComposeCheck) {return;}
    daComposing().then(checkAppResponse);
  }

  function composeAlert() {
    if (getValue(def_needToCompose)) {
      displayComposeMsg();
    } else {
      checkLastCompose();
    }
  }

  function injectComposeAlert() {
    if (calf.cmd !== 'composing' && jQueryPresent()) {composeAlert();}
  }

  function hideQTip(el) {
    $(el).qtip('hide');
  }

  function saveTempleSettings(needToPray) {
    setValue('needToPray', needToPray);
    setValue('lastTempleCheck', new Date()
      .setUTCHours(23, 59, 59, 999) + 1); // midnight
  }

  var havePrayedMsg =
    '<span class="notification-icon"></span><p class="notification-content">' +
    'You are currently praying at the temple.</p>';
  var godsNotification =
    '<li class="notification">' +
    '<span id="helperPrayToGods" class="fastPray">' +
    '<table><tbody><tr><td>' +
    '<span class="tip-static" data-tipped="Pray to Sahria" ' +
    'style="background-image: url(\'' + imageServer +
    '/temple/0.gif\');" praytype="0"></span></td><td>' +
    '<span class="tip-static" data-tipped="Pray to Osverin" ' +
    'style="background-image: url(\'' + imageServer +
    '/temple/1.gif\');" praytype="1"></span></td></tr><tr><td>' +
    '<span class="tip-static" data-tipped="Pray to Gurgriss" ' +
    'style="background-image: url(\'' + imageServer +
    '/temple/2.gif\');" praytype="2"></span></td><td>' +
    '<span class="tip-static" data-tipped="Pray to Lindarsil" ' +
    'style="background-image: url(\'' + imageServer +
    '/temple/3.gif\');" praytype="3"></span></td></tr></tbody></table>' +
    '<a href="' + cmdUrl + 'temple">' +
    '<p class="notification-content">Bow down to the gods</p>' +
    '</a></span></li>';

  function havePrayed() {
    getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
    saveTempleSettings(false);
  }

  function prayToGods(e) { // jQuery
    var myGod = e.target.getAttribute('praytype');
    if (!myGod) {return;}
    indexAjaxData({cmd: 'temple', subcmd: 'pray', type: myGod})
      .then(havePrayed);
    hideQTip(e.target);
  }

  function displayDisconnectedFromGodsMessage() {
    insertHtmlAfterBegin(getElementById('notifications'), godsNotification);
    once(getElementById('helperPrayToGods'), 'click', prayToGods);
  }

  function templeAlertEnabled(responseText) {
    var checkNeedToPray;
    var doc;
    if (calf.cmd !== 'temple') {
      doc = createDocument(responseText);
    } else {
      doc = document;
    }
    checkNeedToPray = querySelector('input[value="Pray to Osverin"]', doc);
    var needToPray = false;
    if (checkNeedToPray) {
      displayDisconnectedFromGodsMessage();
      needToPray = true;
    }
    saveTempleSettings(needToPray);
  }

  function parseTemplePage(responseText) {
    if (calf.enableTempleAlert) {templeAlertEnabled(responseText);}
  }

  function checkLastUpdate(templeAlertLastUpdate) {
    return !templeAlertLastUpdate || now > templeAlertLastUpdate;
  }

  function doWeNeedToParse() {
    if (checkLastUpdate(getValue('lastTempleCheck'))) {
      indexAjaxData({cmd: 'temple'}).then(parseTemplePage);
    } else if (getValue('needToPray')) {
      displayDisconnectedFromGodsMessage();
    }
  }

  function injectTempleAlert() { // jQuery
    // Checks to see if the temple is open for business.
    if (calf.cmd === 'temple' || jQueryNotPresent()) {return;}
    doWeNeedToParse();
  }

  function notGoldUpgradesPage() {
    return location.search.indexOf('cmd=points&type=1') === -1;
  }

  var goldUpgradeMsg =
  '<li class="notification"><a href="' + pointsUrl + '&type=1"><span' +
  ' class="notification-icon"></span><p class="notification-content">Up' +
  'grade stamina with gold</p></a></li>';

  function displayUpgradeMsg() {
    if (notGoldUpgradesPage()) {
      insertHtmlAfterBegin(getElementById('notifications'), goldUpgradeMsg);
    }
  }

  function findDoc(data) {
    if (notGoldUpgradesPage()) {
      return createDocument(data);
    }
    var boxes = querySelectorAll('#pCC input[name="quantity"]');
    boxes[0].value = '100';
    boxes[1].value = '10';
    return document;
  }

  function checkUpgrade(limit) {
    var checkDoneUpgrade = getTextTrim(limit).split(' / ');
    if (checkDoneUpgrade[0] !== checkDoneUpgrade[1]) {
      displayUpgradeMsg();
      setValue('needToDoUpgrade', true);
    } else {
      setValue('needToDoUpgrade', false);
      setValue('lastUpgradeCheck',
        Date.parse(getTextTrim(limit.nextElementSibling) + ' GMT'));
    }
  }

  function parseGoldUpgrades(data) {
    if (!calf.enableUpgradeAlert) {return;}
    var doc = findDoc(data);
    var tables = querySelectorAll('#pCC > table', doc);
    if (tables.length > 0) {
      var limit = tables[tables.length - 1].rows[3].cells[2];
      checkUpgrade(limit);
    }
  }

  function upgradesGold() {
    return indexAjaxData({
      cmd: 'points',
      type: 1
    });
  }

  function asyncParse(data) {
    add(3, parseGoldUpgrades, [data]);
  }

  function checkLastUpgrade() {
    var lastUpgradeCheck = getValue('lastUpgradeCheck');
    if (lastUpgradeCheck && now < lastUpgradeCheck) {return;}
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
    if (value === 0) {return '';}
    return String(value) + suffix;
  }

  function splitTime(timeInSecs) {
    var s = timeInSecs;
    var m = Math.floor(s / 60);
    s %= 60;
    var h = Math.floor(m / 60);
    m %= 60;
    var d = Math.floor(h / 24);
    h %= 24;
    return [d, h, m, s];
  }

  function formatLastActivity(last_login) {
    var timeAry = splitTime(Math.abs(nowSecs - last_login));
    return outputFormat(timeAry[0], ' days, ') +
      outputFormat(timeAry[1], ' hours, ') +
      outputFormat(timeAry[2], ' mins, ') +
      timeAry[3] + ' secs';
  }

  var enemyBuffCheckOn = 'enemy-buff-check-on';
  var enemyBuffCheckOff = 'enemy-buff-check-off';
  var enemySendMessage = 'enemy-send-message';
  var enemyQuickbuff = 'enemy-quickbuff';
  var enemySelectedBuff = 'enemy-quick-buff';

  var contactClass = [
    [
      function(n) {return n < 120;},
      'fshDodgerBlue',
      'fshRed'
    ],
    [
      function(n) {return n < 300;},
      'fshDodgerBlue',
      'fshRed'
    ],
    [
      function() {return true;},
      'fshPowderBlue',
      'fshPink'
    ]
  ];

  function allyOrEnemy(type, test) {
    if (type) {return test[1];}
    return test[2];
  }

  function band$1(last_login, ary) {
    return ary[0](nowSecs - last_login);
  }

  function contactColor(last_login, type) {
    var test = contactClass.find(partial(band$1, last_login));
    if (test) {return allyOrEnemy(type, test);}
    return 'fshWhite';
  }

  function playerName$2(val, type) {
    return '<a class="player-name tip-static ' +
      contactColor(val.last_login, type) + '" data-tipped="<b>' + val.username +
      '</b><br><table><tbody><tr><td>Level:</td><td>' + val.level +
      '</td></tr><tr><td>Last Activity:</td><td>' +
      formatLastActivity(val.last_login) + '</td></tr></tbody></table>" href="' +
      playerIdUrl + val.id + '">' + val.username + '</a>';
  }

  function doBuffCheck() {
    if (!calf.hideBuffSelected) {
      return '<span class="' + enemyBuffCheckOn + '"></span>';
    }
    return '';
  }

  function doMsgButton() {
    if (!calf.hideGuildInfoMessage) {
      return '<span class="' + enemySendMessage + ' guild-icon left ' +
        'guild-minibox-action tip-static" data-tipped="Send Message"></span>';
    }
    return '';
  }

  function doBuffButton() {
    if (!calf.hideGuildInfoBuff) {
      return '<span class="' + enemyQuickbuff + ' guild-icon left ' +
        'guild-minibox-action tip-static" data-tipped="Quick Buff"></span>';
    }
    return '';
  }

  function doSecureButton(val) {
    if (!calf.hideGuildInfoSecureTrade) {
      return '<a class="enemy-secure-trade guild-icon left ' +
        'guild-minibox-action tip-static" href="' + secureUrl +
        val.username + '" data-tipped="Secure Trade"></a>';
    }
    return '';
  }

  function doTradeButton(val) {
    if (!calf.hideGuildInfoTrade) {
      return '<a class="enemy-trade guild-icon left ' +
        'guild-minibox-action tip-static" href="' + tradeUrl +
        val.username + '" data-tipped="Send Gold/Items/FSP"></a>';
    }
    return '';
  }

  function recent(val) {
    return nowSecs - val.last_login < 1800;
  }

  function addContact(type, val) {
    return '<li class="player"><div class="player-row">' +
      doBuffCheck() +
      playerName$2(val, type) +
      '</div><div class="guild-minibox-actions">' +
      doMsgButton() +
      doBuffButton() +
      doSecureButton(val) +
      doTradeButton(val) +
      '</div></li>';
  }

  function addContacts(contactList, type) {
    return contactList.filter(recent).map(partial(addContact, type)).join('');
  }

  function classPair(self, el) {return hasClass(el[0], self);}

  function classHandler(evtAry) {
    return partial(handleEvent, classPair, evtAry);
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

  function sendMyProfileToForage(data) {
    setForage('fsh_selfProfile', data);
    return data;
  }

  function addLastUpdateDate(data) {
    if (data) {
      data.lastUpdate = now;
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
    if (force) {return getMyProfile();}
    return getForage('fsh_selfProfile')
      .then(getProfileFromForage);
  }

  function openQuickBuffByName(aPlayerName) {
    window.openWindow(quickbuffUrl + '&t=' + aPlayerName,
      'fsQuickBuff', 618, 1000, ',scrollbars');
  }

  var noAlliesTests = [
    function(allies, enemies) {return allies.length + enemies.length;},
    function(allies, enemies) {
      if (!calf.enableAllyOnlineList) {return enemies.length;}
    },
    function(allies) {
      if (!calf.enableEnemyOnlineList) {return allies.length;}
    }
  ];

  function condition$2(allies, enemies, e) {return e(allies, enemies) === 0;}

  function noAllies(allies, enemies) {
    return noAlliesTests.every(partial(condition$2, allies, enemies));
  }

  function hazAllies(allies, enemies) {
    var output = '';
    if (calf.enableAllyOnlineList) {
      output += addContacts(allies, true);
    }
    if (calf.enableEnemyOnlineList) {
      output += addContacts(enemies, false);
    }
    var fshContactList = getElementById('fshContactList');
    fshContactList.innerHTML = '';
    insertHtmlBeforeEnd(fshContactList, output);
  }

  function injectAllyEnemyList(data) {
    var allies = fallback(data._allies, []);
    var enemies = fallback(data._enemies, []);
    if (noAllies(allies, enemies)) {return;}
    hazAllies(allies, enemies);
  }

  function resetList() {
    myStats(true).then(injectAllyEnemyList);
  }

  function toggleBuffSelected(self) {
    self.classList.toggle(enemyBuffCheckOn);
    self.classList.toggle(enemyBuffCheckOff);
  }

  function msgPlayer(self) {
    window.openQuickMsgDialog(getText(self.parentNode.previousElementSibling
      .lastElementChild));
  }

  function buffPlayer(self) {
    openQuickBuffByName(getText(self.parentNode
      .previousElementSibling.lastElementChild));
  }

  function selectedBuff() {
    var buffBalls = getArrayByClassName(enemyBuffCheckOn,
      getElementById('fshContactList'));
    var sendstring = buffBalls.map(
      function(el) {return getText(el.nextElementSibling);});
    openQuickBuffByName(sendstring.join());
  }

  var classEvt = [
    [enemyBuffCheckOn, toggleBuffSelected],
    [enemyBuffCheckOff, toggleBuffSelected],
    [enemySendMessage, msgPlayer],
    [enemyQuickbuff, buffPlayer],
    [enemySelectedBuff, selectedBuff]
  ];

  function eventHandler$1(evt) {
    var self = evt.target;
    if (self.id === 'fshResetEnemy') {
      resetList();
      return;
    }
    classHandler(classEvt)(evt);
  }

  function makeDiv$1(data) {
    var fshAllyEnemy = createDiv({
      id: 'fshAllyEnemy',
      className: 'minibox'
    });
    var wrapper = '<h3>Allies/Enemies</h3><div class="minibox-content">' +
      '<h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4>' +
      '<div id="minibox-enemy"><ul id="fshContactList"></ul>';
    if (!calf.hideBuffSelected) {
      wrapper += '<ul class="' + enemySelectedBuff + '">Quick Buff Selected</ul>';
    }
    wrapper += '</div></div>';
    insertHtmlBeforeEnd(fshAllyEnemy, wrapper);
    insertElementAfterBegin(pCR, fshAllyEnemy);
    on(fshAllyEnemy, 'click', eventHandler$1);
    injectAllyEnemyList(data);
  }

  function nextTick(data) {
    if (data) {
      add(3, makeDiv$1, [data]);
    }
  }

  function prepareAllyEnemyList() {
    if (jQueryNotPresent()) {return;}
    myStats(false).then(nextTick);
  }

  function bountyPage(page) {
    return indexAjaxData({
      cmd: 'bounty',
      page: page
    });
  }

  function functionPasses(fn) {return fn();}

  function getTarget(firstCell) {
    if (firstCell.children[0].tagName === 'A') {return firstCell.children[0];}
    return firstCell.children[0].children[0];
  }

  function rewardType(theCells) {
    return querySelector('img', theCells[2]).title;
  }

  function basicBounty(theCells) {
    var targetData = getTarget(theCells[0]);
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

  var bountyList$1;
  var wantedList$1;
  var activeBountyListPosted;
  var bountyListRefreshTime$1;
  var bwNeedsRefresh$1;
  var wantedArray;

  function hasActiveBounties(activeTable) {
    return !/No bounties active/.test(activeTable.rows[1].cells[0].innerHTML);
  }

  function bountyData(theCells) {
    return extend(basicBounty(theCells), {progress: getText(theCells[5])});
  }

  function getAllBounties(activeTable) {
    for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
      var theCells = activeTable.rows[i].cells;
      var thisBounty = bountyData(theCells);
      bountyList$1.bounty.push(thisBounty);
    }
  }

  function parseActiveBounty(activeTable) { // Legacy
    if (hasActiveBounties(activeTable)) {
      getAllBounties(activeTable);
    }
  }

  function getActiveBountyList(doc) { // Legacy
    var bountyInfo = getElementById('bounty-info', doc);
    if (!bountyInfo) {return;}
    var activeTable = bountyInfo.parentNode.parentNode
      .previousElementSibling.children[0].children[0];
    bountyList$1 = {};
    bountyList$1.bounty = [];
    bountyList$1.isRefreshed = true;
    bountyList$1.lastUpdate = nowSecs;
    if (activeTable) {parseActiveBounty(activeTable);}
    activeBountyListPosted = true;
  }

  function testBountyList() {
    return bountyList$1 &&
      nowSecs - bountyList$1.lastUpdate > bountyListRefreshTime$1;
  }

  function testWantedList() {
    return wantedList$1 &&
      nowSecs - wantedList$1.lastUpdate > bountyListRefreshTime$1;
  }

  function testCacheInvalid() {
    return testBountyList() || testWantedList();
  }

  function invalidateCache() {
    bountyList$1 = getValueJSON('bountyList');
    wantedList$1 = getValueJSON('wantedList');
    bountyListRefreshTime$1 = getValue('bountyListRefreshTime');
    bwNeedsRefresh$1 = getValue('bwNeedsRefresh');
    if (bwNeedsRefresh$1) {return;}
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
    var cell = theCells[6];
    if (getTextTrim(cell) !== '[n/a]') {
      return cell.children[0].children[0].getAttribute('onclick');
    }
    return '';
  }

  function getTarget$1(theCells) {
    return extend(basicBounty(theCells), {
      offerer: getTextTrim(theCells[1].children[0].children[0]),
      tickets: getTextTrim(theCells[5]),
      accept: acceptBtn(theCells)
    });
  }

  var isWanted = [
    function() {return wantedArray.includes('*');},
    function(target) {return wantedArray.includes(target);},
    function(target, theRow) {
      return calf.wantedGuildMembers && getTextTrim(theRow.cells[6]) === '[n/a]';
    }
  ];

  function condition$3(target, theRow, el) {return el(target, theRow);}

  function wanted(target, theRow) {
    return getTextTrim(theRow.cells[6]) !== '[active]' &&
      isWanted.some(partial(condition$3, target, theRow));
  }

  function wantedTarget(target, theRow) {
    if (wanted(target, theRow)) {
      wantedList$1.bounty.push(getTarget$1(theRow.cells));
    }
  }

  function findTarget(activeTable) {
    for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
      var theRow = activeTable.rows[i];
      var target = getTextTrim(theRow.cells[0].children[0].children[0]);
      if (target === '[ No bounties available. ]') {break;}
      wantedTarget(target, theRow);
    }
  }

  var bountyListDiv;
  var wantedListDiv;

  function createMiniBox() {
    return createDiv({className: 'minibox'});
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

  var bountyListReset;

  function makeMouseOver(el) {
    return 'Level:  ' + el.lvl +
      '<br>Reward: ' + el.reward + ' ' + el.rewardType +
      '<br>XP Loss Remaining: ' + el.xpLoss +
      '<br>Progress:  ' + el.progress;
  }

  function injectBountyList() { // Legacy
    setValueJSON('bountyList', bountyList$1);
    bountyListDiv.innerHTML = '';
    var heading = createDiv(
      {innerHTML: '<a href="' + bountyUrl + '">Active Bounties</a> '});
    bountyListReset = createSpan({className: 'xxsLink', textContent: 'Reset'});
    insertElement(heading, bountyListReset);
    insertElement(bountyListDiv, heading);
    var output = '';
    if (bountyList$1.bounty.length === 0) {
      output += '<div class="xsOrange">[No active bounties]</div>';
    } else {
      for (var i = 0; i < bountyList$1.bounty.length; i += 1) {
        output += '<a href="' + bountyList$1.bounty[i].link +
          '" class="tip-static" data-tipped="' +
          makeMouseOver(bountyList$1.bounty[i]) + '">' +
          bountyList$1.bounty[i].target + '</a><br>';
      }
    }
    insertHtmlBeforeEnd(bountyListDiv, output);
  }

  var wantedListReset;

  function makeMouseOver$1(el) {
    return 'Target Level:  ' + el.lvl +
      '<br>Offerer: ' + el.offerer +
      '<br>Reward: ' + el.reward + ' ' + el.rewardType +
      '<br>XP Loss Remaining: ' + el.xpLoss +
      '<br>Posted: ' + el.posted +
      '<br>Tickets Req.:  ' + el.tickets;
  }

  function acceptBtn$1(bounty) {
    if (bounty.accept) {
      return '<span class="xsGreen" onclick="' + bounty.accept +
        '">[a]</span>&nbsp;';
    }
    return '';
  }

  function injectWantedList() { // Legacy
    setValueJSON('wantedList', wantedList$1);
    wantedListDiv.innerHTML = '';
    var heading = createDiv(
      {innerHTML: '<a href="' + bountyUrl + '">Wanted Bounties</a> '});
    wantedListReset = createSpan({className: 'xxsLink', textContent: 'Reset'});
    insertElement(heading, wantedListReset);
    insertElement(wantedListDiv, heading);
    var output = '';
    if (wantedList$1.bounty.length === 0) {
      output += '<div class="xsOrange">[No wanted bounties]</div>';
    } else {
      for (var i = 0; i < wantedList$1.bounty.length; i += 1) {
        output += acceptBtn$1(wantedList$1.bounty[i]) +
          '<a class="xsKhaki tip-static" data-tipped="' +
          makeMouseOver$1(wantedList$1.bounty[i]) +
          '" href="' + wantedList$1.bounty[i].link + '">' +
          wantedList$1.bounty[i].target + '</a><br>';
      }
    }
    insertHtmlBeforeEnd(wantedListDiv, output);
  }

  var curPage;
  var maxPage;

  function getWantedBountyList(doc) {
    var page = querySelector('#pCC input[name="page"]', doc);
    if (!page) {return;}
    curPage = Number(page.value);
    maxPage = Number(page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1]);
    var activeTable = getElementById('bounty-info', doc).parentNode.parentNode
      .nextElementSibling.children[0].children[0];
    if (activeTable) {findTarget(activeTable);}
  }

  function hazActiveBountyList(doc) {
    if (calf.enableActiveBountyList && !activeBountyListPosted) {
      getActiveBountyList(doc);
      injectBountyList();
    }
  }

  function parseBountyPageForWorld(details) {
    var doc = createDocument(details);
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

  var refreshConditions = [
    function() {return !bountyList$1;},
    function() {return !wantedList$1;},
    function() {return bwNeedsRefresh$1;}
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

  function doHandlers$1() {
    if (bountyListDiv) {on(bountyListDiv, 'click', resetList$1);}
    if (wantedListDiv) {on(wantedListDiv, 'click', resetList$1);}
  }

  function prepareBountyData() {
    if (jQueryNotPresent()) {return;}
    createDivs();
    doHandlers$1();
    retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
  }

  function callAllyEnemy() {
    if (calf.enableAllyOnlineList ||
        calf.enableEnemyOnlineList) {
      add(3, prepareAllyEnemyList);
    }
  }

  function callBounties() {
    if (calf.enableWantedList ||
        calf.enableActiveBountyList) {
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

  function execute$1(fn) {
    fn();
  }

  function executeAll(ary) {
    ary.forEach(execute$1);
  }

  function getCalfPrefs(pref) {calf[pref] = getValue(pref);}

  function lastActivityToDays(last_activity) {
    return Math.floor((nowSecs - last_activity) / 86400);
  }

  var act = 0;
  var cur = 1;
  var lvl = 2;
  var max = 3;
  var utc = 4;
  var vl = 5;
  var gxp = 6;

  var oldArchive;
  var guild$1;

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

  var type2tests = [
    function(archive, current) {
      // Has current stam changed ?
      return current.current_stamina !== archive[cur]; // probably want a weighted percentage here
      // Might only care if it has dropped significantly ?
    },
    function(archive, current) {
      // Has Max Stam increased ?
      return current.max_stamina > archive[max]; // probably want a weighted percentage here
    },
    function(archive, current) {
      // Has level changed ?
      return current.level !== archive[lvl];
    },
    function(archive, current) {
      // Has VL changed ?
      return current.vl !== archive[vl];
    },
    function(archive, current) {
      // Has GXP changed ?
      return current.guild_xp !== archive[gxp]; // probably want a weighted percentage here
    }
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
      archiveRecord[act] = lastActivityToDays(member.last_activity);
      archiveRecord[utc] = nowSecs;
    }
  }

  function processMemberRecord(newArchive, member) {
    initMember(member);
    var archiveMember = oldArchive.members[member.name];
    var archiveRecord = archiveMember[archiveMember.length - 1];
    var archiveAge = nowSecs - archiveRecord[utc];
    if (archiveAge >= 86100) {
      upsert(archiveRecord, member);
    }
    newArchive.members[member.name] = oldArchive.members[member.name];
  }

  function processRank(newArchive, rank) {
    rank.members.forEach(partial(processMemberRecord, newArchive));
  }

  function doMerge() { // jQuery.min
    var newArchive = {lastUpdate: nowSecs, members: {}};
    guild$1.r.ranks.forEach(partial(processRank, newArchive));
    setForage('fsh_guildActivity', newArchive);
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
      oldArchive = {lastUpdate: 0, members: {}};
    }
    if (nowSecs > fallback(oldArchive.lastUpdate, 0) + 300) { // 5 mins - probably want to increase
      daGuildManage().then(gotGuild);
    }
  }

  function guildActivity() { // jQuery.min
    if (jQueryPresent() && getValue('enableGuildActivityTracker')) {
      getForage('fsh_guildActivity').then(gotActivity);
    }
  }

  function testForGuildLogMsg(guildLogNode) {
    return location.search !== newGuildLogLoc ||
      guildLogNode.parentNode.id !== 'notification-guild-log';
  }

  function hideGuildLogMsg(guildLogNode) {
    // hide the lhs box
    if (testForGuildLogMsg(guildLogNode)) {return;}
    var messageBox = guildLogNode.parentNode;
    if (messageBox) {
      hideElement(messageBox);
    }
  }

  function updateHref(el) {el.href = newGuildLogUrl;}

  function gotGuildLogNodes(guildLogNodes) {
    guildLogNodes.forEach(updateHref);
    hideGuildLogMsg(guildLogNodes[guildLogNodes.length - 1]);
  }

  function changeGuildLogHREF() {
    if (!getValue('useNewGuildLog')) {return;}
    var guildLogNodes = querySelectorArray(
      '#pCL a[href="' + guildLogUrl + '"]');
    if (guildLogNodes.length > 0) {gotGuildLogNodes(guildLogNodes);}
  }

  function getBoxList(boxList) {
    if (boxList) {return boxList;}
    return '';
  }

  function storeFSBox(_boxList) {
    var boxList = getBoxList(_boxList);
    var fsbox = getElementsByClassName('message',
      getElementById('minibox-fsbox'))[0].innerHTML;
    if (boxList.indexOf(fsbox) < 0) {boxList = '<br>' + fsbox + boxList;}
    if (boxList.length > 10000) {boxList = boxList.substring(0, 10000);}
    setForage('fsh_fsboxcontent', boxList);
  }

  function storeMsg(nodediv) {
    var playerName = getElementsByTagName('a', nodediv);
    if (playerName.length === 0) {return;}
    getForage('fsh_fsboxcontent').then(storeFSBox);
    playerName = getText(playerName[0]);
    insertHtmlBeforeEnd(nodediv,
      '<span class="fshPaleVioletRed">[ <a href="' + doAddIgnore +
      playerName + '">Ignore</a> ]</span> ');
  }

  function openDialog() {
    sendEvent('injectFSBoxLog', 'injectFsBoxContent');
    jQueryDialog(injectFsBoxContent);
  }

  function fSBoxExists(node) {
    var nodediv = node.lastElementChild;
    insertHtmlBeforeEnd(nodediv, '<br>');
    storeMsg(nodediv);
    var log = createSpan({
      className: 'fshYellow',
      innerHTML: '[ <span class="fshLink">Log</span> ]'
    });
    on(log, 'click', openDialog);
    insertElement(nodediv, log);
  }

  function findFsBox() {
    var node = getElementById('minibox-fsbox');
    if (jQueryPresent() && node) {fSBoxExists(node);}
  }

  function injectFSBoxLog() {
    if (!getValue('fsboxlog')) {return;}
    findFsBox();
  }

  function insertHtmlAfterEnd(parent, html) {
    insertHtml(parent, 'afterend', html);
  }

  function parseDateAsTimestamp$1(textDate) {
    var dateAry = textDate.split(/[: /[]/);
    return Date.UTC(Number(dateAry[4]), months.indexOf(dateAry[3]),
      Number(dateAry[2]), Number(dateAry[0]), Number(dateAry[1]), 0);
  }

  var titanRe;

  function getTitanRe() {
    if (!titanRe) {
      titanRe = new RegExp('(\\s*A \')([^\']*)(\' titan has been spotted in )' +
        '([^!]*)(!)');
    }
    return titanRe;
  }

  function pvpLadder(head) {return containsText('PvP Ladder', head.children[1]);}

  function timestamp(head) {
    return parseDateAsTimestamp$1(getText(head.children[2]));
  }

  function lookForPvPLadder() {
    var rumours = getArrayByClassName('news_head_tavern', pCC);
    var pvpTimes = rumours.filter(pvpLadder).map(timestamp);
    var logTime = Math.max.apply(null, pvpTimes);
    if (logTime > getValue('lastLadderReset')) {
      setValue('lastLadderReset', logTime);
    }
  }

  function makeALink(href, label) {
    return '<a href="' + href + '" target="_blank">' + label + '</a>';
  }

  function creatureSearchHref(name) {
    return guideUrl + 'creatures&search_name=' + name;
  }

  function realmSearchHref(name) {
    return guideUrl + 'realms&search_name=' + name;
  }

  function makeUfsgLink(img) {
    var myName = encodeURIComponent(img.getAttribute('oldtitle'));
    var myLink = createAnchor({
      href: creatureSearchHref(myName),
      target: '_blank'
    });
    insertElementBefore(myLink, img);
    insertElement(myLink, img);
  }

  function titanSpotted(el) {
    return getTitanRe().test(el.firstChild.nodeValue); // Text Node
  }

  function reformatNews(el) {
    var news = el.firstChild.nodeValue.match(getTitanRe()); // Text Node
    news[2] = makeALink(creatureSearchHref(news[2]), news[2]);
    news[4] = makeALink(realmSearchHref(news[4]), news[4]);
    return news.slice(1).join('');
  }

  function titanLink(el) {
    var newSpan = createSpan({innerHTML: reformatNews(el)});
    el.replaceChild(newSpan, el.firstChild); // Text Node
  }

  function addUfsgLinks() {
    querySelectorArray(
      '.news_body img[src^="' + imageServer + '/creatures/"]')
      .forEach(makeUfsgLink);
    getArrayByClassName('news_body_tavern', pCC)
      .filter(titanSpotted).forEach(titanLink);
  }

  function injectHomePageTwoLink() { // Pref
    var archiveLink = querySelector('#pCC a[href="' + updateArchiveUrl + '"]');
    if (!archiveLink) {return;}
    insertHtmlAfterEnd(archiveLink, '&nbsp;<a href="' + updateArchiveUrl +
      '&page=2">View Updates Page 2</a>');
    archiveLink = querySelector('#pCC a[href="' + archiveUrl + '"]');
    insertHtmlAfterEnd(archiveLink, '&nbsp;<a href="' + archiveUrl +
      '&page=2">View News Page 2</a>');
    lookForPvPLadder(); // Pref
    addUfsgLinks(); // Pref
  }

  function findNewGroup(el) {
    if (!getText(el).includes('New attack group created.')) {return;}
    var groupJoinHTML = '';
    if (!getValue('enableMaxGroupSizeToJoin')) {
      groupJoinHTML = '<a href="' + joinallUrl + '"><span ' +
        'class="notification-icon"></span><p class="notification-content">' +
        'Join all attack groups.</p></a>';
    } else {
      var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
      groupJoinHTML = '<a href="' + joinUnderUrl + '"><span ' +
        'class="notification-icon"></span><p class="notification-content">' +
        'Join all attack groups less than size ' + maxGroupSizeToJoin +
        '.</p></a>';
    }
    insertHtmlAfterEnd(el, '<li class="notification">' + groupJoinHTML + '</li>');
  }

  function injectJoinAllLink() {
    getArrayByTagName('li', getElementById('pCL')).forEach(findNewGroup);
  }

  function asInt(className) {
    return intValue(
      valueText(getElementsByClassName(className))
    );
  }

  function padZ(n) {
    var ret = n.toString();
    if (n < 10) {ret = '0' + ret;}
    return ret;
  }

  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function formatShortDate(aDate) {
    return padZ(aDate.getHours()) + ':' +
      padZ(aDate.getMinutes()) + ' ' +
      days[aDate.getDay()] + ' ' +
      padZ(aDate.getDate()) + '/' +
      months[aDate.getMonth()] + '/' +
      aDate.getFullYear();
  }

  function timeBox(nextGainTime, hrsToGo) {
    var nextGain = /([0-9]+)m ([0-9]+)s/.exec(nextGainTime);
    if (!nextGain) {return;}
    return '<dd>' +
      formatShortDate(new Date(now +
      (hrsToGo * 60 * 60 + parseInt(nextGain[1], 10) * 60 +
      parseInt(nextGain[2], 10)) * 1000)) + '</dd>';
  }

  function injectLevelupCalculator() {
    var nextGain = getElementsByClassName('stat-xp-nextGain');
    if (nextGain.length === 0) {return;}
    insertHtmlBeforeEnd(getElementById(def_statbarLevel),
      '<dt class="stat-xp-nextLevel">Next Level At</dt>' +
      timeBox(
        valueText(nextGain),
        Math.ceil(asInt('stat-xp-remaining') / asInt('stat-xp-gainPerHour'))
      )
    );
  }

  function insertAfterParent(target, fn, listItem) {
    var tgt = getElementById(target);
    if (tgt instanceof Node) {
      var parent = tgt.parentNode;
      fn(parent, listItem);
    } else {sendException('#' + target + ' is not a Node', false);}
  }

  function refIsLast(newNode, referenceNode) {
    if (referenceNode.nextSibling instanceof Node) { // Text Node
      return insertElementBefore(newNode, referenceNode.nextSibling); // Text Node
    }
    return insertElement(referenceNode.parentNode, newNode);
  }

  function insertElementAfter(newNode, referenceNode) {
    if (referenceNode instanceof Node &&
        referenceNode.parentNode instanceof Node) {
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
    var li = createLi({className: 'nav-level-' + navLvl});
    var al = createAnchor({
      className: 'nav-link fshPoint',
      textContent: text
    });
    on(al, 'click', partial(openDialog$1, text, fn));
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

  function adjustHeight(theNav, myNav) {
    // first the closed saved variables
    myNav.heights = [
      null,
      null,
      // Character
      getElementById('nav-character').nextElementSibling.children
        .length * 22,
      660,
      // Guild
      querySelectorAll('#nav-guild > ul li').length * 22,
      374,
      132,
      132,
      null
    ];
    if (Number(myNav.state) !== -1) {
      // and now the open one
      theNav.children[myNav.state].children[1].style.height =
        myNav.heights[myNav.state] + 'px';
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
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-medalguide" href="' + profileUrl + def_subcmd +
      'medalguide">Medal Guide</a></li>' +
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-invmanager" href="' + notepadBlankUrl +
      'invmanagernew">Inventory Manager</a></li>');
    buffLogLink();
    combatLogLink();
    creatureLogLink();
    anchorButton('1', 'Quick Links', injectQuickLinkManager,
      'nav-character-notepad');
  }

  function sectionClosed(id) {
    return id !== -1 &&
      querySelector('#nav li.nav-level-0:nth-child(' + (id + 1) + ') ul')
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
    var oldSave = myNav._saveState;
    myNav._saveState = function(id) {
      oldSave.call(myNav, validateId(id));
    };
  }

  function foundNav(myNav) {
    if (isObject(myNav)) {return true;}
    sendException('$(\'#nav\').data(\'hcsNav\') is not an object', false);
  }

  function foundHeights(myNav) {
    if ('heights' in myNav) {return true;}
    sendException('$(\'#nav\').data(\'hcsNav\').heights does not exist', false);
  }

  function foundWidget(myNav) {
    if (foundNav(myNav) && foundHeights(myNav)) {return true;}
  }

  function preFlight() { // jQuery.min
    var theNav = getElementById('nav');
    var myNav = $(theNav).data('hcsNav');
    if (myNav && foundWidget(myNav)) {
      return [theNav, myNav];
    }
    return [];
  }

  function updateQuestLink() {
    var lastActiveQuestPage = getValue('lastActiveQuestPage');
    if (lastActiveQuestPage.length > 0) {
      getElementById('nav-character-questbook').href = lastActiveQuestPage;
    }
  }

  function updateScavLink() {
    var lastScavPage = getValue('lastScavPage');
    if (lastScavPage.length > 0) {
      getElementById('nav-actions-artisanship-scavenging').href = lastScavPage;
    }
  }

  function guildInventory$1() {
    if (currentGuildId()) {
      insertAfterParent('nav-guild-storehouse-inventory', insertHtmlAfterEnd,
        '<li class="nav-level-2"><a class="nav-link" id="nav-' +
        'guild-guildinvmanager" href="' + notepadBlankUrl +
        'guildinvmgr">Guild Inventory</a></li>');
    }
  }

  function newGuildLogLink() {
    if (currentGuildId() && !getValue('useNewGuildLog')) {
      // if not using the new guild log, show it as a separate menu entry
      insertAfterParent('nav-guild-ledger-advisor', insertHtmlAfterEnd,
        '<li class="nav-level-2"><a class="nav-link" ' +
        'href="' + newGuildLogUrl + '"' +
        '>New Guild Log</a></li>');
    }
  }

  function topRatedLink() {
    insertAfterParent('nav-toprated-players-level', insertHtmlAfterEnd,
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'toprated-top250" href="' + cmdUrl + 'toprated' + def_subcmd +
      'xp">Top 250 Players</a></li>');
  }

  function injectItems() {
    executeAll([
      updateQuestLink,
      updateScavLink,
      characterButtons,
      guildInventory$1,
      newGuildLogLink,
      topRatedLink,
      actionButtons
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
    if (!pCL || jQueryNotPresent()) {return;}
    doAccordion();
  }

  var enterForSendMessage$2;
  var quickMsgDialog;
  var $quickMessageDialog;
  var fshTemplate;
  var msgTbl;
  var sendMessage;
  var targetPlayer;
  var dialogMsg$1;
  var validateTips;
  var showingTemplates;

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
    dialogMsg$1 = getElementById('quickMsgDialog_msg');
    dialogMsg$1.value = fallback(msg, '');
    dialogMsg$1.disabled = false;
  }

  function keypress(evt) {
    if (evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      sendMessage();
    }
  }

  function captureEnter() {
    if (enterForSendMessage$2) {
      on(dialogMsg$1, 'keypress', keypress);
    }
  }

  function getValidateTips() {
    if (!validateTips) {
      var nodes = getElementsByClassName('validateTips', quickMsgDialog);
      if (nodes.length === 1) {
        validateTips = nodes[0];
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
    var newRow = msgTbl.insertRow(index);
    var newCell = newRow.insertCell(-1);
    insertHtmlBeforeEnd(newCell, myBtn);
    newCell = newRow.insertCell(-1);
    insertHtmlBeforeEnd(newCell, html);
  }

  function fshButton(classPrefix, label) {
    return '<button class="fshButton ui-corner-all ' + classPrefix +
      '-button">' + label + '</button>';
  }

  function addTemplateRow(index, text) {
    addRow(index, fshButton('del', 'Del'),
      '<span class="ui-widget-content fshBlck add-template">' +
      text + '</span>');
  }

  function deleteTemplate(self) {
    var myRow = self.parentNode.parentNode.rowIndex;
    msgTbl.deleteRow(myRow);
    fshTemplate.splice(myRow - 2, 1);
    setValueJSON('quickMsg', fshTemplate);
  }

  function addNewTemplate(self) {
    var templateInput = self.parentNode.nextElementSibling.children[0];
    var templateValue = templateInput.value;
    if (templateValue !== '') {
      var myRow = self.parentNode.parentNode.rowIndex;
      addTemplateRow(myRow, templateValue);
      templateInput.value = '';
      fshTemplate.push(templateValue);
      setValueJSON('quickMsg', fshTemplate);
    }
  }

  function insertTemplate(self) {
    dialogMsg$1.value += getText(self)
      .replace(/\{playername\}/g, targetPlayer) + '\n';
  }

  var classEvents = [
    ['del-button', deleteTemplate],
    ['add-button', addNewTemplate],
    ['add-template', insertTemplate],
  ];

  function makeRows(text) {addTemplateRow(-1, text);}

  function showMsgTemplate() {
    if (!showingTemplates) {
      getTable();
      fshTemplate.forEach(makeRows);
      addRow(-1,
        fshButton('add', 'Add'),
        '<input id="newTmpl" class="ui-widget-content fshTmpl">');
      showingTemplates = true;
      on(msgTbl, 'click', classHandler(classEvents));
    }
  }

  function getFshTemplate() { // jQuery
    if (!fshTemplate) {
      fshTemplate = getValueJSON('quickMsg');
      var buttons = $quickMessageDialog.dialog('option', 'buttons');
      sendMessage = buttons['Send Message'];
    }
  }

  function openQuickMsgDialog(name, msg, tip) { // jQuery
    getQuickMessageDialog();
    getFshTemplate();
    showMsgTemplate();
    setName(name);
    setMsg(msg);
    captureEnter();
    doValidateTip(fallback(tip, ''));
    $quickMessageDialog.dialog('open');
  }

  function injectQuickMsgDialogJQ() {
    if (jQueryNotPresent()) {return;}
    enterForSendMessage$2 = getValue('enterForSendMessage');
    window.openQuickMsgDialog = openQuickMsgDialog;
  }

  function doServerNode(topbannerStats, miniboxList) {
    var nodeName = getText(miniboxList.children[7]);
    var serverDiv = createDiv({
      className: 'tip-static',
      dataset: {tipped: 'Server'},
      textContent: 'Server: ' + nodeName
    });
    insertElement(topbannerStats, serverDiv);
  }

  function doOnlinePlayers(topbannerStats, miniboxList) {
    var playersOnline = miniboxList.children[3].innerHTML;
    var bannerPlayers = topbannerStats.children[0];
    bannerPlayers.innerHTML = 'Online: ' + playersOnline;
  }

  function statBoxesExist(topbannerStats, gameStats) {
    var miniboxList = gameStats.nextElementSibling.children[0];
    if (miniboxList.children.length === 8) {
      doServerNode(topbannerStats, miniboxList);
      doOnlinePlayers(topbannerStats, miniboxList);
      toggleForce(gameStats.parentNode, true);
    }
  }

  function validStatBoxes(topbannerStats, gameStats) {
    var hidden = topbannerStats &&
      hasClass('topbanner-stats-hidden', topbannerStats);
    return !hidden && gameStats;
  }

  function injectServerNode() {
    var topbannerStats = getElementById('topbanner-stats');
    var gameStats = querySelectorArray('#pCR h3').find(contains('Game Stats'));
    if (validStatBoxes(topbannerStats, gameStats)) {
      statBoxesExist(topbannerStats, gameStats);
    }
  }

  function getStamVals(staminaMouseover) {
    return /([,0-9]+)\s\/\s([,0-9]+)/.exec(
      valueText(getElementsByClassName('stat-name', staminaMouseover))
    );
  }

  function maxStamAt(nextGain, stamVals) {
    return '<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>' +
      timeBox(
        valueText(nextGain),
        // get the max hours to still be inside stamina maximum
        Math.floor(
          (intValue(stamVals[2]) - intValue(stamVals[1])) /
          asInt('stat-stamina-gainPerHour')
        )
      );
  }

  function injectStaminaCalculator() {
    var nextGain = getElementsByClassName('stat-stamina-nextGain');
    if (nextGain.length === 0) {return;}
    var staminaMouseover = getElementById('statbar-stamina-tooltip-stamina');
    var stamVals = getStamVals(staminaMouseover);
    insertHtmlBeforeEnd(staminaMouseover, maxStamAt(nextGain, stamVals));
  }

  function getPos(available, desired, offset) {
    return Math.floor(Math.max(available - desired, 0) / 2 + offset);
  }

  function fshOpen(url, title, w, _h, features) {
    var h = _h;
    if (_h === 500) {h = 1000;}
    var top = getPos(window.screen.availHeight, h, window.screenY);
    var left = getPos(document.documentElement.clientWidth, w, window.screenX);
    window.open(url, title, 'width=' + w + ', height=' + h + ', left=' + left +
      ', top=' + top + features);
  }

  function interceptQuickBuff() {
    window.openWindow = fshOpen;
  }

  function scoutTowerLink() {
    var spoils = getElementById('minibox-spoilsofwar');
    if (spoils) {
      var parent = spoils.children[1].children[0];
      insertHtmlBeforeEnd(parent, '&nbsp;<a href="' + scouttowerUrl +
        '" class="tip-static" data-tipped="View Scout Report">' +
        '<img id="fshScoutTower" ' +
        'src="' + imageServer + '/structures/27.gif"></a>');
    }
  }

  function preventHcs(evt) {
    evt.stopPropagation();
  }

  function statbarWrapper(href, id) {
    var character = getElementById(id);
    if (!character) {return;}
    var myWrapper = createAnchor({href});
    var statWrapper = character.parentNode;
    insertElement(myWrapper, character);
    insertElementAfterBegin(statWrapper, myWrapper);
    on(myWrapper, 'click', preventHcs, true);
  }

  function statbar() {
    statbarWrapper(profileUrl, 'statbar-character');
    statbarWrapper(pointsUrl + def_subcmd + 'reserve', 'statbar-stamina');
    statbarWrapper(blacksmithUrl, 'statbar-equipment');
    statbarWrapper(dropItemsUrl, 'statbar-inventory');
    statbarWrapper(pointsUrl, 'statbar-fsp');
    statbarWrapper(cmdUrl + 'bank', 'statbar-gold');
  }

  function asyncPThree(fn) {add(3, fn);}

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
      scoutTowerLink
    ].forEach(asyncPThree);
  }

  var oldLog;
  var timeoutId;
  var intervalId;

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
    var myTime = serverTime - element.time;
    var mobName = element.creature.name.replace(' (Super Elite)', '');
    if (!oldLog.se[mobName] || oldLog.se[mobName] < myTime) {
      oldLog.se[mobName] = myTime;
    }
  }

  function processSeData(data) {
    var serverTime = Number(data.t.split(' ')[1]);
    if (!oldLog) {oldLog = {lastUpdate: 0, se: {}};}
    oldLog.lastUpdate = serverTime;
    var resultAry = data.r;
    if (resultAry) {
      resultAry.forEach(partial(updateSeLog, serverTime));
      setForage('fsh_seLog', oldLog);
    }
  }

  function gotSe(data) {
    if (dataLooksOk(data)) {processSeData(data);}
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
    return nowSecs - (oldLog && oldLog.lastUpdate || 0);
  }

  function setupBackgroundCheck() {
    var lastCheckSecs = whenWasLastCheck();
    if (lastCheckSecs >= 600) {
      doBackgroundCheck();
    } else {
      timeoutId = window.setTimeout(doBackgroundCheck,
        (600 - lastCheckSecs) * 1000);
    }
  }

  function gotLog(data) {
    if (data) {oldLog = data;}
  }

  function getFshSeLog() { // jQuery.min
    return getForage('fsh_seLog').then(gotLog);
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
      'wantedGuildMembers'
    ].forEach(getCalfPrefs);
    calf.allyEnemyOnlineRefreshTime =
      getValue('allyEnemyOnlineRefreshTime') * 1000;
  }

  function moveRHSBoxUpOnRHS(title) {
    var box = getElementById(title);
    if (box) {
      insertElementAfterBegin(pCR, box);
    }
  }

  function moveRHSBoxToLHS(title) {
    var boxDiv = getElementById(title);
    if (boxDiv) {
      boxDiv.classList.add('pCR');
      insertElement(getElementById('pCL'), boxDiv);
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

  function asyncPFour(fn) {add(4, fn);}

  function priorityFour() {
    [
      guildActivity,
      seLog
    ].forEach(asyncPFour);
  }

  function notHuntMode() {
    if (calf.huntingMode) {return;}
    // move boxes in opposite order that you want them to appear.
    executeAll([
      doMoveGuildList,
      doMoveAllyList,
      doMoveDailyQuest,
      doMoveFsBox,
      getEnvVars,
      conditional,
      priorityThree,
      priorityFour
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

  function backpack$1() {
    keyHandlerEvent('backpack');
    expandMenu('2');
    location.href = dropItemsUrl;
  }

  var jsonTests = [
    function(itemIndex, json) {return json;},
    function(itemIndex, json) {return json.s;},
    function(itemIndex, json) {return json.r;},
    function(itemIndex, json) {return json.r.equip_sets;},
    function(itemIndex, json) {return json.r.equip_sets.length > itemIndex;}
  ];

  function funcPasses(itemIndex, json, fn) {return fn(itemIndex, json);}

  function goodData$1(itemIndex, json) {
    return jsonTests.every(partial(funcPasses, itemIndex, json));
  }

  function changeCombatSet(itemIndex, json) {
    if (goodData$1(itemIndex, json)) {
      var cbsIndex = json.r.equip_sets[itemIndex].id;
      expandMenu('2');
      location.href = profileUrl + def_subcmd +
        'managecombatset&submit=Use&combatSetId=' + cbsIndex;
    }
  }

  function combatSetKey(itemIndex) {
    keyHandlerEvent('changeCombatSet');
    daViewProfile().then(partial(changeCombatSet, itemIndex));
  }

  function createGroup() {
    keyHandlerEvent('createGroup');
    expandMenu('4');
    location.href = groupsSubcmdUrl + 'create';
  }

  function notWorld(type, href) {
    if (!getElementById('worldPage')) {
      keyHandlerEvent(type);
      location.href = href;
    }
  }

  function doRepair() {
    // do not use repair link for new map
    notWorld('doRepair', blacksmithUrl + def_subcmd + 'repairall');
  }

  var goldAmount$1;
  var sendGoldonWorld$1;

  function doneSendGold(data) {
    var info = infoBoxFrom(data);
    if (info === 'You successfully sent gold!' || info === '') {
      setValue('currentGoldSentTotal',
        parseInt(getValue('currentGoldSentTotal'), 10) +
        parseInt(getValue('goldAmount'), 10));
      GameData.fetch(def_fetch_playerStats);
    }
  }

  function doSendGold() { // jQuery
    if (!sendGoldonWorld$1) {return;}
    indexAjaxData({
      cmd: 'trade',
      subcmd: 'sendgold',
      xc: window.ajaxXC,
      target_username: $('#HelperSendTo').html(),
      gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g, '')
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
    return '<dt class="stat-gold-sendTo">Send To:</dt>' +
      '<dd id="HelperSendTo">' + getValue('goldRecipient') + '</dd>' +
      '<dt class="stat-gold-sendAmt">Amount:</dt>' +
      '<dd id="HelperSendAmt">' + addCommas(goldAmount$1) + '</dd>' +
      '<dt class="stat-gold-sendTo">Send?</dt>' +
      '<dd><input id="HelperSendGold" value="Send!" class="custombutton" ' +
      'type="submit"><input type="hidden" id="xc" value=""</dd>' +
      '<dt class="stat-gold-sendTotal">Total Sent:</dt>' +
      '<dd id="HelperSendTotal">' +
        addCommas(getValue('currentGoldSentTotal')) + '</dd>';
  }

  function prepareSendGoldOnWorld() {
    goldAmount$1 = getValue('goldAmount');
    $('#statbar-gold-tooltip-general').append(extraHtml());
    $('#HelperSendGold').on('click', doSendGold);
    updateSendGoldOnWorld();
    $.subscribe(def_playerGold, updateSendGoldOnWorld);
  }

  function injectSendGoldOnWorld() { // jQuery
    sendGoldonWorld$1 = getValue('sendGoldonWorld');
    if (sendGoldonWorld$1) {prepareSendGoldOnWorld();}
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
    location.href = guildSubcmdUrl + 'manage';
  }

  function joinAllGroup() {
    keyHandlerEvent('joinAllGroup');
    expandMenu('4');
    if (!getValue('enableMaxGroupSizeToJoin')) {
      location.href = joinallUrl;
    } else {
      location.href = joinUnderUrl;
    }
  }

  function logPage() {
    keyHandlerEvent('logPage');
    expandMenu('2');
    location.href = logUrl;
  }

  function clickThis(el) {
    el.click();
  }

  function movePage(dir) {
    var dirButton = querySelector('#pCC input[value="' + dir + '"]');
    if (!dirButton) {return;}
    keyHandlerEvent('movePage');
    clickThis(dirButton);
  }

  function profile$2() {
    keyHandlerEvent('profile');
    expandMenu('2');
    location.href = profileUrl;
  }

  function toWorld() {
    // do not use for new map
    notWorld('toWorld', worldUrl);
  }

  var keyLookup = [
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
    ['b', backpack$1], // backpack [b]
    ['g', gotoGuild], // go to guild [g]
    ['j', joinAllGroup], // join all group [j]
    ['l', logPage], // Log Page [l]
    ['p', profile$2], // profile [p]
    ['r', doRepair], // repair [r]
    ['v', fastWearMgr], // fast wear manager [v]
    ['y', doSendGold] // fast send gold [y]
  ];

  function thisKey(key, arr) {return key === arr[0];}

  function handleKey(key) {
    var mapping = keyLookup.find(partial(thisKey, key));
    if (mapping) {mapping[1](mapping[2]);}
  }

  function notTagName(evt, tag) {return evt.target.tagName !== tag;}

  var bailOut = [
    function(evt) {
      return ['HTML', 'BODY'].every(partial(notTagName, evt));
    },
    /* ignore control, alt and meta keys
    (I think meta is the command key in Macintoshes) */
    function(evt) {return evt.ctrlKey;},
    function(evt) {return evt.metaKey;},
    function(evt) {return evt.altKey;}
  ];

  function reason(evt, fn) {return fn(evt);}

  function doNotHandle(evt) {
    return bailOut.some(partial(reason, evt));
  }

  function handleKeyUp(e) {
    if (doNotHandle(e)) {return;}
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
    var hcsHtml = getElementById('html');
    if (hcsHtml && hcsHtml.dataset) {
      return hcsHtml.dataset.hcs;
    }
  }

  function lookForUi(hcsData) {
    var thisJson = jsonParse(hcsData);
    if (thisJson && thisJson['new-ui']) {
      prepareEnv();
    }
  }

  function lookForHcsData() {
    var hcsData = findHcsData();
    if (hcsData) {
      lookForUi(hcsData);
    }
  }

  function urlParam(e) {
    return e.name + '=' + e.value;
  }

  function dontPost(scope) {
    var validInputs = querySelectorArray(
      'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]), ' +
      'select, input[type="checkbox"]:checked', scope);
    window.location = indexPhp + '?' + validInputs.map(urlParam).join('&');
  }

  function updateUrl(evt) {
    evt.preventDefault();
    dontPost();
  }

  function allowBack() {
    on(querySelector('input[type="submit"]'), 'click', updateUrl);
  }

  function getIntVal(selector) {
    return parseInt($(selector).val(), 10);
  }

  function changeMinMax(newOpts, redraw) {
    var minLvl = getIntVal('#fshMinLvl');
    var maxLvl = getIntVal('#fshMaxLvl');
    if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
    newOpts(minLvl, maxLvl);
    redraw();
  }

  var moveOptions =
    '<td colspan=3 ' +
    'style="padding-top: 2px;padding-bottom: 2px;">' +
    '<select style="max-width: 50px;">' +
    '<option value="x">Basic Attack</option>' +
    '<option value="0">Block</option>' +
    '<option value="1">Counter Attack</option>' +
    '<option value="2">Critical Hit</option>' +
    '<option value="3">Defend</option>' +
    '<option value="4">Deflect</option>' +
    '<option value="5">Dodge</option>' +
    '<option value="6">Lunge</option>' +
    '<option value="7">Power Attack</option>' +
    '<option value="8">Spin Attack</option>' +
    '<option value="9">Piercing Strike</option>' +
    '<option value="10">Crush</option>' +
    '<option value="11">Weaken</option>' +
    '<option value="12">Ice Shard</option>' +
    '<option value="13">Fire Blast</option>' +
    '<option value="14">Poison</option>' +
    '</select></td>';
  var tableOpts$1 = {
    columnDefs: [
      {orderable: false, targets: [9]}
    ],
    dom: 't',
    info: false,
    order: [[3, 'asc'], [0, 'asc']],
    paging: false,
    stateSave: true,
    stateDuration: 0
  };
  var arenaFilter =
    '<table width="100%"><tbody><tr><td>' +
    '<span class="fshBlue"><input id="fshHideMoves" type="checkbox">' +
    '&nbsp;Hide Matches for Completed Moves</span></td><td align="right">' +
    '<span class="fshBlue">Min lvl:&nbsp;<input id="fshMinLvl" size="5">' +
    '&nbsp;Max lvl:&nbsp;<input id="fshMaxLvl" size="5">&nbsp;&nbsp;' +
    '<input id="fshReset" class="custombutton" type="button" ' +
    'value="Reset"></span></td></tr></tbody></table>';
  var fshArenaKey = 'fsh_arena';

  var opts;
  var oldIds;

  function storeOpts() {
    setForage(fshArenaKey, opts);
  }

  function newOpts(newMin, newMax) {
    opts = opts || {};
    opts.minLvl = newMin;
    opts.maxLvl = newMax;
    storeOpts();
  }

  function redrawTable() {
    $('#arenaTypeTabs table[width="635"]').DataTable().draw();
  }

  function changeLvls() { // jQuery
    changeMinMax(newOpts, redrawTable);
  }

  function resetLvls() { // jQuery
    newOpts(defaults.arenaMinLvl, defaults.arenaMaxLvl);
    $('#fshMinLvl').val(opts.minLvl);
    $('#fshMaxLvl').val(opts.maxLvl);
    redrawTable();
  }

  function hideMoves(evt) { // jQuery
    opts = opts || {};
    opts.hideMoves = evt.target.checked;
    storeOpts();
    $('.moveMax').toggle(!evt.target.checked);
  }

  function setOpts$1(arena) {
    opts = arena || {};
    oldIds = opts.id || {};
    opts.id = {};
  }

  function hazOpts(_settings, data) {
    var min = opts.minLvl;
    var max = opts.maxLvl;
    var level = intValue(data[7]);
    return lvlTest(playerLvlTest, level, min, max);
  }

  function lvlFilter(_settings, data) {
    if (opts) {return hazOpts(_settings, data);}
    return true;
  }

  function doLvlFilter() {
    $.fn.dataTable.ext.search.push(lvlFilter);
  }

  function makeTheRow() {
    var theRow = $('#pCC > table > tbody > tr:nth-child(7)');
    theRow.clone().insertBefore(theRow).find('td').attr('height', '2');
    theRow.clone().insertAfter(theRow).find('td').attr('height', '1');
    return theRow;
  }

  function hideMovesCheckbox(aTable) { // jQuery
    var fshHideMoves = $('#fshHideMoves', aTable);
    if (opts && 'hideMoves' in opts) {
      fshHideMoves.prop('checked', opts.hideMoves);
      $('.moveMax').toggle(!opts.hideMoves);
    }
    fshHideMoves.on('click', hideMoves);
  }

  function minLvlValue(aTable) { // jQuery
    var fshMinLvl = $('#fshMinLvl', aTable);
    if (opts && 'minLvl' in opts) {
      fshMinLvl.val(opts.minLvl);
    } else {
      fshMinLvl.val(defaults.arenaMinLvl);
    }
  }

  function maxLvlValue(aTable) { // jQuery
    var fshMaxLvl = $('#fshMaxLvl', aTable);
    if (opts && 'maxLvl' in opts) {
      fshMaxLvl.val(opts.maxLvl);
    } else {
      fshMaxLvl.val(defaults.arenaMaxLvl);
    }
  }

  function eventHandlers(aTable) {
    $('#fshMinLvl, #fshMaxLvl', aTable).on('keyup', changeLvls);
    $('#fshReset', aTable).on('click', resetLvls);
  }

  function filterHeader() { // jQuery
    var theRow = makeTheRow();
    var aTable = $(arenaFilter);
    hideMovesCheckbox(aTable);
    minLvlValue(aTable);
    maxLvlValue(aTable);
    eventHandlers(aTable);
    $('td', theRow).append(aTable);
  }

  function colourNewRow(row, id) { // jQuery
    if (oldIds && !oldIds[id]) {
      row.css('background-color', '#F5F298');
      row.find('tr').css('background-color', '#F5F298');
    }
  }

  function checkTournamentId(row, theCells) { // jQuery
    var matches = /#\s(\d+)/.exec(theCells.eq(0).text());
    if ([matches, opts, opts.id].every(isObject)) {
      opts.id[matches[1]] = matches[1];
      colourNewRow(row, matches[1]);
    }
  }

  function players(theCells) { // jQuery
    var cell = theCells.eq(1);
    var matches = /(\d+)\s\/\s(\d+)/.exec(cell.text());
    if (matches) {
      cell.attr('data-order',
        (Number(matches[1]) - Number(matches[2])) * 100 + Number(matches[2])
      );
    }
  }

  function joinCost(theCells) {
    var cell = theCells.eq(2);
    cell.attr('data-order', $('td', cell).first().text().replace(/[,\s]/g, ''));
  }

  function boolData(theCells, i) { // jQuery
    var cell = theCells.eq(i);
    var matches = /(\d)\.gif/.exec($('img', cell).attr('src'));
    if (matches) {cell.attr('data-order', matches[1]);}
  }

  function theBools(theCells) {
    [4, 5, 6].forEach(partial(boolData, theCells));
  }

  function hazMaxMoves(matches, row) { // jQuery
    if (opts.moves[matches[1]] &&
      opts.moves[matches[1]].count === 3) {
      row.addClass('moveMax');
    }
  }

  function optsHazMoves(cell, row) { // jQuery
    var matches = /\/pvp\/(\d+)\.gif/.exec($('img', cell).attr('src'));
    if (matches) {
      hazMaxMoves(matches, row);
      cell.attr('data-order', matches[1]);
    }
  }

  function maxMoves(theCells, row) { // jQuery
    var cell = theCells.eq(8);
    if (opts && opts.moves) {
      optsHazMoves(cell, row);
    }
  }

  function reward(theCells) { // jQuery
    var cell = theCells.eq(8);
    if (cell.children(def_table).length !== 1) {return;}
    cell.attr('data-order', cell.find('td').first().text().replace(/[,\s]/g, ''));
  }

  function _orderData(i, e) { // jQuery
    var row = $(e);
    var theCells = row.children();
    checkTournamentId(row, theCells);
    players(theCells);
    joinCost(theCells);
    theBools(theCells);
    maxMoves(theCells, row);
    reward(theCells);
  }

  function orderData(theTables) {
    var myRows = theTables.children('tbody').children('tr');
    myRows.each(_orderData);
  }

  const addId = e => [e, Number(e.previousElementSibling.value)];

  function addMeta(json, e) {
    if (json.r && json.r.arenas) {
      return e.concat(json.r.arenas.find(a => a.id === e[1]));
    }
    return e;
  }

  function listPlayers(myGuild, p) {
    if (p.guild_id === myGuild) {
      return '<span class="fshRed">' + p.name + '</span>';
    }
    return p.name;
  }

  const joinBtn = (myGuild, button) => myGuild && button.value === 'Join';

  function testGuildies(myGuild, button, arena) {
    const fromMyGuild = arena.players.filter(p => p.guild_id === myGuild)
      .length;
    const maxGuildies = arena.max_players / 4;
    if (fromMyGuild === maxGuildies) {button.classList.add('fshGray');}
  }

  function hazPlayers(myGuild, button, arena) {
    button.dataset.tipped = arena.players.map(partial(listPlayers, myGuild))
      .join('<br>');
    button.classList.add('tip-static');
    if (joinBtn(myGuild, button)) {testGuildies(myGuild, button, arena);}
  }

  function decorate(myGuild, [button, id, arena]) {
    if (!arena) {
      console.log('decorate', [button, id, arena]); // eslint-disable-line no-console
    } else if (arena.players.length > 0) {hazPlayers(myGuild, button, arena);}
  }

  function participants(json) {
    if (!json.s) {return;}
    const theButtons = querySelectorArray(
      '#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]');
    const withPvpId = theButtons.map(addId);
    const withMeta = withPvpId.map(partial(addMeta, json));
    // console.log('withMeta', withMeta); // eslint-disable-line no-console
    withMeta.forEach(partial(decorate, currentGuildId()));
    return 0;
  }

  var sortClasses = 'td.sorting, td.sorting_asc, td.sorting_desc';

  function calculateSortOrder(self) {
    var classes = self.attr('class');
    var test = /sorting([^\s]+)/.exec(classes);
    if (test && test[1] === '_desc') {return 'asc';}
    return 'desc';
  }

  function sortDataTable(self, myCol, sortOrder) {
    var table = self.closest(def_table).DataTable();
    if (myCol !== 3) {
      table.order([3, 'asc'], [myCol, sortOrder]).draw();
    } else {
      table.order([3, sortOrder]).draw();
    }
  }

  function sortHandler(evt) { // jQuery
    var self = $(evt.target).closest('td');
    var sortOrder = calculateSortOrder(self);
    sortDataTable(self, self.index(), sortOrder);
  }

  function redoSort(tabs) {
    $(sortClasses, tabs).off('click');
    tabs.on('click', sortClasses, sortHandler);
  }

  function updateUrl$1(e) {
    e.preventDefault();
    dontPost(e.target.parentNode);
  }

  function arena(data) {
    return callApp(extend({cmd: 'arena'}, data));
  }

  function view$1() {
    return arena({subcmd: 'view'});
  }

  function removeHiddenRows() {
    const hiddenRows = querySelectorArray(
      '#arenaTypeTabs tr[style="display: none;"]');
    hiddenRows.forEach(n => n.remove());
  }

  function redoHead(i, e) { // jQuery
    var firstRow = $('tr', e).first();
    $('a', firstRow).contents().unwrap();
    $(e).prepend($('<thead/>').append(firstRow));
  }

  function prepareEnv$1() {
    filterHeader();
    storeOpts();
    doLvlFilter();
  }

  function arenaDataTable(tabs, [arena, json]) { // jQuery
    const theTables = $('table[width="635"]', tabs);
    theTables.each(redoHead);
    setOpts$1(arena);
    orderData(theTables);
    participants(json);
    prepareEnv$1();
    theTables.DataTable(tableOpts$1);
    redoSort(tabs);
    tabs.on('click', 'input.custombutton[type="submit"]', updateUrl$1);
  }

  function process(tabs, values) {

    time('arena.process');

    removeHiddenRows();
    arenaDataTable(tabs, values);

    timeEnd('arena.process');

  }

  function injectArena() { // jQuery
    if (jQueryNotPresent()) {return;}
    var tabs = $('#arenaTypeTabs');
    if (tabs.length !== 1) { // Join error screen
      console.log('Join error screen ?'); // eslint-disable-line no-console
      return;
    }
    // all([getForage(fshArenaKey), view()]).then(partial(process, tabs));
    allthen([getForage(fshArenaKey), view$1()], partial(process, tabs));
  }

  function getMsg() {
    const thisInfo = infoBox();
    console.log(thisInfo); // eslint-disable-line no-console
  }

  function getId$1() {
    const thisId = querySelector('#pCC input[name="pvp_id"]');
    console.log(thisId.value); // eslint-disable-line no-console
  }

  function arenaDoJoin() {
    // console.log('arena DoJoin');
    const tabs = getElementById('arenaTypeTabs');
    if (tabs) {
      injectArena();
    } else {
      getMsg();
      getId$1();
    }
  }

  function updateUrl$2(e) {
    e.preventDefault();
    dontPost(pCC);
  }

  function allowBack$1() {
    var submitButton = querySelector('input[type="submit"]', pCC);
    if (submitButton) {
      on(submitButton, 'click', updateUrl$2);
    }
  }

  function isSelected(val, test) {
    if (val === test) {return ' selected';}
    return '';
  }

  function usesetup(setId) {
    return arena({subcmd: 'usesetup', set_id: setId});
  }

  let moveContainer;

  function getContainer(thisCell) {
    if (!moveContainer) {
      moveContainer = insertElement(thisCell, createDiv());
    }
    return moveContainer;
  }

  const boolToString = e => String(Number(e));

  const thisTournament = () => Number(getTextTrim(getArrayByTagName('b', pCC)
    .find(includes('Tournament #'))).match(/\d+/)[0]);

  function injectImg(container, id) {
    insertHtmlBeforeEnd(container,
      '<img src="' + imageServer + '/pvp/' + String(id - 1) +
      '.gif" class="moveImg">');
  }

  function param$1(label, value) {
    return '<div>' + label + '<img src="' + imageServer +
      '/pvp/specials_' + boolToString(value) + '.gif"></div>';
  }

  function paramBox(thisArena) {
    return '<div class="flex">' +
        param$1('Specials', thisArena.specials) +
        param$1('Hell Forge', thisArena.hellforge) +
        param$1('Epic', thisArena.epic) +
      '</div>';
  }

  function thisOptions(current_set, e) {
    return '<option value="' + String(e.id) + '"' +
      isSelected(current_set.slots.join(), e.slots.join()) +
      '>' + e.name + '</option>';
  }

  function doMoves(thisSet, thisCell) {
    const container = getContainer(thisCell);
    container.innerHTML = '';
    thisSet.slots.forEach(partial(injectImg, container));
  }

  function onchange(r, thisCell, evt) {
    // console.log(evt.target.value);
    const thisSet = r.sets.find(e => e.id === Number(evt.target.value));
    if (thisSet) {
      usesetup(evt.target.value).then(function(json) {
        // console.log(json);
        if (json.s) {
          doMoves(thisSet, thisCell);
        }
      });
    }
  }

  function doSelect(r, thisCell) {
    if (r.sets.length > 0) {
      const thisSelect = createSelect({
        innerHTML: r.sets.map(partial(thisOptions, r.current_set))
          .join('')
      });
      on(thisSelect, 'change', partial(onchange, r, thisCell));
      const div = createDiv();
      insertElement(div, thisSelect);
      insertElementAfterBegin(thisCell.children[0], div);
    }
  }

  function showMoves(r, thisCell) {
    // console.log('r', r);
    const tourney = thisTournament();
    // console.log('tourney', tourney);
    const thisArena = r.arenas.find(e => e.id === tourney);
    // console.log('thisArena', thisArena);
    thisCell.setAttribute('align', 'center');
    insertHtmlBeforeEnd(thisCell, paramBox(thisArena));
    if (thisArena.specials) {
      doSelect(r, thisCell);
      doMoves(r.current_set, thisCell);
    }
  }

  function findCell(json) {
    // console.log('json', json);
    const thisCell = querySelector('#pCC > form > table tr:nth-of-type(7) td');
    if (json.r && thisCell) {showMoves(json.r, thisCell);}
  }

  function arenaJoin() {
    console.log('arena Join'); // eslint-disable-line no-console
    var tabs = getElementById('arenaTypeTabs');
    if (tabs) {
      injectArena();
    } else {
      allowBack$1();
      view$1().then(findCell);
    }
  }

  function updateGoUrl(e) {
    e.preventDefault();
    dontPost(querySelector('#pCC input[value="completed"]').parentNode);
  }

  function gotoPage(pageId) {
    window.location = arenaUrl + 'completed&page=' + pageId;
  }

  function lastPage$1() { // jQuery
    return $('#pCC input[value="Go"]').closest('td').prev().text()
      .replace(/\D/g, '');
  }

  function injectStartButton() { // jQuery
    var prevButton = $('#pCC input[value="<"]');
    if (prevButton.length === 1) {
      var startButton = $('<input value="<<" type="button">');
      prevButton.before(startButton).before('&nbsp;');
      startButton.on('click', partial(gotoPage, 1));
    }
  }

  function gotoLastPage() {gotoPage(lastPage$1());}

  function injectFinishButton() { // jQuery
    var nextButton = $('#pCC input[value=">"]');
    if (nextButton.length === 1) {
      var finishButton = $('<input value=">>" type="button">');
      nextButton.after(finishButton).after('&nbsp;');
      finishButton.on('click', gotoLastPage);
    }
  }

  function overrideButtons() { // jQuery
    injectStartButton();
    injectFinishButton();
    $('#pCC input[value="View"]').on('click', updateUrl$1);
    on(querySelector('#pCC input[value="Go"]'), 'click', updateGoUrl);
  }

  function completedArenas() { // jQuery
    if (jQueryPresent()) {overrideButtons();}
  }

  var oldMoves = [];
  var imgNodes;
  var selectRow;

  function doPickMove(moveId, slotId) {
    return indexAjaxData({
      cmd: 'arena',
      subcmd: 'dopickmove',
      move_id: moveId,
      slot_id: slotId
    });
  }

  function value(el) {return el.value;}

  function getAllMoves() {
    return getArrayByTagName('select', selectRow).map(value);
  }

  function resetMove(val, ind) {
    if (val === oldMoves[ind]) {return;}
    imgNodes.eq(ind).attr({
      src: imageServer + '/world/actionLoadingSpinner.gif',
      width: '25',
      height: '25'
    });
    return doPickMove('x', ind);
  }

  function newMove(val, ind) {
    if (val === 'x' || val === oldMoves[ind]) {return;}
    return doPickMove(val, ind);
  }

  function pageRefresh() {
    window.location = arenaUrl + 'setup';
  }

  function changeMoves(newMoves) {
    var prm = newMoves.map(newMove);
    allthen(prm, pageRefresh);
  }

  function updateMoves() { // jQuery
    var newMoves = getAllMoves();
    var prm = newMoves.map(resetMove);
    allthen(prm, partial(changeMoves, newMoves));
  }

  function updateButton(table) { // jQuery
    var row = $('<tr><td colspan=32 align=center ' +
      'style="padding-top: 2px;padding-bottom: 2px;">' +
      '<input class="custombutton" value="Update" type="button">' +
      '</td></tr>');
    $('input', row).on('click', updateMoves);
    table.append(row);
  }

  function makeDropDown(row, i, e) { // jQuery
    var move = $(e).attr('src');
    if (move.indexOf('bar_icon_holder.jpg') > 0) {
      move = 'x';
    } else {
      move = move.match(/pvp\/(\d+).gif$/)[1];
    }
    oldMoves.push(move);
    var html = $(moveOptions);
    $('option[value=' + move + ']', html).prop('selected', true);
    row.append(html);
  }

  function pickerRow(table) { // jQuery
    var row = $('<tr/>');
    selectRow = row.get(0);
    row.append('<td/>');
    imgNodes.each(partial(makeDropDown, row));
    table.append(row);
  }

  function getTable$1() {
    return imgNodes.eq(0).closest(def_table).parent().closest(def_table);
  }

  function selectMoves(evt) { // jQuery
    $(evt.target).off();
    imgNodes = $('#pCC a[href*="=pickmove&"] img');
    var table = getTable$1();
    pickerRow(table);
    $('img[src$="pvp/bar_spacer.jpg"]', table).attr({width: '15', height: '50'});
    updateButton(table);
  }

  function setupMoves() { // jQuery
    if (jQueryNotPresent()) {return;}
    var node = $('#pCC b:contains("Setup Combat Moves")');
    if (node.length !== 1) {return;}
    node.addClass('fshLink fshGreen');
    node.on('click', selectMoves);
  }

  function closest(tag, el) {
    if (el.tagName === tag) {return el;}
    return closest(tag, el.parentNode);
  }

  function closestForm(el) {
    return closest('FORM', el);
  }

  function closestTable(el) {
    return closest('TABLE', el);
  }

  function closestTd(el) {
    return closest('TD', el);
  }

  function getCount(moveImg) {
    return /(\d)$/.exec(getTextTrim(closestTd(moveImg)))[1];
  }

  function getCounts(prev, moveImg) {
    var moveId = /(\d+)\.gif/.exec(moveImg.src)[1];
    prev[moveId] = {
      count: Number(getCount(moveImg)),
      href: moveImg.src
    };
    return prev;
  }

  function gotMoves(_arena) {
    var arena = _arena || {};
    var arenaMoves = querySelectorArray('#pCC img[vspace="4"]').slice(1);
    arena.moves = arenaMoves.reduce(getCounts, {});
    setForage(fshArenaKey, arena);
  }

  function storeMoves() {
    getForage(fshArenaKey).then(gotMoves);
  }

  var arena$1 = {
    '-': {'-': injectArena},
    dojoin: {'-': arenaDoJoin},
    join: {'-': arenaJoin},
    completed: {'-': completedArenas},
    pickmove: {'-': storeMoves},
    setup: {'-': setupMoves}
  };

  function toObject(prev, curr) {
    if (curr.is_in_st) {prev.fshHasST = true;}
    prev[curr.inv_id] = curr;
    return prev;
  }

  function rekeyInventory(data) {
    data.items = data.items.reduce(toObject, {});
    return data;
  }

  function getInventoryById() {
    return getInventory().then(rekeyInventory);
  }

  var inv;
  var target;

  function clickOnPerf(el) {
    var thisItem = el.id.replace(target + '-item-', '');
    if (inv[thisItem] && inv[thisItem].craft === 'Perfect') {clickThis(el);}
  }

  function selectPerf() {
    var items = getArrayByClassName('selectable-item',
      getElementById(target + '-items'));
    if (items.length === 0) {return;} // ?
    items.forEach(clickOnPerf);
  }

  function drawFilters(data) {
    inv = data.items;
    var buttonDiv = createDiv({className: 'fshAC'});
    insertHtmlBeforeEnd(buttonDiv,
      '<button class="fshBl">Perfect</button>');
    insertElement(pCC, buttonDiv);
    on(buttonDiv, 'click', selectPerf);
  }

  function perfFilter(loc) { // jQuery.min
    if (jQueryNotPresent()) {return;}
    target = loc;
    getInventoryById().then(drawFilters);
  }

  function doRefresh$1() {
    clickThis(getElementById('refresh'));
  }

  function doCancel(cancelButton) { // jQuery.min
    var itemImage = cancelButton.parentNode.parentNode.children[0].children[0];
    cancelButton.outerHTML = '<img src="' + imageServer +
      '/skin/loading.gif" width="14" height="14">';
    return indexAjaxData({
      cmd: 'auctionhouse',
      subcmd: 'cancel',
      auction_id: /inv_id=(\d+)/.exec(itemImage.dataset.tipped)[1]
    });
  }

  function cancelAllAH() {
    var cancelButtons = getArrayByClassName('auctionCancel',
      getElementById('resultRows'));
    if (cancelButtons.length === 0) {return;}
    var prm = cancelButtons.map(doCancel);
    allthen(prm, doRefresh$1);
  }

  function makeCancelAll() {
    var cancelAll = createSpan({
      className: 'smallLink',
      textContent: 'Cancel All'
    });
    var fill = getElementById('fill').parentNode.parentNode
      .nextElementSibling.children[0];
    fill.classList.add('fshCenter');
    insertHtmlAfterBegin(fill, ']');
    insertElementAfterBegin(fill, cancelAll);
    insertHtmlAfterBegin(fill, '[');
    on(cancelAll, 'click', cancelAllAH);
  }

  function autoFill() {
    if (getValue('autoFillMinBidPrice')) {
      getElementById('auto-fill').checked = true;
    }
  }

  function injectAuctionHouse() {
    if (jQueryNotPresent() || !pCC) {return;}
    makeCancelAll();
    autoFill();
    clickThis(getElementById('sort0'));
  }

  function quickCreate() {
    perfFilter('auction');
  }

  var auctionhouse = {
    '-': {'-': injectAuctionHouse},
    quickcreate: {'-': quickCreate}
  };

  function doBreakdown(selectedList) {
    return indexAjax({
      type: 'POST',
      data: {
        cmd: 'composing',
        subcmd: 'dobreakdown',
        item_list: selectedList
      },
      dataType: 'json'
    });
  }

  var prefDisableBreakdownPrompts = 'disableBreakdownPrompts';
  var disableBreakdownPrompts$2;
  var selectedList = [];

  function disappearance(self) {self.hide();}

  function goDown(self, disappear) {self.animate({height: 0}, 500, disappear);}

  function fadeAway() {
    var self = $('#composingMessageContainer');
    self.animate({opacity: 0}, 500,
      partial(goDown, self, partial(disappearance, self)));
  }

  function msgText(message, bgcolor) {
    return $('<div/>', {id: 'composingMessageText'})
      .css({
        width: '90%',
        'text-align': 'center',
        'background-color': bgcolor,
        color: 'rgb(255, 255, 255)',
        margin: '5px auto 5px auto',
        padding: '2px'
      })
      .html(message);
  }

  function showComposingMessage(message, bgcolor) { // jQuery
    $('#composingMessageContainer').remove();

    $('#composingMessage')
      .append(
        $('<div/>', {
          id: 'composingMessageContainer',
          width: '100%'
        }).append(msgText(message, bgcolor))
      );

    setTimeout(fadeAway, 5000);
  }

  function handleResponse(response) {
    if (response.error !== 0) {
      showComposingMessage('Error: ' + response.msg, 'rgb(164, 28, 28)');
    } else {
      window.location = composingUrl + def_subcmd + 'breakdown&m=1';
    }
  }

  function breakItems() { // jQuery.min
    doBreakdown(selectedList).then(handleResponse);
  }

  function validBreakEvent(evt) {
    evt.stopPropagation();
    if (selectedList.length === 0) {
      showComposingMessage('Error: No items selected.', 'rgb(164, 28, 28)');
      return;
    }
    breakItems();
  }

  function breakEvt(evt) {
    if (disableBreakdownPrompts$2 &&
        evt.target.id === 'breakdown-selected-items') {
      validBreakEvent(evt);
    }
  }

  function itemClick(evt) {
    if (!evt.target.classList.contains('selectable-item')) {return;}
    var myItem = evt.target.id.replace('composing-item-', '');
    var itemPos = selectedList.indexOf(myItem);
    if (itemPos === -1) {
      selectedList.push(myItem);
    } else {
      selectedList.splice(itemPos, 1);
    }
  }

  function togglePref$1() {
    disableBreakdownPrompts$2 = !disableBreakdownPrompts$2;
    setValue(prefDisableBreakdownPrompts, disableBreakdownPrompts$2);
  }

  function prefBox() {
    insertHtmlBeforeEnd(pCC,
      '<table class="fshTblCenter"><tbody>' +
      simpleCheckbox(prefDisableBreakdownPrompts) +
      '</tbody></table>');
  }

  function setupHandlers() {
    on(getElementById('breakdown-selected-items').parentNode, 'click', breakEvt,
      true);
    on(getElementById('composing-items'), 'click', itemClick);
    on(getElementById(prefDisableBreakdownPrompts), 'click', togglePref$1);
  }

  function composingBreakdown() {
    if (jQueryNotPresent()) {return;}
    perfFilter('composing');
    disableBreakdownPrompts$2 = getValue(prefDisableBreakdownPrompts);
    prefBox();
    setupHandlers();
  }

  function setMaxVal() {
    getElementById('composing-skill-level-input').value =
      getText(getElementById('composing-skill-level-max'));
  }

  function composingCreate() {
    on(getElementById('composing-add-skill'), 'click', setMaxVal);
    on(getElementById('composing-skill-select'), 'change', setMaxVal);
  }

  function getRandomInt(_min, _max) {
    var min = Math.ceil(_min);
    var max = Math.floor(_max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function rnd() {
    return getRandomInt(1000000000, 9999999998);
  }

  function createPotionFromTemplate(tempId) {
    return indexAjax({
      cache: false,
      dataType: 'json',
      data: {
        cmd: 'composing',
        subcmd: 'createajax',
        template_id: tempId,
        _rnd: rnd()
      }
    });
  }

  function randomBackgroundImage() {
    return 'url(' + imageServer + '/composing/potions/' +
      getRandomInt(1, 11) + '_' + getRandomInt(1, 51) + '.gif)';
  }

  function updateInfoDiv(infoDiv, potName) {
    infoDiv.children[0].innerHTML = '';
    infoDiv.children[0].classList.add('fshPot');
    infoDiv.children[0].style.backgroundImage = randomBackgroundImage();
    infoDiv.children[2].innerHTML = 'Creating \'<span class="fshBold">' +
      potName + '</span>\' Potion';
    infoDiv.children[3].innerHTML = '';
  }

  function amILast() {
    var openTemplates = querySelectorAll(
      '[id|="composing-template"]:not(#composing-template-multi)');
    if (openTemplates.length === 0) {
      setValue(def_needToCompose, false);
    }
  }

  function createSuccess(temp) {
    var myParent = temp.parentNode;
    if (!myParent) {return;}
    myParent.innerHTML = '<div class="fshScs">Success</div>';
    updateInfoDiv(myParent.previousElementSibling.previousElementSibling,
      temp[temp.selectedIndex].text);
    amILast();
  }

  function potionDone(temp, data) {
    var resultNode = temp.parentNode;
    if (!resultNode) {return;}
    if (data.error) {
      resultNode.innerHTML = '<div class="fshScs">' +
        data.error + '</div>';
    } else {
      createSuccess(temp);
    }
  }

  function createPotion(temp) { // jQuery.min
    createPotionFromTemplate(temp.value).then(partial(potionDone, temp));
    // setTimeout(partial(potionDone, temp, {}, 'faked'), 200);
  }

  function backgroundCreate(self, temp) {
    self.innerHTML = '';
    self.classList.add('fshSpinner', 'fshSpinner12', 'fshComposingSpinner');
    createPotion(temp);
    publish('quickcreate');
  }

  function doTableClass(myTable, slotsLeft) {
    myTable.classList.add('left-' + slotsLeft.toString());
  }

  function quickcreate(myTable) {
    var openTemplates = querySelectorAll('.quickCreate .sendLink');
    doTableClass(myTable, openTemplates.length);
  }

  function composePots(button, templateId) {
    sendEvent('composing', 'FastComposeButton');
    var openTemplates = querySelectorAll(
      '[id|="composing-template"]:not(#composing-template-multi)');
    if (openTemplates.length < button.value) {return;}
    for (var i = 0; i < button.value; i += 1) {
      openTemplates[i].value = templateId;
      backgroundCreate(openTemplates[i].nextElementSibling.nextElementSibling,
        openTemplates[i]);
    }
  }

  function handleClick(evt) {
    var button = evt.target;
    var templateId = button.dataset.templateId;
    if (templateId) {composePots(button, templateId);}
  }

  function buildButton(val, templateId) {
    return createInput({
      className: 'awesome orange',
      dataset: {templateId: templateId},
      type: 'button',
      value: val
    });
  }

  function buildCells(template, myRow, compSlot, i) {
    if (i === 0) {
      setText(template[1], myRow.insertCell(-1));
    }
    insertElement(
      myRow.insertCell(-1),
      buildButton((i + 1).toString(), template[0])
    );
    return myRow;
  }

  function buildRows(compSlots, openSlots, myTable, template) {
    compSlots.reduce(partial(buildCells, template), myTable.insertRow(-1));
    return myTable;
  }

  function buildTable(templates, compSlots, openSlots) {
    var myTable = createTable({id: 'fshFastCompose'});
    doTableClass(myTable, openSlots);
    return templates.reduce(partial(buildRows, compSlots, openSlots), myTable);
  }

  function keyValuePairs(el) {return [el.value, el.text];}

  function setupFastCompose(fcDiv, compSlots, openSlots) {
    var templates = querySelectorArray('#composing-template-multi option')
      .map(keyValuePairs);
    var myTable = buildTable(templates, compSlots, openSlots);
    insertElement(fcDiv, myTable);
    on(pCC, 'click', handleClick);
    subscribe('quickcreate', partial(quickcreate, myTable));
  }

  function drawList(fcDiv) {
    sendEvent('composing', 'FastCompose');
    insertHtmlBeforeEnd(fcDiv, '<br>');
    var compSlots = getArrayByClassName('composing-potion-time', document);
    var openSlots = compSlots.filter(contains('ETA: n/a')).length;
    if (openSlots > 0) {
      setupFastCompose(fcDiv, compSlots, openSlots);
    } else {
      insertHtmlBeforeEnd(fcDiv, 'No open slots!');
    }
  }

  function fastCompose() {
    var buttonDiv = querySelector('#pCC div.centered');
    insertHtmlAfterEnd(buttonDiv.children[1],
      ' | <label for="fast-compose"><span class="sendLink">' +
      'Fast Compose</span></label>');
    var fcDiv = createDiv({className: 'centered'});
    insertElementAfter(fcDiv, buttonDiv);
    var fcCheck = createInput({id: 'fast-compose', type: 'checkbox'});
    insertElementAfter(fcCheck, buttonDiv);
    once(fcCheck, 'change', partial(drawList, fcDiv));
  }

  var timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;

  function timeRemaining(times, el) {
    var timeArr = timeRE.exec(getText(el));
    if (timeArr) {
      var milli = (timeArr[1] * 3600 + timeArr[2] * 60 + Number(timeArr[3])) *
        1000 + now;
      return times.concat(milli);
    }
    return times.concat(0);
  }

  function setNeed(bool) {
    setValue(def_needToCompose, bool);
  }

  function parseComposing() {
    if (!calf.enableComposingAlert) {return;}
    var openSlots = getArrayByClassName('composing-potion-time', document);
    var times = openSlots.reduce(timeRemaining, []);
    var eta = Math.min.apply(null, times);
    if (eta === 0) {
      setNeed(true);
    } else {
      setNeed(false);
      setValue(def_lastComposeCheck, eta);
    }
  }

  function moveButtons() {
    if (getValue('moveComposingButtons')) {
      var buttonDiv = getElementById('composing-error-dialog')
        .previousElementSibling;
      buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
      var top = getElementsByClassName('composing-level', pCC)[0]
        .parentNode;
      insertElementBefore(buttonDiv, top);
    }
  }

  function injectButton(el) {
    insertHtmlAfterEnd(el, '<span class="quickCreate">' +
      '[<span class="sendLink">Quick Create</span>]</span>');
  }

  function isOurTarget(target) {
    return target.tagName === 'SPAN' && target.className === 'quickCreate';
  }

  function doQuickCreate(self) {
    var temp = self.previousElementSibling.previousElementSibling;
    if (temp && temp.value !== 'none') {
      backgroundCreate(self, temp);
      sendEvent('composing', 'QuickCreate');
    }
  }

  function quickCreate$1(evt) {
    var self = evt.target.parentNode;
    if (isOurTarget(self)) {
      doQuickCreate(self);
    }
  }

  function hasJQuery() {
    parseComposing();
    querySelectorArray('input[id^=create-]:not(#create-multi)', pCC)
      .forEach(injectButton);
    on(pCC, 'click', quickCreate$1);
    moveButtons();
    fastCompose();
  }

  function injectComposing() {
    if (jQueryPresent() && pCC) {hasJQuery();}
  }

  var composing$2 = {
    '-': {'-': injectComposing},
    breakdown: {'-': composingBreakdown},
    create: {'-': composingCreate}
  };

  function wornSelector(needsWorn) {
    if (needsWorn) {return makeFolderSpan('-2', 'Worn');}
    return '';
  }

  function folderSpan(ary) {
    return makeFolderSpan(ary[0], ary[1]);
  }

  function makeFolderSpans$1(folders, needsWorn) {
    return makeFolderSpan('0', 'All') +
      wornSelector(needsWorn) +
      makeFolderSpan('-1', 'Main') +
      Object.entries(folders).map(folderSpan).join('');
  }

  var itemTable;
  var itemsAry;
  var invItems;
  var folderId = 0;
  var perfBox;
  var itemGrid;

  function whichTableHasItems() {
    var allTables = getElementsByTagName(def_table, pCC.lastElementChild);
    if (calf.cmd === 'crafting') {
      return allTables[1];
    }
    return allTables[0];
  }

  function insertItem(item) {
    var itemDiv = createDiv();
    var aLink = item[0].parentNode;
    insertElement(itemDiv, aLink);
    insertElement(itemGrid, itemDiv);
  }

  function drawingNewItemTable() {
    if (!itemGrid) {
      itemGrid = createDiv({className: 'fshItemGrid'});
      itemsAry.forEach(insertItem);
      insertElementAfterBegin(itemTable.parentNode, itemGrid);
      hideElement(itemTable);
    }
  }

  function testFolder(item) {
    return folderId !== 0 && item[2] !== folderId;
  }

  function testCraft(item) {
    return perfBox.checked && item[3] !== 'Perfect';
  }

  function afn(item) {
    var myDiv = item[0].parentNode.parentNode;
    toggleForce(myDiv, testFolder(item) || testCraft(item));
  }

  function reDrawGrid() {
    drawingNewItemTable();
    itemsAry.forEach(afn);
  }

  function doHideFolders(evt) {
    if (!evt.target.classList.contains('fshFolder')) {return;}
    var evtFid = Number(evt.target.dataset.folder);
    if (evtFid !== folderId) {
      folderId = evtFid;
      reDrawGrid();
    }
  }

  function getFolderId(item) {
    if (item.equipped) {return -2;}
    return item.folder_id;
  }

  function addProps(item) {
    var invItem = invItems[item[1]];
    if (invItem) {
      item.push(getFolderId(invItem), invItem.craft);
    }
  }

  function enhanceWarehouse() {
    itemsAry.forEach(addProps);
  }

  function doFolderButtons(folders) {
    var inject = itemTable.parentNode.parentNode
      .previousElementSibling.children[0];
    inject.classList.add('fshCenter');
    on(inject, 'click', doHideFolders);
    insertHtmlBeforeEnd(inject, makeFolderSpans$1(folders, true));
    return inject;
  }

  function doPerfSwitch(inject) {
    if (calf.cmd === 'crafting') {
      perfBox = {checked: false};
      return;
    }
    var perfLabel = createLabel({
      className: 'fshVMid',
      innerHTML: '<span class="fshLink">Perfect</span> '
    });
    perfBox = createInput({
      className: 'fshVMid',
      type: 'checkbox'
    });
    on(perfBox, 'change', reDrawGrid);
    insertElement(perfLabel, perfBox);
    insertHtmlBeforeEnd(inject, ' &ensp;');
    insertElement(inject, perfLabel);
  }

  function inventory$1(data) {
    if (data.items && itemTable) {
      invItems = data.items;
      add(4, enhanceWarehouse);
      var inject = doFolderButtons(data.folders);
      doPerfSwitch(inject);
    }
  }

  function imgItemId(img) {
    var tipped = img.dataset.tipped;
    var matches = tipped.match(itemRE);
    return [img, matches[2]];
  }

  function getItems() {
    itemTable = whichTableHasItems();
    itemsAry = getArrayByTagName('img', itemTable).map(imgItemId);
  }

  function craftForge() {
    if (jQueryPresent()) {
      getInventoryById().then(inventory$1);
      add(3, getItems);
    }
  }

  function guildMembers(guildId) {
    return cmdExport({guild_id: guildId, subcmd: 'guild_members'});
  }

  function saveMembrListInForage(membrList, data) {
    var oldMemList = data || {};
    setForage('fsh_membrList', $.extend(oldMemList, membrList));
  }

  function addMembrListToForage(membrList) {
    getForage('fsh_membrList')
      .then(partial(saveMembrListInForage, membrList));
    return membrList;
  }

  function memberToObject(membrList, guildId, ele) {
    membrList[guildId][ele.username] = ele;
  }

  function membrListToHash(guildId, data) {
    var membrList = {};
    membrList[guildId] = {};
    membrList[guildId].lastUpdate = now;
    data.forEach(partial(memberToObject, membrList, guildId));
    return membrList;
  }

  function getGuildMembers(guildId) {
    return guildMembers(guildId).then(partial(membrListToHash, guildId));
  }

  function getAndCacheGuildMembers(guildId) {
    return getGuildMembers(guildId).then(addMembrListToForage);
  }

  var testList = [
    function(guildId, membrList) {return membrList;},
    function(guildId, membrList) {return isObject(membrList);},
    function(guildId, membrList) {return isObject(membrList[guildId]);},
    function(guildId, membrList) {
      return typeof membrList[guildId].lastUpdate === 'number';
    },
    function(guildId, membrList) {
      return membrList[guildId].lastUpdate > now - 300000;
    }
  ];

  function condition$4(guildId, membrList, e) {return e(guildId, membrList);}

  function isValid(guildId, membrList) {
    return testList.every(partial(condition$4, guildId, membrList));
  }

  function getMembrListFromForage(guildId, membrList) {
    if (isValid(guildId, membrList)) {
      return membrList;
    }
    return getAndCacheGuildMembers(guildId);
  }

  function guildMembers$1(force, guildId) {
    if (force) {
      return getAndCacheGuildMembers(guildId);
    }
    return getForage('fsh_membrList')
      .then(partial(getMembrListFromForage, guildId));
  }

  function setHelperMembrList(guildId, membrList) {
    calf.membrList = membrList[guildId];
    return calf.membrList;
  }

  function getMembrList(force) {
    var guildId = currentGuildId();
    if (guildId) {
      return guildMembers$1(force, guildId)
        .then(partial(setHelperMembrList, guildId));
    }
    return Promise.reject(new Error('no guild id'));
  }

  function replaceChild(newChild, oldChild) {
    if (newChild instanceof Node && oldChild instanceof Node) {
      oldChild.parentNode.replaceChild(newChild, oldChild);
    }
    return oldChild;
  }

  var advisorColumns = [
    {title: '<div class="fshBold">Member</div>'},
    {title: '<div class="fshBold">Lvl</div>', 'class': 'dt-center'},
    {title: '<div class="fshBold">Rank</div>', 'class': 'dt-center dt-nowrap'},
    {
      title: '<div class="fshBold">Gold From Deposits</div>',
      'class': 'dt-center'
    },
    {title: '<div class="fshBold">Gold From Tax</div>', 'class': 'dt-center'},
    {title: '<div class="fshBold">Gold Total</div>', 'class': 'dt-center'},
    {title: '<div class="fshBold">FSP</div>', 'class': 'dt-center'},
    {title: '<div class="fshBold">Skill Cast</div>', 'class': 'dt-center'},
    {title: '<div class="fshBold">Group Create</div>', 'class': 'dt-center'},
    {title: '<div class="fshBold">Group Join</div>', 'class': 'dt-center'},
    {title: '<div class="fshBold">Relic</div>', 'class': 'dt-center'},
    {title: '<div class="fshBold">XP Contrib</div>', 'class': 'dt-center'}
  ];

  function playerName$3(f, membrList) {
    if (!membrList[f]) {return f;}
    return '<a href="' + playerIdUrl + membrList[f].id + '">' + f + '</a>';
  }

  function playerLevel(f, membrList) {
    if (!membrList[f]) {return '';}
    return membrList[f].level;
  }

  function playerRank(f, membrList) {
    if (!membrList[f]) {return '';}
    return '<div class="fshAdvRank">' +
      membrList[f].rank_name.trim() + '</div>';
  }

  function doTable$1(tbl, data, callback) { // jQuery
    $(tbl).DataTable({
      autoWidth: false,
      columnDefs: [{
        targets: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        orderSequence: ['desc', 'asc']
      }],
      columns: advisorColumns,
      data: data,
      deferRender: true,
      initComplete: callback,
      lengthMenu: [[25, 50, -1], [25, 50, 'All']],
      pageLength: 25,
      stateDuration: 0,
      stateSave: true
    });
  }

  function switcheroo(div, targetElement) {
    add(3, partial(replaceChild, div, targetElement));
  }

  function injectTable(targetElement, tfoot, data) {
    var div = createDiv();
    var tbl = createTable({className: 'fshDataTable fshXSmall hover'});
    insertElement(div, tbl);
    insertElement(tbl, tfoot);
    add(3, doTable$1, [tbl, data, partial(switcheroo, div, targetElement)]);
    return div;
  }

  function returnAdvisorPage(list, e, response) {
    insertHtmlBeforeEnd(list.lastElementChild.lastElementChild,
      ' day ' + e + ',');
    return response.r;
  }

  function getAdvisorPage(list, e) { // jQuery.min
    return daAdvisor(e).then(partial(returnAdvisorPage, list, e));
  }

  function addElements(ary, v, i) {
    return v + ary[i];
  }

  function addAll(curr, el, i) {
    el.stats = el.stats.map(partial(addElements, curr[i].stats));
    return el;
  }

  function addStuff(prev, curr) {
    return prev.map(partial(addAll, curr));
  }

  function reorgStats(el) {
    return {
      player: el.player,
      stats: [el.stats[6], el.stats[7], el.stats[6] + el.stats[7], el.stats[1],
        el.stats[2], el.stats[3], el.stats[4], el.stats[8], el.stats[5]]
    };
  }

  function addUpStats(args) {
    return args.slice(1).reduce(addStuff, args[0]).map(reorgStats);
  }

  function makeTotal(prev, curr) {
    return curr.stats.map(partial(addElements, prev));
  }

  function footerStats(prev, curr) {
    return prev + '<td><u>' + curr + '</u></td>';
  }

  function makeTfoot(added) {
    var stats = added.slice(1).reduce(makeTotal, added[0].stats).map(addCommas);
    return createTFoot({
      innerHTML: '<tr><td class="fshRight" ' +
      'colspan="3">Total: </td>' +
      stats.reduce(footerStats, '') +
      '</tr>'
    });
  }

  function makeData(membrList, el) {
    var stats = el.stats.map(addCommas);
    return [
      playerName$3(el.player.name, membrList),
      playerLevel(el.player.name, membrList),
      playerRank(el.player.name, membrList)
    ].concat(stats);
  }

  function addAdvisorPages(list, [membrList, ...args]) {
    var added = addUpStats(args);
    injectTable(list,
      makeTfoot(added),
      added.map(partial(makeData, membrList))
    );
  }

  function injectAdvisorWeekly(list) { // jQuery

    time('guildAdvisor.injectAdvisorWeekly');

    list.innerHTML = '<span class="fshCurveContainer fshFlex">' +
      '<span class="fshCurveEle fshCurveLbl fshOldSpinner"></span>' +
      '<span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span>' +
      '</span>';

    var prm = [getMembrList(false)]
      .concat([1, 2, 3, 4, 5, 6, 7].map(partial(getAdvisorPage, list)));

    allthen(prm, partial(addAdvisorPages, list));

    timeEnd('guildAdvisor.injectAdvisorWeekly');

  }

  function getTfoot(list) {
    var totalRow = list.rows[list.rows.length - 1];
    var totalClone = totalRow.cloneNode(true);
    var tfoot = createTFoot();
    insertElement(tfoot, totalClone);
    var totalCell = totalClone.cells[0];
    totalCell.className = 'fshRight';
    totalCell.setAttribute('colspan', '3');
    return tfoot;
  }

  function cellText(cell, i) {
    if (i === 0) {
      return getTextTrim(cell);
    }
    return getText(cell);
  }

  function bodyText(membrList, row) {
    var foo = arrayFrom(row.cells, cellText);
    foo.splice(0, 1, playerName$3(foo[0], membrList),
      playerLevel(foo[0], membrList), playerRank(foo[0], membrList));
    return foo;
  }

  function getData(list, membrList) {
    return arrayFrom(list.rows).slice(1, -1)
      .map(partial(bodyText, membrList));
  }

  function summaryLink() {
    var updateInput = getElementsByClassName('custombutton', pCC);
    if (updateInput.length === 0) {return;}
    insertHtmlAfterEnd(updateInput[0], '<span> <a href="' + cmdUrl +
      'guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>');
  }

  function injectAdvisorDaily(list, membrList) {

    time('guildAdvisor.injectAdvisorDaily');

    var data = getData(list, membrList);
    var tfoot = getTfoot(list);
    injectTable(list, tfoot, data);
    summaryLink();

    timeEnd('guildAdvisor.injectAdvisorDaily');

  }

  function switcher(list) {
    if (calf.subcmd2 === 'weekly') {
      injectAdvisorWeekly(list);
    } else {
      getMembrList(false).then(partial(injectAdvisorDaily, list));
    }
  }

  function injectAdvisor() {
    if (jQueryNotPresent()) {return;}
    var list = getElementsByTagName('table', pCC)[1];
    if (!list) {return;}
    switcher(list);
  }

  var advisor = {
    '-': injectAdvisor,
    weekly: injectAdvisor
  };

  function addMercStat(mouseover, stat, i) {
    return stat +
      Math.round(Number(mercRE[i].exec(mouseover)[1]) * defenderMultiplier);
  }

  function addMercStats(prev, merc) {
    return prev.map(partial(addMercStat, merc.dataset.tipped));
  }

  function addAllMercStats(mercElements) {
    return mercElements.reduce(addMercStats, [0, 0, 0, 0, 0]);
  }

  function transform$1(mercTotal) {
    return {
      attack: mercTotal[0],
      defense: mercTotal[1],
      armor: mercTotal[2],
      damage: mercTotal[3],
      hp: mercTotal[4]
    };
  }

  function parseMercStats(html) {
    var doc = createDocument(html);
    var mercElements = querySelectorArray('#pCC img[src*="/merc/"]', doc);
    var mercTotal = addAllMercStats(mercElements);
    return transform$1(mercTotal);
  }

  function getMercStats() {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'mercs'
    }).then(parseMercStats);
  }

  var groupStats$1;

  function displayStat(el, groupStat, mercStat) {
    el.innerHTML = '<span class="fshBlue">' + addCommas(groupStat) + '</span>' +
      ' ( ' + addCommas(groupStat - mercStat) + ' )';
  }

  function parseMercStats$1(mercStats) {
    displayStat(groupStats$1.attackElement, groupStats$1.attack, mercStats.attack);
    displayStat(groupStats$1.defenseElement, groupStats$1.defense, mercStats.defense);
    displayStat(groupStats$1.armorElement, groupStats$1.armor, mercStats.armor);
    displayStat(groupStats$1.damageElement, groupStats$1.damage, mercStats.damage);
    displayStat(groupStats$1.hpElement, groupStats$1.hp, mercStats.hp);
  }

  function injectGroupStats() { // jQuery
    if (jQueryNotPresent()) {return;}
    groupStats$1 = groupViewStats(document);
    if (groupStats$1.attackElement) {
      getMercStats().then(parseMercStats$1);
    }
  }

  function batchUp(prev, curr, i) {
    var slot = Math.floor(i / 16);
    prev[slot] = fallback(prev[slot], []);
    prev[slot].push(curr);
    return prev;
  }

  function makeButtons(prev, curr, i) {
    var theNames = curr.join(',');
    var modifierWord = places[i];
    var li = createLi();
    var btn = createButton({
      className: 'fshBl fshBls tip-static',
      dataset: {tipped: 'Quick buff functionality from HCS only does 16'},
      textContent: 'Buff ' + modifierWord + ' 16'
    });
    on(btn, 'click', partial(openQuickBuffByName, theNames));
    insertElement(li, btn);
    insertElement(prev, li);
    return prev;
  }

  function doBuffLinks(members) {
    // quick buff only supports 16
    var shortList = members.reduce(batchUp, []).reduce(makeButtons, createUl());
    return shortList;
  }

  var xRE = /([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/;

  function dateFromUTC(x, curYear) {
    var groupDate = new Date();
    groupDate.setUTCDate(x[2]);
    groupDate.setUTCMonth(months.indexOf(x[3]));
    groupDate.setUTCFullYear(curYear);
    groupDate.setUTCHours(x[4]);
    groupDate.setUTCMinutes(x[5]);
    return groupDate;
  }

  function groupLocalTime(row) { // jQuery
    var theDateCell = $('td', row).eq(2);
    var x = xRE.exec(theDateCell.text());
    var curYear = new Date().getFullYear(); // TODO Boundary condition
    theDateCell.append('<br><span class="fshBlue fshXSmall">' +
      'Local: ' + dateFromUTC(x, curYear).toString().substr(0, 21) + '</span>');
  }

  function creatorDotAndLink(membrlist, row) {
    var creator = $('b', row).text();
    if (membrlist[creator]) {
      return onlineDot({last_login: membrlist[creator].last_login}) +
        '&nbsp;<a href="' + playerIdUrl + membrlist[creator].id +
        '"><b>' + creator + '</b></a> [' + membrlist[creator].level + ']';
    }
    return '<b>' + creator + '</b>';
  }

  function getCreatorCell(membrlist, row) {
    var creatorCell = $('td', row).first();
    creatorCell.html(creatorDotAndLink(membrlist, row));
    return creatorCell;
  }

  function memberLevel(membrlist, member) {
    if (membrlist[member]) {return membrlist[member].level;}
    return 0;
  }

  function byMemberLevel(membrlist, a, b) {
    return memberLevel(membrlist, b) - memberLevel(membrlist, a);
  }

  function profileLink(membrlist, name) {
    if (!membrlist[name]) {return name;}
    return '<a href="' + playerIdUrl + membrlist[name].id + '">' + name + '</a>';
  }

  function groupMembers(membrlist, membersCell) {
    var listArr = csvSplit(membersCell.html());
    if (listArr.length > 1) {listArr.sort(partial(byMemberLevel, membrlist));}
    return listArr;
  }

  function ourMembers(name) {
    return name !== '[none]' && name.indexOf('<font') === -1;
  }

  function buffLinks(creatorCell, listArr) {
    var buffList = listArr.filter(ourMembers);
    if (buffList.length > 0) {creatorCell.append(doBuffLinks(buffList));}
    creatorCell.append('<span class="fshXSmall">Members: ' +
      buffList.length + '</span>');
  }

  function memberProfileLinks(membrlist, membersCell, listArr) {
    var memberLinks = listArr.map(partial(profileLink, membrlist));
    membersCell.html('<span>' + memberLinks.join(', ') + '</span>');
  }

  function doGroupRow(membrlist, i, row) { // jQuery
    var creatorCell = getCreatorCell(membrlist, row);
    var membersCell = $('td', row).eq(1);
    var listArr = groupMembers(membrlist, membersCell);
    buffLinks(creatorCell, listArr);
    memberProfileLinks(membrlist, membersCell, listArr);
    groupLocalTime(row);
  }

  function doGroupPaint(m) { // jQuery

    time('groups.doGroupPaint');

    $('#pCC table table table tr').has('.group-action-container')
      .each(partial(doGroupRow, m));

    timeEnd('groups.doGroupPaint');

  }

  function addButton(target, val) {
    var theButton = createInput({
      className: 'custombutton',
      type: 'button',
      value: val
    });
    insertHtmlBeforeEnd(target, '&nbsp;');
    insertElement(target, theButton);
    return theButton;
  }

  function parseGroupStats(html) {
    var doc = createDocument(html);
    return groupViewStats(doc);
  }

  function getGroupStats(viewStats) {
    return retryAjax(viewStats).then(parseGroupStats);
  }

  function parseGroupData(linkElement, obj) {
    var extraText = '<table class="fshgrpstat">' +
      '<tr>' +
      '<td class="fshBrown">Attack</td>' +
      '<td class="fshRight">' + obj.attack + '</td>' +
      '<td class="fshBrown">Defense</td>' +
      '<td class="fshRight">' + obj.defense + '</td>' +
      '</tr><tr>' +
      '<td class="fshBrown">Armor</td>' +
      '<td class="fshRight">' + obj.armor + '</td>' +
      '<td class="fshBrown">Damage</td>' +
      '<td class="fshRight">' + obj.damage + '</td>' +
      '</tr><tr>' +
      '<td class="fshBrown">HP</td>' +
      '<td class="fshRight">' + obj.hp + '</td>' +
      '<td colspan="2"></td>' +
      '</tr></table>';
    var expiresLocation = linkElement.parentNode.parentNode
      .previousElementSibling;
    insertHtmlBeforeEnd(expiresLocation, extraText);
  }

  function thisLink(aLink) {
    getGroupStats(aLink.href).then(partial(parseGroupData, aLink));
  }

  function fetchGroupData(evt) {
    evt.target.disabled = true;
    querySelectorArray('#pCC a[href*="=viewstats&"]').forEach(thisLink);
  }

  function fetchGroupStatsButton(buttonRow) {
    var fetchStats = addButton(buttonRow, 'Fetch Group Stats');
    on(fetchStats, 'click', fetchGroupData);
  }

  var maxGroupSizeToJoin$1;

  function filterMercs(e) {return !e.includes('#000099');}

  function joined(container) {
    container.innerHTML = '<span class="fshXSmall fshBlue" ' +
      'style="line-height: 19px;">Joined</span>';
  }

  function joinGroup(groupID, container) { // jQuery.min
    indexAjaxData({
      cmd: 'guild',
      subcmd: 'groups',
      subcmd2: 'join',
      group_id: groupID
    }).then(partial(joined, container));
  }

  function doJoinUnderSize(joinButton) {
    var memList = joinButton.parentNode.parentNode.parentNode.cells[1];
    var memListArrayWithMercs = csvSplit(getText(memList));
    var memListArrayWithoutMercs = memListArrayWithMercs
      .filter(filterMercs);
    if (memListArrayWithoutMercs.length < maxGroupSizeToJoin$1) {
      var container = createDiv({
        className: 'group-action-link fshRelative',
        innerHTML: '<span class="fshSpinner fshSpinner12"></span>',
        style: {height: '19px', width: '19px'}
      });
      joinButton.parentNode.replaceChild(container, joinButton);
      var groupID = /confirmJoin\((\d+)\)/.exec(joinButton.href)[1];
      joinGroup(groupID, container);
    }
  }

  function joinAllGroupsUnderSize() {
    sendEvent('groups', 'joinAllGroupsUnderSize');
    querySelectorArray('#pCC a[href*="confirmJoin"]').forEach(doJoinUnderSize);
  }

  function joinUnderButton(buttonRow) {
    var joinUnder = addButton(buttonRow,
      'Join All Groups < ' + maxGroupSizeToJoin$1 + ' Members');
    on(joinUnder, 'click', joinAllGroupsUnderSize);
  }

  function groupButtons() {
    var joinAll = querySelector('#pCC input[value="Join All Available Groups"]');
    var buttonRow = joinAll.parentNode;
    var enableMaxGroupSizeToJoin = getValue('enableMaxGroupSizeToJoin');
    if (enableMaxGroupSizeToJoin) {
      maxGroupSizeToJoin$1 = getValue('maxGroupSizeToJoin');
      hideElement(joinAll);
      joinUnderButton(buttonRow);
    }

    fetchGroupStatsButton(buttonRow);

    if (calf.subcmd2 === def_joinallgroupsundersize) {
      joinAllGroupsUnderSize();
    }
  }

  function displayMinGroupLevel() { // jQuery
    var minGroupLevel = getValue('minGroupLevel');
    if (minGroupLevel) {
      $('#pCC > table > tbody > tr > td > table td').first()
        .append('<span style="color:blue"> ' +
        'Current Min Level Setting: ' + minGroupLevel + '</span>');
    }
  }

  function fixTable() { // jQuery
    // Cows don't add!
    var tds = $('#pCC td.header-dark');
    tds.eq(0).attr('width', '20%');
    tds.eq(1).attr('width', '51%');
    tds.eq(2).attr('width', '22%');
    tds.eq(3).attr('width', '7%');
  }

  function injectGroups() { // jQuery
    if (jQueryNotPresent()) {return;}
    getMembrList(false).then(doGroupPaint);
    displayMinGroupLevel();
    groupButtons();
    fixTable();
  }

  var groups = {
    viewstats: injectGroupStats,
    joinallgroupsundersize: injectGroups,
    joinall: injectGroups,
    '-': injectGroups
  };

  function translateReturnInfo(data) {
    var info = infoBoxFrom(data);
    var _r = {r: 1, m: info};
    if (info === 'Item was transferred to the guild store!') {
      _r = {r: 0, m: ''};
    }
    return _r;
  }

  function guildMailboxTake(href) {
    return retryAjax(href).then(translateReturnInfo).then(dialog);
  }

  function takeResult(self, data) {
    if (data.r === 0) {
      closestTable(self).nextElementSibling.rows[0].cells[0].innerHTML =
        '<span class="fshGreen">Taken</span>';
    }
  }

  function guildMailboxEvent(e) { // jQuery.min
    var self = e.target;
    if (self.tagName === 'IMG') {
      e.preventDefault();
      var anchor = self.parentNode.href;
      guildMailboxTake(anchor).then(partial(takeResult, self));
    }
    if (self.className === 'sendLink') {
      getArrayByTagName('img', pCC).forEach(clickThis);
    }
  }

  function guildMailbox() {
    if (jQueryNotPresent()) {return;}
    on(pCC, 'click', guildMailboxEvent);
    insertHtmlBeforeEnd(querySelector('#pCC td[height="25"]'),
      '<span class="sendLink">Take All</span>');
  }

  var warehouse = [];
  var prefValue;
  var headerIndex;

  function hideRow(el) {hideElement(el.row);}

  function collapseArt(article) {
    article.rows.forEach(hideRow);
    article.open = false;
  }

  function needsCollapse(article) {if (article.open) {collapseArt(article);}}

  function collapseAll() {warehouse.forEach(needsCollapse);}

  function show(el) {toggleForce(el.row, false);}

  function expandArt(article) {
    article.rows.forEach(show);
    article.open = true;
  }

  function needsExpand(article) {if (!article.open) {expandArt(article);}}

  function expandAll() {warehouse.forEach(needsExpand);}

  function isHeader(el) {if (el.rowIndex % headerIndex === 0) {return el;}}

  function closestTr(el) {
    if (el.tagName === 'TR') {
      return isHeader(el);
    }
    if (el.tagName === 'TABLE') {return;}
    return closestTr(el.parentNode);
  }

  function evtEnabled(evt) {
    var myRow = closestTr(evt.target);
    if (!myRow) {return;}
    var articleNo = myRow.rowIndex / headerIndex;
    var article = warehouse[articleNo];
    if (article.open === false) {
      collapseAll();
      expandArt(article);
    } else {
      collapseArt(article);
    }
  }

  function evtHdl(evt) {if (prefValue) {evtEnabled(evt);}}

  function makeHeaderClickable(row) {
    if (prefValue) {row.classList.add('fshPoint');}
  }

  function collapseDuringAnalysis(row, thisArticle) {
    if (prefValue) {
      hideElement(row);
      thisArticle.open = false;
    } else {
      thisArticle.open = true;
    }
  }

  function hasExtraFn(extraFn, row) {if (isFunction(extraFn)) {extraFn(row);}}

  function testRowType(row, rowType, thisArticle, param) {
    if (rowType === 0) {
      thisArticle.header = row;
      makeHeaderClickable(row);
      hasExtraFn(param.extraFn, row);
    }
    if (param.articleTest(rowType)) {
      thisArticle.rows[rowType] =
        fallback(thisArticle[rowType], {});
      thisArticle.rows[rowType].row = row;
      collapseDuringAnalysis(row, thisArticle);
    }
  }

  function doTagging(param, row) {
    var rowType = row.rowIndex % headerIndex;
    var articleNo = (row.rowIndex - rowType) / headerIndex;
    warehouse[articleNo] = fallback(warehouse[articleNo], {});
    var thisArticle = warehouse[articleNo];
    thisArticle.rows = thisArticle.rows || [];
    testRowType(row, rowType, thisArticle, param);
  }

  function togglePointer(article) {article.header.classList.toggle('fshPoint');}

  function toggleHeaderClass() {
    warehouse.forEach(togglePointer);
  }

  function togglePref$2(prefName) {
    prefValue = !prefValue;
    setValue(prefName, prefValue);
    if (prefValue) {collapseAll();} else {expandAll();}
    toggleHeaderClass();
  }

  function setupPref(prefName) {
    var prefEl = getElementById(prefName);
    prefValue = prefEl.checked;
    on(getElementById(prefName), 'change', partial(togglePref$2, prefName));
  }

  function collapse(param) {
    headerIndex = param.headInd;
    setupPref(param.prefName);
    arrayFrom(param.theTable.rows).forEach(partial(doTagging, param));
    on(param.theTable, 'click', evtHdl);
  }

  function testArticle(rowType) {return rowType === 1;}

  function setupPref$1(prefName, injector) {
    var flDiv = createDiv({
      className: 'fshHallPref',
      innerHTML: simpleCheckboxHtml(prefName)
    });
    injector.classList.add('fshRelative');
    insertElement(injector, flDiv);
  }

  function guildHall() {
    var prefName = 'collapseHallPosts';
    var theTable = pCC.lastElementChild;
    if (theTable instanceof HTMLTableElement) {
      setupPref$1(prefName, theTable.previousElementSibling.previousElementSibling);
      collapse({
        prefName: prefName,
        theTable: theTable,
        headInd: 3,
        articleTest: testArticle
      });
    }
  }

  var costFormatter = [
    [
      function(total) {return total.fsp > 0;},
      function(total) {
        return String(Math.round(total.fsp * 100) / 100) + ' FSP';
      }
    ],
    [
      function(total) {return total.fsp > 0 && total.k > 0;},
      function() {return ' and ';}
    ],
    [
      function(total) {return total.k > 0;},
      function(total) {return total.k + ' k';}
    ],
    [
      function(total) {
        return total.stam > 0 && (total.fsp > 0 || total.k > 0);
      },
      function() {return ' and ';}
    ],
    [
      function(total) {return total.stam > 0;},
      function(total) {
        return total.stam + ' Stam(' +
          String(Math.round(total.stam / 25 * 10) / 10) + 'fsp)';
      }
    ],
    [
      function(total) {return total.unknown > 0;},
      function(total) {
        return ' (' + total.unknown + ' buff(s) with unknown cost)';
      }
    ]
  ];

  function costElement(total, el) {
    if (el[0](total)) {
      return el[1](total);
    }
    return '';
  }

  function formatCost(total) {
    return costFormatter.map(partial(costElement, total)).join('');
  }

  function profileBuyBuffsEvent() {
    if (calf.subcmd === '-') {sendEvent('profile', 'formatBuffsToBuy');}
  }

  function getTargetPlayer() {
    var targetPlayer = getElementsByTagName('h1', pCC);
    if (targetPlayer.length !== 0) {
      targetPlayer = getText(targetPlayer[0]);
    } else {
      targetPlayer = playerName$1();
    }
    return targetPlayer;
  }

  var buyFormatter = [
    [
      function(greetingText) {return !greetingText.includes('{buffs}');},
      function(greetingText, buffsToBuy) {return greetingText + ' ' + buffsToBuy;}
    ],
    [
      function(greetingText) {return !greetingText.includes('{cost}');},
      function(greetingText, buffsToBuy) {
        return greetingText.replace(/{buffs}/g, '`~' + buffsToBuy + '~`');
      }
    ],
    [
      function() {return true;},
      function(greetingText, buffsToBuy, buffCost) {
        return greetingText
          .replace(/{buffs}/g, '`~' + buffsToBuy + '~`')
          .replace(/{cost}/g, buffCost.buffCostTotalText);
      }
    ]
  ];

  function formatToUse(greetingText, el) {return el[0](greetingText);}

  function formatGreetingText(greetingText, buffCost) {
    return buyFormatter.find(partial(formatToUse, greetingText))[1](
      greetingText, Object.keys(buffCost.buffs).join(', '), buffCost);
  }

  function formatBuffsToBuy(buffCost) { // Legacy
    profileBuyBuffsEvent();
    var targetPlayer = getTargetPlayer();
    var greetingText = getValue('buyBuffsGreeting').trim();
    greetingText = greetingText.replace(/{playername}/g, targetPlayer);
    greetingText = formatGreetingText(greetingText, buffCost);
    window.openQuickMsgDialog(targetPlayer, greetingText, '');
  }

  function getBuffsToBuy(buffCost) { // Legacy
    if (buffCost.count > 0) {formatBuffsToBuy(buffCost);}
  }

  var numRE = /[^a-zA-Z0-9.,+\- ]/g;
  var priceRE =
    /([+-]{0,1}[.\d]+ *k)|([+-]{0,1}[.\d]+ *fsp)|([+-]{0,1}[.\d]+ *stam)/;

  function thisLine(node) {
    return node && node.nodeName !== 'BR';
  }

  function formatPrice(text) {
    return toLowerCase(text.replace(numRE, '')).match(priceRE);
  }

  function priceAfterName(buffNameNode) {
    var text = '';
    var node = buffNameNode;
    // get the whole line from the buff name towards the end (even after
    // the ',', in case of 'AL, Lib, Mer: 10k each'
    while (thisLine(node)) {
      var newtext = getText(node);
      node = node.nextSibling; // Text Node
      text += newtext;
    }
    return formatPrice(text);
  }

  function priceBeforeName(buffNameNode) {
    var text = '';
    var node = buffNameNode;
    while (thisLine(node)) {
      var newtext = getText(node);
      node = node.previousSibling; // Text Node
      text = newtext + text;
    }
    return formatPrice(text);
  }

  function getPrice(buffNameNode) {
    var price = priceAfterName(buffNameNode);
    if (!price) { // some players have prices BEFORE the buff names
      price = priceBeforeName(buffNameNode);
    }
    return price;
  }

  var buffCost = {count: 0, buffs: {}};

  function buffRows(pair) {
    return '<tr><td>' + pair[0] + '</td><td>: ' + pair[1][0] +
      pair[1][1] + '</td></tr>';
  }

  function totalCost(prev, pair) {
    prev[pair[1][1]] += pair[1][0];
    return prev;
  }

  function hazBuffs() {
    var myEntries = Object.entries(buffCost.buffs);
    var totalText = formatCost(myEntries.reduce(totalCost,
      {k: 0, fsp: 0, stam: 0, unknown: 0}));
    getElementById('buffCost').innerHTML = '<span class="tip-static" ' +
      'data-tipped="This is an estimated cost based on how the script finds ' +
      'the cost associated with buffs from viewing bio. It can be incorrect, ' +
      'please use with discretion.<br><hr><table border=0>' +
      myEntries.map(buffRows).join('') + '</table><b>Total: ' + totalText +
      '</b>">Estimated Cost: <b>' + totalText + '</b></span>';
    buffCost.buffCostTotalText = totalText;
  }

  function updateBuffCost() { // Legacy
    if (buffCost.count > 0) {
      hazBuffs();
    } else {
      getElementById('buffCost').innerHTML = '&nbsp;';
      buffCost.buffCostTotalText = '';
    }
  }

  function priceUnit(price) {
    if (price[0].includes('k')) {
      return 'k';
    }
    if (price[0].includes('f')) {
      return 'fsp';
    }
    return 'stam';
  }

  function getBuffCost(buffNameNode) {
    var price = getPrice(buffNameNode);
    var type;
    var cost;
    if (price) {
      type = priceUnit(price);
      cost = price[0].match(/([+-]?[.\d]+)/)[0];
    } else {
      type = 'unknown';
      cost = '1';
    }
    buffCost.buffs[getText(buffNameNode)] = [parseFloat(cost), type];
    buffCost.count += 1;
  }

  function toggleBuffsToBuy(buffNameNode) { // Legacy
    var selected = buffNameNode.classList.contains('fshBlue');
    buffNameNode.classList.toggle('fshBlue');
    buffNameNode.classList.toggle('fshYellow');
    var buffName = getText(buffNameNode);
    if (selected) {
      getBuffCost(buffNameNode);
    } else {
      buffCost.count -= 1;
      delete buffCost.buffs[buffName];
    }
    updateBuffCost();
  }

  function closestSpan(el) {
    if (!el.tagName || el.tagName === 'SPAN') {return el;}
    return closestSpan(el.parentNode);
  }

  function isBuffLink(buffNameNode) {
    return buffNameNode.classList &&
      buffNameNode.classList.contains('buffLink');
  }

  function bioEvtHdl(e) {
    // This is also called by bio preview
    if (e.target.id === 'fshSendBuffMsg') {
      getBuffsToBuy(buffCost);
      return;
    }
    var buffNameNode = closestSpan(e.target);
    if (isBuffLink(buffNameNode)) {
      toggleBuffsToBuy(buffNameNode);
    }
  }

  function insertTextBeforeEnd(parent, text) {
    insertHtmlBeforeEnd(parent, text);
  }

  function buffToggles(prev, buff, i) {
    return prev.replace(buff, '<span id="fshBuff' + i +
      '" class="buffLink fshBlue">' +
      buff.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '') + '</span>');
  }

  function renderBio(_bioContents) {
    var bioContents = _bioContents.replace(/\{b\}/g, '`~')
      .replace(/\{\/b\}/g, '~`');
    var buffs = bioContents.match(/`~([^~]|~(?!`))*~`/g);
    if (!buffs) {return _bioContents;}
    bioContents = buffs.reduce(buffToggles, bioContents);
    if (bioContents.indexOf('[cmd]') < 0) {bioContents += '[cmd]';}
    bioContents = bioContents.replace('[cmd]',
      '<br><input id="fshSendBuffMsg" ' +
      'class="custombutton" type="button" value="Ask For Buffs"><br>' +
      '<span id="buffCost" class="fshRed">&nbsp;</span>');
    return bioContents;
  }

  function theValueIsValid(theValue, min, max) {
    return !isNaN(theValue) && theValue > min && theValue < max;
  }

  function testRange(aValue, min, max) {
    var theValue = parseInt(aValue, 10);
    if (theValueIsValid(theValue, min, max)) {
      return theValue;
    }
  }

  function testQuant(aValue) {
    return testRange(aValue, 0, 100);
  }

  var bioEditLines$1;
  var textArea$1;
  var previewArea;
  var theBox;

  var basicTagReplacements = [
    [/</g, '&lt'],
    [/>/g, '&gt'],
    [/\n/g, '<br>'],
    [/\[(\/?[biu])\]/g, '<$1>'],
    [/\\\\/g, '&#92'],
    [/\\/g, '']
  ];

  var guildTagReplacements = [
    [/\[(\/?block)\]/g, '<$1quote>'],
    [/\[list\]/g, '<ul class="list">'],
    [/\[\/list\]/g, '</ul>'],
    [/\[\*\](.*?)<br>/g, '<li>$1</li>']
  ];

  function replaceTag(prev, re) {return prev.replace(re[0], re[1]);}

  function replaceTags(inputText, ary) {return ary.reduce(replaceTag, inputText);}

  function convertTextToHtml(inputText) {
    var ret = replaceTags(inputText, basicTagReplacements);
    if (calf.cmd === 'guild') {
      ret = replaceTags(ret, guildTagReplacements);
    }
    return ret;
  }

  function bioPreview() {
    var widthClass = 'fshBioProfile';
    if (calf.cmd === 'guild') {
      if (calf.subcmd === 'hall') {widthClass = 'fshBioHall';} else {
        widthClass = 'fshBioGuild';
      }
    }
    var previewContainer = createDiv({
      className:
        'fshBioContainer ' + widthClass
    });
    var previewHeader = createDiv({
      className: 'fshBioHeader fshBioInner',
      innerHTML: 'Preview'
    });
    insertElement(previewContainer, previewHeader);
    previewArea = createDiv({className: 'fshBioPreview fshBioInner'});
    insertElement(previewContainer, previewArea);
    insertElement(textArea$1.parentNode, previewContainer);
  }

  function bioWords() {
    if (calf.cmd === 'profile') {
      // Add description text for the new tags
      insertHtmlBeforeEnd(pCC, '<div>' +
        '`~This will allow FSH Script users to select buffs from your bio~`<br>' +
        'You can use the [cmd] tag as well to determine where to put the "Ask ' +
        'For Buffs" button<br><br><blockquote><ul class="list">' +
        '<li>Note 1: The ` and ~ characters are on the same key on US QWERTY ' +
        'keyboards. ` is <b>NOT</b> an apostrophe.</li>' +
        '<li>Note 2: Inner text will not contain special characters ' +
        '(non-alphanumeric).</li>' +
        '<li>P.S. Be creative with these! Wrap your buff pack names in ' +
        'them to make buffing even easier!</li>' +
        '</ul></blockquote></div>');
    }
  }

  function changeHeight() {
    var boxVal = testQuant(theBox.value);
    if (boxVal) {
      bioEditLines$1 = boxVal;
      setValue('bioEditLines', boxVal);
      textArea$1.rows = bioEditLines$1;
    }
  }

  function bioHeight() {
    var bioEditLinesDiv = createDiv({innerHTML: '<br>Display '});
    theBox = createInput({min: 1, max: 99, type: 'number', value: bioEditLines$1});
    insertElement(bioEditLinesDiv, theBox);
    insertTextBeforeEnd(bioEditLinesDiv, ' Lines ');
    var saveLines = createInput({
      className: 'custombutton',
      value: 'Update Rows To Show',
      type: 'button'
    });
    on(saveLines, 'click', changeHeight);
    insertElement(bioEditLinesDiv, saveLines);
    insertElement(pCC, bioEditLinesDiv);
  }

  function updateBioCharacters() {
    var bioContents = convertTextToHtml(textArea$1.value);
    bioContents = renderBio(bioContents);
    previewArea.innerHTML = bioContents;
  }

  function injectBioWidgets() {
    bioEditLines$1 = getValue('bioEditLines');
    textArea$1 = getElementById('textInputBox');
    if (!textArea$1) {return;}
    bioPreview();
    bioWords();
    bioHeight();
    textArea$1.rows = bioEditLines$1;
    if (calf.cmd === 'profile') {
      on(textArea$1.parentNode, 'click', bioEvtHdl);
    }
    on(textArea$1, 'keyup', updateBioCharacters);
    // Force the preview area to render
    updateBioCharacters();
  }

  var hall = {
    '-': guildHall,
    post: injectBioWidgets
  };

  var ACTIVE = 0;
  var STAMINA = 1;

  function countActive(prev, curr) {
    var lastActivity = lastActivityRE.exec(curr.dataset.tipped);
    var mins = lastActivityMins({
      min: lastActivity[3],
      hour: lastActivity[2],
      day: lastActivity[1]
    });
    if (mins < 44640) {
      prev[ACTIVE] += 1;
      prev[STAMINA] +=
        Number(/Stamina:<\/td><td>(\d+)/.exec(curr.dataset.tipped)[1]);
    }
    return prev;
  }

  function getActive(dots) {
    return dots.reduce(countActive, [0, 0]);
  }

  function activeMembers() {
    var members = getArrayByTagName('b', pCC).find(contains('Members'));
    if (members) {
      var dots = querySelectorArray('#pCC a[data-tipped*="Last Activity"]');
      var memberStats = getActive(dots);
      members.classList.add('tip-static');
      members.dataset.tipped = 'Active: ' + memberStats[ACTIVE] + '/' +
        dots.length + '<br>' +
        'Stamina: ' + addCommas(memberStats[STAMINA]);
    }
  }

  function moreToDo(limit, cntr, list) {
    return list && performance.now() < limit && cntr < list.length;
  }

  function maybeEndFn(priority, endFn) {
    if (isFunction(endFn)) {add(priority, endFn);}
  }

  function batch(priority, itemsAry, counter, doFn, endFn) {
    var limit = performance.now() + 5;
    var localCounter = counter;
    while (moreToDo(limit, localCounter, itemsAry)) {
      doFn(itemsAry[localCounter], localCounter, itemsAry);
      localCounter += 1;
    }
    if (localCounter < itemsAry.length) {
      add(priority, batch, [priority, itemsAry, localCounter, doFn, endFn]);
    } else {
      maybeEndFn(priority, endFn);
    }
  }

  function changeOnlineDot(contactLink) {
    var lastActivity = lastActivityRE.exec(contactLink.dataset.tipped);
    contactLink.parentNode.previousElementSibling.innerHTML =
      onlineDot({
        min: lastActivity[3],
        hour: lastActivity[2],
        day: lastActivity[1]
      });
  }

  function colouredDots() {
    if (!getValue('enhanceOnlineDots')) {return;}
    batch(3, querySelectorAll('#pCC a[data-tipped*="Last Activity"]'), 0,
      changeOnlineDot);
  }

  function injectToggle(fshCompressor) {
    var toggle = insertElement(fshCompressor,
      createInput({id: 'fshCompressToggle', type: 'checkbox'}));
    on(toggle, 'change', partial(sendEvent, 'bio', 'toggle'));
  }

  function hideBlock(bioCell, fshCompressor) {
    var fshCompress = insertElement(fshCompressor,
      createDiv({className: 'fshCompress'}));
    fshCompress.innerHTML = bioCell.innerHTML;
    bioCell.innerHTML = '';
  }

  function doCompression(bioCell) {
    var fshCompressor = createDiv({className: 'fshCompressor'});
    injectToggle(fshCompressor);
    insertElement(fshCompressor,
      createLabel({className: 'sendLink', htmlFor: 'fshCompressToggle'}));
    hideBlock(bioCell, fshCompressor);
    insertElement(bioCell, fshCompressor);
  }

  function getFontSize(bioCell) {
    var computedStyle = getComputedStyle(bioCell);
    return parseInt(computedStyle.getPropertyValue('font-size'), 10);
  }

  function compressBio(bioCell) {
    if (bioCell.clientHeight / getFontSize(bioCell) > 10) {
      doCompression(bioCell);
    }
  }

  function compressHistory() {
    compressBio(
      getArrayByTagName(def_table, pCC).slice(-2, -1)[0].rows[0].cells[0]
    );
  }

  var highlightPlayersNearMyLvl$2;
  var highlightGvGPlayersNearMyLvl$1;

  function isPvpTarget(vlevel) {
    return highlightPlayersNearMyLvl$2 &&
      vlevel >= pvpLowerLevel &&
      vlevel <= pvpUpperLevel;
  }

  function isGvgTarget(vlevel) {
    return highlightGvGPlayersNearMyLvl$1 &&
      vlevel >= gvgLowerLevel &&
      vlevel <= gvgUpperLevel;
  }

  function isActive(el, tipped) {
    var vlevel = Number(/VL:.+?(\d+)/.exec(tipped)[1]);
    var aRow = el.parentNode.parentNode;
    if (isPvpTarget(vlevel)) {
      aRow.classList.add('lvlHighlight');
    } else if (isGvgTarget(vlevel)) {
      aRow.classList.add('lvlGvGHighlight');
    }
  }

  function highlightMembers(el) {
    var tipped = el.dataset.tipped;
    var lastActDays = lastActivityRE.exec(tipped)[1];
    if (lastActDays < 7) {isActive(el, tipped);}
  }

  function shouldHighlight() {
    return Number(getUrlParameter('guild_id')) !== currentGuildId() &&
      (highlightPlayersNearMyLvl$2 || highlightGvGPlayersNearMyLvl$1);
  }

  function doHighlights() {
    if (shouldHighlight()) {
      calculateBoundaries();
      querySelectorArray('#pCC a[data-tipped*="<td>VL:</td>"]')
        .forEach(highlightMembers);
    }
  }

  function injectViewGuild() {
    highlightPlayersNearMyLvl$2 = getValue('highlightPlayersNearMyLvl');
    highlightGvGPlayersNearMyLvl$1 = getValue('highlightGvGPlayersNearMyLvl');
    doHighlights();
    if (getValue('enableHistoryCompressor')) {compressHistory();}
  }

  function insertBuffLink(el) {
    insertHtmlBeforeEnd(el.parentNode, ' <span class="smallLink">[b]</span>');
  }

  function openQuickBuff(evt) {
    if (evt.target.className !== 'smallLink') {return;}
    openQuickBuffByName(evt.target.previousElementSibling.text);
  }

  function buffLinks$1() {
    // TODO preference
    var members = querySelectorAll('#pCC a[href^="' + playerIdUrl + '"]');
    batch(3, members, 0, insertBuffLink);
    on(pCC, 'click', openQuickBuff);
  }

  function conflicts(page) {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'conflicts',
      page: page
    });
  }

  function makeCell(newRow, html) {
    newRow.insertCell(-1).innerHTML = html;
  }

  function buildRow(insertHere, html1, html2) {
    var newRow = insertHere.insertRow(insertHere.rows.length - 2);
    makeCell(newRow, html1);
    makeCell(newRow, html2);
  }

  function conflictHeader(insertHere) {
    buildRow(insertHere, '<a href="' + guildSubcmdUrl +
      'conflicts">Active Conflicts</a>', 'Score');
  }

  function conflictRow(insertHere, aRow) {
    buildRow(insertHere,
      aRow.cells[0].innerHTML, '<b>' + aRow.cells[6].innerHTML + '</b>');
  }

  function hazConflict(conflictTable, curPage, insertHere) { // Legacy
    if (curPage === 1) {
      conflictHeader(insertHere);
    }
    arrayFrom(conflictTable.rows).filter(dataRows(7, 0))
      .forEach(partial(conflictRow, insertHere));
  }

  function activeConflicts(doc, curPage, insertHere) { // Legacy
    var conflictTable = querySelector(
      '#pCC > table > tbody > tr > td > table', doc);
    if (conflictTable && conflictTable.rows.length > 3) {
      hazConflict(conflictTable, curPage, insertHere);
    }
  }

  function getMaxPage$1(page) {
    return Number(page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1]);
  }

  function getNextPage(curPage, fn, callback) {
    conflicts(curPage + 1).then(partial(fn, callback));
  }

  function gotConflictInfo(callback, responseText) { // Legacy
    var doc = createDocument(responseText);
    var page = querySelector('#pCC input[name="page"]', doc);
    if (!page) {return;}
    var curPage = Number(page.value);
    var maxPage = getMaxPage$1(page);
    activeConflicts(doc, curPage, callback.node);
    if (maxPage > curPage) {
      getNextPage(curPage, gotConflictInfo, callback);
    }
  }

  function conflictInfo(leftHandSideColumnTable) { // jQuery.min
    var statCtrl = leftHandSideColumnTable.rows[6].cells[0].children[0];
    if (statCtrl) {
      conflicts(1).then(partial(gotConflictInfo, {node: statCtrl}));
    }
  }

  function togglePref$3(evt) {
    if (evt.target.id === 'enableGuildActivityTracker') {
      setValue('enableGuildActivityTracker',
        !getValue('enableGuildActivityTracker'));
    }
  }

  function injectShowTracker() {
    var gs = querySelector('#pCC img.guild_openGuildStore');
    var td = gs.parentNode;
    var container = createDiv({className: 'fsh-tracker'});
    var myDiv = createDiv({
      innerHTML: simpleCheckboxHtml('enableGuildActivityTracker') +
      '&nbsp;<label class="custombutton" for="tracker">Show</label>'
    });
    on(myDiv, 'change', togglePref$3);
    insertElement(container, gs);
    insertElement(container, myDiv);
    insertElementAfterBegin(td, container);
  }

  function formatDateTime(dateParts) {
    return dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2] + ' ' +
      dateParts[3] + ':' + dateParts[4] + ':' + dateParts[5];
  }

  function isDate(aDate) {
    return Object.prototype.toString.call(aDate) === '[object Date]' &&
      !isNaN(aDate.getTime());
  }

  function localDatePartsPadded(aDate) {
    return [
      aDate.getMonth() + 1,
      aDate.getDate(),
      aDate.getHours(),
      aDate.getMinutes(),
      aDate.getSeconds()
    ].map(padZ);
  }

  function localDateParts(aDate) {
    return [aDate.getFullYear().toString()].concat(localDatePartsPadded(aDate));
  }

  function formatLocalDateTime(aDate) {
    if (isDate(aDate)) {
      return formatDateTime(localDateParts(aDate));
    }
  }

  var actBody;
  var selMember;
  var tgCont;
  var memberSelect;
  var myMembers;

  function addOption(prev, member) {
    return prev + '<option value="' + member + '">' + member + '</option>';
  }

  function buildOptions(ourMembers) {
    return '<select name="member">' +
      '<option value="- All -" selected>- All -</option>' +
      Object.keys(ourMembers).sort(alpha).reduce(addOption, '') + '</select>';
  }

  function toText(val) {
    if (isUndefined(val)) {return '#DEF';}
    return val.toLocaleString();
  }

  function memberFilter(memberKey) {
    return selMember && selMember !== '- All -' && selMember !== memberKey;
  }

  function aMembersActivityRows(memberKey, inside, activity) {
    return inside + '<tr>' +
      '<td>' +
      formatLocalDateTime(new Date(activity[utc] * 1000)) +
      '</td>' +
      '<td>' + memberKey + '</td>' +
      '<td class="fshRight">' + toText(activity[lvl]) + '</td>' +
      '<td class="fshRight">' + toText(activity[vl]) + '</td>' +
      '<td class="fshRight">' + toText(activity[cur]) + '</td>' +
      '<td class="fshRight">' + toText(activity[max]) + '</td>' +
      '<td class="fshRight">' +
        Math.floor(activity[cur] / activity[max] * 100) +
      '</td>' +
      '<td class="fshRight">' + activity[act] + '</td>' +
      '<td class="fshRight">' + toText(activity[gxp]) + '</td>' +
      '</tr>';
  }

  function selectedMember(outside, memberKey) {
    if (memberFilter(memberKey)) {return outside;}
    return outside +
      myMembers[memberKey].reduce(partial(aMembersActivityRows, memberKey), '');
  }

  function memberRows() {
    return Object.keys(myMembers).reduce(selectedMember, '');
  }

  function drawRows() {
    if (myMembers) {actBody.innerHTML = memberRows();}
    tgCont.classList.remove('fshSpinner');
  }

  function queueDrawRows() {
    tgCont.classList.add('fshSpinner');
    add(3, drawRows);
  }

  function myChange(e) {
    selMember = e.target.value;
    queueDrawRows();
  }

  function initTable(theMembers) {
    if (theMembers) {
      myMembers = theMembers;
      memberSelect.innerHTML = buildOptions(theMembers);
      queueDrawRows();
    }
  }

  function makeMemberHeader() {
    var memberHead = createTh({textContent: 'Member'});
    memberSelect = createDiv();
    insertElement(memberHead, memberSelect);
    return memberHead;
  }

  function headerRow(tg) {
    var hrow = tg.createTHead().insertRow(-1);
    insertHtmlBeforeEnd(hrow, '<th>Date</th>');
    var memberHead = makeMemberHeader();
    insertElement(hrow, memberHead);
    insertHtmlBeforeEnd(hrow, '<th>Level</th><th>VL</th>' +
      '<th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th>' +
      '<th>Last<br>Activity<br>(Days)</th><th>GXP</th>');
  }

  function makeActBody(tg) {
    actBody = createTBody();
    insertElement(tg, actBody);
  }

  function makeTg() {
    var tg = createTable({id: 'tg'});
    headerRow(tg);
    makeActBody(tg);
    on(tg, 'change', myChange);
    tgCont = createDiv({className: 'tgCont fshSpinner64'});
    insertElement(tgCont, tg);
    return tgCont;
  }

  var ioText;
  var saveBtn;
  var resetBtn;
  var io;

  function drawRawData(trackerData) {
    ioText.value = trackerData;
    io.classList.remove('fshSpinner');
  }

  function queueRawData(trackerData) {
    if (trackerData) {
      io.classList.add('fshSpinner');
      add(4, drawRawData, [trackerData]);
    }
  }

  function doReset() {
    ioText.value = '{"lastUpdate": 0, "members": {}}';
  }

  function successMsg(newData) {
    dialogMsg('Update successful');
    initTable(newData.members);
  }

  function doSave() {
    var newData = jsonParse(ioText.value);
    setForage('fsh_guildActivity', newData)
      .then(partial(successMsg, newData))
      .catch(dialogMsg);
  }

  function customButton(text, fn) {
    var btn = createButton({
      className: 'custombutton',
      textContent: text
    });
    on(btn, 'click', fn);
    return btn;
  }

  function makeIoText() {
    ioText = createTextArea();
    ioText.setAttribute('autocapitalize', 'off');
    ioText.setAttribute('autocomplete', 'off');
    ioText.setAttribute('autocorrect', 'off');
    ioText.setAttribute('spellcheck', 'false');
  }

  function makeInOut() {
    io = createDiv({id: 'io', className: 'fshSpinner64'});
    makeIoText();
    saveBtn = customButton('Save', doSave);
    resetBtn = customButton('Reset', doReset);
    insertElement(io, ioText);
    insertElement(io, createBr());
    insertElement(io, saveBtn);
    insertElement(io, resetBtn);
    return io;
  }

  var trackerData;
  var tracker;
  var trDialog;
  var acttab2;

  function isClosed() {
    return !tracker.checked;
  }

  function isOpen() {
    return tracker.checked;
  }

  function closeDialog() {
    tracker.checked = false;
  }

  function keydownHandler(evt) {
    if (isOpen() && evt.code === 'Escape') {
      closeDialog();
    }
  }

  function maybeClose(ret) {
    if (isClosed()) {ret.style.transform = null;}
  }

  function makeDragHandle() {
    return createUl({
      className: 'fshMove ui-tabs-nav ui-widget-header ui-corner-all ' +
        'ui-helper-reset ui-helper-clearfix',
      innerHTML: '<li class="ui-state-default ui-corner-top">' +
        '<label class="fsh-tab-label" for="acttab1">' +
        'Guild Activity Tracker</label></li>' +
        '<li class="ui-state-default ui-corner-top">' +
        '<label class="fsh-tab-label" for="acttab2">Import/Export</label></li>' +
        '<label for="tracker" class="fsh-dialog-close ' +
        'ui-dialog-titlebar-close">&times;</label>'
    });
  }

  function updateRawData() {
    sendEvent('guildTracker', 'updateRawData');
    if (trackerData) {queueRawData(trackerData);}
  }

  function makeInnerPopup() {
    var dialogPopup = createDiv({
      className: 'fsh-dialog-popup ' +
        'ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all',
      innerHTML: '<input id="acttab1" class="fsh-tab-open" ' +
        'name="acttabs" checked type="radio">'
    });
    acttab2 = createInput({
      className: 'fsh-tab-open',
      id: 'acttab2',
      name: 'acttabs',
      type: 'radio'
    });
    once(acttab2, 'change', updateRawData);
    insertElement(dialogPopup, acttab2);
    return dialogPopup;
  }

  function makeRet() {
    var ret = makeInnerPopup();
    var hdl = makeDragHandle();
    insertElement(ret, hdl);
    draggable(hdl, ret);
    return ret;
  }

  function makeContainer() {
    var container = createDiv({className: 'fsh-dialog-content'});
    insertElement(container, makeTg());
    insertElement(container, makeInOut());
    return container;
  }

  function makePopup() {
    var ret = makeRet();
    var container = makeContainer();
    insertElement(ret, container);
    on(tracker, 'change', partial(maybeClose, ret));
    insertElement(trDialog, ret);
  }

  function addOverlay() {
    insertHtmlBeforeEnd(trDialog,
      '<div class="fsh-dialog-overlay">' +
      '<label class="fsh-dialog-cancel" for="tracker"></label>' +
      '</div>');
  }

  function gotActivity$1(data) {
    if (data) {
      trackerData = JSON.stringify(data);
      initTable(data.members);
    }
  }

  function openDialog$2() {
    sendEvent('guildTracker', 'openDialog');
    getForage('fsh_guildActivity').then(gotActivity$1);
    calf.dialogIsClosed = isClosed;
    addOverlay();
    makePopup();
  }

  function injectTracker() {
    tracker = createInput({
      id: 'tracker',
      className: 'fsh-dialog-open',
      type: 'checkbox'
    });
    once(tracker, 'change', openDialog$2);
    trDialog = createDiv({className: 'fsh-dialog'});
    insertElement(trDialog, tracker);
    on(document.body, 'keydown', keydownHandler);
    insertElement(document.body, trDialog);
  }

  function guildTracker() {
    injectShowTracker();
    injectTracker();
  }

  function makeDialog(name) {
    const thisContainer = createDiv({className: 'fshDialog'});
    const thisInput = createInput({id: name, type: 'checkbox'});
    insertElement(thisContainer, thisInput);
    const thisOverlay = createDiv({className: 'ui-widget-overlay'});
    const thisLabel = createLabel({htmlFor: name});
    insertElement(thisOverlay, thisLabel);
    insertElement(thisContainer, thisOverlay);
    const thisPopup = createDiv(
      {className: 'ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all'});
    publish(name + '-popup', thisPopup);
    insertElement(thisContainer, thisPopup);
    insertElement(document.body, thisContainer);
  }

  function fshModalDialog(name) {
    const thisInput = getElementById(name);
    if (thisInput) {thisInput.checked = true;} else {
      makeDialog(name);
    }
  }

  function injectTabSet(name, tabs, thisPopup) {
    fshTabSet(thisPopup, tabs, name + '-tab');
  }

  function fshTabbedModal(name, tabs) {
    subscribeOnce(name + '-popup', partial(injectTabSet, name, tabs));
    // subscribeOnce('qwtab-header', makePref);
    fshModalDialog(name);
  }

  var actBody$1;
  var tgCont$1;
  var memberSelect$1;

  function makeMemberHeader$1() {
    var memberHead = createTh({textContent: 'Member'});
    memberSelect$1 = createDiv();
    insertElement(memberHead, memberSelect$1);
    return memberHead;
  }

  function headerRow$1(tg) {
    var hrow = tg.createTHead().insertRow(-1);
    insertHtmlBeforeEnd(hrow, '<th>Date</th>');
    var memberHead = makeMemberHeader$1();
    insertElement(hrow, memberHead);
    insertHtmlBeforeEnd(hrow, '<th>Level</th><th>VL</th>' +
      '<th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th>' +
      '<th>Last<br>Activity<br>(Days)</th><th>GXP</th>');
  }

  function makeActBody$1(tg) {
    actBody$1 = createTBody();
    insertElement(tg, actBody$1);
  }

  function makeTg$1() {
    var tg = createTable({id: 'tg'});
    headerRow$1(tg);
    makeActBody$1(tg);
    // on(tg, 'change', myChange);
    tgCont$1 = createDiv({className: 'tgCont fshSpinner fshSpinner64'});
    insertElement(tgCont$1, tg);
    return tgCont$1;
  }

  function togglePref$4(evt) {
    if (evt.target.id === def_enableGuildActivityTracker) {
      setValue(def_enableGuildActivityTracker,
        !getValue(def_enableGuildActivityTracker));
    }
  }

  function injectContent$1(thisFn, thisDiv) {
    insertElement(thisDiv, thisFn());
  }

  function showDialog() {
    subscribeOnce('tracker-tab0', partial(injectContent$1, makeTg$1));
    // subscribeOnce('tracker-tab1', partial(injectContent, showAHInvManager, appInv));
    fshTabbedModal('tracker', ['Guild Activity Tracker', 'Import/Export']);
  }

  function injectShowTracker$1() {
    var gs = querySelector('#pCC img.guild_openGuildStore');
    var td = gs.parentNode;
    var container = createDiv({className: 'fsh-tracker'});
    var myDiv = createDiv({
      innerHTML: simpleCheckboxHtml(def_enableGuildActivityTracker) +
        '&nbsp;'
    });
    on(myDiv, 'change', togglePref$4);
    var showTrackerDialog = createLabel({
      className: 'custombutton',
      htmlFor: 'tracker',
      textContent: 'Show'
    });
    once(showTrackerDialog, 'click', showDialog);
    insertElement(myDiv, showTrackerDialog);
    insertElement(container, gs);
    insertElement(container, myDiv);
    insertElementAfterBegin(td, container);
  }

  function guildTrackerV2() {
    injectShowTracker$1();
  }

  const pref_enableStamBars = 'enableStamBars';
  let enableStamBars$2;
  let thisStyle;

  function getStamPerc(a) {
    const mo = a.dataset.tipped.match(/(\d+) \/ (\d+)/);
    return Math.min(Math.round(Number(mo[1]) / Number(mo[2]) * 100), 100);
  }

  function stamBarStyle(a) {
    const perc = getStamPerc(a);
    return '#fshMemberList ' +
      `tr:nth-child(${a.parentNode.parentNode.rowIndex + 1}) {` +
      `background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${perc}%, ` +
      `transparent ${perc + 1}%)}`;
  }

  function injectStyle() {
    const tables = getElementsByTagName(def_table, pCC);
    const memberList = tables[tables.length - 1];
    memberList.id = 'fshMemberList';
    const memberLinks = querySelectorArray('a[href*="&player_id="]', memberList);
    const myTest = memberLinks.map(stamBarStyle).join('\n');
    thisStyle = insertElement(document.body, createStyle(myTest)).sheet;
  }

  function toggleStyle() {
    if (!thisStyle) {
      injectStyle();
    } else {
      thisStyle.disabled = !enableStamBars$2;
    }
  }

  function changePref() {
    enableStamBars$2 = !enableStamBars$2;
    setValue(pref_enableStamBars, enableStamBars$2);
    toggleStyle();
    sendEvent('guildManage', 'StamBars');
  }

  function injectPref() {
    var gs = querySelector('#pCC img.guild_openGuildStore');
    var td = gs.parentNode;
    const prefContainer = insertElement(td,
      createDiv({
        className: 'fshCenter',
        innerHTML: simpleCheckboxHtml(pref_enableStamBars)
      }));
    on(prefContainer, 'change', changePref);
  }

  function progressBar() {
    injectPref();
    enableStamBars$2 = getValue(pref_enableStamBars);
    if (enableStamBars$2) {toggleStyle();}
  }

  function toggleVisibilty(evt) {
    var anItemId = evt.target.dataset.linkto;
    var anItem = getElementById(anItemId);
    var currentVisibility = anItem.classList.contains('fshHide');
    anItem.classList.toggle('fshHide');
    if (currentVisibility) {
      setValue(anItemId, '');
    } else {
      setValue(anItemId, 'ON');
    }
  }

  function makeButton(linkto) {
    return createSpan({
      className: 'fshLink tip-static',
      dataset: {linkto: linkto, tipped: 'Toggle Section'},
      textContent: 'X'
    });
  }

  function wrapper(btn) {
    var wrap = createSpan({innerHTML: '[&nbsp;'});
    insertElement(wrap, btn);
    insertHtmlBeforeEnd(wrap, '&nbsp;]');
    return wrap;
  }

  function thisToggle(inject, panel, linkto) {
    var thisButton = makeButton(linkto);
    insertElement(inject, wrapper(thisButton));
    panel.id = linkto;
    if (getValue(linkto)) {hideElement(panel);}
    on(thisButton, 'click', toggleVisibilty);
  }

  function logoToggle(leftHandSideColumnTable) {
    thisToggle(
      leftHandSideColumnTable.rows[0].cells[1].children[0],
      leftHandSideColumnTable.rows[2].cells[0].children[0],
      'guildLogoControl');
  }

  function statToggle(leftHandSideColumnTable) {
    var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].children[0];
    leaveGuildCell.innerHTML = leaveGuildCell.innerHTML.trim();
    thisToggle(leaveGuildCell,
      leftHandSideColumnTable.rows[6].cells[0].children[0],
      'statisticsControl');
  }

  function structureToggle(leftHandSideColumnTable) {
    thisToggle(leftHandSideColumnTable.rows[15].cells[1].children[0],
      leftHandSideColumnTable.rows[17].cells[0].children[0],
      'guildStructureControl');
  }

  function relicControl(leftHandSideColumnTable) {
    const relic = getArrayByTagName('b', leftHandSideColumnTable)
      .filter(contains('Relics'));
    if (relic.length !== 1) {return;}
    const thisFont = relic[0].parentNode.nextElementSibling.children[0];
    thisFont.innerHTML = '[ <a href="' + guildSubcmdUrl +
      'reliclist">Control</a> ]&nbsp;';
  }

  function selfRecallLink(leftHandSideColumnTable) {
    // self recall
    var getLi = getElementsByTagName('li', leftHandSideColumnTable);
    var selfRecall = getLi[getLi.length - 1].parentNode;
    insertHtmlBeforeEnd(selfRecall,
      '<li><a href="' + recallUserUrl + playerName$1() +
      '" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>');
  }

  function getLhsColTab() {
    return pCC.lastElementChild.rows[2].cells[0].children[0];
  }

  function lhsAdd(leftHandSideColumnTable, fn) {
    add(3, fn, [leftHandSideColumnTable]);
  }

  function lhsAdditions(leftHandSideColumnTable) {
    [
      logoToggle,
      statToggle,
      structureToggle,
      relicControl,
      selfRecallLink
    ].forEach(partial(lhsAdd, leftHandSideColumnTable));
  }

  function doGuildTracker() {
    const test = 0;
    if (test === 0) {
      add(4, guildTracker);
    } else {
      add(4, guildTrackerV2);
    }
  }

  function ajaxStuff(leftHandSideColumnTable) {
    if (jQueryNotPresent()) {return;}
    // Detailed conflict information
    if (getValue('detailedConflictInfo')) {
      add(3, conflictInfo, [leftHandSideColumnTable]);
    }
    doGuildTracker();
  }

  function manage() {
    var leftHandSideColumnTable = getLhsColTab();
    lhsAdditions(leftHandSideColumnTable);
    add(3, buffLinks$1);
    ajaxStuff(leftHandSideColumnTable);
    progressBar();
  }

  function getIntFromRegExp(theText, rxSearch) {
    var result;
    var matches = theText.replace(/,/g, '').match(rxSearch);
    if (matches) {
      result = parseInt(matches[1], 10);
    } else {
      result = 0;
    }
    return result;
  }

  function wrapUrl(guildLogo) {
    var url = guildLogo.nextElementSibling.nextElementSibling;
    if (url) {url.classList.add('fshBreakAll');}
  }

  function removeGuildAvyImgBorder() {
    var guildLogo = querySelector('#pCC img[oldtitle$="\'s Logo"]');
    if (!guildLogo) {return;}
    guildLogo.removeAttribute('style');
    wrapUrl(guildLogo);
  }

  function mightBePositive(actualXP, xpLockXP) {
    let sign = '';
    if (actualXP > xpLockXP) {sign = '+';}
    return sign + addCommas(actualXP - xpLockXP);
  }

  function injectLock(xpLock) {
    var xpLockmouseover = xpLock.dataset.tipped;
    var xpLockXP = getIntFromRegExp(xpLockmouseover, /XP Lock: <b>(\d*)/);
    var actualXP = getIntFromRegExp(xpLockmouseover, /XP: <b>(\d*)/);
    insertHtmlBeforeEnd(xpLock.parentNode.nextElementSibling,
      ' (<b>' + mightBePositive(actualXP, xpLockXP) + '</b>)');
  }

  function guildXPLock() {
    var xpLock = querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
    if (xpLock) {injectLock(xpLock);}
  }

  function injectGuild() {
    add(3, colouredDots);
    add(3, removeGuildAvyImgBorder);
    add(3, guildXPLock);
    add(3, activeMembers);

    if (calf.subcmd === 'manage') {manage();}
    if (calf.subcmd === 'view') {injectViewGuild();}
  }

  var statbarGold = '#pH #statbar-gold';
  var statbarGoldTooltip = '#pH #statbar-gold-tooltip-general dd';
  var pccB = '#pCC b';
  var infoMsg = '#pCC #info-msg';
  var withdrawAmount = '#pCC #withdraw_amount';
  var depositAmount = '#pCC #deposit_amount';
  var disabled = 'disabled';
  var inputDepo = '#pCC input[value="Deposit"]';

  function doInfoBox(infoBox) { // jQuery
    var target = $(infoMsg);
    if (target.length === 0) {
      $('#pCC').prepend(infoBox.closest(def_table));
    } else {
      target.closest(def_table).replaceWith(infoBox.closest(def_table));
    }
  }

  function eachGoldValue(doc, index) {
    return $(statbarGoldTooltip, doc).eq(index).text();
  }

  function doStatBarGold(doc) {
    $(statbarGold).text($(statbarGold, doc).text());
    $(statbarGoldTooltip).text(partial(eachGoldValue, doc));
  }

  function newStats(doc, balPos, index) {
    return $(pccB, doc).slice(balPos).eq(index).text();
  }

  function doBoldText(doc, balPos) {
    $(pccB).slice(balPos).text(partial(newStats, doc, balPos));
  }

  function disableDepo(depoPos) { // jQuery
    if ($(pccB).eq(depoPos).text() === '0') {
      $(inputDepo).prop(disabled, true);
    }
  }

  function updateDepoAmount(o, doc) { // jQuery
    if (o.data.amount !== '1') {
      $(depositAmount).val($(depositAmount, doc).val());
    } else {
      $(depositAmount).val('1');
    }
  }

  function replaceValues(bankSettings, doc, infoBox) {
    doInfoBox(infoBox);
    doStatBarGold(doc);
    doBoldText(doc, bankSettings.balPos);
    disableDepo(bankSettings.depoPos);
    updateDepoAmount(bankSettings, doc);
    $(withdrawAmount).val(bankSettings.initWithdraw);
  }

  function transResponse(bankSettings, response) { // jQuery
    var doc = createDocument(response);
    var infoBox = $(infoMsg, doc);
    if (infoBox.length === 0) {return;}
    replaceValues(bankSettings, doc, infoBox);
  }

  function invalidAmount(o, amount) { // jQuery
    return $(pccB).eq(o.depoPos).text() === '0' ||
      !$.isNumeric(amount) || amount < 1;
  }

  function doAjax$2(bankSettings) {
    indexAjaxData(bankSettings.data).then(partial(transResponse, bankSettings));
  }

  function bankDeposit(bankSettings, e) { // jQuery
    e.preventDefault();
    var amount = $(depositAmount).val();
    if (invalidAmount(bankSettings, amount)) {return;}
    bankSettings.data.mode = 'deposit';
    bankSettings.data.amount = amount;
    doAjax$2(bankSettings);
  }

  function bankWithdrawal(bankSettings, e) { // jQuery
    e.preventDefault();
    var amount = $(withdrawAmount).val();
    if (!$.isNumeric(amount) || amount < 1) {return;}
    bankSettings.data.mode = 'withdraw';
    bankSettings.data.amount = amount;
    doAjax$2(bankSettings);
  }

  function linkToGuildBank(bankSettings, bank) { // jQuery
    if (bankSettings.appLink) {
      bank.after('<div class="fshCenter">' +
        '<a href="' + guildSubcmdUrl + 'bank">Go to Guild Bank</a>' +
        '</div>');
    }
  }

  function captureButtons(bankSettings, depo, withdraw) { // jQuery
    if ($(pccB).eq(bankSettings.depoPos).text() === '0') { // Check Deposits Available
      depo.prop(disabled, true);
    } else {
      depo.on('click', partial(bankDeposit, bankSettings));
    }
    withdraw.on('click', partial(bankWithdrawal, bankSettings));
  }

  function appLink(bankSettings, bank) { // jQuery
    linkToGuildBank(bankSettings, bank);
    var depo = $(inputDepo);
    if (depo.length !== 1) {return;}
    var withdraw = $('#pCC input[value="Withdraw"]');
    if (withdraw.length !== 1) {return;}
    captureButtons(bankSettings, depo, withdraw);
  }

  function hasJquery$1(bankSettings) { // jQuery
    var bank = $(bankSettings.headSelector);
    if (bank.length !== 0 && bank.eq(0).text() === bankSettings.headText) {
      appLink(bankSettings, bank);
    }
  }

  function ajaxifyBank(bankSettings) {
    if (jQueryPresent()) {hasJquery$1(bankSettings);}
  }

  function injectGuildBank() {
    ajaxifyBank({
      headSelector: '#pCC b',
      headText: 'Guild Bank',
      appLink: false,
      depoPos: 3,
      balPos: 2,
      data: {
        cmd: 'guild',
        subcmd: 'bank',
        subcmd2: 'transaction'
      },
      initWithdraw: '1'
    });
  }

  function notLastUpdate(pair) {return pair[0] !== 'lastUpdate';}

  function bitwiseAnd(a, b) {
    return a & b; // eslint-disable-line no-bitwise
  }

  function isNaN$1(value) {
    return Number.isNaN(value);
  }

  function round(number, precision) {
    var factor = Math.pow(10, precision);
    if (isNaN$1(factor)) {factor = 1;}
    return Math.round(number * factor) / factor;
  }

  function roundToString(number, precision) {
    return round(number, precision).toString();
  }

  var privLookup = [
    [0x2, 5], //       Bank Withdraw
    [0x4, 4], //       Build/Upgrade Structures
    [0x40, 5], //      Build/Upgrade/Demolish Structures
    [0x100, 0.1], //   Store Items
    [0x200, 0.2], //   Take Items
    [0x1000, 0.5], //  Can Mass Messages
    [0x8000, 0.2], //  Can Recall Tagged Items
    [0x80000, 0.1], // Can View Advisor
    [0x10000, 5], //   Can Un-Tag Items
    [0x400000, 4] //   Can Kick Members
  ];

  function calcPermWeight(perms) {
    return roundToString(
      privLookup.filter(([flag]) => bitwiseAnd(perms, flag))
        .reduce((a, [, weight]) => a + weight - 1, 0) +
      perms.toString(2).split('').map(Number).reduce((a, b) => a + b, 0)
      , 1
    );
  }

  function parseRankData(memberRanks, row) {
    // Makes a weighted calculation of available permissions and gets tax rate
    var rankCell = row.children[0];
    var rankName = getText(rankCell.firstChild); // Text Node
    var thisRank = memberRanks.find(r => r.name === rankName);
    if (thisRank) {
      insertHtmlAfterBegin(rankCell, '<span class="fshBlue">(' +
        calcPermWeight(thisRank.permissions) +
        ') Tax:(' + thisRank.tax + '%)</span> ');
    }
  }

  function gotRankData(theRows, spinner, json) {
    if (json.s) {
      theRows.forEach(partial(parseRankData, [json.r['0']].concat(json.r.ranks)));
      spinner.classList.remove('fshSpinner');
    }
  }

  function fetchRankData(theRows, weightButton) {
    const spinner =
      createSpan({
        className: 'fshBlock fshRelative fshSpinner fshSpinner12',
        style: {height: '15px', width: '136px'}
      });
    replaceChild(spinner, weightButton);
    daRanksView().then(partial(gotRankData, theRows, spinner));
  }

  function injectWeightButton(theRows, addNewRank) {
    var weightButton = createInput({
      className: 'custombutton',
      type: 'button',
      value: 'Get Rank Weightings'
    });
    on(weightButton, 'click',
      partial(fetchRankData, theRows, weightButton));
    var theTd = addNewRank.parentNode.parentNode;
    insertHtmlBeforeEnd(theTd, '&nbsp;');
    insertElement(theTd, weightButton);
  }

  function weightings(theRows) {
    // gather rank info button
    var addNewRank = querySelector('#pCC a[href*="=ranks&subcmd2=add"]');
    if (addNewRank) {
      injectWeightButton(theRows, addNewRank);
    }
  }

  var characterRow;

  function notValidRow(thisRankRow, targetRowNum) {
    return characterRow >= Math.min(thisRankRow.rowIndex, targetRowNum) ||
      targetRowNum < 1 ||
      targetRowNum > thisRankRow.parentNode.rows.length;
  }

  function getTargetRowNumber(val) {
    if (val === 'Up') {return -1;}
    return 2;
  }

  function getPxScroll(val) {
    if (val === 'Up') {return -22;}
    return 22;
  }

  function shuffleRows(evt, thisRankRow, targetRowNum) {
    var matchRankId = evt.target.getAttribute('onclick').match(/rank_id=(\d+)/);
    daRankPosition(toLowerCase(evt.target.value), matchRankId[1]);
    var injectRow = thisRankRow.parentNode.rows[targetRowNum];
    insertElementBefore(thisRankRow, injectRow);
    var pxScroll = getPxScroll(evt.target.value);
    window.scrollBy(0, pxScroll);
    evt.stopPropagation();
  }

  function overrideUpDown(evt) {
    var thisRankRow = evt.target.parentNode.parentNode.parentNode;
    var targetRowNum = thisRankRow.rowIndex +
      getTargetRowNumber(evt.target.value);
    if (notValidRow(thisRankRow, targetRowNum)) {return;}
    shuffleRows(evt, thisRankRow, targetRowNum);
  }

  function upOrDown(evt) {
    return ['Up', 'Down'].includes(evt.target.value);
  }

  function ajaxifyRankControls$2(evt) {
    if (upOrDown(evt)) {overrideUpDown(evt);}
  }

  function doButtons() {
    if (characterRow && getValue('ajaxifyRankControls')) {
      on(pCC, 'click', ajaxifyRankControls$2, true);
    }
  }

  function setCharacterRow(row, thisRank) {
    if (thisRank && thisRank[1].includes(playerName$1())) {
      characterRow = row.rowIndex;
    }
  }

  function findTheRows() {
    var outerTable = pCC.lastElementChild.previousElementSibling;
    if (outerTable.rows && outerTable.rows.length > 7) {
      return arrayFrom(outerTable.rows[7].children[0].children[0].rows);
    }
  }

  function aRank(rank_name, memberRanks) {return memberRanks[0] === rank_name;}

  function hasMembers(thisRank) {return thisRank && thisRank[1].length > 0;}

  function getRankName(row, rankCell) {
    if (row.rowIndex === 1) {return 'Guild Founder';}
    return getText(rankCell);
  }

  function writeRanks(memberRanks, row) {
    var rankCell = row.children[0];
    var rankName = getRankName(row, rankCell);
    var thisRank = memberRanks.find(partial(aRank, rankName));
    if (hasMembers(thisRank)) {
      setCharacterRow(row, thisRank);
      insertHtmlBeforeEnd(rankCell, ' <span class="fshBlue">- ' +
        thisRank[1].join(', ') + '</span>');
    }
  }

  function gotMembers(memberRanks) {
    var theRows = findTheRows();
    if (theRows) {
      batch(3, theRows, 1, partial(writeRanks, memberRanks));
      weightings(theRows);
      doButtons();
    }
  }

  function rankArray(prev, ary) {
    var thisRank = prev.find(partial(aRank, ary[1].rank_name));
    if (thisRank) {
      thisRank[1].push(ary[0]);
    } else {
      prev.push([ary[1].rank_name, [ary[0]]]);
    }
    return prev;
  }

  function makeRanks(json) {
    return Object.entries(json).filter(notLastUpdate).reduce(rankArray, []);
  }

  function injectGuildRanks() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getMembrList(false).then(makeRanks).then(gotMembers);
  }

  function pair(prev, curr) {
    prev[curr.name] = Number(curr.level);
    return prev;
  }

  function reduceBuffArray(buffAry) {
    return buffAry.reduce(pair, {});
  }

  var packRE = />\s*([ a-zA-Z]+) Level (\d+)/g;

  function checkForBuffs(myBuffs, el) {
    var tipped = el.dataset.tipped;
    var packBuffs;
    while ((packBuffs = packRE.exec(tipped)) !== null) {
      if (myBuffs[packBuffs[1]] === Number(packBuffs[2])) {
        insertHtmlBeforeEnd(el.parentNode,
          '<br><span class="fshRed fshNoWrap">' + packBuffs[1] + ' ' +
          packBuffs[2] + ' active</span>');
      }
    }
  }

  function postWarnings(myBuffs) {
    var packsRow = pCC.children[0].rows[9];
    if (!packsRow) {return;}
    getArrayByTagName('a', packsRow.cells[0].children[0])
      .forEach(partial(checkForBuffs, myBuffs));
  }

  function parseProfile(data) {
    if (data._skills.length !== 0) {
      var myBuffs = reduceBuffArray(data._skills);
      postWarnings(myBuffs);
    }
  }

  function injectRPUpgrades() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    myStats().then(parseProfile);
  }

  var titan = 0;
  var cooldownText = 1;
  var coolTime = 2;
  var seen = 3;

  function reformat(el) {
    return [el[0], el[1].cooldownText, el[1].coolTime, el[1].seen];
  }

  function onCd(el) {return el[coolTime] > now;}

  function int(a, b) {return a[coolTime] - b[coolTime];}

  function makeRow$2(el) {
    return '<tr><td class="fshCenter">' + el[titan] +
      '</td><td class="fshBold fshCenter fshCooldown">' + el[cooldownText] +
      '</td><td class="fshCenter">' + el[seen] + '</td></tr>';
  }

  function makeHtml(theTitans) {
    return Object.entries(theTitans).map(reformat).filter(onCd).sort(int)
      .map(makeRow$2).join('');
  }

  function makeTrackerTable(theTitans) {
    var trackerTable = createTable({className: 'fshTTracker'});
    var tBody = createTBody({
      innerHTML: '<tr><td class="header fshCenter">Titan</td>' +
        '<td class="header fshCenter">Cooldown</td>' +
        '<td class="header fshCenter">Visible</td></tr>'
    });
    insertElement(trackerTable, tBody);
    insertHtmlBeforeEnd(tBody, makeHtml(theTitans));
    return trackerTable;
  }

  function displayTracker(parentTable, theTitans) {
    if (parentTable.rows.length > 5) {
      var trackerTable = makeTrackerTable(theTitans);
      var newRow = parentTable.insertRow(5);
      var newCell = newRow.insertCell(-1);
      newCell.colSpan = 3;
      insertElement(newCell, trackerTable);
    }
  }

  function buffIndividual(self) {
    if (self.previousElementSibling) {
      openQuickBuffByName(getText(self.previousElementSibling));
    }
  }

  function memberName(el) {return getText(el.cells[0].children[0].children[0]);}

  function buffAll(self) {
    var titanTable = self.parentNode.parentNode.parentNode.parentNode;
    var shortList = arrayFrom(titanTable.rows)
      .filter(dataRows(3, 0)).map(memberName);
    openQuickBuffByName(shortList.join());
  }

  function buffEvent(e) {
    var self = e.target;
    if (containsText('[b]', self)) {
      buffIndividual(self);
    }
    if (containsText('all', self)) {
      buffAll(self);
    }
  }

  function evtHdl$1(e) {
    if (e.target.classList.contains('fshBl')) {buffEvent(e);}
  }

  function playerBufflink(el) {
    insertHtmlBeforeEnd(el.cells[0],
      ' <button class="fshBl fshXSmall">[b]</button>');
  }

  function doBuffLinks$1(titanTable) {
    arrayFrom(titanTable.rows).filter(dataRows(3, 0)).forEach(playerBufflink);
    insertHtmlBeforeEnd(titanTable.rows[0].cells[0],
      ' <button class="fshBl fshXSmall">all</button>');
  }

  function myTables(el, i) {return el.rows.length > 1 && i > 1;}

  function gotTables(titanTables) {
    arrayFrom(titanTables).filter(myTables).forEach(doBuffLinks$1);
    on(titanTables[1], 'click', evtHdl$1);
  }

  function injectScouttowerBuffLinks(titanTables) {
    if (titanTables.length > 2) {gotTables(titanTables);}
  }

  function getTitanName(aRow) {
    return aRow.cells[0].children[0].getAttribute('oldtitle');
  }

  function cooldownTracker(theTitans, aRow) {
    var myName = getTitanName(aRow).replace(' (Titan)', '');
    if (!theTitans[myName]) {
      var cooldown = getText(aRow.nextElementSibling.cells[0]);
      var coolTime = 0;
      if (cooldown.includes('until')) {
        coolTime = parseDateAsTimestamp$1(
          cooldown.replace('Cooldown until: ', ''));
      }
      theTitans[myName] = {
        cooldownText: cooldown,
        coolTime: coolTime,
        seen: 'yes'
      };
    }
  }

  function anyMissing(newTitans, pair) {
    if (newTitans[pair[0]]) {return;}
    if (pair[1].coolTime <= now) {return;}
    newTitans[pair[0]] = {
      cooldownText: pair[1].cooldownText,
      coolTime: pair[1].coolTime,
      seen: 'no'
    };
  }

  function addMissingTitansFromOld(oldTitans, newTitans) {
    if (!oldTitans) {return;}
    Object.entries(oldTitans).forEach(partial(anyMissing, newTitans));
  }

  function getTitanString(guildKills, totalHP, currentHP) {
    var numberOfKillsToSecure = Math.ceil(totalHP / 2 + 1);
    if (guildKills >= numberOfKillsToSecure) {
      return 'Secured';
    }
    var remainingKills = numberOfKillsToSecure - guildKills;
    if (remainingKills > currentHP) {
      return '<span class="fshRed">Cannot Secure</span>';
    }
    return '<span class="fshRed">' + remainingKills + '</span> to secure';
  }

  function getKillsPct(currentNumberOfKills, guildKills) {
    if (currentNumberOfKills === 0) {return 0;}
    return guildKills * 100 / currentNumberOfKills;
  }

  function summaryHtml(guildKills, currentHP, totalHP) {
    return '<br><span class="fshBlue"> (' +
      roundToString(getKillsPct(totalHP - currentHP, guildKills), 2) +
      '% Current <br>' + roundToString(guildKills * 100 / totalHP, 2) +
      '% Total<br>' + getTitanString(guildKills, totalHP, currentHP) + ')';
  }

  function injectSummary(aRow, titanHP) {
    var titanHPArray = titanHP.split('/');
    insertHtmlBeforeEnd(aRow.cells[3],
      summaryHtml(Number(getText(aRow.cells[3])), Number(titanHPArray[0]),
        Number(titanHPArray[1])));
  }

  function killsSummary(aRow) {
    var titanHP = getText(aRow.cells[2]);
    if (titanHP.indexOf('-') !== -1) {return;}
    injectSummary(aRow, titanHP);
  }

  function guideLink(aRow) {
    var myName = encodeURIComponent(getTitanName(aRow));
    var myImg = aRow.cells[0].children[0];
    var myLink = createAnchor({
      href: guideUrl + 'creatures&search_name=' + myName,
      target: '_blank'
    });
    insertElement(myLink, myImg);
    insertElement(aRow.cells[0], myLink);

    var realmCell = aRow.cells[1];
    var realmName = getText(realmCell);
    realmCell.innerHTML = '<a href="' + guideUrl + 'realms&search_name=' +
      realmName + '" target="_blank">' + realmName + '</a>';
  }

  function decorate$1(newTitans, aRow) {
    killsSummary(aRow);
    cooldownTracker(newTitans, aRow); // Pref
    guideLink(aRow);
  }

  function doTooMuch(titanTable, newTitans) {
    arrayFrom(titanTable.rows).filter(dataRows(4, 0))
      .forEach(partial(decorate$1, newTitans));
  }

  function gotOldTitans(oldTitans) {
    var titanTables = getElementsByTagName(def_table, pCC);
    injectScouttowerBuffLinks(titanTables);
    var titanTable = titanTables[1];
    var newTitans = {};
    doTooMuch(titanTable, newTitans);
    addMissingTitansFromOld(oldTitans, newTitans); // Pref
    displayTracker(titanTables[0], newTitans); // Pref
    setForage('fsh_titans', newTitans); // Pref
  }

  function injectScouttower() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getForage('fsh_titans').then(gotOldTitans); // Pref
  }

  function doItemTable(checkbox) {
    insertHtmlBeforeEnd(checkbox.parentNode.nextElementSibling
      .nextElementSibling, '&nbsp;<span class="sendLink">Fast BP</span>');
  }

  function doCheckAll() {
    querySelectorArray('#pCC input[name="tagIndex[]"]').forEach(clickThis);
  }

  function takeResult$1(self, data) {
    if (data.s) {
      self.removeAttribute('style');
      self.className = 'fshGreen';
      setText('Taken', self);
    }
  }

  function fastBp(el) {
    var itmId = el.parentNode.previousElementSibling.previousElementSibling
      .children[0].value;
    daGsTake(itmId).then(partial(takeResult$1, el));
    setText('', el);
    el.className = 'guildTagSpinner';
    el.style.backgroundImage = 'url(\'' + imageServer +
      '/skin/loading.gif\')';
  }

  function evtHdlr(e) {
    var self = e.target;
    if (self.value === 'Check All') {doCheckAll();}
    if (self.className === 'sendLink') {fastBp(self);}
  }

  function paintTable() {
    querySelectorArray('#pCC input[name="tagIndex[]"]').forEach(doItemTable);
  }

  function checkAllBtn() {
    var checkAll = createInput({type: 'button', value: 'Check All'});
    var formTags = getElementsByTagName('form', pCC);
    if (formTags.length === 1) {
      insertElement(formTags[0].previousElementSibling.cells[0], checkAll);
    }
  }

  function doItemTagging() {
    on(pCC, 'click', evtHdlr);
    paintTable();
    checkAllBtn();
  }

  function injectGuildAddTagsWidgets() {
    if (getElementById('tagging_cost')) {
      doItemTagging();
    } else {
      injectGuild();
    }
  }

  function itemStatus(data) {return data;}

  function doAction$1(fn, item, data) {
    return fn(item).then(partial(itemStatus, data));
  }

  function recallItem(invId, playerId, mode) {
    return daGuildRecall(invId, playerId, mode).then(ajaxReturnCode);
  }

  function gotBackpack(action, data, bpData) {
    // TODO assuming backpack is successful...
    var lastBackpackItem = bpData.items[bpData.items.length - 1].a;
    if (action === 'wear') {
      return doAction$1(equipItem, lastBackpackItem, data);
      // Return recall status irrespective of the status of the equipitem
    }
    if (action === 'use') {
      return doAction$1(useItem$1, lastBackpackItem, data);
      // Return recall status irrespective of the status of the useitem
    }
  }

  function recallItemStatus(action, data) {
    if (data.r === 0 && action !== 'recall') {
      return backpack().then(partial(gotBackpack, action, data));
    }
    return data;
  }

  function pipeRecallToQueue(invId, playerId, mode, action) {
    return recallItem(invId, playerId, mode).then(errorDialog)
      .then(partial(recallItemStatus, action));
  }

  function additionalAction(action, data) {
    if (action === 'wear') {
      return doAction$1(equipItem, data.b, data);
      // Return takeitem status irrespective of the status of the equipitem
    }
    if (action === 'use') {
      return doAction$1(useItem$1, data.b, data);
      // Return takeitem status irrespective of the status of the useitem
    }
  }

  function takeItemStatus(action, data) {
    if (data.r === 0 && action !== 'take') {
      return additionalAction(action, data);
    }
    return data;
  }

  function pipeTakeToQueue(invId, action) {
    return takeItem(invId).then(partial(takeItemStatus, action));
  }

  var dfr;

  function getDfr() {
    if (!dfr) {dfr = Promise.resolve();}
    return dfr;
  }

  function queueTakeItem(invId, action) {
    // You have to chain them because they could be modifying the backpack
    dfr = getDfr().then(partial(pipeTakeToQueue, invId, action));
    return dfr;
  }

  function queueRecallItem(invId, playerId, mode, action) {
    // You have to chain them because they could be modifying the backpack
    dfr = getDfr().then(partial(pipeRecallToQueue,
      invId, playerId, mode, action));
    return dfr;
  }

  var spinner = '<span class="guildReportSpinner" style="background-image: ' +
    'url(\'' + imageServer + '/skin/loading.gif\');"></span>';

  function recalled(theTd) {
    theTd.innerHTML = '<span class="fastWorn">' +
      'You successfully recalled the item</span>';
  }

  function wornItem(theTd) {
    theTd.innerHTML = '<span class="fastWorn">Worn</span>';
  }

  function replyTo(self) {
    window.openQuickMsgDialog(self.getAttribute('target_player'));
  }

  function targetPlayerId(href) {
    return href.match(/&player_id=(\d+)/)[1];
  }

  function recallResult(action, theTd, data) {
    if (data.r === 1) {return;}
    if (action === 'recall') {
      recalled(theTd);
    } else {
      wornItem(theTd);
    }
  }

  function doRecall(theTd, href, mode, action) {
    queueRecallItem(itemId(href), targetPlayerId(href), mode, action)
      .then(partial(recallResult, action, theTd));
  }

  function recallTo(theTd, href, mode) {
    doRecall(theTd, href, mode, 'recall');
  }

  function doFastBp(theTd, href) {
    sendEvent('GuildReport', 'Fast BP');
    recallTo(theTd, href, 0);
  }

  function doFastGs(theTd, href) {
    sendEvent('GuildReport', 'Fast GS');
    recallTo(theTd, href, 1);
  }

  function doFastWear(theTd, href) {
    sendEvent('GuildReport', 'Fast Wear');
    if (Number(targetPlayerId(href)) === playerId()) {
      equipItem(itemId(href)).then(partial(wornItem, theTd));
    } else {
      doRecall(theTd, href, 0, 'wear');
    }
  }

  var subClass = [
    ['fast-bp', doFastBp],
    ['fast-gs', doFastGs],
    ['fast-wear', doFastWear]
  ];

  function doFastRecall(self) {
    var theTd = self.parentNode.parentNode;
    if (!theTd) {return;}
    var href = theTd.children[0].href;
    if (!href) {return;}
    subClass.find(partial(classPair, self))[1](theTd, href);
    theTd.innerHTML = spinner;
  }

  var classEvts = [
    ['sendLink', doFastRecall],
    ['a-reply', replyTo]
  ];

  function eventHandlers$1() {
    on(getElementsByTagName('table', pCC)[1], 'click', classHandler(classEvts));
  }

  var fastBpHtml = '<span class="sendLink fast-bp">Fast BP</span> | ';
  var fastGsHtml = '<span class="sendLink fast-gs">Fast GS</span>';
  var fastWearHtml = ' | <span class="sendLink fast-wear">Fast Wear</span>';
  var wearRE;
  var gs;
  var bp;
  var wearableBp;
  var wearableGs;

  function getWearRe() {
    if (!wearRE) {
      wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|' +
        'Gut Rot Head Splitter|Serum');
    }
    return wearRE;
  }

  function fastBp$1() {
    if (!bp) {bp = createDiv({innerHTML: fastBpHtml + fastGsHtml});}
    return bp.cloneNode(true);
  }

  function fastWearableBp() {
    if (!wearableBp) {
      wearableBp = createDiv({innerHTML: fastBpHtml + fastGsHtml + fastWearHtml});
    }
    return wearableBp.cloneNode(true);
  }

  function fastGs() {
    if (!gs) {gs = createDiv({innerHTML: fastGsHtml});}
    return gs.cloneNode(true);
  }

  function fastWearableGs() {
    if (!wearableGs) {
      wearableGs = createDiv({innerHTML: fastGsHtml + fastWearHtml});
    }
    return wearableGs.cloneNode(true);
  }

  var lookup = [
    [true, true, fastWearableBp],
    [true, false, fastWearableGs],
    [false, true, fastBp$1],
    [false, false, fastGs]
  ];

  function theArray(thisWearable, thisBp, arr) {
    return arr[0] === thisWearable && arr[1] === thisBp;
  }

  function makeFastRecall(el) {
    var thisWearable = !getWearRe().test(el.previousElementSibling.innerHTML);
    var thisBp = el.children.length === 2;
    return lookup.find(partial(theArray, thisWearable, thisBp))[2]();
  }

  function cloneObj(obj, result, key) {
    result[key] = obj[key];
    return result;
  }

  function sortKeys(obj) {
    return Object.keys(obj).sort(alpha).reduce(partial(cloneObj, obj), {});
  }

  var inventory$2;

  function pivotPotObj(potOpts, potObj, prev, pot) {
    if (potOpts.myMap[pot] !== 'Ignore') {
      if (prev[potOpts.myMap[pot]]) {
        prev[potOpts.myMap[pot]] += potObj[pot];
      } else {
        prev[potOpts.myMap[pot]] = potObj[pot];
      }
    }
    return prev;
  }

  function perc2color(percent) {
    var perc = Math.max(Math.min(percent, 100), 0);
    var r;
    var g;
    var b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }

  function makeRowsFromPivot(potOpts, pivot, prev, pot) {
    return prev + '<tr><td>' + pot +
      '</td><td style="background-color: ' +
      perc2color((pivot[pot] - potOpts.minpoint) /
      (potOpts.maxpoint - potOpts.minpoint) * 100) + ';">' +
      pivot[pot].toString() + '</td></tr>';
  }

  function drawInventory(potOpts, potObj) {
    sendEvent('potReport', 'drawInventory');
    var pivot = sortKeys(Object.keys(potObj)
      .reduce(partial(pivotPotObj, potOpts, potObj), {}));
    inventory$2.innerHTML = '<table><tbody>' +
      Object.keys(pivot).reduce(partial(makeRowsFromPivot, potOpts, pivot), '') +
      '</tbody></table>';
  }

  function initInventory(potOpts, potObj, panels) {
    inventory$2 = createDiv({id: 'inventory'});
    if (potOpts.pottab1) {
      drawInventory(potOpts, potObj);
    } else {
      once(panels.parentNode.children[0], 'change',
        partial(drawInventory, potOpts, potObj));
    }
    insertElement(panels, inventory$2);
  }

  var mapping;
  var selectRowTmp;

  function getRow() {
    var rowTmp = createTr();
    rowTmp.insertCell(-1);
    rowTmp.insertCell(-1);
    return rowTmp;
  }

  function setOption(value) {
    var option = createOption();
    option.value = value;
    option.text = value;
    return option;
  }

  function insertOption(selectTmp, el) {
    insertElement(selectTmp, setOption(el[0]));
  }

  function getSelect(ary) {
    var selectTmp = createSelect({
      className: 'tip-static',
      dataset: {tipped: 'Set to "Ignore" to exclude from report'}
    });
    insertElement(selectTmp, setOption('Ignore'));
    ary.forEach(partial(insertOption, selectTmp));
    return selectTmp;
  }

  function getSelectRow(ary) {
    if (!selectRowTmp) {
      selectRowTmp = getRow();
      var select = getSelect(ary);
      insertElement(selectRowTmp.cells[1], select);
    }
    return selectRowTmp.cloneNode(true);
  }

  function insertRows(mapTbl, el, i, ary) {
    var selectRow = getSelectRow(ary);
    setText(el[0], selectRow.cells[0]);
    var select = selectRow.cells[1].children[0];
    select.name = el[0];
    select.value = el[1];
    insertElement(mapTbl.tBodies[0], selectRow);
  }

  function makeButton$1(row, id, val) {
    var btn = createInput({
      id: id,
      type: 'button',
      value: val
    });
    insertElement(row.cells[1], btn);
  }

  function insertFinal(mapTbl) {
    var row = getRow();
    makeButton$1(row, 'fshIgnoreAll', 'Ignore All');
    insertHtmlBeforeEnd(row.cells[1], '&nbsp;');
    makeButton$1(row, 'fshReset', 'Reset');
    insertElement(mapTbl.tBodies[0], row);
    return 0;
  }

  function drawMapping(potOpts) {
    sendEvent('potReport', 'drawMapping');
    var mapTbl = createTable({innerHTML: '<tbody></tbody>'});
    mapping.replaceChild(mapTbl, mapping.children[0]);
    add(3, batch, [3, Object.entries(potOpts.myMap), 0,
      partial(insertRows, mapTbl), partial(insertFinal, mapTbl)]);
  }

  function initMapping(potOpts, panels) {
    mapping = createDiv({id: 'mapping', innerHTML: '<p></p>'});
    if (potOpts.pottab2) {
      drawMapping(potOpts);
    } else {
      once(panels.parentNode.children[2], 'change',
        partial(drawMapping, potOpts));
    }
    insertElement(panels, mapping);
  }

  var storeMap = 'fsh_potMap';
  var defaultOpts = {
    pottab1: false,
    pottab2: false,
    pottab3: false,
    myMap: {},
    minpoint: 12,
    maxpoint: 20
  };

  function update(potOpts, pot) {
    if (!potOpts.myMap[pot]) {potOpts.myMap[pot] = pot;}
  }

  function buildMap(potOpts, potObj) {
    Object.keys(potObj).forEach(partial(update, potOpts));
    return sortKeys(potOpts.myMap);
  }

  function createContainer(potOpts) {
    return createDiv({
      id: 'potReport',
      innerHTML: '<input id="pottab1" type="checkbox"' +
        isChecked(potOpts.pottab1) + '>' +
        '<label for="pottab1">Composed Potion Inventory</label>' +
        '<input id="pottab2" type="checkbox"' +
        isChecked(potOpts.pottab2) + '>' +
        '<label for="pottab2">Mapping</label>' +
        '<input id="pottab3" type="checkbox"' +
        isChecked(potOpts.pottab3) + '>' +
        '<label for="pottab3">Thresholds</label>'
    });
  }

  function createThresholds(potOpts, panels) {
    var thresholds = createDiv({
      id: 'thresholds',
      innerHTML: 'Min:' +
        '<input id="minpoint" type="number" value="' +
        potOpts.minpoint + '" min="0" max="999">' +
        'Max:' +
        '<input id="maxpoint" type="number" value="' +
        potOpts.maxpoint + '" min="0" max="999">',
    });
    insertElement(panels, thresholds);
  }

  function onChange(potOpts, potObj, e) {
    if (e.target.tagName === 'SELECT') {
      potOpts.myMap[e.target.name] = e.target.value;
      setForage(storeMap, potOpts);
      drawInventory(potOpts, potObj);
    }
  }

  function reMap(ignore, prev, pot) {
    if (ignore) {
      prev[pot] = 'Ignore';
    } else {
      prev[pot] = pot;
    }
    return prev;
  }

  function resetMap(potOpts, potObj, ignore) {
    potOpts.myMap = Object.keys(potObj).reduce(partial(reMap, ignore), {});
  }

  function doReset$1(potOpts, potObj, ignore) {
    resetMap(potOpts, potObj, ignore);
    setForage(storeMap, potOpts);
    drawMapping(potOpts);
    drawInventory(potOpts, potObj);
  }

  function toggleTab(self) {return /^pottab\d$/.test(self.id);}

  function saveState(potOpts, self) {
    var option = self.id;
    potOpts[option] = self.checked;
    setForage(storeMap, potOpts);
  }

  function clickEvents(potOpts, potObj) {
    return [
      [selfIdIs('fshIgnoreAll'), partial(doReset$1, potOpts, potObj, true)],
      [selfIdIs('fshReset'), partial(doReset$1, potOpts, potObj, null)],
      [toggleTab, partial(saveState, potOpts)]
    ];
  }

  function onInput(potOpts, potObj, e) {
    var self = e.target.id;
    var maybeValue = testRange(e.target.value, 0, 999);
    if (maybeValue) {
      potOpts[self] = maybeValue;
      setForage(storeMap, potOpts);
      drawInventory(potOpts, potObj);
    }
  }

  function cellEventHandlers(potOpts, potObj, myCell) {
    on(myCell, 'change', partial(onChange, potOpts, potObj));
    on(myCell, 'click', eventHandler5(clickEvents(potOpts, potObj)));
    on(myCell, 'input', partial(onInput, potOpts, potObj));
  }

  function injectCell(potOpts, potObj) {
    var myCell = pCC.lastElementChild.insertRow(2).insertCell(-1);
    cellEventHandlers(potOpts, potObj, myCell);
    return myCell;
  }

  function buildPanels(potOpts, potObj) {
    var container = createContainer(potOpts);
    var panels = createDiv({id: 'panels'});
    insertElement(container, panels);
    initInventory(potOpts, potObj, panels);
    initMapping(potOpts, panels);
    createThresholds(potOpts, panels);
    insertElement(injectCell(potOpts, potObj), container);
  }

  function gotMap(potObj, data) {
    var potOpts = extend({}, defaultOpts); // deep clone
    extend(potOpts, fallback(data, {}));
    potOpts.myMap = buildMap(potOpts, potObj);
    setForage(storeMap, potOpts);
    buildPanels(potOpts, potObj);
  }

  function potReport(potObj) {
    getForage(storeMap).then(partial(gotMap, potObj));
  }

  var nodeArray;
  var nodeList;
  var potObj;

  function doPaintChild(inject, localCounter) {
    var el = nodeList[localCounter];
    insertElement(el, inject);
  }

  function addPotObj(item) {
    if (item.endsWith(' (Potion)')) {
      var itemName = item.slice(0, -9);
      potObj[itemName] = (potObj[itemName] || 0) + 1;
    }
  }

  function doSpan(el) {
    nodeArray.push(makeFastRecall(el));
    addPotObj(el.previousElementSibling.innerHTML);
  }

  function finishSpan() {
    batch(3, nodeArray, 0, doPaintChild, partial(potReport, potObj));
  }

  function prepareChildRows() {
    nodeList = querySelectorAll('#pCC table table ' +
      'tr:not(.fshHide) td:nth-of-type(3n)');
    potObj = {};
    nodeArray = [];
    batch(3, nodeList, 0, doSpan, finishSpan);
  }

  function memberHeader(oldhtml) {
    return onlineDot({last_login: calf.membrList[oldhtml].last_login}) +
      '<a href="' + playerIdUrl + calf.membrList[oldhtml].id +
      '">' + oldhtml + '</a> [ <span class="a-reply fshLink" target_player=' +
      oldhtml + '>m</span> ]';
  }

  function updateMemberHeader(el) {
    var oldhtml = getText(el);
    if (calf.membrList[oldhtml]) {
      el.innerHTML = memberHeader(oldhtml);
    }
  }

  function reportHeader() {
    var headers = querySelectorAll('#pCC table table ' +
      'tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b');
    batch(3, headers, 0, updateMemberHeader);
  }

  var findUser;
  var foundUser;

  function hideOther(el) {
    if (el.children[0].hasAttribute('bgcolor')) {
      foundUser = containsText(findUser, el.children[0].children[0]);
    }
    if (!foundUser) {
      el.className = 'fshHide';
    }
  }

  function searchUser() {
    findUser = getUrlParameter('user');
    if (!findUser) {return;}
    var userNodes = querySelectorArray(
      '#pCC table table td[bgcolor="#DAA534"] b');
    var userNode = userNodes.some(contains(findUser));
    if (!userNode) {return;}
    var nodeList = querySelectorAll('#pCC table table tr');
    batch(2, nodeList, 0, hideOther);
  }

  function doReportHeader() {add(3, reportHeader);}

  function injectReportPaint() { // jQuery
    if (jQueryNotPresent()) {return;}
    getMembrList(false).then(doReportHeader);
    add(2, searchUser);
    add(3, prepareChildRows);
    eventHandlers$1();
  }

  var invItems$1;
  var itemId$1;

  function guildTagged(o, el) {
    el.checked = !el.disabled && invItems$1[o.invid].guild_tag !== -1;
  }

  function tickElement(o, el) {
    el.checked = !el.disabled && !el.checked;
  }

  function allOfType(o, el) {
    if (invItems$1[o.invid] && invItems$1[o.invid].item_id === itemId$1) {
      tickElement(o, el);
    }
  }

  var types = [
    ['guild', guildTagged],
    ['item', allOfType],
    ['checkAll', tickElement]
  ];

  function thisType(type, test) {return test[0] === type;}

  function doCheck(how, o) {
    if (!o.injectHere) {return;}
    var tr = o.injectHere.parentNode;
    if (tr.classList.contains('fshHide')) {return;}
    var el = o.el.parentNode.parentNode.previousElementSibling.children[0];
    how(o, el);
  }

  function doCheckboxes(itemsAry, invItems_, type_, itemId_) {
    invItems$1 = invItems_;
    var how = types.find(partial(thisType, type_))[1];
    itemId$1 = Number(itemId_);
    itemsAry.forEach(partial(doCheck, how));
  }

  function extraButtons() {
    var tRows = getElementsByTagName(def_table, pCC)[0].rows;
    insertHtmlAfterBegin(tRows[tRows.length - 2].cells[0],
      '<input id="fshChkAll" value="Check All" type="button">&nbsp;');
  }

  function doFolderButtons$1(folders) {
    if (calf.subcmd2 === 'storeitems') {
      var formNode = getElementsByTagName('form', pCC)[0];
      if (formNode) {
        var tr = createTr({className: 'fshCenter'});
        var insertHere = createTd({colSpan: 3});
        insertElement(tr, insertHere);
        insertElementBefore(tr, formNode);
        insertHere.innerHTML = makeFolderSpans$1(folders);
        extraButtons();
      }
    }
  }

  var insertHere;

  function setInsertHere() {
    if (!insertHere) {
      var cltn = getElementsByTagName('form', pCC);
      if (cltn.length > 0) {
        insertHere = cltn[0].previousElementSibling.children[0];
      }
    }
  }

  function showHideLabel(pref) {
    if (pref) {return 'Hide';}
    return 'Show';
  }

  function doToggleButtons(showExtraLinks, showQuickDropLinks) {
    // Option toggle buttons for both screens
    setInsertHere();
    if (insertHere) {
      var inject = '[<span id="fshShowExtraLinks" class="sendLink">' +
        showHideLabel(showExtraLinks) + ' AH and UFSG links</span>]&nbsp;' +
        '[<span id="fshShowQuickDropLinks" class="sendLink">' +
        showHideLabel(showQuickDropLinks) + ' Quick Drop links</span>]&nbsp;';
      if (calf.subcmd2 === 'storeitems') {
        inject += '[<span id="fshSelectAllGuildLocked" class="sendLink">' +
          ' Select All Guild Locked</span>]&nbsp;';
      }
      insertHere.innerHTML = inject;
    }
  }

  function dropItem(invIdList) {
    return indexAjaxJson({
      cmd: 'profile',
      subcmd: 'dodropitems',
      removeIndex: invIdList,
      ajax: 1
    }).then(dialog);
  }

  function clearCheck(el) {
    el.parentNode.parentNode.previousElementSibling.children[0].checked = false;
  }

  function displayFolderItems(invItems, folderId, o) {
    var tr = o.injectHere.parentNode;
    var folder = invItems[o.invid].folder_id;
    var force = folderId !== 0 && folderId !== folder;
    toggleForce(tr, force);
    toggleForce(tr.nextElementSibling, force);
  }

  function updateList(invItems, folderId, o) {
    clearCheck(o.el);
    displayFolderItems(invItems, folderId, o);
  }

  function hideFolders$1(itemsAry, invItems, self) {
    itemsAry.forEach(partial(updateList, invItems, Number(self.dataset.folder)));
  }

  function checked(o) {
    if (!o.injectHere) {return;}
    return o.injectHere.previousElementSibling.previousElementSibling
      .children[0].checked;
  }

  const invid = (o) => o.invid;

  function itemByInvId(invId, item) {
    return invId.toString() === item.invid;
  }

  function removeInvId(itemsAry, invId) {
    var o = itemsAry.find(partial(itemByInvId, invId));
    if (o) {
      var tr = o.injectHere.parentNode;
      tr.nextElementSibling.remove();
      tr.remove();
      o.el = null;
      o.invid = null;
      o.injectHere = null;
    }
  }

  function removeInvIds(itemsAry, json) {
    if (isArray(json.r)) {
      json.r.forEach(partial(removeInvId, itemsAry));
    }
  }

  function moveList(itemsAry, folderId, list) {
    daSendToFolder(folderId, list).then(partial(removeInvIds, itemsAry));
  }

  function moveItemsToFolder(itemsAry) { // jQuery.min
    var folderId = getElementById('selectFolderId').value;
    chunk(30, itemsAry.filter(checked).map(invid))
      .forEach(partial(moveList, itemsAry, folderId));
  }

  function anotherSpinner(self) {
    self.innerHTML = '<img class="quickActionSpinner" src="' +
      imageServer +
      '/skin/loading.gif" width="15" height="15">';
  }

  function actionReturn(self, success, data) {
    if (data.r === 1) {return;}
    self.style.color = 'green';
    self.innerHTML = success;
  }

  function doAction$2(self, fn, success) {
    var itemInvId = self.getAttribute('itemInvId');
    fn([itemInvId]).then(partial(actionReturn, self, success));
  }

  function disableOtherButton(theTd, otherClass) {
    var otherButton = querySelector(otherClass, theTd);
    if (otherButton) {
      otherButton.className = 'quickAction';
      otherButton.innerHTML = '';
    }
  }

  function disableCheckbox(theTd) {
    var checkbox = theTd.parentNode.children[0].children[0];
    checkbox.checked = false;
    checkbox.disabled = true;
  }

  function quickAction(fn, success, otherClass, self) {
    self.className = 'quickAction';
    doAction$2(self, fn, success);
    hideQTip(self);
    anotherSpinner(self);
    var theTd = self.parentNode;
    disableOtherButton(theTd, otherClass);
    disableCheckbox(theTd);
  }

  var disableItemColoring$2;
  var showExtraLinks$2;
  var showQuickDropLinks$2;
  var showQuickSendLinks$1;

  function setShowExtraLinks() {
    showExtraLinks$2 = !showExtraLinks$2;
    setValue('showExtraLinks', showExtraLinks$2);
  }

  function setShowQuickDropLinks() {
    showQuickDropLinks$2 = !showQuickDropLinks$2;
    setValue('showQuickDropLinks', showQuickDropLinks$2);
  }

  function getPrefs() {
    disableItemColoring$2 = getValue('disableItemColoring');
    showExtraLinks$2 = getValue('showExtraLinks');
    showQuickDropLinks$2 = getValue('showQuickDropLinks');
    showQuickSendLinks$1 = getValue('showQuickSendLinks');
  }

  function insertHtmlBeforeBegin(parent, html) {
    insertHtml(parent, 'beforebegin', html);
  }

  function cellOneHazText(curr) {
    return curr.cells[1] && getText(curr.cells[1]);
  }

  function reduceStatTable(prev, curr, index) {
    var key = getTextTrim(curr.cells[0]).replace(':', '');
    if (!key) {return prev;}
    prev[key] = {ind: index};
    if (cellOneHazText(curr)) {
      prev[key].value = Number(getTextTrim(curr.cells[1]).replace('+', ''));
    }
    return prev;
  }

  function getVal$1(prop, obj) {
    if (obj[prop] && obj[prop].value) {
      return obj[prop].value;
    }
    return 0;
  }

  function getLastIndex(obj, tbl) {
    if (obj.Enhancements) {
      return tbl.rows[obj.Enhancements.ind - 1];
    }
    return tbl.rows[tbl.rows.length - 1];
  }

  function sum$1(statObj, prev, curr) {return prev + getVal$1(curr, statObj);}

  function calcTotalStats(statObj) {
    return ['Attack', 'Defense', 'Armor', 'Damage', 'HP']
      .reduce(partial(sum$1, statObj), 0);
  }

  function addStats(el) {
    var statTable = closestTable(el);
    var statObj = arrayFrom(statTable.rows).reduce(reduceStatTable, {});
    var totalStats = calcTotalStats(statObj);
    insertHtmlBeforeBegin(getLastIndex(statObj, statTable),
      '<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">' +
      totalStats + '&nbsp;</td></tr>');
  }

  function fshDataFilter(data) {
    var container = createDiv();
    insertHtmlBeforeEnd(container, data);
    getArrayByTagName('font', container).filter(contains('Bonuses'))
      .forEach(addStats);
    return container.innerHTML;
  }

  function fshPreFilter(options) {
    if (options.url.startsWith('fetchitem')) {
      options.dataFilter = fshDataFilter;
    }
  }

  function addStatTotalToMouseover() { // jQuery
    $.ajaxPrefilter(fshPreFilter);
  }

  var itemsAry$1;
  var itemsHash;

  function getItemImg() {
    var allTables = getElementsByTagName(def_table, pCC);
    var lastTable = allTables[allTables.length - 1];
    return getArrayByTagName('img', lastTable);
  }

  function hasTip(el) {return el.dataset.tipped;}

  function getIds(el) {
    var matches = el.dataset.tipped.match(itemRE);
    return [
      el,
      matches[1],
      matches[2]
    ];
  }

  function tally(prev, curr) {
    prev[curr[1]] = (prev[curr[1]] || 0) + 1;
    return prev;
  }

  function getInjector(ary) {
    return {
      el: ary[0],
      invid: ary[2],
      injectHere: ary[0].parentNode.parentNode.nextElementSibling
    };
  }

  function getItems$1() {
    addStatTotalToMouseover();
    getPrefs();
    doToggleButtons(showExtraLinks$2, showQuickDropLinks$2);
    var imgList = getItemImg();
    var fromTips = imgList.filter(hasTip).map(getIds);
    itemsAry$1 = fromTips.map(getInjector);
    itemsHash = fromTips.reduce(tally, {});
    // Exclude composed pots
    itemsHash[13699] = 1;
  }

  var extraLinks;
  var checkAll;
  var dropLinks;
  var invItems$2;
  var colouring$1;
  var sendLinks;

  function afterbegin(o, item) {
    if (fallback(extraLinks, !showExtraLinks$2)) {return;}
    var pattern = '<span><span class="aHLink">';
    if (!item.bound) {
      pattern += '[<a href="' + ahSearchUrl +
        encodeURIComponent(item.item_name) + '">AH</a>]';
    }
    pattern += '</span>[<a href="' + guideUrl + 'items' + def_subcmd +
      'view&item_id=' + item.item_id + '" target="_blank">UFSG</a>]</span>';
    insertHtmlAfterBegin(o.injectHere, pattern);
  }

  function itemColouring(o, item) {
    if (!colouring$1 && !disableItemColoring$2) {
      o.injectHere.classList.add(rarity[item.rarity].clas);
    }
  }

  var buildTrailer = [
    [
      function(item) {return !checkAll && itemsHash[item.item_id] !== 1;},
      function(o, item) {
        return ' [<span linkto="' + item.item_id +
          '" class="fshLink">Check all</span>]';
      }
    ],
    [
      function(item) {return !sendLinks && showQuickSendLinks$1 && !item.bound;},
      function(o) {
        return ' <span class="quickAction sendLink tip-static" ' +
          'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
          'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>';
      }
    ],
    [
      function(item) {
        return !dropLinks && showQuickDropLinks$2 && item.guild_tag === -1;
      },
      function(o) {
        return ' <span class="quickAction dropLink tip-static" itemInvId="' +
          o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
          'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>';
      }
    ]
  ];

  function condition$5(item, pair) {return pair[0](item);}

  function generateHtml(o, item, pair) {return pair[1](o, item);}

  function beforeend(o, item) {
    itemColouring(o, item);
    var pattern = buildTrailer.filter(partial(condition$5, item))
      .map(partial(generateHtml, o, item)).join('');
    if (pattern !== '') {insertHtmlBeforeEnd(o.injectHere, pattern);}
  }

  function itemWidgets(o) {
    var item = invItems$2[o.invid];
    if (item) {
      afterbegin(o, item);
      beforeend(o, item);
    }
  }

  function doneInvPaint() {
    if (showExtraLinks$2) {extraLinks = true;}
    checkAll = true;
    colouring$1 = true;
    if (showQuickDropLinks$2) {dropLinks = true;}
    sendLinks = true;
  }

  function toggleExtraLinks(o) {
    toggleForce(o.injectHere.children[0], !showExtraLinks$2);
  }

  function toggleShowExtraLinks() {
    setShowExtraLinks();
    doToggleButtons(showExtraLinks$2, showQuickDropLinks$2);
    if (!extraLinks) {
      batch(3, itemsAry$1, 0, itemWidgets, doneInvPaint);
    } else {
      itemsAry$1.forEach(toggleExtraLinks);
    }
  }

  function toggleDropLinks(o) {
    toggleForce(querySelector('.dropLink', o.injectHere), !showQuickDropLinks$2);
  }

  function toggleShowQuickDropLinks() {
    setShowQuickDropLinks();
    doToggleButtons(showExtraLinks$2, showQuickDropLinks$2);
    if (!dropLinks) {
      batch(3, itemsAry$1, 0, itemWidgets, doneInvPaint);
    } else {
      itemsAry$1.forEach(toggleDropLinks);
    }
  }

  function doCheckboxesByType(type, itemId) {
    doCheckboxes(itemsAry$1, invItems$2, type, itemId);
  }

  function selfIds() {
    return [
      [selfIdIs('fshShowExtraLinks'), toggleShowExtraLinks],
      [selfIdIs('fshShowQuickDropLinks'), toggleShowQuickDropLinks],
      [selfIdIs('fshSelectAllGuildLocked'),
        partial(doCheckboxesByType, 'guild', null)],
      [selfIdIs('fshMove'), partial(moveItemsToFolder, itemsAry$1)],
      [selfIdIs('fshChkAll'), partial(doCheckboxesByType, 'checkAll', null)]
    ];
  }

  function evts() {
    return selfIds().concat([
      [
        function(self) {return self.hasAttribute('linkto');},
        function(self) {
          doCheckboxesByType('item', self.getAttribute('linkto'));
        }
      ],
      [partial(hasClass, 'sendLink'),
        partial(quickAction, daSendItems, 'Sent', '.dropLink')],
      [partial(hasClass, 'dropLink'),
        partial(quickAction, dropItem, 'Dropped', '.sendLink')],
      [partial(hasClass, 'fshFolder'), partial(hideFolders$1, itemsAry$1, invItems$2)]
    ]);
  }

  function badData(data) {
    return !data || !data.items || !data.folders;
  }

  function inventory$3(data) {
    if (badData(data) || !itemsAry$1) {return;}
    extraLinks = false;
    checkAll = false;
    invItems$2 = data.items;
    colouring$1 = false;
    dropLinks = false;
    sendLinks = false;
    batch(3, itemsAry$1, 0, itemWidgets, doneInvPaint);
    doFolderButtons$1(data.folders);
    on(pCC, 'click', eventHandler5(evts()));
  }

  function injectStoreItems() {
    if (jQueryNotPresent()) {return;}
    getInventoryById().then(inventory$3);
    add(3, getItems$1);
  }

  var inventory$4 = {
    report: injectReportPaint,
    addtags: injectGuildAddTagsWidgets,
    removetags: injectGuildAddTagsWidgets,
    storeitems: injectStoreItems
  };

  function removeCrlf(fshTxt) {
    fshTxt.value = fshTxt.value.replace(/\r\n|\n|\r/g, ' ');
  }

  function setDoChat(el) {
    el.setAttribute('form', 'dochat');
  }

  function giveFormId() {
    var formList = getElementsByTagName('form', pCC);
    formList[0].id = 'dochat';
    return formList[0];
  }

  function giveInputsId() {
    var filteredList = getArrayByTagName('input', pCC).slice(0, 7);
    filteredList.forEach(setDoChat);
    return filteredList[5];
  }

  function rearrangeTable(btnMass) {
    var theTable = querySelector('#pCC table table');
    theTable.rows[0].cells[0].remove();
    var myCell = theTable.insertRow(-1).insertCell(-1);
    insertElement(myCell, btnMass);
    var ourTd = theTable.rows[0].cells[0];
    ourTd.rowSpan = 2;
    return ourTd;
  }

  function keypress$1(sendBtn, evt) {
    if (evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      clickThis(sendBtn);
    }
  }

  function makeTextArea(sendBtn) {
    var fshTxt = createTextArea({
      cols: 72,
      name: 'msg',
      required: true,
      rows: 2
    });
    setDoChat(fshTxt);
    on(fshTxt, 'keypress', partial(keypress$1, sendBtn));
    return fshTxt;
  }

  function hasTextEntry() {
    var btnMass = querySelector('input[value="Send As Mass"]');
    if (!btnMass) {return;}
    var theForm = giveFormId();
    var sendBtn = giveInputsId();
    var ourTd = rearrangeTable(btnMass);
    var fshTxt = makeTextArea(sendBtn);
    ourTd.replaceChild(fshTxt, ourTd.children[0]);
    on(theForm, 'submit', partial(removeCrlf, fshTxt));
  }

  function addChatTextArea() {
    if (!getValue('enhanceChatTextEntry') || !pCC) {return;}
    hasTextEntry();
  }

  function searchPlayerHref(targetPlayerName) {
    return '<a href="' + showPlayerUrl + targetPlayerName + '">' +
      targetPlayerName + '</a>';
  }

  function getPlayer(playerAry) { // Legacy
    if (playerAry) {return Number(playerAry[1]);}
    return 0;
  }

  function msgDoesNotIncludePlayer(aRow) {
    var messageHTML = aRow.cells[2].innerHTML;
    var doublerPlayerMessageRE =
      /member\s<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/;
    var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
    var singlePlayerMessageRE =
      /<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/;
    var firstPlayer = singlePlayerMessageRE.exec(messageHTML);
    var firstPlayerID = getPlayer(firstPlayer);
    var secondPlayerID = getPlayer(secondPlayer);
    return firstPlayer &&
      firstPlayerID !== playerId() &&
      secondPlayerID !== playerId();
  }

  function stripClassName(el) {el.className = '';}

  function findPlayers(aRow) { // Legacy
    if (msgDoesNotIncludePlayer(aRow)) {
      arrayFrom(aRow.cells).forEach(stripClassName);
      aRow.classList.add('fshGrey');
      aRow.classList.add('fshXSmall');
    }
  }

  function dimIfNotMe(aRow, hasInvited, targetPlayerName) {
    if (!hasInvited && targetPlayerName !== playerName$1()) {
      $(aRow).find('td').removeClass('row').css('font-size', 'xx-small');
      aRow.style.color = 'gray';
    }
  }

  function likeInvite(aRow, hasInvited) {
    var message = aRow.cells[2].innerHTML;
    var parts = message.split('\'');
    var targetPlayerName = parts[1];
    parts[1] = searchPlayerHref(targetPlayerName);
    aRow.cells[2].innerHTML = parts.join('\'');
    dimIfNotMe(aRow, hasInvited, targetPlayerName);
  }

  function guildInvite(aRow) { // Legacy
    var msg = getText(aRow.cells[2]);
    var hasInvited = msg.includes('has invited the player');
    if (msg.charAt(0) === '\'' || hasInvited) {
      likeInvite(aRow, hasInvited);
    }
  }

  function processGuildWidgetRow(aRow) { // Legacy
    findPlayers(aRow);
    guildInvite(aRow);
  }

  function getMessageHeader() {
    return getArrayByTagName('td', pCC).find(contains('Message'));
  }

  function guildLogWidgetsEnabled() { // Legacy
    var messageNameCell = getMessageHeader();
    if (!messageNameCell) {return;}
    var logTable = messageNameCell.parentNode.parentNode.parentNode;
    messageNameCell.innerHTML += '&nbsp;&nbsp;<span class="fshWhite">' +
      '(Guild Log messages not involving self are dimmed!)</span>';
    arrayFrom(logTable.rows).filter(dataRows(3, 0))
      .forEach(processGuildWidgetRow);
  }

  function addGuildLogWidgets() {
    if (getValue('hideNonPlayerGuildLogMessages')) {
      guildLogWidgetsEnabled();
    }
  }

  function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
    var passthru = '';
    if (buffList) {passthru = '&blist=' + buffList;}
    return 'href=\'javascript:window.openWindow("' + quickbuffUrl + '&tid=' +
      aPlayerId + passthru + '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
  }

  var nowUtc;
  var lastCheckUtc;

  function findChatTable() {
    var chatTable = querySelector('#pCC table table table table'); // Guild Chat
    if (!chatTable) {
      chatTable = querySelector('#pCC > table:last-of-type'); // Outbox, Guild Log & personal log
    }
    return chatTable;
  }

  function isOldRow(postAgeMins, postDateUtc) {
    return postAgeMins > 20 && postDateUtc <= lastCheckUtc;
  }

  function chatRowBuffLink(aRow, logScreen, addBuffTag) { // Legacy
    if (logScreen === 'Chat' && addBuffTag) {
      var playerIDRE = /player_id=(\d+)/;
      var playerID = playerIDRE.exec(aRow.cells[1].innerHTML)[1];
      aRow.cells[1].innerHTML += ' <a class="fshBf" ' +
        quickBuffHref(playerID) + '>[b]</a>';
    }
  }

  function rowColor(logScreen, dateColumn, aRow) { // Legacy
    var addBuffTag = true;
    var postDateUtc = parseDateAsTimestamp$1(getTextTrim(aRow.cells[dateColumn]));
    var postAgeMins = (nowUtc - postDateUtc) / (1000 * 60);
    if (postDateUtc > lastCheckUtc) {
      aRow.classList.add('fshNr');
    } else if (isOldRow(postAgeMins, postDateUtc)) {
      aRow.classList.add('fshOr');
      addBuffTag = false;
    }
    chatRowBuffLink(aRow, logScreen, addBuffTag);
  }

  function getLastCheck(lastCheckScreen) {
    return getValue(lastCheckScreen) || nowUtc;
  }

  function doLogColoring(logScreen, dateColumn, chatTable) { // Legacy
    nowUtc = (new Date()).setUTCSeconds(0, 0) - 1;
    var lastCheckScreen = 'last' + logScreen + 'Check';
    lastCheckUtc = getLastCheck(lastCheckScreen);
    arrayFrom(chatTable.rows).filter(dataRows(3, 0))
      .forEach(partial(rowColor, logScreen, dateColumn));
    setValue(lastCheckScreen, nowUtc);
  }

  function addLogColoring(logScreen, dateColumn) { // Legacy
    if (!getValue('enableLogColoring')) {return;}
    var chatTable = findChatTable();
    if (chatTable) {doLogColoring(logScreen, dateColumn, chatTable);}
  }

  var specials = {"0": "Dull Edge was activated.","1": "@0 was afflicted by Super Elite Slayer.","2": "@0 was withered.","3": "@0\"s armor was shattered.","4": "@0 was infused with extra defense (Constitution).","5": "@0 was infused with extra armor (Sanctuary).","7": "@0 activated Spectral Knight reducing targets armor to zero.","8": "@0 activated Savagery.","9": "@0 activated Shield Strike.","13": "@0 activated Conserve.","17": "@0 activated Four Leaf.","18": "@0 leeched the buff \"@1\".","19": "@0\"s demoralize skill reduced the effectiveness of @1\"s enhancements.","20": "@0\"s reckoning has improved their skill \"@1\"","21": "@0 was mesmerized by Spell Breaker, losing the \"@1\" buff.","22": "@0 was turned Undead by Necrosis.","23": "@0 activated High Guard.","24": "@0 was smote.","25": "@0 activated Barricade.","26": "@0 activated Ageless.","27": "@0 activated Severe Condition.","28": "@0 activated Golden Shield.","29": "@0 activated Anti Deflect.","30": "@0 activated Sealed. (Negated @1)","31": "@0 activated Fist Fight.","33": "@0 activated Dispel Curse.","35": "@0 activated Heavy Weight.","37": "@0 had their armor and defence Inverted.","38": "@0 had their attack reduced by Fumble."};

  let combatCache = {};

  function currentCombatRecord(data, combatId, sevenDays) {
    return combatId === 'lastCheck' || data[combatId].logTime &&
      data[combatId].logTime > sevenDays;
  }

  function keepRecent(data, sevenDays, prev, combatId) {
    if (currentCombatRecord(data, combatId, sevenDays)) {
      prev[combatId] = data[combatId];
    }
    return prev;
  }

  function cleanCache(data) {
    var sevenDays = nowSecs - 7 * 24 * 60 * 60;
    combatCache = Object.keys(data)
      .reduce(partial(keepRecent, data, sevenDays), {});
    combatCache.lastCheck = nowSecs;
    setForage('fsh_pvpCombat', combatCache);
  }

  function prepareCache(data) {
    var oneDay = nowSecs - 24 * 60 * 60;
    if (!data.lastCheck || data.lastCheck < oneDay) {
      cleanCache(data);
    } else {
      combatCache = data;
    }
  }

  function checkCache(data) {
    if (data) {prepareCache(data);}
  }

  function initCache() {
    return getForage('fsh_pvpCombat').then(checkCache);
  }

  function inSpecialsList(el) {
    return el.id in specials;
  }

  function check(specialHtml, el, i) {
    if (!inSpecialsList(el)) {
      var label = JSON.stringify(el) + ' ' + getText(specialHtml[i]);
      console.log(label); // eslint-disable-line no-console
      sendEvent('Logs', 'Missing PvP Special', label);
    }
  }

  function whatsMissing(json, html) {
    var specialHtml = querySelectorAll('#specialsDiv', createDocument(html));
    json.r.specials.forEach(partial(check, specialHtml));
  }

  function unknownSpecials(json) {
    if (!json.r.specials.every(inSpecialsList)) {
      combatView(json.r.id).then(partial(whatsMissing, json));
    }
  }

  function cacheCombat(aRow, json) {
    if (json.s) {
      json.logTime = parseDateAsTimestamp$1(getTextTrim(aRow.cells[1])) / 1000;
      combatCache[json.r.id] = json;
      setForage('fsh_pvpCombat', combatCache);
      unknownSpecials(json);
    }
    return json;
  }

  function result(stat, desc, color) {
    if (stat !== 0) {
      return desc + ':<span class="' + color + '">' +
        addCommas(stat) + ' </span>';
    }
    return '';
  }

  function iDefended(json) {
    return json.r.defender.id === playerId() && json.r.winner === 1;
  }

  function iAttacked(json) {
    return json.r.attacker.id === playerId() && json.r.winner === 0;
  }

  function iWon(json) {
    if (iDefended(json) || iAttacked(json)) {
      return 'fshGreen';
    }
    return 'fshRed';
  }

  function highlightSpecials(prev, el) {
    if (el.id === 18) {
      return prev + '<br><span class="fshRed fshBold">' + el.params[0] +
        ' leeched the buff \'' + el.params[1] + '\'.</span>';
    }
    if (el.id === 21) {
      return prev + '<br><span class="fshRed fshBold">' + el.params[0] +
        ' was mesmerized by Spell Breaker, losing the \'' + el.params[1] +
        '\' buff.</span>';
    }
    return prev;
  }

  function parseCombat(combatSummary, json) {
    if (!json.s) {return;}
    var color = iWon(json);
    combatSummary.innerHTML = result(json.r.xp_gain, 'XP stolen', color) +
      result(json.r.gold_gain, 'Gold lost', color) +
      result(json.r.gold_stolen, 'Gold stolen', color) +
      result(json.r.pvp_prestige_gain, 'Prestige gain', color) +
      result(json.r.pvp_rating_change, 'PvP change', color) +
      json.r.specials.reduce(highlightSpecials, '');
  }

  function processCombat(aRow) {
    var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
    var combatSummary = createDiv({style: {color: 'gray'}});
    insertElement(aRow.cells[2], combatSummary);
    if (combatCache[combatID] && combatCache[combatID].logTime) {
      parseCombat(combatSummary, combatCache[combatID]);
    } else {
      daViewCombat(combatID).then(partial(cacheCombat, aRow))
        .then(partial(parseCombat, combatSummary));
    }
  }

  function replaceLeadingText(msgCell, newHtml) {
    var replaceText = createSpan({innerHTML: newHtml});
    msgCell.replaceChild(replaceText, msgCell.firstChild); // Text Node
  }

  function parseCombatWinner(msgCell) {
    var victory = /You were victorious over/.test(msgCell.innerHTML);
    if (victory) {
      replaceLeadingText(msgCell,
        'You were <span class="fshGreen">victorious</span> over ');
      return 1;
    }
    var defeat = /You were defeated by/.test(msgCell.innerHTML);
    if (defeat) {
      replaceLeadingText(msgCell,
        'You were <span class="fshRed">defeated</span> by ');
      return 0;
    }
  }

  function processCombatRow(aRow) {
    var winner = parseCombatWinner(aRow.cells[2]);
    if ([0, 1].includes(winner)) {processCombat(aRow);}
  }

  var combatRowTests = [
    function(aRow, messageType) {return messageType === 'Combat';},
    function() {return calf.showPvPSummaryInLog;},
    function(aRow) {
      return aRow.cells[2] && /combat_id=/.test(aRow.cells[2].innerHTML);
    },
    function(aRow) {
      return !/\(Guild Conflict\)/.test(getText(aRow.cells[2]));
    }
  ];

  function condition$6(aRow, messageType, e) {return e(aRow, messageType);}

  function isCombatRow(aRow, messageType) {
    return combatRowTests.every(partial(condition$6, aRow, messageType));
  }

  function addPvpSummary(aRow, messageType) {
    // add PvP combat log summary
    if (isCombatRow(aRow, messageType)) {processCombatRow(aRow);}
  }

  function thisNick(nick, buffObj) {
    return csvSplit(buffObj.nicks).includes(toLowerCase(nick));
  }

  function getBuffId$1(nick) {
    return buffList.find(partial(thisNick, nick)).id;
  }

  function doBuffLink(targetPlayerID, buffsSent) {
    var href = '';
    if (buffsSent) {
      href = quickBuffHref(targetPlayerID,
        csvSplit(buffsSent[0].replace(/`~|~`/g, '')).map(getBuffId$1).join(';'));
    } else {
      href = quickBuffHref(targetPlayerID);
    }
    return ' | <a ' + href + '>Buff</a></span>';
  }

  function removeHTML(buffName) {
    return buffName.replace(/<\/?[^>]+(>|$)/g, '');
  }

  function reportIgnore(aRow, isGuildMate, playerName) { // Legacy
    var extraPart = '';
    var dateHTML = aRow.cells[1].innerHTML;
    var dateFirstPart = dateHTML
      .substring(0, dateHTML.indexOf('>Report') + 7);
    var dateLastPart = dateHTML
      .substring(dateHTML.indexOf('Message</a>') + 11, dateHTML.length);
    if (!isGuildMate) {
      extraPart = ' | <a title="Add to Ignore List" href="' + doAddIgnore +
        playerName + '">Ignore</a>';
    }
    aRow.cells[1].innerHTML = dateFirstPart + '</a>' + extraPart +
      dateLastPart;
  }

  function makeFirstPart(messageHTML) {
    return messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
  }

  function makeMsgReplyTo(playerName, firstPart) {
    var replyTo = '';
    if (calf.enableChatParsing) {
      replyTo = removeHTML(firstPart.replace(/&nbsp;/g, ' ')).substr(0, 140);
    }
    return '[ <span style="cursor:pointer;text-' +
    'decoration:underline"class="a-reply" target_player="' + playerName +
    '" replyTo="' + replyTo + '...">Reply</span>';
  }

  function makeExtraPart(playerName) {
    return ' | <a href="' + tradeUrl + playerName +
      '">Trade</a> | <a title="Secure Trade" href="' +
      secureUrl + playerName + '">ST</a>';
  }

  function getThirdPart(messageHTML) { // Legacy
    var thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10,
      messageHTML.indexOf('>Buff</a>') + 9);
    var targetPlayerRE = /quickBuff\((\d+)\)/.exec(thirdPart);
    if (targetPlayerRE) {
      return doBuffLink(targetPlayerRE[1], messageHTML.match(/`~.*?~`/));
    }
    return '';
  }

  function getAttackPart(playerName) { // Legacy
    if (calf.addAttackLinkToLog) {
      return ' | <a href="' + attackplayerUrl + playerName + '">Attack</a>';
    }
    return '';
  }

  function makeFourthPart(messageHTML) {
    return messageHTML.substring(messageHTML
      .indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
  }

  function makeLastPart(messageHTML) {
    return messageHTML.substring(messageHTML.indexOf('</small>'),
      messageHTML.length);
  }

  function messageExtras(aRow, playerName) {
    var messageHTML = aRow.cells[2].innerHTML;
    var firstPart = makeFirstPart(messageHTML);
    aRow.cells[2].innerHTML = firstPart + '<nobr>' +
      makeMsgReplyTo(playerName, firstPart) + makeExtraPart(playerName) +
      getThirdPart(messageHTML) + getAttackPart(playerName) +
      makeFourthPart(messageHTML) + '</nobr>' + makeLastPart(messageHTML);
  }

  function isChat(aRow, isGuildMate, playerName) { // Legacy
    reportIgnore(aRow, isGuildMate, playerName);
    messageExtras(aRow, playerName);
  }

  function doChat(messageType, aRow, isGuildMate, playerName) { // Legacy
    if (messageType === 'Chat') {isChat(aRow, isGuildMate, playerName);}
  }

  function isLadderReset(aRow) {
    return aRow.cells[2] &&
      /You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
        .test(getText(aRow.cells[2]));
  }

  function saveLastResetTime(aRow) {
    var logTime = parseDateAsTimestamp$1(getTextTrim(aRow.cells[1]));
    if (logTime > calf.lastLadderReset) {
      setValue('lastLadderReset', logTime);
      calf.lastLadderReset = logTime;
    }
  }

  function processLadder(aRow, messageType) {
    if (messageType === 'Notification' && isLadderReset(aRow)) {
      saveLastResetTime(aRow);
    }
  }

  // import results from '../---/arena/results';

  function getPvpId(aRow) {
    return aRow.cells[2] && /pvp_id=(\d+)/.exec(aRow.cells[2].innerHTML);
  }

  // function processResults(json) {
  //   console.log(json);
  // }

  function havePvpId(aRow, pvpId) { // eslint-disable-line
    // results(pvpId).then(processResults);
    // console.log(aRow, pvpId); // eslint-disable-line no-console
  }

  // TODO Pref
  function viewCombat$2(aRow) {
    const pvpId = getPvpId(aRow);
    if (pvpId) {havePvpId(aRow, pvpId[1]);}
  }

  var memberNamesAsStrings = [];
  var listOfAllies$1;
  var listOfEnemies$1;

  function setColour(el, col) {
    el.classList.add(col);
  }

  function isEnemy(playerName, playerElement) {
    if (listOfEnemies$1.includes(playerName)) {
      setColour(playerElement, 'fshRed');
    }
  }

  function isAlly(playerName, playerElement) {
    if (listOfAllies$1.includes(playerName)) {
      setColour(playerElement, 'fshBlue');
    }
  }

  function playerColor(colorPlayerName, playerName, playerElement) {
    if (!colorPlayerName) {return false;}
    if (memberNamesAsStrings.includes(playerName)) {
      setColour(playerElement, 'fshGreen');
      return true;
    }
    isEnemy(playerName, playerElement);
    isAlly(playerName, playerElement);
    return false;
  }

  function getKeys(data) {
    memberNamesAsStrings = Object.keys(data);
  }

  function justUsername(obj) {
    return obj.username;
  }

  function prepareAlliesEnemies(data) {
    listOfAllies$1 = data._allies.map(justUsername);
    listOfEnemies$1 = data._enemies.map(justUsername);
  }

  function getCalfVars() {
    [
      'showPvPSummaryInLog',
      'lastLadderReset',
      'enableChatParsing'
    ].forEach(getCalfPrefs);
  }

  function doMsgHeader(logTable) {
    var messageHeader = logTable.rows[0].cells[2];
    if (messageHeader) {
      insertHtmlBeforeEnd(messageHeader, '&nbsp;&nbsp;' +
        '<span class="fshWhite">(Guild mates show up in ' +
        '<span class="fshGreen">green</span>)</span>');
    }
  }

  function canIgnore(aRow, playerName, isGuildMate) {
    if (!isGuildMate) {
      var dateExtraText = '<nobr><span style="font-size:x-small;">' +
        '[ <a title="Add to Ignore List" href="' + doAddIgnore + playerName +
        '">Ignore</a> ]</span></nobr>';
      aRow.cells[1].innerHTML = aRow.cells[1].innerHTML + '<br>' +
        dateExtraText;
    }
  }

  function addExtraStuff(aRow, playerName, isGuildMate) { // Legacy
    canIgnore(aRow, playerName, isGuildMate);
    var buffingPlayerIDRE = /player_id=(\d+)/;
    var buffingPlayerID = buffingPlayerIDRE
      .exec(aRow.cells[2].innerHTML)[1];
    var buffingPlayerName = getTextTrim(aRow.cells[2].children[0]);
    var extraText = ' <span style="font-size:x-small;"><nobr>' +
      '[ <span style="cursor:pointer;text-decoration:underline" ' +
      'class="a-reply" target_player="' + buffingPlayerName +
      '">Reply</span> | <a href="' + tradeUrl + buffingPlayerName +
      '">Trade</a> | <a title="Secure Trade" href="' + secureUrl +
      buffingPlayerName + '">ST</a>';
    extraText += doBuffLink(buffingPlayerID);
    if (calf.addAttackLinkToLog) {
      extraText += ' | <a href="' + attackplayerUrl + buffingPlayerName +
        '">Attack</a>';
    }
    extraText += ' ]</nobr></span>';

    aRow.cells[2].innerHTML += extraText;
  }

  function hasPlayerLink(aRow) {
    return aRow.cells[2].children[0] &&
      aRow.cells[2].children[0].nodeName === 'A' &&
      /player_id/.test(aRow.cells[2].children[0].href);
  }

  function doExtraStuff(aRow, messageType, playerName, isGuildMate) {
    if (messageType === 'Notification' && hasPlayerLink(aRow)) {
      addExtraStuff(aRow, playerName, isGuildMate);
    }
  }

  function doLogWidgetRow(aRow, messageType) { // Legacy
    var playerElement;
    var playerName;
    var colorPlayerName = false;
    if (hasPlayerLink(aRow)) {
      playerElement = aRow.cells[2].children[0];
      playerName = getTextTrim(playerElement);
      colorPlayerName = true;
    }
    var isGuildMate = playerColor(colorPlayerName, playerName, playerElement);
    doChat(messageType, aRow, isGuildMate, playerName);
    doExtraStuff(aRow, messageType, playerName, isGuildMate);
  }

  function processLogWidgetRow(aRow) { // Legacy
    var messageType = aRow.cells[0].children[0].getAttribute('oldtitle');
    if (messageType) {
      doLogWidgetRow(aRow, messageType);
      addPvpSummary(aRow, messageType);
      processLadder(aRow, messageType);
      viewCombat$2(aRow);
    }
  }

  function processTableRows(logTable) {
    arrayFrom(logTable.rows).filter(dataRows(3, 0)).forEach(processLogWidgetRow);
  }

  function openMsgDialog(evt) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'),
      '', evt.target.getAttribute('replyTo'));
  }

  function foundLogTable(logTable) { // Legacy
    getCalfVars();
    doMsgHeader(logTable);
    processTableRows(logTable);
    $('.a-reply').on('click', openMsgDialog);
  }

  function addLogWidgetsOld() { // Legacy
    calf.addAttackLinkToLog = getValue('addAttackLinkToLog');
    var logTable = querySelector('#pCC > table:last-of-type');
    if (logTable) {foundLogTable(logTable);}
  }

  function addLogWidgets() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    var prm = [
      myStats(false).then(prepareAlliesEnemies),
      initCache()
    ];
    if (currentGuildId()) {prm.push(getMembrList(false).then(getKeys));}
    allthen(prm, addLogWidgetsOld);
  }

  function guildChatStyling() {
    var chatTable = querySelector('#pCC table table table table');
    if (!chatTable) {return;}
    chatTable.classList.add('fshGc');
  }

  function guildChat() {
    addChatTextArea();
    guildChatStyling();
    addLogColoring('Chat', 0);
  }

  function guildLog() {
    addLogColoring('GuildLog', 1);
    addGuildLogWidgets();
  }

  function outbox() {
    addLogColoring('OutBox', 1);
  }

  function playerLog() {
    addLogColoring('PlayerLog', 1);
    addLogWidgets();
  }

  var guild$2 = {
    inventory: inventory$4,
    chat: {'-': guildChat},
    dochat: {'-': guildChat},
    log: {'-': guildLog},
    groups: groups,
    manage: {'-': injectGuild},
    advisor: advisor,
    history: {'-': injectBioWidgets},
    view: {'-': injectGuild},
    scouttower: {'-': injectScouttower},
    mailbox: {'-': guildMailbox},
    ranks: {'-': injectGuildRanks},
    conflicts: {rpupgrades: injectRPUpgrades},
    bank: {'-': injectGuildBank},
    hall: hall
  };

  function injectBank() {
    ajaxifyBank({
      headSelector: '#pCC h2',
      headText: 'Bank',
      appLink: true,
      depoPos: 1,
      balPos: 0,
      data: {
        cmd: 'bank',
        subcmd: 'transaction'
      },
      initWithdraw: ''
    });
  }

  var ItemId;
  var bazaarTable =
    '<table id="fshBazaar"><tr><td colspan="5">Select an item to quick-buy:' +
    '</td></tr><tr><td colspan="5">Select how many to quick-buy</td></tr>' +
    '<tr><td colspan="5"><input id="buy_amount" class="fshNumberInput" ' +
    'type="number" min="0" max="99" value="1"></td></tr><tr><td>@0@</td>' +
    '<td>@1@</td><td>@2@</td><td>@3@</td><td>@4@</td></tr><tr><td>@5@</td>' +
    '<td>@6@</td><td>@7@</td><td>@8@</td><td>@9@</td></tr><tr>' +
    '<td colspan="3">Selected item:</td><td id="selectedItem" colspan="2">' +
    '</td></tr><tr><td colspan="5">' +
    '<span id="fshBazaarWarning" class="fshHide">' +
    'Warning:<br>pressing [<span id="fshBuy" class="fshLink">This button' +
    '</span>] now will buy the <span id="quantity">1</span> item(s) WITHOUT ' +
    'confirmation!</span></td></tr><tr><td colspan="5">' +
    '<span id="buyResultLabel"></span><ol id="buy_result"></ol>' +
    '</td>' +
    '</tr></table>';
  var bazaarItem =
    '<span class="bazaarButton tip-dynamic" style="background-image: ' +
    'url(\'@src@\');" itemid="@itemid@" data-tipped="@tipped@"></span>';

  function testBuyAmount() {
    return testQuant(getElementById('buy_amount').value);
  }

  function buyTarget(target, theValue) {
    setText(theValue, getElementById('quantity'));
    ItemId = target.getAttribute('itemid');
    getElementById('fshBazaarWarning').removeAttribute('class');
    var dupNode = target.cloneNode(false);
    dupNode.className = 'bazaarSelected tip-dynamic';
    var selected = getElementById('selectedItem');
    selected.innerHTML = '';
    insertElement(selected, dupNode);
  }

  function select(evt) {
    var target = evt.target;
    if (!target.classList.contains('bazaarButton')) {return;}
    var theValue = testBuyAmount();
    if (!theValue) {return;}
    buyTarget(target, theValue);
  }

  function quantity() {
    var theValue = testBuyAmount();
    if (theValue) {
      setText(theValue, getElementById('quantity'));
    }
  }

  function done(json) {
    var buyResult = getElementById('buy_result');
    if (jsonFail(json, buyResult)) {return;}
    if (json.s) {
      outputResult('You purchased the item!', buyResult);
    }
  }

  function buy() { // jQuery.min
    if (!ItemId) {return;}
    var buyAmount = getText(getElementById('quantity'));
    setText('Buying ' + buyAmount + ' items', getElementById('buyResultLabel'));
    for (var i = 0; i < buyAmount; i += 1) {
      daBazaarBuy(ItemId).then(done);
    }
  }

  function doMiniatures(el, i) {
    var item = el.children[0];
    var tipped = item.dataset.tipped;
    bazaarTable = bazaarTable
      .replace('@' + i + '@', bazaarItem)
      .replace('@src@', item.getAttribute('src'))
      .replace('@itemid@', tipped.match(/\?item_id=(\d+)/)[1])
      .replace('@tipped@', tipped);
  }

  function evtHandlers() {
    on(getElementById('fshBazaar'), 'click', select);
    on(getElementById('buy_amount'), 'input', quantity);
    on(getElementById('fshBuy'), 'click', buy);
  }

  function injectBazaar() { // TODO stop using getElementById
    if (jQueryNotPresent()) {return;}
    var pbImg = getElementsByTagName('img', pCC)[0];
    pbImg.className = 'fshFloatLeft';
    getArrayByTagName('a', pCC).forEach(doMiniatures);
    bazaarTable = bazaarTable.replace(/@\d@/g, '');
    insertHtmlBeforeEnd(pbImg.parentNode, bazaarTable);
    evtHandlers();
  }

  function updateUrl$3(evt) {
    evt.preventDefault();
    dontPost(closestForm(evt.target));
  }

  function allowBack$2(findPlayerButton) {
    on(findPlayerButton, 'click', updateUrl$3);
  }

  function searchUrl(min, max, guild) {
    return searchPlayerUrl +
      '&search_level_min=' + min +
      '&search_level_max=' + max +
      '&search_in_guild=' + guild;
  }

  function shortcuts() {
    return '&nbsp;<a class="fshBlue" href="' +
      searchUrl(pvpLowerLevel, pvpUpperLevel, '-1') +
      '">Get PvP targets</a>&nbsp;<a class="fshBlue" href="' +
      searchUrl(gvgLowerLevel, gvgUpperLevel, '1') +
      '">Get GvG targets</a>';
  }

  function doShortcuts(findPlayerButton) {
    findPlayerButton.parent().append(shortcuts());
  }

  function doFindPlayer() {
    var findPlayerButton = $('input[value="Find Player"]');
    allowBack$2(findPlayerButton[0]);
    doShortcuts(findPlayerButton);
  }

  function addBuffLinks(i, e) {
    var id = /player_id=([0-9]*)/.exec($(e).attr('href'));
    $(e).after(' <a class="fshBf" ' + quickBuffHref(id[1]) + '>[b]</a>');
  }

  function doBuffLinks$2() {
    $('table[class="width_full"]').find('a[href*="player_id"]')
      .each(addBuffLinks);
  }

  function injectFindPlayer() { // Bad jQuery
    if (jQueryNotPresent()) {return;}
    calculateBoundaries();
    doFindPlayer();
    doBuffLinks$2();
  }

  function makeQtLabel(id, text, injector) {
    var lbl = createLabel({
      id: id,
      className: 'sendLink',
      htmlFor: 'fshQuickTake',
      textContent: 'Toggle ' + text
    });
    insertElementBefore(lbl, injector);
    return lbl;
  }

  function reduceItems(prev, curr) {
    var img = curr.children[0];
    var tipped = img.dataset.tipped;
    var itemIDs = itemRE.exec(tipped);
    if (!itemIDs) {return prev;}
    var itemId = itemIDs[1];
    var invId = itemIDs[2];
    if (prev[itemId]) {
      prev[itemId].invIds.push(invId);
    } else {
      prev[itemId] = {
        invIds: [invId],
        tipped: tipped.replace(/&extra=\d/, ''),
        src: img.src
      };
    }
    return prev;
  }

  function basicQt() {
    return createDiv({
      id: 'quickTake',
      innerHTML: '<div class="fshCenter">' +
        '<br><font size="3"><b>Quick Take</b></font><br><br>' +
        'Select which item to take all similar items from your Mailbox.' +
      '</div><div></div>'
    });
  }

  function makeTakeResult(qt) {
    var takeContainer = createDiv();
    var takeResult = createUl();
    insertElement(takeContainer, takeResult);
    insertElement(qt, takeContainer);
    return takeResult;
  }

  function makeItemBox(itemTbl, pair) {
    var item = pair[1];
    var container = createDiv();
    var itemDiv = createDiv({
      innerHTML: '<img src="' + item.src + '" class="tip-dynamic" ' +
        'data-tipped="' + item.tipped + '">'
    });
    insertElement(container, itemDiv);
    var buttonDiv = createDiv({
      innerHTML: '<button class="fshBl fshBls" data-id="' + pair[0] +
        '">Take All ' + item.invIds.length + '</button>'
    });
    insertElement(container, buttonDiv);
    insertElement(itemTbl, container);
  }

  function makeItemBoxes(itemTbl, itemList) {
    Object.entries(itemList).forEach(partial(makeItemBox, itemTbl));
  }

  function killQTip(itemId) { // jQuery
    var qtipApi = $('#temp-inv-img-' + itemId).qtip('api');
    if (qtipApi) {qtipApi.destroy(true);}
  }

  function removeImg(item) {
    killQTip(item.id);
    var thisCell = getElementById('temp-inv-' + item.id);
    if (thisCell) {thisCell.innerHTML = '';}
  }

  function takeSuccess(takeResult, json) {
    json.r.forEach(removeImg);
    outputResult(json.r.length.toString() + ' item(s) taken.', takeResult);
  }

  function doneTake(takeResult, json) {
    if (jsonFail(json, takeResult)) {return;}
    if (isArray(json.r)) {takeSuccess(takeResult, json);}
  }

  function doTakeItem(takeResult, el) {
    daMailboxTake(el).then(partial(doneTake, takeResult));
  }

  function takeSimilar(itemList, takeResult, self) { // jQuery.min
    var type = self.dataset.id;
    var invIds = itemList[type].invIds;
    self.parentNode.innerHTML = 'taking all ' + invIds.length + ' items';
    chunk(40, invIds).forEach(partial(doTakeItem, takeResult));
  }

  function clickEvt(itemList, takeResult, evt) {
    if (evt.target.classList.contains('fshBls')) {
      takeSimilar(itemList, takeResult, evt.target);
    }
  }

  function makeItemTable(itemList, qt, takeResult) {
    var itemTbl = createDiv({className: 'fshTakeGrid'});
    makeItemBoxes(itemTbl, itemList);
    insertElement(qt, itemTbl);
    on(itemTbl, 'click', partial(clickEvt, itemList, takeResult));
  }

  function makeQtDiv(itemList) {
    var qt = basicQt();
    var takeResult = makeTakeResult(qt);
    insertElement(qt, createDiv());
    makeItemTable(itemList, qt, takeResult);
    insertElement(pCC, qt);
  }

  function toggleQuickTake(items, injector) {
    makeQtLabel('qtOn', 'Mailbox', injector);
    var itemList = items.reduce(reduceItems, {});
    makeQtDiv(itemList);
  }

  function makeQtCheckbox(items, injector) {
    var qtCheckbox = createInput({
      id: 'fshQuickTake',
      type: 'checkbox'
    });
    insertElementBefore(qtCheckbox, injector);
    once(qtCheckbox, 'change',
      partial(toggleQuickTake, items, injector));
  }

  function injectMailbox() {
    if (jQueryNotPresent()) {return;}
    var items = getArrayByTagName('a', pCC);
    if (items.length === 0) {return;} // Empty mailbox
    var injector = pCC.lastElementChild;
    makeQtCheckbox(items, injector);
    makeQtLabel('qtOff', 'Quick Take', injector);
  }

  var bpc;

  function bp$1() {
    if (!bpc) {
      bpc = getElementById('backpackContainer');
    }
    return bpc;
  }

  var elementTests = [
    function(self) {return self.tagName === 'A';},
    function(self) {return Boolean(self.href);},
    function(self) {return self.href.includes('togglesection');}
  ];

  function condition$7(self, fn) {return fn(self);}

  function isSectionToggle(self) {
    return elementTests.every(partial(condition$7, self));
  }

  function oldStyleDiv(target) {
    if (target.style.display === 'block') {
      hideElement(target);
    }
    target.removeAttribute('style');
    return 0;
  }

  function toggleTarget(target) {
    if (target.hasAttribute('style')) {
      oldStyleDiv(target);
    } else {
      target.classList.toggle('fshHide');
    }
  }

  function toggleSection(self) {
    var sectionId = Number(getCustomUrlParameter(self.href, 'section_id'));
    if (sectionId === 5) {
      toggleTarget(bp$1());
    } else {
      toggleTarget(self.parentNode.parentNode.nextElementSibling);
    }
  }

  function testForSection(evt) {
    var self = evt.target;
    if (isSectionToggle(self)) {
      toggleSection(self);
      retryAjax(self.href);
      evt.preventDefault();
    }
  }

  function ajaxifyProfileSections() {
    on(pCC, 'click', testForSection);
  }

  var componentList;

  function tallyComponent(prev, el) {
    prev[el.b] = prev[el.b] || {
      a: el.a,
      b: el.b,
      count: 0,
      del: [],
      v: el.v
    };
    prev[el.b].count += 1;
    prev[el.b].del.push(el.a);
    return prev;
  }

  function prepareComponentList(data) {
    componentList = data.r.reduce(tallyComponent, {});
  }

  function tallyTableRow(prev, comp) {
    return prev + '<tr><td><img src="' + imageServer + '/items/' + comp.b +
      '.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?' +
      'item_id=' + comp.b + '&inv_id=' + comp.a + '&t=2&p=' + playerId() +
      '&vcode=' + comp.v + '"></td><td>' + comp.count +
      '</td><td>[<span class="sendLink compDelType" data-compid="' + comp.b +
      '">Del</span>]</td></tr>';
  }

  function makeTallyTbody(data) {
    var tBody = createTBody();
    prepareComponentList(data);
    insertHtmlBeforeEnd(tBody,
      '<tr><td colspan="3">Component Summary</td></tr>' +
      Object.values(componentList).reduce(tallyTableRow, ''));
    return tBody;
  }

  function makeTotalCell(tbl) {
    var totRow = tbl.insertRow(-1);
    insertHtmlBeforeEnd(totRow, '<td>Total:</td>');
    var totCell = totRow.insertCell(-1);
    totCell.colSpan = 2;
    return totCell;
  }

  function makeUsedCount(data) {
    var usedCount = data.r.length;
    var usedCountDom = createSpan();
    usedCountDom.innerHTML = usedCount.toString();
    return usedCountDom;
  }

  function makeTotalRow(tbl, data) {
    var totCell = makeTotalCell(tbl);
    insertElement(totCell, makeUsedCount(data));
    insertTextBeforeEnd(totCell, ' / ' + data.h.cm.toString());
  }

  function makeTallyTable(data) {
    var tbl = createTable({className: 'fshTblCenter', id: 'fshTally'});
    insertElement(tbl, makeTallyTbody(data));
    makeTotalRow(tbl, data);
    return tbl;
  }

  function displayComponentTally(self, data) {
    if (!isArray(data.r)) {return;}
    var sumComp = self.parentNode;
    if (sumComp) {
      sumComp.innerHTML = '';
      insertElement(sumComp, makeTallyTable(data));
    }
  }

  function countComponent(self) { // jQuery.min
    sendEvent('components', 'countComponent');
    daComponents().then(partial(displayComponentTally, self));
  }

  function decorateButton(label) {
    var parentDiv = createDiv();
    var innerSpan = createSpan({
      className: 'sendLink ' + toLowerCase(label).replace(/ /g, '-'),
      textContent: label
    });
    setText('[', parentDiv);
    insertElement(parentDiv, innerSpan);
    insertHtmlBeforeEnd(parentDiv, ']');
    return parentDiv;
  }

  var invTableCache;

  function getInvTable() {
    if (!invTableCache) {
      var invTables = getElementsByClassName('inventory-table',
        getElementById('profileRightColumn'));
      if (invTables.length === 2) {invTableCache = invTables[1];}
    }
    return invTableCache;
  }

  var visibleCache;

  function getComponents$2(prev, x) {
    var matches = x.dataset.tipped.match(itemRE);
    prev[matches[2]] = x.parentNode.parentNode;
    return prev;
  }

  function getVisibleComponents() {
    if (!visibleCache) {
      var nodeList = getArrayByTagName('img', getInvTable());
      visibleCache = nodeList.reduce(getComponents$2, {});
    }
    return visibleCache;
  }

  function blatElement(visibleComponents, a) {
    if (visibleComponents[a]) {visibleComponents[a].innerHTML = '';}
  }

  function deleteVisible(ary) {
    ary.forEach(partial(blatElement, getVisibleComponents()));
  }

  function updateUsedCount(del) {
    var invTableParent = getInvTable().parentNode;
    if (!invTableParent) {return;}
    var fshTally = invTableParent.children[2].children[1].children[0];
    if (fshTally.tagName !== 'TABLE') {return;}
    var tallyRows = fshTally.rows;
    var usedCountDom = tallyRows[tallyRows.length - 1].cells[1].children[0];
    var usedCount = Number(getText(usedCountDom));
    usedCount -= del;
    setText(usedCount, usedCountDom);
  }

  function doSpinner(td) {
    td.innerHTML = '';
    td.className = 'guildTagSpinner';
    td.style.backgroundImage = 'url(\'' + imageServer +
      '/skin/loading.gif\')';
  }

  function destroyed(data) {
    if (data.s) {
      deleteVisible(data.r);
      updateUsedCount(data.r.length);
    }
  }

  function removeSpinner(td) {td.parentNode.remove();}

  function destroy(el) {
    return daDestroyComponent(el).then(destroyed);
  }

  function delCompType(self) { // jQuery.min
    var toDelete = componentList[self.dataset.compid].del;
    var td = self.parentNode;
    doSpinner(td);
    var prm = chunk(30, toDelete).map(destroy);
    allthen(prm, partial(removeSpinner, td));
  }

  function updateComponentCounts(itemId) {
    var delBtn = querySelector('#fshTally [data-compid="' + itemId + '"]');
    if (!delBtn) {return;}
    var countDom = delBtn.parentNode.parentNode.children[1];
    var count = Number(getText(countDom)) - 1;
    setText(count, countDom);
  }

  function compDeleted(self, itemId, data) {
    if (data.s) {
      updateComponentCounts(itemId);
      updateUsedCount(1);
      if (self.parentNode) {self.parentNode.innerHTML = '';}
    }
  }

  function delComponent(self) { // jQuery.min
    var tipped = self.parentNode.children[0].children[0].dataset.tipped;
    var matches = tipped.match(itemRE);
    var itemId = matches[1];
    var componentId = matches[2];
    daDestroyComponent([componentId])
      .then(errorDialog)
      .then(partial(compDeleted, self, itemId));
  }

  var buttonLabels = [
    'Enable Quick Del',
    'Count Components',
    'Quick Extract Components'
  ];

  function addButtons(prev, el) {
    insertElement(prev, decorateButton(el));
    return prev;
  }

  function componentBtnContainer() {
    return buttonLabels.reduce(addButtons, createDiv({className: 'fshCenter'}));
  }

  function quickExtractHandler() {
    sendEvent('components', 'insertQuickExtract');
    jQueryDialog(insertQuickExtract);
  }

  function addDelBtn(el) {
    insertHtmlBeforeEnd(el.parentNode.parentNode,
      '<span class="compDelBtn">Del</span>');
  }

  function enableDelComponent(self) {
    sendEvent('components', 'enableDelComponent');
    var quickDelDiv = self.parentNode;
    hideElement(quickDelDiv);
    var cmDiv = quickDelDiv.parentNode;
    insertElement(cmDiv, decorateButton('Delete All Visible'));
    getArrayByTagName('img', getInvTable()).forEach(addDelBtn);
  }

  function delAllComponent(self) {
    sendEvent('components', 'delAllComponent');
    var thisInvTable = self.parentNode.parentNode.parentNode.children[0];
    getArrayByClassName('compDelBtn', thisInvTable).forEach(clickThis);
  }

  var classEvts$1 = [
    ['quick-extract-components', quickExtractHandler],
    ['enable-quick-del', enableDelComponent],
    ['delete-all-visible', delAllComponent],
    ['compDelBtn', delComponent],
    ['count-components', countComponent],
    ['compDelType', delCompType]
  ];

  function addComposingButtons(thisInvTable) {
    var compDiv = thisInvTable.parentNode;
    insertElement(compDiv, componentBtnContainer());
    on(compDiv, 'click', classHandler(classEvts$1));
  }

  function components$1() {
    var thisInvTable = getInvTable();
    if (!thisInvTable) {return;}
    addComposingButtons(thisInvTable);
  }

  function fetchdata(data) {
    return retryAjax({
      cache: false,
      url: 'fetchdata.php',
      data: extend(data, {_rnd: rnd()}),
      dataType: 'json'
    });
  }

  let disableDeactivatePrompts$2;
  const success = json => json && json.response && json.response.response === 0;
  const removeskill = buffId => fetchdata({a: 22, id: buffId});

  function debuffSuccess(aLink, json) {
    if (success(json)) {aLink.parentNode.innerHTML = '';}
  }

  function doDebuff(aLink) { // jQuery.min
    sendEvent('profile', 'doDebuff');
    var buffId = aLink.href.match(/(\d+)$/)[1];
    removeskill(buffId).then(errorDialog).then(partial(debuffSuccess, aLink));
  }

  function doPrompt(aLink) {
    var onclick = aLink.getAttribute('onclick');
    var warn = onclick
      .match(/Are you sure you wish to remove the .* skill\?/)[0];
    jConfirm('Remove Skill', warn, partial(doDebuff, aLink));
  }

  function checkForPrompt(aLink) {
    if (!disableDeactivatePrompts$2) {
      doPrompt(aLink);
    } else {
      doDebuff(aLink);
    }
  }

  function interceptDebuff(e) {
    var aLink = e.target;
    if (aLink.tagName === 'IMG') {
      hideQTip(e.target);
      aLink = aLink.parentNode;
    } else if (aLink.tagName !== 'A') {return;}
    e.stopPropagation();
    e.preventDefault();
    checkForPrompt(aLink);
  }

  function fastDebuff() {
    var profileRightColumn = getElementById('profileRightColumn');
    if (profileRightColumn) {
      disableDeactivatePrompts$2 = getValue('disableDeactivatePrompts');
      on(profileRightColumn.lastElementChild, 'click', interceptDebuff, true);
    }
  }

  function highlightPvpProtection$2() {
    if (!getValue('highlightPvpProtection')) {return;}
    var pvpp = querySelector('#profileLeftColumn a[href="' + pointsUrl + '"]');
    if (getTextTrim(pvpp.parentNode.nextSibling) !== 'N/A') { // Text Node
      pvpp.parentNode.parentNode.style.cssText = 'border: 3px solid red'; // TODO
    }
  }

  var THEBACKPACK = 0;
  var RESULT = 1;
  var SELF = 2;
  var INVID = 3;

  function restyleBackpack() {
    var bpBack = getElementById('backpack');
    bpBack.className = 'fshBackpack';
    bpBack.removeAttribute('style');
  }

  function thisInvId(_invId, el) {return el.a === _invId;}

  function backpackRemove$1(theBackpack, invId) { // jQuery.min
    var _invId = Number(invId);
    // remove from srcData
    var i = theBackpack.srcData.findIndex(partial(thisInvId, _invId));
    if (i !== -1) {theBackpack.srcData.splice(i, 1);}
  }

  function actionResult$1(ary, data) {
    if (data.r !== 0) {
      ary[SELF].remove();
      return;
    }
    backpackRemove$1(ary[THEBACKPACK], ary[INVID]);
    ary[SELF].classList.remove('fshSpinner');
    ary[SELF].parentNode.innerHTML = '<span class="fastWorn">' +
      ary[RESULT] + '</span>';
  }

  function fastAction(theBackpack, evt, action, result) { // jQuery.min
    sendEvent('profile', 'fastAction - ' + result);
    var self = evt.target;
    var invId = self.parentNode.parentNode.children[0].dataset.inv;
    setText('', self);
    self.className = 'fastAction fshSpinner fshSpinner12';
    action(invId).then(partial(actionResult$1, [theBackpack, result, self, invId]));
  }

  function evtHdl$2(theBackpack, evt) {
    if (evt.target.classList.contains('fastWear')) {
      fastAction(theBackpack, evt, equipItem, 'Worn');
    }
    if (evt.target.classList.contains('fastUse')) {
      fastAction(theBackpack, evt, useItem$1, 'Used');
    }
  }

  function actionClass(usable) {
    if (usable) {return 'fastUse';}
    return 'fastWear';
  }

  function actionText(usable) {
    if (usable) {return 'Use';}
    return 'Wear';
  }

  function drawButtons(self, theSpan) {
    var toUse = theSpan.classList.contains('backpackContextMenuUsable');
    var myDiv = createDiv({
      className: 'fastDiv',
      innerHTML: '<span class="sendLink fastAction ' + actionClass(toUse) + '">' +
        actionText(toUse) + '</span>'
    });
    if (self.options.checkboxesEnabled) {
      insertElement(myDiv,
        theSpan.parentNode.nextElementSibling.nextElementSibling);
    }
    insertElement(theSpan.parentNode.parentNode, myDiv);
  }

  function fastWearLinks(self) {
    var items = querySelectorArray(
      '#backpackTab_' + self.type.toString() +
      ' .backpackContextMenuEquippable,.backpackContextMenuUsable');
    items.forEach(partial(drawButtons, self));
  }

  function updateSrc(img, gif) {
    const url = imageServer + '/' + gif + '.gif';
    if (img.src !== url) {img.src = url;}
  }

  function doFolder(thisFolder, img) {
    if (img.dataset.folder === thisFolder) {
      updateSrc(img, 'folder_on');
    } else {
      updateSrc(img, 'folder');
    }
  }

  function fixFolders(theBackpack) {
    querySelectorArray('.backpackFolderImage')
      .forEach(partial(doFolder, String(theBackpack.folderId)));
  }

  function foundBackpack(backpackContainer, theBackpack) {
    var oldShow = theBackpack._showPage;
    theBackpack._showPage = function(type, page) {
      if (!theBackpack.tabData) {return;}
      fixFolders(theBackpack);
      oldShow.call(theBackpack, type, page);
      fastWearLinks(theBackpack);
    };
    if (getText(getElementById('backpack_current')).length !== 0) {
      add(3, fastWearLinks, [theBackpack]);
    }
    on(backpackContainer, 'click', partial(evtHdl$2, theBackpack));
  }

  function initialiseFastWear() {
    var backpackContainer = getElementById('backpackContainer');
    var theBackpack = $(backpackContainer).data('hcsBackpack');
    if (theBackpack) {foundBackpack(backpackContainer, theBackpack);}
  }

  function injectFastWear() { // jQuery
    if (!getValue('enableQuickDrink')) {return;}
    restyleBackpack();
    initialiseFastWear();
  }

  var profileCombatSetDiv;

  function clearBox(link, json) {
    if (json.s) {
      link.parentNode.innerHTML = '';
    }
  }

  function removeItem(link) {
    var item = /inventory_id=(\d+)/.exec(link.href)[1];
    if (item) {
      daUnequipItem(item).then(partial(clearBox, link));
    }
  }

  function getNekid() {
    sendEvent('profile', 'nekidBtn');
    var profileBlock = profileCombatSetDiv.nextElementSibling;
    getArrayByTagName('a', profileBlock).forEach(removeItem);
  }

  function makeButton$2() {
    var nekidDiv = createDiv({className: 'fshCenter'});
    var theBtn = createButton({
      className: 'fshBl fshBls',
      textContent: 'Nekid'
    });
    insertTextBeforeEnd(nekidDiv, '[ ');
    insertElement(nekidDiv, theBtn);
    insertTextBeforeEnd(nekidDiv, ' ]');
    on(theBtn, 'click', getNekid);
    return nekidDiv;
  }

  function nekidBtn() {
    var profileRightColumn = getElementById('profileRightColumn');
    profileCombatSetDiv = getElementById('profileCombatSetDiv');
    var targetBr = profileCombatSetDiv.parentNode.nextElementSibling;
    var nekidDiv = makeButton$2();
    profileRightColumn.replaceChild(nekidDiv, targetBr);
  }

  function replaceDoubleSpace(str) {
    return str.replace(/\s\s+/g, ' ');
  }

  var guildId$1;
  var currentGuildRelationship;
  var myGuildMsgs = [
    ['self', 'fshGreen', 'guildSelfMessage'],
    ['friendly', 'fshOliveDrab', 'guildFrndMessage'],
    ['old', 'fshDarkCyan', 'guildPastMessage'],
    ['enemy', 'fshRed', 'guildEnmyMessage']
  ];
  var typeMapping = [
    ['guildFrnd', 'friendly'],
    ['guildPast', 'old'],
    ['guildEnmy', 'enemy']
  ];

  function guildAry(pref) {
    var val = shouldBeArray(pref);
    if (val) {
      return val.map(replaceDoubleSpace).map(toLowerCase);
    }
    return [];
  }

  function expandList(arr) {
    return [guildAry(arr[0]), arr[1]];
  }

  function buildScenario() {
    return typeMapping.map(expandList);
  }

  function hasRelationship(txt, el) {
    return el[0].includes(txt);
  }

  function externalRelationship(_txt) {
    var scenario = buildScenario();
    var txt = replaceDoubleSpace(toLowerCase(_txt));
    var relObj = scenario.find(partial(hasRelationship, txt));
    if (relObj) {return relObj[1];}
  }

  function thisGuildId(aLink) {
    var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
    if (guildIdResult) {return Number(guildIdResult[1]);}
  }

  function guildRelationship(aLink) {
    guildId$1 = thisGuildId(aLink);
    if (guildId$1 && guildId$1 === currentGuildId()) {
      setValue('guildSelf', getText(aLink));
      return 'self';
    }
    return externalRelationship(getText(aLink));
  }

  function whichMsg(arr) {return arr[0] === currentGuildRelationship;}

  function setMsg$1(aLink) {
    var thisGuildRel = myGuildMsgs.find(whichMsg);
    aLink.parentNode.classList.add(thisGuildRel[1]);
    insertHtmlBeforeEnd(aLink.parentNode, '<br>' + getValue(thisGuildRel[2]));
  }

  function foundGuildLink(aLink) {
    currentGuildRelationship = guildRelationship(aLink);
    if (currentGuildRelationship) {
      setMsg$1(aLink);
    }
  }

  function profileInjectGuildRel(self) {
    var aLink = querySelector(
      '#pCC a[href^="' + guildViewUrl + '"]');
    if (aLink) {
      foundGuildLink(aLink);
    } else if (self) {
      setValue('guildSelf', '');
    }
  }

  function joinGroups() {
    if (!getValue('enableMaxGroupSizeToJoin')) {
      return '<a class="quickButton buttonJoinAll tip-static" ' +
        'href="' + joinallUrl + '" ' +
        'data-tipped="Join All Groups" style="background-image: url(\'' +
        imageServer +
        '/skin/icon_action_join.gif\');"></a>&nbsp;&nbsp;';
    }
    var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    return '<a class="quickButton buttonJoinUnder tip-static" href="' +
      joinUnderUrl + '" data-tipped="Join All Groups < ' + maxGroupSizeToJoin +
      ' Members" style="background-image: url(\'' + imageServer +
      '/skin/icon_action_join.gif\');"></a>&nbsp;&nbsp;';
  }

  function showRecallButton(playername) {
    if (currentGuildRelationship === 'self') {
      return '<a class="quickButton tip-static" href="' + recallUserUrl +
        playername + '" data-tipped="Recall items from ' + playername +
        '" style="background-image: url(\'' + imageServer +
        '/temple/3.gif\');"></a>&nbsp;&nbsp;';
    }
    return '';
  }

  function showRankButton(playerid, playername) {
    if (currentGuildRelationship === 'self' && getValue('showAdmin')) {
      return '<a class="quickButton buttonGuildRank tip-static" href="' +
        guildSubcmdUrl + 'members&subcmd2=changerank&member_id=' +
        playerid + '" data-tipped="Rank ' + playername +
        '" style="background-image: url(\'' + imageServer +
        '/guilds/' + guildId$1 + '_mini.png\');"></a>&nbsp;&nbsp;';
    }
    return '';
  }

  function profileInjectQuickButton(avyImg, playerid, playername) {
    var newhtml = '<div align="center">';
    newhtml += '<a class="quickButton buttonQuickBuff tip-static" ' +
      quickBuffHref(playerid) + 'data-tipped="Buff ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/skin/realm/icon_action_quickbuff.gif\');"></a>&nbsp;&nbsp;';
    newhtml += joinGroups();
    newhtml += '<a class="quickButton tip-static" ' +
      'href="' + auctionhouseUrl + '&type=-3&tid=' + playerid +
      '" data-tipped="Go to ' + playername +
      '\'s auctions" style="background-image: url(\'' +
      imageServer + '/skin/gold_button.gif\');"></a>&nbsp;&nbsp;';
    newhtml += '<a class="quickButton tip-static" href="' + secureUrl +
      playername + '" data-tipped="Create Secure Trade to ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/temple/2.gif\');"></a>&nbsp;&nbsp;';
    newhtml += showRecallButton(playername);
    newhtml += showRankButton(playerid, playername);
    newhtml += '</div>';
    insertHtmlAfterEnd(avyImg, newhtml);
  }

  function totalKey(isAllies) {
    if (isAllies) {return 'alliestotal';}
    return 'enemiestotal';
  }

  function contactSlots(numberOfContacts, contactsTotal) {
    if (contactsTotal && contactsTotal >= numberOfContacts) {
      return '/' + contactsTotal;
    }
    return '';
  }

  function countContacts(isAllies, el) {
    var target = el.parentNode;
    var numberOfContacts = getElementsByTagName(def_table,
      target.nextElementSibling).length - 1;
    insertHtmlBeforeEnd(target,
      '<span class="fshBlue">&nbsp;' + numberOfContacts.toString() +
      contactSlots(numberOfContacts, getValue(totalKey(isAllies))) +
      '</span>');
  }

  function profileParseAllyEnemy() {
    // Allies/Enemies count/total function
    var headings = querySelectorArray('#profileLeftColumn strong');
    headings.filter(contains('Allies')).forEach(partial(countContacts, true));
    headings.filter(contains('Enemies')).forEach(partial(countContacts, false));
  }

  function doRender(bioCell) {
    var bioContents = bioCell.innerHTML;
    bioContents = renderBio(bioContents);
    if (bioContents) {
      bioCell.innerHTML = bioContents;
    }
  }

  function selfRender(self) {
    return self && getValue('renderSelfBio');
  }

  function otherRender(self) {
    return !self && getValue('renderOtherBios');
  }

  function shouldRender(self) {
    return selfRender(self) || otherRender(self);
  }

  function testForRender(self, bioCell) {
    if (shouldRender(self)) {
      doRender(bioCell);
    }
  }

  function profileRenderBio(self) {
    var bioCell = getElementById('profile-bio');
    if (!bioCell) {return;}
    testForRender(self, bioCell);
    if (getValue('enableBioCompressor')) {add(3, compressBio, [bioCell]);}
    on(bioCell, 'click', bioEvtHdl);
  }

  function openQwDialog() {
    sendEvent('profile', 'insertQuickWear');
    jQueryDialog(insertQuickWear);
  }

  function quickWearLink() {
    // quick wear manager link
    var node = querySelector('#profileRightColumn a[href="' + cmdUrl +
      'profile&subcmd=togglesection&section_id=2"]');
    if (!node) {return;}
    var wrap = createSpan({innerHTML: '&nbsp;['});
    var qw = createSpan({className: 'sendLink', innerHTML: 'Quick&nbsp;Wear'});
    insertElement(wrap, qw);
    insertTextBeforeEnd(wrap, ']');
    insertElement(node.parentNode, wrap);
    on(qw, 'click', openQwDialog);
  }

  function profileSelectAll() {
    var bpTabs = getElementById('backpack_tabs');
    var type = getElementsByClassName('tab-selected', bpTabs)[0]
      .getAttribute('data-type');
    var items = querySelectorArray('#backpackTab_' + type +
      ' li:not(.hcsPaginate_hidden) .backpackItem');
    if (items.length === 0) {return;}
    var checkboxes = querySelectorArray('#backpackTab_' + type +
      ' li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)');
    if (checkboxes.length > 0) {items = checkboxes;}
    items.forEach(clickThis);
  }

  function selectAllLink() {
    // select all link
    var node = querySelector('#profileRightColumn a[href="' +
      dropItemsUrl + '"]');
    if (!node) {return;}
    var allSpan = createSpan({className: 'smallLink', textContent: 'All'});
    on(allSpan, 'click', profileSelectAll);
    var wrapper = createSpan({innerHTML: '[&nbsp;'});
    insertElement(wrapper, allSpan);
    insertHtmlBeforeEnd(wrapper, '&nbsp;]&nbsp;');
    insertElement(node.parentNode, wrapper);
  }

  function sameAsLevel(virtualLevel) {
    return intValue(valueText(
      getElementsByClassName(def_statLevel))) === virtualLevel;
  }

  function storeVL() {
    // store the VL of the player
    var virtualLevel = parseInt(getText(getElementById(def_statVl)), 10);
    if (sameAsLevel(virtualLevel)) {
      setValue(def_characterVirtualLevel, ''); // ?
    } else {
      setValue(def_characterVirtualLevel, virtualLevel);
    }
  }

  function thisText(thisNode) {
    return arrayFrom(thisNode.childNodes)
      .filter(el => el.nodeType === 3)
      .map(getTextTrim)
      .join('');
  }

  function getDefStat() {
    return Number(thisText(getElementById(def_statDefense)));
  }

  function calcNmvEffect(atkStat, oldTipped) {
    var lvlAry = /\(Level: (\d+)\)/.exec(oldTipped);
    var nmvLvl = Number(lvlAry[1]);
    return Math.floor(atkStat * nmvLvl * 0.0025);
  }

  function gotAtk(nmvImg, atkStat) {
    var defStat = getDefStat();
    var oldTipped = nmvImg.dataset.tipped;
    var nmvEffect = calcNmvEffect(atkStat, oldTipped);
    nmvImg.dataset.tipped = oldTipped.slice(0, -15) +
      '<br>Attack: ' + (atkStat - nmvEffect).toString() +
      '&nbsp;&nbsp;Defense: ' + (defStat + nmvEffect).toString() +
      '</center></div>';
  }

  function gotImg(nmvImg) {
    var atkEl = getElementById(def_statAttack);
    if (!atkEl) {return;}
    var atkStat = Number(thisText(atkEl));
    if (!isNaN(atkStat)) {gotAtk(nmvImg, atkStat);}
  }

  function updateNmv() {
    var nmvImg = querySelector('#profileRightColumn img[src$="/60_sm.gif"]');
    if (nmvImg) {gotImg(nmvImg);}
  }

  function removeStatTable(el) {
    var tde = getElementsByTagName('td', el);
    el.parentNode.innerHTML = '<span id="' + tde[0].id + '">' +
      tde[0].innerHTML.replace(/&nbsp;/g, ' ').trim() +
      '</span> <div class="profile-stat-bonus">' + getText(tde[1]) + '</div>';
  }

  function updateStatistics() {
    var charStats = getElementsByTagName(def_table,
      getElementById('profileLeftColumn'))[0];
    getArrayByTagName(def_table, charStats).forEach(removeStatTable);
  }

  function ifSelf(self) {
    if (self) {
      // self inventory
      fastDebuff();
      profileParseAllyEnemy();
      injectFastWear();
      components$1();
      quickWearLink();
      selectAllLink();
      storeVL();
      nekidBtn();
      ajaxifyProfileSections();
    }
  }

  function guildRelationship$1(avyImg, playername, self) {
    // Must be before profileInjectQuickButton
    profileInjectGuildRel(self);
    // It sets up guildId and currentGuildRelationship
    var playerid = fallback(getUrlParameter('player_id'), playerId());
    profileInjectQuickButton(avyImg, playerid, playername);
  }

  function updateDom(avyImg, playername, self) {
    ifSelf(self);
    guildRelationship$1(avyImg, playername, self);
    updateNmv();
    updateStatistics();
    highlightPvpProtection$2();
    add(3, profileRenderBio, [self]);
    addStatTotalToMouseover();
    add(3, colouredDots);
  }

  function updateUrl$4(e) {
    e.preventDefault();
    var validInputs = arrayFrom(e.target.closest('form').elements)
      .filter(i => i.type !== 'submit')
      .map(i => i.name + '=' + i.value).join('&');
    window.location = indexPhp + '?' + validInputs;
  }

  function allowBack$3(self) {
    if (!self) {
      on(querySelector('#profileRightColumn'), 'submit', updateUrl$4);
    }
  }

  function injectProfile() { // Legacy
    if (jQueryNotPresent()) {return;}
    var avyImg = querySelector('#profileLeftColumn img[oldtitle*="\'s Avatar"]');
    if (!avyImg) {return;}
    var playername = getText(getElementsByTagName('h1', pCC)[0]);
    var self = playername === playerName$1();
    updateDom(avyImg, playername, self);
    allowBack$3(self);
  }

  function getActivitySpan(myPlayer) {
    var activity = querySelector('span.fshLastActivity', myPlayer);
    if (!activity) {
      activity = createSpan({className: 'fshLastActivity'});
      var player = getElementsByTagName('h1', myPlayer)[0];
      insertElementAfter(activity, player);
    }
    return activity;
  }

  function addStatsQuickBuff(data) {
    var myPlayer = querySelector('div.player[data-username="' +
      data.username + '"]');
    var activity = getActivitySpan(myPlayer);
    activity.innerHTML = 'Last Activity: ' +
      formatLastActivity(data.last_login) +
      '<br>Stamina: ' + data.current_stamina + ' / ' +
      data.stamina + ' ( ' + Math.floor(data.current_stamina /
      data.stamina * 100) + '% )';
  }

  function parseBuffLevel(el) {
    return Number(getText(el).replace(/\[|\]/g, ''));
  }

  function newPlayerSpan(el, playerSpan) {
    if (!playerSpan) {
      var ret = createSpan({className: 'fshPlayer'});
      insertElementAfter(ret, el.nextElementSibling);
      return ret;
    }
    return playerSpan;
  }

  function getBuffColor(myLvl, playerBuffLevel) {
    if (myLvl > playerBuffLevel) {return 'fshRed';}
    return 'fshGreen';
  }

  function buffRunning(el, playerBuffLevel, playerSpan) {
    if (!playerBuffLevel) {
      playerSpan.innerHTML = '';
      return;
    }
    var lvlSpan = el.nextElementSibling.children[0].children[0];
    var myLvl = parseBuffLevel(lvlSpan);
    var fshPlayerSpan = newPlayerSpan(el, playerSpan);
    var buffColor = getBuffColor(myLvl, playerBuffLevel);
    fshPlayerSpan.innerHTML = ' <span class="' + buffColor +
      '">[' + playerBuffLevel + ']</span>';
  }

  function thisBuff$1(myBuffName, arr) {
    return arr[0] === myBuffName;
  }

  function thisBuffLevel(playerData, el) {
    var myBuffName = el.getAttribute('data-name');
    var buffArr = playerData.find(partial(thisBuff$1, myBuffName));
    if (buffArr) {return buffArr[1];}
  }

  function hazBuff(playerData, el) {
    var playerBuffLevel = thisBuffLevel(playerData, el);
    var playerSpan = el.nextElementSibling.nextElementSibling;
    if (playerBuffLevel || playerSpan) {
      buffRunning(el, playerBuffLevel, playerSpan);
    }
  }

  function shred(str) {
    return str.split(/ \[|]/);
  }

  function makeBuffArray(player) {
    return csvSplit(getText(player.parentNode.lastElementChild)).map(shred);
  }

  function addBuffLevels(evt) {
    var player = evt.target;
    if (player.tagName !== 'H1') {return;}
    getProfile(getText(player)).then(addStatsQuickBuff);
    var playerData = makeBuffArray(player);
    querySelectorArray('#buff-outer input[name]')
      .forEach(partial(hazBuff, playerData));
  }

  var quickBuffHeader =
    '<div id="helperQBheader"><table class="quickbuffTable"><thead><tr>' +
    '<th class="quickbuffTableHeader">Sustain</th>' +
    '<th class="quickbuffTableHeader">Fury Caster</th>' +
    '<th class="quickbuffTableHeader">Guild Buffer</th>' +
    '<th class="quickbuffTableHeader">Buff Master</th>' +
    '<th class="quickbuffTableHeader">Extend</th>' +
    '<th class="quickbuffTableHeader">Reinforce</th>' +
    '</tr></thead><tbody><tr>' +
    '<td id="fshSus" class="quickbuffTableDetail">&nbsp;</td>' +
    '<td id="fshFur" class="quickbuffTableDetail">&nbsp;</td>' +
    '<td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td>' +
    '<td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td>' +
    '<td id="fshExt" class="quickbuffTableDetail">&nbsp;</td>' +
    '<td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td>' +
    '</tr></tbody></table></div>';
  var excludeBuff = [
    50, // Death Dealer
    54, // Counter Attack
    55, // Summon Shield Imp
    56, // Vision
    60, // Nightmare Visage
    61, // Quest Finder
    98, // Barricade
    101 // Severe Condition
  ];

  function addStamCost(el, nameSpan) {
    var dataTipped = nameSpan.dataset.tipped;
    var cost = el.previousElementSibling.dataset.cost;
    nameSpan.dataset.tipped = dataTipped
      .replace('</center>', '<br>Stamina Cost: ' + cost + '$&');
  }

  function canBeDimmed(el, nameSpan) {
    return !excludeBuff.includes(Number(el.htmlFor.slice(6))) &&
      parseBuffLevel(nameSpan.children[0]) < 125;
  }

  function dimPreReqs(el, nameSpan) {
    if (canBeDimmed(el, nameSpan)) {
      el.classList.add('fshDim');
    }
  }

  function decorate$2(el) {
    var nameSpan = el.children[0];
    addStamCost(el, nameSpan);
    dimPreReqs(el, nameSpan);
  }

  function doLabels() {
    querySelectorArray('#buff-outer label[for^="skill-"]').forEach(decorate$2);
  }

  function tickBuff(id) {
    var thisBuff = getElementById('skill-' + id);
    if (thisBuff) {
      thisBuff.checked = true;
    }
  }

  function tickBuffs(passThru) {
    passThru.split(';').forEach(tickBuff);
  }

  function doPassThru() {
    var passThru = getUrlParameter('blist');
    if (passThru) {tickBuffs(passThru);}
  }

  var retries = 0;

  function waitForPlayer(firstPlayer) {
    return !firstPlayer && retries < 9;
  }

  function haveTargets() {
    var firstPlayer = getElementsByTagName('h1', getElementById('players'))[0];
    if (waitForPlayer(firstPlayer)) {
      retries += 1;
      setTimeout(haveTargets, 100);
      return;
    }
    if (!firstPlayer) {return;}
    clickThis(firstPlayer);
  }

  function firstPlayerStats() {
    var targets = getElementById('targetPlayers').value;
    if (targets) {haveTargets();}
  }

  function buffTimeLeft(_s) {
    var m = Math.floor(_s / 60);
    var s = _s % 60;
    var buffTimeToExpire = outputFormat(m, 'm');
    if (m > 0 && s > 0) {buffTimeToExpire += ' ';}
    buffTimeToExpire += outputFormat(s, 's');
    return buffTimeToExpire;
  }

  function timeToExpire(s) {
    var buffTimeToExpire = buffTimeLeft(s);
    return '<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(' +
      buffTimeToExpire + ')</span>';
  }

  function isAvailable(buff) {
    var elem = querySelector('#buff-outer input[data-name="' + buff + '"]');
    if (elem) {
      return '<span class="quickbuffActivate" data-buffid="' + elem.value +
        '">Activate</span>';
    }
    return '<span class="fshRed;">Off</span>';
  }

  function buffRunning$1(dict, buff) {
    var s = dict[buff] || 0;
    if (s) {return timeToExpire(s);}
    return isAvailable(buff);
  }

  function getBuff$1(dict, buff, inject) {
    inject.innerHTML = buffRunning$1(dict, buff);
  }

  function makeDictionary(prev, curr) {
    prev[curr.name] = curr.duration;
    return prev;
  }

  function populateBuffs(responseText) {
    var skl = responseText._skills.reduce(makeDictionary, {});
    getBuff$1(skl, 'Guild Buffer', getElementById('fshGB'));
    getBuff$1(skl, 'Buff Master', getElementById('fshBM'));
    getBuff$1(skl, 'Extend', getElementById('fshExt'));
    getBuff$1(skl, 'Reinforce', getElementById('fshRI'));
  }

  function thisName(name, enhancement) {
    return enhancement.name === name;
  }

  function thisEnhancementLevel(enhancements, name) {
    var thisEnhancement = enhancements.find(partial(thisName, name));
    return thisEnhancement && thisEnhancement.value || 0;
  }

  function getEnhancement(enhancements, name, inject) {
    var enhLevel = thisEnhancementLevel(enhancements, name);
    var enhClass = 'fshLime';
    if (enhLevel < 100) {enhClass = 'fshRed';}
    inject.innerHTML = '<span class="' + enhClass + '">' + enhLevel + '%</span>';
  }

  function populateEnhancements(responseText) {
    var enh = responseText._enhancements;
    getEnhancement(enh, 'Sustain', getElementById('fshSus'));
    getEnhancement(enh, 'Fury Caster', getElementById('fshFur'));
  }

  function getSustain$1(responseText) {
    populateEnhancements(responseText);
    populateBuffs(responseText);
  }

  function quickbuffSuccess(result) {
    return result.s && result.r[0].casts.length === 1;
  }

  function processResult$1(trigger, json) {
    if (quickbuffSuccess(json)) {
      trigger.className = 'fshLime';
      trigger.innerHTML = 'On';
    }
  }

  function quickActivate(evt) { // jQuery.min
    var trigger = evt.target;
    if (trigger.className !== 'quickbuffActivate') {return;}
    daQuickbuff([window.self], [trigger.dataset.buffid])
      .then(partial(processResult$1, trigger));
  }

  function setupEventHandlers() {
    on(getElementById('helperQBheader'), 'click', quickActivate);
    on(getElementById('players'), 'click', addBuffLevels);
  }

  function injectQuickBuff() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    var quickbuffDiv = getElementById('quickbuff');
    if (!quickbuffDiv) {return;}
    getProfile(window.self).then(getSustain$1);
    insertHtmlAfterEnd(quickbuffDiv.children[0], quickBuffHeader);
    doLabels();
    doPassThru();
    setupEventHandlers();
    firstPlayerStats();
  }

  var saveBoxes = ["navigateToLogAfterMsg","gameHelpLink","guildSelf","guildSelfMessage","guildFrnd","guildFrndMessage","guildPast","guildPastMessage","guildEnmy","guildEnmyMessage","showAdmin","ajaxifyRankControls","detailedConflictInfo","disableItemColoring","enableLogColoring","enableChatParsing","enableCreatureColoring","hideNonPlayerGuildLogMessages","buyBuffsGreeting","renderSelfBio","renderOtherBios","defaultMessageSound","showSpeakerOnWorld","playNewMessageSound","highlightPlayersNearMyLvl","highlightGvGPlayersNearMyLvl","showCombatLog","showMonsterLog","showCreatureInfo","keepLogs","enableGuildInfoWidgets","enableOnlineAlliesWidgets","hideGuildInfoMessage","hideGuildInfoBuff","hideGuildInfoSecureTrade","hideGuildInfoTrade","huntingBuffs","huntingBuffsName","huntingBuffs2","huntingBuffs2Name","huntingBuffs3","huntingBuffs3Name","showHuntingBuffs","moveGuildList","moveOnlineAlliesList","moveFSBox","moveDailyQuest","hideQuests","hideQuestNames","hideRecipes","hideRecipeNames","doNotKillList","enableBioCompressor","sendGoldonWorld","goldRecipient","goldAmount","keepBuffLog","showQuickSendLinks","showQuickDropLinks","sendClasses","itemRecipient","currentGoldSentTotal","enableAllyOnlineList","enableEnemyOnlineList","allyEnemyOnlineRefreshTime","quickLinksTopPx","quickLinksLeftPx","draggableQuickLinks","enableActiveBountyList","bountyListRefreshTime","enableWantedList","wantedNames","wantedGuildMembers","fsboxlog","huntingMode","enableAttackHelper","hideRelicOffline","enterForSendMessage","storeLastQuestPage","addAttackLinkToLog","showStatBonusTotal","newGuildLogHistoryPages","useNewGuildLog","enhanceChatTextEntry","enableMaxGroupSizeToJoin","maxGroupSizeToJoin","enableTempleAlert","enableUpgradeAlert","enableComposingAlert","autoFillMinBidPrice","showPvPSummaryInLog","enableQuickDrink","enhanceOnlineDots","hideBuffSelected","hideHelperMenu","keepHelperMenuOnScreen","draggableHelperMenu","showNextQuestSteps","hideChampionsGroup","hideElitesGroup","hideSEGroup","hideTitanGroup","hideLegendaryGroup","disableDeactivatePrompts","moveComposingButtons","showExtraLinks","expandMenuOnKeyPress","highlightPvpProtection","enableHistoryCompressor"];

  function findEl(el, name) {
    return querySelector('#fshSettingsTable ' + el + '[name="' + name + '"]');
  }

  function findInput(name) {
    return findEl('input', name);
  }

  function findSelect(name) {
    return findEl('select', name);
  }

  function toggleTickAllBuffs(e) { // jQuery
    var allItems = $('input[name^="blockedSkillList"]:visible',
      '#settingsTabs-4');
    var tckTxt = $(e.target);
    allItems.prop('checked', tckTxt.text() === 'Tick all buffs');
    if (tckTxt.text() === 'Tick all buffs') {
      tckTxt.text('Untick all buffs');
    } else {
      tckTxt.text('Tick all buffs');
    }
  }

  function clearStorage() {
    jConfirm('Clear localStorage',
      'Are you sure you want to clear you localStorage?',
      function() {localStorage.clear();}
    );
  }

  function saveValueForm(name) {
    var formElement = findInput(name);
    if (formElement.type === 'checkbox') {
      setValue(name, formElement.checked);
    } else {
      setValue(name, formElement.value);
    }
  }

  function saveNumeric(name) {
    var formElement = findSelect(name);
    setValue(name, Number(formElement.value));
  }

  function saveOther(name) {
    var formElement = findSelect(name);
    setValue(name, formElement.value);
  }

  function checkNumeric(name, min, def) {
    var myInput = findInput(name);
    var inputValue = Number(myInput.value);
    if (isNaN(inputValue) || inputValue <= min) {
      myInput.value = def;
    }
  }

  function saveConfig() { // jQuery
    checkNumeric('newGuildLogHistoryPages', 1, 25);
    checkNumeric('maxGroupSizeToJoin', 1, 11);
    saveNumeric('combatEvaluatorBias');
    saveOther('enabledHuntingMode');
    saveBoxes.forEach(saveValueForm);
    dialogMsg('FS Helper Settings Saved');
  }

  function showLogs() {
    sendEvent('settingsPage', 'injectNotepadShowLogs');
    jQueryDialog(injectNotepadShowLogs);
  }

  function showMonsterLogs() {
    sendEvent('settingsPage', 'injectMonsterLog');
    jQueryDialog(injectMonsterLog);
  }

  function doTickAll() {
    var tickAll = createSpan({
      id: 'fshAllBuffs',
      className: 'fshLink',
      textContent: 'Tick all buffs'
    });
    on(tickAll, 'click', toggleTickAllBuffs);
    var inject = getElementById('settingsTabs-4').children[0].rows[0].cells[0];
    insertElement(inject, createBr());
    insertElement(inject, tickAll);
  }

  function listener(el) {on(getElementById(el[0]), 'click', el[1]);}

  function clickHandlers() {
    [
      ['fshClearStorage', clearStorage],
      ['Helper:SaveOptions', saveConfig],
      ['Helper:ShowLogs', showLogs],
      ['Helper:ShowMonsterLogs', showMonsterLogs]
    ].forEach(listener);
  }

  function toggleListener(id) {on(getElementById(id), 'click', toggleVisibilty);}

  function onVisibilityToggle() {
    [
      'toggleShowGuildSelfMessage',
      'toggleShowGuildFrndMessage',
      'toggleShowGuildPastMessage',
      'toggleShowGuildEnmyMessage'
    ].forEach(toggleListener);
  }

  function createEventListeners() { // Legacy
    doTickAll();
    clickHandlers();
    onVisibilityToggle();
  }

  function mapCalfPref(el) {calf[el[0]] = getValue(el[1]);}

  function mappedVars() {
    [
      ['showBuffs', 'showHuntingBuffs'],
      ['buffs', 'huntingBuffs'],
      ['buffsName', 'huntingBuffsName'],
      ['buffs2', 'huntingBuffs2'],
      ['buffs2Name', 'huntingBuffs2Name'],
      ['buffs3', 'huntingBuffs3'],
      ['buffs3Name', 'huntingBuffs3Name']
    ].forEach(mapCalfPref);
  }

  function simpleVars() {
    [
      'doNotKillList',
      'bountyListRefreshTime',
      'wantedNames',
      'combatEvaluatorBias',
      'enabledHuntingMode'
    ].forEach(getCalfPrefs);
  }

  function getVars() {
    mappedVars();
    simpleVars();
    calf.storage = (JSON.stringify(localStorage).length /
      (5 * 1024 * 1024) * 100).toFixed(2);
  }

  function concatSimple(prev, curr) {
    return prev + simpleCheckbox(curr);
  }

  function bunchOfSimple(ary) {
    return ary.reduce(concatSimple, '');
  }

  function showActiveBounties() {
    return '<tr><td align= "right">' + networkIcon +
      'Show Active Bounties' +
      helpLink('Show Active Bounties',
        'This will show your active bounties on the right hand side') +
      ':</td><td colspan="3"><input name="enableActiveBountyList" ' +
      'type = "checkbox" value = "on"' +
      isChecked(calf.enableActiveBountyList) + '>&nbsp;' +
      '<input name="bountyListRefreshTime" size="3" value="' +
      calf.bountyListRefreshTime + '"> seconds refresh</td></tr>';
  }

  function showWantedBounties() {
    return '<tr><td align= "right">' + networkIcon +
      'Show Wanted Bounties' +
      helpLink('Show Wanted Bounties',
        'This will show when someone you want is on the bounty board, ' +
        'the list is displayed on the right hand side') +
      ':</td><td colspan="3"><input name="enableWantedList" ' +
      'type="checkbox" value="on"' +
      isChecked(calf.enableWantedList) +
      '> Refresh time is same as Active Bounties';
  }

  function wantedNames$1() {
    return '<tr><td align= "right">Wanted Names' +
      helpLink('Wanted Names',
        'The names of the people you want to see on the bounty board ' +
        'separated by commas (or * for all)') + ':</td><td colspan="3">' +
      '<input name="wantedNames" size="60" value="' + calf.wantedNames +
      '"></td></tr>';
  }

  function bountyPrefs() {
    // Bounty hunting prefs
    return '<tr><th colspan="2"><b>Bounty hunting preferences</b></th></tr>' +
      showActiveBounties() +
      showWantedBounties() +
      wantedNames$1() +
      bunchOfSimple([
        'wantedGuildMembers',
        'enableAttackHelper',
        'showPvPSummaryInLog'
      ]);
  }

  function quickSend() {
    return '<tr><td class="fshRight">Show Quick Send Item' +
      helpLink('Show Quick Send on Manage Backpack',
        'This will show a link beside each item which gives the option to ' +
        'quick send the item to this person') +
      ':</td><td><input name="showQuickSendLinks" type="checkbox" ' +
      'value="on"' +
      isValueChecked('showQuickSendLinks') + '>' +
      '&nbsp;&nbsp;Send Items To ' +
      '<input name="itemRecipient" size="10" value="' +
      getValue('itemRecipient') + '">';
  }

  function makeSendClasses() {
    return '<tr><td class="fshRight">Quick Select all of type in Send Screen' +
      helpLink('Quick Select all of type in Send Screen',
        'This allows you to customize what quick links you would like ' +
        'displayed in your send item screen.<br>Use the format ' +
        '[&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,' +
        '&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR') +
      ':</td><td><input name="sendClasses" size="60" value="' +
      escapeHtml(getValue('sendClasses')) + '">';
  }

  function equipPrefs() {
    // Equipment screen prefs
    return '<tr><th colspan="2"><b>Equipment screen preferences' +
        '</b></th></tr>' +

      bunchOfSimple([
        'showExtraLinks',
        'disableItemColoring'
      ]) +

      quickSend() +

      simpleCheckbox('showQuickDropLinks') +

      makeSendClasses();
  }

  var topBlock = [
    'moveGuildList',
    'moveOnlineAlliesList'
  ];
  var middleBlock = [
    'enableOnlineAlliesWidgets',
    'moveFSBox',
    'moveDailyQuest',
    'fsboxlog',
    'gameHelpLink',
    'enableTempleAlert',
    'enableUpgradeAlert',
    'enableComposingAlert',
    'enhanceOnlineDots',
    'hideBuffSelected',
    'hideHelperMenu',
    'keepHelperMenuOnScreen',
    'draggableHelperMenu'
  ];
  var bottomBlock = [
    'draggableQuickLinks',
    'expandMenuOnKeyPress'
  ];

  function guildInfoWidgets() {
    return '<tr><td class="fshRight"><label for="enableGuildInfoWidgets">' +
      'Enable Guild Info Widgets' +
      helpLink('Enable Guild Info Widgets',
        'Enabling this option will enable the Guild Info Widgets ' +
        '(coloring on the Guild Info panel)') +
      ':</label></td><td>' +
      '<input id="enableGuildInfoWidgets" name="enableGuildInfoWidgets" ' +
      'type="checkbox" value="on"' + isChecked(calf.enableGuildInfoWidgets) +
      '>&nbsp;<label>Hide Message&gt;<input name="hideGuildInfoMessage" ' +
      'type="checkbox" value="on"' + isChecked(calf.hideGuildInfoMessage) +
      '></label>&nbsp;<label>Hide Buff&gt;<input name="hideGuildInfoBuff" ' +
      'type="checkbox" value="on"' + isChecked(calf.hideGuildInfoBuff) +
      '></label>&nbsp;<label>Hide ST&gt;<input name="hideGuildInfoSecureTrade" ' +
      'type="checkbox" value="on"' + isChecked(calf.hideGuildInfoSecureTrade) +
      '></label>&nbsp;<label>Hide Trade&gt;<input name="hideGuildInfoTrade" ' +
      'type="checkbox" value="on"' + isChecked(calf.hideGuildInfoTrade) +
      '></label></td></tr>';
  }

  function onlineAlliesEnemies() {
    return '<tr><td class="fshRight">' + networkIcon +
      'Show Online Allies/Enemies' +
      helpLink('Show Online Allies/Enemies',
        'This will show the allies/enemies online list on the right.') +
      ':</td><td><label>Allies&nbsp;<input name="enableAllyOnlineList" ' +
      'type="checkbox" value="on"' + isChecked(calf.enableAllyOnlineList) +
      '></label>&nbsp;&nbsp;<label>Enemies&nbsp;' +
      '<input name="enableEnemyOnlineList" type="checkbox" value="on"' +
      isChecked(calf.enableEnemyOnlineList) + '></label>&nbsp;&nbsp;' +
      '<input name="allyEnemyOnlineRefreshTime" size="3" value="' +
      getValue('allyEnemyOnlineRefreshTime') + '"> seconds refresh</td></tr>';
  }

  function quickLinksLocation() {
    return '<tr><td class="fshRight">Quick Links Screen Location' +
      helpLink('Quick Links Screen Location',
        'Determines where the quick links dialog shows on the screen. ' +
        'Default is top 22, left 0.') +
      ':</td><td>Top: <input name="quickLinksTopPx" size="3" value="' +
      getValue('quickLinksTopPx') +
      '"> Left: <input name="quickLinksLeftPx" size="3" value="' +
      getValue('quickLinksLeftPx') + '"></td></tr>';
  }

  function generalPrefs() {
    // General Prefs
    return '<tr><th colspan="2"><b>General preferences ' +
        '(apply to most screens)</b></th></tr>' +
      guildInfoWidgets() +
      bunchOfSimple(topBlock) +
      onlineAlliesEnemies() +
      bunchOfSimple(middleBlock) +
      quickLinksLocation() +
      bunchOfSimple(bottomBlock);
  }

  function injectSettingsGuildData(guildType) {
    var title = '';
    var disabled = '';
    if (guildType === 'Self') {
      title = ' title="This is automatically detected"';
      disabled = ' disabled';
    }
    return '<input' + title + ' name="guild' + guildType + '" size="60" value="' +
      getValue('guild' + guildType) + '"' + disabled + '>' +

      '<span class="fshPoint" ' +
      'id="toggleShowGuild' + guildType + 'Message" data-linkto="showGuild' +
      guildType + 'Message"> &#x00bb;</span>' +

      '<div id="showGuild' + guildType + 'Message" class="fshHide">' +
      '<input name="guild' + guildType + 'Message" size="60" value="' +
      getValue('guild' + guildType + 'Message') + '">' +
      '</div>';
  }

  function guildNames() {
    return '<tr><td colspan="2">' +
        'Enter guild names, separated by commas</td></tr>' +
      '<tr><td class="fshRight">Own Guild</td><td>' +
        injectSettingsGuildData('Self') + '</td></tr>' +
      '<tr><td class="fshRight">Friendly Guilds</td><td>' +
        injectSettingsGuildData('Frnd') + '</td></tr>' +
      '<tr><td class="fshRight">Old Guilds</td><td>' +
        injectSettingsGuildData('Past') + '</td></tr>' +
      '<tr><td class="fshRight">Enemy Guilds</td><td>' +
        injectSettingsGuildData('Enmy') + '</td></tr>';
  }

  function pvpTargets() {
    return '<tr><td class="fshRight">Highlight Valid PvP Targets' +
      helpLink('Highlight Valid PvP Targets',
        'Enabling this option will highlight targets in OTHER guilds that ' +
        'are within your level range to attack for PvP or GvG.') +
      ':</td><td>PvP: <input name="highlightPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      isValueChecked('highlightPlayersNearMyLvl') +
      '> GvG: <input name="highlightGvGPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      isValueChecked('highlightGvGPlayersNearMyLvl') +
      '></td></tr>';
  }

  function guildPrefs() {
    // Guild Manage
    return '<tr><th colspan="2"><b>Guild>Manage preferences' +
        '</b></th></tr>' +
      guildNames() +
      pvpTargets() +
      bunchOfSimple([
        'showAdmin',
        'ajaxifyRankControls',
        'detailedConflictInfo',
        'enableHistoryCompressor'
      ]);
  }

  function newGuildLogHistory() {
    return '<tr><td class="fshRight">New Guild Log History' +
      helpLink('New Guild Log History (pages)',
        'This is the number of pages that the new guild log ' +
        'screen will go back in history.') +
      ':</td><td><input name="newGuildLogHistoryPages" size="3" value="' +
      getValue('newGuildLogHistoryPages') + '"></td></td></tr>';
  }

  function newLogMessageSound() {
    return '<tr><td class="fshRight">New Log Message Sound' +
      helpLink('New Log Message Sound',
        'The .wav or .ogg file to play when you have unread log messages. ' +
        'This must be a .wav or .ogg file. This option can be turned on/off ' +
        'on the world page. Only works in Firefox 3.5+') +
      ':</td><td colspan="3"><input name="defaultMessageSound" size="60" ' +
      'value="' + getValue('defaultMessageSound') +
      '"></td></tr>';
  }

  function playSoundOnUnreadLog() {
    return '<tr><td class="fshRight">Play sound on unread log' +
      helpLink('Play sound on unread log',
        'Should the above sound play when you have unread log messages? ' +
        '(will work on Firefox 3.5+ only)') +
      ':</td><td><input name="playNewMessageSound" type="checkbox" ' +
      'value="on"' +
      isValueChecked('playNewMessageSound') + '>' +
      ' Show speaker on world' +
      helpLink('Show speaker on world',
        'Should the toggle play sound speaker show on the world map? ' +
        '(This icon is next to the Fallensword wiki icon and will only ' +
        'display on Firefox 3.5+)') +
      ':<input name="showSpeakerOnWorld" type="checkbox" value="on"' +
      isValueChecked('showSpeakerOnWorld') +
      '></tr></td>';
  }

  function logPrefs() {
    // Log screen prefs
    return '<tr><th colspan="2"><b>Log screen preferences</b></th></tr>' +
      bunchOfSimple([
        'hideNonPlayerGuildLogMessages',
        'useNewGuildLog'
      ]) +
      newGuildLogHistory() +
      simpleCheckbox('enableLogColoring') +
      newLogMessageSound() +
      playSoundOnUnreadLog() +
      bunchOfSimple([
        'enableChatParsing',
        'keepBuffLog',
        'addAttackLinkToLog',
        'enhanceChatTextEntry'
      ]);
  }

  function recipeHiding() {
    return '<tr><td class="fshRight">Hide Specific Recipes' +
      helpLink('Hide Specific Recipes',
        'If enabled, this hides recipes whose name matches the list ' +
        '(separated by commas). This works on Recipe Manager') +
      ':</td><td colspan="3"><input name="hideRecipes" ' +
      'type="checkbox" value="on"' +
      isValueChecked('hideRecipes') + '>' +
      '&nbsp;<input name="hideRecipeNames" size="60" value="' +
      getValue('hideRecipeNames') + '"></td></tr>';
  }

  function groupJoinSize() {
    return '<tr><td align= "right">Max Group Size to Join' +
      helpLink('Max Group Size to Join',
        'This will disable HCSs Join All functionality and will only join ' +
        'groups less than a set size. ') +
      ':</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" ' +
      'type = "checkbox" value = "on"' +
      isValueChecked('enableMaxGroupSizeToJoin') +
      '>&nbsp;&nbsp;Max Size: ' +
      '<input name="maxGroupSizeToJoin" size="3" value="' +
      getValue('maxGroupSizeToJoin') + '"></td></tr>';
  }

  function otherPrefs() {
    // Other prefs
    return '<tr><th colspan="2"><b>Other preferences</b></th></tr>' +
      simpleCheckbox('autoFillMinBidPrice') +
      recipeHiding() +
      bunchOfSimple([
        'hideRelicOffline',
        'enterForSendMessage',
        'navigateToLogAfterMsg'
      ]) +
      groupJoinSize() +
      simpleCheckbox('moveComposingButtons');
  }

  function worldGroup() {
    // World Screen
    return '<tr><td class="fshRight">Hide Create Group Button' +
      helpLink('Hide Create Group Button',
        'Enabling this option will hide the Create Group button') +
      ':</td><td>' +
      '<input name="hideChampionsGroup" type="checkbox" value="on"' +
        isValueChecked('hideChampionsGroup') + '>' +
      '&nbsp;Champions&nbsp;&nbsp;' +
      '<input name="hideElitesGroup" type="checkbox" value="on"' +
        isValueChecked('hideElitesGroup') + '>' +
      '&nbsp;Elites&nbsp;&nbsp;' +
      '<input name="hideSEGroup" type="checkbox" value="on"' +
        isValueChecked('hideSEGroup') + '>' +
      '&nbsp;Super Elite&nbsp;&nbsp;' +
      '<input name="hideTitanGroup" type="checkbox" value="on"' +
        isValueChecked('hideTitanGroup') + '>' +
      '&nbsp;Titan&nbsp;&nbsp;' +
      '<input name="hideLegendaryGroup" type="checkbox" value="on"' +
        isValueChecked('hideLegendaryGroup') + '>' +
      '&nbsp;Legendary' +
      '</td></tr>';
  }

  function keepCombatLogs() {
    return '<tr><td class="fshRight">Keep Combat Logs' +
      helpLink('Keep Combat Logs',
        'Save combat logs to a temporary variable. ' +
        'Press <u>Show logs</u> on the right to display and copy them') +
      ':</td><td><input name="keepLogs" type="checkbox" value="on"' +
      isValueChecked('keepLogs') + '>&nbsp;&nbsp;' +
      '<input type="button" class="custombutton" value="Show Logs" ' +
      'id="Helper:ShowLogs"></td></tr>';
  }

  function combatEvalBias() {
    return '<tr><td class="fshRight">Combat Evaluator Bias' +
      helpLink('Combat Evaluator Bias',
        'This changes the bias of the combat evaluator for the damage and ' +
        'HP evaluation. It will not change the attack bias (1.1053).' +
        '<br>Conservative = 1.1053 and 1.1 (Safest)' +
        '<br>Semi-Conservative = 1.1 and 1.053' +
        '<br>Adventurous = 1.053 and 1 (Bleeding Edge)' +
        '<br>Conservative+ = 1.1053 and 1 with the attack calculation ' +
        'changed to +-48 per RJEM') +
      ':</td><td><select name="combatEvaluatorBias">' +
      '<option value="0"' +
      isSelected(calf.combatEvaluatorBias, 0) +
      '>Conservative</option>' +
      '<option value="1"' +
      isSelected(calf.combatEvaluatorBias, 1) +
      '>Semi-Conservative</option>' +
      '<option value="2"' +
      isSelected(calf.combatEvaluatorBias, 2) +
      '>Adventurous</option>' +
      '<option value="3"' +
      isSelected(calf.combatEvaluatorBias, 3) +
      '>Conservative+</option></select></td></tr>';
  }

  function keepCreatureLog() {
    return '<tr><td class="fshRight">' + justLabel('showMonsterLog') +
      '</td><td>' + justCheckbox('showMonsterLog') +
      '&nbsp;&nbsp;<input type="button" class="custombutton" ' +
      'value="Show" id="Helper:ShowMonsterLogs"></td></tr>';
  }

  function showSendGold() {
    return '<tr><td class="fshRight">Show Send Gold' +
      helpLink('Show Gold on World Screen',
        'This will show an icon below the world map to allow you to ' +
        'quickly send gold to a Friend.') +
      ':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' +
      isValueChecked('sendGoldonWorld') + '>' +
      '&nbsp;&nbsp;Send <input name="goldAmount" size="5" value="' +
      getValue('goldAmount') + '"> ' +
      'gold to <input name="goldRecipient" size="10" value="' +
      getValue('goldRecipient') + '">' +
      ' Current total: <input name="currentGoldSentTotal" size="5" value="' +
      getValue('currentGoldSentTotal') + '"></td></tr>';
  }

  function theDoNotKillList() {
    return '<tr><td class="fshRight">Do Not Kill List' +
      helpLink('Do Not Kill List',
        'List of creatures that will not be killed by quick kill. ' +
        'You must type the full name of each creature, separated by commas. ' +
        'Creature name will show up in red color on world screen and will ' +
        'not be killed by keyboard entry (but can still be killed by ' +
        'mouseclick). Quick kill must be enabled for this function to work.') +
      ':</td><td colspan="3"><input name="doNotKillList" size="60" value="' +
      calf.doNotKillList + '"></td></tr>';
  }

  function huntBuff() {
    return 'Hunting Buffs' + helpLink('Hunting Buffs',
      'Customize which buffs are designated as hunting buffs. ' +
      'You must type the full name of each buff, separated by commas. ' +
      'Use the checkbox to enable/disable them.') + ':';
  }

  function huntBuffCheck() {
    return '<input name="showHuntingBuffs" ' +
      'class="fshVMid" type="checkbox" value="on"' +
      isChecked(calf.showBuffs) + '>';
  }

  function huntMode() {
    return 'Enabled Hunting Mode' +
      helpLink('Enabled Hunting Mode',
        'This will determine which list of buffs gets checked ' +
        'on the world screen.') +
      ':<select name="enabledHuntingMode">' +
      '<option value="1"' + isSelected(calf.enabledHuntingMode, '1') +
      '>' + calf.buffsName + '</option>' +
      '<option value="2"' + isSelected(calf.enabledHuntingMode, '2') +
      '>' + calf.buffs2Name + '</option>' +
      '<option value="3"' + isSelected(calf.enabledHuntingMode, '3') +
      '>' + calf.buffs3Name + '</option>' +
      '</select>';
  }

  function huntingBuffsHtml() {
    return huntBuff() + huntBuffCheck() + ' ' + huntMode();
  }

  function huntingBuffs$1() {
    return '<tr><td class="fshRight">' + huntBuff() + '</td><td colspan="3">' +
      huntBuffCheck() + ' ' + huntMode() + '</td></tr>';
  }

  function huntingBuffsList(modeLabel, modeName, buffsName, buffs) {
    return '<tr><td class="fshRight">' + modeLabel + ' Hunting Buff List' +
      helpLink(modeLabel + ' Hunting Buff List',
        modeLabel + ' list of hunting buffs.') +
      ':</td><td colspan="3"><input name="' + modeName +
      '" title="Hunting mode name" size="7" value="' + modeLabel +
      '"><input name="' + buffsName + '" size="49" value="' + buffs +
      '"></td></tr>';
  }

  function huntingBuffsLists() {
    return huntingBuffsList(
      calf.buffsName, 'huntingBuffsName', 'huntingBuffs', calf.buffs
    ) + huntingBuffsList(
      calf.buffs2Name, 'huntingBuffs2Name', 'huntingBuffs2', calf.buffs2
    ) + huntingBuffsList(
      calf.buffs3Name, 'huntingBuffs3Name', 'huntingBuffs3', calf.buffs3
    );
  }

  function joinFuncs() {
    return [
      combatEvalBias(),
      keepCreatureLog(),
      showSendGold(),
      theDoNotKillList(),
      huntingBuffs$1(),
      huntingBuffsLists()
    ].join('');
  }

  function prefs() {
    // World Screen
    return '<tr><th colspan="2"><b>' +
      'World screen/Hunting preferences</b></th></tr>' +

      worldGroup() +
      keepCombatLogs() +

      bunchOfSimple([
        'showCombatLog',
        'enableCreatureColoring',
        'showCreatureInfo'
      ]) +

      joinFuncs() +

      simpleCheckbox('huntingMode');
  }

  function buffGreet() {
    return '<tr><td class="fshRight">Buy Buffs Greeting' +
      helpLink('Buy Buffs Greeting',
        'This is the default text to open a message with when asking to ' +
        'buy buffs. You can use {playername} to insert the target players ' +
        'name. You can also use {buffs} to insert the list of buffs. You ' +
        'can use {cost} to insert the total cost of the buffs.') +
      ':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" ' +
      'value="' + getValue('buyBuffsGreeting') + '"></td></tr>';
  }

  function profilePrefs() {
    // profile prefs
    return '<tr><th colspan="2"><b>Profile preferences</b></th></tr>' +
      bunchOfSimple([
        'renderSelfBio',
        'renderOtherBios',
        'enableBioCompressor'
      ]) +
      buffGreet() +
      bunchOfSimple([
        'showStatBonusTotal',
        'enableQuickDrink',
        'disableDeactivatePrompts',
        'highlightPvpProtection'
      ]);
  }

  function questPrefs() {
    // Quest Preferences
    return '<tr><th colspan="2"><b>Quest preferences</b></th></tr>' +

      '<tr><td class="fshRight">Hide Specific Quests' +
        helpLink('Hide Specific Quests',
          'If enabled, this hides quests whose name matches the list ' +
          '(separated by commas).') +
        ':</td><td colspan="3"><input name="hideQuests" type="checkbox" ' +
        'value="on"' +
        isValueChecked('hideQuests') + '>' +
        '&nbsp;<input name="hideQuestNames" size="60" value="' +
        getValue('hideQuestNames') + '"></td></tr>' +

      bunchOfSimple([
        'storeLastQuestPage',
        'showNextQuestSteps'
      ]);
  }

  function storageDetails() {
    return '<tr><td align=center><input id="fshClearStorage" type="button" ' +
      'class="awesome magenta tip-static" value="Clear Storage" ' +
      'data-tipped="<span class=\'fshHelpTitle\'>Clear Storage' +
      '</span><br><br>This will clear all localStorage related to ' +
      'fallensword.com<br>It will reset all your Helper settings to ' +
      'defaults<br>Use it if your storage has overflowed or become ' +
      'corrupt"></td><td align=center>' +
      '<span style="font-size:x-small">(Current version: ' +
      FSH.version + '(' + FSH.calf + ')) (Storage Used: ' +
      calf.storage + '% Remaining: ' +
      (100 - calf.storage).toFixed(2) + '%)</span></td></tr>';
  }

  function linkToWebsite() {
    return '<tr><td colspan="2" align=center>' +
    '<span style="font-weight:bold;">Visit the ' +
    '<a href="https://github.com/fallenswordhelper/fallenswordhelper">' +
    'Fallen Sword Helper web site</a> ' +
    'for any suggestions, requests or bug reports</span></td></tr>';
  }

  function coderLink(prev, curr, ind, ary) {
    var ret = prev + '<a href="' + playerIdUrl + curr[0] +
      '">' + curr[1] + '</a>';
    if (ind === ary.length - 2) {
      ret += ' and ';
    } else if (ind !== ary.length - 1) {ret += ', ';}
    return ret;
  }

  function listOfCoders(ary) {
    return ary.reduce(coderLink, '');
  }

  function codedBy() {
    return '<tr><td colspan="2" align=center>' +
      '<span class="fshXXSmall">Fallen Sword Helper was coded by ' +
      listOfCoders([['1393340', 'Coccinella'], ['1599987', 'yuuzhan'],
        ['1963510', 'PointyHair'], ['1346893', 'Tangtop'],
        ['2536682', 'dkwizard'], ['1570854', 'jesiegel'],
        ['2156859', 'ByteBoy'], ['2169401', 'McBush']]) +
      ', with valuable contributions by ' +
      listOfCoders([['524660', 'Nabalac'], ['37905', 'Ananasii']]) +
      '</span></td></tr>';
  }

  function corePrefs() {
    return [
      // General Prefs
      generalPrefs,
      // Guild Manage
      guildPrefs,
      // World Screen
      prefs,
      // Log screen prefs
      logPrefs,
      // Equipment screen prefs
      equipPrefs,
      // Quest Preferences
      questPrefs,
      // profile prefs
      profilePrefs,
      // Bounty hunting prefs
      bountyPrefs,
      // Other prefs
      otherPrefs
    ].map(functionPasses).join('');
  }

  function setupConfigData() {
    calf.configData =
      '<form><table id="fshSettingsTable">' +
      '<thead><th colspan="2"><b>Fallen Sword Helper configuration ' +
        'Settings</b></th></thead>' +
      storageDetails() +
      linkToWebsite() +
      corePrefs() +
      // save button
      '<tr><td colspan="2" align=center><input type="button" class=' +
        '"custombutton" value="Save" id="Helper:SaveOptions"></td></tr>' +
      // Export or Load Settings
      '<tr><td colspan="2" align=center>' +
        '<a href="' + notepadBlankUrl + 'savesettings">' +
        'Export or Load Settings!</a></td></tr>' +
      codedBy() +
      '</table></form>';
  }

  function addTab(tabs) { // jQuery
    tabs.find('.ui-tabs-nav')
      .append('<li><a href="#fshSettings">FSH Settings</a></li>');
    tabs.append('<div id="fshSettings"><p>' + calf.configData + '</p></div>');
    tabs.tabs('refresh');
  }

  function doFshSettings(settingsTabs) {
    getVars();
    setupConfigData();
    addTab(settingsTabs);
    createEventListeners();
    setValue('minGroupLevel',
      querySelector('input[name="min_group_level"]').value);
  }

  function injectSettings() { // jQuery
    if (jQueryNotPresent()) {return;}
    var settingsTabs = $('#settingsTabs');
    var tabsInstance = settingsTabs.tabs('instance');
    if (tabsInstance) {doFshSettings(settingsTabs);}
  }

  function injectTitan() {
    var titanTable = pCC.children[0];
    var newRow = titanTable.insertRow(2);
    insertHtmlBeforeEnd(newRow, '<br>');
    newRow = titanTable.insertRow(3);
    insertHtmlBeforeEnd(newRow, '<td class="fshCenter fshBold">[ ' +
      '<a href="' + scouttowerUrl + '">Scout Tower</a> ]</td>');
  }

  var containerDiv;

  function value$1(e) {return e;}

  function wantsBuffInfo(ary) {
    return calf.showBuffInfo && ary.some(value$1);
  }

  function drawBuffInfo() {
    if (containerDiv) {
      toggleForce(containerDiv, false);
    } else {
      containerDiv = createDiv({
        className: 'fshActionBox',
        innerHTML: '<div></div><div></div><div></div>' +
          '<div></div><div></div><div></div>'
      });
      var actCont = getElementById('actionContainer');
      insertElementAfter(containerDiv, actCont.children[2]);
    }
    return containerDiv;
  }

  function hideBuffInfo() {
    if (containerDiv) {
      toggleForce(containerDiv, true);
    }
  }

  function buffInfoDiv(ary) {
    if (wantsBuffInfo(ary)) {
      return drawBuffInfo();
    }
    hideBuffInfo();
  }

  var caDiv;
  var caSpan;

  function initCaDiv(containerDiv) {
    caDiv = containerDiv.children[3];
    caDiv.className = 'fshBlue';
    setText('CA ', caDiv);
    caSpan = createSpan();
    insertElement(caDiv, caSpan);
    insertTextBeforeEnd(caDiv, ' active');
  }

  function hasCa(containerDiv, ca) {
    if (caDiv) {
      toggleForce(caDiv, false);
    } else {
      initCaDiv(containerDiv);
    }
    setText(ca.level, caSpan);
  }

  function hideCa() {
    if (caDiv) {
      toggleForce(caDiv, true);
    }
  }

  function doCa(containerDiv, ca) {
    if (ca) {
      hasCa(containerDiv, ca);
    } else {
      hideCa();
    }
  }

  var dblDiv;
  var dblSpan;

  function initDblDiv(containerDiv) {
    dblDiv = containerDiv.children[4];
    dblDiv.className = 'fshRed';
    setText('Doubler ', dblDiv);
    dblSpan = createSpan();
    insertElement(dblDiv, dblSpan);
    insertTextBeforeEnd(dblDiv, ' active');
  }

  function hasDbl(containerDiv, dbl) {
    if (dblDiv) {
      toggleForce(dblDiv, false);
    } else {
      initDblDiv(containerDiv);
    }
    setText(dbl.level, dblSpan);
  }

  function hideDbl() {
    if (dblDiv) {
      toggleForce(dblDiv, true);
    }
  }

  function doDbl(containerDiv, dbl) {
    if (dbl) {
      hasDbl(containerDiv, dbl);
    } else {
      hideDbl();
    }
  }

  var ddDiv;
  var ddSpan;

  function initDdDiv(containerDiv) {
    ddDiv = containerDiv.children[2];
    setText('Damage bonus: ', ddDiv);
    ddSpan = createSpan();
    insertElement(ddDiv, ddSpan);
    insertTextBeforeEnd(ddDiv, '%');
  }

  function getDdBonus(dd, killStreak) {
    if (dd) {
      var ddPerc = Math.min(
        Math.round(
          Math.floor(killStreak / 5) * Number(dd.level)
        ) * 0.01, 20
      );
      var ddBonus = Math.round(ddPerc * 100) / 100;
      return ddBonus.toString();
    }
    return '0';
  }

  function hasDd(containerDiv, dd, ks) {
    if (ddDiv) {
      toggleForce(ddDiv, false);
    } else {
      initDdDiv(containerDiv);
    }
    setText(getDdBonus(dd, Number(ks)), ddSpan);
  }

  function hideDd() {
    if (ddDiv) {
      toggleForce(ddDiv, true);
    }
  }

  function doDeathDealer(containerDiv, dd, ks) {
    if (dd) {
      hasDd(containerDiv, dd, ks);
    } else {
      hideDd();
    }
  }

  function setTextCommas(value, node) {
    setText(addCommas(value), node);
  }

  var ksDiv;
  var killStreakSpan;

  function initKsDiv(containerDiv) {
    ksDiv = containerDiv.children[1];
    setText('Kill Streak: ', ksDiv);
    killStreakSpan = createSpan();
    insertElement(ksDiv, killStreakSpan);
  }

  function showKs(containerDiv, ks) {
    if (ksDiv) {
      toggleForce(ksDiv, false);
    } else {
      initKsDiv(containerDiv);
    }
    setTextCommas(ks, killStreakSpan);
  }

  function hideKs() {
    if (ksDiv) {
      toggleForce(ksDiv, true);
    }
  }

  function doKs(containerDiv, dd, titanActive, ks) {
    if (dd || titanActive) {
      showKs(containerDiv, ks);
    } else {
      hideKs();
    }
  }

  function thisBuff$2(name, e) {return e.name === name;}

  function getBuff$2(name) {
    var buffs = GameData.player().buffs;
    if (buffs) {
      return buffs.find(partial(thisBuff$2, name));
    }
  }

  function getCooldown() {
    var cooldown = GameData.player().teleportCooldown;
    return cooldown > 1 && cooldown;
  }

  var colorHash = [
    'red', // Should never see this.
    'orange',
    'yellow'
  ];

  function impIconColour() { // jQuery
    var imp = $('#actionlist-shield-imp');
    if (imp.length === 1) {
      imp.css('background-color',
        colorHash[imp.text()] || '#ad8043');
    }
  }

  var impDiv;
  var impRemainingSpan;

  function refreshBuffs(json) {
    if (quickbuffSuccess(json)) {
      GameData.fetch(def_fetch_playerBuffs);
    }
  }

  function recastClick() {
    if (getBuff$2('Summon Shield Imp')) {return;}
    daQuickbuff([playerName$1()], [55]).then(refreshBuffs);
  }

  function getImpsRemaining(imp) {
    if (imp) {
      return Number(imp.stack);
    }
    return 0;
  }

  var impStyles = [
    'imp-0',
    'imp-1',
    'imp-1'
  ];

  function getImpWarningStyle(impsRem) {
    return impStyles[impsRem] || 'fshGreen';
  }

  function initImpDiv(containerDiv) {
    impDiv = containerDiv.children[0];
    setText('Shield Imps Remaining: ', impDiv);
    impRemainingSpan = createSpan();
    insertElement(impDiv, impRemainingSpan);
    insertHtmlBeforeEnd(impDiv, '&nbsp;');
    var recast = createSpan({className: 'xSmallLink', textContent: 'Recast'});
    insertElement(impDiv, recast);
    on(recast, 'click', recastClick);
  }

  function hasImp(containerDiv, imp) {
    if (impDiv) {
      toggleForce(impDiv, false);
    } else {
      initImpDiv(containerDiv);
    }
    var impsRem = getImpsRemaining(imp);
    impDiv.className = getImpWarningStyle(impsRem);
    setText(impsRem, impRemainingSpan);
  }

  function hideImpWarning() {
    if (impDiv) {
      toggleForce(impDiv, true);
    }
  }

  function impWarning(containerDiv, imp, dd) {
    if (imp || dd) {
      hasImp(containerDiv, imp);
    } else {
      hideImpWarning();
    }
  }

  function hasTitan(el) {return el.type === 0;}

  function titanKs() {
    var dynamic = GameData.realm().dynamic;
    return isArray(dynamic) && dynamic.some(hasTitan);
  }

  var cdDiv;
  var cooldownSpan;
  var lastTp;

  function initCdDiv(containerDiv, cd) {
    cdDiv = containerDiv.children[5];
    setText('Teleport Cooldown: ', cdDiv);
    cooldownSpan = textSpan(cd.toString());
    insertElement(cdDiv, cooldownSpan);
  }

  function hasCd(containerDiv, cd) {
    if (cdDiv) {
      toggleForce(cdDiv, false);
    } else {
      initCdDiv(containerDiv, cd);
    }
  }

  function hideCd() {
    if (cdDiv) {
      toggleForce(cdDiv, true);
    }
  }

  function updateCooldown() {
    var secs = Math.max(Math.ceil((lastTp - Date.now()) / 1000), 0);
    setText(secs, cooldownSpan);
    if (secs > 0) {
      setTimeout(updateCooldown, 500);
    }
  }

  function doCountdown(teleportCooldown) {
    if (cooldownSpan) {
      lastTp = Date.now() + teleportCooldown * 1000;
      updateCooldown();
    }
  }

  function tpCooldown(containerDiv, cd) {
    if (cd) {
      hasCd(containerDiv, cd);
    } else {
      hideCd();
    }
  }

  var dd;
  var dbl;
  var ca;
  var imp;
  var cd;
  var titanActive;
  var ks;

  function initVars() {
    dd = getBuff$2('Death Dealer');
    dbl = getBuff$2('Doubler');
    ca = getBuff$2('Counter Attack');
    imp = getBuff$2('Summon Shield Imp');
    cd = getCooldown();
    titanActive = titanKs();
    ks = GameData.player().killStreak;
  }

  function updateBuffInfo() {
    impIconColour();
    initVars();
    var containerDiv = buffInfoDiv([dd, dbl, ca, imp, cd, titanActive]);
    if (containerDiv) {
      impWarning(containerDiv, imp, dd);
      doKs(containerDiv, dd, titanActive, ks);
      doDeathDealer(containerDiv, dd, ks);
      doCa(containerDiv, ca);
      doDbl(containerDiv, dbl);
      tpCooldown(containerDiv, cd);
    }
  }

  function teleportEvent(e, data) {
    doCountdown(data.player.teleportCooldown);
  }

  function buffInfo() {
    updateBuffInfo();
    $.subscribe(def_playerBuffs + ' ' + def_playerUpdate, updateBuffInfo);
    $.subscribe(def_teleport, teleportEvent);
  }

  function toggleBuffInfo() {
    calf.showBuffInfo = !calf.showBuffInfo;
    setValue('showBuffInfo', calf.showBuffInfo);
    updateBuffInfo();
  }

  // Taking the Not Save in case they add new enhancements.
  var notSave = ['Breaker', 'Protection', 'Master Thief', 'Protect Gold',
    'Disarm', 'Duelist', 'Thievery', 'Master Blacksmith', 'Master Crafter',
    'Fury Caster', 'Master Inventor', 'Sustain'];
  var combatLog$1 = [];
  var combatData;

  function storeBuffs(buff) {
    if (buff.id === 54 || buff.id === 26) {
      combatData.player.buffs[buff.id] = parseInt(buff.level, 10);
    }
  }

  function storeEnhancements(enh) {
    if (notSave.indexOf(enh.name) === -1) {
      combatData.player.enhancements[enh.name] = enh.value;
    }
  }

  function hazBuffs$1(data) {
    if (data.player.buffs) {
      data.player.buffs.forEach(storeBuffs); // loop through buffs, only need to keep CA and Doubler 54 = ca, 26 = doubler
    }
  }

  function hazEnhancements$1(data) {
    if (data.player.enhancements) {
      data.player.enhancements.forEach(storeEnhancements); // loop through enhancements
    }
  }

  function processCombatResponse(e, data) {
    combatData = {};
    combatData.combat = data.response.data;
    if (combatData.combat.inventory_id) {
      combatData.combat.drop = combatData.combat.item.id;
    }

    combatData.player = {};
    combatData.player.buffs = {};
    combatData.player.enhancements = {};
    hazBuffs$1(data);
    hazEnhancements$1(data);
    combatData.time = data.time;
    combatLog$1.push(combatData);
    setForage('fsh_combatLog', combatLog$1);
  }

  function combatResponse(e, data) {
    // If bad response do nothing.
    if (data.response.response === 0) {processCombatResponse(e, data);}
  }

  function gotCombatLog$1(data) { // jQuery.min
    if (data) {combatLog$1 = data;}
    $.subscribe(def_PvE, combatResponse);
  }

  function combatLogger() { // jQuery.min
    if (getValue('keepLogs')) {
      getForage('fsh_combatLog').then(gotCombatLog$1);
    }
  }

  function doNotKillBlue(el) {
    el.classList.toggle('fshBlue', calf.doNotKillList.includes(getText(el)));
  }

  function afterUpdateActionList() {
    // color the critters in the do no kill list blue
    var act = getElementById('actionList');
    getArrayByClassName('creature', act).forEach(doNotKillBlue);
  }

  function creatureOnList(creatureName, passback) {
    if (calf.doNotKillList.includes(creatureName)) {
      getElementById('actionList').children[passback].children[0].children[1]
        .classList.remove('loading');
      return true;
    }
  }

  function weShouldBlock(passback) {
    // Do custom stuff e.g. do not kill list
    var creature = GameData.actions()[passback];
    if (creature) {
      return creatureOnList(creature.data.name, passback);
    }
  }

  function interceptCreatureCombat(oldDoAction) {
    return function(action, fetch, data, attempts) {
      if (weShouldBlock(data.passback)) {return;}
      // Call standard action
      oldDoAction(action, fetch, data, attempts);
    };
  }

  var actionsToIntercept = {
    // def_creatureCombat
    '2': interceptCreatureCombat
  };

  function firstAttempt(attempts) {
    return isUndefined(attempts) || attempts === 0;
  }

  function goodInterceptFunction(interceptFunction) {
    return interceptFunction && isFunction(interceptFunction);
  }

  function maybeIntercept(oldDoAction) {
    return function(action, fetch, data, attempts) {
      var interceptFunction = actionsToIntercept[action];
      if (goodInterceptFunction(interceptFunction) && firstAttempt(attempts)) {
        interceptFunction(oldDoAction)(action, fetch, data, attempts);
      } else {
        oldDoAction(action, fetch, data, attempts);
      }
    };
  }

  function interceptDoAction() {
    var oldDoAction = GameData.doAction;
    GameData.doAction = maybeIntercept(oldDoAction);
  }

  function doNotKill() {
    $.subscribe(def_afterUpdateActionlist, afterUpdateActionList);
    afterUpdateActionList();
    // then intercept the action call
    interceptDoAction();
  }

  // BUGFIX - in case of teleporting in new realm with footprints turned on

  function invalidFootprints() {
    return window.GameController && GameController.Realm &&
      !GameController.Realm.footprintTileList;
  }

  function fixTeleport() {
    if (invalidFootprints()) {
      GameController.Realm.footprintTileList = [];
    }
  }

  function createLbl(className, tip, htmlFor) {
    return createLabel({
      className: 'fshCurveEle fshCurveLbl fshPoint tip-static ' + className,
      dataset: {tipped: tip},
      htmlFor: htmlFor
    });
  }

  function makeToggleBtn(o) {
    var btnDiv = createDiv({className: 'fshToggle'});
    var btnCheck = createInput({
      checked: o.prefVal,
      id: o.checkId,
      type: 'checkbox'
    });
    insertElement(btnDiv, btnCheck);
    var onLbl = createLbl(o.onClass, o.onTip, o.checkId);
    insertElement(btnDiv, onLbl);
    var offLbl = createLbl(o.offClass, o.offTip, o.checkId);
    insertElement(btnDiv, offLbl);
    insertElement(o.worldName, btnDiv);
    return btnCheck;
  }

  var buttonContainer;
  var realmLvl;
  var yourLvl;
  var formGroup;
  var quickBuff;
  var realmMap;
  var ufsgMap;
  var soundCheck;
  var huntCheck;

  function doFormGroup(self) {
    hideQTip(self);
    GameData.doAction(12, 401, {}, 0);
  }

  function openQuickBuff$1() {
    openQuickBuffByName(playerName$1());
  }

  function openRealmMap() {
    window.open(worldUrl + def_subcmd + 'map', 'fsMap');
  }

  function openUfsgMap() {
    var gameRealm = GameData.realm();
    window.open(
      guideUrl + 'realms' + def_subcmd + 'view&realm_id=' + gameRealm.id,
      'mapUfsg'
    );
  }

  function toggleSound() {
    // Doesn't actually work in New World...
    setValue('playNewMessageSound', !getValue('playNewMessageSound'));
  }

  function toggleHuntMode() {
    calf.huntingMode = !calf.huntingMode;
    setValue('huntingMode', calf.huntingMode);
  }

  function makeButtonContainer() {
    return createDiv({
      className: 'fshCurveContainer',
      id: 'fshWorldButtonContainer'
    });
  }

  function exists$1(val) {
    if (val) {return val.toString();}
    return '?';
  }

  function minLvl() {
    var topDiv = createDiv({textContent: 'Min Lvl: '});
    realmLvl = textSpan(exists$1(GameData.realm().minlevel));
    insertElement(topDiv, realmLvl);
    return topDiv;
  }

  function yrLvl() {
    var btmDiv = createDiv({textContent: 'Your Lvl: '});
    yourLvl = textSpan(exists$1(GameData.player().level));
    insertElement(btmDiv, yourLvl);
    return btmDiv;
  }

  function doLevels(worldName) {
    var lvlDiv = createDiv({className: 'fshFsty'});
    insertElement(lvlDiv, minLvl());
    insertElement(lvlDiv, yrLvl());
    insertElement(worldName, lvlDiv);
  }

  function doBtn(className, tip, worldName) {
    var btn = createButton({
      className: 'fshCurveEle fshCurveBtn fshPoint tip-static ' + className,
      dataset: {tipped: tip}
    });
    insertElement(worldName, btn);
    return btn;
  }

  function showQuickLinks(worldName) {
    doLevels(worldName);
    formGroup = doBtn('fshFormGroup', 'Quick Create Attack Group', worldName);
    quickBuff = doBtn('fshQuickBuff', 'Open Quick Buff Popup', worldName);
    realmMap = doBtn('fshRealmMap', 'Open Realm Map', worldName);
    ufsgMap = doBtn('fshTempleOne', 'Search map in Ultimate FSG', worldName);
  }

  function showSpeakerOnWorld$1(worldName) {
    if (getValue('showSpeakerOnWorld')) {
      var msgSounds = getValue('playNewMessageSound');
      soundCheck = makeToggleBtn({
        prefVal: msgSounds,
        checkId: 'fshSoundCheck',
        onClass: 'soundOn',
        onTip: 'Turn Off Sound when you have a new log message',
        offClass: 'soundOff',
        offTip: 'Turn On Sound when you have a new log message',
        worldName: worldName
      });
    }
  }

  function showHuntMode(worldName) {
    var inHuntMode = calf.huntingMode;
    huntCheck = makeToggleBtn({
      prefVal: inHuntMode,
      checkId: 'fshHuntCheck',
      onClass: 'huntOn',
      onTip: 'Hunting mode is ON',
      offClass: 'huntOff',
      offTip: 'Hunting mode is OFF',
      worldName: worldName
    });
  }

  function addButtons$1() {
    showQuickLinks(buttonContainer);
    showSpeakerOnWorld$1(buttonContainer);
    showHuntMode(buttonContainer);
  }

  var changeHdl = [
    [function(self) {return self === soundCheck;}, toggleSound],
    [function(self) {return self === huntCheck;}, toggleHuntMode]
  ];

  var clickHdl = [
    [function(self) {return self === formGroup;}, doFormGroup],
    [function(self) {return self === quickBuff;}, openQuickBuff$1],
    [function(self) {return self === realmMap;}, openRealmMap],
    [function(self) {return self === ufsgMap;}, openUfsgMap]
  ];

  function setupHandlers$1() {
    on(buttonContainer, 'click', eventHandler5(clickHdl));
    on(buttonContainer, 'change', eventHandler5(changeHdl));
  }

  function injectButtons() {
    if (!buttonContainer) {
      buttonContainer = makeButtonContainer();
      addButtons$1();
      setupHandlers$1();
      insertElementBefore(buttonContainer, getElementById('worldCoord'));
    }
  }

  function realmUpdate(e, data) {
    if (realmLvl && data.b.minlevel) {
      fixTeleport();
      setText(data.b.minlevel, realmLvl);
    }
  }

  function levelStats(e, data) {
    if (yourLvl) {
      setText(data.b, yourLvl);
    }
  }

  function initButtons() {
    injectButtons();
    $.subscribe(def_realmUpdate, realmUpdate);
    $.subscribe(def_playerLevel, levelStats);
  }

  function badData$1(data) {
    return !data || !data.response || !data.response.data;
  }

  var atkStats = '<table class="relicT relicS"><thead>' +
    '<tr><th colspan="2">Adjusted defense values</th></tr></thead><tbody>' +
    '<tr><td>DC225:</td><td id="DC225">0</td></tr>' +
    '<tr><td>DC175:</td><td id="DC175">0</td></tr>' +
    '<tr><td colspan="2">&nbsp;</td></tr></tbody><thead>' +
    '<tr><th colspan="2">Attacking Group Stats</th></tr></thead><tbody>' +
    '<tr><td>Raw Group Attack:</td>' +
      '<td class="fshGrey" id="GroupAttack"></td></tr>' +
    '<tr><td>Group Attack w/ buffs:</td><td id="GroupAttackBuffed"></td></tr>' +
    '<tr><td>Raw Group Defense:</td>' +
      '<td class="fshGrey" id="GroupDefense"></td></tr>' +
    '<tr><td>Group Defense w/ buffs:</td>' +
      '<td id="GroupDefenseBuffed"></td></tr>' +
    '<tr><td>Raw Group Armor:</td>' +
      '<td class="fshGrey" id="GroupArmor"></td></tr>' +
    '<tr><td>Group Armor w/ buffs:</td><td id="GroupArmorBuffed"></td></tr>' +
    '<tr><td>Raw Group Damage:</td>' +
      '<td class="fshGrey" id="GroupDamage"></td></tr>' +
    '<tr><td>Group Damage w/ buffs:</td><td id="GroupDamageBuffed"></td></tr>' +
    '<tr><td>Raw Group HP:</td><td class="fshGrey" id="GroupHP"></td></tr>' +
    '<tr><td>Group HP w/ buffs:</td><td id="GroupHPBuffed"></td></tr>' +
    '</tbody></table>';
  var defStats = '<table class="relicT relicS"><thead>' +
    '<tr><th colspan="2">Defending Guild Stats</th></tr></thead><tbody>' +
    '<tr><td>Relic Count:</td><td id="relicCount">0</td></tr>' +
    '<tr><td>Lead Defender Bonus:</td><td id="LDPercentage">0</td></tr>' +
    '<tr><td>Lead Defender Cloaked:</td><td id="LDCloaked">No</td></tr>' +
    '</tbody><thead><tr><th colspan="2">Other Defender Stats</th></tr>' +
    '</thead><tbody>' +
    '<tr><td>Raw Attack:</td><td class="fshGrey" id="attackValue">0</td></tr>' +
    '<tr><td>Attack w/ buffs:</td><td id="attackValueBuffed">0</td></tr>' +
    '<tr><td>Raw Defense:</td>' +
      '<td class="fshGrey" id="defenseValue">0</td></tr>' +
    '<tr><td>Defense w/buffs:</td><td id="defenseValueBuffed">0</td></tr>' +
    '<tr><td>Raw Armor:</td><td class="fshGrey" id="armorValue">0</td></tr>' +
    '<tr><td>Armor w/ buffs:</td><td id="armorValueBuffed">0</td></tr>' +
    '<tr><td>Raw Damage:</td><td class="fshGrey" id="damageValue">0</td></tr>' +
    '<tr><td>Damage w/ buffs:</td><td id="damageValueBuffed">0</td></tr>' +
    '<tr><td>Raw HP:</td><td class="fshGrey" id="hpValue">0</td></tr>' +
    '<tr><td>HP w/ buffs:</td><td id="hpValueBuffed">0</td></tr>' +
    '<tr><td>Cloaked:</td><td id="defendersCloaked">0</td></tr>' +
    '<tr><td>Processed:</td><td id="defendersProcessed">0</td></tr>' +
    '</tbody></table>';
  var proc = '<table class="relicT">' +
    '<thead><tr><th colspan="2">Processing</th></tr></thead><tbody>' +
    '<tr><td class="fshGreen" colspan="2" id="ProcessingStatus">' +
      'Parsing defending guild stats ...</td></tr>' +
    '</tbody><thead><tr><th colspan="2">Assumptions</th></tr></thead><tbody>' +
    '<tr><td colspan="2" class="fshGrey">Above calculations include ' +
      'Constitution, Fortitude, Nightmare Visage, Chi Strike, Sanctuary, ' +
      'Terrorize and Flinch bonus calculations (in that order) on both the ' +
      'defending group and attacking group.</td></tr>' +
    '</tbody></table>';

  var containerDiv$1;
  var leftDiv;
  var fetchStatsBtn;
  var myDefenders;

  function playerName$4(x) {return x.player_name;}

  function defendersSetup(relicData) {
    myDefenders = relicData.defenders.map(playerName$4);
  }

  function containerSetup() {
    if (containerDiv$1) {
      containerDiv$1.innerHTML = '';
    } else {
      containerDiv$1 = createDiv({className: 'body'});
    }
  }

  function makeLeftDiv(relicData) {
    leftDiv = createDiv({className: 'fshFloatLeft fshRelicLeftDiv'});
    insertElement(containerDiv$1, leftDiv);
    if (relicData.is_owner) {
      insertElement(leftDiv, doBuffLinks(myDefenders));
    }
    fetchStatsBtn = createButton({
      className: 'custombutton',
      textContent: 'Fetch Stats'
    });
    insertElement(leftDiv, fetchStatsBtn);
  }

  function primaryElementsSetup(relicData) {
    defendersSetup(relicData);
    containerSetup();
    makeLeftDiv(relicData);
    var dialogRelic = getElementById('dialog-relic');
    insertElement(dialogRelic, containerDiv$1);
  }

  var guildMemberList;
  var twoMinutesAgo;
  var sevenDaysAgo;
  var relicCountElement;
  var lDPercentageElement;
  var lDCloakedElement;
  var attackElement$1;
  var attackBuffedElement;
  var defenseElement$1;
  var defenseBuffedElement;
  var armorElement$1;
  var armorBuffedElement;
  var damageElement$1;
  var damageBuffedElement;
  var hpElement$1;
  var hpBuffedElement;
  var defCloakedElement;
  var defProcessedElement;
  var dc225Element;
  var dc175Element;
  var groupAttackElement;
  var groupAttackBuffedElement;
  var groupDefenseElement;
  var groupDefenseBuffedElement;
  var groupArmorElement;
  var groupArmorBuffedElement;
  var groupDamageElement;
  var groupDamageBuffedElement;
  var groupHPElement;
  var groupHPBuffedElement;
  var processingStatus;

  var available = [
    function(key) {return key !== 'lastUpdate';},
    function(key) {return !myDefenders.includes(key);},
    function(key) {return guildMemberList[key].last_login;},
    function(key) {
      return Number(guildMemberList[key].last_login) < twoMinutesAgo;
    },
    function(key) {
      return Number(guildMemberList[key].last_login) > sevenDaysAgo;
    },
    function(key) {
      return guildMemberList[key].level < 400 ||
        guildMemberList[key].level > 421;
    },
    function(key) {
      return guildMemberList[key].level < 441 ||
        guildMemberList[key].level > 450;
    }
  ];

  function condition$8(key, fn) {return fn(key);}

  function availableMembers(key) {
    return available.every(partial(condition$8, key));
  }

  function makeLinks(key) {
    return '<a href="' + playerIdUrl + guildMemberList[key].id + '">' + key +
      '</a>';
  }

  function missingMembers(membrList) {
    guildMemberList = membrList;
    twoMinutesAgo = nowSecs - 120;
    sevenDaysAgo = nowSecs - 604800;
    var filtered = Object.keys(guildMemberList)
      .filter(availableMembers).map(makeLinks);
    insertHtmlBeforeEnd(containerDiv$1,
      '<div class="fshFloatLeft fshRelicLowDiv">' +
      '<table class="relicT"><thead><tr><th>' + filtered.length.toString() +
      ' Offline guild members not at relic:</th></tr></thead>' +
      '<tbody><tr><td>' + filtered.join(' ') + '</td></tr></tbody>' +
      '</table></div>');
  }

  function setDefVars() {
    relicCountElement = getElementById('relicCount');
    lDPercentageElement = getElementById('LDPercentage');
    lDCloakedElement = getElementById('LDCloaked');
    attackElement$1 = getElementById('attackValue');
    attackBuffedElement = getElementById('attackValueBuffed');
    defenseElement$1 = getElementById('defenseValue');
    defenseBuffedElement = getElementById('defenseValueBuffed');
    armorElement$1 = getElementById('armorValue');
    armorBuffedElement = getElementById('armorValueBuffed');
    damageElement$1 = getElementById('damageValue');
    damageBuffedElement = getElementById('damageValueBuffed');
    hpElement$1 = getElementById('hpValue');
    hpBuffedElement = getElementById('hpValueBuffed');
    defCloakedElement = getElementById('defendersCloaked');
    defProcessedElement = getElementById('defendersProcessed');
  }

  function setAtkVars() {
    dc225Element = getElementById('DC225');
    dc175Element = getElementById('DC175');
    groupAttackElement = getElementById('GroupAttack');
    groupAttackBuffedElement = getElementById('GroupAttackBuffed');
    groupDefenseElement = getElementById('GroupDefense');
    groupDefenseBuffedElement = getElementById('GroupDefenseBuffed');
    groupArmorElement = getElementById('GroupArmor');
    groupArmorBuffedElement = getElementById('GroupArmorBuffed');
    groupDamageElement = getElementById('GroupDamage');
    groupDamageBuffedElement = getElementById('GroupDamageBuffed');
    groupHPElement = getElementById('GroupHP');
    groupHPBuffedElement = getElementById('GroupHPBuffed');
  }

  function prepareSecondaryDivs(relicData) {
    hideElement(fetchStatsBtn);
    var hideRelicOffline = getValue('hideRelicOffline');
    if (relicData.is_owner && !hideRelicOffline) {
      getMembrList(true).then(missingMembers);
    }
    insertHtmlBeforeEnd(leftDiv, proc);
    processingStatus = getElementById('ProcessingStatus');
    var midDiv = createDiv({
      className: 'fshFloatLeft fshRelicMidDiv',
      innerHTML: defStats
    });
    insertElement(containerDiv$1, midDiv);
    setDefVars();
    var rightDiv = createDiv({
      className: 'fshFloatLeft fshRelicRightDiv',
      innerHTML: atkStats
    });
    insertElement(containerDiv$1, rightDiv);
    setAtkVars();
  }

  var relicMultiplier;

  function calcRelicMultiplier(rels) {
    if (rels === 1) {return 1.5;}
    return Math.round((1 - rels / 10) * 100) / 100;
  }

  function parseGuild(html) {
    var doc = createDocument(html);
    var nodeList = querySelectorAll('#pCC img[src*="/relics/"]', doc);
    var relicCount = nodeList.length;
    setText(relicCount, relicCountElement);
    relicMultiplier = calcRelicMultiplier(relicCount);
    setText(String(relicMultiplier * 100) + '%', lDPercentageElement);
  }

  function cloakGuess(bonus, level) {
    if (bonus > level * 10 || bonus < level) {
      return bonus;
    }
    return level * 10;
  }

  function updateForCloak(obj) {
    obj.attackValue = cloakGuess(obj.attackBonus, obj.levelValue);
    obj.defenseValue = cloakGuess(obj.defenseBonus, obj.levelValue);
    obj.armorValue = cloakGuess(obj.armorBonus, obj.levelValue);
    obj.damageValue = cloakGuess(obj.damageBonus, obj.levelValue);
    obj.hpValue = obj.hpBonus;
  }

  var statList = [
    ['levelValue', 'level'],
    ['attackValue', 'attack'],
    ['attackBonus', 'bonus_attack'],
    ['defenseValue', 'defense'],
    ['defenseBonus', 'bonus_defense'],
    ['armorValue', 'armor'],
    ['armorBonus', 'bonus_armor'],
    ['damageValue', 'damage'],
    ['damageBonus', 'bonus_damage'],
    ['hpValue', 'hp'],
    ['hpBonus', 'bonus_hp'],
    ['killStreakValue', 'killstreak']
  ];

  function assignStats(obj, json, arr) {obj[arr[0]] = Number(json[arr[1]]);}

  function importStats(obj, json) {
    statList.forEach(partial(assignStats, obj, json));
  }

  var buffList$1 = [
    ['counterAttackLevel', 'Counter Attack'],
    ['doublerLevel', 'Doubler'],
    ['deathDealerLevel', 'Death Dealer'],
    ['darkCurseLevel', 'Dark Curse'],
    ['holyFlameLevel', 'Holy Flame'],
    ['constitutionLevel', 'Constitution'],
    ['sanctuaryLevel', 'Sanctuary'],
    ['flinchLevel', 'Flinch'],
    ['nightmareVisageLevel', 'Nightmare Visage'],
    ['superEliteSlayerLevel', 'Super Elite Slayer'],
    ['fortitudeLevel', 'Fortitude'],
    ['chiStrikeLevel', 'Chi Strike'],
    ['terrorizeLevel', 'Terrorize'],
    ['barricadeLevel', 'Barricade'],
    ['reignOfTerrorLevel', 'Reign Of Terror'],
    ['anchoredLevel', 'Anchored'],
    ['severeConditionLevel', 'Severe Condition'],
    ['entrenchLevel', 'Entrench'],
    ['cloakLevel', 'Cloak']
  ];

  function assignBuffs(obj, buffs, arr) {obj[arr[0]] = buffs[arr[1]] || 0;}

  function importBuffs(obj, buffs) {
    buffList$1.forEach(partial(assignBuffs, obj, buffs));
  }

  function playerDataObject(json) {
    var buffs = reduceBuffArray(json._skills);
    var obj = {};
    importStats(obj, json);
    importBuffs(obj, buffs);
    obj.superEliteSlayerMultiplier = Math.round(0.002 *
      obj.superEliteSlayerLevel * 100) / 100;
    if (isNaN$1(obj.armorValue)) {updateForCloak(obj);}
    return obj;
  }

  var defRawAttack;
  var defBuffedAttack;
  var defRawDefense;
  var defRawArmor;
  var defRawDamage;
  var defBuffedDamage;
  var defRawHp;
  var defCloaked;
  var defProcessed;
  var leadDefender;
  var groupStats$2;
  var mercStats;

  function deductMercStats() {
    groupStats$2.attack -= mercStats.attack;
    groupStats$2.defense -= mercStats.defense;
    groupStats$2.armor -= mercStats.armor;
    groupStats$2.damage -= mercStats.damage;
    groupStats$2.hp -= mercStats.hp;
  }

  function withRelicMultiplier(val) {
    return Math.round(val * relicMultiplier);
  }

  function updateDefenderValues() {
    defRawAttack += withRelicMultiplier(leadDefender.attackValue);
    defRawDefense += withRelicMultiplier(leadDefender.defenseValue);
    defRawArmor += withRelicMultiplier(leadDefender.armorValue);
    defRawDamage += withRelicMultiplier(leadDefender.damageValue);
    defRawHp += withRelicMultiplier(leadDefender.hpValue);
  }

  function updateDefenderElements() {
    setTextCommas(defRawAttack, attackElement$1);
    setTextCommas(defRawDefense, defenseElement$1);
    setTextCommas(defRawArmor, armorElement$1);
    setTextCommas(defRawDamage, damageElement$1);
    setTextCommas(defRawHp, hpElement$1);
    setText(defCloaked, defCloakedElement);
    defProcessed += 1;
    setText(defProcessed, defProcessedElement);
  }

  function updateGroupValues() {
    setTextCommas(groupStats$2.attack, groupAttackElement);
    setTextCommas(groupStats$2.defense, groupDefenseElement);
    setTextCommas(groupStats$2.armor, groupArmorElement);
    setTextCommas(groupStats$2.damage, groupDamageElement);
    setTextCommas(groupStats$2.hp, groupHPElement);
  }

  function calcNmvEffect$1(buffs) {
    return Math.ceil(groupStats$2.attack *
      (fallback(buffs['Nightmare Visage'], 0) * 0.0025));
  }

  function doGroupAttackBuffedElement() {
    var storedFlinchEffectValue = Math.ceil(groupStats$2.attack *
      leadDefender.flinchLevel * 0.001);
    setTextCommas(groupStats$2.attack - storedFlinchEffectValue,
      groupAttackBuffedElement);
  }

  function calcDefWithConst(buffs) {
    return Math.ceil(groupStats$2.defense *
      (1 + fallback(buffs.Constitution, 0) * 0.001));
  }

  function doGroupDefenseBuffedElement(nmv, defConst) {
    setTextCommas(defConst + nmv, groupDefenseBuffedElement);
  }

  function doGroupArmorBuffedElement(buffs) {
    setTextCommas(groupStats$2.armor + Math.floor(groupStats$2.armor *
      fallback(buffs.Sanctuary, 0) * 0.001), groupArmorBuffedElement);
  }

  function calcFortitudeBonusHP(buffs, defenseWithConstitution) {
    return Math.ceil(defenseWithConstitution *
      fallback(buffs.Fortitude, 0) * 0.001);
  }

  function doGroupHPBuffedElement(fortitudeBonusHP) {
    setTextCommas(groupStats$2.hp + fortitudeBonusHP, groupHPBuffedElement);
  }

  function doGroupDamageBuffedElement(buffs, fortitudeBonusHP) {
    var chiStrikeBonusDamage = Math.ceil((groupStats$2.hp + fortitudeBonusHP) *
      fallback(buffs['Chi Strike'], 0) * 0.001);
    var storedTerrorizeEffectValue = Math.ceil(
      groupStats$2.damage * leadDefender.terrorizeLevel * 0.001);
    setTextCommas(groupStats$2.damage + chiStrikeBonusDamage -
      storedTerrorizeEffectValue, groupDamageBuffedElement);
  }

  function doGroupAttributeElements(buffs) {
    var nightmareVisageEffect = calcNmvEffect$1(buffs);
    groupStats$2.attack -= nightmareVisageEffect; // <-- important
    doGroupAttackBuffedElement();
    var defenseWithConstitution = calcDefWithConst(buffs);
    doGroupDefenseBuffedElement(nightmareVisageEffect, defenseWithConstitution);
    doGroupArmorBuffedElement(buffs);
    var fortitudeBonusHP = calcFortitudeBonusHP(buffs, defenseWithConstitution);
    doGroupHPBuffedElement(fortitudeBonusHP);
    doGroupDamageBuffedElement(buffs, fortitudeBonusHP);
  }

  function flinchEffectOnDefenders(buffs) {
    var flinchEffectValue = Math.ceil(defBuffedAttack *
      fallback(buffs.Flinch, 0) * 0.001);
    setTextCommas(defBuffedAttack - flinchEffectValue, attackBuffedElement);
  }

  function terrorizeEffectOnDefenders(buffs) {
    var terrorizeEffectValue = Math.ceil(defBuffedDamage *
      fallback(buffs.Terrorize, 0) * 0.001);
    setTextCommas(defBuffedDamage - terrorizeEffectValue, damageBuffedElement);
  }

  function calculateGroup() {
    setText('Processing attacking group stats ... ', processingStatus);
    if (mercStats) {deductMercStats();}
    updateGroupValues();
    var buffs = reduceBuffArray(GameData.player().buffs);
    doGroupAttributeElements(buffs);
    flinchEffectOnDefenders(buffs); // Effect on defending group from Flinch on attacking group.
    terrorizeEffectOnDefenders(buffs);
    setText('Done.', processingStatus);
  }

  function calcDefenderNmvEffect() {
    return Math.ceil(defRawAttack * (leadDefender.nightmareVisageLevel * 0.0025));
  }

  function calcDefenderDefenseWithConst() {
    return Math.ceil(defRawDefense *
      (1 + leadDefender.constitutionLevel * 0.001));
  }

  function updateDefenderBuffedAttack(nmvEffect) {
    defBuffedAttack = defRawAttack - nmvEffect;
    setTextCommas(defBuffedAttack, attackBuffedElement);
  }

  function updateDefenderBuffedDefense(nmv, defWithConst) {
    var defBuffedDefense = defWithConst + nmv;
    setTextCommas(defBuffedDefense, defenseBuffedElement);
    setTextCommas(Math.ceil(defBuffedDefense * 0.55), dc225Element);
    setTextCommas(Math.ceil(defBuffedDefense * 0.65), dc175Element);
  }

  function updateDefenderBuffedArmor() {
    setTextCommas(defRawArmor + Math.floor(
      defRawArmor * leadDefender.sanctuaryLevel * 0.001), armorBuffedElement);
  }

  function calcDefenderFortitudeBonusHp(defWithConst) {
    return Math.ceil(defWithConst * leadDefender.fortitudeLevel * 0.001);
  }

  function updateDefenderBuffedDamage(defBuffedHp) {
    defBuffedDamage = defRawDamage +
      Math.ceil(defBuffedHp * leadDefender.chiStrikeLevel * 0.001);
    setTextCommas(defBuffedDamage);
  }

  function isLeadDefenderCloaked() {
    if (leadDefender.cloakLevel !== 0) {
      setText('Yes', lDCloakedElement);
    }
  }

  function doCalculations() {
    setText('Processing defending guild stats ... ', processingStatus);
    updateDefenderValues();
    updateDefenderElements();
    var nmvEffect = calcDefenderNmvEffect();
    updateDefenderBuffedAttack(nmvEffect);
    var defWithConst = calcDefenderDefenseWithConst();
    updateDefenderBuffedDefense(nmvEffect, defWithConst);
    updateDefenderBuffedArmor();
    var defBuffedHp = defRawHp + calcDefenderFortitudeBonusHp(defWithConst);
    setTextCommas(defBuffedHp, hpBuffedElement);
    updateDefenderBuffedDamage(defBuffedHp);
    isLeadDefenderCloaked();
    if (GameData.player().hasGroup && groupStats$2) {
      calculateGroup();
    } else {
      setText('Done.', processingStatus);
    }
  }

  function parseDefender(json) {
    var defender = playerDataObject(json);
    defRawAttack += Math.round(defender.attackValue * defenderMultiplier);
    defRawDefense += Math.round(defender.defenseValue *
      defenderMultiplier);
    defRawArmor += Math.round(defender.armorValue * defenderMultiplier);
    defRawDamage += Math.round(defender.damageValue * defenderMultiplier);
    defRawHp += Math.round(defender.hpValue * defenderMultiplier);
    if (defender.cloakLevel !== 0) {defCloaked += 1;}
    updateDefenderElements();
  }

  function storeLeadDefender(json) {
    leadDefender = playerDataObject(json);
  }

  function storeGroupStats(obj) {
    groupStats$2 = obj;
  }

  function storeMercStats(obj) {
    mercStats = obj;
  }

  function resetCounters() {
    defRawAttack = 0;
    defRawDefense = 0;
    defRawArmor = 0;
    defRawDamage = 0;
    defRawHp = 0;
    defCloaked = 0;
    defProcessed = 0;
  }

  var relicData;

  function ajaxFailure(err) {
    setText(err.message, processingStatus);
  }

  function hasMerc(disband) {
    return disband.parentNode.parentNode.previousElementSibling
      .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
  }

  function buildGroupPrm(disband) {
    var viewStats = disband.previousElementSibling.href;
    var prm = [getGroupStats(viewStats).then(storeGroupStats)];
    if (hasMerc(disband)) {
      prm.push(getMercStats().then(storeMercStats));
    }
    return prm;
  }

  function parseGroups(html) {
    var doc = createDocument(html);
    var disband = querySelector('#pCC a[href*="confirmDisband"]', doc);
    if (!disband) {return;}
    var prm = buildGroupPrm(disband);
    return all(prm);
  }

  function getGroups() {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'groups'
    }).then(parseGroups);
  }

  function getGuild() {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'view',
      guild_id: relicData.controlled_by.guild_id
    }).then(parseGuild);
  }

  function getDefenderProfile(el, i) {
    if (i === 0) {return getProfile(el).then(storeLeadDefender);}
    return getProfile(el).then(parseDefender).catch(ajaxFailure);
  }

  function getDefenders() {
    return myDefenders.map(getDefenderProfile);
  }

  function buildStatPrm() {
    var prm = [getGuild()];
    if (GameData.player().hasGroup) {
      prm.push(getGroups());
    }
    prm = prm.concat(getDefenders());
    return prm;
  }

  function getStats() {
    prepareSecondaryDivs(relicData);
    resetCounters();
    var prm = buildStatPrm();
    allthen(prm, doCalculations);
  }

  function viewRelic(e, data) {
    if (badData$1(data)) {return;}
    relicData = data.response.data;
    if (relicData.defenders.length > 0) {
      primaryElementsSetup(relicData);
      once(fetchStatsBtn, 'click', getStats);
    }
  }

  function injectRelic() {
    $.subscribe(def_relicView, viewRelic);
  }

  var creatureCache = [];

  function cacheResult(json) {
    if (!badData$1(json)) {
      creatureCache.push(json);
    }
    return json;
  }

  function thisMob(id, el) {
    return id === Number(el.response.data.id);
  }

  function nextTick$1(resolve, cached) {resolve(cached);}

  function fromCache(cached) {
    return new Promise(function(resolve) {
      add(3, nextTick$1, [resolve, cached]);
    });
  }

  function getCreatureStats(id, passback) {
    var cached = creatureCache.find(partial(thisMob, id));
    if (cached) {
      return fromCache(cached);
    }
    return fetchdata({
      a: 1,
      id: id,
      passback: passback
    }).then(cacheResult);
  }

  var statLevel;
  var statDefense;
  var statAttack;
  var statDamage;
  var statArmor;
  var statHp;

  function getStatText(statTooltip, statClassName) {
    return valueText(getElementsByClassName(statClassName, statTooltip));
  }

  function getTooltipStats(statTooltip) {
    statAttack = getStatText(statTooltip, def_statAttack);
    statDefense = getStatText(statTooltip, def_statDefense);
    statArmor = getStatText(statTooltip, def_statArmor);
    statDamage = getStatText(statTooltip, def_statDamage);
    statHp = getStatText(statTooltip, def_statHp);
  }

  function getMyStats() {
    statLevel = GameData.player().level;
    getTooltipStats(getElementById('statbar-character-tooltip-stats'));
  }

  function tipHeader(creature) {
    return '<table><tr><td>' +
      '<img src="' + imageServer + '/creatures/' + creature.image_id +
      '.jpg" height="200" width="200"></td><td rowspan="2">' +
      '<table width="400"><tr>' +
      '<td class="header" colspan="4" class="fshCenter">Statistics</td></tr>';
  }

  function tipClassLevel(creature, myLvlClas) {
    return '<tr><td>Class:&nbsp;</td><td width="40%">' + creature.creature_class +
      '</td><td>Level:&nbsp;</td><td width="40%">' + creature.level +
      ' (your level:<span class="' + myLvlClas + '">' + statLevel +
      '</span>)</td></tr>';
  }

  function tipAttackDefense(creature) {
    return '<tr><td>Attack:&nbsp;</td><td width="40%">' + creature.attack +
      ' (your defense:<span class="fshYellow">' + statDefense +
      '</span>)</td><td>Defense:&nbsp;</td><td width="40%">' + creature.defense +
      ' (your attack:<span class="fshYellow">' + statAttack +
      '</span>)</td></tr>';
  }

  function tipArmorDamage(creature) {
    return '<tr><td>Armor:&nbsp;</td><td width="40%">' + creature.armor +
      ' (your damage:<span class="fshYellow">' + statDamage +
      '</span>)</td><td>Damage:&nbsp;</td><td width="40%">' + creature.damage +
      ' (your armor:<span class="fshYellow">' + statArmor + '</span>)</td></tr>';
  }

  function tipHp(creature, oneHitNumber) {
    return '<tr><td>HP:&nbsp;</td><td width="40%">' + creature.hp +
      ' (your HP:<span class="fshYellow">' + statHp +
      '</span>)(1H: <span class="fshRed">' + oneHitNumber +
      '</span>)</td><td>Gold:&nbsp;</td><td width="40%">' + creature.gold +
      '</td></tr>';
  }

  var tipSpacer = '<tr><td colspan="4" height="5"></td></tr><tr>' +
    '<td class="header" colspan="4" class="fshCenter">Enhancements</td></tr>';

  function enhancementRow(e) {
    return '<tr><td colspan="2">' + e.name +
      ':</td><td colspan="2">' + e.value + '</td></tr>';
  }

  function tipEnhancements(creature) {
    if (creature.enhancements.length === 0) {
      return '<tr><td colspan="4">[no enhancements]</td></tr>';
    }
    return creature.enhancements.map(enhancementRow).join('');
  }

  function tipFooter(creature) {
    return '<tr><td colspan="4" height="5"></td></tr><tr>' +
    '<td class="header" colspan="4" class="fshCenter">Description</td>' +
    '</tr><tr><td colspan="4">' + creature.description + '</td></tr>' +
    '<tr><td colspan="4" height="5"></td></tr></table></td></tr>' +
    '<tr><td class="fshCenter"><b>' + creature.name + '</b></td></tr>' +
    '</table>';
  }

  function makeMonsterTip(creature, oneHitNumber, myLvlClas) {
    return tipHeader(creature) +
      tipClassLevel(creature, myLvlClas) +
      tipAttackDefense(creature) +
      tipArmorDamage(creature) +
      tipHp(creature, oneHitNumber) +
      tipSpacer +
      tipEnhancements(creature) +
      tipFooter(creature);
  }

  function doMouseOver(creature) {
    var oneHitNumber = Math.ceil(creature.hp * calf.hpVariable + creature.armor *
      calf.generalVariable);
    var myLvlClas = 'fshYellow';
    getMyStats();
    if (statLevel > creature.level) {myLvlClas = 'fshRed';}
    return makeMonsterTip(creature, oneHitNumber, myLvlClas);
  }

  function processMouseOver(data) {
    if (badData$1(data)) {return;}
    return doMouseOver(data.response.data);
  }

  var creatureViewTests = ['verb', 'view', 'tip-static'];

  function setQTip(monster, qtipText) { // jQuery
    $(monster).qtip({
      overwrite: true,
      show: {
        event: 'mouseover',
        ready: true
      },
      style: {classes: 'qtip-tipsy qtip-custom'},
      position: {
        my: 'center right',
        at: 'center left',
        effect: false,
        viewport: $(window)
      },
      content: {text: qtipText},
      hide: {effect: false}
    });
  }

  function getIndex(element) {
    return arrayFrom(element.parentNode.children).indexOf(element);
  }

  function displayJson(api, data) {
    var content = processMouseOver(data);
    api.set('content.text', content);
  }

  function getJson(passback, event, api) { // jQuery.min
    getCreatureStats(GameData.actions()[passback].data.id, passback)
      .then(partial(displayJson, api));
    return 'Loading...';
  }

  function makeMouseOver$2(self, listItem) {
    sendEvent('NewMap', 'CreatureInfo');
    var passback = getIndex(listItem);
    self.classList.add('fshTip');
    setQTip(self, partial(getJson, passback));
  }

  function isViewCreature(self, listItem) {
    return hasClasses(creatureViewTests, self) && !hasClass('fshTip', self) &&
      hasClass('creature', listItem);
  }

  function moEvt(evt) {
    if (!calf.showCreatureInfo) {return;}
    var self = evt.target;
    var listItem = self.parentNode.parentNode.parentNode;
    if (isViewCreature(self, listItem)) {
      makeMouseOver$2(self, listItem);
    }
  }

  function interceptMouseEvents() {
    on(getElementById('actionList'), 'mouseover', moEvt);
  }

  // colSpan = attributes[0]
  // anElement = attributes[1]
  // isHeader = attributes[2]

  function addNextCell(row, attributes) {
    var aCell = row.insertCell(-1);
    aCell.colSpan = attributes[0];
    if (attributes[2]) {aCell.className = 'header';}
    insertElement(aCell, attributes[1]);
    return aCell;
  }

  function addRowCells(aRow, someCells) {
    someCells.forEach(partial(addNextCell, aRow));
  }

  function addNextRow(tbl, cells, isBlue) {
    var aRow = tbl.insertRow(-1);
    if (isBlue) {aRow.className = 'fshBlue';}
    addRowCells(aRow, cells);
    return aRow;
  }

  function addRow$1(tbl, row) {
    addNextRow(tbl, row[0], row[1]);
  }

  function addRows$1(tbl, rows) {
    rows.forEach(partial(addRow$1, tbl));
  }

  var realmName;

  function setRealm(data) {
    realmName = data;
  }

  var current;
  var kills;
  var member;
  var pctTotal;
  var status;
  var titanHp;
  var total;
  var yourGuild;

  function partOne() {
    current = textSpan('Current');
    kills = textSpan('Kills');
    member = textSpan('Member');
    pctTotal = textSpan('% of Total');
  }

  function partTwo() {
    status = textSpan('Status');
    titanHp = textSpan('Titan HP');
    total = textSpan('Total');
    yourGuild = textSpan('Your Guild');
  }

  function buildAssets() {
    partOne();
    partTwo();
  }

  var currentHp;
  var maxHp;
  var guildKills;
  var currentPct;
  var totalPct;
  var statusText;
  var cooldownText$1;

  function initVars$1() {
    currentHp = createSpan();
    maxHp = createSpan();
    guildKills = createSpan();
    currentPct = createSpan();
    totalPct = createSpan();
    statusText = createSpan();
    cooldownText$1 = createSpan();
  }

  function clearTitanDiv() {
    setText('', currentHp);
    setText('', maxHp);
    setText('', guildKills);
    setText('', currentPct);
    setText('', totalPct);
    statusText.innerHTML = '';
    cooldownText$1.innerHTML = '';
  }

  var titanTbl;

  function clearMemberRows() {
    while (titanTbl.rows.length > 7) {
      titanTbl.deleteRow(7);
    }
  }

  function makeTitanHpWrapper() {
    var titanHpWrapper = createSpan();
    insertElement(titanHpWrapper, currentHp);
    insertTextBeforeEnd(titanHpWrapper, '/');
    insertElement(titanHpWrapper, maxHp);
    return titanHpWrapper;
  }

  function makePctWrapper(pct) {
    var pctWrapper = createSpan();
    insertElement(pctWrapper, pct);
    insertTextBeforeEnd(pctWrapper, '%');
    return pctWrapper;
  }

  function buildTitanInfoTable() {
    titanTbl = createTable({className: 'fshCenter'});
    buildAssets();
    addRows$1(titanTbl, [
      [[[2, titanHp, true], [4, yourGuild, true]]],
      [[[2, makeTitanHpWrapper()], [4, guildKills]]],
      [[[2, current, true], [4, makePctWrapper(currentPct)]], true],
      [[[2, total, true], [4, makePctWrapper(totalPct)]], true],
      [[[2, status, true], [4, statusText]], true],
      [[[6, cooldownText$1]]],
      [[[2, member, true], [2, kills, true],
        [2, pctTotal, true]]]
    ]);
  }

  var titanDiv;
  var titanId;

  function hideTitanDiv() {
    titanId = null;
    if (titanDiv && !titanDiv.classList.contains('fshHide')) {
      toggleForce(titanDiv, true);
      clearTitanDiv();
      clearMemberRows();
    }
  }

  function hasTitan$1(el) {
    if (el.type === 0) {
      titanId = el.base_creature_id;
      return true;
    }
    return false;
  }

  function setupTitanDiv() {
    if (titanDiv) {
      toggleForce(titanDiv, false);
    } else {
      var actCont = getElementById('actionContainer');
      titanDiv = createDiv({className: 'fshActionBox titanInfo'});
      initVars$1();
      buildTitanInfoTable();
      insertElement(titanDiv, titanTbl);
      insertElement(actCont, titanDiv);
    }
  }

  function formatOffset(secs) {
    var aDate = new Date(now + secs * 1000);
    return padZ(aDate.getHours()) + ':' + padZ(aDate.getMinutes()) + ' ' +
      padZ(aDate.getDate()) + '/' + months[aDate.getMonth()] + '/' +
      aDate.getFullYear();
  }

  function getCooldownHtml(cooldown) {
    if (cooldown <= 0) {
      return '<span class="fshGreen cooldown">No active cooldown</span>';
    }
    return '<span class="fshMaroon cooldown">Cooldown until: ' +
      formatOffset(cooldown) +
      '</span>';
  }

  function currentPctText(ourTitan) {
    return roundToString(
      getKillsPct(ourTitan.max_hp - ourTitan.current_hp, ourTitan.kills), 2
    );
  }

  function totalPctText(ourTitan) {
    return roundToString(ourTitan.kills * 100 / ourTitan.max_hp, 2);
  }

  function statusTextHtml(ourTitan) {
    return getTitanString(ourTitan.kills, ourTitan.max_hp, ourTitan.current_hp);
  }

  function doTopLabels(ourTitan) {
    setText(ourTitan.current_hp, currentHp);
    setText(ourTitan.max_hp, maxHp);
    setText(ourTitan.kills, guildKills);
    setText(currentPctText(ourTitan), currentPct);
    setText(totalPctText(ourTitan), totalPct);
    statusText.innerHTML = statusTextHtml(ourTitan);
    cooldownText$1.innerHTML = getCooldownHtml(ourTitan.cooldown);
  }

  function memberRow(ourTitan, member) {
    return [[
      [2, textSpan(member.player.name)],
      [2, textSpan(member.kills.toString())],
      [2, textSpan(roundToString(member.kills * 100 / ourTitan.kills, 2) + '%')]
    ]];
  }

  function doMemberRows(ourTitan) {
    clearMemberRows();
    if (!ourTitan.contributors) {return;}
    var memberRows = ourTitan.contributors.map(partial(memberRow, ourTitan));
    addRows$1(titanTbl, memberRows);
  }

  function currentTitan(el) {
    return el.realm && el.creature.base_id === titanId && el.realm === realmName;
  }

  function processTitans(r) {
    var ourTitan = r.find(currentTitan);
    if (ourTitan) {
      doTopLabels(ourTitan);
      doMemberRows(ourTitan);
    }
  }

  var timeoutId$1;

  function clearTheTimeout() {
    if (timeoutId$1) {
      window.clearTimeout(timeoutId$1);
      timeoutId$1 = null;
    }
  }

  function goodData$2(data) {
    return data.s && isArray(data.r);
  }

  function titanToShow(dynamic) {
    return calf.showTitanInfo && isArray(dynamic) && dynamic.some(hasTitan$1);
  }

  function processScoutTower(ast, data) {
    if (!goodData$2(data)) {return;}
    processTitans(data.r);
    if (titanToShow(GameData.realm().dynamic)) {
      timeoutId$1 = window.setTimeout(ast, 30000);
    } else {
      hideTitanDiv();
    }
  }

  function ajaxScoutTower() {
    daScoutTower().then(partial(processScoutTower, ajaxScoutTower));
  }

  function testDynamics(dynamic) {
    clearTheTimeout();
    if (titanToShow(dynamic)) {
      setupTitanDiv();
      ajaxScoutTower();
    } else {
      hideTitanDiv();
    }
  }

  function titanStats(realm) {
    if (realm.dynamic) {
      setRealm(realm.name);
      testDynamics(realm.dynamic);
    }
  }

  function toggleShowTitanInfo() {
    calf.showTitanInfo = !calf.showTitanInfo;
    setValue('showTitanInfo', calf.showTitanInfo);
    testDynamics(GameData.realm().dynamic);
  }

  function hazRealm(data) {
    return data.realm && data.realm.name;
  }

  function injectWorldNewMap(e, data) {
    if (hazRealm(data)) {
      titanStats(data.realm);
    }
  }

  function onWorld() {
    if (window.initialGameData) {// HCS initial data
      injectWorldNewMap(null, window.initialGameData);
    }
    $.subscribe(
      def_refreshActionList + ' ' + def_stairway,
      injectWorldNewMap // change of information
    );
  }

  var shoppingData;
  var dialog$1;
  var jDialog;
  var fshDiv;
  var numInput;
  var qbBtn;
  var resultDiv;

  function quickBuy() {
    return fetchdata({
      a: 14,
      d: 0,
      id: shoppingData.id,
      item_id: shoppingData.itemId
    });
  }

  function quickDone(data) {
    var resp = data.response.response;
    var rmsg = data.response.msg;
    var msg;
    if (resp !== 0) {
      var firstTag = rmsg.indexOf('<');
      if (firstTag !== -1) {
        msg = rmsg.substring(0, firstTag);
      } else {
        msg = rmsg;
      }
    } else {
      msg = 'You purchased ' + data.response.data.name +
        ' for ' + addCommas(data.response.data.cost) + ' gold.';
    }
    insertHtmlBeforeEnd(resultDiv, msg + '<br>');
  }

  function normalBuy() {
    GameData.doAction(14, 3, {
      id: shoppingData.id,
      item_id: shoppingData.itemId
    }, 0);
    jDialog.close();
  }

  function qBuy() {
    var theValue = testQuant(numInput.value);
    if (!theValue) {return;}
    var prm = [];
    for (var i = 1; i < theValue; i += 1) {
      prm.push(quickBuy().then(quickDone));
    }
    allthen(prm, normalBuy);
  }

  function injectQuickBuy() {
    fshDiv = createDiv({
      className: 'fshClear',
      textContent: 'Select how many to quick-buy:'
    });
    numInput = createInput({
      id: 'buyAmount',
      className: 'fshNumberInput',
      min: 1,
      max: 99,
      value: 1,
      type: 'number'
    });
    insertElement(fshDiv, numInput);
    qbBtn = createButton({textContent: 'Quick-buy'});
    on(qbBtn, 'click', qBuy);
    insertElement(fshDiv, qbBtn);
    resultDiv = createDiv();
    insertElement(fshDiv, resultDiv);
    insertElement(dialog$1, fshDiv);
  }

  function getDialog() {
    return dialog$1 || getElementById('shopDialogConfirm');
  }

  function getJDialog() { // jQuery
    return jDialog || $(dialog$1).data('hcsWorldDialogShopConfirm');
  }

  function initQuickBuy() {
    if (!fshDiv) {
      injectQuickBuy();
    } else {
      setText('', resultDiv);
    }
  }

  function worldDialogShop(e, data) {
    shoppingData = data;
    dialog$1 = getDialog();
    if (!dialog$1) {return;}
    jDialog = getJDialog();
    if (jDialog) {initQuickBuy();}
  }

  function prepareShop() {
    $.subscribe(def_shopPrompt, worldDialogShop);
  }

  var monsterLog;

  function storeDescription(creature, logCreature) {
    logCreature.creature_class = creature.creature_class;
    logCreature.image_id = creature.image_id;
    logCreature.level = Number(creature.level);
    logCreature.type = creature.type;
  }

  function setupMob(creature) {
    if (!monsterLog[creature.name]) {
      monsterLog[creature.name] = {seen: 1};
      storeDescription(creature, monsterLog[creature.name]);
    } else if (monsterLog[creature.name].seen) {
      monsterLog[creature.name].seen += 1;
    }
  }

  function getStat(fn, stat, creatureStat) {
    if (stat) {
      return fn(stat, creatureStat);
    }
    return creatureStat;
  }

  function updateMinMax(_logStat, creatureStat) {
    var logStat = _logStat || {};
    logStat.min = getStat(Math.min, logStat.min, creatureStat);
    logStat.max = getStat(Math.max, logStat.max, creatureStat);
    return logStat;
  }

  var stats = ['attack', 'armor', 'damage', 'defense', 'hp'];

  function statChanged(logStat, newStat) {
    return !logStat || logStat.min !== newStat.min || logStat.max !== newStat.max;
  }

  function updateStat(creature, logCreature, stat) {
    var newStat = updateMinMax(logCreature[stat], Number(creature[stat]));
    if (statChanged(logCreature[stat], newStat)) {
      logCreature[stat] = newStat;
    }
  }

  function storeStats(creature, logCreature) {
    stats.forEach(partial(updateStat, creature, logCreature));
  }

  function creatureHazEnhancements(creature) {
    return creature.enhancements && creature.enhancements.length > 0;
  }

  function updateEnhancements(logEnh, e) {
    logEnh[e.name] = updateMinMax(logEnh[e.name], Number(e.value));
  }

  function storeEnhancements$1(creature, logCreature) {
    if (creatureHazEnhancements(creature)) {
      logCreature.enhancements = logCreature.enhancements || {};
      creature.enhancements.forEach(
        partial(updateEnhancements, logCreature.enhancements));
    }
  }

  function doMonsterLog(creature) {
    if (!monsterLog) {monsterLog = {};}
    setupMob(creature);
    storeStats(creature, monsterLog[creature.name]);
    storeEnhancements$1(creature, monsterLog[creature.name]);
    setForage('fsh_monsterLog', monsterLog);
  }

  function processMonsterLog(creature) {
    if (calf.showMonsterLog) {doMonsterLog(creature);}
  }

  function initLog(data) {
    monsterLog = data || {};
  }

  function getMonsterPrefs() {
    getForage('fsh_monsterLog').then(initLog);
  }

  var processedMonsters = [];

  function processMonster(data) {
    if (badData$1(data)) {return;}
    sendEvent('NewMap', 'MonsterLog');
    processMonsterLog(data.response.data);
  }

  function thisMob$1(e, el) {return e.id === el.id;}

  function seenBefore(e) {
    if (processedMonsters.find(partial(thisMob$1, e.data))) {return true;}
    processedMonsters.push(e.data);
  }

  function loopActions(e, i) { // jQuery.min
    if (e.type !== 6 || seenBefore(e)) {return;}
    getCreatureStats(e.data.id, i).then(processMonster);
  }

  function initMonsterLog() {
    if (calf.showMonsterLog) {
      GameData.actions().forEach(loopActions);
    }
  }

  function startMonsterLog() { // jQuery.min
    getMonsterPrefs();
    $.subscribe('-1-success.action-response ' +
      '4-success.action-response ' +
      '5-success.action-response ' +
      '25-success.action-response', initMonsterLog);
    initMonsterLog();
  }

  function evalMiss(combat) {
    if (combat.numberOfCreatureHitsTillDead - combat.numberOfHitsRequired <= 1) {
      return ', dies on miss';
    }
    return ', survives a miss';
  }

  function canIHit(combat) {
    return combat.numberOfHitsRequired === '-' ||
      combat.numberOfHitsRequired > combat.numberOfCreatureHitsTillDead;
  }

  function evalPlayerHits(combat) {
    if (combat.numberOfCreatureHitsTillDead === '-') {
      return combat.numberOfHitsRequired;
    } else if (canIHit(combat)) {
      return '-';
    }
    return combat.numberOfHitsRequired;
  }

  function canCreatureHit(combat) {
    return combat.numberOfCreatureHitsTillDead === '-' ||
      combat.numberOfCreatureHitsTillDead > combat.numberOfHitsRequired;
  }

  function evalCreatureHits(combat) {
    if (combat.numberOfHitsRequired === '-') {
      return combat.numberOfCreatureHitsTillDead;
    } else if (canCreatureHit(combat)) {
      return '-';
    }
    return combat.numberOfCreatureHitsTillDead;
  }

  var evalFightStatus = [
    [
      function(combat) {
        return combat.playerHits === '-' && combat.creatureHits === '-';
      },
      function() {return 'Unresolved';}
    ],
    [
      function(combat) {return combat.playerHits === '-';},
      function() {return 'Player dies';}
    ],
    [
      function(combat) {return combat.playerHits === 1;},
      function(combat) {return 'Player 1 hits' + evalMiss(combat);}
    ],
    [
      function(combat) {return combat.playerHits > 1;},
      function(combat) {return 'Player > 1 hits' + evalMiss(combat);}
    ]
  ];

  function condition$9(combat, el) {return el[0](combat);}

  function getStatus(combat) {
    var status = evalFightStatus.find(partial(condition$9, combat));
    if (status) {
      return status[1](combat);
    }
    return 'Unknown';
  }

  function evalAnalysis(combat) {
    // Analysis:
    combat.playerHits = evalPlayerHits(combat);
    combat.creatureHits = evalCreatureHits(combat);
    combat.fightStatus = getStatus(combat);
  }

  function calcArm(combat) {
    if (combat.callback.groupExists) {
      return combat.callback.groupArmorValue;
    }
    return combat.player.armorValue;
  }

  function overallArmour(combat) {
    var armorVal = calcArm(combat);
    combat.overallArmorValue = armorVal +
      Math.floor(combat.player.armorValue *
      combat.player.sanctuaryLevel * 0.001);
  }

  function evalSanctuary(combat) {
    if (combat.player.sanctuaryLevel > 0) {
      combat.extraNotes += 'Sanc Bonus Armor = ' +
        Math.floor(combat.player.armorValue *
        combat.player.sanctuaryLevel * 0.001) + '<br>';
    }
  }

  function calcTerrorizeEffect(combat) {
    combat.terrorizeEffect = Math.floor(combat.creature.damage *
      combat.player.terrorizeLevel * 0.001);
  }

  function evalTerrorize(combat) {
    if (combat.player.terrorizeLevel > 0) {
      combat.extraNotes += 'Terrorize Creature Damage Effect = ' +
        combat.terrorizeEffect * -1 + '<br>';
    }
  }

  function calcDamageDone(combat) {
    combat.creatureDamageDone = Math.ceil(combat.generalVariable *
      combat.creature.damage - combat.overallArmorValue +
      combat.overallHPValue);
  }

  function creatureCanHit(combat) {
    var approxDmg = combat.generalVariable * combat.creature.damage;
    if (approxDmg < combat.overallArmorValue) {
      combat.numberOfCreatureHitsTillDead = combat.overallHPValue;
    } else {
      combat.numberOfCreatureHitsTillDead = Math.ceil(
        combat.overallHPValue / (approxDmg - combat.overallArmorValue));
    }
  }

  function calcNumberOfHits(combat) {
    if (combat.creatureHitByHowMuch >= 0) {
      creatureCanHit(combat);
    } else {
      combat.numberOfCreatureHitsTillDead = '-';
    }
  }

  function evalArmour(combat) {
    overallArmour(combat);
    evalSanctuary(combat);
    calcTerrorizeEffect(combat);
    evalTerrorize(combat);
    combat.creature.damage -= combat.terrorizeEffect;
    calcDamageDone(combat);
    calcNumberOfHits(combat);
  }

  function calcAttack(combat) {
    if (combat.callback.groupExists) {
      return combat.callback.groupAttackValue;
    }
    return combat.player.attackValue;
  }

  function calcHitByHowMuch(combat) {
    var remainingDef = combat.creature.defense - combat.creature.defense *
      combat.player.darkCurseLevel * 0.002;
    if (combat.combatEvaluatorBias === 3) {
      return combat.overallAttackValue - Math.ceil(remainingDef) - 50;
    }
    return combat.overallAttackValue -
      Math.ceil(combat.attackVariable * remainingDef);
  }

  function evalAttack(combat) {
    var atkValue = calcAttack(combat);
    // Attack:
    if (combat.player.darkCurseLevel > 0) {
      combat.extraNotes += 'DC Bonus Attack = ' +
        Math.floor(combat.creature.defense *
        combat.player.darkCurseLevel * 0.002) + '<br>';
    }
    combat.nightmareVisageAttackMovedToDefense =
      Math.floor((atkValue +
      combat.counterAttackBonusAttack) *
      combat.player.nightmareVisageLevel * 0.0025);
    if (combat.player.nightmareVisageLevel > 0) {
      combat.extraNotes += 'NMV Attack moved to Defense = ' +
        combat.nightmareVisageAttackMovedToDefense + '<br>';
    }
    combat.overallAttackValue = atkValue +
      combat.counterAttackBonusAttack -
      combat.nightmareVisageAttackMovedToDefense;
    combat.hitByHowMuch = calcHitByHowMuch(combat);
  }

  function caIsRunning(combat) {
    return combat.player.counterAttackLevel > 0 &&
      combat.numberOfHitsRequired === 1;
  }

  function calcLowest(combat) {
    combat.lowestCALevelToStillHit = Math.max(Math.ceil((
      combat.counterAttackBonusAttack - combat.hitByHowMuch + 1) /
      combat.player.attackValue / 0.0025), 0);
    combat.lowestCALevelToStillKill = Math.max(Math.ceil((
      combat.counterAttackBonusDamage - combat.damageDone + 1) /
      combat.player.damageValue / 0.0025), 0);
  }

  function stamAtLowestCa(combat) {
    if (combat.player.counterAttackLevel > 0) {
      return Math.ceil((1 + combat.player.doublerLevel / 50) * 0.0025 *
        combat.lowestFeasibleCALevel);
    }
    return 0;
  }

  function lowestCaStats(combat) {
    combat.extraAttackAtLowestFeasibleCALevel = Math.floor(
      combat.player.attackValue * 0.0025 * combat.lowestFeasibleCALevel);
    combat.extraDamageAtLowestFeasibleCALevel = Math.floor(
      combat.player.damageValue * 0.0025 * combat.lowestFeasibleCALevel);
    combat.extraNotes += 'Extra CA Att/Dam at this lowered CA level = ' +
      combat.extraAttackAtLowestFeasibleCALevel + ' / ' +
      combat.extraDamageAtLowestFeasibleCALevel + '<br>';
  }

  function caRunning(combat) {
    calcLowest(combat);
    combat.lowestFeasibleCALevel =
      Math.max(combat.lowestCALevelToStillHit,
        combat.lowestCALevelToStillKill);
    combat.extraNotes += 'Lowest CA to still 1-hit this creature = ' +
      combat.lowestFeasibleCALevel + '<br>';
    if (combat.lowestFeasibleCALevel !== 0) {
      lowestCaStats(combat);
    }
    combat.extraStaminaPerHitAtLowestFeasibleCALevel = stamAtLowestCa(combat);
    if (combat.extraStaminaPerHitAtLowestFeasibleCALevel <
      combat.extraStaminaPerHit) {
      combat.extraNotes +=
        'Extra Stam Used at this lowered CA level = ' +
        combat.extraStaminaPerHitAtLowestFeasibleCALevel + '<br>';
    } else {
      combat.extraNotes +=
        'No reduction of stam used at the lower CA level<br>';
    }
  }

  function needCa(combat) {
    return combat.numberOfHitsRequired === '-' ||
      combat.numberOfHitsRequired !== 1;
  }

  function evalCaKill(combat) {
    if (combat.lowestCALevelToStillHit > 175) {
      combat.extraNotes +=
        'Even with CA175 you cannot hit this creature<br>';
    } else if (combat.lowestCALevelToStillHit !== 0) {
      combat.extraNotes += 'You need a minimum of CA' +
        combat.lowestCALevelToStillHit +
        ' to hit this creature<br>';
    }
  }

  function evalCaOneHit(combat) {
    if (combat.lowestCALevelToStillKill > 175) {
      combat.extraNotes +=
        'Even with CA175 you cannot 1-hit kill this creature<br>';
    } else if (combat.lowestCALevelToStillKill !== 0) {
      combat.extraNotes += 'You need a minimum of CA' +
        combat.lowestCALevelToStillKill +
        ' to 1-hit kill this creature<br>';
    }
  }

  function caResult(combat) {
    calcLowest(combat);
    evalCaKill(combat);
    evalCaOneHit(combat);
  }

  function evalCA(combat) {
    if (caIsRunning(combat)) {
      caRunning(combat);
    }
    if (needCa(combat)) {
      caResult(combat);
    }
  }

  function calcHp(combat) {
    if (combat.callback.groupExists) {
      return combat.callback.groupHPValue;
    }
    return combat.player.hpValue;
  }

  function calcDmg(combat) {
    if (combat.callback.groupExists) {
      return combat.callback.groupDamageValue;
    }
    return combat.player.damageValue;
  }

  function evalFortitude(combat) {
    var hpValue = calcHp(combat);
    var fortitudeLevel = combat.player.fortitudeLevel;
    combat.fortitudeExtraHPs = Math.floor(hpValue * fortitudeLevel * 0.001);
    if (fortitudeLevel > 0) {
      combat.extraNotes += 'Fortitude Bonus HP = ' + combat.fortitudeExtraHPs +
        '<br>';
    }
    combat.overallHPValue = hpValue + combat.fortitudeExtraHPs;
  }

  function evalChiStrike(combat) {
    var chiStrikeLevel = combat.player.chiStrikeLevel;
    combat.chiStrikeExtraDamage = Math.floor(combat.overallHPValue *
      chiStrikeLevel * 0.001);
    if (chiStrikeLevel > 0) {
      combat.extraNotes += 'Chi Strike Bonus Damage = ' +
        combat.chiStrikeExtraDamage + '<br>';
    }
  }

  function evalDamage(combat) {
    // Damage:
    evalFortitude(combat);
    evalChiStrike(combat);

    var damageValue = calcDmg(combat);
    combat.overallDamageValue = damageValue +
      combat.deathDealerBonusDamage + combat.counterAttackBonusDamage +
      combat.holyFlameBonusDamage + combat.chiStrikeExtraDamage;
    combat.damageDone = Math.floor(combat.overallDamageValue - (
      combat.generalVariable * combat.creature.armor +
      combat.hpVariable * combat.creature.hp));

    if (combat.hitByHowMuch > 0) {
      var dmgLessArmor = 1;
      if (combat.overallDamageValue >=
          combat.generalVariable * combat.creature.armor) {
        dmgLessArmor = combat.overallDamageValue - combat.generalVariable *
          combat.creature.armor;
      }
      combat.numberOfHitsRequired = Math.ceil(combat.hpVariable *
        combat.creature.hp / dmgLessArmor);
    } else {
      combat.numberOfHitsRequired = '-';
    }
  }

  function calcDef(combat) {
    if (combat.callback.groupExists) {
      return combat.callback.groupDefenseValue;
    }
    return combat.player.defenseValue;
  }

  function evalConstitution(combat) {
    if (combat.player.constitutionLevel > 0) {
      combat.extraNotes += 'Constitution Bonus Defense = ' +
      Math.floor(calcDef(combat) *
      combat.player.constitutionLevel * 0.001) + '<br>';
    }
  }

  function evalFlinch(combat) {
    if (combat.player.flinchLevel > 0) {
      combat.extraNotes += 'Flinch Bonus Attack Reduction = ' +
      Math.floor(combat.creature.attack * combat.player.flinchLevel *
      0.001) + '<br>';
    }
  }

  function evalDefence(combat) {
    combat.overallDefenseValue = calcDef(combat) +
      Math.floor(calcDef(combat) *
      combat.player.constitutionLevel * 0.001) +
      combat.nightmareVisageAttackMovedToDefense;
    evalConstitution(combat);
    evalFlinch(combat);
    combat.creatureHitByHowMuch = Math.floor(combat.attackVariable *
      combat.creature.attack - combat.creature.attack *
      combat.player.flinchLevel * 0.001 - combat.overallDefenseValue);
    if (combat.combatEvaluatorBias === 3) {
      combat.creatureHitByHowMuch = Math.floor(combat.creature.attack -
        combat.creature.attack * combat.player.flinchLevel * 0.001 -
        combat.overallDefenseValue - 50);
    }
  }

  function evalSes(combat) {
    if (combat.player.superEliteSlayerLevel > 0) {
      combat.extraNotes += 'SES Stat Reduction Multiplier = ' +
      combat.player.superEliteSlayerMultiplier + '<br>';
    }
  }

  function evalHolyFlame(combat) {
    combat.holyFlameBonusDamage = 0;
    if (combat.creature.class !== 'Undead') {return;}
    combat.holyFlameBonusDamage = Math.max(Math.floor(
      (combat.player.damageValue - combat.creature.armor) *
      combat.player.holyFlameLevel * 0.002), 0);
    if (combat.player.holyFlameLevel > 0) {
      combat.extraNotes += 'HF Bonus Damage = ' + combat.holyFlameBonusDamage +
      '<br>';
    }
  }

  function calcDdBonus(combat) {
    combat.deathDealerBonusDamage =
      Math.floor(combat.player.damageValue * (Math.min(Math.floor(
        combat.player.killStreakValue / 5) * 0.01 *
        combat.player.deathDealerLevel, 20) / 100));
  }

  function calcCaBonus(combat) {
    combat.counterAttackBonusAttack =
      Math.floor(combat.player.attackValue * 0.0025 *
      combat.player.counterAttackLevel);
    combat.counterAttackBonusDamage =
      Math.floor(combat.player.damageValue * 0.0025 *
      combat.player.counterAttackLevel);
  }

  function evalExtraStam(combat) {
    combat.extraStaminaPerHit = 0;
    if (combat.player.counterAttackLevel > 0) {
      combat.extraStaminaPerHit = Math.ceil(
        (1 + combat.player.doublerLevel / 50) *
        0.0025 * combat.player.counterAttackLevel
      );
    }
  }

  function evalDeathDealer(combat) {
    if (combat.player.deathDealerLevel > 0) {
      combat.extraNotes += 'DD Bonus Damage = ' +
        combat.deathDealerBonusDamage + '<br>';
    }
  }

  function evalCounterAttack(combat) {
    if (combat.player.counterAttackLevel > 0) {
      combat.extraNotes += 'CA Bonus Attack/Damage = ' +
        combat.counterAttackBonusAttack + ' / ' +
        combat.counterAttackBonusDamage + '<br>' +
        'CA Extra Stam Used = ' + combat.extraStaminaPerHit + '<br>';
    }
  }

  function evalExtraBuffs(combat) {
    combat.extraNotes = '';
    evalSes(combat);
    // math section ... analysis
    // Holy Flame adds its bonus after the
    // armor of the creature has been taken off.
    evalHolyFlame(combat);
    // Death Dealer and Counter Attack both applied at the same time
    calcDdBonus(combat);
    calcCaBonus(combat);
    evalExtraStam(combat);
    evalDeathDealer(combat);
    evalCounterAttack(combat);
  }

  function doesGroupExist(combat) {
    if (combat.callback.groupExists) {return 'Group ';}
    return '';
  }

  function headerRow$2(combat) {
    return '<tr><td bgcolor="#CD9E4B" colspan="4" align="center">' +
      doesGroupExist(combat) + 'Combat Evaluation</td></tr>';
  }

  function canIHitIt(combat) {
    if (combat.hitByHowMuch > 0) {return 'Yes';}
    return 'No';
  }

  function willIHitItRow(combat) {
    return '<tr><td align="right"><span style="color:#333333">' +
      'Will I hit it? </td><td align="left">' + canIHitIt(combat) +
      '</td><td align="right"><span style="color:#333333">' +
      'Extra Attack: </td><td align="left">( ' +
      combat.hitByHowMuch + ' )</td></tr>';
  }

  function numberOfHitsRequiredRow(combat) {
    return '<tr><td align="right"><span style="color:#333333">' +
      '# Hits to kill it? </td><td align="left">' +
      combat.numberOfHitsRequired +
      '</td><td align="right"><span style="color:#333333">' +
      'Extra Damage: </td><td align="left">( ' + combat.damageDone +
      ' )</td></tr>';
  }

  function willIBeHit(combat) {
    if (combat.creatureHitByHowMuch >= 0) {return 'Yes';}
    return 'No';
  }

  function willIBeHitRow(combat) {
    return '<tr><td align="right"><span style="color:#333333">' +
      'Will I be hit? </td><td align="left">' + willIBeHit(combat) +
      '</td><td align="right"><span style="color:#333333">' +
      'Extra Defense: </td><td align="left">( ' + -1 *
      combat.creatureHitByHowMuch + ' )</td></tr>';
  }

  function hitsToKillMeRow(combat) {
    return '<tr><td align="right"><span style="color:#333333">' +
      '# Hits to kill me? </td><td align="left">' +
      combat.numberOfCreatureHitsTillDead +
      '</td><td align="right"><span style="color:#333333">' +
      'Extra Armor + HP: </td><td align="left">( ' + -1 *
      combat.creatureDamageDone + ' )</td></tr>';
  }

  function numberOfHitsRow(combat) {
    return '<tr><td align="right"><span style="color:#333333">' +
      '# Player Hits? </td><td align="left">' + combat.playerHits +
      '</td><td align="right"><span style="color:#333333">' +
      '# Creature Hits? </td><td align="left">' + combat.creatureHits +
      '</td></tr>';
  }

  function fightStatusRow(combat) {
    return '<tr><td align="right"><span style="color:#333333">' +
      'Fight Status: </span></td><td align="left" colspan="3"><span>' +
      combat.fightStatus + '</span></td></tr>';
  }

  function notesRow(combat) {
    return '<tr><td align="right"><span style="color:#333333">' +
      'Notes: </span></td><td align="left" colspan="3">' +
      '<span style="font-size:x-small;">' + combat.extraNotes +
      '</span></td></tr>';
  }

  function evalHTML(combat) {
    return '<table width="100%"><tbody>' +
      headerRow$2(combat) +
      willIHitItRow(combat) +
      numberOfHitsRequiredRow(combat) +
      willIBeHitRow(combat) +
      hitsToKillMeRow(combat) +
      numberOfHitsRow(combat) +
      fightStatusRow(combat) +
      notesRow(combat) +
      '</tbody></table>';
  }

  var creatureBody;
  var dnkName;
  var doNotKillBtn;

  function getCreatureBody(dialogViewCreature) {
    if (!creatureBody) {
      var bodyCollection = getElementsByClassName('body', dialogViewCreature);
      if (bodyCollection.length === 1) {
        creatureBody = bodyCollection[0];
      }
    }
  }

  function doNotKillText() {
    if (calf.doNotKillList.includes(dnkName)) {
      return 'Remove from do not kill list';
    }
    return 'Add to the do not kill list';
  }

  function updateText() {
    setText(doNotKillText(), doNotKillBtn);
  }

  function addRemoveCreature() {
    var index = calf.doNotKillList.indexOf(dnkName);
    if (index === -1) {
      calf.doNotKillList.push(dnkName);
    } else {
      calf.doNotKillList.splice(index, 1);
    }
    updateText();
    setValue('doNotKillList', calf.doNotKillList.join());
    afterUpdateActionList(); // refresh the action list
  }

  function makeDnkBtn() {
    doNotKillBtn = createButton({
      className: 'fshBl',
      textContent: doNotKillText(),
      type: 'button'
    });
    var btnContainer = createDiv({
      className: 'description',
      innerHTML: '<span class="ui-helper-hidden-accessible">' +
        '<input type="text"></span>'
    });
    insertElement(btnContainer, doNotKillBtn);
    insertElement(creatureBody, btnContainer);
    on(doNotKillBtn, 'click', addRemoveCreature);
  }

  function doNotKillLink() {
    if (!doNotKillBtn) {
      makeDnkBtn();
    } else {
      updateText();
    }
  }

  function makeDoNotKillLink(thisName, dialogViewCreature) {
    getCreatureBody(dialogViewCreature);
    if (creatureBody) {
      dnkName = thisName;
      doNotKillLink();
    }
  }

  var dialogViewCreature;
  var combatEvalContainer;
  var combatEvaluator;
  var groupEvaluator;

  function getDialogViewCreature() {
    if (!dialogViewCreature) {
      dialogViewCreature = getElementById('dialog-viewcreature');
    }
  }

  function getCombatEvalContainer() {
    if (!combatEvalContainer) {
      combatEvalContainer = createDiv();
      insertElement(dialogViewCreature, combatEvalContainer);
      insertElement(dialogViewCreature, createDiv({
        innerHTML: '<span class="fshFooter">' +
          '*Does include CA, DD, HF, DC, Flinch, Super Elite Slayer, NMV, ' +
          'Sanctuary, Constitution, Fortitude, Chi Strike and ' +
          'Terrorize (if active) and allow for randomness (1.1053). ' +
          'Constitution, NMV, Fortitude and Chi Strike apply to group ' +
          'stats.</span>'
      }));
    }
  }

  function getCombatEvaluator() {
    if (!combatEvaluator) {
      getCombatEvalContainer();
      combatEvaluator = createDiv();
      insertElement(combatEvalContainer, combatEvaluator);
    }
  }

  function getGroupEvaluator() {
    if (!groupEvaluator) {
      getCombatEvaluator();
      groupEvaluator = createDiv();
      insertElement(combatEvalContainer, groupEvaluator);
    }
  }

  function setCombatEvaluator(html) {
    getCombatEvaluator();
    combatEvaluator.innerHTML = html;
  }

  function setGroupEvalalutor(html) {
    getGroupEvaluator();
    groupEvaluator.innerHTML = html;
  }

  function superElite(ses, obj, type) {
    // reduce stats if critter is a SE and player has SES cast on them.
    if (type === 3) {
      obj.attack -= Math.ceil(obj.attack * ses);
      obj.defense -= Math.ceil(obj.defense * ses);
      obj.armor -= Math.ceil(obj.armor * ses);
      obj.damage -= Math.ceil(obj.damage * ses);
      obj.hp -= Math.ceil(obj.hp * ses);
    }
  }

  function creatureData(creature, ses) {
    var obj = {
      name: creature.name,
      'class': creature.creature_class,
      attack: Number(creature.attack),
      defense: Number(creature.defense),
      armor: Number(creature.armor),
      damage: Number(creature.damage),
      hp: Number(creature.hp)
    };
    superElite(ses, obj, creature.type);
    return obj;
  }

  function biasVars(combat) {
    combat.combatEvaluatorBias = calf.combatEvaluatorBias;
    combat.attackVariable = 1.1053;
    combat.generalVariable = calf.generalVariable;
    combat.hpVariable = calf.hpVariable;
  }

  function buffProcessing(combat) {
    evalExtraBuffs(combat);
    evalAttack(combat);
    evalDamage(combat);
    evalDefence(combat);
    evalArmour(combat);
    evalAnalysis(combat);
    evalCA(combat);
  }

  function doCombatEval(data, playerJson, groupData) {
    var combat = {};
    combat.callback = groupData;
    // playerdata
    combat.player = playerDataObject(playerJson);
    biasVars(combat);
    combat.creature = creatureData(data.response.data,
      combat.player.superEliteSlayerMultiplier);
    buffProcessing(combat);
    combat.evaluatorHTML = evalHTML(combat);
    if (groupData.groupExists) {
      setGroupEvalalutor(combat.evaluatorHTML);
    } else {
      setCombatEvaluator(combat.evaluatorHTML);
    }
  }

  function myGroup(el) {
    return el.members[0].name === playerName$1();
  }

  function getGroupId(json) {
    if (isArray(json.r)) {
      return json.r.find(myGroup).id;
    }
  }

  function processGroupStats(data, playerJson, groupJson) {
    if (!groupJson.r || !groupJson.r.attributes) {return;}
    var attr = groupJson.r.attributes;
    doCombatEval(data, playerJson, {
      groupExists: true,
      groupAttackValue: attr[0].value,
      groupDefenseValue: attr[1].value,
      groupArmorValue: attr[2].value,
      groupDamageValue: attr[3].value,
      groupHPValue: attr[4].value
    });
  }

  function getGroupStats$1(data, playerJson, groupId) {
    if (groupId) {
      daGroupStats(groupId).then(partial(processGroupStats, data, playerJson));
    }
  }

  function processGroup(data, playerJson) {
    daViewGroups().then(getGroupId)
      .then(partial(getGroupStats$1, data, playerJson));
  }

  function processPlayer(data, playerJson) {
    if (data.player.hasGroup) {processGroup(data, playerJson);}
    doCombatEval(data, playerJson, {groupExists: false});
  }

  function isValidData(data) {
    return data.response && data.response.data;
  }

  function processCreature(e, data) {
    getDialogViewCreature();
    if (!dialogViewCreature) {return;}
    setCombatEvaluator('');
    setGroupEvalalutor('');
    if (isValidData(data)) {
      makeDoNotKillLink(data.response.data.name, dialogViewCreature);
      myStats(true).then(partial(processPlayer, data));
    }
  }

  function viewCreature() {
    $.subscribe(def_viewCreature, processCreature);
  }

  var huntingBuffs$2;
  var huntingBuffsName$1;

  function setCurrentBuffList() {
    var lookup = [, // eslint-disable-line no-sparse-arrays
      [calf.buffs, calf.buffsName],
      [calf.buffs2, calf.buffs2Name],
      [calf.buffs3, calf.buffs3Name]
    ][calf.enabledHuntingMode];
    if (isArray(lookup)) {
      huntingBuffs$2 = lookup[0];
      huntingBuffsName$1 = lookup[1];
    }
  }

  function toggleEnabledHuntingMode(e) {
    if (e.target.name !== 'enabledHuntingMode') {return;}
    calf.enabledHuntingMode = e.target.value;
    setValue('enabledHuntingMode', calf.enabledHuntingMode);
    setCurrentBuffList();
    GameData.fetch(def_fetch_playerBuffs);
  }

  var hidePlayerActions$2;

  function toggleHidePlayerActions() {
    hidePlayerActions$2 = !hidePlayerActions$2;
    setValue('hidePlayerActions', hidePlayerActions$2);
    GameData.fetch(def_fetch_worldRealmActions);
  }

  function hideActions(el) {
    var verbs = getElementsByClassName('verbs', el);
    if (verbs.length === 1) {
      hideElement(verbs[0]);
    }
  }

  function doHidePlayerActions() {
    if (!hidePlayerActions$2) {return;}
    var act = getElementById('actionList');
    getArrayByClassName('player', act).forEach(hideActions);
  }

  function prepareHidePlayerActions() {
    hidePlayerActions$2 = getValue('hidePlayerActions');
    $.subscribe(def_afterUpdateActionlist, doHidePlayerActions);
    doHidePlayerActions();
  }

  function toggleShowCreatureInfo() {
    calf.showCreatureInfo = !calf.showCreatureInfo;
    setValue('showCreatureInfo', calf.showCreatureInfo);
  }

  function toggleShowHuntingBuffs() {
    calf.showBuffs = !calf.showBuffs;
    setValue('showHuntingBuffs', calf.showBuffs);
    GameData.fetch(def_fetch_playerBuffs);
  }

  function toggleShowMonsterLog() {
    calf.showMonsterLog = !calf.showMonsterLog;
    setValue('showMonsterLog', calf.showMonsterLog);
  }

  function toggleSubLvlCreature() {
    calf.hideSubLvlCreature = !calf.hideSubLvlCreature;
    setValue('hideSubLvlCreature', calf.hideSubLvlCreature);
    GameData.fetch(def_fetch_worldRealmActions);
  }

  function buildPrefsDiv() {
    return createDiv({
      id: 'fshWorldPrefs',
      innerHTML: simpleCheckboxHtml('showCreatureInfo') + '&nbsp;&nbsp;' +
        simpleCheckboxHtml('showMonsterLog') + '&nbsp;&nbsp;' +
        simpleCheckboxHtml('showTitanInfo') + '&nbsp;&nbsp;' +
        simpleCheckboxHtml('showBuffInfo') +
        '<br>' +
        simpleCheckboxHtml('hideSubLvlCreature') + '&nbsp;&nbsp;' +
        simpleCheckboxHtml('hidePlayerActions') + '&nbsp;&nbsp;' +
        huntingBuffsHtml()
    });
  }

  var fshEvents = {
    hideSubLvlCreature: toggleSubLvlCreature,
    hidePlayerActions: toggleHidePlayerActions,
    showCreatureInfo: toggleShowCreatureInfo,
    showHuntingBuffs: toggleShowHuntingBuffs,
    showMonsterLog: toggleShowMonsterLog,
    showTitanInfo: toggleShowTitanInfo,
    showBuffInfo: toggleBuffInfo
  };

  function prefsClickEvent(e) {
    var tmpFn = fshEvents[e.target.name];
    if (isFunction(tmpFn)) {
      e.target.blur();
      tmpFn(e);
    }
  }

  function buildFshDivs() {
    var fshDiv = createDiv({className: 'fshCenter fshFten'});
    var prefsDiv = buildPrefsDiv();
    on(prefsDiv, 'click', prefsClickEvent);
    on(prefsDiv, 'change', toggleEnabledHuntingMode);
    insertElement(fshDiv, prefsDiv);
    var missingBuffsDiv = createDiv();
    insertElement(fshDiv, missingBuffsDiv);
    var tempWorldButtons = getElementById('worldContainerBelow').children[0];
    insertElementBefore(fshDiv, tempWorldButtons);
    return missingBuffsDiv;
  }

  function buildBuffHash(prev, curr) {
    prev[curr.name] = true;
    return prev;
  }

  function findMissingBuffs(buffHash, prev, curr) {
    if (!buffHash[curr.trim()]) {prev.push(curr);}
    return prev;
  }

  function displayMissingBuffs(missingBuffsDiv, missingBuffs) {
    missingBuffsDiv.innerHTML = 'You are missing some ' + huntingBuffsName$1 +
      ' hunting buffs<br>(' + missingBuffs.join(', ') + ')';
  }

  function clearBuffDiv(missingBuffsDiv) {
    missingBuffsDiv.innerHTML = '';
  }

  function lookForMissingBuffs(missingBuffsDiv, data) {
    var buffHash = data.b.reduce(buildBuffHash, {});
    var missingBuffs = huntingBuffs$2.reduce(
      partial(findMissingBuffs, buffHash), []);
    if (missingBuffs.length > 0) {
      displayMissingBuffs(missingBuffsDiv, missingBuffs);
    } else {
      clearBuffDiv(missingBuffsDiv);
    }
  }

  function huntingBuffsEnabled(missingBuffsDiv, evt, data) {
    if (calf.showBuffs) {
      lookForMissingBuffs(missingBuffsDiv, data);
    } else {
      clearBuffDiv(missingBuffsDiv);
    }
  }

  function dataEventsPlayerBuffs(missingBuffsDiv, evt, data) {
    if (huntingBuffs$2) {huntingBuffsEnabled(missingBuffsDiv, evt, data);}
  }

  function doHuntingBuffs(missingBuffsDiv) { // jQuery.min
    setCurrentBuffList();
    var buffsFn = partial(dataEventsPlayerBuffs, missingBuffsDiv);
    $.subscribe(def_playerBuffs, buffsFn);
    if (calf.showBuffs && window.initialGameData) { // HCS initial data
      buffsFn(null, {b: window.initialGameData.player.buffs});
    }
  }

  var bias = [
    {generalVariable: 1.1053, hpVariable: 1.1},
    {generalVariable: 1.1, hpVariable: 1.053},
    {generalVariable: 1.053, hpVariable: 1},
    {generalVariable: 1.1053, hpVariable: 1}
  ];

  function getBiasGeneral(combatEvaluatorBias) {
    if (bias[combatEvaluatorBias]) {
      return bias[combatEvaluatorBias].generalVariable;
    }
    return 1.1053;
  }

  function getBiasHp(combatEvaluatorBias) {
    if (bias[combatEvaluatorBias]) {
      return bias[combatEvaluatorBias].hpVariable;
    }
    return 1.1;
  }

  function getCombatBias() {
    calf.combatEvaluatorBias = getValue('combatEvaluatorBias');
    calf.generalVariable = getBiasGeneral(calf.combatEvaluatorBias);
    calf.hpVariable = getBiasHp(calf.combatEvaluatorBias);
  }

  function noAction(myData) {
    return !myData || !myData.actions || myData.actions.length === 0;
  }

  function subLvlMobs(realmLevel, el) {
    if (el.type === 6) {
      return el.data.creature_type !== 0 || el.data.level >= realmLevel;
    }
    return true;
  }

  function getLvlToTest(myData) {
    return myData.realm && myData.realm.minlevel || GameData.realm().minlevel;
  }

  function xhrDataFilter(data) {
    var myData = jsonParse(data);
    if (noAction(myData)) {return data;}
    myData.actions = myData.actions.filter(
      partial(subLvlMobs, getLvlToTest(myData))
    );
    return JSON.stringify(myData);
  }

  function isActionList(originalOptions) {
    return originalOptions.data &&
      originalOptions.data.d &&
      bitwiseAnd(originalOptions.data.d, def_fetch_worldRealmActions);
  }

  function xhrPreFilter(options, originalOptions) {
    if (calf.hideSubLvlCreature && isActionList(originalOptions)) {
      options.dataFilter = xhrDataFilter;
    }
  }

  function interceptXHR() { // jQuery.min
    $.ajaxPrefilter('JSON', xhrPreFilter);
    if (calf.hideSubLvlCreature) {
      GameData.fetch(def_fetch_worldRealmActions);
    }
  }

  function mappedArray(a) {calf[a[0]] = shouldBeArray(a[1]);}

  function mappedArrays() {
    [
      ['buffs', 'huntingBuffs'],
      ['buffs2', 'huntingBuffs2'],
      ['buffs3', 'huntingBuffs3']
    ].forEach(mappedArray);
  }

  function straightArray(a) {calf[a] = shouldBeArray(a);}

  function straightArrays() {
    [
      'doNotKillList'
    ].forEach(straightArray);
  }

  function arrayType() {
    mappedArrays();
    straightArrays();
  }

  function mappedValue(a) {calf[a[0]] = getValue(a[1]);}

  function mappedValues() {
    [
      ['buffsName', 'huntingBuffsName'],
      ['buffs2Name', 'huntingBuffs2Name'],
      ['buffs3Name', 'huntingBuffs3Name'],
      ['showBuffs', 'showHuntingBuffs']
    ].forEach(mappedValue);
  }

  function straightValue(a) {calf[a] = getValue(a);}

  function straightValues() {
    [
      'enabledHuntingMode',
      'hideSubLvlCreature',
      'showTitanInfo',
      'showBuffInfo',
      'showMonsterLog',
      'showCreatureInfo'
    ].forEach(straightValue);
  }

  function valueType() {
    mappedValues();
    straightValues();
  }

  function getPrefs$1() {
    arrayType();
    valueType();
  }

  function worldPrefs() {
    getCombatBias();
    getPrefs$1();
    var missingBuffsDiv = buildFshDivs();
    interceptXHR();
    doHuntingBuffs(missingBuffsDiv);
    prepareHidePlayerActions();
  }

  function didNotExist(data) {
    return data.response && data.response.msg &&
      data.response.msg.startsWith('Creature did not exist at that location');
  }

  function removeAction(data) {
    if (didNotExist(data)) {
      GameData.fetch(
        def_fetch_worldRealmDynamic +
        def_fetch_worldRealmActions
      );
    }
  }

  function removeElement(el) {el.remove();}

  function hideTitanViewCombat(e, data) {
    removeAction(data);
    querySelectorArray('.creature-4 > .quickCombat > .verbs')
      .forEach(removeElement);
  }

  function hideTitanCombatResults() {
    $.subscribe(def_PvE, hideTitanViewCombat); // TODO Pref
  }

  function hideGroupByType(type) { // jQuery
    $('#actionList li.creature-' + type.toString() + ' a.create-group').hide();
  }

  function hideGroupSubscribe(type) { // jQuery.min
    $.subscribe(def_afterUpdateActionlist, partial(hideGroupByType, type));
  }

  var hideGroupTypes = [
    'hideChampionsGroup',
    'hideElitesGroup',
    'hideSEGroup',
    'hideTitanGroup',
    'hideLegendaryGroup'
  ];

  function groupType(el, i) {
    if (getValue(el)) {
      hideGroupSubscribe(i + 1);
      hideGroupByType(i + 1);
    }
  }

  function hideGroupButton() {
    hideGroupTypes.forEach(groupType);
  }

  function injectMonsterStyle() {
    insertElement(document.body, createStyle(
      '#actionList .creature-1 {color: green;}\n' +
      '#actionList .creature-2 {color: yellow;}\n' +
      '#actionList .creature-3 {color: red;}'
    ));
  }

  function doMonsterColors() {
    if (getValue('enableCreatureColoring')) {injectMonsterStyle();}
  }

  function doRepair$1(e, key) {
    if (key === 'ACT_REPAIR') {
      GameData.fetch(
        def_fetch_playerBackpackCount +
        def_fetch_playerBuffs +
        def_fetch_worldRealmDynamic +
        def_fetch_worldRealmActions
      );
    }
  }

  function repairButton() {
    $.subscribe(def_controlsKeydown, doRepair$1);
  }

  function msgCenterOffset() {
    $('#messageCenter').worldMessageCenter({offset: '0 60'});
  }

  function hideMapTooltip() {
    hideQTip('#mapTooltip');
  }

  function fixDebuffQTip(e) {
    hideQTip(e.target);
  }

  function fixDebuff() {
    on(getElementById('buffList'), 'click', fixDebuffQTip);
  }

  function subscribes() {
    executeAll([
      worldPrefs,
      injectSendGoldOnWorld,
      viewCreature,
      hideGroupButton,
      doMonsterColors,
      doNotKill,
      startMonsterLog,
      repairButton,
      combatLogger,
      onWorld,
      prepareShop,
      injectRelic,
      msgCenterOffset,
      hideMapTooltip,
      initButtons,
      buffInfo,
      fixDebuff,
      interceptMouseEvents,
      hideTitanCombatResults
    ]);
  }

  // -1 = world page
  // 0 = quest responce
  // 1 = view creature
  // 2 = attack creature
  // 3 = attack player
  // 4 = move
  // 5 = use stair
  // 6 = use chest
  // 7 = take portal
  // 9 = view relic
  // 10 = empower relic
  // 11 = take relic
  // 12 = create group
  // 13 = view shop
  // 14 = purchase item
  // 15 = repair
  // 17 = login
  // 18 = username not found

  function isNewMap() {
    return jQueryPresent() && getElementById('worldPage') && window.GameData;
  }

  function injectWorld() {
    if (isNewMap()) {subscribes();}
  }

  var invAmount;
  var invResultHeader;
  var invResults;

  function processResult$2(r) {
    if (r.item) {
      return '<span class="fshGreen">You successfully invented the item [' +
        r.item.n + '].</span>';
    }
    return '<span class="fshRed">You have failed to invent the item.</span>';
  }

  function quickInventDone(json) {
    if (jsonFail(json, invResults)) {return;}
    outputResult(processResult$2(json.r), invResults);
  }

  function initResults(str) {
    invResultHeader.innerHTML = str;
    invResults.innerHTML = '';
  }

  function quickInvent() {
    var amountToInvent = Number(invAmount.value);
    if (!amountToInvent) {
      initResults('');
      return;
    }
    var recipeID = querySelector('input[name="recipe_id"]').value;
    initResults('Inventing ' + String(amountToInvent) + ' Items');
    for (var i = 0; i < amountToInvent; i += 1) {
      daDoInvent(recipeID).then(quickInventDone);
    }
  }

  function makeCell$1(injector) {
    var myRow = injector.insertRow(-1);
    var myCell = myRow.insertCell(-1);
    myCell.className = 'fshCenter';
    return myCell;
  }

  function makeInvAmount(myCell) {
    insertTextBeforeEnd(myCell, 'Select how many to quick invent');
    invAmount = createInput({
      className: 'custominput fshNumberInput',
      min: 0,
      type: 'number',
      value: 1
    });
    insertElement(myCell, invAmount);
  }

  function makeQuickInv(myCell) {
    var quickInv = createInput({
      className: 'custombutton',
      type: 'button',
      value: 'Quick invent items'
    });
    insertElement(myCell, quickInv);
    on(quickInv, 'click', quickInvent);
  }

  function makeInvResultHeader(myCell) {
    invResultHeader = createSpan();
    insertElement(myCell, invResultHeader);
  }

  function makeInvResults(myCell) {
    invResults = createOl();
    insertElement(myCell, invResults);
  }

  function resultContainer(myCell) {
    makeInvResultHeader(myCell);
    makeInvResults(myCell);
  }

  function makeLayout(injector) {
    makeInvAmount(makeCell$1(injector));
    makeQuickInv(makeCell$1(injector));
    resultContainer(makeCell$1(injector));
  }

  function injectInvent() {
    makeLayout(pCC.lastElementChild);
  }

  function getDoc(doc, context) {
    if (doc instanceof HTMLDocument) {return doc;}
    if (context) {return context.ownerDocument;}
    return document;
  }

  function xPathEvaluate(type, expr, _doc, _context) {
    var doc = getDoc(_doc, _context);
    var context = fallback(_context, doc);
    return doc.evaluate(expr, context, null, type, null);
  }

  function xPath(expr, doc, context) {
    return xPathEvaluate(XPathResult.ANY_UNORDERED_NODE_TYPE,
      expr, doc, context).singleNodeValue;
  }

  function getItemId(el) {
    if (!el) {return;}
    var match = el.src.match(/\/items\/(\d+)\.gif/);
    if (match) {return match[1];}
  }

  function guideItemHref(itemId) {
    return guideUrl + 'items' + def_subcmd + 'view&item_id=' + itemId;
  }

  function makeGuideItemAnchor(itemId) {
    return createAnchor({
      href: guideItemHref(itemId),
      target: '_blank'
    });
  }

  function wrapInGuideLink(el, source) {
    var itemId = getItemId(source);
    if (!itemId) {return;}
    var myLink = makeGuideItemAnchor(itemId);
    insertElementBefore(myLink, el);
    insertElement(myLink, el);
  }

  function wrapImgInGuideLink(el) {
    wrapInGuideLink(el, el);
  }

  function makeNameLink() {
    var source = xPath(
      './/b[.="Target Invention"]/../../following-sibling::*[1]//img');
    var recipe = querySelector('#pCC b');
    wrapInGuideLink(recipe, source);
  }

  function makeIngredientLinks() {
    var ingredients = querySelectorArray('#pCC img[src*="/items/"]');
    ingredients.forEach(wrapImgInGuideLink);
  }

  function injectViewRecipe() {
    makeNameLink();
    makeIngredientLinks();
  }

  function inventing() {
    if (jQueryPresent()) {
      injectViewRecipe();
      injectInvent();
    }
  }

  function isNotBound() {
    return !xPath('.//*[text() = "This item is bound"]');
  }

  function isNotComponent() {
    return !containsText('Component',
      xPath('.//tr[td/b/text() = "Type:"]/td[2]'));
  }

  function ahItemHref(name) {
    return 'https://www.fallensword.com/' + ahSearchUrl + name;
  }

  function insertAhLink(target) {
    insertHtmlBeforeEnd(target.parentNode, ' [<a href="' +
      ahItemHref(getText(target)) +
      '" target="_blank"><b class="fshBlue">AH</b></a>]');
  }

  function itemsView() {
    if (isNotBound() && isNotComponent()) {
      insertAhLink(querySelector('.tHeader').children[0]);
    }
  }

  var items = {
    '-': {'-': allowBack},
    view: {'-': itemsView}
  };

  function isMyRow(thisRow) {
    return thisRow.cells.length > 1 &&
      getTextTrim(thisRow.cells[1]) === playerName$1();
  }

  function prepareRow(thisRow) {
    const pvpRating = intValue(getTextTrim(thisRow.cells[3]));
    insertHtmlAfterBegin(thisRow.cells[3],
      '<span class="fshBlue fshXSmall">(' +
      addCommas(pvpRating - 250) + ')</span>&nbsp;');
  }

  function margin() {
    const vlHeader = getArrayByTagName('td', pCC).filter(contains('VL'));
    if (vlHeader.length === 1) {
      const thisRows = vlHeader[0].parentNode.parentNode.rows;
      arrayFrom(thisRows).filter(isMyRow).forEach(prepareRow);
    }
  }

  function formatLastReset(lastLadderReset) {
    var m = Math.floor((now - lastLadderReset) / 60000);
    var h = Math.floor(m / 60);
    m %= 60;
    return outputFormat(h, ' hours, ') + m + ' mins';
  }

  function formatTime$1() {
    var lastLadderReset = getValue('lastLadderReset');
    if (lastLadderReset < now - 48 * 60 * 60 * 1000) {
      return '<span class="fshLink tip-static" data-tipped="FSH has not seen ' +
        'the last ladder reset.<br>You can find it in your log if you ' +
        'qualified<br>or Tavern Rumours.">???</span>';
    }
    return formatLastReset(lastLadderReset);
  }

  function makeLeftCell(newRow) {
    var leftCell = newRow.insertCell(-1);
    leftCell.height = 25;
    setText('Last Reset:', leftCell);
  }

  function makeRightCell(newRow) {
    var rightCell = newRow.insertCell(-1);
    rightCell.align = 'right';
    rightCell.innerHTML = formatTime$1();
  }

  function makeNewRow() {
    var newRow = createTr();
    makeLeftCell(newRow);
    makeRightCell(newRow);
    return newRow;
  }

  function lastReset() {
    var topTable = querySelector('#pCC table');
    var newRow = makeNewRow();
    insertElement(topTable, newRow);
  }

  function ladder() {
    allowBack$1();
    lastReset();
    margin();
  }

  var log$1 = {
    '-': {'-': playerLog},
    outbox: {'-': outbox}
  };

  var amt;
  var prc;
  var warn;

  function getAmount() {
    if (!amt) {amt = getElementById('amount');}
    return amt;
  }

  function getPrice$1() {
    if (!prc) {prc = getElementById('price');}
    return prc;
  }

  function getWarning() {
    if (!warn) {
      var requestTable = closestTable(getAmount());
      var newRow = requestTable.insertRow(2);
      warn = newRow.insertCell(0);
      warn.colSpan = '2';
      warn.className = 'fshCenter';
    }
    return warn;
  }

  function totalPrice(amount, sellPrice) {
    var gross = amount * sellPrice;
    return gross + Math.ceil(gross / 200);
  }

  function marketplaceWarning(sellPrice) {
    var amount = getAmount().value;
    getWarning().innerHTML = '<span class="fshBlue">You are offering to buy ' +
      '<b>' + amount + '</b> FSP for >> <b>' + addCommas(sellPrice) +
      '</b> (Total: ' + addCommas(totalPrice(amount, sellPrice)) + ')</span>';
  }

  function clearWarning() {
    if (warn && warn.innerHTML !== '') {warn.innerHTML = '';}
  }

  function addMarketplaceWarning() {
    var price = getPrice$1();
    if (price) {
      var sellPrice = price.value;
      if (sellPrice.search(/^[0-9]+$/) !== -1) {
        marketplaceWarning(sellPrice);
      } else {clearWarning();}
    }
  }

  function marketplace() {
    on(pCC, 'keyup', addMarketplaceWarning);
  }

  var ladderResetPref = 'lastLadderReset';
  var lastLadderReset$1;

  function checkForPvPLadder(row) {
    if (containsText('PvP Ladder', row.children[1].children[0])) {
      var logTime = parseDateAsTimestamp$1(
        getText(row.children[1].children[2]).replace('Posted: ', ''));
      if (logTime > lastLadderReset$1) {
        setValue(ladderResetPref, logTime);
        lastLadderReset$1 = logTime;
      }
    }
  }

  function testArticle$1(rowType) {return rowType > 1;}

  function setupPref$2(prefName, rowInjector) {
    insertHtmlAfterEnd(rowInjector, simpleCheckbox(prefName));
  }

  function viewArchive() {
    lastLadderReset$1 = getValue(ladderResetPref);
    var prefName = 'collapseNewsArchive';
    var theTables = getElementsByTagName(def_table, pCC);
    if (theTables.length > 2) {
      setupPref$2(prefName, theTables[0].rows[2]);
      collapse({
        prefName: prefName,
        theTable: theTables[2],
        headInd: 6,
        articleTest: testArticle$1,
        extraFn: checkForPvPLadder
      });
    }
  }

  var maxcharacters;
  var textArea$2;
  var shoutboxPreview;

  function updateShoutboxPreview() {
    var textContent = textArea$2.value;
    var chars = textContent.length;
    if (chars > maxcharacters) {
      textContent = textContent.substring(0, maxcharacters);
      textArea$2.value = textContent;
      chars = maxcharacters;
    }
    if (!shoutboxPreview) {
      shoutboxPreview = textArea$2.parentNode.parentNode.parentNode.parentNode
        .insertRow().insertCell();
    }
    shoutboxPreview.innerHTML = '<table class="sbpTbl"><tbody><tr>' +
      '<td class="sbpHdr">Preview (' + chars + '/' + maxcharacters +
      ' characters)</td></tr><tr><td class="sbpMsg"><span>' + textContent +
      '</span></td></tr></tbody></table>';
  }

  function injectShoutboxWidgets() {
    textArea$2 = getElementById('textInputBox');
    on(textArea$2, 'keyup', updateShoutboxPreview);
  }

  function newsFsbox() {
    maxcharacters = 100;
    injectShoutboxWidgets();
  }

  function newsShoutbox() {
    maxcharacters = 150;
    injectShoutboxWidgets();
  }

  var news = {
    fsbox: {'-': newsFsbox},
    shoutbox: {'-': newsShoutbox},
    viewupdatearchive: {'-': viewArchive},
    viewarchive: {'-': viewArchive}
  };

  function guideButtons(questID, questName) {
    return '<div class="parent">' +
      '<a href="' + guideUrl + 'quests&' +
      'subcmd=view&quest_id=' + questID + '" class="tip-static" ' +
      'data-tipped="Search for this quest on the Ultimate Fallen Sword Guide" ' +
      'style="background-image: url(\'' + imageServer +
      '/temple/1.gif\');" target="_blank"></a>&nbsp;' +
      '<a href="https://wiki.fallensword.com/index.php?title=' +
      questName.replace(/ /g, '_') + '" class="tip-static" ' +
      'data-tipped="Search for this quest on the Wiki" ' +
      'style="background-image: url(\'' + imageServer +
      '/skin/fs_wiki.gif\');" target="_blank"></a></div>';
  }

  function isHideQuests() {
    if (getValue('hideQuests')) {
      return shouldBeArray('hideQuestNames');
    }
    return [];
  }

  function doHideQuests(hideQuests, questName, aRow) {
    if (hideQuests.includes(questName)) {
      var target = aRow;
      hideElement(target);
      for (var i = 0; i < 3; i++) {
        target = target.nextElementSibling;
        hideElement(target);
      }
    }
  }

  function decorate$3(questsToHide, aRow) {
    var questName = replaceDoubleSpace(getTextTrim(aRow.cells[0]));
    doHideQuests(questsToHide, questName, aRow);
    var questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
    aRow.cells[4].innerHTML = guideButtons(questID, questName);
  }

  function injectQuestRow(questTable) {
    var questsToHide = isHideQuests();
    arrayFrom(questTable.rows).filter(dataRows(5, 0))
      .forEach(partial(decorate$3, questsToHide));
  }

  function updateUrl$5(evt) {
    if (evt.target.type !== 'submit') {
      return;
    }
    evt.preventDefault();
    dontPost(closestTable(evt.target).parentNode);
  }

  var normalLink;
  var seasonLink;
  var activeLink;
  var completeLink;
  var notStartedLink;
  var currentPageValue;

  var currentLocationValue = [0, 3, 0, 1, 2];

  var savePrefKey = [
    'lastNormalActiveQuestPage',
    'lastNormalCompletedQuestPage',
    'lastNormalNotStartedQuestPage',
    'lastSeasonalActiveQuestPage',
    'lastSeasonalCompletedQuestPage',
    'lastSeasonalNotStartedQuestPage'
  ];

  function pageCombo(aLinks, prev, curr, i) {
    if (aLinks[i].children[0].getAttribute('color') === '#FF0000') {
      return prev + curr;
    }
    return prev;
  }

  function whereAmI() {
    var aLinks = getElementsByTagName('a', pCC);
    normalLink = aLinks[0];
    seasonLink = aLinks[1];
    activeLink = aLinks[2];
    completeLink = aLinks[3];
    notStartedLink = aLinks[4];
    currentPageValue = currentLocationValue.reduce(partial(pageCombo, aLinks), 0);
  }

  function storeLoc() {
    var lastQBPage = location.search;
    setValue('lastActiveQuestPage', lastQBPage);
    setValue(savePrefKey[currentPageValue], lastQBPage);
  }

  function getPref(pref) {return getValue(pref);}

  function getPrevVals() {
    return savePrefKey.map(getPref);
  }

  function oppositeType(lastPages) {
    return [
      lastPages[3],
      lastPages[4],
      lastPages[5],
      lastPages[0],
      lastPages[1],
      lastPages[2]
    ];
  }

  function setLink(aLink, url) {
    if (url.length > 0) {
      aLink.setAttribute('href', url);
    }
  }

  function subset(lastPages, i) {
    setLink(activeLink, lastPages[i]);
    setLink(completeLink, lastPages[i + 1]);
    setLink(notStartedLink, lastPages[i + 2]);
  }

  function updateLinks() {
    var lastPages = getPrevVals();
    var oppositeTypeUrl = oppositeType(lastPages);

    if (currentPageValue < 3) {
      setLink(seasonLink, oppositeTypeUrl[currentPageValue]);
      subset(lastPages, 0);
    } else {
      setLink(normalLink, oppositeTypeUrl[currentPageValue]);
      subset(lastPages, 3);
    }
  }

  function storeQuestPage() {
    if (getValue('storeLastQuestPage')) {
      whereAmI();
      storeLoc();
      updateLinks();
    }
  }

  function injectQuestBookFull() {
    on(pCC, 'click', updateUrl$5);
    storeQuestPage();
    var questTable = getElementsByTagName(def_table, pCC)[5];
    if (!questTable) {return;}
    injectQuestRow(questTable);
  }

  const success$1 = e => ' ' + e[0] + ' (' + getStamAsString(e[1]) +
    ' stamina)<br>';
  const reject = e => ' <span class="fshRed">' + e[0] + '</span><br>';

  function logFormat(timeStamp, el) {
    let result;
    if (el[1]) {
      result = success$1(el);
    } else {
      result = reject(el);
    }
    return timeStamp + result;
  }

  function buffResult(buffLog) {
    var timeStamp = formatLocalDateTime(new Date());
    const buffsAttempted = buffReportParser(document)
      .map(partial(logFormat, timeStamp));
    setForage(fshBuffLog, buffsAttempted.reverse().join('') + buffLog);
  }

  function updateBuffLog() {
    if (!getValue('keepBuffLog')) {return;}
    getForage(fshBuffLog).then(buffResult);
  }

  var unknown = [
    [
      function() {return getElementById('quickbuff-report');},
      function() {
        screenview('unknown.buffLog.updateBuffLog');
        updateBuffLog();
      }
    ],
    [
      function() {return xPath('//td[.="Quest Name"]');},
      function() {
        screenview('unknown.questBook.injectQuestBookFull');
        injectQuestBookFull();
      }
    ],
    [
      function() {return $('#pCC img[title="Inventing"]').length > 0;},
      function() {
        screenview('unknown.recipes.inventing');
        inventing();
      }
    ],
    [
      function() {return true;},
      function() {console.log('Fell through!');} // eslint-disable-line no-console
    ]
  ];

  function aMatch(el) {return el[0];}

  function unknownPage() { // Legacy
    if (jQueryNotPresent()) {return;}
    console.log('unknownPage'); // eslint-disable-line no-console
    unknown.find(aMatch)[1]();
  }

  var noCmd = {
    viewupdatearchive: {'-': viewArchive},
    viewarchive: {'-': viewArchive},
    '-': {'-': unknownPage}
  };

  function rowHtml(aRow, withCommas) {
    return '<td>' +
      `<a href="${playerIdUrl}${aRow.player.id}">${aRow.player.name}</a>` +
      '</td>' +
      `<td>${aRow.player.level}</td>` +
      `<td>${aRow.player.rank}</td>` +
      `<td>${withCommas[6]}</td>` +
      `<td>${withCommas[7]}</td>` +
      `<td>${withCommas[0]}</td>` +
      `<td>${withCommas[1]}</td>` +
      `<td>${withCommas[2]}</td>` +
      `<td>${withCommas[3]}</td>` +
      `<td>${withCommas[4]}</td>` +
      `<td>${withCommas[8]}</td>` +
      `<td>${withCommas[5]}</td>`;
  }

  function rowFactory(aRow) {
    let dom = aRow.dom;
    if (!dom) {
      dom = createTr(
        {innerHTML: rowHtml(aRow, aRow.stats.map(addCommas))}
      );
    }
    return dom;
  }

  function displayChange(domTable, displayed) {
    const domTBody = domTable.tBodies[0];
    const thisTBody = createTBody();
    for (let r of displayed) {
      thisTBody.appendChild(rowFactory(r.value));
    }
    domTable.replaceChild(thisTBody, domTBody);
  }

  const swap = (f) => (a, b) => f(b, a);
  const compose = (first, ...fns) => (...args) => fns.reduce((previous, current) => current(previous), first(...args));
  const curry = (fn, arityLeft) => {
      const arity = arityLeft || fn.length;
      return (...args) => {
          const argLength = args.length || 1;
          if (arity === argLength) {
              return fn(...args);
          }
          const func = (...moreArgs) => fn(...args, ...moreArgs);
          return curry(func, arity - args.length);
      };
  };
  const apply = (fn) => (...args) => fn(...args);
  const tap = (fn) => arg => {
      fn(arg);
      return arg;
  };

  const pointer = (path) => {
      const parts = path.split('.');
      const partial = (obj = {}, parts = []) => {
          const p = parts.shift();
          const current = obj[p];
          return (current === undefined || current === null || parts.length === 0) ?
              current : partial(current, parts);
      };
      const set = (target, newTree) => {
          let current = target;
          const [leaf, ...intermediate] = parts.reverse();
          for (const key of intermediate.reverse()) {
              if (current[key] === undefined) {
                  current[key] = {};
                  current = current[key];
              }
          }
          current[leaf] = Object.assign(current[leaf] || {}, newTree);
          return target;
      };
      return {
          get(target) {
              return partial(target, [...parts]);
          },
          set
      };
  };

  const defaultComparator = (a, b) => {
      if (a === b) {
          return 0;
      }
      if (a === undefined) {
          return 1;
      }
      if (b === undefined) {
          return -1;
      }
      return a < b ? -1 : 1;
  };
  var SortDirection;
  (function (SortDirection) {
      SortDirection["ASC"] = "asc";
      SortDirection["DESC"] = "desc";
      SortDirection["NONE"] = "none";
  })(SortDirection || (SortDirection = {}));
  const sortByProperty = (prop, comparator) => {
      const propGetter = pointer(prop).get;
      return (a, b) => comparator(propGetter(a), propGetter(b));
  };
  const defaultSortFactory = (conf) => {
      const { pointer: pointer$$1, direction = "asc" /* ASC */, comparator = defaultComparator } = conf;
      if (!pointer$$1 || direction === "none" /* NONE */) {
          return (array) => [...array];
      }
      const orderFunc = sortByProperty(pointer$$1, comparator);
      const compareFunc = direction === "desc" /* DESC */ ? swap(orderFunc) : orderFunc;
      return (array) => [...array].sort(compareFunc);
  };

  var Type;
  (function (Type) {
      Type["BOOLEAN"] = "boolean";
      Type["NUMBER"] = "number";
      Type["DATE"] = "date";
      Type["STRING"] = "string";
  })(Type || (Type = {}));
  const typeExpression = (type) => {
      switch (type) {
          case Type.BOOLEAN:
              return Boolean;
          case Type.NUMBER:
              return Number;
          case Type.DATE:
              return val => new Date(val);
          case Type.STRING:
              return compose(String, val => val.toLowerCase());
          default:
              return val => val;
      }
  };
  var FilterOperator;
  (function (FilterOperator) {
      FilterOperator["INCLUDES"] = "includes";
      FilterOperator["IS"] = "is";
      FilterOperator["IS_NOT"] = "isNot";
      FilterOperator["LOWER_THAN"] = "lt";
      FilterOperator["GREATER_THAN"] = "gt";
      FilterOperator["GREATER_THAN_OR_EQUAL"] = "gte";
      FilterOperator["LOWER_THAN_OR_EQUAL"] = "lte";
      FilterOperator["EQUALS"] = "equals";
      FilterOperator["NOT_EQUALS"] = "notEquals";
      FilterOperator["ANY_OF"] = "anyOf";
  })(FilterOperator || (FilterOperator = {}));
  const not = fn => input => !fn(input);
  const is = value => input => Object.is(value, input);
  const lt = value => input => input < value;
  const gt = value => input => input > value;
  const equals = value => input => value === input;
  const includes$1 = value => input => input.includes(value);
  const anyOf = value => input => value.includes(input);
  const operators = {
      ["includes" /* INCLUDES */]: includes$1,
      ["is" /* IS */]: is,
      ["isNot" /* IS_NOT */]: compose(is, not),
      ["lt" /* LOWER_THAN */]: lt,
      ["gte" /* GREATER_THAN_OR_EQUAL */]: compose(lt, not),
      ["gt" /* GREATER_THAN */]: gt,
      ["lte" /* LOWER_THAN_OR_EQUAL */]: compose(gt, not),
      ["equals" /* EQUALS */]: equals,
      ["notEquals" /* NOT_EQUALS */]: compose(equals, not),
      ["anyOf" /* ANY_OF */]: anyOf
  };
  const every = fns => (...args) => fns.every(fn => fn(...args));
  const predicate = ({ value = '', operator = "includes" /* INCLUDES */, type }) => {
      const typeIt = typeExpression(type);
      const operateOnTyped = compose(typeIt, operators[operator]);
      const predicateFunc = operateOnTyped(value);
      return compose(typeIt, predicateFunc);
  };
  // Avoid useless filter lookup (improve perf)
  const normalizeClauses = (conf) => {
      const output = {};
      const validPath = Object.keys(conf).filter(path => Array.isArray(conf[path]));
      validPath.forEach(path => {
          const validClauses = conf[path].filter(c => c.value !== '');
          if (validClauses.length > 0) {
              output[path] = validClauses;
          }
      });
      return output;
  };
  const filter = (filter) => {
      const normalizedClauses = normalizeClauses(filter);
      const funcList = Object.keys(normalizedClauses).map(path => {
          const getter = pointer(path).get;
          const clauses = normalizedClauses[path].map(predicate);
          return compose(getter, every(clauses));
      });
      const filterPredicate = every(funcList);
      return array => array.filter(filterPredicate);
  };

  const basic = (input) => {
      const { value, scope = [], isCaseSensitive = false } = input;
      const searchPointers = scope.map(field => pointer(field).get);
      if (scope.length === 0 || !value) {
          return (array) => array;
      }
      const test = isCaseSensitive === true ? String(value) : String(value).toLowerCase();
      return (array) => array.filter(item => searchPointers.some(p => {
          const v = isCaseSensitive === true ? String(p(item)) : String(p(item)).toLowerCase();
          return v.includes(test);
      }));
  };

  function re(strs, ...substs) {
      let reStr = transformRaw(strs.raw[0]);
      for (const [i, subst] of substs.entries()) {
          if (subst instanceof RegExp) {
              reStr += subst.source;
          } else if (typeof subst === 'string') {
              reStr += quoteText(subst);
          } else {
              throw new Error('Illegal substitution: '+subst);
          }
          reStr += transformRaw(strs.raw[i+1]);
      }
      let flags = '';
      if (reStr.startsWith('/')) {
          const lastSlashIndex = reStr.lastIndexOf('/');
          if (lastSlashIndex === 0) {
              throw new Error('If the `re` string starts with a slash, it must end with a second slash and zero or more flags: '+reStr);
          }
          flags = reStr.slice(lastSlashIndex+1);
          reStr = reStr.slice(1, lastSlashIndex);
      }
      return new RegExp(reStr, flags);
  }

  function transformRaw(str) {
      return str.replace(/\\`/g, '`');
  }

  /**
   * All special characters are escaped, because you may want to quote several characters inside parentheses or square brackets.
   */
  function quoteText(text) {
      return text.replace(/[\\^$.*+?()[\]{}|=!<>:-]/g, '\\$&');
  }

  const regexp = (input) => {
      const { value, scope = [], escape = false, flags = '' } = input;
      const searchPointers = scope.map(field => pointer(field).get);
      if (scope.length === 0 || !value) {
          return (array) => array;
      }
      const regex = escape === true ? re `/${value}/${flags}` : new RegExp(value, flags);
      return (array) => array.filter(item => searchPointers.some(p => regex.test(String(p(item)))));
  };

  const emitter = () => {
      const listenersLists = {};
      const instance = {
          on(event, ...listeners) {
              listenersLists[event] = (listenersLists[event] || []).concat(listeners);
              return instance;
          },
          dispatch(event, ...args) {
              const listeners = listenersLists[event] || [];
              for (const listener of listeners) {
                  listener(...args);
              }
              return instance;
          },
          off(event, ...listeners) {
              if (event === undefined) {
                  Object.keys(listenersLists).forEach(ev => instance.off(ev));
              }
              else {
                  const list = listenersLists[event] || [];
                  listenersLists[event] = listeners.length ? list.filter(listener => !listeners.includes(listener)) : [];
              }
              return instance;
          }
      };
      return instance;
  };
  const proxyListener = (eventMap) => ({ emitter }) => {
      const eventListeners = {};
      const proxy = {
          off(ev) {
              if (!ev) {
                  Object.keys(eventListeners).forEach(eventName => proxy.off(eventName));
              }
              if (eventListeners[ev]) {
                  emitter.off(ev, ...eventListeners[ev]);
              }
              return proxy;
          }
      };
      for (const ev of Object.keys(eventMap)) {
          const method = eventMap[ev];
          eventListeners[ev] = [];
          proxy[method] = function (...listeners) {
              eventListeners[ev] = eventListeners[ev].concat(listeners);
              emitter.on(ev, ...listeners);
              return proxy;
          };
      }
      return proxy;
  };

  const sliceFactory = ({ page = 1, size } = { page: 1 }) => (array = []) => {
      const actualSize = size || array.length;
      const offset = (page - 1) * actualSize;
      return array.slice(offset, offset + actualSize);
  };

  var SmartTableEvents;
  (function (SmartTableEvents) {
      SmartTableEvents["TOGGLE_SORT"] = "TOGGLE_SORT";
      SmartTableEvents["DISPLAY_CHANGED"] = "DISPLAY_CHANGED";
      SmartTableEvents["PAGE_CHANGED"] = "CHANGE_PAGE";
      SmartTableEvents["EXEC_CHANGED"] = "EXEC_CHANGED";
      SmartTableEvents["FILTER_CHANGED"] = "FILTER_CHANGED";
      SmartTableEvents["SUMMARY_CHANGED"] = "SUMMARY_CHANGED";
      SmartTableEvents["SEARCH_CHANGED"] = "SEARCH_CHANGED";
      SmartTableEvents["EXEC_ERROR"] = "EXEC_ERROR";
  })(SmartTableEvents || (SmartTableEvents = {}));
  const curriedPointer = (path) => {
      const { get, set } = pointer(path);
      return { get, set: curry(set) };
  };
  const tableDirective = ({ sortFactory, tableState, data, filterFactory, searchFactory }) => {
      let filteredCount = data.length;
      let matchingItems = data;
      const table = emitter();
      const sortPointer = curriedPointer('sort');
      const slicePointer = curriedPointer('slice');
      const filterPointer = curriedPointer('filter');
      const searchPointer = curriedPointer('search');
      // We need to register in case the summary comes from outside (like server data)
      table.on("SUMMARY_CHANGED" /* SUMMARY_CHANGED */, ({ filteredCount: count }) => {
          filteredCount = count;
      });
      const safeAssign = curry((base, extension) => Object.assign({}, base, extension));
      const dispatch = curry(table.dispatch, 2);
      const dispatchSummary = (filtered) => {
          matchingItems = filtered;
          return dispatch("SUMMARY_CHANGED" /* SUMMARY_CHANGED */, {
              page: tableState.slice.page,
              size: tableState.slice.size,
              filteredCount: filtered.length
          });
      };
      const exec = ({ processingDelay = 20 } = { processingDelay: 20 }) => {
          table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
          setTimeout(() => {
              try {
                  const filterFunc = filterFactory(filterPointer.get(tableState));
                  const searchFunc = searchFactory(searchPointer.get(tableState));
                  const sortFunc = sortFactory(sortPointer.get(tableState));
                  const sliceFunc = sliceFactory(slicePointer.get(tableState));
                  const execFunc = compose(filterFunc, searchFunc, tap(dispatchSummary), sortFunc, sliceFunc);
                  const displayed = execFunc(data);
                  table.dispatch("DISPLAY_CHANGED" /* DISPLAY_CHANGED */, displayed.map(d => ({
                      index: data.indexOf(d),
                      value: d
                  })));
              }
              catch (err) {
                  table.dispatch("EXEC_ERROR" /* EXEC_ERROR */, err);
              }
              finally {
                  table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: false });
              }
          }, processingDelay);
      };
      const updateTableState = curry((pter, ev, newPartialState) => compose(safeAssign(pter.get(tableState)), tap(dispatch(ev)), pter.set(tableState))(newPartialState));
      const resetToFirstPage = () => updateTableState(slicePointer, "CHANGE_PAGE" /* PAGE_CHANGED */, { page: 1 });
      const tableOperation = (pter, ev) => compose(updateTableState(pter, ev), resetToFirstPage, () => table.exec() // We wrap within a function so table.exec can be overwritten (when using with a server for example)
      );
      const api = {
          sort: tableOperation(sortPointer, "TOGGLE_SORT" /* TOGGLE_SORT */),
          filter: tableOperation(filterPointer, "FILTER_CHANGED" /* FILTER_CHANGED */),
          search: tableOperation(searchPointer, "SEARCH_CHANGED" /* SEARCH_CHANGED */),
          slice: compose(updateTableState(slicePointer, "CHANGE_PAGE" /* PAGE_CHANGED */), () => table.exec()),
          exec,
          async eval(state = tableState) {
              const sortFunc = sortFactory(sortPointer.get(state));
              const searchFunc = searchFactory(searchPointer.get(state));
              const filterFunc = filterFactory(filterPointer.get(state));
              const sliceFunc = sliceFactory(slicePointer.get(state));
              const execFunc = compose(filterFunc, searchFunc, sortFunc, sliceFunc);
              return execFunc(data).map(d => ({ index: data.indexOf(d), value: d }));
          },
          onDisplayChange(fn) {
              table.on("DISPLAY_CHANGED" /* DISPLAY_CHANGED */, fn);
          },
          getTableState() {
              const sort = Object.assign({}, tableState.sort);
              const search = Object.assign({}, tableState.search);
              const slice = Object.assign({}, tableState.slice);
              const filter = {};
              for (const prop of Object.getOwnPropertyNames(tableState.filter)) {
                  filter[prop] = tableState.filter[prop].map(v => Object.assign({}, v));
              }
              return { sort, search, slice, filter };
          },
          getMatchingItems() {
              return [...matchingItems];
          }
      };
      const instance = Object.assign(table, api);
      Object.defineProperties(instance, {
          filteredCount: {
              get() {
                  return filteredCount;
              }
          },
          length: {
              get() {
                  return data.length;
              }
          }
      });
      return instance;
  };

  const filterListener = proxyListener({ ["FILTER_CHANGED" /* FILTER_CHANGED */]: 'onFilterChange' });
  // todo expose and re-export from smart-table-filter
  var FilterType;
  (function (FilterType) {
      FilterType["BOOLEAN"] = "boolean";
      FilterType["NUMBER"] = "number";
      FilterType["DATE"] = "date";
      FilterType["STRING"] = "string";
  })(FilterType || (FilterType = {}));
  const filterDirective = ({ table, pointer, operator = "includes" /* INCLUDES */, type = "string" /* STRING */ }) => {
      const proxy = filterListener({ emitter: table });
      return Object.assign({
          filter(input) {
              const filterConf = {
                  [pointer]: [
                      {
                          value: input,
                          operator,
                          type
                      }
                  ]
              };
              return table.filter(filterConf);
          },
          state() {
              return table.getTableState().filter;
          }
      }, proxy);
  };

  const searchListener = proxyListener({ ["SEARCH_CHANGED" /* SEARCH_CHANGED */]: 'onSearchChange' });
  const searchDirective = ({ table, scope = [] }) => {
      const proxy = searchListener({ emitter: table });
      return Object.assign(proxy, {
          search(input, opts = {}) {
              return table.search(Object.assign({}, { value: input, scope }, opts));
          },
          state() {
              return table.getTableState().search;
          }
      }, proxy);
  };

  const sliceListener = proxyListener({
      ["CHANGE_PAGE" /* PAGE_CHANGED */]: 'onPageChange',
      ["SUMMARY_CHANGED" /* SUMMARY_CHANGED */]: 'onSummaryChange'
  });
  const paginationDirective = ({ table }) => {
      let { slice: { page: currentPage, size: currentSize } } = table.getTableState();
      let itemListLength = table.filteredCount;
      const proxy = sliceListener({ emitter: table });
      const api = {
          selectPage(p) {
              return table.slice({ page: p, size: currentSize });
          },
          selectNextPage() {
              return api.selectPage(currentPage + 1);
          },
          selectPreviousPage() {
              return api.selectPage(currentPage - 1);
          },
          changePageSize(size) {
              return table.slice({ page: 1, size });
          },
          isPreviousPageEnabled() {
              return currentPage > 1;
          },
          isNextPageEnabled() {
              return Math.ceil(itemListLength / currentSize) > currentPage;
          },
          state() {
              return Object.assign(table.getTableState().slice, { filteredCount: itemListLength });
          }
      };
      const directive = Object.assign(api, proxy);
      directive.onSummaryChange(({ page: p, size: s, filteredCount }) => {
          currentPage = p;
          currentSize = s;
          itemListLength = filteredCount;
      });
      return directive;
  };

  const debounce = (fn, time) => {
      let timer = null;
      return (...args) => {
          if (timer !== null) {
              clearTimeout(timer);
          }
          timer = setTimeout(() => fn(...args), time);
      };
  };
  const sortListeners = proxyListener({ ["TOGGLE_SORT" /* TOGGLE_SORT */]: 'onSortToggle' });
  const directions = ["asc" /* ASC */, "desc" /* DESC */];
  const sortDirective = ({ pointer, table, cycle = false, debounceTime = 0 }) => {
      const cycleDirections = cycle === true ? ["none" /* NONE */].concat(directions) : [...directions].reverse();
      const commit = debounce(table.sort, debounceTime);
      let hit = 0;
      const proxy = sortListeners({ emitter: table });
      const directive = Object.assign({
          toggle() {
              hit++;
              const direction = cycleDirections[hit % cycleDirections.length];
              return commit({ pointer, direction });
          },
          state() {
              return table.getTableState().sort;
          }
      }, proxy);
      directive.onSortToggle(({ pointer: p }) => {
          hit = pointer !== p ? 0 : hit;
      });
      const { pointer: statePointer, direction = "asc" /* ASC */ } = directive.state();
      hit = statePointer === pointer ? (direction === "asc" /* ASC */ ? 1 : 2) : 0;
      return directive;
  };

  const summaryListener = proxyListener({ ["SUMMARY_CHANGED" /* SUMMARY_CHANGED */]: 'onSummaryChange' });
  const summaryDirective = ({ table }) => summaryListener({ emitter: table });

  const executionListener = proxyListener({ ["EXEC_CHANGED" /* EXEC_CHANGED */]: 'onExecutionChange' });
  const workingIndicatorDirective = ({ table }) => executionListener({ emitter: table });

  const defaultTableState = () => ({ sort: {}, slice: { page: 1 }, filter: {}, search: {} });
  const smartTable = ({ sortFactory = defaultSortFactory, filterFactory = filter, searchFactory = regexp, tableState = defaultTableState(), data = [] } = {
      sortFactory: defaultSortFactory,
      filterFactory: filter,
      searchFactory: regexp,
      tableState: defaultTableState(),
      data: []
  }, ...tableExtensions) => {
      const coreTable = tableDirective({ sortFactory, filterFactory, tableState, data, searchFactory });
      return tableExtensions.reduce((accumulator, newdir) => Object.assign(accumulator, newdir({
          sortFactory,
          filterFactory,
          searchFactory,
          tableState,
          data,
          table: coreTable
      })), coreTable);
  };

  const reformat$1 = (membrList, row) => {
    row.player.lower = row.player.name.toLowerCase();
    row.player.rank = membrList[row.player.name].rank_name; // TODO
    row.player.level = membrList[row.player.name].level; // TODO
    return row;
  };

  function prepareData(data, membrList) {
    return data.r.map(partial(reformat$1, membrList));
  }

  function smartTableConfig(data, membrList) {
    return {
      data: prepareData(data, membrList),
      tableState: {
        sort: {},
        filter: {},
        search: {},
        slice: {page: 1, size: 50}
      }
    };
  }

  const loadingIndicator = ({table, el}) => {
      const component = workingIndicatorDirective({table});
      component.onExecutionChange(function ({working}) {
          el.classList.remove('st-working');
          if (working === true) {
              el.classList.add('st-working');
          }
      });
      return component;
  };

  const sort = ({el, table, conf = {}}) => {
      const pointer = conf.pointer || el.getAttribute('data-st-sort');
      const cycle = conf.cycle || el.hasAttribute('data-st-sort-cycle');
      const component = sortDirective({pointer, table, cycle});
      component.onSortToggle(({pointer: currentPointer, direction}) => {
          el.classList.remove('st-sort-asc', 'st-sort-desc');
          if (pointer === currentPointer && direction !== 'none') {
              const className = direction === 'asc' ? 'st-sort-asc' : 'st-sort-desc';
              el.classList.add(className);
          }
      });
      const eventListener = () => component.toggle();
      el.addEventListener('click', eventListener);
      return component;
  };

  function debounce$1(fn, delay) {
      let timeoutId;
      return (ev) => {
          if (timeoutId) {
              clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(function () {
              fn(ev);
          }, delay);
      };
  }

  const filter$1 = ({table, el, delay = 400, conf = {}}) => {
      const pointer = conf.pointer || el.getAttribute('data-st-filter');
      const operator = conf.operator || el.getAttribute('data-st-filter-operator') || 'includes';
      const elType = el.hasAttribute('type') ? el.getAttribute('type') : 'string';
      let type = conf.type || el.getAttribute('data-st-filter-type');
      if (!type) {
          type = ['date', 'number'].includes(elType) ? elType : 'string';
      }
      const component = filterDirective({table, pointer, type, operator});
      const eventListener = debounce$1(ev => component.filter(el.value), delay);
      el.addEventListener('input', eventListener);
      if (el.tagName === 'SELECT') {
          el.addEventListener('change', eventListener);
      }
      return component;
  };

  const search = ({el, table, delay = 400, conf = {}}) => {
      const scope = conf.scope || (el.getAttribute('data-st-search') || '')
          .split(',')
          .map(s => s.trim());
      const flags = conf.flags || el.getAttribute('data-st-search-flags') || '';
      const component = searchDirective({table, scope});
      const eventListener = debounce$1(() => {
          component.search(el.value, {flags});
      }, delay);
      el.addEventListener('input', eventListener);
  };

  const table$1 = ({el, table}) => {
      const bootDirective = (factory, selector) => Array.from(el.querySelectorAll(selector)).forEach(el => factory({
          el,
          table
      }));
      // boot
      bootDirective(sort, '[data-st-sort]');
      bootDirective(loadingIndicator, '[data-st-loading-indicator]');
      bootDirective(search, '[data-st-search]');
      bootDirective(filter$1, '[data-st-filter]');

      return table;
  };

  const theadHtml = `
<th data-st-sort="player.lower"><span>Member</span></th>
<th data-st-sort="player.level"><span>Lvl</span></th>
<th data-st-sort="player.rank"><span>Rank</span></th>
<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>
<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>
<th data-st-sort="stats.0"><span>Gold Total</span></th>
<th data-st-sort="stats.1"><span>FSP</span></th>
<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>
<th data-st-sort="stats.3"><span>Group<br>Create</span></th>
<th data-st-sort="stats.4"><span>Group<br>Join</span></th>
<th data-st-sort="stats.8"><span>Relic</span></th>
<th data-st-sort="stats.5"><span>XP Contrib</span></th>
`;

  function insertDiv(parent) {
    return insertElement(parent, createDiv());
  }

  function prepareContainer() {
    pCC.innerHTML = '';
    return insertDiv(pCC);
  }

  // function makeTopControls(container) {
  //   return insertDiv(container);
  // }

  function makeTable(container) {
    const domTable = insertElement(container,
      createTable({className: 'fshSmartTable fshXSmall'}));
    insertElement(domTable, createTHead({innerHTML: theadHtml}));
    insertElement(domTable, createTBody());
    return domTable;
  }

  // function makeBottomControls(container) {
  //   return insertDiv(container);
  // }

  function showMe([data, membrList]) {
    // console.log('showMe', data, membrList);
    var smartCollection = smartTable(smartTableConfig(data, membrList));

    const container = prepareContainer();
    // const topControls = makeTopControls(container);
    const domTable = makeTable(container);
    // const bottomControls = makeBottomControls(container);

    const tableComponent = table$1({
      el: container,
      table: smartCollection
    });

    tableComponent.onDisplayChange(partial(displayChange, domTable));
    tableComponent.exec();
  }

  function advisor$1() {
    if (jQueryNotPresent()) {return;}
    pCC.innerHTML = 'Loading...';
    Promise.all([daAdvisor(0), getMembrList(false)]).then(showMe);
  }

  var theInv;
  var composed = [];

  function cacheTheInv(data) {
    theInv = data;
  }

  function doInventory() {
    return getInventory().then(cacheTheInv);
  }

  const composedPot = el => el.t === 15;

  function getComposedFromBp(data) {
    if (!isArray(data.r)) {return;}
    composed = Array.prototype.concat.apply([], data.r.map(el => el.items))
      .filter(composedPot);
  }

  function doComposedFromBp() {
    return daLoadInventory().then(getComposedFromBp);
  }

  function getComposedFromGs(data) {
    if (!isArray(data.r)) {return;}
    composed = composed.concat(data.r.filter(composedPot));
  }

  function doGs() {
    return daGuildFetchInv().then(getComposedFromGs);
  }

  function doReport() {
    return daGuildReport().then(getComposedFromGs);
  }

  function thisPot(inv_id, pot) {return pot.a === inv_id;}

  function addComposedName(item) {
    if (item.type === 15) {
      var cp = composed.find(partial(thisPot, item.inv_id));
      if (cp) {item.item_name = cp.n;}
    }
  }

  function gotSomeStuff() {
    theInv.items.forEach(addComposedName);
  }

  function buildInv() {
    var prm = [doInventory()];
    if (calf.subcmd === 'invmanagernew') {
      prm.push(doComposedFromBp());
    }
    if (calf.subcmd === 'guildinvmgr') {
      prm.push(doGs());
      prm.push(doReport());
    }
    return allthen(prm, gotSomeStuff);
  }

  function clearSearch(fshInv, input) {
    input.val('');
    $(fshInv).DataTable().search('').draw();
  }

  function clearButton(fshInv) { // jQuery
    var input = $('#' + fshInv.id + '_filter input');
    input.prop('type', 'text');
    var clear = $('<span>&times;</span>');
    input.wrap($('<span class="text-input-wrapper"/>'));
    input.after(clear);
    clear.on('click', partial(clearSearch, fshInv, input));
  }

  function decorate$4() {
    if (theInv.folders) {
      theInv.folders['-1'] = 'Main';
    }
  }

  function bpDisplayType(type, row) {
    if (type !== 'display') {return 'BP';}
    if (row.player_id === -1) {
      return '<span class="fshLink takeItem" invid="' + row.inv_id +
        '" action="take">BP</span>';
    }
    return '<span class="fshLink recallItem" invid="' + row.inv_id +
      '" playerid="' + row.player_id +
      '" mode="0" action="recall">BP</span>';
  }

  function bpRender(where, type, row) {
    if (row.folder_id || row.player_id ===
      theInv.current_player_id) {return;}
    return bpDisplayType(type, row);
  }

  var defaultOptions = {
    checkedElements: {
      '0': 1,
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 1,
      '8': 1,
      '100': 1,
      '101': 1,
      '102': 1,
      '103': 1,
      '104': 1,
      '105': 1,
      '106': 1
    },
    fshMinLvl: 1,
    fshMaxLvl: 9999
  };
  var invManFilter =
    '<table class="fshInvFilter">' +
    '<tr><th colspan="14">@@reportTitle@@</th>' +
    '<th><span id="fshRefresh" class="fshLink">[Refresh]</span></th></tr>' +
    '<tr><td colspan="2" rowspan="3"><b>&nbsp;Show Items:</b></td>' +
    '<td class="fshRight">&nbsp;Helmet:</td>' +
    '<td><input id="fshHelmet" type="checkbox" item="0"/></td>' +
    '<td class="fshRight">&nbsp;Armor:</td>' +
    '<td><input id="fshArmor" type="checkbox" item="1"/></td>' +
    '<td class="fshRight">&nbsp;Gloves:</td>' +
    '<td><input id="fshGloves" type="checkbox" item="2"/></td>' +
    '<td class="fshRight">&nbsp;Boots:</td>' +
    '<td><input id="fshBoots" type="checkbox" item="3"/></td>' +
    '<td class="fshRight">&nbsp;Weapon:</td>' +
    '<td><input id="fshWeapon" type="checkbox" item="4"/></td>' +
    '<td></td>' +
    '<td class="fshRight">&nbsp;Min lvl:</td>' +
    '<td><input id="fshMinLvl" size="5" value="1"/></td>' +
    '</tr><tr>' +
    '<td class="fshRight">&nbsp;Shield:</td>' +
    '<td><input id="fshShield" type="checkbox" item="5"/></td>' +
    '<td class="fshRight">&nbsp;Ring:</td>' +
    '<td><input id="fshRing" type="checkbox" item="6"/></td>' +
    '<td class="fshRight">&nbsp;Amulet:</td>' +
    '<td><input id="fshAmulet" type="checkbox" item="7"/></td>' +
    '<td class="fshRight">&nbsp;Rune:</td>' +
    '<td><input id="fshRune" type="checkbox" item="8"/></td>' +
    '<td class="fshRight">&nbsp;Sets Only:</td>' +
    '<td><input id="fshSets" item="-1" type="checkbox"/></td>' +
    '<td></td>' +
    '<td class="fshRight">&nbsp;Max lvl:</td>' +
    '<td><input id="fshMaxLvl" size="5" value="9999"/></td>' +
    '</tr><tr>' +
    '<td colspan="2">' +
    '&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td>' +
    '<td colspan="2">' +
    '&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td>' +
    '<td colspan="2">' +
    '&nbsp;[<span id="fshDefault" class="fshLink">Defaults</span>]</td>' +
    '<td colspan="6"></td>' +
    '<td><input id="fshReset" type="button" value="Reset"/></td>' +
    '</tr>' +
    '<tr>' +
    '<td class="fshRight">&nbsp;Quest Item:</td>' +
    '<td><input id="fshQuest" item="9" type="checkbox"/></td>' +
    '<td class="fshRight">&nbsp;Potion:</td>' +
    '<td><input id="fshPotion" item="10" type="checkbox"/></td>' +
    '<td class="fshRight">&nbsp;Resource:</td>' +
    '<td><input id="fshResource" item="12" type="checkbox"/></td>' +
    '<td class="fshRight">&nbsp;Recipe:</td>' +
    '<td><input id="fshRecipe" item="13" type="checkbox"/></td>' +
    '<td class="fshRight">&nbsp;Container:</td>' +
    '<td><input id="fshContainer" item="14" type="checkbox"/></td>' +
    '<td class="fshRight">&nbsp;Frag Stash:</td>' +
    '<td><input id="fshStash" item="16" type="checkbox"/></td>' +
    '<td class="fshRight">&nbsp;Composed:</td>' +
    '<td><input id="fshComposed" item="15" type="checkbox"/></td>' +
    '<td></td></tr>' +
    '<tr>' +
    '<td class="fshRight">&nbsp;Common:</td>' +
    '<td><input id="fshCommon" item="100" type="checkbox" checked/></td>' +
    '<td class="fshRight">&nbsp;Rare:</td>' +
    '<td><input id="fshRare" item="101" type="checkbox" checked/></td>' +
    '<td class="fshRight">&nbsp;Unique:</td>' +
    '<td><input id="fshUnique" item="102" type="checkbox" checked/></td>' +
    '<td class="fshRight">&nbsp;Legendary:</td>' +
    '<td><input id="fshLegendary" item="103" type="checkbox" checked/></td>' +
    '<td class="fshRight">&nbsp;Super Elite:</td>' +
    '<td><input id="fshSuperElite" item="104" type="checkbox" checked/></td>' +
    '<td class="fshRight">&nbsp;Crystalline:</td>' +
    '<td><input id="fshCrystalline" item="105" type="checkbox" checked/></td>' +
    '<td class="fshRight">&nbsp;Epic:</td>' +
    '<td colspan="2"><input id="fshEpic" item="106" type="checkbox" checked/>' +
    '</td>' +
    '</tr>' +
    '</table>';
  var inventoryCheckAll = {
    '0': 1,
    '1': 1,
    '2': 1,
    '3': 1,
    '4': 1,
    '5': 1,
    '6': 1,
    '7': 1,
    '8': 1,
    '9': 1,
    '10': 1,
    '11': 1,
    '12': 1,
    '13': 1,
    '14': 1,
    '15': 1,
    '16': 1,
    '100': 1,
    '101': 1,
    '102': 1,
    '103': 1,
    '104': 1,
    '105': 1,
    '106': 1
  };
  var itemType = ['Helmet', 'Armor', 'Gloves', 'Boots', 'Weapon', 'Shield',
    'Ring', 'Amulet', 'Rune', 'Quest Item', 'Potion', 'Component',
    'Resource', 'Recipe', 'Container', 'Composed', 'Frag Stash'];
  var craftHash = {
    Perfect: {abbr: 'Perf', colour: '#00b600', index: 8},
    Excellent: {abbr: 'Exc', colour: '#f6ed00', index: 7},
    'Very Good': {abbr: 'VG', colour: '#f67a00', index: 6},
    Good: {abbr: 'Good', colour: '#f65d00', index: 5},
    Average: {abbr: 'Ave', colour: '#f64500', index: 4},
    Poor: {abbr: 'Poor', colour: '#f61d00', index: 3},
    'Very Poor': {abbr: 'VPr', colour: '#b21500', index: 2},
    Uncrafted: {abbr: 'Unc', colour: '#666666', index: 1}
  };

  function craftRender(craft) {
    if (craftHash[craft]) {return craftHash[craft].abbr;}
    return '';
  }

  function selfRowColor(data) {
    if (data.equipped) {return 'fshGreen';}
    return 'fshNavy';
  }

  function guildRowColor(data) {
    if (data.player_id === -1) {return 'fshNavy';}
    return 'fshMaroon';
  }

  function getRowColor(data) {
    if (data.folder_id) {return selfRowColor(data);}
    return guildRowColor(data);
  }

  function createdRow$1(row, data) {
    var colour = getRowColor(data);
    row.classList.add(colour);
  }

  function taggedOrEquipped(row) {
    return row.guild_tag !== -1 || row.equipped;
  }

  function dropRender(data, type, row) {
    if (taggedOrEquipped(row)) {return;}
    if (type !== 'display') {return 'Drop';}
    return '<span class="dropItem tip-static dropLink" data-tipped=' +
      '"INSTANTLY DESTROY THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
      ' data-inv="' + row.inv_id + '">Drop</span>';
  }

  function durabilityRender(data, type, row) {
    if (row.type < 9 && row.max_durability > 0) {
      return Math.ceil(row.durability / row.max_durability * 100);
    }
  }

  function forgeRender(data, type, row) {
    if (row.type < 9) {
      return row.forge;
    }
  }

  function onGuildMember(row) {
    return row.player_id && row.player_id !== -1;
  }

  function isTagged(row) {
    return row.folder_id && row.guild_tag !== -1;
  }

  function canRecall(row) {
    return onGuildMember(row) || isTagged(row);
  }

  function gsRecall(row) {
    return '<span class="fshLink recallItem" invid="' +
      row.inv_id + '" playerid="' +
      fallback(row.player_id, theInv.player_id) +
      '" mode="1" action="recall">GS</span>';
  }

  function gsStore(row) {
    return '<span class="fshLink storeItem" invid="' +
      row.inv_id + '">GS</span>';
  }

  function gsDisplayType(type, row, fn) {
    if (type === 'display') {
      return fn(row);
    }
    return 'GS';
  }

  function canStore(row) {
    return row.folder_id && !row.bound; // && !row.equipped;
  }

  function gsRender(_data, type, row) {
    if (canRecall(row)) {return gsDisplayType(type, row, gsRecall);}
    if (canStore(row)) {return gsDisplayType(type, row, gsStore);}
  }

  function getT(row) {
    if (row.player_id === -1) {return 4;}
    if (canRecall(row)) {return 7;}
    return 1;
  }

  function player(invPlayer, rowPlayer, guild) {
    if (invPlayer) {return invPlayer;}
    if (rowPlayer !== -1) {return rowPlayer;}
    return guild;
  }

  function isPartOfSet(row) {
    return row.stats && row.stats.set_name !== '';
  }

  function nameRenderDisplay(data, row) {
    var t = getT(row);
    var p = player(theInv.player_id, row.player_id,
      theInv.guild_id);

    var bold = data;
    if (row.equipped) {bold = '<b>' + data + '</b>';}

    var _setName = '';
    if (isPartOfSet(row)) {
      _setName = ' (<span class="fshLink setName" set="' + row.stats.set_name +
        '">set</span>)';
    }

    return '<a href="' + ahSearchUrl + data +
      '" class="fshInvItem tip-dynamic ' +
      rarity[row.rarity].clas + '" ' +
      'data-tipped="fetchitem.php?item_id=' + row.item_id +
      '&inv_id=' + row.inv_id + '&t=' + t + '&p=' + p + '">' +
      bold + '</a>' + _setName;
  }

  function nameRender(data, type, row) {
    if (type !== 'display') {return data;}
    return nameRenderDisplay(data, row);
  }

  function cantSend(row) {
    return row.equipped || row.guild_tag === -1 && row.bound;
  }

  function sendRender(data, type, row) {
    if (cantSend(row)) {return;}
    if (type !== 'display') {return 'Send';}
    return '<span class="sendItem tip-static sendLink" data-tipped=' +
      '"INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
      ' data-inv="' + row.inv_id + '">Send</span>';
  }

  function userInvNotEquipped(row) {
    return row.folder_id && !row.equipped;
  }

  function guidInvNotEquipped(row) {
    return row.player_id && !row.equipped &&
      row.player_id === theInv.current_player_id;
  }

  var locations = [
    [
      function(row) {return row.player_id && row.player_id === -1;},
      function(row, act) {return 'takeItem" action="' + act.a;}
    ],
    [
      function(row) {
        return row.player_id && row.player_id !== theInv.current_player_id;
      },
      function(row, act) {
        return 'recallItem" playerid="' + row.player_id +
          '" mode="0" action="' + act.a;
      }
    ],
    [
      function(row) {return userInvNotEquipped(row) || guidInvNotEquipped(row);},
      function(row, act) {return act.c;}
    ]
  ];

  function thisType$1(row, el) {return el[0](row);}

  function wuRender(row, act) {
    var location = locations.find(partial(thisType$1, row));
    if (location) {
      return '<span class="fshLink ' + location[1](row, act) +
        '" invid="' + row.inv_id + '">' + act.b + '</span>';
    }
    return '';
  }

  function wearUseRender(data, _type, row) {
    //            0  1  2  3  4  5  6  7  8 9 10 11121314 15
    // eslint-disable-next-line no-sparse-arrays
    var action = [1, 1, 1, 1, 1, 1, 1, 1, 1, , 2, 2, , , , 2][data];
    if (action === 1) {
      return wuRender(row, {
        a: 'wear',
        b: 'Wear',
        c: 'wearItem'
      });
    } else if (action === 2) {
      return wuRender(row, {
        a: 'use',
        b: 'Use',
        c: 'useItem'
      });
    }
  }

  function whereData(row) {
    return fallback(row.folder_id, row.player_id);
  }

  function playerName$5(f) {
    if (!calf.membrList[f]) {return '???';}
    return calf.membrList[f].username;
  }

  function whereRenderUserFolder(row) {
    if (row.equipped) {return -2;}
    return row.folder_id;
  }

  function whereRender(data, type, row) {
    if (row.folder_id) {
      return whereRenderUserFolder(row);
    }
    if (row.player_id === -1) {return '~';}
    return playerName$5(row.player_id);
  }

  function whereRenderGuildDisplay(row) {
    if (row.player_id === -1) {return 'Guild Store';}
    return '<a class="fshMaroon" href="' + playerIdUrl +
      row.player_id + '">' + playerName$5(row.player_id) + '</a>';
  }

  function numeric(a, b) {return a[0] - b[0];}

  function makeOption(folder_id, pair) {
    return '<option value="' + pair[0] + '"' +
      isSelected(Number(pair[0]), folder_id) + '>' +
      pair[1] + '</option>';
  }

  function makeFolderOptions(folder_id, folders) {
    return Object.entries(folders).sort(numeric)
      .map(partial(makeOption, folder_id)).join('');
  }

  function whereRenderDisplay(data, type, row) {
    if (row.player_id) {
      return whereRenderGuildDisplay(row);
    }
    if (row.equipped) {return 'Worn';}
    return '<select class="fshMoveItem" data-inv="' + row.inv_id + '">' +
      makeFolderOptions(row.folder_id, theInv.folders) + '</select>';
  }

  function whereRenderGuildFilter(row) {
    if (row.player_id === -1) {return 'Guild Store';}
    return playerName$5(row.player_id);
  }

  function whereRenderFilter(data, type, row) {
    if (row.player_id) {
      return whereRenderGuildFilter(row);
    }
    if (row.equipped) {return 'Worn';}
    return theInv.folders[row.folder_id];
  }

  var options;
  var showQuickDropLinks$3;
  var showQuickSendLinks$2;

  function extendOptions(data) {
    options = extend({}, defaultOptions);
    extend(options, fallback(data, {}));
    showQuickDropLinks$3 = getValue('showQuickDropLinks');
    showQuickSendLinks$2 = getValue('showQuickSendLinks');
  }

  var tblCols = [
    {title: 'Name', data: 'item_name', render: nameRender},
    {title: 'Level', data: 'stats.min_level'},
    {
      title: 'Where',
      data: whereData,
      render: {
        _: whereRender,
        display: whereRenderDisplay,
        filter: whereRenderFilter
      }
    },
    {
      title: 'Type',
      data: 'type',
      render: function(type) {return itemType[type];}
    },
    {title: 'Att', data: 'stats.attack'},
    {title: 'Def', data: 'stats.defense'},
    {title: 'Arm', data: 'stats.armor'},
    {title: 'Dam', data: 'stats.damage'},
    {title: 'HP', data: 'stats.hp'},
    {title: 'Frg', data: 'forge', render: forgeRender},
    {
      title: 'Craft',
      data: 'craft',
      render: {
        _: function(craft) {
          if (craftHash[craft]) {
            return craftHash[craft].index;
          }
          return 0;
        },
        display: craftRender,
        filter: craftRender
      }
    },
    {title: 'Du%', data: 'durability', render: durabilityRender},
    {title: 'BP', data: whereData, render: bpRender},
    {title: 'GS', data: whereData, render: gsRender},
    {title: 'W/U', data: 'type', render: wearUseRender},
    {
      title: 'setName',
      data: 'stats.set_name',
      orderable: false,
      visible: false
    },
    {
      title: 'Tag',
      data: 'guild_tag',
      render: function(tag) {
        if (tag === -1) {return 'No';}
        return 'Yes';
      }
    },
    {title: 'Drop', data: 'type', render: dropRender},
    {title: 'Send', data: 'type', render: sendRender}
  ];

  function isUserInv() {
    return 'player_id' in theInv;
  }

  function tableId() {
    if (isUserInv()) {
      return 'fshUserInv';
    }
    return 'fshGuildInv';
  }

  function injectTable$1() {
    var fshInv = createTable({
      className: 'hover fshXSmall',
      id: tableId()
    });
    insertElement(pCC, fshInv);
    return fshInv;
  }

  function makeDataTable(fshInv) { // jQuery
    return $(fshInv).DataTable({
      autoWidth: false,
      columnDefs: [{targets: '_all', defaultContent: ''},
        {
          targets: [1, 4, 5, 6, 7, 8, 9, 10, 12, 13],
          orderSequence: ['desc', 'asc']
        }],
      columns: tblCols,
      createdRow: createdRow$1,
      data: theInv.items,
      deferRender: true,
      lengthMenu: [[50, 100, 150, 200, -1], [50, 100, 150, 200, 'All']],
      pageLength: 50,
      stateDuration: 0,
      stateSave: true
    });
  }

  function hideCols(table) {
    table.column(12).visible('current_player_id' in theInv);
    table.column(17).visible(isUserInv() && showQuickDropLinks$3);
    table.column(18).visible(isUserInv() && showQuickSendLinks$2);
  }

  function doTable$2() {
    var fshInv = injectTable$1();
    var table = makeDataTable(fshInv);
    hideCols(table);
    return fshInv;
  }

  function saveOptions(options) {
    setForage('fsh_' + calf.subcmd, options);
  }

  function setChecks() {
    querySelectorArray('table.fshInvFilter input[type="checkbox"]').forEach(
      function(el) {
        el.checked = options.checkedElements[el.getAttribute('item')] === 1;
      });
    saveOptions(options);
  }

  function allChecks(fshInv) { // jQuery
    options.checkedElements = inventoryCheckAll;
    setChecks();
    $(fshInv).DataTable().draw(false);
  }

  function newOpts$1(newMin, newMax) {
    options.fshMinLvl = newMin;
    options.fshMaxLvl = newMax;
    saveOptions(options);
  }

  function redrawTable$1(fshInv) {
    $(fshInv).DataTable().draw(false);
  }

  function changeLvls$1(fshInv) { // jQuery
    changeMinMax(newOpts$1, partial(redrawTable$1, fshInv));
  }

  function gearOnly(pair) {return Number(pair[0]) >= 100;}

  function hydrate(prev, curr) {
    prev[curr[0]] = curr[1];
    return prev;
  }

  function clearGearOnly(checkedElements) {
    return Object.entries(checkedElements).filter(gearOnly).reduce(hydrate, {});
  }

  function clearChecks(fshInv) { // jQuery
    options.checkedElements = clearGearOnly(options.checkedElements);
    setChecks();
    $(fshInv).DataTable().draw();
  }

  function removeClass(self) {
    self.closest('tr')
      .find('.takeItem, .recallItem, .wearItem, .dropItem, .sendItem, .storeItem')
      .removeClass();
  }

  function clear(td, i) {td.eq(i).empty();} // jQuery

  function clearButtons(td) {
    [
      2, // Where
      12, // BP - GS
      13, // GS - W/U
      14, // W/U - Tag
      15, // Tag - Drop
      16 // ? - Send
    ].forEach(partial(clear, td));
  }

  function killRow(self, data) { // jQuery
    if (data.r === 1) {return;}
    var tr = self.closest('tr');
    var td = $('td', tr);
    clearButtons(td);
    tr.css('text-decoration', 'line-through');
  }

  function anotherSpinner$1(self) { // jQuery
    self.empty().append('<img src="' + imageServer +
      '/skin/loading.gif" width="11" height="11">');
  }

  function doAction$3(fn, self) { // jQuery
    hideQTip(self);
    removeClass(self);
    fn().then(partial(killRow, self));
    anotherSpinner$1(self);
  }

  function getChecks(fshInv) { // jQuery
    options.checkedElements = {};
    querySelectorArray('table.fshInvFilter input[type="checkbox"][item]:checked')
      .forEach(
        function(el) {options.checkedElements[el.getAttribute('item')] = 1;}
      );
    saveOptions(options);
    $(fshInv).DataTable().draw(false);
  }

  function resetChecks(fshInv) { // jQuery
    options.checkedElements = defaultOptions.checkedElements;
    setChecks();
    $(fshInv).DataTable().draw(false);
  }

  function resetLvls$1(fshInv) { // jQuery
    options.fshMinLvl = defaultOptions.fshMinLvl;
    options.fshMaxLvl = defaultOptions.fshMaxLvl;
    saveOptions(options);
    $('#fshMinLvl').val(options.fshMinLvl);
    $('#fshMaxLvl').val(options.fshMaxLvl);
    $(fshInv).DataTable().draw(false);
  }

  function storeItems(invIdAry) {
    return daStoreItems(invIdAry).then(errorDialog).then(ajaxReturnCode);
  }

  function setName$1(fshInv, e) { // jQuery
    $(fshInv).DataTable().search($(e.target).attr('set')).draw();
    $('#' + fshInv.id + '_filter input').trigger('focus');
  }

  function takeItem$1(e) { // jQuery
    var self = $(e.target);
    doAction$3(partial(queueTakeItem, self.attr('invid'), self.attr('action')),
      self);
  }

  function recallItem$1(e) { // jQuery
    var self = $(e.target);
    doAction$3(partial(queueRecallItem, self.attr('invid'), self.attr('playerid'),
      self.attr('mode'), self.attr('action')), self);
  }

  function wearItem(e) { // jQuery
    var self = $(e.target);
    doAction$3(partial(equipItem, self.attr('invid')), self);
  }

  function doUseItem$1(e) { // jQuery
    var self = $(e.target);
    doAction$3(partial(useItem$1, self.attr('invid')), self);
  }

  function doMoveItem(e) { // jQuery
    var self = $(e.target);
    moveItem([self.data('inv')], self.val());
  }

  function doStoreItem(e) { // jQuery
    var self = $(e.target);
    doAction$3(partial(storeItems, [self.attr('invid')]), self);
  }

  function doDropItem(e) { // jQuery
    var self = $(e.target);
    doAction$3(partial(dropItem, [self.data('inv')]), self);
  }

  function doSendItem(e) { // jQuery
    var self = $(e.target);
    doAction$3(partial(daSendItems, [self.data('inv')]), self);
  }

  function elClick(fshInv, el) { // jQuery
    $(el[0]).on('click', partial(el[1], fshInv));
  }

  function elementClickHandlers(fshInv) {
    [
      ['#fshReset', resetLvls$1],
      ['#fshAll', allChecks],
      ['#fshNone', clearChecks],
      ['#fshDefault', resetChecks]
    ].forEach(partial(elClick, fshInv));
  }

  function spanClick(fshInv, el) {$(fshInv).on('click', 'span.' + el[0], el[1]);} // jQuery

  function spanClickHandlers(fshInv) {
    [
      ['setName', partial(setName$1, fshInv)],
      ['takeItem', takeItem$1],
      ['recallItem', recallItem$1],
      ['wearItem', wearItem],
      ['useItem', doUseItem$1],
      ['dropItem', doDropItem],
      ['sendItem', doSendItem],
      ['storeItem', doStoreItem]
    ].forEach(partial(spanClick, fshInv));
  }

  function setupClickHandlers(fshInv) { // jQuery
    elementClickHandlers(fshInv);
    $('table.fshInvFilter').on('click', 'input[type="checkbox"]',
      partial(getChecks, fshInv));
    spanClickHandlers(fshInv);
  }

  function eventHandlers$2(fshInv) { // jQuery
    $('#fshMinLvl, #fshMaxLvl').on('keyup', partial(changeLvls$1, fshInv));
    $(fshInv).on('change', 'select.fshMoveItem', doMoveItem);
    setupClickHandlers(fshInv);
  }

  function headers() {
    var reportTitle;
    if (theInv.player_id) {
      reportTitle = '<b>&nbsp;Inventory Manager</b> ' +
        theInv.items.length +
        ' items (green = worn, blue = backpack)';
    } else {
      reportTitle = '<b>&nbsp;Guild Inventory Manager</b> ' +
        theInv.items.length +
        ' items (maroon = in BP, blue=guild store)';
    }
    pCC.innerHTML = invManFilter.replace('@@reportTitle@@', reportTitle);
  }

  function setLvls() { // jQuery
    $('#fshMinLvl').val(options.fshMinLvl);
    $('#fshMaxLvl').val(options.fshMaxLvl);
  }

  var itemLvlTest;

  function doLvlFilter$1(_settings, data) {
    return lvlTest(itemLvlTest, intValue(data[1]),
      options.fshMinLvl, options.fshMaxLvl);
  }

  function lvlFilter$1() { // jQuery
    itemLvlTest = [function(level) {return level === 0;}].concat(playerLvlTest);
    /* Custom filtering function which will search
    data in column 2 between two values */
    $.fn.dataTable.ext.search.push(doLvlFilter$1);
  }

  function typeFilter() { // jQuery
    $.fn.dataTable.ext.search.push(
      function(_settings, _row, _index, data) {
        return !options.checkedElements ||
          options.checkedElements[data.type];
      }
    );
  }

  function testSetId(data) {
    return options.checkedElements['-1'] &&
      data.stats && data.stats.set_id !== -1;
  }

  function setFilter() { // jQuery
    $.fn.dataTable.ext.search.push(
      function(_settings, _row, _index, data) {
        return !options.checkedElements ||
          !options.checkedElements['-1'] ||
          testSetId(data);
      }
    );
  }

  function rarityFilter() { // jQuery
    $.fn.dataTable.ext.search.push(
      function(_settings, _row, _index, data) {
        var rarity = (parseInt(data.rarity, 10) + 100).toString();
        return !options.checkedElements ||
          options.checkedElements[rarity];
      }
    );
  }

  function doSpinner$1() { // jQuery
    pCC.innerHTML = '<span id="fshInvMan"><img src = "' +
    imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
      'Getting inventory data...</span>';
  }

  function hydrate$1(prev, pair) {
    prev[pair[1].id] = pair[1];
    return prev;
  }

  function rekeyMembrList() {
    // Rekey membrList from names to id's
    calf.membrList = Object.entries(calf.membrList).filter(notLastUpdate)
      .reduce(hydrate$1, {});
  }

  function prepareLayout() {
    executeAll([
      decorate$4,
      lvlFilter$1,
      typeFilter,
      setFilter,
      rarityFilter,
      headers,
      setChecks,
      setLvls
    ]);
  }

  function doInventory$1() {
    prepareLayout();
    var fshInv = doTable$2();
    eventHandlers$2(fshInv);
    // eslint-disable-next-line no-use-before-define
    $('#fshRefresh').on('click', injectInventoryManagerNew);
    clearButton(fshInv);
  }

  function getInvMan() {

    time('inventory.getInvMan');

    doInventory$1();

    timeEnd('inventory.getInvMan');

  }

  function asyncCall() {
    add(3, getInvMan);
  }

  function syncInvMan() { // jQuery
    var prm = [];
    prm.push(buildInv());
    if (calf.subcmd === 'guildinvmgr') {
      prm.push(getMembrList(false).then(rekeyMembrList));
    }
    prm.push(getForage('fsh_' + calf.subcmd).then(extendOptions)
    );
    allthen(prm, asyncCall);
  }

  function injectInventoryManagerNew() {
    if (jQueryNotPresent()) {return;}
    doSpinner$1();
    syncInvMan();
  }

  function getGuildLogPage(page) {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'log',
      page: page
    });
  }

  var lookup$1 = [
    [],
    ['(Potion)'],
    ['recalled the item', 'took the item', 'auto-returned the',
      'stored the item'],
    ['has added flags to', 'has removed flags to'],
    ['relic. This relic now has an empower level of',
      'relic. The relic empower level has been reset to zero.',
      'failed to capture the relic', 'captured the relic', 'captured your relic',
      'has captured the undefended relic', 'attempted to capture your relic',
      / empowered the .+ relic/, / removed the empowerment from the .+ relic/],
    ['disbanded a mercenary.', 'hired the mercenary'],
    ['has disbanded one of their groups',
      /A group from your guild was (.*) in combat./],
    [/deposited ([,0-9]+) gold into the guild bank/,
      /deposited ([,0-9]+) FallenSword Points into the guild./],
    ['has added a new rank entitled', 'has deleted the rank',
      'has requested to join the guild', 'has invited the player',
      'has officially joined the guild', 'has been kicked from the guild by',
      'has left the guild', 'has been assigned the rank',
      'has added/updated a rank entitled'],
    [/resulted in (.*) with a final score of/,
      'resulted in a draw. Your GvG rating ',
      'has just initiated a conflict with the guild',
      'has initiated a conflict with your guild',
      'is participating in the conflict against the guild'],
    ['bought the Titan Reward item',
      'from your guild\'s contribution to the defeat of the titan',
      'a 7 day cooldown has been activated on your guild for this titan'],
  ];

  function isMatch(data, el) {
    if (isType(el, 'string')) {
      return data.includes(el);
    }
    return el.test(data);
  }

  function logType(data, ary) {return ary.some(partial(isMatch, data));}

  function rowProfile(data) {
    var myIndex = lookup$1.findIndex(partial(logType, data));
    if (myIndex === -1) {return 0;}
    return myIndex;
  }

  var guildLogFilter =
    '<table id="fshNewGuildLog" class="fshInvFilter"><thead><tr>' +
    '<th colspan="11"><b>Guild Log Version 4</b></th>' +
    '<th colspan="3"><span id="rfsh" class="sendLink">Reset</span> ' +
    '<a href="' + guildLogUrl + '" class="sendLink">' +
    'Old Guild Log</a></th>' +
    '</tr></thead><tbody>' +
    '<tr><td rowspan="3"><b>&nbsp;Filters:</b></td>' +
    '<td class="fshRight">&nbsp;Potions:</td>' +
    '<td><input id="fshPotion" type="checkbox" item="1"/></td>' +
    '<td class="fshRight">&nbsp;Store/Recalls:</td>' +
    '<td><input id="fshStore" type="checkbox" item="2"/></td>' +
    '<td class="fshRight">&nbsp;Relics:</td>' +
    '<td><input id="fshRelic" type="checkbox" item="4"/></td>' +
    '<td class="fshRight">&nbsp;Mercenaries:</td>' +
    '<td><input id="fshMerc" type="checkbox" item="5"/></td>' +
    '<td class="fshRight">&nbsp;Group Combats:</td>' +
    '<td><input id="fshGroup" type="checkbox" item="6"/></td>' +
    '<td colspan="3">&nbsp;</td>' +
    '</tr><tr>' +
    '<td class="fshRight">&nbsp;Donations:</td>' +
    '<td><input id="fshDonation" type="checkbox" item="7"/></td>' +
    '<td class="fshRight">&nbsp;Rankings:</td>' +
    '<td><input id="fshRank" type="checkbox" item="8"/></td>' +
    '<td class="fshRight">&nbsp;GvGs:</td>' +
    '<td><input id="fshGvG" type="checkbox" item="9"/></td>' +
    '<td class="fshRight">&nbsp;Tag/UnTags:</td>' +
    '<td><input id="fshTag" type="checkbox" item="3"/></td>' +
    '<td class="fshRight">&nbsp;Titans:</td>' +
    '<td><input id="fshTitan" type="checkbox" item="10"/></td>' +
    '<td class="fshRight">&nbsp;Other:</td>' +
    '<td><input id="fshOther" type="checkbox" item="0"/></td>' +
    '<td>&nbsp;</td>' +
    '</tr><tr>' +
    '<td colspan="2">' +
    '&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td>' +
    '<td colspan="2">' +
    '&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td>' +
    '<td colspan="9"></td>' +
    '</tr><tr><td id="fshOutput" class="fshBlue" colspan="14">' +
    'Loading Page 1 ...</td></tr>' +
    '</tbody></table>' +
    '<table id="fshInjectHere">' +
    '</table>';
  var headerRow$3 = '<tbody><tr>' +
    '<td class="header" width="16">&nbsp;</td>' +
    '<td class="header" width="20%">Date</td>' +
    '<td class="header" width="80%">Message</td></tr></tbody>';
  var defChecks = [true, true, true, true, true, true,
    true, true, true, true, true];
  var noChecks = [false, false, false, false, false, false,
    false, false, false, false, false];

  var options$1 = {};
  var fshNewGuildLog;
  var fshOutput;
  var maxPagesToFetch;
  var maxPage$1;
  var doc;
  var currPage;
  var lastPage$2;
  var tmpGuildLog = [];
  var completeReload = true;
  var myTable;

  function parsePage(data) {
    doc = createDocument(data);
    var pageInput = querySelector('input[name="page"]', doc);
    if (pageInput) {
      currPage = Number(pageInput.value);
      lastPage$2 = Number(/\d+/.exec(getText(pageInput.parentNode))[0]);
      if (currPage === 1) {maxPage$1 = Math.min(lastPage$2, maxPagesToFetch);}
      setText('Loading ' + currPage + ' of ' + maxPage$1 + '...', fshOutput);
    }
  }

  function seenRowBefore(timestamp, myMsg) {
    return [
      function() {return currPage === 1;},
      function() {return options$1.log;},
      function() {return options$1.log[0];},
      function() {return options$1.log[0][0];},
      function() {return timestamp === options$1.log[0][0];},
      function() {return myMsg === options$1.log[0][2];}
    ].every(functionPasses);
  }

  function getTableList(tableList) {
    var theTable = tableList[0];
    var limit = theTable.rows.length - 1;
    for (var i = 1; i < limit; i += 2) {
      var myRow = theTable.rows[i];
      var myDate = getTextTrim(myRow.cells[1]);
      var timestamp = parseDateAsTimestamp$1(myDate);
      var myMsg = myRow.cells[2].innerHTML;
      if (seenRowBefore(timestamp, myMsg)) {
        completeReload = false;
        break;
      }
      tmpGuildLog.push([currPage * 100 + i, timestamp, myDate, myMsg,
        rowProfile(myMsg)]);
    }
  }

  function parseTable() {
    var tableList = getElementsByClassName('width_full', doc);
    if (tableList.length === 1) {getTableList(tableList);}
  }

  function processPage(data) {
    parsePage(data);
    parseTable();
  }

  function useCache(e) {tmpGuildLog.push([0].concat(e));}

  function getOtherPages$1() {
    var prm = [];
    if (completeReload) {
      for (var i = 2; i <= maxPage$1; i += 1) {
        prm.push(getGuildLogPage(i).then(processPage));
      }
    } else {
      options$1.log.forEach(useCache);
    }
    return all(prm);
  }

  function storeOptions() {setForage('fsh_guildLog', options$1);}

  function notThisMinute(nowUtc, ary) {return ary[1] !== nowUtc;}

  function cacheValues(ary) {return ary.slice(1, 5);}

  function updateOptionsLog() {
    // Don't cache current minute as it may be incomplete
    options$1.log = tmpGuildLog
      .filter(partial(notThisMinute, (new Date()).setSeconds(0, 0)))
      .map(cacheValues);
    storeOptions();
  }

  function makeCell$2(row, html) {
    var thisCell = row.insertCell(-1);
    thisCell.innerHTML = html;
    thisCell.className = 'row';
  }

  function dataRow(r) {
    var myRow = myTable.insertRow(-1);
    r.push(myRow);
    if (!options$1.checks[r[4]]) {myRow.className = 'fshHide';}
    makeCell$2(myRow,
      '<span class="newGuildLog" style="background-image: url(\'' +
      imageServer + '/skin/log_1.gif\');"></span>');
    makeCell$2(myRow, '<nobr>' + r[2] + '</nobr>');
    makeCell$2(myRow, r[3]);
  }

  function separatorRow(r) {
    var sepRow = myTable.insertRow(-1);
    r.push(sepRow);
    if (!options$1.checks[r[4]]) {sepRow.className = 'fshHide';}
    var sep = sepRow.insertCell(-1);
    sep.className = 'divider';
    sep.colSpan = 3;
  }

  function buildRow$1(r) {
    dataRow(r);
    separatorRow(r);
  }

  function buildTable$1() {
    myTable = createTable({id: 'fshInjectHere', className: 'width_full'});
    insertHtmlBeforeEnd(myTable, headerRow$3);

    tmpGuildLog.forEach(buildRow$1);

    var injector = getElementById('fshInjectHere');
    pCC.replaceChild(myTable, injector);
    addLogColoring('myGuildLog', 1);
    addGuildLogWidgets();
  }

  function doChecked(el) {
    el.checked = options$1.checks[el.getAttribute('item')];
  }

  function setChecks$1() {
    getArrayByTagName('input', fshNewGuildLog).forEach(doChecked);
    storeOptions();
  }

  function byFirstElement(a, b) {return a[0] - b[0];}

  function gotOtherPages() {
    if (completeReload) {tmpGuildLog.sort(byFirstElement);}
    setText('Loading complete.', fshOutput);
    updateOptionsLog();
    buildTable$1();
  }

  function processFirstPage$1(data) {
    processPage(data);
    getOtherPages$1().then(gotOtherPages);
  }

  function toggle(item, hide, r) {
    if (r[4] !== item) {return;}
    toggleForce(r[5], hide);
    toggleForce(r[6], hide);
  }

  function toggleItem(self) {
    var item = Number(self.getAttribute('item'));
    options$1.checks[item] = !options$1.checks[item];
    storeOptions();
    tmpGuildLog.forEach(partial(toggle, item, !options$1.checks[item]));
  }

  function removeHide(el) {
    if (el && el.classList) {el.classList.remove('fshHide');}
  }

  function show$1(r) {
    removeHide(r[5]);
    removeHide(r[6]);
  }

  function selectAll() {
    options$1.checks = defChecks.slice(0);
    setChecks$1();
    tmpGuildLog.forEach(show$1);
  }

  function doHide(r) {
    hideElement(r[5]);
    hideElement(r[6]);
  }

  function selectNone() {
    options$1.checks = noChecks.slice(0);
    setChecks$1();
    tmpGuildLog.forEach(doHide);
  }

  function refresh() {
    options$1.log = false;
    storeOptions();
    setText('Loading Page 1 ...', fshOutput);
    tmpGuildLog = [];
    completeReload = true;
    getElementById('fshInjectHere').innerHTML = '';
    getGuildLogPage(1).then(processFirstPage$1);
  }

  function guildLogEvents() {
    return [
      [function(self) {return self.tagName === 'INPUT';}, toggleItem],
      [selfIdIs('fshAll'), selectAll],
      [selfIdIs('fshNone'), selectNone],
      [selfIdIs('rfsh'), refresh]
    ];
  }

  function setOpts$2(guildLog) {
    options$1 = guildLog || options$1;
    options$1.checks = options$1.checks || defChecks.slice(0);
  }

  function getElements$1() {
    fshNewGuildLog = getElementById('fshNewGuildLog');
    fshOutput = getElementById('fshOutput');
  }

  function setMaxPage() {
    maxPagesToFetch = Number(getValue('newGuildLogHistoryPages'));
    maxPage$1 = maxPagesToFetch;
  }

  function gotOptions(guildLog) {
    setOpts$2(guildLog);
    pCC.innerHTML = guildLogFilter;
    getElements$1();
    on(fshNewGuildLog, 'click', eventHandler5(guildLogEvents()));
    setChecks$1();
    setMaxPage();
    getGuildLogPage(1).then(processFirstPage$1);
  }

  function injectNewGuildLog() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getForage('fsh_guildLog').then(gotOptions);
  }

  function injectNotepad() { // jQuery
    if (jQueryNotPresent()) {return;}
    $('#notepad_notes')
      .attr('cols', '90')
      .attr('rows', '30')
      .css('resize', 'none');
  }

  function listValues() {
    var list = [];
    var reKey = new RegExp('^' + GMSTORAGE_PATH);
    for (var i = 0, il = window.localStorage.length; i < il; i += 1) {
      var key = window.localStorage.key(i);
      if (key.match(reKey)) {
        list.push(key.replace(GMSTORAGE_PATH, ''));
      }
    }
    return list;
  }

  function drawBox(content, fshSettings) {
    content.innerHTML = '<h1>FSH Settings</h1><br><center>The box below ' +
      'is your current settings. Copy it to save your current settings<br>' +
      'To load saved settings, simply replace the contents of the box with ' +
      'your saved copy and press the button below.' +
      '<textarea align="center" cols="80" rows="25" style="' +
      'background-color:white;' +
      'font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" ' +
      'id="HelperfshSettings" name="fshSettings">' +
      JSON.stringify(fshSettings) + '</textarea>' +
      '<br><input id="HelperLoadSettings" class="custombutton" ' +
      'type="submit" value="Load Settings!" /></center>';
  }

  function saveSetting(settings, id) {
    setValue(id, settings[id]);
  }

  function clickHandler$1() {
    var userInput = jsonParse(getElementById('HelperfshSettings').value);
    if (isObject(userInput)) {
      var settings = userInput;
      Object.keys(settings).forEach(partial(saveSetting, settings));
      dialogMsg('Settings loaded successfully!');
    }
  }

  function buildSettingsObj(prev, curr) {
    prev[curr] = getValue(curr);
    return prev;
  }

  function injectSaveSettings() { // Hybrid
    if (jQueryNotPresent()) {return;}
    var fshSettings = listValues().reduce(buildSettingsObj, {});
    drawBox(pCC, fshSettings);
    $('#HelperLoadSettings').on('click', clickHandler$1);
  }

  function guildReliclist(page) {
    return indexAjaxData({
      cmd: 'guild',
      subcmd: 'reliclist',
      page
    });
  }

  function parseTime(string) {
    const parts = string.match(/(\d+) days, (\d+) hours, (\d+) mins, (\d+) secs/);
    if (parts) {
      return Number(parts[1]) * 24 * 60 * 60 +
        Number(parts[2]) * 60 * 60 +
        Number(parts[3]) * 60 +
        Number(parts[4]);
    }
  }

  function parseGuild$1(cell) {
    const a = cell.children[0].rows[0].cells[1].children[0];
    const id = a.href.match(/&guild_id=(\d+)/)[1];
    const name = getTextTrim(a);
    return {id, name};
  }

  function parseLocation(div) {
    const parts = getTextTrim(div).match(/(.*) \((\d+), (\d+)\)/);
    return {
      name: parts[1],
      x: Number(parts[2]),
      y: Number(parts[3])
    };
  }

  function getTextNodes(div) {
    return arrayFrom(div.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE)
      .map(getTextTrim)
      .map(e => e.split('\u00A0'));
  }

  function getAttribs(childNodes) {
    return childNodes.filter(e => attribType.includes(e[1])).map(e => ({
      id: attribType.indexOf(e[1]),
      is_percent: e[0].endsWith('%'),
      value: parseInt(e[0], 10)
    }));
  }

  function getEnhancements(childNodes) {
    return childNodes.filter(e => enhancementType.includes(e[1])).map(e => ({
      id: enhancementType.indexOf(e[1]),
      value: Number(e[0])
    }));
  }

  function parseTip(tipped) {
    const div = createDiv({innerHTML: tipped});
    const location = parseLocation(div.children[1]);
    const min_level = Number(getTextTrim(div.children[2]).match(/(\d+)/)[1]);
    const childNodes = getTextNodes(div);
    const attributes = getAttribs(childNodes);
    const enhancements = getEnhancements(childNodes);
    return {attributes, enhancements, location, min_level};
  }

  function getBaseRelic(row) {
    const img = row.cells[0].children[0];
    const tipped = parseTip(img.dataset.tipped);
    return {
      attributes: tipped.attributes,
      enhancements: tipped.enhancements,
      id: Number(img.src.match(/\/(\d+)\.gif/)[1]),
      location: tipped.location,
      min_level: tipped.min_level,
      name: getTextTrim(row.cells[1].children[0])
    };
  }

  function parseRelic(row) {
    const baseRelic = getBaseRelic(row);
    const time = parseTime(getTextTrim(row.cells[3]));
    if (!isUndefined(time)) {
      baseRelic.time = time;
      baseRelic.guild = parseGuild$1(row.cells[2]);
    }
    return baseRelic;
  }

  function parsePage$1(doc) {
    const firstHeader = querySelector('.header', doc);
    const thisTable = closestTable(firstHeader);
    const thisRows = arrayFrom(thisTable.rows).filter(dataRows(4, 0));
    return thisRows.map(parseRelic);
  }

  function processPages$1(ary) {
    const relics = ary.map(createDocument).map(parsePage$1);
    return [].concat(...relics);
  }

  function processPageOne(html) {
    const doc = createDocument(html);
    const select = querySelector('#pCC select[name="page"]', doc);
    const otherPages = arrayFrom(select.children)
      .map(o => Number(o.value)).filter(v => v !== 0);
    return allthen([html].concat(otherPages.map(guildReliclist)),
      processPages$1);
  }

  function getRelicList() {
    return guildReliclist(0).then(processPageOne);
  }

  function relicName(relic) {
    return '<a href="' + guideUrl + 'relics' + def_subcmd +
      'view&relic_id=' + relic.id + '">' + relic.name + '</a>';
  }

  function guildName(relicGuild) {
    if (relicGuild) {
      return '<a href="' + guildViewUrl + relicGuild.id + '">' +
        relicGuild.name + '</a>';
    }
    return '';
  }

  function attrib(id, att) {return att.id === id;}

  function stamGain(relic) {
    return relic.attributes && relic.attributes.find(partial(attrib, 6));
  }

  function makeAttrib(attribs, id) {
    if (attribs) {
      var thisAttrib = attribs.find(partial(attrib, id));
      if (thisAttrib) {
        return thisAttrib.value;
      }
    }
    return '';
  }

  function allAttribs(attribs) {
    return [6, 0, 4, 5, 7, 8].map(partial(makeAttrib, attribs)).join('</td><td>');
  }

  function formatTime$2(time) {
    if (!time) {return '';}
    var t = splitTime(time);
    return padZ(t[0]) + 'd ' +
      padZ(t[1]) + 'h ' +
      padZ(t[2]) + 'm ' +
      padZ(t[3]) + 's';
  }

  function makeRow$3(relic) {
    return '<tr>' +
      '<td>' + relic.min_level + '</td>' +
      '<td>' + relicName(relic) + '</td>' +
      '<td>' + guildName(relic.guild) + '</td>' +
      '<td>' + allAttribs(relic.attributes) + '</td>' +
      '<td>' + formatTime$2(relic.time) + '</td>' +
      '</tr>';
  }

  function makeTable$1(relicList) {
    return '<style>' +
      '#pCC .reliclist {border-collapse: collapse; border-spacing: 0;}' +
      'table, th, td {border: 1px solid black;}' +
      'th, td {padding: 5px;}' +
      '</style><table class="reliclist"><thead><tr>' +
      '<th>Level</th>' +
      '<th>Name</th>' +
      '<th>Guild</th>' +
      '<th>Stam<br>Gain</th>' +
      '<th>Atk</th>' +
      '<th>Dmg</th>' +
      '<th>Stam</th>' +
      '<th>Gold<br>Gain</th>' +
      '<th>XP<br>Gain</th>' +
      '<th>Time</th>' +
      '</tr></thead><tbody>' +
      relicList.filter(stamGain).map(makeRow$3).join('') +
      '</tbody></table>';
  }

  function processRelicList(thisRelicList) {
    thisRelicList.sort((a, b) => a.min_level - b.min_level);
    pCC.innerHTML = makeTable$1(thisRelicList);
  }

  function reliclist() {
    pCC.innerHTML = 'Loading...';
    getRelicList().then(processRelicList);
  }

  function rowHtml$1(obj) {
    return `<td>${obj.slot}</td>` +
      `<td>${obj.name}</td>` +
      `<td>${obj.level}</td>` +
      `<td>${obj.rank_name}</td>` +
      `<td>${obj.gxp}</td>` +
      `<td>${obj.activity}</td>` +
      `<td>${obj.pack}</td>` +
      `<td>${obj.stam}</td>`;
  }

  function rowFactory$1(aRow) {
    let dom = aRow.dom;
    if (!dom) {
      dom = createTr(
        {innerHTML: rowHtml$1(aRow)}
      );
    }
    return dom;
  }

  function displayChange$1(domTable, displayed) {
    const domTBody = domTable.tBodies[0];
    const thisTBody = createTBody();
    for (let r of displayed) {
      thisTBody.appendChild(rowFactory$1(r.value));
    }
    domTable.replaceChild(thisTBody, domTBody);
  }

  function byMember(prev, curr) {
    // if (curr.b === 11503) { // Zombie Brew
    prev[curr.player_id] = prev[curr.player_id] || [];
    prev[curr.player_id].push(curr);
    // }
    return prev;
  }

  function addRank(rank_name, thisMember) {
    thisMember.rank_name = rank_name;
    return thisMember;
  }

  function extractMembers(thisRank) {
    return thisRank.members.map(partial(addRank, thisRank.name));
  }

  function processGuild(guild) {
    return [].concat(...guild.r.ranks.map(extractMembers));
  }

  function decorateMembers(pots, obj, i) {
    obj.slot = i + 1;
    obj.name_lower = obj.name.toLowerCase();
    obj.lvl_reverse = 0 - obj.level;
    obj.rank_lower = obj.rank_name.trim().toLowerCase();
    obj.gxp = addCommas(obj.guild_xp);
    obj.gxp_reverse = 0 - obj.guild_xp;
    obj.activity = lastActivityToDays(obj.last_activity);
    obj.act = obj.last_activity - nowSecs;
    obj.pack = (pots[obj.id] || []).length;
    obj.pack_reverse = 0 - (pots[obj.id] || []).length;
    obj.stam = addCommas(obj.current_stamina);
    obj.stam_reverse = 0 - obj.current_stamina;
    return obj;
  }

  function prepareData$1([json, guild]) {
    // console.log(json);
    const pots = json.items.reduce(byMember, {});
    // console.log('pots', pots);
    const members = processGuild(guild);
    // console.log('members', members);
    return members.map(partial(decorateMembers, pots));
  }

  const theadHtml$1 =
    '<thead><tr>' +
    '<th data-st-sort="slot">Slot</th>' +
    '<th data-st-sort="name_lower">Name</th>' +
    '<th class="st-sort-reverse" data-st-sort="lvl_reverse">Level</th>' +
    '<th data-st-sort="rank_lower">Rank</th>' +
    '<th class="st-sort-reverse" data-st-sort="gxp_reverse">GXP</th>' +
    '<th class="st-sort-reverse" data-st-sort="act">Activity</th>' +
    '<th class="st-sort-reverse" data-st-sort="pack_reverse">Pack</th>' +
    '<th class="st-sort-reverse" data-st-sort="stam_reverse">Stam</th>' +
    '</tr></thead><tbody></tbody>';

  function makeTable$2(el) {
    return insertElement(el, createTable({
      className: 'whosGotWhat',
      innerHTML: theadHtml$1
    }));
  }

  function showMe$1(dataAry) {
    // console.log(dataAry);
    const data = prepareData$1(dataAry);
    // console.log('data', data);
    pCC.innerHTML = '';
    const el = insertElement(pCC, createDiv());
    const domTable = makeTable$2(el);
    const table = smartTable({data});
    const tableComponent = table$1({el, table});
    tableComponent.onDisplayChange(partial(displayChange$1, domTable));
    tableComponent.exec();
  }

  function whosGotWhat() {
    pCC.innerHTML = 'Loading...';
    // Promise.all([report(), guildView()]).then(showMe);
    allthen([guildStore(), guildManage$1()], showMe$1);
  }

  var notepad = {
    showlogs: {'-': injectNotepadShowLogs},
    invmanagernew: {'-': injectInventoryManagerNew}, // TODO
    guildinvmgr: {'-': injectInventoryManagerNew}, // TODO
    recipemanager: {'-': injectRecipeManager},
    auctionsearch: {'-': injectAuctionSearch},
    onlineplayers: {'-': injectOnlinePlayers},
    quicklinkmanager: {'-': injectQuickLinkManager},
    monsterlog: {'-': injectMonsterLog},
    quickextract: {'-': insertQuickExtract},
    quickwear: {'-': insertQuickWear},
    fsboxcontent: {'-': injectFsBoxContent},
    bufflogcontent: {'-': injectBuffLog},
    newguildlog: {'-': injectNewGuildLog}, // TODO
    findbuffs: {'-': injectFindBuffs},
    findother: {'-': injectFindOther},
    savesettings: {'-': injectSaveSettings}, // TODO
    reliclist: {'-': reliclist},
    advisor: {'-': advisor$1},
    whosgotwhat: {'-': whosGotWhat},
    '-': {'-': injectNotepad}
  };

  var upgrades;
  var currentFSP;
  var warehouse$1 = {};

  function includesText$1(text, el) {
    return getText(el).includes(text);
  }

  function findText(text) {
    return upgrades.find(partial(includesText$1, text));
  }

  function getInputCell(label) {
    return findText(label).nextElementSibling.nextElementSibling
      .nextElementSibling;
  }

  function getInputElement(el) {
    return el.nextElementSibling.nextElementSibling
      .nextElementSibling.children[0].rows[0].cells[0].children[0];
  }

  function getRe(type, label) {
    if (label === 'amount') {
      return new RegExp('\\+(\\d+) ' + type);
    }
    return /(\d+)\xA0/;
  }

  function getValue$1(type, element, label) {
    if (!warehouse$1[type][label]) {
      var valRe = getRe(type, label);
      var value = getText(element).match(valRe)[1];
      warehouse$1[type][label] = value;
    }
    return warehouse$1[type][label];
  }

  function getAmount$1(type, upgrade) {
    return getValue$1(type, upgrade, 'amount');
  }

  function getCost(type, upgrade) {
    return getValue$1(type, upgrade.nextElementSibling, 'cost');
  }

  function getCell(type, upgrade) {
    if (!warehouse$1[type]) {warehouse$1[type] = {};}
    if (!warehouse$1[type].span) {
      var span = createSpan();
      insertTextBeforeEnd(upgrade, ' ');
      insertElement(upgrade, span);
      warehouse$1[type].span = span;
    }
    return warehouse$1[type].span;
  }

  function doStamCount(type, upgrade, quantity, cell) {
    var amount = getAmount$1(type, upgrade);
    var cost = getCost(type, upgrade);
    // cap the value if the user goes over his current FSP
    var extraStam;
    if (quantity * cost <= currentFSP) {
      extraStam = quantity * amount;
      cell.className = 'fshBlue';
    } else {
      extraStam = Math.floor(currentFSP / cost) * amount;
      cell.className = 'fshRed';
    }
    setText('(+' + extraStam + ' stamina)', cell);
  }

  function updateStamCount(type, upgrade, evt) {
    var self = evt.target;
    var quantity = Number(self.value);
    var cell = getCell(type, upgrade);
    if (isNaN$1(quantity) || quantity === 0) {
      cell.className = 'fshHide';
      return;
    }
    doStamCount(type, upgrade, quantity, cell);
  }

  function injectUpgradeHelper(type) {
    var upgrade = findText(type);
    on(getInputElement(upgrade), 'keyup',
      partial(updateStamCount, type, upgrade));
  }

  function injectPoints() {
    currentFSP = intValue(getText(getElementById('statbar-fsp')));
    injectUpgradeHelper('Current');
    injectUpgradeHelper('Maximum');
    getInputCell('Gold').innerHTML = '<a href="' + server + cmdUrl +
      'marketplace">Sell at Marketplace</a>';
  }

  function saveUpgradeValue(upgrade, key) {
    var text = findText(upgrade);
    var ratio = text.nextElementSibling.nextElementSibling;
    if (ratio) {
      var valueRE = /(\d+) \/ 115/;
      var value = Number(valueRE.exec(ratio.innerHTML)[1]);
      setValue(key, value + 5);
    }
  }

  function storePlayerUpgrades() {
    upgrades = querySelectorArray('#pCC > table:last-of-type > tbody > ' +
      'tr:nth-child(even) > td:first-child');
    saveUpgradeValue('+1 Max Allies', 'alliestotal');
    saveUpgradeValue('+1 Max Enemies', 'enemiestotal');
    injectPoints();
  }

  function points() {
    if (getUrlParameter('type') === '1') {
      parseGoldUpgrades();
    } else {
      storePlayerUpgrades();
    }
  }

  function otherFolders(el) {
    return el.src.includes('/folder.gif');
  }

  function makeOption$1(e) {
    return '<option value=' +
      e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1] + '>' +
      getText(e.parentNode.parentNode) + '</option>';
  }

  function injectMoveItems() {
    var flrRow = getElementsByTagName('form', pCC)[0]
      .nextElementSibling.nextElementSibling.nextElementSibling;
    var folders = getArrayByTagName('img', flrRow).filter(otherFolders);
    if (folders.length === 0) {return;}
    insertHtmlAfterEnd(flrRow,
      '<tr><td class="fshCenter">Move selected items to: ' +
      '<select name="folder" id="selectFolderId" class="customselect">' +
      folders.map(makeOption$1).join('') +
      '</select>&nbsp;<input type="button" class="custombutton" ' +
      'id="fshMove" value="Move"></td></tr>'
    );
  }

  function injectProfileDropItems() {
    injectStoreItems();
    injectMoveItems();
  }

  var profile$3 = {
    '-': {'-': injectProfile},
    managecombatset: {'-': injectProfile},
    report: {'-': injectProfile},
    equipitem: {'-': injectProfile},
    useitem: {'-': injectProfile},
    changebio: {'-': injectBioWidgets},
    dropitems: {'-': injectProfileDropItems}
  };

  function updateBackHref() {
    var lastActiveQuestPage = getValue('lastActiveQuestPage');
    if (lastActiveQuestPage.length > 0) {
      getElementsByTagName('a', pCC)[0].href = lastActiveQuestPage;
    }
  }

  function injectGuideButtons() {
    var injectHere = getElementsByTagName('td', pCC)[0];
    var questName = getText(getElementsByTagName('font', injectHere)[1])
      .replace(/"/g, '');
    insertHtmlBeforeEnd(injectHere,
      guideButtons(getUrlParameter('quest_id'), questName));
  }

  function injectQuestTracker() {
    updateBackHref();
    injectGuideButtons();
  }

  var questbook = {
    '-': {'-': injectQuestBookFull},
    atoz: {'-': injectQuestBookFull},
    viewquest: {'-': injectQuestTracker}
  };

  function showStep(e) {e.style.display = 'block';}

  function showAllQuestSteps() {
    if (!getValue('showNextQuestSteps')) {return;}
    querySelectorArray('div[id^="stage"]').forEach(showStep);
    getElementById('next_stage_button').style.display = 'none';
  }

  var quests = {
    '-': {'-': allowBack},
    view: {'-': showAllQuestSteps}
  };

  function clearWidth(multCnt) {
    var parentTable = closestTable(multCnt);
    parentTable.removeAttribute('width');
  }

  function makeMaxTimes(multCnt) {
    var maxTimes = createSpan();
    insertElement(multCnt.parentNode, maxTimes);
    return maxTimes;
  }

  function updateMaxTimes(maxTimes, statbarGold, scoutGold) {
    var myGold = intValue(getText(statbarGold));
    var times = Math.floor(myGold / scoutGold).toString();
    maxTimes.innerHTML = '&nbsp;&nbsp;Max: ' + times + ' times';
  }

  function redrawMaxTimes(maxTimes, statbarGold, gold) {
    maxTimes.innerHTML = '';
    var scoutGold = Number(gold.value);
    if (!isNaN(scoutGold) && scoutGold !== 0) {
      updateMaxTimes(maxTimes, statbarGold, scoutGold);
    }
  }

  function setMaxTimes(maxTimes, statbarGold, gold) {
    if (maxTimes) {
      redrawMaxTimes(maxTimes, statbarGold, gold);
    }
  }

  function initMaxTimes(maxTimes, statbarGold, gold) {
    var boundSet = partial(setMaxTimes, maxTimes, statbarGold, gold);
    boundSet();
    on(gold, 'keyup', boundSet);
  }

  function foundMultiplierCount(multCnt) {
    clearWidth(multCnt);
    initMaxTimes(makeMaxTimes(multCnt), getElementById('statbar-gold'),
      getElementById('gold'));
  }

  function lookForMultiplierCount() {
    var multCnt = getElementById('multiplier_count');
    if (multCnt) {foundMultiplierCount(multCnt);}
  }

  function setLastScav(caveId, gold) {
    setValue('lastScavPage',
      def_cmd + 'scavenging&cave_id=' + caveId + '&gold=' + gold);
  }

  /* global sendRequest:true */

  var fshSummary;

  function getSummary() {
    if (!fshSummary) {
      fshSummary = createDiv();
      insertElement(pCC, fshSummary);
    }
    fshSummary.innerHTML = '';
    return fshSummary;
  }

  function getVictories(report) {
    var victories = report.match(/victorious/g);
    if (victories) {
      return 'Victories: ' + victories.length;
    }
    return '';
  }

  function getDefeats(report) {
    var defeats = report.match(/defeated/g);
    if (defeats) {
      return ', Defeated: ' + defeats.length;
    }
    return '';
  }

  function makeHash(prev, curr) {
    var itemName = curr.match(/>([^<]+)</)[1];
    prev[itemName] = (prev[itemName] || 0) + 1;
    return prev;
  }

  function buildGainHash(gains) {
    return gains.reduce(makeHash, {});
  }

  function alphaEntries(a, b) {return alpha(a[0], b[0]);}

  function summary(pair) {return '<br>' + pair[1] + ' ' + pair[0] + '(s), ';}

  function gotGains(gains) {
    var gainHash = buildGainHash(gains);
    return '<br>' + gains.length + ' item(s):' +
      Object.entries(gainHash).sort(alphaEntries).map(summary).join('');
  }

  function getGains(report) {
    var gains = report.match(/Item Gained: <b>[^<]+<\/b>/g);
    if (gains) {return gotGains(gains);}
  }

  function multiScav() {
    var ret = '';
    var scavRes = getElementById('scavenge_results');
    if (scavRes) {
      var report = scavRes.innerHTML;
      ret += getVictories(report);
      ret += getDefeats(report);
      ret += getGains(report);
    }
    return ret;
  }

  function interceptSendRequest(oldSendRequest) {
    return function(amount, goldValue, caveValue) {
      oldSendRequest(amount, goldValue, caveValue);
      setLastScav(caveValue, goldValue);
      getSummary().innerHTML = multiScav();
    };
  }

  function lookForSendRequest() {
    var oldSendRequest = sendRequest;
    if (isFunction(oldSendRequest)) {
      sendRequest = interceptSendRequest(oldSendRequest);
    }
  }

  function injectScavenging() {
    lookForSendRequest();
    lookForMultiplierCount();
  }

  var scavenging = {
    '-': {'-': injectScavenging},
    process: {'-': injectScavenging}
  };

  function utcDatePartsPadded(aDate) {
    return [
      aDate.getUTCMonth() + 1,
      aDate.getUTCDate(),
      aDate.getUTCHours(),
      aDate.getUTCMinutes(),
      aDate.getUTCSeconds()
    ].map(padZ);
  }

  function utcDateParts(aDate) {
    return [aDate.getUTCFullYear().toString()].concat(utcDatePartsPadded(aDate));
  }

  function formatUtcDateTime(aDate) {
    if (isDate(aDate)) {
      return formatDateTime(utcDateParts(aDate));
    }
  }

  var enableSeTracker$2 = 'enableSeTracker';
  var trackerCell;

  function addRow$2(trackerTable, se) {
    insertHtmlBeforeEnd(trackerTable,
      '<tr><td class="fshCenter">' + se[0] + '</td>' +
      '<td class="fshBold fshCenter fshCooldown">' +
      formatUtcDateTime(new Date(se[1] * 1000)) + '</td></tr>');
  }

  function buildTrackerTable(seAry) {
    var trackerTable = createTable({className: 'fshTTracker'});
    var tBody = createTBody({
      innerHTML: '<tr><td class="header fshCenter">Creature</td>' +
        '<td class="header fshCenter">Last Kill</td></tr>'
    });
    insertElement(trackerTable, tBody);
    seAry.forEach(partial(addRow$2, tBody));
    return trackerTable;
  }

  function insertNewRow() {
    var newRow = pCC.lastElementChild.insertRow(-1);
    var newCell = newRow.insertCell(-1);
    newCell.colSpan = 3;
    return newCell;
  }

  function displayTracker$1(seAry) {
    var trackerTable = buildTrackerTable(seAry);
    trackerCell = insertNewRow();
    insertElement(trackerCell, trackerTable);
  }

  function valueNumeric(a, b) {return a[1] - b[1];}

  function gotSeLog() {
    if (oldLog && oldLog.se) {
      displayTracker$1(Object.entries(oldLog.se).sort(valueNumeric));
    }
  }

  function killTable() {
    if (!calf.enableSeTracker) {
      if (trackerCell) {
        trackerCell.parentNode.remove();
        trackerCell = false;
      }
      disableBackgroundChecks();
    } else {
      doBackgroundCheck().finally(gotSeLog);
    }
  }

  function togglePref$5(evt) {
    if (evt.target.id === enableSeTracker$2) {
      calf.enableSeTracker = !calf.enableSeTracker;
      setValue(enableSeTracker$2, calf.enableSeTracker);
      killTable();
    }
  }

  function waitForLog() {
    doBackgroundCheck().finally(gotSeLog);
  }

  function superelite$2() {
    if (jQueryNotPresent()) {return;}
    var newCell = insertNewRow();
    newCell.height = 20;
    newCell = insertNewRow();
    newCell.className = 'fshCenter';
    newCell.innerHTML = simpleCheckboxHtml(enableSeTracker$2);
    on(newCell, 'change', togglePref$5);
    if (calf.enableSeTracker) {
      getFshSeLog().then(waitForLog);
    }
  }

  function allowBack$4(topTable) { // jQuery
    var thisSelect = getElementsByTagName('select', topTable)[0];
    $(thisSelect).off();
    on(thisSelect, 'change', partial(dontPost, pCC));
  }

  function playerLink(el) {
    var aCell = el.cells[1];
    aCell.innerHTML = searchPlayerHref(getText(aCell));
  }

  function globalQuest() {
    var topTable = getElementsByTagName(def_table, pCC)[3];
    allowBack$4(topTable);
    arrayFrom(topTable.rows).filter(dataRows(4, 1)).forEach(playerLink);
  }

  function getGuild$1(tbl) {
    if (tbl.rows[0].cells[0].children[0]) {
      return Number(
        /guild_id=(\d+)/.exec(tbl.rows[0].cells[0].children[0].href)[1]);
    }
    return -1;
  }

  function enumeratePlayers(playerTable) {
    return [playerTable, getTextTrim(playerTable), getGuild$1(playerTable)];
  }

  function aGuild(player, ary) {return ary[0] === player[2];}

  function aggGuilds(prev, player) {
    var thisGuild = prev.find(partial(aGuild, player));
    if (thisGuild) {
      thisGuild[1].push(player);
    } else {
      prev.push([player[2], [player]]);
    }
    return prev;
  }

  function smallGuild(guildId, guild) {return guild[0] === guildId;}

  function rollupSmallGuilds(prev, guild) {
    var guildId = guild[0];
    if (guild[1].length < 5) {guildId = -1;}
    var thisGuild = prev.find(partial(smallGuild, guildId));
    if (thisGuild) {
      thisGuild[1] = thisGuild[1].concat(guild[1]);
    } else {
      prev.push([guildId, guild[1]]);
    }
    return prev;
  }

  function getPlayersByGuild() {
    return getArrayByTagName(def_table, pCC).slice(4).map(enumeratePlayers)
      .reduce(aggGuilds, []).reduce(rollupSmallGuilds, []);
  }

  function getMyItem(removeBy, item) {
    if (removeBy) {
      return item[removeBy];
    }
    return item;
  }

  function genericFilter(removeBy, seen, item) {
    var myItem = getMyItem(removeBy, item);
    if (!seen[myItem]) {
      seen[myItem] = true;
      return true;
    }
  }

  function uniq(arr, removeBy) {
    return arr.filter(partial(genericFilter, removeBy, {}));
  }

  var highlightPlayersNearMyLvl$3;
  var myGuildId;

  var highlightTests$1 = [
    function() {return highlightPlayersNearMyLvl$3;},
    function(guildId) {return isUndefined(guildId) || guildId !== myGuildId;},
    function(guildId, data) {return data.last_login >= nowSecs - 604800;},
    function(guildId, data) {return data.virtual_level >= pvpLowerLevel;},
    function(guildId, data) {return data.virtual_level <= pvpUpperLevel;}
  ];

  function condition$a(guildId, data, el) {return el(guildId, data);}

  function pvpHighlight$1(guildId, data) {
    return highlightTests$1.every(partial(condition$a, guildId, data));
  }

  function decoratePlayer(aTable, guildId, data) {
    insertHtmlBeforeEnd(aTable.rows[0],
      '<td>' + onlineDot({last_login: data.last_login}) + '</td>');
    if (pvpHighlight$1(guildId, data)) {
      aTable.parentNode.parentNode.classList.add('lvlHighlight');
    }
  }

  function initDecorate() {
    highlightPlayersNearMyLvl$3 = getValue('highlightPlayersNearMyLvl');
    if (highlightPlayersNearMyLvl$3) {
      calculateBoundaries();
      myGuildId = currentGuildId();
    }
  }

  var spinner$1;

  function hideSpinner() {
    hideElement(spinner$1);
  }

  function displaySpinner(target) {
    hideQTip(target);
    spinner$1 = createSpan({
      className: 'fshCurveContainer fshTopListSpinner',
      innerHTML: '<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'
    });
    target.parentNode.replaceChild(spinner$1, target);
  }

  function parsePlayer(player, data) {
    decoratePlayer(player[0], player[2], {
      last_login: String(data.last_activity),
      virtual_level: data.vl
    });
  }

  function thisMember(player, member) {return member.name === player[1];}

  function guildPlayer(guildMembers, player) {
    var member = guildMembers.find(partial(thisMember, player));
    if (member) {parsePlayer(player, member);}
  }

  function returnPlayer(player, json) {
    if (json.s && isArray(json.r)) {parsePlayer(player, json.r[0]);}
  }

  function returnSelf(player, json) {
    if (json.s) {
      parsePlayer(player, {
        last_activity: nowSecs - json.r.last_activity,
        vl: json.r.virtual_level
      });
    }
  }

  function big(guild) {return guild[0] !== -1;}

  function getMembers(prev, curr) {return prev.concat(curr.members);}

  function parseGuild$2(guild, json) {
    var guildMembers = uniq(json.r.ranks, 'id').reduce(getMembers, []);
    guild[1].forEach(partial(guildPlayer, guildMembers));
  }

  function returnGuild(guild, json) {if (json.s) {parseGuild$2(guild, json);}}

  function ajaxGuild(guild) {
    return daGuildView(guild[0]).then(partial(returnGuild, guild));
  }

  function small(guild) {return guild[0] === -1;}

  function ajaxPlayer(player) {
    if (player[1] !== playerName$1()) {
      return daFindPlayer(player[1]).then(partial(returnPlayer, player));
    }
    return daViewProfile().then(partial(returnSelf, player));
  }

  function prepareAjax() {
    var guilds = getPlayersByGuild();
    var prm = guilds.filter(big).map(ajaxGuild);
    var singles = guilds.find(small);
    if (singles) {
      prm = prm.concat(guilds.find(small)[1].map(ajaxPlayer));
    }
    allthen(prm, hideSpinner);
  }

  function findOnlinePlayers(e) {
    sendEvent('toprated', 'FindOnlinePlayers');
    displaySpinner(e.target);
    initDecorate();
    prepareAjax();
  }

  function looksLikeTopRated() {
    var theCell = getElementsByTagName('td', pCC)[0];
    theCell.children[0].className = 'fshTopListWrap';
    var findBtn = createInput({
      id: 'fshFindOnlinePlayers',
      className: 'custombutton tip-static',
      type: 'button',
      value: 'Find Online Players',
      dataset: {
        tipped: 'Fetch the online status of the ' +
          'top 250 players (warning ... takes a few seconds).'
      }
    });
    insertElementAfterBegin(theCell, findBtn);
    on(findBtn, 'click', findOnlinePlayers);
  }

  var topRatedTests = [
    function() {return jQueryPresent();},
    function() {return isObject(pCC);},
    function() {return isObject(pCC.children[0]);},
    function() {return isObject(pCC.children[0].rows);},
    function() {return pCC.children[0].rows.length > 2;},
    function() {
      return getTextTrim(pCC.children[0].rows[1]).startsWith('Last Updated');
    }
  ];

  function testforTopRated() {
    return topRatedTests.every(functionPasses);
  }

  function injectTopRated() {
    if (testforTopRated()) {looksLikeTopRated();}
  }

  var toprated = {
    xp: {'-': injectTopRated},
    monthlyxp: {'-': injectTopRated},
    gold: {'-': injectTopRated},
    killstreak: {'-': injectTopRated},
    bounties: {'-': injectTopRated},
    risingstars: {'-': injectTopRated},
    arena: {'-': injectTopRated},
    superelites: {'-': injectTopRated},
    smasher: {'-': injectTopRated},
    globalquest: {'-': globalQuest}
  };

  var invItems$3;

  function getItemDiv() {
    var itemDiv = getElementById('item-div');
    if (!itemDiv) {
      itemDiv = createDiv({id: 'item-div', className: 'itemDiv'});
      var itemList = getElementById('item-list');
      var oldItems = getElementsByTagName(def_table, itemList);
      while (oldItems.length) {
        oldItems[0].classList.add('fshBlock');
        insertElement(itemDiv, oldItems[0]);
      }
      insertElementBefore(itemDiv, itemList);
    }
    return itemDiv;
  }

  function shouldShow(hidden, all, hasFolder) {
    return hidden && fallback(all, hasFolder);
  }

  function shouldHide(hidden, all, hasFolder) {
    return !hidden && !all && !hasFolder;
  }

  function hideFolderItem(folderid, el) {
    el.children[0].lastElementChild.children[0].children[0].checked = false;
    var hidden = el.classList.contains('fshHide');
    var all = folderid === 'folderid0';
    var hasFolder = el.classList.contains(folderid);
    if (shouldShow(hidden, all, hasFolder)) {
      el.classList.remove('fshHide');
      el.classList.add('fshBlock'); // show()
    }
    if (shouldHide(hidden, all, hasFolder)) {
      el.classList.remove('fshBlock');
      hideElement(el); // hide()
    }
  }

  function doHideFolder(evt) {
    var items = getArrayByTagName(def_table, getItemDiv());
    items.forEach(partial(hideFolderItem, evt.target.id));
  }

  function hideFolder(evt) {
    if (evt.target.nodeName === 'SPAN' &&
        evt.target.id.indexOf('folderid') !== -1) {doHideFolder(evt);}
  }

  function folderSpan$1(pair) {
    return ' &ensp;<span id="folderid' + pair[0] +
      '" class="fshLink fshNoWrap" fid=' + pair[0] + '>' +
      pair[1] + '</span> ';
  }

  function doFolderHeaders(folders) {
    var foldersRow = createTr({
      id: 'fshFolderSelect',
      innerHTML: '<td colspan=6>' +
        '<span id="folderid0" class="fshLink" fid=0>All</span>' +
        ' &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>' +
        Object.entries(folders).map(folderSpan$1).join('')
    });
    on(foldersRow, 'click', hideFolder);
    var el = getElementById('item-list').parentNode.parentNode;
    insertHtmlBeforeBegin(el, '<tr id="fshShowSTs">' +
      '<td align="center" colspan=6>' +
      '<label><input type="checkbox" id="itemsInSt" checked> ' +
      'Select items in ST</label></td></tr>');
    insertElementBefore(foldersRow, el);
  }

  function stColor(el, item) {
    if (item.is_in_st) {
      el.classList.add('isInST');
    }
  }

  function forEachInvItem(el) {
    var checkbox = el.children[0].lastElementChild.children[0].children[0];
    var item = invItems$3[checkbox.getAttribute('value')];
    if (item) {
      el.classList.add('folderid' + item.folder_id);
      if (invItems$3.fshHasST) {stColor(el, item);}
      checkbox.classList.add('itemid' + item.item_id);
      checkbox.classList.add('itemtype' + item.type);
    }
  }

  function processTrade(data) {

    time('trade.processTrade');

    invItems$3 = data.items;
    // Highlight items in ST
    var nodeList = getArrayByTagName(def_table, getElementById('item-list'));
    nodeList.forEach(forEachInvItem); // TODO unnecessary DOM manipulation
    doFolderHeaders(data.folders);

    timeEnd('trade.processTrade');

  }

  function gotInventory(data) {
    add(3, processTrade, [data]);
  }

  function doFolders() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getInventoryById().then(gotInventory);
  }

  function getHowMany(itemTables) {
    var howMany = parseInt(getElementById('fshSendHowMany').value, 10);
    if (isNaN(howMany)) {return itemTables.length;}
    if (calf.subcmd !== '-') {return Math.min(100, howMany);}
    return howMany;
  }

  function itemType$1(itemid, checkbox) {
    return itemid === 'itemid-2' && hasClass('itemtype12', checkbox);
  }

  function thisType$2(itemid, checkbox) {
    return itemid === 'itemid-1' ||
      itemType$1(itemid, checkbox) ||
      hasClass(itemid, checkbox);
  }

  function findStCheck() {
    var cbox = getElementById('itemsInSt');
    if (cbox) {return cbox.checked;}
  }

  function notInSt(itemsInSt, el) {
    return itemsInSt || !hasClass('isInST', el);
  }

  function getCheckbox(el) {
    return el.children[0].lastElementChild.children[0].children[0];
  }

  function doCheck$1(bool, checkbox) {
    checkbox.checked = bool;
  }

  function unCheckAll(checkbox) {
    doCheck$1(false, checkbox);
  }

  function checkAll$1(checkbox) {
    doCheck$1(true, checkbox);
  }

  function doTheChecks(itemid, itemTables) {
    itemTables
      .filter(partial(notInSt, findStCheck()))
      .map(getCheckbox)
      .filter(partial(thisType$2, itemid))
      .slice(0, getHowMany(itemTables))
      .forEach(checkAll$1);
  }

  function doCheckAll$1(evt) {
    var itemList = getElementById('item-div') ||
      getElementById('item-list');
    var itemTables = querySelectorArray('table:not(.fshHide)', itemList);
    itemTables
      .map(getCheckbox)
      .forEach(unCheckAll);
    doTheChecks(evt.target.id, itemTables);
  }

  function toggleAllPlants(evt) {
    if (hasClass('fshCheckAll', evt.target)) {doCheckAll$1(evt);}
  }

  function arrayfromList(classes) {
    return jsonParse('[' + classes + ']');
  }

  function getItemList() {
    var sendClasses = getValue('sendClasses');
    var itemList = arrayfromList(sendClasses);
    if (itemList) {return itemList;}
    return arrayfromList(defaults.sendClasses);
  }

  function makeSpan(el) {
    return ' &ensp;<span id="itemid' + el[1] +
      '" class="fshCheckAll fshLink fshNoWrap">' + el[0] + '</span>';
  }

  function injectTradeOld() {
    var multiple = createTr({
      id: 'fshSelectMultiple',
      innerHTML: '<td colspan=6>Select:&ensp;<span id="itemid-1" ' +
        'class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;' +
        '<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">' +
        'All Resources</span>' + getItemList().map(makeSpan).join('') +
        ' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" ' +
        'class="custominput" value="all" size=3></td>'
    });
    on(multiple, 'click', toggleAllPlants);
    var el = getElementById('item-list').parentNode.parentNode;
    insertElementBefore(multiple, el);
  }

  function injectTrade() {
    add(3, doFolders);
    add(3, injectTradeOld);
  }

  var trade = {
    '-': {'-': injectTrade},
    sendgold: {'-': injectTrade},
    createsecure: {'-': injectTrade},
    docreatesecure: {'-': injectTrade}
  };

  var pageSwitcher = {
    settings: {'-': {'-': injectSettings}},
    world: {'-': {'-': injectWorld}},
    news: news,
    arena: arena$1,
    questbook: questbook,
    profile: profile$3,
    auctionhouse: auctionhouse,
    guild: guild$2,
    bank: {'-': {'-': injectBank}},
    log: log$1,
    potionbazaar: {'-': {'-': injectBazaar}},
    marketplace: {createreq: {'-': marketplace}},
    quickbuff: {'-': {'-': injectQuickBuff}}, // No ga
    notepad: notepad,
    points: {'-': {'-': points}},
    trade: trade,
    titan: {'-': {'-': injectTitan}},
    toprated: toprated,
    inventing: {viewrecipe: {'-': inventing}},
    tempinv: {'-': {'-': injectMailbox}},
    findplayer: {'-': {'-': injectFindPlayer}},
    quests: quests, // UFSG
    items: items, // UFSG
    creatures: {'-': {'-': allowBack}}, // UFSG
    masterrealms: {'-': {'-': allowBack}}, // UFSG
    realms: {'-': {'-': allowBack}}, // UFSG
    relics: {'-': {'-': allowBack}}, // UFSG
    shops: {'-': {'-': allowBack}}, // UFSG
    scavenging: scavenging,
    temple: {'-': {'-': parseTemplePage}},
    composing: composing$2,
    pvpladder: {'-': {'-': ladder}},
    crafting: {'-': {'-': craftForge}},
    hellforge: {'-': {'-': craftForge}},
    superelite: {'-': {'-': superelite$2}},
    '-': noCmd,
    combat: {attackplayer: {'-': injectProfile}}
  };

  var cmd;
  var subcmd;
  var subcmd2;
  var type = '';
  var coreFunction;
  var functionPath;

  function getParam(param) {
    return getUrlParameter(param) || '-';
  }

  function newSelector(selector) {
    var test_cmd = querySelector(selector);
    return test_cmd && test_cmd.value || '-';
  }

  function isValid$1() {
    return isObject(pageSwitcher[cmd]) &&
      isObject(pageSwitcher[cmd][subcmd]) &&
      isFunction(pageSwitcher[cmd][subcmd][subcmd2]);
  }

  function testCoreFunction() {
    if (isValid$1()) {
      return pageSwitcher[cmd][subcmd][subcmd2];
    }
  }

  function getParamsFromUrl() {
    cmd = getParam('cmd');
    subcmd = getParam('subcmd');
    subcmd2 = getParam('subcmd2');
    if (cmd === 'points') {type = '/' + getParam('type');}
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
    functionPath = cmd + '/' + subcmd + '/' + subcmd2 + type;
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
    devHooks();
    if (isFunction(coreFunction)) {
      screenview(functionPath);
      start('JS Perf', functionPath);
      coreFunction();
      end('JS Perf', functionPath);
    }
  }

  function runCore() {
    initNow();
    initPcc();
    getCoreFunction();
    lookForHcsData();
    add(3, asyncDispatcher);
    isMessageSound();
    /* This must be at the end in order not to
    screw up other findNode calls (Issue 351) */
    doQuickLinks();
  }

  window.FSH = window.FSH || {};
  window.FSH.calf = '134';

  // main event dispatcher
  window.FSH.dispatch = function dispatch() {
    if (!isFunction(Promise.prototype.finally)) {return;}
    globalErrorHandler();
    setup();
    start('JS Perf', 'FSH.dispatch');
    runCore();
    end('JS Perf', 'FSH.dispatch');
  };

}());
//# sourceMappingURL=calfSystem.js.map
