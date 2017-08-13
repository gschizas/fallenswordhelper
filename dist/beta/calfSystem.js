(function () {
'use strict';

/*
 * DOMParser HTML extension
 * 2012-09-04
 *
 * By Eli Grey, http://eligrey.com
 * Public domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/* ! @source https://gist.github.com/1129031 */
/* global document, DOMParser*/

(function(DOMParser) {
  var DOMParser_proto = DOMParser.prototype;
  var real_parseFromString = DOMParser_proto.parseFromString;

  // Firefox/Opera/IE throw errors on unsupported types
  try {
    // WebKit returns null on unsupported types
    if ((new DOMParser()).parseFromString('', 'text/html')) {
      // text/html parsing is natively supported
      return;
    }
  } catch (ex) {
    // Nothing
  }

  DOMParser_proto.parseFromString = function(markup, type) {
    if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
      var doc = document.implementation.createHTMLDocument('');
      if (markup.toLowerCase().indexOf('<!doctype') > -1) {
        doc.documentElement.innerHTML = markup;
      } else {
        doc.body.innerHTML = markup;
      }
      return doc;
    }
    return real_parseFromString.apply(this, arguments);
  };
}(DOMParser));

/*
// @license http://opensource.org/licenses/MIT
// copyright Paul Irish 2015
*/

if ('performance' in window === false) {
  window.performance = {};
}

if ('now' in window.performance === false) {

  var nowOffset = Date.now();

  if (performance.timing && performance.timing.navigationStart) {
    nowOffset = performance.timing.navigationStart;
  }

  window.performance.now = function now() {
    return Date.now() - nowOffset;
  };
}

var timers = {};
var footWrap = document.getElementById('foot-wrap');

function log(text, value) {
  if (footWrap) {
    footWrap.insertAdjacentHTML('beforeend',
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
      log('There is a problem with your local storage. ' +
        'FSH cannot persist your settings.');
      ws = null;
    }
  } catch (e) {
    ws = null;
  }
  // Catch Security error
  if (ws === 'object') {
    window.GM_getValue = function(name, defValue) {
      var value = window.localStorage.getItem(GMSTORAGE_PATH + name);
      if (value === null || typeof value === 'undefined') {return defValue;}
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
  } else if (!gvar.isOpera || typeof GM_setValue === 'undefined') {
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
    /* jshint -W016 */
    // eslint-disable-next-line no-bitwise
    var parentIndex = i >> 1;
    /* jshint +W016 */
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

var calf = {};

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

  inventoryMinLvl: 1,
  inventoryMaxLvl: 9999,
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
  inventoryCheckedElements: {
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

  quickSearchList:
    '[{"category":"Plants","searchname":"Amber","nickname":""},' +
    '{"category":"Plants","searchname":"Blood Bloom","nickname":""},' +
    '{"category":"Plants","searchname":"Jademare","nickname":""},' +
    '{"category":"Plants","searchname":"Dark Shade","nickname":""},' +
    '{"category":"Plants","searchname":"Trinettle","nickname":""},' +
    '{"category":"Plants","searchname":"Heffle Wart","nickname":""},' +
    '{"category":"Potions","searchname":"Sludge Brew",' +
      '"nickname":"DC 200","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Black Death",' +
      '"nickname":"DC 225","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Aid",' +
      '"nickname":"Assist","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Supreme Doubling",' +
      '"nickname":"DB 450","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Acceleration",' +
      '"nickname":"DB 500","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Lesser Death Dealer",' +
      '"nickname":"DD","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Runic Potion",' +
      '"nickname":"FI 250","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of the Bookworm",' +
      '"nickname":"Lib 225","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Truth",' +
      '"nickname":"EW 1k","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Dull Edge",' +
      '"nickname":"DE 25","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Notched Blade",' +
      '"nickname":"DE 80","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Death",' +
      '"nickname":"DW 125","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Decay",' +
      '"nickname":"WI 150","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Fatality",' +
      '"nickname":"WI 350","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Annihilation",' +
      '"nickname":"DW 150","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of the Wise",' +
      '"nickname":"Lib 200","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Shattering",' +
      '"nickname":"SA","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Dragons Blood Potion",' +
      '"nickname":"ZK 200","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Berserkers Potion",' +
      '"nickname":"ZK 300","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Fury",' +
      '"nickname":"ZK 350","displayOnAH":true},' +
    '{"category":"Potions","searchname":"Potion of Supreme Luck",' +
      '"nickname":"FI 1k","displayOnAH":true}]',

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
  lastmyGuildLogCheck: 0,
  hideSubLvlCreature: false,
  hidePlayerActions: false,
  extraProfile: '',
  textToSearchFor: '',
  lastLadderReset: 0,

};

var rarity = [
  {colour: '#ffffff', clas: 'fshCommon'},
  {colour: '#0099ff', clas: 'fshRare'},
  {colour: '#cc00ff', clas: 'fshUnique'},
  {colour: '#ffff33', clas: 'fshLegendary'},
  {colour: '#cc0033', clas: 'fshSuper'},
  {colour: '#6633ff', clas: 'fshCrystal'},
  {colour: '#009900', clas: 'fshEpic'}
];

var itemRE = /item_id=(\d+)&inv_id=(\d+)/;

var places = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth',
  'fourteenth'];

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'];

var defenderMultiplier = 0.2;

var mercRE = [
  /<td>Attack:<\/td><td>(\d+)<\/td>/,
  /<td>Defense:<\/td><td>(\d+)<\/td>/,
  /<td>Armor:<\/td><td>(\d+)<\/td>/,
  /<td>Damage:<\/td><td>(\d+)<\/td>/,
  /<td>HP:<\/td><td>(\d+)<\/td>/
];

var lastActivityRE =
  /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;

var server = document.location.protocol + '//' +
  document.location.host + '/';
var imageServer = window.HCS && window.HCS.defines &&
  window.HCS.defines.fileserver &&
  window.HCS.defines.fileserver.slice(0, -1);

function fallback(a, b) {
  return a || b;
}

function getValue(name) {
  return GM_getValue(name, defaults[name]);
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
  if (resultJSON) {result = JSON.parse(resultJSON, reviver$1);}
  return result;
}

function setValueJSON(name, value) {
  GM_setValue(name, JSON.stringify(value));
}

function setValue(name, value) {
  GM_setValue(name, value);
}

function getTarget(doc) {
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
  // See createDocument with DOMParser below
  // This only matters in Firefox. evaluate will fail silently if
  // the context is not part of the calling object.
  var _doc = fallback(doc, document);
  target = getTarget(_doc);
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

function createDocument(details) {
  // Use DOMParser to prevent img src tags downloading
  var parser = new DOMParser();
  var doc = parser.parseFromString(details, 'text/html');
  return doc;
}

function xmlhttp(theUrl, func, theCallback) {
  return $.ajax({
    url: theUrl,
    callback: theCallback,
    success: function(responseDetails) {
      if (func) {
        func.call(this, responseDetails, this.callback);
      }
    }
  });
}

function intValue(theText) {
  if (!theText) {return 0;}
  return parseInt(theText.replace(/,/g, ''), 10);
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

function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function convertTextToHtml(inputText) {
  return inputText
    .replace(/</g, '&lt')
    .replace(/>/g, '&gt')
    .replace(/\n/g, '<br>')
    .replace(/\[\/([a-z])\]/g, '</$1>')
    .replace(/\[([a-z])\]/g, '<$1>');
}

function parseDateAsTimestamp(textDate) {
  var dateAry = textDate.split(/[: /[]/);
  return Date.UTC(Number(dateAry[4]), months.indexOf(dateAry[3]),
    Number(dateAry[2]), Number(dateAry[0]), Number(dateAry[1]), 0);
}



function toggleVisibilty(evt) {
  var anItemId = evt.target.getAttribute('linkto');
  var anItem = document.getElementById(anItemId);
  var currentVisibility = anItem.classList.contains('fshHide');
  anItem.classList.toggle('fshHide');
  if (currentVisibility) {
    setValue(anItemId, '');
  } else {
    setValue(anItemId, 'ON');
  }
}

function outputParamVal(param) {
  if (typeof param === 'undefined') {return true;}
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

function outputFormat(value, suffix) {
  if (value === 0) {return '';}
  return value.toString() + suffix;
}

function formatLastActivity(last_login) {
  var s = Math.abs(Math.floor(Date.now() / 1000 - last_login));
  var m = Math.floor(s / 60);
  s %= 60;
  var h = Math.floor(m / 60);
  m %= 60;
  var d = Math.floor(h / 24);
  h %= 24;
  return outputFormat(d, ' days, ') + outputFormat(h, ' hours, ') +
    outputFormat(m, ' mins, ') + s + ' secs';
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
  if (typeof _obj === 'undefined') {return def;}
  return _obj;
}

function sortDesc(result) {
  if (calf.sortAsc) {return result;}
  return -result;
}

function stringSort(a, b) {
  var result = 0;
  var _a = path(a, calf.sortBy, 'a');
  var _b = path(b, calf.sortBy, 'a');
  if (_a.toLowerCase() < _b.toLowerCase()) {result = -1;}
  if (_a.toLowerCase() > _b.toLowerCase()) {result = 1;}
  return sortDesc(result);
}

function intFromString(val) {
  if (typeof val === 'string') {
    return parseInt(val.replace(/,|#/g, ''), 10);
  }
  return val;
}

function numberSort(a, b) {
  if (typeof a.type !== 'undefined' && a.type > 8) {return 1;} // non equipment items
  if (typeof a.type !== 'undefined' && b.type > 8) {return -1;}
  var valueA = path(a, calf.sortBy, 1);
  var valueB = path(b, calf.sortBy, 1);
  valueA = intFromString(valueA);
  valueB = intFromString(valueB);
  var result = valueA - valueB;
  return sortDesc(result);
}

function testQuant(aValue) {
  var theValue = parseInt(aValue, 10);
  if (!isNaN(theValue) && theValue > 0 && theValue < 100) {
    return theValue;
  }
}

function getRandomInt(_min, _max) {
  var min = Math.ceil(_min);
  var max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function rnd() {
  return getRandomInt(1000000000, 9999999998);
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isSelected(val, test) {
  if (val === test) {return ' selected';}
  return '';
}

function shouldBeArray(pref) {
  var stored = getValue(pref);
  if (stored && stored !== '') {return stored.split(/\s*,\s*/);}
  return [];
}

function isChecked(pref) {
  if (pref) {return ' checked';}
  return '';
}

function padZ(n) {
  var ret = n.toString();
  if (n < 10) {ret = '0' + ret;}
  return ret;
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
  if (typeof fn === 'function') {
    var _scope = fallback(scope, window);
    var _args = fallback(args, []);
    push(fn.bind.apply(fn, [_scope].concat(_args)), priority);
    if (paused) {taskRunner();}
  }
}

function asyncTask() {
  try {
    pop()();
  } catch (error) {
    log('Unhandled Exception:', error);
  }
  taskRunner();
}

function callback(event) {
  var key = event.data;
  if (typeof key === 'string' && key.indexOf(message) === 0) {
    asyncTask();
  }
}

window.addEventListener('message', callback);

var drag_target;

function drag_over(event) {
  event.preventDefault();
  return false;
}

function drag_drop(event) {
  var offset = event.dataTransfer.getData('text/plain').split(',');
  drag_target.style.left =
    event.clientX + parseInt(offset[0], 10) + 'px';
  drag_target.style.top =
    event.clientY + parseInt(offset[1], 10) + 'px';
  document.body.removeEventListener('dragover', drag_over, false);
  document.body.removeEventListener('drop', drag_drop, false);
  event.preventDefault();
  return false;
}

function drag_start(event) {
  drag_target = event.target;
  var style = window.getComputedStyle(event.target, null);
  event.dataTransfer.setData('text/plain',
    parseInt(style.getPropertyValue('left'), 10) - event.clientX + ',' +
    (parseInt(style.getPropertyValue('top'), 10) - event.clientY));
  document.body.addEventListener('dragover', drag_over, false);
  document.body.addEventListener('drop', drag_drop, false);
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
      typeof obj.attackValue === 'number' &&
      !isNaN(obj.attackValue)) {
    return obj;
  }

  updateForCloak(obj);
  return obj;
}

function reduceBuffArray(buffAry) {
  return buffAry.reduce(function(prev, curr) {
    prev[curr.name] = Number(curr.level);
    return prev;
  }, {});
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

function updateHCSQuickBuffLinks(selector) {
  Array.prototype.forEach.call(document.querySelectorAll(selector),
    function(el) {
      el.href = el.getAttribute('href').replace(/, 500/g, ', 1000'); // getAttribute neccessary for FF
    }
  );
}

function retOption(option, ifTrue, ifFalse) {
  if (getValue(option)) {
    return ifTrue;
  }
  return ifFalse;
}

function retBool(bool, ifTrue, ifFalse) {
  if (bool) {
    return ifTrue;
  }
  return ifFalse;
}

function isDraggable(draggableQuickLinks) {
  if (draggableQuickLinks) {
    document.getElementById('fshQuickLinks')
      .addEventListener('dragstart', drag_start, false);
  }
}

function haveNode(node, quickLinks) { // Native ?
  var quickLinksTopPx = getValue('quickLinksTopPx');
  var quickLinksLeftPx = getValue('quickLinksLeftPx');
  var draggableQuickLinks = getValue('draggableQuickLinks');
  var draggableQuickLinksClass = retBool(draggableQuickLinks,
    ' fshLink" draggable="true"', '"');
  var html = '<div style="top:' + quickLinksTopPx + 'px; left:' +
    quickLinksLeftPx + 'px; background-image:url(\'' + imageServer +
    '/skin/inner_bg.jpg\');" id="fshQuickLinks" class="fshQuickLinks' +
    retOption('keepHelperMenuOnScreen',
      ' fshFixed', '') + draggableQuickLinksClass + '>';
  for (var i = 0; i < quickLinks.length; i += 1) {
    var newWindow = retBool(quickLinks[i].newWindow, ' target="new"', '');
    html += '<li><a href="' + escapeHtml(quickLinks[i].url) + '"' +
      newWindow + '>' + quickLinks[i].name + '</a></li>';
  }
  html += '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
  isDraggable(draggableQuickLinks);
}

function injectQuickLinks() { // Native ?
  var node = document.getElementById('statbar-container');
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

function getForage(forage) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  var dfr = $.Deferred();
  localforage.getItem(forage, function getItemCallback(err, data) {
    if (err) {
      log(forage + ' forage error', err);
      dfr.reject(err);
    } else {
      // returns null if key does not exist
      dfr.resolve(data);
    }
  });
  return dfr.promise();
}

function mixin(obj, mixins) {
  Object.keys(mixins).forEach(function(key) {
    if (typeof mixins[key] === 'object' && mixins[key] !== null) {
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

function setForage(forage, data) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  var dfr = $.Deferred();
  localforage.setItem(forage, data, function setItemCallback(err, _data) {
    if (err) {
      log(forage + ' forage error', err);
      dfr.reject(err);
    } else {
      dfr.resolve(_data);
    }
  });
  return dfr.promise();
}

var dotList;
var dotCount;
var redDot = '<span class="redDot tip-static" data-tipped="Offline"></span>';
var greenDiamond =
  '<span class="greenDiamond tip-static" data-tipped="Online"></span>';
var yellowDiamond =
  '<span class="yellowDiamond tip-static" data-tipped="Offline"></span>';
var orangeDiamond =
  '<span class="orangeDiamond tip-static" data-tipped="Offline"></span>';
var offlineDot =
  '<span class="offlineDot tip-static" data-tipped="Offline"></span>';
var sevenDayDot =
  '<span class="sevenDayDot tip-static" data-tipped="Offline"></span>';

var pCC = document.getElementById('pCC');



function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  var passthru = '';
  if (buffList) {passthru = '&blist=' + buffList;}
  return 'href=\'javascript:window.openWindow("index.php?cmd=' +
    'quickbuff&tid=' + aPlayerId + passthru +
    '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
}



function openQuickBuffByName(aPlayerName) {
  window.openWindow('index.php?cmd=quickbuff&t=' + aPlayerName,
    'fsQuickBuff', 618, 1000, ',scrollbars');
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
    li.appendChild(btn);
    prev.appendChild(li);
    return prev;
  }, createUl());
  return shortList;
}

function infoBox(documentText) {
  var doc = createDocument(documentText);
  var result;
  var infoMsg = doc.getElementById('info-msg');
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

function guildId() {
  var _guildId;
  var nodeList = document.body.getElementsByTagName('script');
  Array.prototype.forEach.call(nodeList, function getGuildId(el) {
    var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
    if (match) {_guildId = parseInt(match[1], 10);}
  });
  setValue('guildId', _guildId);
  return _guildId;
}

function playerId() {
  var thePlayerId = parseInt(document.getElementById('holdtext')
    .textContent.match(/fallensword.com\/\?ref=(\d+)/)[1], 10);
  setValue('playerID', thePlayerId);
  return thePlayerId;
}

function playerName() {
  return document.getElementById('statbar-character').textContent;
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

function makePageTemplate(title, comment, spanId, button, divId) {
  return makePageHeader(title, comment, spanId, button) +
    '<div class="fshSmall" id="' + divId + '"></div>';
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
      return Math.floor(Date.now() / 60000) - Math.floor(obj.last_login / 60);
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
    .exec(contactLink.getAttribute('data-tipped'));
  contactLink.parentNode.previousSibling.innerHTML =
    onlineDot({
      min: lastActivity[3],
      hour: lastActivity[2],
      day: lastActivity[1]
    });
}

function batchDots() {
  var limit = performance.now() + 5;
  while (performance.now() < limit &&
      dotCount < dotList.length) {
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

function confirm(title, msgText, fn) { // jQuery
  var fshMsg = document.getElementById('fshmsg');
  if (!fshMsg) {
    fshMsg = createDiv({id: 'fshmsg'});
    document.body.appendChild(fshMsg);
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

function displayBuffLog(buffLog) {
  document.getElementById('bufflog').innerHTML = buffLog;
}

function clearBuffLog() {
  setForage('fsh_buffLog', '').done(displayBuffLog);
}

function injectBuffLog(injector) {
  var content = injector || pCC;
  content.innerHTML = makePageTemplate('Buff Log', '',
    'clearBuffs', 'Clear', 'bufflog');
  document.getElementById('clearBuffs').addEventListener('click', clearBuffLog);
  getForage('fsh_buffLog').done(displayBuffLog);
}

var content;
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
  confirm('Clear Combat Log',
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
  content.innerHTML = '<h1>Combat Logs</h1><br /><form action="http://' +
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
  textArea = document.getElementById('combatLog');
  document.getElementById('copyLog')
    .addEventListener('click', notepadCopyLog);
  document.getElementById('clearLog')
    .addEventListener('click', notepadClearLog);
}

function injectNotepadShowLogs(injector) { // jQuery.min
  content = injector || pCC;
  getForage('fsh_combatLog').done(gotCombatLog);
}

var context;
var onlinePlayers;
var onlineData;
var highlightPlayersNearMyLvl;
var lvlDiffToHighlight;
var levelToTest;
var onlinePages;
var lastPage;
var table;

function buildOnlinePlayerData() { // jQuery
  onlineData = [];
  Object.keys(onlinePlayers).forEach(function(player) {
    var guildImage = $('<div/>')
      .append(onlinePlayers[player][0]);
    $('img', guildImage).addClass('center');
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
  highlightPlayersNearMyLvl =
    getValue('highlightPlayersNearMyLvl');
  lvlDiffToHighlight = 10;
  levelToTest = intValue($('dt.stat-level:first')
    .next().text());
  var characterVirtualLevel = getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  if (levelToTest <= 205) {lvlDiffToHighlight = 5;}
  $('#fshOutput', context).html( // context
    '<div align=right>' +
    'Min lvl:<input value="' + getValue('onlinePlayerMinLvl') +
      '" size=5 id="fshMinLvl" /> ' +
    'Max lvl:<input value="' + getValue('onlinePlayerMaxLvl') +
      '" size=5 id="fshMaxLvl" /> ' +
    '<input id="fshReset" type="button" value="Reset"/>' +
    '</div><table id="fshInv" class="allow stripe hover"></table>');
}

function gotOnlinePlayers() { // jQuery
  buildOnlinePlayerData();
  $.fn.dataTable.ext.search.push(dataTableSearch);
  filterHeaderOnlinePlayers();

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
      if (highlightPlayersNearMyLvl &&
        Math.abs(intValue(data[2]) - levelToTest) <=
        lvlDiffToHighlight) {
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
      $.get('index.php?cmd=onlineplayers&page=' + i,
        getOnlinePlayers);
    }
  }
  checkLastPage();
}

function refreshEvt() { // Bad jQuery
  $('#fshRefresh', context).hide();
  onlinePages = 0;
  onlinePlayers = {};
  $.get('index.php?cmd=onlineplayers&page=1', getOnlinePlayers);
  setValue('lastOnlineCheck', Date.now());
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
  var now = Date.now();
  var refreshButton;
  if (now - lastCheck > 300000) {
    refreshButton = '<span> (takes a while to refresh so only do it ' +
      'if you really need to) </span><span id="fshRefresh"' +
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
  if (content) {
    context = $(content);
  } else {
    context = $('#pCC');
  }
  injectOnlinePlayersNew();
}

var content$1;
var recipebook;
var hideRecipes = [];
var output;
var itmRE =
  /fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i;
var playerId$1;

function storeRecipeBook() {
  setForage('fsh_recipeBook', recipebook);
}

function getRecipeItems(recipe) {
  if (recipe.items) {
    return recipe.items.reduce(function(prev, itm) {
      return prev + '<div class="rmItem"><img class="tip-dynamic" ' +
        'data-tipped="fetchitem.php?item_id=' +
        itm.id + '&inv_id=-1&t=2&p=' +
        playerId$1 + '&vcode=' +
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
        playerId$1 + '&vcode=' +
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
      recipe.target.id + '&inv_id=-1&t=2&p=' + playerId$1 +
      '&vcode=' + recipe.target.verify + '" ' +
      'src="' + recipe.target.img +
      '" height="30px" width="30px"><br/>';
  }
  return '';
}

function drawRecipeTable() { // Legacy
  playerId$1 = playerId();
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
  storeRecipeBook();
}

function generateRecipeTable() { // Legacy
  if (recipebook) {drawRecipeTable();}
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
  var headerClicked = evt.target.getAttribute('sortKey');
  var sortType = testSortType(evt);
  if (typeof calf.sortAsc === 'undefined') {calf.sortAsc = true;}
  if (calf.sortBy && calf.sortBy === headerClicked) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
  sortRecipeBook(sortType);
  generateRecipeTable();
}

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
  var mouseOver = img.getAttribute('data-tipped');
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
  var tblCells = doc.getElementById('pCC').getElementsByTagName('td');
  return Array.prototype.reduce.call(tblCells,
    reduceItemOrComponent.bind(null, bgGif), []);
}

function processRecipe(recipe, data) {
  var doc = createDocument(data);
  output.insertAdjacentHTML('beforeend',
    'Parsing blueprint ' + recipe.name + '...<br>');
  recipe.items = parseRecipeItemOrComponent('/inventory/2x3.gif', doc);
  recipe.components = parseRecipeItemOrComponent('/inventory/1x1mini.gif', doc);
  recipe.target = parseRecipeItemOrComponent('/hellforge/2x3.gif', doc)[0];
  recipebook.recipe.push(recipe);
}

function processFolderAnyPage(data) { // jQuery.min
  var doc = createDocument(data);
  var pCC$$1 = doc.getElementById('pCC');
  var scope = pCC$$1.firstElementChild.rows[6].cells[0]
    .firstElementChild.getElementsByTagName('a');
  var prm = Array.prototype.reduce.call(scope, function(prev, el) {
    output.insertAdjacentHTML('beforeend',
      'Found blueprint "' + el.textContent + '".<br>');
    var recipe = {
      img: el.parentNode.previousElementSibling.firstElementChild
        .getAttribute('src'),
      link: el.href,
      name: el.textContent,
      id: getCustomUrlParameter(el.href, 'recipe_id')
    };
    prev.push($.get(el.href).pipe(processRecipe.bind(null, recipe)));
    return prev;
  }, []);
  return $.when.apply($, prm);
}

function processFolderFirstPage(data) { // jQuery.min
  var prm = [];
  var doc = createDocument(data);
  var pCC$$1 = doc.getElementById('pCC');
  var scope = pCC$$1.firstElementChild.rows[4].cells[0]
    .firstElementChild.getElementsByTagName('img');
  var thisFolder = Array.prototype.filter.call(scope, function(el) {
    return /\/folder_on\.gif/.test(el.getAttribute('src'));
  })[0];
  var pages = pCC$$1.getElementsByClassName('customselect')[0]
    .getElementsByTagName('option').length;
  for (var i = 1; i < pages; i += 1) {
    prm.push($.get(thisFolder.parentNode.href + '&page=' + i)
      .pipe(processFolderAnyPage));
  }
  prm.push($.when(data).pipe(processFolderAnyPage));
  return $.when.apply($, prm);
}

function reduceFolders(prev, el) { // jQuery.min
  var href = el.parentNode.href;
  var folderName = el.parentNode.nextElementSibling.nextElementSibling
    .firstChild.textContent;
  if (getCustomUrlParameter(href, 'folder_id') === '-1') {
    return prev;
  }
  if (/quest/i.test(folderName)) {
    output.insertAdjacentHTML('beforeend', 'Skipping folder "' +
      folderName + '"  as it has the word "quest" in folder name.<br>');
    return prev;
  }
  prev.push($.get(href).pipe(processFolderFirstPage));
  return prev;
}

function processFirstPage(data) { // jQuery.min
  var doc = createDocument(data);
  var scope = doc.getElementById('pCC').firstElementChild.rows[4].cells[0]
    .firstElementChild.getElementsByTagName('img');
  var prm = Array.prototype.reduce.call(scope, reduceFolders, []);
  prm.push($.when(data).pipe(processFolderFirstPage));
  return $.when.apply($, prm);
}

function displayStuff() {
  output.insertAdjacentHTML('beforeend', 'Finished parsing ... formatting ...');
  storeRecipeBook();
  generateRecipeTable();
}

function parseInventingStart() { // jQuery.min
  recipebook = {};
  recipebook.recipe = [];
  output.innerHTML = '<br>Parsing inventing screen ...<br>';
  $.get('index.php?cmd=inventing').pipe(processFirstPage).done(displayStuff);
}

function gotRecipeBook(data) {
  recipebook = data;
  if (getValue('hideRecipes')) {
    hideRecipes = shouldBeArray('hideRecipeNames');
  }
  content$1.innerHTML = '<table class="fshInvFilter"><thead><tr>' +
    '<th width="90%"><b>&nbsp;Recipe Manager</b></th>' +
    '<th width="10%" class="fshBtnBox">[' +
    '<span id="rfsh" class="fshLink">' +
    'Refresh</span>]</th>' +
    '</tr></thead></table>';
  output = createDiv();
  content$1.insertAdjacentElement('beforeend', output);
  if (!recipebook) {
    parseInventingStart();
  } else {
    generateRecipeTable();
  }
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
  content$1 = injector || pCC;
  getForage('fsh_recipeBook').done(gotRecipeBook);
  content$1.addEventListener('click', rmEvtHdl);
}

function getInventory() {
  var subcmd = 'inventory';
  if (calf.subcmd === 'guildinvmgr') {
    subcmd = 'guild_store&inc_tagged=1';
  }
  return $.ajax({
    dataType: 'json',
    url: 'index.php?cmd=export&subcmd=' + subcmd
  });
}

var deferred = window.$ && $.when();

function dialog(data) {
  if (data.r === 0) {return;}
  $('#dialog_msg').html(data.m).dialog('open');
}

function equipItem(backpackInvId) {
  return $.ajax({
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

function htmlResult(data) {
  var info = infoBox(data);
  var _r = 1;
  if (info.search(/(successfully|gained|components)/) !== -1) {_r = 0;}
  return {r: _r, m: info};
}

function useItem(backpackInvId) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'useitem',
      inventory_id: backpackInvId
    }
  }).pipe(htmlResult)
    .done(dialog);
}

function additionalAction(action, data) {
  if (action === 'wear') {
    return equipItem(data.b)
      .pipe(function equipItemStatus() {return data;});
    // Return takeitem status irrespective of the status of the equipitem
  }
  if (action === 'use') {
    return useItem(data.b)
      .pipe(function useItemStatus() {return data;});
    // Return takeitem status irrespective of the status of the useitem
  }
}

function takeItemStatus(action, data) {
  if (data.r === 0 && action !== 'take') {
    return additionalAction(action, data);
  }
  return data;
}

function takeItem(invId) {
  return $.ajax({
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

function queueTakeItem(invId, action) {
  // You have to chain them because they could be modifying the backpack
  deferred = deferred.pipe(function pipeTakeToQueue() {
    return takeItem(invId).pipe(takeItemStatus.bind(null, action));
  });
  return deferred;
}

function guildInvRecall(invId, playerId$$1, mode) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'recall',
      id: invId,
      player_id: playerId$$1,
      mode: mode
    }
  }).pipe(htmlResult)
    .done(dialog);
}

function backpack() {
  return $.ajax({
    url: 'index.php',
    data: {cmd: 'profile', subcmd: 'fetchinv'},
    dataType: 'json'
  });
}

function recallItem(o) {
  return guildInvRecall(o.invId, o.playerId, o.mode)
    .pipe(function recallItemStatus(data) {
      if (data.r === 0 && o.action !== 'recall') {
        return backpack().pipe(function gotBackpack(bpData) {
          // TODO assuming backpack is successful...
          if (o.action === 'wear') {
            return equipItem(bpData.items[bpData.items.length - 1].a)
              .pipe(function wearItemStatus() {return data;});
            // Return recall status irrespective of the status of the equipitem
          }
          if (o.action === 'use') {
            return useItem(
              bpData.items[bpData.items.length - 1].a)
              .pipe(function useItemStatus() {return data;});
            // Return recall status irrespective of the status of the useitem
          }
        });
      }
      return data;
    });
}

function queueRecallItem(o) {
  // You have to chain them because they could be modifying the backpack
  deferred = deferred.pipe(function pipeRecallToQueue() {
    return recallItem(o);
  });
  return deferred;
}

var extTbl;
var playerId$2;
var extractInv;
var selectST;
var selectMain;
var resourceList;
var buyResult;
var cn;

function backpackRemove(invId) {
  extractInv.some(function(el, i, ary) {
    if (el.inv_id === invId) {
      ary.splice(i, 1);
      return true;
    }
    return false;
  });
}

function quickDoneExtracted(invId, data) {
  if (data.r !== 0) {return;}
  backpackRemove(invId);
  cn += 1;
  buyResult.insertAdjacentHTML('beforeend', '<br>' + cn + '. ' + data.m);
}

function doExtract(target) {
  var InventoryIDs = resourceList[target.id.replace('fshExtr', '')].invIDs;
  target.parentNode.innerHTML = 'extracting all ' +
    InventoryIDs.length + ' resources';
  cn = 0;
  for (var i = 0; i < InventoryIDs.length; i += 1) {
    useItem(InventoryIDs[i])
      .done(quickDoneExtracted.bind(null, InventoryIDs[i]));
  }
}

function extractAllSimilar(evt) {
  confirm('Extract Resources',
    'Are you sure you want to extract all similar items?',
    doExtract.bind(null, evt.target)
  );
}

function checkFlags(item) {
  return selectMain && item.folder_id !== '-1' ||
    !selectST && item.is_in_st;
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
    res.inv_id + '&t=1&p=' + playerId$2 +
    '" border=0></td><td>' + res.item_name + '</td></tr>';
}

function showQuickExtract() {
  resourceList = extractInv.reduce(resources, {});
  var output = '<tr><th width="20%">Actions</th><th>Items</th></tr>' +
    '<tr><td id="buy_result" colspan="2"></td></tr>';
  output += Object.keys(resourceList).reduce(tableRows, '');
  extTbl.innerHTML = output;
  buyResult = document.getElementById('buy_result');
}

function isExtractable(curr) {
  return curr.item_name === 'Zombie Coffin' ||
    curr.type === '12' ||
    curr.type === '16';
}

function prepInv(data) {
  playerId$2 = data.player_id;
  extractInv = data.items.reduce(function(prev, curr) {
    if (isExtractable(curr)) {prev.push(curr);}
    return prev;
  }, []);
  showQuickExtract();
}

var extractEvents = [
  {
    test: function(e) {return e.target.id === 'fshInSt';},
    fn: function() {
      selectST = !selectST;
      showQuickExtract();
    }
  },
  {
    test: function(e) {return e.target.id === 'fshInMain';},
    fn: function() {
      selectMain = !selectMain;
      showQuickExtract();
    }
  },
  {
    test: function(e) {return e.target.id.indexOf('fshExtr') === 0;},
    fn: function(e) {
      extractAllSimilar(e);
    }
  }
];

function listen(e) {
  for (var i = 0; i < extractEvents.length; i += 1) {
    if (extractEvents[i].test(e)) {
      extractEvents[i].fn(e);
      return;
    }
  }
}

function insertQuickExtract(injector) { // jQuery.min
  var content = injector || pCC;
  content.innerHTML = '<div class="qeHead"><b>Quick Extract</b></div>' +
    'Select which type of plants you wish to extract all of. Only ' +
    'select extractable resources.<br>' +
    '<label><input type="checkbox" id="fshInSt" checked>' +
    ' Select items in ST</label>&nbsp;&nbsp;' +
    '<label><input type="checkbox" id="fshInMain" checked>' +
    ' Only extract items in Main Folder</label>';
  extTbl = createTable({width: '100%'});
  content.appendChild(extTbl);
  selectST = true;
  selectMain = true;
  content.addEventListener('click', listen);
  getInventory().done(prepInv);
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

function getItemImg(pCC) {
  var allTables = pCC.getElementsByTagName('table');
  var lastTable = allTables[allTables.length - 1];
  return lastTable.getElementsByTagName('img');
}

function makeFolderSpans(folders) {
  return '<span class="fshLink folder" data-folder="0">All</span>' +
    ' &ensp;<span class="fshLink folder" data-folder="-1">Main</span>' +
    Object.keys(folders).reduce(function(prev, key) {
      return prev + ' &ensp;<span class="fshLink fshNoWrap folder" ' +
        'data-folder="' + key + '">' + folders[key] + '</span>';
    }, '');
}

function ahLink(searchname, nickname) {
  return '<a href="index.php?cmd=auctionhouse&search_text=' + searchname +
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
  itemList.forEach(testItemList.bind(null, invCount, quickSL));
  var im = createDiv({
    id: 'invTabs-ah',
    className: 'ui-tabs-panel ui-corner-bottom'
  });
  im.insertAdjacentHTML('beforeend', buildHTML(invCount, quickSL));
  return im;
}

function toggleForce(el, force) { // Polyfill UC
  if (el.classList.contains('fshHide') !== force) {
    el.classList.toggle('fshHide');
  }
}

var itemList;

function doUseItem(self) { // jQuery.min
  var invId = self.dataset.itemid;
  useItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    self.parentNode.innerHTML = '<span class="fastWorn">Used</span>';
  });
}

function useProfileInventoryItem(self) {
  confirm('Use/Extract Item',
    'Are you sure you want to use/extract the item?',
    doUseItem.bind(null, self)
  );
}

function equipProfileInventoryItem(self) { // jQuery.min
  var invId = self.dataset.itemid;
  equipItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    self.parentNode.innerHTML = '<span class="fastWorn">Worn</span>';
  });
}

function hideFolders(self) {
  var folderId = self.dataset.folder;
  itemList.forEach(function(o) {
    var tr = o.dom;
    if (folderId === '0') {
      tr.classList.remove('fshHide');
    } else {
      var force = folderId !== o.f.toString();
      toggleForce(tr, force);
    }
  });
}

var evts = [
  {
    condition: function(self) {
      return self.classList.contains('smallLink') &&
        self.classList.contains('fshEq');
    },
    result: equipProfileInventoryItem
  },
  {
    condition: function(self) {
      return self.classList.contains('smallLink') &&
        self.classList.contains('fshUse');
    },
    result: useProfileInventoryItem
  },
  {
    condition: function(self) {return self.classList.contains('folder');},
    result: hideFolders
  }
];

function listen$1(evt) {
  var self = evt.target;
  evts.some(function(el) {
    if (el.condition(self)) {
      el.result(self);
      return true;
    }
    return false;
  });

}

function alpha(a, b) {
  if (a.n.toLowerCase() < b.n.toLowerCase()) {return -1;}
  if (a.n.toLowerCase() > b.n.toLowerCase()) {return 1;}
  return 0;
}

function folder(a, b) {
  if (a.f === b.f) {
    return alpha(a, b);
  }
  return a.f - b.f;
}

function tableRows$1(tbl, item) {
  var newRow = tbl.insertRow(-1);
  item.dom = newRow;
  var equipClass = 'fshEq ';
  var useClass = 'fshUse ';
  if (item.eq) {equipClass += 'smallLink';} else {equipClass += 'notLink';}
  if (item.u) {useClass += 'smallLink';} else {useClass += 'notLink';}
  newRow.innerHTML = '<td class="fshCenter"><span class="' + equipClass +
  '" data-itemid="' + item.a + '">Wear</span>&nbsp;|&nbsp;<span class="' +
  useClass + '" data-itemid="' + item.a +
  '">Use/Ext</span></td><td><img src="' + item.src +
  '" class="tip-dynamic" data-tipped="' + item.tip +
  '" width="30" height="30" border="0"></td><td width="90%">&nbsp;' +
  item.n + '</td>';
}

function createQuickWear(folders) {
  var tbl = createTable({
    width: '100%',
    innerHTML: '<thead><tr><th class="fshCenter" colspan="3">' +
      makeFolderSpans(folders) + '</th></tr>' +
      '<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th>' +
      '<th colspan="2">Items</th></tr></thead>'
  });
  var tbody = createTBody();
  tbl.appendChild(tbody);
  itemList.forEach(tableRows$1.bind(null, tbody));
  var qw = createDiv({
    id: 'invTabs-qw',
    className: 'ui-tabs-panel ui-corner-bottom'
  });
  qw.appendChild(tbl);
  return qw;
}

function createInvTabs() {
  return createDiv({
    id: 'invTabs',
    className: 'ui-tabs ui-widget-content ui-corner-all',
    innerHTML: '<input id="tab1" type="radio" name="tabs" checked>' +
      '<input id="tab2" type="radio" name="tabs">' +
      '<ul class="ui-tabs-nav ui-helper-reset ' +
        'ui-helper-clearfix ui-widget-header ui-corner-all">' +
      '<li class="ui-state-default ui-corner-top inv-tabs-qw">' +
      '<label for="tab1">Quick Wear / Use / Extract<br>Manager</label>' +
      '</li>' +
      '<li class="ui-state-default ui-corner-top inv-tabs-ah">' +
      '<label for="tab2">Inventory Manager Counter' +
        '<br>filtered by AH Quick Search</label>' +
      '</li></ul>'
  });
}

function showQuickWear(content, data, folders) {
  itemList = data;
  itemList.sort(folder);
  var invTabs = createInvTabs();
  var invTabsQw = createQuickWear(folders);
  invTabs.appendChild(invTabsQw);
  content.innerHTML = '';
  content.appendChild(invTabs);
  invTabsQw.addEventListener('click', listen$1);
  invTabs.appendChild(showAHInvManager(itemList));
}

var content$2;
var scrapedItems;
var folders;
var invItems;

function getItems(doc) {
  var imgList = getItemImg(doc.getElementById('pCC'));
  Array.prototype.forEach.call(imgList, function(img) {
    var thisItem = itemRE.exec(img.dataset.tipped);
    if (!scrapedItems[thisItem[2]]) {
      scrapedItems[thisItem[2]] = {
        n: img.parentNode.parentNode.nextElementSibling.textContent.trim(),
        src: img.src,
        tip: img.dataset.tipped
      };
    }
  });
  return scrapedItems;
}

function queryFolders(doc) {
  return doc.querySelectorAll('a[href*="folder_id="]');
}

function folderNotActive(fldr) {
  return fldr.firstChild.src.indexOf('folder_on.gif') === -1;
}

function displayProgress(msg) {
  content$2.insertAdjacentHTML('beforeend', msg + '<br>');
}

function folderProgress(folderName) {
  displayProgress('Checking folder ' + folderName + '...');
}

function folderText(fldr) {
  return fldr.parentNode.textContent;
}

function gotOtherPage(folderName, html) {
  folderProgress(folderName);
  getItems(createDocument(html));
}

function gotSecondPage(folderName, html) {
  folderProgress(folderName);
  var doc = createDocument(html);
  var myFolders = queryFolders(doc);
  if (folderNotActive(myFolders[1])) {
    displayProgress('No more folders...');
    return html;
  }
  getItems(doc);
  var prm = [];
  for (var i = 2; i < myFolders.length; i += 1) {
    prm.push($.get(myFolders[i].href)
      .done(gotOtherPage.bind(null, folderText(myFolders[i]))));
  }
  return $.when.apply($, prm);
}

function gotGuildStoreItems(html) {
  displayProgress('Checking Guild Store Items...');
  getItems(createDocument(html));
}

function getGuildStoreItems() {
  return $.get('index.php?cmd=guild&subcmd=inventory&subcmd2=storeitems')
    .done(gotGuildStoreItems);
}

function imDone() {
  displayProgress('I\'m done.');
  var itemAry = Object.keys(scrapedItems).map(function(invId) {
    return {
      a: invId,
      eq: Number(invItems[invId].type) < 9,
      f: Number(invItems[invId].folder_id),
      n: scrapedItems[invId].n,
      src: scrapedItems[invId].src,
      tip: scrapedItems[invId].tip,
      u: ['10', '12', '15', '16'].indexOf(invItems[invId].type) !== -1 ||
        scrapedItems[invId].n === 'Zombie Coffin'
    };
  });
  showQuickWear(content$2, itemAry, folders);
}

function gotInv(data) {
  displayProgress('Checking Inventory...');
  // console.log('Inventory', data);
  folders = data.folders;
  invItems = data.items;
}

function gotFirstPage(html) {
  folderProgress('Main');
  var doc = createDocument(html);
  var myFolders = queryFolders(doc);
  if (folderNotActive(myFolders[0])) {
    displayProgress('Something has gone horribly wrong!');
    return;
  }
  var prm = [getInventoryById().done(gotInv)];
  if (myFolders[1]) {
    var fn = gotSecondPage.bind(null, folderText(myFolders[1]));
    prm.push($.get(myFolders[1].href).pipe(fn));
  }
  getItems(doc);
  $.when.apply($, prm).pipe(getGuildStoreItems).done(imDone);
}

function insertQuickWear(injector) {
  content$2 = injector || pCC;
  if (!content$2) {return;}
  displayProgress('Getting item list from backpack...');
  scrapedItems = {};
  $.get('index.php?cmd=profile&subcmd=dropitems')
    .done(gotFirstPage);
}

/* eslint-disable no-multi-spaces, max-len */
var buffList = [
  {name: 'Rage',                stamina: 10, duration: 90,   minCastLevel: 1,    treeId: 0, skillId: 0,   nicks: 'rage'},
  {name: 'Stun',                stamina: 15, duration: 90,   minCastLevel: 1,    treeId: 0, skillId: 1,   nicks: 'stun,st'},
  {name: 'Fury',                stamina: 10, duration: 90,   minCastLevel: 25,   treeId: 0, skillId: 2,   nicks: 'fury'},
  {name: 'Blood Thirst',        stamina: 10, duration: 45,   minCastLevel: 25,   treeId: 0, skillId: 4,   nicks: 'blood thirst,bloodthirst,bt'},
  {name: 'Enchant Weapon',      stamina: 10, duration: 90,   minCastLevel: 25,   treeId: 0, skillId: 5,   nicks: 'enchant weapon,ew'},
  {name: 'Berserk',             stamina: 15, duration: 90,   minCastLevel: 75,   treeId: 0, skillId: 3,   nicks: 'berserk'},
  {name: 'Holy Flame',          stamina: 15, duration: 90,   minCastLevel: 75,   treeId: 0, skillId: 6,   nicks: 'holy flame,hf'},
  {name: 'Dark Curse',          stamina: 20, duration: 60,   minCastLevel: 150,  treeId: 0, skillId: 7,   nicks: 'dark curse,dc'},
  {name: 'Shockwave',           stamina: 20, duration: 90,   minCastLevel: 200,  treeId: 0, skillId: 29,  nicks: 'shockwave,sw,shock'},
  {name: 'Ignite',              stamina: 10, duration: 60,   minCastLevel: 200,  treeId: 0, skillId: 30,  nicks: 'ignite,ign'},
  {name: 'Super Elite Slayer',  stamina: 25, duration: 15,   minCastLevel: 250,  treeId: 0, skillId: 31,  nicks: 'super elite slayer,ses,se slayer'},
  {name: 'Wither',              stamina: 15, duration: 60,   minCastLevel: 250,  treeId: 0, skillId: 32,  nicks: 'wither,with'},
  {name: 'Shatter Armor',       stamina: 20, duration: 60,   minCastLevel: 300,  treeId: 0, skillId: 33,  nicks: 'shatter armor,sa'},
  {name: 'Death Wish',          stamina: 20, duration: 45,   minCastLevel: 300,  treeId: 0, skillId: 34,  nicks: 'deathwish,dw,deathw,death wish'},
  {name: 'Spell Breaker',       stamina: 35, duration: 45,   minCastLevel: 300,  treeId: 0, skillId: 35,  nicks: 'spell breaker,sb'},
  {name: 'Spectral Knight',     stamina: 15, duration: 45,   minCastLevel: 400,  treeId: 0, skillId: 48,  nicks: 'spectral knight,sk,spec knight'},
  {name: 'Keen Edge',           stamina: 10, duration: 60,   minCastLevel: 400,  treeId: 0, skillId: 47,  nicks: 'keen edge,ke'},
  {name: 'Arterial Strike',     stamina: 20, duration: 60,   minCastLevel: 500,  treeId: 0, skillId: 49,  nicks: 'arterial strike,as,art strike,art str'},
  {name: 'Death Dealer',        stamina: 20, duration: 60,   minCastLevel: 500,  treeId: 0, skillId: 50,  nicks: 'death dealer,dd'},
  {name: 'Savagery',            stamina: 15, duration: 45,   minCastLevel: 600,  treeId: 0, skillId: 51,  nicks: 'savagery,savage'},
  {name: 'Chi Strike',          stamina: 20, duration: 90,   minCastLevel: 700,  treeId: 0, skillId: 52,  nicks: 'chi strike,chi,chis,chi str'},
  {name: 'Shield Strike',       stamina: 20, duration: 45,   minCastLevel: 700,  treeId: 0, skillId: 53,  nicks: 'shield strike,ss,sh str'},
  {name: 'Demoralize',          stamina: 25, duration: 30,   minCastLevel: 800,  treeId: 0, skillId: 73,  nicks: 'demoralize,dem'},
  {name: 'Poison',              stamina: 25, duration: 60,   minCastLevel: 800,  treeId: 0, skillId: 70,  nicks: 'poison,poi'},
  {name: 'Iron Fist',           stamina: 25, duration: 60,   minCastLevel: 900,  treeId: 0, skillId: 74,  nicks: 'iron fist,if'},
  {name: 'Spell Leech',         stamina: 50, duration: 60,   minCastLevel: 900,  treeId: 0, skillId: 79,  nicks: 'spell leech,sl'},
  {name: 'Distraction',         stamina: 25, duration: 60,   minCastLevel: 900,  treeId: 0, skillId: 78,  nicks: 'distraction,dis'},
  {name: 'Coordinated Attack',  stamina: 30, duration: 90,   minCastLevel: 1000, treeId: 0, skillId: 118, nicks: 'coordinated attack,coorda'},
  {name: 'Undermine',           stamina: 30, duration: 90,   minCastLevel: 1000, treeId: 0, skillId: 108, nicks: 'undermine,um'},
  {name: 'Cursed Rune',         stamina: 30, duration: 120,  minCastLevel: 1000, treeId: 0, skillId: 89,  nicks: 'cursed rune,crune'},
  {name: 'Anti Deflect',        stamina: 30, duration: 60,   minCastLevel: 1000, treeId: 0, skillId: 105, nicks: 'anti deflect,ad'},
  {name: 'Overkill',            stamina: 30, duration: 60,   minCastLevel: 1200, treeId: 0, skillId: 109, nicks: 'overkill,ok'},
  {name: 'Smashing Hammer',     stamina: 30, duration: 90,   minCastLevel: 1200, treeId: 0, skillId: 111, nicks: 'smashing hammer,sh'},
  {name: 'Mighty Vigor',        stamina: 35, duration: 60,   minCastLevel: 1200, treeId: 0, skillId: 113, nicks: 'mighty vigor,mv'},
  {name: 'Fist Fight',          stamina: 30, duration: 90,   minCastLevel: 1200, treeId: 0, skillId: 115, nicks: 'fist fight,ff'},
  {name: 'Cursed Ring',         stamina: 30, duration: 120,  minCastLevel: 1400, treeId: 0, skillId: 88,  nicks: 'cursed ring,cring'},
  {name: 'Sharpen',             stamina: 30, duration: 60,   minCastLevel: 1400, treeId: 0, skillId: 106, nicks: 'sharpen,sharp'},
  {name: 'Balanced Attack',     stamina: 30, duration: 90,   minCastLevel: 1400, treeId: 0, skillId: 116, nicks: 'balanced attack,ba'},
  {name: 'Heavy Weight',        stamina: 20, duration: 120,  minCastLevel: 1600, treeId: 0, skillId: 146, nicks: 'heavy weight, hw'},
  {name: 'Armored Strike',      stamina: 30, duration: 60,   minCastLevel: 1600, treeId: 0, skillId: 130, nicks: 'armored strike, armstr'},
  {name: 'Invert',              stamina: 40, duration: 180,  minCastLevel: 2000, treeId: 0, skillId: 173, nicks: 'invert'},
  {name: 'Reign of Terror',     stamina: 40, duration: 60,   minCastLevel: 2500, treeId: 0, skillId: 174, nicks: 'reign of terror'},
  {name: 'Critical Strike',     stamina: 40, duration: 90,   minCastLevel: 3000, treeId: 0, skillId: 175, nicks: 'critical strike'},
  {name: 'Great Vigor',         stamina: 10, duration: 90,   minCastLevel: 1,    treeId: 1, skillId: 12,  nicks: 'great vigor,vigor,gv'},
  {name: 'Fortify',             stamina: 10, duration: 120,  minCastLevel: 25,   treeId: 1, skillId: 8,   nicks: 'fortify'},
  {name: 'Evade',               stamina: 10, duration: 90,   minCastLevel: 25,   treeId: 1, skillId: 10,  nicks: 'evade'},
  {name: 'Absorb',              stamina: 20, duration: 120,  minCastLevel: 25,   treeId: 1, skillId: 13,  nicks: 'absorb,abs'},
  {name: 'Rock Skin',           stamina: 15, duration: 90,   minCastLevel: 75,   treeId: 1, skillId: 11,  nicks: 'rock skin,rs'},
  {name: 'Enchanted Armor',     stamina: 10, duration: 90,   minCastLevel: 75,   treeId: 1, skillId: 9,   nicks: 'enchanted armor,enchant armor,ea,ench arm,ench armor'},
  {name: 'Aura of Protection',  stamina: 20, duration: 90,   minCastLevel: 150,  treeId: 1, skillId: 15,  nicks: 'aura of protection,aop,aofp'},
  {name: 'Deflect',             stamina: 25, duration: 300,  minCastLevel: 150,  treeId: 1, skillId: 14,  nicks: 'deflect,defl'},
  {name: 'Force Shield',        stamina: 10, duration: 60,   minCastLevel: 200,  treeId: 1, skillId: 27,  nicks: 'force shield,fs'},
  {name: 'Unbreakable',         stamina: 20, duration: 90,   minCastLevel: 200,  treeId: 1, skillId: 28,  nicks: 'unbreakable,ub,unb,unbr'},
  {name: 'Honor',               stamina: 10, duration: 180,  minCastLevel: 800,  treeId: 1, skillId: 82,  nicks: 'honor'},
  {name: 'Assist',              stamina: 30, duration: 120,  minCastLevel: 250,  treeId: 1, skillId: 36,  nicks: 'assist,ass'},
  {name: 'Constitution',        stamina: 25, duration: 30,   minCastLevel: 300,  treeId: 1, skillId: 37,  nicks: 'constitution,const'},
  {name: 'Counter Attack',      stamina: 20, duration: 60,   minCastLevel: 400,  treeId: 1, skillId: 54,  nicks: 'counter attack,ca'},
  {name: 'Summon Shield Imp',   stamina: 50, duration: 60,   minCastLevel: 400,  treeId: 1, skillId: 55,  nicks: 'summon shield imp,ssi,imp'},
  {name: 'Vision',              stamina: 20, duration: 90,   minCastLevel: 500,  treeId: 1, skillId: 56,  nicks: 'vision,vis'},
  {name: 'Fortitude',           stamina: 15, duration: 90,   minCastLevel: 500,  treeId: 1, skillId: 57,  nicks: 'fortitude,fort'},
  {name: 'Flinch',              stamina: 20, duration: 60,   minCastLevel: 600,  treeId: 1, skillId: 58,  nicks: 'flinch'},
  {name: 'Terrorize',           stamina: 20, duration: 60,   minCastLevel: 700,  treeId: 1, skillId: 59,  nicks: 'terrorize,terror'},
  {name: 'Nightmare Visage',    stamina: 40, duration: 1000, minCastLevel: 700,  treeId: 1, skillId: 60,  nicks: 'nightmare visage,nv,visage'},
  {name: 'Sanctuary',           stamina: 25, duration: 30,   minCastLevel: 800,  treeId: 1, skillId: 44,  nicks: 'sanctuary,sanc'},
  {name: 'Dull Edge',           stamina: 10, duration: 60,   minCastLevel: 800,  treeId: 1, skillId: 46,  nicks: 'dull edge,de'},
  {name: 'Erosion',             stamina: 25, duration: 180,  minCastLevel: 900,  treeId: 1, skillId: 80,  nicks: 'erosion,ero'},
  {name: 'Avert Gaze',          stamina: 10, duration: 60,   minCastLevel: 900,  treeId: 1, skillId: 71,  nicks: 'avert gaze,ag'},
  {name: 'Enchant Shield',      stamina: 25, duration: 60,   minCastLevel: 900,  treeId: 1, skillId: 77,  nicks: 'enchant shield,es'},
  {name: 'Smite',               stamina: 30, duration: 60,   minCastLevel: 1000, treeId: 1, skillId: 97,  nicks: 'smite,sm'},
  {name: 'Balanced Defense',    stamina: 30, duration: 90,   minCastLevel: 1000, treeId: 1, skillId: 117, nicks: 'balanced defense,bd'},
  {name: 'Bastion',             stamina: 30, duration: 90,   minCastLevel: 1000, treeId: 1, skillId: 122, nicks: 'bastion,bast'},
  {name: 'Side Step',           stamina: 30, duration: 90,   minCastLevel: 1000, treeId: 1, skillId: 86,  nicks: 'side step,sstep'},
  {name: 'High Guard',          stamina: 30, duration: 60,   minCastLevel: 1200, treeId: 1, skillId: 96,  nicks: 'high guard,hg'},
  {name: 'Barricade',           stamina: 30, duration: 90,   minCastLevel: 1200, treeId: 1, skillId: 98,  nicks: 'barricade,bar'},
  {name: 'Coordinated Defense', stamina: 30, duration: 90,   minCastLevel: 1200, treeId: 1, skillId: 119, nicks: 'coordinated defense,cd'},
  {name: 'Degrade',             stamina: 30, duration: 90,   minCastLevel: 1200, treeId: 1, skillId: 121, nicks: 'degrade,deg,dg'},
  {name: 'Retaliate',           stamina: 30, duration: 60,   minCastLevel: 1400, treeId: 1, skillId: 123, nicks: 'retaliate,ret'},
  {name: 'Shame',               stamina: 35, duration: 60,   minCastLevel: 1400, treeId: 1, skillId: 110, nicks: 'shame'},
  {name: 'Dispel Curse',        stamina: 35, duration: 60,   minCastLevel: 1400, treeId: 1, skillId: 114, nicks: 'dispel curse,dispel'},
  {name: 'Anchored',            stamina: 30, duration: 60,   minCastLevel: 1600, treeId: 1, skillId: 154, nicks: 'anchored, anch, anchor'},
  {name: 'Hardened',            stamina: 30, duration: 60,   minCastLevel: 1600, treeId: 1, skillId: 153, nicks: 'hardened, hard, harden'},
  {name: 'Armor Boost',         stamina: 30, duration: 60,   minCastLevel: 1600, treeId: 1, skillId: 136, nicks: 'armor boost, armbst, arm bst, armb'},
  {name: 'Shield Wall',         stamina: 30, duration: 60,   minCastLevel: 1600, treeId: 1, skillId: 135, nicks: 'shield wall, shldwll, sw'},
  {name: 'Layered Armor',       stamina: 40, duration: 60,   minCastLevel: 2000, treeId: 1, skillId: 170, nicks: 'layered armor'},
  {name: 'Defensive Aura',      stamina: 40, duration: 60,   minCastLevel: 2500, treeId: 1, skillId: 171, nicks: 'defensive aura'},
  {name: 'Fumble',              stamina: 40, duration: 180,  minCastLevel: 3000, treeId: 1, skillId: 172, nicks: 'fumble'},
  {name: 'Find Item',           stamina: 10, duration: 60,   minCastLevel: 1,    treeId: 2, skillId: 16,  nicks: 'find item,fi'},
  {name: 'Treasure Hunter',     stamina: 15, duration: 120,  minCastLevel: 1,    treeId: 2, skillId: 17,  nicks: 'treasure hunter,th,treas hunter'},
  {name: 'Deep Pockets',        stamina: 10, duration: 90,   minCastLevel: 1,    treeId: 2, skillId: 22,  nicks: 'deep pockets,dp'},
  {name: 'Quest Finder',        stamina: 5,  duration: 90,   minCastLevel: 1,    treeId: 2, skillId: 61,  nicks: 'quest finder,qf'},
  {name: 'Adept Learner',       stamina: 10, duration: 90,   minCastLevel: 25,   treeId: 2, skillId: 19,  nicks: 'adept learner,al'},
  {name: 'Defiance',            stamina: 15, duration: 120,  minCastLevel: 25,   treeId: 2, skillId: 18,  nicks: 'defiance'},
  {name: 'Librarian',           stamina: 10, duration: 60,   minCastLevel: 75,   treeId: 2, skillId: 20,  nicks: 'librarian,lib,libr'},
  {name: 'Merchant',            stamina: 10, duration: 60,   minCastLevel: 75,   treeId: 2, skillId: 21,  nicks: 'merchant,merch,merc'},
  {name: 'Last Ditch',          stamina: 15, duration: 120,  minCastLevel: 150,  treeId: 2, skillId: 23,  nicks: 'last ditch,ld'},
  {name: 'Animal Magnetism',    stamina: 10, duration: 60,   minCastLevel: 200,  treeId: 2, skillId: 24,  nicks: 'animal magnetism,animag,ani mag,am'},
  {name: 'Empower',             stamina: 20, duration: 60,   minCastLevel: 200,  treeId: 2, skillId: 25,  nicks: 'empower,emp'},
  {name: 'Doubler',             stamina: 5,  duration: 120,  minCastLevel: 200,  treeId: 2, skillId: 26,  nicks: 'doubler,doub,db'},
  {name: 'Conserve',            stamina: 10, duration: 45,   minCastLevel: 250,  treeId: 2, skillId: 39,  nicks: 'conserve,cons,consv,con'},
  {name: 'Brewing Master',      stamina: 10, duration: 30,   minCastLevel: 250,  treeId: 2, skillId: 40,  nicks: 'brewing master,bm,brm,brewm'},
  {name: 'Four Leaf',           stamina: 20, duration: 60,   minCastLevel: 250,  treeId: 2, skillId: 41,  nicks: 'four leaf,4l,fl'},
  {name: 'Extend',              stamina: 30, duration: 30,   minCastLevel: 300,  treeId: 2, skillId: 42,  nicks: 'extend,ext'},
  {name: 'Inventor',            stamina: 15, duration: 60,   minCastLevel: 400,  treeId: 2, skillId: 62,  nicks: 'inventor,inv,invI,inv1,inventor1,inventor 1,inventor i,inv i,inv 1'},
  {name: 'Extractor',           stamina: 15, duration: 60,   minCastLevel: 400,  treeId: 2, skillId: 63,  nicks: 'extractor,extr'},
  {name: 'Inventor II',         stamina: 20, duration: 60,   minCastLevel: 500,  treeId: 2, skillId: 64,  nicks: 'inventor ii,inventorii,invii,inv2,inventor 2,inv ii,inv 2'},
  {name: 'Buff Master',         stamina: 10, duration: 60,   minCastLevel: 500,  treeId: 2, skillId: 65,  nicks: 'buff master,buffm,bum'},
  {name: 'Reflection',          stamina: 10, duration: 90,   minCastLevel: 600,  treeId: 2, skillId: 66,  nicks: 'reflection,ref,refl,reflect'},
  {name: 'Guild Buffer',        stamina: 10, duration: 90,   minCastLevel: 600,  treeId: 2, skillId: 160, nicks: 'guild buffer, gldbfr, gb'},
  {name: 'Light Foot',          stamina: 15, duration: 120,  minCastLevel: 700,  treeId: 2, skillId: 67,  nicks: 'light foot,lf'},
  {name: 'Mesmerize',           stamina: 20, duration: 60,   minCastLevel: 700,  treeId: 2, skillId: 68,  nicks: 'mesmerize,mesmer,mes,mez'},
  {name: 'Resource Finder',     stamina: 25, duration: 90,   minCastLevel: 800,  treeId: 2, skillId: 76,  nicks: 'resource finder,rf'},
  {name: 'Quest Hunter',        stamina: 25, duration: 120,  minCastLevel: 800,  treeId: 2, skillId: 166, nicks: 'quest hunter'},
  {name: 'Gloat',               stamina: 10, duration: 30,   minCastLevel: 900,  treeId: 2, skillId: 81,  nicks: 'gloat'},
  {name: 'Sacrifice',           stamina: 25, duration: 90,   minCastLevel: 900,  treeId: 2, skillId: 75,  nicks: 'sacrifice,sac'},
  {name: 'Reckoning',           stamina: 25, duration: 60,   minCastLevel: 900,  treeId: 2, skillId: 72,  nicks: 'reckoning,rec,rek'},
  {name: 'Reinforce',           stamina: 30, duration: 90,   minCastLevel: 1000, treeId: 2, skillId: 126, nicks: 'reinforce,rein'},
  {name: 'Bodyguard',           stamina: 30, duration: 120,  minCastLevel: 1000, treeId: 2, skillId: 120, nicks: 'bodyguard,bg'},
  {name: 'Riposte',             stamina: 30, duration: 60,   minCastLevel: 1000, treeId: 2, skillId: 124, nicks: 'riposte,rip'},
  {name: 'Severe Condition',    stamina: 30, duration: 90,   minCastLevel: 1000, treeId: 2, skillId: 101, nicks: 'severe condition,sc'},
  {name: 'Sealed',              stamina: 35, duration: 60,   minCastLevel: 1200, treeId: 2, skillId: 112, nicks: 'sealed,seal'},
  {name: 'Righteous',           stamina: 30, duration: 90,   minCastLevel: 1200, treeId: 2, skillId: 107, nicks: 'righteous,right'},
  {name: 'Epic Forge',          stamina: 30, duration: 90,   minCastLevel: 1200, treeId: 2, skillId: 102, nicks: 'epic forge,ef'},
  {name: 'Golden Shield',       stamina: 30, duration: 60,   minCastLevel: 1200, treeId: 2, skillId: 103, nicks: 'golden shield,gs'},
  {name: 'Stalker',             stamina: 35, duration: 90,   minCastLevel: 1400, treeId: 2, skillId: 125, nicks: 'stalker,stalk'},
  {name: 'Ageless',             stamina: 30, duration: 90,   minCastLevel: 1400, treeId: 2, skillId: 100, nicks: 'ageless,age'},
  {name: 'Extractor II',        stamina: 30, duration: 60,   minCastLevel: 1400, treeId: 2, skillId: 104, nicks: 'extractor ii,extractorii,extii,ext2,extractor 2,ext ii,ext 2'},
  {name: 'Epic Craft',          stamina: 30, duration: 60,   minCastLevel: 1600, treeId: 2, skillId: 159, nicks: 'epic craft, epc crft, epccrft, ec'},
  {name: 'Gold Foot',           stamina: 20, duration: 120,  minCastLevel: 1600, treeId: 2, skillId: 137, nicks: 'gold foot, goldfoot, gldft, gf'},
  {name: 'Titan Doubler',       stamina: 40, duration: 120,  minCastLevel: 2000, treeId: 2, skillId: 167, nicks: 'titan doubler'},
  {name: 'Teleport',            stamina: 40, duration: 60,   minCastLevel: 2500, treeId: 2, skillId: 168, nicks: 'teleport'},
  {name: 'Invigorate',          stamina: 40, duration: 90,   minCastLevel: 3000, treeId: 2, skillId: 169, nicks: 'invigorate'}
];

/* eslint-disable max-lines */
var mySimpleCheckboxes = {
  moveGuildList: {
    id: 'moveGuildList',
    helpTitle: 'Move Guild Info List',
    helpText: 'This will Move the Guild Info List higher ' +
      'on the bar on the right'
  },
  moveOnlineAlliesList: {
    id: 'moveOnlineAlliesList',
    helpTitle: 'Move Online Allies List',
    helpText: 'This will Move the Online Allies List higher ' +
      'on the bar on the right'
  },
  enableOnlineAlliesWidgets: {
    id: 'enableOnlineAlliesWidgets',
    helpTitle: 'Enable Online Allies Widgets',
    helpText: 'Enabling this option will enable the Allies List ' +
      'Widgets (coloring on the Allies List panel)'
  },
  moveFSBox: {
    id: 'moveFSBox',
    helpTitle: 'Move FS box',
    helpText: 'This will move the FS box to the left, under the menu, ' +
      'for better visibility (unless it is already hidden.)'
  },
  gameHelpLink: {
    id: 'gameHelpLink',
    helpTitle: '&quot;Game Help&quot; Settings Link',
    helpText: 'This turns the Game Help text in the lower ' +
      'right box into a link to this settings page.'
  },
  enableTempleAlert: {
    id: 'enableTempleAlert',
    helpTitle: 'Enable Temple Alert',
    helpText: 'Puts an alert on the LHS if you have not ' +
      'prayed at the temple today.',
    network: true
  },
  enableUpgradeAlert: {
    id: 'enableUpgradeAlert',
    helpTitle: 'Enable Gold Upgrade Alert',
    helpText: 'Puts an alert on the LHS if you have not upgraded your ' +
      'stamina with gold today.',
    network: true
  },
  enableComposingAlert: {
    id: 'enableComposingAlert',
    helpTitle: 'Enable Composing Alert',
    helpText: 'Puts an alert on the LHS if you have composing ' +
      'slots available.',
    network: true
  },
  enhanceOnlineDots: {
    id: 'enhanceOnlineDots',
    helpTitle: 'Enhance Online Dots',
    helpText: 'Enhances the green/grey dots by player names to show ' +
      'online/offline status.'
  },
  hideBuffSelected: {
    id: 'hideBuffSelected',
    helpTitle: 'Hide Buff Selected',
    helpText: 'Hides the buff selected functionality in the online allies ' +
      'and guild info section.'
  },
  hideHelperMenu: {
    id: 'hideHelperMenu',
    helpTitle: 'Hide Helper Menu',
    helpText: 'Hides the helper menu from top left.'
  },
  keepHelperMenuOnScreen: {
    id: 'keepHelperMenuOnScreen',
    helpTitle: 'Keep Helper Menu On Screen',
    helpText: 'Keeps helper menu on screen as you scroll (helper ' +
      'menu must be enabled to work). Also works with quick links.'
  },
  showAdmin: {
    id: 'showAdmin',
    helpTitle: 'Show rank controls',
    helpText: 'Show ranking controls for guild managemenet in member ' +
      'profile page - this works for guild founders only'
  },
  ajaxifyRankControls: {
    id: 'ajaxifyRankControls',
    helpTitle: 'AJAXify rank controls',
    helpText: 'Enables guild founders with ranking rights to change rank ' +
      'positions without a screen refresh.'
  },
  detailedConflictInfo: {
    id: 'detailedConflictInfo',
    helpTitle: 'Show Conflict Details',
    helpText: 'Inserts detailed conflict information onto your guild\'s ' +
      'manage page. Currently displays the target guild as well as ' +
      'the current score.',
    network: true
  },
  showCombatLog: {
    id: 'showCombatLog',
    helpTitle: 'Show Combat Log',
    helpText: 'This will show the combat log for each automatic ' +
      'battle below the monster list.'
  },
  enableCreatureColoring: {
    id: 'enableCreatureColoring',
    helpTitle: 'Color Special Creatures',
    helpText: 'Creatures will be colored according to their rarity. ' +
      'Champions will be colored green, Elites yellow and Super Elites red.'
  },
  showCreatureInfo: {
    id: 'showCreatureInfo',
    helpTitle: 'Show Creature Info',
    helpText: 'This will show the information from the view creature ' +
      'link when you mouseover the link.',
    network: true
  },
  fsboxlog: {
    id: 'fsboxlog',
    helpTitle: 'Enable FS Box Log',
    helpText: 'This enables the functionality to keep a log of ' +
      'recent seen FS Box message.'
  },
  keepBuffLog: {
    id: 'keepBuffLog',
    helpTitle: 'Enable Buff Log',
    helpText: 'This enables the functionality to keep a log of ' +
      'recently casted buffs'
  },
  huntingMode: {
    id: 'huntingMode',
    helpTitle: 'Enable Hunting Mode',
    helpText: 'This disable menu and some visual features to ' +
      'speed up the calf.'
  },
  hideNonPlayerGuildLogMessages: {
    id: 'hideNonPlayerGuildLogMessages',
    helpTitle: 'Cleanup Guild Log',
    helpText: 'Any log messages not related to the current player ' +
      'will be dimmed (e.g. recall messages from guild store)'
  },
  useNewGuildLog: {
    id: 'useNewGuildLog',
    helpTitle: 'Use New Guild Log',
    helpText: 'This will replace the standard guild log with the ' +
      'helper version of the guild log.'
  },
  enableLogColoring: {
    id: 'enableLogColoring',
    helpTitle: 'Enable Log Coloring',
    helpText: 'Three logs will be colored if this is enabled, ' +
      'Guild Chat, Guild Log and Player Log. It will show any new ' +
      'messages in yellow and anything 20 minutes old ones in brown.'
  },
  enableChatParsing: {
    id: 'enableChatParsing',
    helpTitle: 'Enable Chat Parsing',
    helpText: 'If this is checked, your character log will be parsed for ' +
      'chat messages and show the chat message on the screen if you reply ' +
      'to that message.'
  },
  addAttackLinkToLog: {
    id: 'addAttackLinkToLog',
    helpTitle: 'Add attack link to log',
    helpText: 'If checked, this will add an Attack link to each message ' +
      'in your log.'
  },
  enhanceChatTextEntry: {
    id: 'enhanceChatTextEntry',
    helpTitle: 'Enhance Chat Text Entry',
    helpText: 'If checked, this will enhance the entry field for entering ' +
      'chat text on the guild chat page.'
  },
  showExtraLinks: {
    id: 'showExtraLinks',
    helpTitle: 'Show Extra Links',
    helpText: 'If checked, this will add AH and UFSG ' +
      'links to equipment screens.'
  },
  disableItemColoring: {
    id: 'disableItemColoring',
    helpTitle: 'Disable Item Coloring',
    helpText: 'Disable the code that colors the item text based on the ' +
      'rarity of the item.'
  },
  showQuickDropLinks: {
    id: 'showQuickDropLinks',
    helpTitle: 'Show Quick Drop Item',
    helpText: 'This will show a link beside each item which gives the ' +
      'option to drop the item.  WARNING: NO REFUNDS ON ERROR'
  },
  storeLastQuestPage: {
    id: 'storeLastQuestPage',
    helpTitle: 'Store Last Quest Page',
    helpText: 'This will store the page and sort order of each of the ' +
      'three quest selection pages for next time you visit. If you need ' +
      'to reset the links, turn this option off, click on the link you ' +
      'wish to reset and then turn this option back on again.'
  },
  showNextQuestSteps: {
    id: 'showNextQuestSteps',
    helpTitle: 'Show Next Quest Steps',
    helpText: 'Shows all quest steps in the UFSG.'
  },
  renderSelfBio: {
    id: 'renderSelfBio',
    helpTitle: 'Render self bio',
    helpText: 'This determines if your own bio will render the FSH ' +
      'special bio tags.'
  },
  renderOtherBios: {
    id: 'renderOtherBios',
    helpTitle: 'Render other players&#39; bios',
    helpText: 'This determines if other players bios will render the FSH ' +
      'special bio tags.'
  },
  showStatBonusTotal: {
    id: 'showStatBonusTotal',
    helpTitle: 'Show Stat Bonus Total',
    helpText: 'This will show a total of the item stats when you ' +
      'mouseover an item on the profile screen.'
  },
  enableQuickDrink: {
    id: 'enableQuickDrink',
    helpTitle: 'Enable Quick Drink/Wear',
    helpText: 'This enables the quick drink/wear functionality on the ' +
      'profile page.'
  },
  disableDeactivatePrompts: {
    id: 'disableDeactivatePrompts',
    helpTitle: 'Disable Deactivate Prompts',
    helpText: 'This disables the prompts for deactivating buffs on ' +
      'the profile page.'
  },
  enableAttackHelper: {
    id: 'enableAttackHelper',
    helpTitle: 'Show Attack Helper',
    helpText: 'This will show extra information on the attack player ' +
      'screen about stats and buffs on you and your target',
    network: true
  },
  showPvPSummaryInLog: {
    id: 'showPvPSummaryInLog',
    helpTitle: 'Show PvP Summary in Log',
    helpText: 'This will show a summary of the PvP results in the log.',
    network: true
  },
  autoFillMinBidPrice: {
    id: 'autoFillMinBidPrice',
    helpTitle: 'Auto Fill Min Bid Price',
    helpText: 'This enables the functionality to automatically fill in ' +
      'the min bid price so you just have to hit bid and your bid will ' +
      'be placed.'
  },
  hideRelicOffline: {
    id: 'hideRelicOffline',
    helpTitle: 'Hide Relic Offline',
    helpText: 'This hides the relic offline defenders checker.'
  },
  enterForSendMessage: {
    id: 'enterForSendMessage',
    helpTitle: 'Enter Sends Message',
    helpText: 'If enabled, will send a message from the Send Message ' +
      'screen if you press enter. You can still insert a new line by ' +
      'holding down shift when you press enter.'
  },
  navigateToLogAfterMsg: {
    id: 'navigateToLogAfterMsg',
    helpTitle: 'Navigate After Message Sent',
    helpText: 'If enabled, will navigate to the referring page after a ' +
      'successful message is sent. Example:  if you are on the world ' +
      'screen and hit message on the guild info panel after you send the ' +
      'message, it will return you to the world screen.'
  },
  moveComposingButtons: {
    id: 'moveComposingButtons',
    helpTitle: 'Move Composing Buttons',
    helpText: 'If enabled, will move composing buttons to the top of ' +
      'the composing screen.'
  },
  draggableHelperMenu: {
    id: 'draggableHelperMenu',
    helpTitle: 'Draggable Helper Menu',
    helpText: 'If enabled, allows the helper menu to ' +
      'be dragged around the screen.'
  },
  draggableQuickLinks: {
    id: 'draggableQuickLinks',
    helpTitle: 'Draggable Quick Links',
    helpText: 'If enabled, allows the quick link box to ' +
      'be dragged around the screen.'
  },
  expandMenuOnKeyPress: {
    id: 'expandMenuOnKeyPress',
    helpTitle: 'Expand Menu on Key Press',
    helpText: 'If enabled, expands the left hand menu ' +
      'when you use hotkeys.'
  },
  disableBreakdownPrompts: {
    id: 'disableBreakdownPrompts',
    helpTitle: 'Disable Breakdown Prompts',
    helpText: 'If enabled, will disable prompts when you breakdown items.' +
      '<br>NO REFUNDS OR DO-OVERS! Use at own risk.'
  },
  collapseNewsArchive: {
    id: 'collapseNewsArchive',
    helpTitle: 'Collapse News Archive',
    helpText: 'If enabled, will collapse news archives.'
  },
  hideSubLvlCreature: {
    id: 'hideSubLvlCreature',
    helpTitle: 'Hide Sub Level Creatures',
    helpText: 'If enabled, will hide creatures that are ' +
      'lower than the current realm level.'
  },
  hidePlayerActions: {
    id: 'hidePlayerActions',
    helpTitle: 'Hide Player Actions',
    helpText: 'If enabled, will hide player actions.'
  },
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
        'separated by commas') + ':</td><td colspan="3">' +
      '<input name="wantedNames" size="60" value="' + calf.wantedNames +
      '"></td></tr>' +

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

function generalPrefs() {
  // General Prefs
  return '<tr><th colspan="2"><b>General preferences ' +
      '(apply to most screens)</b></th></tr>' +

    '<tr><td class="fshRight">' +
      '<label for="enableGuildInfoWidgets">' +
      'Enable Guild Info Widgets' +
      helpLink('Enable Guild Info Widgets',
        'Enabling this option will enable the Guild Info Widgets ' +
        '(coloring on the Guild Info panel)') + ':</label></td><td>' +
      '<input id="enableGuildInfoWidgets" name="enableGuildInfoWidgets" ' +
      'type="checkbox" value="on"' +
      isChecked(calf.enableGuildInfoWidgets) +
      '>&nbsp;' +
      '<label>Hide Message&gt;<input name="hideGuildInfoMessage" ' +
      'type="checkbox" value="on"' +
      isChecked(calf.hideGuildInfoMessage) +
      '></label>&nbsp;' +
      '<label>Hide Buff&gt;<input name="hideGuildInfoBuff" ' +
      'type="checkbox" value="on"' +
      isChecked(calf.hideGuildInfoBuff) +
      '></label>&nbsp;' +
      '<label>Hide ST&gt;<input name="hideGuildInfoSecureTrade" ' +
      'type="checkbox" value="on"' +
      isChecked(calf.hideGuildInfoSecureTrade) +
      '></label>&nbsp;' +
      '<label>Hide Trade&gt;<input name="hideGuildInfoTrade" ' +
      'type="checkbox" value="on"' +
      isChecked(calf.hideGuildInfoTrade) +
      '></label></td></tr>' +

    simpleCheckbox('moveGuildList') +
    simpleCheckbox('moveOnlineAlliesList') +

    '<tr><td class="fshRight">' + networkIcon +
      'Show Online Allies/Enemies' +
      helpLink('Show Online Allies/Enemies',
        'This will show the allies/enemies online list on the right.') +
      ':</td><td><label>Allies&nbsp;<input name="enableAllyOnlineList" ' +
      'type="checkbox" value="on"' +
      isChecked(calf.enableAllyOnlineList) +
      '></label>&nbsp;&nbsp;<label>Enemies&nbsp;' +
      '<input name="enableEnemyOnlineList" type="checkbox" value="on"' +
      isChecked(calf.enableEnemyOnlineList) +
      '></label>&nbsp;&nbsp;' +
      '<input name="allyEnemyOnlineRefreshTime" size="3" value="' +
      getValue('allyEnemyOnlineRefreshTime') +
      '"> seconds refresh</td></tr>' +

    simpleCheckbox('enableOnlineAlliesWidgets') +
    simpleCheckbox('moveFSBox') +
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

    '<tr><td class="fshRight">Quick Links Screen Location' +
      helpLink('Quick Links Screen Location',
        'Determines where the quick links dialog shows on the screen. ' +
        'Default is top 22, left 0.') +
      ':</td><td>Top: <input name="quickLinksTopPx" size="3" value="' +
      getValue('quickLinksTopPx') +
      '"> Left: <input name="quickLinksLeftPx" size="3" value="' +
      getValue('quickLinksLeftPx') +
      '"></td></tr>' +
    simpleCheckbox('draggableQuickLinks') +
    simpleCheckbox('expandMenuOnKeyPress');
}

function injectSettingsGuildData(guildType) {
  return '<input name="guild' + guildType + '" size="60" value="' +
    getValue('guild' + guildType) + '">' +
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

function prefs() {
  // World Screen
  return '<tr><th colspan="2"><b>' +
    'World screen/Hunting preferences</b></th></tr>' +

    worldGroup() +

    '<tr><td class="fshRight">Keep Combat Logs' +
      helpLink('Keep Combat Logs',
        'Save combat logs to a temporary variable. ' +
        'Press <u>Show logs</u> on the right to display and copy them') +
      ':</td><td><input name="keepLogs" type="checkbox" value="on"' +
      isChecked(getValue('keepLogs')) + '>&nbsp;&nbsp;' +
      '<input type="button" class="custombutton" value="Show Logs" ' +
      'id="Helper:ShowLogs"></td></tr>' +

    simpleCheckbox('showCombatLog') +
    simpleCheckbox('enableCreatureColoring') +
    simpleCheckbox('showCreatureInfo') +

    combatEvalBias() +

    '<tr><td class="fshRight">' + networkIcon + 'Keep Creature Log' +
      helpLink('Keep Creature Log',
        'This will show the creature log for each creature you see when ' +
        'you travel.') +
      ':</td><td><input name="showMonsterLog" type="checkbox" value="on"' +
      isChecked(getValue('showMonsterLog')) + '>' +
      '&nbsp;&nbsp;<input type="button" class="custombutton" ' +
      'value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +

    '<tr><td class="fshRight">Show Send Gold' +
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
      getValue('currentGoldSentTotal') + '">' +
      '</td></tr>' +

    '<tr><td class="fshRight">Do Not Kill List' +
      helpLink('Do Not Kill List',
        'List of creatures that will not be killed by quick kill. ' +
        'You must type the full name of each creature, separated by commas. ' +
        'Creature name will show up in red color on world screen and will ' +
        'not be killed by keyboard entry (but can still be killed by ' +
        'mouseclick). Quick kill must be enabled for this function to work.') +
      ':</td><td colspan="3"><input name="doNotKillList" size="60" value="' +
      calf.doNotKillList + '"></td></tr>' +

    huntingBuffs() +

    '<tr><td class="fshRight">' + calf.buffsName + ' Hunting Buff List' +
      helpLink(calf.buffsName + ' Hunting Buff List',
        calf.buffsName + ' list of hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffsName" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffsName +
      '"><input name="huntingBuffs" size="49" value="' + calf.buffs +
      '"></td></tr>' +
    '<tr><td class="fshRight">' + calf.buffs2Name + ' Hunting Buff List' +
      helpLink(calf.buffs2Name + ' Hunting Buff List',
        'List of ' + calf.buffs2Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs2Name" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffs2Name +
      '"><input name="huntingBuffs2" size="49" value="' + calf.buffs2 +
      '"></td></tr>' +
    '<tr><td class="fshRight">' + calf.buffs3Name + ' Hunting Buff List' +
      helpLink(calf.buffs3Name + ' Hunting Buff List',
        'List of ' + calf.buffs3Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs3Name" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffs3Name +
      '"><input name="huntingBuffs3" size="49" value="' + calf.buffs3 +
      '"></td></tr>' +

    simpleCheckbox('huntingMode');
}

function setupConfigData() {
  calf.configData =
    '<form><table id="fshSettingsTable">' +
    '<thead><th colspan="2"><b>Fallen Sword Helper configuration ' +
      'Settings</b></th></thead>' +
    '<tr><td align=center><input id="fshClearStorage" type="button" ' +
      'class="awesome magenta tip-static" value="Clear Storage" ' +
      'data-tipped="<span class=\'fshHelpTitle\'>Clear Storage' +
      '</span><br><br>This will clear all localStorage related to ' +
      'fallensword.com<br>It will reset all your Helper settings to ' +
      'defaults<br>Use it if your storage has overflowed or become ' +
      'corrupt"></td><td align=center>' +
      '<span style="font-size:x-small">(Current version: ' +
      FSH.version + '(' + FSH.calf + ')) (Storage Used: ' +
      calf.storage + '% Remaining: ' +
      (100 - calf.storage).toFixed(2) + '%)</span></td></tr>' +
    '<tr><td colspan="2" align=center>' +
      '<span style="font-weight:bold;">Visit the ' +
      '<a href="https://github.com/fallenswordhelper/fallenswordhelper">' +
      'Fallen Sword Helper web site</a> ' +
      'for any suggestions, requests or bug reports</span></td></tr>' +

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
    // http://www.fallensword.com/index.php?cmd=notepad&blank=1&subcmd=savesettings
    '<tr><td colspan="2" align=center><input type="button" class=' +
      '"custombutton" value="Save" id="Helper:SaveOptions"></td></tr>' +
    '<tr><td colspan="2" align=center><a href="' + server +
      'index.php?cmd=notepad&blank=1&subcmd=savesettings">Export or Load ' +
      'Settings!</a></td></tr>' +
    '<tr><td colspan="2" align=center>' +
      '<span style="font-size:xx-small">Fallen Sword Helper was coded by ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=1393340">Coccinella</a>, ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=1599987">yuuzhan</a>, ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=1963510">PointyHair</a>, ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=1346893">Tangtop</a>, ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=2536682">dkwizard</a>, ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=1570854">jesiegel</a>, ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=2156859">ByteBoy</a>, and ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=2169401">McBush</a>, ' +
      'with valuable contributions by ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=524660">Nabalac</a>, ' +
      '<a href="' + server +
      'index.php?cmd=profile&player_id=37905">Ananasii</a></span></td></tr>' +
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

function helpLink(title, text) {
  return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="' +
    '<span class=\'fshHelpTitle\'>' + title + '</span><br><br>' +
    text + '">?</span>&nbsp;]';
}

function hasNetwork(o) {
  if (o.network) {return networkIcon;}
  return '';
}

function isOn(o) {
  return isChecked(getValue(o.id));
}

function justLabel(name) {
  var o = mySimpleCheckboxes[name];
  return hasNetwork(o) +
    '<label for="' + o.id + '">' + o.helpTitle +
    helpLink(o.helpTitle, o.helpText) +
    ':</label>';
}

function justCheckbox(name) {
  var o = mySimpleCheckboxes[name];
  return '<input id="' + o.id + '" name="' + o.id +
    '" class="fshVMid" type="checkbox" value="on"' + isOn(o) + '>';
}

function simpleCheckboxHtml(name) {
  return justLabel(name) + justCheckbox(name);
}

function simpleCheckbox(name) {
  return '<tr><td align="right">' + justLabel(name) +
    '</td><td>' + justCheckbox(name) + '</td></tr>';
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
  confirm('Clear localStorage',
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
  document.location = server +
    'index.php?cmd=notepad&blank=1&subcmd=showlogs';
}

function showMonsterLogs() {
  document.location = server +
    'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
}

function createEventListeners() {
  var tickAll = createSpan({
    id: 'fshAllBuffs',
    className: 'fshLink',
    textContent: 'Tick all buffs'
  });
  tickAll.addEventListener('click', toggleTickAllBuffs);
  var inject = document.getElementById('settingsTabs-4').firstElementChild
    .rows[0].cells[0];
  inject.appendChild(createBr());
  inject.appendChild(tickAll);

  document.getElementById('fshClearStorage')
    .addEventListener('click', clearStorage);

  document.getElementById('Helper:SaveOptions')
    .addEventListener('click', saveConfig);
  document.getElementById('Helper:ShowLogs')
    .addEventListener('click', showLogs);
  document.getElementById('Helper:ShowMonsterLogs')
    .addEventListener('click', showMonsterLogs);

  document.getElementById('toggleShowGuildSelfMessage')
    .addEventListener('click', toggleVisibilty);
  document.getElementById('toggleShowGuildFrndMessage')
    .addEventListener('click', toggleVisibilty);
  document.getElementById('toggleShowGuildPastMessage')
    .addEventListener('click', toggleVisibilty);
  document.getElementById('toggleShowGuildEnmyMessage')
    .addEventListener('click', toggleVisibilty);
}

function injectSettings() { // jQuery.min
  getVars();
  setupConfigData();
  var settingsTabs = document.getElementById('settingsTabs');
  settingsTabs.insertAdjacentHTML('beforeend', '<div id="fshSettings">' +
    calf.configData + '</div>');
  if ($(settingsTabs).tabs('length') > 0) {
    $(settingsTabs).tabs('add', '#fshSettings', 'FSH Settings');
  }
  createEventListeners();
  setValue('minGroupLevel', document.getElementById('settingsTabs-1')
    .firstElementChild.lastElementChild.rows[1].cells[1].firstElementChild
    .value);
}

var sustainLevelRE = /Level<br>(\d+)%/;
var buffCustom = {
  header: 'Buff',
  what: 'buff',
  control: function() {
    var ret = '<select style="width:140px;" id="selectedBuff">';
    for (var j = 0; j < buffList.length; j += 1) {
      ret += '<option value="' + buffList[j].skillId + '">' +
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
var findBuffNicks;
var findBuffMinCastLevel;
var findBuffsLevel175Only;
var onlinePlayers$1;
var onlinePlayersSetting;
var extraProfile;
var profilePagesToSearch;
var profilePagesToSearchProcessed;
var bufferProgress;

function pageLayout(o) { // Legacy
  extraProfile = getValue('extraProfile');
  return '<table class="fshFind"><tbody>' +
    '<tr><td rowspan="2" colspan="2" class="headCell">' +
    '<h1>Find ' + o.header + '</h1></td>' +
    '<td class="findLabel">' +
    'Select ' + o.what + ' to search for:</td>' +
    '<td>' +
    o.control() +
    '</td></tr>' +
    '<tr>' +
    '<td class="findLabel">' +
    'Level ' + o.cutoff + 'ers only:</td>' +
    '<td><input id="level175" type="checkbox"></td></tr>' +
    '<tr><td class="leftLabel">' +
    o.searched +
    ':&nbsp;</td><td id="buffNicks">&nbsp;</td>' +
    '<td class="findLabel">Search guild members:</td>' +
    '<td><input id="guildMembers" type="checkbox" checked>' +
    '</td></tr><tr>' +
    '<td class="findLabel">' +
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
    '<tr><td class="findLabel">' +
    '# ' + o.processed + 'ers processed:' +
    '&nbsp;</td><td id="buffersProcessed">0</td>' +
    '<td class="findLabel">Search online list:</td>' +
    '<td><select class="selectOnline" id="onlinePlayers">' +
      '<option value="0">Disabled</option>' +
      '<option value="49">Short (fastest)</option>' +
      '<option value="47">Medium (medium)</option>' +
      '<option value="45">Long (slowest)</option>' +
    '</select></td></tr>' +
    '<tr><td class="findLabel">' +
    'Find ' + o.progress + ' progress:' +
    '&nbsp;</td><td class="buffProg" id="bufferProgress">Idle</td>' +
    '<td align="center"><input id="clearresultsbutton" ' +
    'class="custombutton" type="button" value="Clear Results"></td>' +
    '<td align="center"><input id="findbuffsbutton" class="custombutton" ' +
    'type="button" value="Find Buffers"></td></tr>' +
    '</tbody></table><br>' +
    '<h1>Potential ' + o.processed + 'ers and Bio Info</h1><br>' +
    '<table class="fshResult" id="buffTable"><tbody>' +
    '<tr><th class="nameCol">&nbsp;Name</th>' +
    '<th class="infoCol">&nbsp;Player Info</th>' +
    '<th>&nbsp;Notable Bio Text</th></tr>' +
    '</tbody></table><br>' +
    '<div class="disclaim">Disclaimer: This ' +
    'functionality does a simple text search for the terms above. ' +
    'It is not as smart as you are, so please do not judge the results ' +
    'too harshly. It does not search all online players, just a subset ' +
    'of those that have been on recently. ' +
    'The aim is to be fast and still return a good set of results. This ' +
    'feature is a work in progress, so it may be tweaked and enhanced ' +
    'over time.</div>';
}

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

function getBioLines(bioCellHtml) { // Legacy
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
  var aLinks = doc.getElementById('profileLeftColumn')
    .getElementsByTagName('a');
  var sustainLevel;
  Array.prototype.some.call(aLinks, function(el) {
    if (el.textContent === 'Sustain') {
      var sustainText = el.parentNode.parentNode.parentNode.nextElementSibling
        .firstElementChild.getAttribute('data-tipped');
      sustainLevel = parseInt(sustainLevelRE.exec(sustainText)[1], 10);
      return true;
    }
    return false;
  });
  return fallback(sustainLevel, -1);
}

function nameCell(doc, callback, lastActivity, bioCellHtml) { // Legacy
  var playerName$$1 = doc.getElementById('pCC')
    .getElementsByTagName('h1')[0].textContent;
  var levelValue = intValue(doc.getElementById('profileLeftColumn')
    .children[4].children[0].rows[0].cells[1].textContent);
  var virtualLevelValue = parseInt(doc.getElementById('stat-vl')
    .textContent, 10);
  var lastActivityMinutes = parseInt(lastActivity[1], 10);
  var lastActivityIMG = onlineDot({min: lastActivityMinutes});
  var playerHREF = callback.href;
  var bioTip = bioCellHtml.replace(/'|"|\n/g, '');
  return '<nobr>' + lastActivityIMG + '&nbsp;<a href="' +
      playerHREF + '" target="new" ' +
      // FIXME - It kind works now, but not guaranteed?
      'class="tip-static" ' +
      'data-tipped="' + bioTip + '">' + playerName$$1 + '</a>' +
      '&nbsp;<span class="fshBlue">[<span class="a-reply fshLink" ' +
      'target_player="' + playerName$$1 + '">m</span>]</span></nobr><br>' +
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

function findBuffsParseProfileAndDisplay(responseText, callback) { // Hybrid - Evil
  var doc = createDocument(responseText);
  // name and level
  var pCC$$1 = doc.getElementById('pCC');
  // last activity
  var lastActivityElement = pCC$$1.getElementsByTagName('p')[0];
  var lastActivity = /(\d+) mins, (\d+) secs/
    .exec(lastActivityElement.textContent);
  // buffs
  var bioCellHtml = doc.getElementById('profile-bio').innerHTML;
  var buffTable = document.getElementById('buffTable');
  var textLineArray = getBioLines(bioCellHtml);
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
  var processedBuffers = document.getElementById('buffersProcessed');
  var potentialBuffers =
    parseInt(document.getElementById('potentialBuffers').textContent, 10);
  var processedBuffersCount = parseInt(processedBuffers.textContent, 10);
  processedBuffers.innerHTML = processedBuffersCount + 1;
  if (potentialBuffers === processedBuffersCount + 1) {
    bufferProgress.innerHTML = 'Done.';
    bufferProgress.style.color = 'blue';
  }
}

function findBuffsParsePlayersForBuffs() { // Legacy
  // remove duplicates TODO
  // var bufferProgress = document.getElementById('bufferProgress');
  // now need to parse player pages for buff ...
  document.getElementById('potentialBuffers').innerHTML =
    onlinePlayers$1.length;
  if (onlinePlayers$1.length <= 0) {
    bufferProgress.innerHTML = 'Done.';
    bufferProgress.style.color = 'blue';
    return;
  }
  bufferProgress.innerHTML = 'Parsing player data ...';
  bufferProgress.style.color = 'green';

  for (var j = 0; j < onlinePlayers$1.length; j += 1) {
    xmlhttp(onlinePlayers$1[j],
      findBuffsParseProfileAndDisplay,
      {href: onlinePlayers$1[j]});
  }
}

function calcMinLvl() { // Legacy
  if (findBuffsLevel175Only) {return 500;}
  return 1;
}

function calcNextPage(curPage, maxPage) { // Legacy
  if (curPage === 1) {return Math.round(onlinePlayersSetting * maxPage / 50);}
  return curPage + 1;
}

function findBuffsParseOnlinePlayers(responseText) { // Legacy
  var doc = createDocument(responseText);
  var playerRows = $(doc).find('table:contains("Username")>tbody>tr:has' +
    '(td>a[href*="cmd=profile&player_id="])');
  var maxPage = parseInt($(doc).find('td:has(input[name="page"]):last')
    .text().replace(/\D/g, ''), 10);
  var curPage = parseInt($(doc).find('input[name="page"]:last').val()
    .replace(/\D/g, ''), 10);
  var characterName = $('dt.stat-name:first').next().text().replace(/,/g, '');
  if (curPage !== 1) {
    playerRows.each(function(i, e) {
      var onlinePlayer = $(e).find('td:eq(1) a').attr('href');
      var onlinePlayerLevel = parseInt($(e).find('td:eq(2)').text()
        .replace(/,/g, ''), 10);
      var onlinePlayerName = $(e).find('td:eq(1) a').text();
      var minPlayerVirtualLevel = calcMinLvl();
      if (onlinePlayerLevel >= findBuffMinCastLevel &&
        onlinePlayerLevel >= minPlayerVirtualLevel) {
        // add online player to search list (all but self)
        if (characterName !== onlinePlayerName.trim()) {
          onlinePlayers$1.push(onlinePlayer);
        }
      }
    });
  }
  if (curPage < maxPage/* -maxPage+15*/) {
    var newPage = calcNextPage(curPage, maxPage);
    bufferProgress.innerHTML = 'Parsing online page ' + curPage + ' ...';
    xmlhttp('index.php?cmd=onlineplayers&page=' + newPage,
      findBuffsParseOnlinePlayers, {page: newPage});
  } else {
    // all done so moving on
    findBuffsParsePlayersForBuffs();
  }
}

function findBuffsParseOnlinePlayersStart() { // Legacy
  // if option enabled then parse online players
  onlinePlayersSetting =
    parseInt(document.getElementById('onlinePlayers').value, 10);
  if (onlinePlayersSetting !== 0) {
    xmlhttp('index.php?cmd=onlineplayers&page=1',
      findBuffsParseOnlinePlayers, {page: 1});
  } else {
    findBuffsParsePlayersForBuffs();
  }
}

function findBuffsParseProfilePage(responseText) { // jQuery
  var doc = createDocument(responseText);
  var characterName = $('dt.stat-name:first').next().text().replace(/,/g, '');
  var profileAlliesEnemies = $(doc).find('#profileLeftColumn')
    .find('a[data-tipped*="Last Activity"]');
  profileAlliesEnemies.each(function(i, e) {
    var onMouseOver = $(e).data('tipped');
    var lastActivity = lastActivityRE.exec(onMouseOver);
    var lastActivityDays = parseInt(lastActivity[1], 10);
    var lastActivityHours = parseInt(lastActivity[2], 10) +
      lastActivityDays * 24;
    var lastActivityMinutes = parseInt(lastActivity[3], 10) +
      lastActivityHours * 60;
    // check if they are high enough level to cast the buff
    var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
    virtualLevel = parseInt(virtualLevel[1].replace(/,/g, ''), 10);
    var minPlayerVirtualLevel = calcMinLvl();
    if (lastActivityMinutes < 5 &&
      virtualLevel >= findBuffMinCastLevel &&
      virtualLevel >= minPlayerVirtualLevel) {
      // add online player to search list (all but self)
      var onlinePlayer = $(e).attr('href');
      if (characterName !== $(e).text().trim()) {
        onlinePlayers$1.push(onlinePlayer);
      }
    }
  });
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
  profilePagesToSearch.push('index.php?cmd=profile');
  var extraProfileArray = extraProfile.split(',');
  extraProfileArray.forEach(function(el) {
    profilePagesToSearch.push('index.php?cmd=findplayer' +
      '&search_active=1&search_level_max=&search_level_min=' +
      '&search_username=' + el + '&search_show_first=1');
  });
  profilePagesToSearchProcessed = 0;
  if (document.getElementById('alliesEnemies').checked) {
    profilePagesToSearch.forEach(function(el) {
      xmlhttp(el, findBuffsParseProfilePage);
    });
  } else {
    findBuffsParseOnlinePlayersStart();
  }
}

function guildMember(characterName, i, e) { // jQuery
  var contactLink = $(e).find('a');
  var onMouseOver = $(contactLink).data('tipped');
  var lastActivity = lastActivityRE.exec(onMouseOver);
  var lastActivityDays = parseInt(lastActivity[1], 10);
  var lastActivityHours = parseInt(lastActivity[2], 10) +
    lastActivityDays * 24;
  var lastActivityMinutes = parseInt(lastActivity[3], 10) +
    lastActivityHours * 60;
  // check if they are high enough level to cast the buff
  var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
  virtualLevel = parseInt(virtualLevel[1].replace(/,/g, ''), 10);
  var minPlayerVirtualLevel = calcMinLvl();
  if (lastActivityMinutes < 5 &&
    virtualLevel >= findBuffMinCastLevel &&
    virtualLevel >= minPlayerVirtualLevel) {
    // add online player to search list (all but self)
    var onlinePlayer = contactLink.attr('href');
    if (characterName !== $(e).find('td:eq(1)')
      .text().trim()) {
      onlinePlayers$1.push(onlinePlayer);
    }
  }
}

function findBuffsParseGuildManagePage(responseText) { // jQuery
  var doc = createDocument(responseText);
  var characterName = $('dt.stat-name:first').next().text().replace(/,/g, '');
  var memberTableRows = $(doc)
    .find('table:has(td:contains("Rank")[bgcolor="#C18B35"]):last')
    .find('tr:gt(1):not(:has(td[colspan="5"]))');
  if (document.getElementById('guildMembers').checked) {
    memberTableRows.each(guildMember.bind(characterName));
  }
  // continue with profile pages
  findBuffsParseProfilePageStart();
}

function findBuffsClearResults() { // Legacy
  var buffTable = document.getElementById('buffTable');
  for (var j = buffTable.rows.length; j > 1; j -= 1) {
    buffTable.deleteRow(j - 1);
  }
  document.getElementById('buffNicks').innerHTML = '';
  // var bufferProgress = document.getElementById('bufferProgress');
  bufferProgress.innerHTML = 'Idle.';
  bufferProgress.style.color = 'black';
  document.getElementById('potentialBuffers').innerHTML = '';
  document.getElementById('buffersProcessed').innerHTML = 0;
}

function findAnyStart(progMsg) {
  document.getElementById('buffNicks').innerHTML = findBuffNicks;
  bufferProgress = document.getElementById('bufferProgress');
  bufferProgress.innerHTML = 'Gathering list of ' + progMsg + ' ...';
  bufferProgress.style.color = 'green';
  findBuffsLevel175Only =
    document.getElementById('level175').checked;
  document.getElementById('buffersProcessed').innerHTML = 0;
  onlinePlayers$1 = [];
  extraProfile = document.getElementById('extraProfile').value;
  setValue('extraProfile', extraProfile);
  // get list of players to search, starting with guild>manage page
  xmlhttp('index.php?cmd=guild&subcmd=manage',
    findBuffsParseGuildManagePage);
}

function findBuffsStart() { // Legacy
  var selectedBuff = parseInt($('#selectedBuff').val(), 10);
  for (var j = 0; j < buffList.length; j += 1) {
    if (selectedBuff === buffList[j].skillId) {
      findBuffNicks = buffList[j].nicks;
      findBuffMinCastLevel = buffList[j].minCastLevel;
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
  content.innerHTML = pageLayout(buffCustom);
  document.getElementById('findbuffsbutton')
    .addEventListener('click', findBuffsStart, true);
  document.getElementById('clearresultsbutton')
    .addEventListener('click', findBuffsClearResults, true);
}

function injectFindOther(injector) { // Native - Bad
  var content = injector || pCC;
  content.innerHTML = pageLayout(otherCustom);
  document.getElementById('findbuffsbutton')
    .addEventListener('click', findOtherStart, true);
  document.getElementById('clearresultsbutton')
    .addEventListener('click', findBuffsClearResults, true);
}

var times = {};
var refAry = ['www.lazywebtools.co.uk', 'refreshthing.com'];

function isAuto() {
  var docRef = document.referrer
    .match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  if (docRef) {docRef = docRef[1];}
  return refAry.indexOf(docRef) !== -1;
}

function start(category, variable, label) {
  if (isAuto() || typeof ga === 'undefined') {return;}
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
  if (isAuto() || typeof ga === 'undefined') {return;}
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
  if (isAuto() || typeof ga === 'undefined') {return;}

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
  if (isAuto() || typeof ga === 'undefined') {return;}
  ga('fshApp.send', 'screenview', {screenName: funcName});
}

var param;

function detailRow(j, itemField) { // Legacy
  if (param.tags[j] === 'checkbox') {
    return '<input type="checkbox"' + isChecked(itemField) +
      ' disabled>';
  } else if (param.url && param.url[j] !== '') {
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
  for (var i = 0; i < param.currentItems.length; i += 1) {
    var item = param.currentItems[i];
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
  }
  result += doInputs();
  result += '<td><span class="HelperTextLink" id="fshAdd">' +
    '[Add]</span></td></tr></table>' +
    '<table width="100%"><tr><td class="fshCenter">' +
    '<textarea cols=70 rows=20 name="fshEd">' +
    JSON.stringify(param.currentItems) + '</textarea></td></tr>' +
    '<tr><td class="fshCenter"><input id="fshSave" ' +
    'type="button" value="Save" class="custombutton">' +
    '&nbsp;<input id="fshReset" type="button" value="Reset" ' +
    'class="custombutton"></td></tr>' +
    '</tbody></table>';
  document.getElementById(param.id).innerHTML = result;
  setValueJSON(param.gmname, param.currentItems);
}

function deleteQuickItem(evt) { // Legacy
  var itemId = evt.target.getAttribute('data-itemId');
  param.currentItems.splice(itemId, 1);
  generateManageTable();
}

function buildNewItem() { // Legacy
  var newItem = {};
  for (var i = 0; i < param.fields.length; i += 1) {
    if (param.tags[i] === 'checkbox') {
      newItem[param.fields[i]] =
        document.getElementById('fshIn' + param.fields[i]).checked;
    } else {
      newItem[param.fields[i]] =
        document.getElementById('fshIn' + param.fields[i]).value;
    }
  }
  return newItem;
}

function addQuickItem() { // Legacy
  var isArrayOnly = param.fields.length === 0;
  var newItem = {};
  if (isArrayOnly) {
    newItem = document.getElementById('fshIn0').value;
  } else {
    newItem = buildNewItem();
  }
  param.currentItems.push(newItem);
  generateManageTable();
}

function saveRawEditor() { // jQuery
  param.currentItems =
    JSON.parse($('textarea[name="fshEd"]').val());
  generateManageTable();
}

function resetRawEditor() { // Legacy
  if (location.search === '?cmd=notepad&blank=1&subcmd=auctionsearch') {
    param.currentItems =
      JSON.parse(defaults.quickSearchList);
  } else {param.currentItems = [];}
  generateManageTable();
}

var listEvents = [
  {test: function(e) {return e.target.id === 'fshReset';}, fn: resetRawEditor},
  {test: function(e) {return e.target.id === 'fshSave';}, fn: saveRawEditor},
  {test: function(e) {return e.target.id === 'fshAdd';}, fn: addQuickItem},
  {
    test: function(e) {return e.target.id.indexOf('fshDel') === 0;},
    fn: deleteQuickItem
  }
];

function listEvtHnl(e) {
  for (var i = 0; i < listEvents.length; i += 1) {
    if (listEvents[i].test(e)) {
      listEvents[i].fn(e);
      return;
    }
  }
}

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
      'index.php?cmd=auctionhouse&amp;type=-1&amp;search_text=@replaceme@', ''],
    currentItems: getValueJSON('quickSearchList'),
    gmname: 'quickSearchList',
    categoryField: 'category',
  };
  generateManageTable();
  content.addEventListener('click', listEvtHnl);
}

function injectQuickLinkManager(injector) { // Legacy
  var content = injector || pCC;
  content.innerHTML =
    makePageTemplate('Quick Links', '', '', '', 'qla');

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
  content.addEventListener('click', listEvtHnl);
}

function injectFindPlayer() { // Bad jQuery
  var findPlayerButton = $('input[value="Find Player"]');
  var levelToTest = intValue($('dt.stat-level:first').next()
    .text());
  var characterVirtualLevel = getValue('characterVirtualLevel');
  levelToTest = fallback(characterVirtualLevel, levelToTest);
  var pvpLowerLevelModifier = 5;
  if (levelToTest > 205) {pvpLowerLevelModifier = 10;}
  var pvpUpperLevelModifier = 5;
  if (levelToTest >= 200) {pvpUpperLevelModifier = 10;}
  findPlayerButton.parent().append('&nbsp;<a href="index.php?' +
    'cmd=findplayer&search_active=1&search_username=&search_level_min=' +
    (levelToTest - pvpLowerLevelModifier) + '&search_level_max=' +
    (levelToTest + pvpUpperLevelModifier) + '&search_in_guild=0"><span ' +
    'style="color:blue;">Get PvP targets</span></a>&nbsp;<a href="' +
    'index.php?cmd=findplayer&search_active=1&search_username=&' +
    'search_level_min=' + (levelToTest - 25) + '&search_level_max=' +
    (levelToTest + 25) + '&search_in_guild=0"><span style="color:blue;">' +
    'Get GvG targets</span></a>');

  $('table[class="width_full"]').find('a[href*="player_id"]')
    .each(function(i, e) {
      var id = /player_id=([0-9]*)/.exec($(e).attr('href'));
      $(e).after('<a style="color:blue;font-size:10px;" ' +
        quickBuffHref(id[1]) + '>[b]</a>');
    });
}

function marketplaceWarning(sellPrice) { // Legacy
  var warningColor = 'green';
  var warningText =
    '</b><br>This is probably an offer that will please someone.';
  if (sellPrice < 100000) {
    warningColor = 'brown';
    warningText = '</b><br>This is too low ... it just ain"t gonna sell.';
  }
  if (sellPrice > 250000) {
    warningColor = 'red';
    warningText = '</b><br>Hold up there ... this is way to high a ' +
      'price ... you should reconsider.';
  }
  var amount = findNode('//input[@id="amount"]').value;
  var warningField = findNode('//td[@id="warningfield"]');
  warningField.innerHTML = '<span style="color:' + warningColor +
    ';">You are offering to buy <b>' + amount +
    '</b> FSP for >> <b>' + addCommas(sellPrice) +
    warningText + ' (Total: ' +
    addCommas(amount * sellPrice +
    Math.ceil(amount * sellPrice * 0.005)) + ')</span>';
}

function addMarketplaceWarning() { // Legacy
  var goldPerPoint = findNode('//input[@id="price"]');
  var sellPrice = goldPerPoint.value;
  if (sellPrice.search(/^[0-9]*$/) !== -1) {
    marketplaceWarning(sellPrice);
  }
}

function addMarketplaceWidgets() { // Legacy
  var requestTable = findNode(
    '//table[tbody/tr/td/input[@value="Confirm Request"]]');
  var newRow = requestTable.insertRow(2);
  var newCell = newRow.insertCell(0);
  newCell.id = 'warningfield';
  newCell.colSpan = '2';
  newCell.align = 'center';

  document.getElementById('price').addEventListener('keyup',
    addMarketplaceWarning, true);
  document.getElementById('amount').addEventListener('keyup',
    addMarketplaceWarning, true);
}

function injectNotepad() { // jQuery
  $('#notepad_notes')
    .attr('cols', '90')
    .attr('rows', '30')
    .css('resize', 'none');
}

function injectFsBoxContent(injector) { // jQuery
  var content = injector || pCC;
  content.innerHTML = makePageTemplate('FS Box Log', '',
    'fsboxclear', 'Clear', 'fsboxdetail');
  getForage('fsh_fsboxcontent').done(function(fsboxcontent) {
    document.getElementById('fsboxdetail').innerHTML = fsboxcontent;
  });
  document.getElementById('fsboxclear')
    .addEventListener('click', function() {
      setForage('fsh_fsboxcontent', '');
      location.reload();
    }, true);
}

var helperMenuBlob =
  '<div class="column"><h3>Character</h3><ul>' +
  '<li><span class="fshLink">Buff Log</span></li>' +
  '<li><span class="fshLink">Combat Log</span></li>' +
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

function callHelperFunction(evt) { // jQuery
  var content = document.getElementById('content');
  if (content) {content.innerHTML = '';} else {
    content = createDiv({
      id: 'content',
      style: {display: 'none'}
    });
    document.body.appendChild(content);
  }
  var functionPath = evt.target.textContent;
  var fn = functionLookup[functionPath];
  if (typeof fn === 'function') {
    screenview(functionPath);
    fn(content);
  }
  $(content).dialog({width: 'auto', modal: true});
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

function showHelperMenu() {
  var helperMenu = document.getElementById('helperMenu');
  helperMenu.removeEventListener('mouseenter', showHelperMenu);

  var helperMenuDiv = createDiv({
    id: 'helperMenuDiv',
    className: 'helperMenuDiv',
    style: {
      backgroundImage: 'url(' + imageServer +
        '/skin/inner_bg.jpg)'
    }
  });
  helperMenuDiv.insertAdjacentHTML('beforeend', helperMenuBlob);
  helperMenu.appendChild(helperMenuDiv);
  helperMenu.addEventListener('click', function(evt) {
    if (evt.target.id !== 'helperMenu') {return;}
    var menu = evt.target.firstElementChild;
    menu.classList.toggle('showMenuDiv');
  });
  helperMenuDiv.addEventListener('click', eventHandler);
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
    helperMenu.setAttribute('draggable', 'true');
    helperMenu.addEventListener('dragstart', drag_start);
  }
  node.parentNode.insertBefore(helperMenu, node);
}

function injectHelperMenu() {
  // don't put all the menu code here (but call if clicked) to minimize lag
  var node = document.getElementById('statbar-container');
  if (node) {haveNode$1(node);}
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
  if (newsCol.length !== 1) {return;}
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

function injectHomePageTwoLink() {
  var archiveLink = document.querySelector(
    '#pCC a[href="index.php?cmd=&subcmd=viewupdatearchive"]');
  if (!archiveLink) {return;}
  archiveLink.insertAdjacentHTML('afterend', '&nbsp;<a href="index.php?cmd=' +
    '&subcmd=viewupdatearchive&subcmd2=&page=2&search_text=">' +
    'View Updates Page 2</a>');
  archiveLink = document.querySelector(
    '#pCC a[href="index.php?cmd=&subcmd=viewarchive"]');
  archiveLink.insertAdjacentHTML('afterend', '&nbsp;<a href="index.php?cmd=' +
    '&subcmd=viewarchive&subcmd2=&page=2&search_text=">View News Page 2</a>');
  fixCollapse();
  lookForPvPLadder();
}

function updateQuestLink() {
  var lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    document.getElementById('nav-character-questbook')
      .setAttribute('href', lastActiveQuestPage);
  }
}

function buffLogLink() {
  if (getValue('keepBuffLog')) {
    document.getElementById('nav-character-log').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-bufflog" href="index.php?cmd=notepad&blank=1&' +
        'subcmd=bufflogcontent">Buff Log</a></li>');
  }
}

function combatLogLink() {
  if (getValue('keepLogs')) {
    document.getElementById('nav-character-notepad').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-showlogs" href="index.php?cmd=notepad&blank=1' +
        '&subcmd=showlogs">Combat Logs</a></li>');
  }
}

function creatureLogLink() {
  if (getValue('showMonsterLog')) {
    document.getElementById('nav-character-notepad').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-monsterlog" href="index.php?cmd=notepad&blank' +
        '=1&subcmd=monsterlog">Creature Logs</a></li>');
  }
}

function newGuildLogLink() {
  if (!getValue('useNewGuildLog')) {
    // if not using the new guild log, show it as a separate menu entry
    document.getElementById('nav-guild-ledger-guildlog').parentNode
      .insertAdjacentHTML('beforebegin',
        '<li class="nav-level-2"><a class="nav-link" ' +
        'href="index.php?cmd=notepad&blank=1&subcmd=newguildlog"' +
        '>New Guild Log</a></li>');
  }
}

function adjustHeight() { // jQuery
  // adjust the menu height for the newly added items
  var theNav = document.getElementById('nav');
  var myNav = $(theNav).data('nav');
  // first the closed saved variables
  myNav.heights = [
    null,
    null,
    // Character
    document.getElementById('nav-character').nextElementSibling.children
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

function injectMenu() {
  if (!document.getElementById('pCL')) {return;}
  updateQuestLink();
  // character
  document.getElementById('nav-character-log').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-medalguide" href="index.php?cmd=profile&subcmd=' +
      'medalguide">Medal Guide</a></li>' +
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-invmanager" href="index.php?cmd=notepad&blank=1&' +
      'subcmd=invmanagernew">Inventory Manager</a></li>' +
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-recipemanager" href="index.php?cmd=notepad&blank' +
      '=1&subcmd=recipemanager">Recipe Manager</a></li>');
  buffLogLink();
  combatLogLink();
  creatureLogLink();
  document.getElementById('nav-character-notepad').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-quicklinkmanager" href="index.php?cmd=notepad&' +
      'blank=1&subcmd=quicklinkmanager">Quick Links</a></li>');
  // guild
  document.getElementById('nav-guild-storehouse-inventory').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'guild-guildinvmanager" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=guildinvmgr">Guild Inventory</a></li>');
  newGuildLogLink();
  // top rated
  document.getElementById('nav-toprated-players-level').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'toprated-top250" href="index.php?cmd=toprated&subcmd=xp">' +
      'Top 250 Players</a></li>');
  // actions
  document.getElementById('nav-actions-trade-auctionhouse').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'actions-ahquicksearch" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=auctionsearch">AH Quick Search</a></li>');
  document.getElementById('nav-actions-interaction-findplayer').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'actions-findbuffs" href="index.php?cmd=notepad&blank=1&' +
      'subcmd=findbuffs">Find Buffs</a></li>' +
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'actions-findother" href="index.php?cmd=notepad&blank=1&' +
      'subcmd=findother">Find Other</a></li>' +
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'actions-onlineplayers" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=onlineplayers">Online Players</a></li>');
  adjustHeight();
}

function showMsgTemplate() { // jQuery
  var targetPlayer = $('#quickMsgDialog_targetUsername').text();
  $('#msgTemplateDialog').remove();

  // template displayed
  var html = '<div id=msgTemplateDialog title="Choose Msg Template" ' +
    'style="display:none"><style>#msgTemplate .ui-selecting { ' +
    'background: #FECA40; };</style><ol id=msgTemplate valign=center>';
  for (var i = 0; i < calf.template.length; i += 1) {
    html += '<li class="ui-widget-content">' +
      calf.template[i].replace(/\{playername\}/g, targetPlayer) + '</li>';
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
    calf.template.splice($('#msgTemplate li')
      .index(evt.target.parentNode), 1);
    setValueJSON('quickMsg', calf.template);
    $('#msgTemplateDialog').dialog('close');
    showMsgTemplate();
  });
  $('#newTmplAdd').click(function() {
    if ($('#newTmpl').val() === '') {return;}
    calf.template.push($('#newTmpl').val());
    setValueJSON('quickMsg', calf.template);
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

function openQuickMsgDialog(name, msg, tip) { // jQuery
  if (!calf.template) {
    calf.template = getValueJSON('quickMsg');
    var buttons = $('#quickMessageDialog').dialog('option', 'buttons');
    buttons.Template = showMsgTemplate;
    $('#quickMessageDialog').dialog('option', 'buttons', buttons);
  }
  $('#quickMsgDialog_targetUsername').html(name);
  $('#quickMsgDialog_targetPlayer').val(name);
  $('#quickMsgDialog_msg').val(fallback(msg, ''));
  $('#quickMsgDialog_msg').removeAttr('disabled');
  $('.validateTips').text(fallback(tip, ''));
  $('#quickMessageDialog').dialog('open');
}

function injectQuickMsgDialogJQ() {
  window.openQuickMsgDialog = openQuickMsgDialog;
}

function getProfile(username) {
  return $.getJSON('index.php', {
    cmd: 'export',
    subcmd: 'profile',
    player_username: username
  });
}

function sendMyProfileToForage(data) {
  setForage('fsh_selfProfile', data);
}

function addLastUpdateDate(data) {
  data.lastUpdate = Date.now();
  return data;
}

function getMyProfile() {
  return getProfile(playerName())
    .pipe(addLastUpdateDate)
    .done(sendMyProfileToForage);
}

function getProfileFromForage(data) {
  if (!data || data.lastUpdate < Date.now() -
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
  var now = Math.floor(Date.now() / 1000);
  for (var i = 0; i < contactClass.length; i += 1) {
    var test = contactClass[i];
    if (test.condition(now - last_login)) {
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
  var now = Math.floor(Date.now() / 1000);
  var output = '';
  contactList.forEach(function(val) {
    if (now - val.last_login > 1800) {return;} // 30 mins
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

function noAllies(allies, enemies) {
  return allies.length + enemies.length === 0 ||
    !calf.enableAllyOnlineList && enemies.length === 0 ||
    !calf.enableEnemyOnlineList && allies.length === 0;
}

function hazAllies(allies, enemies) {
  var output = '';
  if (calf.enableAllyOnlineList) {
    output += addContact(allies, true);
  }
  if (calf.enableEnemyOnlineList) {
    output += addContact(enemies, false);
  }
  var fshContactList = document.getElementById('fshContactList');
  fshContactList.innerHTML = '';
  fshContactList.insertAdjacentHTML('beforeend', output);
}

function injectAllyEnemyList(data) {
  var allies = fallback(data._allies, []);
  var enemies = fallback(data._enemies, []);
  if (noAllies(allies, enemies)) {return;}
  hazAllies(allies, enemies);
}

function resetList() { // jQuery
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
  var buffBalls = document.getElementById('fshContactList')
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

function eventHandler$1(evt) {
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
  fshAllyEnemy.insertAdjacentHTML('beforeend', wrapper);
  document.getElementById('pCR')
    .insertAdjacentElement('afterbegin', fshAllyEnemy);
  fshAllyEnemy.addEventListener('click', eventHandler$1);
  injectAllyEnemyList(data);
}

function prepareAllyEnemyList() { // jQuery.min
  myStats(false)
    .done(function(data) {
      add(3, makeDiv, [data]);
    });
}

var bountyList;
var wantedList;
var bountyListRefreshTime;
var bwNeedsRefresh;
var curPage;
var maxPage;
var activeBountyListPosted;
var wantedNames;
var wantedArray;

function resetBountyList() {
  setValueJSON('bountyList', null);
  location.reload();
}

function injectBountyList() {
  setValueJSON('bountyList', bountyList);
  var injectHere = document
    .getElementById('Helper:BountyListPlaceholder');
  var displayList = createTable({cellPadding: 1, width: 125});

  var aRow = displayList.insertRow(0); // bountyList.rows.length
  var aCell = aRow.insertCell(0);
  var output = '<h3>Active Bounties</h3><ol style="color:#FFF380;font-' +
    'size:10px;list-style-type:decimal;margin-left:1px;margin-top:' +
    '1px;margin-bottom:1px;padding-left:20px;"><nobr><span id="' +
    'Helper:resetBountyList" style=" font-size:8px; cursor:pointer; ' +
    'text-decoration:underline;">Reset</span><nobr><br>';

  if (bountyList.activeBounties === false) {
    output += '</ol> \f <ol style="color:orange;font-size:10px;list-' +
      'style-type:decimal;margin-left:1px;margin-top:1px;margin-' +
      'bottom:1px;padding-left:10px;">[No Active bounties]</ol>';
  } else {
    for (var i = 0; i < bountyList.bounty.length; i += 1) {
      var mouseOverText = '<div>Level:  ' + bountyList.bounty[i].lvl +
        '<br/>Reward: ' + bountyList.bounty[i].reward + ' ' +
        bountyList.bounty[i].rewardType +
        '<br/>XP Loss Remaining: ' + bountyList.bounty[i].xpLoss +
        '<br/>Progress:  ' + bountyList.bounty[i].progress +
        '</div>';

      output += '<li style="padding-bottom:0px;"><a style="color:' +
        'red;font-size:10px;"href="' + server +
        'index.php?cmd=attackplayer&mode=bounty&target_username=' +
        bountyList.bounty[i].target + '">[a]</a>&nbsp;<a style="' +
        'color:#A0CFEC;font-size:10px;"href="' + server +
        'index.php?cmd=message&target_player=' +
        bountyList.bounty[i].target + '">[m]</a> &nbsp;<a href="' +
        bountyList.bounty[i].link + '" class="tip-static" ' +
        'data-tipped="' + mouseOverText + '" style="color:' +
        '#FFF380;font-size:10px;">' + bountyList.bounty[i].target +
        '</a></li>';
    }
  }

  aCell.innerHTML = output;
  var breaker = createBr();
  injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
  injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
  document.getElementById('Helper:resetBountyList')
    .addEventListener('click', resetBountyList, true);
}

function resetWantedList() { // Legacy
  setValueJSON('wantedList', null);
  location.reload();
}

function acceptOrAttack(bounty) { // Legacy
  if (bounty.accept) {
    return 'color:rgb(0,255,0); cursor:pointer; ' +
      'text-decoration:underline blink;" title = "Accept ' +
      'Bounty" onclick="' + bounty.accept +
      '">[a]</a>&nbsp;';
  }
  return 'color:red;" href="' + server +
    'index.php?cmd=attackplayer&target_username=' +
    bounty.target + '">[a]</a>&nbsp;';
}

function injectWantedList() { // Legacy
  setValueJSON('wantedList', wantedList);
  var injectHere = document
    .getElementById('Helper:WantedListPlaceholder');
  var displayList = createTable({cellPadding: 3, width: 125});

  var aRow = displayList.insertRow(0);
  var aCell = aRow.insertCell(0);
  var output = '<h3>Wanted Bounties</h3><ol style="color:#FFF380;font-' +
    'size:10px;list-style-type:decimal;margin-left:1px;margin-top:' +
    '1px;margin-bottom:1px;padding-left:12px;"><nobr> <span id="' +
    'Helper:resetWantedList" font-size:8px; cursor:pointer; text-' +
    'decoration:underline;">Reset</span></nobr><br>';

  if (wantedList.wantedBounties === false) {
    output += '</ol> \f <ol style="color:orange;font-size:10px;list-' +
      'style-type:decimal;margin-left:1px;margin-top:1px;margin-' +
      'bottom:1px;padding-left:7px;">[No wanted bounties]</ol>';
  } else {
    for (var i = 0; i < wantedList.bounty.length; i += 1) {
      var mouseOverText = '"<div style=\'text-align:center;width:' +
        '205px;\'>Target Level:  ' + wantedList.bounty[i].lvl +
        '<br/>Offerer: ' + wantedList.bounty[i].offerer +
        '<br/>Reward: ' + wantedList.bounty[i].reward + ' ' +
        wantedList.bounty[i].rewardType +
        '<br/>XP Loss Remaining: ' + wantedList.bounty[i].xpLoss +
        '<br/>Posted: ' + wantedList.bounty[i].posted +
        '<br/>Tickets Req.:  ' + wantedList.bounty[i].tickets + '</div>" ';

      output += '<li style="padding-bottom:0px;margin-left:5px;">' +
        '<a style= "font-size:10px;' + acceptOrAttack(wantedList.bounty[i]) +
        '<a style="color:#A0CFEC;font-size:10px;"href="j' +
        'avascript:openQuickMsgDialog(\'' + wantedList.bounty[i].target +
        '\');">[m]</a> &nbsp;<a class="tip-static" data-tipped=' +
        mouseOverText + 'style="color:#FFF380;font-size:10px;" href="' +
        wantedList.bounty[i].link + '">' +
        wantedList.bounty[i].target + '</a></li>';
    }
  }

  aCell.innerHTML = output;
  var breaker = createBr();
  injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
  injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
  document.getElementById('Helper:resetWantedList')
    .addEventListener('click', resetWantedList);
}

function getTarget$1(target, theRow) {
  wantedList.wantedBounties = true;
  var bounty = {};
  bounty.target = target;
  bounty.link = theRow.cells[0]
    .firstChild.firstChild.href;
  bounty.lvl = theRow.cells[0]
    .firstChild.firstChild.nextSibling.textContent
    .replace(/\[/, '').replace(/\]/, '');
  bounty.offerer = theRow.cells[1]
    .firstChild.firstChild.firstChild.textContent;
  bounty.reward = theRow.cells[2].textContent;
  bounty.rewardType = theRow.cells[2]
    .firstChild.firstChild.firstChild.firstChild
    .nextSibling.firstChild.title;
  bounty.xpLoss = theRow.cells[3].textContent;
  bounty.posted = theRow.cells[4].textContent;
  bounty.tickets = theRow.cells[5].textContent;
  if (theRow.cells[6].textContent.trim() === '[active]') {
    bounty.active = true;
    bounty.accept = '';
  } else if (theRow.cells[6].textContent.trim() !== '[n/a]') { // TODO
    bounty.active = false;
    bounty.accept = theRow.cells[6]
      .firstChild.firstChild
      .getAttribute('onclick');
  }
  wantedList.bounty.push(bounty);
}

function wantedTarget(target, theRow, el) {
  if (target === el.trim() ||
      wantedArray.indexOf('*') !== -1) {
    getTarget$1(target, theRow);
  }
}

function findTarget(activeTable) {
  for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
    var theRow = activeTable.rows[i];
    var target = theRow.cells[0].firstChild
      .firstChild.firstChild.textContent;
    if (target === '[ No bounties available. ]') {break;}
    wantedArray.forEach(wantedTarget.bind(null, target, theRow));
  }
}

function getWantedBountyList(doc) { // Legacy
  if (!calf.enableWantedList) {return;}
  var page = findNode('//input[@name="page"]', doc);
  curPage = parseInt(page.value, 10);
  maxPage = page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1];
  var activeTable = findNode('//table[@width = "630" and ' +
    'contains(.,"Target")]', doc);
  if (activeTable) {findTarget(activeTable);}
}

function parseActiveBounty(activeTable) { // Legacy
  if (!/No bounties active/.test(activeTable.rows[1].cells[0].innerHTML)) {
    bountyList.activeBounties = true;
    for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
      var bounty = {};
      bounty.target = activeTable.rows[i].cells[0].firstChild
        .firstChild.firstChild.textContent;
      bounty.link = activeTable.rows[i].cells[0].firstChild
        .firstChild.href;
      bounty.lvl = activeTable.rows[i].cells[0].firstChild
        .firstChild.nextSibling.textContent
        .replace(/\[/, '').replace(/\]/, '');
      bounty.reward = activeTable.rows[i].cells[2]
        .textContent;
      bounty.rewardType = activeTable.rows[i].cells[2]
        .firstChild.firstChild.firstChild.firstChild
        .nextSibling.firstChild.title;
      bounty.posted = activeTable.rows[i].cells[3]
        .textContent;
      bounty.xpLoss = activeTable.rows[i].cells[4]
        .textContent;
      bounty.progress = activeTable.rows[i].cells[5]
        .textContent;
      bountyList.bounty.push(bounty);
    }
  } else {
    bountyList.activeBounties = false;
  }
}

function getActiveBountyList(doc) { // Legacy
  var activeTable = findNode('//table[@width = 620]', doc);
  bountyList = {};
  bountyList.bounty = [];
  bountyList.isRefreshed = true;
  bountyList.lastUpdate = new Date();
  if (activeTable) {parseActiveBounty(activeTable);}
  injectBountyList();
  activeBountyListPosted = true;
}

function parseBountyPageForWorld(details) {
  var doc = createDocument(details);
  getWantedBountyList(doc);
  if (calf.enableActiveBountyList &&
      !activeBountyListPosted) {
    getActiveBountyList(doc);
  }
  if (curPage < maxPage) {
    xmlhttp('index.php?cmd=bounty&page=' + (curPage + 1),
      parseBountyPageForWorld);
  } else {
    injectWantedList();
  }
}

function testCacheInvalid() { // Legacy
  var now = Date.now();
  return bountyList &&
    now - bountyList.lastUpdate.getTime() > bountyListRefreshTime ||
    wantedList &&
    now - wantedList.lastUpdate.getTime() > bountyListRefreshTime;
}

function invalidateCache() { // Legacy
  bountyList = getValueJSON('bountyList');
  wantedList = getValueJSON('wantedList');
  bountyListRefreshTime = getValue('bountyListRefreshTime');
  bwNeedsRefresh = getValue('bwNeedsRefresh');
  bountyListRefreshTime *= 1000;
  if (bwNeedsRefresh) {return;}
  if (testCacheInvalid()) {
    bwNeedsRefresh = true; // invalidate cache
  }
}

function doRefresh() { // Legacy
  wantedList = {};
  wantedList.bounty = [];
  wantedList.isRefreshed = true;
  wantedList.lastUpdate = new Date();
  wantedList.wantedBounties = false;
  activeBountyListPosted = false;
  wantedNames = getValue('wantedNames');
  wantedArray = wantedNames.split(',');
  xmlhttp('index.php?cmd=bounty&page=1', parseBountyPageForWorld);
  setValue('bwNeedsRefresh', false);
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

var testConditions = [
  function() {return !bountyList;},
  function() {return !wantedList;},
  function() {return bwNeedsRefresh;}
];

function testForRefresh() {
  for (var i = 0; i < testConditions.length; i += 1) {
    if (testConditions[i]()) {return true;}
  }
  return false;
}

function retrieveBountyInfo(enableActiveBountyList, enableWantedList) { // Legacy
  invalidateCache();
  if (testForRefresh()) {
    doRefresh();
  } else {
    notRefreshed(enableActiveBountyList, enableWantedList);
  }
}

function prepareBountyData() {
  var pCR = document.getElementById('pCR');
  if (calf.enableWantedList) {
    pCR.insertAdjacentHTML('afterbegin', '<div class="minibox">' +
      '<span id="Helper:WantedListPlaceholder"></span></div>');
  }
  if (calf.enableActiveBountyList) {
    pCR.insertAdjacentHTML('afterbegin', '<div class="minibox">' +
      '<span id="Helper:BountyListPlaceholder"></span></div>');
  }
  retrieveBountyInfo(
    calf.enableActiveBountyList,
    calf.enableWantedList);
}

function doSendGold() { // jQuery
  $.ajax({
    url: 'index.php',
    data: {
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
  if (!getValue('sendGoldonWorld')) {return;}
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

function updateSendGoldOnWorld(data) { // jQuery
  if (data.player && getValue('sendGoldonWorld')) {
    $('#HelperSendTotal')
      .html(getValue('currentGoldSentTotal')
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
    if (parseInt(data.player.gold, 10) >
      getValue('goldAmount')) {
      $('#statbar-gold').css('background-color', 'red');
    } else {
      $('#statbar-gold').css('background-color', 'inherit');
    }
  }
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

  $.ajax({
    url: 'index.php',
    data: {
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
  if (!document.getElementById('worldPage')) {
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

function backpack$1() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
  location.href = 'index.php?cmd=profile&subcmd=dropitems';
}

function fastWearMgr() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
  location.href = 'index.php?cmd=notepad&blank=1&subcmd=quickwear';
}

function profile() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
  location.href = 'index.php?cmd=profile';
}

function combatSetKey(itemIndex) {
  $.get('index.php?cmd=profile').done(function(data) {
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
  '98': {fn: backpack$1}, // backpack [b]
  '103': {fn: gotoGuild}, // go to guild [g]
  '106': {fn: joinAllGroup}, // join all group [j]
  '108': {fn: logPage}, // Log Page [l]
  '112': {fn: profile}, // profile [p]
  '114': {fn: doRepair}, // repair [r]
  '118': {fn: fastWearMgr}, // fast wear manager [v]
  '121': {fn: doSendGold}, // fast send gold [y]
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

function statbarWrapper(href, id) {
  var myWrapper = createAnchor({href: href});
  var character = document.getElementById(id);
  var statWrapper = character.parentNode;
  myWrapper.appendChild(character);
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
    formatShortDate(new Date(Date.now() +
    (hrsToGo * 60 * 60 + parseInt(nextGain[1], 10) * 60 +
    parseInt(nextGain[2], 10)) * 1000)) + '</dd>';
}

function injectStaminaCalculator() {
  var nextGain = document.getElementsByClassName('stat-stamina-nextGain');
  if (!nextGain) {return;}
  var staminaMouseover =
    document.getElementById('statbar-stamina-tooltip-stamina');
  var stamVals = /([,0-9]+)\s\/\s([,0-9]+)/.exec(
    staminaMouseover.getElementsByClassName('stat-name')[0]
      .nextElementSibling.textContent
  );
  staminaMouseover.insertAdjacentHTML('beforeend',
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
  if (!nextGain) {return;}
  document.getElementById('statbar-level-tooltip-general')
    .insertAdjacentHTML('beforeend',
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

var composeMsg =
  '<li class="notification"><a href="index.php?cmd=composing"><span' +
  ' class="notification-icon"></span><p class="notification-content">' +
  'Composing to do</p></a></li>';

function displayComposeMsg() {
  document.getElementById('notifications')
    .insertAdjacentHTML('afterbegin', composeMsg);
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
        1000 + Date.now();
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
  $.ajax({
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

function quickCreateBailOut(target) {
  return target.tagName !== 'SPAN' || target.className !== 'quickCreate';
}

function quickCreate(evt) {
  var target = evt.target;
  if (quickCreateBailOut(target)) {return;}
  var temp = target.previousElementSibling.previousElementSibling;
  if (temp && temp.value !== 'none') {
    createPotion(temp);
  }
}

function checkLastCompose() { // jQuery
  var lastComposeCheck = getValue('lastComposeCheck');
  if (lastComposeCheck && Date.now() < lastComposeCheck) {return;}
  $.get('index.php?cmd=composing', function(data) {
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
  if (calf.cmd !== 'composing') {composeAlert();}
}

function moveButtons() {
  if (getValue('moveComposingButtons')) {
    var buttonDiv = document.getElementById('composing-error-dialog')
      .previousElementSibling;
    buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
    var top = pCC.getElementsByClassName('composing-level')[0]
      .parentNode;
    top.insertAdjacentElement('beforebegin', buttonDiv);
  }
}

function injectComposing() {
  if (!pCC) {return;}
  if (calf.enableComposingAlert) {
    parseComposing();
  }

  var buttons = pCC
    .querySelectorAll('input[id^=create-]:not(#create-multi)');
  Array.prototype.forEach.call(buttons, function(el) {
    el.insertAdjacentHTML('afterend',
      '&nbsp;[<span class="quickCreate">Quick Create</span>]');
  });
  pCC.addEventListener('click', quickCreate);
  moveButtons();
}

function composingCreate() {
  document.getElementById('composing-add-skill')
    .addEventListener('click', function() {
      document.getElementById('composing-skill-level-input').value =
        document.getElementById('composing-skill-level-max').textContent;
    });
  document.getElementById('composing-skill-select')
    .addEventListener('change', function() {
      document.getElementById('composing-skill-level-input').value =
        document.getElementById('composing-skill-level-max').textContent;
    });
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
var goldUpgradeMsg =
  '<li class="notification"><a href="index.php?cmd=points&type=1"><span' +
  ' class="notification-icon"></span><p class="notification-content">Up' +
  'grade stamina with gold</p></a></li>';

function havePrayed() {
  document.getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
  setValue('needToPray', false);
  setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // Midnight
}

function prayToGods(e) { // jQuery
  var myGod = e.target.getAttribute('praytype');
  if (!myGod) {return;}
  document.getElementById('helperPrayToGods').removeEventListener('click',
    prayToGods);
  $.get('index.php?cmd=temple&subcmd=pray&type=' + myGod)
    .done(havePrayed);
  $(e.target).qtip('hide');
}

function displayDisconnectedFromGodsMessage() {
  document.getElementById('notifications').insertAdjacentHTML('afterbegin',
    godsNotification);
  document.getElementById('helperPrayToGods').addEventListener('click',
    prayToGods);
}

function displayUpgradeMsg() {
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    document.getElementById('notifications').insertAdjacentHTML('afterbegin',
      goldUpgradeMsg);
  }
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
  el.insertAdjacentHTML('afterend',
    '<li class="notification">' + groupJoinHTML + '</li>');
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
  return !templeAlertLastUpdate ||
    Date.now() > templeAlertLastUpdate;
}

function doWeNeedToParse() {
  if (checkLastUpdate(getValue('lastTempleCheck'))) {return true;}
  if (getValue('needToPray')) {
    displayDisconnectedFromGodsMessage();
  }
  return false;
}

function injectTempleAlert() { // jQuery
  // Checks to see if the temple is open for business.
  if (calf.cmd === 'temple') {return;}
  if (doWeNeedToParse()) {
    $.get('index.php?cmd=temple', parseTemplePage);
  }
}

function findDoc(data) {
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    return createDocument(data);
  }
  document.querySelectorAll('#pCC input[name="quantity"]')[1].value = '10';
  return document;
}

function parseGoldUpgrades(data) {
  if (!calf.enableUpgradeAlert) {return;}
  var doc = findDoc(data);
  var limit = doc.getElementById('pCC').getElementsByTagName('TABLE')[0]
    .rows[3].cells[2];
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

function notUpgradesPage() {
  var needToDoUpgrade = getValue('needToDoUpgrade');
  if (needToDoUpgrade) {
    displayUpgradeMsg();
    return;
  }
  var lastUpgradeCheck = getValue('lastUpgradeCheck');
  if (lastUpgradeCheck && Date.now() < lastUpgradeCheck) {return;}
  $.get('index.php?cmd=points&type=1', function(data) {
    add(3, parseGoldUpgrades, [data]);
  });
}

function injectUpgradeAlert() { // jQuery
  if (location.search.indexOf('cmd=points&type=1') === -1) {notUpgradesPage();}
}

function injectJoinAllLink() {
  var nodeList = document.getElementById('pCL').getElementsByTagName('li');
  Array.prototype.forEach.call(nodeList, findNewGroup);
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
  var onMouseOver = el.getAttribute('data-tipped');
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
  var guildMembrList = document.getElementById('minibox-guild-members-list');
  if (!guildMembrList) {return;} // list exists
  // hide guild info links
  doHideBtn(guildMembrList, 'guildSelector');
  if (calf.hideBuffSelected) {
    hideNodeList(
      guildMembrList.getElementsByClassName('guild-buff-check-on'));
    document.getElementById('guild-quick-buff').classList.add('fshHide');
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
  var onlineAlliesList = document.getElementById('minibox-allies-list');
  if (!onlineAlliesList) {return;}
  doHideBtn(onlineAlliesList, 'allySelector');
  if (calf.hideBuffSelected) {
    hideNodeList(
      onlineAlliesList.getElementsByClassName('ally-buff-check-on'));
    document.getElementById('ally-quick-buff').classList.add('fshHide');
  }
  // add coloring for offline time
  Array.prototype.forEach.call(
    onlineAlliesList.getElementsByClassName('player-name'), alliesColour);
}

function fixOnlineGuildBuffLinks() {
  updateHCSQuickBuffLinks(
    '#minibox-guild-members-list #guild-minibox-action-quickbuff');
  updateHCSQuickBuffLinks(
    '#minibox-allies-list #online-allies-action-quickbuff');
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

function navMenu() { // jQuery
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

function getBoxList(boxList) {
  if (boxList) {return boxList;}
  return '';
}

function storeFSBox(_boxList) {
  var boxList = getBoxList(_boxList);
  var fsbox = document.getElementById('minibox-fsbox')
    .getElementsByClassName('message')[0].innerHTML;
  if (boxList.indexOf(fsbox) < 0) {boxList = '<br>' + fsbox + boxList;}
  if (boxList.length > 10000) {boxList = boxList.substring(0, 10000);}
  setForage('fsh_fsboxcontent', boxList);
}

function injectFSBoxLog() {
  var node = document.getElementById('minibox-fsbox');
  if (!node) {return;}
  var nodediv = node.lastElementChild;
  var playerName = nodediv.getElementsByTagName('a');
  if (playerName.length === 0) {return;}
  getForage('fsh_fsboxcontent').done(storeFSBox);
  playerName = playerName[0].textContent;
  nodediv.insertAdjacentHTML('beforeend',
    '<br><span class="fshPaleVioletRed">' +
    '[ <a href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' +
    playerName + '">Ignore</a> ]</span> <span class="fshYellow">[ <a ' +
    'href="index.php?cmd=notepad&blank=1&subcmd=fsboxcontent">Log</a> ]' +
    '</span>');
}

function testForGuildLogMsg(guildLogNode) {
  return location.search !== '?cmd=notepad&blank=1&subcmd=newguildlog' ||
    guildLogNode.innerHTML.search('Guild Log updated!') === -1;
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
    guildLogNode.setAttribute('href',
      'index.php?cmd=notepad&blank=1&subcmd=newguildlog');
  }
  hideGuildLogMsg(guildLogNode);
}

function changeGuildLogHREF() {
  if (!getValue('useNewGuildLog')) {return;}
  var guildLogNodes = document.querySelectorAll(
    '#pCL a[href="index.php?cmd=guild&subcmd=log"]');
  if (guildLogNodes) {gotGuildLogNodes(guildLogNodes);}
}

function moveRHSBoxUpOnRHS(title) {
  document.getElementById('pCR').insertAdjacentElement('afterbegin',
    document.getElementById(title));
}

function moveRHSBoxToLHS(title) {
  var boxDiv = document.getElementById(title);
  boxDiv.classList.add('pCR');
  document.getElementById('pCL').appendChild(boxDiv);
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

function notHuntMode() {
  if (calf.huntingMode) {return;}
  // move boxes in opposite order that you want them to appear.
  doMoveGuildList();
  doMoveAllyList();
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
  add(3, fixOnlineGuildBuffLinks);

  add(3, injectJoinAllLink);
  add(3, changeGuildLogHREF);
  add(3, injectHomePageTwoLink);

  add(3, injectQuickMsgDialogJQ);
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
  var hcsData = document.getElementById('html');
  if (hcsData && JSON.parse(hcsData.getAttribute('data-hcs'))['new-ui']) {
    prepareEnv();
  }
}

function updateHistoryCharacters() { // Legacy
  var textArea = findNode('//textarea[@id="textInputBox"]');
  var previewArea = findNode('//span[@findme="biopreview"]');
  var bioPreviewHTML = convertTextToHtml(textArea.value);
  previewArea.innerHTML = bioPreviewHTML;
}

function addHistoryWidgets() { // Legacy
  var textArea = findNode('//textarea[@name="history"]');
  if (!textArea) {return;}
  textArea.value = textArea.value.replace(/<br \/>/ig, '');
  var textAreaDiv = textArea.parentNode;
  var bioPreviewHTML = convertTextToHtml(textArea.value);
  var newDiv = createDiv({
    innerHTML: '<table align="center" width="325" border="1"><tbody>' +
    '<tr><td style="text-align:center;color:#7D2252;' +
    'background-color:#CD9E4B">Preview</td></tr>' +
    '<tr><td align="left" width="325"><span style="font-size:small;" ' +
    'findme="biopreview">' + bioPreviewHTML +
    '</span></td></tr></tbody></table>'
  });
  textAreaDiv.appendChild(newDiv);
  document.getElementById('textInputBox').addEventListener('keyup',
    updateHistoryCharacters);
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
  window.location = 'index.php?cmd=arena&subcmd=completed&page=' + pageId;
}

function completedArenas() { // jQuery
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

var inv;
var target;

function selectPerf() {
  var items = document.getElementById(target + '-items')
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
  buttonDiv.insertAdjacentHTML('beforeend',
    '<button class="fshBl">Perfect</button>');
  pCC.appendChild(buttonDiv);
  buttonDiv.addEventListener('click', selectPerf);
}

function perfFilter(loc) { // jQuery.min
  target = loc;
  getInventoryById().done(drawFilters);
}

var disableBreakdownPrompts;
var selectedList = [];

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

  setTimeout(function() {
    var self = $('#composingMessageContainer');
    self.animate({opacity: 0}, 500, function() {
      self.animate({height: 0}, 500, function() {
        self.hide();
      });
    });
  }, 5000);
}

function breakItems() { // jQuery.min
  return $.ajax({
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

function breakEvt(evt) {
  if (disableBreakdownPrompts &&
      evt.target.id === 'breakdown-selected-items') {
    evt.stopPropagation();
    if (selectedList.length === 0) {
      showComposingMessage('Error: No items selected.', 'rgb(164, 28, 28)');
      return;
    }
    breakItems();
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

function togglePref() {
  disableBreakdownPrompts = !disableBreakdownPrompts;
  setValue('disableBreakdownPrompts', disableBreakdownPrompts);
}

function composingBreakdown() {
  perfFilter('composing');
  disableBreakdownPrompts = getValue('disableBreakdownPrompts');
  document.getElementById('breakdown-selected-items').parentNode
    .addEventListener('click', breakEvt, true);
  document.getElementById('composing-items')
    .addEventListener('click', itemClick);
  pCC.insertAdjacentHTML('beforeend',
    '<table class="fshTblCenter"><tbody>' +
    simpleCheckbox('disableBreakdownPrompts') +
    '</tbody></table>');
  document.getElementById('disableBreakdownPrompts')
    .addEventListener('click', togglePref);
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
  return $.ajax({url: href}).pipe(translateReturnInfo).done(dialog);
}

function takeResult(self, data) {
  if (data.r === 0) {
    closestTable(self).nextElementSibling.rows[0].cells[0].innerHTML =
      '<span class="fshGreen">Taken</span>';
  }
}

function guildMailboxEvent(e) {
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
  pCC.addEventListener('click', guildMailboxEvent);
  document.querySelector('#pCC td[height="25"]')
    .insertAdjacentHTML('beforeend',
      '<span class="sendLink">Take All</span>');
}

function getGuild(guildId$$1) {
  return $.ajax({
    dataType: 'json',
    url: 'index.php',
    data: {
      cmd: 'export',
      subcmd: 'guild_members',
      guild_id: guildId$$1
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

function getGuildMembers(guildId$$1) {
  return getGuild(guildId$$1).pipe(function membrListToHash(data) {
    var membrList = {};
    membrList[guildId$$1] = {};
    membrList[guildId$$1].lastUpdate = Date.now();
    data.forEach(function memberToObject(ele) {
      membrList[guildId$$1][ele.username] = ele;
    });
    return membrList;
  });
}

function getMembrListFromForage(guildId$$1, membrList) {
  if (membrList && membrList[guildId$$1] &&
      membrList[guildId$$1].lastUpdate &&
      membrList[guildId$$1].lastUpdate > Date.now() - 300000) {
    return membrList;
  }
  return getGuildMembers(guildId$$1).done(addMembrListToForage);
}

function guildMembers(force, guildId$$1) {
  if (force) {
    return getGuildMembers(guildId$$1).done(addMembrListToForage);
  }
  return getForage('fsh_membrList')
    .pipe(getMembrListFromForage.bind(null, guildId$$1));
}

function setHelperMembrList(guildId$$1, membrList) {
  calf.membrList = membrList[guildId$$1];
  return calf.membrList;
}

function getMembrList(force) {
  var guildId$$1 = guildId();
  return guildMembers(force, guildId$$1)
    .pipe(setHelperMembrList.bind(null, guildId$$1));
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
  if (!updateInput) {return;}
  updateInput[0].insertAdjacentHTML('afterend', '<span> <a href="index.php' +
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
  tfoot.insertAdjacentElement('beforeend', totalRow);
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
    tdOne.insertAdjacentHTML('afterend', '<td>' + playerLevel(username) +
      '</td><td>' + playerRank(username) + '</td>');
  });
  list.insertAdjacentElement('beforeend', tfoot);
  add(3, doTable);
  summaryLink();

  timeEnd('guildAdvisor.injectAdvisorNew');

}

function returnAdvisorPage(e, response) {

  time('guildAdvisor.returnAdvisorPage' + e);

  list.lastElementChild.insertAdjacentHTML('beforeend', ' day ' + e + ',');
  var doc = createDocument(response);
  var table = doc.getElementById('pCC').firstElementChild
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
  return $.ajax({
    url: 'index.php',
    data: {
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
  list.innerHTML = '<span class="fshSpinner" style="background-image: ' +
    'url(\'' + imageServer +
    '/world/actionLoadingSpinner.gif\');"></span>' +
    '<span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span>';

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

function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (!isNaN(minLvl) && !isNaN(maxLvl)) {
    opts = opts || {};
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

function sortHandler(evt) { // jQuery
  var self = $(evt.target).closest('td');
  var table = self.closest('table').DataTable();
  var myCol = self.index();
  var classes = self.attr('class');
  var test = /sorting([^\s]+)/.exec(classes);
  var sortOrder = 'desc';
  if (test && test[1] === '_desc') {sortOrder = 'asc';}
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

function maxMoves(cell, row) { // jQuery
  if (opts && opts.moves) {
    var matches = /\/pvp\/(\d+)\.gif/.exec($('img', cell).attr('src'));
    if (matches) {
      hazMaxMoves(matches, row);
      cell.attr('data-order', matches[1]);
    }
  }
}

function reward(cell) { // jQuery
  if (cell.children('table').length !== 1) {return;}
  cell.attr('data-order', cell.find('td').first().text().replace(/[,\s]/g, ''));
}

function orderData(i, e) { // jQuery

  var row = $(e);
  var theCells = row.children();

  var cell = theCells.eq(0);
  var matches = /#\s(\d+)/.exec(cell.text());
  if (matches && opts && opts.id) {
    opts.id[matches[1]] = matches[1];
    if (oldIds && !oldIds[matches[1]]) {
      row.css('background-color', '#F5F298');
      row.find('tr').css('background-color', '#F5F298');
    }
  }

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
  tabs = $('#arenaTypeTabs');
  if (tabs.length !== 1) {return;} // Join error screen
  theTables = $('table[width="635"]', tabs);
  getForage('fsh_arena').done(process);
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
  '</td></tr><tr><td colspan="5"><span id="warning" class="fshHide">' +
  'Warning:<br>pressing [<span id="fshBuy" class="fshLink">This button' +
  '</span>] now will buy the <span id="quantity">1</span> item(s) WITHOUT ' +
  'confirmation!</span></td></tr><tr><td id="buy_result" colspan="5"></td>' +
  '</tr></table>';
var bazaarItem =
  '<span class="bazaarButton tip-dynamic" style="background-image: ' +
  'url(\'@src@\');" itemid="@itemid@" data-tipped="@tipped@"></span>';

function testQuant$1() {
  return testQuant(document.getElementById('buy_amount').value);
}

function select(evt) {
  var target = evt.target;
  if (!target.classList.contains('bazaarButton')) {return;}
  var theValue = testQuant$1();
  if (!theValue) {return;}
  document.getElementById('quantity').textContent = theValue;
  ItemId = target.getAttribute('itemid');
  document.getElementById('warning').removeAttribute('class');
  var dupNode = target.cloneNode(false);
  dupNode.className = 'bazaarSelected tip-dynamic';
  var selected = document.getElementById('selectedItem');
  selected.innerHTML = '';
  selected.appendChild(dupNode);
}

function quantity() {
  var theValue = testQuant$1();
  if (theValue) {
    document.getElementById('quantity').textContent = theValue;
  }
}

function done(responseText) {
  document.getElementById('buy_result').insertAdjacentHTML('beforeend',
    '<br>' + infoBox(responseText));
}

function buy() { // jQuery
  if (!ItemId) {return;}
  var buyAmount = document.getElementById('quantity').textContent;
  document.getElementById('buy_result').textContent =
    'Buying ' + buyAmount + ' items';
  for (var i = 0; i < buyAmount; i += 1) {
    $.get('index.php?cmd=potionbazaar&subcmd=buyitem&item_id=' +
      ItemId, done);
  }
}

function injectBazaar() {
  var pbImg = pCC.getElementsByTagName('IMG')[0];
  pbImg.className = 'fshFloatLeft';
  var potions = pCC.getElementsByTagName('A');
  Array.prototype.forEach.call(potions, function(el, i) {
    var item = el.firstElementChild;
    var tipped = item.getAttribute('data-tipped');
    bazaarTable = bazaarTable
      .replace('@' + i + '@', bazaarItem)
      .replace('@src@', item.getAttribute('src'))
      .replace('@itemid@', tipped.match(/\?item_id=(\d+)/)[1])
      .replace('@tipped@', tipped);
  });
  bazaarTable = bazaarTable.replace(/@\d@/g, '');
  pbImg.parentNode.insertAdjacentHTML('beforeend', bazaarTable);
  document.getElementById('fshBazaar').addEventListener('click', select);
  document.getElementById('buy_amount').addEventListener('input', quantity);
  document.getElementById('fshBuy').addEventListener('click', buy);
}

var buffCost = {count: 0, buffs: {}};
var numRE = /[^a-zA-Z0-9.,+\- ]/g;
var priceRE =
  /([+-]{0,1}[.\d]+ *k)|([+-]{0,1}[.\d]+ *fsp)|([+-]{0,1}[.\d]+ *stam)/;

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
  document.getElementById('buffCost').innerHTML = '<br/><span ' +
    'class="tip-static" data-tipped="' + html + '">Estimated Cost: <b>' +
    totalText + '</b></span>';
  buffCost.buffCostTotalText = totalText;
}

function updateBuffCost() { // Legacy
  if (buffCost.count > 0) {
    hazBuffs();
  } else {
    document.getElementById('buffCost').innerHTML = '';
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

function priceBeforeName(buffNameNode, price) {
  if (!price) { // some players have prices BEFORE the buff names
    var newtext;
    var text = '';
    var node = buffNameNode;
    while (node && node.nodeName.toLowerCase() !== 'br') {
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
  while (node && node.nodeName.toLowerCase() !== 'br') {
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

function bioEvtHdl(e) {
  var buffNameNode = getBuffNameNode(e);
  if (buffNameNode.classList &&
      buffNameNode.classList.contains('buffLink')) {
    toggleBuffsToBuy(e);
  } else if (e.target.id === 'fshSendBuffMsg') {
    getBuffsToBuy(e);
  }
}

function renderBio(_bioContents) {
  var bioContents = _bioContents.replace(/\{b\}/g, '`~')
    .replace(/\{\/b\}/g, '~`');
  var buffs = bioContents.match(/`~([^~]|~(?!`))*~`/g);
  if (!buffs) {return;}
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

function bioPreview() {
  var textArea = document.getElementById('textInputBox');
  var bioPreviewHTML = convertTextToHtml(textArea.value);
  textArea.parentNode.insertAdjacentHTML('beforeend', '<div>' +
    '<table align="center" width="325" border="1">' +
    '<tbody><tr><td style="text-align:center;color:#7D2252;' +
    'background-color:#CD9E4B">Preview</td></tr><tr>' +
    '<td align="left" width="325"><span id="biopreview">' +
    bioPreviewHTML + '</span></td></tr></tbody></table></div>');
}

function bioWords() {
  // Add description text for the new tags
  pCC.insertAdjacentHTML('beforeend', '<div>' +
    '`~This will allow FSH Script users to ' +
    'select buffs from your bio~`<br>You can use the [cmd] tag as well to ' +
    'determine where to put the "Ask For Buffs" button<br><br>' +
    '&nbsp;&nbsp;&nbsp;- Note 1: The ` and ~ characters are on the same ' +
    'key on QWERTY keyboards. ` is <b>NOT</b> an apostrophe.<br>' +
    '&nbsp;&nbsp;&nbsp;- Note 2: Inner text will not contain special ' +
    'characters (non-alphanumeric).<br>' +
    '&nbsp;&nbsp;&nbsp;- P.S. Be creative with these! Wrap your buff ' +
    'pack names in them to make buffing even easier!</div>');
}

function testHeightValid(boxVal) {
  return isNaN(boxVal) || boxVal < '1' || boxVal > '99';
}

function changeHeight() {
  var theBox = document.getElementById('fshLinesToShow');
  var boxVal = parseInt(theBox.value, 10);
  if (testHeightValid(boxVal)) {return;}
  bioEditLines = boxVal;
  setValue('bioEditLines', boxVal);
  document.getElementById('textInputBox').rows = bioEditLines;
}

function bioHeight() {
  var bioEditLinesDiv = createDiv({
    innerHTML: ' Display <input id="fshLinesToShow"' +
      ' type="number" min="1" max="99" value="' +
      bioEditLines + '"/> Lines '
  });
  var saveLines = createInput({
    className: 'custombutton',
    value: 'Update Rows To Show',
    type: 'button'
  });
  saveLines.addEventListener('click', changeHeight);
  bioEditLinesDiv.appendChild(saveLines);
  pCC.appendChild(bioEditLinesDiv);
}

function updateBioCharacters() {
  var textArea = document.getElementById('textInputBox');
  var previewArea = document.getElementById('biopreview');
  var bioContents = convertTextToHtml(textArea.value);
  bioContents = renderBio(bioContents);
  if (bioContents) {
    previewArea.innerHTML = bioContents;
  }
}

function injectBioWidgets() {
  bioEditLines = getValue('bioEditLines');
  var textArea = document.getElementById('textInputBox');
  bioPreview();
  bioWords();
  bioHeight();
  textArea.rows = bioEditLines;
  textArea.classList.add('fshNoResize');

  textArea.parentNode.addEventListener('click', bioEvtHdl);
  textArea.addEventListener('keyup', updateBioCharacters);
  // Force the preview area to render
  updateBioCharacters();
}

function removeGuildAvyImgBorder() {
  document.querySelector('#pCC img[oldtitle$="\'s Logo"]')
    .removeAttribute('style');
}

function guildXPLock() {
  var xpLock = document
    .querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
  if (!xpLock) {return;}
  var xpLockmouseover = xpLock.getAttribute('data-tipped');
  var xpLockXP = getIntFromRegExp(xpLockmouseover,
    /XP Lock: <b>(\d*)/);
  var actualXP = getIntFromRegExp(xpLockmouseover,
    /XP: <b>(\d*)/);
  if (actualXP < xpLockXP) {
    xpLock.parentNode.nextElementSibling.insertAdjacentHTML('beforeend',
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
    xmlhttp(
      'index.php?cmd=guild&subcmd=conflicts&subcmd2=&page=' +
      (curPage + 1) + '&search_text=',
      gotConflictInfo,
      {node: callback.node});
  }
}

function conflictInfo() { // jQuery
  $.get('index.php?cmd=guild&subcmd=conflicts').done(function(data) {
    gotConflictInfo(data,
      {node: document.getElementById('statisticsControl')});
  });
}

function logoToggle() {
  var changeLogoCell = leftHandSideColumnTable.rows[0].cells[1].firstChild;
  changeLogoCell.insertAdjacentHTML('beforeend', '[ <span class="fshLink' +
    ' tip-static" id="toggleGuildLogoControl" ' +
    'linkto="guildLogoControl" data-tipped="Toggle Section">X</span> ]');
  var guildLogoElement = leftHandSideColumnTable.rows[2].cells[0]
    .firstChild.nextSibling;
  guildLogoElement.id = 'guildLogoControl';
  if (getValue('guildLogoControl')) {
    guildLogoElement.classList.add('fshHide');
  }
  document.getElementById('toggleGuildLogoControl')
    .addEventListener('click', toggleVisibilty);
}

function statToggle() {
  var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].firstChild;
  leaveGuildCell.insertAdjacentHTML('beforeend', '<span class="fshNoWrap">' +
    '[ <span class="fshLink tip-static" id="toggleStatisticsControl" ' +
    'linkto="statisticsControl" data-tipped="Toggle Section">X</span> ]' +
    '</span>');
  var statisticsControlElement = leftHandSideColumnTable.rows[6].cells[0]
    .firstChild.nextSibling;
  statisticsControlElement.id = 'statisticsControl';
  if (getValue('statisticsControl')) {
    statisticsControlElement.classList.add('fshHide');
  }
  document.getElementById('toggleStatisticsControl')
    .addEventListener('click', toggleVisibilty);
}

function structureToggle() {
  var buildCell = leftHandSideColumnTable.rows[15].cells[1].firstChild;
  buildCell.insertAdjacentHTML('beforeend', '[ <span class="fshLink ' +
    'tip-static" id="toggleGuildStructureControl" ' +
    'linkto="guildStructureControl" data-tipped="Toggle Section">X</span> ]');
  var guildStructureControlElement = leftHandSideColumnTable.rows[17]
    .cells[0].firstChild.nextSibling;
  guildStructureControlElement.id = 'guildStructureControl';
  if (getValue('guildStructureControl')) {
    guildStructureControlElement.classList.add('fshHide');
  }
  document.getElementById('toggleGuildStructureControl')
    .addEventListener('click', toggleVisibilty);
}

function batchBuffLinks() {
  var limit = performance.now() + 5;
  while (performance.now() < limit && memCount < members.length) {
    members[memCount].parentNode.insertAdjacentHTML('beforeend',
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
  selfRecall.insertAdjacentHTML('beforeend',
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

  // Detailed conflict information
  if (getValue('detailedConflictInfo')) {
    add(3, conflictInfo);
  }

}

function doItemTable(rows) {
  for (var i = 1; i < rows.length - 1; i += 2) {
    rows[i].cells[2].insertAdjacentHTML('beforeend',
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
  takeItem(itmId).done(takeResult$1.bind(null, el));
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

function injectGuildAddTagsWidgets() {
  pCC.addEventListener('click', evtHdlr);

  var nodeList = pCC.getElementsByTagName('table');
  var itemTable = nodeList[nodeList.length - 1];
  if (itemTable) {doItemTable(itemTable.rows);}

  var checkAll = createInput({type: 'button', value: 'Check All'});
  nodeList[0].rows[5].cells[0].appendChild(checkAll);
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
  linkElement.insertAdjacentHTML('afterbegin', '<span class="fshBlue">(' +
    Math.round(10 * count) / 10 + ') Tax:(' + taxRate + '%)</span> ');
}

function fetchRankData() { // jQuery
  var calcButton = document.getElementById('getrankweightings');
  calcButton.classList.add('fshHide');
  var allItems = document.querySelectorAll('#pCC input[value="Edit"]');
  Array.prototype.forEach.call(allItems, function(anItem) {
    var targetNode = anItem.parentNode.parentNode.previousElementSibling;
    var href = /window\.location='(.*)';/.exec(anItem
      .getAttribute('onclick'))[1];
    $.get(href).done(parseRankData.bind(null, targetNode));
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

function ajaxifyRankControls(evt) { // jQuery
  var val = evt.target.getAttribute('value');
  if (val !== 'Up' && val !== 'Down') {return;}
  evt.stopPropagation();
  var onclickHREF = /window.location='(.*)';/
    .exec(evt.target.getAttribute('onclick'))[1];
  var thisRankRow = evt.target.parentNode.parentNode.parentNode;
  var thisRankRowNum = thisRankRow.rowIndex;
  var targetRowNum = thisRankRowNum + getTargetRowNumber(val);
  var parentTable = thisRankRow.parentNode;
  if (notValidRow(thisRankRowNum, targetRowNum, parentTable)) {return;}
  $.get(onclickHREF);
  var injectRow = parentTable.rows[targetRowNum];
  parentTable.insertBefore(thisRankRow, injectRow);
  var pxScroll = getPxScroll(val);
  window.scrollBy(0, pxScroll);
}

function doButtons() {
  // gather rank info button
  var weightButton = createInput({
    id: 'getrankweightings',
    className: 'custombutton',
    type: 'button',
    value: 'Get Rank Weightings'
  });
  weightButton.addEventListener('click', fetchRankData);
  var theTd = document.getElementById('show-guild-founder-rank-name')
    .parentNode;
  theTd.insertAdjacentHTML('beforeend', '&nbsp;');
  theTd.insertAdjacentElement('beforeend', weightButton);

  if (getValue('ajaxifyRankControls')) {
    pCC.addEventListener('click',
      ajaxifyRankControls, true);
  }
}

function writeMembers(el) {
  var rankCell = el.firstElementChild;
  var rankName = rankCell.textContent;
  if (ranks[rankName]) { // has members
    if (rankName === myRank) {
      characterRow = rankCount; // limit for ajaxify later
    }
    rankCell.insertAdjacentHTML('beforeend', ' <span class="fshBlue">- ' +
      ranks[rankName].join(', ') + '</span>');
  }
}

function paintRanks() {
  var limit = performance.now() + 10;
  while (performance.now() < limit &&
      rankCount < theRows.length) {
    var el = theRows[rankCount];

    writeMembers(el);

    rankCount += 1;
  }
  if (rankCount < theRows.length) {
    add(3, paintRanks);
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
  theRows = pCC.firstElementChild
    .nextElementSibling.rows[13].firstElementChild.firstElementChild.rows;
  rankCount = 1;
  add(3, paintRanks);
}

function injectGuildRanks() { // jQuery
  getMembrList(true).done(function(membrList) {
    add(3, getRanks, [membrList]);
  });
  add(3, doButtons);
}

var invManFilter =
  '<table class="fshInvFilter">' +
  '<tr><th colspan="14">@@reportTitle@@</th>' +
  '<th><span id="fshRefresh">[Refresh]</span></th></tr>' +
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

function getT(player_id) {
  if (player_id === -1) {return 4;}
  return 1;
}

function player(invPlayer, rowPlayer, guild) {
  if (invPlayer) {return invPlayer;}
  if (rowPlayer !== -1) {return rowPlayer;}
  return guild;
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
  if (row.stats && row.stats.set_name !== '') {
    _setName = ' (<span class="fshLink setName" set="' + row.stats.set_name +
      '">set</span>)';
  }

  return '<a href="index.php?cmd=auctionhouse&search_text=' + data +
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

function whereData(row) {
  return fallback(row.folder_id, row.player_id);
}

function whereRenderUserFolder(row) {
  if (row.equipped) {return -2;}
  return parseInt(row.folder_id, 10);
}

function playerName$3(f) {
  if (!calf.membrList[f]) {return '???';}
  return calf.membrList[f].username;
}

function whereRender(data, type, row) {
  if (row.folder_id) {
    return whereRenderUserFolder(row);
  }
  if (row.player_id === -1) {return '~';}
  return playerName$3(row.player_id);
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
  var folderSelect = '<select class="moveItem" data-inv="' + row.inv_id +
    '">';
  var keysArray = Object.keys(theInv.folders)
    .sort(function(a, b) {return a - b;});
  keysArray.forEach(function(value) {
    folderSelect += '<option value="' + value + '"' +
      isSelected(value, row.folder_id) + '>' +
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

function craftRender(craft) {
  if (craftHash[craft]) {return craftHash[craft].abbr;}
  return '';
}

function durabilityRender(data, type, row) {
  if (parseInt(row.max_durability, 10) > 0) {
    return Math.ceil(row.durability / row.max_durability * 100);
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

function gsDisplayType(_data, type, row) {
  if (type === 'display') {
    return '<span class="fshLink recallItem" invid="' +
    row.inv_id + '" playerid="' +
    fallback(row.player_id, theInv.player_id) +
    '" mode="1" action="recall">GS</span>';
  }
  return 'GS';
}

function gsRender(_data, type, row) {
  if (row.player_id && row.player_id !== -1 ||
      row.folder_id && row.guild_tag !== '-1') {
    return gsDisplayType(_data, type, row);
  }
}

var actionTypes = [
  {
    test: function(row) {return row.player_id && row.player_id === -1;},
    wearAction: function(row) {
      return 'takeItem" invid="' + row.inv_id + '" action="wear';
    },
    useAction: function(row) {
      return 'takeItem" invid="' + row.inv_id + '" action="use';
    }
  },
  {
    test: function(row) {
      return row.player_id &&
        row.player_id !== theInv.current_player_id;
    },
    wearAction: function(row) {
      return 'recallItem" invid="' + row.inv_id +
        '" playerid="' + row.player_id + '" mode="0" action="wear';
    },
    useAction: function(row) {
      return 'recallItem" invid="' + row.inv_id +
        '" playerid="' + row.player_id + '" mode="0" action="use';
    }
  },
  {
    test: function(row) {
      return row.folder_id && !row.equipped ||
        row.player_id && !row.equipped &&
        row.player_id === theInv.current_player_id;
    },
    wearAction: function(row) {return 'wearItem" invid="' + row.inv_id;},
    useAction: function(row) {return 'useItem" invid="' + row.inv_id;}
  }
];

function wearRender(row) {
  for (var i = 0; i < actionTypes.length; i += 1) {
    if (actionTypes[i].test(row)) {
      return '<span class="fshLink ' + actionTypes[i].wearAction(row) +
        '">Wear</span>';
    }
  }
  return '';
}

function useRender(row) {
  for (var i = 0; i < actionTypes.length; i += 1) {
    if (actionTypes[i].test(row)) {
      return '<span class="fshLink ' + actionTypes[i].useAction(row) +
        '">Use</span>';
    }
  }
  return '';
}

function wuRender(data, _type, row) {
  var action = {
    '0': 'Wear',
    '1': 'Wear',
    '2': 'Wear',
    '3': 'Wear',
    '4': 'Wear',
    '5': 'Wear',
    '6': 'Wear',
    '7': 'Wear',
    '8': 'Wear',
    '10': 'Use',
    '11': 'Use',
    '15': 'Use'
  }[data];
  if (action === 'Wear') {
    action = wearRender(row);
  } else if (action === 'Use') {
    action = useRender(row);
  }
  return action;
}

function dropRender(data, type, row) {
  if (fallback(row.guild_tag !== '-1', row.equipped)) {return;}
  if (type !== 'display') {return 'Drop';}
  return '<span class="dropItem tip-static dropLink" data-tipped=' +
    '"INSTANTLY DESTROY THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Drop</span>';
}

function sendRender(data, type, row) {
  if (fallback(row.bound, row.equipped)) {return;}
  if (type !== 'display') {return 'Send';}
  return '<span class="sendItem tip-static sendLink" data-tipped=' +
    '"INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Send</span>';
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
    columns: [
      {
        title: 'Name',
        data: 'item_name',
        render: nameRender
      },
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
      {
        title: 'Du%',
        data: 'durability',
        render: durabilityRender
      },
      {
        title: 'BP',
        data: whereData,
        render: bpRender
      },
      {
        title: 'GS',
        data: whereData,
        render: gsRender
      },
      {
        title: 'W/U',
        data: 'type',
        render: wuRender
      },
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
          if (tag === '-1') {return 'No';}
          return 'Yes';
        }
      },
      {
        title: 'Drop',
        data: 'type',
        render: dropRender
      },
      {
        title: 'Send',
        data: 'type',
        render: sendRender
      }
    ],
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

function dropItem(invIdList) {
  return $.ajax({
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

function moveItem(invIdList, folderId) {
  return $.ajax({
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

function sendItem(invIdList) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'trade',
      subcmd: 'senditems',
      xc: window.ajaxXC,
      target_username: getValue('itemRecipient'),
      sendItemList: invIdList
    }
  }).pipe(htmlResult)
    .done(dialog);
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

function setFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      return !options.checkedElements ||
        !options.checkedElements['-1'] ||
        options.checkedElements['-1'] &&
        data.stats &&
        data.stats.set_id !== '-1';
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

/* jshint latedef: nofunc */
var options;
var showQuickDropLinks;
var showQuickSendLinks;
var theInv;

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

function decorate() {
  if (theInv.folders) {
    theInv.folders['-1'] = 'Main';
  }
  // Hide composed potions until Zorg fixes the feed
  theInv.items =
    theInv.items.filter(function(obj) {
      return obj.type !== '15';
    });
  //
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

function setChecks() {
  Array.prototype.forEach.call(
    document.querySelectorAll('table.fshInvFilter input[type="checkbox"]'),
    function(el) {
      el.checked =
        options.checkedElements[el.getAttribute('item')] === 1;
    });
  setForage('fsh_inventory', options);
}

function setLvls() { // jQuery
  $('#fshMinLvl').val(options.fshMinLvl);
  $('#fshMaxLvl').val(options.fshMaxLvl);
}

function refresh() {
  doSpinner();
  // eslint-disable-next-line no-use-before-define
  syncInvMan();
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

function resetLvls$1() { // jQuery
  options.fshMinLvl = defaults.inventoryMinLvl;
  options.fshMaxLvl = defaults.inventoryMaxLvl;
  setForage('fsh_inventory', options);
  $('#fshMinLvl').val(options.fshMinLvl);
  $('#fshMaxLvl').val(options.fshMaxLvl);
  $('#fshInv').DataTable().draw(false);
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

function allChecks() { // jQuery
  options.checkedElements = inventoryCheckAll;
  setChecks();
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

function resetChecks() { // jQuery
  options.checkedElements = defaults.inventoryCheckedElements;
  setChecks();
  $('#fshInv').DataTable().draw(false);
}

function setName(e) { // jQuery
  $('#fshInv').DataTable().search($(e.target).attr('set')).draw();
  $('#fshInv_filter input').focus();
}

function removeClass(self) {
  self.closest('tr')
    .find('.takeItem, .recallItem, .wearItem, .dropItem, .sendItem')
    .removeClass().qtip('hide');
}

function killRow(self) { // jQuery
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

function takeItem$1(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  queueTakeItem(self.attr('invid'), self.attr('action'))
    .done(function(data) {
      if (data.r === 1) {return;}
      killRow(self);
    });
  anotherSpinner(self);
}

function recallItem$1(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  queueRecallItem({
    invId: self.attr('invid'),
    playerId: self.attr('playerid'),
    mode: self.attr('mode'),
    action: self.attr('action')
  })
    .done(function(data) {
      if (data.r === 1) {return;}
      killRow(self);
    });
  anotherSpinner(self);
}

function wearItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  equipItem(self.attr('invid')).done(function(data) {
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function useItem$1(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  useItem$1(self.attr('invid')).done(function(data) {
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function doMoveItem(e) { // jQuery
  var self = $(e.target);
  moveItem([self.data('inv')], self.val());
}

function doDropItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  dropItem([self.data('inv')]).done(function(data) {
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function doSendItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  sendItem([self.data('inv')]).done(function(data) {
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function eventHandlers() { // jQuery
  $('#fshRefresh').click(refresh);
  $('#fshMinLvl, #fshMaxLvl').keyup(changeLvls$1);
  $('#fshReset').click(resetLvls$1);
  $('table.fshInvFilter').on('click', 'input[type="checkbox"]', getChecks);
  $('#fshAll').click(allChecks);
  $('#fshNone').click(clearChecks);
  $('#fshDefault').click(resetChecks);
  $('#fshInv').on('click', 'span.setName', setName);
  $('#fshInv').on('click', 'span.takeItem', takeItem$1);
  $('#fshInv').on('click', 'span.recallItem', recallItem$1);
  $('#fshInv').on('click', 'span.wearItem', wearItem);
  $('#fshInv').on('click', 'span.useItem', useItem$1);
  $('#fshInv').on('change', 'select.moveItem', doMoveItem);
  $('#fshInv').on('click', 'span.dropItem', doDropItem);
  $('#fshInv').on('click', 'span.sendItem', doSendItem);
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

function getInvMan() {

  time('inventory.getInvMan');

  showQuickDropLinks = getValue('showQuickDropLinks');
  showQuickSendLinks = getValue('showQuickSendLinks');

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
  clearButton();

  timeEnd('inventory.getInvMan');

}

function extendOptions(data) {
  options = fallback(data, {});
  options.fshMinLvl = fallback(options.fshMinLvl,
    defaults.inventoryMinLvl);
  options.fshMaxLvl = fallback(options.fshMaxLvl,
    defaults.inventoryMaxLvl);
  options.checkedElements = fallback(options.checkedElements,
    defaults.inventoryCheckedElements);
}

function syncInvMan() { // jQuery
  var prm = [];
  prm.push(getInventory().done(function(data) {
    theInv = data;
  }));
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

var cn$1;

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
  cn$1 += 1;
  $('#take_result').append('<br>' + cn$1 + '. Item taken.');
}

function takeAllSimilar(evt) { // jQuery.min
  var invIds = evt.target.getAttribute('invIDs').split(',');
  evt.target.parentNode.innerHTML = 'taking all ' +
    invIds.length + ' items';
  cn$1 = 0;
  invIds.forEach(function(invId) {
    $.ajax({
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
    document.getElementById('Helper:takeAllSimilar' + id)
      .addEventListener('click', takeAllSimilar, true);
  });
  document.getElementById('mailboxSwitcher')
    .addEventListener('click', toggleQuickTake, true);
}

var monsterAry;

function noMobs() {
  pCC.innerHTML = '<span>No monster information! ' +
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
  var inject = document.getElementById('entityTableOutput');
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
  var headerClicked = target.getAttribute('sortKey');
  if (typeof calf.sortAsc === 'undefined') {calf.sortAsc = true;}
  if (calf.sortBy && calf.sortBy === headerClicked) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
  var sortType = findSortType(target);
  sortMonsterAry(sortType);
  drawMobs();
}

function doHandlers(evt) {
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
  var content = pCC;
  if (!monsterAry || !content) {return;}
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
    if (enhancements && enhancements.length > 0) {
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

function injectMonsterLog() {
  getForage('fsh_monsterLog').done(prepAry);
}

var playerId$3;

function getPlayer(playerAry) { // Legacy
  if (playerAry) {return Number(playerAry[1]);}
  return 0;
}

function findPlayers(aRow) { // Legacy
  var messageHTML = aRow.cells[2].innerHTML;
  var doublerPlayerMessageRE =
    /member\s<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
  var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
  var singlePlayerMessageRE =
    /<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
  var firstPlayer = singlePlayerMessageRE.exec(messageHTML);

  var firstPlayerID = getPlayer(firstPlayer);
  var secondPlayerID = getPlayer(secondPlayer);

  if (firstPlayer && firstPlayerID !== playerId$3 &&
      secondPlayerID !== playerId$3) {
    for (var j = 0; j < 3; j += 1) {
      aRow.cells[j].removeAttribute('class');
    }
    aRow.classList.add('fshGrey');
    aRow.classList.add('fshXXSmall');
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

  playerId$3 = playerId();

  for (var i = 1; i < logTable.rows.length; i += 2) {
    var aRow = logTable.rows[i];
    processGuildWidgetRow(aRow);
  }
}

function addGuildLogWidgets() { // Legacy
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
  } else if (postAgeMins > 20 && postDateUtc <= lastCheckUtc) {
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

var depoRe = /deposited ([,0-9]+) FallenSword Points into the guild./;
var lookup = [
  {
    condition: function(data) {return data.indexOf('(Potion)') !== -1;},
    id: 1
  },
  {
    condition: function(data) {
      return data.indexOf('recalled the item') !== -1;
    },
    id: 2
  },
  {
    condition: function(data) {
      return data.indexOf('took the item') !== -1;
    },
    id: 2
  },
  {
    condition: function(data) {
      return data.indexOf('auto-returned the') !== -1;
    },
    id: 2
  },
  {
    condition: function(data) {
      return data.indexOf('stored the item') !== -1;
    },
    id: 2
  },
  {
    condition: function(data) {
      return data.indexOf('has added flags to') !== -1;
    },
    id: 3
  },
  {
    condition: function(data) {
      return data.indexOf('has removed flags to') !== -1;
    },
    id: 3
  },
  {
    condition: function(data) {
      return data.indexOf(
        'relic. This relic now has an empower level of') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf(
        'relic. The relic empower level has been reset to zero.') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('failed to capture the relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('captured the relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('captured your relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('has captured the undefended relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('attempted to capture your relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return / empowered the .+ relic/.test(data);
    },
    id: 4
  },
  {
    condition: function(data) {
      return / removed the empowerment from the .+ relic/.test(data);
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('disbanded a mercenary.') !== -1;
    },
    id: 5
  },
  {
    condition: function(data) {
      return data.indexOf('hired the mercenary') !== -1;
    },
    id: 5
  },
  {
    condition: function(data) {
      return data.indexOf('has disbanded one of their groups') !== -1;
    },
    id: 6
  },
  {
    condition: function(data) {
      return /A group from your guild was (.*) in combat./.test(data);
    },
    id: 6
  },
  {
    condition: function(data) {
      return /deposited ([,0-9]+) gold into the guild bank/.test(data);
    },
    id: 7
  },
  {
    condition: function(data) {
      return depoRe.test(data);
    },
    id: 7
  },
  {
    condition: function(data) {
      return data.indexOf('has added a new rank entitled') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has deleted the rank') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has requested to join the guild') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has invited the player') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has officially joined the guild') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has been kicked from the guild by') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has left the guild') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has been assigned the rank') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return /resulted in (.*) with a final score of/.test(data);
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf('resulted in a draw. Your GvG rating ') !== -1;
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf(
        'has just initiated a conflict with the guild') !== -1;
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf('has initiated a conflict with your guild') !== -1;
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf('is participating in the conflict ' +
        'against the guild') !== -1;
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf('bought the Titan Reward item') !== -1;
    },
    id: 10
  },
  {
    condition: function(data) {
      return data.indexOf('from your guild\'s contribution to the ' +
        'defeat of the titan') !== -1;
    },
    id: 10
  },
  {
    condition: function(data) {
      return data.indexOf('a 7 day cooldown has been activated ' +
        'on your guild for this titan') !== -1;
    },
    id: 10
  }
];

function rowProfile(data) {
  for (var i = 0; i < lookup.length; i += 1) {
    var test = lookup[i];
    if (test.condition(data)) {return test.id;}
  }
  return 0;
}

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
  return $.ajax({
    url: 'index.php',
    data: {cmd: 'guild', subcmd: 'log', page: page},
    datatype: 'html'
  });
}

function findPageInput(prev, curr) {
  var output = prev;
  if (!prev && curr.name === 'page') {output = curr;}
  return output;
}

function getPageInput() {
  var inputList = doc.getElementById('pCC')
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

function getTableList(tableList) {
  var theTable = tableList[0];
  var limit = theTable.rows.length - 1;
  for (var i = 1; i < limit; i += 2) {
    var myRow = theTable.rows[i];
    var myDate = myRow.cells[1].textContent;
    var timestamp = parseDateAsTimestamp(myDate);
    var myMsg = myRow.cells[2].innerHTML;
    if (currPage === 1 &&
        options$1.log &&
        timestamp === options$1.log[0][0] &&
        myMsg === options$1.log[0][2]) {
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
  myTable.insertAdjacentHTML('beforeend', headerRow);

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

  var injector = document.getElementById('fshInjectHere');
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
  tmpGuildLog.forEach(function(r) {
    if (r[4] !== item) {return;}
    r[5].classList.toggle('fshHide');
    r[6].classList.toggle('fshHide');
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

function refresh$1() {
  options$1.log = false;
  storeOptions();
  fshOutput.textContent = 'Loading Page 1 ...';
  tmpGuildLog = [];
  completeReload = true;
  document.getElementById('fshInjectHere').innerHTML = '';
  getGuildLogPage(1).done(processFirstPage$1);
}

var guildLogEvents = [
  {test: function(self) {return self.tagName === 'INPUT';}, fn: toggleItem},
  {test: function(self) {return self.id === 'fshAll';}, fn: selectAll},
  {test: function(self) {return self.id === 'fshNone';}, fn: selectNone},
  {test: function(self) {return self.id === 'rfsh';}, fn: refresh$1}
];

function eventHandler$2(evt) {
  var self = evt.target;
  for (var i = 0; i < guildLogEvents.length; i += 1) {
    if (guildLogEvents[i].test(self)) {guildLogEvents[i].fn(self);}
  }
}

function gotOptions(guildLog) {
  options$1 = guildLog || options$1;
  options$1.checks = options$1.checks || defChecks.slice(0);
  pCC.innerHTML = guildLogFilter;
  fshNewGuildLog = document.getElementById('fshNewGuildLog');
  fshNewGuildLog.addEventListener('click', eventHandler$2);
  setChecks$1();
  fshOutput = document.getElementById('fshOutput');
  maxPagesToFetch = Number(getValue('newGuildLogHistoryPages'));
  maxPage$1 = maxPagesToFetch;
  getGuildLogPage(1).done(processFirstPage$1);
}

function injectNewGuildLog() {
  getForage('fsh_guildLog').done(gotOptions);
}

function reduceStatTable(prev, curr, index) {
  var key = curr.cells[0].textContent.trim().replace(':', '');
  if (!key) {return prev;}
  prev[key] = {ind: index};
  if (curr.cells[1] && curr.cells[1].textContent) {
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
  getLastIndex(statObj, statTable).insertAdjacentHTML('beforebegin',
    '<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">' +
    totalStats + '&nbsp;</td></tr>');
}

function fshDataFilter(data) {
  var container = createDiv();
  container.insertAdjacentHTML('beforeend', data);
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

var disableDeactivatePrompts = getValue('disableDeactivatePrompts');

function debuff(buffId) {
  return $.ajax({
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
  confirm('Remove Skill', warn, function() {
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
  var profileRightColumn = document.getElementById('profileRightColumn')
    .lastElementChild;
  profileRightColumn.addEventListener('click', interceptDebuff, true);
}

function backpackRemove$1(invId) { // jQuery
  var _invId = parseInt(invId, 10);
  var theBackpack = $('#backpackContainer').data('backpack');
  // remove from srcData
  theBackpack.srcData.some(function(el, i, ary) {
    if (el.a === _invId) {
      ary.splice(i, 1);
      return true;
    }
    return false;
  });
}

function fastWearUse(evt) { // jQuery
  var InventoryItemID = evt.target.getAttribute('itemID');
  useItem(InventoryItemID).done(function(data) {
    if (data.r !== 0) {return;}
    backpackRemove$1(InventoryItemID);
    evt.target.parentNode.innerHTML = '<span class="fastWorn">Used</span>';
  });
}

function fastWearEquip(e) { // jQuery
  var self = e.target;
  var invId = self.getAttribute('itemid');
  equipItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    backpackRemove$1(invId);
    // TODO Insert item from worn
    self.parentNode.innerHTML = '<span class="fastWorn">Worn</span>';
  });
}

function actionClass(usable) {
  if (usable) {return 'fastUse';}
  return 'fastWear';
}

function actionText(usable) {
  if (usable) {return 'Use';}
  return 'Wear';
}

function drawButtons(theSpan) {
  var toUse = theSpan.classList.contains('backpackContextMenuUsable');
  var myDiv = createDiv({
    className: 'fastDiv',
    innerHTML: '<span class="' + actionClass(toUse) +
      '" itemid="' + theSpan.getAttribute('data-inv') + '">' +
      actionText(toUse) + '</span>&nbsp;'
  });
  if (theSpan.parentNode.nextElementSibling) {
    myDiv.appendChild(theSpan.parentNode.nextElementSibling.nextElementSibling);
  }
  theSpan.parentNode.parentNode.appendChild(myDiv);
}

function fastWearLinks() {
  var bpTabs = document.getElementById('backpack_tabs');
  var type = bpTabs.getElementsByClassName('tab-selected')[0]
    .getAttribute('data-type');
  var items = document.querySelectorAll('#backpackTab_' + type +
    ' .backpackContextMenuEquippable,.backpackContextMenuUsable');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, drawButtons);
}

function injectFastWear() { // jQuery
  if (!getValue('enableQuickDrink')) {return;}
  var bpBack = document.getElementById('backpack');
  bpBack.className = 'fshBackpack';
  bpBack.removeAttribute('style');
  var backpackContainer = document.getElementById('backpackContainer');
  var theBackpack = $(backpackContainer).data('backpack');
  var oldShow = theBackpack._showPage;
  theBackpack._showPage = function(type, page) {
    oldShow.call(theBackpack, type, page);
    fastWearLinks();
  };
  if (document.getElementById('backpack_current').textContent.length !== 0) {
    add(3, fastWearLinks);
  }
  backpackContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('fastWear')) {fastWearEquip(e);}
    if (e.target.classList.contains('fastUse')) {fastWearUse(e);}
  });
}

var profileCombatSetDiv;

function getNekid() { // jQuery
  var profileBlock = profileCombatSetDiv.nextElementSibling;
  var aLinks = profileBlock.getElementsByTagName('a');
  var prm = [];
  Array.prototype.forEach.call(aLinks, function(link) {
    var href = link.href;
    prm.push($.ajax({
      url: href,
      timeout: 3000
    }).pipe(null, function() {return $.when();}));
  });
  $.when.apply($, prm).done(function() {
    location.assign('index.php?cmd=profile');
  });
}

function nekidBtn() {
  var profileRightColumn = document.getElementById('profileRightColumn');
  profileCombatSetDiv = document.getElementById('profileCombatSetDiv');
  var targetBr = profileCombatSetDiv.parentElement.nextElementSibling;
  var nekidDiv = createDiv({className: 'fshCenter'});
  var theBtn = createButton({
    className: 'fshBl fshBls',
    textContent: 'Nekid'
  });
  nekidDiv.insertAdjacentText('beforeend', '[ ');
  nekidDiv.insertAdjacentElement('beforeend', theBtn);
  nekidDiv.insertAdjacentText('beforeend', ' ]');
  profileRightColumn.replaceChild(nekidDiv, targetBr);
  theBtn.addEventListener('click', getNekid);
}

var quickDelDiv;
var sumComp;
var delAllDiv;
var compDel;
var compSum;
var compDelAll;
var thisInvTable;
var componentList = {};
var usedCount;
var usedCountDom;
var totalCount;
var pageCount;

function getInvTables(doc) {
  return doc.getElementById('profileRightColumn')
    .getElementsByClassName('inventory-table');
}

function tallyComponent(visible, el) {
  var mouseover = el.getAttribute('data-tipped');
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
  tbl.appendChild(tBody);
  tBody.insertAdjacentHTML('beforeend',
    '<tr><td colspan="3">Component Summary</td></tr>' +
    Object.keys(componentList).reduce(tallyTableRow, ''));
  var totRow = tbl.insertRow(-1);
  totRow.insertAdjacentHTML('beforeend', '<td>Total:</td>');
  var totCell = totRow.insertCell(-1);
  totCell.colSpan = 2;
  usedCountDom = createSpan();
  usedCountDom.innerHTML = usedCount.toString();
  totCell.appendChild(usedCountDom);
  totCell.insertAdjacentText('beforeend', ' / ' + totalCount.toString());
  sumComp.innerHTML = '';
  sumComp.appendChild(tbl);
}

function gotComponentsPage(data) {
  pageCount += 1;
  sumComp.insertAdjacentHTML('beforeend', pageCount + ', ');
  retriveComponent(createDocument(data));
}

function countComponent(self) { // jQuery.min
  self.parentNode.innerHTML = 'Retrieve page: 1, ';
  usedCount = 0;
  totalCount = 0;
  pageCount = 1;
  var prm = [$.when(document).done(retriveComponent)];
  var lastRowIndex = thisInvTable.rows.length - 1;
  var pageLinks = thisInvTable.rows[lastRowIndex].firstChild.children;
  Array.prototype.forEach.call(pageLinks, function(el) {
    if (el.children.length === 0) {
      prm.push($.get(el.href).done(gotComponentsPage));
    }
  });
  $.when.apply($, prm).done(displayComponentTally);
}

function delAllComponent() {
  var nodeList = thisInvTable.getElementsByClassName('compDelBtn');
  Array.prototype.forEach.call(nodeList, function(el) {
    el.click();
  });
}

function compDeleted(self, data) {
  var response = infoBox(data);
  if (response === 'Component destroyed.') {
    self.parentNode.innerHTML = '';
  } else {
    $('#dialog_msg').html(response).dialog('open');
  }
}

function delComponent(self) { // jQuery.min
  var href = self.previousElementSibling.href;
  $.get(href).done(compDeleted.bind(null, self));
}

function addDelBtn(el) {
  el.parentNode.parentNode.insertAdjacentHTML('beforeend',
    '<span class="compDelBtn">Del</span>');
}

function enableDelComponent() {
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
    prm.push($.get(href).done(updateUsedCount));
  });
  $.when.apply($, prm).done(function() {
    componentList[id].dom.forEach(function(el) {el.innerHTML = '';});
    td.parentNode.remove();
  });
}

var evtHdl = [
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
    test: function(self) {return self.classList.contains('compDelBtn');},
    act: delComponent
  },
  {
    test: function(self) {return self.classList.contains('compDelType');},
    act: delCompType
  }
];

function compEvt(evt) {
  var self = evt.target;
  evtHdl.some(function(el) {
    if (el.test(self)) {
      el.act(self);
      return true;
    }
    return false;
  });
}

function decorateButton(parentDiv, label) {
  var innerSpan = createSpan(
    {className: 'sendLink', textContent: label});
  parentDiv.textContent = '[';
  parentDiv.appendChild(innerSpan);
  parentDiv.insertAdjacentHTML('beforeend', ']');
  return innerSpan;
}

function profileComponents() {
  var invTables = getInvTables(document);
  if (invTables.length !== 2) {return;}
  thisInvTable = invTables[1];
  var compDiv = thisInvTable.parentNode;
  if (compDiv.style.display !== 'block') {return;}
  var cmDiv = createDiv({className: 'fshCenter'});
  quickDelDiv = createDiv();
  sumComp = createDiv();
  delAllDiv = createDiv({className: 'fshHide'});
  compDel = decorateButton(quickDelDiv, 'Enable Quick Del');
  compSum = decorateButton(sumComp, 'Count Components');
  compDelAll = decorateButton(delAllDiv, 'Delete All Visible');
  cmDiv.appendChild(quickDelDiv);
  cmDiv.appendChild(sumComp);
  cmDiv.insertAdjacentHTML('beforeend', '[<a class="fshBlue" ' +
    'href="index.php?cmd=notepad&blank=1&subcmd=quickextract"' +
    '>Quick Extract Components</a>]');
  cmDiv.appendChild(delAllDiv);
  compDiv.appendChild(cmDiv);
  compDiv.addEventListener('click', compEvt);
}

function totalAllyEnemy(target, numberOfContacts, contactsTotal) {
  var _c = '';
  if (contactsTotal && contactsTotal >= numberOfContacts) {
    _c = '/' + contactsTotal;
  }
  target.insertAdjacentHTML('beforeend', '<span class="fshBlue">&nbsp;' +
    numberOfContacts + _c + '</span>');
}

function findAllyEnemy(el) {
  var isAllies = el.textContent === 'Allies';
  var isEnemies = el.textContent === 'Enemies';
  if (!isAllies && !isEnemies) {return;}
  var target = el.parentNode;
  var numberOfContacts = target.nextSibling.nextSibling
    .getElementsByTagName('table').length - 1;
  if (isAllies) {
    totalAllyEnemy(target, numberOfContacts,
      getValue('alliestotal'));
  } else {
    totalAllyEnemy(target, numberOfContacts,
      getValue('enemiestotal'));
  }
}

function profileParseAllyEnemy() {
  // Allies/Enemies count/total function
  Array.prototype.forEach.call(
    document.querySelectorAll('#profileLeftColumn strong'), findAllyEnemy);
}

function expandBio() {
  var bioExpander = document.getElementById('fshBioExpander');
  if (bioExpander.textContent === 'More ...') {
    bioExpander.textContent = 'Less ...';
  } else {
    bioExpander.textContent = 'More ...';
  }
  document.getElementById('fshBioHidden').classList.toggle('fshHide');
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
    if (closeTagIndex !== -1 && (openTagIndex > closeTagIndex ||
        openTagIndex === -1)) {
      extraOpenHTML += '<' + tag + '>';
      extraCloseHTML += '</' + tag + '>';
    }
  });
  bioCell.innerHTML = bioStart + extraCloseHTML + lineBreak +
    '<span id="fshBioExpander" class="sendLink">More ...</span><br>' +
    '<span class="fshHide" id="fshBioHidden">' + extraOpenHTML + bioEnd +
    '</span>';
  document.getElementById('fshBioExpander')
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

function compressBio(bioCell) {
  var bioContents = bioCell.innerHTML;
  var maxCharactersToShow = getValue('maxCompressedCharacters');
  var maxRowsToShow = getValue('maxCompressedLines');
  var numberOfLines = bioContents.substr(0, maxCharactersToShow)
    .split(/<br>\n/).length - 1;
  if (bioContents.length <= maxCharactersToShow &&
      numberOfLines < maxRowsToShow) {return;}
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

function testForRender(self, bioCell) {
  if (self && getValue('renderSelfBio') ||
      !self && getValue('renderOtherBios')) {
    doRender(bioCell);
  }
}

function profileRenderBio(self) {
  var bioCell = document.getElementById('profile-bio');
  if (!bioCell) {return;}
  testForRender(self, bioCell);
  if (getValue('enableBioCompressor')) {compressBio(bioCell);}
  bioCell.addEventListener('click', bioEvtHdl);
}

var guildId$1;
var currentGuildRelationship;
var guildMessages = {
  self: {
    color: 'fshGreen',
    message: getValue('guildSelfMessage')
  },
  friendly: {
    color: 'fshOliveDrab',
    message: getValue('guildFrndMessage')
  },
  old: {
    color: 'fshDarkCyan',
    message: getValue('guildPastMessage')
  },
  enemy: {
    color: 'fshRed',
    message: getValue('guildEnmyMessage')
  }
};

function quickWearLink() {
  // quick wear manager link
  var node = document.querySelector('#profileRightColumn ' +
    'a[href="index.php?cmd=profile&subcmd=togglesection&section_id=2"]');
  if (!node) {return;}
  node.parentNode.insertAdjacentHTML('beforeend',
    '&nbsp;[<a href="/index.php?cmd=notepad&blank=1&subcmd=quickwear" ' +
    'class="fshBlue">Quick&nbsp;Wear</a>]');
}

function profileSelectAll() {
  var bpTabs = document.getElementById('backpack_tabs');
  var type = bpTabs.getElementsByClassName('tab-selected')[0]
    .getAttribute('data-type');
  var items = document.querySelectorAll('#backpackTab_' + type +
    ' li:not(.hcsPaginate_hidden) .backpackItem');
  if (items.length === 0) {return;}
  var checkboxes = document.querySelectorAll('#backpackTab_' + type +
    ' li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)');
  if (checkboxes.length > 0) {items = checkboxes;}
  Array.prototype.forEach.call(items, function(el) {
    el.click();
  });
}

function selectAllLink() {
  // select all link
  var node = document.querySelector('#profileRightColumn' +
    ' a[href="index.php?cmd=profile&subcmd=dropitems"]');
  if (!node) {return;}
  var allSpan = createSpan({className: 'smallLink', textContent: 'All'});
  allSpan.addEventListener('click', profileSelectAll);
  var wrapper = createSpan({innerHTML: '[&nbsp;'});
  wrapper.appendChild(allSpan);
  wrapper.insertAdjacentHTML('beforeend', '&nbsp;]&nbsp;');
  node.parentNode.appendChild(wrapper);
}

function storeVL() {
  // store the VL of the player
  var virtualLevel = parseInt(
    document.getElementById('stat-vl').textContent, 10);
  if (intValue(document.getElementsByClassName('stat-level')[0]
    .nextElementSibling.textContent) === virtualLevel) {
    setValue('characterVirtualLevel', ''); // ?
  } else {
    setValue('characterVirtualLevel', virtualLevel);
  }
}

function guildAry(val) {
  if (val) {
    return val.toLowerCase().replace(/\s\s*/g, ' ').split(/\s*,\s*/);
  }
  return [];
}

function guildRelationship(_txt) {
  var scenario = [
    {test: guildAry(getValue('guildSelf')), type: 'self'},
    {test: guildAry(getValue('guildFrnd')), type: 'friendly'},
    {test: guildAry(getValue('guildPast')), type: 'old'},
    {test: guildAry(getValue('guildEnmy')), type: 'enemy'}
  ];
  var txt = _txt.toLowerCase().replace(/\s\s*/g, ' ');
  for (var i = 0; i < scenario.length; i += 1) {
    if (scenario[i].test.indexOf(txt) !== -1) {return scenario[i].type;}
  }
}

function foundGuildLink(aLink) {
  var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
  if (guildIdResult) {guildId$1 = parseInt(guildIdResult[1], 10);}
  currentGuildRelationship = guildRelationship(aLink.text);
  if (currentGuildRelationship) {
    aLink.parentNode.classList.add(
      guildMessages[currentGuildRelationship].color);
    aLink.parentNode.insertAdjacentHTML('beforeend', '<br>' +
      guildMessages[currentGuildRelationship].message);
  }
}

function profileInjectGuildRel() {
  var aLink = document.querySelector(
    '#pCC a[href^="index.php?cmd=guild&subcmd=view&guild_id="]');
  if (aLink) {foundGuildLink(aLink);}
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
  newhtml += '<a class="quickButton tip-static" ' +
    'href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&user=' +
    playername + '" data-tipped="Recall items from ' + playername +
    '" style="background-image: url(\'' + imageServer +
    '/temple/3.gif\');"></a>&nbsp;&nbsp;';
  if (currentGuildRelationship === 'self' &&
      getValue('showAdmin')) {
    newhtml += '<a class="quickButton buttonGuildRank tip-static" href="' +
      'index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=' +
      playerid + '" data-tipped="Rank ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/guilds/' + guildId$1 + '_mini.jpg\');"></a>&nbsp;&nbsp;';
  }
  newhtml += '</div>';
  avyImg.insertAdjacentHTML('afterend', newhtml);
}

function removeStatTable(el) {
  var tde = el.getElementsByTagName('td');
  el.parentNode.innerHTML = tde[0].innerHTML.replace(/&nbsp;/g, ' ') +
    '<div class="profile-stat-bonus">' +
    tde[1].textContent + '</div>';
}

function updateStatistics() {
  var charStats = document.getElementById('profileLeftColumn')
    .getElementsByTagName('table')[0];
  var dodgyTables = charStats.getElementsByTagName('table');
  Array.prototype.forEach.call(dodgyTables, removeStatTable);
}

function ifSelf(self) { // Legacy
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
  }
}

function yuuzhan(playername, avyImg) { // Legacy
  if (playername === 'yuuzhan') {
    avyImg.setAttribute('src',
      'http://evolutions.yvong.com/images/tumbler.gif');
    avyImg.addEventListener('click', function() {
      $('#dialog_msg').text('Winner!').dialog('open');
    });
  }
}

function updateNmv() {
  var nmvImg = document.querySelector(
    '#profileRightColumn img[src$="/60_sm.gif"]');
  if (!nmvImg) {return;}
  var atkStat = Number(
    document.getElementById('stat-attack').firstChild.textContent.trim());
  if (isNaN(atkStat)) {return;}
  var defStat = Number(
    document.getElementById('stat-defense').firstChild.textContent.trim());
  var oldTipped = nmvImg.dataset.tipped;
  var lvlAry = /\(Level: (\d+)\)/.exec(oldTipped);
  var nmvLvl = Number(lvlAry[1]);
  var nmvEffect = Math.floor(atkStat * nmvLvl * 0.0025);
  nmvImg.dataset.tipped = oldTipped.slice(0, -15) +
    '<br>Attack: ' + (atkStat - nmvEffect).toString() +
    '&nbsp;&nbsp;Defense: ' + (defStat + nmvEffect).toString() +
    '</center></div>';
}

function injectProfile() { // Legacy
  var avyImg = document
    .querySelector('#profileLeftColumn img[oldtitle*="\'s Avatar"]');
  if (!avyImg) {return;}
  var playername = pCC
    .getElementsByTagName('h1')[0].textContent;
  var self = playername === playerName();
  ifSelf(self);
  // Must be before profileInjectQuickButton
  profileInjectGuildRel();
  // It sets up guildId and currentGuildRelationship
  var playerid = fallback(getUrlParameter('player_id'),
    playerId());
  profileInjectQuickButton(avyImg, playerid, playername);

  //* ************* yuuzhan having fun
  yuuzhan(playername, avyImg);
  //* *************

  updateHCSQuickBuffLinks('#profileRightColumn a[href*="quickbuff"]');
  updateNmv();
  updateStatistics();
  profileRenderBio(self);
  addStatTotalToMouseover();
  add(3, colouredDots);
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
    var elem = document.getElementById('buff-outer')
      .querySelector('input[data-name="' + buff + '"]');
    if (elem) {
      inject.innerHTML = '<span class="quickbuffActivate" ' +
        'buffID="' + elem.getAttribute('value') + '">Activate</span>';
    } else {
      inject.innerHTML = '<span class="fshRed;">Off</span>';
    }
  }
}

function quickActivate(evt) { // jQuery
  var trigger = evt.target;
  if (trigger.className !== 'quickbuffActivate') {return;}
  var buffHref = '?cmd=quickbuff&subcmd=activate&targetPlayers=' +
    window.self + '&skills[]=' + trigger.getAttribute('buffID');
  $.get(buffHref).done(function(data) {
    var doc = createDocument(data);
    var result = doc.querySelector('#quickbuff-report font');
    if (result &&
        (result.textContent.indexOf(
          'current or higher level is currently active on') !== -1 ||
        result.textContent.indexOf('was activated on') !== -1)) {
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
    player.insertAdjacentElement('afterend', activity);
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
    el.nextElementSibling.insertAdjacentElement('afterend', ret);
    return ret;
  }
  return playerSpan;
}

function getBuffColor(myLvl, playerBuffLevel) {
  if (myLvl > playerBuffLevel) {return 'fshRed';}
  return 'fshGreen';
}

function hazBuff(playerData, el) {
  var myBuffName = el.getAttribute('data-name');
  var playerBuffLevel = playerData[myBuffName];
  var playerSpan = el.nextElementSibling.nextElementSibling;
  if (!playerBuffLevel && !playerSpan) {return;}
  if (!playerBuffLevel) {
    playerSpan.innerHTML = '';
    return;
  }
  var lvlSpan = el.nextElementSibling.firstElementChild.firstElementChild;
  var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
  playerSpan = newPlayerSpan(el, playerSpan);
  var buffColor = getBuffColor(myLvl, playerBuffLevel);
  playerSpan.innerHTML = ' <span class="' + buffColor +
    '">[' + playerBuffLevel + ']</span>';
}

function addBuffLevels(evt) {
  var player = evt.target;
  if (player.tagName !== 'H1') {return;}
  getProfile(player.textContent).done(addStatsQuickBuff);

  var playerData = player.parentNode.lastElementChild.textContent.split(',');
  playerData = playerData.reduce(function(prev, curr) {
    if (curr.indexOf(' [') !== -1) {
      var bob = curr.split(' [');
      prev[bob[0].trim()] = parseInt(bob[1].replace(']', ''), 10);
    }
    return prev;
  }, {});

  var buffOuter = document.getElementById('buff-outer');
  var nodeList = buffOuter.querySelectorAll('input[name]');

  Array.prototype.forEach.call(nodeList, hazBuff.bind(null, playerData));

}

function doLabels(el) {
  var nameSpan = el.firstElementChild;
  var dataTipped = nameSpan.getAttribute('data-tipped');
  var cost = el.previousElementSibling.getAttribute('data-cost');
  nameSpan.setAttribute('data-tipped', dataTipped
    .replace('</center>', '<br>Stamina Cost: ' + cost + '$&'));
  var lvlSpan = nameSpan.firstElementChild;
  var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
  if (!excludeBuff[el.getAttribute('for')] && myLvl < 125) {
    el.classList.add('fshDim');
  }
}

function haveTargets() {
  var firstPlayer = document.getElementById('players')
    .getElementsByTagName('h1')[0];
  if (!firstPlayer && retries < 9) {
    retries += 1;
    setTimeout(haveTargets, 100);
    return;
  }
  if (!firstPlayer) {return;}
  firstPlayer.click();
}

function firstPlayerStats() {
  var targets = document.getElementById('targetPlayers')
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
  getEnhancement(enh, 'Sustain', document.getElementById('fshSus'));
  getEnhancement(enh, 'Fury Caster', document.getElementById('fshFur'));
  getBuff(skl, 'Guild Buffer', document.getElementById('fshGB'));
  getBuff(skl, 'Buff Master', document.getElementById('fshBM'));
  getBuff(skl, 'Extend', document.getElementById('fshExt'));
  getBuff(skl, 'Reinforce', document.getElementById('fshRI'));

  document.getElementById('helperQBheader')
    .addEventListener('click', quickActivate);
  document.getElementById('players')
    .addEventListener('click', addBuffLevels);

  var labels = document.getElementById('buff-outer')
    .querySelectorAll('label[for^="skill-"]');
  Array.prototype.forEach.call(labels, doLabels);

  firstPlayerStats();

}

function injectQuickBuff() { // jQuery
  var quickbuffDiv = document.getElementById('quickbuff');
  if (!quickbuffDiv) {return;}
  quickbuffDiv.firstElementChild.insertAdjacentHTML('afterend',
    quickBuffHeader);
  getProfile(window.self).done(getSustain$1);
}

var packRE = />([ a-zA-Z]+) Level (\d+)/g;

function postWarnings(myBuffs) {
  var nodeList = pCC.firstElementChild.rows[9]
    .cells[0].firstElementChild.getElementsByTagName('A');
  Array.prototype.forEach.call(nodeList, function(el) {
    var tipped = el.dataset.tipped;
    var packBuffs;
    while ((packBuffs = packRE.exec(tipped)) !== null) {
      if (myBuffs[packBuffs[1]] === packBuffs[2]) {
        el.parentNode.insertAdjacentHTML('beforeend',
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
  myStats().done(parseProfile);
}

var wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|' +
  'Gut Rot Head Splitter|Serum');
var spinner = '<span class="guildReportSpinner" style="background-image: ' +
  'url(\'' + imageServer + '/skin/loading.gif\');"></span>';
var headerCount;
var headers$1;
var counter;
var nodeArray;
var nodeList;
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
  while (performance.now() < limit && counter < nodeList.length) {
    var el = nodeList[counter];

    hideOther(el);

    counter += 1;
  }
  if (counter < nodeList.length) {
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
  nodeList = document.querySelectorAll('#pCC table table tr');
  counter = 0;
  add(2, hideOthers);
}

function recallItem$2(evt) { // jQuery
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

var events = [
  {test: 'recall', fn: recallItem$2},
  {test: 'equip', fn: wearItem$1},
  {
    test: 'a-reply',
    fn: function(evt) {
      window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
    }
  }
];

function eventHandlers$1(evt) {
  for (var i = 0; i < events.length; i += 1) {
    if (evt.target.classList.contains(events[i].test)) {
      events[i].fn(evt);
      return;
    }
  }
}

function memberHeader(oldhtml) {
  if (!calf.membrList[oldhtml]) {return oldhtml;}
  return onlineDot({last_login: calf.membrList[oldhtml].last_login}) +
    '<a href="index.php?cmd=profile&player_id=' + calf.membrList[oldhtml].id +
    '">' + oldhtml + '</a> [ <span class="a-reply fshLink" target_player=' +
    oldhtml + '>m</span> ]';
}

function paintHeader() {
  var limit = performance.now() + 10;
  while (performance.now() < limit && headerCount < headers$1.length) {
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

function paintChild() {
  var limit = performance.now() + 1;
  while (performance.now() < limit && counter < nodeArray.length) {
    var el = nodeList[counter];
    var inject = nodeArray[counter];
    el.appendChild(inject);
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

function mySpan(el) {
  var secondHref = el.children.length === 2;
  var firstHref = hideElement$1(!secondHref);
  var itemName = el.previousElementSibling.innerHTML;
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
  while (performance.now() < limit && counter < nodeList.length) {
    var el = nodeList[counter];

    doSpan(el);

    counter += 1;
  }
  if (counter < nodeList.length) {
    add(3, makeSpan);
  } else {
    counter = 0;
    add(3, paintChild);
  }
}

function prepareChildRows() {
  nodeList = document.querySelectorAll('#pCC table table ' +
    'tr:not(.fshHide) td:nth-of-type(3n+0)');
  nodeArray = [];
  counter = 0;
  add(3, makeSpan);
}

function injectReportPaint() { // jQuery
  getMembrList(false).done(function() {
    add(3, reportHeader);
  });
  add(2, searchUser);
  add(3, prepareChildRows);
  pCC.getElementsByTagName('TABLE')[1]
    .addEventListener('click', eventHandlers$1);
}

function injectSaveSettings() { // Hybrid
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
    var settings = JSON.parse($('#HelperfshSettings').val());
    Object.keys(settings).forEach(function(id) {
      setValue(id, settings[id]);
    });
    $('#dialog_msg').text('Settings loaded successfully!').dialog('open');
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
  injectHere.appendChild(bp);
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
  $('#pCC input[value="Scavenge"]').click(dontPost$1);
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
    openQuickBuffByName(self.previousElementSibling.textContent);
  }
  if (self.textContent === 'all') {
    buffAll(self);
  }
}

function evtHdl$1(e) {
  if (e.target.classList.contains('fshBl')) {buffEvent(e);}
}

function doBuffLinks$1(titanTable) {
  for (var j = 1; j < titanTable.rows.length; j += 2) {
    var firstCell = titanTable.rows[j].cells[0];
    firstCell.insertAdjacentHTML('beforeend',
      ' <button class="fshBl fshXSmall">[b]</button>');
  }
  titanTable.rows[0].cells[0].insertAdjacentHTML('beforeend',
    ' <button class="fshBl fshXSmall">all</button>');
}

function gotTables(titanTables) {
  for (var i = 2; i < titanTables.length; i += 1) {
    var titanTable = titanTables[i];
    if (titanTable.rows.length < 2) {continue;}
    doBuffLinks$1(titanTable);
  }
  titanTables[1].addEventListener('click', evtHdl$1);
}

function injectScouttowerBuffLinks(titanTables) {
  if (titanTables.length > 2) {gotTables(titanTables);}
}

function cooldownTracker(aRow, theTitans) {
  var myName = aRow.cells[0].firstElementChild.getAttribute('oldtitle')
    .replace(' (Titan)', '');
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
  if (theTitans[titan].coolTime < Date.now()) {return;}
  trackerTable.insertAdjacentHTML('beforeend',
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
  trackerTable.appendChild(tBody);
  Object.keys(theTitans).forEach(addRow.bind(null, theTitans, tBody));

  var newRow = parentTable.insertRow(5);
  var newCell = newRow.insertCell(-1);
  newCell.colSpan = 3;
  newCell.appendChild(trackerTable);
}

function addMissingTitansFromOld(oldTitans, newTitans) {
  if (!oldTitans) {return;}
  Object.keys(oldTitans).forEach(function(oldTitan) {
    if (newTitans[oldTitan]) {return;}
    if (oldTitans[oldTitan].coolTime <= Date.now()) {return;}
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
  if (numberOfKillsToSecure - guildKills > currentHP) {
    return '<span class="fshRed">Cannot Secure</span>';
  }
  return '<span class="fshRed">' +
    (numberOfKillsToSecure - guildKills) + '</span> to secure';
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
  var currentNumberOfKills = totalHP - currentHP;
  var titanString = getTitanString(guildKills, totalHP, currentHP);
  var killsTotPct = (guildKills * 100 / totalHP).toFixed(2);
  aRow.cells[3].insertAdjacentHTML('beforeend',
    '<br><span class="fshBlue"> (' +
    getKillsPct(currentNumberOfKills, guildKills).toFixed(2) +
    '% Current <br>' + killsTotPct + '% Total<br>' + titanString + ')');
}

function gotOldTitans(oldTitans) {
  var titanTables = pCC.getElementsByTagName('table');
  injectScouttowerBuffLinks(titanTables);
  var titanTable = titanTables[1];
  var newTitans = {};
  for (var i = 1; i < titanTable.rows.length - 1; i += 6) {
    var aRow = titanTable.rows[i];
    killsSummary(aRow);
    cooldownTracker(aRow, newTitans);
  }
  addMissingTitansFromOld(oldTitans, newTitans);
  displayTracker(titanTables[0], newTitans);
  setForage('fsh_titans', newTitans);
}

function injectScouttower() {
  getForage('fsh_titans').done(gotOldTitans);
}

function getScoutTowerDetails(responseText) { // Legacy
  var doc = createDocument(responseText);
  injectScouttowerBuffLinks(doc.getElementById('pCC')
    .getElementsByTagName('table'));
  var scoutTowerTable = findNode(
    '//table[tbody/tr/td/img[contains(@src,"/banners/scouttower.png")]]',
    doc);
  if (scoutTowerTable) {
    var titanTable = findNode(
      '//table[tbody/tr/td/img[contains(@src,"/banners/titankilllog.png")]]');
    var newRow = titanTable.insertRow(0);
    newRow.appendChild(scoutTowerTable.rows[1].cells[0])
      .insertAdjacentHTML('beforeend', '<br><br>');
    newRow = titanTable.insertRow(1);
    newRow.appendChild(scoutTowerTable.rows[8].cells[0]);
  }
}

function injectTitan() { // jQuery
  $.get('index.php?cmd=guild&subcmd=scouttower', getScoutTowerDetails);
}

function getItemDiv() {
  var itemDiv = document.getElementById('item-div');
  if (!itemDiv) {
    itemDiv = createDiv({id: 'item-div', className: 'itemDiv'});
    var itemList = document.getElementById('item-list');
    var oldItems = itemList.getElementsByTagName('table');
    while (oldItems.length) {
      oldItems[0].classList.add('fshBlock');
      itemDiv.appendChild(oldItems[0]);
    }
    itemList.parentNode.insertBefore(itemDiv, itemList);
  }
  return itemDiv;
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
    if (hidden && fallback(all, hasFolder)) {
      el.classList.remove('fshHide');
      el.classList.add('fshBlock'); // show()
    }
    if (!hidden && !all && !hasFolder) {
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
  var multiple = document.getElementById('fshSelectMultiple');
  multiple.insertAdjacentHTML('afterend', '<tr id="fshShowSTs">' +
    '<td align="center" colspan=6>' +
    '<label><input type="checkbox" id="itemsInSt" checked> ' +
    'Select items in ST</label></td></tr>');
  multiple.insertAdjacentElement('afterend', foldersRow);
}

var invItems$1;

function stColor(el, item) {
  if (item.is_in_st) {
    el.classList.add('isInST');
  } else {el.classList.add('tradeItemMargin');}
}

function forEachInvItem(el) {
  var checkbox = el.firstElementChild.lastElementChild.firstElementChild
    .firstElementChild;
  var item = invItems$1[checkbox.getAttribute('value')];
  el.classList.add('folderid' + item.folder_id);
  if (invItems$1.fshHasST) {stColor(el, item);}
  checkbox.classList.add('itemid' + item.item_id);
  checkbox.classList.add('itemtype' + item.type);
}

function processTrade(data) {

  time('trade.processTrade');

  invItems$1 = data.items;
  /* Highlight items in ST */
  var nodeList = document.getElementById('item-list')
    .getElementsByTagName('table');
  Array.prototype.forEach.call(nodeList, forEachInvItem);
  doFolderHeaders(data.folders);

  timeEnd('trade.processTrade');

}

function inv$1() { // jQuery
  getInventoryById().done(function(data) {
    add(3, processTrade, [data]);
  });
}

function getHowMany(itemTables) {
  var howMany = parseInt(document.getElementById('fshSendHowMany').value, 10);
  if (isNaN(howMany)) {return itemTables.length;}
  // maximum of 100 items in an ST
  if (calf.subcmd !== '-') {return Math.min(100, howMany);}
  return howMany;
}

function shouldBeChecked(itemid, checkbox) {
  return itemid === 'itemid-1' ||
    itemid === 'itemid-2' && checkbox.classList.contains('itemtype12') ||
    checkbox.classList.contains(itemid);
}

function doCheckAll$1(evt) {
  var itemid = evt.target.id;
  var itemList = document.getElementById('item-div') ||
    document.getElementById('item-list');
  var itemTables = itemList.querySelectorAll('table:not(.fshHide)');
  var howMany = getHowMany(itemTables);
  var itemsInSt = document.getElementById('itemsInSt').checked;
  Array.prototype.forEach.call(itemTables, function(el) {
    var checkbox = el.firstElementChild.lastElementChild.firstElementChild
      .firstElementChild;
    if (howMany &&
        fallback(itemsInSt, !el.classList.contains('isInST')) &&
        shouldBeChecked(itemid, checkbox)) {
      checkbox.checked = true;
      howMany -= 1;
      return;
    }
    checkbox.checked = false;
  });
}

function toggleAllPlants(evt) {
  if (evt.target.classList.contains('fshCheckAll')) {doCheckAll$1(evt);}
}

function injectTradeOld() {
  var myTd = '<td colspan=6>Select:&ensp;<span id="itemid-1" ' +
    'class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;' +
    '<span id="itemid-2" ' +
    'class="fshCheckAll fshLink fshNoWrap">All Resources</span>';
  var sendClasses = getValue('sendClasses');
  var itemList = JSON.parse('[' + sendClasses + ']');
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
  var el = document.getElementById('item-list').parentNode.parentNode;
  el.parentNode.insertBefore(multiple, el);
}

function injectTrade() {
  add(3, inv$1);
  add(3, injectTradeOld);
}

function calcLvlToTest() {
  var levelToTest = intValue(document.getElementsByClassName(
    'stat-level')[0].nextElementSibling.textContent);
  var characterVirtualLevel = getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  return levelToTest;
}

function calcPvpRange(levelToTest) {
  if (levelToTest <= 205) {return 5;}
  return 10;
}

function calcGvgRange(levelToTest) {
  if (levelToTest <= 300) {
    return 25;
  }
  if (levelToTest <= 700) {
    return 50;
  }
  return 100;
}

function injectViewGuild() {
  add(3, colouredDots);
  removeGuildAvyImgBorder();
  guildXPLock();
  var highlightPlayersNearMyLvl =
    getValue('highlightPlayersNearMyLvl');
  var highlightGvGPlayersNearMyLvl =
    getValue('highlightGvGPlayersNearMyLvl');
  if (!highlightPlayersNearMyLvl && !highlightGvGPlayersNearMyLvl) {return;}
  var levelToTest = calcLvlToTest();
  var pvpRange = calcPvpRange(levelToTest);
  var gvgRange = calcGvgRange(levelToTest);
  var memList = document.querySelectorAll(
    '#pCC a[data-tipped*="<td>VL:</td>"]');
  Array.prototype.forEach.call(memList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var lastActDays = lastActivityRE.exec(tipped)[1];
    var vlevel = /VL:.+?(\d+)/.exec(tipped)[1];
    var aRow = el.parentNode.parentNode;
    if (lastActDays < 7 &&
        highlightPlayersNearMyLvl &&
        Math.abs(vlevel - levelToTest) <= pvpRange) {
      aRow.classList.add('lvlHighlight');
    } else if (lastActDays < 7 &&
        highlightGvGPlayersNearMyLvl &&
        Math.abs(vlevel - levelToTest) <= gvgRange) {
      aRow.classList.add('lvlGvGHighlight');
    }
  });
}

var assets = {
  colorHash: {
    '0': 'red', // Should never see this.
    '1': 'orange',
    '2': 'yellow'
  },
  worldFormgroup:
    '<a href="#" class="quicklink tip-static" ' +
      'data-tipped="Quick Create Attack Group" ' +
      'style="background-image: url(\'' + imageServer +
      '/skin/realm/icon_action_formgroup.gif\');">' +
    '</a>',
  worldQuickBuff:
    '<a href="#" class="quicklink tip-static" ' +
      'data-tipped="Open Quick Buff Popup" ' +
      'style="background-image: url(\'' + imageServer +
      '/skin/realm/icon_action_quickbuff.gif\');">' +
    '</a>',
  worldMap:
    '<a href="index.php?cmd=world&subcmd=map" target="fsWorldMap" ' +
      'class="quicklink tip-static" data-tipped="Open Realm Map" ' +
      'style="background-image: url(\'' + imageServer +
      '/skin/realm/icon_action_map.gif\');">' +
    '</a>',
  searchMapUFSG:
    '<a href="http://guide.fallensword.com/index.php?cmd=realms' +
      '&subcmd=view&realm_id=@@realmId@@" target="mapUFSG" ' +
      'class="quicklink tip-static" data-tipped="Search map in ' +
      'Ultimate FSG" style="background-image: url(\'' +
      imageServer + '/temple/1.gif\');">' +
    '</a>',
  bias: {
    '0': {generalVariable: 1.1053, hpVariable: 1.1},
    '1': {generalVariable: 1.1, hpVariable: 1.053},
    '2': {generalVariable: 1.053, hpVariable: 1},
    '3': {generalVariable: 1.1053, hpVariable: 1}
  },
  huntingOnImage: '<a href="#" id="HelperToggleHuntingMode" ' +
    'class="huntOn quicklink tip-static" ' +
    'data-tipped="Hunting mode is ON"></a>',
  huntingOffImage: '<a href="#" id="HelperToggleHuntingMode" ' +
    'class="huntOff quicklink tip-static" ' +
    'data-tipped="Hunting mode is OFF"></a>',
  soundMuteImage: '<a href="#" id="toggleSoundLink" ' +
    'class="soundOn quicklink tip-static" ' +
    'data-tipped="Turn Off Sound when you have a new log message"></a>',
  soundImage: '<a href="#" id="toggleSoundLink" ' +
    'class="soundOff quicklink tip-static" ' +
    'data-tipped="Turn On Sound when you have a new log message"></a>'
};

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

function hazEnhancements(data) {
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
  hazEnhancements(data);
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
  $.subscribe('2-success.action-response', combatResponse);
}

function combatLogger() { // jQuery.min
  if (getValue('keepLogs')) {
    getForage('fsh_combatLog').done(gotCombatLog$1);
  }
}

function doFormGroup(e) { // jQuery
  e.preventDefault();
  $(e.target).qtip('hide');
  GameData.doAction(12, 401, {}, 0);
}

function openQuickBuff(e) {
  e.preventDefault();
  openQuickBuffByName(playerName());
}

function showQuickLinks(worldName, data) { // jQuery
  worldName.append('<div class="fshFsty"><div>Min Lvl: ' + data.realm.minlevel +
    '</div><div>Your Lvl: ' + data.player.level + '</div></div>');
  var formgroup = $(assets.worldFormgroup);
  worldName.append('&nbsp;&nbsp;').append(formgroup);
  formgroup.click(doFormGroup);
  var quickbuff = $(assets.worldQuickBuff);
  worldName.append('&nbsp;').append(quickbuff);
  quickbuff.click(openQuickBuff);
  worldName.append('&nbsp;').append(assets.worldMap);
}

function showSearchButtons(worldName, data) { // jQuery
  worldName.append('&nbsp;')
    .append(assets.searchMapUFSG.replace('@@realmId@@', data.realm.id));
}

function toggleSound(e) { // jQuery
  e.preventDefault();
  if (getValue('playNewMessageSound') === false) {
    $('#toggleSoundLink').qtip('hide')
      .replaceWith(assets.soundMuteImage);
  } else {
    $('#toggleSoundLink').qtip('hide')
      .replaceWith(assets.soundImage);
  }
  setValue('playNewMessageSound',
    !getValue('playNewMessageSound'));
}

function showSpeakerOnWorld(worldName) { // jQuery
  var img = assets.soundImage;
  if (getValue('playNewMessageSound')) {img = assets.soundMuteImage;}
  worldName.append('&nbsp;').append(img);
  worldName.on('click', '#toggleSoundLink', toggleSound);
}

function toggleHuntMode(e) { // jQuery
  e.preventDefault();
  if (!calf.huntingMode) {
    $('#HelperToggleHuntingMode').qtip('hide')
      .replaceWith(assets.huntingOnImage);
  } else {
    $('#HelperToggleHuntingMode').qtip('hide')
      .replaceWith(assets.huntingOffImage);
  }
  calf.huntingMode = !calf.huntingMode;
  setValue('huntingMode', calf.huntingMode);
}

function showHuntMode(worldName) { // jQuery
  var img = assets.huntingOffImage;
  if (calf.huntingMode) {img = assets.huntingOnImage;}
  worldName.append('&nbsp;').append(img);
  worldName.on('click', '#HelperToggleHuntingMode',
    toggleHuntMode);
}

function injectButtons(data) { // jQuery
  var worldName = $('#worldName');
  worldName.html(data.realm.name); // HACK - incase of switchign between master realm and realm they dont replace teh realm name
  var oldButtonContainer = $('#fshWorldButtonContainer');
  if (oldButtonContainer.length !== 0) {oldButtonContainer.remove();}
  var buttonContainer = $('<div/>', {id: 'fshWorldButtonContainer'});
  showQuickLinks(buttonContainer, data);
  showSearchButtons(buttonContainer, data);
  if (getValue('showSpeakerOnWorld')) {
    showSpeakerOnWorld(buttonContainer);
  }
  showHuntMode(buttonContainer);
  worldName.after(buttonContainer);
}

var assets$1 = {
  defStats: '<table class="relicT"><tbody>' +
    '<tr><td colspan="2" class="headr">Defending Guild Stats</td></tr>' +
    '<tr><td class="brn">Relic Count:</td>' +
      '<td id="relicCount">0</td></tr>' +
    '<tr><td class="brn">Lead Defender Bonus:</td>' +
      '<td id="LDPercentage">0</td></tr>' +
    '<tr><td class="brn">Lead Defender Cloaked:</td>' +
      '<td id="LDCloaked">No</td></tr>' +
    '<tr><td colspan="2" class="headr">Other Defender Stats</td></tr>' +
    '<tr><td class="brn">Raw Attack:</td>' +
      '<td class="grey" id="attackValue">0</td></tr>' +
    '<tr><td class="brn">Attack w/ buffs:</td>' +
      '<td id="attackValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Defense:</td>' +
      '<td class="grey" id="defenseValue">0</td></tr>' +
    '<tr><td class="brn">Defense w/buffs:</td>' +
      '<td id="defenseValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Armor:</td>' +
      '<td class="grey" id="armorValue">0</td></tr>' +
    '<tr><td class="brn">Armor w/ buffs:</td>' +
      '<td id="armorValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Damage:</td>' +
      '<td class="grey" id="damageValue">0</td></tr>' +
    '<tr><td class="brn">Damage w/ buffs:</td>' +
      '<td id="damageValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw HP:</td>' +
      '<td class="grey" id="hpValue">0</td></tr>' +
    '<tr><td class="brn">HP w/ buffs:</td>' +
      '<td id="hpValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Cloaked:</td>' +
      '<td id="defendersCloaked">0</td></tr>' +
    '<tr><td class="brn">Processed:</td>' +
      '<td id="defendersProcessed">0</td></tr>' +
    '</tbody></table>',
  atkStats: '<table class="relicT"><tbody>' +
    '<tr><td class="headr" colspan="2">Adjusted defense values:</td></tr>' +
    '<tr><td class="brn">DC225:</td>' +
      '<td id="DC225">0</td></tr>' +
    '<tr><td class="brn">DC175:</td>' +
      '<td id="DC175">0</td></tr>' +
    '<tr><td colspan="2">&nbsp;</td></tr>' +
    '<tr><td class="headr" colspan="2">Attacking Group Stats:</td></tr>' +
    '<tr><td class="brn">Raw Group Attack:</td>' +
      '<td class="grey" id="GroupAttack"></td></tr>' +
    '<tr><td class="brn">Group Attack w/ buffs:</td>' +
      '<td id="GroupAttackBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Defense:</td>' +
      '<td class="grey" id="GroupDefense"></td></tr>' +
    '<tr><td class="brn">Group Defense w/ buffs:</td>' +
      '<td id="GroupDefenseBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Armor:</td>' +
      '<td class="grey" id="GroupArmor"></td></tr>' +
    '<tr><td class="brn">Group Armor w/ buffs:</td>' +
      '<td id="GroupArmorBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Damage:</td>' +
      '<td class="grey" id="GroupDamage"></td></tr>' +
    '<tr><td class="brn">Group Damage w/ buffs:</td>' +
      '<td id="GroupDamageBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group HP:</td>' +
      '<td class="grey" id="GroupHP"></td></tr>' +
    '<tr><td class="brn">Group HP w/ buffs:</td>' +
      '<td id="GroupHPBuffed"></td></tr>' +
    '</tbody></table>',
  proc: '<table class="relicT"><tbody>' +
    '<tr><td class="headr" colspan="2">Processing:</td></tr>' +
    '<tr><td class="fshGreen" colspan="2" id="ProcessingStatus">' +
      'Parsing defending guild stats ...</td></tr>' +
    '<tr><td class="headr" colspan="2">Assumptions:</td></tr>' +
    '<tr><td colspan="2" class="grey">Above calculations include ' +
      'Constitution, Fortitude, Nightmare Visage, Chi Strike, Sanctuary, ' +
      'Terrorize and Flinch bonus calculations (in that order) on both the ' +
      'defending group and attacking group.</td></tr>' +
    '</tbody></table>'
};

function groupViewStats(doc) {
  var attackElement = doc.getElementById('stat-attack');
  var defenseElement = doc.getElementById('stat-defense');
  var armorElement = doc.getElementById('stat-armor');
  var damageElement = doc.getElementById('stat-damage');
  var hpElement = doc.getElementById('stat-hp');
  return {
    attack: intValue(attackElement.textContent),
    attackElement: attackElement,
    defense: intValue(defenseElement.textContent),
    defenseElement: defenseElement,
    armor: intValue(armorElement.textContent),
    armorElement: armorElement,
    damage: intValue(damageElement.textContent),
    damageElement: damageElement,
    hp: intValue(hpElement.textContent),
    hpElement: hpElement
  };
}

function parseGroupStats(html) {
  var doc = createDocument(html);
  return groupViewStats(doc);
}

function getGroupStats(viewStats) {
  return $.ajax(viewStats).pipe(parseGroupStats);
}

function parseMercStats(html) {
  var doc = createDocument(html);
  var mercElements = doc.querySelectorAll('#pCC img[src*="/merc/"]');
  var mercTotal = [0, 0, 0, 0, 0];
  Array.prototype.forEach.call(mercElements, function(merc) {
    var mouseoverText = merc.dataset.tipped;
    mercTotal = mercTotal.map(function(el, i) {
      return el + Number(mercRE[i].exec(mouseoverText)[1]);
    });
  });
  mercTotal = mercTotal.map(function(el) {
    return Math.round(el * defenderMultiplier);
  });
  return {
    attack: mercTotal[0],
    defense: mercTotal[1],
    armor: mercTotal[2],
    damage: mercTotal[3],
    hp: mercTotal[4]
  };
}

function getMercStats() {
  return $.ajax('index.php?cmd=guild&subcmd=mercs').pipe(parseMercStats);
}

var relicData;
var containerDiv;
var leftDiv;
var fetchStatsBtn;
var midDiv;
var rightDiv;
var hideRelicOffline;
var player$1;
var guildMemberList;
var myDefenders;
var twoMinutes;
var sevenDays;
var memberExclusions = [
  function(key) {return key === 'lastUpdate';},
  function(key) {return myDefenders.indexOf(key) !== -1;},
  function(key) {return !guildMemberList[key].last_login;},
  function(key) {return guildMemberList[key].last_login >= twoMinutes;},
  function(key) {return guildMemberList[key].last_login <= sevenDays;},
  function(key) {
    return guildMemberList[key].level >= 400 &&
      guildMemberList[key].level <= 421;
  },
  function(key) {
    return guildMemberList[key].level >= 441 &&
      guildMemberList[key].level <= 450;
  }
];
var relicCount;
var relicMultiplier;
var processingStatus;
var attackElement;
var defRawAttack;
var attackBuffedElement;
var defBuffedAttack;
var defenseElement;
var defRawDefense;
var defenseBuffedElement;
var armorElement;
var defRawArmor;
var armorBuffedElement;
var damageElement;
var defRawDamage;
var damageBuffedElement;
var defBuffedDamage;
var hpElement;
var defRawHp;
var hpBuffedElement;
var defCloaked;
var defCloakedElement;
var defProcessedElement;
var defProcessed;
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
var leadDefender;
var groupStats;
var mercStats;

function ajaxFailure(jqXHR) {
  processingStatus.textContent = jqXHR.status.toString() + ' ' +
    jqXHR.statusText;
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

function deductMercStats() {
  groupStats.attack -= mercStats.attack;
  groupStats.defense -= mercStats.defense;
  groupStats.armor -= mercStats.armor;
  groupStats.damage -= mercStats.damage;
  groupStats.hp -= mercStats.hp;
}

function calculateGroup() {
  processingStatus.textContent = 'Processing attacking group stats ... ';
  if (mercStats) {deductMercStats();}
  groupAttackElement.textContent = addCommas(groupStats.attack);
  groupDefenseElement.textContent = addCommas(groupStats.defense);
  groupArmorElement.textContent = addCommas(groupStats.armor);
  groupDamageElement.textContent = addCommas(groupStats.damage);
  groupHPElement.textContent = addCommas(groupStats.hp);

  var buffs = reduceBuffArray(player$1.buffs);

  var nightmareVisageEffect = Math.ceil(groupStats.attack *
    (fallback(buffs['Nightmare Visage'], 0) * 0.0025));
  groupStats.attack -= nightmareVisageEffect;

  var storedFlinchEffectValue = Math.ceil(groupStats.attack *
    leadDefender.flinchLevel * 0.001);
  groupAttackBuffedElement.textContent = addCommas(groupStats.attack -
    storedFlinchEffectValue);

  var defenseWithConstitution = Math.ceil(groupStats.defense *
    (1 + fallback(buffs.Constitution, 0) * 0.001));
  var totalDefense = defenseWithConstitution + nightmareVisageEffect;
  groupDefenseBuffedElement.textContent = addCommas(totalDefense);

  groupArmorBuffedElement.textContent = addCommas(groupStats.armor +
    Math.floor(groupStats.armor * fallback(buffs.Sanctuary, 0) * 0.001));

  var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
    fallback(buffs.Fortitude, 0) * 0.001);
  var chiStrikeBonusDamage = Math.ceil((groupStats.hp + fortitudeBonusHP) *
    fallback(buffs['Chi Strike'], 0) * 0.001);
  var storedTerrorizeEffectValue = Math.ceil(
    groupStats.damage * leadDefender.terrorizeLevel * 0.001);
  groupDamageBuffedElement.textContent = addCommas(groupStats.damage +
    chiStrikeBonusDamage - storedTerrorizeEffectValue);
  groupHPBuffedElement.textContent = addCommas(groupStats.hp +
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
    document.getElementById('LDCloaked').textContent = 'Yes';
  }

  if (player$1.hasGroup) {
    calculateGroup();
  } else {
    processingStatus.textContent = 'Done.';
  }

}

function missingMembers(membrList) {
  guildMemberList = membrList;
  var myMembers = Object.keys(guildMemberList);
  var now = Date.now() / 1000;
  twoMinutes = now - 120;
  sevenDays = now - 604800;
  var filtered = myMembers.reduce(function(prev, key) {
    for (var i = 0; i < memberExclusions.length; i += 1) {
      if (memberExclusions[i](key)) {return prev;}
    }
    prev.push('<a href="index.php?cmd=profile&player_id=' +
      guildMemberList[key].id + '">' + key + '</a>');
    return prev;
  }, []);
  containerDiv.insertAdjacentHTML('beforeend',
    '<div class="fshFloatLeft lowDiv"><table class="relicT"><tbody>' +
    '<tr><td class="headr">Offline guild members not at relic:</td></tr>' +
    '<tr><td>' + filtered.join(' ') + '</td></tr></tbody></table></div>');
}

function setDefVars() {
  attackElement = document.getElementById('attackValue');
  attackBuffedElement = document.getElementById('attackValueBuffed');
  defenseElement = document.getElementById('defenseValue');
  defenseBuffedElement = document.getElementById('defenseValueBuffed');
  armorElement = document.getElementById('armorValue');
  armorBuffedElement = document.getElementById('armorValueBuffed');
  damageElement = document.getElementById('damageValue');
  damageBuffedElement = document.getElementById('damageValueBuffed');
  hpElement = document.getElementById('hpValue');
  hpBuffedElement = document.getElementById('hpValueBuffed');
  defCloakedElement = document.getElementById('defendersCloaked');
  defProcessedElement = document.getElementById('defendersProcessed');
}

function setAtkVars() {
  dc225Element = document.getElementById('DC225');
  dc175Element = document.getElementById('DC175');
  groupAttackElement = document.getElementById('GroupAttack');
  groupAttackBuffedElement = document.getElementById('GroupAttackBuffed');
  groupDefenseElement = document.getElementById('GroupDefense');
  groupDefenseBuffedElement = document.getElementById('GroupDefenseBuffed');
  groupArmorElement = document.getElementById('GroupArmor');
  groupArmorBuffedElement = document.getElementById('GroupArmorBuffed');
  groupDamageElement = document.getElementById('GroupDamage');
  groupDamageBuffedElement = document.getElementById('GroupDamageBuffed');
  groupHPElement = document.getElementById('GroupHP');
  groupHPBuffedElement = document.getElementById('GroupHPBuffed');
}

function prepareDivs() {
  fetchStatsBtn.classList.add('fshHide');
  hideRelicOffline = getValue('hideRelicOffline');
  if (relicData.is_owner && !hideRelicOffline) {
    getMembrList(false).done(missingMembers);
  }
  leftDiv.insertAdjacentHTML('beforeend', assets$1.proc);
  processingStatus = document.getElementById('ProcessingStatus');
  midDiv = createDiv({
    className: 'fshFloatLeft midDiv',
    innerHTML: assets$1.defStats
  });
  containerDiv.appendChild(midDiv);
  setDefVars();
  rightDiv = createDiv({
    className: 'fshFloatLeft rightDiv',
    innerHTML: assets$1.atkStats
  });
  containerDiv.appendChild(rightDiv);
  setAtkVars();
}

function getGuild$1() {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'guild',
      subcmd: 'view',
      guild_id: relicData.controlled_by.guild_id
    }
  });
}

function calcRelicMultiplier(rels) {
  if (rels === 1) {return 1.5;}
  return Math.round((1 - rels / 10) * 100) / 100;
}

function parseGuild(html) {
  var doc = createDocument(html);
  var nodeList = doc.querySelectorAll('#pCC img[src*="/relics/"]');
  relicCount = nodeList.length;
  document.getElementById('relicCount').textContent = relicCount.toString();
  relicMultiplier = calcRelicMultiplier(relicCount);
  document.getElementById('LDPercentage').textContent =
    (relicMultiplier * 100).toString() + '%';
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

function getGroups() {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'guild',
      subcmd: 'groups'
    }
  });
}

function storeGroupStats(obj) {
  groupStats = obj;
}

function storeMercStats(obj) {
  mercStats = obj;
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

function resetCounters() {
  defRawAttack = 0;
  defRawDefense = 0;
  defRawArmor = 0;
  defRawDamage = 0;
  defRawHp = 0;
  defCloaked = 0;
  defProcessed = 0;
}

function getStats() {
  prepareDivs();
  resetCounters();
  player$1 = GameData.player();
  var prm = [];
  prm.push(getGuild$1().done(parseGuild));
  if (player$1.hasGroup) {
    prm.push(getGroups().pipe(parseGroups));
  }
  for (var i = 1; i < myDefenders.length; i += 1) {
    prm.push(getProfile(myDefenders[i]).done(parseDefender)
      .fail(ajaxFailure));
  }
  prm.push(getProfile(myDefenders[0]).done(storeLeadDefender));
  $.when.apply($, prm).done(doCalculations);
}

function setup$1() {
  myDefenders = relicData.defenders.map(function(x) {
    return x.player_name;
  });
  if (containerDiv) {
    containerDiv.innerHTML = '';
  } else {
    containerDiv = createDiv({className: 'body'});
  }
  leftDiv = createDiv({className: 'fshFloatLeft leftDiv'});
  containerDiv.appendChild(leftDiv);
  if (relicData.is_owner) {
    leftDiv.appendChild(doBuffLinks(myDefenders));
  }
  fetchStatsBtn = createButton({
    className: 'custombutton',
    textContent: 'Fetch Stats'
  });
  fetchStatsBtn.addEventListener('click', getStats);
  leftDiv.appendChild(fetchStatsBtn);
  var dialogRelic = document.getElementById('dialog-relic');
  dialogRelic.appendChild(containerDiv);
}

function viewRelic(e, data) {
  relicData = data.response.data;
  if (relicData.defenders.length > 0) {setup$1();}
}

function injectRelic() {
  $.subscribe('9-success.action-response', viewRelic);
}

var shoppingData;
var dialog$1;
var jDialog;
var fshDiv;
var numInput;
var qbBtn;
var resultDiv;

function quickBuy() {
  return $.ajax({
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
  resultDiv.insertAdjacentHTML('beforeend', msg + '<br>');
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
  fshDiv.appendChild(numInput);
  qbBtn = createButton({textContent: 'Quick-buy'});
  qbBtn.addEventListener('click', qBuy);
  fshDiv.appendChild(qbBtn);
  resultDiv = createDiv();
  fshDiv.appendChild(resultDiv);
  dialog$1.appendChild(fshDiv);
}

function worldDialogShop(e, data) {
  shoppingData = data;
  dialog$1 = fallback(dialog$1,
    document.getElementById('shopDialogConfirm'));
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

function stamAtLowestCa(combat) {
  if (combat.player.counterAttackLevel > 0) {
    return Math.ceil((1 + combat.player.doublerLevel / 50) * 0.0025 *
      combat.lowestFeasibleCALevel);
  }
  return 0;
}

function caRunning(combat) {
  combat.lowestCALevelToStillHit = Math.max(Math.ceil((
    combat.counterAttackBonusAttack - combat.hitByHowMuch + 1) /
    combat.player.attackValue / 0.0025), 0);
  combat.lowestCALevelToStillKill = Math.max(Math.ceil((
    combat.counterAttackBonusDamage - combat.damageDone + 1) /
    combat.player.damageValue / 0.0025), 0);
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
  combat.lowestCALevelToStillHit = Math.max(Math.ceil((
    combat.counterAttackBonusAttack - combat.hitByHowMuch + 1) /
    combat.player.attackValue / 0.0025), 0);
  combat.lowestCALevelToStillKill = Math.max(Math.ceil((
    combat.counterAttackBonusDamage - combat.damageDone + 1) /
    combat.player.damageValue / 0.0025), 0);
  evalCaKill(combat);
  evalCaOneHit(combat);
}

function evalCA(combat) {
  if (combat.player.counterAttackLevel > 0 &&
      combat.numberOfHitsRequired === 1) {
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
  if (assets.bias[combat.combatEvaluatorBias]) {
    return assets.bias[combat.combatEvaluatorBias].generalVariable;
  }
  return 1.1053;
}

function getBiasHp(combat) {
  if (assets.bias[combat.combatEvaluatorBias]) {
    return assets.bias[combat.combatEvaluatorBias].hpVariable;
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

function getCreatureGroupData(responseText) { // Legacy
  var doc = createDocument(responseText);
  var groupAttackValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Attack:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupDefenseValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Defense:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupArmorValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Armor:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupDamageValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Damage:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupHPValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"HP:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  xmlhttp('index.php?cmd=profile', getCreaturePlayerData, {
    groupExists: true,
    groupAttackValue: groupAttackValue,
    groupDefenseValue: groupDefenseValue,
    groupArmorValue: groupArmorValue,
    groupDamageValue: groupDamageValue,
    groupHPValue: groupHPValue,
    groupEvaluation: true
  });
}

function checkIfGroupExists(responseText) { // Hybrid
  var doc = createDocument(responseText);
  var groupExistsIMG = $(doc)
    .find('img[title="Disband Group (Cancel Attack)"]');
  if (groupExistsIMG.length > 0) {
    var groupHref = groupExistsIMG.parents('td:first').find('a:first')
      .attr('href');
    xmlhttp(groupHref, getCreatureGroupData);
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
  window.GameData.doAction(-1);
}

function readyViewCreature() { // Hybrid
  $('#creatureEvaluator').html('');
  $('#creatureEvaluatorGroup').html('');

  xmlhttp('index.php?cmd=profile', getCreaturePlayerData, {
    groupExists: false,
    groupAttackValue: 0,
    groupDefenseValue: 0,
    groupArmorValue: 0,
    groupDamageValue: 0,
    groupHPValue: 0,
    groupEvaluation: false
  });
  xmlhttp('index.php?cmd=guild&subcmd=groups',
    checkIfGroupExists);

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
  document.getElementById('addRemoveCreatureToDoNotKillList')
    .addEventListener('click',
      addRemoveCreatureToDoNotKillList, true);
}

var huntingBuffs$1;
var huntingBuffsName;
var hidePlayerActions;
var missingBuffsDiv;

function getPrefs() {
  calf.hideSubLvlCreature = getValue('hideSubLvlCreature');
  hidePlayerActions = getValue('hidePlayerActions');
  calf.showBuffs = getValue('showHuntingBuffs');
  calf.enabledHuntingMode = getValue('enabledHuntingMode');
  calf.buffs = shouldBeArray('huntingBuffs');
  calf.buffsName = getValue('huntingBuffsName');
  calf.buffs2 = shouldBeArray('huntingBuffs2');
  calf.buffs2Name = getValue('huntingBuffs2Name');
  calf.buffs3 = shouldBeArray('huntingBuffs3');
  calf.buffs3Name = getValue('huntingBuffs3Name');
  calf.doNotKillList = shouldBeArray('doNotKillList');
}

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
  if (typeof tmpFn === 'function') {
    tmpFn();
  }
}

function toggleSubLvlCreature() {
  calf.hideSubLvlCreature = !calf.hideSubLvlCreature;
  setValue('hideSubLvlCreature', calf.hideSubLvlCreature);
  GameData.fetch(256);
}

function toggleHidePlayerActions() {
  hidePlayerActions = !hidePlayerActions;
  setValue('hidePlayerActions', hidePlayerActions);
  GameData.fetch(256);
}

function toggleShowHuntingBuffs() {
  calf.showBuffs = !calf.showBuffs;
  setValue('showHuntingBuffs', calf.showBuffs);
  GameData.fetch(16);
}

function toggleEnabledHuntingMode(e) {
  if (e.target.name !== 'enabledHuntingMode') {return;}
  calf.enabledHuntingMode = e.target.value;
  setValue('enabledHuntingMode', calf.enabledHuntingMode);
  setCurrentBuffList();
  GameData.fetch(16);
}

var fshEvents = {
  hideSubLvlCreature: toggleSubLvlCreature,
  hidePlayerActions: toggleHidePlayerActions,
  showHuntingBuffs: toggleShowHuntingBuffs
};

function prefsClickEvent(e) {
  var tmpFn = fshEvents[e.target.name];
  if (typeof tmpFn === 'function') {
    e.target.blur();
    tmpFn(e);
  }
}

function buildFshDivs() {
  var fshDiv = createDiv({className: 'fshCenter fshFten'});
  var prefsDiv = createDiv({
    innerHTML: simpleCheckboxHtml('hideSubLvlCreature') + '&nbsp;&nbsp;' +
      simpleCheckboxHtml('hidePlayerActions') + '&nbsp;&nbsp;' +
      huntingBuffsHtml()
  });
  prefsDiv.addEventListener('click', prefsClickEvent);
  prefsDiv.addEventListener('change', toggleEnabledHuntingMode);
  fshDiv.insertAdjacentElement('beforeend', prefsDiv);
  missingBuffsDiv = createDiv();
  fshDiv.insertAdjacentElement('beforeend', missingBuffsDiv);
  var worldContainerBelow = document.getElementById('worldContainerBelow');
  worldContainerBelow.insertAdjacentElement('afterbegin', fshDiv);
}

function xhrDataFilter(data) {
  var myData = JSON.parse(data);
  if (!myData.actions || myData.actions.length === 0) {return data;}
  var realm = GameData.realm();
  myData.actions = myData.actions.filter(function(el) {
    if (el.type === 6) {return el.data.level >= realm.minlevel;}
    return true;
  });
  var ret = JSON.stringify(myData);
  return ret;
}

function xhrPreFilter(options, originalOptions) {
  if (!originalOptions.data || !calf.hideSubLvlCreature) {return;}
  options.dataFilter = xhrDataFilter;
}

function interceptXHR() { // jQuery.min
  $.ajaxPrefilter('JSON', xhrPreFilter);
}

function doHidePlayerActions() {
  if (!hidePlayerActions) {return;}
  var act = document.getElementById('actionList');
  var players = act.getElementsByClassName('player');
  Array.prototype.forEach.call(players, function(el) {
    var verbs = el.getElementsByClassName('verbs');
    if (verbs && verbs.length === 1) {
      verbs[0].classList.add('fshHide');
    }
  });
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
  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    dataEventsPlayerBuffs);
  if (calf.showBuffs && window.initialGameData) { // HCS initial data
    dataEventsPlayerBuffs(null,
      {b: window.initialGameData.player.buffs});
  }
}

function setupPref() {
  getPrefs();
  buildFshDivs();
  interceptXHR();
  doHuntingBuffs();
  $.subscribe('after-update.actionlist', doHidePlayerActions);
  doHidePlayerActions();
}

var showCreatureInfo;
var showMonsterLog;
var monsterLog;
var actionData;
var creature;
var monster;
var generalVariable = 1.1053;
var hpVariable = 1.1;
var statLevel;
var statDefense;
var statAttack;
var statDamage;
var statArmor;
var statHp;

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

function processMonsterLog() {
  if (!showMonsterLog) {return;}
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
  if (creature.enhancements && creature.enhancements.length > 0) {
    logCreature.enhancements = fallback(logCreature.enhancements, {});
    var logEnh = logCreature.enhancements;
    creature.enhancements.forEach(function(e) {
      logEnh[e.name] = updateMinMax(logEnh[e.name], Number(e.value));
    });
  }
  setForage('fsh_monsterLog', monsterLog);
}

function doMouseOver() {
  var oneHitNumber = Math.ceil(creature.hp * hpVariable + creature.armor *
    generalVariable);
  var monsterTip = '<table><tr><td>' +
    '<img src="http://cdn.fallensword.com/creatures/' + creature.image_id +
    '.jpg" height="200" width="200"></td><td rowspan="2">' +
    '<table width="400"><tr>' +
    '<td class="header" colspan="4" class="fshCenter">Statistics</td></tr>' +
    '<tr><td>Class:&nbsp;</td><td width="40%">' + creature.creature_class +
    '</td><td>Level:&nbsp;</td><td width="40%">' + creature.level +
    ' (your level:<span class="fshYellow">' + statLevel + '</span>)</td>' +
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

  monster.setAttribute('data-tipped', monsterTip);
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
    return creature.id !== actionData[data.passback].data.id.toString(); // Different action list
  }
];

function doCreatureInfo(data) {
  var actions = document.getElementById('actionList').children;
  for (var i = 0; i < bailOut$1.length; i += 1) {
    if (bailOut$1[i](data, actions)) {return;}
  }
  monster = actions[data.passback].firstElementChild.firstElementChild
    .firstElementChild;
  doMouseOver();
}

function processMouseOver(data) {
  if (showCreatureInfo) {doCreatureInfo(data);}
}

function processMonster(data) {
  creature = data.response.data;
  if (!creature) {return;} // creature is null
  processMouseOver(data);
  processMonsterLog();
}

function loopActions(e, i) { // jQuery
  if (e.type !== 6) {return;}
  $.getJSON('fetchdata.php?a=1&d=0&id=' + e.data.id + '&passback=' + i)
    .done(processMonster);
}

function getMyStats() {
  statLevel = intValue(document
    .getElementById('statbar-level-tooltip-general')
    .getElementsByClassName('stat-level')[0].nextElementSibling.textContent);
  statDefense = document.getElementById('statbar-character-tooltip-stats')
    .getElementsByClassName('stat-defense')[0].nextElementSibling.textContent;
  statAttack = document.getElementById('statbar-character-tooltip-stats')
    .getElementsByClassName('stat-attack')[0].nextElementSibling.textContent;
  statDamage = document.getElementById('statbar-character-tooltip-stats')
    .getElementsByClassName('stat-damage')[0].nextElementSibling.textContent;
  statArmor = document.getElementById('statbar-character-tooltip-stats')
    .getElementsByClassName('stat-armor')[0].nextElementSibling.textContent;
  statHp = document.getElementById('statbar-character-tooltip-stats')
    .getElementsByClassName('stat-hp')[0].nextElementSibling.textContent;
}

function initMonsterLog() {
  if (showCreatureInfo) {getMyStats();}
  actionData = GameData.actions();
  actionData.forEach(loopActions);
}

var genVar = [0, 1.1, 1.053, 1.1053];
var hpVar = [0, 1.053, 1, 1];

function getBias() {
  var combatEvaluatorBias = getValue('combatEvaluatorBias');
  generalVariable = genVar[combatEvaluatorBias];
  hpVariable = hpVar[combatEvaluatorBias];
}

function startMonsterLog() { // jQuery
  showCreatureInfo = getValue('showCreatureInfo');
  showMonsterLog = getValue('showMonsterLog');
  if (!showCreatureInfo && !showMonsterLog) {return;}
  if (showCreatureInfo) {getBias();}
  $.subscribe('after-update.actionlist', initMonsterLog);
  getForage('fsh_monsterLog').done(function(data) {
    monsterLog = data || {};
  });
  initMonsterLog();
}

var def_afterUpdateActionlist = 'after-update.actionlist';

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
  var act = document.getElementById('actionList');
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

function afterUpdateActionList() {
  // color the critters in the do no kill list blue
  var act = document.getElementById('actionList');
  var creatures = act.getElementsByClassName('creature');
  Array.prototype.forEach.call(creatures, function(el) {
    if (calf.doNotKillList.indexOf(el.textContent) !== -1) {
      el.classList.add('fshBlue');
    }
  });
}

function interceptDoAction() { // jQuery
  var gameData = GameData;
  var hcs = window.HCS;
  var oldDoAction = gameData.doAction;
  gameData.doAction = function(actionCode, fetchFlags, data) {
    if (actionCode === hcs.DEFINES.ACTION.CREATURE_COMBAT) {
      // Do custom stuff e.g. do not kill list
      var creatureIcon = $('#actionList div.header')
        .eq(data.passback).find('a.icon');
      if (calf.doNotKillList.indexOf(creatureIcon.data('name')) !== -1) {
        creatureIcon.removeClass('loading');
        return;
      }
    }
    // Call standard action
    oldDoAction(actionCode, fetchFlags, data);
  };
}

function impIconColour() { // jQuery
  var imp = $('#actionlist-shield-imp');
  if (imp.length === 1) {
    imp.css('background-color',
      assets.colorHash[imp.text()] || '#ad8043');
  }
}

function fixDebuffQTip(e) { // jQuery.min
  $(e.target).qtip('hide');
}

function injectWorldNewMap(data) {
  updateSendGoldOnWorld(data);
  if (data.realm && data.realm.name) {
    injectButtons(data);
    document.getElementById('buffList')
      .addEventListener('click', fixDebuffQTip);
    if (calf.hideSubLvlCreature) {GameData.fetch(256);}
  }
}

function subscribes() { // jQuery.min
  setupPref();
  injectSendGoldOnWorld();
  // subscribe to view creature events on the new map.
  $.subscribe('ready.view-creature', readyViewCreature);
  hideGroupButton(); // Hide Create Group button
  doMonsterColors();
  // add do-not-kill list functionality
  $.subscribe(def_afterUpdateActionlist, afterUpdateActionList);
  afterUpdateActionList();
  // add monster log functionality
  startMonsterLog();
  // then intercept the action call
  interceptDoAction();
  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    impIconColour);
  $.subscribe('keydown.controls', function(e, key) {
    if (key === 'ACT_REPAIR') {GameData.fetch(403);}
  });
  combatLogger();
  // on world
  if (window.initialGameData) {// HCS initial data
    injectWorldNewMap(window.initialGameData);
    impIconColour(null,
      {b: window.initialGameData.player.buffs});
  }
  $.subscribe('-1-success.action-response 5-success.action-response',
    function(e, data) { // change of information
      injectWorldNewMap(data);
    }
  );
  // somewhere near here will be multi buy on shop
  prepareShop();
  injectRelic();


}

/* fetchFlags = {
  playerStats : 1,
  playerBackpackCount : 2,
  playerBackpackItems : 4,
  playerPrefs : 8,

  playerBuffs : 16,
  worldDefines : 32,
  worldRealmStatic : 64,
  worldRealmDynamic : 128,

  worldRealmActions : 256,
  PLAYER_EQUIPMENT : 512,
  PLAYER_NOTIFICATIONS : 1024,

  all : 2047
}; */

var impStyles = [
  ' style="color:red; font-size:large; font-weight:bold"',
  ' style="color:Orangered; font-size:large; font-weight:bold"',
  ' style="color:Orangered; font-size:medium; font-weight:bold;"'
];

function getImpWarningStyle(impsRemaining) { // Legacy
  if (impsRemaining >= 0 && impsRemaining <= 2) {
    return impStyles[impsRemaining];
  }
  return ' style="color:green; font-size:medium;"';
}

function impWarning(impsRemaining) { // Legacy
  var applyImpWarningColor = getImpWarningStyle(impsRemaining);
  var recastButton = '';
  if (impsRemaining === 0) {
    recastButton = '&nbsp;<span id="Helper:recastImpAndRefresh" ' +
      'style="color: blue; cursor: pointer; text-decoration: underline; ' +
      'font-size: xx-small;">Recast</span>';
  }
  return '<tr><td' + applyImpWarningColor + '>Shield Imps Remaining: ' +
    impsRemaining + recastButton + '</td></tr>';
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

function getKillStreak(responseText) { // Hybrid
  var doc = createDocument(responseText);
  var killStreakLocation = $(doc).find('td:contains("Streak:"):last').next();
  log('killStreakLocation', killStreakLocation);
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
  if (typeof val === 'undefined') {
    setValue(pref, 0);
    val = 0;
  }
  return val;
}

function getTrackText(trackKillStreak) { // Legacy
  if (trackKillStreak) {return 'ON';}
  return 'off';
}

function doDeathDealer(impsRemaining) { // Legacy
  var lastDeathDealerPercentage = getLastValue('lastDeathDealerPercentage');
  var lastKillStreak = getLastValue('lastKillStreak');
  var trackKillStreak = getValue('trackKillStreak');
  var trackText = getTrackText(trackKillStreak);
  if (impsRemaining > 0 && lastDeathDealerPercentage === 20) {
    return '<tr><td style="font-size:small; color:black"' +
      '>Kill Streak: <span findme="killstreak">&gt;' +
      addCommas(lastKillStreak) + '</span> Damage bonus: <' +
      'span findme="damagebonus">20</span>%</td></tr>';
  }
  if (!trackKillStreak) {
    return '<tr><td style="font-size:small; color:' +
      'navy" nowrap>KillStreak tracker disabled. <span style="' +
      'font-size:xx-small">Track: <span id=Helper:toggleKS' +
      'tracker style="color:navy;cursor:pointer;text-' +
      'decoration:underline;" title="Click to toggle">' +
      trackText + '</span></span></td></tr>';
  }
  xmlhttp('index.php?cmd=profile', getKillStreak);
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

function recastImpAndRefresh(responseText) { // Legacy
  var doc = createDocument(responseText);
  if (doc) {
    location.reload();
  }
}

function toggleKsTracker() { // Legacy
  var trackKS = document.getElementById('Helper:toggleKStracker');
  if (trackKS) {
    trackKS.addEventListener('click', function() {
      setValue('trackKillStreak',
        !getValue('trackKillStreak'));
      location.reload();
    }, true);
  }
}

var hasShieldImp;
var hasDeathDealer;
var impsRemaining;
var re = /(\d+) HP remaining/;

function getImpHp() { // Legacy - Old Map
  impsRemaining = 0;
  if (hasShieldImp) {
    var textToTest = $(hasShieldImp).data('tipped');
    var impsRemainingRE = re.exec(textToTest);
    impsRemaining = impsRemainingRE[1];
  }
  var ret = impWarning(impsRemaining);
  if (hasDeathDealer) {
    ret += doDeathDealer(impsRemaining);
  }
  return ret;
}

function findImps() { // Legacy - Old Map
  if (hasDeathDealer || hasShieldImp) {
    return getImpHp();
  }
  return '';
}

function impRecast() { // Legacy - Old Map
  if ((hasDeathDealer || hasShieldImp) && impsRemaining === 0) {
    var _recastImpAndRefresh = document
      .getElementById('Helper:recastImpAndRefresh');
    var impHref = 'index.php?cmd=quickbuff&subcmd=activate&target' +
      'Players=' +
      $('dt.stat-name:first').next().text().replace(/,/g, '') +
      '&skills%5B%5D=55';
    _recastImpAndRefresh.addEventListener('click', function() {
      xmlhttp(impHref, recastImpAndRefresh, true);
    }, true);
  }
}

function checkBuffs() { // Legacy - Old Map
  // extra world screen text
  var replacementText = '<td background="' + imageServer +
    '/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
    'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
    ':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
    'td colspan="2" height="10"></td></tr><tr>';
  hasShieldImp = findNode('//img[contains(@src,"/55_sm.gif")]');
  hasDeathDealer = findNode('//img[contains(@src,"/50_sm.gif")]');
  replacementText += findImps();
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
  injectHere.appendChild(newSpan);

  impRecast();
  toggleKsTracker();
}

function injectOldMap() {
  checkBuffs();
}

function injectWorld() {
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
  if (document.getElementById('worldPage')) { // new map
    subscribes();
  } else {
    // not new map.
    injectOldMap();
  }
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

function quickInventDone(responseText) { // jQuery
  var infoMessage = infoBox(responseText);
  $('#invent_Result').append('<li style="list-style:decimal">' +
    infoMessage + '</li>');
}

function quickInvent() { // Legacy
  var amountToInvent = $('#invent_amount').attr('value');
  var recipeID = $('input[name="recipe_id"]').attr('value');
  $('#invet_Result_label').html('Inventing ' + amountToInvent + ' Items');
  for (var i = 0; i < amountToInvent; i += 1) {
    // Had to add &fsh=i to ensure that the call is sent out multiple times.
    xmlhttp(
      'index.php?cmd=inventing&subcmd=doinvent&recipe_id=' +
      recipeID + '&fsh=' + i, quickInventDone);
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
  document.getElementById('quickInvent').addEventListener('click',
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
        '?cmd=auctionhouse&search_text=' +
        encodeURI(plantFromComponent) + '">AH</a>'
    });
    var counter = findNode('../../../../tr[2]/td', callback);
    counter.setAttribute('colspan', '2');
    callback.parentNode.parentNode.parentNode.appendChild(itemLinks);
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
  recipe.html('<a href="http://guide.fallensword.com/index.php?cmd=' +
    'items&subcmd=view&search_name=' + searchName + '">' + name +
    '</a>');

  var components = findNodes(
    '//b[.="Components Required"]/../../following-sibling::tr[2]//img');
  if (components) {
    for (var i = 0; i < components.length; i += 1) {
      var mo = components[i].getAttribute('data-tipped');
      xmlhttp(linkFromMouseoverCustom(mo),
        injectViewRecipeLinks, components[i]);
      var componentCountElement = components[i].parentNode.parentNode
        .parentNode.nextSibling.firstChild;
      componentCountElement.innerHTML = '<nobr>' +
        componentCountElement.innerHTML + '</nobr>';
    }
  }
}

function inventing() {
  injectViewRecipe();
  injectInvent();
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

function formatLastReset(last_login) {
  var m = Math.floor((Date.now() - last_login) / 60000);
  var h = Math.floor(m / 60);
  m %= 60;
  return outputFormat(h, ' hours, ') + m + ' mins';
}

function formatTime() {
  var lastLadderReset = getValue('lastLadderReset');
  var now = Date.now();
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
  topTable.appendChild(newRow);
}

function ladder() {
  dontPost$2();
  lastReset();
}

var oldMoves = [];
var nodes;
var selectRow;

function doPickMove(moveId, slotId) {
  return $.ajax({
    url: 'index.php',
    data: {
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
  var node = $('#pCC b:contains("Setup Combat Moves")');
  if (node.length !== 1) {return;}
  node.addClass('fshLink fshGreen');
  node.click(selectMoves);
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
  getForage('fsh_arena').done(gotMoves);
}

var currentFSP;

function updateStamCount(evt) { // jQuery
  var target = $(evt.target);
  var amount = target.attr('amount');
  var cost = target.attr('cost');
  var quantity = target.val();
  // cap the value if the user goes over his current FSP
  var color = 'red';
  var extraStam = Math.floor(currentFSP / cost) * amount;
  if (quantity * cost <= currentFSP) {
    extraStam = quantity * amount;
    color = 'blue';
  }
  $('#pCC span[id="totalStam"][type="' + target.attr('stamtype') + '"]')
    .css('color', color)
    .html('(+' + extraStam + ' stamina)');
}

function injectUpgradeHelper(value, type) { // jQuery
  var theCells = $('#pCC tr')
    .has('input[name="upgrade_id"][value="' + value + '"]')
    .find('td');
  var cell = theCells.first();
  cell.append(' <span style="color:blue" ' +
    'id="totalStam" type="' + type + '"></span>');
  var amountRE = new RegExp('\\+(\\d+) ' + type + ' Stamina');
  var amount = cell.text().match(amountRE)[1];
  $('input[name="quantity"]', theCells)
    .attr('stamtype', type)
    .attr('amount', amount)
    .attr('cost', theCells.eq(1).text())
    .keyup(updateStamCount);
}

function injectPoints() { // jQuery
  currentFSP = intValue($('#statbar-fsp').text());
  injectUpgradeHelper(0, 'Current');
  injectUpgradeHelper(1, 'Maximum');
  $('#pCC td')
    .has('input[name="upgrade_id"][value="3"]')
    .html('<a href="' + server +
      '?cmd=marketplace">Sell at Marketplace</a>');
}

function storePlayerUpgrades() { // Legacy
  var alliesText = findNode('//td[.="+1 Max Allies"]');
  var alliesRatio = alliesText.nextSibling.nextSibling.nextSibling
    .nextSibling;
  if (alliesRatio) {
    var alliesValueRE = /(\d+) \/ 115/;
    var alliesValue = Number(alliesValueRE.exec(alliesRatio.innerHTML)[1]);
    setValue('alliestotal', alliesValue + 5);
  }
  var enemiesText = findNode('//td[.="+1 Max Enemies"]');
  var enemiesRatio = enemiesText.nextSibling.nextSibling.nextSibling
    .nextSibling;
  if (enemiesRatio) {
    var enemiesValueRE = /(\d+) \/ 115/;
    var enemiesValue = Number(enemiesValueRE.exec(enemiesRatio.innerHTML)[1]);
    setValue('enemiestotal', enemiesValue + 5);
  }
  injectPoints();
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
      return buffList[j].stamina.toString();
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

function formatDateTime(aDate) {
  var yyyy = aDate.getFullYear().toString();
  var mon = padZ(aDate.getMonth() + 1);
  var dd = padZ(aDate.getDate());
  var hh = padZ(aDate.getHours());
  var mm = padZ(aDate.getMinutes());
  var ss = padZ(aDate.getSeconds());
  return yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
}

function buffResult(_buffLog) {
  var buffLog = _buffLog;
  if (!buffLog) {buffLog = '';}
  var timeStamp = formatDateTime(new Date());
  var buffsAttempted = document.getElementById('quickbuff-report')
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
    '<a href="http://guide.fallensword.com/index.php?cmd=quests&amp;' +
    'subcmd=view&amp;quest_id=' + questID + '" class="tip-static" ' +
    'data-tipped="Search for this quest on the Ultimate Fallen Sword Guide" ' +
    'style="background-image: url(\'' + imageServer +
    '/temple/1.gif\');" target="_blank"></a>&nbsp;' +
    '<a href="http://wiki.fallensword.com/index.php?title=' +
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
  injectHere.insertAdjacentHTML('beforeend', guideButtons(questID, questName));
}

var unknown = [
  {
    condition: function() {
      return document.getElementById('quickbuff-report');
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
  //     return system.findNode('//a[.="Back to Scavenging"]');
  //   },
  //   result: function() {
  //     fshGa.screenview('unknown.scavenging.injectScavenging');
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
  if (typeof window.jQuery === 'undefined') {return;}
  unknown.some(function(el) {
    if (el.condition()) {
      el.result();
      return true;
    }
    return false;
  });
}

var warehouse = [];
var collapseNewsArchive;
var lastLadderReset;

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
  if (el.rowIndex % 6 === 0) {return el;}
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
  var articleNo = myRow.rowIndex / 6;
  var article = warehouse[articleNo];
  if (article.open === false) {
    collapseAll();
    expandArt(article);
  } else {
    collapseArt(article);
  }
}

function evtHdl$2(evt) {
  if (collapseNewsArchive) {evtEnabled(evt);}
}

function makeHeaderClickable(row) {
  if (collapseNewsArchive) {row.classList.add('fshPoint');}
}

function collapseDuringAnalysis(row, thisArticle) {
  if (collapseNewsArchive) {
    row.classList.add('fshHide');
    thisArticle.open = false;
  } else {
    thisArticle.open = true;
  }
}

function checkForPvPLadder(row) {
  if (row.children[1].children[0].textContent === 'PvP Ladder') {
    var logTime = parseDateAsTimestamp(
      row.children[1].children[2].textContent.replace('Posted: ', ''));
    if (logTime > lastLadderReset) {
      setValue('lastLadderReset', logTime);
      lastLadderReset = logTime;
    }
  }
}

function testRowType(row, rowType, thisArticle) {
  if (rowType === 0) {
    thisArticle.header = row;
    makeHeaderClickable(row);
    checkForPvPLadder(row);
  }
  if (rowType > 1) {
    thisArticle.rows[rowType] =
      fallback(thisArticle[rowType], {});
    thisArticle.rows[rowType].row = row;
    collapseDuringAnalysis(row, thisArticle);
  }
}

function doTagging(row) {
  var rowType = row.rowIndex % 6;
  var articleNo = (row.rowIndex - rowType) / 6;
  warehouse[articleNo] = fallback(warehouse[articleNo], {});
  var thisArticle = warehouse[articleNo];
  thisArticle.rows = thisArticle.rows || [];
  testRowType(row, rowType, thisArticle);
}

function toggleHeaderClass() {
  warehouse.forEach(function(article) {
    article.header.classList.toggle('fshPoint');
  });
}

function togglePref$1() {
  collapseNewsArchive = !collapseNewsArchive;
  setValue('collapseNewsArchive', collapseNewsArchive);
  if (collapseNewsArchive) {collapseAll();} else {expandAll();}
  toggleHeaderClass();
}

function setupPref$1(rowInjector) {
  collapseNewsArchive = getValue('collapseNewsArchive');
  rowInjector.insertAdjacentHTML('afterend',
    simpleCheckbox('collapseNewsArchive'));
  document.getElementById('collapseNewsArchive')
    .addEventListener('click', togglePref$1);
}

function viewArchive() {
  lastLadderReset = getValue('lastLadderReset');
  var theTables = pCC.getElementsByTagName('table');
  setupPref$1(theTables[0].rows[2]);
  Array.prototype.forEach.call(theTables[2].rows, doTagging);
  theTables[2].addEventListener('click', evtHdl$2);
}

function cancelAllAH() { // jQuery
  var cancelButtons = document.getElementById('resultRows')
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
      $.post(
        'index.php?cmd=auctionhouse&subcmd=cancel', {
          auction_id:
            /inv_id=(\d+)/.exec(itemImage.getAttribute('data-tipped'))[1]
        }
      )
    );
  }
  $.when.apply($, prm).done(function() {
    document.getElementById('refresh').click();
  });
}

function injectAuctionHouse() {
  if (!pCC) {return;}
  if (getValue('autoFillMinBidPrice')) {
    document.getElementById('auto-fill').checked = true;
  }
  document.getElementById('sort0').click();
  var cancelAll = createSpan({
    className: 'smallLink',
    textContent: 'Cancel All'
  });
  var fill = document.getElementById('fill').parentNode.parentNode
    .nextElementSibling.firstElementChild;
  fill.classList.add('fshCenter');
  fill.insertAdjacentHTML('afterbegin', ']');
  fill.insertAdjacentElement('afterbegin', cancelAll);
  fill.insertAdjacentHTML('afterbegin', '[');
  cancelAll.addEventListener('click', cancelAllAH);
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

function bankDeposit(e) { // jQuery
  e.preventDefault();
  var o = bankSettings;
  var amount = $('#pCC #deposit_amount').val();
  if (invalidAmount(o, amount)) {return;}
  o.data.mode = 'deposit';
  o.data.deposit_amount = amount;
  $.get('index.php', o.data).done(transResponse);
}

function bankWithdrawal(e) { // jQuery
  e.preventDefault();
  var o = bankSettings;
  var amount = $('#pCC #withdraw_amount').val();
  if (!$.isNumeric(amount) || amount < 1) {return;}
  o.data.mode = 'withdraw';
  o.data.withdraw_amount = amount;
  $.get('index.php', o.data).done(transResponse);
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

function ajaxifyBank() { // jQuery
  var o = bankSettings;
  var bank = $('#pCC b');
  if (bank.length !== 0 && bank.eq(0).text() === o.headText) {
    appLink(o, bank);
  }
}

function injectGuildBank() {
  bankSettings = guildBank;
  ajaxifyBank();
}

function injectBank() {
  bankSettings = playerBank;
  ajaxifyBank();
}

var invItems$3;
var type;
var itemId;

function tickElement(o, el) {
  el.checked = !el.disabled && !el.checked;
}

var types = [
  {
    c: function() {return type === 'guild';},
    r: function(o, el) {
      el.checked = !el.disabled && invItems$3[o.invid].guild_tag !== '-1';
    }
  },
  {
    c: function(o) {
      return type === 'item' && invItems$3[o.invid].item_id === itemId;
    },
    r: tickElement
  },
  {
    c: function() {return type === 'checkAll';},
    r: tickElement
  }
];

function testType(o, el) {
  types.some(function(test) {
    if (test.c(o)) {
      test.r(o, el);
      return true;
    }
    return false;
  });
}

function doCheckboxes(itemsAry, invItems_, type_, itemId_) {
  invItems$3 = invItems_;
  type = type_;
  itemId = itemId_;
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
  tRows[tRows.length - 2].cells[0].insertAdjacentHTML('afterbegin',
    '<input id="fshChkAll" value="Check All" type="button">&nbsp;');
}

function doFolderButtons(folders) {
  if (calf.subcmd2 === 'storeitems') {
    var formNode = pCC.getElementsByTagName('form')[0];
    var tr = createTr({className: 'fshCenter'});
    var insertHere = createTd({colSpan: 3});
    tr.appendChild(insertHere);
    formNode.parentNode.insertBefore(tr, formNode);
    insertHere.innerHTML = makeFolderSpans(folders);
    extraButtons();
  }
}

var insertHere;

function showHideLabel(pref) {
  if (pref) {return 'Hide';}
  return 'Show';
}

function doToggleButtons(showExtraLinks, showQuickDropLinks) {
  // Option toggle buttons for both screens
  if (!insertHere) {
    insertHere = pCC.getElementsByTagName('form')[0]
      .previousElementSibling.firstElementChild;
  }
  var inject = '[<span id="fshShowExtraLinks" class="sendLink">' +
    showHideLabel(showExtraLinks) +
    ' AH and UFSG links</span>]&nbsp;' +
    '[<span id="fshShowQuickDropLinks" class="sendLink">' +
    showHideLabel(showQuickDropLinks) +
    ' Quick Drop links</span>]&nbsp;';
  if (calf.subcmd2 === 'storeitems') {
    inject += '[<span id="fshSelectAllGuildLocked" class="sendLink">' +
      ' Select All Guild Locked</span>]&nbsp;';
  }
  insertHere.innerHTML = inject;
}

function hideFolders$1(itemsAry, invItems, self) {
  var folderId = self.dataset.folder;
  itemsAry.forEach(function(o) {
    o.el.parentNode.parentNode.previousElementSibling.firstElementChild
      .checked = false;
    var tr = o.injectHere.parentNode;
    var separator = tr.nextElementSibling;
    if (folderId === '0') {
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
  flrRow.insertAdjacentHTML('afterend', options);
}

function moveItemsToFolder(itemsAry) { // jQuery.min
  var folderId = document.getElementById('selectFolderId').value;
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
  $.when.apply($, prm).done(function() {location.reload();});
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
var extraLinks;
var paintCount;
var itemsAry;
var checkAll;
var itemsHash;
var dropLinks;
var invItems$2;
var colouring;
var sendLinks;

function afterbegin(o, item) {
  if (fallback(extraLinks, !showExtraLinks)) {
    return;
  }
  var pattern = '<span><span class="aHLink">';
  if (!item.bound) {
    pattern += '[<a href="index.php?cmd=auctionhouse&search_text=' +
      encodeURIComponent(item.item_name) + '">AH</a>]';
  }
  pattern += '</span>[<a href="http://guide.fallensword.com/' +
    'index.php?cmd=items&subcmd=view&item_id=' + item.item_id +
    '" target="_blank">UFSG</a>]</span>';
  o.injectHere.insertAdjacentHTML('afterbegin', pattern);
}

var buildTrailer = [
  {
    condition: function(item) {
      return !checkAll && itemsHash[item.item_id] !== 1;
    },
    result: function(o, item) {
      return ' [<span linkto="' + item.item_id +
        '" class="fshLink">Check all</span>]';
    }
  },
  {
    condition: function(item) {
      return !sendLinks && showQuickSendLinks$1 &&
        !item.bound;
    },
    result: function(o) {
      return ' <span class="quickAction sendLink tip-static" ' +
        'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
        'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>';
    }
  },
  {
    condition: function(item) {
      return !dropLinks && showQuickDropLinks$1 &&
        item.guild_tag === '-1';
    },
    result: function(o) {
      return ' <span class="quickAction dropLink tip-static" itemInvId="' +
        o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
        'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>';
    }
  }
];

function beforeend(o, item) {
  if (!colouring && !disableItemColoring) {
    o.injectHere.classList.add(rarity[item.rarity].clas);
  }
  var pattern = buildTrailer.reduce(function(prev, el) {
    var ret = prev;
    if (el.condition(item)) {
      ret += el.result(o, item);
    }
    return ret;
  }, '');
  if (pattern !== '') {o.injectHere.insertAdjacentHTML('beforeend', pattern);}
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
  while (performance.now() < limit &&
      paintCount < itemsAry.length) {
    var o = itemsAry[paintCount];
    var item = invItems$2[o.invid];
    afterbegin(o, item);
    beforeend(o, item);
    paintCount += 1;
  }
  if (paintCount < itemsAry.length) {
    add(3, invPaint);
  } else {
    doneInvPaint();
  }
}

function toggleShowExtraLinks() {
  showExtraLinks = !showExtraLinks;
  setValue('showExtraLinks', showExtraLinks);
  doToggleButtons(showExtraLinks, showQuickDropLinks$1);
  if (!extraLinks) {
    paintCount = 0;
    add(3, invPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.firstElementChild;
      el.classList.toggle('fshHide');
    });
  }
}

function toggleShowQuickDropLinks() {
  showQuickDropLinks$1 = !showQuickDropLinks$1;
  setValue('showQuickDropLinks', showQuickDropLinks$1);
  doToggleButtons(showExtraLinks, showQuickDropLinks$1);
  if (!dropLinks) {
    paintCount = 0;
    add(3, invPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.querySelector('.dropLink');
      el.classList.toggle('fshHide');
    });
  }
}

var evts$1 = [
  {
    condition: function(self) {return self.id === 'fshShowExtraLinks';},
    result: toggleShowExtraLinks
  },
  {
    condition: function(self) {return self.id === 'fshShowQuickDropLinks';},
    result: toggleShowQuickDropLinks
  },
  {
    condition: function(self) {return self.id === 'fshSelectAllGuildLocked';},
    result: function() {doCheckboxes(itemsAry, invItems$2, 'guild');}
  },
  {
    condition: function(self) {return self.id === 'fshMove';},
    result: function() {moveItemsToFolder(itemsAry);}
  },
  {
    condition: function(self) {return self.hasAttribute('linkto');},
    result: function(self) {
      doCheckboxes(itemsAry, invItems$2, 'item', self.getAttribute('linkto'));
    }
  },
  {
    condition: function(self) {return self.classList.contains('sendLink');},
    result: function(self) {
      quickAction(self, sendItem, 'Sent', '.dropLink');
    }
  },
  {
    condition: function(self) {return self.classList.contains('dropLink');},
    result: function(self) {
      quickAction(self, dropItem, 'Dropped', '.sendLink');
    }
  },
  {
    condition: function(self) {return self.classList.contains('folder');},
    result: function(self) {
      hideFolders$1(itemsAry, invItems$2, self);
    }
  },
  {
    condition: function(self) {return self.id === 'fshChkAll';},
    result: function() {
      doCheckboxes(itemsAry, invItems$2, 'checkAll');
    }
  }
];

function evtHandler(evt) {
  var self = evt.target;
  evts$1.some(function(el) {
    if (el.condition(self)) {
      el.result(self);
      return true;
    }
    return false;
  });
}

function getItems$1() {
  addStatTotalToMouseover();
  disableItemColoring = getValue('disableItemColoring');
  showExtraLinks = getValue('showExtraLinks');
  showQuickDropLinks$1 = getValue('showQuickDropLinks');
  showQuickSendLinks$1 = getValue('showQuickSendLinks');
  doToggleButtons(showExtraLinks, showQuickDropLinks$1);
  pCC.addEventListener('click', evtHandler);
  var imgList = getItemImg(pCC);
  itemsAry = [];
  itemsHash = {};
  Array.prototype.forEach.call(imgList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var matches = tipped.match(itemRE);
    itemsHash[matches[1]] = (itemsHash[matches[1]] || 0) + 1;
    var injectHere = el.parentNode.parentNode.nextElementSibling;
    itemsAry.push({
      el: el,
      invid: matches[2],
      injectHere: injectHere
    });
  });
  // Exclude composed pots
  itemsHash[13699] = 1;
}

function inventory(data) {
  extraLinks = false;
  checkAll = false;
  invItems$2 = data.items;
  colouring = false;
  dropLinks = false;
  sendLinks = false;
  paintCount = 0;
  add(3, invPaint);
  doFolderButtons(data.folders);
}

function injectStoreItems() {
  getInventoryById().done(inventory);
  add(3, getItems$1);
}

function injectProfileDropItems() {
  injectStoreItems();
  injectMoveItems();
}

var maxGroupSizeToJoin;
var groupStats$1;

function parseMercStats$1(mercStats) {
  groupStats$1.attackElement.innerHTML = '<span class="fshBlue">' +
    addCommas(groupStats$1.attack) + '</span>' +
    ' ( ' + addCommas(groupStats$1.attack - mercStats.attack) + ' )';
  groupStats$1.defenseElement.innerHTML = '<span class="fshBlue">' +
    addCommas(groupStats$1.defense) + '</span>' +
    ' ( ' + addCommas(groupStats$1.defense - mercStats.defense) + ' )';
  groupStats$1.armorElement.innerHTML = '<span class="fshBlue">' +
    addCommas(groupStats$1.armor) + '</span>' +
    ' ( ' + addCommas(groupStats$1.armor - mercStats.armor) + ' )';
  groupStats$1.damageElement.innerHTML = '<span class="fshBlue">' +
    addCommas(groupStats$1.damage) + '</span>' +
    ' ( ' + addCommas(groupStats$1.damage - mercStats.damage) + ' )';
  groupStats$1.hpElement.innerHTML = '<span class="fshBlue">' +
    addCommas(groupStats$1.hp) + '</span>' +
    ' ( ' + addCommas(groupStats$1.hp - mercStats.hp) + ' )';
}

function injectGroupStats() { // jQuery
  groupStats$1 = groupViewStats(document);
  getMercStats().done(parseMercStats$1);
}

function displayMinGroupLevel() { // jQuery
  var minGroupLevel = getValue('minGroupLevel');
  if (minGroupLevel) {
    $('#pCC > table > tbody > tr > td > table td').first()
      .append('<span style="color:blue"> ' +
      'Current Min Level Setting: ' + minGroupLevel + '</span>');
  }
}

function filterMercs(e) {return e.search('#000099') === -1;}

function joinGroup(groupJoinURL, joinButton) { // jQuery
  return $.get(groupJoinURL).done(function() {
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
    var groupJoinURL = 'index.php?cmd=guild&subcmd=groups&subcmd2=join' +
      '&group_id=' + groupID;
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
  var extraText = '<table id="stat">' +
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
  expiresLocation.insertAdjacentHTML('beforeend', extraText);
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
    document.getElementById('joinallgroupsundersize')
      .addEventListener('click', joinAllGroupsUnderSize, true);
  } else {
    buttonElement.innerHTML += '&nbsp;<input id="fetchgroupstats" ' +
      'type="button" value="Fetch Group Stats" class="custombutton">';
  }
  document.getElementById('fetchgroupstats')
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
  getMembrList(false)
    .done(doGroupPaint);
  displayMinGroupLevel();
  groupButtons();
  fixTable();
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

function showAllQuestSteps() {
  if (!getValue('showNextQuestSteps')) {return;}
  Array.prototype.forEach.call(document.querySelectorAll('div[id^="stage"]'),
    function(e) {e.style.display = 'block';});
  document.getElementById('next_stage_button').style.display = 'none';
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

function addChatTextArea() { // jQuery
  if (!getValue('enhanceChatTextEntry') ||
      !pCC) {return;}
  hasTextEntry();
}

function pvpXp(color, xpGain) { // Legacy
  var out = '';
  if (xpGain !== 0) {
    out = 'XP stolen:<span class="' + color + '">' +
      addCommas(xpGain) + ' </span>';
  }
  return out;
}

function pvpGoldGain(color, goldGain) { // Legacy
  var out = '';
  if (goldGain !== 0) {
    out = 'Gold lost:<span class="' + color + '">' +
      addCommas(goldGain) + ' </span>';
  }
  return out;
}

function pvpGoldStolen(color, goldStolen) { // Legacy
  var out = '';
  if (goldStolen !== 0) {
    out = 'Gold stolen:<span class="' + color + '">' +
      addCommas(goldStolen) + ' </span>';
  }
  return out;
}

function pvpPrestigeGain(color, prestigeGain) { // Legacy
  var out = '';
  if (prestigeGain !== 0) {
    out = 'Prestige gain:<span class="' + color + '">' +
      prestigeGain + ' </span>';
  }
  return out;
}

function pvpRating(color, pvpRatingChange) { // Legacy
  var out = '';
  if (pvpRatingChange !== 0) {
    out = 'PvP change:<span class="' + color + '">' +
    pvpRatingChange + ' </span>';
  }
  return out;
}

function retrievePvPCombatSummary(responseText, callback) { // Legacy
  var winner = callback.winner;
  var color;
  if (winner === 1) {
    color = 'fshGreen';
  } else {
    color = 'fshRed';
  }
  var xpGain = getIntFromRegExp(responseText,
    /var\s+xpGain=(-?[0-9]+);/i);
  var goldGain = getIntFromRegExp(responseText,
    /var\s+goldGain=(-?[0-9]+);/i);
  var prestigeGain = getIntFromRegExp(responseText,
    /var\s+prestigeGain=(-?[0-9]+);/i);
  var goldStolen = getIntFromRegExp(responseText,
    /var\s+goldStolen=(-?[0-9]+);/i);
  var pvpRatingChange = getIntFromRegExp(responseText,
    /var\s+pvpRatingChange=(-?[0-9]+);/i);
  var output = '<br> ';
  output += pvpXp(color, xpGain);
  output += pvpGoldGain(color, goldGain);
  output += pvpGoldStolen(color, goldStolen);
  output += pvpPrestigeGain(color, prestigeGain);
  output += pvpRating(color, pvpRatingChange);
  callback.target.innerHTML = output;
}

function addPvpSummary(aRow, messageType) { // Legacy
  // add PvP combat log summary
  if (messageType === 'Combat' &&
      aRow.cells[2] &&
      calf.showPvPSummaryInLog &&
      /combat_id=/.test(aRow.cells[2].innerHTML) &&
      !/\(Guild Conflict\)/.test(aRow.cells[2].textContent)) {
    var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
    var defeat = /You were defeated by/.test(aRow.cells[2].innerHTML);
    var _winner = 1;
    if (defeat) {_winner = 0;}
    var combatSummarySpan = createSpan({style: {color: 'gray'}});
    aRow.cells[2].appendChild(combatSummarySpan);
    xmlhttp('index.php?cmd=combat&subcmd=view&combat_id=' + combatID,
      retrievePvPCombatSummary,
      {
        target: combatSummarySpan,
        winner: _winner
      }
    );
  }
}

function processLadder(aRow, messageType) {
  if (messageType === 'Notification' &&
      aRow.cells[2].firstElementChild &&
      aRow.cells[2].firstElementChild.tagName === 'IMG' &&
      aRow.cells[2].firstElementChild.src.indexOf('pvp_icon.gif') !== -1) {
    var logTime = parseDateAsTimestamp(aRow.cells[1].textContent);
    if (logTime > calf.lastLadderReset) {
      setValue('lastLadderReset', logTime);
      calf.lastLadderReset = logTime;
    }
  }
}

var myPlayer = {};
var addAttackLinkToLog;
var memberNameString;
var listOfAllies;
var listOfEnemies;
var nickList;
var enableChatParsing;

function removeHTML(buffName) {
  return buffName.replace(/<\/?[^>]+(>|$)/g, '');
}

function reportIgnore(aRow, isGuildMate, playerName$$1) { // Legacy
  var extraPart = '';
  var dateHTML = aRow.cells[1].innerHTML;
  var dateFirstPart = dateHTML
    .substring(0, dateHTML.indexOf('>Report') + 7);
  var dateLastPart = dateHTML
    .substring(dateHTML.indexOf('Message</a>') + 11, dateHTML.length);
  if (!isGuildMate) {
    extraPart = ' | <a title="Add to Ignore List" href="index.php?cmd' +
      '=log&subcmd=doaddignore&ignore_username=' + playerName$$1 +
      '">Ignore</a>';
  }
  aRow.cells[1].innerHTML = dateFirstPart + '</a>' + extraPart +
    dateLastPart;
}

function buildNickList() {// Native
  nickList = buffList.reduce(function(prev, curr) {
    var ret = prev;
    var nicks = curr.nicks.split(',');
    nicks.forEach(function(el) {
      var nick = el.toLowerCase();
      ret[nick] = curr.skillId;
    });
    return ret;
  }, {});
}

function doBuffLink(_buffsSent, targetPlayerID) { // Legacy
  var quickBuff = '';
  var buffsSent = _buffsSent[0].replace('`~', '').replace('~`', '')
    .split(/\s*,\s*/);
  buffsSent.reduce(function(prev, el) {
    var ret = prev;
    var nick = el.toLowerCase();
    if (nickList[nick]) {
      ret += nickList[nick].toString() + ';';
    }
    return ret;
  }, '');
  return ' | <a ' + quickBuffHref(targetPlayerID, quickBuff) +
      '>Buff</a></span>';
}

function getAttackPart(playerName$$1) { // Legacy
  if (addAttackLinkToLog) {
    return ' | <a href="index.php?cmd=attackplayer&target_username=' +
      playerName$$1 + '">Attack</a>';
  }
  return '';
}

function isChat(aRow, isGuildMate, playerName$$1) { // Legacy
  var extraPart = '';
  reportIgnore(aRow, isGuildMate, playerName$$1);
  var messageHTML = aRow.cells[2].innerHTML;
  var firstPart = messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
  var thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10,
    messageHTML.indexOf('>Buff</a>') + 9);
  var targetPlayerID = /quickBuff\((\d+)\)/.exec(thirdPart)[1];
  thirdPart = ' | <a ' + quickBuffHref(targetPlayerID) +
    '>Buff</a></span>';
  var fourthPart = messageHTML.substring(messageHTML
    .indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
  var lastPart = messageHTML.substring(messageHTML.indexOf('</small>'),
    messageHTML.length);
  extraPart = ' | <a href="index.php?cmd=trade&target_player=' + playerName$$1 +
    '">Trade</a> | <a title="Secure Trade" href="index.php?cmd=trade' +
    '&subcmd=createsecure&target_username=' + playerName$$1 + '">ST</a>';
  var attackPart = getAttackPart(playerName$$1);
  var buffsSent = aRow.cells[2].innerHTML.match(/`~.*?~`/);
  if (buffsSent) {
    thirdPart = doBuffLink(buffsSent, targetPlayerID);
  }
  var replyTo = '';
  if (enableChatParsing) {
    replyTo = removeHTML(firstPart.replace(/&nbsp;/g, ' ')).substr(0, 140);
  }
  var msgReplyTo = '[ <span style="cursor:pointer;text-' +
    'decoration:underline"class="a-reply" target_player="' + playerName$$1 +
    '" replyTo="' + replyTo + '...">Reply</span>';
  aRow.cells[2].innerHTML = firstPart + '<nobr>' + msgReplyTo +
    extraPart + thirdPart + attackPart + fourthPart +
    '</nobr>' + lastPart;
}

function doChat(messageType, aRow, isGuildMate, playerName$$1) { // Legacy
  if (messageType === 'Chat') {isChat(aRow, isGuildMate, playerName$$1);}
}

function isEnemy(playerName$$1, playerElement) { // Legacy
  if (listOfEnemies.indexOf(playerName$$1) !== -1) {
    playerElement.style.color = 'red';
  }
}

function isAlly(playerName$$1, playerElement) { // Legacy
  if (listOfAllies.indexOf(playerName$$1) !== -1) {
    playerElement.style.color = 'blue';
  }
}

function playerColor(colorPlayerName, playerName$$1, playerElement) { // Legacy
  if (!colorPlayerName) {return false;}
  if (memberNameString.indexOf(playerName$$1) !== -1) {
    playerElement.style.color = 'green';
    return true;
  }
  isEnemy(playerName$$1, playerElement);
  isAlly(playerName$$1, playerElement);
  return false;
}

function addExtraStuff(aRow, playerName$$1, isGuildMate) { // Legacy
  if (!isGuildMate) {
    var dateExtraText = '<nobr><span style="font-size:x-small;">' +
      '[ <a title="Add to Ignore List" href="index.php?cmd=log' +
      '&subcmd=doaddignore&ignore_username=' + playerName$$1 +
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
  if (addAttackLinkToLog) {
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

function doExtraStuff(aRow, messageType, playerName$$1, isGuildMate) {
  if (messageType === 'Notification' &&
      hasPlayerLink(aRow)) {
    addExtraStuff(aRow, playerName$$1, isGuildMate);
  }
}

function doLogWidgetRow(aRow, messageType) { // Legacy
  var playerElement;
  var playerName$$1;
  var colorPlayerName = false;
  if (messageType === 'Chat') {
    playerElement = aRow.cells[2].firstChild;
    playerName$$1 = playerElement.innerHTML;
    colorPlayerName = true;
  }
  if (fallback(messageType === 'General',
    messageType === 'Notification') &&
      hasPlayerLink(aRow)) {
    playerElement = aRow.cells[2].firstChild.nextSibling;
    playerName$$1 = playerElement.innerHTML;
    colorPlayerName = true;
  }
  var isGuildMate = playerColor(colorPlayerName, playerName$$1, playerElement);
  doChat(messageType, aRow, isGuildMate, playerName$$1);
  doExtraStuff(aRow, messageType, playerName$$1, isGuildMate);
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
  enableChatParsing = getValue('enableChatParsing');
  var messageHeader = logTable.rows[0].cells[2];
  if (messageHeader) {
    messageHeader.insertAdjacentHTML('beforeend', '&nbsp;&nbsp;' +
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
  addAttackLinkToLog = getValue('addAttackLinkToLog');
  var logTable = findNode('//table[tbody/tr/td/span[contains' +
    '(.,"Currently showing:")]]');
  if (logTable) {foundLogTable(logTable);}
}

function addLogWidgets() { // jQuery
  $.when(
    getMembrList(false),
    myStats(false).done(function(data) {
      myPlayer = data;
    })
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

var maxcharacters;
var textArea$1;
var shoutboxPreview;

function updateShoutboxPreview() {
  var textContent = textArea$1.value;
  var chars = textContent.length;
  if (chars > maxcharacters) {
    textContent = textContent.substring(0, maxcharacters);
    textArea$1.value = textContent;
    chars = maxcharacters;
  }
  if (!shoutboxPreview) {
    shoutboxPreview = textArea$1.parentNode.parentNode.parentNode.parentNode
      .insertRow().insertCell();
  }
  shoutboxPreview.innerHTML = '<table class="sbpTbl"><tbody><tr>' +
    '<td class="sbpHdr">Preview (' + chars + '/' + maxcharacters +
    ' characters)</td></tr><tr><td class="sbpMsg"><span>' + textContent +
    '</span></td></tr></tbody></table>';
}

function injectShoutboxWidgets() {
  textArea$1 = document.getElementById('textInputBox');
  textArea$1.classList.add('fshNoResize');
  textArea$1.addEventListener('keyup', updateShoutboxPreview);
}

function newsFsbox() {
  maxcharacters = 100;
  injectShoutboxWidgets();
}

function newsShoutbox() {
  maxcharacters = 150;
  injectShoutboxWidgets();
}

var highlightPlayersNearMyLvl$1;
var lvlDiffToHighlight$1;
var myVL;
var spinner$1;
var validPvP = Math.floor(Date.now() / 1000) - 604800;

function doOnlineDot(aTable, data) {
  aTable.rows[0].insertAdjacentHTML('beforeend',
    '<td>' + onlineDot({last_login: data.last_login}) + '</td>');
  if (myVL &&
      data.last_login >= validPvP &&
      data.virtual_level > myVL - lvlDiffToHighlight$1 &&
      data.virtual_level < myVL + lvlDiffToHighlight$1) {
    aTable.parentNode.parentNode.classList.add('lvlHighlight');
  }
}

function parsePlayer(aTable, data, jqXhr) {
  if (data) {
    doOnlineDot(aTable, data);
  } else {
    aTable.rows[0].insertAdjacentHTML('beforeend',
      '<td class="fshBkRed">' + jqXhr.status + '</td>');
  }
}

function failFilter(jqXhr) {
  return $.Deferred().resolve(null, jqXhr).promise();
}

function findOnlinePlayers() { // jQuery
  var someTables = pCC.getElementsByTagName('table');
  var prm = [];
  for (var i = 4; i < someTables.length; i += 1) {
    prm.push(getProfile(someTables[i].textContent.trim())
      .pipe(null, failFilter)
      .done(parsePlayer.bind(null, someTables[i]))
    );
  }
  $.when.apply($, prm).done(function() {
    spinner$1.classList.add('fshHide');
  });
}

function getMyVL(e) { // jQuery
  $(e.target).qtip('hide');
  spinner$1 = createSpan({
    className: 'fshSpinner fshTopListSpinner',
    style: {
      backgroundImage: 'url(\'' + imageServer +
        '/world/actionLoadingSpinner.gif\')'
    }
  });
  e.target.parentNode.replaceChild(spinner$1, e.target);
  if (highlightPlayersNearMyLvl$1) {
    myStats(false).done(function(data) {
      myVL = data.virtual_level;
      lvlDiffToHighlight$1 = 11;
      if (myVL <= 205) {lvlDiffToHighlight$1 = 6;}
    }).done(findOnlinePlayers);
  } else {findOnlinePlayers();}
}

function looksLikeTopRated() {
  highlightPlayersNearMyLvl$1 =
    getValue('highlightPlayersNearMyLvl');
  var theCell = pCC.getElementsByTagName('TD')[0];
  theCell.firstElementChild.className = 'fshTopListWrap';
  var findBtn = createInput({
    className: 'fshFindOnlinePlayers custombutton tip-static',
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

function injectTopRated() {
  if (pCC &&
      pCC.firstElementChild &&
      pCC.firstElementChild.rows &&
      pCC.firstElementChild.rows.length > 2 &&
      pCC.firstElementChild.rows[1].textContent
        .indexOf('Last Updated') === 0) {looksLikeTopRated();}
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
    history: {'-': {'-': {'-': addHistoryWidgets}}},
    view: {'-': {'-': {'-': injectViewGuild}}},
    scouttower: {'-': {'-': {'-': injectScouttower}}},
    mailbox: {'-': {'-': {'-': guildMailbox}}},
    ranks: {'-': {'-': {'-': injectGuildRanks}}},
    conflicts: {rpupgrades: {'-': {'-': injectRPUpgrades}}},
    bank: {'-': {'-': {'-': injectGuildBank}}}
  },
  bank: {'-': {'-': {'-': {'-': injectBank}}}},
  log: {
    '-': {'-': {'-': {'-': playerLog}}},
    outbox: {'-': {'-': {'-': outbox}}}
  },
  potionbazaar: {'-': {'-': {'-': {'-': injectBazaar}}}},
  marketplace: {createreq: {'-': {'-': {'-': addMarketplaceWidgets}}}},
  quickbuff: {'-': {'-': {'-': {'-': injectQuickBuff}}}}, // No ga
  notepad: {
    showlogs: {'-': {'-': {'-': injectNotepadShowLogs}}},
    invmanagernew: {'-': {'-': {'-': refresh}}},
    guildinvmgr: {'-': {'-': {'-': refresh}}},
    recipemanager: {'-': {'-': {'-': injectRecipeManager}}},
    auctionsearch: {'-': {'-': {'-': injectAuctionSearch}}},
    onlineplayers: {'-': {'-': {'-': injectOnlinePlayers}}},
    quicklinkmanager: {'-': {'-': {'-': injectQuickLinkManager}}},
    monsterlog: {'-': {'-': {'-': injectMonsterLog}}},
    quickextract: {'-': {'-': {'-': insertQuickExtract}}},
    quickwear: {'-': {'-': {'-': insertQuickWear}}},
    fsboxcontent: {'-': {'-': {'-': injectFsBoxContent}}},
    bufflogcontent: {'-': {'-': {'-': injectBuffLog}}},
    newguildlog: {'-': {'-': {'-': injectNewGuildLog}}},
    findbuffs: {'-': {'-': {'-': injectFindBuffs}}},
    findother: {'-': {'-': {'-': injectFindOther}}},
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

function testCoreFunction(cmd, subcmd, subcmd2, type, fromWorld) {
  if (pageSwitcher[cmd] &&
      pageSwitcher[cmd][subcmd] &&
      pageSwitcher[cmd][subcmd][subcmd2] &&
      pageSwitcher[cmd][subcmd][subcmd2][type] &&
      pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld]) {
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
  if (typeof coreFunction === 'function') {
    screenview(functionPath);
    start('JS Perf', functionPath);
    coreFunction();
    end('JS Perf', functionPath);
  }
}

// main event dispatcher
FSH.dispatch = function dispatch() {

  setup();
  start('JS Perf', 'FSH.dispatch');

  getCoreFunction();
  lookForHcsData();
  add(3, asyncDispatcher);

  if (typeof window.jQuery === 'undefined') {return;}

  isMessageSound();

  /* This must be at the end in order not to
  screw up other system.findNode calls (Issue 351) */
  doQuickLinks();

  end('JS Perf', 'FSH.dispatch');

};

window.FSH = window.FSH || {};
window.FSH.calf = '26';

}());
