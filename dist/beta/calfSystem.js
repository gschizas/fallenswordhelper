(function () {
  'use strict';

  function isType(e, t) {return typeof e === t;}

  function isUndefined(e) {return isType(e, 'undefined');}

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
  var footWrap = getElementById('foot-wrap');

  function log(text, value) {
    if (footWrap) {
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

  var thePlayerId;

  function playerId() {
    if (!thePlayerId) {
      thePlayerId = Number(
        getElementById('holdtext')
          .textContent.match(/fallensword.com\/\?ref=(\d+)/)[1]
      );
    }
    return thePlayerId;
  }

  var times = {};
  var refAry = ['www.lazywebtools.co.uk', 'refreshthing.com'];

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

  function fixupUrl() {
    var origPath = window.location.pathname + window.location.search;
    var page = origPath.replace(/&m=.*/, '')
      .replace(/&subcmd=&.*/, '')
      .replace(/&subcmd2=&.*/, '')
      .replace(/&[a-z_]+_id=.+/, '')
      .replace(/&id=.+/, '')
      .replace(/&target_player=.+/, '')
      .replace(/&[a-z]+_username=.+/, '')
      .replace(/\?cmd=auctionhouse.+/, '?cmd=auctionhouse')
      .replace(/&subcmd=[0-9a-f]{32}/, '')
      .replace(/&search_active=.+/, '')
      .replace(/&letter=.+/, '')
      .replace(/&guild_name=.+/, '')
      .replace(/&user=.+/, '')
      .replace(/&[a-z_]*page=.+/, '')
      .replace(/&prestige=.+/, '')
      .replace(/&withdraw_amount=.+/, '')
      .replace(/&tickets=.+/, '')
      .replace(/&search=.+/, '')
      .replace(/&target=.+/, '')
      .replace(/&xcv=[0-9a-f]{32}/, '')
      .replace(/\?ref=[0-9]+/, '');
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

  // TODO needs CORS

  // window.addEventListener('error', function(e) {
  //   // console.log('e.message', e.message);
  //   // console.log('e.filename', e.filename);
  //   // console.log('e.lineno', e.lineno);
  //   // console.log('e.colno', e.colno);
  //   console.log('error event', e);
  //   if (e.error) {
  //     console.log('error event message', e.error.message);
  //     console.log('error event stack', e.error.stack);
  //   }
  //   // sendException(e.error.stack, true);
  // });

  // var oldError = window.onerror;
  // window.onerror = function(message, source, lineno, colno, error) {
  //   console.log('onerror message', message);
  //   console.log('onerror source', source);
  //   console.log('onerror lineno', lineno);
  //   console.log('onerror colno', colno);
  //   console.log('onerror error', error);
  //   console.log('onerror error.message', error.message);
  //   console.log('onerror error.stack', error.stack);
  // };

  // GM_ApiBrowserCheck
  // @author        GIJoe
  // @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
  // Global variables
  var gvar = {};
  var GMSTORAGE_PATH = 'GM_';

  function storItem(name, type, value) {
    window.localStorage.setItem(GMSTORAGE_PATH + name, type + value);
  }

  var reviver = [
    {
      condition: 'S]',
      result: function(value) {return value.substr(2);}
    },
    {
      condition: 'N]',
      result: function(value) {return parseInt(value.substr(2), 10);}
    },
    {
      condition: 'B]',
      result: function(value) {return value.substr(2) === 'true';}
    }
  ];
  var cold = [
    {
      condition: 'string',
      result: function(name, value) {storItem(name, 'S]', value);}
    },
    {
      condition: 'number',
      result: function(name, value) {
        if (value.toString().indexOf('.') < 0) {storItem(name, 'N]', value);}
      }
    },
    {
      condition: 'boolean',
      result: function(name, value) {storItem(name, 'B]', value);}
    }
  ];

  function retrieve(value) {
    for (var i = 0; i < reviver.length; i += 1) {
      var test = reviver[i];
      if (value.substr(0, 2) === test.condition) {return test.result(value);}
    }
    return value;
  }

  // You can change it to avoid conflict with others scripts
  var needApiUpgrade = false;
  if (window.navigator.appName.match(/^opera/i) &&
      typeof window.opera !== 'undefined') {
    needApiUpgrade = true;
    gvar.isOpera = true;
    window.GM_log = window.opera.postError;
  }
  if (typeof GM_setValue !== 'undefined') {
    var gsv;
    try {
      gsv = window.GM_setValue.toString();
    } catch (e) {
      gsv = 'staticArgs';
    }
    if (gsv.indexOf('staticArgs') > 0) {
      gvar.isGreaseMonkey = true;
    // test GM_hitch
    } else if (gsv.match(/not\s+supported/)) {
      needApiUpgrade = true;
      gvar.isBuggedChrome = true;
    }
  } else {
    needApiUpgrade = true;
  }

  if (needApiUpgrade) {
    var ws = null;
    var uid = new Date().toString();
    var result;
    try {
      window.localStorage.setItem(uid, uid);
      result = window.localStorage.getItem(uid) === uid;
      window.localStorage.removeItem(uid);
      if (result) {
        ws = typeof window.localStorage;
      } else {
        sendException('There is a problem with your local storage. ' +
          'FSH cannot persist your settings.', false);
        ws = null;
      }
    } catch (e) {
      ws = null;
    }
    // Catch Security error
    if (ws === 'object') {
      window.GM_getValue = function(name, defValue) {
        var value = window.localStorage.getItem(GMSTORAGE_PATH + name);
        if (value === null || isUndefined(value)) {return defValue;}
        return retrieve(value);
      };
      window.GM_setValue = function(name, value) {
        for (var i = 0; i < cold.length; i += 1) {
          var storType = cold[i];
          if (typeof value === storType.condition) {
            storType.result(name, value);
          }
        }
      };
    } else if (!gvar.isOpera || isUndefined(window.GM_setValue)) {
      gvar.temporarilyStorage = [];
      window.GM_getValue = function(name, defValue) {
        if (typeof gvar.temporarilyStorage[GMSTORAGE_PATH + name] ===
          'undefined') {return defValue;}
        return gvar.temporarilyStorage[GMSTORAGE_PATH + name];
      };
      window.GM_setValue = function(name, value) {
        if (['string', 'boolean', 'number'].indexOf(typeof value) !== -1) {
          gvar.temporarilyStorage[GMSTORAGE_PATH + name] = value;
        }
      };
    }

    window.GM_listValues = function() {
      var list = [];
      var reKey = new RegExp('^' + GMSTORAGE_PATH);
      for (var i = 0, il = window.localStorage.length; i < il; i += 1) {
        var key = window.localStorage.key(i);
        if (key.match(reKey)) {
          list.push(key.replace(GMSTORAGE_PATH, ''));
        }
      }
      return list;
    };
  }

  function fallback(a, b) {
    return a || b;
  }

  function isFunction(e) {return isType(e, 'function');}

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

  function taskRunner() {
    if (getLength() === 0) {
      paused = true;
    } else {
      paused = false;
      window.postMessage(message, '*');
    }
  }

  function add(priority, fn, args, scope) {
    if (isFunction(fn)) {
      var _scope = fallback(scope, window);
      var _args = fallback(args, []);
      push(fn.bind.apply(fn, [_scope].concat(_args)), priority);
      if (paused) {taskRunner();}
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
    return e.message;
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

  window.addEventListener('message', callback);

  window.addEventListener('error', function(e) {
    if (e.error) {
      sendException(parseError(e.error), true);
    }
  });

  var calf = {};

  var dragTarget;

  function dragOver(event) {
    event.preventDefault();
    return false;
  }

  function dragDrop(event) {
    var offset = event.dataTransfer.getData('text/plain').split(',');
    dragTarget.style.left =
      event.clientX + parseInt(offset[0], 10) + 'px';
    dragTarget.style.top =
      event.clientY + parseInt(offset[1], 10) + 'px';
    document.body.removeEventListener('dragover', dragOver, false);
    document.body.removeEventListener('drop', dragDrop, false);
    event.preventDefault();
    return false;
  }

  function dragStart(parent, event) {
    if (parent) {
      dragTarget = parent;
    } else {
      dragTarget = event.target;
    }
    var style = window.getComputedStyle(dragTarget, null);
    event.dataTransfer.setData('text/plain',
      parseInt(style.getPropertyValue('left'), 10) - event.clientX + ',' +
      (parseInt(style.getPropertyValue('top'), 10) - event.clientY));
    document.body.addEventListener('dragover', dragOver, false);
    document.body.addEventListener('drop', dragDrop, false);
  }

  function draggable(element, parent) {
    element.draggable = true;
    element.addEventListener('dragstart', dragStart.bind(null, parent));
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  var thePlants = [
    'Amber',
    'Blood Bloom',
    'Jademare',
    'Dark Shade',
    'Trinettle',
    'Heffle Wart'
  ];
  var thePotions = [
    ['Sludge Brew', 'DC 200'],
    ['Potion of Black Death', 'DC 225'],
    ['Potion of Aid', 'Assist'],
    ['Potion of Supreme Doubling', 'DB 450'],
    ['Potion of Acceleration', 'DB 500'],
    ['Potion of Lesser Death Dealer', 'DD'],
    ['Runic Potion', 'FI 250'],
    ['Potion of the Bookworm', 'Lib 225'],
    ['Potion of Truth', 'EW 1k'],
    ['Dull Edge', 'DE 25'],
    ['Notched Blade', 'DE 80'],
    ['Potion of Death', 'DW 125'],
    ['Potion of Decay', 'WI 150'],
    ['Potion of Fatality', 'WI 350'],
    ['Potion of Annihilation', 'DW 150'],
    ['Potion of the Wise', 'Lib 200'],
    ['Potion of Shattering', 'SA'],
    ['Dragons Blood Potion', 'ZK 200'],
    ['Berserkers Potion', 'ZK 300'],
    ['Potion of Fury', 'ZK 350'],
    ['Potion of Supreme Luck', 'FI 1k']
  ];

  function plants() {
    return thePlants.map(function(el) {
      return {category: 'Plants', searchname: el, nickname: ''};
    });
  }

  function potions() {
    return thePotions.map(function(el) {
      return {
        category: 'Potions',
        searchname: el[0],
        nickname: el[1],
        displayOnAH: true
      };
    });
  }

  function def_quickSearch() {
    return JSON.stringify(plants().concat(potions()));
  }

  /* eslint-disable max-lines */
  var defaults = {
    lastActiveQuestPage: '',
    lastNormalActiveQuestPage: '',
    lastNormalCompletedQuestPage: '',
    lastNormalNotStartedQuestPage: '',
    lastSeasonalActiveQuestPage: '',
    lastSeasonalCompletedQuestPage: '',
    lastSeasonalNotStartedQuestPage: '',

    enableLogColoring: false,
    enableChatParsing: false,
    enableCreatureColoring: false,
    showCombatLog: false,
    showCreatureInfo: false,
    keepLogs: false,

    showExtraLinks: false,
    huntingBuffs: 'Doubler,Librarian,Adept Learner,Merchant,' +
      'Treasure Hunter,Animal Magnetism,Conserve',
    huntingBuffsName: 'default',
    huntingBuffs2: 'Deflect',
    huntingBuffs2Name: 'PvP',
    huntingBuffs3: 'Super Elite Slayer',
    huntingBuffs3Name: 'SE',
    showHuntingBuffs: false,
    moveFSBox: false,
    moveDailyQuest: false,

    guildSelf: '',
    guildSelfMessage: 'Member of your own guild!',
    guildFrnd: '',
    guildFrndMessage: 'Do not attack - Guild is friendly!',
    guildPast: '',
    guildPastMessage: 'Do not attack - You\'ve been in that guild once!',
    guildEnmy: '',
    guildEnmyMessage: 'Enemy guild. Attack at will!',
    goldRecipient: '',
    goldAmount: '',
    sendGoldonWorld: false,

    hideQuests: false,
    hideQuestNames: '',
    hideRecipes: false,
    hideRecipeNames: '',
    enableGuildInfoWidgets: false,
    enableOnlineAlliesWidgets: false,
    guildOnlineRefreshTime: 300,
    hideGuildInfoSecureTrade: false,
    hideGuildInfoTrade: false,
    hideGuildInfoMessage: false,
    hideGuildInfoBuff: false,

    buyBuffsGreeting: 'Hello {playername}, can I buy {buffs} for {cost} please?',
    renderSelfBio: false,
    bioEditLines: 10,
    renderOtherBios: false,
    playNewMessageSound: false,
    showSpeakerOnWorld: false,
    defaultMessageSound: 'https://fallenswordhelper.github.io/fallenswordhelper/audio/sms-alert-2-daniel_simon.wav',
    highlightPlayersNearMyLvl: false,
    highlightGvGPlayersNearMyLvl: false,
    detailedConflictInfo: false,
    gameHelpLink: true,
    navigateToLogAfterMsg: false,

    enableAllyOnlineList: false,
    enableEnemyOnlineList: false,
    allyEnemyOnlineRefreshTime: 300,
    moveGuildList: false,
    moveOnlineAlliesList: false,

    hideMatchesForCompletedMoves: false,
    doNotKillList: '',
    enableBioCompressor: false,
    maxCompressedCharacters: 250,
    maxCompressedLines: 10,

    currentGoldSentTotal: 0,
    keepBuffLog: false,
    buffLog: '',

    enableActiveBountyList: false,
    bountyListRefreshTime: 300,
    enableWantedList: false,
    wantedNames: '',
    wantedGuildMembers: false,
    bwNeedsRefresh: true,

    fsboxlog: false,
    fsboxcontent: '',
    itemRecipient: '',
    quickLinks: '[]',
    enableAttackHelper: false,
    minGroupLevel: 1,
    combatEvaluatorBias: 0,
    huntingMode: false,
    enabledHuntingMode: '1',
    hideRelicOffline: false,

    enterForSendMessage: false,
    trackKillStreak: false,
    storeLastQuestPage: false,
    addAttackLinkToLog: false,
    showStatBonusTotal: false,

    newGuildLogHistoryPages: 3,
    useNewGuildLog: false,
    enhanceChatTextEntry: false,

    ajaxifyRankControls: false,

    enableMaxGroupSizeToJoin: false,
    maxGroupSizeToJoin: 11,

    enableTempleAlert: false,
    enableUpgradeAlert: false,
    enableComposingAlert: false,
    autoFillMinBidPrice: false,
    showPvPSummaryInLog: false,
    enableQuickDrink: false,
    enhanceOnlineDots: false,
    hideBuffSelected: false,
    hideHelperMenu: false,
    keepHelperMenuOnScreen: true,
    draggableHelperMenu: false,
    quickLinksTopPx: 22,
    quickLinksLeftPx: 0,
    draggableQuickLinks: false,
    showNextQuestSteps: true,

    showRecallMessages: true,
    showRelicMessages: true,
    showMercenaryMessages: true,
    showGroupCombatMessages: true,
    showDonationMessages: true,
    showRankingMessages: true,
    showGvGMessages: true,
    showTaggingMessages: true,
    showTitanMessages: true,

    showQuickDropLinks: false,

    onlinePlayerMinLvl: 1,
    onlinePlayerMaxLvl: 9999,
    arenaMinLvl: 1,
    arenaMaxLvl: 9999,
    showMonsterLog: false,
    lastTempleCheck: 0,
    needToPray: false,
    lastChatCheck: '0',
    lastGuildLogCheck: '0',
    lastOutBoxCheck: '0',
    lastPlayerLogCheck: '0',
    showAdmin: false,
    alliestotal: 0,
    enemiestotal: 0,
    footprints: false,
    hideNonPlayerGuildLogMessages: false,
    listOfAllies: '',
    listOfEnemies: '',
    contactList: '',
    lastUpgradeCheck: 0,
    needToDoUpgrade: false,
    characterVirtualLevel: 0,
    guildLogoControl: false,
    statisticsControl: false,
    guildStructureControl: false,
    lastMembrListCheck: 0,
    disableItemColoring: true,
    showQuickSendLinks: false,
    needToCompose: false,
    lastComposeCheck: 0,
    lastOnlineCheck: 0,
    bountyList: '',
    wantedList: '',
    lowestLevelInTop250: 0,

    quickMsg: '["Thank you very much ^_^","Happy hunting, {playername}"]',

    sendClasses: '["Composed Pots", "13699"], ["Amber", "5611"], ' +
      '["Amethyst Weed", "9145"], ["Blood Bloom", "5563"], ' +
      '["Cerulean Rose", "9156"], ["Coleoptera Body", "9287"], ' +
      '["Dark Shade", "5564"], ["Deathbloom", "9140"], ' +
      '["Deathly Mold", "9153"], ["Greenskin\u00A0Fungus", "9148"], ' +
      '["Heffle", "5565"], ["Jademare", "5566"], ' +
      '["Ruby Thistle", "9143"], ["Toad Corpse","9288"], ' +
      '["Trinettle", "5567"], ["Viridian\u00A0Vine", "9151"], ' +
      '["Mortar & Pestle", "9157"], ["Beetle Juice", "9158"]',

    quickSearchList: def_quickSearch(),

    arenaMoves: '[]',
    arenaMatches: '[]',
    CombatLog: '',
    hideChampionsGroup: false,
    hideElitesGroup: false,
    hideSEGroup: false,
    hideTitanGroup: false,
    hideLegendaryGroup: false,
    disableDeactivatePrompts: false,
    moveComposingButtons: false,
    expandMenuOnKeyPress: false,
    disableBreakdownPrompts: false,
    collapseNewsArchive: false,
    collapseHallPosts: false,
    lastmyGuildLogCheck: 0,
    hideSubLvlCreature: false,
    hidePlayerActions: false,
    extraProfile: '',
    textToSearchFor: '',
    lastLadderReset: 0,
    disableQuickWearPrompts: false,
    enableGuildActivityTracker: false,
    enableSeTracker: false,
    showTitanInfo: false
  };

  function getValue(name) {
    return GM_getValue(name, defaults[name]);
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

  function haveNode(node, quickLinks) { // Native ?
    var quickLinksTopPx = getValue('quickLinksTopPx');
    var quickLinksLeftPx = getValue('quickLinksLeftPx');
    var draggableQuickLinks = getValue('draggableQuickLinks');
    var draggableQuickLinksClass = retBool(draggableQuickLinks, ' fshMove', '');
    var html = '<div style="top:' + quickLinksTopPx + 'px; left:' +
      quickLinksLeftPx + 'px; background-image:url(\'' + imageServer +
      '/skin/inner_bg.jpg\');" id="fshQuickLinks" class="fshQuickLinks' +
      retOption('keepHelperMenuOnScreen', ' fshFixed', '') +
      draggableQuickLinksClass + '">';
    for (var i = 0; i < quickLinks.length; i += 1) {
      var newWindow = retBool(quickLinks[i].newWindow, ' target="new"', '');
      html += '<li><a href="' + escapeHtml(quickLinks[i].url) + '"' +
        newWindow + '>' + quickLinks[i].name + '</a></li>';
    }
    html += '</div>';
    insertHtmlBeforeEnd(document.body, html);
    isDraggable(draggableQuickLinks);
  }

  function injectQuickLinks() { // Native ?
    var node = getElementById('statbar-container');
    if (!node) {return;}
    var quickLinks = fallback(getValueJSON('quickLinks'), []);
    if (quickLinks.length <= 0) {return;}
    haveNode(node, quickLinks);
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

  function doMsgSound() { // jQuery
    var soundLocation = getValue('defaultMessageSound');
    $('a:contains("New log messages"):first').each(function(i, e) {
      $(e).after('<audio src="' + soundLocation +
      '" autoplay=true />');
    });
    $('a:contains("New Guild chat message"):first').each(function(i, e) {
      $(e).after('<audio src="' + soundLocation +
      '" autoplay=true />');
    });
  }

  function isMessageSound() {
    if (getValue('playNewMessageSound')) {
      add(3, doMsgSound);
    }
  }

  function isObject(e) {return isType(e, 'object');}

  function jQueryNotPresent() {return !isFunction(window.$);}

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
  var now = Date.now();
  var nowSecs = Math.floor(now / 1000);
  var newGuildLogLoc = '?cmd=notepad&blank=1&subcmd=newguildlog';
  var newGuildLogUrl = 'index.php' + newGuildLogLoc;
  var beginFolderSpanElement =
    '<span class="fshLink fshNoWrap fshFolder fshVMid" data-folder="';
  var guideUrl = 'https://guide.fallensword.com/index.php?&cmd=';
  var def_afterUpdateActionlist = 'after-update.actionlist';
  var def_playerBuffs = 'buffs.player';
  var def_suffixSuccessActionResponse = '-success.action-response';

  var def_fetch_worldRealmActions = 256;

  function testForGuildLogMsg(guildLogNode) {
    return location.search !== newGuildLogLoc ||
      guildLogNode.parentNode.id !== 'notification-guild-log';
  }

  function hideGuildLogMsg(guildLogNode) {
    // hide the lhs box
    if (testForGuildLogMsg(guildLogNode)) {return;}
    var messageBox = guildLogNode.parentNode;
    if (messageBox) {
      messageBox.classList.add('fshHide');
    }
  }

  function gotGuildLogNodes(guildLogNodes) {
    var guildLogNode;
    for (var i = 0; i < guildLogNodes.length; i += 1) {
      guildLogNode = guildLogNodes[i];
      guildLogNode.href = newGuildLogUrl;
    }
    hideGuildLogMsg(guildLogNode);
  }

  function changeGuildLogHREF() {
    if (!getValue('useNewGuildLog')) {return;}
    var guildLogNodes = document.querySelectorAll(
      '#pCL a[href="index.php?cmd=guild&subcmd=log"]');
    if (guildLogNodes.length > 0) {gotGuildLogNodes(guildLogNodes);}
  }

  function stringifyError(err) {
    return JSON.stringify(err,
      Object.getOwnPropertyNames(Object.getPrototypeOf(err)), 1)
      .replace(/\n/g, '');
  }

  // import localforage from

  function forageGet(forage, dfr) {
    localforage.getItem(forage, function getItemCallback(err, data) {
      if (err) {
        sendException(forage + ' localforage.getItem error ' +
          stringifyError(err), false);
        dfr.reject(err);
      } else {
        // returns null if key does not exist
        dfr.resolve(data);
      }
    });
  }

  function getForage(forage) {
    // Wrap in jQuery Deferred because we're using 1.7
    // rather than using ES6 promise
    var dfr = $.Deferred();
    if (window.localforage) {
      forageGet(forage, dfr);
    }
    return dfr.promise();
  }

  function extend(obj, mixins) {
    Object.keys(mixins).forEach(function(key) {
      if (isObject(mixins[key]) && mixins[key] !== null) {
        obj[key] = extend(mixins[key].constructor(), mixins[key]);
      } else {
        obj[key] = mixins[key];
      }
    });
    return obj;
  }

  var paused$1 = true;
  var queue = [];

  function beforeSend(xhr) {
    window.addEventListener('beforeunload', function() {
      xhr.abort();
      queue = [];
    });
  }

  function doAjax(options, retries, dfr) {
    var opt;
    if (typeof options === 'string') {
      opt = {url: options};
    } else {
      opt = options;
    }
    opt.beforeSend = beforeSend;
    return $.ajax(opt).pipe(dfr.resolve,
      function(jqXhr, textStatus, errorThrown) {
        if (retries > 0 && jqXhr.status === 503) {
          setTimeout(doAjax, 100, opt, retries - 1, dfr);
        } else {
          dfr.reject(jqXhr, textStatus, errorThrown);
        }
      }
    );
  }

  function taskRunner$1() {
    if (queue.length === 0) {
      paused$1 = true;
    } else {
      paused$1 = false;
      if ($.active < 4) {
        var opts = queue.shift();
        doAjax.apply(null, opts);
        taskRunner$1();
      }
    }
  }

  function add$1(options, retries, dfr) {
    queue.push([options, retries, dfr]);
    if (paused$1) {taskRunner$1();}
  }

  function retryAjax(options) {
    var dfr = $.Deferred();
    if (options) {add$1(options, 10, dfr);}
    return dfr.promise();
  }

  if (typeof jQuery !== 'undefined') {
    $(document).ajaxComplete(function() {
      taskRunner$1();
    });
  }

  function callApp(data) {
    extend(data, {app: 1});
    return retryAjax({
      url: 'app.php',
      data: data,
      dataType: 'json'
    });
  }

  function guildManage() {
    return callApp({cmd: 'guild', subcmd: 'manage'});
  }

  function jQueryPresent() {return isFunction(window.$);}

  function mixin(obj, mixins) {
    Object.keys(mixins).forEach(function(key) {
      if (isObject(mixins[key]) && mixins[key] !== null) {
        mixin(obj[key], mixins[key]);
      } else {
        obj[key] = mixins[key];
      }
    });
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
    return cElement('table', props);
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

  function insertElement(parent, child) {
    if (parent instanceof Node && child instanceof Node) {
      parent.appendChild(child);
    }
    return child;
  }

  function jConfirm(title, msgText, fn) { // jQuery
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
    fshMsg.textContent = msgText;
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

  function clearForage() {
    localforage.clear().catch(function(err) {
      sendException('localforage.clear error ' + stringifyError(err), false);
    });
  }

  function forageSet(forage, data, dfr) {
    localforage.setItem(forage, data).then(function(value) {
      dfr.resolve(value);
    }).catch(function(err) {
      if (err.name === 'QuotaExceededError') {
        jConfirm('IndexedDB Quota Exceeded Error',
          'Would you like to clear IndexedDB?',
          clearForage
        );
      } else {
        sendException('localforage.setItem error ' + stringifyError(err), false);
      }
      dfr.reject(err);
    });
  }

  function setForage(forage, data) {
    // Wrap in jQuery Deferred because we're using 1.7
    // rather than using ES6 promise
    var dfr = $.Deferred();
    if (window.localforage) {
      forageSet(forage, data, dfr);
    }
    return dfr.promise();
  }

  var act = 0;
  var cur = 1;
  var lvl = 2;
  var max = 3;
  var utc = 4;
  var vl = 5;
  var gxp = 6;

  var oldArchive;
  var guild;

  function pushNewRecord(member) {
    oldArchive.members[member.name].push([
      Math.floor(member.last_activity / 86400),
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

  function processMemberRecord(newArchive, member) {
    initMember(member);
    var archiveMember = oldArchive.members[member.name];
    var archiveLength = archiveMember.length;
    var archiveRecord = archiveMember[archiveLength - 1];
    var archiveAge = nowSecs - archiveRecord[utc];
    if (archiveAge >= 86100) {
      var type2change = type2tests.some(function(test) {
        if (test(archiveRecord, member)) {
          return true;
        }
        return false;
      });
      if (type2change) {
        pushNewRecord(member);
      } else {
        archiveRecord[act] = Math.floor(member.last_activity / 86400);
        archiveRecord[utc] = nowSecs;
      }
    }
    newArchive.members[member.name] = oldArchive.members[member.name];
  }

  function doMerge() { // jQuery.min
    var newArchive = {lastUpdate: nowSecs, members: {}};
    guild.r.ranks.forEach(function(rank) {
      rank.members.forEach(processMemberRecord.bind(null, newArchive));
    });
    setForage('fsh_guildActivity', newArchive);
  }

  function gotGuild(data) {
    if (data && data.r) {
      guild = data;
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
      guildManage().done(gotGuild);
    }
  }

  function guildActivity() { // jQuery.min
    if (jQueryPresent() && getValue('enableGuildActivityTracker')) {
      getForage('fsh_guildActivity').done(gotActivity);
    }
  }

  function createDocument(details) {
    // Use DOMParser to prevent img src tags downloading
    var parser = new DOMParser();
    var doc = parser.parseFromString(details, 'text/html');
    return doc;
  }

  function getRandomInt(_min, _max) {
    var min = Math.ceil(_min);
    var max = Math.floor(_max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function insertElementBefore(newNode, referenceNode) {
    if (referenceNode instanceof Node &&
        referenceNode.parentNode instanceof Node) {
      return referenceNode.parentNode.insertBefore(newNode, referenceNode);
    }
  }

  function insertHtmlAfterBegin(parent, html) {
    insertHtml(parent, 'afterbegin', html);
  }

  function insertHtmlAfterEnd(parent, html) {
    insertHtml(parent, 'afterend', html);
  }

  var pCC = getElementById('pCC');
  var pCR = getElementById('pCR');

  function rnd() {
    return getRandomInt(1000000000, 9999999998);
  }

  function setValue(name, value) {
    GM_setValue(name, value);
  }

  var composeMsg =
    '<li class="notification"><a href="index.php?cmd=composing"><span' +
    ' class="notification-icon"></span><p class="notification-content">' +
    'Composing to do</p></a></li>';

  function displayComposeMsg() {
    insertHtmlAfterBegin(getElementById('notifications'), composeMsg);
  }

  function getDoc(data) {
    if (calf.cmd !== 'composing') {
      return createDocument(data);
    }
    return document;
  }

  function parseComposing(data) {
    var doc = getDoc(data);
    var timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;
    var times = [];
    var openSlots = doc.getElementsByClassName('composing-potion-time');
    Array.prototype.forEach.call(openSlots, function(el) {
      if (el.textContent === 'ETA: Ready to Collect!' ||
          el.textContent === 'ETA: n/a') {
        times.push(0);
      } else {
        var timeArr = timeRE.exec(el.textContent);
        var milli = (timeArr[1] * 3600 + timeArr[2] * 60 + Number(timeArr[3])) *
          1000 + now;
        times.push(milli);
      }
    });
    var eta = Math.min.apply(null, times);
    if (eta === 0) {
      if (calf.cmd !== 'composing') {displayComposeMsg();}
      setValue('needToCompose', true);
    } else {
      setValue('needToCompose', false);
      setValue('lastComposeCheck', eta);
    }
  }

  function createSuccess(temp, textStatus) {
    var potName = temp[temp.selectedIndex].text;
    var myParent = temp.parentNode;
    var infoDiv = myParent.previousElementSibling.previousElementSibling;
    infoDiv.children[0].innerHTML = '';
    infoDiv.children[0].classList.add('fshPot');
    infoDiv.children[0].style.backgroundImage = 'url(' + imageServer +
      '/composing/potions/' + getRandomInt(1, 11) + '_' +
      getRandomInt(1, 51) + '.gif)';
    infoDiv.children[2].innerHTML = 'Creating \'<span class="fshBold">' +
      potName + '</span>\' Potion';
    infoDiv.children[3].innerHTML = '';
    myParent.innerHTML = '<div class="fshScs">' + textStatus + '</div>';
  }

  function createPotion(temp) { // jQuery
    retryAjax({
      cache: false,
      dataType: 'json',
      url: 'index.php',
      data: {
        cmd: 'composing',
        subcmd: 'createajax',
        template_id: temp.value,
        _rnd: rnd()
      }
    }).done(function potionDone(data, textStatus) {
      if (data.error !== '') {
        temp.parentNode.innerHTML = '<div class="fshScs">' +
          data.error + '</div>';
      } else {
        createSuccess(temp, textStatus);
      }
    });
  }

  function isOurTarget(target) {
    return target.tagName === 'SPAN' && target.className === 'quickCreate';
  }

  function doQuickCreate(self) {
    var temp = self.previousElementSibling.previousElementSibling;
    if (temp && temp.value !== 'none') {
      self.innerHTML = '';
      self.classList.add('fshSpinner', 'fshSpinner12', 'fshComposingSpinner');
      createPotion(temp);
    }
  }

  function quickCreate(evt) {
    var self = evt.target.parentNode;
    if (isOurTarget(self)) {doQuickCreate(self);}
  }

  function checkLastCompose() { // jQuery
    var lastComposeCheck = getValue('lastComposeCheck');
    if (lastComposeCheck && now < lastComposeCheck) {return;}
    retryAjax('index.php?no_mobile=1&cmd=composing').done(function(data) {
      add(3, parseComposing, [data]);
    });
  }

  function composeAlert() {
    var needToCompose = getValue('needToCompose');
    if (needToCompose) {
      displayComposeMsg();
      return;
    }
    checkLastCompose();
  }

  function injectComposeAlert() {
    if (jQueryPresent() && calf.cmd !== 'composing') {composeAlert();}
  }

  function moveButtons() {
    if (getValue('moveComposingButtons')) {
      var buttonDiv = getElementById('composing-error-dialog')
        .previousElementSibling;
      buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
      var top = pCC.getElementsByClassName('composing-level')[0]
        .parentNode;
      insertElementBefore(buttonDiv, top);
    }
  }

  function hasJQuery() {
    if (calf.enableComposingAlert) {
      parseComposing();
    }

    var buttons = pCC
      .querySelectorAll('input[id^=create-]:not(#create-multi)');
    Array.prototype.forEach.call(buttons, function(el) {
      insertHtmlAfterEnd(el, '<span class="quickCreate">' +
        '[<span class="sendLink">Quick Create</span>]</span>');
    });
    pCC.addEventListener('click', quickCreate);
    moveButtons();
  }

  function injectComposing() {
    if (jQueryPresent() && pCC) {hasJQuery();}
  }

  function composingCreate() {
    getElementById('composing-add-skill')
      .addEventListener('click', function() {
        getElementById('composing-skill-level-input').value =
          getElementById('composing-skill-level-max').textContent;
      });
    getElementById('composing-skill-select')
      .addEventListener('change', function() {
        getElementById('composing-skill-level-input').value =
          getElementById('composing-skill-level-max').textContent;
      });
  }

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

  // function makePageTemplate(title, comment, spanId, button, divId) {
  function makePageTemplate(o) {
    return makePageHeader(o.title, o.comment, o.spanId, o.button) +
      '<div class="fshSmall" id="' + o.divId + '"></div>';
  }

  function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
    var passthru = '';
    if (buffList) {passthru = '&blist=' + buffList;}
    return 'href=\'javascript:window.openWindow("index.php?cmd=' +
      'quickbuff&tid=' + aPlayerId + passthru +
      '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
  }

  function intValue(theText) {
    if (!theText) {return 0;}
    return parseInt(theText.replace(/,/g, ''), 10);
  }

  var pvpLowerLevel;
  var pvpUpperLevel;
  var gvgLowerLevel;
  var gvgUpperLevel;

  function calcLvlToTest() {
    var levelToTest = intValue(document.getElementsByClassName(
      'stat-level')[0].nextElementSibling.textContent);
    var characterVirtualLevel = getValue('characterVirtualLevel');
    if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
    return levelToTest;
  }

  var lowerPvpCalcs = [
    {
      a: function(levelToTest) {return levelToTest <= 205;},
      b: function() {return 5;}
    },
    {
      a: function(levelToTest) {return levelToTest >= 206 && levelToTest <= 209;},
      b: function(levelToTest) {return levelToTest - 200;}
    },
    {a: function() {return true;}, b: function() {return 10;}}
  ];

  function calcLowerPvpLevel(levelToTest) {
    return levelToTest -
      lowerPvpCalcs.find(function(e) {return e.a(levelToTest);}).b(levelToTest);
  }

  function calcUpperPvpLevel(levelToTest) {
    var modifier = 10;
    if (levelToTest < 200) {modifier = 5;}
    return levelToTest + modifier;
  }

  var lowerGvgCalcs = [
    {
      a: function(levelToTest) {return levelToTest >= 801;},
      b: function() {return 100;}
    },
    {
      a: function(levelToTest) {return levelToTest >= 752;},
      b: function(levelToTest) {return levelToTest - 701;}
    },
    {
      a: function(levelToTest) {return levelToTest >= 351;},
      b: function() {return 50;}
    },
    {
      a: function(levelToTest) {return levelToTest >= 326;},
      b: function(levelToTest) {return levelToTest - 301;}
    },
    {a: function() {return true;}, b: function() {return 25;}}
  ];

  function calcLowerGvgLevel(levelToTest) {
    return levelToTest -
      lowerGvgCalcs.find(function(e) {return e.a(levelToTest);}).b(levelToTest);
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
    gvgLowerLevel = calcLowerGvgLevel(levelToTest);
    gvgUpperLevel = calcUpperGvgLevel(levelToTest);
  }

  function injectFindPlayer() { // Bad jQuery
    if (jQueryNotPresent()) {return;}
    calculateBoundaries();
    var findPlayerButton = $('input[value="Find Player"]');
    findPlayerButton.parent().append('&nbsp;<a href="index.php?' +
      'cmd=findplayer&search_active=1&search_username=&search_level_min=' +
      pvpLowerLevel + '&search_level_max=' +
      pvpUpperLevel + '&search_in_guild=0"><span ' +
      'style="color:blue;">Get PvP targets</span></a>&nbsp;<a href="' +
      'index.php?cmd=findplayer&search_active=1&search_username=&' +
      'search_level_min=' + gvgLowerLevel + '&search_level_max=' +
      gvgUpperLevel + '&search_in_guild=0"><span style="color:blue;">' +
      'Get GvG targets</span></a>');

    $('table[class="width_full"]').find('a[href*="player_id"]')
      .each(function(i, e) {
        var id = /player_id=([0-9]*)/.exec($(e).attr('href'));
        $(e).after('<a style="color:blue;font-size:10px;" ' +
          quickBuffHref(id[1]) + '>[b]</a>');
      });
  }

  function injectNotepad() { // jQuery
    if (jQueryNotPresent()) {return;}
    $('#notepad_notes')
      .attr('cols', '90')
      .attr('rows', '30')
      .css('resize', 'none');
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
    getForage('fsh_fsboxcontent').done(function(fsboxcontent) {
      getElementById('fsboxdetail').innerHTML = fsboxcontent;
    });
    getElementById('fsboxclear')
      .addEventListener('click', function() {
        setForage('fsh_fsboxcontent', '');
        location.reload();
      }, true);
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

  function getBoxList(boxList) {
    if (boxList) {return boxList;}
    return '';
  }

  function storeFSBox(_boxList) {
    var boxList = getBoxList(_boxList);
    var fsbox = getElementById('minibox-fsbox')
      .getElementsByClassName('message')[0].innerHTML;
    if (boxList.indexOf(fsbox) < 0) {boxList = '<br>' + fsbox + boxList;}
    if (boxList.length > 10000) {boxList = boxList.substring(0, 10000);}
    setForage('fsh_fsboxcontent', boxList);
  }

  function fSBoxExists(node) { // jQuery.min
    var nodediv = node.lastElementChild;
    var playerName = nodediv.getElementsByTagName('a');
    if (playerName.length === 0) {return;}
    getForage('fsh_fsboxcontent').done(storeFSBox);
    playerName = playerName[0].textContent;
    insertHtmlBeforeEnd(nodediv,
      '<br><span class="fshPaleVioletRed">' +
      '[ <a href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' +
      playerName + '">Ignore</a> ]</span> ');
    var log = createSpan({
      className: 'fshYellow',
      innerHTML: '[ <span class="fshLink">Log</span> ]'
    });
    log.addEventListener('click', function() {
      sendEvent('injectFSBoxLog', 'injectFsBoxContent');
      jQueryDialog(injectFsBoxContent);
    });
    insertElement(nodediv, log);
  }

  function injectFSBoxLog() {
    var node = getElementById('minibox-fsbox');
    if (jQueryPresent() && node) {fSBoxExists(node);}
  }

  function displayBuffLog(buffLog) {
    getElementById('bufflog').innerHTML = buffLog;
  }

  function clearBuffLog() {
    setForage('fsh_buffLog', '').done(displayBuffLog);
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
    getElementById('clearBuffs').addEventListener('click', clearBuffLog);
    getForage('fsh_buffLog').done(displayBuffLog);
  }

  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function reverseSort(headerClicked) {
    return calf.sortBy && calf.sortBy === headerClicked;
  }

  function doSortParams(headerClicked) {
    if (isUndefined(calf.sortAsc)) {calf.sortAsc = true;}
    if (reverseSort(headerClicked)) {
      calf.sortAsc = !calf.sortAsc;
    }
    calf.sortBy = headerClicked;
  }

  function getPath(obj, aPath, def) {
    var _obj = obj;
    var _path = aPath.split('.');
    var len = _path.length;
    for (var i = 0; i < len; i += 1) {
      if (fallback(!_obj, typeof _obj !== 'object')) {return def;}
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
    return typeof a.type !== 'undefined' && a.type > 8;
  }

  function bIsNotEquipment(a, b) {
    return typeof a.type !== 'undefined' && b.type > 8;
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

  function stringSort(a, b) {
    var result = 0;
    var _a = path(a, calf.sortBy, 'a');
    var _b = path(b, calf.sortBy, 'a');
    if (_a.toLowerCase() < _b.toLowerCase()) {result = -1;}
    if (_a.toLowerCase() > _b.toLowerCase()) {result = 1;}
    return sortDesc(result);
  }

  var content;
  var monsterAry;

  function noMobs() {
    content.innerHTML = '<span>No monster information! ' +
      'Please enable entity log and travel a bit to see the world</span>';
  }

  function mobRows() {
    var result = '';
    for (var i = 0; i < monsterAry.length; i += 1) {
      result += '<tr>' +
        '<td class="fshCenter">' + monsterAry[i].image + '</td>' +
        '<td>' + monsterAry[i].name + '</td>' +
        '<td class="fshCenter">' + monsterAry[i].creature_class + '</td>' +
        '<td class="fshCenter">' + monsterAry[i].level + '</td>' +
        '<td class="fshCenter">' + monsterAry[i].attack + '</td>' +
        '<td class="fshCenter">' + monsterAry[i].defense + '</td>' +
        '<td class="fshCenter">' + monsterAry[i].armor + '</td>' +
        '<td class="fshCenter">' + monsterAry[i].damage + '</td>' +
        '<td class="fshCenter">' + monsterAry[i].hp + '</td>' +
        '<td class="fshCenter">' + monsterAry[i].enhancements + '</td></tr>';
    }
    return result;
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
    doSortParams(target.getAttribute('sortKey'));
    var sortType = findSortType(target);
    sortMonsterAry(sortType);
    drawMobs();
  }

  function doHandlers(evt) { // jQuery.min
    var target = evt.target;
    if (target.id === 'clearEntityLog') {
      setForage('fsh_monsterLog', '');
      noMobs();
      return;
    }
    if (!target.classList.contains('fshLink')) {return;}
    sortCol(target);
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
    content.addEventListener('click', doHandlers);
  }

  function hazEnhancements(enhancements) {
    return enhancements && enhancements.length > 0;
  }

  function prepMonster(data) {
    monsterAry = Object.keys(data).reduce(function(prev, curr) {
      var tmpObj = data[curr];
      tmpObj.name = curr;
      tmpObj.image = '<img class="tip-static" src="' + imageServer +
        '/creatures/' + tmpObj.image_id + '.jpg" data-tipped="<img src=\'' +
        imageServer + '/creatures/' + tmpObj.image_id +
        '.jpg\' width=200 height=200>" width=40 height=40>';
      tmpObj.level = addCommas(tmpObj.level);
      tmpObj.attack = tmpObj.attack.min + ' - ' + tmpObj.attack.max;
      tmpObj.defense = tmpObj.defense.min + ' - ' + tmpObj.defense.max;
      tmpObj.armor = tmpObj.armor.min + ' - ' + tmpObj.armor.max;
      tmpObj.damage = tmpObj.damage.min + ' - ' + tmpObj.damage.max;
      tmpObj.hp = tmpObj.hp.min + ' - ' + tmpObj.hp.max;
      var enhancements;
      if (tmpObj.enhancements) {enhancements = Object.keys(tmpObj.enhancements);}
      if (hazEnhancements(enhancements)) {
        var tmp = '<span class="fshXXSmall">';
        tmp += enhancements.reduce(function(_prev, _curr) {
          return _prev + '<span class="fshNoWrap">' + _curr + ': ' +
            tmpObj.enhancements[_curr].min + ' - ' +
            tmpObj.enhancements[_curr].max + '</span><br>';
        }, '');
        tmpObj.enhancements = tmp.slice(0, -4) + '</span>';
      } else {
        tmpObj.enhancements = '<span class="fshGrey">**Missing**</span>';
      }
      prev.push(tmpObj);
      return prev;
    }, []);
  }

  function prepAry(data) {
    if (!data || data === '') {
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
    getForage('fsh_monsterLog').done(prepAry);
  }

  function injectMonsterLog(injector) {
    if (jQueryPresent()) {haveJquery(injector);}
  }

  var content$1;
  var combatLog = [];
  var textArea;

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
    var yuuzParser = '<tr><td align="center" colspan="4"><b>Log Parser</b>' +
      '</td></tr>' +
      '<tr><td colspan="4" align="center">WARNING: this links to an ' +
      'external site not related to HCS.<br />' +
      'If you wish to visit site directly URL is: http://evolutions.' +
      'yvong.com/fshlogparser.php<br />' +
      '<tr><td colspan=4 align="center"><input type="hidden" value="true" ' +
      'name="submit"><input type="submit" value="Analyze!"></td></tr>';
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
    getElementById('copyLog')
      .addEventListener('click', notepadCopyLog);
    getElementById('clearLog')
      .addEventListener('click', notepadClearLog);
  }

  function injectNotepadShowLogs(injector) { // jQuery.min
    if (jQueryNotPresent()) {return;}
    content$1 = injector || pCC;
    getForage('fsh_combatLog').done(gotCombatLog);
  }

  var guildId;

  function currentGuildId() {
    if (!guildId) {
      var nodeList = document.body.getElementsByTagName('script');
      Array.prototype.forEach.call(nodeList, function getGuildId(el) {
        var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
        if (match) {guildId = Number(match[1]);}
      });
    }
    return guildId;
  }

  var context;
  var onlinePlayers;
  var onlineData;
  var highlightPlayersNearMyLvl;
  var onlinePages;
  var lastPage;
  var table;
  var guildId$1;

  function buildOnlinePlayerData() { // jQuery
    onlineData = [];
    Object.keys(onlinePlayers).forEach(function(player) {
      var guildImage = $('<div/>')
        .append(onlinePlayers[player][0]);
      $('img', guildImage).addClass('fshImgCntr');
      onlineData.push([
        guildImage.html(),
        onlinePlayers[player][1],
        onlinePlayers[player][2],
        onlinePlayers[player][3] * 100 +
        onlinePlayers[player][4] + 1,
      ]);
    });
  }

  function saveVal(key, val) {
    if (!isNaN(val)) {setValue(key, val);}
  }

  var lvlTests = [
    function(level, min, max) {return isNaN(min) && isNaN(max);},
    function(level, min, max) {return isNaN(min) && level <= max;},
    function(level, min, max) {return min <= level && isNaN(max);},
    function(level, min, max) {return min <= level && level <= max;}
  ];

  function dataTableSearch(_settings, data) { // jQuery
    /* Custom filtering function which will search
    data in column three between two values */
    var min = parseInt($('#fshMinLvl', context).val(), 10); // context
    var max = parseInt($('#fshMaxLvl', context).val(), 10); // context
    saveVal('onlinePlayerMinLvl', min);
    saveVal('onlinePlayerMaxLvl', max);
    var level = fallback(intValue(data[2]), 0);
    for (var i = 0; i < lvlTests.length; i += 1) {
      if (lvlTests[i](level, min, max)) {return true;}
    }
    return false;
  }

  function filterHeaderOnlinePlayers() { // jQuery
    $('#fshOutput', context).html( // context
      '<div align=right>' +
      'Min lvl:<input value="' + getValue('onlinePlayerMinLvl') +
        '" size=5 id="fshMinLvl" /> ' +
      'Max lvl:<input value="' + getValue('onlinePlayerMaxLvl') +
        '" size=5 id="fshMaxLvl" /> ' +
      '<input id="fshReset" type="button" value="Reset"/>' +
      '</div><table id="fshInv" class="allow stripe hover"></table>');
  }

  function guildNumber(html) {
    var match = html.match(/;guild_id=([0-9]+)"/);
    if (match) {return Number(match[1]);}
  }

  var highlightTests = [
    function() {return highlightPlayersNearMyLvl;},
    function(data) {return guildNumber(data[0]) !== guildId$1;},
    function(data) {return intValue(data[2]) >= pvpLowerLevel;},
    function(data) {return intValue(data[2]) <= pvpUpperLevel;}
  ];

  function pvpHighlight(data) {
    return highlightTests.every(function(el) {
      return el(data);
    });
  }

  function gotOnlinePlayers() { // jQuery
    buildOnlinePlayerData();
    $.fn.dataTable.ext.search.push(dataTableSearch);
    filterHeaderOnlinePlayers();
    highlightPlayersNearMyLvl = getValue('highlightPlayersNearMyLvl');
    calculateBoundaries();
    guildId$1 = currentGuildId();

    table = $('#fshInv', context).dataTable({ // context
      data: onlineData,
      pageLength: 30,
      lengthMenu: [[30, 60, -1], [30, 60, 'All']],
      columns: [
        {title: 'Guild', 'class': 'dt-center', orderable: false},
        {title: 'Name', 'class': 'dt-center'},
        {title: 'Level', 'class': 'dt-center'},
        {title: 'Page/Index', 'class': 'dt-center'}
      ],
      createdRow: function(row, data) {
        if (pvpHighlight(data)) {
          $('td', row).eq(2).addClass('lvlHighlight');
        }
      },
      order: [3, 'desc'],
      stateSave: true,
      stateDuration: 0
    }).api();
  }

  function checkLastPage() {
    if (onlinePages === lastPage) {
      setForage('fsh_onlinePlayers', onlinePlayers);
      gotOnlinePlayers();
    }
  }

  function getOnlinePlayers(data) { // Bad jQuery
    $('#fshOutput', context).append(' ' +
      (onlinePages + 1)); // context
    var doc = createDocument(data);
    var input = $('#pCC input.custominput', doc).first();
    var thePage = input.attr('value');
    var theRows = $('#pCC img[src$="/skin/icon_action_view.gif',
      doc).parent().parent().parent();
    theRows.each(function(index, element) {
      var tds = $('td', $(element));
      var player = tds.eq(1).text();
      if (onlinePlayers[player] &&
          onlinePlayers[player][3] > thePage) {return;}
      onlinePlayers[player] = [
        tds.eq(0).html(),
        tds.eq(1).html(),
        tds.eq(2).text(),
        thePage,
        index
      ];
    });
    onlinePages += 1;
    if (onlinePages === 1) {
      input = input.parent().text();
      lastPage = parseInt(input.match(/(\d+)/g)[0], 10);
      for (var i = 2; i <= lastPage; i += 1) {
        retryAjax('index.php?no_mobile=1&cmd=onlineplayers&page=' + i)
          .done(getOnlinePlayers);
      }
    }
    checkLastPage();
  }

  function refreshEvt() { // Bad jQuery
    $('#fshRefresh', context).hide();
    onlinePages = 0;
    onlinePlayers = {};
    retryAjax('index.php?no_mobile=1&cmd=onlineplayers&page=1')
      .done(getOnlinePlayers);
    setValue('lastOnlineCheck', now);
    $('#fshOutput', context).append('Parsing online players...'); // context
  }

  function changeLvl(e) { // jQuery
    if (e.target.id === 'fshMinLvl' || e.target.id === 'fshMaxLvl') {
      table.draw();
    }
  }

  function resetEvt() { // context
    setValue('onlinePlayerMinLvl',
      defaults.onlinePlayerMinLvl);
    setValue('onlinePlayerMaxLvl',
      defaults.onlinePlayerMaxLvl);
    $('#fshMinLvl', context).val(
      defaults.onlinePlayerMinLvl); // context
    $('#fshMaxLvl', context).val(
      defaults.onlinePlayerMaxLvl); // context
    table.draw();
  }

  function doOnlinePlayerEventHandlers(e) {
    if (e.target.id === 'fshRefresh') {refreshEvt();}
    if (e.target.id === 'fshReset') {resetEvt();}
  }

  function injectOnlinePlayersNew() { // jQuery
    var lastCheck = getValue('lastOnlineCheck');
    var refreshButton;
    if (now - lastCheck > 300000) {
      refreshButton = '<span> (takes a while to refresh so only do it ' +
        'if you really need to) </span><span id="fshRefresh" class="fshLink"' +
        '>[Refresh]</span>';
    } else {
      refreshButton = '<span>[ Wait ' + Math.round(300 - (now -
        lastCheck) / 1000) + 's ]</span>';
    }
    context.html(
      '<span><b>Online Players</b></span>' + refreshButton +
      '<div id="fshOutput"></div>');
    getForage('fsh_onlinePlayers').done(function(value) {
      onlinePlayers = value || {};
      gotOnlinePlayers();
    });
    context[0].addEventListener('click', doOnlinePlayerEventHandlers);
    context[0].addEventListener('keyup', changeLvl);
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

  function shouldBeArray(pref) {
    var stored = getValue(pref);
    if (stored && stored !== '') {return stored.split(/\s*,\s*/);}
    return [];
  }

  var currentPlayerId;
  var hideRecipes = [];

  function getRecipeItems(recipe) {
    if (recipe.items) {
      return recipe.items.reduce(function(prev, itm) {
        return prev + '<div class="rmItem"><img class="tip-dynamic" ' +
          'data-tipped="fetchitem.php?item_id=' +
          itm.id + '&inv_id=-1&t=2&p=' +
          currentPlayerId + '&vcode=' +
          itm.verify + '" src="' +
          itm.img + '" height="20px" width="20px"><p>' +
          itm.amountPresent + '/' +
          itm.amountNeeded + '</p></div>';
      }, '');
    }
    return '';
  }

  function getComponents(recipe) {
    if (recipe.components) {
      return recipe.components.reduce(function(prev, comp) {
        return prev + '<div class="rmItem"><img class="tip-dynamic" ' +
          'data-tipped="fetchitem.php?item_id=' +
          comp.id + '&inv_id=-1&t=2&p=' +
          currentPlayerId + '&vcode=' +
          comp.verify + '" src="' +
          comp.img + '" height="20px" width="20px"><p>' +
          comp.amountPresent + '/' +
          comp.amountNeeded + '</p></div>';
      }, '');
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

  function drawRecipeTable(output, recipebook) { // Legacy
    currentPlayerId = playerId();
    var i;
    var result = '<table width="100%"><tr class="rmTh"><th>Recipe</th>' +
      '<th><span id="sortName" class="fshLink" sortkey="name">Name</span>' +
      '</th><th>Items</th><th>Components</th><th>Target</th></tr>';
    var recipe;
    for (i = 0; i < recipebook.recipe.length; i += 1) {
      recipe = recipebook.recipe[i];
      if (hideRecipes.indexOf(recipe.name) !== -1) {continue;}
      result += '<tr class="rmTr"><td class="rmTd"><a href="' + recipe.link +
        '"><img src="' + recipe.img +
        '" height="30px" width="30px"></a></td><td class="rmTd"><a href="' +
        recipe.link + '">' + recipe.name + '</a></td><td class="rmTd">';
      result += getRecipeItems(recipe);
      result += '</td><td class="rmTd">';
      result += getComponents(recipe);
      result += '</td><td class="rmTd">';
      result += getImg(recipe);
      result += '</td></tr>';
    }
    result += '</table>';
    output.innerHTML = result;
    recipebook.lastUpdate = new Date();
    setForage('fsh_recipeBook', recipebook);
  }

  function generateRecipeTable(output, recipebook) { // Legacy
    if (recipebook) {
      if (getValue('hideRecipes')) {
        hideRecipes = shouldBeArray('hideRecipeNames');
      }
      drawRecipeTable(output, recipebook);
    }
  }

  var itmRE =
    /fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i;

  function hasAmounts(result, amounts) {
    if (amounts) {
      var resultAmounts = amounts.textContent.split('/');
      result.amountPresent = parseInt(resultAmounts[0], 10);
      result.amountNeeded = parseInt(resultAmounts[1], 10);
    }
  }

  function reduceItemOrComponent(bgGif, prev, el) {
    var background = el.getAttribute('background');
    if (!background || background.indexOf(bgGif) === -1) {return prev;}
    var img = el.children[0].children[0];
    var mouseOver = img.dataset.tipped;
    var mouseOverRX = mouseOver.match(itmRE);
    var result = {
      img: img.getAttribute('src'),
      id: mouseOverRX[1],
      verify: mouseOverRX[3]
    };
    hasAmounts(result, el.parentNode.nextElementSibling);
    prev.push(result);
    return prev;
  }

  function parseRecipeItemOrComponent(bgGif, doc) {
    var tblCells = getElementById('pCC', doc).getElementsByTagName('td');
    return Array.prototype.reduce.call(tblCells,
      reduceItemOrComponent.bind(null, bgGif), []);
  }

  function processRecipe(output, recipebook, recipe, data) {
    var doc = createDocument(data);
    insertHtmlBeforeEnd(output,
      'Parsing blueprint ' + recipe.name + '...<br>');
    recipe.items = parseRecipeItemOrComponent('/inventory/2x3.gif', doc);
    recipe.components = parseRecipeItemOrComponent('/inventory/1x1mini.gif', doc);
    recipe.target = parseRecipeItemOrComponent('/hellforge/2x3.gif', doc)[0];
    recipebook.recipe.push(recipe);
  }

  function processFolderAnyPage(output, recipebook, data) { // jQuery.min
    var doc = createDocument(data);
    var innerPcc = getElementById('pCC', doc);
    var scope = innerPcc.firstElementChild.rows[6].cells[0]
      .firstElementChild.getElementsByTagName('a');
    var prm = Array.prototype.reduce.call(scope, function(prev, el) {
      insertHtmlBeforeEnd(output,
        'Found blueprint "' + el.textContent + '".<br>');
      var recipe = {
        img: el.parentNode.previousElementSibling.firstElementChild
          .getAttribute('src'),
        link: el.href,
        name: el.textContent,
        id: getCustomUrlParameter(el.href, 'recipe_id')
      };
      prev.push(retryAjax(el.href)
        .pipe(processRecipe.bind(null, output, recipebook, recipe)));
      return prev;
    }, []);
    return $.when.apply($, prm);
  }

  function processFolderFirstPage(output, recipebook, data) { // jQuery.min
    var prm = [];
    var doc = createDocument(data);
    var innerPcc = getElementById('pCC', doc);
    var scope = innerPcc.firstElementChild.rows[4].cells[0]
      .firstElementChild.getElementsByTagName('img');
    var thisFolder = Array.prototype.filter.call(scope, function(el) {
      return /\/folder_on\.gif/.test(el.getAttribute('src'));
    })[0];
    var pages = innerPcc.getElementsByClassName('customselect')[0]
      .getElementsByTagName('option').length;
    for (var i = 1; i < pages; i += 1) {
      prm.push(retryAjax(thisFolder.parentNode.href + '&page=' + i)
        .pipe(processFolderAnyPage.bind(null, output, recipebook)));
    }
    prm.push($.when(data)
      .pipe(processFolderAnyPage.bind(null, output, recipebook)));
    return $.when.apply($, prm);
  }

  function reduceFolders(output, recipebook, prev, el) { // jQuery.min
    var href = el.parentNode.href;
    var folderName = el.parentNode.nextElementSibling.nextElementSibling
      .firstChild.textContent;
    if (getCustomUrlParameter(href, 'folder_id') === '-1') {
      return prev;
    }
    if (/quest/i.test(folderName)) {
      insertHtmlBeforeEnd(output, 'Skipping folder "' +
        folderName + '"  as it has the word "quest" in folder name.<br>');
      return prev;
    }
    prev.push(retryAjax(href)
      .pipe(processFolderFirstPage.bind(null, output, recipebook)));
    return prev;
  }

  function processFirstPage(output, recipebook, data) { // jQuery.min
    var doc = createDocument(data);
    var scope = getElementById('pCC', doc).firstElementChild.rows[4].cells[0]
      .firstElementChild.getElementsByTagName('img');
    var prm = Array.prototype.reduce.call(scope,
      reduceFolders.bind(null, output, recipebook), []);
    prm.push($.when(data)
      .pipe(processFolderFirstPage.bind(null, output, recipebook)));
    return $.when.apply($, prm);
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
    retryAjax('index.php?no_mobile=1&cmd=inventing')
      .pipe(processFirstPage.bind(null, output, recipebook))
      .done(displayStuff);
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

  function testSortType(evt) {
    var sortType = evt.target.getAttribute('sorttype');
    if (!sortType) {sortType = 'string';}
    sortType = sortType.toLowerCase();
    return sortType;
  }

  function sortRecipeBook(sortType) {
    if (sortType === 'number') {
      recipebook.recipe.sort(numberSort);
    } else {
      recipebook.recipe.sort(stringSort);
    }
  }

  function sortRecipeTable(evt) { // Legacy
    doSortParams(evt.target.getAttribute('sortKey'));
    var sortType = testSortType(evt);
    sortRecipeBook(sortType);
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
    getForage('fsh_recipeBook').done(gotRecipeBook.bind(null, content));
    content.addEventListener('click', rmEvtHdl);
  }

  function eventHandler(evtAry) {
    return function(evt) {
      var self = evt.target;
      evtAry.some(function(el) {
        if (el.test(self)) {
          el.act(self);
          return true;
        }
        return false;
      });
    };
  }

  function getInventory() {
    var subcmd = 'inventory';
    if (calf.subcmd === 'guildinvmgr') {
      subcmd = 'guild_store&inc_tagged=1';
    }
    return retryAjax({
      dataType: 'json',
      url: 'index.php?cmd=export&subcmd=' + subcmd
    });
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

  function useitem(item) {
    return callApp({
      cmd: 'profile',
      subcmd: 'useitem',
      inventory_id: item
    });
  }

  var extTbl;
  var playerId$1;
  var extractInv;
  var selectST;
  var selectMain;
  var resourceList;
  var buyResult;

  function backpackRemove(invId) {
    extractInv.some(function(el, i, ary) {
      if (el.inv_id === invId) {
        ary.splice(i, 1);
        return true;
      }
      return false;
    });
  }

  function quickDoneExtracted(invId, json) {
    if (jsonFail(json, buyResult)) {return;}
    backpackRemove(invId);
    outputResult('Item Extracted.', buyResult);
  }

  function doExtract(target) {
    var InventoryIDs = resourceList[target.id.replace('fshExtr', '')].invIDs;
    target.parentNode.innerHTML = 'extracting all ' +
      InventoryIDs.length + ' resources';
    for (var i = 0; i < InventoryIDs.length; i += 1) {
      useitem(InventoryIDs[i])
        .done(quickDoneExtracted.bind(null, InventoryIDs[i]));
    }
  }

  function extractAllSimilar(self) {
    jConfirm('Extract Resources',
      'Are you sure you want to extract all similar items?',
      doExtract.bind(null, self)
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
    resourceList = extractInv.reduce(resources, {});
    var output = '<tr><th width="20%">Actions</th><th>Items</th></tr>' +
      '<tr><td colspan="2"><ol id="qeresult"></ol></td></tr>';
    output += Object.keys(resourceList).reduce(tableRows, '');
    extTbl.innerHTML = output;
    buyResult = getElementById('qeresult');
  }

  function isExtractable(curr) {
    return curr.item_name === 'Zombie Coffin' ||
      curr.type === 12 ||
      curr.type === 16;
  }

  function prepInv(data) {
    playerId$1 = data.player_id;
    extractInv = data.items.reduce(function(prev, curr) {
      if (isExtractable(curr)) {prev.push(curr);}
      return prev;
    }, []);
    showQuickExtract();
  }

  var extractEvents = [
    {
      test: function(self) {return self.id === 'fshInSt';},
      act: function() {
        selectST = !selectST;
        showQuickExtract();
      }
    },
    {
      test: function(self) {return self.id === 'fshInMain';},
      act: function() {
        selectMain = !selectMain;
        showQuickExtract();
      }
    },
    {
      test: function(self) {return self.id.indexOf('fshExtr') === 0;},
      act: extractAllSimilar
    }
  ];

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
    content.addEventListener('click', eventHandler(extractEvents));
    getInventory().done(prepInv);
  }

  function alpha(a, b) {
    if (a.n.toLowerCase() < b.n.toLowerCase()) {return -1;}
    if (a.n.toLowerCase() > b.n.toLowerCase()) {return 1;}
    return 0;
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

  function makeFolderSpans(appInv) {
    return beginFolderSpanElement + '0">All</span>' +
      appInv.r.reduce(function(prev, folderObj) {
        return prev + ' &ensp;' + beginFolderSpanElement +
          folderObj.id.toString() + '">' + folderObj.name + '</span>';
      }, '');
  }

  function createQuickWear(appInv) {
    var currentPlayerId = playerId();
    var tbl = createTable({
      width: '100%',
      innerHTML: '<thead><tr><th class="fshCenter" colspan="3">' +
        makeFolderSpans(appInv) + '</th></tr>' +
        '<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th>' +
        '<th colspan="2">Items</th></tr></thead>'
    });
    var tbody = createTBody();
    insertElement(tbl, tbody);
    appInv.r.forEach(function(aFolder) {
      aFolder.items.sort(alpha);
      aFolder.items.forEach(tableRows$1.bind(null, tbody, currentPlayerId));
    });
    var qw = createDiv({
      id: 'invTabs-qw',
      className: 'ui-tabs-panel ui-corner-bottom'
    });
    insertElement(qw, tbl);
    return qw;
  }

  function dialog(data) {
    if (data.r === 0) {return;}
    $('#dialog_msg').html(data.m).dialog('open');
  }

  function equipItem(backpackInvId) {
    return retryAjax({
      url: 'index.php',
      data: {
        cmd: 'profile',
        subcmd: 'equipitem',
        inventory_id: backpackInvId,
        ajax: 1
      },
      dataType: 'json'
    }).done(dialog);
  }

  function loadInventory() {
    return callApp({cmd: 'profile', subcmd: 'loadinventory'});
  }

  function ahLink(searchname, nickname) {
    return '<a href="index.php?cmd=auctionhouse&search=' + searchname +
      '">' + nickname + '</a>';
  }

  function foundInvItem(invCount, name) {
    if (invCount[name]) {
      invCount[name].count += 1;
    } else {
      invCount[name] = {count: 1, nicknameList: []};
    }
  }

  function displayFoundCount(invCount) {
    return Object.keys(invCount).reduce(function(prev, key) {
      if (invCount[key].nicknameList.length !== 0) {
        return prev + '<tr><td>' + key + '</td><td>' +
          invCount[key].nicknameList.map(function(nickname) {
            return ahLink(key, nickname);
          }).join(' ') + '</td><td>' +
          invCount[key].count + '</td><td></td><td></td></tr>';
      }
      return prev;
    }, '');
  }

  function displayNotFound(quickSL) {
    return quickSL.reduce(function(prev, item) {
      if (item.displayOnAH && !item.found) {
        return prev + ahLink(item.searchname, item.nickname) + ', ';
      }
      return prev;
    }, '');
  }

  function displayOtherCount(invCount) {
    return Object.keys(invCount).reduce(function(prev, key) {
      if (invCount[key].nicknameList.length === 0) {
        return prev + '<tr><td>' + key + '</td><td></td><td>' +
          invCount[key].count + '</td><td></td><td></td><td></td></tr>';
      }
      return prev;
    }, '');
  }

  function buildHTML(invCount, quickSL) {
    // TODO this is going to need significant rebuild
    return '<table width="100%" cellspacing="2" cellpadding="2"><thead>' +
      '<tr><th colspan="5" class="fshCenter">Items from ' +
      '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
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
      '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
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
    quickSL.forEach(inQuickSearchList.bind(null, invCount, name));
  }

  function showAHInvManager(itemList) {
    var invCount = {};
    var quickSL = getValueJSON('quickSearchList');
    // fill up the Inv Counter
    itemList.r.forEach(function(aFolder) {
      aFolder.items.forEach(testItemList.bind(null, invCount, quickSL));
    });
    var im = createDiv({
      id: 'invTabs-ah',
      className: 'ui-tabs-panel ui-corner-bottom'
    });
    insertHtmlBeforeEnd(im, buildHTML(invCount, quickSL));
    return im;
  }

  function isChecked(pref) {
    if (pref) {return ' checked';}
    return '';
  }

  /* eslint-disable max-lines */
  var mySimpleCheckboxes = {
    moveGuildList: {
      helpTitle: 'Move Guild Info List',
      helpText: 'This will Move the Guild Info List higher ' +
        'on the bar on the right'
    },
    moveOnlineAlliesList: {
      helpTitle: 'Move Online Allies List',
      helpText: 'This will Move the Online Allies List higher ' +
        'on the bar on the right'
    },
    enableOnlineAlliesWidgets: {
      helpTitle: 'Enable Online Allies Widgets',
      helpText: 'Enabling this option will enable the Allies List ' +
        'Widgets (coloring on the Allies List panel)'
    },
    moveFSBox: {
      helpTitle: 'Move FS box',
      helpText: 'This will move the FS box to the left, under the menu, ' +
        'for better visibility (unless it is already hidden.)'
    },
    moveDailyQuest: {
      helpTitle: 'Move Daily Quest',
      helpText: 'This will move the Daily Quest to the left, under the menu, ' +
        'for better visibility (unless it is already hidden.)'
    },
    gameHelpLink: {
      helpTitle: '&quot;Game Help&quot; Settings Link',
      helpText: 'This turns the Game Help text in the lower ' +
        'right box into a link to this settings page.'
    },
    enableTempleAlert: {
      helpTitle: 'Enable Temple Alert',
      helpText: 'Puts an alert on the LHS if you have not ' +
        'prayed at the temple today.',
      network: true
    },
    enableUpgradeAlert: {
      helpTitle: 'Enable Gold Upgrade Alert',
      helpText: 'Puts an alert on the LHS if you have not upgraded your ' +
        'stamina with gold today.',
      network: true
    },
    enableComposingAlert: {
      helpTitle: 'Enable Composing Alert',
      helpText: 'Puts an alert on the LHS if you have composing ' +
        'slots available.',
      network: true
    },
    enhanceOnlineDots: {
      helpTitle: 'Enhance Online Dots',
      helpText: 'Enhances the green/grey dots by player names to show ' +
        'online/offline status.'
    },
    hideBuffSelected: {
      helpTitle: 'Hide Buff Selected',
      helpText: 'Hides the buff selected functionality in the online allies ' +
        'and guild info section.'
    },
    hideHelperMenu: {
      helpTitle: 'Hide Helper Menu',
      helpText: 'Hides the helper menu from top left.'
    },
    keepHelperMenuOnScreen: {
      helpTitle: 'Keep Helper Menu On Screen',
      helpText: 'Keeps helper menu on screen as you scroll (helper ' +
        'menu must be enabled to work). Also works with quick links.'
    },
    showAdmin: {
      helpTitle: 'Show rank controls',
      helpText: 'Show ranking controls for guild managemenet in member ' +
        'profile page - this works for guild founders only'
    },
    ajaxifyRankControls: {
      helpTitle: 'AJAXify rank controls',
      helpText: 'Enables guild founders with ranking rights to change rank ' +
        'positions without a screen refresh.'
    },
    detailedConflictInfo: {
      helpTitle: 'Show Conflict Details',
      helpText: 'Inserts detailed conflict information onto your guild\'s ' +
        'manage page. Currently displays the target guild as well as ' +
        'the current score.',
      network: true
    },
    showCombatLog: {
      helpTitle: 'Show Combat Log',
      helpText: 'This will show the combat log for each automatic ' +
        'battle below the monster list.'
    },
    enableCreatureColoring: {
      helpTitle: 'Color Special Creatures',
      helpText: 'Creatures will be colored according to their rarity. ' +
        'Champions will be colored green, Elites yellow and Super Elites red.'
    },
    showCreatureInfo: {
      helpTitle: 'Show Creature Info',
      helpText: 'This will show the information from the view creature ' +
        'link when you mouseover the link.',
      network: true
    },
    fsboxlog: {
      helpTitle: 'Enable FS Box Log',
      helpText: 'This enables the functionality to keep a log of ' +
        'recent seen FS Box message.'
    },
    keepBuffLog: {
      helpTitle: 'Enable Buff Log',
      helpText: 'This enables the functionality to keep a log of ' +
        'recently casted buffs'
    },
    huntingMode: {
      helpTitle: 'Enable Hunting Mode',
      helpText: 'This disable menu and some visual features to ' +
        'speed up the calf.'
    },
    hideNonPlayerGuildLogMessages: {
      helpTitle: 'Cleanup Guild Log',
      helpText: 'Any log messages not related to the current player ' +
        'will be dimmed (e.g. recall messages from guild store)'
    },
    useNewGuildLog: {
      helpTitle: 'Use New Guild Log',
      helpText: 'This will replace the standard guild log with the ' +
        'helper version of the guild log.'
    },
    enableLogColoring: {
      helpTitle: 'Enable Log Coloring',
      helpText: 'Three logs will be colored if this is enabled, ' +
        'Guild Chat, Guild Log and Player Log. It will show any new ' +
        'messages in yellow and anything 20 minutes old ones in brown.'
    },
    enableChatParsing: {
      helpTitle: 'Enable Chat Parsing',
      helpText: 'If this is checked, your character log will be parsed for ' +
        'chat messages and show the chat message on the screen if you reply ' +
        'to that message.'
    },
    addAttackLinkToLog: {
      helpTitle: 'Add attack link to log',
      helpText: 'If checked, this will add an Attack link to each message ' +
        'in your log.'
    },
    enhanceChatTextEntry: {
      helpTitle: 'Enhance Chat Text Entry',
      helpText: 'If checked, this will enhance the entry field for entering ' +
        'chat text on the guild chat page.'
    },
    showExtraLinks: {
      helpTitle: 'Show Extra Links',
      helpText: 'If checked, this will add AH and UFSG ' +
        'links to equipment screens.'
    },
    disableItemColoring: {
      helpTitle: 'Disable Item Coloring',
      helpText: 'Disable the code that colors the item text based on the ' +
        'rarity of the item.'
    },
    showQuickDropLinks: {
      helpTitle: 'Show Quick Drop Item',
      helpText: 'This will show a link beside each item which gives the ' +
        'option to drop the item.  WARNING: NO REFUNDS ON ERROR'
    },
    storeLastQuestPage: {
      helpTitle: 'Store Last Quest Page',
      helpText: 'This will store the page and sort order of each of the ' +
        'three quest selection pages for next time you visit. If you need ' +
        'to reset the links, turn this option off, click on the link you ' +
        'wish to reset and then turn this option back on again.'
    },
    showNextQuestSteps: {
      helpTitle: 'Show Next Quest Steps',
      helpText: 'Shows all quest steps in the UFSG.'
    },
    renderSelfBio: {
      helpTitle: 'Render self bio',
      helpText: 'This determines if your own bio will render the FSH ' +
        'special bio tags.'
    },
    renderOtherBios: {
      helpTitle: 'Render other players&#39; bios',
      helpText: 'This determines if other players bios will render the FSH ' +
        'special bio tags.'
    },
    showStatBonusTotal: {
      helpTitle: 'Show Stat Bonus Total',
      helpText: 'This will show a total of the item stats when you ' +
        'mouseover an item on the profile screen.'
    },
    enableQuickDrink: {
      helpTitle: 'Enable Quick Drink/Wear',
      helpText: 'This enables the quick drink/wear functionality on the ' +
        'profile page.'
    },
    disableDeactivatePrompts: {
      helpTitle: 'Disable Deactivate Prompts',
      helpText: 'This disables the prompts for deactivating buffs on ' +
        'the profile page.'
    },
    enableAttackHelper: {
      helpTitle: 'Show Attack Helper',
      helpText: 'This will show extra information on the attack player ' +
        'screen about stats and buffs on you and your target',
      network: true
    },
    showPvPSummaryInLog: {
      helpTitle: 'Show PvP Summary in Log',
      helpText: 'This will show a summary of the PvP results in the log.',
      network: true
    },
    autoFillMinBidPrice: {
      helpTitle: 'Auto Fill Min Bid Price',
      helpText: 'This enables the functionality to automatically fill in ' +
        'the min bid price so you just have to hit bid and your bid will ' +
        'be placed.'
    },
    hideRelicOffline: {
      helpTitle: 'Hide Relic Offline',
      helpText: 'This hides the relic offline defenders checker.'
    },
    enterForSendMessage: {
      helpTitle: 'Enter Sends Message',
      helpText: 'If enabled, will send a message from the Send Message ' +
        'screen if you press enter. You can still insert a new line by ' +
        'holding down shift when you press enter.'
    },
    navigateToLogAfterMsg: {
      helpTitle: 'Navigate After Message Sent',
      helpText: 'If enabled, will navigate to the referring page after a ' +
        'successful message is sent. Example:  if you are on the world ' +
        'screen and hit message on the guild info panel after you send the ' +
        'message, it will return you to the world screen.'
    },
    moveComposingButtons: {
      helpTitle: 'Move Composing Buttons',
      helpText: 'If enabled, will move composing buttons to the top of ' +
        'the composing screen.'
    },
    draggableHelperMenu: {
      helpTitle: 'Draggable Helper Menu',
      helpText: 'If enabled, allows the helper menu to ' +
        'be dragged around the screen.'
    },
    draggableQuickLinks: {
      helpTitle: 'Draggable Quick Links',
      helpText: 'If enabled, allows the quick link box to ' +
        'be dragged around the screen.'
    },
    expandMenuOnKeyPress: {
      helpTitle: 'Expand Menu on Key Press',
      helpText: 'If enabled, expands the left hand menu ' +
        'when you use hotkeys.'
    },
    disableBreakdownPrompts: {
      helpTitle: 'Disable Breakdown Prompts',
      helpText: 'If enabled, will disable prompts when you breakdown items.' +
        '<br>NO REFUNDS OR DO-OVERS! Use at own risk.'
    },
    collapseNewsArchive: {
      helpTitle: 'Collapse News Archive',
      helpText: 'If enabled, will collapse news archives.'
    },
    collapseHallPosts: {
      helpTitle: 'Collapse Hall Posts',
      helpText: 'If enabled, will collapse hall posts.'
    },
    hideSubLvlCreature: {
      helpTitle: 'Hide Sub Level Creatures',
      helpText: 'If enabled, will hide creatures that are ' +
        'lower than the current realm level.'
    },
    hidePlayerActions: {
      helpTitle: 'Hide Player Actions',
      helpText: 'If enabled, will hide player actions.'
    },
    disableQuickWearPrompts: {
      helpTitle: 'Disable Use/Ext Prompts',
      helpText: 'If enabled, will disable prompts when you Use/Ext items.' +
        '<br>NO REFUNDS OR DO-OVERS! Use at own risk.',
      title: 'Disable Use/Ext<br>Prompts'
    },
    enableGuildActivityTracker: {
      helpTitle: 'Enable Guild Activity Tracker',
      helpText: 'If enabled, will track guild member activity over time.',
      network: true,
      title: 'Enable Tracker'
    },
    enableSeTracker: {
      helpTitle: 'Enable SE Tracker',
      helpText: 'If enabled, will track the last time each SE was killed.<br>' +
        'This is DIFFERENT from the usual FSH network activity.<br>' +
        'When this is enabled, if you have ANY game page open in a<br>' +
        'browser tab it will scan the SE Log every 10 minutes.<br>' +
        'You do not need auto-refresh for this to work.',
      network: true
    },
    showMonsterLog: {
      helpTitle: 'Keep Creature Log',
      helpText: 'This will show the creature log for each creature you see ' +
        'when you travel.',
      network: true
    },
    showTitanInfo: {
      helpTitle: 'Show Titan Info',
      helpText: 'This will show titan info in the action list.',
      network: true
    },
    wantedGuildMembers: {
      helpTitle: 'Show Guild Members',
      helpText: 'If enabled, will show guild members in the wanted bounty list.'
    }
  };

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

  var saveBoxes = [
    'navigateToLogAfterMsg',
    'gameHelpLink',
    'guildSelf',
    'guildSelfMessage',
    'guildFrnd',
    'guildFrndMessage',
    'guildPast',
    'guildPastMessage',
    'guildEnmy',
    'guildEnmyMessage',
    'showAdmin',
    'ajaxifyRankControls',
    'detailedConflictInfo',
    'disableItemColoring',
    'enableLogColoring',
    'enableChatParsing',
    'enableCreatureColoring',
    'hideNonPlayerGuildLogMessages',
    'buyBuffsGreeting',
    'renderSelfBio',
    'renderOtherBios',
    'defaultMessageSound',
    'showSpeakerOnWorld',
    'playNewMessageSound',
    'highlightPlayersNearMyLvl',
    'highlightGvGPlayersNearMyLvl',
    'showCombatLog',
    'showMonsterLog',
    'showCreatureInfo',
    'keepLogs',
    'enableGuildInfoWidgets',
    'enableOnlineAlliesWidgets',
    'hideGuildInfoMessage',
    'hideGuildInfoBuff',
    'hideGuildInfoSecureTrade',
    'hideGuildInfoTrade',
    'huntingBuffs',
    'huntingBuffsName',
    'huntingBuffs2',
    'huntingBuffs2Name',
    'huntingBuffs3',
    'huntingBuffs3Name',
    'showHuntingBuffs',
    'moveGuildList',
    'moveOnlineAlliesList',
    'moveFSBox',
    'moveDailyQuest',
    'hideQuests',
    'hideQuestNames',
    'hideRecipes',
    'hideRecipeNames',
    'doNotKillList',
    'enableBioCompressor',
    'maxCompressedCharacters',
    'maxCompressedLines',
    'sendGoldonWorld',
    'goldRecipient',
    'goldAmount',
    'keepBuffLog',
    'showQuickSendLinks',
    'showQuickDropLinks',
    'sendClasses',
    'itemRecipient',
    'currentGoldSentTotal',
    'enableAllyOnlineList',
    'enableEnemyOnlineList',
    'allyEnemyOnlineRefreshTime',
    'quickLinksTopPx',
    'quickLinksLeftPx',
    'draggableQuickLinks',
    'enableActiveBountyList',
    'bountyListRefreshTime',
    'enableWantedList',
    'wantedNames',
    'wantedGuildMembers',
    'fsboxlog',
    'huntingMode',
    'enableAttackHelper',
    'hideRelicOffline',
    'enterForSendMessage',
    'storeLastQuestPage',
    'addAttackLinkToLog',
    'showStatBonusTotal',
    'newGuildLogHistoryPages',
    'useNewGuildLog',
    'enhanceChatTextEntry',
    'enableMaxGroupSizeToJoin',
    'maxGroupSizeToJoin',
    'enableTempleAlert',
    'enableUpgradeAlert',
    'enableComposingAlert',
    'autoFillMinBidPrice',
    'showPvPSummaryInLog',
    'enableQuickDrink',
    'enhanceOnlineDots',
    'hideBuffSelected',
    'hideHelperMenu',
    'keepHelperMenuOnScreen',
    'draggableHelperMenu',
    'showNextQuestSteps',
    'hideChampionsGroup',
    'hideElitesGroup',
    'hideSEGroup',
    'hideTitanGroup',
    'hideLegendaryGroup',
    'disableDeactivatePrompts',
    'moveComposingButtons',
    'showExtraLinks',
    'expandMenuOnKeyPress'
  ];

  function helpLink(title, text) {
    return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="' +
      '<span class=\'fshHelpTitle\'>' + title + '</span><br><br>' +
      text + '">?</span>&nbsp;]';
  }

  function hasNetwork(o) {
    if (o.network) {return networkIcon;}
    return '';
  }

  function isOn(name) {
    return isChecked(getValue(name));
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
      '" class="fshVMid" type="checkbox" value="on"' + isOn(name) + '>';
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
      $('#dialog_msg').html(json.e.message).dialog('open');
      json.r = 1;
    } else {json.r = 0;}
    return json;
  }

  function useItem(backpackInvId) {
    return useitem(backpackInvId).pipe(errorDialog);
  }

  var disableQuickWearPrompts;
  var content$2;
  var itemList;

  function doAction(self, fn, verb) { // jQuery.min
    sendEvent('QuickWear', 'doAction');
    self.textContent = '';
    self.classList.remove('smallLink');
    self.classList.add('fshSpinner', 'fshSpin12');
    fn(self.dataset.itemid).done(function(data) {
      if (data.r !== 0) {return;}
      self.parentNode.innerHTML = '<span class="fastWorn">' + verb + '</span>';
    });
  }

  function doUseItem(self) {
    doAction(self, useItem, 'Used');
  }

  function useProfileInventoryItem(self) {
    if (disableQuickWearPrompts) {
      doUseItem(self);
    } else {
      jConfirm('Use/Extract Item',
        'Are you sure you want to use/extract the item?',
        doUseItem.bind(null, self)
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
    aFolder.items.forEach(processItems.bind(null, folderId, thisFolder));
  }

  function hideFolders(self) {
    var folderId = self.dataset.folder;
    itemList.r.forEach(processFolder.bind(null, folderId));
  }

  function togglePref() {
    disableQuickWearPrompts = !disableQuickWearPrompts;
    setValue('disableQuickWearPrompts', disableQuickWearPrompts);
  }

  var events = [
    {
      test: function(self) {
        return self.classList.contains('smallLink') &&
          self.classList.contains('fshEq');
      },
      act: equipProfileInventoryItem
    },
    {
      test: function(self) {
        return self.classList.contains('smallLink') &&
          self.classList.contains('fshUse');
      },
      act: useProfileInventoryItem
    },
    {
      test: function(self) {return self.classList.contains('fshFolder');},
      act: hideFolders
    },
    {
      test: function(self) {return self.id === 'disableQuickWearPrompts';},
      act: togglePref
    }
  ];

  function createInvTabs() {
    return createDiv({
      id: 'invTabs',
      className: 'ui-tabs ui-widget-content ui-corner-all',
      innerHTML: '<input id="qwtab1" type="radio" name="qwtabs" checked>' +
        '<input id="qwtab2" type="radio" name="qwtabs">' +
        '<ul class="ui-tabs-nav ui-helper-reset ' +
          'ui-helper-clearfix ui-widget-header ui-corner-all">' +
        '<li class="ui-state-default ui-corner-top inv-tabs-qw">' +
        '<label for="qwtab1">Quick Wear / Use / Extract<br>Manager</label>' +
        '</li>' +
        '<li class="ui-state-default ui-corner-top inv-tabs-ah">' +
        '<label for="qwtab2">Inventory Manager Counter' +
          '<br>filtered by AH Quick Search</label>' +
        '</li><div id="setPrompt" class="fshFloatRight fshCenter"></div></ul>'
    });
  }

  function showQuickWear(appInv) {
    itemList = appInv;
    var invTabs = createInvTabs();
    var invTabsQw = createQuickWear(appInv);
    insertElement(invTabs, invTabsQw);
    content$2.innerHTML = '';
    insertElement(content$2, invTabs);
    invTabs.addEventListener('click', eventHandler(events));
    insertElement(invTabs, showAHInvManager(appInv));
    insertHtmlBeforeEnd(getElementById('setPrompt'),
      simpleCheckboxHtml('disableQuickWearPrompts'));
  }

  function hasJquery(injector) { // jQuery.min
    content$2 = injector || pCC;
    if (!content$2) {return;}
    insertHtmlBeforeEnd(content$2, 'Getting item list from backpack...');
    loadInventory().done(showQuickWear);
    disableQuickWearPrompts = getValue('disableQuickWearPrompts');
  }

  function insertQuickWear(injector) {
    if (jQueryPresent()) {hasJquery(injector);}
  }

  function setValueJSON(name, value) {
    GM_setValue(name, JSON.stringify(value));
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
    result += param.headers.reduce(function(prev, curr) {
      return prev + '<th>' + curr + '</th>';
    }, '');
    result += '<th>Action</th></tr>';
    var currentCategory = '';
    param.currentItems.forEach(function(item, i) {
      result += '<tr>';
      if (param.categoryField &&
          currentCategory !==
          item[param.categoryField]) {
        currentCategory = item[param.categoryField];
        result += '<td><span class="fshQs">' +
          currentCategory + '</span></td><td></td><td></td><td></td><td></td>' +
            '</tr><tr>';
      }
      result += itemRow(item);
      result += '<td><span class="HelperTextLink" data-itemId="' + i +
        '" id="fshDel' + i + '">[Del]</span></td></tr>';
    });
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
    getElementById(param.id).innerHTML = result;
    setValueJSON(param.gmname, param.currentItems);
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
    if (Array.isArray(userInput)) {
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

  var listEvents = [
    {test: function(self) {return self.id === 'fshReset';}, act: resetRawEditor},
    {test: function(self) {return self.id === 'fshSave';}, act: saveRawEditor},
    {test: function(self) {return self.id === 'fshAdd';}, act: addQuickItem},
    {
      test: function(self) {return self.id.indexOf('fshDel') === 0;},
      act: deleteQuickItem
    }
  ];

  function injectAuctionSearch(injector) { // Legacy
    var content = injector || pCC;
    content.innerHTML =
      makePageHeader('Trade Hub Quick Search', '', '', '') +
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
    // global parameters for the meta function generateManageTable
    param = {
      id: 'fshAso',
      headers: ['Category', 'Nickname', 'Quick Search Text',
        'Display in AH?'],
      fields: ['category', 'nickname', 'searchname', 'displayOnAH'],
      tags: ['text', 'text', 'text', 'checkbox'],
      url: ['', '',
        'index.php?cmd=auctionhouse&amp;type=-1&amp;search=@replaceme@', ''],
      currentItems: getValueJSON('quickSearchList'),
      gmname: 'quickSearchList',
      categoryField: 'category',
    };
    generateManageTable();
    content.addEventListener('click', eventHandler(listEvents));
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
      currentItems: getValueJSON('quickLinks'),
      gmname: 'quickLinks',
    };
    generateManageTable();
    content.addEventListener('click', eventHandler(listEvents));
  }

  /* eslint-disable no-multi-spaces, max-len */
  var buffList = [
    {name: 'Rage',                stam: 10, lvl: 1,    id: 0,   nicks: 'rage'},
    {name: 'Stun',                stam: 15, lvl: 1,    id: 1,   nicks: 'stun,st'},
    {name: 'Fury',                stam: 10, lvl: 25,   id: 2,   nicks: 'fury'},
    {name: 'Blood Thirst',        stam: 10, lvl: 25,   id: 4,   nicks: 'blood thirst,bloodthirst,bt'},
    {name: 'Enchant Weapon',      stam: 10, lvl: 25,   id: 5,   nicks: 'enchant weapon,ew'},
    {name: 'Berserk',             stam: 15, lvl: 75,   id: 3,   nicks: 'berserk'},
    {name: 'Holy Flame',          stam: 15, lvl: 75,   id: 6,   nicks: 'holy flame,hf'},
    {name: 'Dark Curse',          stam: 20, lvl: 150,  id: 7,   nicks: 'dark curse,dc'},
    {name: 'Shockwave',           stam: 20, lvl: 200,  id: 29,  nicks: 'shockwave,sw,shock'},
    {name: 'Ignite',              stam: 10, lvl: 200,  id: 30,  nicks: 'ignite,ign'},
    {name: 'Super Elite Slayer',  stam: 25, lvl: 250,  id: 31,  nicks: 'super elite slayer,ses,se slayer'},
    {name: 'Wither',              stam: 15, lvl: 250,  id: 32,  nicks: 'wither,with'},
    {name: 'Shatter Armor',       stam: 20, lvl: 300,  id: 33,  nicks: 'shatter armor,sa'},
    {name: 'Death Wish',          stam: 20, lvl: 300,  id: 34,  nicks: 'deathwish,dw,deathw,death wish'},
    {name: 'Spell Breaker',       stam: 35, lvl: 300,  id: 35,  nicks: 'spell breaker,sb'},
    {name: 'Spectral Knight',     stam: 15, lvl: 400,  id: 48,  nicks: 'spectral knight,sk,spec knight'},
    {name: 'Keen Edge',           stam: 10, lvl: 400,  id: 47,  nicks: 'keen edge,ke'},
    {name: 'Arterial Strike',     stam: 20, lvl: 500,  id: 49,  nicks: 'arterial strike,as,art strike,art str'},
    {name: 'Death Dealer',        stam: 20, lvl: 500,  id: 50,  nicks: 'death dealer,dd'},
    {name: 'Savagery',            stam: 15, lvl: 600,  id: 51,  nicks: 'savagery,savage'},
    {name: 'Chi Strike',          stam: 20, lvl: 700,  id: 52,  nicks: 'chi strike,chi,chis,chi str'},
    {name: 'Shield Strike',       stam: 20, lvl: 700,  id: 53,  nicks: 'shield strike,ss,sh str'},
    {name: 'Demoralize',          stam: 25, lvl: 800,  id: 73,  nicks: 'demoralize,dem'},
    {name: 'Poison',              stam: 25, lvl: 800,  id: 70,  nicks: 'poison,poi'},
    {name: 'Iron Fist',           stam: 25, lvl: 900,  id: 74,  nicks: 'iron fist,if'},
    {name: 'Spell Leech',         stam: 50, lvl: 900,  id: 79,  nicks: 'spell leech,sl'},
    {name: 'Distraction',         stam: 25, lvl: 900,  id: 78,  nicks: 'distraction,dis'},
    {name: 'Coordinated Attack',  stam: 30, lvl: 1000, id: 118, nicks: 'coordinated attack,coorda'},
    {name: 'Undermine',           stam: 30, lvl: 1000, id: 108, nicks: 'undermine,um'},
    {name: 'Cursed Rune',         stam: 30, lvl: 1000, id: 89,  nicks: 'cursed rune,crune'},
    {name: 'Anti Deflect',        stam: 30, lvl: 1000, id: 105, nicks: 'anti deflect,ad'},
    {name: 'Overkill',            stam: 30, lvl: 1200, id: 109, nicks: 'overkill,ok'},
    {name: 'Smashing Hammer',     stam: 30, lvl: 1200, id: 111, nicks: 'smashing hammer,sh'},
    {name: 'Mighty Vigor',        stam: 35, lvl: 1200, id: 113, nicks: 'mighty vigor,mv'},
    {name: 'Fist Fight',          stam: 30, lvl: 1200, id: 115, nicks: 'fist fight,ff'},
    {name: 'Cursed Ring',         stam: 30, lvl: 1400, id: 88,  nicks: 'cursed ring,cring'},
    {name: 'Sharpen',             stam: 30, lvl: 1400, id: 106, nicks: 'sharpen,sharp'},
    {name: 'Balanced Attack',     stam: 30, lvl: 1400, id: 116, nicks: 'balanced attack,ba'},
    {name: 'Heavy Weight',        stam: 20, lvl: 1600, id: 146, nicks: 'heavy weight, hw'},
    {name: 'Armored Strike',      stam: 30, lvl: 1600, id: 130, nicks: 'armored strike, armstr'},
    {name: 'Invert',              stam: 40, lvl: 2000, id: 173, nicks: 'invert'},
    {name: 'Reign of Terror',     stam: 40, lvl: 2500, id: 174, nicks: 'reign of terror'},
    {name: 'Critical Strike',     stam: 40, lvl: 3000, id: 175, nicks: 'critical strike'},
    {name: 'Great Vigor',         stam: 10, lvl: 1,    id: 12,  nicks: 'great vigor,vigor,gv'},
    {name: 'Fortify',             stam: 10, lvl: 25,   id: 8,   nicks: 'fortify'},
    {name: 'Evade',               stam: 10, lvl: 25,   id: 10,  nicks: 'evade'},
    {name: 'Absorb',              stam: 20, lvl: 25,   id: 13,  nicks: 'absorb,abs'},
    {name: 'Rock Skin',           stam: 15, lvl: 75,   id: 11,  nicks: 'rock skin,rs'},
    {name: 'Enchanted Armor',     stam: 10, lvl: 75,   id: 9,   nicks: 'enchanted armor,enchant armor,ea,ench arm,ench armor'},
    {name: 'Aura of Protection',  stam: 20, lvl: 150,  id: 15,  nicks: 'aura of protection,aop,aofp'},
    {name: 'Deflect',             stam: 25, lvl: 150,  id: 14,  nicks: 'deflect,defl'},
    {name: 'Force Shield',        stam: 10, lvl: 200,  id: 27,  nicks: 'force shield,fs'},
    {name: 'Unbreakable',         stam: 20, lvl: 200,  id: 28,  nicks: 'unbreakable,ub,unb,unbr'},
    {name: 'Honor',               stam: 10, lvl: 800,  id: 82,  nicks: 'honor'},
    {name: 'Assist',              stam: 30, lvl: 250,  id: 36,  nicks: 'assist,ass'},
    {name: 'Constitution',        stam: 25, lvl: 300,  id: 37,  nicks: 'constitution,const'},
    {name: 'Counter Attack',      stam: 20, lvl: 400,  id: 54,  nicks: 'counter attack,ca'},
    {name: 'Summon Shield Imp',   stam: 50, lvl: 400,  id: 55,  nicks: 'summon shield imp,ssi,imp'},
    {name: 'Vision',              stam: 20, lvl: 500,  id: 56,  nicks: 'vision,vis'},
    {name: 'Fortitude',           stam: 15, lvl: 500,  id: 57,  nicks: 'fortitude,fort'},
    {name: 'Flinch',              stam: 20, lvl: 600,  id: 58,  nicks: 'flinch'},
    {name: 'Terrorize',           stam: 20, lvl: 700,  id: 59,  nicks: 'terrorize,terror'},
    {name: 'Nightmare Visage',    stam: 40, lvl: 700,  id: 60,  nicks: 'nightmare visage,nv,visage'},
    {name: 'Sanctuary',           stam: 25, lvl: 800,  id: 44,  nicks: 'sanctuary,sanc'},
    {name: 'Dull Edge',           stam: 10, lvl: 800,  id: 46,  nicks: 'dull edge,de'},
    {name: 'Erosion',             stam: 25, lvl: 900,  id: 80,  nicks: 'erosion,ero'},
    {name: 'Avert Gaze',          stam: 10, lvl: 900,  id: 71,  nicks: 'avert gaze,ag'},
    {name: 'Enchant Shield',      stam: 25, lvl: 900,  id: 77,  nicks: 'enchant shield,es'},
    {name: 'Smite',               stam: 30, lvl: 1000, id: 97,  nicks: 'smite,sm'},
    {name: 'Balanced Defense',    stam: 30, lvl: 1000, id: 117, nicks: 'balanced defense,bd'},
    {name: 'Bastion',             stam: 30, lvl: 1000, id: 122, nicks: 'bastion,bast'},
    {name: 'Side Step',           stam: 30, lvl: 1000, id: 86,  nicks: 'side step,sstep'},
    {name: 'High Guard',          stam: 30, lvl: 1200, id: 96,  nicks: 'high guard,hg'},
    {name: 'Barricade',           stam: 30, lvl: 1200, id: 98,  nicks: 'barricade,bar'},
    {name: 'Coordinated Defense', stam: 30, lvl: 1200, id: 119, nicks: 'coordinated defense,cd'},
    {name: 'Degrade',             stam: 30, lvl: 1200, id: 121, nicks: 'degrade,deg,dg'},
    {name: 'Retaliate',           stam: 30, lvl: 1400, id: 123, nicks: 'retaliate,ret'},
    {name: 'Shame',               stam: 35, lvl: 1400, id: 110, nicks: 'shame'},
    {name: 'Dispel Curse',        stam: 35, lvl: 1400, id: 114, nicks: 'dispel curse,dispel'},
    {name: 'Anchored',            stam: 30, lvl: 1600, id: 154, nicks: 'anchored, anch, anchor'},
    {name: 'Hardened',            stam: 30, lvl: 1600, id: 153, nicks: 'hardened, hard, harden'},
    {name: 'Armor Boost',         stam: 30, lvl: 1600, id: 136, nicks: 'armor boost, armbst, arm bst, armb'},
    {name: 'Shield Wall',         stam: 30, lvl: 1600, id: 135, nicks: 'shield wall, shldwll, sw'},
    {name: 'Layered Armor',       stam: 40, lvl: 2000, id: 170, nicks: 'layered armor'},
    {name: 'Defensive Aura',      stam: 40, lvl: 2500, id: 171, nicks: 'defensive aura'},
    {name: 'Fumble',              stam: 40, lvl: 3000, id: 172, nicks: 'fumble'},
    {name: 'Find Item',           stam: 10, lvl: 1,    id: 16,  nicks: 'find item,fi'},
    {name: 'Treasure Hunter',     stam: 15, lvl: 1,    id: 17,  nicks: 'treasure hunter,th,treas hunter'},
    {name: 'Deep Pockets',        stam: 10, lvl: 1,    id: 22,  nicks: 'deep pockets,dp'},
    {name: 'Quest Finder',        stam: 5,  lvl: 1,    id: 61,  nicks: 'quest finder,qf'},
    {name: 'Adept Learner',       stam: 10, lvl: 25,   id: 19,  nicks: 'adept learner,al'},
    {name: 'Defiance',            stam: 15, lvl: 25,   id: 18,  nicks: 'defiance'},
    {name: 'Librarian',           stam: 10, lvl: 75,   id: 20,  nicks: 'librarian,lib,libr'},
    {name: 'Merchant',            stam: 10, lvl: 75,   id: 21,  nicks: 'merchant,merch,merc'},
    {name: 'Last Ditch',          stam: 15, lvl: 150,  id: 23,  nicks: 'last ditch,ld'},
    {name: 'Animal Magnetism',    stam: 10, lvl: 200,  id: 24,  nicks: 'animal magnetism,animag,ani mag,am'},
    {name: 'Empower',             stam: 20, lvl: 200,  id: 25,  nicks: 'empower,emp'},
    {name: 'Doubler',             stam: 5,  lvl: 200,  id: 26,  nicks: 'doubler,doub,db'},
    {name: 'Conserve',            stam: 10, lvl: 250,  id: 39,  nicks: 'conserve,cons,consv,con'},
    {name: 'Brewing Master',      stam: 10, lvl: 250,  id: 40,  nicks: 'brewing master,bm,brm,brewm'},
    {name: 'Four Leaf',           stam: 20, lvl: 250,  id: 41,  nicks: 'four leaf,4l,fl'},
    {name: 'Extend',              stam: 30, lvl: 300,  id: 42,  nicks: 'extend,ext'},
    {name: 'Inventor',            stam: 15, lvl: 400,  id: 62,  nicks: 'inventor,inv,invI,inv1,inventor1,inventor 1,inventor i,inv i,inv 1'},
    {name: 'Extractor',           stam: 15, lvl: 400,  id: 63,  nicks: 'extractor,extr'},
    {name: 'Inventor II',         stam: 20, lvl: 500,  id: 64,  nicks: 'inventor ii,inventorii,invii,inv2,inventor 2,inv ii,inv 2'},
    {name: 'Buff Master',         stam: 10, lvl: 500,  id: 65,  nicks: 'buff master,buffm,bum'},
    {name: 'Reflection',          stam: 10, lvl: 600,  id: 66,  nicks: 'reflection,ref,refl,reflect'},
    {name: 'Guild Buffer',        stam: 10, lvl: 600,  id: 160, nicks: 'guild buffer, gldbfr, gb'},
    {name: 'Light Foot',          stam: 15, lvl: 700,  id: 67,  nicks: 'light foot,lf'},
    {name: 'Mesmerize',           stam: 20, lvl: 700,  id: 68,  nicks: 'mesmerize,mesmer,mes,mez'},
    {name: 'Resource Finder',     stam: 25, lvl: 800,  id: 76,  nicks: 'resource finder,rf'},
    {name: 'Quest Hunter',        stam: 25, lvl: 800,  id: 166, nicks: 'quest hunter'},
    {name: 'Gloat',               stam: 10, lvl: 900,  id: 81,  nicks: 'gloat'},
    {name: 'Sacrifice',           stam: 25, lvl: 900,  id: 75,  nicks: 'sacrifice,sac'},
    {name: 'Reckoning',           stam: 25, lvl: 900,  id: 72,  nicks: 'reckoning,rec,rek'},
    {name: 'Reinforce',           stam: 30, lvl: 1000, id: 126, nicks: 'reinforce,rein'},
    {name: 'Bodyguard',           stam: 30, lvl: 1000, id: 120, nicks: 'bodyguard,bg'},
    {name: 'Riposte',             stam: 30, lvl: 1000, id: 124, nicks: 'riposte,rip'},
    {name: 'Severe Condition',    stam: 30, lvl: 1000, id: 101, nicks: 'severe condition,sc'},
    {name: 'Sealed',              stam: 35, lvl: 1200, id: 112, nicks: 'sealed,seal'},
    {name: 'Righteous',           stam: 30, lvl: 1200, id: 107, nicks: 'righteous,right'},
    {name: 'Epic Forge',          stam: 30, lvl: 1200, id: 102, nicks: 'epic forge,ef'},
    {name: 'Golden Shield',       stam: 30, lvl: 1200, id: 103, nicks: 'golden shield,gs'},
    {name: 'Stalker',             stam: 35, lvl: 1400, id: 125, nicks: 'stalker,stalk'},
    {name: 'Ageless',             stam: 30, lvl: 1400, id: 100, nicks: 'ageless,age'},
    {name: 'Extractor II',        stam: 30, lvl: 1400, id: 104, nicks: 'extractor ii,extractorii,extii,ext2,extractor 2,ext ii,ext 2'},
    {name: 'Epic Craft',          stam: 30, lvl: 1600, id: 159, nicks: 'epic craft, epc crft, epccrft, ec'},
    {name: 'Gold Foot',           stam: 20, lvl: 1600, id: 137, nicks: 'gold foot, goldfoot, gldft, gf'},
    {name: 'Titan Doubler',       stam: 40, lvl: 2000, id: 167, nicks: 'titan doubler'},
    {name: 'Teleport',            stam: 40, lvl: 2500, id: 168, nicks: 'teleport'},
    {name: 'Invigorate',          stam: 40, lvl: 3000, id: 169, nicks: 'invigorate'}
  ];

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
      '<tr><td rowspan="2" colspan="2" class="headCell">' +
      '<h1>Find ' + o.header + '</h1></td>' +
      '<td class="findLabel">Select ' + o.what + ' to search for:</td>' +
      '<td>' + o.control() + '</td></tr>' +
      '<tr><td class="findLabel">Level ' + o.cutoff + 'ers only:</td>' +
      '<td><input id="level175" type="checkbox"></td></tr>' +
      '<tr><td class="leftLabel">' + o.searched +
      ':&nbsp;</td><td id="buffNicks">&nbsp;</td>' +
      '<td class="findLabel">Search guild members:</td>' +
      '<td><input id="guildMembers" type="checkbox" checked></td></tr>' +
      '<tr><td class="findLabel">' +
      '# potential ' + o.potential + 'ers to search:&nbsp;</td>' +
      '<td id="potentialBuffers"></td>' +
      '<td class="findLabel">Search allies/enemies:' +
      helpLink('Search Allies/Enemies',
        'The checkbox enables searching your own personal ' +
        'allies/enemies list for buffs.<br><br>' +
        'Additional profiles to search can be added in the text ' +
        'field to the right, separated by commas.') + '</td>' +
      '<td><input id="alliesEnemies" type="checkbox" checked>' +
      '<input class="extraProfile" class="custominput" id="extraProfile" ' +
      'type="text" title="Extra profiles to search" value="' +
      (extraProfile || '') + '"></td></tr>' +
      '<tr><td class="findLabel"># ' + o.processed + 'ers processed:' +
      '&nbsp;</td><td id="buffersProcessed">0</td>' +
      '<td class="findLabel">Search online list:</td>' +
      '<td><select class="selectOnline" id="onlinePlayers">' +
        '<option value="0">Disabled</option>' +
        '<option value="49">Short (fastest)</option>' +
        '<option value="47">Medium (medium)</option>' +
        '<option value="45">Long (slowest)</option>' +
      '</select></td></tr>' +
      '<tr><td class="findLabel">Find ' + o.progress + ' progress:' +
      '&nbsp;</td><td class="buffProg" id="bufferProgress">Idle</td>' +
      '<td align="center"><input id="clearresultsbutton" ' +
      'class="custombutton" type="button" value="Clear Results"></td>' +
      '<td align="center"><input id="findbuffsbutton" class="custombutton" ' +
      'type="button" value="Find Buffers"></td></tr>' +
      '</tbody></table>' +
      outputTable(o) +
      disclaimer();
  }

  function moreToDo(limit, cntr, list) {
    return list && performance.now() < limit && cntr < list.length;
  }

  var dotList;
  var dotCount;
  var redDot =
    '<span class="fshDot redDot tip-static" data-tipped="Offline"></span>';
  var greenDiamond =
    '<span class="fshDot greenDiamond tip-static" data-tipped="Online"></span>';
  var yellowDiamond =
    '<span class="fshDot yellowDiamond tip-static" data-tipped="Offline"></span>';
  var orangeDiamond =
    '<span class="fshDot orangeDiamond tip-static" data-tipped="Offline"></span>';
  var offlineDot =
    '<span class="fshDot offlineDot tip-static" data-tipped="Offline"></span>';
  var sevenDayDot =
    '<span class="fshDot sevenDayDot tip-static" data-tipped="Offline"></span>';

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

  var getDot = [
    {condition: 2, result: greenDiamond},
    {condition: 5, result: yellowDiamond},
    {condition: 30, result: orangeDiamond},
    {condition: 10080, result: offlineDot},
    {condition: 44640, result: sevenDayDot}
  ];

  function onlineDot(obj) {
    var min = getMins.reduce(function(prev, curr) {
      return curr(obj, prev);
    }, 0);
    for (var i = 0; i < getDot.length; i += 1) {
      var el = getDot[i];
      if (min < el.condition) {return el.result;}
    }
    return redDot;
  }

  function changeOnlineDot(contactLink) {
    var lastActivity = lastActivityRE
      .exec(contactLink.dataset.tipped);
    contactLink.parentNode.previousSibling.innerHTML =
      onlineDot({
        min: lastActivity[3],
        hour: lastActivity[2],
        day: lastActivity[1]
      });
  }

  function batchDots() {
    var limit = performance.now() + 5;
    while (moreToDo(limit, dotCount, dotList)) {
      changeOnlineDot(dotList[dotCount]);
      dotCount += 1;
    }
    if (dotCount < dotList.length) {
      add(3, batchDots);
    }
  }

  function colouredDots() {
    if (!getValue('enhanceOnlineDots')) {return;}
    dotList = document.querySelectorAll(
      '#pCC a[data-tipped*="Last Activity"]');
    dotCount = 0;
    add(3, batchDots);
  }

  var sustainLevelRE = /Level<br>(\d+)%/;

  function uniq(arr, removeBy) {
    var seen = {};
    if (removeBy) {
      return arr.filter(function(item) {
        if (seen[item[removeBy]]) {return false;}
        seen[item[removeBy]] = true;
        return true;
      });
    }
    return arr.filter(function(item) {
      if (seen[item]) {return false;}
      seen[item] = true;
      return true;
    });
  }

  function getPrevBr(bioCellHtml, runningTotalPosition) { // Legacy
    var prevBR = bioCellHtml.lastIndexOf('<br>', runningTotalPosition - 1);
    if (prevBR === -1) {return 0;}
    return prevBR;
  }

  function getNextBr(bioCellHtml, runningTotalPosition) { // Legacy
    var nextBR = bioCellHtml.indexOf('<br>', runningTotalPosition);
    if (nextBR === -1 && bioCellHtml.indexOf('<br>') !== -1) {
      return bioCellHtml.length - 5;
    }
    return nextBR;
  }

  function getBioLines(bioCellHtml, findBuffNicks) { // Legacy
    var res = [];
    var buffPosition = 0;
    var startingPosition = 0;
    var runningTotalPosition = 0;
    var bioTextToSearch = ' ' + bioCellHtml + ' ';
    var buffRE = new RegExp('[^a-zA-Z]((' +
      findBuffNicks.replace(/,/g, ')|(') + '))[^a-zA-Z]', 'i');
    while (buffPosition !== -1) {
      bioTextToSearch = bioTextToSearch.substr(startingPosition,
        bioTextToSearch.length);
      buffPosition = bioTextToSearch.search(buffRE);
      if (buffPosition !== -1) {
        startingPosition = buffPosition + 1;
        runningTotalPosition += buffPosition;
        var prevBR = getPrevBr(bioCellHtml, runningTotalPosition);
        var nextBR = getNextBr(bioCellHtml, runningTotalPosition);
        var textLine = bioCellHtml.substr(prevBR + 4, nextBR - prevBR);
        textLine = textLine.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '');
        res.push(textLine);
      }
    }
    return uniq(res);
  }

  function getSustain(doc) {
    var aLinks = getElementById('profileLeftColumn', doc)
      .getElementsByTagName('a');
    var sustainLevel;
    Array.prototype.some.call(aLinks, function(el) {
      if (el.textContent === 'Sustain') {
        var sustainText = el.parentNode.parentNode.parentNode.nextElementSibling
          .firstElementChild.dataset.tipped;
        sustainLevel = parseInt(sustainLevelRE.exec(sustainText)[1], 10);
        return true;
      }
      return false;
    });
    return fallback(sustainLevel, -1);
  }

  function nameCell(doc, callback, lastActivity, bioCellHtml) { // Legacy
    var innerPlayerName = getElementById('pCC', doc)
      .getElementsByTagName('h1')[0].textContent;
    var levelValue = intValue(getElementById('profileLeftColumn', doc)
      .children[4].children[0].rows[0].cells[1].textContent);
    var virtualLevelValue = parseInt(getElementById('stat-vl', doc)
      .textContent, 10);
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
      '<span class="fshGray">Level:&nbsp;</span>' + levelValue +
      '&nbsp;(' + virtualLevelValue + ')';
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

  function parseProfileAndDisplay(responseText, callback) { // Hybrid - Evil
    var doc = createDocument(responseText);
    // name and level
    var innerPcc = getElementById('pCC', doc);
    // last activity
    var lastActivityElement = innerPcc.getElementsByTagName('p')[0];
    var lastActivity = /(\d+) mins, (\d+) secs/
      .exec(lastActivityElement.textContent);
    // buffs
    var bioCellHtml = getElementById('profile-bio', doc).innerHTML;
    var buffTable = getElementById('buffTable');
    var textLineArray = getBioLines(bioCellHtml, callback.findBuffNicks);
    // sustain
    var sustainLevel = getSustain(doc);
    // extend
    var hasExtendBuff = doc.querySelector(
      'img.tip-static[data-tipped*="Extend"]');

    // add row to table
    if (textLineArray.length > 0) {
      var newRow = buffTable.insertRow(-1);
      // name cell
      var newCell = newRow.insertCell(0);
      newCell.style.verticalAlign = 'top';
      newCell.innerHTML = nameCell(doc, callback, lastActivity, bioCellHtml);
      $('.a-reply').click(function(evt) {
        window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
      });

      // player info cell
      newCell = newRow.insertCell(1);
      newCell.innerHTML = playerInfo(lastActivity, sustainLevel, hasExtendBuff);
      newCell.style.verticalAlign = 'top';
      // buff cell
      newCell = newRow.insertCell(2);
      textLineArray.forEach(function(el) {
        newCell.innerHTML += el + '<br>';
      });
    }
    var processedBuffers = getElementById('buffersProcessed');
    var potentialBuffers =
      parseInt(getElementById('potentialBuffers').textContent, 10);
    var processedBuffersCount = parseInt(processedBuffers.textContent, 10);
    processedBuffers.innerHTML = processedBuffersCount + 1;
    if (potentialBuffers === processedBuffersCount + 1) {
      callback.bufferProgress.innerHTML = 'Done.';
      callback.bufferProgress.style.color = 'blue';
    }
  }

  var thisPlayerName;

  function playerName() {
    if (!thisPlayerName) {
      thisPlayerName = getElementById('statbar-character').textContent;
    }
    return thisPlayerName;
  }

  var buffCustom = {
    header: 'Buff',
    what: 'buff',
    control: function() {
      var ret = '<select style="width:140px;" id="selectedBuff">';
      for (var j = 0; j < buffList.length; j += 1) {
        ret += '<option value="' + buffList[j].id + '">' +
          buffList[j].name + '</option>';
      }
      ret += '</select>';
      return ret;
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

  var characterName;
  var findBuffNicks;
  var findBuffMinCastLevel;
  var findBuffsLevel175Only;
  var onlinePlayers$1;
  var onlinePlayersSetting;
  var extraProfile;
  var profilePagesToSearch;
  var profilePagesToSearchProcessed;
  var bufferProgress;

  function findBuffsParsePlayersForBuffs() { // Legacy
    // remove duplicates TODO
    // now need to parse player pages for buff ...
    getElementById('potentialBuffers').innerHTML =
      onlinePlayers$1.length;
    if (onlinePlayers$1.length <= 0) {
      bufferProgress.innerHTML = 'Done.';
      bufferProgress.style.color = 'blue';
      return;
    }
    bufferProgress.innerHTML = 'Parsing player data ...';
    bufferProgress.style.color = 'green';


    onlinePlayers$1.forEach(function(j) {
      retryAjax(j).done(function(html) {
        parseProfileAndDisplay(html, {
          href: onlinePlayers$1[j],
          bufferProgress: bufferProgress,
          findBuffNicks: findBuffNicks
        });
      });
    });
  }

  function calcMinLvl() { // Legacy
    if (findBuffsLevel175Only) {return 500;}
    return 1;
  }

  function calcNextPage(curPage, maxPage) { // Legacy
    if (curPage === 1) {return Math.round(onlinePlayersSetting * maxPage / 50);}
    return curPage + 1;
  }

  function addPlayerToSearchList(onlinePlayer, onlinePlayerName) {
    // add online player to search list (all but self)
    if (characterName !== onlinePlayerName.trim()) {
      onlinePlayers$1.push(onlinePlayer);
    }
  }

  function playerRow(i, e) {
    var onlinePlayer = $(e).find('td:eq(1) a').attr('href');
    var onlinePlayerLevel = parseInt($(e).find('td:eq(2)').text()
      .replace(/,/g, ''), 10);
    var onlinePlayerName = $(e).find('td:eq(1) a').text();
    var minPlayerVirtualLevel = calcMinLvl();
    if (onlinePlayerLevel >= findBuffMinCastLevel &&
        onlinePlayerLevel >= minPlayerVirtualLevel) {
      addPlayerToSearchList(onlinePlayer, onlinePlayerName);
    }
  }

  function findBuffsParseOnlinePlayers(responseText) { // Legacy
    var doc = createDocument(responseText);
    var playerRows = $(doc).find('table:contains("Username")>tbody>tr:has' +
      '(td>a[href*="cmd=profile&player_id="])');
    var maxPage = parseInt($(doc).find('td:has(input[name="page"]):last')
      .text().replace(/\D/g, ''), 10);
    var curPage = parseInt($(doc).find('input[name="page"]:last').val()
      .replace(/\D/g, ''), 10);
    if (curPage !== 1) {
      playerRows.each(playerRow);
    }
    if (curPage < maxPage) {
      var newPage = calcNextPage(curPage, maxPage);
      bufferProgress.innerHTML = 'Parsing online page ' + curPage + ' ...';
      retryAjax('index.php?no_mobile=1&cmd=onlineplayers&page=' +
        newPage.toString()).done(findBuffsParseOnlinePlayers);
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
      retryAjax('index.php?no_mobile=1&cmd=onlineplayers&page=1')
        .done(findBuffsParseOnlinePlayers);
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
      addPlayerToSearchList(el.href, el.textContent);
    }
  }

  function findBuffsParseProfilePage(responseText) {
    var doc = createDocument(responseText);
    var profileAlliesEnemies =
      doc.querySelectorAll('#profileLeftColumn a[data-tipped*="Last Activity"]');
    Array.prototype.forEach.call(profileAlliesEnemies, parsePlayerLink);
    // continue with online players
    profilePagesToSearchProcessed += 1;
    if (profilePagesToSearchProcessed ===
      profilePagesToSearch.length) {
      findBuffsParseOnlinePlayersStart();
    }
  }

  function findBuffsParseProfilePageStart() { // Legacy
    // if option enabled then parse profiles
    profilePagesToSearch = [];
    profilePagesToSearch.push('index.php?cmd=profile'); // ???
    var extraProfileArray = extraProfile.split(',');
    extraProfileArray.forEach(function(el) {
      profilePagesToSearch.push('index.php?cmd=findplayer' + // ???
        '&search_active=1&search_level_max=&search_level_min=' +
        '&search_username=' + el + '&search_show_first=1');
    });
    profilePagesToSearchProcessed = 0;
    if (getElementById('alliesEnemies').checked) {
      profilePagesToSearch.forEach(function(el) {
        retryAjax(el).done(findBuffsParseProfilePage);
      });
    } else {
      findBuffsParseOnlinePlayersStart();
    }
  }

  function findBuffsParseGuildManagePage(responseText) {
    var doc = createDocument(responseText);
    if (getElementById('guildMembers').checked) {
      var memList = doc.querySelectorAll('#pCC a[data-tipped*="<td>VL:</td>"]');
      Array.prototype.forEach.call(memList, parsePlayerLink);
    }
    // continue with profile pages
    findBuffsParseProfilePageStart();
  }

  function findBuffsClearResults() { // Legacy
    var buffTable = getElementById('buffTable');
    for (var j = buffTable.rows.length; j > 1; j -= 1) {
      buffTable.deleteRow(j - 1);
    }
    getElementById('buffNicks').innerHTML = '';
    // var bufferProgress = getElementById('bufferProgress');
    bufferProgress.innerHTML = 'Idle.';
    bufferProgress.style.color = 'black';
    getElementById('potentialBuffers').innerHTML = '';
    getElementById('buffersProcessed').innerHTML = 0;
  }

  function findAnyStart(progMsg) { // jQuery.min // jQuery
    if (jQueryNotPresent()) {return;}
    characterName = playerName();
    getElementById('buffNicks').innerHTML = findBuffNicks;
    bufferProgress = getElementById('bufferProgress');
    bufferProgress.innerHTML = 'Gathering list of ' + progMsg + ' ...';
    bufferProgress.style.color = 'green';
    findBuffsLevel175Only =
      getElementById('level175').checked;
    getElementById('buffersProcessed').innerHTML = 0;
    onlinePlayers$1 = [];
    extraProfile = getElementById('extraProfile').value;
    setValue('extraProfile', extraProfile);
    // get list of players to search, starting with guild>manage page
    retryAjax('index.php?no_mobile=1&cmd=guild&subcmd=manage')
      .done(findBuffsParseGuildManagePage);
  }

  function findBuffsStart() { // Legacy
    var selectedBuff = parseInt($('#selectedBuff').val(), 10);
    for (var j = 0; j < buffList.length; j += 1) {
      if (selectedBuff === buffList[j].id) {
        findBuffNicks = buffList[j].nicks;
        findBuffMinCastLevel = buffList[j].lvl;
        break;
      }
    }
    findAnyStart('potential buffers');
  }

  function findOtherStart() { // Legacy
    var textToSearchFor = $('#textToSearchFor').val().replace(/\s*,\s*/, ',');
    setValue('textToSearchFor', textToSearchFor);
    findBuffNicks = textToSearchFor;
    findBuffMinCastLevel = 1;
    findAnyStart('profiles to search');
  }

  function injectFindBuffs(injector) { // Legacy
    var content = injector || pCC;
    calf.sortBy = 'name';
    calf.sortAsc = true;
    buffList.sort(stringSort);
    extraProfile = getValue('extraProfile');
    content.innerHTML = pageLayout(buffCustom, extraProfile);
    getElementById('findbuffsbutton')
      .addEventListener('click', findBuffsStart, true);
    getElementById('clearresultsbutton')
      .addEventListener('click', findBuffsClearResults, true);
  }

  function injectFindOther(injector) { // Native - Bad
    var content = injector || pCC;
    extraProfile = getValue('extraProfile');
    content.innerHTML = pageLayout(otherCustom, extraProfile);
    getElementById('findbuffsbutton')
      .addEventListener('click', findOtherStart, true);
    getElementById('clearresultsbutton')
      .addEventListener('click', findBuffsClearResults, true);
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
    '<a href="index.php?cmd=profile&player_id=1963510">PointyHair</a></li>' +
    '<li><span class="a-reply" target_player="yuuzhan">PM</span> ' +
    '<a href="index.php?cmd=profile&player_id=1599987">yuuzhan</a></li>' +
    '</ul></div>';

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
    var functionPath = evt.target.textContent;
    var fn = functionLookup[functionPath];
    if (jQueryPresent() && isFunction(fn)) {
      sendEvent('helperMenu', functionPath);
      jQueryDialog(fn);
    }
  }

  function eventHandler$1(evt) {
    if (evt.target.classList.contains('fshLink')) {
      callHelperFunction(evt);
      return;
    }
    if (evt.target.classList.contains('a-reply')) {
      window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
    }
  }

  function showHelperMenu() {
    var helperMenu = getElementById('helperMenu');
    helperMenu.removeEventListener('mouseenter', showHelperMenu);

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
    helperMenu.addEventListener('click', function(evt) {
      if (evt.target.id !== 'helperMenu') {return;}
      var menu = evt.target.firstElementChild;
      menu.classList.toggle('showMenuDiv');
    });
    helperMenuDiv.addEventListener('click', eventHandler$1);
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
    helperMenu.addEventListener('mouseenter', showHelperMenu);
    if (getValue('draggableHelperMenu')) {
      helperMenu.classList.add('fshMove');
      draggable(helperMenu);
    }
    node.parentNode.insertBefore(helperMenu, node);
  }

  function injectHelperMenu() {
    // don't put all the menu code here (but call if clicked) to minimize lag
    var node = getElementById('statbar-container');
    if (node) {haveNode$1(node);}
  }

  function parseDateAsTimestamp(textDate) {
    var dateAry = textDate.split(/[: /[]/);
    return Date.UTC(Number(dateAry[4]), months.indexOf(dateAry[3]),
      Number(dateAry[2]), Number(dateAry[0]), Number(dateAry[1]), 0);
  }

  function containsNewsHead(el) {
    return el.classList.contains('news_head') ||
      el.classList.contains('news_head_tavern');
  }

  function closestHead(el) {
    if (containsNewsHead(el)) {
      return el;
    }
    if (el.classList.contains('news_left_column')) {return;}
    return closestHead(el.parentNode);
  }

  function getNewsClass(newsHead) {
    if (newsHead.classList.contains('news_head_tavern')) {
      return '.news_body_tavern';
    }
    return '.news_body';
  }

  function gotNewsHead(evt, newsHead) { // jQuery
    var newsBody = newsHead.nextElementSibling;
    var newsClass = getNewsClass(newsHead);
    if (!$(newsBody).data('open')) {
      evt.preventDefault();
      $(newsClass).hide().data('open', false);
      $(newsBody).show().data('open', true);
    } else if (evt.target.tagName !== 'A') {
      $(newsBody).hide().data('open', false);
    }
    evt.stopPropagation();
  }

  function newsEvt(evt) {
    var newsHead = closestHead(evt.target);
    if (newsHead) {gotNewsHead(evt, newsHead);}
  }

  function fixCollapse() {
    var newsCol = document.getElementsByClassName('news_left_column');
    if (jQueryNotPresent() || newsCol.length !== 1) {return;}
    newsCol[0].addEventListener('click', newsEvt, true);
  }

  function lookForPvPLadder() {
    var lastLadderReset = getValue('lastLadderReset');
    var rumours = pCC.getElementsByClassName('news_head_tavern');
    Array.prototype.forEach.call(rumours, function(head) {
      if (head.children[1].textContent === 'PvP Ladder') {
        var logTime = parseDateAsTimestamp(head.children[2].textContent);
        if (logTime > lastLadderReset) {
          setValue('lastLadderReset', logTime);
          lastLadderReset = logTime;
        }
      }
    });
  }

  function addUfsgLinks() {
    var imgs = document.querySelectorAll(
      '.news_body img[src^="https://cdn.fallensword.com/creatures/"]');
    Array.prototype.forEach.call(imgs, function(img) {
      var myName = encodeURIComponent(img.getAttribute('oldtitle'));
      var myLink = createAnchor({
        href: guideUrl + 'creatures&search_name=' + myName,
        target: '_blank'
      });
      img.parentNode.insertBefore(myLink, img);
      insertElement(myLink, img);
    });
  }

  function injectHomePageTwoLink() { // Pref
    var archiveLink = document.querySelector(
      '#pCC a[href="index.php?cmd=&subcmd=viewupdatearchive"]');
    if (!archiveLink) {return;}
    insertHtmlAfterEnd(archiveLink, '&nbsp;<a href="index.php?cmd=' +
      '&subcmd=viewupdatearchive&subcmd2=&page=2&search_text=">' +
      'View Updates Page 2</a>');
    archiveLink = document.querySelector(
      '#pCC a[href="index.php?cmd=&subcmd=viewarchive"]');
    insertHtmlAfterEnd(archiveLink, '&nbsp;<a href="index.php?cmd=' +
      '&subcmd=viewarchive&subcmd2=&page=2&search_text=">View News Page 2</a>');
    fixCollapse(); // Pref
    lookForPvPLadder(); // Pref
    addUfsgLinks(); // Pref
  }

  function findNewGroup(el) {
    if (el.textContent.indexOf('New attack group created.') === -1) {return;}
    var groupJoinHTML = '';
    if (!getValue('enableMaxGroupSizeToJoin')) {
      groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
        'subcmd2=joinall"><span class="notification-icon"></span>' +
        '<p class="notification-content">Join all attack groups.</p></a>';
    } else {
      var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
      groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
        'subcmd2=joinallgroupsundersize"><span class="notification-icon">' +
        '</span><p class="notification-content">Join all attack groups ' +
        'less than size ' + maxGroupSizeToJoin + '.</p></a>';
    }
    insertHtmlAfterEnd(el, '<li class="notification">' + groupJoinHTML + '</li>');
  }

  function injectJoinAllLink() {
    var nodeList = getElementById('pCL').getElementsByTagName('li');
    Array.prototype.forEach.call(nodeList, findNewGroup);
  }

  function insertElementAfter(newNode, referenceNode) {
    if (referenceNode instanceof Node &&
        referenceNode.parentNode instanceof Node) {
      return referenceNode.parentNode.insertBefore(newNode,
        referenceNode.nextSibling);
    }
  }

  var guildId$2;

  function updateQuestLink() {
    var lastActiveQuestPage = getValue('lastActiveQuestPage');
    if (lastActiveQuestPage.length > 0) {
      getElementById('nav-character-questbook')
        .setAttribute('href', lastActiveQuestPage);
    }
  }

  function insertAdjElement(parent, listItem) {
    insertElementAfter(listItem, parent);
  }

  function insertAfterParent(target, fn, listItem) {
    var tgt = getElementById(target);
    if (tgt instanceof Node) {
      var parent = tgt.parentNode;
      fn(parent, listItem);
    } else {sendException('#' + target + ' is not a Node', false);}
  }

  function anchorButton(navLvl, text, fn, target) {
    var li = createLi({className: 'nav-level-' + navLvl});
    var al = createAnchor({
      className: 'nav-link fshPoint',
      textContent: text
    });
    al.addEventListener('click', function() {
      sendEvent('accordion', text);
      jQueryDialog(fn);
    });
    insertElement(li, al);
    insertAfterParent(target, insertAdjElement, li);
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

  function newGuildLogLink() {
    if (guildId$2 && !getValue('useNewGuildLog')) {
      // if not using the new guild log, show it as a separate menu entry
      insertAfterParent('nav-guild-ledger-guildlog', insertHtmlAfterEnd,
        '<li class="nav-level-2"><a class="nav-link" ' +
        'href="index.php' + newGuildLogUrl + '"' +
        '>New Guild Log</a></li>');
    }
  }

  function guildInventory() {
    if (guildId$2) {
      insertAfterParent('nav-guild-storehouse-inventory', insertHtmlAfterEnd,
        '<li class="nav-level-2"><a class="nav-link" id="nav-' +
        'guild-guildinvmanager" href="index.php?cmd=notepad&blank=1' +
        '&subcmd=guildinvmgr">Guild Inventory</a></li>');
    }
  }

  function navHeightsIsArray(theNav, myNav) {
    // first the closed saved variables
    myNav.heights = [
      null,
      null,
      // Character
      getElementById('nav-character').nextElementSibling.children
        .length * 22,
      660,
      // Guild
      document.querySelectorAll('#nav-guild > ul li').length * 22,
      374,
      132,
      132,
      null
    ];
    if (myNav.state !== '-1' && myNav.state !== -1) {
      // and now the open one
      theNav.children[myNav.state].children[1].style.height =
        myNav.heights[myNav.state] + 'px';
    }
  }

  function navHeightExists(theNav, myNav) {
    if (Array.isArray(myNav.heights)) {
      navHeightsIsArray(theNav, myNav);
    } else {
      sendException('$(\'#nav\').data(\'nav\').heights is not an Array', false);
    }
  }

  function navDataExists(theNav, myNav) {
    if ('heights' in myNav) {
      navHeightExists(theNav, myNav);
    } else {
      sendException('$(\'#nav\').data(\'nav\').heights does not exist', false);
    }
  }

  function navExists(theNav) { // jQuery
    var myNav = $(theNav).data('nav');
    if (isObject(myNav)) {
      navDataExists(theNav, myNav);
    } else {
      sendException('$(\'#nav\').data(\'nav\') is not an object', false);
    }
  }

  function adjustHeight() {
    // adjust the menu height for the newly added items
    var theNav = getElementById('nav');
    if (theNav instanceof Element) {
      navExists(theNav);
    } else {
      sendException('#nav is not an Element', false);
    }
  }

  function injectMenu() {
    if (!getElementById('pCL') || jQueryNotPresent()) {return;}
    guildId$2 = currentGuildId();
    updateQuestLink();
    // character
    anchorButton('1', 'Recipe Manager', injectRecipeManager, 'nav-character-log');
    insertAfterParent('nav-character-log', insertHtmlAfterEnd,
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-medalguide" href="index.php?cmd=profile&subcmd=' +
      'medalguide">Medal Guide</a></li>' +
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-invmanager" href="index.php?cmd=notepad&blank=1&' +
      'subcmd=invmanagernew">Inventory Manager</a></li>');
    buffLogLink();
    combatLogLink();
    creatureLogLink();
    anchorButton('1', 'Quick Links', injectQuickLinkManager,
      'nav-character-notepad');
    // guild
    guildInventory();
    newGuildLogLink();
    // top rated
    insertAfterParent('nav-toprated-players-level', insertHtmlAfterEnd,
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'toprated-top250" href="index.php?cmd=toprated&subcmd=xp">' +
      'Top 250 Players</a></li>');
    // actions
    anchorButton('2', 'AH Quick Search', injectAuctionSearch,
      'nav-actions-trade-auctionhouse');
    anchorButton('2', 'Online Players', injectOnlinePlayers,
      'nav-actions-interaction-findplayer');
    anchorButton('2', 'Find Other', injectFindOther,
      'nav-actions-interaction-findplayer');
    anchorButton('2', 'Find Buffs', injectFindBuffs,
      'nav-actions-interaction-findplayer');
    adjustHeight();
  }

  var enterForSendMessage;
  var fshTemplate;
  var sendMessage;

  function showMsgTemplate() { // jQuery
    var targetPlayer = $('#quickMsgDialog_targetUsername').text();
    $('#msgTemplateDialog').remove();

    // template displayed
    var html = '<div id=msgTemplateDialog title="Choose Msg Template" ' +
      'style="display:none"><style>#msgTemplate .ui-selecting { ' +
      'background: #FECA40; };</style><ol id=msgTemplate valign=center>';
    for (var i = 0; i < fshTemplate.length; i += 1) {
      html += '<li class="ui-widget-content">' +
        fshTemplate[i].replace(/\{playername\}/g, targetPlayer) + '</li>';
    }
    html += '</ol></div>';
    $('body').append(html);

    // template manager
    $('#msgTemplate li').prepend('<input type=button class="del-button" ' +
      'value=Del style="display:none">');
    $('#msgTemplate').append('<li class="add-button" style="display:none">' +
      '<input type=button id=newTmplAdd value=Add><input id=newTmpl ' +
      'class=ui-widget-content></li>');
    $(':button', '#msgTemplate').button();
    $('.del-button').click(function(evt) {
      fshTemplate.splice($('#msgTemplate li')
        .index(evt.target.parentNode), 1);
      setValueJSON('quickMsg', fshTemplate);
      $('#msgTemplateDialog').dialog('close');
      showMsgTemplate();
    });
    $('#newTmplAdd').click(function() {
      if ($('#newTmpl').val() === '') {return;}
      fshTemplate.push($('#newTmpl').val());
      setValueJSON('quickMsg', fshTemplate);
      $('#msgTemplateDialog').dialog('close');
      showMsgTemplate();
    });

    // enable selectable template
    $('#msgTemplate').selectable({
      filter: 'li.ui-widget-content',
      stop: function() {
        if ($('.add-button.ui-selected').length > 0) {return;} // click on add row
        if ($('.ui-selected').length === 0) {return;} // nothing selected yet
        $('#quickMsgDialog_msg').val($('#quickMsgDialog_msg').val() +
          $('#msgTemplate .ui-selected').text() + '\n');
        $('#msgTemplateDialog').dialog('close');
      }
    });

    // show the template form
    $('#msgTemplateDialog').dialog({
      buttons: {
        Manage: function() {
          $('.del-button').toggle();
          $('.add-button').toggle();
        },
        Cancel: function() {
          $('#msgTemplateDialog').dialog('close');
          $('#msgTemplateDialog').remove();
        }
      }
    });
  }

  function keypress(evt) {
    if (evt.code === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      sendMessage();
    }
  }

  function captureEnter() {
    if (enterForSendMessage) {
      getElementById('quickMsgDialog_msg')
        .addEventListener('keypress', keypress);
    }
  }

  function openQuickMsgDialog(name, msg, tip) { // jQuery
    if (!fshTemplate) {
      fshTemplate = getValueJSON('quickMsg');
      var buttons = $('#quickMessageDialog').dialog('option', 'buttons');
      sendMessage = buttons['Send Message'];
      buttons.Template = showMsgTemplate;
      $('#quickMessageDialog').dialog('option', 'buttons', buttons);
    }
    $('#quickMsgDialog_targetUsername').html(name);
    $('#quickMsgDialog_targetPlayer').val(name);
    $('#quickMsgDialog_msg').val(fallback(msg, ''));
    $('#quickMsgDialog_msg').removeAttr('disabled');
    captureEnter();
    $('.validateTips').text(fallback(tip, ''));
    $('#quickMessageDialog').dialog('open');
  }

  function injectQuickMsgDialogJQ() {
    if (jQueryNotPresent()) {return;}
    enterForSendMessage = getValue('enterForSendMessage');
    window.openQuickMsgDialog = openQuickMsgDialog;
  }

  function doServerNode(topbannerStats, miniboxList) {
    var nodeName = miniboxList.children[7].textContent;
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
    var hidden = topbannerStats.classList.contains('topbanner-stats-hidden');
    return topbannerStats && !hidden && gameStats;
  }

  function injectServerNode() {
    var topbannerStats = getElementById('topbanner-stats');
    var h3coll = document.querySelectorAll('#pCR h3');
    var gameStats = Array.prototype.find.call(h3coll, function(el) {
      return el.textContent === 'Game Stats';
    });
    if (validStatBoxes(topbannerStats, gameStats)) {
      statBoxesExist(topbannerStats, gameStats);
    }
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
    '<a href="index.php?cmd=temple">' +
    '<p class="notification-content">Bow down to the gods</p>' +
    '</a></span></li>';

  function havePrayed() {
    getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
    setValue('needToPray', false);
    setValue('lastTempleCheck', new Date()
      .setUTCHours(23, 59, 59, 999) + 1); // Midnight
  }

  function prayToGods(e) { // jQuery
    var myGod = e.target.getAttribute('praytype');
    if (!myGod) {return;}
    getElementById('helperPrayToGods').removeEventListener('click',
      prayToGods);
    retryAjax('index.php?no_mobile=1&cmd=temple&subcmd=pray&type=' + myGod)
      .done(havePrayed);
    $(e.target).qtip('hide');
  }

  function displayDisconnectedFromGodsMessage() {
    insertHtmlAfterBegin(getElementById('notifications'), godsNotification);
    getElementById('helperPrayToGods').addEventListener('click',
      prayToGods);
  }

  function templeAlertEnabled(responseText) {
    var checkNeedToPray;
    var doc;
    if (calf.cmd !== 'temple') {
      doc = createDocument(responseText);
    } else {
      doc = document;
    }
    checkNeedToPray = doc.querySelector('input[value="Pray to Osverin"]');
    var needToPray = false;
    if (checkNeedToPray) {
      displayDisconnectedFromGodsMessage();
      needToPray = true;
    }
    setValue('needToPray', needToPray);
    setValue('lastTempleCheck', new Date()
      .setUTCHours(23, 59, 59, 999) + 1); // midnight
  }

  function parseTemplePage(responseText) {
    if (calf.enableTempleAlert) {templeAlertEnabled(responseText);}
  }

  function checkLastUpdate(templeAlertLastUpdate) {
    return !templeAlertLastUpdate || now > templeAlertLastUpdate;
  }

  function doWeNeedToParse() {
    if (checkLastUpdate(getValue('lastTempleCheck'))) {
      retryAjax('index.php?no_mobile=1&cmd=temple').done(parseTemplePage);
    } else if (getValue('needToPray')) {
      displayDisconnectedFromGodsMessage();
    }
  }

  function injectTempleAlert() { // jQuery
    // Checks to see if the temple is open for business.
    if (calf.cmd === 'temple' || jQueryNotPresent()) {return;}
    doWeNeedToParse();
  }

  var goldUpgradeMsg =
  '<li class="notification"><a href="index.php?cmd=points&type=1"><span' +
  ' class="notification-icon"></span><p class="notification-content">Up' +
  'grade stamina with gold</p></a></li>';

  function displayUpgradeMsg() {
    if (location.search.indexOf('cmd=points&type=1') === -1) {
      insertHtmlAfterBegin(getElementById('notifications'), goldUpgradeMsg);
    }
  }

  function findDoc(data) {
    if (location.search.indexOf('cmd=points&type=1') === -1) {
      return createDocument(data);
    }
    document.querySelectorAll('#pCC input[name="quantity"]')[1].value = '10';
    return document;
  }

  function checkUpgrade(limit) {
    var checkDoneUpgrade = limit.textContent.split(' / ');
    if (checkDoneUpgrade[0] !== checkDoneUpgrade[1]) {
      displayUpgradeMsg();
      setValue('needToDoUpgrade', true);
    } else {
      setValue('needToDoUpgrade', false);
      setValue('lastUpgradeCheck',
        Date.parse(limit.nextElementSibling.textContent + ' GMT'));
    }
  }

  function parseGoldUpgrades(data) {
    if (!calf.enableUpgradeAlert) {return;}
    var doc = findDoc(data);
    var tables = doc.querySelectorAll('#pCC > table');
    if (tables.length > 0) {
      var limit = tables[tables.length - 1].rows[3].cells[2];
      checkUpgrade(limit);
    }
  }

  function checkLastUpgrade() {
    var lastUpgradeCheck = getValue('lastUpgradeCheck');
    if (lastUpgradeCheck && now < lastUpgradeCheck) {return;}
    retryAjax('index.php?no_mobile=1&cmd=points&type=1').done(function(data) {
      add(3, parseGoldUpgrades, [data]);
    });
  }

  function notUpgradesPage() {
    if (getValue('needToDoUpgrade')) {
      displayUpgradeMsg();
      return;
    }
    checkLastUpgrade();
  }

  function injectUpgradeAlert() { // jQuery
    if (jQueryPresent() && location.search.indexOf('cmd=points&type=1') === -1) {
      notUpgradesPage();
    }
  }

  function insertElementAfterBegin(parentNode, newNode) {
    if (parentNode instanceof Element) {
      parentNode.insertBefore(newNode, parentNode.firstChild);
    }
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

  // export default function interceptQuickBuff() {
  //   window.openWindow = fshOpen;
  //   export default function interceptQuickBuff(url, title, w, h, features) {

  //   var pixelRatio = window.devicePixelRatio;

  //   var chrome = 1;
  //   if (navigator.userAgent.includes('Chrome')) {
  //     chrome = pixelRatio;
  //   }

  //   var docHeightInCss = document.documentElement.clientHeight;
  //   var screenYInCss = Math.floor(window.screenY / chrome);
  //   var desiredHeightInCss = Math.min(h, window.screen.availHeight);

  //   var docWidthInCss = document.documentElement.clientWidth;
  //   var screenXInCss = Math.floor(window.screenX / chrome);
  //   var desiredWidthInCss = w;

  //   console.log('pixelRatio', pixelRatio);
  //   console.log('docHeightInCss', docHeightInCss);
  //   console.log('screenYInCss', screenYInCss);
  //   console.log('desiredHeightInCss', desiredHeightInCss);
  //   console.log('docWidthInCss', docWidthInCss);
  //   console.log('screenXInCss', screenXInCss);
  //   console.log('desiredWidthInCss', desiredWidthInCss);

  //   var topInCss = Math.floor(
  //     (docHeightInCss - desiredHeightInCss) / 2 + screenYInCss
  //   );

  //   var leftInCss = Math.floor(
  //     (docWidthInCss - desiredWidthInCss) / 2 + screenXInCss
  //   );

  //   window.open(url, title,
  //     'width=' + Math.floor(desiredWidthInCss * chrome) +
  //     ', height=' + Math.floor(desiredHeightInCss * chrome) +
  //     ', top=' + Math.floor(topInCss * chrome) +
  //     ', left=' + Math.floor(leftInCss * chrome) +
  //     features);
  // }

  function navMenu() { // jQuery
    if (jQueryNotPresent()) {return;}
    var myNav = $('#nav').data('nav');
    if (!myNav) {return;}
    var oldSave = myNav._saveState;
    myNav._saveState = function(_id) {
      var id = _id;
      var myHeight = $('li.nav-level-0', '#nav').eq(id).find('ul').height();
      if (myHeight === 0) {id = -1;}
      oldSave.call(myNav, id);
    };
  }

  function outputFormat(value, suffix) {
    if (value === 0) {return '';}
    return value.toString() + suffix;
  }

  function formatLastActivity(last_login) {
    var s = Math.abs(nowSecs - last_login);
    var m = Math.floor(s / 60);
    s %= 60;
    var h = Math.floor(m / 60);
    m %= 60;
    var d = Math.floor(h / 24);
    h %= 24;
    return outputFormat(d, ' days, ') + outputFormat(h, ' hours, ') +
      outputFormat(m, ' mins, ') + s + ' secs';
  }

  function getProfile(username) {
    return retryAjax({
      url: 'index.php',
      data: {
        cmd: 'export',
        subcmd: 'profile',
        player_username: username
      },
      dataType: 'json'
    });
  }

  function sendMyProfileToForage(data) {
    setForage('fsh_selfProfile', data);
  }

  function addLastUpdateDate(data) {
    data.lastUpdate = now;
    return data;
  }

  function getMyProfile() {
    return getProfile(playerName())
      .pipe(addLastUpdateDate)
      .done(sendMyProfileToForage);
  }

  function getProfileFromForage(data) {
    if (!data || data.lastUpdate < now -
      calf.allyEnemyOnlineRefreshTime) {
      return getMyProfile();
    }
    return data;
  }

  function myStats(force) {
    if (force) {return getMyProfile();}
    // jQuery 1.7 uses pipe instead of then
    return getForage('fsh_selfProfile')
      .pipe(getProfileFromForage);
  }

  function openQuickBuffByName(aPlayerName) {
    window.openWindow('index.php?cmd=quickbuff&t=' + aPlayerName,
      'fsQuickBuff', 618, 1000, ',scrollbars');
  }

  var buffCheck = '<span class="enemy-buff-check-on"></span>';
  var msgButton = '<span class="enemy-send-message guild-icon left ' +
    'guild-minibox-action tip-static" data-tipped="Send Message"></span>';
  var buffButton = '<span class="enemy-quickbuff guild-icon left ' +
    'guild-minibox-action tip-static" data-tipped="Quick Buff"></span>';

  var contactClass = [
    {
      condition: function(n) {return n < 120;},
      ally: 'fshDodgerBlue',
      enemy: 'fshRed'
    },
    {
      condition: function(n) {return n < 300;},
      ally: 'fshDodgerBlue',
      enemy: 'fshRed'
    },
    {
      condition: function() {return true;},
      ally: 'fshPowderBlue',
      enemy: 'fshPink'
    }
  ];

  function allyOrEnemy(type, test) {
    if (type) {return test.ally;}
    return test.enemy;
  }

  function contactColor(last_login, type) {
    for (var i = 0; i < contactClass.length; i += 1) {
      var test = contactClass[i];
      if (test.condition(nowSecs - last_login)) {
        return allyOrEnemy(type, test);
      }
    }
    return 'fshWhite';
  }

  function playerName$1(val, type) {
    return '<a class="player-name tip-static ' +
      contactColor(val.last_login, type) +
      '" data-tipped="<b>' + val.username + '</b><br><table><tbody><tr>' +
      '<td>Level:</td><td>' + val.level + '</td></tr><tr><td>Last ' +
      'Activity:</td><td>' + formatLastActivity(val.last_login) +
      '</td></tr></tbody></table>" href="index.php?cmd=profile&player_id=' +
      val.id + '">' + val.username + '</a>';
  }

  function doBuffCheck() {
    if (!calf.hideBuffSelected) {
      return buffCheck;
    }
    return '';
  }

  function doMsgButton() {
    if (!calf.hideGuildInfoMessage) {
      return msgButton;
    }
    return '';
  }

  function doBuffButton() {
    if (!calf.hideGuildInfoBuff) {
      return buffButton;
    }
    return '';
  }

  function doSecureButton(val) {
    if (!calf.hideGuildInfoSecureTrade) {
      return '<a class="enemy-secure-trade guild-icon left ' +
        'guild-minibox-action tip-static" href="index.php?cmd=trade' +
        '&subcmd=createsecure&target_username=' + val.username +
        '" data-tipped="Secure Trade"></a>';
    }
    return '';
  }

  function doTradeButton(val) {
    if (!calf.hideGuildInfoTrade) {
      return '<a class="enemy-trade guild-icon left ' +
        'guild-minibox-action tip-static" href="index.php?cmd=trade' +
        '&target_player=' + val.username +
        '" data-tipped="Send Gold/Items/FSP"></a>';
    }
    return '';
  }

  function addContact(contactList, type) {
    var output = '';
    contactList.forEach(function(val) {
      if (nowSecs - val.last_login > 1800) {return;} // 30 mins
      output += '<li class="player"><div class="player-row">';
      output += doBuffCheck();
      output += playerName$1(val, type);
      output += '</div><div class="guild-minibox-actions">';
      output += doMsgButton();
      output += doBuffButton();
      output += doSecureButton(val);
      output += doTradeButton(val);
      output += '</div></li>';
    });
    return output;
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

  function noAllies(allies, enemies) {
    return noAlliesTests.every(function(e) {return e(allies, enemies) === 0;});
  }

  function hazAllies(allies, enemies) {
    var output = '';
    if (calf.enableAllyOnlineList) {
      output += addContact(allies, true);
    }
    if (calf.enableEnemyOnlineList) {
      output += addContact(enemies, false);
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

  function resetList() { // jQuery.min
    myStats(true).done(injectAllyEnemyList);
  }

  function toggleBuffSelected(self) {
    self.classList.toggle('enemy-buff-check-on');
    self.classList.toggle('enemy-buff-check-off');
  }

  function msgPlayer(self) {
    window.openQuickMsgDialog(self.parentNode.previousElementSibling
      .lastElementChild.textContent);
  }

  function buffPlayer(self) {
    openQuickBuffByName(self.parentNode
      .previousElementSibling.lastElementChild.textContent);
  }

  function selectedBuff() {
    var buffBalls = getElementById('fshContactList')
      .getElementsByClassName('enemy-buff-check-on');
    var sendstring = Array.prototype.reduce.call(buffBalls,
      function(prev, curr) {
        prev.push(curr.nextElementSibling.textContent);
        return prev;
      }, []);
    openQuickBuffByName(sendstring.join());
  }

  var classEvt = [
    {className: 'enemy-buff-check-on', handler: toggleBuffSelected},
    {className: 'enemy-buff-check-off', handler: toggleBuffSelected},
    {className: 'enemy-send-message', handler: msgPlayer},
    {className: 'enemy-quickbuff', handler: buffPlayer},
    {className: 'enemy-quick-buff', handler: selectedBuff}
  ];

  function eventHandler$2(evt) {
    var self = evt.target;
    if (self.id === 'fshResetEnemy') {
      resetList();
      return;
    }
    classEvt.some(function(test) {
      if (self.classList.contains(test.className)) {
        test.handler(self);
        return true;
      }
      return false;
    });
  }

  function makeDiv(data) {
    var fshAllyEnemy = createDiv({
      id: 'fshAllyEnemy',
      className: 'minibox'
    });
    var wrapper = '<h3>Allies/Enemies</h3><div class="minibox-content">' +
      '<h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4>' +
      '<div id="minibox-enemy"><ul id="fshContactList"></ul>';
    if (!calf.hideBuffSelected) {
      wrapper += '<ul class="enemy-quick-buff">Quick Buff Selected</ul>';
    }
    wrapper += '</div></div>';
    insertHtmlBeforeEnd(fshAllyEnemy, wrapper);
    insertElementAfterBegin(pCR, fshAllyEnemy);
    fshAllyEnemy.addEventListener('click', eventHandler$2);
    injectAllyEnemyList(data);
  }

  function prepareAllyEnemyList() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    myStats(false)
      .done(function(data) {
        add(3, makeDiv, [data]);
      });
  }

  var bountyList;
  var wantedList;
  var activeBountyListPosted;
  var bountyListRefreshTime;
  var bwNeedsRefresh;
  var wantedNames;
  var wantedArray;
  var bountyUrl = 'index.php?no_mobile=1&cmd=bounty&page=';

  function parseActiveBounty(activeTable) { // Legacy
    if (!/No bounties active/.test(activeTable.rows[1].cells[0].innerHTML)) {
      for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
        var theCells = activeTable.rows[i].cells;
        var thisBounty = {};
        thisBounty.target = theCells[0].firstChild
          .firstChild.firstChild.textContent;
        thisBounty.link = theCells[0].firstChild.firstChild.href;
        thisBounty.lvl = theCells[0].firstChild
          .firstChild.nextSibling.textContent
          .replace(/\[/, '').replace(/\]/, '');
        thisBounty.reward = theCells[2].textContent;
        thisBounty.rewardType = theCells[2]
          .firstChild.firstChild.firstChild.firstChild
          .nextSibling.firstChild.title;
        thisBounty.posted = theCells[3].textContent;
        thisBounty.xpLoss = theCells[4].textContent;
        thisBounty.progress = theCells[5].textContent;
        bountyList.bounty.push(thisBounty);
      }
    }
  }

  function getActiveBountyList(doc) { // Legacy
    var activeTable = getElementById('bounty-info', doc).parentNode.parentNode
      .previousElementSibling.children[0].children[0];
    bountyList = {};
    bountyList.bounty = [];
    bountyList.isRefreshed = true;
    bountyList.lastUpdate = nowSecs;
    if (activeTable) {parseActiveBounty(activeTable);}
    activeBountyListPosted = true;
  }

  function testBountyList() {
    return bountyList &&
      nowSecs - bountyList.lastUpdate > bountyListRefreshTime;
  }

  function testWantedList() {
    return wantedList &&
      nowSecs - wantedList.lastUpdate > bountyListRefreshTime;
  }

  function testCacheInvalid() {
    return testBountyList() || testWantedList();
  }

  function invalidateCache() {
    bountyList = getValueJSON('bountyList');
    wantedList = getValueJSON('wantedList');
    bountyListRefreshTime = getValue('bountyListRefreshTime');
    bwNeedsRefresh = getValue('bwNeedsRefresh');
    if (bwNeedsRefresh) {return;}
    if (testCacheInvalid()) {
      bwNeedsRefresh = true; // invalidate cache
    }
  }

  function doRefresh() {
    wantedList = {};
    wantedList.bounty = [];
    wantedList.isRefreshed = true;
    wantedList.lastUpdate = nowSecs;
    activeBountyListPosted = false;
    wantedNames = getValue('wantedNames');
    wantedArray = wantedNames.split(/\s*,\s*/);
    setValue('bwNeedsRefresh', false);
  }

  var thisBounty;

  function acceptBtn(action, cell) {
    if (action !== '[n/a]') {
      return cell.firstChild.firstChild.getAttribute('onclick');
    }
    return '';
  }

  function getTarget(target, theRow) {
    thisBounty = {};
    thisBounty.target = target;
    thisBounty.link = theRow.cells[0].firstChild.firstChild.href;
    thisBounty.lvl = theRow.cells[0].firstChild.firstChild.nextSibling
      .textContent.replace(/\[/, '').replace(/\]/, '');
    thisBounty.offerer = theRow.cells[1].firstChild.firstChild.firstChild
      .textContent;
    thisBounty.reward = theRow.cells[2].textContent;
    thisBounty.rewardType = theRow.cells[2].firstChild.firstChild.firstChild
      .firstChild.nextSibling.firstChild.title;
    thisBounty.xpLoss = theRow.cells[3].textContent;
    thisBounty.posted = theRow.cells[4].textContent;
    thisBounty.tickets = theRow.cells[5].textContent;
    thisBounty.accept = acceptBtn(theRow.cells[6].textContent.trim(),
      theRow.cells[6]);
    wantedList.bounty.push(thisBounty);
  }

  var isWanted = [
    function() {return wantedArray.includes('*');},
    function(target) {return wantedArray.includes(target);},
    function(target, theRow) {
      return calf.wantedGuildMembers &&
        theRow.cells[6].textContent.trim() === '[n/a]';
    }
  ];

  function wantedTarget(target, theRow) {
    if (theRow.cells[6].textContent.trim() !== '[active]' &&
        isWanted.some(function(el) {return el(target, theRow);})) {
      getTarget(target, theRow);
    }
  }

  function findTarget(activeTable) {
    for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
      var theRow = activeTable.rows[i];
      var target = theRow.cells[0].firstChild
        .firstChild.firstChild.textContent;
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
    setValueJSON('bountyList', bountyList);

    bountyListDiv.innerHTML = '';

    var heading = createDiv({textContent: 'Active Bounties '});
    bountyListReset = createSpan({className: 'xxsLink', textContent: 'Reset'});
    insertElement(heading, bountyListReset);
    insertElement(bountyListDiv, heading);

    var output = '';
    if (bountyList.bounty.length === 0) {
      output += '<div class="xsOrange">[No active bounties]</div>';
    } else {
      for (var i = 0; i < bountyList.bounty.length; i += 1) {
        output += '<a href="' + bountyList.bounty[i].link +
          '" class="tip-static" data-tipped="' +
          makeMouseOver(bountyList.bounty[i]) + '">' +
          bountyList.bounty[i].target + '</a><br>';
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
    setValueJSON('wantedList', wantedList);

    wantedListDiv.innerHTML = '';

    var heading = createDiv({textContent: 'Wanted Bounties '});
    wantedListReset = createSpan({className: 'xxsLink', textContent: 'Reset'});
    insertElement(heading, wantedListReset);
    insertElement(wantedListDiv, heading);

    var output = '';
    if (wantedList.bounty.length === 0) {
      output += '<div class="xsOrange">[No wanted bounties]</div>';
    } else {
      for (var i = 0; i < wantedList.bounty.length; i += 1) {
        output += acceptBtn$1(wantedList.bounty[i]) +
          '<a class="xsKhaki tip-static" data-tipped="' +
          makeMouseOver$1(wantedList.bounty[i]) +
          '" href="' + wantedList.bounty[i].link + '">' +
          wantedList.bounty[i].target + '</a><br>';
      }
    }
    insertHtmlBeforeEnd(wantedListDiv, output);
  }

  var curPage;
  var maxPage;

  function getWantedBountyList(doc) {
    var page = doc.querySelector('#pCC input[name="page"]');
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
        retryAjax(bountyUrl + (curPage + 1).toString())
          .done(parseBountyPageForWorld);
      } else {
        injectWantedList();
      }
    }
  }

  function notRefreshed(enableActiveBountyList, enableWantedList) {
    if (enableWantedList) {
      wantedList.isRefreshed = false;
      injectWantedList(wantedList);
    }
    if (enableActiveBountyList) {
      bountyList.isRefreshed = false;
      injectBountyList(bountyList);
    }
  }

  var refreshConditions = [
    function() {return !bountyList;},
    function() {return !wantedList;},
    function() {return bwNeedsRefresh;}
  ];

  function needsRefresh() {
    return refreshConditions.some(function(el) {
      return el();
    });
  }

  function retrieveBountyInfo(enableActiveList, enableWantedList) {
    invalidateCache();
    if (needsRefresh()) {
      doRefresh();
      retryAjax(bountyUrl + '1').done(parseBountyPageForWorld);
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
    if (bountyListDiv) {bountyListDiv.addEventListener('click', resetList$1);}
    if (wantedListDiv) {wantedListDiv.addEventListener('click', resetList$1);}
  }

  function prepareBountyData() {
    if (jQueryNotPresent()) {return;}
    createDivs();
    doHandlers$1();
    retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
  }

  function infoBox(documentText) {
    var doc = createDocument(documentText);
    var result;
    var infoMsg = getElementById('info-msg', doc);
    if (infoMsg) {
      var infoMatch = infoMsg.innerHTML;
      result = '';
      if (infoMatch) {
        infoMatch = infoMatch.replace(/<br.*/, '');
        result = infoMatch;
      }
    }
    return result;
  }

  var sendGoldonWorld;

  function doSendGold() { // jQuery
    if (!sendGoldonWorld) {return;}
    retryAjax({
      url: 'index.php',
      data: {
        no_mobile: 1,
        cmd: 'trade',
        subcmd: 'sendgold',
        xc: window.ajaxXC,
        target_username: $('#HelperSendTo').html(),
        gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g, '')
      }
    }).done(function(data) {
      var info = infoBox(data);
      if (info === 'You successfully sent gold!' || info === '') {
        setValue('currentGoldSentTotal',
          parseInt(getValue('currentGoldSentTotal'), 10) +
          parseInt(getValue('goldAmount'), 10));
        GameData.fetch(1);
      }
    });
  }

  function injectSendGoldOnWorld() { // jQuery
    sendGoldonWorld = getValue('sendGoldonWorld');
    if (!sendGoldonWorld) {return;}
    $('#statbar-gold-tooltip-general').append(
      '<dt class="stat-gold-sendTo">Send To:</dt>' +
      '<dd id="HelperSendTo">' + getValue('goldRecipient') +
      '</dd>' +
      '<dt class="stat-gold-sendAmt">Amount:</dt>' +
      '<dd id="HelperSendAmt">' + getValue('goldAmount')
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>' +
      '<dt class="stat-gold-sendTo">Send?</dt>' +
      '<dd><input id="HelperSendGold" value="Send!" class="custombutton" ' +
      'type="submit"><input type="hidden" id="xc" value=""</dd>' +
      '<dt class="stat-gold-sendTotal">Total Sent:</dt>' +
      '<dd id="HelperSendTotal">' +
        getValue('currentGoldSentTotal')
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') +
        '</dd>');
    $('#HelperSendGold').click(doSendGold);
  }

  function updateGoldValue(data) {
    $('#HelperSendTotal')
      .html(getValue('currentGoldSentTotal')
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
    if (parseInt(data.player.gold, 10) > getValue('goldAmount')) {
      $('#statbar-gold').css('background-color', 'red');
    } else {
      $('#statbar-gold').css('background-color', 'inherit');
    }
  }

  function updateSendGoldOnWorld(data) { // jQuery
    if (data.player && sendGoldonWorld) {
      updateGoldValue(data);
    }
  }

  function getTarget$1(doc) {
    if (doc instanceof HTMLDocument) {return doc;}
    return document;
  }

  function patchXPath(xpath) {
    if (xpath.indexOf('/') === 0) {
      return '.' + xpath;
      // TODO this is likely to be bad
      // this is a chrome fix - needs a .// for xpath
      // where as firefox can function without it.
      // firefox still works with .//
    }
    return xpath;
  }

  function findNodes(xpath, doc) {
    var _xpath = patchXPath(xpath);
    var nodes = [];
    var target;
    // We may have passed in a HTMLDocument object as the context
    // See createDocument with DOMParser
    // This only matters in Firefox. evaluate will fail silently if
    // the context is not part of the calling object.
    var _doc = fallback(doc, document);
    target = getTarget$1(_doc);
    var findQ = target.evaluate(_xpath, _doc, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (findQ.snapshotLength === 0) {return null;}
    for (var i = 0; i < findQ.snapshotLength; i += 1) {
      nodes.push(findQ.snapshotItem(i));
    }
    return nodes;
  }

  function findNode(xpath, doc) {
    var nodes = findNodes(xpath, doc);
    if (!nodes) {return null;}
    return nodes[0];
  }

  var expandMenuOnKeyPress;

  function movePage(dir) { // Legacy
    var dirButton = findNode('//input[@value="' + dir + '"]');
    if (!dirButton) {return;}
    var url = dirButton.getAttribute('onClick');
    url = url.replace(/^[^']*'/m, '').replace(/';$/m, '');
    location.href = url;
  }

  function changeCombatSet(responseText, itemIndex) { // jQuery.min
    var doc = createDocument(responseText);

    var cbsSelect = doc.querySelector(
      '#profileCombatSetDiv select[name="combatSetId"]');

    // find the combat set id value
    var allItems = cbsSelect.getElementsByTagName('option');
    if (itemIndex >= allItems.length) {return;}
    var cbsIndex = allItems[itemIndex].value;

    retryAjax({
      url: 'index.php',
      data: {
        no_mobile: 1,
        cmd: 'profile',
        subcmd: 'managecombatset',
        combatSetId: cbsIndex,
        submit: 'Use'
      },
      success: function() {
        if (expandMenuOnKeyPress) {
          localStorage.setItem('hcs.nav.openIndex', '2');
        }
        location.href = 'index.php?cmd=profile';
      }
    });
  }

  function doRepair() {
    // do not use repair link for new map
    if (!getElementById('worldPage')) {
      location.href = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
    }
  }

  function createGroup() {
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    location.href =
      'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
  }

  function logPage() {
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=log';
  }

  function gotoGuild() {
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    location.href = 'index.php?cmd=guild&subcmd=manage';
  }

  function joinAllGroup() {
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    if (!getValue('enableMaxGroupSizeToJoin')) {
      location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
    } else {
      location.href =
        'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize';
    }
  }

  function backpack() {
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=profile&subcmd=dropitems';
  }

  function fastWearMgr() {
    if (!('dialogIsClosed' in calf) || calf.dialogIsClosed()) {
      sendEvent('keyHandler', 'insertQuickWear');
      jQueryDialog(insertQuickWear);
    }
  }

  function profile() {
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=profile';
  }

  function combatSetKey(itemIndex) {
    retryAjax('index.php?no_mobile=1&cmd=profile').done(function(data) {
      changeCombatSet(data, itemIndex);
    });
  }

  var keyDict = {
    '33': {fn: combatSetKey, arg: 1}, // Shift+1
    '64': {fn: combatSetKey, arg: 2}, // Shift+2
    '34': {fn: combatSetKey, arg: 2}, // Shift+2 -- for UK keyboards, I think
    '35': {fn: combatSetKey, arg: 3}, // Shift+3
    '36': {fn: combatSetKey, arg: 4}, // Shift+4
    '37': {fn: combatSetKey, arg: 5}, // Shift+5
    '94': {fn: combatSetKey, arg: 6}, // Shift+6
    '38': {fn: combatSetKey, arg: 7}, // Shift+7
    '42': {fn: combatSetKey, arg: 8}, // Shift+8
    '40': {fn: combatSetKey, arg: 9}, // Shift+9
    '60': {fn: movePage, arg: '<'}, // move to prev page [<]
    '62': {fn: movePage, arg: '>'}, // move to next page [>]
    '71': {fn: createGroup}, // create group [G]
    '76': {fn: logPage}, // Log Page [L]
    '98': {fn: backpack}, // backpack [b]
    '103': {fn: gotoGuild}, // go to guild [g]
    '106': {fn: joinAllGroup}, // join all group [j]
    '108': {fn: logPage}, // Log Page [l]
    '112': {fn: profile}, // profile [p]
    '114': {fn: doRepair}, // repair [r]
    '118': {fn: fastWearMgr}, // fast wear manager [v]
    '121': {fn: doSendGold}, // fast send gold [y]
    '163': {fn: combatSetKey, arg: 3}, // Shift+3 -- for UK keyboards
  };

  function handleKey(r) {
    if (r in keyDict) {
      keyDict[r].fn(keyDict[r].arg);
    }
  }

  var bailOut = [
    function(evt) {
      return evt.target.tagName !== 'HTML' && evt.target.tagName !== 'BODY';
    },
    /* ignore control, alt and meta keys
    (I think meta is the command key in Macintoshes) */
    function(evt) {return evt.ctrlKey;},
    function(evt) {return evt.metaKey;},
    function(evt) {return evt.altKey;}
  ];

  function keyPress(evt) {
    for (var i = 0; i < bailOut.length; i += 1) {
      if (bailOut[i](evt)) {return;}
    }
    handleKey(evt.charCode);
  }

  function replaceKeyHandler() {
    expandMenuOnKeyPress = getValue('expandMenuOnKeyPress');
    document.onkeypress = keyPress;
  }

  function scoutTowerLink() {
    var spoils = getElementById('minibox-spoilsofwar');
    if (spoils) {
      var parent = spoils.children[1].children[0];
      insertHtmlBeforeEnd(parent, '&nbsp;' +
        '<a href="index.php?cmd=guild&subcmd=scouttower" ' +
        'class="tip-static" data-tipped="View Scout Report">' +
        '<img id="fshScoutTower" ' +
        'src="https://cdn.fallensword.com/structures/27.gif"></a>');
    }
  }

  // import failStub from './failStub';

  function superelite() {
    return callApp({cmd: 'superelite'});
    // return failStub();
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

  function gotSe(data) { // jQuery.min
    var serverTime = Number(data.t.split(' ')[1]);
    if (!oldLog) {oldLog = {lastUpdate: 0, se: {}};}
    oldLog.lastUpdate = serverTime;
    var resultAry = data.r;
    if (resultAry) {
      resultAry.forEach(function(element) {
        var myTime = serverTime - element.time;
        var mobName = element.creature.name.replace(' (Super Elite)', '');
        if (!oldLog.se[mobName] || oldLog.se[mobName] < myTime) {
          oldLog.se[mobName] = myTime;
        }
      });
      setForage('fsh_seLog', oldLog);
    }
  }

  function getSeLog() { // jQuery.min
    return superelite().done(gotSe);
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
    return getForage('fsh_seLog').done(gotLog);
  }

  function shouldLog() {
    return jQueryPresent() && calf.enableSeTracker && calf.cmd !== 'superelite';
  }

  function seLog() { // jQuery.min
    if (shouldLog()) {
      getFshSeLog().done(setupBackgroundCheck);
    }
  }

  function statbarWrapper(href, id) {
    var myWrapper = createAnchor({href: href});
    var character = getElementById(id);
    var statWrapper = character.parentNode;
    insertElement(myWrapper, character);
    statWrapper.insertBefore(myWrapper, statWrapper.firstChild);
    myWrapper.addEventListener('click', function(evt) {
      evt.stopPropagation();
    }, true);
  }

  function statbar() {
    statbarWrapper('index.php?cmd=profile', 'statbar-character');
    statbarWrapper('index.php?cmd=points&subcmd=reserve', 'statbar-stamina');
    statbarWrapper('index.php?cmd=blacksmith', 'statbar-equipment');
    statbarWrapper('index.php?cmd=profile&subcmd=dropitems', 'statbar-inventory');
    statbarWrapper('index.php?cmd=points', 'statbar-fsp');
    statbarWrapper('index.php?cmd=bank', 'statbar-gold');
  }

  function hideElement(el) {
    el.classList.add('fshHide');
  }

  function hideNodeList(nodeList) {
    Array.prototype.forEach.call(nodeList, hideElement);
  }

  function hideQuerySelectorAll(parent, selector) { // Native - probably wrong
    hideNodeList(parent.querySelectorAll(selector));
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

  function guildColour(el) {
    contactColour(el, {
      l1: 'fshGreen',
      l2: 'fshWhite',
      l3: 'fshGrey'
    });
  }

  function alliesColour(el) {
    contactColour(el, {
      l1: 'fshDodgerBlue',
      l2: 'fshLightSkyBlue',
      l3: 'fshPowderBlue'
    });
  }

  var hideBtn = [
    {
      condition: function() {return calf.hideGuildInfoTrade;},
      guildSelector: '#guild-minibox-action-trade',
      allySelector: '#online-allies-action-trade'
    },
    {
      condition: function() {return calf.hideGuildInfoSecureTrade;},
      guildSelector: '#guild-minibox-action-secure-trade',
      allySelector: '#online-allies-action-secure-trade'
    },
    {
      condition: function() {return calf.hideGuildInfoBuff;},
      guildSelector: '#guild-minibox-action-quickbuff',
      allySelector: '#online-allies-action-quickbuff'
    },
    {
      condition: function() {return calf.hideGuildInfoMessage;},
      guildSelector: '#guild-minibox-action-send-message',
      allySelector: '#online-allies-action-send-message'
    }
  ];

  function doHideBtn(context, selector) {
    hideBtn.forEach(function(el) {
      if (el.condition()) {
        hideQuerySelectorAll(context, el[selector]);
      }
    });
  }

  function addGuildInfoWidgets() {
    var guildMembrList = getElementById('minibox-guild-members-list');
    if (!guildMembrList) {return;} // list exists
    // hide guild info links
    doHideBtn(guildMembrList, 'guildSelector');
    if (calf.hideBuffSelected) {
      hideNodeList(
        guildMembrList.getElementsByClassName('guild-buff-check-on'));
      getElementById('guild-quick-buff').classList.add('fshHide');
    }
    // add coloring for offline time
    Array.prototype.forEach.call(
      guildMembrList.getElementsByClassName('player-name'), guildColour);
    Array.prototype.forEach.call(
      document.querySelectorAll('#pCR h4'),
      function(el) {
        if (el.textContent !== 'Chat') {return;}
        el.innerHTML = '<a href="index.php?cmd=guild&subcmd=chat">' +
          el.textContent + '</a>';
      }
    );
  }

  function addOnlineAlliesWidgets() {
    var onlineAlliesList = getElementById('minibox-allies-list');
    if (!onlineAlliesList) {return;}
    doHideBtn(onlineAlliesList, 'allySelector');
    if (calf.hideBuffSelected) {
      hideNodeList(
        onlineAlliesList.getElementsByClassName('ally-buff-check-on'));
      getElementById('ally-quick-buff').classList.add('fshHide');
    }
    // add coloring for offline time
    Array.prototype.forEach.call(
      onlineAlliesList.getElementsByClassName('player-name'), alliesColour);
  }

  function padZ(n) {
    var ret = n.toString();
    if (n < 10) {ret = '0' + ret;}
    return ret;
  }

  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function formatShortDate(aDate) {
    var yyyy = aDate.getFullYear();
    var dd = padZ(aDate.getDate());
    var ddd = days[aDate.getDay()];
    var month = months[aDate.getMonth()];
    var hh = padZ(aDate.getHours());
    var mm = padZ(aDate.getMinutes());
    return hh + ':' + mm + ' ' + ddd + ' ' + dd + '/' + month + '/' + yyyy;
  }

  function timeBox(nextGainTime, hrsToGo) {
    var nextGain = /([0-9]+)m ([0-9]+)s/.exec(nextGainTime);
    if (!nextGain) {return;}
    return '<dd>' +
      formatShortDate(new Date(now +
      (hrsToGo * 60 * 60 + parseInt(nextGain[1], 10) * 60 +
      parseInt(nextGain[2], 10)) * 1000)) + '</dd>';
  }

  function injectStaminaCalculator() {
    var nextGain = document.getElementsByClassName('stat-stamina-nextGain');
    if (nextGain.length === 0) {return;}
    var staminaMouseover =
      getElementById('statbar-stamina-tooltip-stamina');
    var stamVals = /([,0-9]+)\s\/\s([,0-9]+)/.exec(
      staminaMouseover.getElementsByClassName('stat-name')[0]
        .nextElementSibling.textContent
    );
    insertHtmlBeforeEnd(staminaMouseover,
      '<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>' +
      timeBox(
        nextGain[0].nextElementSibling.textContent,
        // get the max hours to still be inside stamina maximum
        Math.floor(
          (intValue(stamVals[2]) -
          intValue(stamVals[1])) /
          intValue(
            document.getElementsByClassName('stat-stamina-gainPerHour')[0]
              .nextElementSibling.textContent
          )
        )
      )
    );
  }

  function injectLevelupCalculator() {
    var nextGain = document.getElementsByClassName('stat-xp-nextGain');
    if (nextGain.length === 0) {return;}
    insertHtmlBeforeEnd(getElementById('statbar-level-tooltip-general'),
      '<dt class="stat-xp-nextLevel">Next Level At</dt>' +
      timeBox(
        nextGain[0].nextElementSibling.textContent,
        Math.ceil(
          intValue(
            document.getElementsByClassName('stat-xp-remaining')[0]
              .nextElementSibling.textContent
          ) /
          intValue(
            document.getElementsByClassName('stat-xp-gainPerHour')[0]
              .nextElementSibling.textContent
          )
        )
      )
    );
  }

  function gameHelpLink() {
    var nodeList = document.querySelectorAll('#pCR h3');
    Array.prototype.forEach.call(nodeList, function(el) {
      if (el.textContent === 'Game Help') {
        el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
      }
    });
  }

  function getEnvVars() {
    calf.enableAllyOnlineList = getValue('enableAllyOnlineList');
    calf.enableEnemyOnlineList = getValue('enableEnemyOnlineList');
    calf.enableGuildInfoWidgets = getValue('enableGuildInfoWidgets');
    calf.enableOnlineAlliesWidgets =
      getValue('enableOnlineAlliesWidgets');
    calf.enableSeTracker = getValue('enableSeTracker');
    calf.hideGuildInfoTrade = getValue('hideGuildInfoTrade');
    calf.hideGuildInfoSecureTrade = getValue('hideGuildInfoSecureTrade');
    calf.hideGuildInfoBuff = getValue('hideGuildInfoBuff');
    calf.hideGuildInfoMessage = getValue('hideGuildInfoMessage');
    calf.hideBuffSelected = getValue('hideBuffSelected');
    calf.enableTempleAlert = getValue('enableTempleAlert');
    calf.enableUpgradeAlert = getValue('enableUpgradeAlert');
    calf.enableComposingAlert = getValue('enableComposingAlert');
    calf.enableActiveBountyList = getValue('enableActiveBountyList');
    calf.enableWantedList = getValue('enableWantedList');
    calf.wantedGuildMembers = getValue('wantedGuildMembers');
    calf.allyEnemyOnlineRefreshTime =
      getValue('allyEnemyOnlineRefreshTime') * 1000;
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

  function notHuntMode() {
    if (calf.huntingMode) {return;}
    // move boxes in opposite order that you want them to appear.
    doMoveGuildList();
    doMoveAllyList();
    doMoveDailyQuest();
    doMoveFsBox();

    getEnvVars();
    conditional();

    add(3, navMenu);
    add(3, statbar);

    add(3, injectStaminaCalculator);
    add(3, injectLevelupCalculator);

    add(3, injectMenu);

    if (getValue('fsboxlog')) {
      add(3, injectFSBoxLog);
    }
    add(3, interceptQuickBuff);

    add(3, injectJoinAllLink);
    add(3, changeGuildLogHREF);
    add(3, injectHomePageTwoLink);

    add(3, injectQuickMsgDialogJQ);

    add(3, injectServerNode);
    add(3, scoutTowerLink);

    add(4, guildActivity);
    add(4, seLog);
  }

  function prepareEnv() {
    if (getValue('gameHelpLink')) {
      add(3, gameHelpLink);
    }
    calf.huntingMode = getValue('huntingMode');
    add(3, replaceKeyHandler);
    notHuntMode();
    if (!getValue('hideHelperMenu')) {
      add(3, injectHelperMenu);
    }
  }

  function lookForHcsData() {
    var hcsData = getElementById('html');
    if (hcsData && jsonParse(hcsData.dataset.hcs)['new-ui']) {
      prepareEnv();
    }
  }

  function allowBack() {
    document.querySelector('input[type="submit"]')
      .addEventListener('click', function(evt) {
        evt.preventDefault();
        var url = 'index.php?';
        Array.prototype.forEach.call(
          document.querySelectorAll('input:not([type="submit"])' +
            ':not([type="checkbox"]), select, input[type="checkbox"]:checked'),
          function(e) {url += '&' + e.name + '=' + e.value;});
        window.location = url;
      });
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
  var tableOpts = {
    paging: false,
    info: false,
    order: [[3, 'asc'], [0, 'asc']],
    columnDefs: [
      {orderable: false, targets: [9]}
    ],
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

  function dontPost(e) { // jQuery
    e.preventDefault();
    var self = $(e.target);
    var pvpId = self.prev().val();
    var subcmd = self.prev().prev().val();
    window.location = 'index.php?cmd=arena&subcmd=' + subcmd +
      '&pvp_id=' + pvpId;
  }

  function gotoPage(pageId) {
    window.location = 'index.php?cmd=arena&subcmd=completed&page=' +
      pageId;
  }

  function overrideButtons() {
    var prevButton = $('#pCC input[value="<"]');
    var nextButton = $('#pCC input[value=">"]');
    if (prevButton.length === 1) {
      var startButton = $('<input value="<<" type="button">');
      prevButton.before(startButton).before('&nbsp;');
      startButton.click(function() {gotoPage(1);});
    }
    if (nextButton.length === 1) {
      var lastPage = $('#pCC input[value="Go"]').closest('td').prev().text()
        .replace(/\D/g, '');
      var finishButton = $('<input value=">>" type="button">');
      nextButton.after(finishButton).after('&nbsp;');
      finishButton.click(function() {gotoPage(lastPage);});
    }
    $('#pCC input[value="View"]').click(dontPost);
  }

  function completedArenas() { // jQuery
    if (jQueryPresent()) {overrideButtons();}
  }

  function rekeyInventory(data) {
    data.items = data.items.reduce(function(prev, curr) {
      if (curr.is_in_st) {prev.fshHasST = true;}
      prev[curr.inv_id] = curr;
      return prev;
    }, {});
    return data;
  }

  function getInventoryById() {
    return getInventory().pipe(rekeyInventory);
  }

  var inv;
  var target;

  function selectPerf() {
    var items = getElementById(target + '-items')
      .getElementsByClassName('selectable-item');
    if (items.length === 0) {return;}
    Array.prototype.forEach.call(items, function(e) {
      var thisItem = e.id.replace(target + '-item-', '');
      if (inv[thisItem].craft === 'Perfect') {e.click();}
    });
  }

  function drawFilters(data) {
    inv = data.items;
    var buttonDiv = createDiv({className: 'fshAC'});
    insertHtmlBeforeEnd(buttonDiv,
      '<button class="fshBl">Perfect</button>');
    insertElement(pCC, buttonDiv);
    buttonDiv.addEventListener('click', selectPerf);
  }

  function perfFilter(loc) { // jQuery.min
    if (jQueryNotPresent()) {return;}
    target = loc;
    getInventoryById().done(drawFilters);
  }

  var disableBreakdownPrompts;
  var selectedList = [];

  function disappearance(self) {return function() {self.hide();};}

  function goDown(self, disappear) {
    return function() {self.animate({height: 0}, 500, disappear);};
  }

  function fadeAway() {
    var self = $('#composingMessageContainer');
    self.animate({opacity: 0}, 500, goDown(self, disappearance(self)));
  }

  function showComposingMessage(message, bgcolor) { // jQuery
    $('#composingMessageContainer').remove();

    $('#composingMessage')
      .append(
        $('<div/>', {
          id: 'composingMessageContainer',
          width: '100%'
        })
          .append(
            $('<div/>', {id: 'composingMessageText'})
              .css({
                width: '90%',
                'text-align': 'center',
                'background-color': bgcolor,
                color: 'rgb(255, 255, 255)',
                margin: '5px auto 5px auto',
                padding: '2px'
              })
              .html(message)
          )
      );

    setTimeout(fadeAway, 5000);
  }

  function breakItems() { // jQuery.min
    return retryAjax({
      type: 'POST',
      url: 'index.php?cmd=composing&subcmd=dobreakdown',
      data: {'item_list[]': selectedList},
      dataType: 'json'
    }).done(function(response) {
      if (response.error !== 0) {
        showComposingMessage('Error: ' + response.msg, 'rgb(164, 28, 28)');
      }
      window.location = 'index.php?cmd=composing&subcmd=breakdown&m=1';
    });
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
    if (disableBreakdownPrompts &&
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
    disableBreakdownPrompts = !disableBreakdownPrompts;
    setValue('disableBreakdownPrompts', disableBreakdownPrompts);
  }

  function composingBreakdown() {
    if (jQueryNotPresent()) {return;}
    perfFilter('composing');
    disableBreakdownPrompts = getValue('disableBreakdownPrompts');
    getElementById('breakdown-selected-items').parentNode
      .addEventListener('click', breakEvt, true);
    getElementById('composing-items')
      .addEventListener('click', itemClick);
    insertHtmlBeforeEnd(pCC,
      '<table class="fshTblCenter"><tbody>' +
      simpleCheckbox('disableBreakdownPrompts') +
      '</tbody></table>');
    getElementById('disableBreakdownPrompts')
      .addEventListener('click', togglePref$1);
  }

  function makeFolderSpans$1(folders, needsWorn) {
    var wornSelector = '';
    if (needsWorn) {
      wornSelector = ' &ensp;' + beginFolderSpanElement + '-2">Worn</span>';
    }
    return beginFolderSpanElement + '0">All</span>' + wornSelector +
      ' &ensp;' + beginFolderSpanElement + '-1">Main</span>' +
      Object.keys(folders).reduce(function(prev, key) {
        return prev + ' &ensp;' + beginFolderSpanElement + key + '">' +
          folders[key] + '</span>';
      }, '');
  }

  var itemTable;
  var itemsAry;
  var invItems;
  var folderId = 0;
  var perfBox;

  function whichTableHasItems() {
    var allTables = pCC.lastElementChild.getElementsByTagName('table');
    if (calf.cmd === 'crafting') {
      return allTables[1];
    }
    return allTables[0];
  }

  function drawingNewItemTable() {
    if (!drawingNewItemTable.itemGrid) {
      drawingNewItemTable.itemGrid = createDiv({className: 'fshItemGrid'});
      itemsAry.forEach(function(item) {
        var itemDiv = createDiv();
        var aLink = item[0].parentNode;
        insertElement(itemDiv, aLink);
        insertElement(drawingNewItemTable.itemGrid, itemDiv);
      });
      insertElementAfterBegin(itemTable.parentNode, drawingNewItemTable.itemGrid);
      itemTable.classList.add('fshHide');
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

  function enhanceWarehouse() {
    itemsAry.forEach(function(item) {
      var invItem = invItems[item[1]];
      item.push(getFolderId(invItem), invItem.craft);
    });
  }

  function doFolderButtons(folders) {
    var inject = itemTable.parentNode.parentNode
      .previousElementSibling.firstElementChild;
    inject.classList.add('fshCenter');
    inject.addEventListener('click', doHideFolders);
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
    perfBox.addEventListener('change', reDrawGrid);
    insertElement(perfLabel, perfBox);
    insertHtmlBeforeEnd(inject, ' &ensp;');
    insertElement(inject, perfLabel);
  }

  function inventory(data) {
    if (data.items && itemTable) {
      invItems = data.items;
      add(4, enhanceWarehouse);
      var inject = doFolderButtons(data.folders);
      doPerfSwitch(inject);
    }
  }

  function getItems() {
    itemTable = whichTableHasItems();
    var imgList = itemTable.getElementsByTagName('img');
    itemsAry = Array.prototype.map.call(imgList, function(img) {
      var tipped = img.dataset.tipped;
      var matches = tipped.match(itemRE);
      return [img, matches[2]];
    });
  }

  function craftForge() {
    if (jQueryPresent()) {
      getInventoryById().done(inventory);
      add(3, getItems);
    }
  }

  function globalQuest() {
    var topTable = pCC.getElementsByTagName('table')[3];
    for (var i = 2; i < topTable.rows.length; i += 4) {
      var aCell = topTable.rows[i].cells[1];
      aCell.innerHTML = '<a href="index.php?cmd=findplayer' +
        '&search_show_first=1&search_active=1&search_username=' +
        aCell.textContent + '">' + aCell.textContent + '</a>';
    }
  }

  var warehouse = [];
  var prefValue;
  var headerIndex;

  function collapseArt(article) {
    article.rows.forEach(function(el) {
      el.row.classList.add('fshHide');
    });
    article.open = false;
  }

  function collapseAll() {
    warehouse.forEach(function(article) {
      if (article.open) {collapseArt(article);}
    });
  }

  function expandArt(article) {
    article.rows.forEach(function(el) {
      el.row.classList.remove('fshHide');
    });
    article.open = true;
  }

  function expandAll() {
    warehouse.forEach(function(article) {
      if (!article.open) {expandArt(article);}
    });
  }

  function isHeader(el) {
    if (el.rowIndex % headerIndex === 0) {return el;}
  }

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

  function evtHdl(evt) {
    if (prefValue) {evtEnabled(evt);}
  }

  function makeHeaderClickable(row) {
    if (prefValue) {row.classList.add('fshPoint');}
  }

  function collapseDuringAnalysis(row, thisArticle) {
    if (prefValue) {
      row.classList.add('fshHide');
      thisArticle.open = false;
    } else {
      thisArticle.open = true;
    }
  }

  function hasExtraFn(extraFn, row) {
    if (isFunction(extraFn)) {extraFn(row);}
  }

  function testRowType(row, rowType, thisArticle, articleTest, extraFn) {
    if (rowType === 0) {
      thisArticle.header = row;
      makeHeaderClickable(row);
      hasExtraFn(extraFn, row);
    }
    if (articleTest(rowType)) {
      thisArticle.rows[rowType] =
        fallback(thisArticle[rowType], {});
      thisArticle.rows[rowType].row = row;
      collapseDuringAnalysis(row, thisArticle);
    }
  }

  function doTagging(articleTest, extraFn, row) {
    var rowType = row.rowIndex % headerIndex;
    var articleNo = (row.rowIndex - rowType) / headerIndex;
    warehouse[articleNo] = fallback(warehouse[articleNo], {});
    var thisArticle = warehouse[articleNo];
    thisArticle.rows = thisArticle.rows || [];
    testRowType(row, rowType, thisArticle, articleTest, extraFn);
  }

  function toggleHeaderClass() {
    warehouse.forEach(function(article) {
      article.header.classList.toggle('fshPoint');
    });
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
    getElementById(prefName)
      .addEventListener('change', togglePref$2.bind(null, prefName));
  }

  function collapse(param) {
    headerIndex = param.headInd;
    setupPref(param.prefName);
    Array.prototype.forEach.call(param.theTable.rows,
      doTagging.bind(null, param.articleTest, param.extraFn));
    param.theTable.addEventListener('click', evtHdl);
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

  function closestTable(el) {
    if (el.tagName === 'TABLE') {return el;}
    return closestTable(el.parentNode);
  }

  function translateReturnInfo(data) {
    var info = infoBox(data);
    var _r = {r: 1, m: info};
    if (info === 'Item was transferred to the guild store!') {
      _r = {r: 0, m: ''};
    }
    return _r;
  }

  function guildMailboxTake(href) {
    return retryAjax({url: href}).pipe(translateReturnInfo).done(dialog);
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
      guildMailboxTake(anchor).done(takeResult.bind(null, self));
    }
    if (self.className === 'sendLink') {
      var nodeList = pCC.getElementsByTagName('img');
      Array.prototype.forEach.call(nodeList, function(el) {el.click();});
    }
  }

  function guildMailbox() {
    if (jQueryNotPresent()) {return;}
    pCC.addEventListener('click', guildMailboxEvent);
    insertHtmlBeforeEnd(document.querySelector('#pCC td[height="25"]'),
      '<span class="sendLink">Take All</span>');
  }

  function getGuild(guildId) {
    return retryAjax({
      dataType: 'json',
      url: 'index.php',
      data: {
        cmd: 'export',
        subcmd: 'guild_members',
        guild_id: guildId
      }
    });
  }

  function addMembrListToForage(membrList) {
    getForage('fsh_membrList')
      .done(function saveMembrListInForage(data) {
        var oldMemList = data || {};
        setForage('fsh_membrList', $.extend(oldMemList, membrList));
      });
  }

  function getGuildMembers(guildId) {
    return getGuild(guildId).pipe(function membrListToHash(data) {
      var membrList = {};
      membrList[guildId] = {};
      membrList[guildId].lastUpdate = now;
      data.forEach(function memberToObject(ele) {
        membrList[guildId][ele.username] = ele;
      });
      return membrList;
    });
  }

  var testList = [
    function(guildId, membrList) {return Boolean(membrList);},
    function(guildId, membrList) {return isObject(membrList);},
    function(guildId, membrList) {return isObject(membrList[guildId]);},
    function(guildId, membrList) {
      return typeof membrList[guildId].lastUpdate === 'number';
    },
    function(guildId, membrList) {
      return membrList[guildId].lastUpdate > now - 300000;
    }
  ];

  function getMembrListFromForage(guildId, membrList) {
    if (testList.every(function(e) {return e(guildId, membrList);})) {
      return membrList;
    }
    return getGuildMembers(guildId).done(addMembrListToForage);
  }

  function guildMembers(force, guildId) {
    if (force) {
      return getGuildMembers(guildId).done(addMembrListToForage);
    }
    return getForage('fsh_membrList')
      .pipe(getMembrListFromForage.bind(null, guildId));
  }

  function setHelperMembrList(guildId, membrList) {
    calf.membrList = membrList[guildId];
    return calf.membrList;
  }

  function getMembrList(force) {
    var guildId = currentGuildId();
    return guildMembers(force, guildId)
      .pipe(setHelperMembrList.bind(null, guildId));
  }

  var newSummary = {};
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
  var membrList;
  var list;
  var data = [];

  function doTable() { // jQuery
    $(list).dataTable({
      pageLength: 25,
      lengthMenu: [[25, 50, -1], [25, 50, 'All']],
      autoWidth: false,
      columns: advisorColumns,
      stateSave: true,
      stateDuration: 0
    });
  }

  function summaryLink() {
    var updateInput = pCC.getElementsByClassName('custombutton');
    if (updateInput.length === 0) {return;}
    insertHtmlAfterEnd(updateInput[0], '<span> <a href="index.php' +
      '?cmd=guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>');
  }

  function playerName$2(f) {
    if (!membrList[f]) {return f;}
    return '<a href="index.php?cmd=profile&player_id=' +
      membrList[f].id + '">' + f + '</a>';
  }

  function playerLevel(f) {
    if (!membrList[f]) {return '';}
    return membrList[f].level;
  }

  function playerRank(f) {
    if (!membrList[f]) {return '';}
    return '<div class="fshAdvRank">' +
      membrList[f].rank_name + '</div>';
  }

  function injectAdvisorNew() {

    time('guildAdvisor.injectAdvisorNew');

    list = pCC.getElementsByTagName('TABLE')[1];
    if (!list) {return;}
    var totalRow = list.firstElementChild.lastElementChild;
    var totalCell = totalRow.firstElementChild;
    totalCell.className = 'fshRight';
    totalCell.setAttribute('colspan', '3');
    var tfoot = createTFoot();
    insertElement(tfoot, totalRow);
    list.className = 'fshXSmall hover';
    list.firstElementChild
      .removeChild(list.firstElementChild.firstElementChild);
    Array.prototype.forEach.call(list.rows, function(tr) {
      Array.prototype.forEach.call(tr.cells, function(td) {
        td.removeAttribute('bgcolor');
      });
      var tdOne = tr.cells[0];
      var username = tdOne.textContent.trim();
      tdOne.innerHTML = playerName$2(username);
      insertHtmlAfterEnd(tdOne, '<td>' + playerLevel(username) +
        '</td><td>' + playerRank(username) + '</td>');
    });
    insertElement(list, tfoot);
    add(3, doTable);
    summaryLink();

    timeEnd('guildAdvisor.injectAdvisorNew');

  }

  function returnAdvisorPage(e, response) {

    time('guildAdvisor.returnAdvisorPage' + e);

    insertHtmlBeforeEnd(list.lastElementChild.lastElementChild,
      ' day ' + e + ',');
    var doc = createDocument(response);
    var table = getElementById('pCC', doc).firstElementChild
      .firstElementChild.lastElementChild.firstElementChild.firstElementChild;
    var tr = table.rows;
    Array.prototype.forEach.call(tr, function(el) {
      var tds = el.cells;
      var member = tds[0].textContent.trim();
      if (member === 'Member') {return;}
      newSummary[member] = fallback(newSummary[member], {});
      newSummary[member].deposit =
        fallback(newSummary[member].deposit, 0) +
        intValue(tds[1].textContent);
      newSummary[member].tax = fallback(newSummary[member].tax, 0) +
        intValue(tds[2].textContent);
      newSummary[member].total = fallback(newSummary[member].total, 0) +
        intValue(tds[3].textContent);
      newSummary[member].fsp = fallback(newSummary[member].fsp, 0) +
        intValue(tds[4].textContent);
      newSummary[member].skills = fallback(newSummary[member].skills, 0) +
        intValue(tds[5].textContent);
      newSummary[member].grpCrt = fallback(newSummary[member].grpCrt, 0) +
        intValue(tds[6].textContent);
      newSummary[member].grpJoin =
        fallback(newSummary[member].grpJoin, 0) +
        intValue(tds[7].textContent);
      newSummary[member].relics = fallback(newSummary[member].relics, 0) +
        intValue(tds[8].textContent);
      newSummary[member].contrib =
        fallback(newSummary[member].contrib, 0) +
        intValue(tds[9].textContent);
    });

    timeEnd('guildAdvisor.returnAdvisorPage' + e);

  }

  function getAdvisorPage(e) { // jQuery
    return retryAjax({
      url: 'index.php',
      data: {
        no_mobile: 1,
        cmd: 'guild',
        subcmd: 'advisor',
        period: e
      }
    }).done(returnAdvisorPage.bind(null, e));
  }

  function displayAdvisor() { // jQuery

    time('guildAdvisor.displayAdvisor');

    list.className = 'fshXSmall hover';
    list.innerHTML = '<tfoot id="advTFoot"><tr><td class="fshRight" ' +
      'colspan="3">Total: </td><td><u>' +
      addCommas(newSummary['Total:'].deposit) + '</u></td><td><u>' +
      addCommas(newSummary['Total:'].tax) + '</u></td><td><u>' +
      addCommas(newSummary['Total:'].total) + '</u></td><td><u>' +
      addCommas(newSummary['Total:'].fsp) + '</u></td><td><u>' +
      addCommas(newSummary['Total:'].skills) + '</u></td><td><u>' +
      addCommas(newSummary['Total:'].grpCrt) + '</u></td><td><u>' +
      addCommas(newSummary['Total:'].grpJoin) + '</u></td><td><u>' +
      addCommas(newSummary['Total:'].relics) + '</u></td><td><u>' +
      addCommas(newSummary['Total:'].contrib) +
        '</u></td></tr></tfoot>';
    $(list).dataTable({
      data: data,
      pageLength: 25,
      lengthMenu: [[25, 50, -1], [25, 50, 'All']],
      autoWidth: false,
      columns: advisorColumns,
      stateSave: true,
      stateDuration: 0
    });

    timeEnd('guildAdvisor.displayAdvisor');

  }

  function addStats(f) {
    if (f === 'Total:') {return;}
    data.push([
      playerName$2(f),
      playerLevel(f),
      playerRank(f),
      addCommas(newSummary[f].deposit),
      addCommas(newSummary[f].tax),
      addCommas(newSummary[f].total),
      addCommas(newSummary[f].fsp),
      addCommas(newSummary[f].skills),
      addCommas(newSummary[f].grpCrt),
      addCommas(newSummary[f].grpJoin),
      addCommas(newSummary[f].relics),
      addCommas(newSummary[f].contrib),
    ]);
  }

  function addAdvisorPages() {
    Object.keys(newSummary).forEach(addStats);
    add(3, displayAdvisor);
  }

  function injectAdvisorWeekly() { // jQuery

    time('guildAdvisor.injectAdvisorWeekly');

    list = pCC.firstElementChild.firstElementChild
      .lastElementChild.firstElementChild.firstElementChild;
    if (!list) {return;}
    list.innerHTML = '<span class="fshCurveContainer fshFlex">' +
      '<span class="fshCurveEle fshCurveLbl fshOldSpinner"></span>' +
      '<span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span>' +
      '</span>';

    $.when(
      getMembrList(false)
        .done(function(response) {
          membrList = response;
        }),
      getAdvisorPage(1),
      getAdvisorPage(2),
      getAdvisorPage(3),
      getAdvisorPage(4),
      getAdvisorPage(5),
      getAdvisorPage(6),
      getAdvisorPage(7)
    ).done(function() {
      add(3, addAdvisorPages);
    });

    timeEnd('guildAdvisor.injectAdvisorWeekly');

  }

  function injectAdvisor() {
    if (jQueryNotPresent()) {return;}
    if (calf.subcmd2 === 'weekly') {
      injectAdvisorWeekly();
    } else {
      getMembrList(false).done(function(response) {
        membrList = response;
        add(3, injectAdvisorNew);
      });
    }
  }

  var tabs;
  var theTables;
  var opts;
  var oldIds;

  function levelsAreNotNaN(minLvl, maxLvl) {
    return !isNaN(minLvl) && !isNaN(maxLvl);
  }

  function changeLvls() { // jQuery
    var minLvl = parseInt($('#fshMinLvl').val(), 10);
    var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
    if (levelsAreNotNaN(minLvl, maxLvl)) {
      opts = fallback(opts, {});
      opts.minLvl = minLvl;
      opts.maxLvl = maxLvl;
      setForage('fsh_arena', opts);
      $('#arenaTypeTabs table[width="635"]').DataTable().draw();
    }
  }

  function resetLvls() { // jQuery
    opts = opts || {};
    opts.minLvl = defaults.arenaMinLvl;
    opts.maxLvl = defaults.arenaMaxLvl;
    setForage('fsh_arena', opts);
    $('#fshMinLvl').val(opts.minLvl);
    $('#fshMaxLvl').val(opts.maxLvl);
    $('#arenaTypeTabs table[width="635"]').DataTable().draw();
  }

  function hideMoves(evt) { // jQuery
    opts = opts || {};
    opts.hideMoves = evt.target.checked;
    setForage('fsh_arena', opts);
    $('.moveMax').toggle(!evt.target.checked);
  }

  function testIsNotDesc(test) {
    return test && test[1] === '_desc';
  }

  function sortHandler(evt) { // jQuery
    var self = $(evt.target).closest('td');
    var table = self.closest('table').DataTable();
    var myCol = self.index();
    var classes = self.attr('class');
    var test = /sorting([^\s]+)/.exec(classes);
    var sortOrder = 'desc';
    if (testIsNotDesc(test)) {sortOrder = 'asc';}
    if (myCol !== 3) {
      table.order([3, 'asc'], [myCol, sortOrder]).draw();
    } else {
      table.order([3, sortOrder]).draw();
    }
  }

  function hideMovesCheckbox(aTable) { // jQuery
    var fshHideMoves = $('#fshHideMoves', aTable);
    if (opts && 'hideMoves' in opts) {
      fshHideMoves.prop('checked', opts.hideMoves);
      $('.moveMax').toggle(!opts.hideMoves);
    }
    fshHideMoves.click(hideMoves);
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

  function filterHeader() { // jQuery
    var theRow = $('#pCC > table > tbody > tr:nth-child(7)');
    theRow.clone().insertBefore(theRow).find('td').attr('height', '2');
    theRow.clone().insertAfter(theRow).find('td').attr('height', '1');
    var aTable = $(arenaFilter);
    hideMovesCheckbox(aTable);
    minLvlValue(aTable);
    maxLvlValue(aTable);
    $('#fshMinLvl, #fshMaxLvl', aTable).keyup(changeLvls);
    $('#fshReset', aTable).click(resetLvls);
    $('td', theRow).append(aTable);
  }

  var doLvlFilter = [
    function(min) {return !min;},
    function(min, max) {return !max;},
    function(min, max) {return isNaN(min) && isNaN(max);},
    function(min, max, level) {return isNaN(min) && level <= max;},
    function(min, max, level) {return min <= level && isNaN(max);},
    function(min, max, level) {return min <= level && level <= max;}
  ];

  function hazOpts(_settings, data) {
    var min = opts.minLvl;
    var max = opts.maxLvl;
    var level = intValue(data[7]);
    for (var i = 0; i < doLvlFilter.length; i += 1) {
      if (doLvlFilter[i](min, max, level)) {return true;}
    }
    return false;
  }

  function lvlFilter(_settings, data) {
    if (opts) {return hazOpts(_settings, data);}
    return true;
  }

  function players(cell) { // jQuery
    var matches = /(\d+)\s\/\s(\d+)/.exec(cell.text());
    if (matches) {
      cell.attr('data-order', matches[2] * 1000 + Number(matches[1]));
    }
  }

  function boolData(cell) { // jQuery
    var matches = /(\d)\.gif/.exec($('img', cell).attr('src'));
    if (matches) {cell.attr('data-order', matches[1]);}
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

  function maxMoves(cell, row) { // jQuery
    if (opts && opts.moves) {
      optsHazMoves(cell, row);
    }
  }

  function reward(cell) { // jQuery
    if (cell.children('table').length !== 1) {return;}
    cell.attr('data-order', cell.find('td').first().text().replace(/[,\s]/g, ''));
  }

  function colourNewRow(row, id) { // jQuery
    if (oldIds && !oldIds[id]) {
      row.css('background-color', '#F5F298');
      row.find('tr').css('background-color', '#F5F298');
    }
  }

  function checkTournamentId(row, cell) { // jQuery
    var matches = /#\s(\d+)/.exec(cell.text());
    if ([matches, opts, opts.id].every(isObject)) {
      opts.id[matches[1]] = matches[1];
      colourNewRow(row, matches[1]);
    }
  }

  function orderData(i, e) { // jQuery
    var row = $(e);
    var theCells = row.children();
    var cell = theCells.eq(0);
    checkTournamentId(row, cell);
    players(theCells.eq(1));
    cell = theCells.eq(2);
    cell.attr('data-order', $('td', cell).first().text().replace(/[,\s]/g, ''));
    boolData(theCells.eq(4));
    boolData(theCells.eq(5));
    boolData(theCells.eq(6));
    maxMoves(theCells.eq(8), row);
    reward(theCells.eq(8));
  }

  function redoHead(i, e) { // jQuery
    var firstRow = $('tr', e).first();
    $('a', firstRow).contents().unwrap();
    $(e).prepend($('<thead/>').append(firstRow));
  }

  function process(arena) { // jQuery

    time('arena.process');

    theTables.each(redoHead);
    opts = arena || {};
    oldIds = opts.id || {};
    opts.id = {};
    var myRows = theTables.children('tbody').children('tr');
    myRows.each(orderData);
    filterHeader();
    setForage('fsh_arena', opts);
    $.fn.dataTable.ext.search.push(lvlFilter);
    theTables.DataTable(tableOpts);
    $('td.sorting, td.sorting_asc, td.sorting_desc', tabs).off('click');
    $('div.dataTables_filter').hide();
    tabs.on('click', 'td.sorting, td.sorting_asc, td.sorting_desc', sortHandler);
    tabs.on('click', 'input.custombutton[type="submit"]', dontPost);

    timeEnd('arena.process');

  }

  function injectArena() { // jQuery
    if (jQueryNotPresent()) {return;}
    tabs = $('#arenaTypeTabs');
    if (tabs.length !== 1) {return;} // Join error screen
    theTables = $('table[width="635"]', tabs);
    getForage('fsh_arena').done(process);
  }

  function buyitem(item) {
    return callApp({
      cmd: 'potionbazaar',
      subcmd: 'buyitem',
      item_id: item
    });
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

  function select(evt) {
    var target = evt.target;
    if (!target.classList.contains('bazaarButton')) {return;}
    var theValue = testBuyAmount();
    if (!theValue) {return;}
    getElementById('quantity').textContent = theValue;
    ItemId = target.getAttribute('itemid');
    getElementById('fshBazaarWarning').removeAttribute('class');
    var dupNode = target.cloneNode(false);
    dupNode.className = 'bazaarSelected tip-dynamic';
    var selected = getElementById('selectedItem');
    selected.innerHTML = '';
    insertElement(selected, dupNode);
  }

  function quantity() {
    var theValue = testBuyAmount();
    if (theValue) {
      getElementById('quantity').textContent = theValue;
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
    var buyAmount = getElementById('quantity').textContent;
    getElementById('buyResultLabel').textContent =
      'Buying ' + buyAmount + ' items';
    for (var i = 0; i < buyAmount; i += 1) {
      buyitem(ItemId).done(done);
    }
  }

  function injectBazaar() { // TODO stop using getElementById
    if (jQueryNotPresent()) {return;}
    var pbImg = pCC.getElementsByTagName('IMG')[0];
    pbImg.className = 'fshFloatLeft';
    var potions = pCC.getElementsByTagName('A');
    Array.prototype.forEach.call(potions, function(el, i) {
      var item = el.firstElementChild;
      var tipped = item.dataset.tipped;
      bazaarTable = bazaarTable
        .replace('@' + i + '@', bazaarItem)
        .replace('@src@', item.getAttribute('src'))
        .replace('@itemid@', tipped.match(/\?item_id=(\d+)/)[1])
        .replace('@tipped@', tipped);
    });
    bazaarTable = bazaarTable.replace(/@\d@/g, '');
    insertHtmlBeforeEnd(pbImg.parentNode, bazaarTable);
    getElementById('fshBazaar').addEventListener('click', select);
    getElementById('buy_amount').addEventListener('input', quantity);
    getElementById('fshBuy').addEventListener('click', buy);
  }

  var buffCost = {count: 0, buffs: {}};
  var numRE = /[^a-zA-Z0-9.,+\- ]/g;
  var priceRE =
    /([+-]{0,1}[.\d]+ *k)|([+-]{0,1}[.\d]+ *fsp)|([+-]{0,1}[.\d]+ *stam)/;

  function profileBuyBuffsEvent() {
    if (calf.subcmd === '-') {sendEvent('profile', 'formatBuffsToBuy');}
  }

  function getTargetPlayer() {
    var targetPlayer = pCC
      .getElementsByTagName('h1');
    if (targetPlayer.length !== 0) {
      targetPlayer = targetPlayer[0].textContent;
    } else {
      targetPlayer = playerName();
    }
    return targetPlayer;
  }

  function formatBuffsToBuy() { // Legacy
    profileBuyBuffsEvent();
    var targetPlayer = getTargetPlayer();
    var buffsToBuy = Object.keys(buffCost.buffs).join(', ');
    var greetingText = getValue('buyBuffsGreeting').trim();
    var hasBuffTag = greetingText.indexOf('{buffs}') !== -1;
    var hasCostTag = greetingText.indexOf('{cost}') !== -1;
    greetingText = greetingText.replace(/{playername}/g, targetPlayer);
    if (!hasBuffTag) {
      greetingText += ' ' + buffsToBuy;
    } else if (!hasCostTag) {
      greetingText = greetingText
        .replace(/{buffs}/g, '`~' + buffsToBuy + '~`');
    } else {
      greetingText = greetingText
        .replace(/{buffs}/g, '`~' + buffsToBuy + '~`')
        .replace(/{cost}/g, buffCost.buffCostTotalText);
    }
    window.openQuickMsgDialog(targetPlayer, greetingText, '');
  }

  function getBuffsToBuy() { // Legacy
    if (buffCost.count > 0) {formatBuffsToBuy();}
  }

  var costFormatter = [
    {
      condition: function(total) {
        return total.fsp > 0;
      },
      result: function(total) {
        return String(Math.round(total.fsp * 100) / 100) + ' FSP';
      }
    },
    {
      condition: function(total) {
        return total.fsp > 0 && total.k > 0;
      },
      result: function() {
        return ' and ';
      }
    },
    {
      condition: function(total) {
        return total.k > 0;
      },
      result: function(total) {
        return total.k + ' k';
      }
    },
    {
      condition: function(total) {
        return total.stam > 0 && (total.fsp > 0 || total.k > 0);
      },
      result: function() {
        return ' and ';
      }
    },
    {
      condition: function(total) {
        return total.stam > 0;
      },
      result: function(total) {
        return total.stam + ' Stam(' +
          String(Math.round(total.stam / 25 * 10) / 10) + 'fsp)';
      }
    },
    {
      condition: function(total) {
        return total.unknown > 0;
      },
      result: function(total) {
        return ' (' + total.unknown + ' buff(s) with unknown cost)';
      }
    }
  ];

  function formatCost(total) {
    return costFormatter.reduce(function(prev, el) {
      var ret = prev;
      if (el.condition(total)) {
        ret += el.result(total);
      }
      return ret;
    }, '');
  }

  function hazBuffs() { // Legacy
    var total = {k: 0, fsp: 0, stam: 0, unknown: 0};
    var html = 'This is an estimated cost based on how the script finds ' +
      'the cost associated with buffs from viewing bio.' +
      'It can be incorrect, please use with discretion.<br><hr>' +
      '<table border=0>';

    Object.keys(buffCost.buffs).forEach(function(buff) {
      total[buffCost.buffs[buff][1]] += buffCost.buffs[buff][0];
      html += '<tr><td>' + buff + '</td><td>: ' + buffCost.buffs[buff][0] +
        buffCost.buffs[buff][1] + '</td></tr>';
    });

    var totalText = formatCost(total);

    html += '</table><b>Total: ' + totalText + '</b>';
    getElementById('buffCost').innerHTML = '<br/><span ' +
      'class="tip-static" data-tipped="' + html + '">Estimated Cost: <b>' +
      totalText + '</b></span>';
    buffCost.buffCostTotalText = totalText;
  }

  function updateBuffCost() { // Legacy
    if (buffCost.count > 0) {
      hazBuffs();
    } else {
      getElementById('buffCost').innerHTML = '';
      buffCost.buffCostTotalText = '';
    }
  }

  function priceUnit(price) {
    if (price[0].indexOf('k') > 0) {
      return 'k';
    }
    if (price[0].indexOf('f') > 0) {
      return 'fsp';
    }
    return 'stam';
  }

  function thisLine(node) {
    return node && node.nodeName.toLowerCase() !== 'br';
  }

  function priceBeforeName(buffNameNode, price) {
    if (!price) { // some players have prices BEFORE the buff names
      var newtext;
      var text = '';
      var node = buffNameNode;
      while (thisLine(node)) {
        newtext = node.textContent;
        node = node.previousSibling;
        text = newtext + text;
      }
      return text.replace(numRE, '').toLowerCase().match(priceRE);
    }
    return price;
  }

  function getBuffCost(buffNameNode) {
    var node = buffNameNode;
    var buffName = node.textContent;
    var newtext;
    var text = '';
    // get the whole line from the buff name towards the end (even after
    // the ',', in case of 'AL, Lib, Mer: 10k each'
    while (thisLine(node)) {
      newtext = node.textContent;
      node = node.nextSibling;
      text += newtext;
    }
    var price = text.replace(numRE, '').toLowerCase().match(priceRE);
    price = priceBeforeName(buffNameNode, price);
    var type;
    var cost;
    if (price) {
      type = priceUnit(price);
      cost = price[0].match(/([+-]{0,1}[.\d]+)/)[0];
    } else {
      type = 'unknown';
      cost = '1';
    }
    buffCost.buffs[buffName] = [parseFloat(cost), type];
    buffCost.count += 1;
  }

  function toggleBuffsToBuy(evt) { // Legacy
    // This is also called by bio preview
    var buffNameNode = evt.target;
    while (buffNameNode.tagName.toLowerCase() !== 'span') {
      buffNameNode = buffNameNode.parentNode;
    }
    var node = buffNameNode;
    var selected = node.classList.contains('fshBlue');
    node.classList.toggle('fshBlue');
    node.classList.toggle('fshYellow');
    var buffName = node.textContent;
    if (selected) {
      getBuffCost(buffNameNode);
    } else {
      buffCost.count -= 1;
      delete buffCost.buffs[buffName];
    }
    updateBuffCost();
  }

  function getBuffNameNode(e) {
    var buffNameNode = e.target;
    while (buffNameNode.tagName &&
        buffNameNode.tagName.toLowerCase() !== 'span') {
      buffNameNode = buffNameNode.parentNode;
    }
    return buffNameNode;
  }

  function isBuffLink(buffNameNode) {
    return buffNameNode.classList &&
      buffNameNode.classList.contains('buffLink');
  }

  function bioEvtHdl(e) {
    var buffNameNode = getBuffNameNode(e);
    if (isBuffLink(buffNameNode)) {
      toggleBuffsToBuy(e);
    } else if (e.target.id === 'fshSendBuffMsg') {
      getBuffsToBuy(e);
    }
  }

  function insertTextBeforeEnd(parent, text) {
    insertHtmlBeforeEnd(parent, text);
  }

  function renderBio(_bioContents) {
    var bioContents = _bioContents.replace(/\{b\}/g, '`~')
      .replace(/\{\/b\}/g, '~`');
    var buffs = bioContents.match(/`~([^~]|~(?!`))*~`/g);
    if (!buffs) {return _bioContents;}
    buffs.forEach(function(buff, i) {
      var fullName = buff.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '');
      var cbString = '<span id="fshBuff' + i + '" class="buffLink fshBlue">' +
        fullName + '</span>';
      bioContents = bioContents.replace(buff, cbString);
    });
    if (bioContents.indexOf('[cmd]') < 0) {bioContents += '[cmd]';}
    bioContents = bioContents.replace('[cmd]',
      '<br><input id="fshSendBuffMsg" ' +
      'class="custombutton" type="button" value="Ask For Buffs">' +
      '<span id="buffCost" class="fshRed"></span>');
    return bioContents;
  }

  var bioEditLines;
  var textArea$1;
  var previewArea;
  var theBox;

  function convertTextToHtml(inputText) {
    var ret = inputText
      .replace(/</g, '&lt')
      .replace(/>/g, '&gt')
      .replace(/\n/g, '<br>')
      .replace(/\[(\/?)([biu])\]/g, '<$1$2>')
      .replace(/\\\\/g, '&#92')
      .replace(/\\/g, '');
    if (calf.cmd === 'guild') {
      ret = ret
        .replace(/\[(\/?)block\]/g, '<$1blockquote>')
        .replace(/\[list\]/g, '<ul class="list">')
        .replace(/\[\/list\]/g, '</ul>')
        .replace(/\[\*\](.*?)<br>/g, '<li>$1</li>');
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
      bioEditLines = boxVal;
      setValue('bioEditLines', boxVal);
      textArea$1.rows = bioEditLines;
    }
  }

  function bioHeight() {
    var bioEditLinesDiv = createDiv({innerHTML: '<br>Display '});
    theBox = createInput({min: 1, max: 99, type: 'number', value: bioEditLines});
    insertElement(bioEditLinesDiv, theBox);
    insertTextBeforeEnd(bioEditLinesDiv, ' Lines ');
    var saveLines = createInput({
      className: 'custombutton',
      value: 'Update Rows To Show',
      type: 'button'
    });
    saveLines.addEventListener('click', changeHeight);
    insertElement(bioEditLinesDiv, saveLines);
    insertElement(pCC, bioEditLinesDiv);
  }

  function updateBioCharacters() {
    var bioContents = convertTextToHtml(textArea$1.value);
    bioContents = renderBio(bioContents);
    previewArea.innerHTML = bioContents;
  }

  function injectBioWidgets() {
    bioEditLines = getValue('bioEditLines');
    textArea$1 = getElementById('textInputBox');
    bioPreview();
    bioWords();
    bioHeight();
    textArea$1.rows = bioEditLines;
    if (calf.cmd === 'profile') {
      textArea$1.parentNode.addEventListener('click', bioEvtHdl);
    }
    textArea$1.addEventListener('keyup', updateBioCharacters);
    // Force the preview area to render
    updateBioCharacters();
  }

  function addMercStat(mouseover, stat, i) {
    return stat +
      Math.round(Number(mercRE[i].exec(mouseover)[1]) * defenderMultiplier);
  }

  function addMercStats(prev, merc) {
    return prev.map(addMercStat.bind(null, merc.dataset.tipped));
  }

  function addAllMercStats(mercElements) {
    return Array.prototype.reduce.call(mercElements, addMercStats,
      [0, 0, 0, 0, 0]);
  }

  function transform(mercTotal) {
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
    var mercElements = doc.querySelectorAll('#pCC img[src*="/merc/"]');
    var mercTotal = addAllMercStats(mercElements);
    return transform(mercTotal);
  }

  function getMercStats() {
    return retryAjax(
      'index.php?no_mobile=1&cmd=guild&subcmd=mercs').pipe(parseMercStats);
  }

  function statAsNumber(el) {
    if (el) {
      return intValue(el.textContent);
    }
    return 0;
  }

  function groupViewStats(doc) {
    var attackElement = getElementById('stat-attack', doc);
    var defenseElement = getElementById('stat-defense', doc);
    var armorElement = getElementById('stat-armor', doc);
    var damageElement = getElementById('stat-damage', doc);
    var hpElement = getElementById('stat-hp', doc);
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

  var groupStats;

  function displayStat(el, groupStat, mercStat) {
    el.innerHTML = '<span class="fshBlue">' + addCommas(groupStat) + '</span>' +
      ' ( ' + addCommas(groupStat - mercStat) + ' )';
  }

  function parseMercStats$1(mercStats) {
    displayStat(groupStats.attackElement, groupStats.attack, mercStats.attack);
    displayStat(groupStats.defenseElement, groupStats.defense, mercStats.defense);
    displayStat(groupStats.armorElement, groupStats.armor, mercStats.armor);
    displayStat(groupStats.damageElement, groupStats.damage, mercStats.damage);
    displayStat(groupStats.hpElement, groupStats.hp, mercStats.hp);
  }

  function injectGroupStats() { // jQuery
    if (jQueryNotPresent()) {return;}
    groupStats = groupViewStats(document);
    if (groupStats.attackElement) {
      getMercStats().done(parseMercStats$1);
    }
  }

  function doBuffLinks(members) {
    // quick buff only supports 16
    var shortList = members.reduce(function(prev, curr, i) {
      var slot = Math.floor(i / 16);
      prev[slot] = fallback(prev[slot], []);
      prev[slot].push(curr);
      return prev;
    }, []).reduce(function(prev, curr, i) {
      var theNames = curr.join(',');
      var modifierWord = places[i];
      var li = createLi();
      var btn = createButton({
        className: 'fshBl fshBls tip-static',
        dataset: {tipped: 'Quick buff functionality from HCS only does 16'},
        textContent: 'Buff ' + modifierWord + ' 16'
      });
      btn.addEventListener('click',
        openQuickBuffByName.bind(null, theNames));
      insertElement(li, btn);
      insertElement(prev, li);
      return prev;
    }, createUl());
    return shortList;
  }

  function parseGroupStats(html) {
    var doc = createDocument(html);
    return groupViewStats(doc);
  }

  function getGroupStats(viewStats) {
    return retryAjax(viewStats).pipe(parseGroupStats);
  }

  var maxGroupSizeToJoin;

  function displayMinGroupLevel() { // jQuery
    var minGroupLevel = getValue('minGroupLevel');
    if (minGroupLevel) {
      $('#pCC > table > tbody > tr > td > table td').first()
        .append('<span style="color:blue"> ' +
        'Current Min Level Setting: ' + minGroupLevel + '</span>');
    }
  }

  function filterMercs(e) {return !e.includes('#000099');}

  function joinGroup(groupJoinURL, joinButton) { // jQuery
    return retryAjax(groupJoinURL).done(function() {
      joinButton.classList.add('fshHide');
    });
  }

  function doJoinUnderSize(prev, joinButton) { // Legacy
    var memList = joinButton.parentNode.parentNode.parentNode
      .previousSibling.previousSibling.previousSibling.previousSibling;
    var memListArrayWithMercs = memList.innerHTML.split(',');
    var memListArrayWithoutMercs = memListArrayWithMercs
      .filter(filterMercs);
    if (memListArrayWithoutMercs.length < maxGroupSizeToJoin) {
      var groupID = /javascript:confirmJoin\((\d+)\)/.exec(
        joinButton.parentNode.href)[1];
      var groupJoinURL = 'index.php?no_mobile=1&cmd=guild&subcmd=groups' +
        '&subcmd2=join&group_id=' + groupID;
      prev.push(joinGroup(groupJoinURL, joinButton));
    }
    return prev;
  }

  function joinAllGroupsUnderSize() { // Legacy
    var joinButtons = findNodes(
      '//img[contains(@src,"skin/icon_action_join.gif")]');
    if (!joinButtons) {return;}
    var prm = joinButtons.reduce(doJoinUnderSize, []);
    $.when.apply($, prm).done(function() {
      location.href = 'index.php?cmd=guild&subcmd=groups';
    });
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

  function fetchGroupData(evt) {
    evt.target.classList.add('fshHide');
    var allItems = document.querySelectorAll('#pCC a[href*="=viewstats&"]');
    Array.prototype.forEach.call(allItems, function(aLink) {
      getGroupStats(aLink.href).done(parseGroupData.bind(null, aLink));
    });
  }

  function groupButtons() { // Legacy
    var buttonElement = findNode('//td[input[@value="Join All ' +
      'Available Groups"]]');
    var enableMaxGroupSizeToJoin =
      getValue('enableMaxGroupSizeToJoin');
    if (enableMaxGroupSizeToJoin) {
      maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
      var joinAllInput = buttonElement.firstChild.nextSibling.nextSibling;
      joinAllInput.classList.add('fshHide');
      buttonElement.innerHTML += '&nbsp;<input id="joinallgroupsunder' +
        'size" type="button" value="Join All Groups < ' +
        maxGroupSizeToJoin + ' Members" class="custombutton">&nbsp;' +
        '<input id="fetchgroupstats" type="button" value="Fetch ' +
        'Group Stats" class="custombutton">';
      getElementById('joinallgroupsundersize')
        .addEventListener('click', joinAllGroupsUnderSize, true);
    } else {
      buttonElement.innerHTML += '&nbsp;<input id="fetchgroupstats" ' +
        'type="button" value="Fetch Group Stats" class="custombutton">';
    }
    getElementById('fetchgroupstats')
      .addEventListener('click', fetchGroupData);

    if (calf.subcmd2 === 'joinallgroupsundersize') {
      joinAllGroupsUnderSize();
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

  function groupLocalTime(theDateCell) { // jQuery
    var xRE = /([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/;
    var x = xRE.exec(theDateCell.text());
    var month = months.indexOf(x[3]);
    var curYear = new Date().getFullYear(); // Boundary condition
    var groupDate = new Date();
    groupDate.setUTCDate(x[2]);
    groupDate.setUTCMonth(month);
    groupDate.setUTCFullYear(curYear);
    groupDate.setUTCHours(x[4]);
    groupDate.setUTCMinutes(x[5]);
    theDateCell.append('<br><span style="color:blue; font-size:x-small">' +
      'Local: ' + groupDate.toString().substr(0, 21) + '</span>');
  }

  function getCreator(membrlist, creator) {
    if (membrlist[creator]) {
      return onlineDot({last_login: membrlist[creator].last_login}) +
        '&nbsp;<a href="' + server + 'index.php?cmd=profile&player_id=' +
        membrlist[creator].id + '"><b>' + creator + '</b></a> [' +
        membrlist[creator].level + ']';
    }
    return '<b>' + creator + '</b>';
  }

  function memberLevel(membrlist, member) {
    if (membrlist[member]) {return membrlist[member].level;}
    return 0;
  }

  function byMember(membrlist, a, b) {
    return memberLevel(membrlist, b) - memberLevel(membrlist, a);
  }

  function doGroupRow(row, membrlist) { // jQuery
    var creator = $('b', row).text();
    var td = $('td', row).first();
    td.html(getCreator(membrlist, creator));
    var td2 = $('td', row).eq(1);
    var theList = td2.html();
    var listArr = theList.split(', ');
    if (listArr.length > 1) {listArr.sort(byMember.bind(null, membrlist));}
    var buffList = listArr.filter(function(name) {
      return name !== '[none]' && name.indexOf('<font') === -1;
    });
    if (buffList.length > 0) {td.append(doBuffLinks(buffList));}
    td.append('<span class="fshXSmall">Members: ' +
      buffList.length + '</span>');
    listArr = listArr.map(function(name) {
      if (!membrlist[name]) {return name;}
      return '<a href="index.php?cmd=profile&player_id=' +
        membrlist[name].id + '">' + name + '</a>';
    });
    td2.html('<span>' + listArr.join(', ') + '</span>');
    groupLocalTime($('td', row).eq(2));
  }

  function doGroupPaint(m) { // jQuery

    time('groups.doGroupPaint');

    $('#pCC table table table tr').has('.group-action-container')
      .each(function(i, e) {
        doGroupRow(e, m);
      });

    timeEnd('groups.doGroupPaint');

  }

  function injectGroups() { // jQuery
    if (jQueryNotPresent()) {return;}
    getMembrList(false)
      .done(doGroupPaint);
    displayMinGroupLevel();
    groupButtons();
    fixTable();
  }

  function alpha$1(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) {return -1;}
    if (a.toLowerCase() > b.toLowerCase()) {return 1;}
    return 0;
  }

  function formatLocalDateTime(aDate) {
    if (Object.prototype.toString.call(aDate) === '[object Date]' &&
        !isNaN(aDate.getTime())) {
      var yyyy = aDate.getFullYear().toString();
      var mon = padZ(aDate.getMonth() + 1);
      var dd = padZ(aDate.getDate());
      var hh = padZ(aDate.getHours());
      var mm = padZ(aDate.getMinutes());
      var ss = padZ(aDate.getSeconds());
      return yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
    }
  }

  var actBody;
  var selMember;
  var tgCont;
  var memberSelect;
  var myMembers;

  function buildOptions(ourMembers) {
    return '<select name="member">' +
      '<option value="- All -" selected>- All -</option>' +
      Object.keys(ourMembers).sort(alpha$1).reduce(function(prev, member) {
        return prev + '<option value="' + member + '">' + member + '</option>';
      }, '') + '</select>';
  }

  function toText(val) {
    if (isUndefined(val)) {return '#DEF';}
    return val.toLocaleString();
  }

  function memberFilter(memberKey) {
    return selMember && selMember !== '- All -' && selMember !== memberKey;
  }

  function aMembersActivityRows(memberKey) {
    return function(inside, activity) {
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
    };
  }

  function memberRows() {
    return Object.keys(myMembers).reduce(function(outside, memberKey) {
      if (memberFilter(memberKey)) {return outside;}
      return outside +
        myMembers[memberKey].reduce(aMembersActivityRows(memberKey), '');
    }, '');
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

  function makeTg() {
    var tg = createTable({id: 'tg'});
    var hrow = tg.createTHead().insertRow(-1);
    insertHtmlBeforeEnd(hrow, '<th>Date</th>');

    var memberHead = createTh({textContent: 'Member'});
    memberSelect = createDiv();
    insertElement(memberHead, memberSelect);
    insertElement(hrow, memberHead);

    insertHtmlBeforeEnd(hrow, '<th>Level</th><th>VL</th>' +
      '<th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th>' +
      '<th>Last<br>Activity<br>(Days)</th><th>GXP</th>');

    actBody = createTBody();
    insertElement(tg, actBody);
    tg.addEventListener('change', myChange);
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

  function doSave() {
    var newData = jsonParse(ioText.value);
    setForage('fsh_guildActivity', newData)
      .done(function() {
        $('#dialog_msg').text('Update successful').dialog('open');
        initTable(newData.members);
      })
      .fail(function(err) {
        $('#dialog_msg').text(err).dialog('open');
      });
  }

  function customButton(text, fn) {
    var btn = createButton({
      className: 'custombutton',
      textContent: text
    });
    btn.addEventListener('click', fn);
    return btn;
  }

  function makeInOut() {
    io = createDiv({id: 'io', className: 'fshSpinner64'});
    ioText = createTextArea();
    ioText.setAttribute('autocapitalize', 'off');
    ioText.setAttribute('autocomplete', 'off');
    ioText.setAttribute('autocorrect', 'off');
    ioText.setAttribute('spellcheck', 'false');
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
    acttab2.removeEventListener('change', updateRawData);
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
    acttab2.addEventListener('change', updateRawData);
    insertElement(dialogPopup, acttab2);
    return dialogPopup;
  }

  function makePopup() {
    var ret = makeInnerPopup();
    var hdl = makeDragHandle();
    insertElement(ret, hdl);
    var container = createDiv({className: 'fsh-dialog-content'});
    insertElement(container, makeTg());
    insertElement(container, makeInOut());
    insertElement(ret, container);
    draggable(hdl, ret);
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

  function togglePref$3(evt) {
    if (evt.target.id === 'enableGuildActivityTracker') {
      setValue('enableGuildActivityTracker',
        !getValue('enableGuildActivityTracker'));
    }
  }

  function openDialog() {
    getForage('fsh_guildActivity').done(gotActivity$1);
    tracker.removeEventListener('change', openDialog);
    calf.dialogIsClosed = isClosed;
    addOverlay();
    makePopup();
  }

  function guildTracker() {
    var gs = document.querySelector('#pCC img.guild_openGuildStore');
    var oldTr = gs.parentNode.parentNode;
    var newTr = createTr();
    var cellOne = newTr.insertCell(-1);
    var cellTwo = newTr.insertCell(-1);
    insertElement(cellOne, gs);
    cellTwo.innerHTML = simpleCheckboxHtml('enableGuildActivityTracker') +
      '&nbsp;<label class="custombutton" for="tracker">Show</label>';
    newTr.addEventListener('change', togglePref$3);
    oldTr.parentNode.replaceChild(newTr, oldTr);
    tracker = createInput({
      id: 'tracker',
      className: 'fsh-dialog-open',
      type: 'checkbox'
    });
    tracker.addEventListener('change', openDialog);
    trDialog = createDiv({className: 'fsh-dialog'});
    insertElement(trDialog, tracker);
    document.body.addEventListener('keydown', keydownHandler);
    insertElement(document.body, trDialog);
  }

  function toggleVisibilty(evt) {
    var anItemId = evt.target.getAttribute('linkto');
    var anItem = getElementById(anItemId);
    var currentVisibility = anItem.classList.contains('fshHide');
    anItem.classList.toggle('fshHide');
    if (currentVisibility) {
      setValue(anItemId, '');
    } else {
      setValue(anItemId, 'ON');
    }
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

  function removeGuildAvyImgBorder() {
    document.querySelector('#pCC img[oldtitle$="\'s Logo"]')
      .removeAttribute('style');
  }

  function guildXPLock() {
    var xpLock = document
      .querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
    if (!xpLock) {return;}
    var xpLockmouseover = xpLock.dataset.tipped;
    var xpLockXP = getIntFromRegExp(xpLockmouseover,
      /XP Lock: <b>(\d*)/);
    var actualXP = getIntFromRegExp(xpLockmouseover,
      /XP: <b>(\d*)/);
    if (actualXP < xpLockXP) {
      insertHtmlBeforeEnd(xpLock.parentNode.nextElementSibling,
        ' (<b>' + addCommas(xpLockXP - actualXP) + '</b>)');
    }
  }

  var leftHandSideColumnTable;
  var members;
  var memCount;

  function hazConflict(conflictTable, curPage, insertHere) { // Legacy
    if (curPage === 1) {
      var newNode = insertHere.insertRow(insertHere.rows.length - 2);
      newNode.insertCell(0);
      newNode.insertCell(0);
      newNode.cells[0].innerHTML =
        '<a href="index.php?cmd=guild&subcmd=conflicts">Active Conflicts</a>';
      newNode.cells[1].innerHTML = 'Score';
    }
    for (var i = 1; i <= conflictTable.rows.length - 4; i += 2) {
      var newRow = insertHere.insertRow(insertHere.rows.length - 2);
      newRow.insertCell(0);
      newRow.insertCell(0);
      newRow.cells[0].innerHTML = conflictTable.rows[i].cells[0].innerHTML;
      newRow.cells[1].innerHTML = '<b>' + conflictTable.rows[i].cells[6]
        .innerHTML + '</b>';
    }
  }

  function activeConflicts(doc, curPage, insertHere) { // Legacy
    var conflictTable = findNode(
      '//font[contains(.,"Participants")]/ancestor::table[1]', doc);
    if (conflictTable && conflictTable.rows.length > 3) {
      hazConflict(conflictTable, curPage, insertHere);
    }
  }

  function gotConflictInfo(responseText, callback) { // Legacy
    var doc = createDocument(responseText);
    var page = findNode('//td[contains(.,"Page:")]', doc);
    var curPage = parseInt(findNode('//input[@name="page"]',
      doc).value, 10);
    var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/);
    activeConflicts(doc, curPage, callback.node);
    if (maxPage && parseInt(maxPage[1], 10) > curPage) {
      retryAjax('index.php?no_mobile=1&cmd=guild&subcmd=conflicts&page=' +
        (curPage + 1).toString()
      ).done(function(html) {
        gotConflictInfo(html, {node: callback.node});
      });
    }
  }

  function conflictInfo() { // jQuery.min
    retryAjax('index.php?no_mobile=1&cmd=guild&subcmd=conflicts')
      .done(function(data) {
        gotConflictInfo(data,
          {node: getElementById('statisticsControl')});
      });
  }

  function logoToggle() {
    var changeLogoCell = leftHandSideColumnTable.rows[0].cells[1].firstChild;
    insertHtmlBeforeEnd(changeLogoCell, '[ <span class="fshLink' +
      ' tip-static" id="toggleGuildLogoControl" ' +
      'linkto="guildLogoControl" data-tipped="Toggle Section">X</span> ]');
    var guildLogoElement = leftHandSideColumnTable.rows[2].cells[0]
      .firstChild.nextSibling;
    guildLogoElement.id = 'guildLogoControl';
    if (getValue('guildLogoControl')) {
      guildLogoElement.classList.add('fshHide');
    }
    getElementById('toggleGuildLogoControl')
      .addEventListener('click', toggleVisibilty);
  }

  function statToggle() {
    var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].firstChild;
    insertHtmlBeforeEnd(leaveGuildCell, '<span class="fshNoWrap">' +
      '[ <span class="fshLink tip-static" id="toggleStatisticsControl" ' +
      'linkto="statisticsControl" data-tipped="Toggle Section">X</span> ]' +
      '</span>');
    var statisticsControlElement = leftHandSideColumnTable.rows[6].cells[0]
      .firstChild.nextSibling;
    statisticsControlElement.id = 'statisticsControl';
    if (getValue('statisticsControl')) {
      statisticsControlElement.classList.add('fshHide');
    }
    getElementById('toggleStatisticsControl')
      .addEventListener('click', toggleVisibilty);
  }

  function structureToggle() {
    var buildCell = leftHandSideColumnTable.rows[15].cells[1].firstChild;
    insertHtmlBeforeEnd(buildCell, '[ <span class="fshLink ' +
      'tip-static" id="toggleGuildStructureControl" ' +
      'linkto="guildStructureControl" data-tipped="Toggle Section">X</span> ]');
    var guildStructureControlElement = leftHandSideColumnTable.rows[17]
      .cells[0].firstChild.nextSibling;
    guildStructureControlElement.id = 'guildStructureControl';
    if (getValue('guildStructureControl')) {
      guildStructureControlElement.classList.add('fshHide');
    }
    getElementById('toggleGuildStructureControl')
      .addEventListener('click', toggleVisibilty);
  }

  function batchBuffLinks() {
    var limit = performance.now() + 5;
    while (moreToDo(limit, memCount, members)) {
      insertHtmlBeforeEnd(members[memCount].parentNode,
        ' <span class="smallLink">[b]</span>');
      memCount += 1;
    }
    if (memCount < members.length) {
      add(3, batchBuffLinks);
    }
  }

  function buffLinks() {
    // TODO preference
    memCount = 0;
    members = document.querySelectorAll(
      '#pCC a[href^="index.php?cmd=profile&player_id="]');
    add(3, batchBuffLinks);
    pCC.addEventListener('click', function(evt) {
      if (evt.target.className !== 'smallLink') {return;}
      openQuickBuffByName(evt.target.previousElementSibling.text);
    });
  }

  function selfRecallLink() {
    // self recall
    var getLi = leftHandSideColumnTable.getElementsByTagName('LI');
    var selfRecall = getLi[getLi.length - 1].parentNode;
    insertHtmlBeforeEnd(selfRecall,
      '<li><a href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&' +
      'user=' + playerName() +
      '" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>');
  }

  function injectGuild() {
    add(3, colouredDots);
    add(3, removeGuildAvyImgBorder);
    add(3, guildXPLock);
    leftHandSideColumnTable = pCC
      .lastElementChild.rows[2].cells[0].firstElementChild;
    add(3, logoToggle);
    add(3, statToggle);
    add(3, structureToggle);
    add(3, buffLinks);
    add(3, selfRecallLink);
    if (jQueryNotPresent()) {return;}
    // Detailed conflict information
    if (getValue('detailedConflictInfo')) {
      add(3, conflictInfo);
    }
    add(4, guildTracker);
  }

  function takeitem(invId) {
    return callApp({
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'takeitem',
      guildstore_id: invId, // + 10000000,
    }).pipe(errorDialog);
  }

  function doItemTable(rows) {
    for (var i = 1; i < rows.length - 1; i += 2) {
      insertHtmlBeforeEnd(rows[i].cells[2],
        '&nbsp;<span class="sendLink">Fast BP</span>');
    }
  }

  function doCheckAll() {
    var boxes = document.querySelectorAll('#pCC input[name="tagIndex[]"]');
    Array.prototype.forEach.call(boxes, function(el) {
      el.click();
    });
  }

  function takeResult$1(self, data) {
    if (data.r === 0) {
      self.removeAttribute('style');
      self.className = 'fshGreen';
      self.textContent = 'Taken';
    }
  }

  function fastBp(el) {
    var itmId = el.parentNode.previousElementSibling.previousElementSibling
      .firstElementChild.value;
    takeitem(itmId).done(takeResult$1.bind(null, el));
    el.textContent = '';
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
    var nodeList = pCC.getElementsByTagName('table');
    if (nodeList.length > 0) {
      doItemTable(nodeList[nodeList.length - 1].rows);
    }
  }

  function checkAllBtn() {
    var checkAll = createInput({type: 'button', value: 'Check All'});
    var formTags = pCC.getElementsByTagName('form');
    if (formTags.length === 1) {
      insertElement(formTags[0].previousElementSibling.cells[0], checkAll);
    }
  }

  function injectGuildAddTagsWidgets() {
    pCC.addEventListener('click', evtHdlr);
    paintTable();
    checkAllBtn();
  }

  var ranks;
  var myRank;
  var theRows;
  var rankCount;
  var characterRow;

  var privLookup = {
    'Bank Withdraw': 5,
    'Build/Upgrade/Demolish Structures': 5,
    'Can Un-Tag Items': 5,
    'Build/Upgrade Structures': 4,
    'Can Kick Members': 4,
    'Can Mass Messages': 0.5,
    'Take Items': 0.2,
    'Can Recall Tagged Items': 0.2,
    'Store Items': 0.1,
    'Can View Advisor': 0.1
  };

  function parseRankData(linkElement, responseText) {
    // Makes a weighted calculation of available permissions and gets tax rate
    var doc = createDocument(responseText);
    var checkBoxes = doc.querySelectorAll(
      '#pCC input[type="checkbox"]:checked');
    var count = 0;
    Array.prototype.forEach.call(checkBoxes, function(checkbox) {
      var privName = checkbox.nextElementSibling.textContent.trim();
      if (privName in privLookup) {
        count += privLookup[privName];
      } else {count += 1;}
    });
    var taxRate = doc.querySelector('#pCC input[name="rank_tax"]').value;
    insertHtmlAfterBegin(linkElement, '<span class="fshBlue">(' +
      Math.round(10 * count) / 10 + ') Tax:(' + taxRate + '%)</span> ');
  }

  function fetchRankData() { // jQuery.min
    var calcButton = getElementById('getrankweightings');
    calcButton.classList.add('fshHide');
    var allItems = document.querySelectorAll('#pCC input[value="Edit"]');
    Array.prototype.forEach.call(allItems, function(anItem) {
      var targetNode = anItem.parentNode.parentNode.previousElementSibling;
      var href = /window\.location='(.*)';/.exec(anItem
        .getAttribute('onclick'))[1];
      retryAjax(href).done(parseRankData.bind(null, targetNode));
    });
  }

  function notValidRow(thisRankRowNum, targetRowNum, parentTable) {
    return characterRow >= Math.min(thisRankRowNum, targetRowNum) ||
      targetRowNum < 1 ||
      targetRowNum > parentTable.rows.length;
  }

  function getTargetRowNumber(val) {
    if (val === 'Up') {return -1;}
    return 2;
  }

  function getPxScroll(val) {
    if (val === 'Up') {return -22;}
    return 22;
  }

  function overrideUpDown(evt, val) {
    var onclickHREF = /window.location='(.*)';/
      .exec(evt.target.getAttribute('onclick'))[1];
    var thisRankRow = evt.target.parentNode.parentNode.parentNode;
    var thisRankRowNum = thisRankRow.rowIndex;
    var targetRowNum = thisRankRowNum + getTargetRowNumber(val);
    var parentTable = thisRankRow.parentNode;
    if (notValidRow(thisRankRowNum, targetRowNum, parentTable)) {return;}
    retryAjax(onclickHREF);
    var injectRow = parentTable.rows[targetRowNum];
    parentTable.insertBefore(thisRankRow, injectRow);
    var pxScroll = getPxScroll(val);
    window.scrollBy(0, pxScroll);
    evt.stopPropagation();
  }

  function ajaxifyRankControls(evt) {
    var val = evt.target.getAttribute('value');
    if (val === 'Up' || val === 'Down') {overrideUpDown(evt, val);}
  }

  function doButtons() {
    // gather rank info button
    var addNewRank = document.querySelector('#pCC a[href*="=ranks&subcmd2=add"]');
    if (addNewRank) {
      var weightButton = createInput({
        id: 'getrankweightings',
        className: 'custombutton',
        type: 'button',
        value: 'Get Rank Weightings'
      });
      weightButton.addEventListener('click', fetchRankData);
      var theTd = addNewRank.parentNode.parentNode;
      insertHtmlBeforeEnd(theTd, '&nbsp;');
      insertElement(theTd, weightButton);
    }
    if (getValue('ajaxifyRankControls')) {
      pCC.addEventListener('click',
        ajaxifyRankControls, true);
    }
  }

  function isMyRank(rankName) {
    if (rankName === myRank) {
      characterRow = rankCount; // limit for ajaxify later
    }
  }

  function hasMembers(rankCell, rankName) {
    if (ranks[rankName]) { // has members
      isMyRank(rankName);
      insertHtmlBeforeEnd(rankCell, ' <span class="fshBlue">- ' +
        ranks[rankName].join(', ') + '</span>');
    }
  }

  function getRankName(rankCell) {
    if (rankCount === 1) {return 'Guild Founder';}
    return rankCell.textContent;
  }

  function writeMembers(el) {
    var rankCell = el.firstElementChild;
    var rankName = getRankName(rankCell);
    hasMembers(rankCell, rankName);
  }

  function paintRanks() {
    var limit = performance.now() + 10;
    while (moreToDo(limit, rankCount, theRows)) {
      var el = theRows[rankCount];

      writeMembers(el);

      rankCount += 1;
    }
    if (rankCount < theRows.length) {
      add(3, paintRanks);
    }
  }

  function findTheRows() {
    var outerTable = pCC.lastElementChild.previousElementSibling;
    if (outerTable.rows && outerTable.rows.length > 7) {
      return outerTable.rows[7].firstElementChild.firstElementChild.rows;
    }
  }

  function getRanks(membrList) {
    ranks = Object.keys(membrList).reduce(function(prev, curr) {
      if (curr !== 'lastUpdate') {
        var rankName = membrList[curr].rank_name;
        prev[rankName] = prev[rankName] || [];
        prev[rankName].push(curr);
      }
      return prev;
    }, {});
    myRank = membrList[playerName()].rank_name;
    theRows = findTheRows();
    if (theRows) {
      rankCount = 1;
      add(3, paintRanks);
    }
  }

  function injectGuildRanks() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getMembrList(true).done(function(membrList) {
      add(3, getRanks, [membrList]);
    });
    add(3, doButtons);
  }

  function clearButton() { // jQuery
    var input = $('#fshInv_filter input');
    input.prop('type', 'text');
    var clear = $('<span>&times;</span>');
    input.wrap($('<span class="text-input-wrapper"/>'));
    input.after(clear);
    clear.click(function() {
      input.val('');
      $('#fshInv').DataTable().search('').draw();
    });
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
    // ' Composed: <input id="fshComposed" item="15" type="checkbox"/>' +
    '<td colspan="3"></td></tr>' +
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

  var options;
  var showQuickDropLinks;
  var showQuickSendLinks;
  var theInv;

  function storeTheInv(data) {
    theInv = data;
  }

  function extendOptions(data) {
    options = extend({}, defaultOptions);
    extend(options, fallback(data, {}));
    showQuickDropLinks = getValue('showQuickDropLinks');
    showQuickSendLinks = getValue('showQuickSendLinks');
  }

  function decorate() {
    if (theInv.folders) {
      theInv.folders['-1'] = 'Main';
    }
    // Hide composed potions until Zorg fixes the feed
    theInv.items =
      theInv.items.filter(function(obj) {
        return obj.type !== 15;
      });
    //
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

  function createdRow(row, data) {
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
    if (parseInt(row.max_durability, 10) > 0) {
      return Math.ceil(row.durability / row.max_durability * 100);
    }
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

  function onGuildMember(row) {
    return row.player_id && row.player_id !== -1;
  }

  function isTagged(row) {
    return row.folder_id && row.guild_tag !== -1;
  }

  function canRecall(row) {
    return onGuildMember(row) || isTagged(row);
  }

  function canStore(row) {
    return row.folder_id && !row.bound; // && !row.equipped;
  }

  function gsRender(_data, type, row) {
    if (canRecall(row)) {return gsDisplayType(type, row, gsRecall);}
    if (canStore(row)) {return gsDisplayType(type, row, gsStore);}
  }

  function getT(player_id) {
    if (player_id === -1) {return 4;}
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
    var cur = fallback(theInv.player_id,
      theInv.current_player_id);
    var t = getT(row.player_id);
    var p = player(theInv.player_id, row.player_id,
      theInv.guild_id);

    var bold = data;
    if (row.equipped) {bold = '<b>' + data + '</b>';}

    var _setName = '';
    if (isPartOfSet(row)) {
      _setName = ' (<span class="fshLink setName" set="' + row.stats.set_name +
        '">set</span>)';
    }

    return '<a href="index.php?cmd=auctionhouse&search=' + data +
      '" class="fshInvItem tip-dynamic ' +
      rarity[row.rarity].clas + '" ' +
      'data-tipped="fetchitem.php?item_id=' + row.item_id +
      '&inv_id=' + row.inv_id + '&t=' + t + '&p=' + p +
      '&currentPlayerId=' + cur + '">' +
      bold + '</a>' + _setName;
  }

  function nameRender(data, type, row) {
    if (type !== 'display') {return data;}
    return nameRenderDisplay(data, row);
  }

  function sendRender(data, type, row) {
    if (fallback(row.bound, row.equipped)) {return;}
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
    {
      test: function(row) {return row.player_id && row.player_id === -1;},
      res: function(row, act) {
        return 'takeItem" action="' + act.a;
      }
    },
    {
      test: function(row) {
        return row.player_id &&
          row.player_id !== theInv.current_player_id;
      },
      res: function(row, act) {
        return 'recallItem" playerid="' + row.player_id +
          '" mode="0" action="' + act.a;
      }
    },
    {
      test: function(row) {
        return userInvNotEquipped(row) || guidInvNotEquipped(row);
      },
      res: function(row, act) {return act.c;}
    }
  ];

  function wuRender(row, act) {
    for (var i = 0; i < locations.length; i += 1) {
      if (locations[i].test(row)) {
        return '<span class="fshLink ' + locations[i].res(row, act) +
          '" invid="' + row.inv_id + '">' + act.b + '</span>';
      }
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

  function playerName$3(f) {
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
    return playerName$3(row.player_id);
  }

  function isSelected(val, test) {
    if (val === test) {return ' selected';}
    return '';
  }

  function whereRenderGuildDisplay(row) {
    if (row.player_id === -1) {return 'GS';}
    return '<a class="fshMaroon" href="index.php?cmd=profile&player_id=' +
      row.player_id + '">' + playerName$3(row.player_id) + '</a>';
  }

  function whereRenderDisplay(data, type, row) {
    if (row.player_id) {
      return whereRenderGuildDisplay(row);
    }
    if (row.equipped) {return 'Worn';}
    var folderSelect = '<select class="fshMoveItem" data-inv="' + row.inv_id +
      '">';
    var keysArray = Object.keys(theInv.folders)
      .sort(function(a, b) {return a - b;});
    keysArray.forEach(function(value) {
      folderSelect += '<option value="' + value + '"' +
        isSelected(Number(value), row.folder_id) + '>' +
        theInv.folders[value] + '</option>';
    });
    folderSelect += '</select>';
    return folderSelect;
  }

  function whereRenderGuildFilter(row) {
    if (row.player_id === -1) {return 'GS';}
    return playerName$3(row.player_id);
  }

  function whereRenderFilter(data, type, row) {
    if (row.player_id) {
      return whereRenderGuildFilter(row);
    }
    if (row.equipped) {return 'Worn';}
    return theInv.folders[row.folder_id];
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
    {title: 'Frg', data: 'forge'},
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

  function doTable$1() { // jQuery
    $('#pCC').append('<table id="fshInv" class="hover" ' +
      'style="font-size: x-small;"></table>');
    var table = $('#fshInv').DataTable({
      data: theInv.items,
      autoWidth: false,
      pageLength: 50,
      lengthMenu: [[50, 100, 150, 200, -1], [50, 100, 150, 200, 'All']],
      columnDefs: [{targets: '_all', defaultContent: ''},
        {
          targets: [1, 4, 5, 6, 7, 8, 9, 10, 12, 13],
          orderSequence: ['desc', 'asc']
        }],
      columns: tblCols,
      createdRow: createdRow,
      stateSave: true,
      stateDuration: 0
    });
    table.column(12).visible('current_player_id' in theInv);
    table.column(17).visible('player_id' in theInv &&
      showQuickDropLinks);
    table.column(18).visible('player_id' in theInv &&
      showQuickSendLinks);
  }

  function setChecks() {
    Array.prototype.forEach.call(
      document.querySelectorAll('table.fshInvFilter input[type="checkbox"]'),
      function(el) {
        el.checked =
          options.checkedElements[el.getAttribute('item')] === 1;
      });
    setForage('fsh_inventory', options);
  }

  function allChecks() { // jQuery
    options.checkedElements = inventoryCheckAll;
    setChecks();
    $('#fshInv').DataTable().draw(false);
  }

  function changeLvls$1() { // jQuery
    var minLvl = parseInt($('#fshMinLvl').val(), 10);
    var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
    if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
    options.fshMinLvl = minLvl;
    options.fshMaxLvl = maxLvl;
    setForage('fsh_inventory', options);
    $('#fshInv').DataTable().draw(false);
  }

  function clearGearOnly(checkedElements) {
    var newEle = {};
    Object.keys(checkedElements).forEach(function(key) {
      if (parseInt(key, 10) >= 100) {
        newEle[key] = checkedElements[key];
      }
    });
    return newEle;
  }

  function clearChecks() { // jQuery
    options.checkedElements = clearGearOnly(options.checkedElements);
    setChecks();
    $('#fshInv').DataTable().draw();
  }

  function removeClass(self) {
    self.closest('tr')
      .find('.takeItem, .recallItem, .wearItem, .dropItem, .sendItem, .storeItem')
      .removeClass().qtip('hide');
  }

  function killRow(self, data) { // jQuery
    if (data.r === 1) {return;}
    var tr = self.closest('tr');
    var td = $('td', tr);
    td.eq(2).empty(); // Where
    td.eq(12).empty(); // BP - GS
    td.eq(13).empty(); // GS - W/U
    td.eq(14).empty(); // W/U - Tag
    td.eq(15).empty(); // Tag - Drop
    td.eq(16).empty(); // ? - Send
    tr.css('text-decoration', 'line-through');
  }

  function anotherSpinner(self) {
    self.empty().append('<img src="' + imageServer +
      '/skin/loading.gif" width="11" height="11">');
  }

  function doAction$1(fn, self) { // jQuery
    removeClass(self);
    fn().done(killRow.bind(null, self));
    anotherSpinner(self);
  }

  function dostoreitems(invIdAry) {
    return callApp({
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'dostoreitems',
      storeIndex: invIdAry
    }).pipe(errorDialog);
  }

  function dropItem(invIdList) {
    return retryAjax({
      url: 'index.php',
      data: {
        cmd: 'profile',
        subcmd: 'dodropitems',
        removeIndex: invIdList,
        ajax: 1
      },
      dataType: 'json'
    }).done(dialog);
  }

  function getChecks() { // jQuery
    options.checkedElements = {};
    Array.prototype.forEach.call(
      document.querySelectorAll(
        'table.fshInvFilter input[type="checkbox"][item]:checked'),
      function(el) {
        options.checkedElements[el.getAttribute('item')] = 1;
      });
    setForage('fsh_inventory', options);
    $('#fshInv').DataTable().draw(false);
  }

  function moveItem(invIdList, folderId) {
    return retryAjax({
      url: 'index.php',
      data: {
        cmd: 'profile',
        subcmd: 'sendtofolder',
        inv_list: JSON.stringify(invIdList),
        folder_id: folderId,
        ajax: 1
      },
      dataType: 'json'
    }).done(dialog);
  }

  function resetChecks() { // jQuery
    options.checkedElements = defaultOptions.checkedElements;
    setChecks();
    $('#fshInv').DataTable().draw(false);
  }

  function resetLvls$1() { // jQuery
    options.fshMinLvl = defaultOptions.fshMinLvl;
    options.fshMaxLvl = defaultOptions.fshMaxLvl;
    setForage('fsh_inventory', options);
    $('#fshMinLvl').val(options.fshMinLvl);
    $('#fshMaxLvl').val(options.fshMaxLvl);
    $('#fshInv').DataTable().draw(false);
  }

  function htmlResult(data) { // TODO change to app code to avoid 302 redirect
    var info = infoBox(data);
    var _r = 1;
    // if (info.search(/(successfully|gained|components)/) !== -1) {_r = 0;}
    if (info.includes('successfully')) {_r = 0;}
    return {r: _r, m: info};
  }

  function sendItem(invIdList) {
    return retryAjax({
      url: 'index.php',
      data: {
        no_mobile: 1,
        cmd: 'trade',
        subcmd: 'senditems',
        xc: window.ajaxXC,
        target_username: getValue('itemRecipient'),
        sendItemList: invIdList
      }
    }).pipe(htmlResult)
      .done(dialog);
  }

  function backpack$1() {
    return retryAjax({
      url: 'index.php',
      data: {cmd: 'profile', subcmd: 'fetchinv'},
      dataType: 'json'
    });
  }

  // import failStub from '../../failStub';

  function recall(invId, playerId, mode) {
    // return failStub();
    return callApp({
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'recall',
      id: invId, // + 10000000,
      player_id: playerId,
      mode: mode
    });
  }

  function takeItem(invId) {
    return retryAjax({
      url: 'index.php',
      data: {
        cmd: 'guild',
        subcmd: 'inventory',
        subcmd2: 'takeitem',
        guildstore_id: invId,
        ajax: 1
      },
      dataType: 'json'
    }).done(dialog);
  }

  var deferred = window.jQuery && jQuery.when();

  function itemStatus(data) {
    return function() {return data;};
  }

  function doAction$2(fn, item, data) {
    return fn(item).pipe(itemStatus(data));
  }

  function additionalAction(action, data) {
    if (action === 'wear') {
      return doAction$2(equipItem, data.b, data);
      // Return takeitem status irrespective of the status of the equipitem
    }
    if (action === 'use') {
      return doAction$2(useItem, data.b, data);
      // Return takeitem status irrespective of the status of the useitem
    }
  }

  function takeItemStatus(action, data) {
    if (data.r === 0 && action !== 'take') {
      return additionalAction(action, data);
    }
    return data;
  }

  function queueTakeItem(invId, action) {
    // You have to chain them because they could be modifying the backpack
    deferred = deferred.pipe(function pipeTakeToQueue() {
      return takeItem(invId).pipe(takeItemStatus.bind(null, action));
    });
    return deferred;
  }

  function gotBackpack(o, data) {
    return function(bpData) {
      // TODO assuming backpack is successful...
      var lastBackpackItem = bpData.items[bpData.items.length - 1].a;
      if (o.action === 'wear') {
        return doAction$2(equipItem, lastBackpackItem, data);
        // Return recall status irrespective of the status of the equipitem
      }
      if (o.action === 'use') {
        return doAction$2(useItem, lastBackpackItem, data);
        // Return recall status irrespective of the status of the useitem
      }
    };
  }

  function recallItemStatus(o) {
    return function(data) {
      if (data.r === 0 && o.action !== 'recall') {
        return backpack$1().pipe(gotBackpack(o, data));
      }
      return data;
    };
  }

  function pipeRecallToQueue(o) {
    return function() {
      return recall(o.invId, o.playerId, o.mode).pipe(errorDialog)
        .pipe(recallItemStatus(o));
    };
  }

  function queueRecallItem(o) {
    // You have to chain them because they could be modifying the backpack
    deferred = deferred.pipe(pipeRecallToQueue(o));
    return deferred;
  }

  function setName(e) { // jQuery
    $('#fshInv').DataTable().search($(e.target).attr('set')).draw();
    $('#fshInv_filter input').focus();
  }

  function takeItem$1(e) { // jQuery
    var self = $(e.target);
    doAction$1(
      queueTakeItem.bind(null, self.attr('invid'), self.attr('action')),
      self
    );
  }

  function recallItem(e) { // jQuery
    var self = $(e.target);
    doAction$1(
      queueRecallItem.bind(null, {
        invId: self.attr('invid'),
        playerId: self.attr('playerid'),
        mode: self.attr('mode'),
        action: self.attr('action')
      }),
      self
    );
  }

  function wearItem(e) { // jQuery
    var self = $(e.target);
    doAction$1(equipItem.bind(null, self.attr('invid')), self);
  }

  function doUseItem$1(e) { // jQuery
    var self = $(e.target);
    doAction$1(useItem.bind(null, self.attr('invid')), self);
  }

  function doMoveItem(e) { // jQuery
    var self = $(e.target);
    moveItem([self.data('inv')], self.val());
  }

  function doStoreItem(e) { // jQuery
    var self = $(e.target);
    doAction$1(dostoreitems.bind(null, [self.attr('invid')]), self);
  }

  function doDropItem(e) { // jQuery
    var self = $(e.target);
    doAction$1(dropItem.bind(null, [self.data('inv')]), self);
  }

  function doSendItem(e) { // jQuery
    var self = $(e.target);
    doAction$1(sendItem.bind(null, [self.data('inv')]), self);
  }

  function eventHandlers() { // jQuery
    // $('#fshRefresh').click(injectInventoryManagerNew);
    $('#fshMinLvl, #fshMaxLvl').keyup(changeLvls$1);
    $('#fshReset').click(resetLvls$1);
    $('table.fshInvFilter').on('click', 'input[type="checkbox"]', getChecks);
    $('#fshAll').click(allChecks);
    $('#fshNone').click(clearChecks);
    $('#fshDefault').click(resetChecks);
    $('#fshInv').on('click', 'span.setName', setName);
    $('#fshInv').on('click', 'span.takeItem', takeItem$1);
    $('#fshInv').on('click', 'span.recallItem', recallItem);
    $('#fshInv').on('click', 'span.wearItem', wearItem);
    $('#fshInv').on('click', 'span.useItem', doUseItem$1);
    $('#fshInv').on('change', 'select.fshMoveItem', doMoveItem);
    $('#fshInv').on('click', 'span.dropItem', doDropItem);
    $('#fshInv').on('click', 'span.sendItem', doSendItem);
    $('#fshInv').on('click', 'span.storeItem', doStoreItem);
  }

  function headers() { // jQuery
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
    var myHtml = invManFilter.replace('@@reportTitle@@', reportTitle);
    $('#pCC').html(myHtml);
  }

  function setLvls() { // jQuery
    $('#fshMinLvl').val(options.fshMinLvl);
    $('#fshMaxLvl').val(options.fshMaxLvl);
  }

  var lvlTests$1 = [
    function(level) {return level === 0;},
    function(level, min, max) {return isNaN(min) && isNaN(max);},
    function(level, min, max) {return isNaN(min) && level <= max;},
    function(level, min, max) {return min <= level && isNaN(max);},
    function(level, min, max) {return min <= level && level <= max;}
  ];

  function doLvlFilter$1(_settings, data) {
    var min = options.fshMinLvl;
    var max = options.fshMaxLvl;
    var level = intValue(data[1]); // use data for the level column
    for (var i = 0; i < lvlTests$1.length; i += 1) {
      if (lvlTests$1[i](level, min, max)) {return true;}
    }
    return false;
  }

  function lvlFilter$1() { // jQuery
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
      data.stats && data.stats.set_id !== '-1';
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

  function doSpinner() { // jQuery
    $('#pCC').html('<span id="fshInvMan"><img src = "' +
    imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
      'Getting inventory data...</span>');
  }

  function rekeyMembrList() {
    calf.membrList = Object.keys(calf.membrList)
      // Using reduce() to rekey the membrList from names to id's
      .reduce(function(prev, curr) {
        if (curr !== 'lastUpdate') {
          prev[calf.membrList[curr].id] =
            calf.membrList[curr];
        }
        return prev;
      }, {});
  }

  function getInvMan() {

    time('inventory.getInvMan');

    if (calf.membrList) {rekeyMembrList();}

    decorate();
    lvlFilter$1();
    typeFilter();
    setFilter();
    rarityFilter();
    headers();
    setChecks();
    setLvls();
    doTable$1();
    eventHandlers();
    // eslint-disable-next-line no-use-before-define
    $('#fshRefresh').click(injectInventoryManagerNew);
    clearButton();

    timeEnd('inventory.getInvMan');

  }

  function syncInvMan() { // jQuery
    var prm = [];
    prm.push(getInventory().done(storeTheInv));
    if (calf.subcmd === 'guildinvmgr') {
      prm.push(getMembrList(false));
    }
    prm.push(getForage('fsh_inventory')
      .done(extendOptions)
    );
    $.when.apply($, prm).done(function() {
      add(3, getInvMan);
    });
  }

  function injectInventoryManagerNew() {
    if (jQueryNotPresent()) {return;}
    doSpinner();
    syncInvMan();
  }

  function showError(data) { // jQuery
    var $tempError = $('#temp_error');
    $tempError.html('<span style="color: red">Error:</span> ' + data.m);
    $tempError.show().delay(5000).hide(400);
  }

  function failHndlr(jqXHR) {
    showError({m: jqXHR.status + ' ' + jqXHR.statusText});
  }

  function quickDoneTaken(data) { // jQuery
    if (data.r !== 0) {
      showError(data);
    } else {
      var qtipId = $('#temp-inv-img-' + data.temp_id).data('hasqtip');
      $('#temp-inv-' + data.temp_id).remove();
      $('#qtip-' + qtipId).remove();
    }
    outputResult('Item taken.', getElementById('take_result'));
  }

  function takeAllSimilar(evt) { // jQuery.min
    var invIds = evt.target.getAttribute('invIDs').split(',');
    evt.target.parentNode.innerHTML = 'taking all ' +
      invIds.length + ' items';
    invIds.forEach(function(invId) {
      retryAjax({
        type: 'POST',
        url: 'index.php',
        data: {
          cmd: 'tempinv',
          subcmd: 'takeitem',
          temp_id: invId,
          ajax: '1'
        },
        dataType: 'json'
      }).done(quickDoneTaken).fail(failHndlr);
    });
  }

  function toggleQuickTake() { // jQuery
    if ($('#currentMBDisplay').attr('value') === 'mailbox') {
      $('#mailboxSwitcher').html('Toggle Mailbox');
      $('#quickTake').css('display', 'block');
      $('#regularMailbox').css('display', 'none');
      $('#currentMBDisplay').attr('value', 'quicktake');
    } else {
      $('#mailboxSwitcher').html('Toggle Quick Take');
      $('#quickTake').css('display', 'none');
      $('#regularMailbox').css('display', 'block');
      $('#currentMBDisplay').attr('value', 'mailbox');
    }
  }

  function injectMailbox() { // Bad jQuery
    if (jQueryNotPresent()) {return;}
    var items = $('#pCC a');
    if (items.length === 0) {return;} // Empty mailbox
    $('#pCC').wrapInner('<div id="regularMailbox" />');
    var quickTakeDiv = '<div id="quickTake" style="display:none"><br />' +
      '<br /><center><font size="3"><b>Quick Take</b></font>' +
      '<br />Select which item to take all similar items from your ' +
      'Mailbox.<br /></center>' +
      '<table id="quickTakeTable" align="left"><tr><th width=20%>' +
      'Actions</th><th>Items</th></tr><tr><td id="take_result" ' +
      'colspan=2></td></tr></table>' +
      '</div>';
    $('#pCC').prepend('<span id="mailboxSwitcher" ' +
      'style="cursor:pointer; text-decoration:underline; ' +
      'color:blue;">Toggle Quick Take</span><input type="hidden" ' +
      'id="currentMBDisplay" value="mailbox" />' + quickTakeDiv);
    var itemList = {};
    $('#regularMailbox img[data-tipped*="t=5"]').each(function(i, e) {
      var itemIDs = itemRE.exec($(e).attr('data-tipped'));
      if (!itemIDs) {return;}
      var itemId = itemIDs[1];
      var invId = itemIDs[2];
      var tipped = $(e).attr('data-tipped');
      var src = $(e).attr('src');
      if (!itemList[itemId]) {
        var invIds = [];
        invIds.push(invId);
        itemList[itemId] = {
          invIds: invIds,
          tipped: tipped,
          src: src
        };
      } else {
        itemList[itemId].invIds.push(invId);
      }
    });
    var quickTakeTable = $('#quickTakeTable');
    Object.keys(itemList).forEach(function(id) {
      var titem = itemList[id];
      quickTakeTable.append('<tr><td align=center>' +
        '<span style="cursor:pointer; text-decoration:underline; ' +
        'color:blue; font-size:x-small;" ' +
        'id="Helper:takeAllSimilar' + id + '" invIDs="' + titem.invIds.join() +
        '">Take All ' + titem.invIds.length + '</span></td>' +
        '<td><img src="' + titem.src +
        '" class="tip-dynamic" border="0" data-tipped="' +
        titem.tipped + '"></td></tr>');
      getElementById('Helper:takeAllSimilar' + id)
        .addEventListener('click', takeAllSimilar, true);
    });
    getElementById('mailboxSwitcher')
      .addEventListener('click', toggleQuickTake, true);
  }

  var currentPlayerId$1;

  function getPlayer(playerAry) { // Legacy
    if (playerAry) {return Number(playerAry[1]);}
    return 0;
  }

  function msgDoesNotIncludePlayer(aRow) {
    var messageHTML = aRow.cells[2].innerHTML;
    var doublerPlayerMessageRE =
      /member\s<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
    var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
    var singlePlayerMessageRE =
      /<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
    var firstPlayer = singlePlayerMessageRE.exec(messageHTML);
    var firstPlayerID = getPlayer(firstPlayer);
    var secondPlayerID = getPlayer(secondPlayer);
    return firstPlayer &&
      firstPlayerID !== currentPlayerId$1 &&
      secondPlayerID !== currentPlayerId$1;
  }

  function findPlayers(aRow) { // Legacy
    if (msgDoesNotIncludePlayer(aRow)) {
      for (var j = 0; j < 3; j += 1) {
        aRow.cells[j].removeAttribute('class');
      }
      aRow.classList.add('fshGrey');
      aRow.classList.add('fshXSmall');
    }
  }

  function likeInvite(aRow, hasInvited) { // Legacy
    var message = aRow.cells[2].innerHTML;
    var firstQuote = message.indexOf('\'');
    var firstPart = '';
    firstPart = message.substring(0, firstQuote);
    var secondQuote = message.indexOf('\'', firstQuote + 1);
    var targetPlayerName = message.substring(firstQuote + 1, secondQuote);
    aRow.cells[2].innerHTML = firstPart + '\'' +
      '<a href="index.php?cmd=findplayer&search_active=1&' +
      'search_level_max=&search_level_min=&search_username=' +
      targetPlayerName + '&search_show_first=1">' + targetPlayerName +
      '</a>' + message.substring(secondQuote, message.length);
    if (!hasInvited &&
      targetPlayerName !== playerName()) {
      $(aRow).find('td').removeClass('row').css('font-size', 'xx-small');
      aRow.style.color = 'gray';
    }
  }

  function guildInvite(aRow) { // Legacy
    var hasInvited = aRow.cells[2].textContent
      .search('has invited the player') !== -1;
    if (aRow.cells[2].textContent.charAt(0) === '\'' || hasInvited) {
      likeInvite(aRow, hasInvited);
    }
  }

  function processGuildWidgetRow(aRow) { // Legacy
    findPlayers(aRow);
    guildInvite(aRow);
  }

  function getMessageHeader() {
    var nodeList = pCC.getElementsByTagName('TD');
    for (var i = 0; i < nodeList.length; i += 1) {
      if (nodeList[i].textContent === 'Message') {
        return nodeList[i];
      }
    }
  }

  function guildLogWidgetsEnabled() { // Legacy
    var messageNameCell = getMessageHeader();
    if (!messageNameCell) {return;}
    var logTable = messageNameCell.parentNode.parentNode.parentNode;
    messageNameCell.innerHTML += '&nbsp;&nbsp;<span class="fshWhite">' +
      '(Guild Log messages not involving self are dimmed!)</span>';

    currentPlayerId$1 = playerId();

    for (var i = 1; i < logTable.rows.length; i += 2) {
      var aRow = logTable.rows[i];
      processGuildWidgetRow(aRow);
    }
  }

  function addGuildLogWidgets() {
    if (getValue('hideNonPlayerGuildLogMessages')) {
      guildLogWidgetsEnabled();
    }
  }

  var nowUtc;
  var lastCheckUtc;

  function findChatTable() { // Legacy
    var chatTable = findNode('//table[@class="width_full"]'); // Guild Log
    if (!chatTable) {
      chatTable = findNode('//table[tbody/tr/td[.="Message"]]'); // Outbox & Guild Chat
    }
    if (!chatTable) {
      chatTable = findNode('//table[tbody/tr/td/span[' +
        'contains(.,"Currently showing:")]]'); // personal log
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

  function rowColor(aRow, logScreen, dateColumn) { // Legacy
    var addBuffTag = true;
    var cellContents = aRow.cells[dateColumn].textContent;
    var postDateUtc = parseDateAsTimestamp(cellContents);
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
    var increment = 2;
    if (logScreen === 'Chat') {
      increment = 4;
      chatTable.classList.add('fshGc');
    }
    for (var i = 1; i < chatTable.rows.length; i += increment) {
      rowColor(chatTable.rows[i], logScreen, dateColumn);
    }
    setValue(lastCheckScreen, nowUtc);
  }

  function addLogColoring(logScreen, dateColumn) { // Legacy
    if (!getValue('enableLogColoring')) {return;}
    var chatTable = findChatTable();
    if (chatTable) {doLogColoring(logScreen, dateColumn, chatTable);}
  }

  var lookup = [
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
      'has left the guild', 'has been assigned the rank'],
    [/resulted in (.*) with a final score of/,
      'resulted in a draw. Your GvG rating ',
      'has just initiated a conflict with the guild',
      'has initiated a conflict with your guild',
      'is participating in the conflict against the guild'],
    ['bought the Titan Reward item',
      'from your guild\'s contribution to the defeat of the titan',
      'a 7 day cooldown has been activated on your guild for this titan'],
  ];

  function rowProfile(data) {

    function isMatch(el) {
      if (isType(el, 'string')) {
        return data.includes(el);
      }
      return el.test(data);
    }

    var myIndex = lookup.findIndex(function(ary) {return ary.some(isMatch);});
    if (myIndex === -1) {return 0;}
    return myIndex;
  }

  var guildLogFilter =
    '<table id="fshNewGuildLog" class="fshInvFilter"><thead><tr>' +
    '<th colspan="11"><b>Guild Log Version 4</b></th>' +
    '<th colspan="3"><span id="rfsh" class="sendLink">Reset</span> ' +
    '<a href="index.php?cmd=guild&subcmd=log" class="sendLink">' +
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
  var headerRow = '<tbody><tr>' +
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
  var lastPage$1;
  var tmpGuildLog = [];
  var completeReload = true;
  var myTable;

  function getGuildLogPage(page) {
    return retryAjax({
      url: 'index.php',
      data: {no_mobile: 1, cmd: 'guild', subcmd: 'log', page: page},
      datatype: 'html'
    });
  }

  function findPageInput(prev, curr) {
    var output = prev;
    if (!prev && curr.name === 'page') {output = curr;}
    return output;
  }

  function getPageInput() {
    var inputList = getElementById('pCC', doc)
      .getElementsByClassName('custominput');
    return Array.prototype.reduce.call(inputList, findPageInput, null);
  }

  function parsePage(data) {
    doc = createDocument(data);
    var pageInput = getPageInput();
    currPage = Number(pageInput.value);
    lastPage$1 = Number(/\d+/.exec(pageInput.parentNode.textContent)[0]);
    if (currPage === 1) {maxPage$1 = Math.min(lastPage$1, maxPagesToFetch);}
    fshOutput.textContent = 'Loading ' + currPage + ' of ' + maxPage$1 + '...';
  }

  function rowMatchesLog(timestamp, myMsg) {
    return timestamp === options$1.log[0][0] && myMsg === options$1.log[0][2];
  }

  function seenRowBefore(timestamp, myMsg) {
    return currPage === 1 && options$1.log && rowMatchesLog(timestamp, myMsg);
  }

  function getTableList(tableList) {
    var theTable = tableList[0];
    var limit = theTable.rows.length - 1;
    for (var i = 1; i < limit; i += 2) {
      var myRow = theTable.rows[i];
      var myDate = myRow.cells[1].textContent;
      var timestamp = parseDateAsTimestamp(myDate);
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
    var tableList = doc.getElementsByClassName('width_full');
    if (tableList.length === 1) {getTableList(tableList);}
  }

  function processPage(data) {
    parsePage(data);
    parseTable();
  }

  function getOtherPages() {
    var prm = [];
    if (completeReload) {
      for (var i = 2; i <= maxPage$1; i += 1) {
        prm.push(getGuildLogPage(i).done(processPage));
      }
    } else {
      options$1.log.forEach(function(e) {
        tmpGuildLog.push([0, e[0], e[1], e[2], e[3]]);
      });
    }
    return $.when.apply($, prm);
  }

  function storeOptions() {
    setForage('fsh_guildLog', options$1);
  }

  function updateOptionsLog() {
    // Don't cache current minute as it may be incomplete
    var nowUtc = (new Date()).setSeconds(0, 0);
    options$1.log = tmpGuildLog.reduce(function(prev, curr) {
      if (curr[1] !== nowUtc) {
        prev.push([curr[1], curr[2], curr[3], curr[4]]);
      }
      return prev;
    }, []);
    storeOptions();
  }

  function buildTable() {
    myTable = createTable({id: 'fshInjectHere', className: 'width_full'});
    insertHtmlBeforeEnd(myTable, headerRow);

    tmpGuildLog.forEach(function(r) {
      var myRow = myTable.insertRow(-1);
      r.push(myRow);
      if (!options$1.checks[r[4]]) {myRow.className = 'fshHide';}
      myRow.insertCell(-1).innerHTML =
        '<span class="newGuildLog" style="background-image: url(\'' +
        imageServer + '/skin/log_1.gif\');"></span>';
      myRow.cells[0].className = 'row';
      myRow.insertCell(-1).innerHTML = '<nobr>' + r[2] + '</nobr>';
      myRow.cells[1].className = 'row';
      myRow.insertCell(-1).innerHTML = r[3];
      myRow.cells[2].className = 'row';
      var sepRow = myTable.insertRow(-1);
      r.push(sepRow);
      if (!options$1.checks[r[4]]) {sepRow.className = 'fshHide';}
      var sep = sepRow.insertCell(-1);
      sep.className = 'divider';
      sep.colSpan = 3;
    });

    var injector = getElementById('fshInjectHere');
    pCC.replaceChild(myTable, injector);
    addLogColoring('myGuildLog', 1);
    addGuildLogWidgets();
  }

  function setChecks$1() {
    Array.prototype.forEach.call(
      fshNewGuildLog.getElementsByTagName('input'),
      function(el) {
        el.checked = options$1.checks[el.getAttribute('item')];
      }
    );
    storeOptions();
  }

  function gotOtherPages() {
    if (completeReload) {
      tmpGuildLog.sort(function(a, b) {
        return a[0] - b[0];
      });
    }
    fshOutput.textContent = 'Loading complete.';
    updateOptionsLog();
    buildTable();
  }

  function processFirstPage$1(data) {
    processPage(data);
    getOtherPages().done(gotOtherPages);
  }

  function toggleItem(self) {
    var item = Number(self.getAttribute('item'));
    options$1.checks[item] = !options$1.checks[item];
    storeOptions();
    var hide = !options$1.checks[item];
    tmpGuildLog.forEach(function(r) {
      if (r[4] !== item) {return;}
      toggleForce(r[5], hide);
      toggleForce(r[6], hide);
    });
  }

  function selectAll() {
    options$1.checks = defChecks.slice(0);
    setChecks$1();
    tmpGuildLog.forEach(function(r) {
      r[5].classList.remove('fshHide');
      r[6].classList.remove('fshHide');
    });
  }

  function selectNone() {
    options$1.checks = noChecks.slice(0);
    setChecks$1();
    tmpGuildLog.forEach(function(r) {
      r[5].classList.add('fshHide');
      r[6].classList.add('fshHide');
    });
  }

  function refresh() {
    options$1.log = false;
    storeOptions();
    fshOutput.textContent = 'Loading Page 1 ...';
    tmpGuildLog = [];
    completeReload = true;
    getElementById('fshInjectHere').innerHTML = '';
    getGuildLogPage(1).done(processFirstPage$1);
  }

  var guildLogEvents = [
    {test: function(self) {return self.tagName === 'INPUT';}, act: toggleItem},
    {test: function(self) {return self.id === 'fshAll';}, act: selectAll},
    {test: function(self) {return self.id === 'fshNone';}, act: selectNone},
    {test: function(self) {return self.id === 'rfsh';}, act: refresh}
  ];

  function gotOptions(guildLog) {
    options$1 = guildLog || options$1;
    options$1.checks = options$1.checks || defChecks.slice(0);
    pCC.innerHTML = guildLogFilter;
    fshNewGuildLog = getElementById('fshNewGuildLog');
    fshNewGuildLog.addEventListener('click', eventHandler(guildLogEvents));
    setChecks$1();
    fshOutput = getElementById('fshOutput');
    maxPagesToFetch = Number(getValue('newGuildLogHistoryPages'));
    maxPage$1 = maxPagesToFetch;
    getGuildLogPage(1).done(processFirstPage$1);
  }

  function injectNewGuildLog() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getForage('fsh_guildLog').done(gotOptions);
  }

  function insertHtmlBeforeBegin(parent, html) {
    insertHtml(parent, 'beforebegin', html);
  }

  function cellOneHazText(curr) {
    return curr.cells[1] && curr.cells[1].textContent;
  }

  function reduceStatTable(prev, curr, index) {
    var key = curr.cells[0].textContent.trim().replace(':', '');
    if (!key) {return prev;}
    prev[key] = {ind: index};
    if (cellOneHazText(curr)) {
      prev[key].value = Number(
        curr.cells[1].textContent.trim().replace('+', '')
      );
    }
    return prev;
  }

  function getVal(prop, obj) {
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

  function addStats$1(el) {
    var statTable = closestTable(el);
    var statObj = Array.prototype.reduce.call(statTable.rows,
      reduceStatTable, {});
    var totalStats = getVal('Attack', statObj) + getVal('Defense', statObj) +
      getVal('Armor', statObj) + getVal('Damage', statObj) +
      getVal('HP', statObj);
    insertHtmlBeforeBegin(getLastIndex(statObj, statTable),
      '<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">' +
      totalStats + '&nbsp;</td></tr>');
  }

  function fshDataFilter(data) {
    var container = createDiv();
    insertHtmlBeforeEnd(container, data);
    var bonus = container.getElementsByTagName('font');
    bonus = Array.prototype.filter.call(bonus, function(el) {
      return el.textContent === 'Bonuses';
    });
    bonus.forEach(addStats$1);
    return container.innerHTML;
  }

  function fshPreFilter(options) {
    if (options.url.indexOf('fetchitem') !== 0) {return;}
    options.dataFilter = fshDataFilter;
  }

  function addStatTotalToMouseover() { // jQuery
    $.ajaxPrefilter(fshPreFilter);
  }

  var bpc;

  function bp() {
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

  function isSectionToggle(self) {
    return elementTests.every(function(el) {
      return el(self);
    });
  }

  function oldStyleDiv(target) {
    if (target.style.display === 'block') {
      target.classList.add('fshHide');
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
      toggleTarget(bp());
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
    pCC.addEventListener('click', testForSection);
  }

  var disableDeactivatePrompts = getValue('disableDeactivatePrompts');

  function debuff(buffId) {
    return retryAjax({
      url: 'fetchdata.php',
      data: {
        a: '22',
        d: '0',
        id: buffId
      },
      dataType: 'json'
    });
  }

  function doDebuff(aLink) { // jQuery
    sendEvent('profile', 'doDebuff');
    var buffId = aLink.href.match(/(\d+)$/)[1];
    debuff(buffId)
      .done(function(data) {
        if (data.response.response === 0) {
          aLink.parentNode.innerHTML = '';
        } else {
          $('#dialog_msg').html(data.response.msg).dialog('open');
        }
      });
  }

  function doPrompt(aLink) {
    var onclick = aLink.getAttribute('onclick');
    var warn = onclick
      .match(/Are you sure you wish to remove the .* skill\?/)[0];
    jConfirm('Remove Skill', warn, function() {
      doDebuff(aLink);
    });
  }

  function checkForPrompt(aLink) {
    if (!disableDeactivatePrompts) {
      doPrompt(aLink);
    } else {
      doDebuff(aLink);
    }
  }

  function interceptDebuff(e) { // jQuery
    var aLink = e.target;
    if (aLink.tagName === 'IMG') {
      $(e.target).qtip('hide');
      aLink = aLink.parentNode;
    } else if (aLink.tagName !== 'A') {return;}
    e.stopPropagation();
    e.preventDefault();
    checkForPrompt(aLink);
  }

  function fastDebuff() {
    var profileRightColumn = getElementById('profileRightColumn')
      .lastElementChild;
    profileRightColumn.addEventListener('click', interceptDebuff, true);
  }

  function restyleBackpack() {
    var bpBack = getElementById('backpack');
    bpBack.className = 'fshBackpack';
    bpBack.removeAttribute('style');
  }

  function backpackRemove$1(theBackpack, invId) { // jQuery.min
    var _invId = Number(invId);
    // remove from srcData
    var i = theBackpack.srcData.findIndex(function(el) {return el.a === _invId;});
    if (i !== -1) {theBackpack.srcData.splice(i, 1);}
  }

  function fastAction(theBackpack, evt, action, result) { // jQuery.min
    sendEvent('profile', 'fastAction');
    var self = evt.target;
    var invId = self.parentNode.parentNode.firstElementChild.dataset.inv;
    self.textContent = '';
    self.className = 'fastAction fshSpinner fshSpinner12';
    action(invId).done(function(data) {
      if (data.r !== 0) {
        self.remove();
        return;
      }
      backpackRemove$1(theBackpack, invId);
      self.classList.remove('fshSpinner');
      self.parentNode.innerHTML = '<span class="fastWorn">' + result + '</span>';
    });
  }

  function evtHdl$1(theBackpack, evt) {
    if (evt.target.classList.contains('fastWear')) {
      fastAction(theBackpack, evt, equipItem, 'Worn');
    }
    if (evt.target.classList.contains('fastUse')) {
      fastAction(theBackpack, evt, useItem, 'Used');
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
    var items = document.querySelectorAll(
      '#backpackTab_' + self.type.toString() +
      ' .backpackContextMenuEquippable,.backpackContextMenuUsable');
    if (items.length === 0) {return;}
    Array.prototype.forEach.call(items, drawButtons.bind(null, self));
  }

  function foundBackpack(backpackContainer, theBackpack) {
    var oldShow = theBackpack._showPage;
    theBackpack._showPage = function(type, page) {
      if (!this.tabData) {return;}
      oldShow.call(this, type, page);
      fastWearLinks(this);
    };
    if (getElementById('backpack_current').textContent.length !== 0) {
      add(3, fastWearLinks, [theBackpack]);
    }
    backpackContainer.addEventListener('click', evtHdl$1.bind(null, theBackpack));
  }

  function initialiseFastWear() {
    var backpackContainer = getElementById('backpackContainer');
    var theBackpack = $(backpackContainer).data('backpack');
    if (theBackpack) {foundBackpack(backpackContainer, theBackpack);}
  }

  function injectFastWear() { // jQuery
    if (!getValue('enableQuickDrink')) {return;}
    restyleBackpack();
    initialiseFastWear();
  }

  function unequipitem(item) {
    return callApp({
      cmd: 'profile',
      subcmd: 'unequipitem',
      inventory_id: item
    });
  }

  var profileCombatSetDiv;

  function removeItem(link) {
    function clearBox(json) {
      if (json.s) {
        link.parentNode.innerHTML = '';
      }
    }
    var item = /inventory_id=(\d+)/.exec(link.href)[1];
    if (item) {
      unequipitem(item).done(clearBox);
    }
  }

  function getNekid() {
    sendEvent('profile', 'nekidBtn');
    var profileBlock = profileCombatSetDiv.nextElementSibling;
    var aLinks = profileBlock.getElementsByTagName('a');
    Array.prototype.forEach.call(aLinks, removeItem);
  }

  function nekidBtn() {
    var profileRightColumn = getElementById('profileRightColumn');
    profileCombatSetDiv = getElementById('profileCombatSetDiv');
    var targetBr = profileCombatSetDiv.parentNode.nextElementSibling;
    var nekidDiv = createDiv({className: 'fshCenter'});
    var theBtn = createButton({
      className: 'fshBl fshBls',
      textContent: 'Nekid'
    });
    insertTextBeforeEnd(nekidDiv, '[ ');
    insertElement(nekidDiv, theBtn);
    insertTextBeforeEnd(nekidDiv, ' ]');
    profileRightColumn.replaceChild(nekidDiv, targetBr);
    theBtn.addEventListener('click', getNekid);
  }

  var quickDelDiv;
  var sumComp;
  var delAllDiv;
  var compDel;
  var compSum;
  var compDelAll;
  var qe;
  var thisInvTable;
  var componentList = {};
  var usedCount;
  var usedCountDom;
  var totalCount;
  var pageCount;

  function getInvTables(doc) {
    return getElementById('profileRightColumn', doc)
      .getElementsByClassName('inventory-table');
  }

  function tallyComponent(visible, el) {
    var mouseover = el.dataset.tipped;
    var id = mouseover.match(/fetchitem.php\?item_id=(\d+)/)[1];
    componentList[id] = componentList[id] || {
      count: 0,
      src: el.getAttribute('src'),
      onmouseover: mouseover,
      del: [],
      dom: []
    };
    componentList[id].count += 1;
    componentList[id].del.push(el.parentNode.href);
    if (visible) {componentList[id].dom.push(el.parentNode.parentNode);}
    usedCount += 1;
  }

  function retriveComponent(doc) {
    var visible = doc === document;
    var invTbl = getInvTables(doc)[1];
    var nodeList = invTbl.getElementsByTagName('IMG');
    Array.prototype.forEach.call(nodeList, tallyComponent.bind(null, visible));
    totalCount += invTbl.querySelectorAll(
      'td[background$="inventory/1x1mini.gif"]').length;
  }

  function tallyTableRow(prev, id) {
    var comp = componentList[id];
    return prev + '<tr><td><img src="' + comp.src +
      '" class="fshTblCenter tip-dynamic" data-tipped="' + comp.onmouseover +
      '"></td><td>' + comp.count + '</td>' +
      '<td>[<span class="sendLink compDelType" data-compid="' + id +
      '">Del</span>]</td></tr>';
  }

  function displayComponentTally() {
    var tbl = createTable({className: 'fshTblCenter'});
    var tBody = createTBody();
    insertElement(tbl, tBody);
    insertHtmlBeforeEnd(tBody,
      '<tr><td colspan="3">Component Summary</td></tr>' +
      Object.keys(componentList).reduce(tallyTableRow, ''));
    var totRow = tbl.insertRow(-1);
    insertHtmlBeforeEnd(totRow, '<td>Total:</td>');
    var totCell = totRow.insertCell(-1);
    totCell.colSpan = 2;
    usedCountDom = createSpan();
    usedCountDom.innerHTML = usedCount.toString();
    insertElement(totCell, usedCountDom);
    insertTextBeforeEnd(totCell, ' / ' + totalCount.toString());
    sumComp.innerHTML = '';
    insertElement(sumComp, tbl);
  }

  function gotComponentsPage(data) {
    pageCount += 1;
    insertHtmlBeforeEnd(sumComp, pageCount + ', ');
    retriveComponent(createDocument(data));
  }

  function initCounters() {
    usedCount = 0;
    totalCount = 0;
    pageCount = 1;
  }

  function getPageLinks() {
    var pager = thisInvTable.nextElementSibling;
    return pager.rows[1].children[0].children;
  }

  function countComponent(self) { // jQuery.min
    sendEvent('components', 'countComponent');
    self.parentNode.innerHTML = 'Retrieve page: 1, ';
    initCounters();
    var prm = [$.when(document).done(retriveComponent)];
    Array.prototype.forEach.call(getPageLinks(), function(el) {
      if (el.children.length === 0) {
        prm.push(retryAjax(el.href).done(gotComponentsPage));
      }
    });
    $.when.apply($, prm).done(displayComponentTally);
  }

  function delAllComponent() {
    sendEvent('components', 'delAllComponent');
    var nodeList = thisInvTable.getElementsByClassName('compDelBtn');
    Array.prototype.forEach.call(nodeList, function(el) {
      el.click();
    });
  }

  function compDeleted(self, data) {
    var response = infoBox(data);
    if (response === 'Component destroyed.') {
      var parent = self.parentNode;
      if (parent) {self.parentNode.innerHTML = '';}
    } else {
      $('#dialog_msg').html(response).dialog('open');
    }
  }

  function delComponent(self) { // jQuery.min
    var href = self.previousElementSibling.href;
    retryAjax(href).done(compDeleted.bind(null, self));
  }

  function addDelBtn(el) {
    insertHtmlBeforeEnd(el.parentNode.parentNode,
      '<span class="compDelBtn">Del</span>');
  }

  function enableDelComponent() {
    sendEvent('components', 'enableDelComponent');
    quickDelDiv.classList.add('fshHide');
    delAllDiv.classList.remove('fshHide');
    var nodeList = thisInvTable.getElementsByTagName('IMG');
    Array.prototype.forEach.call(nodeList, addDelBtn);
  }

  function updateUsedCount() {
    usedCount -= 1;
    usedCountDom.textContent = usedCount.toString();
  }

  function delCompType(self) { // jQuery.min
    var id = self.dataset.compid;
    var td = self.parentNode;
    td.innerHTML = '';
    td.className = 'guildTagSpinner';
    td.style.backgroundImage = 'url(\'' + imageServer +
      '/skin/loading.gif\')';
    var prm = [];
    componentList[id].del.forEach(function(href) {
      prm.push(retryAjax(href).done(updateUsedCount));
    });
    $.when.apply($, prm).done(function() {
      componentList[id].dom.forEach(function(el) {el.innerHTML = '';});
      td.parentNode.remove();
    });
  }

  var evtHdl$2 = [
    {
      test: function(self) {return self === compDel;},
      act: enableDelComponent
    },
    {
      test: function(self) {return self === compSum;},
      act: countComponent
    },
    {
      test: function(self) {return self === compDelAll;},
      act: delAllComponent
    },
    {
      test: function(self) {return self === qe;},
      act: function() {
        sendEvent('components', 'insertQuickExtract');
        jQueryDialog(insertQuickExtract);
      }
    },
    {
      test: function(self) {return self.classList.contains('compDelBtn');},
      act: delComponent
    },
    {
      test: function(self) {return self.classList.contains('compDelType');},
      act: delCompType
    }
  ];

  function decorateButton(parentDiv, label) {
    var innerSpan = createSpan(
      {className: 'sendLink', textContent: label});
    parentDiv.textContent = '[';
    insertElement(parentDiv, innerSpan);
    insertHtmlBeforeEnd(parentDiv, ']');
    return innerSpan;
  }

  function profileComponents() {
    var invTables = getInvTables(document);
    if (invTables.length !== 2) {return;}
    thisInvTable = invTables[1];
    var compDiv = thisInvTable.parentNode;
    var cmDiv = createDiv({className: 'fshCenter'});
    quickDelDiv = createDiv();
    sumComp = createDiv();
    delAllDiv = createDiv({className: 'fshHide'});
    var qeDiv = createDiv();
    compDel = decorateButton(quickDelDiv, 'Enable Quick Del');
    compSum = decorateButton(sumComp, 'Count Components');
    compDelAll = decorateButton(delAllDiv, 'Delete All Visible');
    qe = decorateButton(qeDiv, 'Quick Extract Components');
    insertElement(cmDiv, quickDelDiv);
    insertElement(cmDiv, sumComp);
    insertElement(cmDiv, qeDiv);
    insertElement(cmDiv, delAllDiv);
    insertElement(compDiv, cmDiv);
    compDiv.addEventListener('click', eventHandler(evtHdl$2));
  }

  var guildId$3;
  var currentGuildRelationship;
  var guildMessages = {
    self: {color: 'fshGreen', message: getValue('guildSelfMessage')},
    friendly: {color: 'fshOliveDrab', message: getValue('guildFrndMessage')},
    old: {color: 'fshDarkCyan', message: getValue('guildPastMessage')},
    enemy: {color: 'fshRed', message: getValue('guildEnmyMessage')}
  };

  function showRecallButton(playername) {
    if (currentGuildRelationship === 'self') {
      return '<a class="quickButton tip-static" ' +
        'href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&user=' +
        playername + '" data-tipped="Recall items from ' + playername +
        '" style="background-image: url(\'' + imageServer +
        '/temple/3.gif\');"></a>&nbsp;&nbsp;';
    }
    return '';
  }

  function showRankButton(playerid, playername) {
    if (currentGuildRelationship === 'self' && getValue('showAdmin')) {
      return '<a class="quickButton buttonGuildRank tip-static" href="' +
        'index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=' +
        playerid + '" data-tipped="Rank ' + playername +
        '" style="background-image: url(\'' + imageServer +
        '/guilds/' + guildId$3 + '_mini.jpg\');"></a>&nbsp;&nbsp;';
    }
    return '';
  }

  function guildAry(val) {
    if (val) {
      return val.toLowerCase().replace(/\s\s*/g, ' ').split(/\s*,\s*/);
    }
    return [];
  }

  function hasRelationship(txt) {
    return function(el) {return el.test.includes(txt);};
  }

  function externalRelationship(_txt) {
    var scenario = [
      {test: guildAry(getValue('guildFrnd')), type: 'friendly'},
      {test: guildAry(getValue('guildPast')), type: 'old'},
      {test: guildAry(getValue('guildEnmy')), type: 'enemy'}
    ];
    var txt = _txt.toLowerCase().replace(/\s\s*/g, ' ');
    var relObj = scenario.find(hasRelationship(txt));
    if (relObj) {return relObj.type;}
  }

  function thisGuildId(aLink) {
    var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
    if (guildIdResult) {return Number(guildIdResult[1]);}
  }

  function guildRelationship(aLink) {
    guildId$3 = thisGuildId(aLink);
    if (guildId$3 && guildId$3 === currentGuildId()) {
      setValue('guildSelf', aLink.text);
      return 'self';
    }
    return externalRelationship(aLink.text);
  }

  function foundGuildLink(aLink) {
    currentGuildRelationship = guildRelationship(aLink);
    if (currentGuildRelationship) {
      aLink.parentNode.classList.add(
        guildMessages[currentGuildRelationship].color);
      insertHtmlBeforeEnd(aLink.parentNode, '<br>' +
        guildMessages[currentGuildRelationship].message);
    }
  }

  function profileInjectGuildRel(self) {
    var aLink = document.querySelector(
      '#pCC a[href^="index.php?cmd=guild&subcmd=view&guild_id="]');
    if (aLink) {foundGuildLink(aLink);} else if (self) {
      setValue('guildSelf', '');
    }
  }

  function profileInjectQuickButton(avyImg, playerid, playername) {
    var newhtml = '<div align="center">';
    newhtml += '<a class="quickButton buttonQuickBuff tip-static" ' +
      quickBuffHref(playerid) + 'data-tipped="Buff ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/skin/realm/icon_action_quickbuff.gif\');"></a>&nbsp;&nbsp;';
    if (!getValue('enableMaxGroupSizeToJoin')) {
      newhtml += '<a class="quickButton buttonJoinAll tip-static" ' +
        'href="index.php?cmd=guild&subcmd=groups&subcmd2=joinall" ' +
        'data-tipped="Join All Groups" style="background-image: url(\'' +
        imageServer +
        '/skin/icon_action_join.gif\');"></a>&nbsp;&nbsp;';
    } else {
      var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
      newhtml += '<a class="quickButton buttonJoinUnder tip-static" ' +
        'href="index.php?cmd=guild&subcmd=groups&subcmd2=' +
        'joinallgroupsundersize" data-tipped="Join All Groups < ' +
        maxGroupSizeToJoin + ' Members" style="background-image: url(\'' +
        imageServer +
        '/skin/icon_action_join.gif\');"></a>&nbsp;&nbsp;';
    }
    newhtml += '<a class="quickButton tip-static" ' +
      'href="index.php?cmd=auctionhouse&type=-3&tid=' + playerid +
      '" data-tipped="Go to ' + playername +
      '\'s auctions" style="background-image: url(\'' +
      imageServer + '/skin/gold_button.gif\');"></a>&nbsp;&nbsp;';
    newhtml += '<a class="quickButton tip-static" ' +
      'href="index.php?cmd=trade&subcmd=createsecure&target_username=' +
      playername + '" data-tipped="Create Secure Trade to ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/temple/2.gif\');"></a>&nbsp;&nbsp;';
    newhtml += showRecallButton(playername);
    newhtml += showRankButton(playerid, playername);
    newhtml += '</div>';
    insertHtmlAfterEnd(avyImg, newhtml);
  }

  function totalAllyEnemy(target, numberOfContacts, contactsTotal) {
    var _c = '';
    if (contactsTotal && contactsTotal >= numberOfContacts) {
      _c = '/' + contactsTotal;
    }
    insertHtmlBeforeEnd(target, '<span class="fshBlue">&nbsp;' +
      numberOfContacts + _c + '</span>');
  }

  function countContacts(el, isAllies) {
    var target = el.parentNode;
    var numberOfContacts = target.nextSibling.nextSibling
      .getElementsByTagName('table').length - 1;
    if (isAllies) {
      totalAllyEnemy(target, numberOfContacts, getValue('alliestotal'));
    } else {
      totalAllyEnemy(target, numberOfContacts, getValue('enemiestotal'));
    }
  }

  function findAllyEnemy(el) {
    var isAllies = el.textContent === 'Allies';
    var isEnemies = el.textContent === 'Enemies';
    if (isAllies || isEnemies) {
      countContacts(el, isAllies);
    }
  }

  function profileParseAllyEnemy() {
    // Allies/Enemies count/total function
    Array.prototype.forEach.call(
      document.querySelectorAll('#profileLeftColumn strong'), findAllyEnemy);
  }

  function expandBio() {
    var bioExpander = getElementById('fshBioExpander');
    if (bioExpander.textContent === 'More ...') {
      bioExpander.textContent = 'Less ...';
    } else {
      bioExpander.textContent = 'More ...';
    }
    getElementById('fshBioHidden').classList.toggle('fshHide');
  }

  function foundMatchingTags(closeTagIndex, openTagIndex) {
    return closeTagIndex !== -1 &&
      (openTagIndex > closeTagIndex || openTagIndex === -1);
  }

  function doCompression(bioCell, bioContents, maxCharactersToShow) {
    // find the end of next HTML tag after the max characters to show.
    var breakPoint = bioContents.indexOf('<br>', maxCharactersToShow) + 4;
    var lineBreak = '';
    if (breakPoint === 3) {
      breakPoint = bioContents.indexOf(' ', maxCharactersToShow) + 1;
      if (breakPoint === 0) {return;}
      lineBreak = '<br>';
    }
    var bioStart = bioContents.substring(0, breakPoint);
    var bioEnd = bioContents.substring(breakPoint, bioContents.length);
    var extraOpenHTML = '';
    var extraCloseHTML = '';
    var tagList = ['b', 'i', 'u', 'span'];
    tagList.forEach(function(tag) {
      var closeTagIndex = bioEnd.indexOf('</' + tag + '>');
      var openTagIndex = bioEnd.indexOf('<' + tag + '>');
      if (foundMatchingTags(closeTagIndex, openTagIndex)) {
        extraOpenHTML += '<' + tag + '>';
        extraCloseHTML += '</' + tag + '>';
      }
    });
    bioCell.innerHTML = bioStart + extraCloseHTML + lineBreak +
      '<span id="fshBioExpander" class="sendLink">More ...</span><br>' +
      '<span class="fshHide" id="fshBioHidden">' + extraOpenHTML + bioEnd +
      '</span>';
    getElementById('fshBioExpander')
      .addEventListener('click', expandBio);
  }

  function findStartPosition(bioContents, _maxRowsToShow) {
    var maxRowsToShow = _maxRowsToShow;
    var startIndex = 0;
    while (maxRowsToShow > 0) {
      maxRowsToShow -= 1;
      startIndex = bioContents.indexOf('<br>\n', startIndex + 1);
    }
    return startIndex;
  }

  function bioIsTooSmall(bio, maxChar, lines, maxRows) {
    return bio.length <= maxChar && lines < maxRows;
  }

  function compressBio(bioCell) {
    var bioContents = bioCell.innerHTML;
    var maxCharactersToShow = getValue('maxCompressedCharacters');
    var maxRowsToShow = getValue('maxCompressedLines');
    var numberOfLines = bioContents.substr(0, maxCharactersToShow)
      .split(/<br>\n/).length - 1;
    if (bioIsTooSmall(bioContents, maxCharactersToShow, numberOfLines,
      maxRowsToShow)) {return;}
    if (numberOfLines >= maxRowsToShow) {
      maxCharactersToShow = findStartPosition(bioContents, maxRowsToShow);
    }
    doCompression(bioCell, bioContents, maxCharactersToShow);
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
    if (getValue('enableBioCompressor')) {compressBio(bioCell);}
    bioCell.addEventListener('click', bioEvtHdl);
  }

  function quickWearLink() {
    // quick wear manager link
    var node = document.querySelector('#profileRightColumn ' +
      'a[href="index.php?cmd=profile&subcmd=togglesection&section_id=2"]');
    if (!node) {return;}
    var wrap = createSpan({innerHTML: '&nbsp;['});
    var qw = createSpan({className: 'sendLink', innerHTML: 'Quick&nbsp;Wear'});
    insertElement(wrap, qw);
    insertTextBeforeEnd(wrap, ']');
    insertElement(node.parentNode, wrap);
    qw.addEventListener('click', function() {
      sendEvent('profile', 'insertQuickWear');
      jQueryDialog(insertQuickWear);
    });
  }

  function profileSelectAll() {
    var bpTabs = getElementById('backpack_tabs');
    var type = bpTabs.getElementsByClassName('tab-selected')[0]
      .getAttribute('data-type');
    var items = document.querySelectorAll('#backpackTab_' + type +
      ' li:not(.hcsPaginate_hidden) .backpackItem');
    if (items.length === 0) {return;}
    var checkboxes = document.querySelectorAll('#backpackTab_' + type +
      ' li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)');
    if (checkboxes.length > 0) {items = checkboxes;}
    Array.prototype.forEach.call(items, function(el) {el.click();});
  }

  function selectAllLink() {
    // select all link
    var node = document.querySelector('#profileRightColumn' +
      ' a[href="index.php?cmd=profile&subcmd=dropitems"]');
    if (!node) {return;}
    var allSpan = createSpan({className: 'smallLink', textContent: 'All'});
    allSpan.addEventListener('click', profileSelectAll);
    var wrapper = createSpan({innerHTML: '[&nbsp;'});
    insertElement(wrapper, allSpan);
    insertHtmlBeforeEnd(wrapper, '&nbsp;]&nbsp;');
    insertElement(node.parentNode, wrapper);
  }

  function storeVL() {
    // store the VL of the player
    var virtualLevel = parseInt(getElementById('stat-vl').textContent, 10);
    if (intValue(document.getElementsByClassName('stat-level')[0]
      .nextElementSibling.textContent) === virtualLevel) {
      setValue('characterVirtualLevel', ''); // ?
    } else {
      setValue('characterVirtualLevel', virtualLevel);
    }
  }

  function gotAtk(nmvImg, atkStat) {
    var defStat = Number(
      getElementById('stat-defense').firstChild.textContent.trim());
    var oldTipped = nmvImg.dataset.tipped;
    var lvlAry = /\(Level: (\d+)\)/.exec(oldTipped);
    var nmvLvl = Number(lvlAry[1]);
    var nmvEffect = Math.floor(atkStat * nmvLvl * 0.0025);
    nmvImg.dataset.tipped = oldTipped.slice(0, -15) +
      '<br>Attack: ' + (atkStat - nmvEffect).toString() +
      '&nbsp;&nbsp;Defense: ' + (defStat + nmvEffect).toString() +
      '</center></div>';
  }

  function gotImg(nmvImg) {
    var atkEl = getElementById('stat-attack');
    if (!atkEl) {return;}
    var atkStat = Number(atkEl.firstChild.textContent.trim());
    if (!isNaN(atkStat)) {gotAtk(nmvImg, atkStat);}
  }

  function updateNmv() {
    var nmvImg = document.querySelector(
      '#profileRightColumn img[src$="/60_sm.gif"]');
    if (nmvImg) {gotImg(nmvImg);}
  }

  function removeStatTable(el) {
    var tde = el.getElementsByTagName('td');
    el.parentNode.innerHTML = tde[0].innerHTML.replace(/&nbsp;/g, ' ') +
      '<div class="profile-stat-bonus">' + tde[1].textContent + '</div>';
  }

  function updateStatistics() {
    var charStats = getElementById('profileLeftColumn')
      .getElementsByTagName('table')[0];
    var dodgyTables = charStats.getElementsByTagName('table');
    Array.prototype.forEach.call(dodgyTables, removeStatTable);
  }

  function ifSelf(self) {
    if (self) {
      // self inventory
      fastDebuff();
      profileParseAllyEnemy();
      injectFastWear();
      profileComponents();
      quickWearLink();
      selectAllLink();
      storeVL();
      nekidBtn();
      ajaxifyProfileSections();
    }
  }

  function yuuzhan(playername, avyImg) {
    if (playername === 'yuuzhan') {
      avyImg.src = 'http://evolutions.yvong.com/images/tumbler.gif';
      avyImg.addEventListener('click', function() {
        $('#dialog_msg').text('Winner!').dialog('open');
      });
    }
  }

  function injectProfile() { // Legacy
    if (jQueryNotPresent()) {return;}
    var avyImg = document
      .querySelector('#profileLeftColumn img[oldtitle*="\'s Avatar"]');
    if (!avyImg) {return;}
    var playername = pCC.getElementsByTagName('h1')[0].textContent;
    var self = playername === playerName();
    ifSelf(self);
    // Must be before profileInjectQuickButton
    profileInjectGuildRel(self);
    // It sets up guildId and currentGuildRelationship
    var playerid = fallback(getUrlParameter('player_id'), playerId());
    profileInjectQuickButton(avyImg, playerid, playername);

    //* ************* yuuzhan having fun
    yuuzhan(playername, avyImg);
    //* *************

    updateNmv();
    updateStatistics();
    profileRenderBio(self);
    addStatTotalToMouseover();
    add(3, colouredDots);
  }

  function injectMoveItems() {
    var flrRow = pCC.getElementsByTagName('form')[0]
      .nextElementSibling.nextElementSibling.nextElementSibling;
    var folders = flrRow.getElementsByTagName('img');
    var flrEnabled;
    var oFlr;
    var options = '<tr><td class="fshCenter">Move selected items to: ' +
      '<select name="folder" id="selectFolderId" class="customselect">';
    Array.prototype.forEach.call(folders, function(e) {
      var src = e.getAttribute('src');
      if (src.indexOf('/folder_on.gif') !== -1) {flrEnabled = true;}
      if (src.indexOf('/folder.gif') !== -1) {
        oFlr = true;
        options += '<option value=' + e.parentNode.href
          .match(/&folder_id=(-*\d+)/i)[1] + '>' +
          e.parentNode.parentNode.textContent + '</option>';
      }
    });
    if (!flrEnabled || !oFlr) {return;}
    options += '</select>&nbsp;<input type="button" class="custombutton" ' +
      'id="fshMove" value="Move"></td></tr>';
    insertHtmlAfterEnd(flrRow, options);
  }

  var invItems$1;
  var type;
  var itemId;

  function tickElement(o, el) {
    el.checked = !el.disabled && !el.checked;
  }

  var types = [
    {
      c: function() {return type === 'guild';},
      r: function(o, el) {
        el.checked = !el.disabled && invItems$1[o.invid].guild_tag !== -1;
      }
    },
    {
      c: function(o) {
        return type === 'item' && invItems$1[o.invid].item_id === itemId;
      },
      r: tickElement
    },
    {
      c: function() {return type === 'checkAll';},
      r: tickElement
    }
  ];

  function testType(o, el) {
    var match = types.find(function(test) {
      return test.c(o);
    });
    if (match) {match.r(o, el);}
  }

  function doCheckboxes(itemsAry, invItems_, type_, itemId_) {
    invItems$1 = invItems_;
    type = type_;
    itemId = Number(itemId_);
    itemsAry.forEach(function(o) {
      var tr = o.injectHere.parentNode;
      if (tr.classList.contains('fshHide')) {return;}
      var el = o.el.parentNode.parentNode.previousElementSibling
        .firstElementChild;
      testType(o, el);
    });
  }

  function extraButtons() {
    var tRows = pCC.getElementsByTagName('table')[0].rows;
    insertHtmlAfterBegin(tRows[tRows.length - 2].cells[0],
      '<input id="fshChkAll" value="Check All" type="button">&nbsp;');
  }

  function doFolderButtons$1(folders) {
    if (calf.subcmd2 === 'storeitems') {
      var formNode = pCC.getElementsByTagName('form')[0];
      if (formNode) {
        var tr = createTr({className: 'fshCenter'});
        var insertHere = createTd({colSpan: 3});
        insertElement(tr, insertHere);
        formNode.parentNode.insertBefore(tr, formNode);
        insertHere.innerHTML = makeFolderSpans$1(folders);
        extraButtons();
      }
    }
  }

  var insertHere;

  function setInsertHere() {
    if (!insertHere) {
      var cltn = pCC.getElementsByTagName('form');
      if (cltn.length > 0) {
        insertHere = cltn[0].previousElementSibling.firstElementChild;
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

  function hideFolders$1(itemsAry, invItems, self) {
    var folderId = Number(self.dataset.folder);
    itemsAry.forEach(function(o) {
      o.el.parentNode.parentNode.previousElementSibling.firstElementChild
        .checked = false;
      var tr = o.injectHere.parentNode;
      var separator = tr.nextElementSibling;
      if (folderId === 0) {
        tr.classList.remove('fshHide');
        separator.classList.remove('fshHide');
      } else {
        var folder = invItems[o.invid].folder_id;
        var force = folderId !== folder;
        toggleForce(tr, force);
        toggleForce(separator, force);
      }
    });
  }

  function moveItemsToFolder(itemsAry) { // jQuery.min
    var folderId = getElementById('selectFolderId').value;
    var batchNo;
    var counter = 0;
    var invList = [];
    var prm = [];
    itemsAry.forEach(function(o) {
      var el = o.injectHere.previousElementSibling.previousElementSibling
        .firstElementChild;
      if (el.checked) {
        batchNo = Math.floor(counter / 50);
        invList[batchNo] = fallback(invList[batchNo], []);
        invList[batchNo].push(o.invid);
        counter += 1;
        if (counter % 50 === 0) {
          prm.push(moveItem(invList[batchNo], folderId));
        }
      }
    });
    if (counter % 50 !== 0) {
      prm.push(moveItem(invList[batchNo], folderId));
    }
    $.when.apply($, prm).done(function() {location.reload();}); // TODO ajaxify this
  }

  function anotherSpinner$1(self) {
    self.innerHTML = '<img class="quickActionSpinner" src="' +
      imageServer +
      '/skin/loading.gif" width="15" height="15">';
  }

  function quickAction(self, fn, success, otherClass) { // jQuery.min
    self.className = 'quickAction';
    var itemInvId = self.getAttribute('itemInvId');
    fn([itemInvId]).done(function(data) {
      if (data.r === 1) {return;}
      self.style.color = 'green';
      self.innerHTML = success;
    });
    $(self).qtip('hide');
    anotherSpinner$1(self);
    var theTd = self.parentNode;
    var otherButton = theTd.querySelector(otherClass);
    if (otherButton) {
      otherButton.className = 'quickAction';
      otherButton.innerHTML = '';
    }
    var checkbox = theTd.parentNode.firstElementChild.firstElementChild;
    checkbox.checked = false;
    checkbox.disabled = true;
  }

  var disableItemColoring;
  var showExtraLinks;
  var showQuickDropLinks$1;
  var showQuickSendLinks$1;

  function setShowExtraLinks() {
    showExtraLinks = !showExtraLinks;
    setValue('showExtraLinks', showExtraLinks);
  }

  function setShowQuickDropLinks() {
    showQuickDropLinks$1 = !showQuickDropLinks$1;
    setValue('showQuickDropLinks', showQuickDropLinks$1);
  }

  function getPrefs() {
    disableItemColoring = getValue('disableItemColoring');
    showExtraLinks = getValue('showExtraLinks');
    showQuickDropLinks$1 = getValue('showQuickDropLinks');
    showQuickSendLinks$1 = getValue('showQuickSendLinks');
  }

  var itemsAry$1;
  var itemsHash;

  function getItemImg() {
    var allTables = pCC.getElementsByTagName('table');
    var lastTable = allTables[allTables.length - 1];
    return lastTable.getElementsByTagName('img');
  }

  function getItems$1() {
    addStatTotalToMouseover();
    getPrefs();
    doToggleButtons(showExtraLinks, showQuickDropLinks$1);
    // pCC.addEventListener('click', eventHandler(evts));
    var imgList = getItemImg();
    itemsAry$1 = [];
    itemsHash = {};
    Array.prototype.forEach.call(imgList, function(el) {
      var tipped = el.dataset.tipped;
      if (tipped) {
        var matches = tipped.match(itemRE);
        itemsHash[matches[1]] = (itemsHash[matches[1]] || 0) + 1;
        var injectHere = el.parentNode.parentNode.nextElementSibling;
        itemsAry$1.push({
          el: el,
          invid: matches[2],
          injectHere: injectHere
        });
      }
    });
    // Exclude composed pots
    itemsHash[13699] = 1;
  }

  var extraLinks;
  var paintCount;
  var checkAll;
  var dropLinks;
  var invItems$2;
  var colouring;
  var sendLinks;

  function afterbegin(o, item) {
    if (fallback(extraLinks, !showExtraLinks)) {return;}
    var pattern = '<span><span class="aHLink">';
    if (!item.bound) {
      pattern += '[<a href="index.php?cmd=auctionhouse&search=' +
        encodeURIComponent(item.item_name) + '">AH</a>]';
    }
    pattern += '</span>[<a href="' + guideUrl + 'items&subcmd=view&item_id=' +
      item.item_id + '" target="_blank">UFSG</a>]</span>';
    insertHtmlAfterBegin(o.injectHere, pattern);
  }

  function itemColouring(o, item) {
    if (!colouring && !disableItemColoring) {
      o.injectHere.classList.add(rarity[item.rarity].clas);
    }
  }

  var buildTrailer = [
    {
      test: function(item) {return !checkAll && itemsHash[item.item_id] !== 1;},
      act: function(o, item) {
        return ' [<span linkto="' + item.item_id +
          '" class="fshLink">Check all</span>]';
      }
    },
    {
      test: function(item) {
        return !sendLinks && showQuickSendLinks$1 && !item.bound;
      },
      act: function(o) {
        return ' <span class="quickAction sendLink tip-static" ' +
          'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
          'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>';
      }
    },
    {
      test: function(item) {
        return !dropLinks && showQuickDropLinks$1 && item.guild_tag === -1;
      },
      act: function(o) {
        return ' <span class="quickAction dropLink tip-static" itemInvId="' +
          o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
          'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>';
      }
    }
  ];

  function beforeend(o, item) {
    itemColouring(o, item);
    var pattern = buildTrailer.reduce(function(prev, el) {
      var ret = prev;
      if (el.test(item)) {
        ret += el.act(o, item);
      }
      return ret;
    }, '');
    if (pattern !== '') {insertHtmlBeforeEnd(o.injectHere, pattern);}
  }

  function itemWidgets(o, item) {
    if (item) {
      afterbegin(o, item);
      beforeend(o, item);
    }
  }

  function doneInvPaint() {
    if (showExtraLinks) {extraLinks = true;}
    checkAll = true;
    colouring = true;
    if (showQuickDropLinks$1) {dropLinks = true;}
    sendLinks = true;
  }

  function invPaint() { // Native - abstract this pattern
    var limit = performance.now() + 5;
    while (moreToDo(limit, paintCount, itemsAry$1)) {
      var o = itemsAry$1[paintCount];
      var item = invItems$2[o.invid];
      itemWidgets(o, item);
      paintCount += 1;
    }
    if (paintCount < itemsAry$1.length) {
      add(3, invPaint);
    } else {
      doneInvPaint();
    }
  }

  function toggleShowExtraLinks() {
    setShowExtraLinks();
    doToggleButtons(showExtraLinks, showQuickDropLinks$1);
    if (!extraLinks) {
      paintCount = 0;
      add(3, invPaint);
    } else {
      itemsAry$1.forEach(function(o) {
        var el = o.injectHere.firstElementChild;
        toggleForce(el, !showExtraLinks);
      });
    }
  }

  function toggleShowQuickDropLinks() {
    setShowQuickDropLinks();
    doToggleButtons(showExtraLinks, showQuickDropLinks$1);
    if (!dropLinks) {
      paintCount = 0;
      add(3, invPaint);
    } else {
      itemsAry$1.forEach(function(o) {
        var el = o.injectHere.querySelector('.dropLink');
        toggleForce(el, !showQuickDropLinks$1);
      });
    }
  }

  var evts = [
    {
      test: function(self) {return self.id === 'fshShowExtraLinks';},
      act: toggleShowExtraLinks
    },
    {
      test: function(self) {return self.id === 'fshShowQuickDropLinks';},
      act: toggleShowQuickDropLinks
    },
    {
      test: function(self) {return self.id === 'fshSelectAllGuildLocked';},
      act: function() {doCheckboxes(itemsAry$1, invItems$2, 'guild');}
    },
    {
      test: function(self) {return self.id === 'fshMove';},
      act: function() {moveItemsToFolder(itemsAry$1);}
    },
    {
      test: function(self) {return self.hasAttribute('linkto');},
      act: function(self) {
        doCheckboxes(itemsAry$1, invItems$2, 'item', self.getAttribute('linkto'));
      }
    },
    {
      test: function(self) {return self.classList.contains('sendLink');},
      act: function(self) {quickAction(self, sendItem, 'Sent', '.dropLink');}
    },
    {
      test: function(self) {return self.classList.contains('dropLink');},
      act: function(self) {quickAction(self, dropItem, 'Dropped', '.sendLink');}
    },
    {
      test: function(self) {return self.classList.contains('fshFolder');},
      act: function(self) {hideFolders$1(itemsAry$1, invItems$2, self);}
    },
    {
      test: function(self) {return self.id === 'fshChkAll';},
      act: function() {doCheckboxes(itemsAry$1, invItems$2, 'checkAll');}
    }
  ];

  function badData(data) {
    return !data || !data.items || !data.folders;
  }

  function inventory$1(data) {
    if (badData(data)) {return;}
    extraLinks = false;
    checkAll = false;
    invItems$2 = data.items;
    colouring = false;
    dropLinks = false;
    sendLinks = false;
    paintCount = 0;
    add(3, invPaint);
    doFolderButtons$1(data.folders);
  }

  function injectStoreItems() {
    if (jQueryNotPresent()) {return;}
    getInventoryById().done(inventory$1);
    add(3, getItems$1);
    pCC.addEventListener('click', eventHandler(evts));
  }

  function injectProfileDropItems() {
    injectStoreItems();
    injectMoveItems();
  }

  var retries = 0;
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
  var excludeBuff = {
    'skill-50': 'Death Dealer',
    'skill-54': 'Counter Attack',
    'skill-55': 'Summon Shield Imp',
    'skill-56': 'Vision',
    'skill-60': 'Nightmare Visage',
    'skill-61': 'Quest Finder',
    'skill-98': 'Barricade',
    'skill-101': 'Severe Condition'
  };

  function getEnhancement(doc, enh, inject) {
    var enhLevel = doc[enh] || 0;
    var enhClass = 'fshLime';
    if (enhLevel < 100) {enhClass = 'fshRed';}
    inject.innerHTML = '<span class="' + enhClass + '">' + enhLevel + '%</span>';
  }

  function timeUnit(value, unit) {
    if (value > 0) {return value.toString() + unit;}
    return '';
  }

  function buffTimeLeft(_s) {
    var m = Math.floor(_s / 60);
    var s = _s % 60;
    var buffTimeToExpire = timeUnit(m, 'm');
    if (m > 0 && s > 0) {buffTimeToExpire += ' ';}
    buffTimeToExpire += timeUnit(s, 's');
    return buffTimeToExpire;
  }

  function getBuff(doc, buff, inject) {
    var s = fallback(doc[buff], 0);
    if (s) {
      var buffTimeToExpire = buffTimeLeft(s);
      inject.innerHTML = '<span class="fshLime">On</span>&nbsp;<span ' +
        'class="fshBuffOn">(' + buffTimeToExpire + ')</span>';
    } else {
      var elem = getElementById('buff-outer')
        .querySelector('input[data-name="' + buff + '"]');
      if (elem) {
        inject.innerHTML = '<span class="quickbuffActivate" ' +
          'buffID="' + elem.getAttribute('value') + '">Activate</span>';
      } else {
        inject.innerHTML = '<span class="fshRed;">Off</span>';
      }
    }
  }

  function itWorked(result) {
    return result &&
      (result.textContent.indexOf(
        'current or higher level is currently active on') !== -1 ||
      result.textContent.indexOf('was activated on') !== -1);
  }

  function quickActivate(evt) { // jQuery
    var trigger = evt.target;
    if (trigger.className !== 'quickbuffActivate') {return;}
    var buffHref = '?cmd=quickbuff&subcmd=activate&targetPlayers=' +
      window.self + '&skills[]=' + trigger.getAttribute('buffID');
    retryAjax(buffHref).done(function(data) {
      var doc = createDocument(data);
      var result = doc.querySelector('#quickbuff-report font');
      if (itWorked(result)) {
        trigger.className = 'fshLime';
        trigger.innerHTML = 'On';
      }
    });
  }

  function addStatsQuickBuff(data) {
    var myPlayer = document.querySelector('div.player[data-username="' +
      data.username + '"]');
    var activity = myPlayer.querySelector('span.fshLastActivity');
    if (!activity) {
      activity = createSpan({className: 'fshLastActivity'});
      var player = myPlayer.getElementsByTagName('h1')[0];
      insertElementAfter(activity, player);
    }
    activity.innerHTML = 'Last Activity: ' +
      formatLastActivity(data.last_login) +
      '<br>Stamina: ' + data.current_stamina + ' / ' +
      data.stamina + ' ( ' + Math.floor(data.current_stamina /
      data.stamina * 100) + '% )';
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
    var lvlSpan = el.nextElementSibling.firstElementChild.firstElementChild;
    var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
    var fshPlayerSpan = newPlayerSpan(el, playerSpan);
    var buffColor = getBuffColor(myLvl, playerBuffLevel);
    fshPlayerSpan.innerHTML = ' <span class="' + buffColor +
      '">[' + playerBuffLevel + ']</span>';
  }

  function hazBuff(playerData, el) {
    var myBuffName = el.getAttribute('data-name');
    var playerBuffLevel = playerData[myBuffName];
    var playerSpan = el.nextElementSibling.nextElementSibling;
    if (playerBuffLevel || playerSpan) {
      buffRunning(el, playerBuffLevel, playerSpan);
    }
  }

  function addBuffLevels(evt) {
    var player = evt.target;
    if (player.tagName !== 'H1') {return;}
    getProfile(player.textContent).done(addStatsQuickBuff);

    var playerData = player.parentNode.lastElementChild.textContent.split(',');
    playerData = playerData.reduce(function(prev, curr) {
      if (curr.indexOf(' [') !== -1) {
        var foo = curr.split(' [');
        prev[foo[0].trim()] = parseInt(foo[1].replace(']', ''), 10);
      }
      return prev;
    }, {});

    var buffOuter = getElementById('buff-outer');
    var nodeList = buffOuter.querySelectorAll('input[name]');

    Array.prototype.forEach.call(nodeList, hazBuff.bind(null, playerData));

  }

  function doLabels(el) {
    var nameSpan = el.firstElementChild;
    var dataTipped = nameSpan.dataset.tipped;
    var cost = el.previousElementSibling.getAttribute('data-cost');
    nameSpan.dataset.tipped = dataTipped
      .replace('</center>', '<br>Stamina Cost: ' + cost + '$&');
    var lvlSpan = nameSpan.firstElementChild;
    var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
    if (!excludeBuff[el.getAttribute('for')] && myLvl < 125) {
      el.classList.add('fshDim');
    }
  }

  function waitForPlayer(firstPlayer) {
    return !firstPlayer && retries < 9;
  }

  function haveTargets() {
    var firstPlayer = getElementById('players')
      .getElementsByTagName('h1')[0];
    if (waitForPlayer(firstPlayer)) {
      retries += 1;
      setTimeout(haveTargets, 100);
      return;
    }
    if (!firstPlayer) {return;}
    firstPlayer.click();
  }

  function firstPlayerStats() {
    var targets = getElementById('targetPlayers')
      .getAttribute('value');
    if (targets && targets !== '') {haveTargets();}
  }

  function getSustain$1(responseText) {
    var enh = responseText._enhancements.reduce(function(prev, curr) {
      prev[curr.name] = curr.value;
      return prev;
    }, {});
    var skl = responseText._skills.reduce(function(prev, curr) {
      prev[curr.name] = curr.duration;
      return prev;
    }, {});
    getEnhancement(enh, 'Sustain', getElementById('fshSus'));
    getEnhancement(enh, 'Fury Caster', getElementById('fshFur'));
    getBuff(skl, 'Guild Buffer', getElementById('fshGB'));
    getBuff(skl, 'Buff Master', getElementById('fshBM'));
    getBuff(skl, 'Extend', getElementById('fshExt'));
    getBuff(skl, 'Reinforce', getElementById('fshRI'));

    getElementById('helperQBheader')
      .addEventListener('click', quickActivate);
    getElementById('players')
      .addEventListener('click', addBuffLevels);

    var labels = getElementById('buff-outer')
      .querySelectorAll('label[for^="skill-"]');
    Array.prototype.forEach.call(labels, doLabels);

    firstPlayerStats();

  }

  function injectQuickBuff() { // jQuery
    if (jQueryNotPresent()) {return;}
    var quickbuffDiv = getElementById('quickbuff');
    if (!quickbuffDiv) {return;}
    insertHtmlAfterEnd(quickbuffDiv.firstElementChild, quickBuffHeader);
    getProfile(window.self).done(getSustain$1);
  }

  function reduceBuffArray(buffAry) {
    return buffAry.reduce(function(prev, curr) {
      prev[curr.name] = Number(curr.level);
      return prev;
    }, {});
  }

  var packRE = />([ a-zA-Z]+) Level (\d+)/g;

  function postWarnings(myBuffs) {
    var packsRow = pCC.firstElementChild.rows[9];
    if (!packsRow) {return;}
    var nodeList = packsRow.cells[0].firstElementChild.getElementsByTagName('A');
    Array.prototype.forEach.call(nodeList, function(el) {
      var tipped = el.dataset.tipped;
      var packBuffs;
      while ((packBuffs = packRE.exec(tipped)) !== null) {
        if (myBuffs[packBuffs[1]] === Number(packBuffs[2])) {
          insertHtmlBeforeEnd(el.parentNode,
            '<br><span class="fshRed fshNoWrap">' + packBuffs[1] + ' ' +
            packBuffs[2] + ' active</span>');
        }
      }
    });
  }

  function parseProfile(data) {
    if (data._skills.length !== 0) {
      var myBuffs = reduceBuffArray(data._skills);
      postWarnings(myBuffs);
    }
  }

  function injectRPUpgrades() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    myStats().done(parseProfile);
  }

  var spinner = '<span class="guildReportSpinner" style="background-image: ' +
    'url(\'' + imageServer + '/skin/loading.gif\');"></span>';

  function recallItem$1(evt) { // jQuery
    $(evt.target).qtip('hide');
    var mode = evt.target.getAttribute('mode');
    var theTd = evt.target.parentNode.parentNode;
    if (mode === '0') {theTd = theTd.parentNode;}
    var href = theTd.firstElementChild.href;
    queueRecallItem({
      invId: href.match(/&id=(\d+)/)[1],
      playerId: href.match(/&player_id=(\d+)/)[1],
      mode: mode,
      action: evt.target.getAttribute('action')
    })
      .done(function(data) {
        if (data.r === 1) {return;}
        theTd.innerHTML = '<span class="fastWorn">' +
          'You successfully recalled the item</span>';
      });
    theTd.innerHTML = spinner;
  }

  function wearItem$1(evt) { // jQuery
    $(evt.target).qtip('hide');
    var theTd = evt.target.parentNode.parentNode.parentNode;
    var href = theTd.firstElementChild.href;
    equipItem(href.match(/&id=(\d+)/)[1]).done(function(data) {
      if (data.r === 1) {return;}
      theTd.innerHTML = '<span class="fastWorn">Worn</span>';
    });
    theTd.innerHTML = spinner;
  }

  var events$1 = [
    {test: 'recall', fn: recallItem$1},
    {test: 'equip', fn: wearItem$1},
    {
      test: 'a-reply',
      fn: function(evt) {
        window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
      }
    }
  ];

  function eventHandlers$1(evt) {
    for (var i = 0; i < events$1.length; i += 1) {
      if (evt.target.classList.contains(events$1[i].test)) {
        events$1[i].fn(evt);
        return;
      }
    }
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
  var potObj;
  var potOpts;
  var inventory$2;
  var mapping;
  var thresholds;

  function createContainer() {
    return createDiv({
      id: 'potReport',
      innerHTML: '<input id="pottab1" type="checkbox" name="pottabs"' +
        isChecked(potOpts.pottab1) + '>' +
        '<label for="pottab1">Composed Potion Inventory</label>' +
        '<input id="pottab2" type="checkbox" name="pottabs"' +
        isChecked(potOpts.pottab2) + '>' +
        '<label for="pottab2">Mapping</label>' +
        '<input id="pottab3" type="checkbox" name="pottabs"' +
        isChecked(potOpts.pottab3) + '>' +
        '<label for="pottab3">Thresholds</label>'
    });
  }

  function createThresholds() {
    return createDiv({
      id: 'thresholds',
      innerHTML: 'Min:' +
        '<input id="minpoint" type="number" value="' +
        potOpts.minpoint + '" min="0" max="999">' +
        'Max:' +
        '<input id="maxpoint" type="number" value="' +
        potOpts.maxpoint + '" min="0" max="999">',
    });
  }

  function sortKeys(obj) {
    return Object.keys(obj).sort(alpha$1).reduce(function(result, key) {
      result[key] = obj[key];
      return result;
    }, {});
  }

  function resetMap() {
    potOpts.myMap = Object.keys(potObj).reduce(function(prev, pot) {
      prev[pot] = pot;
      return prev;
    }, {});
  }

  function buildMap() {
    Object.keys(potObj).forEach(function(pot) {
      if (!potOpts.myMap[pot]) {potOpts.myMap[pot] = pot;}
    });
    potOpts.myMap = sortKeys(potOpts.myMap);
  }

  function buildOptions$1(select) {
    return '<select name="' + select +
      '"><option value="Ignore">Ignore</option>' +
      Object.keys(potOpts.myMap).reduce(function(prev, pot) {
        return prev + '<option value="' + pot + '"' +
          isSelected(pot, potOpts.myMap[select]) + '>' + pot + '</option>';
      }, '') + '</select>';
  }

  function drawMapping() {
    mapping.innerHTML = '<table><tbody>' +
      Object.keys(potOpts.myMap).reduce(function(prev, pot) {
        var options = buildOptions$1(pot);
        return prev + '<tr height="19px"><td>' + pot + '</td><td>' + options +
          '</td></tr>';
      }, '') + '<tr><td></td><td class="fshCenter">' +
      '<input id="fshReset" value="Reset" type="button">' +
      '</td></tr></tbody></table>';
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

  function pivotPotObj(prev, pot) {
    if (potOpts.myMap[pot] !== 'Ignore') {
      if (prev[potOpts.myMap[pot]]) {
        prev[potOpts.myMap[pot]] += potObj[pot];
      } else {
        prev[potOpts.myMap[pot]] = potObj[pot];
      }
    }
    return prev;
  }

  function makeRowsFromPivot(pivot, prev, pot) {
    return prev + '<tr height="19px"><td>' + pot +
      '</td><td style="background-color: ' +
      perc2color((pivot[pot] - potOpts.minpoint) /
      (potOpts.maxpoint - potOpts.minpoint) * 100) + ';">' +
      pivot[pot].toString() + '</td></tr>';
  }

  function drawInventory() {
    var pivot = Object.keys(potObj).reduce(pivotPotObj, {});
    inventory$2.innerHTML = '<table><tbody>' +
      Object.keys(pivot).reduce(makeRowsFromPivot.bind(null, pivot), '') +
      '</tbody></table>';
  }

  function onChange(e) {
    if (e.target.tagName === 'SELECT') {
      potOpts.myMap[e.target.name] = e.target.value;
      setForage(storeMap, potOpts);
      drawInventory();
    }
  }

  function doReset$1() {
    resetMap();
    setForage(storeMap, potOpts);
    drawMapping();
    drawInventory();
  }

  function saveState(self) {
    var option = self.id;
    potOpts[option] = self.checked;
    setForage(storeMap, potOpts);
  }

  var evtHdl$3 = [
    {
      test: function(self) {return self.id === 'fshReset';},
      act: doReset$1
    },
    {
      test: function(self) {
        return /^pottab\d$/.test(self.id);
      },
      act: saveState
    }
  ];

  function onInput(e) {
    var self = e.target.id;
    var maybeValue = testRange(e.target.value, 0, 999);
    if (maybeValue) {
      potOpts[self] = maybeValue;
      setForage(storeMap, potOpts);
      drawInventory();
    }
  }

  function gotMap(data) {
    potOpts = extend({}, defaultOpts);
    extend(potOpts, fallback(data, {}));
    buildMap(potObj);
    setForage(storeMap, potOpts);
    var container = createContainer();
    var panels = createDiv({id: 'panels'});
    insertElement(container, panels);
    inventory$2 = createDiv({id: 'inventory'});
    drawInventory();
    insertElement(panels, inventory$2);
    mapping = createDiv({id: 'mapping'});
    drawMapping();
    insertElement(panels, mapping);
    thresholds = createThresholds();
    insertElement(panels, thresholds);

    var myCell = pCC.lastElementChild.insertRow(2).insertCell(-1);
    myCell.addEventListener('change', onChange);
    myCell.addEventListener('click', eventHandler(evtHdl$3));
    myCell.addEventListener('input', onInput);
    insertElement(myCell, container);
  }

  function potReport(potObj_) {
    potObj = sortKeys(potObj_);
    getForage(storeMap).done(gotMap);
  }

  var wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|' +
    'Gut Rot Head Splitter|Serum');
  var counter;
  var nodeArray;
  var nodeList;
  var potObj$1;

  function paintChild() {
    var limit = performance.now() + 1;
    while (moreToDo(limit, counter, nodeArray)) {
      var el = nodeList[counter];
      var inject = nodeArray[counter];
      insertElement(el, inject);
      counter += 1;
    }
    if (counter < nodeArray.length) {
      add(3, paintChild);
    }
  }

  function hideElement$1(test) {
    if (test) {return ' class="fshHide"';}
    return '';
  }

  function isEquipable(test) {
    if (test) {return 'recall';}
    return 'equip';
  }

  function addPotObj(item) {
    if (item.indexOf(' (Potion)') !== -1) {
      var itemName = item.replace(' (Potion)', '');
      if (potObj$1[itemName]) {
        potObj$1[itemName] += 1;
      } else {
        potObj$1[itemName] = 1;
      }
    }
  }

  function mySpan(el) {
    var secondHref = el.children.length === 2;
    var firstHref = hideElement$1(!secondHref);
    var itemName = el.previousElementSibling.innerHTML;
    addPotObj(itemName);
    var wearable = hideElement$1(wearRE.test(itemName));
    var equipable = isEquipable(secondHref);
    return createSpan({
      innerHTML: '<span' + firstHref +
      '> | <span class="sendLink recall tip-static" data-tipped="' +
      'Click to recall to backpack" mode="0" action="recall">Fast BP' +
      '</span></span>' +
      ' | <span class="sendLink recall tip-static" ' +
      'data-tipped="Click to recall to guild store" mode="1" ' +
      'action="recall">Fast GS</span>' +
      '<span' + wearable +
      '> | <span class="sendLink ' +
      equipable +
      '" mode="0" action="wear">Fast Wear</span></span>'
    });
  }

  function doSpan(el) {
    if (counter === 0) {
      el.previousSibling.setAttribute('width', '200px');
      el.setAttribute('width', '370px');
    } else {
      el.previousSibling.removeAttribute('width');
      el.removeAttribute('width');
    }
    nodeArray.push(mySpan(el));
  }

  function makeSpan() {
    var limit = performance.now() + 10;
    while (moreToDo(limit, counter, nodeList)) {
      var el = nodeList[counter];

      doSpan(el);

      counter += 1;
    }
    if (counter < nodeList.length) {
      add(3, makeSpan);
    } else {
      counter = 0;
      add(3, paintChild);
      potReport(potObj$1);
    }
  }

  function prepareChildRows() {
    nodeList = document.querySelectorAll('#pCC table table ' +
      'tr:not(.fshHide) td:nth-of-type(3n+0)');
    potObj$1 = {};
    nodeArray = [];
    counter = 0;
    add(3, makeSpan);
  }

  var headerCount;
  var headers$1;

  function memberHeader(oldhtml) {
    if (!calf.membrList[oldhtml]) {return oldhtml;}
    return onlineDot({last_login: calf.membrList[oldhtml].last_login}) +
      '<a href="index.php?cmd=profile&player_id=' + calf.membrList[oldhtml].id +
      '">' + oldhtml + '</a> [ <span class="a-reply fshLink" target_player=' +
      oldhtml + '>m</span> ]';
  }

  function paintHeader() {
    var limit = performance.now() + 10;
    while (moreToDo(limit, headerCount, headers$1)) {
      // while (performance.now() < limit && headerCount < headers.length) {
      var el = headers$1[headerCount];
      var oldhtml = el.textContent;
      el.innerHTML = memberHeader(oldhtml);
      headerCount += 1;
    }
    if (headerCount < headers$1.length) {
      add(3, paintHeader);
    }
  }

  function reportHeader() {
    headers$1 = document.querySelectorAll('#pCC table table ' +
      'tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b');
    headerCount = 0;
    add(3, paintHeader);
  }

  var counter$1;
  var nodeList$1;
  var findUser;
  var foundUser;

  function hideOther(el) {
    if (el.firstChild.hasAttribute('bgcolor')) {
      foundUser = el.firstChild.firstElementChild.textContent === findUser;
    }
    if (!foundUser) {
      el.className = 'fshHide';
    }
  }

  function hideOthers() {
    var limit = performance.now() + 5;
    while (moreToDo(limit, counter$1, nodeList$1)) {
      var el = nodeList$1[counter$1];

      hideOther(el);

      counter$1 += 1;
    }
    if (counter$1 < nodeList$1.length) {
      add(2, hideOthers);
    }
  }

  function searchUser() {
    findUser = getUrlParameter('user');
    if (!findUser) {return;}
    var userNodes = document.querySelectorAll(
      '#pCC table table td[bgcolor="#DAA534"] b');
    var userNode = Array.prototype.some.call(userNodes, function(el) {
      return el.textContent === findUser;
    });
    if (!userNode) {return;}
    nodeList$1 = document.querySelectorAll('#pCC table table tr');
    counter$1 = 0;
    add(2, hideOthers);
  }

  function injectReportPaint() { // jQuery
    if (jQueryNotPresent()) {return;}
    getMembrList(false).done(function() {
      add(3, reportHeader);
    });
    add(2, searchUser);
    add(3, prepareChildRows);
    pCC.getElementsByTagName('TABLE')[1]
      .addEventListener('click', eventHandlers$1);
  }

  function injectSaveSettings() { // Hybrid
    if (jQueryNotPresent()) {return;}
    var content = pCC;
    var fshSettings = {};
    var list = GM_listValues();
    for (var i = 0; i < list.length; i += 1) {
      fshSettings[list[i]] = getValue(list[i]);
    }
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
    $('#HelperLoadSettings').click(function() {
      var userInput = jsonParse(getElementById('HelperfshSettings').value);
      if (isObject(userInput)) {
        var settings = userInput;
        Object.keys(settings).forEach(function(id) {
          setValue(id, settings[id]);
        });
        $('#dialog_msg').text('Settings loaded successfully!').dialog('open');
      }
    });
  }

  // var system = require('./support/system');

  // Legacy - Bad, could be repurposed
  /* function getBpCountFromWorld(responseText) {
    // backpack counter
    var doc=system.createDocument(responseText);
    var bp=system.findNode(
      '//td[a/img[contains(@src,"_manageitems.gif")]]',doc);
    var injectHere=document.getElementById('reportDiv');
    if (!injectHere) {
      injectHere=system.findNode(
        '//b[contains(.,"Multiple Scavenging Results")]/..');
    }
    insertElement(injectHere, bp);
  }
  */

  /* function multiSummary() { // Legacy - Bad, could be repurposed
    var injectHere=system.findNode(
      '//b[contains(.,"Multiple Scavenging Results")]/..');
    if (injectHere) { // multi scavenging
      var victories=system.findNodes('//td[contains(.,"victorious")]');
      if (victories) {
        injectHere.innerHTML+='<br/>Victories: '+victories.length;
      }
      var defeats=system.findNodes('//td[contains(.,"defeated")]');
      if (defeats) {
        injectHere.innerHTML+=', Defeated: '+defeats.length;
      }
      var gains=system.findNodes('//td[contains(.,"Item Gained")]/b');
      if (gains) {
        injectHere.innerHTML+='<br/>'+gains.length+' item(s): ';
        var gainHash={};
        for (var i=0;i<gains.length;i += 1) {
          if (gainHash[gains[i].textContent]) {
            gainHash[gains[i].textContent]+= 1;
          } else {
            gainHash[gains[i].textContent]=1;
          }
        }
        for (var item in gainHash) {
          if (!gainHash.hasOwnProperty(item)) { continue; }
          injectHere.innerHTML+=gainHash[item]+' '+item+'(s), ';
        }
      }
    }
    system.xmlhttp('index.php?cmd=world', getBpCountFromWorld);
  }
  */

  function dontPost$1(e) { // jQuery
    e.preventDefault();
    window.location = 'index.php?cmd=scavenging&subcmd=process' +
      '&cave_id=' + $('#pCC input[name="cave_id"]:checked').val() +
      '&gold=' + $('#gold').val() + '&submit=Scavenge';
  }

  function injectScavenging() { // jQuery
    if (jQueryPresent()) {
      $('#pCC input[value="Scavenge"]').click(dontPost$1);
    }
  }

  function buffIndividual(self) {
    if (self.previousElementSibling) {
      openQuickBuffByName(self.previousElementSibling.textContent);
    }
  }

  function buffAll(self) {
    var titanTable = self.parentNode.parentNode.parentNode.parentNode;
    var shortList = [];
    for (var j = 1; j < titanTable.rows.length; j += 2) {
      var firstCell = titanTable.rows[j].cells[0].firstChild.firstChild;
      shortList.push(firstCell.textContent);
    }
    openQuickBuffByName(shortList.join());
  }

  function buffEvent(e) {
    var self = e.target;
    if (self.textContent === '[b]') {
      buffIndividual(self);
    }
    if (self.textContent === 'all') {
      buffAll(self);
    }
  }

  function evtHdl$4(e) {
    if (e.target.classList.contains('fshBl')) {buffEvent(e);}
  }

  function doBuffLinks$1(titanTable) {
    for (var j = 1; j < titanTable.rows.length; j += 2) {
      var firstCell = titanTable.rows[j].cells[0];
      insertHtmlBeforeEnd(firstCell,
        ' <button class="fshBl fshXSmall">[b]</button>');
    }
    insertHtmlBeforeEnd(titanTable.rows[0].cells[0],
      ' <button class="fshBl fshXSmall">all</button>');
  }

  function gotTables(titanTables) {
    for (var i = 2; i < titanTables.length; i += 1) {
      var titanTable = titanTables[i];
      if (titanTable.rows.length < 2) {continue;}
      doBuffLinks$1(titanTable);
    }
    titanTables[1].addEventListener('click', evtHdl$4);
  }

  function injectScouttowerBuffLinks(titanTables) {
    if (titanTables.length > 2) {gotTables(titanTables);}
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

  function getTitanName(aRow) {
    return aRow.cells[0].firstElementChild.getAttribute('oldtitle');
  }

  function cooldownTracker(aRow, theTitans) {
    var myName = getTitanName(aRow).replace(' (Titan)', '');
    if (!theTitans[myName]) {
      var cooldown = aRow.nextElementSibling.cells[0].textContent;
      var coolTime = 0;
      if (cooldown.indexOf('until') !== -1) {
        coolTime = parseDateAsTimestamp(
          cooldown.replace('Cooldown until: ', ''));
      }
      theTitans[myName] = {
        cooldownText: cooldown,
        coolTime: coolTime,
        seen: 'yes'
      };
    }
  }

  function addRow(theTitans, trackerTable, titan) {
    if (theTitans[titan].coolTime < now) {return;}
    insertHtmlBeforeEnd(trackerTable,
      '<tr><td class="fshCenter">' + titan + '</td>' +
      '<td class="fshBold fshCenter fshCooldown">' +
      theTitans[titan].cooldownText + '</td><td class="fshCenter">' +
      theTitans[titan].seen + '</td></tr>');
  }

  function displayTracker(parentTable, theTitans) {
    var trackerTable = createTable({className: 'fshTTracker'});
    var tBody = createTBody({
      innerHTML: '<tr><td class="header fshCenter">Titan</td>' +
        '<td class="header fshCenter">Cooldown</td>' +
        '<td class="header fshCenter">Visible</td></tr>'
    });
    insertElement(trackerTable, tBody);
    Object.keys(theTitans).forEach(addRow.bind(null, theTitans, tBody));

    var newRow = parentTable.insertRow(5);
    var newCell = newRow.insertCell(-1);
    newCell.colSpan = 3;
    insertElement(newCell, trackerTable);
  }

  function addMissingTitansFromOld(oldTitans, newTitans) {
    if (!oldTitans) {return;}
    Object.keys(oldTitans).forEach(function(oldTitan) {
      if (newTitans[oldTitan]) {return;}
      if (oldTitans[oldTitan].coolTime <= now) {return;}
      newTitans[oldTitan] = {
        cooldownText: oldTitans[oldTitan].cooldownText,
        coolTime: oldTitans[oldTitan].coolTime,
        seen: 'no'
      };
    });
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

  function killsSummary(aRow) {
    var titanHP = aRow.cells[2].textContent;
    if (titanHP.indexOf('-') !== -1) {return;}
    var guildKills = Number(aRow.cells[3].textContent);
    var titanHPArray = titanHP.split('/');
    var currentHP = Number(titanHPArray[0]);
    var totalHP = Number(titanHPArray[1]);
    insertHtmlBeforeEnd(aRow.cells[3],
      '<br><span class="fshBlue"> (' +
      roundToString(getKillsPct(totalHP - currentHP, guildKills), 2) +
      '% Current <br>' + roundToString(guildKills * 100 / totalHP, 2) +
      '% Total<br>' + getTitanString(guildKills, totalHP, currentHP) + ')');
  }

  function guideLink(aRow) {
    var myName = encodeURIComponent(getTitanName(aRow));
    var myImg = aRow.cells[0].firstElementChild;
    var myLink = createAnchor({
      href: guideUrl + 'creatures&search_name=' + myName,
      target: '_blank'
    });
    insertElement(myLink, myImg);
    insertElement(aRow.cells[0], myLink);
  }

  function gotOldTitans(oldTitans) {
    var titanTables = pCC.getElementsByTagName('table');
    injectScouttowerBuffLinks(titanTables);
    var titanTable = titanTables[1];
    var newTitans = {};
    for (var i = 1; i < titanTable.rows.length - 1; i += 6) {
      var aRow = titanTable.rows[i];
      killsSummary(aRow);
      cooldownTracker(aRow, newTitans); // Pref
      guideLink(aRow);
    }
    addMissingTitansFromOld(oldTitans, newTitans); // Pref
    displayTracker(titanTables[0], newTitans); // Pref
    setForage('fsh_titans', newTitans); // Pref
  }

  function injectScouttower() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getForage('fsh_titans').done(gotOldTitans); // Pref
  }

  function bountyPrefs() {
    // Bounty hunting prefs
    return '<tr><th colspan="2"><b>Bounty hunting preferences' +
        '</b></th></tr>' +

      '<tr><td align= "right">' + networkIcon +
        'Show Active Bounties' +
        helpLink('Show Active Bounties',
          'This will show your active bounties on the right hand side') +
        ':</td><td colspan="3"><input name="enableActiveBountyList" ' +
        'type = "checkbox" value = "on"' +
        isChecked(calf.enableActiveBountyList) + '>&nbsp;' +
        '<input name="bountyListRefreshTime" size="3" value="' +
        calf.bountyListRefreshTime + '"> seconds refresh</td></tr>' +

      '<tr><td align= "right">' + networkIcon +
        'Show Wanted Bounties' +
        helpLink('Show Wanted Bounties',
          'This will show when someone you want is on the bounty board, ' +
          'the list is displayed on the right hand side') +
        ':</td><td colspan="3"><input name="enableWantedList" ' +
        'type="checkbox" value="on"' +
        isChecked(calf.enableWantedList) +
        '> Refresh time is same as Active Bounties' +

      '<tr><td align= "right">Wanted Names' +
        helpLink('Wanted Names',
          'The names of the people you want to see on the bounty board ' +
          'separated by commas (or * for all)') + ':</td><td colspan="3">' +
        '<input name="wantedNames" size="60" value="' + calf.wantedNames +
        '"></td></tr>' +

      simpleCheckbox('wantedGuildMembers') +
      simpleCheckbox('enableAttackHelper') +
      simpleCheckbox('showPvPSummaryInLog');
  }

  function equipPrefs() {
    // Equipment screen prefs
    return '<tr><th colspan="2"><b>Equipment screen preferences' +
        '</b></th></tr>' +

      simpleCheckbox('showExtraLinks') +
      simpleCheckbox('disableItemColoring') +

      '<tr><td class="fshRight">Show Quick Send Item' +
        helpLink('Show Quick Send on Manage Backpack',
          'This will show a link beside each item which gives the option to ' +
          'quick send the item to this person') +
        ':</td><td><input name="showQuickSendLinks" type="checkbox" ' +
        'value="on"' +
        isChecked(getValue('showQuickSendLinks')) + '>' +
        '&nbsp;&nbsp;Send Items To ' +
        '<input name="itemRecipient" size="10" value="' +
        getValue('itemRecipient') + '">' +

      simpleCheckbox('showQuickDropLinks') +

      '<tr><td class="fshRight">Quick Select all of type in Send Screen' +
        helpLink('Quick Select all of type in Send Screen',
          'This allows you to customize what quick links you would like ' +
          'displayed in your send item screen.<br>Use the format ' +
          '[&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,' +
          '&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR') +
        ':</td><td><input name="sendClasses" size="60" value="' +
        escapeHtml(getValue('sendClasses')) + '">';
  }

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

      simpleCheckbox('moveGuildList') +
      simpleCheckbox('moveOnlineAlliesList') +

      onlineAlliesEnemies() +

      simpleCheckbox('enableOnlineAlliesWidgets') +
      simpleCheckbox('moveFSBox') +
      simpleCheckbox('moveDailyQuest') +
      simpleCheckbox('fsboxlog') +
      simpleCheckbox('gameHelpLink') +
      simpleCheckbox('enableTempleAlert') +
      simpleCheckbox('enableUpgradeAlert') +
      simpleCheckbox('enableComposingAlert') +
      simpleCheckbox('enhanceOnlineDots') +
      simpleCheckbox('hideBuffSelected') +
      simpleCheckbox('hideHelperMenu') +
      simpleCheckbox('keepHelperMenuOnScreen') +
      simpleCheckbox('draggableHelperMenu') +

      quickLinksLocation() +

      simpleCheckbox('draggableQuickLinks') +
      simpleCheckbox('expandMenuOnKeyPress');
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
      'id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' +
      guildType + 'Message"> &#x00bb;</span>' +

      '<div id="showGuild' + guildType + 'Message" class="fshHide">' +
      '<input name="guild' + guildType + 'Message" size="60" value="' +
      getValue('guild' + guildType + 'Message') + '">' +
      '</div>';
  }

  function guildPrefs() {
    // Guild Manage
    return '<tr><th colspan="2"><b>Guild>Manage preferences' +
        '</b></th></tr>' +
      '<tr><td colspan="2">Enter guild names, ' +
        'separated by commas</td></tr>' +
      '<tr><td class="fshRight">Own Guild</td><td>' +
        injectSettingsGuildData('Self') + '</td></tr>' +
      '<tr><td class="fshRight">Friendly Guilds</td><td>' +
        injectSettingsGuildData('Frnd') + '</td></tr>' +
      '<tr><td class="fshRight">Old Guilds</td><td>' +
        injectSettingsGuildData('Past') + '</td></tr>' +
      '<tr><td class="fshRight">Enemy Guilds</td><td>' +
        injectSettingsGuildData('Enmy') + '</td></tr>' +

      '<tr><td class="fshRight">Highlight Valid PvP Targets' +
        helpLink('Highlight Valid PvP Targets',
          'Enabling this option will highlight targets in OTHER guilds that ' +
          'are within your level range to attack for PvP or GvG.') +
        ':</td><td>PvP: <input name="highlightPlayersNearMyLvl" ' +
        'type="checkbox" value="on"' +
        isChecked(getValue('highlightPlayersNearMyLvl')) +
        '> GvG: <input name="highlightGvGPlayersNearMyLvl" ' +
        'type="checkbox" value="on"' +
        isChecked(getValue('highlightGvGPlayersNearMyLvl')) +
        '></td></tr>' +

      simpleCheckbox('showAdmin') +
      simpleCheckbox('ajaxifyRankControls') +
      simpleCheckbox('detailedConflictInfo');
  }

  function logPrefs() {
    // Log screen prefs
    return '<tr><th colspan="2"><b>Log screen preferences' +
        '</b></th></tr>' +

      simpleCheckbox('hideNonPlayerGuildLogMessages') +
      simpleCheckbox('useNewGuildLog') +

      '<tr><td class="fshRight">New Guild Log History' +
        helpLink('New Guild Log History (pages)',
          'This is the number of pages that the new guild log ' +
          'screen will go back in history.') +
        ':</td><td><input name="newGuildLogHistoryPages" size="3" value="' +
        getValue('newGuildLogHistoryPages') + '"></td></td></tr>' +

      simpleCheckbox('enableLogColoring') +

      '<tr><td class="fshRight">New Log Message Sound' +
        helpLink('New Log Message Sound',
          'The .wav or .ogg file to play when you have unread log messages. ' +
          'This must be a .wav or .ogg file. This option can be turned on/off ' +
          'on the world page. Only works in Firefox 3.5+') +
        ':</td><td colspan="3"><input name="defaultMessageSound" size="60" ' +
        'value="' + getValue('defaultMessageSound') +
        '"></td></tr>' +

      '<tr><td class="fshRight">Play sound on unread log' +
        helpLink('Play sound on unread log',
          'Should the above sound play when you have unread log messages? ' +
          '(will work on Firefox 3.5+ only)') +
        ':</td><td><input name="playNewMessageSound" type="checkbox" ' +
        'value="on"' +
        isChecked(getValue('playNewMessageSound')) + '>' +
        ' Show speaker on world' +
        helpLink('Show speaker on world',
          'Should the toggle play sound speaker show on the world map? ' +
          '(This icon is next to the Fallensword wiki icon and will only ' +
          'display on Firefox 3.5+)') +
        ':<input name="showSpeakerOnWorld" type="checkbox" value="on"' +
        isChecked(getValue('showSpeakerOnWorld')) +
        '></tr></td>' +

      simpleCheckbox('enableChatParsing') +
      simpleCheckbox('keepBuffLog') +
      simpleCheckbox('addAttackLinkToLog') +
      simpleCheckbox('enhanceChatTextEntry');
  }

  function otherPrefs() {
    // Other prefs
    return '<tr><th colspan="2"><b>Other preferences</b></th></tr>' +

      simpleCheckbox('autoFillMinBidPrice') +

      '<tr><td class="fshRight">Hide Specific Recipes' +
        helpLink('Hide Specific Recipes',
          'If enabled, this hides recipes whose name matches the list ' +
          '(separated by commas). This works on Recipe Manager') +
        ':</td><td colspan="3"><input name="hideRecipes" ' +
        'type="checkbox" value="on"' +
        isChecked(getValue('hideRecipes')) + '>' +
        '&nbsp;<input name="hideRecipeNames" size="60" value="' +
        getValue('hideRecipeNames') + '"></td></tr>' +

      simpleCheckbox('hideRelicOffline') +
      simpleCheckbox('enterForSendMessage') +
      simpleCheckbox('navigateToLogAfterMsg') +

      '<tr><td align= "right">Max Group Size to Join' +
        helpLink('Max Group Size to Join',
          'This will disable HCSs Join All functionality and will only join ' +
          'groups less than a set size. ') +
        ':</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" ' +
        'type = "checkbox" value = "on"' +
        isChecked(getValue('enableMaxGroupSizeToJoin')) +
        '>&nbsp;&nbsp;Max Size: ' +
        '<input name="maxGroupSizeToJoin" size="3" value="' +
        getValue('maxGroupSizeToJoin') + '"></td></tr>' +

      simpleCheckbox('moveComposingButtons');
  }

  function worldGroup() {
    // World Screen
    return '<tr><td class="fshRight">Hide Create Group Button' +
      helpLink('Hide Create Group Button',
        'Enabling this option will hide the Create Group button') +
      ':</td><td>' +
      '<input name="hideChampionsGroup" type="checkbox" value="on"' +
        isChecked(getValue('hideChampionsGroup')) + '>' +
      '&nbsp;Champions&nbsp;&nbsp;' +
      '<input name="hideElitesGroup" type="checkbox" value="on"' +
        isChecked(getValue('hideElitesGroup')) + '>' +
      '&nbsp;Elites&nbsp;&nbsp;' +
      '<input name="hideSEGroup" type="checkbox" value="on"' +
        isChecked(getValue('hideSEGroup')) + '>' +
      '&nbsp;Super Elite&nbsp;&nbsp;' +
      '<input name="hideTitanGroup" type="checkbox" value="on"' +
        isChecked(getValue('hideTitanGroup')) + '>' +
      '&nbsp;Titan&nbsp;&nbsp;' +
      '<input name="hideLegendaryGroup" type="checkbox" value="on"' +
        isChecked(getValue('hideLegendaryGroup')) + '>' +
      '&nbsp;Legendary' +
      '</td></tr>';
  }

  function keepCombatLogs() {
    return '<tr><td class="fshRight">Keep Combat Logs' +
      helpLink('Keep Combat Logs',
        'Save combat logs to a temporary variable. ' +
        'Press <u>Show logs</u> on the right to display and copy them') +
      ':</td><td><input name="keepLogs" type="checkbox" value="on"' +
      isChecked(getValue('keepLogs')) + '>&nbsp;&nbsp;' +
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
      isChecked(getValue('sendGoldonWorld')) + '>' +
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

  function huntingBuffs() {
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

  function prefs() {
    // World Screen
    return '<tr><th colspan="2"><b>' +
      'World screen/Hunting preferences</b></th></tr>' +

      worldGroup() +
      keepCombatLogs() +

      simpleCheckbox('showCombatLog') +
      simpleCheckbox('enableCreatureColoring') +
      simpleCheckbox('showCreatureInfo') +

      combatEvalBias() +
      keepCreatureLog() +
      showSendGold() +
      theDoNotKillList() +
      huntingBuffs() +

      huntingBuffsList(calf.buffsName, 'huntingBuffsName', 'huntingBuffs',
        calf.buffs) +
      huntingBuffsList(calf.buffs2Name, 'huntingBuffs2Name', 'huntingBuffs2',
        calf.buffs2) +
      huntingBuffsList(calf.buffs3Name, 'huntingBuffs3Name', 'huntingBuffs3',
        calf.buffs3) +

      simpleCheckbox('huntingMode');
  }

  function profilePrefs() {
    // profile prefs
    return '<tr><th colspan="2"><b>Profile preferences</b></th></tr>' +

      simpleCheckbox('renderSelfBio') +
      simpleCheckbox('renderOtherBios') +

      '<tr><td class="fshRight">Enable Bio Compressor' +
        helpLink('Enable Bio Compressor',
          'This will compress long bios according to settings and provide a ' +
          'link to expand the compressed section.') +
        ':</td><td><input name="enableBioCompressor" type="checkbox" ' +
        'value="on"' +
        isChecked(getValue('enableBioCompressor')) +
        '> Max Characters:<input name="maxCompressedCharacters" size="4" ' +
        'value="' + getValue('maxCompressedCharacters') + '" />' +
        ' Max Lines:<input name="maxCompressedLines" size="3" value="' +
        getValue('maxCompressedLines') + '"></td></tr>' +

      '<tr><td class="fshRight">Buy Buffs Greeting' +
        helpLink('Buy Buffs Greeting',
          'This is the default text to open a message with when asking to ' +
          'buy buffs. You can use {playername} to insert the target players ' +
          'name. You can also use {buffs} to insert the list of buffs. You ' +
          'can use {cost} to insert the total cost of the buffs.') +
        ':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" ' +
        'value="' + getValue('buyBuffsGreeting') + '"></td></tr>' +

      simpleCheckbox('showStatBonusTotal') +
      simpleCheckbox('enableQuickDrink') +
      simpleCheckbox('disableDeactivatePrompts');
  }

  function questPrefs() {
    // Quest Preferences
    return '<tr><th colspan="2"><b>Quest preferences</b></th></tr>' +

      '<tr><td class="fshRight">Hide Specific Quests' +
        helpLink('Hide Specific Quests',
          'If enabled, this hides quests whose name matches the list ' +
          '(separated by commas). This works on Quest Manager and Quest Book.') +
        ':</td><td colspan="3"><input name="hideQuests" type="checkbox" ' +
        'value="on"' +
        isChecked(getValue('hideQuests')) + '>' +
        '&nbsp;<input name="hideQuestNames" size="60" value="' +
        getValue('hideQuestNames') + '"></td></tr>' +

      simpleCheckbox('storeLastQuestPage') +
      simpleCheckbox('showNextQuestSteps');
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
    var ret = prev + '<a href="index.php?cmd=profile&player_id=' + curr[0] +
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

  function setupConfigData() {
    calf.configData =
      '<form><table id="fshSettingsTable">' +
      '<thead><th colspan="2"><b>Fallen Sword Helper configuration ' +
        'Settings</b></th></thead>' +
      storageDetails() +
      linkToWebsite() +
      // General Prefs
      generalPrefs() +
      // Guild Manage
      guildPrefs() +
      // World Screen
      prefs() +
      // Log screen prefs
      logPrefs() +
      // Equipment screen prefs
      equipPrefs() +
      // Quest Preferences
      questPrefs() +
      // profile prefs
      profilePrefs() +
      // Bounty hunting prefs
      bountyPrefs() +
      // Other prefs
      otherPrefs() +
      // save button
      '<tr><td colspan="2" align=center><input type="button" class=' +
        '"custombutton" value="Save" id="Helper:SaveOptions"></td></tr>' +
      // Export or Load Settings
      // http://www.fallensword.com/index.php?cmd=notepad&blank=1&subcmd=savesettings
      '<tr><td colspan="2" align=center>' +
        '<a href="index.php?cmd=notepad&blank=1&subcmd=savesettings">' +
        'Export or Load Settings!</a></td></tr>' +
      codedBy() +
      '</table></form>';
  }

  function getVars() {
    calf.showBuffs = getValue('showHuntingBuffs');
    calf.buffs = getValue('huntingBuffs');
    calf.buffsName = getValue('huntingBuffsName');
    calf.buffs2 = getValue('huntingBuffs2');
    calf.buffs2Name = getValue('huntingBuffs2Name');
    calf.buffs3 = getValue('huntingBuffs3');
    calf.buffs3Name = getValue('huntingBuffs3Name');
    calf.doNotKillList = getValue('doNotKillList');

    calf.bountyListRefreshTime = getValue('bountyListRefreshTime');
    calf.wantedNames = getValue('wantedNames');
    calf.combatEvaluatorBias = getValue('combatEvaluatorBias');
    calf.enabledHuntingMode = getValue('enabledHuntingMode');
    calf.storage = (JSON.stringify(localStorage).length /
      (5 * 1024 * 1024) * 100).toFixed(2);
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

  function saveValueForm(oForm, name) { // Legacy
    var formElement =
      findNode('//input[@name="' + name + '"]', oForm);
    if (formElement.getAttribute('type') === 'checkbox') {
      setValue(name, formElement.checked);
    } else {
      setValue(name, formElement.value);
    }
  }

  function setMaxCompressedCharacters(oForm) { // Legacy
    var maxCompressedCharacters =
      findNode('//input[@name="maxCompressedCharacters"]', oForm);
    var maxCompressedCharactersValue = Number(maxCompressedCharacters.value);
    if (isNaN(maxCompressedCharactersValue) ||
        maxCompressedCharactersValue <= 50) {
      maxCompressedCharacters.value = 1500;
    }
  }

  function setMaxCompressedLines(oForm) { // Legacy
    var maxCompressedLines =
      findNode('//input[@name="maxCompressedLines"]', oForm);
    var maxCompressedLinesValue = Number(maxCompressedLines.value);
    if (isNaN(maxCompressedLinesValue) || maxCompressedLinesValue <= 1) {
      maxCompressedLines.value = 25;
    }
  }

  function setGuildLogHistoryPages(oForm) { // Legacy
    var newGuildLogHistoryPages =
      findNode('//input[@name="newGuildLogHistoryPages"]', oForm);
    var newGuildLogHistoryPagesValue = Number(newGuildLogHistoryPages.value);
    if (isNaN(newGuildLogHistoryPagesValue) ||
        newGuildLogHistoryPagesValue <= 1) {
      newGuildLogHistoryPages.value = 25;
    }
  }

  function setMaxGroupSizeToJoin(oForm) { // Legacy
    var maxGroupSizeToJoin =
      findNode('//input[@name="maxGroupSizeToJoin"]', oForm);
    var maxGroupSizeToJoinValue = Number(maxGroupSizeToJoin.value);
    if (isNaN(maxGroupSizeToJoinValue) || maxGroupSizeToJoinValue <= 1) {
      maxGroupSizeToJoin.value = 11;
    }
  }

  function saveConfig(evt) { // Legacy
    var oForm = evt.target.form;
    // bio compressor validation logic
    setMaxCompressedCharacters(oForm);
    setMaxCompressedLines(oForm);
    setGuildLogHistoryPages(oForm);
    setMaxGroupSizeToJoin(oForm);
    var combatEvaluatorBiasElement =
      findNode('//select[@name="combatEvaluatorBias"]', oForm);
    var combatEvaluatorBias = Number(combatEvaluatorBiasElement.value);
    setValue('combatEvaluatorBias', combatEvaluatorBias);
    var enabledHuntingModeElement =
      findNode('//select[@name="enabledHuntingMode"]', oForm);
    var enabledHuntingMode = enabledHuntingModeElement.value;
    setValue('enabledHuntingMode', enabledHuntingMode);

    saveBoxes.forEach(saveValueForm.bind(null, oForm));

    $('#dialog_msg').text('FS Helper Settings Saved').dialog('open');
  }

  function showLogs() {
    sendEvent('settingsPage', 'injectNotepadShowLogs');
    jQueryDialog(injectNotepadShowLogs);
  }

  function showMonsterLogs() {
    sendEvent('settingsPage', 'injectMonsterLog');
    jQueryDialog(injectMonsterLog);
  }

  function createEventListeners() {
    var tickAll = createSpan({
      id: 'fshAllBuffs',
      className: 'fshLink',
      textContent: 'Tick all buffs'
    });
    tickAll.addEventListener('click', toggleTickAllBuffs);
    var inject = getElementById('settingsTabs-4').firstElementChild
      .rows[0].cells[0];
    insertElement(inject, createBr());
    insertElement(inject, tickAll);

    getElementById('fshClearStorage')
      .addEventListener('click', clearStorage);

    getElementById('Helper:SaveOptions')
      .addEventListener('click', saveConfig);
    getElementById('Helper:ShowLogs')
      .addEventListener('click', showLogs);
    getElementById('Helper:ShowMonsterLogs')
      .addEventListener('click', showMonsterLogs);

    getElementById('toggleShowGuildSelfMessage')
      .addEventListener('click', toggleVisibilty);
    getElementById('toggleShowGuildFrndMessage')
      .addEventListener('click', toggleVisibilty);
    getElementById('toggleShowGuildPastMessage')
      .addEventListener('click', toggleVisibilty);
    getElementById('toggleShowGuildEnmyMessage')
      .addEventListener('click', toggleVisibilty);
  }

  function injectSettings() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getVars();
    setupConfigData();
    var settingsTabs = getElementById('settingsTabs');
    insertHtmlBeforeEnd(settingsTabs, '<div id="fshSettings">' +
      calf.configData + '</div>');
    if ($(settingsTabs).tabs('length') > 0) {
      $(settingsTabs).tabs('add', '#fshSettings', 'FSH Settings');
    }
    createEventListeners();
    setValue('minGroupLevel', getElementById('settingsTabs-1')
      .firstElementChild.lastElementChild.rows[1].cells[1].firstElementChild
      .value);
  }

  function injectTitan() {
    var titanTable = pCC.children[0];
    var newRow = titanTable.insertRow(2);
    insertHtmlBeforeEnd(newRow, '<br>');
    newRow = titanTable.insertRow(3);
    insertHtmlBeforeEnd(newRow, '<td class="fshCenter fshBold">[ ' +
      '<a href="index.php?cmd=guild&subcmd=scouttower">Scout Tower</a> ]</td>');
  }

  function guildView(guildId) {
    return callApp({cmd: 'guild', subcmd: 'view', guild_id: guildId});
  }

  function getStat(stat, doc) { // jQuery
    // 'Hidden' returns NaN
    return intValue(
      $(stat, doc)
        .contents()
        .filter(function(i, e) {
          return e.nodeType === 3;
        })[0].nodeValue
    );
  }

  function getBuffLevel(doc, buff) { // jQuery
    var hasBuff = $('img.tip-static[data-tipped*="b>' + buff + '</b"]', doc)
      .data('tipped');
    // var re = new RegExp('</b> \\(Level: (\\d+)\\)');
    var test = /<\/b> \(Level: (\d+)\)/.exec(hasBuff);
    if (test) {return intValue(test[1]);}
    return 0;
  }

  function getBonus(stat, doc) { // jQuery
    var target = $(stat, doc);
    var children = target.children();
    if (children.length === 0) {
      children = target.next();
    }
    return intValue(children.text().slice(2, -1));
  }

  function cloakGuess(bonus, level) {
    if (bonus > level * 10 ||
        bonus < level) {
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

  function attackValueIsNumber(atk) {
    return typeof atk === 'number' && !isNaN(atk);
  }

  function playerDataString(responseText) {
    var doc = createDocument(responseText);
    var obj = {
      levelValue: getStat('#stat-vl', doc),
      attackValue: getStat('#stat-attack', doc),
      attackBonus: getBonus('#stat-attack', doc),
      defenseValue: getStat('#stat-defense', doc),
      defenseBonus: getBonus('#stat-defense', doc),
      armorValue: getStat('#stat-armor', doc),
      armorBonus: getBonus('#stat-armor', doc),
      damageValue: getStat('#stat-damage', doc),
      damageBonus: getBonus('#stat-damage', doc),
      hpValue: getStat('#stat-hp', doc),
      hpBonus: getBonus('#stat-hp', doc),
      killStreakValue: getStat('#stat-kill-streak', doc),
      // get buffs here later ... DD, CA, DC, Constitution, etc
      counterAttackLevel: getBuffLevel(doc, 'Counter Attack'),
      doublerLevel: getBuffLevel(doc, 'Doubler'),
      deathDealerLevel: getBuffLevel(doc, 'Death Dealer'),
      darkCurseLevel: getBuffLevel(doc, 'Dark Curse'),
      holyFlameLevel: getBuffLevel(doc, 'Holy Flame'),
      constitutionLevel: getBuffLevel(doc, 'Constitution'),
      sanctuaryLevel: getBuffLevel(doc, 'Sanctuary'),
      flinchLevel: getBuffLevel(doc, 'Flinch'),
      nightmareVisageLevel: getBuffLevel(doc, 'Nightmare Visage'),
      superEliteSlayerLevel: getBuffLevel(doc, 'Super Elite Slayer'),
      fortitudeLevel: getBuffLevel(doc, 'Fortitude'),
      chiStrikeLevel: getBuffLevel(doc, 'Chi Strike'),
      terrorizeLevel: getBuffLevel(doc, 'Terrorize'),
      barricadeLevel: getBuffLevel(doc, 'Barricade'),
      reignOfTerrorLevel: getBuffLevel(doc, 'Reign Of Terror'),
      anchoredLevel: getBuffLevel(doc, 'Anchored'),
      severeConditionLevel: getBuffLevel(doc, 'Severe Condition'),
      entrenchLevel: getBuffLevel(doc, 'Entrench'),
      cloakLevel: getBuffLevel(doc, 'Cloak')
    };
    obj.superEliteSlayerMultiplier = Math.round(0.002 *
      obj.superEliteSlayerLevel * 100) / 100;

    if (obj.cloakLevel === 0 ||
        attackValueIsNumber(obj.attackValue)) {
      return obj;
    }

    updateForCloak(obj);
    return obj;
  }

  function getBuffLvl(buffs, buff) {
    return fallback(buffs[buff], 0);
  }

  function playerDataObject(json) {
    var buffs = reduceBuffArray(json._skills);
    var obj = {
      levelValue: json.level,
      attackValue: json.attack,
      attackBonus: json.bonus_attack,
      defenseValue: json.defense,
      defenseBonus: json.bonus_defense,
      armorValue: json.armor,
      armorBonus: json.bonus_armor,
      damageValue: json.damage,
      damageBonus: json.bonus_damage,
      hpValue: json.hp,
      hpBonus: json.bonus_hp,
      killStreakValue: intValue(json.killstreak),
      // get buffs here later ... DD, CA, DC, Constitution, etc
      counterAttackLevel: getBuffLvl(buffs, 'Counter Attack'),
      doublerLevel: getBuffLvl(buffs, 'Doubler'),
      deathDealerLevel: getBuffLvl(buffs, 'Death Dealer'),
      darkCurseLevel: getBuffLvl(buffs, 'Dark Curse'),
      holyFlameLevel: getBuffLvl(buffs, 'Holy Flame'),
      constitutionLevel: getBuffLvl(buffs, 'Constitution'),
      sanctuaryLevel: getBuffLvl(buffs, 'Sanctuary'),
      flinchLevel: getBuffLvl(buffs, 'Flinch'),
      nightmareVisageLevel: getBuffLvl(buffs, 'Nightmare Visage'),
      superEliteSlayerLevel: getBuffLvl(buffs, 'Super Elite Slayer'),
      fortitudeLevel: getBuffLvl(buffs, 'Fortitude'),
      chiStrikeLevel: getBuffLvl(buffs, 'Chi Strike'),
      terrorizeLevel: getBuffLvl(buffs, 'Terrorize'),
      barricadeLevel: getBuffLvl(buffs, 'Barricade'),
      reignOfTerrorLevel: getBuffLvl(buffs, 'Reign Of Terror'),
      anchoredLevel: getBuffLvl(buffs, 'Anchored'),
      severeConditionLevel: getBuffLvl(buffs, 'Severe Condition'),
      entrenchLevel: getBuffLvl(buffs, 'Entrench'),
      cloakLevel: getBuffLvl(buffs, 'Cloak')
    };
    if (obj.cloakLevel !== 0) {updateForCloak(obj);}
    return obj;
  }

  var highlightPlayersNearMyLvl$1;
  var spinner$1;
  var validPvP = nowSecs - 604800;
  var guilds;
  var myGuildId;

  var highlightTests$1 = [
    function() {return highlightPlayersNearMyLvl$1;},
    function(guildId) {return isUndefined(guildId) || guildId !== myGuildId;},
    function(guildId, data) {return data.last_login >= validPvP;},
    function(guildId, data) {return data.virtual_level >= pvpLowerLevel;},
    function(guildId, data) {return data.virtual_level <= pvpUpperLevel;}
  ];

  function pvpHighlight$1(guildId, data) {
    return highlightTests$1.every(function(el) {
      return el(guildId, data);
    });
  }

  function doOnlineDot(aTable, guildId, data) {
    insertHtmlBeforeEnd(aTable.rows[0],
      '<td>' + onlineDot({last_login: data.last_login}) + '</td>');
    if (pvpHighlight$1(guildId, data)) {
      aTable.parentNode.parentNode.classList.add('lvlHighlight');
    }
  }

  function parsePlayer(aTable, guildId, data, jqXhr) {
    if (data) {
      doOnlineDot(aTable, guildId, data);
    } else {
      insertHtmlBeforeEnd(aTable.rows[0],
        '<td class="fshBkRed">' + jqXhr.status + '</td>');
    }
  }

  function failFilter(jqXhr) {
    return $.Deferred().resolve(null, jqXhr).promise();
  }

  function addPlayerObjectToGuild(guildId, obj) {
    if (guilds[guildId]) {
      guilds[guildId].push(obj);
    } else {
      guilds[guildId] = [obj];
    }
  }

  function addPlayerToGuild(tbl, playerName) {
    var guildHRef = tbl.rows[0].cells[0].firstElementChild.href;
    var guildId = /guild_id=(\d+)/.exec(guildHRef)[1];
    addPlayerObjectToGuild(guildId, {dom: tbl, player: playerName});
  }

  function stackAjax(prm, playerName, tbl, guildId) {
    prm.push(getProfile(playerName)
      .pipe(null, failFilter)
      .done(parsePlayer.bind(null, tbl, guildId))
    );
  }

  function parseGuild(data) {
    var guildId = data.r.id;
    data.r.members.forEach(function(member) {
      guilds[guildId].forEach(function(player) {
        if (member.name === player.player) {
          doOnlineDot(player.dom, guildId, {
            last_login: (nowSecs - member.last_activity).toString(),
            virtual_level: member.vl
          });
        }
      });
    });
  }

  function findOnlinePlayers() { // jQuery
    var someTables = pCC.getElementsByTagName('table');
    var prm = [];
    guilds = {};
    Array.prototype.slice.call(someTables, 4).forEach(function(tbl) {
      var playerName = tbl.textContent.trim();
      if (tbl.rows[0].cells[0].firstElementChild) {
        addPlayerToGuild(tbl, playerName);
      } else {
        stackAjax(prm, playerName, tbl);
      }
    });
    Object.keys(guilds).forEach(function(guildId) {
      if (guilds[guildId].length === 1) {
        stackAjax(prm, guilds[guildId][0].player, guilds[guildId][0].dom,
          guildId);
      } else {
        guildView(guildId).done(parseGuild);
      }
    });
    $.when.apply($, prm).done(function() {
      spinner$1.classList.add('fshHide');
    });
  }

  function getMyVL(e) { // jQuery
    $(e.target).qtip('hide');
    spinner$1 = createSpan({
      className: 'fshCurveContainer fshTopListSpinner',
      innerHTML: '<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'
    });
    e.target.parentNode.replaceChild(spinner$1, e.target);
    highlightPlayersNearMyLvl$1 = getValue('highlightPlayersNearMyLvl');
    if (highlightPlayersNearMyLvl$1) {
      calculateBoundaries();
      myGuildId = currentGuildId();
    }
    findOnlinePlayers();
  }

  function looksLikeTopRated() {
    var theCell = pCC.getElementsByTagName('TD')[0];
    theCell.firstElementChild.className = 'fshTopListWrap';
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
    theCell.insertBefore(findBtn, theCell.firstElementChild);
    findBtn.addEventListener('click', getMyVL);
  }

  var topRatedTests = [
    function() {return jQueryPresent();},
    function() {return isObject(pCC);},
    function() {return isObject(pCC.firstElementChild);},
    function() {return isObject(pCC.firstElementChild.rows);},
    function() {return pCC.firstElementChild.rows.length > 2;},
    function() {
      return pCC.firstElementChild.rows[1].textContent.indexOf(
        'Last Updated') === 0;
    }
  ];

  function testforTopRated() {
    return topRatedTests.every(function(e) {return e();});
  }

  function injectTopRated() {
    if (testforTopRated()) {looksLikeTopRated();}
  }

  var invItems$3;

  function getItemDiv() {
    var itemDiv = getElementById('item-div');
    if (!itemDiv) {
      itemDiv = createDiv({id: 'item-div', className: 'itemDiv'});
      var itemList = getElementById('item-list');
      var oldItems = itemList.getElementsByTagName('table');
      while (oldItems.length) {
        oldItems[0].classList.add('fshBlock');
        insertElement(itemDiv, oldItems[0]);
      }
      itemList.parentNode.insertBefore(itemDiv, itemList);
    }
    return itemDiv;
  }

  function shouldShow(hidden, all, hasFolder) {
    return hidden && fallback(all, hasFolder);
  }

  function shouldHide(hidden, all, hasFolder) {
    return !hidden && !all && !hasFolder;
  }

  function doHideFolder(evt) {
    var folderid = evt.target.id;
    var itemDiv = getItemDiv();
    var items = itemDiv.getElementsByTagName('table');
    Array.prototype.forEach.call(items, function(el) {
      el.firstElementChild.lastElementChild.firstElementChild
        .firstElementChild.checked = false;
      var hidden = el.classList.contains('fshHide');
      var all = folderid === 'folderid0';
      var hasFolder = el.classList.contains(folderid);
      if (shouldShow(hidden, all, hasFolder)) {
        el.classList.remove('fshHide');
        el.classList.add('fshBlock'); // show()
      }
      if (shouldHide(hidden, all, hasFolder)) {
        el.classList.remove('fshBlock');
        el.classList.add('fshHide'); // hide()
      }
    });
  }

  function hideFolder(evt) {
    if (evt.target.nodeName === 'SPAN' &&
        evt.target.id.indexOf('folderid') !== -1) {doHideFolder(evt);}
  }

  function doFolderHeaders(folders) {
    var folderCell = '<td colspan=6>';
    // append main folder
    folderCell += '<span id="folderid0" class="fshLink" fid=0>All</span>' +
      ' &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>';
    Object.keys(folders).forEach(function(key) {
      folderCell += ' &ensp;<span id="folderid' + key +
        '" class="fshLink fshNoWrap" fid=' + key + '>' +
        folders[key] + '</span> ';
    });
    var foldersRow = createTr({
      id: 'fshFolderSelect',
      innerHTML: folderCell
    });
    foldersRow.addEventListener('click', hideFolder);
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
    } else {el.classList.add('tradeItemMargin');}
  }

  function forEachInvItem(el) {
    var checkbox = el.firstElementChild.lastElementChild.firstElementChild
      .firstElementChild;
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
    /* Highlight items in ST */
    var nodeList = getElementById('item-list')
      .getElementsByTagName('table');
    Array.prototype.forEach.call(nodeList, forEachInvItem);
    doFolderHeaders(data.folders);

    timeEnd('trade.processTrade');

  }

  function doFolders() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getInventoryById().done(function(data) {
      add(3, processTrade, [data]);
    });
  }

  function getHowMany(itemTables) {
    var howMany = parseInt(getElementById('fshSendHowMany').value, 10);
    if (isNaN(howMany)) {return itemTables.length;}
    // maximum of 100 items in an ST
    if (calf.subcmd !== '-') {return Math.min(100, howMany);}
    return howMany;
  }

  function itemType$1(itemid, checkbox) {
    return itemid === 'itemid-2' && checkbox.classList.contains('itemtype12');
  }

  function shouldBeChecked(itemid, checkbox) {
    return itemid === 'itemid-1' ||
      itemType$1(itemid, checkbox) ||
      checkbox.classList.contains(itemid);
  }

  function canBeChecked(howMany, itemsInSt, el, itemid, checkbox) {
    return howMany &&
      fallback(itemsInSt, !el.classList.contains('isInST')) &&
      shouldBeChecked(itemid, checkbox);
  }

  function findStCheck() {
    var cbox = getElementById('itemsInSt');
    if (cbox) {return cbox.checked;}
  }

  function doCheckAll$1(evt) {
    var itemid = evt.target.id;
    var itemList = getElementById('item-div') ||
      getElementById('item-list');
    var itemTables = itemList.querySelectorAll('table:not(.fshHide)');
    console.log('itemTables', itemTables); // eslint-disable-line no-console
    var howMany = getHowMany(itemTables);
    var itemsInSt = findStCheck();
    Array.prototype.forEach.call(itemTables, function(el) {
      var checkbox = el.firstElementChild.lastElementChild.firstElementChild
        .firstElementChild;
      if (canBeChecked(howMany, itemsInSt, el, itemid, checkbox)) {
        checkbox.checked = true;
        howMany -= 1;
        return;
      }
      checkbox.checked = false;
    });
  }

  function toggleAllPlants(evt) {
    console.log('toggleAllPlants', evt.target.className); // eslint-disable-line no-console
    if (evt.target.classList.contains('fshCheckAll')) {doCheckAll$1(evt);}
  }

  function getItemList() {
    var sendClasses = getValue('sendClasses');
    var itemList = jsonParse('[' + sendClasses + ']');
    if (itemList) {return itemList;}
    return jsonParse('[' + defaults.sendClasses + ']');
  }

  function injectTradeOld() {
    var myTd = '<td colspan=6>Select:&ensp;<span id="itemid-1" ' +
      'class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;' +
      '<span id="itemid-2" ' +
      'class="fshCheckAll fshLink fshNoWrap">All Resources</span>';
    var itemList = getItemList();
    itemList.forEach(function(el) {
      myTd += ' &ensp;<span id="itemid' + el[1] +
        '" class="fshCheckAll fshLink fshNoWrap">' + el[0] + '</span>';
    });
    myTd += ' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" ' +
      'class="custominput" value="all" size=3></td>';
    var multiple = createTr({
      id: 'fshSelectMultiple',
      innerHTML: myTd
    });
    multiple.addEventListener('click', toggleAllPlants);
    var el = getElementById('item-list').parentNode.parentNode;
    el.parentNode.insertBefore(multiple, el);
  }

  function injectTrade() {
    add(3, doFolders);
    add(3, injectTradeOld);
  }

  var highlightPlayersNearMyLvl$2;
  var highlightGvGPlayersNearMyLvl;

  function isPvpTarget(vlevel) {
    return highlightPlayersNearMyLvl$2 &&
      vlevel >= pvpLowerLevel &&
      vlevel <= pvpUpperLevel;
  }

  function isGvgTarget(vlevel) {
    return highlightGvGPlayersNearMyLvl &&
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

  function dontHighlight() {
    return Number(getUrlParameter('guild_id')) === currentGuildId() ||
      !highlightPlayersNearMyLvl$2 && !highlightGvGPlayersNearMyLvl;
  }

  function injectViewGuild() {
    add(3, colouredDots);
    removeGuildAvyImgBorder();
    guildXPLock();
    highlightPlayersNearMyLvl$2 = getValue('highlightPlayersNearMyLvl');
    highlightGvGPlayersNearMyLvl = getValue('highlightGvGPlayersNearMyLvl');
    if (dontHighlight()) {return;}
    calculateBoundaries();
    var memList = document.querySelectorAll(
      '#pCC a[data-tipped*="<td>VL:</td>"]');
    Array.prototype.forEach.call(memList, highlightMembers);
  }

  var impStyles = [
    ' style="color:red; font-size:large; font-weight:bold"',
    ' style="color:Orangered; font-size:large; font-weight:bold"',
    ' style="color:Orangered; font-size:medium; font-weight:bold;"'
  ];

  function getImpWarningStyle(impsRem) { // Legacy
    if (impsRem >= 0 && impsRem <= 2) {
      return impStyles[impsRem];
    }
    return ' style="color:green; font-size:medium;"';
  }

  function impWarning(impsRem) { // Legacy
    var applyImpWarningColor = getImpWarningStyle(impsRem);
    var recastButton = '';
    if (impsRem === 0) {
      recastButton = '&nbsp;<span id="Helper:recastImpAndRefresh" ' +
        'style="color: blue; cursor: pointer; text-decoration: underline; ' +
        'font-size: xx-small;">Recast</span>';
    }
    return '<tr><td' + applyImpWarningColor + '>Shield Imps Remaining: ' +
      impsRem.toString() + recastButton + '</td></tr>';
  }

  function getKillStreak(responseText) { // Hybrid
    var doc = createDocument(responseText);
    var killStreakLocation = $(doc).find('td:contains("Streak:"):last').next();
    var playerKillStreakValue;
    if (killStreakLocation.length > 0) {
      playerKillStreakValue = intValue(killStreakLocation.text());
    }
    var killStreakElement = findNode('//span[@findme="killstreak"]');
    killStreakElement.innerHTML = addCommas(playerKillStreakValue);
    setValue('lastKillStreak', playerKillStreakValue);
    var deathDealerBuff =
      findNode('//img[contains(@data-tipped,"Death Dealer")]');
    var deathDealerRE = /<b>Death Dealer<\/b> \(Level: (\d+)\)/;
    var deathDealer = deathDealerRE.exec($(deathDealerBuff).data('tipped'));
    var deathDealerPercentage;
    if (deathDealer) {
      var deathDealerLevel = deathDealer[1];
      deathDealerPercentage = Math.min(Math.round(
        Math.floor(playerKillStreakValue / 5) * deathDealerLevel
      ) * 0.01, 20);
    }
    var deathDealerPercentageElement =
      findNode('//span[@findme="damagebonus"]');
    deathDealerPercentageElement.innerHTML = deathDealerPercentage;
    setValue('lastDeathDealerPercentage', deathDealerPercentage);
  }

  function getLastValue(pref) {
    var val = getValue(pref);
    if (isUndefined(val)) {
      setValue(pref, 0);
      val = 0;
    }
    return val;
  }

  function getTrackText(trackKillStreak) { // Legacy
    if (trackKillStreak) {return 'ON';}
    return 'off';
  }

  function notMaxDd(lastDeathDealerPercentage, lastKillStreak) {
    var trackKillStreak = getValue('trackKillStreak');
    var trackText = getTrackText(trackKillStreak);
    if (!trackKillStreak) {
      return '<tr><td style="font-size:small; color:' +
        'navy" nowrap>KillStreak tracker disabled. <span style="' +
        'font-size:xx-small">Track: <span id=Helper:toggleKS' +
        'tracker style="color:navy;cursor:pointer;text-' +
        'decoration:underline;" title="Click to toggle">' +
        trackText + '</span></span></td></tr>';
    }
    retryAjax('index.php?no_mobile=1&cmd=profile').done(getKillStreak);
    return '<tr><td style="font-size:small; color:' +
      'navy" nowrap>KillStreak: <span findme="killstreak">' +
      addCommas(lastKillStreak) + '</span> Damage bonus' +
      ': <span findme="damagebonus">' +
      Math.round(lastDeathDealerPercentage * 100) / 100 +
      '</span>%&nbsp;<span style="font-size:xx-small">Track: ' +
      '<span id=Helper:toggleKStracker style="color:navy;' +
      'cursor:pointer;text-decoration:underline;" title="Click' +
      ' to toggle">' + trackText + '</span></span></td></tr>';
  }

  function doDeathDealer(impsRem) { // Legacy
    var lastDeathDealerPercentage = getLastValue('lastDeathDealerPercentage');
    var lastKillStreak = getLastValue('lastKillStreak');
    if (impsRem > 0 && lastDeathDealerPercentage === 20) {
      return '<tr><td style="font-size:small; color:black"' +
        '>Kill Streak: <span findme="killstreak">&gt;' +
        addCommas(lastKillStreak) + '</span> Damage bonus: <' +
        'span findme="damagebonus">20</span>%</td></tr>';
    }
    return notMaxDd(lastDeathDealerPercentage, lastKillStreak);
  }

  function getImpHp(hasDd, impsRem) { // Legacy - Old Map
    var ret = impWarning(impsRem);
    if (hasDd) {
      ret += doDeathDealer(impsRem);
    }
    return ret;
  }

  function findImps(hasDd, hasSsi, impsRem) { // Legacy - Old Map
    if (hasDd || hasSsi) {
      return getImpHp(hasDd, impsRem);
    }
    return '';
  }

  var re = /(\d+) HP remaining/;

  function getImpsRemaining(hasSsi) { // Legacy - Old Map
    var impsRem = 0;
    if (hasSsi) {
      var textToTest = $(hasSsi).data('tipped');
      var impsRemainingRE = re.exec(textToTest);
      impsRem = Number(impsRemainingRE[1]);
    }
    return impsRem;
  }

  function getCaLvl(hasCounterAttack) { // Legacy
    var counterAttackLevel;
    if (hasCounterAttack.getAttribute('src').search('/skills/') !== -1) {
      var onmouseover = $(hasCounterAttack).data('tipped');
      var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/;
      var counterAttack = counterAttackRE.exec(onmouseover);
      if (counterAttack) {
        counterAttackLevel = counterAttack[1];
      }
    }
    return '<tr><td style="font-size:small; color:' +
      'blue">CA' + counterAttackLevel + ' active</td></tr>';
  }

  function hasCA() { // Legacy
    var replacementText = '';
    var hasCounterAttack = findNode('//img[contains(@src,"/54_sm.gif")]');
    if (hasCounterAttack) {
      replacementText += getCaLvl(hasCounterAttack);
    }
    return replacementText;
  }

  var doublerRE = /<b>Doubler<\/b> \(Level: (\d+)\)/;

  function doublerLvl(onmouseover) { // Legacy
    var doubler = doublerRE.exec(onmouseover);
    if (doubler) {return doubler[1];}
  }

  function getDoublerLevel(hasDoubler) { // Legacy
    var doublerLevel;
    if (hasDoubler.getAttribute('src').search('/skills/') !== -1) {
      var onmouseover = $(hasDoubler).data('tipped');
      doublerLevel = doublerLvl(onmouseover);
    }
    if (doublerLevel === 200) { // ???
      return '<tr><td style="font-size:small; color:' +
        'red">Doubler ' + doublerLevel + ' active</td></tr>';
    }
    return '';
  }

  function hasDblr() { // Legacy
    var hasDoubler = findNode('//img[contains(@src,"/26_sm.gif")]');
    if (hasDoubler) {
      return getDoublerLevel(hasDoubler);
    }
    return '';
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
    $.subscribe('2' + def_suffixSuccessActionResponse, combatResponse);
  }

  function combatLogger() { // jQuery.min
    if (getValue('keepLogs')) {
      getForage('fsh_combatLog').done(gotCombatLog$1);
    }
  }

  var oldDoAction;

  function afterUpdateActionList() {
    // color the critters in the do no kill list blue
    var act = getElementById('actionList');
    var creatures = act.getElementsByClassName('creature');
    Array.prototype.forEach.call(creatures, function(el) {
      el.classList.toggle('fshBlue',
        calf.doNotKillList.indexOf(el.textContent) !== -1);
    });
  }

  var actionsToIntercept = {
    // def_creatureCombat
    '2': function(action, fetch, data, attempts) {
      // Do custom stuff e.g. do not kill list
      var creatureName = GameData.actions()[data.passback].data.name;
      if (calf.doNotKillList.indexOf(creatureName) !== -1) {
        $('#actionList div.header').eq(data.passback)
          .find('a.icon').removeClass('loading');
        return;
      }
      // Call standard action
      oldDoAction(action, fetch, data, attempts);
    }
  };

  function firstAttempt(attempts) {
    return isUndefined(attempts) || attempts === 0;
  }

  function goodInterceptFunction(interceptFunction) {
    return interceptFunction && isFunction(interceptFunction);
  }

  function maybeIntercept(action, fetch, data, attempts) {
    var interceptFunction = actionsToIntercept[action];
    if (goodInterceptFunction(interceptFunction) && firstAttempt(attempts)) {
      interceptFunction(action, fetch, data, attempts);
    } else {
      oldDoAction(action, fetch, data, attempts);
    }
  }

  function interceptDoAction() {
    oldDoAction = GameData.doAction;
    GameData.doAction = maybeIntercept;
  }

  function doNotKill() {
    $.subscribe(def_afterUpdateActionlist, afterUpdateActionList);
    afterUpdateActionList();
    // then intercept the action call
    interceptDoAction();
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

  var containerDiv;
  var leftDiv;
  var fetchStatsBtn;
  var myDefenders;

  function defendersSetup(relicData) {
    myDefenders = relicData.defenders.map(function(x) {
      return x.player_name;
    });
  }

  function primaryElementsSetup(relicData) {
    defendersSetup(relicData);
    if (containerDiv) {
      containerDiv.innerHTML = '';
    } else {
      containerDiv = createDiv({className: 'body'});
    }
    leftDiv = createDiv({className: 'fshFloatLeft fshRelicLeftDiv'});
    insertElement(containerDiv, leftDiv);
    if (relicData.is_owner) {
      insertElement(leftDiv, doBuffLinks(myDefenders));
    }
    fetchStatsBtn = createButton({
      className: 'custombutton',
      textContent: 'Fetch Stats'
    });
    insertElement(leftDiv, fetchStatsBtn);
    var dialogRelic = getElementById('dialog-relic');
    insertElement(dialogRelic, containerDiv);
  }

  var guildMemberList;
  var twoMinutes;
  var sevenDays;
  var memberExclusions = [
    function(key) {return key === 'lastUpdate';},
    function(key) {return myDefenders.indexOf(key) !== -1;},
    function(key) {return !guildMemberList[key].last_login;},
    function(key) {return Number(guildMemberList[key].last_login) >= twoMinutes;},
    function(key) {return Number(guildMemberList[key].last_login) <= sevenDays;},
    function(key) {
      return guildMemberList[key].level >= 400 &&
        guildMemberList[key].level <= 421;
    },
    function(key) {
      return guildMemberList[key].level >= 441 &&
        guildMemberList[key].level <= 450;
    }
  ];
  var relicCountElement;
  var lDPercentageElement;
  var lDCloakedElement;
  var attackElement;
  var attackBuffedElement;
  var defenseElement;
  var defenseBuffedElement;
  var armorElement;
  var armorBuffedElement;
  var damageElement;
  var damageBuffedElement;
  var hpElement;
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

  function missingMembers(membrList) {
    guildMemberList = membrList;
    var myMembers = Object.keys(guildMemberList);
    twoMinutes = nowSecs - 120;
    sevenDays = nowSecs - 604800;
    var filtered = myMembers.reduce(function(prev, key) {
      for (var i = 0; i < memberExclusions.length; i += 1) {
        if (memberExclusions[i](key)) {return prev;}
      }
      prev.push('<a href="index.php?cmd=profile&player_id=' +
        guildMemberList[key].id + '">' + key + '</a>');
      return prev;
    }, []);
    insertHtmlBeforeEnd(containerDiv,
      '<div class="fshFloatLeft fshRelicLowDiv"><table class="relicT">' +
      '<thead><tr><th>Offline guild members not at relic:</th></tr></thead>' +
      '<tbody><tr><td>' + filtered.join(' ') + '</td></tr></tbody>' +
      '</table></div>');
  }

  function setDefVars() {
    relicCountElement = getElementById('relicCount');
    lDPercentageElement = getElementById('LDPercentage');
    lDCloakedElement = getElementById('LDCloaked');
    attackElement = getElementById('attackValue');
    attackBuffedElement = getElementById('attackValueBuffed');
    defenseElement = getElementById('defenseValue');
    defenseBuffedElement = getElementById('defenseValueBuffed');
    armorElement = getElementById('armorValue');
    armorBuffedElement = getElementById('armorValueBuffed');
    damageElement = getElementById('damageValue');
    damageBuffedElement = getElementById('damageValueBuffed');
    hpElement = getElementById('hpValue');
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
    fetchStatsBtn.classList.add('fshHide');
    var hideRelicOffline = getValue('hideRelicOffline');
    if (relicData.is_owner && !hideRelicOffline) {
      getMembrList(false).done(missingMembers);
    }
    insertHtmlBeforeEnd(leftDiv, proc);
    processingStatus = getElementById('ProcessingStatus');
    var midDiv = createDiv({
      className: 'fshFloatLeft fshRelicMidDiv',
      innerHTML: defStats
    });
    insertElement(containerDiv, midDiv);
    setDefVars();
    var rightDiv = createDiv({
      className: 'fshFloatLeft fshRelicRightDiv',
      innerHTML: atkStats
    });
    insertElement(containerDiv, rightDiv);
    setAtkVars();
  }

  var relicMultiplier;

  function calcRelicMultiplier(rels) {
    if (rels === 1) {return 1.5;}
    return Math.round((1 - rels / 10) * 100) / 100;
  }

  function parseGuild$1(html) {
    var doc = createDocument(html);
    var nodeList = doc.querySelectorAll('#pCC img[src*="/relics/"]');
    var relicCount = nodeList.length;
    relicCountElement.textContent = relicCount.toString();
    relicMultiplier = calcRelicMultiplier(relicCount);
    lDPercentageElement.textContent = (relicMultiplier * 100).toString() + '%';
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
  var groupStats$1;
  var mercStats;

  function deductMercStats() {
    groupStats$1.attack -= mercStats.attack;
    groupStats$1.defense -= mercStats.defense;
    groupStats$1.armor -= mercStats.armor;
    groupStats$1.damage -= mercStats.damage;
    groupStats$1.hp -= mercStats.hp;
  }

  function updateDefValues() {
    attackElement.textContent = addCommas(defRawAttack);
    defenseElement.textContent = addCommas(defRawDefense);
    armorElement.textContent = addCommas(defRawArmor);
    damageElement.textContent = addCommas(defRawDamage);
    hpElement.textContent = addCommas(defRawHp);
    defCloakedElement.textContent = defCloaked.toString();
    defProcessed += 1;
    defProcessedElement.textContent = defProcessed.toString();
  }

  function calculateGroup() {
    processingStatus.textContent = 'Processing attacking group stats ... ';
    if (mercStats) {deductMercStats();}
    groupAttackElement.textContent = addCommas(groupStats$1.attack);
    groupDefenseElement.textContent = addCommas(groupStats$1.defense);
    groupArmorElement.textContent = addCommas(groupStats$1.armor);
    groupDamageElement.textContent = addCommas(groupStats$1.damage);
    groupHPElement.textContent = addCommas(groupStats$1.hp);

    var buffs = reduceBuffArray(GameData.player().buffs);

    var nightmareVisageEffect = Math.ceil(groupStats$1.attack *
      (fallback(buffs['Nightmare Visage'], 0) * 0.0025));
    groupStats$1.attack -= nightmareVisageEffect;

    var storedFlinchEffectValue = Math.ceil(groupStats$1.attack *
      leadDefender.flinchLevel * 0.001);
    groupAttackBuffedElement.textContent = addCommas(groupStats$1.attack -
      storedFlinchEffectValue);

    var defenseWithConstitution = Math.ceil(groupStats$1.defense *
      (1 + fallback(buffs.Constitution, 0) * 0.001));
    var totalDefense = defenseWithConstitution + nightmareVisageEffect;
    groupDefenseBuffedElement.textContent = addCommas(totalDefense);

    groupArmorBuffedElement.textContent = addCommas(groupStats$1.armor +
      Math.floor(groupStats$1.armor * fallback(buffs.Sanctuary, 0) * 0.001));

    var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
      fallback(buffs.Fortitude, 0) * 0.001);
    var chiStrikeBonusDamage = Math.ceil((groupStats$1.hp + fortitudeBonusHP) *
      fallback(buffs['Chi Strike'], 0) * 0.001);
    var storedTerrorizeEffectValue = Math.ceil(
      groupStats$1.damage * leadDefender.terrorizeLevel * 0.001);
    groupDamageBuffedElement.textContent = addCommas(groupStats$1.damage +
      chiStrikeBonusDamage - storedTerrorizeEffectValue);
    groupHPBuffedElement.textContent = addCommas(groupStats$1.hp +
      fortitudeBonusHP);

    // Effect on defending group from Flinch on attacking group.
    var flinchEffectValue = Math.ceil(defBuffedAttack *
      fallback(buffs.Flinch, 0) * 0.001);
    defenseBuffedElement.textContent = addCommas(defBuffedAttack -
      flinchEffectValue);
    var terrorizeEffectValue = Math.ceil(defBuffedDamage *
      fallback(buffs.Terrorize, 0) * 0.001);
    damageBuffedElement.textContent = addCommas(defBuffedDamage -
      terrorizeEffectValue);

    processingStatus.textContent = 'Done.';
  }

  function doCalculations() {
    processingStatus.textContent = 'Processing defending guild stats ... ';

    defRawAttack += Math.round(leadDefender.attackValue * relicMultiplier);
    var nightmareVisageEffect = Math.ceil(defRawAttack *
      (leadDefender.nightmareVisageLevel * 0.0025));

    defRawDefense += Math.round(leadDefender.defenseValue * relicMultiplier);
    var defenseWithConstitution = Math.ceil(defRawDefense *
      (1 + leadDefender.constitutionLevel * 0.001));
    var defBuffedDefense = defenseWithConstitution + nightmareVisageEffect;

    defRawArmor += Math.round(leadDefender.armorValue * relicMultiplier);

    defRawDamage += Math.round(leadDefender.damageValue * relicMultiplier);
    defRawHp += Math.round(leadDefender.hpValue * relicMultiplier);
    var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
      leadDefender.fortitudeLevel * 0.001);
    var defBuffedHp = defRawHp + fortitudeBonusHP;
    var chiStrikeBonusDamage = Math.ceil(defBuffedHp *
      leadDefender.chiStrikeLevel * 0.001);

    updateDefValues();

    defBuffedAttack = defRawAttack - nightmareVisageEffect;
    attackBuffedElement.textContent = addCommas(defBuffedAttack);
    defenseBuffedElement.textContent = addCommas(defBuffedDefense);
    dc225Element.textContent = addCommas(Math.ceil(
      defBuffedDefense * 0.55));
    dc175Element.textContent = addCommas(Math.ceil(
      defBuffedDefense * 0.65));
    armorBuffedElement.textContent = addCommas(defRawArmor +
      Math.floor(defRawArmor * leadDefender.sanctuaryLevel * 0.001));
    defBuffedDamage = defRawDamage + chiStrikeBonusDamage;
    damageBuffedElement.textContent = addCommas(defBuffedDamage);
    hpBuffedElement.textContent = addCommas(defBuffedHp);

    if (leadDefender.cloakLevel !== 0) {
      lDCloakedElement.textContent = 'Yes';
    }

    if (GameData.player().hasGroup) {
      calculateGroup();
    } else {
      processingStatus.textContent = 'Done.';
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
    updateDefValues();
  }

  function storeLeadDefender(json) {
    leadDefender = playerDataObject(json);
  }

  function storeGroupStats(obj) {
    groupStats$1 = obj;
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

  function ajaxFailure(jqXHR) {
    processingStatus.textContent = jqXHR.status.toString() + ' ' +
      jqXHR.statusText;
  }

  function getGuild$1() {
    return retryAjax({
      url: 'index.php',
      data: {
        no_mobile: 1,
        cmd: 'guild',
        subcmd: 'view',
        guild_id: relicData.controlled_by.guild_id
      }
    });
  }

  function getGroups() {
    return retryAjax({
      url: 'index.php',
      data: {
        no_mobile: 1,
        cmd: 'guild',
        subcmd: 'groups'
      }
    });
  }

  function parseGroups(html) {
    var doc = createDocument(html);
    var disband = doc.querySelector('#pCC a[href*="confirmDisband"]');
    var viewStats = disband.previousElementSibling.href;
    var prm = [getGroupStats(viewStats).done(storeGroupStats)];
    var hasMerc = disband.parentNode.parentNode.previousElementSibling
      .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
    if (hasMerc) {
      prm.push(getMercStats().done(storeMercStats));
    }
    return $.when.apply($, prm);
  }

  function getStats() {
    prepareSecondaryDivs(relicData);
    resetCounters();
    var prm = [];
    prm.push(getGuild$1().done(parseGuild$1));
    if (GameData.player().hasGroup) {
      prm.push(getGroups().pipe(parseGroups));
    }
    for (var i = 1; i < myDefenders.length; i += 1) {
      prm.push(getProfile(myDefenders[i]).done(parseDefender)
        .fail(ajaxFailure));
    }
    prm.push(getProfile(myDefenders[0]).done(storeLeadDefender));
    $.when.apply($, prm).done(doCalculations);
  }

  function viewRelic(e, data) {
    relicData = data.response.data;
    if (relicData.defenders.length > 0) {
      primaryElementsSetup(relicData);
      fetchStatsBtn.addEventListener('click', getStats);
    }
  }

  function injectRelic() {
    $.subscribe('9' + def_suffixSuccessActionResponse, viewRelic);
  }

  var colorHash = {
    '0': 'red', // Should never see this.
    '1': 'orange',
    '2': 'yellow'
  };

  var bias = {
    '0': {generalVariable: 1.1053, hpVariable: 1.1},
    '1': {generalVariable: 1.1, hpVariable: 1.053},
    '2': {generalVariable: 1.053, hpVariable: 1},
    '3': {generalVariable: 1.1053, hpVariable: 1}
  };

  /*
    colSpan = attributes[0]
    anElement = attributes[1]
    isHeader = attributes[2]
  */
  function addNextCell(row, attributes) {
    var aCell = row.insertCell(-1);
    aCell.colSpan = attributes[0];
    if (attributes[2]) {aCell.className = 'header';}
    insertElement(aCell, attributes[1]);
    return aCell;
  }

  function addRowCells(aRow, someCells) {
    someCells.forEach(function(cell) {
      addNextCell(aRow, cell);
    });
  }

  function addNextRow(tbl, cells, isBlue) {
    var aRow = tbl.insertRow(-1);
    if (isBlue) {aRow.className = 'fshBlue';}
    addRowCells(aRow, cells);
    return aRow;
  }

  function addRows(tbl, rows) {
    rows.forEach(function(row) {
      addNextRow(tbl, row[0], row[1]);
    });
  }

  var realmName;

  function setRealm(data) {
    realmName = data;
  }

  var currentHp;
  var maxHp;
  var guildKills;
  var currentPct;
  var totalPct;
  var statusText;
  var cooldownText;

  function initVars() {
    currentHp = createSpan();
    maxHp = createSpan();
    guildKills = createSpan();
    currentPct = createSpan();
    totalPct = createSpan();
    statusText = createSpan();
    cooldownText = createSpan();
  }

  function clearTitanDiv() {
    currentHp.textContent = '';
    maxHp.textContent = '';
    guildKills.textContent = '';
    currentPct.textContent = '';
    totalPct.textContent = '';
    statusText.innerHTML = '';
    cooldownText.innerHTML = '';
  }

  var titanTbl;

  function clearMemberRows() {
    if (titanTbl.rows.length > 7) {
      for (var i = 7; i < titanTbl.rows.length; i += 1) {
        titanTbl.deleteRow(i);
      }
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
    addRows(titanTbl, [
      [[[2, textSpan('Titan HP'), true], [4, textSpan('Your Guild'), true]]],
      [[[2, makeTitanHpWrapper()], [4, guildKills]]],
      [[[2, textSpan('Current'), true], [4, makePctWrapper(currentPct)]], true],
      [[[2, textSpan('Total'), true], [4, makePctWrapper(totalPct)]], true],
      [[[2, textSpan('Status'), true], [4, statusText]], true],
      [[[6, cooldownText]]],
      [[[2, textSpan('Member'), true], [2, textSpan('Kills'), true],
        [2, textSpan('% of Total'), true]]]
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

  function hasTitan(el) {
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
      titanDiv = createDiv({className: 'titanInfo'});
      initVars();
      buildTitanInfoTable();
      insertElement(titanDiv, titanTbl);
      insertElement(actCont, titanDiv);
    }
  }

  function formatOffset(secs) {
    var aDate = new Date(now + secs * 1000);
    var yyyy = aDate.getFullYear();
    var dd = padZ(aDate.getDate());
    var month = months[aDate.getMonth()];
    var hh = padZ(aDate.getHours());
    var mm = padZ(aDate.getMinutes());
    return hh + ':' + mm + ' ' + dd + '/' + month + '/' + yyyy;
  }

  function getCooldownHtml(cooldown) {
    if (cooldown <= 0) {
      return '<span class="fshGreen cooldown">No active cooldown</span>';
    }
    return '<span class="fshMaroon cooldown">Cooldown until: ' +
      formatOffset(cooldown) +
      '</span>';
  }

  function doTopLabels(ourTitan) {
    currentHp.textContent = ourTitan.current_hp.toString();
    maxHp.textContent = ourTitan.max_hp.toString();
    guildKills.textContent = ourTitan.kills.toString();
    currentPct.textContent = roundToString(getKillsPct(ourTitan.max_hp -
      ourTitan.current_hp, ourTitan.kills), 2);
    totalPct.textContent = roundToString(ourTitan.kills * 100 / ourTitan.max_hp,
      2);
    statusText.innerHTML = getTitanString(ourTitan.kills, ourTitan.max_hp,
      ourTitan.current_hp);
    cooldownText.innerHTML = getCooldownHtml(ourTitan.cooldown);
  }

  function doMemberRows(ourTitan) {
    clearMemberRows();
    if (!ourTitan.contributors) {return;}
    var memberRows = ourTitan.contributors.map(function(member) {
      return [[
        [2, textSpan(member.player.name)],
        [2, textSpan(member.kills.toString())],
        [2, textSpan(roundToString(member.kills * 100 / ourTitan.kills, 2) + '%')]
      ]];
    });
    addRows(titanTbl, memberRows);
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

  function scouttower() {
    return callApp({cmd: 'guild', subcmd: 'scouttower'});
  }

  var timeoutId$1;

  function clearTheTimeout() {
    if (timeoutId$1) {
      window.clearTimeout(timeoutId$1);
      timeoutId$1 = null;
    }
  }

  function goodData(data) {
    return data.s && Array.isArray(data.r);
  }

  function titanToShow(dynamic) {
    return calf.showTitanInfo && Array.isArray(dynamic) && dynamic.some(hasTitan);
  }

  function ajaxScoutTower() {
    scouttower().done(function processScoutTower(data) {
      if (goodData(data)) {
        processTitans(data.r);
        if (titanToShow(GameData.realm().dynamic)) {
          timeoutId$1 = window.setTimeout(ajaxScoutTower, 30000);
        } else {
          hideTitanDiv();
        }
      }
    });
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

  function titanStats(data) {
    if (data.realm.dynamic) {
      setRealm(data.realm.name);
      testDynamics(data.realm.dynamic);
    }
  }

  function toggleShowTitanInfo() {
    calf.showTitanInfo = !calf.showTitanInfo;
    setValue('showTitanInfo', calf.showTitanInfo);
    testDynamics(GameData.realm().dynamic);
  }

  var buttonContainer;
  var yourLvl;
  var formGroup;
  var quickBuff;
  var realmMap;
  var ufsgMap;
  var soundCheck;
  var huntCheck;

  function doFormGroup(self) { // jQuery.min
    $(self).qtip('hide');
    GameData.doAction(12, 401, {}, 0);
  }

  function openQuickBuff() {
    openQuickBuffByName(playerName());
  }

  function openRealmMap() {
    window.open('index.php?cmd=world&subcmd=map', 'fsMap');
  }

  function openUfsgMap() {
    var gameRealm = GameData.realm();
    window.open(guideUrl + 'realms&subcmd=view&realm_id=' + gameRealm.id,
      'mapUfsg');
  }

  function toggleSound() {
    // Doesn't actually work in New World...
    setValue('playNewMessageSound', !getValue('playNewMessageSound'));
  }

  function toggleHuntMode() {
    calf.huntingMode = !calf.huntingMode;
    setValue('huntingMode', calf.huntingMode);
  }

  var changeHdl = [
    {
      test: function(self) {return self === soundCheck;},
      act: toggleSound
    },
    {
      test: function(self) {return self === huntCheck;},
      act: toggleHuntMode
    }
  ];

  var clickHdl = [
    {
      test: function(self) {return self === formGroup;},
      act: doFormGroup
    },
    {
      test: function(self) {return self === quickBuff;},
      act: openQuickBuff
    },
    {
      test: function(self) {return self === realmMap;},
      act: openRealmMap
    },
    {
      test: function(self) {return self === ufsgMap;},
      act: openUfsgMap
    }
  ];

  function fixTeleport() {
    if (window.GameController && GameController.Realm) {
      GameController.Realm.footprintTileList = []; // BUGFIX - in case of teleporting in new realm with footprints turned on
    }
  }

  function makeButtonContainer() {
    if (buttonContainer) {buttonContainer.remove();}
    return createDiv({
      className: 'fshCurveContainer',
      id: 'fshWorldButtonContainer'
    });
  }

  function doLevels(data, worldName) {
    var lvlDiv = createDiv({
      className: 'fshFsty',
      innerHTML: '<div>Min Lvl: ' + data.realm.minlevel + '</div>'
    });
    var btmDiv = createDiv({textContent: 'Your Lvl: '});
    yourLvl = textSpan(data.player.level.toString());
    insertElement(btmDiv, yourLvl);
    insertElement(lvlDiv, btmDiv);
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

  function showQuickLinks(worldName, data) {
    doLevels(data, worldName);
    formGroup = doBtn('fshFormGroup', 'Quick Create Attack Group', worldName);
    quickBuff = doBtn('fshQuickBuff', 'Open Quick Buff Popup', worldName);
    realmMap = doBtn('fshRealmMap', 'Open Realm Map', worldName);
    ufsgMap = doBtn('fshTempleOne', 'Search map in Ultimate FSG', worldName);
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

  function showSpeakerOnWorld(worldName) {
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

  function injectButtons(data) {
    fixTeleport();
    buttonContainer = makeButtonContainer();
    showQuickLinks(buttonContainer, data);
    showSpeakerOnWorld(buttonContainer);
    showHuntMode(buttonContainer);
    buttonContainer.addEventListener('click', eventHandler(clickHdl));
    buttonContainer.addEventListener('change', eventHandler(changeHdl));
    getElementById('worldContainer')
      .insertBefore(buttonContainer, getElementById('worldCoord'));
  }

  function levelStats(e, data) {
    if (yourLvl) {
      yourLvl.textContent = data.b;
    }
  }

  function fixDebuffQTip(e) { // jQuery.min
    $(e.target).qtip('hide');
  }

  function hazRealm(data) {
    return data.realm && data.realm.name;
  }

  function injectWorldNewMap(data) {
    updateSendGoldOnWorld(data);
    if (hazRealm(data)) {
      injectButtons(data);
      titanStats(data);
      getElementById('buffList')
        .addEventListener('click', fixDebuffQTip);
      if (calf.hideSubLvlCreature) {GameData.fetch(256);}
    }
  }

  function impIconColour() { // jQuery
    var imp = $('#actionlist-shield-imp');
    if (imp.length === 1) {
      imp.css('background-color',
        colorHash[imp.text()] || '#ad8043');
    }
  }

  function onWorld() {
    injectSendGoldOnWorld();
    if (window.initialGameData) {// HCS initial data
      injectWorldNewMap(window.initialGameData);
      impIconColour(null,
        {b: window.initialGameData.player.buffs});
    }
    $.subscribe('-1' + def_suffixSuccessActionResponse +
                ' 5' + def_suffixSuccessActionResponse,
    function(e, data) { // change of information
      injectWorldNewMap(data);
    });
    $.subscribe(def_playerBuffs, impIconColour);
    $.subscribe('level.stats-player', levelStats);
  }

  var shoppingData;
  var dialog$1;
  var jDialog;
  var fshDiv;
  var numInput;
  var qbBtn;
  var resultDiv;

  function quickBuy() {
    return retryAjax({
      cache: false,
      url: 'fetchdata.php',
      data: {
        a: 14,
        d: 0,
        id: shoppingData.id,
        item_id: shoppingData.itemId,
        _rnd: rnd()
      },
      dataType: 'json'
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
      prm.push(quickBuy().done(quickDone));
    }
    $.when.apply($, prm).done(normalBuy);
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
    qbBtn.addEventListener('click', qBuy);
    insertElement(fshDiv, qbBtn);
    resultDiv = createDiv();
    insertElement(fshDiv, resultDiv);
    insertElement(dialog$1, fshDiv);
  }

  function worldDialogShop(e, data) {
    shoppingData = data;
    dialog$1 = fallback(dialog$1,
      getElementById('shopDialogConfirm'));
    if (!dialog$1) {return;}
    jDialog = fallback(jDialog, $(dialog$1).data('worldDialogShopConfirm'));
    if (!fshDiv) {injectQuickBuy();} else {resultDiv.textContent = '';}
  }

  function prepareShop() {
    $.subscribe('prompt.worldDialogShop', worldDialogShop);
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
    {
      test: function(combat) {
        return combat.playerHits === '-' && combat.creatureHits === '-';
      },
      fStatus: function() {return 'Unresolved';}
    },
    {
      test: function(combat) {return combat.playerHits === '-';},
      fStatus: function() {return 'Player dies';}
    },
    {
      test: function(combat) {return combat.playerHits === 1;},
      fStatus: function(combat) {return 'Player 1 hits' + evalMiss(combat);}
    },
    {
      test: function(combat) {return combat.playerHits > 1;},
      fStatus: function(combat) {return 'Player > 1 hits' + evalMiss(combat);}
    }
  ];

  function evalAnalysis(combat) {
    // Analysis:
    combat.playerHits = evalPlayerHits(combat);
    combat.creatureHits = evalCreatureHits(combat);
    for (var i = 0; i < evalFightStatus.length; i += 1) {
      if (evalFightStatus[i].test(combat)) {
        combat.fightStatus = evalFightStatus[i].fStatus(combat);
        return combat;
      }
    }
    combat.fightStatus = 'Unknown';
    return combat;
  }

  function calcArm(combat) {
    if (combat.callback.groupExists) {
      return combat.callback.groupArmorValue;
    }
    return combat.player.armorValue;
  }

  function evalSanctuary(combat) {
    if (combat.player.sanctuaryLevel > 0) {
      combat.extraNotes += 'Sanc Bonus Armor = ' +
        Math.floor(combat.player.armorValue *
        combat.player.sanctuaryLevel * 0.001) + '<br>';
    }
  }

  function evalTerrorize(combat) {
    if (combat.player.terrorizeLevel > 0) {
      combat.extraNotes += 'Terrorize Creature Damage Effect = ' +
        combat.terrorizeEffect * -1 + '<br>';
    }
  }

  function evalArmour(combat) {
    var armorVal = calcArm(combat);
    combat.overallArmorValue = armorVal +
      Math.floor(combat.player.armorValue *
      combat.player.sanctuaryLevel * 0.001);

    evalSanctuary(combat);

    combat.terrorizeEffect = Math.floor(combat.creature.damage *
      combat.player.terrorizeLevel * 0.001);

    evalTerrorize(combat);

    combat.creature.damage -= combat.terrorizeEffect;
    combat.creatureDamageDone = Math.ceil(combat.generalVariable *
      combat.creature.damage - combat.overallArmorValue +
      combat.overallHPValue);

    if (combat.creatureHitByHowMuch >= 0) {
      var approxDmg = combat.generalVariable * combat.creature.damage;
      if (approxDmg < combat.overallArmorValue) {
        combat.numberOfCreatureHitsTillDead = combat.overallHPValue;
      } else {
        combat.numberOfCreatureHitsTillDead = Math.ceil(
          combat.overallHPValue / (approxDmg - combat.overallArmorValue));
      }
    } else {
      combat.numberOfCreatureHitsTillDead = '-';
    }

    return combat;
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
    return combat;
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

  function caRunning(combat) {
    calcLowest(combat);
    combat.lowestFeasibleCALevel =
      Math.max(combat.lowestCALevelToStillHit,
        combat.lowestCALevelToStillKill);
    combat.extraNotes += 'Lowest CA to still 1-hit this creature = ' +
      combat.lowestFeasibleCALevel + '<br>';
    if (combat.lowestFeasibleCALevel !== 0) {
      combat.extraAttackAtLowestFeasibleCALevel =
        Math.floor(combat.player.attackValue * 0.0025 *
        combat.lowestFeasibleCALevel);
      combat.extraDamageAtLowestFeasibleCALevel =
        Math.floor(combat.player.damageValue * 0.0025 *
        combat.lowestFeasibleCALevel);
      combat.extraNotes +=
        'Extra CA Att/Dam at this lowered CA level = ' +
        combat.extraAttackAtLowestFeasibleCALevel + ' / ' +
        combat.extraDamageAtLowestFeasibleCALevel + '<br>';
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
    return combat;
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
    return combat;
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

    return combat;
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
    combat.deathDealerBonusDamage =
      Math.floor(combat.player.damageValue * (Math.min(Math.floor(
        combat.player.killStreakValue / 5) * 0.01 *
        combat.player.deathDealerLevel, 20) / 100));
    combat.counterAttackBonusAttack =
      Math.floor(combat.player.attackValue * 0.0025 *
      combat.player.counterAttackLevel);
    combat.counterAttackBonusDamage =
      Math.floor(combat.player.damageValue * 0.0025 *
      combat.player.counterAttackLevel);
    evalExtraStam(combat);
    evalDeathDealer(combat);
    evalCounterAttack(combat);
    return combat;
  }

  function doesGroupExist(combat) {
    if (combat.callback.groupExists) {return 'Group ';}
    return '';
  }

  function canIHitIt(combat) {
    if (combat.hitByHowMuch > 0) {return 'Yes';}
    return 'No';
  }

  function willIBeHit(combat) {
    if (combat.creatureHitByHowMuch >= 0) {return 'Yes';}
    return 'No';
  }

  function evalHTML(combat) {
    return '<table width="100%"><tbody>' +
      '<tr><td bgcolor="#CD9E4B" colspan="4" align="center">' +
      doesGroupExist(combat) +
      'Combat Evaluation</td></tr>' +
      '<tr><td align="right"><span style="color:#333333">' +
      'Will I hit it? </td><td align="left">' +
      canIHitIt(combat) +
      '</td><td align="right"><span style="color:#333333">' +
      'Extra Attack: </td><td align="left">( ' +
      combat.hitByHowMuch + ' )</td></tr>' +
      '<tr><td align="right"><span style="color:#333333">' +
      '# Hits to kill it? </td><td align="left">' +
      combat.numberOfHitsRequired +
      '</td><td align="right"><span style="color:#333333">' +
      'Extra Damage: </td><td align="left">( ' + combat.damageDone +
      ' )</td></tr>' +
      '<tr><td align="right"><span style="color:#333333">' +
      'Will I be hit? </td><td align="left">' +
      willIBeHit(combat) +
      '</td><td align="right"><span style="color:#333333">' +
      'Extra Defense: </td><td align="left">( ' + -1 *
      combat.creatureHitByHowMuch + ' )</td></tr>' +
      '<tr><td align="right"><span style="color:#333333">' +
      '# Hits to kill me? </td><td align="left">' +
      combat.numberOfCreatureHitsTillDead +
      '</td><td align="right"><span style="color:#333333">' +
      'Extra Armor + HP: </td><td align="left">( ' + -1 *
      combat.creatureDamageDone + ' )</td></tr>' +
      '<tr><td align="right"><span style="color:#333333">' +
      '# Player Hits? </td><td align="left">' + combat.playerHits +
      '</td><td align="right"><span style="color:#333333">' +
      '# Creature Hits? </td><td align="left">' + combat.creatureHits +
      '</td></tr>' +
      '<tr><td align="right"><span style="color:#333333">' +
      'Fight Status: </span></td><td align="left" colspan="3"><span>' +
      combat.fightStatus + '</span></td></tr>' +
      '<tr><td align="right"><span style="color:#333333">' +
      'Notes: </span></td><td align="left" colspan="3">' +
      '<span style="font-size:x-small;">' + combat.extraNotes +
      '</span></td></tr>' +
      '<tr><td colspan="4"><span style="font-size:x-small; ' +
      'color:gray">*Does include CA, DD, HF, DC, Flinch, Super Elite ' +
      'Slayer, NMV, Sanctuary, Constitution, Fortitude, Chi Strike ' +
      'and Terrorize (if active) and allow for randomness (1.1053). ' +
      'Constitution, NMV, Fortitude and Chi Strike apply to group ' +
      'stats.</span></td></tr>' +
      '</tbody></table>';
  }

  function getBiasGeneral(combat) {
    if (bias[combat.combatEvaluatorBias]) {
      return bias[combat.combatEvaluatorBias].generalVariable;
    }
    return 1.1053;
  }

  function getBiasHp(combat) {
    if (bias[combat.combatEvaluatorBias]) {
      return bias[combat.combatEvaluatorBias].hpVariable;
    }
    return 1.1;
  }

  function creatureData(ses) { // jQuery
    var obj = {};
    obj.name = $('#dialog-viewcreature').find('h2.name').text();
    obj.class = $('#dialog-viewcreature')
      .find('span.classification')
      .text();
    obj.attack = intValue($('#dialog-viewcreature')
      .find('dd.attribute-atk').text());
    obj.defense = intValue($('#dialog-viewcreature')
      .find('dd.attribute-def').text());
    obj.armor = intValue($('#dialog-viewcreature')
      .find('dd.attribute-arm').text());
    obj.damage = intValue($('#dialog-viewcreature')
      .find('dd.attribute-dmg').text());
    obj.hp = intValue($('#dialog-viewcreature')
      .find('p.health-max').text());
    // reduce stats if critter is a SE and player has SES cast on them.
    if (obj.name.search('Super Elite') !== -1) {
      obj.attack -= Math.ceil(obj.attack * ses);
      obj.defense -= Math.ceil(obj.defense * ses);
      obj.armor -= Math.ceil(obj.armor * ses);
      obj.damage -= Math.ceil(obj.damage * ses);
      obj.hp -= Math.ceil(obj.hp * ses);
    }
    return obj;
  }

  function checkForCreatureEvaluatorGroup() { // Legacy
    if ($('#creatureEvaluatorGroup').length === 0) {
      $('#dialog-viewcreature')
        .append('<div id="creatureEvaluatorGroup" ' +
          'style="clear:both;"></div>');
    }
  }

  function checkForCreatureEvaluator() { // Legacy
    if ($('#creatureEvaluator').length === 0) {
      $('#dialog-viewcreature')
        .append('<div id="creatureEvaluator" ' +
          'style="clear:both;"></div>');
    }
  }

  function getCreaturePlayerData(responseText, callback) { // Legacy
    var combat = {};
    combat.callback = callback;
    // playerdata
    combat.player = playerDataString(responseText);
    combat.combatEvaluatorBias = getValue('combatEvaluatorBias');
    combat.attackVariable = 1.1053;
    combat.generalVariable = getBiasGeneral(combat);
    combat.hpVariable = getBiasHp(combat);
    combat.creature =
      creatureData(combat.player.superEliteSlayerMultiplier);
    combat = evalExtraBuffs(combat);
    combat = evalAttack(combat);
    combat = evalDamage(combat);
    combat = evalDefence(combat);
    combat = evalArmour(combat);
    combat = evalAnalysis(combat);
    combat = evalCA(combat);
    combat.evaluatorHTML = evalHTML(combat);
    var tempdata;
    if (callback.groupEvaluation) {
      checkForCreatureEvaluatorGroup();
      tempdata = combat.evaluatorHTML.replace(/'/g, '\\\'');
      $('#creatureEvaluatorGroup').html(tempdata);
    } else {
      checkForCreatureEvaluator();
      tempdata = combat.evaluatorHTML.replace(/'/g, '\\\'');
      $('#creatureEvaluator').html(tempdata);
    }
  }

  function getStatValue(stat, doc) { // Legacy
    var node = findNode('//table[@width="400"]/tbody/tr/td[contains(.,"' +
      stat + ':")]', doc);
    if (node) {return Number(node.nextSibling.textContent.replace(/,/, ''));}
    return 0;
  }

  function getCreatureGroupData(responseText) { // Legacy
    var doc = createDocument(responseText);
    var groupAttackValue = getStatValue('Attack', doc);
    var groupDefenseValue = getStatValue('Defense', doc);
    var groupArmorValue = getStatValue('Armor', doc);
    var groupDamageValue = getStatValue('Damage', doc);
    var groupHPValue = getStatValue('HP', doc);
    retryAjax('index.php?no_mobile=1&cmd=profile').done(function(html) {
      getCreaturePlayerData(html, {
        groupExists: true,
        groupAttackValue: groupAttackValue,
        groupDefenseValue: groupDefenseValue,
        groupArmorValue: groupArmorValue,
        groupDamageValue: groupDamageValue,
        groupHPValue: groupHPValue,
        groupEvaluation: true
      });
    });
  }

  function checkIfGroupExists(responseText) { // Hybrid
    var doc = createDocument(responseText);
    var groupExistsIMG = $(doc)
      .find('img[title="Disband Group (Cancel Attack)"]');
    if (groupExistsIMG.length > 0) {
      var groupHref = groupExistsIMG.parents('td:first').find('a:first')
        .attr('href');
      retryAjax(groupHref).done(getCreatureGroupData);
    }
  }

  function addRemoveCreatureToDoNotKillList(evt) {
    var creatureName = evt.target.getAttribute('creatureName');
    var ind = calf.doNotKillList.indexOf(creatureName);
    if (ind !== -1) {
      calf.doNotKillList.splice(ind, 1);
      evt.target.innerHTML = 'Add to the do not kill list';
    } else {
      calf.doNotKillList.push(creatureName);
      evt.target.innerHTML = 'Remove from do not kill list';
    }
    setValue('doNotKillList', calf.doNotKillList.join());
    // refresh the action list
    afterUpdateActionList();
  }

  function readyViewCreature() { // Hybrid
    $('#creatureEvaluator').html('');
    $('#creatureEvaluatorGroup').html('');

    retryAjax('index.php?no_mobile=1&cmd=profile').done(function(html) {
      getCreaturePlayerData(html, {
        groupExists: false,
        groupAttackValue: 0,
        groupDefenseValue: 0,
        groupArmorValue: 0,
        groupDamageValue: 0,
        groupHPValue: 0,
        groupEvaluation: false
      });
    });
    retryAjax('index.php?no_mobile=1&cmd=guild&subcmd=groups')
      .done(checkIfGroupExists);

    $('#addRemoveCreatureToDoNotKillList').html('');
    if ($('#addRemoveCreatureToDoNotKillList').length === 0) {
      var doNotKillElement = '<div id="addRemoveCreatureToDo' +
        'NotKillList"" class="description" style="cursor:' +
        'pointer;text-decoration:underline;color:blue;"></div>';
      $(doNotKillElement).insertAfter($('#dialog-viewcreature')
        .find('p.description'));
    }
    var creatureName = $('#dialog-viewcreature').find('h2.name')
      .text();
    $('#addRemoveCreatureToDoNotKillList')
      .attr('creatureName', creatureName);
    var extraText = 'Add to the do not kill list';
    if (calf.doNotKillList.indexOf(creatureName) !== -1) {
      extraText = 'Remove from do not kill list';
    }
    $('#addRemoveCreatureToDoNotKillList').html(extraText);
    getElementById('addRemoveCreatureToDoNotKillList')
      .addEventListener('click',
        addRemoveCreatureToDoNotKillList, true);
  }

  var showCreatureInfo;
  var generalVariable = 1.1053;
  var hpVariable = 1.1;
  var statLevel;
  var statDefense;
  var statAttack;
  var statDamage;
  var statArmor;
  var statHp;

  function toggleShowCreatureInfo() {
    showCreatureInfo = !showCreatureInfo;
    setValue('showCreatureInfo', showCreatureInfo);
  }

  function biasIsValid(combatEvaluatorBias) {
    return combatEvaluatorBias &&
      combatEvaluatorBias >= 0 && combatEvaluatorBias <= 3;
  }

  function getBias() {
    var combatEvaluatorBias = getValue('combatEvaluatorBias');
    if (biasIsValid(combatEvaluatorBias)) {
      generalVariable = bias[combatEvaluatorBias].generalVariable;
      hpVariable = bias[combatEvaluatorBias].hpVariable;
    }
  }

  function getStatText(statTooltip, statClassName) {
    return statTooltip.getElementsByClassName(statClassName)[0]
      .nextElementSibling.textContent;
  }

  function getMyStats() {
    statLevel = intValue(getStatText(
      getElementById('statbar-level-tooltip-general'), 'stat-level'));
    var statTooltip = getElementById('statbar-character-tooltip-stats');
    statDefense = getStatText(statTooltip, 'stat-defense');
    statAttack = getStatText(statTooltip, 'stat-attack');
    statDamage = getStatText(statTooltip, 'stat-damage');
    statArmor = getStatText(statTooltip, 'stat-armor');
    statHp = getStatText(statTooltip, 'stat-hp');
  }

  function doMouseOver(creature, monster) {
    var oneHitNumber = Math.ceil(creature.hp * hpVariable + creature.armor *
      generalVariable);
    var myLvlClas = 'fshYellow';
    if (statLevel > creature.level) {myLvlClas = 'fshRed';}
    var monsterTip = '<table><tr><td>' +
      '<img src="https://cdn.fallensword.com/creatures/' + creature.image_id +
      '.jpg" height="200" width="200"></td><td rowspan="2">' +
      '<table width="400"><tr>' +
      '<td class="header" colspan="4" class="fshCenter">Statistics</td></tr>' +
      '<tr><td>Class:&nbsp;</td><td width="40%">' + creature.creature_class +
      '</td><td>Level:&nbsp;</td><td width="40%">' + creature.level +
      ' (your level:<span class="' + myLvlClas + '">' +
      statLevel + '</span>)</td>' +
      '</tr><tr><td>Attack:&nbsp;</td><td width="40%">' + creature.attack +
      ' (your defense:<span class="fshYellow">' + statDefense + '</span>)</td>' +
      '<td>Defense:&nbsp;</td><td width="40%">' + creature.defense +
      ' (your attack:<span class="fshYellow">' + statAttack + '</span>)</td>' +
      '</tr><tr><td>Armor:&nbsp;</td><td width="40%">' + creature.armor +
      ' (your damage:<span class="fshYellow">' + statDamage + '</span>)</td>' +
      '<td>Damage:&nbsp;</td><td width="40%">' + creature.damage +
      ' (your armor:<span class="fshYellow">' + statArmor + '</span>)</td>' +
      '</tr><tr><td>HP:&nbsp;</td><td width="40%">' + creature.hp +
      ' (your HP:<span class="fshYellow">' + statHp + '</span>)' +
      '(1H: <span class="fshRed">' + oneHitNumber + '</span>)</td>' +
      '<td>Gold:&nbsp;</td><td width="40%">' + creature.gold + '</td></tr>' +
      '<tr><td colspan="4" height="5"></td></tr><tr>' +
      '<td class="header" colspan="4" class="fshCenter">Enhancements</td></tr>';

    if (!creature.enhancements) {
      monsterTip += '<tr><td colspan="4">[no enhancements]</td></tr>';
    } else {
      creature.enhancements.forEach(function(e) {
        monsterTip += '<tr><td colspan="2">' + e.name +
          ':</td><td colspan="2">' + e.value + '</td></tr>';
      });
    }

    monsterTip += '<tr><td colspan="4" height="5"></td></tr><tr>' +
      '<td class="header" colspan="4" class="fshCenter">Description</td>' +
      '</tr><tr><td colspan="4">' + creature.description + '</td></tr>' +
      '<tr><td colspan="4" height="5"></td></tr></table></td></tr>' +
      '<tr><td class="fshCenter"><b>' + creature.name + '</b></td></tr>' +
      '</table>';

    monster.dataset.tipped = monsterTip;
  }

  var bailOut$1 = [
    function(data, actions) {
      return actions.length === 1 &&
        actions[0].classList.contains('hcs-state-disabled'); // In motion
    },
    function(data, actions) {
      return actions.length - 1 < data.passback; // Not enough actions
    },
    function(data) {
      return !GameData.actions()[data.passback];
    },
    function(data) {
      return data.response.data.id !==
        GameData.actions()[data.passback].data.id.toString(); // Different action list
    }
  ];

  function doCreatureInfo(data) {
    var actions = getElementById('actionList').children;
    for (var i = 0; i < bailOut$1.length; i += 1) {
      if (bailOut$1[i](data, actions)) {return;}
    }
    // monster = 0;
    doMouseOver(data.response.data, actions[data.passback].firstElementChild
      .firstElementChild.firstElementChild);
  }

  function processMouseOver(data) {
    if (showCreatureInfo) {doCreatureInfo(data);}
  }

  function getCreaturePrefs() {
    showCreatureInfo = getValue('showCreatureInfo');
  }

  var showMonsterLog;
  var monsterLog;

  function toggleShowMonsterLog() {
    showMonsterLog = !showMonsterLog;
    setValue('showMonsterLog', showMonsterLog);
  }

  function updateMinMax(_logStat, creatureStat) {
    var logStat = fallback(_logStat, {});
    if (logStat.min) {
      logStat.min = Math.min(logStat.min, creatureStat);
    } else {
      logStat.min = creatureStat;
    }
    if (logStat.max) {
      logStat.max = Math.max(logStat.max, creatureStat);
    } else {
      logStat.max = creatureStat;
    }
    return logStat;
  }

  function creatureHazEnhancements(creature) {
    return creature.enhancements && creature.enhancements.length > 0;
  }

  function doMonsterLog(creature) {
    if (!monsterLog) {monsterLog = {};}
    monsterLog[creature.name] = fallback(monsterLog[creature.name], {});
    var logCreature = monsterLog[creature.name];
    logCreature.creature_class = fallback(logCreature.creature_class,
      creature.creature_class);
    logCreature.image_id = fallback(logCreature.image_id,
      creature.image_id);
    logCreature.level = fallback(logCreature.level,
      Number(creature.level));
    logCreature.type = fallback(logCreature.type, creature.type);
    logCreature.armor = updateMinMax(logCreature.armor,
      Number(creature.armor));
    logCreature.attack = updateMinMax(logCreature.attack,
      Number(creature.attack));
    logCreature.damage = updateMinMax(logCreature.damage,
      Number(creature.damage));
    logCreature.defense = updateMinMax(logCreature.defense,
      Number(creature.defense));
    logCreature.hp = updateMinMax(logCreature.hp,
      Number(creature.hp));
    if (creatureHazEnhancements(creature)) {
      logCreature.enhancements = fallback(logCreature.enhancements, {});
      var logEnh = logCreature.enhancements;
      creature.enhancements.forEach(function(e) {
        logEnh[e.name] = updateMinMax(logEnh[e.name], Number(e.value));
      });
    }
    setForage('fsh_monsterLog', monsterLog);
  }

  function processMonsterLog(creature) {
    if (showMonsterLog) {doMonsterLog(creature);}
  }

  function getMonsterPrefs() {
    showMonsterLog = getValue('showMonsterLog');
    getForage('fsh_monsterLog').done(function(data) {
      monsterLog = data || {};
    });
  }

  function badData$1(data) {
    return !data || !data.response || !data.response.data;
  }

  function processMonster(data) {
    if (badData$1(data)) {return;} // creature is null
    processMouseOver(data);
    processMonsterLog(data.response.data);
  }

  function loopActions(e, i) { // jQuery.min
    if (e.type !== 6) {return;}
    retryAjax({
      url: 'fetchdata.php?a=1&id=' + e.data.id + '&passback=' + i,
      dataType: 'json'
    }).done(processMonster);
  }

  function getCreatures() {
    if (showCreatureInfo) {getMyStats();}
    GameData.actions().forEach(loopActions);
  }

  function initMonsterLog() {
    // if (!showCreatureInfo && !showMonsterLog) {return;}
    if (showCreatureInfo || showMonsterLog) {
      getCreatures();
    }
  }

  function startMonsterLog() { // jQuery.min
    getCreaturePrefs();
    getMonsterPrefs();
    getBias();
    $.subscribe(def_afterUpdateActionlist, initMonsterLog);
    initMonsterLog();
  }

  var huntingBuffs$1;
  var huntingBuffsName;
  var buffLookup = {
    '1': function() {
      huntingBuffs$1 = calf.buffs;
      huntingBuffsName = calf.buffsName;
    },
    '2': function() {
      huntingBuffs$1 = calf.buffs2;
      huntingBuffsName = calf.buffs2Name;
    },
    '3': function() {
      huntingBuffs$1 = calf.buffs3;
      huntingBuffsName = calf.buffs3Name;
    }
  };

  function setCurrentBuffList() {
    var tmpFn = buffLookup[calf.enabledHuntingMode];
    if (isFunction(tmpFn)) {
      tmpFn();
    }
  }

  function toggleEnabledHuntingMode(e) {
    if (e.target.name !== 'enabledHuntingMode') {return;}
    calf.enabledHuntingMode = e.target.value;
    setValue('enabledHuntingMode', calf.enabledHuntingMode);
    setCurrentBuffList();
    GameData.fetch(16);
  }

  var hidePlayerActions;

  function toggleHidePlayerActions() {
    hidePlayerActions = !hidePlayerActions;
    setValue('hidePlayerActions', hidePlayerActions);
    GameData.fetch(256);
  }

  function doHidePlayerActions() {
    if (!hidePlayerActions) {return;}
    var act = getElementById('actionList');
    var players = act.getElementsByClassName('player');
    Array.prototype.forEach.call(players, function(el) {
      var verbs = el.getElementsByClassName('verbs');
      if (verbs.length === 1) {
        verbs[0].classList.add('fshHide');
      }
    });
  }

  function prepareHidePlayerActions() {
    hidePlayerActions = getValue('hidePlayerActions');
    $.subscribe(def_afterUpdateActionlist, doHidePlayerActions);
    doHidePlayerActions();
  }

  function toggleShowHuntingBuffs() {
    calf.showBuffs = !calf.showBuffs;
    setValue('showHuntingBuffs', calf.showBuffs);
    GameData.fetch(16);
  }

  function bitwiseAnd(a, b) {
    return a & b; // eslint-disable-line no-bitwise
  }

  function toggleSubLvlCreature() {
    calf.hideSubLvlCreature = !calf.hideSubLvlCreature;
    setValue('hideSubLvlCreature', calf.hideSubLvlCreature);
    GameData.fetch(256);
  }

  var testActions = [
    function(myData) {return !myData;},
    function(myData) {return !myData.actions;},
    function(myData) {return myData.actions.length === 0;}
  ];

  function xhrDataFilter(data) {
    var myData = jsonParse(data);
    if (testActions.some(function(el) {return el();})) {return data;}
    var realm = GameData.realm();
    myData.actions = myData.actions.filter(function(el) {
      if (el.type === 6) {
        return el.data.creature_type !== 0 || el.data.level >= realm.minlevel;
      }
      return true;
    });
    var ret = JSON.stringify(myData);
    return ret;
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
  }

  var missingBuffsDiv;

  var fshEvents = {
    hideSubLvlCreature: toggleSubLvlCreature,
    hidePlayerActions: toggleHidePlayerActions,
    showCreatureInfo: toggleShowCreatureInfo,
    showHuntingBuffs: toggleShowHuntingBuffs,
    showMonsterLog: toggleShowMonsterLog,
    showTitanInfo: toggleShowTitanInfo
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
    var prefsDiv = createDiv({
      id: 'fshWorldPrefs',
      innerHTML: simpleCheckboxHtml('showCreatureInfo') + '&nbsp;&nbsp;' +
        simpleCheckboxHtml('showMonsterLog') + '&nbsp;&nbsp;' +
        simpleCheckboxHtml('showTitanInfo') + '&nbsp;&nbsp;' +
        '<br>' +
        simpleCheckboxHtml('hideSubLvlCreature') + '&nbsp;&nbsp;' +
        simpleCheckboxHtml('hidePlayerActions') + '&nbsp;&nbsp;' +
        huntingBuffsHtml()
    });
    prefsDiv.addEventListener('click', prefsClickEvent);
    prefsDiv.addEventListener('change', toggleEnabledHuntingMode);
    insertElement(fshDiv, prefsDiv);
    missingBuffsDiv = createDiv();
    insertElement(fshDiv, missingBuffsDiv);
    var tempWorldButtons = getElementById('worldContainerBelow').children[0];
    insertElementBefore(fshDiv, tempWorldButtons);
  }

  function huntingBuffsEnabled(evt, data) {
    if (!calf.showBuffs) {
      missingBuffsDiv.innerHTML = '';
      return;
    }
    var buffHash = data.b.reduce(function(prev, curr) {
      prev[curr.name] = true;
      return prev;
    }, {});
    var missingBuffs = huntingBuffs$1.reduce(function(prev, curr) {
      if (!buffHash[curr.trim()]) {prev.push(curr);}
      return prev;
    }, []);
    if (missingBuffs.length > 0) {
      missingBuffsDiv.innerHTML = 'You are missing some ' +
        huntingBuffsName + ' hunting buffs<br>(' +
        missingBuffs.join(', ') + ')';
    } else {missingBuffsDiv.innerHTML = '';}
  }

  function dataEventsPlayerBuffs(evt, data) {
    if (huntingBuffs$1) {huntingBuffsEnabled(evt, data);}
  }

  function doHuntingBuffs() { // jQuery.min
    setCurrentBuffList();
    $.subscribe(def_playerBuffs, dataEventsPlayerBuffs);
    if (calf.showBuffs && window.initialGameData) { // HCS initial data
      dataEventsPlayerBuffs(null,
        {b: window.initialGameData.player.buffs});
    }
  }

  function getPrefs$1() {
    calf.buffs = shouldBeArray('huntingBuffs');
    calf.buffsName = getValue('huntingBuffsName');
    calf.buffs2 = shouldBeArray('huntingBuffs2');
    calf.buffs2Name = getValue('huntingBuffs2Name');
    calf.buffs3 = shouldBeArray('huntingBuffs3');
    calf.buffs3Name = getValue('huntingBuffs3Name');
    calf.doNotKillList = shouldBeArray('doNotKillList');
    calf.enabledHuntingMode = getValue('enabledHuntingMode');
    calf.hideSubLvlCreature = getValue('hideSubLvlCreature');
    calf.showBuffs = getValue('showHuntingBuffs');
    calf.showTitanInfo = getValue('showTitanInfo');
  }

  function worldPrefs() {
    getPrefs$1();
    buildFshDivs();
    interceptXHR();
    doHuntingBuffs();
    prepareHidePlayerActions();
  }

  function hideGroupByType(type) { // jQuery
    $('#actionList li.creature-' + type.toString() + ' a.create-group').hide();
  }

  function hideGroupSubscribe(type) { // jQuery.min
    $.subscribe(def_afterUpdateActionlist, hideGroupByType.bind(null, type));
  }

  var hideGroupTypes = [
    'hideChampionsGroup',
    'hideElitesGroup',
    'hideSEGroup',
    'hideTitanGroup',
    'hideLegendaryGroup'
  ];

  function hideGroupButton() {
    hideGroupTypes.forEach(function(el, i) {
      if (getValue(el)) {
        hideGroupSubscribe(i + 1);
        hideGroupByType(i + 1);
      }
    });
  }

  function colorType(actionList, creatureClass, colorClass) {
    var creatures = actionList.getElementsByClassName(creatureClass);
    Array.prototype.forEach.call(creatures, function(el) {
      el.classList.add(colorClass);
    });
  }

  function colorMonsters() {
    var act = getElementById('actionList');
    colorType(act, 'creature-1', 'fshGreen');
    colorType(act, 'creature-2', 'fshYellow');
    colorType(act, 'creature-3', 'fshRed');
  }

  function doMonsterColors() { // jQuery.min
    if (getValue('enableCreatureColoring')) {
      $.subscribe(def_afterUpdateActionlist, colorMonsters);
      colorMonsters();
    }
  }

  function doRepair$1(e, key) {
    if (key === 'ACT_REPAIR') {GameData.fetch(402);}
  }

  function subscribes() { // jQuery.min
    worldPrefs();
    // subscribe to view creature events on the new map.
    $.subscribe('ready.view-creature', readyViewCreature);
    hideGroupButton(); // Hide Create Group button
    doMonsterColors();
    doNotKill(); // add do-not-kill list functionality
    startMonsterLog(); // add monster log functionality
    $.subscribe('keydown.controls', doRepair$1);
    combatLogger();
    onWorld(); // on world
    // somewhere near here will be multi buy on shop
    prepareShop();
    injectRelic();
    $('#messageCenter').worldMessageCenter({offset: '0 60'});
    $('#mapTooltip').qtip('hide');
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
  // 10 = problaby view relic
  // 11 = take relic
  // 12 = create group
  // 13 = view shop
  // 14 = purchase item
  // 15 = repair
  // 17 = login
  // 18 = username not found

  function recastImpAndRefresh(responseText) { // Legacy
    var doc = createDocument(responseText);
    if (doc) {
      location.reload();
    }
  }

  function toggleKsTracker() { // Legacy
    var trackKS = getElementById('Helper:toggleKStracker');
    if (trackKS) {
      trackKS.addEventListener('click', function() {
        setValue('trackKillStreak',
          !getValue('trackKillStreak'));
        location.reload();
      }, true);
    }
  }

  function canRecast(hasDd, hasSsi, impsRem) {
    return (hasDd || hasSsi) && impsRem === 0;
  }

  function impRecast(hasDd, hasSsi, impsRem) { // Legacy - Old Map
    if (canRecast(hasDd, hasSsi, impsRem)) {
      var _recastImpAndRefresh = getElementById('Helper:recastImpAndRefresh');
      var impHref = 'index.php?no_mobile=1&cmd=quickbuff&subcmd=activate&target' +
        'Players=' +
        $('dt.stat-name:first').next().text().replace(/,/g, '') +
        '&skills%5B%5D=55';
      _recastImpAndRefresh.addEventListener('click', function() {
        retryAjax(impHref).done(recastImpAndRefresh);
      }, true);
    }
  }

  function injectOldMap() { // Legacy - Old Map
    // extra world screen text
    var replacementText = '<td background="' + imageServer +
      '/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
      'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
      ':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
      'td colspan="2" height="10"></td></tr><tr>';
    var hasShieldImp = findNode('//img[contains(@src,"/55_sm.gif")]');
    var hasDeathDealer = findNode('//img[contains(@src,"/50_sm.gif")]');
    var impsRemaining = getImpsRemaining(hasShieldImp);
    replacementText += findImps(hasDeathDealer, hasShieldImp, impsRemaining);
    replacementText += hasCA();
    replacementText += hasDblr();
    if (calf.huntingMode) {
      replacementText += '<tr><td style="font-size: small; color:red">' +
        'Hunting mode enabled</td></tr>';
    }
    replacementText += '<tr><td colspan="2" height="10"></td></tr>';
    replacementText += '</td>';

    var injectHere = findNode('//div[table[@class="centered" ' +
      'and @style="width: 270px;"]]');
    if (!injectHere) {return;}
    // insert after kill all monsters image and text
    var newSpan = createDiv({innerHTML: replacementText});
    insertElement(injectHere, newSpan);

    impRecast(hasDeathDealer, hasShieldImp, impsRemaining);
    toggleKsTracker();
  }

  function oldOrNew() {
    if (getElementById('worldPage') && window.GameData) { // new map
      subscribes();
    } else { // not new map.
      injectOldMap();
    }
  }

  function injectWorld() {
    if (jQueryPresent()) {oldOrNew();}
  }

  function doinvent(recipe) {
    return callApp({
      cmd: 'inventing',
      subcmd: 'doinvent',
      recipe_id: recipe
    });
  }

  var itemRE$1 = /<b>([^<]+)<\/b>/i;
  var plantFromComponentHash = {
    'Amber Essense': 'Amber Plant',
    'Blood Bloom Flower': 'Blood Bloom Plant',
    'Dark Shade ': 'Dark Shade Plant',
    'Snake Eye': 'Elya Snake Head',
    'Snake Venom Fang': 'Elya Snake Head',
    'Heffle Wart': 'Heffle Wart Plant',
    'Jademare Blossom': 'Jademare Plant',
    'Trinettle Leaf': 'Trinettle Plant',
    'Purplet Flower': 'Purplet Plant',
  };

  function quickInventDone(json) {
    var inventResult = getElementById('invent_Result');
    if (jsonFail(json, inventResult)) {return;}
    if (json.r.success) {
      outputResult('<span class="fshGreen">' +
        'You successfully invented the item!</span>', inventResult);
    } else {
      outputResult('<span class="fshRed">' +
        'You have failed to invent the item.</span>', inventResult);
    }
  }

  function quickInvent() { // Legacy
    var amountToInvent = $('#invent_amount').attr('value');
    var recipeID = $('input[name="recipe_id"]').attr('value');
    $('#invet_Result_label').html('Inventing ' + amountToInvent + ' Items');
    for (var i = 0; i < amountToInvent; i += 1) {
      doinvent(recipeID).done(quickInventDone);
    }
  }

  function injectInvent() { // Bad jQuery
    var selector = '<tr><td align="center">Select how many to quick ' +
      'invent<input value=1 id="invent_amount" name="invent_amount" ' +
      'size=3 class="custominput"></td></tr>' +
      '<tr><td align="center"><input id="quickInvent" value="Quick ' +
      'invent items" class="custombutton" type="submit"></td></tr>' + // button to invent
      '<tr><td colspan=6 align="center"><span id="invet_Result_label">' +
      '</span><ol id="invent_Result"></ol></td></tr>';
    $('input[name="recipe_id"]').closest('tbody').append(selector);
    getElementById('quickInvent').addEventListener('click',
      quickInvent, true);

  }

  function getItemName(responseText) { // Legacy
    var itemName = itemRE$1.exec(responseText);
    if (itemName) {return itemName[1];}
  }

  function injectViewRecipeLinks(responseText, callback) { // Legacy
    var itemName = getItemName(responseText);
    var plantFromComponent = fallback(plantFromComponentHash[itemName],
      itemName);
    if (itemName !== plantFromComponent) {
      var itemLinks = createTd({
        innerHTML: '<a href="' + server +
          '?cmd=auctionhouse&search=' +
          encodeURI(plantFromComponent) + '">AH</a>'
      });
      var counter = findNode('../../../../tr[2]/td', callback);
      counter.setAttribute('colspan', '2');
      insertElement(callback.parentNode.parentNode.parentNode, itemLinks);
    }
  }

  function linkFromMouseoverCustom(mouseOver) { // Legacy
    var reParams =
      /item_id=(\d+)&inv_id=([-0-9]*)&t=(\d+)&p=(\d+)&vcode=([a-z0-9]*)/i;
    var reResult = reParams.exec(mouseOver);
    if (reResult === null) {
      return null;
    }
    var itemId = reResult[1];
    var invId = reResult[2];
    var type = reResult[3];
    var pid = reResult[4];
    var vcode = reResult[5];
    var theUrl = 'fetchitem.php?item_id=' + itemId + '&inv_id=' + invId +
      '&t=' + type + '&p=' + pid + '&vcode=' + vcode;
    theUrl = server + theUrl;
    return theUrl;
  }

  function injectViewRecipe() { // Legacy
    var recipe = $('#pCC table table b').first();
    var name = recipe.html();
    var searchName = recipe.html().replace(/ /g, '%20');
    recipe.html('<a href="' + guideUrl +
      'items&subcmd=view&search_name=' + searchName + '">' + name +
      '</a>');

    var components = findNodes(
      '//b[.="Components Required"]/../../following-sibling::tr[2]//img');
    if (components) {
      components.forEach(function(compI) {
        var mo = compI.dataset.tipped;
        retryAjax(linkFromMouseoverCustom(mo)).done(function(html) {
          injectViewRecipeLinks(html, compI);
        });
        var componentCountElement = compI.parentNode.parentNode
          .parentNode.nextSibling.firstChild;
        componentCountElement.innerHTML = '<nobr>' +
          componentCountElement.innerHTML + '</nobr>';
      });
    }
  }

  function inventing() {
    if (jQueryPresent()) {
      injectViewRecipe();
      injectInvent();
    }
  }

  function dontPost$2() {
    var submitButton = document.querySelector('#pCC input[type="submit"]');
    if (submitButton) {
      submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.location = 'index.php?cmd=pvpladder&viewing_band_id=' +
          document.querySelector('#pCC select[name="viewing_band_id"]').value;
      });
    }
  }

  function formatLastReset(lastLadderReset) {
    var m = Math.floor((now - lastLadderReset) / 60000);
    var h = Math.floor(m / 60);
    m %= 60;
    return outputFormat(h, ' hours, ') + m + ' mins';
  }

  function formatTime() {
    var lastLadderReset = getValue('lastLadderReset');
    if (lastLadderReset < now - 48 * 60 * 60 * 1000) {
      return '<span class="fshLink tip-static" data-tipped="FSH has not seen ' +
        'the last ladder reset.<br>You can find it in your log if you ' +
        'qualified<br>or Tavern Rumours.">???</span>';
    }
    return formatLastReset(lastLadderReset);
  }

  function lastReset() {
    var topTable = document.querySelector('#pCC table');
    var newRow = createTr();
    var leftCell = newRow.insertCell(-1);
    leftCell.height = 25;
    leftCell.textContent = 'Last Reset:';
    var rightCell = newRow.insertCell(-1);
    rightCell.align = 'right';
    rightCell.innerHTML = formatTime();
    insertElement(topTable, newRow);
  }

  function ladder() {
    dontPost$2();
    lastReset();
  }

  var amt;
  var prc;
  var warn;

  function getAmount() {
    if (!amt) {amt = getElementById('amount');}
    return amt;
  }

  function getPrice() {
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
    var sellPrice = getPrice().value;
    if (sellPrice.search(/^[0-9]+$/) !== -1) {
      marketplaceWarning(sellPrice);
    } else {clearWarning();}
  }

  function marketplace() {
    pCC.addEventListener('keyup', addMarketplaceWarning);
  }

  var oldMoves = [];
  var nodes;
  var selectRow;

  function doPickMove(moveId, slotId) {
    return retryAjax({
      url: 'index.php',
      data: {
        no_mobile: 1,
        cmd: 'arena',
        subcmd: 'dopickmove',
        move_id: moveId,
        slot_id: slotId
      }
    });
  }

  function updateMoves() { // jQuery
    var newMoves = [];
    $('select', selectRow).each(function(i, e) {
      newMoves.push($(e).val());
    });
    var prm = [];
    newMoves.forEach(function(val, ind) {
      if (val === oldMoves[ind]) {return;}
      prm.push(doPickMove('x', ind));
      nodes.eq(ind).attr({
        src: imageServer + '/world/actionLoadingSpinner.gif',
        width: '25',
        height: '25'
      });
    });
    $.when.apply($, prm).done(function() {
      newMoves.forEach(function(val, ind) {
        if (val === 'x' || val === oldMoves[ind]) {return;}
        prm.push(doPickMove(val, ind));
      });
      $.when.apply($, prm).done(function() {
        window.location = 'index.php?cmd=arena&subcmd=setup';
      });
    });
  }

  function selectMoves(evt) { // jQuery
    $(evt.target).off();

    nodes =
      $('#pCC a[href^="index.php?cmd=arena&subcmd=pickmove&slot_id="] img');
    var table = nodes.eq(0).closest('table').parent().closest('table');

    var row = $('<tr/>');
    selectRow = row;
    row.append('<td/>');
    nodes.each(function(i, e) {
      var move = $(e).attr('src');
      if (move.indexOf('bar_icon_holder.jpg') > 0) {
        move = 'x';
      } else {
        move = move.match(/pvp\/(\d+).gif$/)[1];
      }
      var html = $(moveOptions);
      $('option[value=' + move + ']', html).prop('selected', true);
      row.append(html);
    });
    table.append(row);

    $('img[src$="pvp/bar_spacer.jpg"]', table)
      .attr({width: '15', height: '50'});

    row = $('<tr><td colspan=32 align=center ' +
      'style="padding-top: 2px;padding-bottom: 2px;">' +
      '<input class="custombutton" value="Update" type="button">' +
      '</td></tr>');
    $('input', row).click(updateMoves);
    table.append(row);
  }

  function setupMoves() { // jQuery
    if (jQueryNotPresent()) {return;}
    var node = $('#pCC b:contains("Setup Combat Moves")');
    if (node.length !== 1) {return;}
    node.addClass('fshLink fshGreen');
    node.click(selectMoves);
  }

  function showAllQuestSteps() {
    if (!getValue('showNextQuestSteps')) {return;}
    Array.prototype.forEach.call(document.querySelectorAll('div[id^="stage"]'),
      function(e) {e.style.display = 'block';});
    getElementById('next_stage_button').style.display = 'none';
  }

  function gotMoves(_arena) { // jQuery
    var arena = _arena || {};
    arena.moves = {};
    var arenaMoves = $('#pCC img[vspace="4"]').slice(1);
    arenaMoves.each(function(i, e) {
      var self = $(e);
      var src = self.attr('src');
      var moveId = /(\d+)\.gif/.exec(src)[1];
      arena.moves[moveId] = {};
      arena.moves[moveId].count = Number(/(\d)$/
        .exec(self.closest('td').html())[1]);
      arena.moves[moveId].href = src;
    });
    setForage('fsh_arena', arena);
  }

  function storeMoves() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    getForage('fsh_arena').done(gotMoves);
  }

  var upgrades;
  var currentFSP;
  var warehouse$1 = {};

  function findText(text) {
    return Array.prototype.find.call(upgrades, function(el) {
      return el.textContent.indexOf(text) !== -1;
    });
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
      var value = element.textContent.match(valRe)[1];
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
    cell.textContent = '(+' + extraStam + ' stamina)';
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
    getInputElement(upgrade).addEventListener('keyup',
      updateStamCount.bind(null, type, upgrade));
  }

  function injectPoints() {
    currentFSP = intValue(getElementById('statbar-fsp').textContent);
    injectUpgradeHelper('Current');
    injectUpgradeHelper('Maximum');
    getInputCell('Gold').innerHTML = '<a href="' + server +
      'index.php?cmd=marketplace">Sell at Marketplace</a>';
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
    upgrades = document.querySelectorAll('#pCC > table:last-of-type > tbody > ' +
      'tr:nth-child(even) > td:first-child');
    saveUpgradeValue('+1 Max Allies', 'alliestotal');
    saveUpgradeValue('+1 Max Enemies', 'enemiestotal');
    injectPoints();
  }

  function formatUtcDateTime(aDate) {
    if (Object.prototype.toString.call(aDate) === '[object Date]' &&
        !isNaN(aDate.getTime())) {
      var yyyy = aDate.getUTCFullYear().toString();
      var mon = padZ(aDate.getUTCMonth() + 1);
      var dd = padZ(aDate.getUTCDate());
      var hh = padZ(aDate.getUTCHours());
      var mm = padZ(aDate.getUTCMinutes());
      var ss = padZ(aDate.getUTCSeconds());
      return yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
    }
  }

  var enableSeTracker = 'enableSeTracker';
  var trackerCell;

  function addRow$1(trackerTable, se) {
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
    seAry.forEach(addRow$1.bind(null, tBody));
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

  function gotSeLog() {
    if (oldLog && oldLog.se) {
      var seAry = Object.keys(oldLog.se).map(function(key) {
        return [key, oldLog.se[key]];
      }).sort(function(a, b) {
        return a[1] - b[1];
      });
      displayTracker$1(seAry);
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
      doBackgroundCheck().always(gotSeLog);
    }
  }

  function togglePref$4(evt) {
    if (evt.target.id === enableSeTracker) {
      calf.enableSeTracker = !calf.enableSeTracker;
      setValue(enableSeTracker, calf.enableSeTracker);
      killTable();
    }
  }

  function waitForLog() {
    doBackgroundCheck().always(gotSeLog);
  }

  function superelite$1() {
    if (jQueryNotPresent()) {return;}
    var newCell = insertNewRow();
    newCell.height = 20;
    newCell = insertNewRow();
    newCell.className = 'fshCenter';
    newCell.innerHTML = simpleCheckboxHtml(enableSeTracker);
    newCell.addEventListener('change', togglePref$4);
    if (calf.enableSeTracker) {
      getFshSeLog().done(waitForLog);
    }
  }

  var normalLink;
  var seasonLink;
  var activeLink;
  var completeLink;
  var notStartedLink;
  var currentPageValue;

  function dontPost$3(e) {
    if (e.target.type !== 'submit') {return;}
    e.preventDefault();
    var form = e.target.form;
    var mode = form[1].value;
    var type = form[2].value;
    var letter = form[3].value;
    var sortby = form[4].value;
    var sortbydir = form[5].value;
    var page = form[6].value;
    window.location = 'index.php?cmd=questbook&type=' + type + '&mode=' + mode +
      '&page=' + page + '&letter=' + letter + '&sortby=' + sortby +
      '&sortbydir=' + sortbydir;
  }

  var currentLocationValue = [
    {value: 0},
    {value: 3},
    {value: 0},
    {value: 1},
    {value: 2}
  ];

  var savePrefKey = [
    'lastNormalActiveQuestPage',
    'lastNormalCompletedQuestPage',
    'lastNormalNotStartedQuestPage',
    'lastSeasonalActiveQuestPage',
    'lastSeasonalCompletedQuestPage',
    'lastSeasonalNotStartedQuestPage'
  ];

  function whereAmI() {
    var aLinks = pCC.getElementsByTagName('a');
    normalLink = aLinks[0];
    seasonLink = aLinks[1];
    activeLink = aLinks[2];
    completeLink = aLinks[3];
    notStartedLink = aLinks[4];
    currentPageValue = currentLocationValue.reduce(function(prev, curr, i) {
      var ret = prev;
      if (aLinks[i].firstElementChild.getAttribute('color') === '#FF0000') {
        ret += curr.value;
      }
      return ret;
    }, 0);
  }

  function storeLoc() {
    var lastQBPage = location.search;
    setValue('lastActiveQuestPage', lastQBPage);
    setValue(savePrefKey[currentPageValue], lastQBPage);
  }

  function setLink(aLink, url) {
    if (url.length > 0) {
      aLink.setAttribute('href', url);
    }
  }

  function updateLinks() {
    var lastNormalActiveQuestPage = getValue(savePrefKey[0]);
    var lastNormalCompletedQuestPage = getValue(savePrefKey[1]);
    var lastNormalNotStartedQuestPage = getValue(savePrefKey[2]);
    var lastSeasonalActiveQuestPage = getValue(savePrefKey[3]);
    var lastSeasonalCompletedQuestPage = getValue(savePrefKey[4]);
    var lastSeasonalNotStartedQuestPage = getValue(savePrefKey[5]);

    var oppositeTypeUrl = [
      lastSeasonalActiveQuestPage,
      lastSeasonalCompletedQuestPage,
      lastSeasonalNotStartedQuestPage,
      lastNormalActiveQuestPage,
      lastNormalCompletedQuestPage,
      lastNormalNotStartedQuestPage
    ];

    if (currentPageValue < 3) {
      setLink(seasonLink, oppositeTypeUrl[currentPageValue]);
      setLink(activeLink, lastNormalActiveQuestPage);
      setLink(completeLink, lastNormalCompletedQuestPage);
      setLink(notStartedLink, lastNormalNotStartedQuestPage);
    } else {
      setLink(normalLink, oppositeTypeUrl[currentPageValue]);
      setLink(activeLink, lastSeasonalActiveQuestPage);
      setLink(completeLink, lastSeasonalCompletedQuestPage);
      setLink(notStartedLink, lastSeasonalNotStartedQuestPage);
    }
  }

  function storeQuestPage() {
    if (getValue('storeLastQuestPage')) {
      whereAmI();
      storeLoc();
      updateLinks();
    }
  }

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
      return getValue('hideQuestNames').split(',');
    }
    return [];
  }

  function doHideQuests(hideQuests, questName, aRow) {
    if (hideQuests.indexOf(questName) >= 0) {
      aRow.classList.add('fshHide');
      aRow.nextElementSibling.classList.add('fshHide');
      aRow.nextElementSibling.nextElementSibling.classList.add('fshHide');
      aRow.nextElementSibling.nextElementSibling.nextElementSibling
        .classList.add('fshHide');
    }
  }

  function injectQuestBookFull() {
    pCC.addEventListener('click', dontPost$3);
    storeQuestPage();
    var questTable = pCC.getElementsByTagName('table')[5];
    if (!questTable) {return;}
    var hideQuests = isHideQuests();
    for (var i = 2; i < questTable.rows.length; i += 4) {
      var aRow = questTable.rows[i];
      var questName = aRow.cells[0].textContent.replace(/ {2}/g, ' ').trim();
      doHideQuests(hideQuests, questName, aRow);
      var questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
      aRow.cells[4].innerHTML = guideButtons(questID, questName);
    }
  }

  function injectQuestTracker() {
    var lastActiveQuestPage = getValue('lastActiveQuestPage');
    if (lastActiveQuestPage.length > 0) {
      pCC.getElementsByTagName('a')[0]
        .setAttribute('href', lastActiveQuestPage);
    }
    var questID = getUrlParameter('quest_id');
    var injectHere = pCC.getElementsByTagName('td')[0];
    var questName = injectHere.getElementsByTagName('font')[1].textContent
      .replace(/"/g, '');
    insertHtmlBeforeEnd(injectHere, guideButtons(questID, questName));
  }

  function rejected(timeStamp, buffsNotCast, buffLog) {
    if (buffsNotCast) {
      return timeStamp + ' <span style="color: red;">' +
        buffsNotCast[0] + '</span><br>' + buffLog;
    }
    return buffLog;
  }

  function getStamUsed(buffCast) {
    for (var j = 0; j < buffList.length; j += 1) {
      if (buffList[j].name === buffCast[1]) {
        return buffList[j].stam.toString();
      }
    }
    return '-';
  }

  function successfull(timeStamp, buffCast, buffLog) {
    if (buffCast) {
      return timeStamp + ' ' + buffCast[0] + ' (' + getStamUsed(buffCast) +
        ' stamina) <br>' + buffLog;
    }
    return buffLog;
  }

  function buffResult(_buffLog) {
    var buffLog = _buffLog;
    if (!buffLog) {buffLog = '';}
    var timeStamp = formatLocalDateTime(new Date());
    var buffsAttempted = getElementById('quickbuff-report')
      .innerHTML.split('<p>');
    var buffsNotCastRE = new RegExp('The skill ([\\w ]*) of current or' +
      ' higher level is currently active on \'(\\w*)\'');
    var buffsCastRE = new RegExp('Skill ([\\w ]*) level (\\d*) was ' +
      'activated on \'(\\w*)\'');
    for (var i = 0; i < buffsAttempted.length; i += 1) {
      var buffCast = buffsCastRE.exec(buffsAttempted[i]);
      var buffNotCast = buffsNotCastRE.exec(buffsAttempted[i]);
      buffLog = successfull(timeStamp, buffCast, buffLog);
      buffLog = rejected(timeStamp, buffNotCast, buffLog);
    }
    setForage('fsh_buffLog', buffLog);
  }

  function updateBuffLog() {
    if (!getValue('keepBuffLog')) {return;}
    getForage('fsh_buffLog').done(buffResult);
  }

  var unknown = [
    {
      condition: function() {
        return getElementById('quickbuff-report');
      },
      result: function() {
        screenview('unknown.buffLog.updateBuffLog');
        updateBuffLog();
      }
    },
    {
      condition: function() {
        return findNode('//td[.="Quest Name"]');
      },
      result: function() {
        screenview('unknown.questBook.injectQuestBookFull');
        injectQuestBookFull();
      }
    },
    {
      condition: function() {
        return findNode('//font[@size=2 and .="Advisor"]') &&
          findNode('//a[@href="index.php?cmd=guild&amp;subcmd=manage" ' +
            'and .="Back to Guild Management"]');
      },
      result: function() {
        screenview('unknown.guildAdvisor.injectAdvisor');
        injectAdvisor();
      }
    },
    // {
    //   condition: function() {
    //     return findNode('//a[.="Back to Scavenging"]');
    //   },
    //   result: function() {
    //     screenview('unknown.scavenging.injectScavenging');
    //     FSH.scavenging.injectScavenging(); // Is this used???
    //   }
    // },
    {
      condition: function() {
        return $('#pCC img[title="Inventing"]').length > 0;
      },
      result: function() {
        screenview('unknown.recipes.inventing');
        inventing();
      }
    }
  ];

  function unknownPage() { // Legacy
    if (jQueryNotPresent()) {return;}
    unknown.some(function(el) {
      if (el.condition()) {
        el.result();
        return true;
      }
      return false;
    });
  }

  var ladderResetPref = 'lastLadderReset';
  var lastLadderReset;

  function checkForPvPLadder(row) {
    if (row.children[1].children[0].textContent === 'PvP Ladder') {
      var logTime = parseDateAsTimestamp(
        row.children[1].children[2].textContent.replace('Posted: ', ''));
      if (logTime > lastLadderReset) {
        setValue(ladderResetPref, logTime);
        lastLadderReset = logTime;
      }
    }
  }

  function testArticle$1(rowType) {return rowType > 1;}

  function setupPref$2(prefName, rowInjector) {
    insertHtmlAfterEnd(rowInjector, simpleCheckbox(prefName));
  }

  function viewArchive() {
    lastLadderReset = getValue(ladderResetPref);
    var prefName = 'collapseNewsArchive';
    var theTables = pCC.getElementsByTagName('table');
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

  function hasTextEntry() { // jQuery
    $('#pCC form').first().attr('id', 'dochat');
    $('#pCC input').slice(0, 7).each(function(i, e) {
      $(e).attr('form', 'dochat');
    });
    var theTable = $('#pCC table table').first();
    theTable.append('<tr id="fshMass"></tr>');
    $('td', theTable).eq(0).remove();
    var btnMass = $('input[value="Send As Mass"]', theTable);
    if (btnMass.length === 1) {
      btnMass.appendTo('#fshMass', theTable);
    }
    var ourTd = $('td', theTable).eq(0);
    ourTd.attr('rowspan', '2');
    $('input', ourTd).replaceWith('<textarea id="fshTxt" name="msg" cols' +
      '="72" rows="2" form="dochat" style="resize: none"></textarea>');
    var fshTxt = $('#fshTxt', ourTd);
    fshTxt.keydown(function(e) {
      if (e.keyCode === 13 && fshTxt.val() !== '') {
        $('input[value=Send]', theTable).click();
        return false;
      }
    });
  }

  var tests = [
    function() {return !getValue('enhanceChatTextEntry');},
    function() {return !pCC;},
    function() {return jQueryNotPresent();}
  ];

  function addChatTextArea() {
    if (tests.some(function(el) {return el();})) {return;}
    hasTextEntry();
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
      extraPart = ' | <a title="Add to Ignore List" href="index.php?cmd' +
        '=log&subcmd=doaddignore&ignore_username=' + playerName +
        '">Ignore</a>';
    }
    aRow.cells[1].innerHTML = dateFirstPart + '</a>' + extraPart +
      dateLastPart;
  }

  function doBuffLink(_buffsSent, targetPlayerID) { // Legacy
    var quickBuff = '';
    var buffsSent = _buffsSent[0].replace('`~', '').replace('~`', '')
      .split(/\s*,\s*/);
    buffsSent.reduce(function(prev, el) {
      var ret = prev;
      var nick = el.toLowerCase();
      if (calf.nickList[nick]) {
        ret += calf.nickList[nick].toString() + ';';
      }
      return ret;
    }, '');
    return ' | <a ' + quickBuffHref(targetPlayerID, quickBuff) +
        '>Buff</a></span>';
  }

  function getAttackPart(playerName) { // Legacy
    if (calf.addAttackLinkToLog) {
      return ' | <a href="index.php?cmd=attackplayer&target_username=' +
        playerName + '">Attack</a>';
    }
    return '';
  }

  function getThirdPart(messageHTML) { // Legacy
    var thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10,
      messageHTML.indexOf('>Buff</a>') + 9);
    var targetPlayerRE = /quickBuff\((\d+)\)/.exec(thirdPart);
    if (targetPlayerRE) {
      var targetPlayerID = targetPlayerRE[1];
      var buffsSent = messageHTML.match(/`~.*?~`/);
      if (buffsSent) {
        return doBuffLink(buffsSent, targetPlayerID);
      }
      return ' | <a ' + quickBuffHref(targetPlayerID) + '>Buff</a></span>';
    }
    return '';
  }

  function isChat(aRow, isGuildMate, playerName) { // Legacy
    reportIgnore(aRow, isGuildMate, playerName);
    var messageHTML = aRow.cells[2].innerHTML;
    var firstPart = messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
    var thirdPart = getThirdPart(messageHTML);
    var fourthPart = messageHTML.substring(messageHTML
      .indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
    var lastPart = messageHTML.substring(messageHTML.indexOf('</small>'),
      messageHTML.length);
    var extraPart = ' | <a href="index.php?cmd=trade&target_player=' +
      playerName + '">Trade</a> | <a title="Secure Trade" ' +
      'href="index.php?cmd=trade&subcmd=createsecure&target_username=' +
      playerName + '">ST</a>';
    var attackPart = getAttackPart(playerName);
    var replyTo = '';
    if (calf.enableChatParsing) {
      replyTo = removeHTML(firstPart.replace(/&nbsp;/g, ' ')).substr(0, 140);
    }
    var msgReplyTo = '[ <span style="cursor:pointer;text-' +
      'decoration:underline"class="a-reply" target_player="' + playerName +
      '" replyTo="' + replyTo + '...">Reply</span>';
    aRow.cells[2].innerHTML = firstPart + '<nobr>' + msgReplyTo +
      extraPart + thirdPart + attackPart + fourthPart +
      '</nobr>' + lastPart;
  }

  function doChat(messageType, aRow, isGuildMate, playerName) { // Legacy
    if (messageType === 'Chat') {isChat(aRow, isGuildMate, playerName);}
  }

  function isLadderReset(aRow) {
    return aRow.cells[2].firstElementChild &&
      aRow.cells[2].firstElementChild.tagName === 'IMG' &&
      aRow.cells[2].firstElementChild.src.indexOf('pvp_icon.gif') !== -1;
  }

  function saveLastResetTime(aRow) {
    var logTime = parseDateAsTimestamp(aRow.cells[1].textContent);
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

  /* eslint-disable max-len */
  var specials = {
    '0': 'Dull Edge was activated.',
    '1': '@0 was afflicted by Super Elite Slayer.',
    '2': '@0 was withered.',
    '3': '@0\'s armor was shattered.',
    '4': '@0 was infused with extra defense (Constitution).',
    '5': '@0 was infused with extra armor (Sanctuary).',
    '7': '@0 activated Spectral Knight reducing targets armor to zero.',
    '8': '@0 activated Savagery.',
    '9': '@0 activated Shield Strike.',
    '13': '@0 activated Conserve.',
    '18': '@0 leeched the buff \'@1\'.',
    '17': '@0 activated Four Leaf.',
    '19': '@0\'s demoralize skill reduced the effectiveness of @1\'s enhancements.',
    '20': '@0\'s reckoning has improved their skill \'@1\'',
    '21': '@0 was mesmerized by Spell Breaker, losing the \'@1\' buff.',
    '22': '@0 was turned Undead by Necrosis.',
    '23': '@0 activated High Guard.',
    '24': '@0 was smote.',
    '25': '@0 activated Barricade.',
    '26': '@0 activated Ageless.',
    '27': '@0 activated Severe Condition.',
    '28': '@0 activated Golden Shield.',
    '29': '@0 activated Anti Deflect.',
    '30': '@0 activated Sealed. (Negated @1)',
    '31': '@0 activated Fist Fight.',
    '33': '@0 activated Dispel Curse.',
    '35': '@0 activated Heavy Weight.',
    '37': '@0 had their armor and defence Inverted.',
    '38': '@0 had their attack reduced by Fumble.'
  };

  function viewCombat(id) {
    return callApp({
      cmd: 'combat',
      subcmd: 'view',
      combat_id: id
    });
  }

  var combatCache = {};

  function result$1(stat, desc, color) {
    if (stat !== 0) {
      return desc + ':<span class="' + color + '">' +
        addCommas(stat) + ' </span>';
    }
    return '';
  }

  function iDefended(json) {
    return json.r.is_defender && json.r.winner === 1;
  }

  function iAttacked(json) {
    return !json.r.is_defender && json.r.winner === 0;
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
    combatSummary.innerHTML = result$1(json.r.xp_gain, 'XP stolen', color) +
      result$1(json.r.gold_gain, 'Gold lost', color) +
      result$1(json.r.gold_stolen, 'Gold stolen', color) +
      result$1(json.r.pvp_prestige_gain, 'Prestige gain', color) +
      result$1(json.r.pvp_rating_change, 'PvP change', color) +
      json.r.specials.reduce(highlightSpecials, '');
  }

  function inSpecialsList(el) {
    return el.id in specials;
  }

  function whatsMissing(json, html) {
    var specialHtml = createDocument(html).querySelectorAll('#specialsDiv');
    json.r.specials.forEach(function(el, i) {
      if (!inSpecialsList(el)) {
        sendEvent('Logs', 'Missing PvP Special',
          JSON.stringify(el) + ' ' + specialHtml[i].textContent);
      }
    });
  }

  function unknownSpecials(json) {
    if (!json.r.specials.every(inSpecialsList)) {
      retryAjax('index.php?cmd=combat&subcmd=view&combat_id=' + json.r.id)
        .done(whatsMissing.bind(null, json));
    }
  }

  function cacheCombat(aRow, json) {
    if (!json.s) {return;}
    var cellContents = aRow.cells[1].textContent;
    json.logTime = parseDateAsTimestamp(cellContents) / 1000;
    combatCache[json.r.id] = json;
    setForage('fsh_pvpCombat', combatCache);
    unknownSpecials(json);
  }

  function processCombat(aRow) {
    var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
    var combatSummary = createDiv({style: {color: 'gray'}});
    insertElement(aRow.cells[2], combatSummary);
    if (combatCache[combatID] && combatCache[combatID].logTime) {
      parseCombat(combatSummary, combatCache[combatID]);
    } else {
      viewCombat(combatID).done(cacheCombat.bind(null, aRow))
        .done(parseCombat.bind(null, combatSummary));
    }
  }

  function replaceLeadingText(msgCell, newHtml) {
    var replaceText = createSpan({innerHTML: newHtml});
    msgCell.replaceChild(replaceText, msgCell.firstChild);
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
      return !/\(Guild Conflict\)/.test(aRow.cells[2].textContent);
    }
  ];

  function isCombatRow(aRow, messageType) {
    return combatRowTests.every(function(e) {return e(aRow, messageType);});
  }

  function addPvpSummary(aRow, messageType) {
    // add PvP combat log summary
    if (isCombatRow(aRow, messageType)) {processCombatRow(aRow);}
  }

  function currentCombatRecord(data, combatId, sevenDays) {
    return combatId === 'lastCheck' || data[combatId].logTime &&
      data[combatId].logTime > sevenDays;
  }

  function cleanCache(data) {
    var sevenDays = nowSecs - 7 * 24 * 60 * 60;
    combatCache = Object.keys(data).reduce(function(prev, combatId) {
      if (currentCombatRecord(data, combatId, sevenDays)) {
        prev[combatId] = data[combatId];
      }
      return prev;
    }, {});
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
    return getForage('fsh_pvpCombat').done(checkCache);
  }

  var myPlayer = {};
  var memberNameString;
  var listOfAllies;
  var listOfEnemies;

  function buildNickList() {// Native
    calf.nickList = buffList.reduce(function(prev, curr) {
      var ret = prev;
      var nicks = curr.nicks.split(',');
      nicks.forEach(function(el) {
        var nick = el.toLowerCase();
        ret[nick] = curr.id;
      });
      return ret;
    }, {});
  }

  function isEnemy(playerName, playerElement) { // Legacy
    if (listOfEnemies.indexOf(playerName) !== -1) {
      playerElement.style.color = 'red';
    }
  }

  function isAlly(playerName, playerElement) { // Legacy
    if (listOfAllies.indexOf(playerName) !== -1) {
      playerElement.style.color = 'blue';
    }
  }

  function playerColor(colorPlayerName, playerName, playerElement) { // Legacy
    if (!colorPlayerName) {return false;}
    if (memberNameString.indexOf(playerName) !== -1) {
      playerElement.style.color = 'green';
      return true;
    }
    isEnemy(playerName, playerElement);
    isAlly(playerName, playerElement);
    return false;
  }

  function addExtraStuff(aRow, playerName, isGuildMate) { // Legacy
    if (!isGuildMate) {
      var dateExtraText = '<nobr><span style="font-size:x-small;">' +
        '[ <a title="Add to Ignore List" href="index.php?cmd=log' +
        '&subcmd=doaddignore&ignore_username=' + playerName +
        '">Ignore</a> ]</span></nobr>';
      aRow.cells[1].innerHTML = aRow.cells[1].innerHTML + '<br>' +
        dateExtraText;
    }
    var buffingPlayerIDRE = /player_id=(\d+)/;
    var buffingPlayerID = buffingPlayerIDRE
      .exec(aRow.cells[2].innerHTML)[1];
    var buffingPlayerName = aRow.cells[2].firstChild.nextSibling
      .innerHTML;
    var extraText = ' <span style="font-size:x-small;"><nobr>' +
      '[ <span style="cursor:pointer;text-decoration:underline" ' +
      'class="a-reply" target_player="' + buffingPlayerName +
      '">Reply</span> | <a href="index.php?cmd=trade&target_player=' +
      buffingPlayerName + '">Trade</a> | <a title="Secure Trade" ' +
      'href="index.php?cmd=trade&subcmd=createsecure&target_username=' +
      buffingPlayerName + '">ST</a>';
    extraText += ' | <a ' + quickBuffHref(buffingPlayerID) +
      '>Buff</a>';
    if (calf.addAttackLinkToLog) {
      extraText += ' | <a href="index.php?cmd=attackplayer' +
        '&target_username=' + buffingPlayerName + '">Attack</a>';
    }
    extraText += ' ]</nobr></span>';

    aRow.cells[2].innerHTML += extraText;
  }

  function hasPlayerLink(aRow) {
    return aRow.cells[2].firstChild.nextSibling &&
      aRow.cells[2].firstChild.nextSibling.nodeName === 'A' &&
      /player_id/.test(aRow.cells[2].firstChild.nextSibling.href);
  }

  function otherMsgType(aRow, messageType) {
    return fallback(messageType === 'General', messageType === 'Notification') &&
      hasPlayerLink(aRow);
  }

  function doExtraStuff(aRow, messageType, playerName, isGuildMate) {
    if (messageType === 'Notification' &&
        hasPlayerLink(aRow)) {
      addExtraStuff(aRow, playerName, isGuildMate);
    }
  }

  function doLogWidgetRow(aRow, messageType) { // Legacy
    var playerElement;
    var playerName;
    var colorPlayerName = false;
    if (messageType === 'Chat') {
      playerElement = aRow.cells[2].firstChild;
      playerName = playerElement.innerHTML;
      colorPlayerName = true;
    }
    if (otherMsgType(aRow, messageType)) {
      playerElement = aRow.cells[2].firstChild.nextSibling;
      playerName = playerElement.innerHTML;
      colorPlayerName = true;
    }
    var isGuildMate = playerColor(colorPlayerName, playerName, playerElement);
    doChat(messageType, aRow, isGuildMate, playerName);
    doExtraStuff(aRow, messageType, playerName, isGuildMate);
    addPvpSummary(aRow, messageType);
    processLadder(aRow, messageType);
  }

  function processLogWidgetRow(aRow) { // Legacy
    // Valid Types: General, Chat, Guild
    var messageType = aRow.cells[0].firstChild.getAttribute('oldtitle');
    if (messageType) {doLogWidgetRow(aRow, messageType);}
  }

  function foundLogTable(logTable) { // Legacy
    memberNameString = Object.keys(calf.membrList);
    listOfAllies = myPlayer._allies.map(function(obj) {
      return obj.username;
    });
    listOfEnemies = myPlayer._enemies.map(function(obj) {
      return obj.username;
    });
    calf.showPvPSummaryInLog = getValue('showPvPSummaryInLog');
    calf.lastLadderReset = getValue('lastLadderReset');
    calf.enableChatParsing = getValue('enableChatParsing');
    var messageHeader = logTable.rows[0].cells[2];
    if (messageHeader) {
      insertHtmlBeforeEnd(messageHeader, '&nbsp;&nbsp;' +
        '<span class="fshWhite">(Guild mates show up in ' +
        '<span class="fshGreen">green</span>)</span>');
    }
    for (var i = 1; i < logTable.rows.length; i += 2) {
      processLogWidgetRow(logTable.rows[i]);
    }
    $('.a-reply').click(function(evt) {
      window.openQuickMsgDialog(evt.target.getAttribute('target_player'),
        '', evt.target.getAttribute('replyTo'));
    });
  }

  function addLogWidgetsOld() { // Legacy
    buildNickList();
    calf.addAttackLinkToLog = getValue('addAttackLinkToLog');
    var logTable = findNode('//table[tbody/tr/td/span[contains' +
      '(.,"Currently showing:")]]');
    if (logTable) {foundLogTable(logTable);}
  }

  function addLogWidgets() { // jQuery.min
    if (jQueryNotPresent()) {return;}
    $.when(
      getMembrList(false),
      myStats(false).done(function(data) {
        myPlayer = data;
      }),
      initCache()
    ).done(addLogWidgetsOld);
  }

  function guildChat() {
    addChatTextArea();
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

  function cancelAllAH() { // jQuery
    var cancelButtons = getElementById('resultRows')
      .getElementsByClassName('auctionCancel');
    if (cancelButtons.length === 0) {return;}
    var prm = [];
    for (var i = cancelButtons.length - 1; i >= 0; i -= 1) {
      var cancelButton = cancelButtons[i];
      var itemImage = cancelButton.parentNode.parentNode.firstElementChild
        .firstElementChild;
      cancelButton.outerHTML = '<img src="' + imageServer +
        '/skin/loading.gif" width="14" height="14">';
      prm.push(
        retryAjax({
          url: 'index.php?no_mobile=1&cmd=auctionhouse&subcmd=cancel',
          data: {auction_id: /inv_id=(\d+)/.exec(itemImage.dataset.tipped)[1]}
        })
      );
    }
    $.when.apply($, prm).done(function() {
      getElementById('refresh').click();
    });
  }

  function makeCancelAll() {
    var cancelAll = createSpan({
      className: 'smallLink',
      textContent: 'Cancel All'
    });
    var fill = getElementById('fill').parentNode.parentNode
      .nextElementSibling.firstElementChild;
    fill.classList.add('fshCenter');
    insertHtmlAfterBegin(fill, ']');
    insertElementAfterBegin(fill, cancelAll);
    insertHtmlAfterBegin(fill, '[');
    cancelAll.addEventListener('click', cancelAllAH);
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
    getElementById('sort0').click();
  }

  function quickCreate$1() {
    perfFilter('auction');
  }

  var playerBank = {
    headText: 'Bank',
    appLink: true,
    depoPos: 2,
    balPos: 1,
    data: {
      no_mobile: 1,
      cmd: 'bank',
      subcmd: 'transaction'
    },
    initWithdraw: ''
  };
  var guildBank = {
    headText: 'Guild Bank',
    appLink: false,
    depoPos: 3,
    balPos: 2,
    data: {
      no_mobile: 1,
      cmd: 'guild',
      subcmd: 'bank',
      subcmd2: 'transaction'
    },
    initWithdraw: '1'
  };
  var bankSettings;

  function doInfoBox(infoBox) { // jQuery
    var target = $('#pCC #info-msg');
    if (target.length === 0) {
      $('#pCC').prepend(infoBox.closest('table'));
    } else {
      target.closest('table').replaceWith(infoBox.closest('table'));
    }
  }

  function disableDepo(o) { // jQuery
    if ($('#pCC b').eq(o.depoPos).text() === '0') {
      $('#pCC input[value="Deposit"]').prop('disabled', true);
    }
  }

  function updateDepoAmount(o, doc) { // jQuery
    if (o.data.deposit_amount !== '1') {
      $('#pCC #deposit_amount').val($('#pCC #deposit_amount', doc).val());
    } else {
      $('#pCC #deposit_amount').val('1');
    }
  }

  function transResponse(response) { // jQuery
    var doc = createDocument(response);
    var infoBox = $('#pCC #info-msg', doc);
    if (infoBox.length === 0) {return;}
    doInfoBox(infoBox);
    $('#pH #statbar-gold').text($('#pH #statbar-gold', doc).text());
    $('#pH #statbar-gold-tooltip-general dd').text(function(index) {
      return $('#pH #statbar-gold-tooltip-general dd', doc).eq(index).text();
    });
    var o = bankSettings;
    $('#pCC b').slice(o.balPos).text(function(index) {
      return $('#pCC b', doc).slice(o.balPos).eq(index).text();
    });
    disableDepo(o);
    updateDepoAmount(o, doc);
    $('#pCC #withdraw_amount').val(o.initWithdraw);
  }

  function invalidAmount(o, amount) { // jQuery
    return $('#pCC b').eq(o.depoPos).text() === '0' ||
      !$.isNumeric(amount) || amount < 1;
  }

  function doAjax$1(oData) {
    retryAjax({url: 'index.php', data: oData}).done(transResponse);
  }

  function bankDeposit(e) { // jQuery
    e.preventDefault();
    var o = bankSettings;
    var amount = $('#pCC #deposit_amount').val();
    if (invalidAmount(o, amount)) {return;}
    o.data.mode = 'deposit';
    o.data.deposit_amount = amount;
    doAjax$1(o.data);
  }

  function bankWithdrawal(e) { // jQuery
    e.preventDefault();
    var o = bankSettings;
    var amount = $('#pCC #withdraw_amount').val();
    if (!$.isNumeric(amount) || amount < 1) {return;}
    o.data.mode = 'withdraw';
    o.data.withdraw_amount = amount;
    doAjax$1(o.data);
  }

  function linkToGuildBank(o, bank) { // jQuery
    if (o.appLink) {
      bank.eq(0).closest('tr').after('<tr><td colspan="3" align="center">' +
        '<a href="/index.php?cmd=guild&subcmd=bank">Go to Guild Bank</a>' +
        '</td></tr>');
    }
  }

  function captureButtons(o, depo, withdraw) { // jQuery
    if ($('#pCC b').eq(o.depoPos).text() === '0') { // Check Deposits Available
      depo.prop('disabled', true);
    } else {
      depo.click(bankDeposit);
    }
    withdraw.click(bankWithdrawal);
  }

  function appLink(o, bank) { // jQuery
    linkToGuildBank(o, bank);
    var depo = $('#pCC input[value="Deposit"]');
    if (depo.length !== 1) {return;}
    var withdraw = $('#pCC input[value="Withdraw"]');
    if (withdraw.length !== 1) {return;}
    captureButtons(o, depo, withdraw);
  }

  function hasJquery$1() { // jQuery
    var o = bankSettings;
    var bank = $('#pCC b');
    if (bank.length !== 0 && bank.eq(0).text() === o.headText) {
      appLink(o, bank);
    }
  }

  function ajaxifyBank() {
    if (jQueryPresent()) {hasJquery$1();}
  }

  function injectGuildBank() {
    bankSettings = guildBank;
    ajaxifyBank();
  }

  function injectBank() {
    bankSettings = playerBank;
    ajaxifyBank();
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
    textArea$2.addEventListener('keyup', updateShoutboxPreview);
  }

  function newsFsbox() {
    maxcharacters = 100;
    injectShoutboxWidgets();
  }

  function newsShoutbox() {
    maxcharacters = 150;
    injectShoutboxWidgets();
  }

  var pageSwitcher = {
    settings: {'-': {'-': {'-': {'-': injectSettings}}}},
    world: {'-': {'-': {'-': {'-': injectWorld}}}},
    news: {
      fsbox: {'-': {'-': {'-': newsFsbox}}},
      shoutbox: {'-': {'-': {'-': newsShoutbox}}}
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
      quickcreate: {'-': {'-': {'-': quickCreate$1}}}
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
    superelite: {'-': {'-': {'-': {'-': superelite$1}}}},
    '-': {
      viewupdatearchive: {'-': {'-': {'-': viewArchive}}},
      viewarchive: {'-': {'-': {'-': viewArchive}}},
      '-': {'-': {'-': {'-': unknownPage}}}
    }
  };

  var coreFunction;
  var functionPath;

  function getType(cmd) {
    var type = '-';
    if (cmd === 'points') {
      type = fallback(getUrlParameter('type'), '-');
    }
    return type;
  }

  function newSelector(selector) {
    var test_cmd = document.querySelector(selector);
    return test_cmd && test_cmd.value || '-';
  }

  var isValid = [
    function(cmd) {return pageSwitcher[cmd];},
    function(cmd, subcmd) {return pageSwitcher[cmd][subcmd];},
    function(cmd, subcmd, subcmd2) {return pageSwitcher[cmd][subcmd][subcmd2];},
    function(cmd, subcmd, subcmd2, type) {
      return pageSwitcher[cmd][subcmd][subcmd2][type];
    }
  ];

  function testCoreFunction(cmd, subcmd, subcmd2, type, fromWorld) {
    if (isValid.every(function(e) {
      return isObject(e(cmd, subcmd, subcmd2, type));
    }) && pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld]) {
      return pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld];
    }
  }

  function getCoreFunction() {
    var cmd;
    var subcmd;
    var subcmd2;
    var type;
    var fromWorld;
    if (document.location.search !== '') {
      cmd = fallback(getUrlParameter('cmd'), '-');
      subcmd = fallback(getUrlParameter('subcmd'), '-');
      subcmd2 = fallback(getUrlParameter('subcmd2'), '-');
      type = getType(cmd);
      fromWorld = fallback(getUrlParameter('fromworld'), '-');
    } else {
      cmd = newSelector('input[name="cmd"]');
      subcmd = newSelector('input[name="subcmd"]');
      if (subcmd === 'dochat') {
        cmd = '-';
        subcmd = '-';
      }
      subcmd2 = newSelector('input[name="subcmd2"]');
      type = '-';
      fromWorld = '-';
    }
    calf.cmd = cmd;
    calf.subcmd = subcmd;
    calf.subcmd2 = subcmd2;
    functionPath = cmd + '/' + subcmd + '/' + subcmd2 + '/' + type + '/' +
      fromWorld;

    coreFunction = testCoreFunction(cmd, subcmd, subcmd2, type, fromWorld);
  }

  function asyncDispatcher() {
    if (isFunction(coreFunction)) {
      screenview(functionPath);
      start('JS Perf', functionPath);
      coreFunction();
      end('JS Perf', functionPath);
    }
  }

  window.FSH = window.FSH || {};
  window.FSH.calf = '10';

  // main event dispatcher
  window.FSH.dispatch = function dispatch() {

    setup();
    start('JS Perf', 'FSH.dispatch');

    getCoreFunction();
    lookForHcsData();
    add(3, asyncDispatcher);

    if (jQueryNotPresent()) {return;}

    isMessageSound();

    /* This must be at the end in order not to
    screw up other findNode calls (Issue 351) */
    doQuickLinks();

    end('JS Perf', 'FSH.dispatch');

  };

}());
//# sourceMappingURL=beta_calfSystem.js.map
