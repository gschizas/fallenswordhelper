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

/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/

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
  } catch (ex) {}

  DOMParser_proto.parseFromString = function(markup, type) {
    if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
      var doc = document.implementation.createHTMLDocument('');
      if (markup.toLowerCase().indexOf('<!doctype') > -1) {
        doc.documentElement.innerHTML = markup;
      }
      else {
        doc.body.innerHTML = markup;
      }
      return doc;
    } else {
      return real_parseFromString.apply(this, arguments);
    }
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

  if (performance.timing && performance.timing.navigationStart){
    nowOffset = performance.timing.navigationStart;
  }

  window.performance.now = function now(){
    return Date.now() - nowOffset;
  };
}

var timers = {};
var footWrap = document.getElementById('foot-wrap');

function log(text, value) { // Native
  if (footWrap) {
    footWrap.insertAdjacentHTML('beforeend',
      '<br>' + text + ': ' + value + ' (' + typeof value + ')');
  }
}

function time(name) { // Native
  if (name) {timers[name] = performance.now() * 1000;}
}

function timeEnd(name) { // Native
  if (timers[name]) {
    log(name, Math.round(performance.now() * 1000 -
      timers[name]) / 1000 + 'ms' );
    delete timers[name];
  }
}

// GM_ApiBrowserCheck
// @author        GIJoe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
// Global variables
var gvar = {};
var GMSTORAGE_PATH = 'GM_';
// You can change it to avoid conflict with others scripts
var needApiUpgrade = false;
if (window.navigator.appName.match(/^opera/i) && 
    typeof window.opera !== 'undefined'){
  needApiUpgrade = true;
  gvar.isOpera = true;
  window.GM_log = window.opera.postError;
}
if (typeof GM_setValue !== 'undefined'){
  var gsv;
  try {
    gsv=window.GM_setValue.toString();
  } catch(e) {
    gsv='staticArgs';
  }
  if (gsv.indexOf('staticArgs') > 0){
    gvar.isGreaseMonkey = true;
  }
  // test GM_hitch
  else if (gsv.match(/not\s+supported/)){
    needApiUpgrade = true;
    gvar.isBuggedChrome = true;
  }
} else{
  needApiUpgrade = true;
}

if (needApiUpgrade){
  var ws = null;
  var uid = new Date().toString();
  var result;
  try{
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
  } catch(e){
    ws = null;
  }
  // Catch Security error
  if (ws === 'object'){
    window.GM_getValue = function(name, defValue){
      var value = window.localStorage.getItem(GMSTORAGE_PATH + name);
      if (value === null || value === undefined) {return defValue;}
      switch (value.substr(0, 2)) {
      case 'S]':
        return value.substr(2);
      case 'N]':
        return parseInt(value.substr(2), 10);
      case 'B]':
        return value.substr(2) === 'true';
      }
      return value;
    };
    window.GM_setValue = function(name, value){
      switch (typeof value){
      case 'string':
        window.localStorage.setItem(GMSTORAGE_PATH + name,
          'S]' + value);
        break;
      case 'number':
        if (value.toString().indexOf('.') < 0){
          window.localStorage.setItem(GMSTORAGE_PATH + name,
            'N]' + value);
        }
        break;
      case 'boolean':
        window.localStorage.setItem(GMSTORAGE_PATH + name,
          'B]' + value);
        break;
      }
    };
  } else if (!gvar.isOpera || typeof GM_setValue === 'undefined'){
    gvar.temporarilyStorage = [];
    window.GM_getValue = function(name, defValue){
      if (typeof gvar.temporarilyStorage[GMSTORAGE_PATH + name] ===
        'undefined') {return defValue;}
      return gvar.temporarilyStorage[GMSTORAGE_PATH + name];
    };
    window.GM_setValue = function(name, value){
      switch (typeof value){
      case 'string':
      case 'boolean':
      case 'number':
        gvar.temporarilyStorage[GMSTORAGE_PATH + name] = value;
      }
    };
  }

  window.GM_listValues = function(){
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

var calf = {};

/*
Based on
fiddle.jshell.net/GRIFFnDOOR/r7tvg/
*/

var heap = [null];

function cmp(i,j) {
  return heap[i] && heap[i].priority < heap[j].priority;
}

function swp(i,j) {
  var temp = heap[i];
  heap[i] = heap[j];
  heap[j] = temp;
}

function sink(i) {
  while (i * 2 < heap.length) {
    var leftHigher = !cmp(i * 2 + 1, i * 2);
    var childIndex = leftHigher ? i * 2 : i * 2 + 1;
    if (cmp(i,childIndex)) {break;}
    swp(i, childIndex);
    i = childIndex;
  }
}

function bubble(i) {
  while (i > 1) { 
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
  bubble(heap.push({data: data, priority: priority}) -1);
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
  if (typeof fn === 'function') {
    scope = scope || window;
    args = args || [];
    push(fn.bind.apply(fn, [scope].concat(args)), priority);
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

var defaults = {
  lastActiveQuestPage: '',
  lastCompletedQuestPage: '',
  lastNotStartedQuestPage: '',
  lastWorld: '',
  questsNotStarted: false,
  questsNotComplete: false,
  enableLogColoring: false,
  enableChatParsing: false,
  enableCreatureColoring: false,
  showCombatLog: false,
  showCreatureInfo: false,
  keepLogs: false,

  showExtraLinks: false,
  huntingBuffs: 'Doubler,Librarian,Adept Learner,Merchant,Treasure Hunter,Animal Magnetism,Conserve',
  huntingBuffsName: 'default',
  huntingBuffs2: 'Deflect',
  huntingBuffs2Name: 'PvP',
  huntingBuffs3: 'Super Elite Slayer',
  huntingBuffs3Name: 'SE',
  showHuntingBuffs: false,
  moveFSBox: false,

  guildSelf: '',
  guildFrnd: '',
  guildPast: '',
  guildEnmy: '',
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
  defaultMessageSound: 'http://dl.getdropbox.com/u/2144065/chimes.wav',
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
  quickLinks:'[]',
  enableAttackHelper: false,
  minGroupLevel: 1,
  combatEvaluatorBias: 0,
  huntingMode: false,
  enabledHuntingMode: 1,
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
    '0': 1, '1': 1, '2': 1, '3': 1, '4': 1,
    '5': 1, '6': 1, '7': 1, '8': 1, '100': 1,
    '101': 1, '102': 1, '103': 1, '104': 1,
    '105': 1, '106': 1
  },
  lowestLevelInTop250: 0,

  /* jshint -W110 */ // Mixed double and single quotes. (W110)

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

  /* jshint +W110 */ // Mixed double and single quotes. (W110)

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

var itemRE = /item_id=(\d+)\&inv_id=(\d+)/;

var places = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth',
  'fourteenth'];

var server = document.location.protocol + '//' + document.location.host + '/';
var imageServer = window.HCS && window.HCS.defines &&
  window.HCS.defines.fileserver &&
  window.HCS.defines.fileserver.slice(0, -1);

function getValue(name) {
  return GM_getValue(name, defaults[name]);
}

function getValueJSON(name) {
  var resultJSON = getValue(name);
  var result;
  if (resultJSON) {
    var reviver = function(key, value) {
      if (typeof value === 'string') {
        var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (a) {
          return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
        }
      }
      return value;
    };
    result = JSON.parse(resultJSON, reviver);
  }
  return result;
}

function setValueJSON(name, value) {
  GM_setValue(name, JSON.stringify(value));
}

function setValue(name, value) {
  GM_setValue(name, value);
}

function findNodes(xpath, doc) {
  var nodes = [];
  if (xpath.indexOf('/') === 0) {
    xpath = '.'+xpath;
    // TODO this is likely to be bad
    // this is a chrome fix - needs a .// for xpath
    // where as firefox can function without it.
    // firefox sitll works with .//
  }

  var target;
  // We may have passed in a HTMLDocument object as the context
  // See createDocument with DOMParser below
  // This only matters in Firefox. evaluate will fail silently if 
  // the context is not part of the calling object.
  doc = doc || document;
  if (doc instanceof HTMLDocument) {
    target = doc;
  } else {
    target = document;
  }
  var findQ = target.evaluate(xpath, doc, null,
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

function formatDateTime(aDate) {
  var yyyy = aDate.getFullYear();
  var mon = aDate.getMonth() + 1;
  if (mon < 10) {mon = '0' + mon;}
  var dd = aDate.getDate();
  if (dd < 10) {dd = '0' + dd;}

  var hh = aDate.getHours();
  if (hh < 10) {hh = '0' + hh;}
  var mm = aDate.getMinutes();
  if (mm < 10) {mm = '0' + mm;}
  var ss = aDate.getSeconds();
  if (ss < 10) {ss = '0' + ss;}
  return yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
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
  return parseInt(theText.replace(/,/g,''), 10);
}

function getIntFromRegExp(theText, rxSearch) {
  var result;
  var matches = theText.replace(/,/g,'').match(rxSearch);
  if (matches) {
    result = parseInt(matches[1],10);
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
    .replace(/</g,'&lt')
    .replace(/>/g,'&gt')
    .replace(/\n/g,'<br>')
    .replace(/\[\/([a-z])\]/g,'<\/\$1>')
    .replace(/\[([a-z])\]/g,'<\$1>');
}

var months$1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'];

function parseDateAsTimestamp(textDate) {
  var dateAry = textDate.split(/[: \/]/);
  return Date.UTC(dateAry[4] * 1, months$1.indexOf(dateAry[3]),
    dateAry[2] * 1, dateAry[0] * 1, dateAry[1] * 1, 0);
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

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i+=1) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

function formatLastActivity(last_login) {
  var d, h, m, s;
  s = Math.abs(Math.floor(Date.now() / 1000 - last_login));
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return (d === 0 ? '' : d + ' days, ') +
    (h === 0 ? '' : h + ' hours, ') +
    (m === 0 ? '' : m + ' mins, ') +
    s + ' secs';
}

function path(obj, path, def){
  path = path.split('.');
  var len = path.length;
  for (var i = 0; i < len; i+=1) {
    if (!obj || typeof obj !== 'object') {return def;}
    obj = obj[path[i]];
  }
  if (obj === undefined) {return def;}
  return obj;
}

function stringSort(a,b) {
  var result=0;
  a = path(a, calf.sortBy, 'a');
  b = path(b, calf.sortBy, 'a');
  if (a.toLowerCase() < b.toLowerCase()) {result = -1;}
  if (a.toLowerCase() > b.toLowerCase()) {result = 1;}
  if (!calf.sortAsc) {result = -result;}
  return result;
}

function numberSort(a,b) {
  var result=0;
  if (typeof a.type !== undefined){
    if (a.type > 8) {return 1;} //non equipment items
    if (b.type > 8) {return -1;}
  }
  var valueA = path(a, calf.sortBy, 1);
  var valueB = path(b, calf.sortBy, 1);
  if (typeof valueA === 'string') {
    valueA = parseInt(valueA.replace(/,/g,'').replace(/#/g,''),10);
  }
  if (typeof valueB === 'string') {
    valueB = parseInt(valueB.replace(/,/g,'').replace(/#/g,''),10);
  }
  result = valueA-valueB;
  if (!calf.sortAsc) {result=-result;}
  return result;
}

function testQuant(aValue) { // Native
  var theValue = parseInt(aValue, 10);
  if (!isNaN(theValue) && theValue > 0 && theValue < 100) {
    return theValue;
  }
}

var dotList;
var dotCount;
var lastActivityRE =
  /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;
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

function buffAllHref(shortList) { // Bad Pattern
  shortList = shortList.join(',').replace(/\s/g, '');
  var j = 'java';
  return j + 'script:openWindow("index.php?cmd=quickbuff&t=' + shortList +
    '", "fsQuickBuff", 618, 1000, ",scrollbars")';
}

function quickBuffHref(playerId, buffList) { // Bad Pattern
  return 'href=\'javascript:window.openWindow("index.php?cmd=' +
    'quickbuff&tid=' + playerId + (buffList ? '&blist=' + buffList : '') +
    '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
}

function infoBox(documentText) { // Native
  var doc = createDocument(documentText);
  var infoMatch = doc.getElementById('info-msg').innerHTML;
  var result = '';
  if (infoMatch) {
    infoMatch = infoMatch.replace(/<br.*/,'');
    result = infoMatch;
  }
  return result;
}

function guildId() { // Native
  var guildId;
  var nodeList = document.body.getElementsByTagName('script');
  Array.prototype.forEach.call(nodeList, function getGuildId(el) {
    var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
    if (match) {guildId = parseInt(match[1], 10);}
  });
  setValue('guildId', guildId);
  return guildId;
}

function playerId() { // Native
  var thePlayerId = parseInt(document.getElementById('holdtext')
    .textContent.match(/fallensword.com\/\?ref=(\d+)/)[1], 10);
  setValue('playerID',thePlayerId);
  return thePlayerId;
}

function playerName() {
  return document.getElementById('statbar-character').textContent;
}

function makePageHeader(title, comment, spanId, button) { // Native
  return '<table width=100%><tbody><tr class="fshHeader">' +
    '<td width="90%"><b>&nbsp;' + title + '</b>' +
    (comment === '' ? '' : '&nbsp;(' + comment + ')') +
    '<td width="10%" class="fshBtnBox">' +
    (spanId ? '[<span class="fshLink" id="' +
    spanId + '">' + button + '</span>]' : '') +
    '</td></tr><tbody></table>';
}

function makePageTemplate(title, comment, spanId, button, divId) { // Native
  return makePageHeader(title, comment, spanId, button) +
    '<div class="fshSmall" id="' + divId + '"></div>';
}

function notebookContent() { // Native
  return document.getElementById('pCC'); // new interface logic
}

function onlineDot(obj) { // Native
  var img;
  var min = 0;
  if (obj.day) {min += parseInt(obj.day, 10) * 1440;}
  if (obj.hour) {min += parseInt(obj.hour, 10) * 60;}
  if (obj.min) {min += parseInt(obj.min, 10);}
  if (obj.last_login) {
    min = Math.floor(Date.now() / 60000) - Math.floor(obj.last_login / 60);
  }
  // last_login is 'false' over 30 days
  if ('last_login' in obj && !obj.last_login) {min = 99999;}
  if (min < 2) {img = greenDiamond;
  } else if (min < 5) {img = yellowDiamond;
  } else if (min < 30) {img = orangeDiamond;
  } else if (min < 10080) {img = offlineDot;
  } else if (min < 44640) {img = sevenDayDot;
  } else {img = redDot;}
  return img;
}

function changeOnlineDot(contactLink){ // Native
  var lastActivity = lastActivityRE
    .exec(contactLink.getAttribute('data-tipped'));
  contactLink.parentNode.previousSibling.innerHTML =
    onlineDot({
      min: lastActivity[3],
      hour: lastActivity[2],
      day: lastActivity[1]
    });
}

function batchDots() { // Native
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

function colouredDots() { // Native
  if (!getValue('enhanceOnlineDots')) {return;}
  dotList = document.querySelectorAll(
    '#pCC a[data-tipped*="Last Activity"]');
  dotCount = 0;
  add(3, batchDots);
}

var times = {};
var refAry = ['www.lazywebtools.co.uk', 'refreshthing.com'];

function isAuto() { // Native
  var docRef = document.referrer
    .match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  docRef = docRef ? docRef[1] : docRef;
  return refAry.indexOf(docRef) !== -1;
}

function start(category, variable, label) { // Native
  if (isAuto() || typeof ga === 'undefined') {return;}
  times[category + ':' + variable + ':' + label] =
    performance.now() * 1000;
}

function end(category, variable, label) { // Native
  if (isAuto() || typeof ga === 'undefined') {return;}
  var myTime = Math.round(performance.now() * 1000 -
    times[category + ':' + variable + ':' + label]) / 1000;
  if (myTime > 10) {
    ga('fshApp.send', 'timing', category, variable, Math.round(myTime),
      label);
  }


}

function fixupUrl() { // Native
  var origPath = window.location.pathname + window.location.search;
  var page = origPath.replace(/&m=.*/, '')
    .replace(/&subcmd=&.*/, '')
    .replace(/&subcmd2=&.*/, '')
    .replace(/&[a-z_]+_id=.+/, '')
    .replace(/&id=.+/, '')
    .replace(/&target_player=.+/, '')
    .replace(/&[a-z]+_username=.+/, '')
    .replace(/\?cmd=auctionhouse.+/, '\?cmd=auctionhouse')
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

function setup() { // Native
  if (isAuto() || typeof ga === 'undefined') {return;}

  ga('create', 'UA-76488113-1', 'auto', 'fshApp', {
    userId: playerId(),
    siteSpeedSampleRate: 10
  });
  ga('fshApp.set', 'appName', 'fshApp');
  ga('fshApp.set', 'appVersion', FSH.version);
  ga('create', 'UA-76488113-2', 'auto', 'fsh', {
    userId: playerId(),
    siteSpeedSampleRate: 10
  });
  fixupUrl();
  ga('fsh.send', 'pageview');
}

function screenview(funcName) { // Native
  if (isAuto() || typeof ga === 'undefined') {return;}
  ga('fshApp.send', 'screenview', {screenName: funcName});
}

var deferred = window.$ && $.when();

function getGuildMembers(guildId$$1) {
  return $.ajax({
    dataType: 'json',
    url:'index.php',
    data: {
      cmd: 'export',
      subcmd: 'guild_members',
      guild_id: guildId$$1
    }
  }).pipe(function membrListToHash(data) {
    var membrList = {};
    membrList[guildId$$1] = {};
    membrList[guildId$$1].lastUpdate = Date.now();
    data.forEach(function memberToObject(ele) {
      membrList[guildId$$1][ele.username] = ele;
    });
    return membrList;
  });
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

function setForage(forage, data) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  localforage.setItem(forage, data, function setItemCallback(err) {
    if (err) {
      log(forage + ' forage error', err);
    }
  });
}

function addMembrListToForage(membrList) {
  getForage('fsh_membrList')
    .done(function saveMembrListInForage(oldMemList) {
      oldMemList = oldMemList || {};
      setForage('fsh_membrList', $.extend(oldMemList, membrList));
    });
}

function guildMembers(force, guildId$$1) {
  if (force) {
    return getGuildMembers(guildId$$1).done(addMembrListToForage);
  }
  return getForage('fsh_membrList')
    .pipe(function getMembrListFromForage(membrList) {
      if (!membrList ||
          !membrList[guildId$$1] ||
          !membrList[guildId$$1].lastUpdate ||
          membrList[guildId$$1].lastUpdate < Date.now() - 300000) {
        return getGuildMembers(guildId$$1).done(addMembrListToForage);
      }
      return membrList;
    });
}

function getMembrList(force) {
  var guildId$$1 = guildId();
  return guildMembers(force, guildId$$1)
    .pipe(function setHelperMembrList(membrList) {
      calf.membrList = membrList[guildId$$1];
      return calf.membrList;
    });
}

function getAllMembrList(force, guildArray) {
  var prm = [];
  guildArray.forEach(function addGuildToArray(guildId$$1) {
    prm.push(guildMembers(force, guildId$$1));
  });
  return $.when.apply($, prm)
    .pipe(function mergeResults() {
      calf.membrList = $.extend.apply($, arguments);
      return calf.membrList;
    })
    .done(addMembrListToForage);
}

function getInventory() {
  var prm = $.ajax({
    dataType: 'json',
    url:'index.php?cmd=export&subcmd=' + (calf.subcmd === 'guildinvmgr' ?
      'guild_store&inc_tagged=1' : 'inventory')
  });
  return prm.pipe(function sendInventoryToForage(data) {
    data.lastUpdate = Date.now();
    setForage(calf.subcmd === 'guildinvmgr' ? 'fsh_guildInv' :
      'fsh_selfInv', data);
    return data;
  });
}

function inventory(force) {
  if (force) {
    return getInventory();
  }
  var prm = getForage(calf.subcmd === 'guildinvmgr' ?
    'fsh_guildInv' : 'fsh_selfInv');
  return prm.pipe(function checkCachedInventory(data) {
    if (!data || data.lastUpdate < Date.now() - 300000) {
      return getInventory();
    }
    return data;
  });
}

function getProfile(username) {
  return $.getJSON('index.php', {
    cmd:             'export',
    subcmd:          'profile',
    player_username: username
  }).pipe(function addLastUpdateDate(data) {
    data.lastUpdate = Date.now();
    return data;
  });
}

function getMyProfile() {
  return getProfile(playerName())
    .done(function sendMyProfileToForage(data) {
      setForage('fsh_selfProfile', data);
    });
}

function myStats(force) {
  if (force) {return getMyProfile();}
  // jQuery 1.7 uses pipe instead of then
  return getForage('fsh_selfProfile')
    .pipe(function getProfileFromForage(data) {
      if (!data || data.lastUpdate < Date.now() -
        calf.allyEnemyOnlineRefreshTime) {
        return getMyProfile();
      }
      return data;
    });
}

function dialog(data) {
  if (data.r === 0) {return;}
  $('#dialog_msg').html(data.m).dialog('open');
}

function equipItem(backpackInvId) {
  return $.ajax({
    url: 'index.php',
    data: {
      'cmd': 'profile',
      'subcmd': 'equipitem',
      'inventory_id': backpackInvId,
      'ajax': 1
    },
    dataType: 'json'
  }).done(dialog);
}

function htmlResult(data) {
  var info = infoBox(data);
  return info.search(/(successfully|gained)/) !== -1 ?
    {r: 0, m: ''} : {r: 1, m: info};
}

function useItem(backpackInvId) {
  return $.ajax({
    url: 'index.php',
    data: {
      'cmd': 'profile',
      'subcmd': 'useitem',
      'inventory_id': backpackInvId
    }
  }).pipe(htmlResult)
    .done(dialog);
}

function takeItem(invId, action) {
  return $.ajax({
    url: 'index.php',
    data: {
      'cmd': 'guild',
      'subcmd': 'inventory',
      'subcmd2': 'takeitem',
      'guildstore_id': invId,
      'ajax': 1
    },
    dataType: 'json'
  }).done(dialog).pipe(function takeItemStatus(data) {
    if (data.r === 0 && action !== 'take') {
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
    return data;
  });
}

function queueTakeItem(invId, action) {
  // You have to chain them because they could be modifying the backpack
  deferred = deferred.pipe(function pipeTakeToQueue() {
    return takeItem(invId, action);
  });
  return deferred;
}

function guildInvRecall(invId, playerId$$1, mode) {
  return $.ajax({
    url: 'index.php',
    data: {
      'cmd': 'guild',
      'subcmd': 'inventory',
      'subcmd2': 'recall',
      'id': invId,
      'player_id': playerId$$1,
      'mode': mode
    }
  }).pipe(htmlResult)
    .done(dialog);
}

function backpack() {
  return $.ajax({
    url: 'index.php',
    data: {'cmd': 'profile', 'subcmd': 'fetchinv'},
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

function guildMailboxTake(href) {
  return $.ajax({
    url: href
  }).pipe(function translateReturnInfo(data) {
    var info = infoBox(data);
    return info === 'Item was transferred to the guild store!' ?
      {r: 0, m: ''} : {r: 1, m: info};
  })
  .done(dialog);
}

function moveItem(invIdList, folderId) {
  return $.ajax({
    url: 'index.php',
    data: {
      'cmd': 'profile',
      'subcmd': 'sendtofolder',
      'inv_list': JSON.stringify(invIdList),
      'folder_id': folderId,
      'ajax': 1
    },
    dataType: 'json'
  }).done(dialog);
}

function dropItem(invIdList) {
  return $.ajax({
    url: 'index.php',
    data: {
      'cmd': 'profile',
      'subcmd': 'dodropitems',
      'removeIndex': invIdList,
      'ajax': 1
    },
    dataType: 'json'
  }).done(dialog);
}

function sendItem(invIdList) {
  return $.ajax({
    url: 'index.php',
    data: {
      'cmd': 'trade',
      'subcmd': 'senditems',
      'xc': window.ajaxXC,
      'target_username': getValue('itemRecipient'),
      'sendItemList': invIdList
    }
  }).pipe(htmlResult)
    .done(dialog);
}

function debuff(buffId) {
  return $.ajax({
    url: 'fetchdata.php',
    data: {
      'a': '22',
      'd': '0',
      'id': buffId
    },
    dataType: 'json'
  });
}

function doPickMove(moveId, slotId) {
  return $.ajax({
    url: 'index.php',
    data: {
      'cmd': 'arena',
      'subcmd': 'dopickmove',
      'move_id': moveId,
      'slot_id': slotId
    }
  });
}

var networkIcon$1 =
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
var saveBoxes$1 = [
  'navigateToLogAfterMsg',
  'gameHelpLink',
  'guildSelf',
  'guildFrnd',
  'guildPast',
  'guildEnmy',
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

var mySimpleCheckboxes$1 = {
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
};

var networkIcon$$1 = networkIcon$1;
var saveBoxes$$1 = saveBoxes$1;
var mySimpleCheckboxes$$1 = mySimpleCheckboxes$1;

function helpLink(title, text) { // Native
  return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="' +
    '<span class=\'fshHelpTitle\'>' + title + '</span><br><br>' +
    text + '">?</span>&nbsp;]';
}

function simpleCheckbox(name) { // Native
  var o = mySimpleCheckboxes$$1[name];
  return '<tr><td align="right">' +
    (o.network ? networkIcon$$1 : '') +
    '<label for="' + o.id + '">' + o.helpTitle +
    helpLink(o.helpTitle, o.helpText) +
    ':</label></td><td><input id="' + o.id +
    '" name="' + o.id + '" type="checkbox" value="on"' +
    (getValue(o.id) ? ' checked' : '') + '></td></tr>';
}

function toggleTickAllBuffs(e){ // jQuery
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

function injectSettingsGuildData(guildType) { // Native
  return '<input name="guild' + guildType + '" size="60" value="' +
    getValue('guild' + guildType) + '">' +
    '<span class="buffLink" ' +
    'id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' +
    guildType + 'Message"> &#x00bb;</span>' +
    '<div id="showGuild' + guildType + 'Message" ' +
    'class="fshHide">' +
    '<input name="guild' + guildType + 'Message" size="60" value="' +
    getValue('guild' + guildType + 'Message') + '">' +
    '</div>';
}

function clearStorage() { // Native
  if (confirm('Are you sure you want to clear you localStorage?')) {
    localStorage.clear();
  }
}

function saveValueForm(name) {
  /*jshint validthis: true */
  var formElement =
    findNode('//input[@name="' + name + '"]', this);
  if (formElement.getAttribute('type') === 'checkbox') {
    setValue(name, formElement.checked);
  } else if (formElement.getAttribute('type') === 'radio') {
    var radioElements = findNodes('//input[@name="' + name +
      '"]', 0, this);
    for (var i=0; i<radioElements.length; i += 1) {
      if (radioElements[i].checked) {
        setValue(name, radioElements[i].value);
      }
    }
  } else {
    setValue(name, formElement.value);
  }
}

function saveConfig(evt) { // Legacy
  var oForm = evt.target.form;

  //bio compressor validation logic
  var maxCompressedCharacters =
    findNode('//input[@name="maxCompressedCharacters"]', oForm);
  var maxCompressedCharactersValue = maxCompressedCharacters.value * 1;
  if (isNaN(maxCompressedCharactersValue) ||
      maxCompressedCharactersValue <= 50) {
    maxCompressedCharacters.value = 1500;
  }
  var maxCompressedLines =
    findNode('//input[@name="maxCompressedLines"]', oForm);
  var maxCompressedLinesValue = maxCompressedLines.value * 1;
  if (isNaN(maxCompressedLinesValue) || maxCompressedLinesValue <= 1) {
    maxCompressedLines.value = 25;
  }
  var newGuildLogHistoryPages =
    findNode('//input[@name="newGuildLogHistoryPages"]', oForm);
  var newGuildLogHistoryPagesValue = newGuildLogHistoryPages.value * 1;
  if (isNaN(newGuildLogHistoryPagesValue) ||
      newGuildLogHistoryPagesValue <= 1) {
    newGuildLogHistoryPages.value = 25;
  }
  var maxGroupSizeToJoin =
    findNode('//input[@name="maxGroupSizeToJoin"]', oForm);
  var maxGroupSizeToJoinValue = maxGroupSizeToJoin.value * 1;
  if (isNaN(maxGroupSizeToJoinValue) || maxGroupSizeToJoinValue <= 1) {
    maxGroupSizeToJoin.value = 11;
  }
  var combatEvaluatorBiasElement =
    findNode('//select[@name="combatEvaluatorBias"]', oForm);
  var combatEvaluatorBias = combatEvaluatorBiasElement.value * 1;
  setValue('combatEvaluatorBias', combatEvaluatorBias);
  var enabledHuntingModeElement =
    findNode('//select[@name="enabledHuntingMode"]', oForm);
  var enabledHuntingMode = enabledHuntingModeElement.value;
  setValue('enabledHuntingMode', enabledHuntingMode);

  saveBoxes$$1.forEach(saveValueForm, oForm);

  window.alert('FS Helper Settings Saved');
  window.location = 'index.php?cmd=settings';
  return false;
}

function showLogs() { // Native
  document.location = server +
    'index.php?cmd=notepad&blank=1&subcmd=showlogs';
}

function showMonsterLogs() { // Native
  document.location = server +
    'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function injectSettings() { // Legacy
  var tickAll = $('<span class="fshLink">Tick all buffs</span>');
  tickAll.click(toggleTickAllBuffs);
  $('#settingsTabs-4 td').eq(0).append('<br>').append(tickAll);

  var buffs = getValue('huntingBuffs');
  var buffsName = getValue('huntingBuffsName');
  var buffs2 = getValue('huntingBuffs2');
  var buffs2Name = getValue('huntingBuffs2Name');
  var buffs3 = getValue('huntingBuffs3');
  var buffs3Name = getValue('huntingBuffs3Name');
  var doNotKillList = getValue('doNotKillList');

  var enableActiveBountyList = calf.enableActiveBountyList;
  var bountyListRefreshTime = getValue('bountyListRefreshTime');
  var enableWantedList = calf.enableWantedList;
  var wantedNames = getValue('wantedNames');
  var combatEvaluatorBias = getValue('combatEvaluatorBias');
  var enabledHuntingMode = getValue('enabledHuntingMode');
  var storage = (JSON.stringify(localStorage).length /
    (5 * 1024 * 1024) * 100).toFixed(2);

  var configData =
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
      FSH.version + ') (Storage Used: ' + storage + '% Remaining: ' +
      (100 - storage).toFixed(2) + '%)</span></td></tr>' +
    '<tr><td colspan="2" align=center>' +
      '<span style="font-weight:bold;">Visit the ' +
      '<a href="https://github.com/fallenswordhelper/fallenswordhelper">' +
      'Fallen Sword Helper web site</a> ' +
      'for any suggestions, requests or bug reports</span></td></tr>' +
    //General Prefs
    '<tr><th colspan="2" align="left"><b>General preferences ' +
      '(apply to most screens)</b></th></tr>' +

    '<tr><td align="right">' +
      '<label for="enableGuildInfoWidgets">' +
      'Enable Guild Info Widgets' +
      helpLink('Enable Guild Info Widgets',
      'Enabling this option will enable the Guild Info Widgets ' +
      '(coloring on the Guild Info panel)') + ':</label></td><td>' +
      '<input id="enableGuildInfoWidgets" name="enableGuildInfoWidgets" ' +
      'type="checkbox" value="on"' +
      (calf.enableGuildInfoWidgets ? ' checked' : '') +
      '>&nbsp;' +
      '<label>Hide Message&gt;<input name="hideGuildInfoMessage" ' +
      'type="checkbox" value="on"' +
      (calf.hideGuildInfoMessage ? ' checked' : '') +
      '></label>&nbsp;' +
      '<label>Hide Buff&gt;<input name="hideGuildInfoBuff" ' +
      'type="checkbox" value="on"' +
      (calf.hideGuildInfoBuff ? ' checked' : '') +
      '></label>&nbsp;' +
      '<label>Hide ST&gt;<input name="hideGuildInfoSecureTrade" ' +
      'type="checkbox" value="on"' +
      (calf.hideGuildInfoSecureTrade ? ' checked' : '') +
      '></label>&nbsp;' +
      '<label>Hide Trade&gt;<input name="hideGuildInfoTrade" ' +
      'type="checkbox" value="on"' +
      (calf.hideGuildInfoTrade ? ' checked' : '') +
      '></label></td></tr>' +

    simpleCheckbox('moveGuildList') +
    simpleCheckbox('moveOnlineAlliesList') +

    '<tr><td align="right">' + networkIcon$$1 +
      'Show Online Allies/Enemies' +
      helpLink('Show Online Allies/Enemies',
      'This will show the allies/enemies online list on the right.') +
      ':</td><td><label>Allies&nbsp;<input name="enableAllyOnlineList" ' +
      'type="checkbox" value="on"' +
      (calf.enableAllyOnlineList ? ' checked' : '') +
      '></label>&nbsp;&nbsp;<label>Enemies&nbsp;' +
      '<input name="enableEnemyOnlineList" type="checkbox" value="on"' +
      (calf.enableEnemyOnlineList ? ' checked' : '') +
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

    '<tr><td align="right">Quick Links Screen Location' +
      helpLink('Quick Links Screen Location',
      'Determines where the quick links dialog shows on the screen. ' +
      'Default is top 22, left 0.') +
      ':</td><td>Top: <input name="quickLinksTopPx" size="3" value="'+
      getValue('quickLinksTopPx') +
      '"> Left: <input name="quickLinksLeftPx" size="3" value="' +
      getValue('quickLinksLeftPx') +
      '"></td></tr>' +
    simpleCheckbox('draggableQuickLinks') +
    simpleCheckbox('expandMenuOnKeyPress') +

    //Guild Manage
    '<tr><th colspan="2" align="left"><b>Guild>Manage preferences' +
      '</b></th></tr>' +
    '<tr><td colspan="2" align="left">Enter guild names, ' +
      'separated by commas</td></tr>' +
    '<tr><td>Own Guild</td><td>' +
      injectSettingsGuildData('Self') + '</td></tr>' +
    '<tr><td>Friendly Guilds</td><td>' +
      injectSettingsGuildData('Frnd') + '</td></tr>' +
    '<tr><td>Old Guilds</td><td>' +
      injectSettingsGuildData('Past') + '</td></tr>' +
    '<tr><td>Enemy Guilds</td><td>' +
      injectSettingsGuildData('Enmy') + '</td></tr>' +

    '<tr><td align="right">Highlight Valid PvP Targets' +
      helpLink('Highlight Valid PvP Targets',
      'Enabling this option will highlight targets in OTHER guilds that ' +
      'are within your level range to attack for PvP or GvG.') +
      ':</td><td>PvP: <input name="highlightPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      (getValue('highlightPlayersNearMyLvl') ? ' checked' : '') +
      '> GvG: <input name="highlightGvGPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      (getValue('highlightGvGPlayersNearMyLvl') ?
      ' checked' : '') + '></td></tr>' +

    simpleCheckbox('showAdmin') +
    simpleCheckbox('ajaxifyRankControls') +
    simpleCheckbox('detailedConflictInfo') +

    //World Screen
    '<tr><th colspan="2" align="left"><b>World screen/Hunting preferences' +
      '</b></th></tr>' +

    '<tr><td align="right">Hide Create Group Button' +
      helpLink('Hide Create Group Button',
      'Enabling this option will hide the Create Group button') +
      ':</td><td>' +
      '<input name="hideChampionsGroup" ' + 'type="checkbox" value="on"' +
        (getValue('hideChampionsGroup') ? ' checked' : '') + '>' +
      '&nbsp;Champions&nbsp;&nbsp;' +
      '<input name="hideElitesGroup" type="checkbox" ' + 'value="on"' +
        (getValue('hideElitesGroup') ? ' checked' : '') + '>' +
      '&nbsp;Elites&nbsp;&nbsp;' +
      '<input name="hideSEGroup" type="checkbox" ' + 'value="on"' +
        (getValue('hideSEGroup') ? ' checked' : '') + '>' +
      '&nbsp;Super Elite&nbsp;&nbsp;' +
      '<input name="hideTitanGroup" type="checkbox" value="on"' +
        (getValue('hideTitanGroup') ? ' checked' : '') + '>' +
      '&nbsp;Titan&nbsp;&nbsp;' +
      '<input name="hideLegendaryGroup" type="checkbox" ' + 'value="on"' +
        (getValue('hideLegendaryGroup') ? ' checked' : '') + '>' +
      '&nbsp;Legendary' +
      '</td></tr>' +

    '<tr><td align="right">Keep Combat Logs' +
      helpLink('Keep Combat Logs',
      'Save combat logs to a temporary variable. ' +
      'Press <u>Show logs</u> on the right to display and copy them') +
      ':</td><td><input name="keepLogs" type="checkbox" value="on"' +
      (getValue('keepLogs') ? ' checked' : '') + '>&nbsp;&nbsp;' +
      '<input type="button" class="custombutton" value="Show Logs" ' +
      'id="Helper:ShowLogs"></td></tr>' +

    simpleCheckbox('showCombatLog') +
    simpleCheckbox('enableCreatureColoring') +
    simpleCheckbox('showCreatureInfo') +

    '<tr><td align="right">Combat Evaluator Bias' +
      helpLink('Combat Evaluator Bias',
      'This changes the bias of the combat evaluator for the damage and ' +
      'HP evaluation. It will not change the attack bias (1.1053).' +
      '<br>Conservative = 1.1053 and 1.1 (Safest)' +
      '<br>Semi-Conservative = 1.1 and 1.053' +
      '<br>Adventurous = 1.053 and 1 (Bleeding Edge)' +
      '<br>Conservative+ = 1.1053 and 1 with the attack calculation ' +
      'changed to +-48 per RJEM') +
      ':</td><td><select name="combatEvaluatorBias">' +
      '<option value="0"' + (combatEvaluatorBias === 0 ? ' SELECTED' : '') +
      '>Conservative</option>' +
      '<option value="1"' + (combatEvaluatorBias === 1 ? ' SELECTED' : '') +
      '>Semi-Conservative</option>' +
      '<option value="2"' + (combatEvaluatorBias === 2 ? ' SELECTED' : '') +
      '>Adventurous</option>' +
      '<option value="3"' + (combatEvaluatorBias === 3 ? ' SELECTED' : '') +
      '>Conservative+</option></select></td></tr>' +

    '<tr><td align="right">' + networkIcon$$1 +'Keep Creature Log' +
      helpLink('Keep Creature Log',
      'This will show the creature log for each creature you see when ' +
      'you travel.') +
      ':</td><td><input name="showMonsterLog" type="checkbox" value="on"' +
      (getValue('showMonsterLog') ? ' checked' : '') + '>' +
      '&nbsp;&nbsp;<input type="button" class="custombutton" ' +
      'value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +

    '<tr><td align="right">Show Send Gold' +
      helpLink('Show Gold on World Screen',
      'This will show an icon below the world map to allow you to ' +
      'quickly send gold to a Friend.') +
      ':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' +
      (getValue('sendGoldonWorld') ? ' checked' : '') + '>' +
      '&nbsp;&nbsp;Send <input name="goldAmount" size="5" value="' +
      getValue('goldAmount') + '"> '+
      'gold to <input name="goldRecipient" size="10" value="' +
      getValue('goldRecipient') + '">' +
      ' Current total: <input name="currentGoldSentTotal" size="5" value="'+
      getValue('currentGoldSentTotal') + '">' +
      '</td></tr>' +

    '<tr><td align="right">Do Not Kill List' +
      helpLink('Do Not Kill List',
      'List of creatures that will not be killed by quick kill. ' +
      'You must type the full name of each creature, separated by commas. ' +
      'Creature name will show up in red color on world screen and will ' +
      'not be killed by keyboard entry (but can still be killed by ' +
      'mouseclick). Quick kill must be enabled for this function to work.') +
      ':</td><td colspan="3"><input name="doNotKillList" size="60" value="' +
      doNotKillList + '"></td></tr>' +

    '<tr><td align="right">Hunting Buffs' +
      helpLink('Hunting Buffs',
      'Customize which buffs are designated as hunting buffs. ' +
      'You must type the full name of each buff, ' +
      'separated by commas. Use the checkbox to enable/disable them.') +
      ':</td><td colspan="3"><input name="showHuntingBuffs" ' +
      'type="checkbox" value="on"' +
      (getValue('showHuntingBuffs') ? ' checked' : '') + '> ' +
      'Enabled Hunting Mode' +
      helpLink('Enabled Hunting Mode',
      'This will determine which list of buffs gets checked ' +
      'on the world screen.') +
      ':<select name="enabledHuntingMode">' +
      '<option value="1"' + (enabledHuntingMode === '1' ? ' SELECTED' : '') +
      '>' + buffsName + '</option>' +
      '<option value="2"' + (enabledHuntingMode === '2' ? ' SELECTED' : '') +
      '>' + buffs2Name + '</option>' +
      '<option value="3"' + (enabledHuntingMode === '3' ? ' SELECTED' : '') +
      '>' + buffs3Name + '</option>' +
      '</select></td></tr>' +
    '<tr><td align="right">' + buffsName + ' Hunting Buff List' +
      helpLink(buffsName + ' Hunting Buff List',
      buffsName + ' list of hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffsName" ' +
      'title="Hunting mode name" size="7" value="' + buffsName +
      '"><input name="huntingBuffs" size="49" value="' + buffs +
      '"></td></tr>' +
    '<tr><td align="right">' + buffs2Name + ' Hunting Buff List' +
      helpLink(buffs2Name + ' Hunting Buff List',
      'List of ' + buffs2Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs2Name" ' +
      'title="Hunting mode name" size="7" value="' + buffs2Name +
      '"><input name="huntingBuffs2" size="49" value="' + buffs2 +
      '"></td></tr>' +
    '<tr><td align="right">' + buffs3Name + ' Hunting Buff List' +
      helpLink(buffs3Name + ' Hunting Buff List',
      'List of ' + buffs3Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs3Name" ' +
      'title="Hunting mode name" size="7" value="'+ buffs3Name +
      '"><input name="huntingBuffs3" size="49" value="' + buffs3 +
      '"></td></tr>' +

    simpleCheckbox('huntingMode') +

    //Log screen prefs
    '<tr><th colspan="2" align="left"><b>Log screen preferences' +
      '</b></th></tr>' +

    simpleCheckbox('hideNonPlayerGuildLogMessages') +
    simpleCheckbox('useNewGuildLog') +

    '<tr><td align="right">New Guild Log History' +
      helpLink('New Guild Log History (pages)',
      'This is the number of pages that the new guild log ' +
      'screen will go back in history.') +
      ':</td><td><input name="newGuildLogHistoryPages" size="3" value="' +
      getValue('newGuildLogHistoryPages') + '"></td></td></tr>' +

    simpleCheckbox('enableLogColoring') +

    '<tr><td align="right">New Log Message Sound' +
      helpLink('New Log Message Sound',
      'The .wav or .ogg file to play when you have unread log messages. ' +
      'This must be a .wav or .ogg file. This option can be turned on/off ' +
      'on the world page. Only works in Firefox 3.5+') +
      ':</td><td colspan="3"><input name="defaultMessageSound" size="60" ' +
      'value="' + getValue('defaultMessageSound') +
      '"></td></tr>' +

    '<tr><td align="right">Play sound on unread log' +
      helpLink('Play sound on unread log',
      'Should the above sound play when you have unread log messages? ' +
      '(will work on Firefox 3.5+ only)') +
      ':</td><td><input name="playNewMessageSound" type="checkbox" ' +
      'value="on"' +
      (getValue('playNewMessageSound') ? ' checked' : '') + '>' +
      ' Show speaker on world' +
      helpLink('Show speaker on world',
      'Should the toggle play sound speaker show on the world map? ' +
      '(This icon is next to the Fallensword wiki icon and will only ' +
      'display on Firefox 3.5+)') +
      ':<input name="showSpeakerOnWorld" type="checkbox" value="on"' +
      (getValue('showSpeakerOnWorld') ? ' checked' : '') +
      '></tr></td>' +

    simpleCheckbox('enableChatParsing') +
    simpleCheckbox('keepBuffLog') +
    simpleCheckbox('addAttackLinkToLog') +
    simpleCheckbox('enhanceChatTextEntry') +

    //Equipment screen prefs
    '<tr><th colspan="2" align="left"><b>Equipment screen preferences' +
      '</b></th></tr>' +

    simpleCheckbox('showExtraLinks') +
    simpleCheckbox('disableItemColoring') +

    '<tr><td align="right">Show Quick Send Item' +
      helpLink('Show Quick Send on Manage Backpack',
      'This will show a link beside each item which gives the option to ' +
      'quick send the item to this person') +
      ':</td><td><input name="showQuickSendLinks" type="checkbox" ' +
      'value="on"' +
      (getValue('showQuickSendLinks') ? ' checked' : '') + '>'+
      '&nbsp;&nbsp;Send Items To ' +
      '<input name="itemRecipient" size="10" value="' +
      getValue('itemRecipient') + '">' +

    simpleCheckbox('showQuickDropLinks') +

    '<tr><td align="right">Quick Select all of type in Send Screen' +
      helpLink('Quick Select all of type in Send Screen',
      'This allows you to customize what quick links you would like ' +
      'displayed in your send item screen.<br>Use the format ' +
      '[&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,' +
      '&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR') +
      ':</td><td><input name="sendClasses" size="60" value="' +
      escapeHtml(getValue('sendClasses')) + '">'+

    //Quest Preferences
    '<tr><th colspan="2" align="left"><b>Quest preferences</b></th></tr>' +

    '<tr><td align="right">Hide Specific Quests' +
      helpLink('Hide Specific Quests',
      'If enabled, this hides quests whose name matches the list ' +
      '(separated by commas). This works on Quest Manager and Quest Book.') +
      ':</td><td colspan="3"><input name="hideQuests" type="checkbox" ' +
      'value="on"' +
      (getValue('hideQuests') ? ' checked' : '') + '>' +
      '&nbsp;<input name="hideQuestNames" size="60" value="' +
      getValue('hideQuestNames') + '"></td></tr>' +

    simpleCheckbox('storeLastQuestPage') +
    simpleCheckbox('showNextQuestSteps') +

    //profile prefs
    '<tr><th colspan="2" align="left"><b>Profile preferences</b></th></tr>' +

    simpleCheckbox('renderSelfBio') +
    simpleCheckbox('renderOtherBios') +

    '<tr><td align="right">Enable Bio Compressor' +
      helpLink('Enable Bio Compressor',
      'This will compress long bios according to settings and provide a ' +
      'link to expand the compressed section.') +
      ':</td><td><input name="enableBioCompressor" type="checkbox" ' +
      'value="on"' +
      (getValue('enableBioCompressor') ? ' checked' : '') +
      '> Max Characters:<input name="maxCompressedCharacters" size="4" ' +
      'value="' + getValue('maxCompressedCharacters') + '" />' +
      ' Max Lines:<input name="maxCompressedLines" size="3" value="' +
      getValue('maxCompressedLines') + '"></td></tr>' +

    '<tr><td align="right">Buy Buffs Greeting' +
      helpLink('Buy Buffs Greeting',
      'This is the default text to open a message with when asking to ' +
      'buy buffs. You can use {playername} to insert the target players ' +
      'name. You can also use {buffs} to insert the list of buffs. You ' +
      'can use {cost} to insert the total cost of the buffs.') +
      ':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" ' +
      'value="' + getValue('buyBuffsGreeting') + '"></td></tr>' +

    simpleCheckbox('showStatBonusTotal') +
    simpleCheckbox('enableQuickDrink') +
    simpleCheckbox('disableDeactivatePrompts') +

    //Bounty hunting prefs
    '<tr><th colspan="2" align="left"><b>Bounty hunting preferences' +
      '</b></th></tr>' +

    '<tr><td align= "right">' + networkIcon$$1 +
      'Show Active Bounties' +
      helpLink('Show Active Bounties',
      'This will show your active bounties on the right hand side') +
      ':</td><td colspan="3"><input name="enableActiveBountyList" ' +
      'type = "checkbox" value = "on"' +
      (enableActiveBountyList ? ' checked' : '') + '>&nbsp;' +
      '<input name="bountyListRefreshTime" size="3" value="' +
      bountyListRefreshTime + '"> seconds refresh</td></tr>' +

    '<tr><td align= "right">' + networkIcon$$1 +
      'Show Wanted Bounties' +
      helpLink('Show Wanted Bounties',
      'This will show when someone you want is on the bounty board, ' +
      'the list is displayed on the right hand side') +
      ':</td><td colspan="3"><input name="enableWantedList" ' +
      'type="checkbox" value="on"' +
      (enableWantedList ? ' checked' : '') +
      '> Refresh time is same as Active Bounties' +

    '<tr><td align= "right">Wanted Names' +
      helpLink('Wanted Names',
      'The names of the people you want to see on the bounty board ' +
      'separated by commas') + ':</td><td colspan="3">' +
      '<input name="wantedNames" size="60" value="' + wantedNames +
      '"></td></tr>' +

    simpleCheckbox('enableAttackHelper') +
    simpleCheckbox('showPvPSummaryInLog') +

    //Other prefs
    '<tr><th colspan="2" align="left"><b>Other preferences</b></th></tr>' +

    simpleCheckbox('autoFillMinBidPrice') +

    '<tr><td align="right">Hide Specific Recipes' +
      helpLink('Hide Specific Recipes',
      'If enabled, this hides recipes whose name matches the list ' +
      '(separated by commas). This works on Recipe Manager') +
      ':</td><td colspan="3"><input name="hideRecipes" ' +
      'type="checkbox" value="on"' +
      (getValue('hideRecipes') ? ' checked' : '') + '>' +
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
      (getValue('enableMaxGroupSizeToJoin') ? ' checked' : '') +
      '>&nbsp;&nbsp;Max Size: ' +
      '<input name="maxGroupSizeToJoin" size="3" value="' +
      getValue('maxGroupSizeToJoin') + '"></td></tr>' +

    simpleCheckbox('moveComposingButtons') +

    //save button
    //http://www.fallensword.com/index.php?cmd=notepad&blank=1&subcmd=savesettings
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

  var maxID = parseInt($('div[id*="settingsTabs-"]:last').attr('id')
    .split('-')[1], 10);
  $('div[id*="settingsTabs-"]:last').after('<div id="settingsTabs-' +
    (maxID + 1) + '">' + configData + '</div>');
  if($('#settingsTabs').tabs('length') > 0){
    //chrome, have to add it this way (due to loading order
    $('#settingsTabs').tabs('add','#settingsTabs-' + (maxID + 1),
      'FSH Settings');
  } else {
    //firefox loads it later, so just print to page
    $('a[href*="settingsTabs-"]:last').parent()
      .after('<li><a href="#settingsTabs-' + (maxID + 1) +
      '">FSH Settings</a></li>');
  }

  document.getElementById('fshClearStorage')
    .addEventListener('click', clearStorage, true);

  document.getElementById('Helper:SaveOptions')
    .addEventListener('click', saveConfig, true);
  document.getElementById('Helper:ShowLogs')
    .addEventListener('click', showLogs, true);
  document.getElementById('Helper:ShowMonsterLogs')
    .addEventListener('click', showMonsterLogs, true);

  document.getElementById('toggleShowGuildSelfMessage')
    .addEventListener('click', toggleVisibilty, true);
  document.getElementById('toggleShowGuildFrndMessage')
    .addEventListener('click', toggleVisibilty, true);
  document.getElementById('toggleShowGuildPastMessage')
    .addEventListener('click', toggleVisibilty, true);
  document.getElementById('toggleShowGuildEnmyMessage')
    .addEventListener('click', toggleVisibilty, true);

  var minGroupLevelTextField =
    findNode('//input[@name="min_group_level"]');
  if (minGroupLevelTextField) {
    var minGroupLevel = minGroupLevelTextField.value;
    setValue('minGroupLevel',minGroupLevel);
  }
}

function injectSaveSettings(){ // Hybrid
  var content = notebookContent();
  var fshSettings = {};
  var list = GM_listValues();
  for(var i = 0; i < list.length; i += 1) {
    fshSettings[list[i]] = getValue(list[i]);
  }
  content.innerHTML = '<h1>FSH Settings</h1><br><center>The box below ' +
    'is your current settings. Copy it to save your current settings<br>' +
    'To load saved settings, simply replace the contents of the box with ' +
    'your saved copy and press the button below.'+
    '<textarea align="center" cols="80" rows="25" style="' +
    'background-color:white;' +
    'font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" ' +
    'id="HelperfshSettings" name="fshSettings">' +
    JSON.stringify(fshSettings) + '</textarea>' +
    '<br><input id="HelperLoadSettings" class="custombutton" ' +
    'type="submit" value="Load Settings!" /></center>';
  $('#HelperLoadSettings').click(function(){
    var settings = JSON.parse($('#HelperfshSettings').val());
    Object.keys(settings).forEach(function(id) {
      setValue(id,settings[id]);
    });
    // for(var id in settings){
      // if (!settings.hasOwnProperty(id)) { continue; }
      // system.setValue(id,settings[id]);
    // }
    alert('Settings loaded successfully!');
  });
}

var composeMsg =
  '<li class="notification"><a href="index.php?cmd=composing"><span' +
  ' class="notification-icon"></span><p class="notification-content">' +
  'Composing to do</p></a></li>';

function displayComposeMsg() { // Native
  document.getElementById('notifications')
    .insertAdjacentHTML('afterbegin', composeMsg);
}

function parseComposing(data) { // Native
  var doc;
  if (calf.cmd !== 'composing') {
    doc = createDocument(data);
  } else {
    doc = document;
  }
  var timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;
  var times = [];
  var openSlots = doc.getElementsByClassName('composing-potion-time');
  Array.prototype.forEach.call(openSlots, function(el) {
    if (el.textContent === 'ETA: Ready to Collect!' ||
        el.textContent === 'ETA: n/a') {
      times.push(0);
    } else {
      var timeArr = timeRE.exec(el.textContent);
      var milli = (timeArr[1] * 3600 + timeArr[2] * 60 + timeArr[3] * 1) *
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

function createPotion(temp) { // jQuery
  $.ajax({
    cache: false,
    dataType: 'json',
    url:'index.php',
    data: {
      cmd: 'composing',
      subcmd: 'createajax',
      template_id: temp.value,
      _rnd: Math.floor(Math.random() * 8999999998) + 1000000000
    }
  }).done(function potionDone(data, textStatus) {
    if (data.error !== '') {
      temp.parentNode.innerHTML = '<div style="height: 26px;">' +
        data.error + '</div>';
    } else {
      temp.parentNode.innerHTML = '<div style="height: 26px;">' +
        textStatus + '</div>';
    }
  });
}

function quickCreate(evt) { // Native
  var target = evt.target;
  if (target.tagName !== 'SPAN' ||
      target.className !== 'quickCreate') {return;}
  var temp = target.previousElementSibling.previousElementSibling;
  if (temp && temp.value !== 'none') {
    createPotion(temp);
  }
}

function injectComposeAlert() { // jQuery
  if (calf.cmd === 'composing') {return;}
  var needToCompose = getValue('needToCompose');
  if (needToCompose) {
    displayComposeMsg();
    return;
  }
  var lastComposeCheck = getValue('lastComposeCheck');
  if (lastComposeCheck && Date.now() < lastComposeCheck) {return;}
  $.get('index.php?cmd=composing', function(data) {
    add(3, parseComposing, [data]);
  });
}

function injectComposing() { // Native
  var pCC = document.getElementById('pCC');
  if (!pCC) {return;}
  if (calf.enableComposingAlert) {
    parseComposing();}

  var buttons = pCC.querySelectorAll('input[id^=create-]:not(#create-multi)');
  Array.prototype.forEach.call(buttons, function(el) {
    el.insertAdjacentHTML('afterend',
      '&nbsp;[<span class="quickCreate">Quick Create</span>]');
  });
  pCC.addEventListener('click', quickCreate);

  if (getValue('moveComposingButtons')) {
    var buttonDiv = document.getElementById('composing-error-dialog')
      .previousElementSibling;
    buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
    var top = pCC.getElementsByClassName('composing-level')[0].parentNode;
    top.insertAdjacentElement('beforebegin', buttonDiv);
  }
}

function composingCreate() { // Native
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

var disableBreakdownPrompts;
var selectedList = [];

function showComposingMessage(message, bgcolor) { // jQuery
  $('#composingMessageContainer').remove();

  $('#composingMessage')
    .append(
      $('<div/>', {
        'id': 'composingMessageContainer',
        'width': '100%'
      })
      .append(
        $('<div/>', {
          'id': 'composingMessageText'
        })
        .css({
          'width': '90%',
          'text-align': 'center',
          'background-color': bgcolor,
          'color': 'rgb(255, 255, 255)',
          'margin': '5px auto 5px auto',
          'padding': '2px'
        })
        .html(message)
      )
    );

  setTimeout(function() {
    $('#composingMessageContainer').animate({'opacity': 0}, 500, function() {
      $(this).animate({'height': 0}, 500, function() {$(this).hide();});
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
      if (response.error === 0) {
        window.location = 'index.php?cmd=composing&subcmd=breakdown&m=1';
        return;
      } else {
        showComposingMessage('Error: ' + response.msg, 'rgb(164, 28, 28)');
      }
    });
}

function breakEvt(evt) { // Native
  if (!disableBreakdownPrompts ||
      evt.target.id !== 'breakdown-selected-items') {return;}
  evt.stopPropagation();
  if (selectedList.length === 0) {
    showComposingMessage('Error: No items selected.', 'rgb(164, 28, 28)');
    return;
  }
  breakItems();
}

function itemClick(evt) { // Native
  if (!evt.target.classList.contains('selectable-item')) {return;}
  var myItem = evt.target.id.replace('composing-item-', '');
  var itemPos = selectedList.indexOf(myItem);
  if (itemPos === -1) {
    selectedList.push(myItem);
  } else {
    selectedList.splice(itemPos, 1);
  }
}

function togglePref() { // Native
  disableBreakdownPrompts = !disableBreakdownPrompts;
  setValue('disableBreakdownPrompts', disableBreakdownPrompts);
}

function composingBreakdown() { // Native
  disableBreakdownPrompts = getValue('disableBreakdownPrompts');
  document.getElementById('breakdown-selected-items').parentNode
    .addEventListener('click', breakEvt, true);
  document.getElementById('composing-items')
    .addEventListener('click', itemClick);
  document.getElementById('pCC').insertAdjacentHTML('beforeend',
    '<table class="fshTblCenter"><tbody>' +
    simpleCheckbox('disableBreakdownPrompts') +
    '</tbody></table>');
  document.getElementById('disableBreakdownPrompts')
    .addEventListener('click', togglePref);
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

function havePrayed() { // Native
  document.getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
  setValue('needToPray',false);
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

function displayDisconnectedFromGodsMessage() { // Native
  document.getElementById('notifications').insertAdjacentHTML('afterbegin',
    godsNotification);
  document.getElementById('helperPrayToGods').addEventListener('click',
    prayToGods);
}

function displayUpgradeMsg() { // Native
  document.getElementById('notifications').insertAdjacentHTML('afterbegin',
    goldUpgradeMsg);
}

function findNewGroup(el) { // Native
  if (el.textContent.indexOf('New attack group created.') === -1) {return;}
  var groupJoinHTML = '';
  if (!getValue('enableMaxGroupSizeToJoin')) {
    groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
      'subcmd2=joinall"><span class="notification-icon"></span>'+
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

function parseTemplePage(responseText) { // Native
  var checkNeedToPray, doc;
  if (!calf.enableTempleAlert) {return;}
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

function injectTempleAlert() { // jQuery
  //Checks to see if the temple is open for business.
  if (calf.cmd === 'temple') {return;}
  var templeAlertLastUpdate = getValue('lastTempleCheck');
  var needToPray = getValue('needToPray');
  var needToParse = false;
  if (templeAlertLastUpdate) {
    if (Date.now() > templeAlertLastUpdate) { // midnight
      needToParse = true;
    } else if (needToPray) {
      displayDisconnectedFromGodsMessage();
    }
  } else {
    needToParse = true;
  }
  if (needToParse) {
    $.get('index.php?cmd=temple', function(responseText) {
      add(3, parseTemplePage, [responseText]);
    });
  }
}

function parseGoldUpgrades(data) { // Native
  if (!calf.enableUpgradeAlert) {return;}
  var doc;
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    doc = createDocument(data);
  } else {
    doc = document;
    doc.querySelectorAll('#pCC input[name="quantity"]')[1].value = '10';
  }
  var limit = doc.getElementById('pCC').getElementsByTagName('TABLE')[0]
    .rows[3].cells[2];
  var checkDoneUpgrade = limit.textContent.split(' / ');
  if (checkDoneUpgrade[0] !== checkDoneUpgrade[1]) {
    if (location.search.indexOf('cmd=points&type=1') === -1) {
      displayUpgradeMsg();
    }
    setValue('needToDoUpgrade', true);
  } else {
    setValue('needToDoUpgrade', false);
    setValue('lastUpgradeCheck',
      Date.parse(limit.nextElementSibling.textContent + ' GMT'));
  }
}

function injectUpgradeAlert() { // jQuery
  if (location.search.indexOf('cmd=points&type=1') !== -1) {return;}
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

function injectJoinAllLink() { // Native
  var nodeList = document.getElementById('pCL').getElementsByTagName('li');
  Array.prototype.forEach.call(nodeList, findNewGroup);
}

var drag_target;

function addStats(i, e) { // jQuery
  var statTable = $(e).closest('tr')
    .nextUntil('tr:contains("Enhance")');
  var attackStatElement = $('td:contains("Attack:")', statTable);
  var defenseStatElement = $('td:contains("Defense:")', statTable);
  var armorStatElement = $('td:contains("Armor:")', statTable);
  var damageStatElement = $('td:contains("Damage:")', statTable);
  var hpStatElement = $('td:contains("HP:")', statTable);
  var totalStats = (attackStatElement.length > 0 ? attackStatElement
    .next().text().replace(/\+/g,'') * 1 : 0) +
    (defenseStatElement.length > 0 ? defenseStatElement.next()
    .text().replace(/\+/g,'') * 1 : 0) +
    (armorStatElement.length > 0 ? armorStatElement.next().text()
    .replace(/\+/g,'') * 1 : 0) +
    (damageStatElement.length > 0 ? damageStatElement.next().text()
    .replace(/\+/g,'') * 1 : 0) +
    (hpStatElement.length > 0 ? hpStatElement.next().text()
    .replace(/\+/g,'') * 1 : 0);
  statTable.last().before('<tr style="color:DodgerBlue;"><td>' +
    'Stat Total:</td><td align="right">' + totalStats +
    '&nbsp;</td></tr>'
  );
}

function fshAjaxSuccess(evt, xhr, ajax, data) { // jQuery
  if (ajax.url.indexOf('fetchitem') !== 0) {return;}
  var img = $('[data-tipped="' + ajax.url + '"]');
  if (img.length === 0) {return;}
  var repl = $(data);
  var bonus = $('font:contains("Bonuses")', repl);
  if (bonus.length === 0) {return;}
  bonus.each(addStats);
  img.qtip('option', 'content.text', $('<div/>').append(repl).html());
}

function addStatTotalToMouseover() { // jQuery
  if (!getValue('showStatBonusTotal')) {return;}
  $(document).ajaxSuccess(fshAjaxSuccess);
}

function drag_over(event) { // Native
  event.preventDefault();
  return false;
}

function drag_drop(event) { // Native
  var offset = event.dataTransfer.getData('text/plain').split(',');
  drag_target.style.left =
    event.clientX + parseInt(offset[0],10) + 'px';
  drag_target.style.top =
    event.clientY + parseInt(offset[1],10) + 'px';
  document.body.removeEventListener('dragover', drag_over, false);
  document.body.removeEventListener('drop', drag_drop, false);
  event.preventDefault();
  return false;
}

function drag_start(event) { // Native
  drag_target = event.target;
  var style = window.getComputedStyle(event.target, null);
  event.dataTransfer.setData('text/plain',
    parseInt(style.getPropertyValue('left'),10) - event.clientX + ',' +
    (parseInt(style.getPropertyValue('top'),10) - event.clientY));
  document.body.addEventListener('dragover', drag_over, false);
  document.body.addEventListener('drop', drag_drop, false);
}

function getStat(stat, doc) { // jQuery
  // 'Hidden' returns NaN
  return intValue($(stat, doc)
    .contents()
    .filter(function(){
      return this.nodeType === 3;
    })[0].nodeValue);
}

function getBuffLevel(doc, buff) { // jQuery
  var hasBuff = $('img.tip-static[data-tipped*="b>' + buff + '</b"]',
    doc);
  hasBuff = hasBuff.data('tipped');
  var re = new RegExp('</b> \\(Level: (\\d+)\\)');
  var test = re.exec(hasBuff);
  return test === null ? 0 : intValue(test[1]);
}

function getBonus(stat, doc) { // jQuery
  var target = $(stat, doc);
  var children = target.children();
  if (children.length === 0) {
    children = target.next();
  }
  return intValue(children.text().slice(2, -1));
}

function playerDataString(responseText) { // Native
  var doc = createDocument(responseText);
  var obj = {
    levelValue: getStat('#stat-vl', doc),
    attackValue: getStat('#stat-attack', doc),
    defenseValue: getStat('#stat-defense', doc),
    armorValue: getStat('#stat-armor', doc),
    damageValue: getStat('#stat-damage', doc),
    hpValue: getStat('#stat-hp', doc),
    killStreakValue: getStat('#stat-kill-streak', doc),
    //get buffs here later ... DD, CA, DC, Constitution, etc
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

  if (obj.cloakLevel === 0 || typeof obj.attackValue === 'number' &&
    !isNaN(obj.attackValue)) {return obj;}

  obj.attackBonus = getBonus('#stat-attack', doc);
  obj.defenseBonus = getBonus('#stat-defense', doc);
  obj.armorBonus = getBonus('#stat-armor', doc);
  obj.damageBonus = getBonus('#stat-damage', doc);
  obj.hpBonus = getBonus('#stat-hp', doc);

  obj.attackValue = obj.attackBonus > obj.levelValue * 10 ||
    obj.attackBonus < obj.levelValue ?
    obj.attackBonus : obj.levelValue * 10;
  obj.defenseValue = obj.defenseBonus > obj.levelValue * 10 ||
    obj.defenseBonus < obj.levelValue ?
    obj.defenseBonus : obj.levelValue * 10;
  obj.armorValue = obj.armorBonus > obj.levelValue * 10 ||
    obj.armorBonus < obj.levelValue ?
    obj.armorBonus : obj.levelValue * 10;
  obj.damageValue = obj.damageBonus > obj.levelValue * 10 ||
    obj.damageBonus < obj.levelValue ?
    obj.damageBonus : obj.levelValue * 10;
  obj.hpValue = obj.hpBonus;
  return obj;
}

function playerDataObject(responseText) { // Native
  var obj = {
    levelValue: responseText.level,
    attackValue: responseText.attack,
    defenseValue: responseText.defense,
    armorValue: responseText.armor,
    damageValue: responseText.damage,
    hpValue: responseText.hp,
    killStreakValue: intValue(responseText.killstreak)
  };
  return obj;
}

function playerData(responseText) { // Native
  var obj = {};
  if (typeof responseText === 'string') {
    obj = playerDataString(responseText);
  }
  if (typeof responseText === 'object') {
    obj = playerDataObject(responseText);
  }
  return obj;
}

function updateHCSQuickBuffLinks(selector) { // Native
  Array.prototype.forEach.call(document.querySelectorAll(selector),
    function(el) {
      el.setAttribute('href', el.getAttribute('href')
        .replace(/, 500/g, ', 1000'));
    }
  );
}

/* eslint-disable no-multi-spaces */
var buffList = [
  {name: 'Rage',                stamina: 10, 'duration': 90,   minCastLevel: 1,    treeId: 0, skillId: 0,   buff: '+0.2% base attack per point.', nicks: 'rage'},
  {name: 'Stun',                stamina: 15, 'duration': 90,   minCastLevel: 1,    treeId: 0, skillId: 1,   buff: '+0.1% chance per point to half opponents chance to hit.', nicks: 'stun,st'},
  {name: 'Fury',                stamina: 10, 'duration': 90,   minCastLevel: 25,   treeId: 0, skillId: 2,   buff: '+0.1% base Attack and +0.1% base Damage per point.', nicks: 'fury'},
  {name: 'Blood Thirst',        stamina: 10, 'duration': 45,   minCastLevel: 25,   treeId: 0, skillId: 4,   buff: '+0.2% chance per point to drain 5% of your opponents current HP per combat turn from your opponent.', nicks: 'blood thirst,bloodthirst,bt'},
  {name: 'Enchant Weapon',      stamina: 10, 'duration': 90,   minCastLevel: 25,   treeId: 0, skillId: 5,   buff: '+0.1% per point stat bonus increase to your equipped weapon. (Excludes \\\'Gain\\\' bonuses).', nicks: 'enchant weapon,ew'},
  {name: 'Berserk',             stamina: 15, 'duration': 90,   minCastLevel: 75,   treeId: 0, skillId: 3,   buff: '+0.2% base Damage per point.', nicks: 'berserk'},
  {name: 'Holy Flame',          stamina: 15, 'duration': 90,   minCastLevel: 75,   treeId: 0, skillId: 6,   buff: '+0.2% extra damage vs. undead per point.', nicks: 'holy flame,hf'},
  {name: 'Dark Curse',          stamina: 20, 'duration': 60,   minCastLevel: 150,  treeId: 0, skillId: 7,   buff: '+0.2% reduction of opponents defence per point.', nicks: 'dark curse,dc'},
  {name: 'Shockwave',           stamina: 20, 'duration': 90,   minCastLevel: 200,  treeId: 0, skillId: 29,  buff: '+0.1% per point chance per point that your opponent will forfeit their next combat turn.', nicks: 'shockwave,sw,shock'},
  {name: 'Ignite',              stamina: 10, 'duration': 60,   minCastLevel: 200,  treeId: 0, skillId: 30,  buff: '+0.1% per point chance per point that your opponent will be set on fire. Each successful hit thereafter will inflict between 5% and 10% extra damage.', nicks: 'ignite,ign'},
  {name: 'Super Elite Slayer',  stamina: 25, 'duration': 15,   minCastLevel: 250,  treeId: 0, skillId: 31,  buff: '+0.2% per point reduction of damage, attack, defence and armor to super elite creatures.', nicks: 'super elite slayer,ses,se slayer'},
  {name: 'Wither',              stamina: 15, 'duration': 60,   minCastLevel: 250,  treeId: 0, skillId: 32,  buff: '+0.2% per point chance of a 50% reduction of your opponents HP at the start of combat.', nicks: 'wither,with'},
  {name: 'Shatter Armor',       stamina: 20, 'duration': 60,   minCastLevel: 300,  treeId: 0, skillId: 33,  buff: '+0.05% per point chance to reduce opponents armor by 75%.', nicks: 'shatter armor,sa'},
  {name: 'Death Wish',          stamina: 20, 'duration': 45,   minCastLevel: 300,  treeId: 0, skillId: 34,  buff: '+0.03% per point chance to instantly kill vs. creatures. (Excludes Super Elites)', nicks: 'deathwish,dw,deathw,death wish'},
  {name: 'Spell Breaker',       stamina: 35, 'duration': 45,   minCastLevel: 300,  treeId: 0, skillId: 35,  buff: '+0.1% per point chance to remove a random buff from PvP target upon a successful attack.', nicks:'spell breaker,sb'},
  {name: 'Spectral Knight',     stamina: 15, 'duration': 45,   minCastLevel: 400,  treeId: 0, skillId: 48,  buff: '+0.1% per point chance to reduce targets armor by 100%. (vs Creature only)', nicks: 'spectral knight,sk,spec knight'},
  {name: 'Keen Edge',           stamina: 10, 'duration': 60,   minCastLevel: 400,  treeId: 0, skillId: 47,  buff: '+0.1% per point to your attack for each complete set equipped.', nicks: 'keen edge,ke'},
  {name: 'Arterial Strike',     stamina: 20, 'duration': 60,   minCastLevel: 500,  treeId: 0, skillId: 49,  buff: 'Gain additional 0.1% xp per point for every additional round of combat. (Note that this does not activate if conserve activated)', nicks: 'arterial strike,as,art strike,art str'},
  {name: 'Death Dealer',        stamina: 20, 'duration': 60,   minCastLevel: 500,  treeId: 0, skillId: 50,  buff: 'For every 5 kills in a row, without dying, you gain +0.01% extra damage per point (Max 20% and vs. creatures only).', nicks: 'death dealer,dd'},
  {name: 'Savagery',            stamina: 15, 'duration': 45,   minCastLevel: 600,  treeId: 0, skillId: 51,  buff: '0.05% chance per point that your defense stat is added to your attack and your armor stat is added to your damage.', nicks: 'savagery,savage'},
  {name: 'Chi Strike',          stamina: 20, 'duration': 90,   minCastLevel: 700,  treeId: 0, skillId: 52,  buff: '0.1% per point of your Health total is added to your damage', nicks:'chi strike,chi,chis,chi str'},
  {name: 'Shield Strike',       stamina: 20, 'duration': 45,   minCastLevel: 700,  treeId: 0, skillId: 53,  buff: '0.1% per point chance that your defense stat is reduced to zero and your damage is doubled.', nicks: 'shield strike,ss,sh str'},
  {name: 'Demoralize',          stamina: 25, 'duration': 30,   minCastLevel: 800,  treeId: 0, skillId: 73,  buff: '+0.25% per point chance to half the opponents enchancement levels for the battle. Note this skill only takes effect if you initiated the combat.', nicks: 'demoralize,dem'},
  {name: 'Poison',              stamina: 25, 'duration': 60,   minCastLevel: 800,  treeId: 0, skillId: 70,  buff: '+0.1% per point chance that your opponent will be poisoned. Each successful hit thereafter will inflict between 10% and 20% extra damage.', nicks: 'poison,poi'},
  {name: 'Iron Fist',           stamina: 25, 'duration': 60,   minCastLevel: 900,  treeId: 0, skillId: 74,  buff: '+0.1% per point stat bonus increase to your equipped gloves. (Excludes \\\'Gain\\\' bonuses).', nicks: 'iron fist,if'},
  {name: 'Spell Leech',         stamina: 50, 'duration': 60,   minCastLevel: 900,  treeId: 0, skillId: 79,  buff: '+0.1% per point chance when you defeat an opponent in PvP that you initiated, you will steal a random buff. Note the remaining duration of the buff is reduced by 50% and will not take effect until the next combat. Note also if you already have the buff active, it will replace the existing buff you have active.', nicks: 'spell leech,sl'},
  {name: 'Distraction',         stamina: 25, 'duration': 60,   minCastLevel: 900,  treeId: 0, skillId: 78,  buff: '+0.2% per point chance to obtain no gold from a successful combat. +0.05% per point chance to inflict double damage in each round of combat. Note this skill has no effect in PvP.', nicks: 'distraction,dis'},
  {name: 'Coordinated Attack',  stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 0, skillId: 118, buff: '+0.05% per point added to Attack and Damage if every piece of equipped gear is part of a set.', nicks: 'coordinated attack,coorda'},
  {name: 'Undermine',           stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 0, skillId: 108, buff: 'Increases the maximum percentage (above 100%) of the Breaker enhancement by +0.2% per point.', nicks: 'undermine,um'},
  {name: 'Cursed Rune',         stamina: 30, 'duration': 120,  minCastLevel: 1000, treeId: 0, skillId: 89,  buff: '0.2% per point stat bonus to your equipped rune. Excludes \\\'Gain\\\' bonuses. Double chance of durability loss. Prevents Unbreakable from working while active.', nicks: 'cursed rune,crune'},
  {name: 'Anti Deflect',        stamina: 30, 'duration': 60,   minCastLevel: 1000, treeId: 0, skillId: 105, buff: '+0.2% per point chance to prevent your opponent activating Deflect.', nicks: 'anti deflect,ad'},
  {name: 'Overkill',            stamina: 30, 'duration': 60,   minCastLevel: 1200, treeId: 0, skillId: 109, buff: 'When you inflict 2 times or more of the starting hit points in the first round of combat, you have a 0.25% per point chance to gain 0.025% per point extra XP. (PvE Only)', nicks: 'overkill,ok'},
  {name: 'Smashing Hammer',     stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 0, skillId: 111, buff: '+0.05% per point added to your damage for each complete set equipped.', nicks: 'smashing hammer,sh'},
  {name: 'Mighty Vigor',        stamina: 35, 'duration': 60,   minCastLevel: 1200, treeId: 0, skillId: 113, buff: 'For every 50 points of the skill, can equip items 1 level higher than your level.', nicks: 'mighty vigor,mv'},
  {name: 'Fist Fight',          stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 0, skillId: 115, buff: '+0.1% per point chance that both players will lose the benefit of ALL skills at the start of combat. This skill takes effect before Sealed. (PvP Only)', nicks: 'fist fight,ff'},
  {name: 'Cursed Ring',         stamina: 30, 'duration': 120,  minCastLevel: 1400, treeId: 0, skillId: 88,  buff: '0.2% per point stat bonus to your equipped ring. Excludes \\\'Gain\\\' bonuses. Double chance of durability loss. Prevents Unbreakable from working while active.', nicks: 'cursed ring,cring'},
  {name: 'Sharpen',             stamina: 30, 'duration': 60,   minCastLevel: 1400, treeId: 0, skillId: 106, buff: 'Increases the maximum percentage (above 100%) of the Piercing Strike enhancement by +0.1% per point.', nicks: 'sharpen,sharp'},
  {name: 'Balanced Attack',     stamina: 30, 'duration': 90,   minCastLevel: 1400, treeId: 0, skillId: 116, buff: '+0.05% per point added to Attack and Damage if every piece of equipped gear is the same level.', nicks: 'balanced attack,ba'},
  {name: 'Heavy Weight',        stamina: 20, 'duration': 120,  minCastLevel: 1600, treeId: 0, skillId: 146, buff: 'Increases damage in combat by +0.025% per point providing you have at least 2,500 gold multiplied by your level in hand.', nicks: 'heavy weight, hw'},
  {name: 'Armored Strike',      stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 0, skillId: 130, buff: '+0.05% per point chance that your Armor stat is reduced to zero and your Damage is doubled. (PvE Only)', nicks: 'armored strike, armstr'},
  {name: 'Invert',              stamina: 40, 'duration': 180,  minCastLevel: 2000, treeId: 0, skillId: 173, buff: '+0.2% per skill level chance that enemies armor and defense stats are switched in a PvP attack.', nicks: 'invert'},
  {name: 'Reign of Terror',     stamina: 40, 'duration': 60,   minCastLevel: 2500, treeId: 0, skillId: 174, buff: '+0.1% per skill level reduction to relic defenders armor/defense. (Only counts for capturing groups leader)', nicks: 'reign of terror'},
  {name: 'Critical Strike',     stamina: 40, 'duration': 90,   minCastLevel: 3000, treeId: 0, skillId: 175, buff: 'Increases the maximum percentage (above 100%) of the Critical Hit enhancement by +0.25% per point.', nicks: 'critical strike'},
  {name: 'Great Vigor',         stamina: 10, 'duration': 90,   minCastLevel: 1,    treeId: 1, skillId: 12,  buff: '+0.2% base HP per point.', nicks: 'great vigor,vigor,gv'},
  {name: 'Fortify',             stamina: 10, 'duration': 120,  minCastLevel: 25,   treeId: 1, skillId: 8,   buff: '+0.1% base Armor per point.', nicks: 'fortify'},
  {name: 'Evade',               stamina: 10, 'duration': 90,   minCastLevel: 25,   treeId: 1, skillId: 10,  buff: '+0.1% base Defence per point.', nicks: 'evade'},
  {name: 'Absorb',              stamina: 20, 'duration': 120,  minCastLevel: 25,   treeId: 1, skillId: 13,  buff: '+0.1% chance per point that you will absorb 25% of the damage inflicted on you.', nicks: 'absorb,abs'},
  {name: 'Rock Skin',           stamina: 15, 'duration': 90,   minCastLevel: 75,   treeId: 1, skillId: 11,  buff: '+0.1% base Defence and +0.1 base Armor per point.', nicks: 'rock skin,rs'},
  {name: 'Enchanted Armor',     stamina: 10, 'duration': 90,   minCastLevel: 75,   treeId: 1, skillId: 9,   buff: '+0.1% per point stat bonus increase to your equipped armor. (Excludes \\\'Gain\\\' bonuses).', nicks: 'enchanted armor,enchant armor,ea,ench arm,ench armor'},
  {name: 'Aura of Protection',  stamina: 20, 'duration': 90,   minCastLevel: 150,  treeId: 1, skillId: 15,  buff: '+0.1% base Defence, +0.1% base Armor and +0.1% base HP per point.', nicks: 'aura of protection,aop,aofp'},
  {name: 'Deflect',             stamina: 25, 'duration': 300,  minCastLevel: 150,  treeId: 1, skillId: 14,  buff: '+0.25% chance per point that a player attacking you will automatically fail before combat starts.', nicks: 'deflect,defl'},
  {name: 'Force Shield',        stamina: 10, 'duration': 60,   minCastLevel: 200,  treeId: 1, skillId: 27,  buff: '+0.1% per point chance to reduce damage done to you to 1.', nicks: 'force shield,fs'},
  {name: 'Unbreakable',         stamina: 20, 'duration': 90,   minCastLevel: 200,  treeId: 1, skillId: 28,  buff: '+0.5% per point chance per point of equipment not taking durability loss during combat.', nicks: 'unbreakable,ub,unb,unbr'},
  {name: 'Honor',               stamina: 10, 'duration': 180,  minCastLevel: 800,  treeId: 1, skillId: 82,  buff: '+0.2% per point decrease to the PvP Rating points transferred upon defeat.', nicks: 'honor'},
  {name: 'Assist',              stamina: 30, 'duration': 120,  minCastLevel: 250,  treeId: 1, skillId: 36,  buff: '+0.05% per point chance of one of your allies assisting in combat vs. creatures. (Ally is randomly selected and adds 50% of their attack, defense, damage, armor and hp - note this also excludes allies whom are more than 25 levels above you.).', nicks: 'assist,ass'},
  {name: 'Constitution',        stamina: 25, 'duration': 30,   minCastLevel: 300,  treeId: 1, skillId: 37,  buff: '+0.1% per point increase to your defense.', nicks: 'constitution,const'},
  {name: 'Counter Attack',      stamina: 20, 'duration': 60,   minCastLevel: 400,  treeId: 1, skillId: 54,  buff: 'Uses 0.25% extra stamina (per point) to add 0.25% to both attack and damage. (Both values are rounded up, vs. creature only)', nicks: 'counter attack,ca'},
  {name: 'Summon Shield Imp',   stamina: 50, 'duration': 60,   minCastLevel: 400,  treeId: 1, skillId: 55,  buff: 'Creates an Imp which can absorb 100% of damage. Each full absorb uses one of the Shield Imp\\\'s hit points. The Shield Imp starts with 3 hit points and gains one for each 50 points placed in this skill. The Shield Imp auto-debuffs when it reaches zero hit points. (Note Super-Elites can crush the imp in a single turn regardless of hit points remaining and it only works in PvE.', nicks: 'summon shield imp,ssi,imp'},
  {name: 'Vision',              stamina: 20, 'duration': 90,   minCastLevel: 500,  treeId: 1, skillId: 56,  buff: 'Lights up dark realms. More skill points allow more vision on the \\\'Map\\\' screen. (Vision radius increases every 50 levels).', nicks: 'vision,vis'},
  {name: 'Fortitude',           stamina: 15, 'duration': 90,   minCastLevel: 500,  treeId: 1, skillId: 57,  buff: 'Defense stat is added to HP. (0.1% per point).', nicks: 'fortitude,fort'},
  {name: 'Flinch',              stamina: 20, 'duration': 60,   minCastLevel: 600,  treeId: 1, skillId: 58,  buff: '0.1% per point decrease in enemies Attack stat', nicks: 'flinch'},
  {name: 'Terrorize',           stamina: 20, 'duration': 60,   minCastLevel: 700,  treeId: 1, skillId: 59,  buff: '0.1% per point decrease in enemies Damage stat.', nicks: 'terrorize,terror'},
  {name: 'Nightmare Visage',    stamina: 40, 'duration': 1000, minCastLevel: 700,  treeId: 1, skillId: 60,  buff: '0.25% per point of your Attack will be transferred into Defense. (Great for offline protection!)', nicks: 'nightmare visage,nv,visage'},
  {name: 'Sanctuary',           stamina: 25, 'duration': 30,   minCastLevel: 800,  treeId: 1, skillId: 44,  buff: '+0.1% per point increase to your armor', nicks: 'sanctuary,sanc'},
  {name: 'Dull Edge',           stamina: 10, 'duration': 60,   minCastLevel: 800,  treeId: 1, skillId: 46,  buff: '+0.4% per point reduction to creatures \\\'Piercing Strike\\\' enhancement.', nicks: 'dull edge,de'},
  {name: 'Erosion',             stamina: 25, 'duration': 180,  minCastLevel: 900,  treeId: 1, skillId: 80,  buff: '+0.1% per point chance to reduce an attackers item durability to 1 if durability damage is inflicted. Note this skill only works in PvP and if you are defending.', nicks: 'erosion,ero'},
  {name: 'Avert Gaze',          stamina: 10, 'duration': 60,   minCastLevel: 900,  treeId: 1, skillId: 71,  buff: '+0.5% per point chance of not being affected by Hypnotize.', nicks: 'avert gaze,ag'},
  {name: 'Enchant Shield',      stamina: 25, 'duration': 60,   minCastLevel: 900,  treeId: 1, skillId: 77,  buff: '+0.1% per point stat bonus increase to your equipped shield. (Excludes \\\'Gain\\\' bonuses).', nicks: 'enchant shield,es'},
  {name: 'Smite',               stamina: 30, 'duration': 60,   minCastLevel: 1000, treeId: 1, skillId: 97,  buff: '0.1% per point reduction to attackers armor when defending a PvP attack. (PvP Only).', nicks: 'smite,sm'},
  {name: 'Balanced Defense',    stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 1, skillId: 117, buff: '+0.05% per point added to Defense and Armor if every piece of equipped gear is the same level.', nicks: 'balanced defense,bd'},
  {name: 'Bastion',             stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 1, skillId: 122, buff: 'Increases the maximum percentage (above 100%) of the Protection enhancement by +0.2% per point.', nicks: 'bastion,bast'},
  {name: 'Side Step',           stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 1, skillId: 86,  buff: 'Increases the maximum percentage (above 100%) of the Dodge enhancement by +0.2% per point.', nicks: 'side step,sstep'},
  {name: 'High Guard',          stamina: 30, 'duration': 60,   minCastLevel: 1200, treeId: 1, skillId: 96,  buff: '0.05% chance per point that your attack stat is added to your defense and your damage stat is added to your armor.', nicks: 'high guard,hg'},
  {name: 'Barricade',           stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 1, skillId: 98,  buff: '0.1% per point of Damage is transferred to Defense.', nicks: 'barricade,bar'},
  {name: 'Coordinated Defense', stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 1, skillId: 119, buff: '+0.05% per point added to Defense and Armor if every piece of equipped gear is part of a set.', nicks: 'coordinated defense,cd'},
  {name: 'Degrade',             stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 1, skillId: 121, buff: 'Increases the maximum percentage (above 100%) of the Nullify enhancement by +0.2% per point.', nicks: 'degrade,deg,dg'},
  {name: 'Retaliate',           stamina: 30, 'duration': 60,   minCastLevel: 1400, treeId: 1, skillId: 123, buff: 'Increases the maximum percentage (above 100%) of the Disarm enhancement by +0.2% per point.', nicks: 'retaliate,ret'},
  {name: 'Shame',               stamina: 35, 'duration': 60,   minCastLevel: 1400, treeId: 1, skillId: 110, buff: 'If successfully defending an attack, remove a percentage of additional +0.25% per point xp from the attacker. (PvP Only)', nicks: 'shame'},
  {name: 'Dispel Curse',        stamina: 35, 'duration': 60,   minCastLevel: 1400, treeId: 1, skillId: 114, buff: '0.2% chance per point that Dark Curse will not work against you. (PvP Only)', nicks: 'dispel curse,dispel'},
  {name: 'Anchored',            stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 1, skillId: 154, buff: '0.05% per point Damage is added to your health during combat.', nicks: 'anchored, anch, anchor'},
  {name: 'Hardened',            stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 1, skillId: 153, buff: '0.05% per point chance to prevent your opponent activating Shatter Armor.', nicks: 'hardened, hard, harden'},
  {name: 'Armor Boost',         stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 1, skillId: 136, buff: '+0.05% per point to your Armor for each complete set equipped.', nicks: 'armor boost, armbst, arm bst, armb'},
  {name: 'Shield Wall',         stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 1, skillId: 135, buff: '+0.05% per point to your Defense for each complete set equipped.', nicks: 'shield wall, shldwll, sw'},
  {name: 'Layered Armor',       stamina: 40, 'duration': 60,   minCastLevel: 2000, treeId: 1, skillId: 170, buff: '+0.05% of every items damage stat is added to your armor per skill level.', nicks: 'layered armor'},
  {name: 'Defensive Aura',      stamina: 40, 'duration': 60,   minCastLevel: 2500, treeId: 1, skillId: 171, buff: '+0.05% of every items attack stat is added to your defense per skill level.', nicks: 'defensive aura'},
  {name: 'Fumble',              stamina: 40, 'duration': 180,  minCastLevel: 3000, treeId: 1, skillId: 172, buff: '+0.1% per skill level reduction to attackers attack when defending a PvP attack.', nicks: 'fumble'},
  {name: 'Find Item',           stamina: 10, 'duration': 60,   minCastLevel: 1,    treeId: 2, skillId: 16,  buff: '+0.1% per point increase of creatures current drop rate.', nicks: 'find item,fi'},
  {name: 'Treasure Hunter',     stamina: 15, 'duration': 120,  minCastLevel: 1,    treeId: 2, skillId: 17,  buff: '+0.2% per point additional gold from creatures.', nicks: 'treasure hunter,th,treas hunter'},
  {name: 'Deep Pockets',        stamina: 10, 'duration': 90,   minCastLevel: 1,    treeId: 2, skillId: 22,  buff: '+0.25% per point reduction in gold lost on failed combat vs creatures.', nicks: 'deep pockets,dp'},
  {name: 'Quest Finder',        stamina: 5,  'duration': 90,   minCastLevel: 1,    treeId: 2, skillId: 61,  buff: 'Increases the chance a quest item will drop. (If you fail to obtain an item, an extra roll is given for Quest Finder at a fixed percentage based on the points allocated to the skill. If this second roll is successful, you will obtain one of the available quest items drops (if any)).', nicks: 'quest finder,qf'},
  {name: 'Adept Learner',       stamina: 10, 'duration': 90,   minCastLevel: 25,   treeId: 2, skillId: 19,  buff: '+0.2% per point increase in xp from creature kills.', nicks: 'adept learner,al'},
  {name: 'Defiance',            stamina: 15, 'duration': 120,  minCastLevel: 25,   treeId: 2, skillId: 18,  buff: '+0.25% per point reduction in xp lost when defeated in combat vs creatures.', nicks: 'defiance'},
  {name: 'Librarian',           stamina: 10, 'duration': 60,   minCastLevel: 75,   treeId: 2, skillId: 20,  buff: '+0.1% per point chance to gain double xp from creatures.', nicks: 'librarian,lib,libr'},
  {name: 'Merchant',            stamina: 10, 'duration': 60,   minCastLevel: 75,   treeId: 2, skillId: 21,  buff: '+0.05% per point chance to gain double gold from creatures.', nicks: 'merchant,merch,merc'},
  {name: 'Last Ditch',          stamina: 15, 'duration': 120,  minCastLevel: 150,  treeId: 2, skillId: 23,  buff: '+0.2% per point chance to survive death in combat (once per combat).', nicks: 'last ditch,ld'},
  {name: 'Animal Magnetism',    stamina: 10, 'duration': 60,   minCastLevel: 200,  treeId: 2, skillId: 24,  buff: '+0.2% per point chance to make certain creatures respawn at your location.', nicks: 'animal magnetism,animag,ani mag,am'},
  {name: 'Empower',             stamina: 20, 'duration': 60,   minCastLevel: 200,  treeId: 2, skillId: 25,  buff: '+0.1% per point increase to all currently active enhancements.', nicks: 'empower,emp'},
  {name: 'Doubler',             stamina: 5,  'duration': 120,  minCastLevel: 200,  treeId: 2, skillId: 26,  buff: 'At skill level 50+, 2x Stamina usage in combat in return for 2x gold/xp. At level 100+ 3x, and at level 150+ 4x. Note that stamina and xp loss are normal (not multiplied) if you lose a battle.', nicks: 'doubler,doub,db'},
  {name: 'Conserve',            stamina: 10, 'duration': 45,   minCastLevel: 250,  treeId: 2, skillId: 39,  buff: '+0.05% per point chance that combat (vs. players and vs. creatures) will use no stamina. (Excludes group/relic combat)', nicks: 'conserve,cons,consv,con'},
  {name: 'Brewing Master',      stamina: 10, 'duration': 30,   minCastLevel: 250,  treeId: 2, skillId: 40,  buff: '+0.5% per point to the duration of potions when consumed while active.', nicks: 'brewing master,bm,brm,brewm'},
  {name: 'Four Leaf',           stamina: 20, 'duration': 60,   minCastLevel: 250,  treeId: 2, skillId: 41,  buff: '+0.1% per point chance that craftable items are discovered already \\\'Perfect\\\'.', nicks: 'four leaf,4l,fl'},
  {name: 'Extend',              stamina: 30, 'duration': 30,   minCastLevel: 300,  treeId: 2, skillId: 42,  buff: '+0.25% per point increase to skills durations that are cast while this skill is active.', nicks: 'extend,ext'},
  {name: 'Inventor',            stamina: 15, 'duration': 60,   minCastLevel: 400,  treeId: 2, skillId: 62,  buff: 'Increases chance of success when attempting to Invent items/potions. (A fixed +0.05% chance per point extra chance of success)', nicks: 'inventor,inv,invI,inv1,inventor1,inventor 1,inventor i,inv i,inv 1'},
  {name: 'Extractor',           stamina: 15, 'duration': 60,   minCastLevel: 400,  treeId: 2, skillId: 63,  buff: 'Increases chance of success when attempting to extract Components from Resources. (A fixed +0.05% chance per point extra chance of success).', nicks: 'extractor,extr'},
  {name: 'Inventor II',         stamina: 20, 'duration': 60,   minCastLevel: 500,  treeId: 2, skillId: 64,  buff: 'Chance not to consume (or consume less) components when inventing items.', nicks: 'inventor ii,inventorii,invii,inv2,inventor 2,inv ii,inv 2'},
  {name: 'Buff Master',         stamina: 10, 'duration': 60,   minCastLevel: 500,  treeId: 2, skillId: 65,  buff: '0.2% per point chance to half the stamina cost (rounding up) when casting skills on other players. (Does not work on self!)', nicks: 'buff master,buffm,bum'},
  {name: 'Reflection',          stamina: 10, 'duration': 90,   minCastLevel: 600,  treeId: 2, skillId: 66,  buff: '0.1% per point of enemies damage inflicted is added to your next combat strike.', nicks: 'reflection,ref,refl,reflect'},
  {name: 'Guild Buffer',        stamina: 10, 'duration': 90,   minCastLevel: 600,  treeId: 2, skillId: 160, buff: '+0.25% per point chance to reduce stamina cost of casting buffs on guild members by 50% (rounding up).', nicks: 'guild buffer, gldbfr, gb'},
  {name: 'Light Foot',          stamina: 15, 'duration': 120,  minCastLevel: 700,  treeId: 2, skillId: 67,  buff: '0.05% chance to use no stamina while moving on the world map.', nicks: 'light foot,lf'},
  {name: 'Mesmerize',           stamina: 20, 'duration': 60,   minCastLevel: 700,  treeId: 2, skillId: 68,  buff: '0.1% per point chance to reduce a creatures armor and defense by 50% (vs. creature only).', nicks: 'mesmerize,mesmer,mes,mez'},
  {name: 'Resource Finder',     stamina: 25, 'duration': 90,   minCastLevel: 800,  treeId: 2, skillId: 76,  buff: 'Increases the chance a resource item will drop. (If you fail to obtain an item, an extra roll is given for Resource Finder at a fixed percentage based on the points allocated to the skill. If this second roll is successful, you will obtain one of the available resource items drops (if any)). Note if you have Quest Finder active as well, this roll takes place after Quest Finder and only if Quest Finder fails to obtain an item.', nicks: 'resource finder,rf'},
  {name: 'Quest Hunter',        stamina: 25, 'duration': 120,  minCastLevel: 800,  treeId: 2, skillId: 166, buff: 'At skill level 50+ grants 2x the kills towards quest requirements.. At level 100+ 3x, and at level 150+ 4x.', nicks: 'quest hunter'},
  {name: 'Gloat',               stamina: 10, 'duration': 30,   minCastLevel: 900,  treeId: 2, skillId: 81,  buff: '+0.5% per point increase to the PvP Rating points transferred upon victory. Note if you lose to a player who has the Honor skill active, you will lose and additional 50% PvP Rating.', nicks: 'gloat'},
  {name: 'Sacrifice',           stamina: 25, 'duration': 90,   minCastLevel: 900,  treeId: 2, skillId: 75,  buff: '+0.04% per point additional xp and -0.25% per point less gold for defeating creatures in combat.', nicks: 'sacrifice,sac'},
  {name: 'Reckoning',           stamina: 25, 'duration': 60,   minCastLevel: 900,  treeId: 2, skillId: 72,  buff: '+0.2% per point chance of doubling a random skill level for the battle if you initiate the combat (Note that this skill does not work with Doubler, Summon Shield Imp or Counter Attack.).', nicks: 'reckoning,rec,rek'},
  {name: 'Reinforce',           stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 2, skillId: 126, buff: 'Increases the maximum percentage (above 100%) of the Sustain enhancement by +0.2% per point.', nicks: 'reinforce,rein'},
  {name: 'Bodyguard',           stamina: 30, 'duration': 120,  minCastLevel: 1000, treeId: 2, skillId: 120, buff: '0.4% per point of XP lost that would be lost to a non-bounty board PvP attack is lost as gold instead, as long as there is enough unbanked gold. Gold lost because of Bodyguard is sunk: it does not go to attacker. Gold taken by attacker (and gold sunk as a result) is unaffected.', nicks: 'bodyguard,bg'},
  {name: 'Riposte',             stamina: 30, 'duration': 60,   minCastLevel: 1000, treeId: 2, skillId: 124, buff: 'Increases the maximum percentage (above 100%) of the Duelist enhancement by +0.2% per point.', nicks: 'riposte,rip'},
  {name: 'Severe Condition',    stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 2, skillId: 101, buff: '+0.25% per point of your attack, defense, damage and armor stats are transferred to your health at the start of combat.', nicks: 'severe condition,sc'},
  {name: 'Sealed',              stamina: 35, 'duration': 60,   minCastLevel: 1200, treeId: 2, skillId: 112, buff: '+0.1% per point chance at the start of combat that your opponents skills won\'t take effect in combat. (PvP Only)', nicks: 'sealed,seal'},
  {name: 'Righteous',           stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 2, skillId: 107, buff: 'Increases the maximum percentage (above 100%) of the Holy enhancement by +0.2% per point.', nicks: 'righteous,right'},
  {name: 'Epic Forge',          stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 2, skillId: 102, buff: '+0.5% per point increase to Hell Forge stat bonuses. Excludes bonuses to enhancements.', nicks: 'epic forge,ef'},
  {name: 'Golden Shield',       stamina: 30, 'duration': 60,   minCastLevel: 1200, treeId: 2, skillId: 103, buff: '+0.05% per point chance to double your armor and defense at the start of combat.', nicks: 'golden shield,gs'},
  {name: 'Stalker',             stamina: 35, 'duration': 90,   minCastLevel: 1400, treeId: 2, skillId: 125, buff: 'Increases the maximum percentage (above 100%) of the Elite Hunter enhancement by +0.1% per point.', nicks: 'stalker,stalk'},
  {name: 'Ageless',             stamina: 30, 'duration': 90,   minCastLevel: 1400, treeId: 2, skillId: 100, buff: '+0.2% per point chance of doubling your HP at the start of combat.', nicks: 'ageless,age'},
  {name: 'Extractor II',        stamina: 30, 'duration': 60,   minCastLevel: 1400, treeId: 2, skillId: 104, buff: '+0.05% per point chance to not destroy a resource when extracting components.', nicks: 'extractor ii,extractorii,extii,ext2,extractor 2,ext ii,ext 2'},
  {name: 'Epic Craft',          stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 2, skillId: 159, buff: '+0.5% per point increase to crafted stat bonuses.', nicks: 'epic craft, epc crft, epccrft, ec'},
  {name: 'Gold Foot',           stamina: 20, 'duration': 120,  minCastLevel: 1600, treeId: 2, skillId: 137, buff: '0.05% per point chance to consume 2,500 gold from your hand instead of 1 stamina while moving.', nicks: 'gold foot, goldfoot, gldft, gf'},
  {name: 'Titan Doubler',       stamina: 40, 'duration': 120,  minCastLevel: 2000, treeId: 2, skillId: 167, buff: 'At skill level 50+, 2x Stamina usage in combat against a Titan would kill it twice. At level 100+ 3x, and at level 150+ 4x.', nicks: 'titan doubler'},
  {name: 'Teleport',            stamina: 40, 'duration': 60,   minCastLevel: 2500, treeId: 2, skillId: 168, buff: 'Allows the player to teleport within their current realm. Ability has a 225 second cooldown, reduced by 1 second for each skill level.', nicks: 'teleport'},
  {name: 'Invigorate',          stamina: 40, 'duration': 90,   minCastLevel: 3000, treeId: 2, skillId: 169, buff: '+0.01% per skill level added to your attack, defence, armor, HP and damage for each piece of equipped gear that is epic.', nicks: 'invigorate'}
];
/* eslint-enable no-multi-spaces */

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
  'skill-50' : 'Death Dealer',
  'skill-54' : 'Counter Attack',
  'skill-55' : 'Summon Shield Imp',
  'skill-56' : 'Vision',
  'skill-60' : 'Nightmare Visage',
  'skill-61' : 'Quest Finder',
  'skill-98' : 'Barricade',
  'skill-101': 'Severe Condition'
};

function getEnhancement(doc, enh, inject) { // Native
  var enhLevel = doc[enh] || 0;
  inject.innerHTML = '<span class="' + (enhLevel < 100 ? 'fshRed' :
    'fshLime') + '">' + enhLevel + '%</span>';
}

function getBuff(doc, buff, inject) { // Native
  var s = doc[buff] || 0;
  if (s) {
    var m = Math.floor(s / 60);
    s = s % 60;
    var buffTimeToExpire = (m === 0 ? '' : m + 'm') +
      (s === 0 ? '' : ' ' + s + 's');
  inject.innerHTML = '<span class="fshLime">On</span>&nbsp;<span ' +
      'class="fshBuffOn">(' + buffTimeToExpire +')</span>';
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
    if (result && (result.textContent.indexOf(
        'current or higher level is currently active on') !== -1 ||
        result.textContent.indexOf('was activated on') !== -1)) {
      trigger.className = 'fshLime';
      trigger.innerHTML = 'On';
    }
  });
}

function addStatsQuickBuff(data) { // Native
  var myPlayer = document.querySelector('div.player[data-username="' +
    data.username + '"]');
  var activity = myPlayer.querySelector('span.fshLastActivity');
  if (!activity) {
    activity = document.createElement('SPAN');
    activity.className = 'fshLastActivity';
    var player = myPlayer.getElementsByTagName('h1')[0];
    player.insertAdjacentElement('afterend', activity);
  }
  activity.innerHTML = 'Last Activity: ' +
    formatLastActivity(data.last_login) +
    '<br>Stamina: ' + data.current_stamina + ' / ' +
    data.stamina + ' ( ' + Math.floor(data.current_stamina /
    data.stamina * 100) + '% )';
}

function addBuffLevels(evt) { // jQuery
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

  Array.prototype.forEach.call(nodeList, function(e) {
    var myBuffName = e.getAttribute('data-name');
    var playerBuffLevel = playerData[myBuffName];
    var playerSpan = e.nextElementSibling.nextElementSibling;
    if (!playerBuffLevel && !playerSpan) {return;}
    if (!playerBuffLevel) {
      playerSpan.innerHTML = '';
      return;
    }
    var lvlSpan = e.nextElementSibling.firstElementChild.firstElementChild;
    var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
    if (!playerSpan) {
      playerSpan = document.createElement('SPAN');
      playerSpan.className = 'fshPlayer';
      e.nextElementSibling.insertAdjacentElement('afterend', playerSpan);
    }
    playerSpan.innerHTML = ' <span class="' +
      (myLvl > playerBuffLevel ? 'fshRed' : 'fshGreen') +
      '">[' + playerBuffLevel + ']</span>';
  });

}

function doLabels(el) { // Native
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

function firstPlayerStats() { // Native
  var targets = document.getElementById('targetPlayers')
    .getAttribute('value');
  if (!targets || targets === '') {return;}
  var firstPlayer = document.getElementById('players')
    .getElementsByTagName('h1')[0];
  if (!firstPlayer && retries < 9) {
    retries += 1;
    setTimeout(firstPlayerStats, 100);
    return;
  }
  if (!firstPlayer) {return;}
  firstPlayer.dispatchEvent(new MouseEvent('click', {bubbles: true}));
}

function getSustain(responseText) { // Native
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

function buffResult(buffLog) { // Native
  if (!buffLog) {buffLog = '';}
  var timeStamp = formatDateTime(new Date());
  var buffsAttempted = document.getElementById('quickbuff-report')
    .innerHTML.split('<p>');
  var buffsNotCastRE = new RegExp('The skill ([\\w ]*) of current or' +
    ' higher level is currently active on \'(\\w*)\'');
  var buffsCastRE = new RegExp('Skill ([\\w ]*) level (\\d*) was ' +
    'activated on \'(\\w*)\'');
  var buffList$$1 = buffList;
  for (var i = 0; i < buffsAttempted.length; i += 1 ) {
    var buffsCast = buffsCastRE.exec(buffsAttempted[i]);
    var buffsNotCast = buffsNotCastRE.exec(buffsAttempted[i]);
    var stamina = 0;
    if (buffsCast) {
      for (var j = 0; j < buffList$$1.length; j += 1) {
        if (buffList$$1[j].name === buffsCast[1]) {
          stamina = buffList$$1[j].stamina;
          break;
        }
      }
      buffLog = timeStamp + ' ' + buffsCast[0] + ' (' + stamina +
        ' stamina) <br>' + buffLog;
    }
    if (buffsNotCast) {
      buffLog = timeStamp + ' ' + '<span style="color: red;">' +
        buffsNotCast[0] + '</span><br>' + buffLog;
    }
  }
  setForage('fsh_buffLog', buffLog);
}

function injectQuickBuff() { // jQuery
  var quickbuffDiv = document.getElementById('quickbuff');
  if (!quickbuffDiv) {return;}
  quickbuffDiv.firstElementChild.insertAdjacentHTML('afterend',
    quickBuffHeader);
  getProfile(window.self).done(getSustain);
}

function updateBuffLog() { // Native
  if (!getValue('keepBuffLog')) {return;}
  getForage('fsh_buffLog').done(buffResult);
}

function injectBuffLog(content) { // Native
  if (!content) {content = notebookContent();}
  content.innerHTML = makePageTemplate('Buff Log', '',
    'clearBuffs', 'Clear', 'bufflog');
  document.getElementById('clearBuffs').addEventListener('click',
    function() {
      setForage('fsh_buffLog', '').done(function() {
        location.reload(); // TODO
      });
    }, true
  );
  getForage('fsh_buffLog').done(function(buffLog) {
    document.getElementById('bufflog').innerHTML = buffLog;
  });
}

function notepadCopyLog() { // Native
  var combatLog = document.getElementById('Helper:CombatLog');
  combatLog.focus();
  combatLog.select();
}

function notepadClearLog() { // Legacy
  if (window.confirm('Are you sure you want to clear your log?')) {
    setValue('CombatLog', '');
    location.reload();
  }
}

function injectNotepadShowLogs(content) { // Legacy
  if (!content) {content = notebookContent();}
  var combatLog = getValue('CombatLog');
  if (combatLog.indexOf(',') === 0) {
    //combat logs start with a ,
    combatLog = combatLog.substr(1);
    setValue('CombatLog', combatLog);
  }

  var yuuzParser = '<tr><td align="center" colspan="4"><b>Log Parser</b>' +
    '</td></tr>'+
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
    'Lucida Console\',\'Courier New\',monospace;" id="Helper:CombatLog" ' +
    'name="logs">[' + combatLog + ']</textarea></div>' +
    '<br /><br /><table width="100%"><tr>'+
    '<td colspan="2" align=center>' +
    '<input type="button" class="custombutton" value="Select All" ' +
    'id="Helper:CopyLog"></td>' +
    '<td colspan="2" align=center>' +
    '<input type="button" class="custombutton" value="Clear" ' +
    'id="Helper:ClearLog"></td>' +
    '</tr>' + yuuzParser + '</table></div>'+
    '</form>';

  document.getElementById('Helper:CopyLog')
    .addEventListener('click', notepadCopyLog);
  document.getElementById('Helper:ClearLog')
    .addEventListener('click', notepadClearLog);
}

function scrollUpCombatLog() { // Legacy
  var reportLog = findNode('//div[@id="reportsLog"]');
  reportLog.scrollTop-=10;
}

function scrollDownCombatLog() { // Legacy
  var reportLog = findNode('//div[@id="reportsLog"]');
  reportLog.scrollTop+=10;
}

/* jshint latedef: nofunc */
var content;
var recipebook;
var currentFolder;
var hideRecipes = [];
var output;

function storeRecipeBook() {
  setForage('fsh_recipeBook', recipebook);
}

function sortRecipeTable(evt) { // Legacy
  var headerClicked = evt.target.getAttribute('sortKey');
  var sortType = evt.target.getAttribute('sorttype');
  if (!sortType) {sortType = 'string';}
  sortType = sortType.toLowerCase();
  if (calf.sortAsc === undefined) {calf.sortAsc = true;}
  if (calf.sortBy && calf.sortBy === headerClicked) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
  switch (sortType) {
  case 'number':
    recipebook.recipe.sort(numberSort);
    break;
  default:
    recipebook.recipe.sort(stringSort);
    break;
  }
  generateRecipeTable();
}

function generateRecipeTable() { // Legacy
  if (!recipebook) {return;}
  var playerId$$1 = playerId();
  var i;
  var j;
  var result = '<table width="100%"><tr class="rmTh">' +
    '<th>Recipe</th>' +
    '<th><span id="sortName" class="fshLink" sortkey="name">Name</span></th>' +
    '<th>Items</th>' +
    '<th>Components</th>' +
    '<th>Target</th>' +
    '</tr>';

  var recipe;
  for (i = 0; i < recipebook.recipe.length; i += 1) {
    recipe = recipebook.recipe[i];
    if (hideRecipes.indexOf(recipe.name) !== -1) {continue;}
    result += '<tr class="rmTr"><td class="rmTd">' +
      '<a href="' + recipe.link + '">' +
      '<img src="' + recipe.img +
      '" height="30px" width="30px">' +
      '</a>' +
      '</td>' +
      '<td class="rmTd">' +
      '<a href="' + recipe.link + '">' + recipe.name + '</a>' +
      '</td><td class="rmTd">';
    if (recipe.items) {
      for (j = 0; j < recipe.items.length; j += 1) {
        result += '<div class="rmItem"><img class="tip-dynamic" ' +
          'data-tipped="fetchitem.php?item_id=' +
          recipe.items[j].id + '&inv_id=-1&t=2&p=' +
          playerId$$1 + '&vcode=' + recipe.items[j].verify +
          '" src="' + recipe.items[j].img +
          '" height="20px" width="20px"><p>' +
          recipe.items[j].amountPresent + '/' +
          recipe.items[j].amountNeeded + '</p></div>';
      }
    }
    result += '</td><td class="rmTd">';
    if (recipe.components) {
      for (j = 0; j < recipe.components.length; j += 1) {
        result += '<div class="rmItem"><img class="tip-dynamic" ' +
          'data-tipped="fetchitem.php?item_id=' +
          recipe.components[j].id + '&inv_id=-1&t=2&p=' +
          playerId$$1 + '&vcode=' +
          recipe.components[j].verify + '" src="' +
          recipe.components[j].img +
          '" height="20px" width="20px"><p>' +
          recipe.components[j].amountPresent + '/' +
          recipe.components[j].amountNeeded + '</p></div>';
      }
    }
    result += '</td>';
    result += '<td class="rmTd">';
    if (recipe.target) {
      result += ' <img class="tip-dynamic" ' +
          'data-tipped="fetchitem.php?item_id=' +
          recipe.target.id + '&inv_id=-1&t=2&p=' + playerId$$1 +
          '&vcode=' + recipe.target.verify + '" ' +
          'src="' + recipe.target.img +
          '" height="30px" width="30px"><br/>';
    }
    result += '</td>';
    result += '</tr>';
  }
  result += '</table>';
  output.innerHTML = result;

  recipebook.lastUpdate = new Date();
  storeRecipeBook(); // Why? storing the sorted data?

  document.getElementById('sortName')
    .addEventListener('click', sortRecipeTable);
}

function parseRecipeItemOrComponent(jqueryxpath, doc) { // jQuery
  var results = [];
  $(doc).find(jqueryxpath).each(function(){
    var mouseOver = $(this).find('img').data('tipped');
    var resultAmounts = $(this).parent().next().text();
    var mouseOverRX = mouseOver.match(/fetchitem.php\?item_id=(\d+)\&inv_id=-1\&t=2\&p=(\d+)\&vcode=([a-z0-9]+)/i);
    var result = {
      img: $(this).find('img').attr('src'),
      id: mouseOverRX[1],
      verify: mouseOverRX[3],
      amountPresent: parseInt(resultAmounts.split('/')[0], 10),
      amountNeeded: parseInt(resultAmounts.split('/')[1], 10)
    };
    results.push(result);
  });
  return results;
}

function parseRecipePage(responseText, callback) { // Legacy
  var doc = createDocument(responseText);
  var currentRecipeIndex = callback.recipeIndex;
  var recipe = recipebook.recipe[currentRecipeIndex];

  output.innerHTML += 'Parsing blueprint ' + recipe.name + '...<br/>';

  recipe.items = parseRecipeItemOrComponent('td[background*="/inventory/2x3.gif"]', doc);
  recipe.components = parseRecipeItemOrComponent('td[background*="/inventory/1x1mini.gif"]', doc);
  recipe.target = parseRecipeItemOrComponent('td[background*="/hellforge/2x3.gif"]', doc)[0];

  var nextRecipeIndex = currentRecipeIndex + 1;
  if (nextRecipeIndex < recipebook.recipe.length) {
    var nextRecipe = recipebook.recipe[nextRecipeIndex];
    xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' +
      nextRecipe.id, parseRecipePage,
      {'recipeIndex': nextRecipeIndex});
  }
  else {
    output.innerHTML += 'Finished parsing ... formatting ...';
    recipebook.lastUpdate = new Date();
    storeRecipeBook();
    generateRecipeTable();
  }
}

function parseInventingPage(responseText, callback) { // Legacy
  var doc = createDocument(responseText);

  var folderIDs = []; //clear out the array before starting.
  $(doc).find('a[href*="index.php?cmd=inventing&folder_id="]')
    .each(function(){
      var folderID = /folder_id=([-0-9]+)/.exec($(this).attr('href'))[1] * 1;
      folderIDs.push(folderID);
    });

  var folderCount = folderIDs.length;
  var folderID = folderIDs[currentFolder - 1];
  var folderTextElement = $(doc).find(
    'a[href*="index.php?cmd=inventing&folder_id=' + folderID + '"]')
    .closest('td').text();

  var folderText = '';
  if (folderTextElement.length > 0) {
    folderText = folderTextElement;
  }
  var currentPage = callback.page;
  var pages = $(doc).find('select[name="page"]:first');
  var nextPage;
  if (folderText.search(/quest/i) === -1) {
    if (pages.length === 0) {return;}
    $(doc).find(
      'a[href*="index.php?cmd=inventing&subcmd=viewrecipe&recipe_id="]')
      .each(function(){
        var recipeLink = $(this).attr('href');
        var recipeId = parseInt(recipeLink.match(/recipe_id=(\d+)/i)[1], 10);
        var recipe = {
          'img': $(this).closest('tr').find('img').attr('src'),
          'link': recipeLink,
          'name': $(this).text(),
          'id': recipeId};
        output.innerHTML += 'Found blueprint: ' + recipe.name + '<br/>';
        recipebook.recipe.push(recipe);
      });

    nextPage = currentPage + 1;
    output.innerHTML += 'Parsing folder '+ currentFolder + ' ... Page ' +
      nextPage + '... <br/>';

  } else {
    output.innerHTML += 'Skipping folder ' + currentFolder +
      ' as it has the word "quest" in folder name.<br/>';
    nextPage = pages.find('option:last').text() * 1;
  }
  if (nextPage <= pages.find('option:last').text() * 1 &&
      currentFolder !== folderCount ||
      currentFolder < folderCount) {
    if (nextPage === pages.find('option:last').text() * 1 &&
        currentFolder < folderCount) {
      nextPage = 0;
      folderID = folderIDs[currentFolder];
      currentFolder += 1;
    }
    xmlhttp(
      'index.php?cmd=inventing&page=' + nextPage + '&folder_id=' +
      folderID,
      parseInventingPage,
      {'page': nextPage}
    );
  } else {
    output.innerHTML +=
      'Finished parsing ... Retrieving individual blueprints...<br/>';
    xmlhttp(
      'index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' +
      recipebook.recipe[0].id,
      parseRecipePage, {'recipeIndex': 0});
  }
}

function parseInventingStart(){ // Legacy
  recipebook = {};
  recipebook.recipe = [];
  output.innerHTML = '<br/>Parsing inventing screen ...<br/>';
  currentFolder = 1;
  xmlhttp('index.php?cmd=inventing&page=0',
    parseInventingPage, {'page': 0});
}

function gotRecipeBook(data) {
  recipebook = data;
  if (getValue('hideRecipes')) {
    hideRecipes = getValue('hideRecipeNames').split(',') || [];
  }
  content.innerHTML='<table class="fshInvFilter"><thead><tr>'+
    '<th width="90%"><b>&nbsp;Recipe Manager</b></th>'+
    '<th width="10%" class="fshBtnBox">[' +
    '<span id="rfsh" class="fshLink">' +
    'Refresh</span>]</th>'+
    '</tr></thead></table>' +
    '<div id="fshOutput"></div>';
  output = document.getElementById('fshOutput');
  document.getElementById('rfsh')
    .addEventListener('click', parseInventingStart);
  if (!recipebook) {parseInventingStart();}
  else {generateRecipeTable();}
}

function injectRecipeManager(injector) { // Legacy
  if (injector) {content = injector;}
  else {content = notebookContent();}
  getForage('fsh_recipeBook').done(gotRecipeBook);
}

function generateManageTable() { // Legacy
  var i, j, result='<table cellspacing=2 cellpadding=2 style="table-layout: fixed; word-wrap: break-word;" width=100%><tr bgcolor=#CD9E4B>';
  var isArrayOnly= calf.param.fields.length === 0;
  for (i=0;i<calf.param.headers.length;i += 1) {
    result+='<th>'+calf.param.headers[i]+'</th>';
  }
  result+='<th>Action</th></tr>';
  var currentCategory = '';
  for (i=0;i<calf.param.currentItems.length;i += 1) {
    result+='<tr>';
    if (isArrayOnly) {
      result+='<td align=center>'+calf.param.currentItems[i]+'</td>';
    } else {
      if (calf.param.categoryField && currentCategory !== calf.param.currentItems[i][calf.param.categoryField]) {
        currentCategory = calf.param.currentItems[i][calf.param.categoryField];
        result += '<td><span style="font-weight:bold; font-size:large;">' + currentCategory + '</span></td></tr><tr>';
      }
      for (j=0;j<calf.param.fields.length;j += 1) {
        result+='<td align=center class=content>';
        if (calf.param.fields[j]!==calf.param.categoryField){
          if (calf.param.tags[j]==='checkbox'){
            result+='<input type=checkbox '+(calf.param.currentItems[i][calf.param.fields[j]]?'checked':'')+' disabled>';
          } else {
            if (calf.param.url && calf.param.url[j] !== ''){
              result+='<a href="'+calf.param.url[j].replace('@replaceme@',calf.param.currentItems[i][calf.param.fields[j]])+'">'+
                calf.param.currentItems[i][calf.param.fields[j]]+'</a>';
            } else {
              result+=calf.param.currentItems[i][calf.param.fields[j]];
            }
          }
          result+='</td>';
        }
      }
    }
    result+='<td><span class=HelperTextLink itemId="' + i + '" id="Helper:DeleteItem' + i + '">[Del]</span></td></tr>';
  }
  result+='<tr>';
  if (isArrayOnly){
    result+='<td align=center><input type='+calf.param.tags[i]+' class=custominput id=Helper:input0></td>';
  }
  else {
    for (i=0;i<calf.param.tags.length;i += 1){
      result+='<td align=center><input type='+calf.param.tags[i]+' class=custominput id=Helper:input'+calf.param.fields[i]+'></td>';
    }
  }
  result+='<td><span class=HelperTextLink id="Helper:AddItem">[Add]</span></td></tr></table>';

  if (calf.param.showRawEditor) {
    result+='<table width=100%><tr><td align=center><textarea cols=70 rows=20 name="Helper:rawEditor">' +
      JSON.stringify(calf.param.currentItems) + '</textarea></td></tr>'+
      '<tr><td align=center><input id="Helper:saveRawEditor" type="button" value="Save" class="custombutton">'+
      '&nbsp;<input id="Helper:resetRawEditor" type="button" value="Reset" class="custombutton"></td></tr>'+
      '</tbody></table>';
  }

  document.getElementById(calf.param.id).innerHTML = result;

  setValueJSON(calf.param.gmname, calf.param.currentItems);
}

function deleteQuickItem(evt) { // Legacy
  var itemId = evt.target.getAttribute('itemId');
  calf.param.currentItems.splice(itemId, 1);
  generateManageTable();
}

function addQuickItem() { // Legacy
  var isArrayOnly= calf.param.fields.length === 0;
  var newItem={};
  if (isArrayOnly) {
    newItem=document.getElementById('Helper:input0').value;
  } else {
    for (var i=0;i<calf.param.fields.length;i += 1){
      if (calf.param.tags[i]==='checkbox') {
        newItem[calf.param.fields[i]] =
          document.getElementById('Helper:input' +
            calf.param.fields[i]).checked;
      } else {
        newItem[calf.param.fields[i]] =
          document.getElementById('Helper:input' +
            calf.param.fields[i]).value;
      }
    }
  }
  calf.param.currentItems.push(newItem);
  generateManageTable();
}

function saveRawEditor() { // jQuery
  calf.param.currentItems =
    JSON.parse($('textarea[name="Helper:rawEditor"]').val());
  generateManageTable();
}

function resetRawEditor() { // Legacy
  if (location.search === '?cmd=notepad&blank=1&subcmd=auctionsearch') {
    calf.param.currentItems =
      JSON.parse(defaults.quickSearchList);
  } else {calf.param.currentItems=[];}
  generateManageTable();
}

function listEvtHnl(e) { // Native
  if (e.target.id === 'Helper:resetRawEditor') {resetRawEditor();} else
  if (e.target.id === 'Helper:saveRawEditor') {saveRawEditor();} else
  if (e.target.id === 'Helper:AddItem') {addQuickItem();} else
  if (e.target.id.indexOf('Helper:DeleteItem') === 0) {deleteQuickItem(e);}
}

function injectAuctionSearch(content) { // Legacy
  if (!content) {content = notebookContent();}
  content.innerHTML =
    makePageHeader('Trade Hub Quick Search', '', '', '') +
    '<div class=content>This screen allows you to set up some quick ' +
      'search templates for the Auction House. The Display on AH column ' +
      'indicates if the quick search will show on the short list on the ' +
      'Auction House main screen. A maximum of 36 items can show on this ' +
      'list (It will not show more than 36 even if you have more than 36 ' +
      'flagged). To edit items, either use the large text area below, or ' +
      'add a new entry and delete the old one. You can always reset the ' +
      'list to the default values.</div>'+
    '<div style="font-size:small;" id="Helper:Auction Search Output">' +
    '</div>';
  // global parameters for the meta function generateManageTable
  calf.param = {
    'id':'Helper:Auction Search Output',
    'headers': ['Category', 'Nickname', 'Quick Search Text',
      'Display in AH?'],
    'fields': ['category', 'nickname', 'searchname', 'displayOnAH'],
    'tags': ['textbox', 'textbox', 'textbox', 'checkbox'],
    'url': ['', '',
      'index.php?cmd=auctionhouse&type=-1&search_text=@replaceme@', ''],
    'currentItems': getValueJSON('quickSearchList'),
    'gmname': 'quickSearchList',
    'sortField': 'category',
    'categoryField': 'category',
    'showRawEditor': true
  };
  generateManageTable();
  content.addEventListener('click', listEvtHnl);
}

function injectQuickLinkManager(content) { // Legacy
  if (!content) {content = notebookContent();}
  content.innerHTML =
    makePageTemplate('Quick Links', '', '', '', 'quickLinkAreaId');

  // global parameters for the meta function generateManageTable
  calf.param = {
    'id': 'quickLinkAreaId',
    'headers': ['Name', 'URL',
      'New [<span style="cursor:pointer; text-decoration:underline;" ' +
      'title="Open page in a new window">?</span>]'],
    'fields': ['name', 'url', 'newWindow'],
    'tags': ['textbox', 'textbox', 'checkbox'],
    'currentItems': getValueJSON('quickLinks'),
    'gmname': 'quickLinks',
    'showRawEditor': true
  };
  generateManageTable();
  content.addEventListener('click', listEvtHnl);
}

function uniq(arr, removeBy){ // Ugly but fast
  var seen = {};
  var out = [];
  var len = arr.length;
  var j = 0;
  var i;
  var item;
  if (removeBy) {
    for (i = 0; i < len; i += 1) {
      item = arr[i];
      if (seen[item[removeBy]] === 1) {continue;}
      seen[item[removeBy]] = 1;
      out[j] = item;
      j += 1;
    }
  } else {
    for (i = 0; i < len; i += 1) {
      item = arr[i];
      if (seen[item] === 1) {continue;}
      seen[item] = 1;
      out[j] = item;
      j += 1;
    }
  }
  return out;
}

function findBuffsParseProfileAndDisplay(responseText, callback) { // Hybrid - Evil
  var doc = createDocument(responseText);
  //name and level
  var playerName$$1 = $(doc).find('#pCC h1:first').text();
  var levelElement = $(doc).find('td:contains("Level:"):last').next();
  var levelValue = parseInt(levelElement.text().replace(/,/g,''),10);
  var virtualLevelElement = $(doc).find('td:contains("VL:"):last').next();
  var virtualLevelValue = parseInt(virtualLevelElement.text()
    .replace(/,/g,''),10);
  //last activity
  var lastActivityElement = $(doc).find('#pCC p:first');
  var lastActivity = /(\d+) mins, (\d+) secs/
    .exec(lastActivityElement.text());
  var lastActivityMinutes = parseInt(lastActivity[1],10);
  var lastActivityIMG = onlineDot({min: lastActivityMinutes});
  //buffs
  var bioDiv = $(doc)
    .find('div.innerColumnHeader:contains("Biography"):last');
  var bioCell = bioDiv.next();
  var buffTable = document.getElementById('buffTable');
  var textLineArray = [];
  var buffPosition = 0, startingPosition = 0, runningTotalPosition = 0;
  var bioTextToSearch = ' '+bioCell.html()+' ';
  var buffRE = new RegExp('[^a-zA-Z]((' +
    calf.findBuffNicks.replace(/,/g,')|(') + '))[^a-zA-Z]', 'i');
  while (buffPosition !== -1) {
    bioTextToSearch = bioTextToSearch.substr(startingPosition,
      bioTextToSearch.length);
    buffPosition = bioTextToSearch.search(buffRE);
    if (buffPosition !== -1) {
      startingPosition = buffPosition + 1;
      runningTotalPosition += buffPosition;
      var prevBR = bioCell.html().lastIndexOf('<br>',runningTotalPosition-1);
      if (prevBR===-1) {prevBR=0;}
      var nextBR = bioCell.html().indexOf('<br>',runningTotalPosition);
      if (nextBR===-1 && bioCell.html().indexOf('<br>') !== -1) {
        nextBR=bioCell.html().length-5;
      }
      var textLine = bioCell.html().substr(prevBR + 4, nextBR - prevBR);
      textLine = textLine.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g,'');
      textLineArray.push(textLine);
    }
  }
  textLineArray = uniq(textLineArray);
  //sustain
  var sustainText = $(doc)
    .find('td:has(a:contains("Sustain")):last').next()
    .find('table.tipped').data('tipped');
  var sustainLevel;
  if (sustainText !== undefined) {
    var sustainLevelRE = /Level<br>(\d+)%/;
    sustainLevel = sustainLevelRE.exec(sustainText)[1];
  } else {
    sustainLevel = -1;
  }
  //extend
  var hasExtendBuff = $(doc).find('img.tipped[data-tipped*="Extend"]');

  //add row to table
  if (textLineArray.length > 0) {
    var newRow = buffTable.insertRow(-1);
    //name cell
    var newCell = newRow.insertCell(0);
    newCell.style.verticalAlign = 'top';
    var playerHREF = callback.href;
    var bioTip = bioCell.html().replace(/'|"|\n/g,'');
    newCell.innerHTML = '<nobr>' + lastActivityIMG + '&nbsp;<a href="' +
      playerHREF + '" target="new" ' +
      // FIXME - It kind works now, but not guaranteed?
      'class="tipped" data-tipped-options="hook: \'leftmiddle\'" ' + 
      'data-tipped="'+bioTip+'">' + playerName$$1 + '</a>' +
      '&nbsp;<span style="color:blue;">[<span class="a-reply" ' +
      'target_player="' + playerName$$1 +'" style="cursor:pointer; ' +
      'text-decoration:underline;">m</span>]</span>' + '</nobr><br>' +
      '<span style="color:gray;">Level:&nbsp;</span>' + levelValue +
      '&nbsp;(' + virtualLevelValue + ')';
    $('.a-reply').click(function(evt) {
      window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
    });

    //player info cell
    newCell = newRow.insertCell(1);
    var playerInfo = '<table><tbody><tr><td colspan="2" style=' +
      '"color:gray;" align="right" width="50%">Last Activity:</td>' +
      '<td colspan="2"><nobr>' + lastActivity[0] + '</nobr></td></tr>' +
      '<tr><td style="color:gray;" align="right" width="25%">Sustain:' +
      '</td><td width="25%" style="color:' +
      (sustainLevel >= 100 ? 'green' : 'red') + ';">' + sustainLevel +
      '%</td>' +
      '<td width="25%" style="color:gray;" align="right">Extend:</td>' +
      '<td width="25%">' + (hasExtendBuff.length > 0 ?
      '<span style="color:green;">Yes</span>' :
      '<span style="color:red;">No</span>') + '</td></tr>';
    newCell.innerHTML = playerInfo;
    newCell.style.verticalAlign = 'top';
    //buff cell
    newCell = newRow.insertCell(2);
    for (var i = 0; i < textLineArray.length; i += 1) {
      newCell.innerHTML += textLineArray[i] + '<br>';
    }
  }
  var processedBuffers = document.getElementById('buffersProcessed');
  var potentialBuffers =
    parseInt(document.getElementById('potentialBuffers').textContent,10);
  var processedBuffersCount = parseInt(processedBuffers.textContent,10);
  processedBuffers.innerHTML = processedBuffersCount + 1;
  if (potentialBuffers === processedBuffersCount + 1) {
    var bufferProgress = document.getElementById('bufferProgress');
    bufferProgress.innerHTML = 'Done.';
    bufferProgress.style.color = 'blue';
  }
}

function findBuffsParsePlayersForBuffs() { // Legacy
  //remove duplicates TODO
  var bufferProgress = document.getElementById('bufferProgress');
  //now need to parse player pages for buff ...
  document.getElementById('potentialBuffers').innerHTML =
    calf.onlinePlayers.length;
  if (calf.onlinePlayers.length <= 0) {
    bufferProgress.innerHTML = 'Done.';
    bufferProgress.style.color = 'blue';
    return;
  }
  bufferProgress.innerHTML = 'Parsing player data ...';
  bufferProgress.style.color = 'green';

  for (var j = 0; j < calf.onlinePlayers.length; j += 1) {
    xmlhttp(calf.onlinePlayers[j],
      findBuffsParseProfileAndDisplay,
      {'href': calf.onlinePlayers[j]});
  }
}

function findBuffsParseOnlinePlayers(responseText) { // Legacy
  var doc = createDocument(responseText);
  var playerRows = $(doc).find('table:contains("Username")>tbody>tr:has' +
    '(td>a[href*="cmd=profile&player_id="])');
  var maxPage = parseInt($(doc).find('td:has(input[name="page"]):last')
    .text().replace(/\D/g, ''),10);
  var curPage = parseInt($(doc).find('input[name="page"]:last').val()
    .replace(/\D/g, ''),10);
  var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
  if (curPage !== 1){
    playerRows.each(function(){
      var onlinePlayer = $(this).find('td:eq(1) a').attr('href');
      var onlinePlayerLevel = parseInt($(this).find('td:eq(2)').text()
        .replace(/,/g,''),10);
      var onlinePlayerName = $(this).find('td:eq(1) a').text();
      var minPlayerVirtualLevel = 1;
      if (calf.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
      if (onlinePlayerLevel >= calf.findBuffMinCastLevel &&
        onlinePlayerLevel >= minPlayerVirtualLevel) {
        //add online player to search list (all but self)
        if (characterName !== onlinePlayerName.trim()) {
          calf.onlinePlayers.push(onlinePlayer);
        }
      }
    });
  }
  if (curPage < maxPage/*-maxPage+15*/) {
    var newPage = curPage === 1 ?
      Math.round(calf.onlinePlayersSetting * maxPage / 50) :
      curPage + 1;
    var bufferProgress = document.getElementById('bufferProgress');
    bufferProgress.innerHTML = 'Parsing online page ' + curPage + ' ...';
    xmlhttp('index.php?cmd=onlineplayers&page=' + newPage,
      findBuffsParseOnlinePlayers, {'page':newPage});
  }
  else {
    //all done so moving on
    findBuffsParsePlayersForBuffs();
  }
}

function findBuffsParseOnlinePlayersStart() { // Legacy
  //if option enabled then parse online players
  calf.onlinePlayersSetting =
    document.getElementById('onlinePlayers').value;
  if (calf.onlinePlayersSetting !== 0) {
    xmlhttp('index.php?cmd=onlineplayers&page=1',
      findBuffsParseOnlinePlayers, {'page':1});
  } else {
    findBuffsParsePlayersForBuffs();
  }
}

function findBuffsParseProfilePage(responseText) { // jQuery
  var doc = createDocument(responseText);
  var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
  var profileAlliesEnemies = $(doc).find('#profileLeftColumn')
    .find('a[data-tipped*="Last Activity"]');
  profileAlliesEnemies.each(function(){
    var onMouseOver = $(this).data('tipped');
    var lastActivity = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/.exec(onMouseOver);
    var lastActivityDays = parseInt(lastActivity[1],10);
    var lastActivityHours = parseInt(lastActivity[2],10) +
      lastActivityDays * 24;
    var lastActivityMinutes = parseInt(lastActivity[3],10) +
      lastActivityHours * 60;
    //check if they are high enough level to cast the buff
    var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
    virtualLevel = parseInt(virtualLevel[1].replace(/,/g,''),10);
    var minPlayerVirtualLevel = 1;
    if (calf.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
    if (lastActivityMinutes < 5 &&
      virtualLevel >= calf.findBuffMinCastLevel &&
      virtualLevel >= minPlayerVirtualLevel) {
      //add online player to search list (all but self)
      var onlinePlayer = $(this).attr('href');
      if (characterName !== $(this).text().trim()) {
        calf.onlinePlayers.push(onlinePlayer);
      }
    }
  });
  //continue with online players
  calf.profilePagesToSearchProcessed += 1;
  if (calf.profilePagesToSearchProcessed ===
    calf.profilePagesToSearch.length) {
    findBuffsParseOnlinePlayersStart();
  }
}

function findBuffsParseProfilePageStart() { // Legacy
  //if option enabled then parse profiles
  calf.profilePagesToSearch = [];
  calf.profilePagesToSearch.push('index.php?cmd=profile');
  var extraProfileArray = calf.extraProfile.split(',');
  var i;
  for (i=0;i<extraProfileArray.length ;i+= 1 ) {
    calf.profilePagesToSearch.push('index.php?cmd=findplayer' +
      '&search_active=1&search_level_max=&search_level_min=' +
      '&search_username=' + extraProfileArray[i] + '&search_show_first=1');
  }
  calf.profilePagesToSearchProcessed = 0;
  if (document.getElementById('alliesEnemies').checked) {
    for (i=0;i<calf.profilePagesToSearch.length ;i+= 1 ) {
      xmlhttp(calf.profilePagesToSearch[i],
        findBuffsParseProfilePage);
    }
  } else {
    findBuffsParseOnlinePlayersStart();
  }
}

function findBuffsParseGuildManagePage(responseText) { // jQuery
  var doc = createDocument(responseText);
  var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
  var memberTableRows = $(doc)
    .find('table:has(td:contains("Rank")[bgcolor="#C18B35"]):last')
    .find('tr:gt(1):not(:has(td[colspan="5"]))');
  if (document.getElementById('guildMembers').checked) {
    memberTableRows.each(function(){
      var contactLink = $(this).find('a');
      var onMouseOver = $(contactLink).data('tipped');
      var lastActivity = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/.exec(onMouseOver);
      var lastActivityDays = parseInt(lastActivity[1],10);
      var lastActivityHours = parseInt(lastActivity[2],10) +
        lastActivityDays * 24;
      var lastActivityMinutes = parseInt(lastActivity[3],10) +
        lastActivityHours * 60;
      //check if they are high enough level to cast the buff
      var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
      virtualLevel = parseInt(virtualLevel[1].replace(/,/g,''),10);
      var minPlayerVirtualLevel = 1;
      if (calf.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
      if (lastActivityMinutes < 5 &&
        virtualLevel >= calf.findBuffMinCastLevel &&
        virtualLevel >= minPlayerVirtualLevel) {
        //add online player to search list (all but self)
        var onlinePlayer = contactLink.attr('href');
        if (characterName !== $(this).find('td:eq(1)')
          .text().trim()) {
          calf.onlinePlayers.push(onlinePlayer);
        }
      }
    });
  }
  //continue with profile pages
  findBuffsParseProfilePageStart();
}

function findBuffsStart() { // Legacy
  var selectedBuff = $('#selectedBuff').val();
  //create array of buff nicknames ...
  var buffList$$1 = buffList;
  for (var j = 0; j < buffList$$1.length; j += 1) {
    if (selectedBuff === buffList$$1[j].skillId) {
      calf.findBuffNicks = buffList$$1[j].nicks;
      calf.findBuffMinCastLevel = buffList$$1[j].minCastLevel;
      break;
    }
  }
  document.getElementById('buffNicks').innerHTML = calf.findBuffNicks;
  var bufferProgress = document.getElementById('bufferProgress');
  bufferProgress.innerHTML = 'Gathering list of potential buffers ...';
  bufferProgress.style.color = 'green';
  calf.findBuffsLevel175Only =
    document.getElementById('level175').checked;
  document.getElementById('buffersProcessed').innerHTML = 0;
  calf.onlinePlayers = [];
  calf.extraProfile = document.getElementById('extraProfile').value;
  setValue('extraProfile', calf.extraProfile);
  //get list of players to search, starting with guild>manage page
  xmlhttp('index.php?cmd=guild&subcmd=manage',
    findBuffsParseGuildManagePage);
}

function findBuffsClearResults() { // Legacy
  var buffTable = document.getElementById('buffTable');
  for (var j = buffTable.rows.length; j > 1; j-=1) {
    buffTable.deleteRow(j-1);
  }
  document.getElementById('buffNicks').innerHTML = '';
  var bufferProgress = document.getElementById('bufferProgress');
  bufferProgress.innerHTML = 'Idle.';
  bufferProgress.style.color = 'black';
  document.getElementById('potentialBuffers').innerHTML = '';
  document.getElementById('buffersProcessed').innerHTML = 0;
}

function injectFindBuffs(content) { // Legacy
  if (!content) {content=notebookContent();}
  var buffList$$1 = buffList;
  calf.sortBy='name';
  calf.sortAsc=true;
  buffList$$1.sort(stringSort);
  var injectionText = '';
  var extraProfile = getValue('extraProfile');
  injectionText += '<table width="620" cellspacing="0" cellpadding="2" ' +
    'border="0" align="center"><tbody><tr><td rowspan="2" colspan="2" ' +
    'width="50%"><h1>Find Buff</h1></td><td align="right" style="' +
    'color:brown;">Select buff to search for:</td>';

  injectionText += '<td align="left"><select style="width:140px;" ' +
    'id="selectedBuff">';
  for (var j = 0; j < buffList$$1.length; j += 1) {
    injectionText += '<option value="' + buffList$$1[j].skillId + '">' +
      buffList$$1[j].name + '</option>';
  }
  injectionText += '</select></td></tr>';

  injectionText += '<tr>' +
    '<td align="right" style="color:brown;">Level 175 buffers only:</td>' +
    '<td align="left"><input id="level175" type="checkbox"></td></tr>' +
    '<tr><td align="right" style="color:brown;" width="30%">Nicknames of ' +
    'buff searched:&nbsp;</td><td align="left" id="buffNicks">&nbsp;</td>' +
    '<td align="right" style="color:brown;">Search guild members:</td>' +
    '<td align="left"><input id="guildMembers" type="checkbox" checked>' +
    '</td></tr><tr>' +
    '<td align="right" style="color:brown;"># potential buffers to ' +
    'search:&nbsp;</td><td align="left" id="potentialBuffers"></td>' +
    '<td align="right" style="color:brown;">Search allies/enemies:' +
    helpLink('Search Allies/Enemies', 'The checkbox enables ' +
    'searching your own personal allies/enemies list for buffs.<br><br>' +
    'Additional profiles to search can be added in the text field to the ' +
    'right, separated by commas.') + '</td>' +
    '<td align="left"><input id="alliesEnemies" type="checkbox" checked>' +
    '<input style="width:118px;" class="custominput" id="extraProfile" ' +
    'type="text" title="Extra profiles to search" value="' +
    (extraProfile?extraProfile:'') + '"></td></tr>' +
    '<tr><td align="right" style="color:brown;"># Buffers processed:' +
    '&nbsp;</td><td align="left" id="buffersProcessed">0</td>' +
    '<td align="right" style="color:brown;">Search online list:</td>' +
    '<td align="left"><select style="width:140px;" id="onlinePlayers">' +
      '<option value="0">Disabled</option>' +
      '<option value="49">Short (fastest)</option>' +
      '<option value="47">Medium (medium)</option>' +
      '<option value="45">Long (slowest)</option>' +
    '</select></td></tr>' +
    '<tr><td align="right" style="color:brown;">Find buffers progress:' +
    '&nbsp;</td><td align="left" width="310" id="bufferProgress">Idle</td>'+
    '<td align="center"><input id="clearresultsbutton" ' +
    'class="custombutton" type="button" value="Clear Results"></td>' +
    '<td align="center"><input id="findbuffsbutton" class="custombutton" ' +
    'type="button" value="Find Buffers"></td></tr>' +
    '</tbody></table><br>' +
    '<h1>Potential Buffers and Bio Info</h1><br>' +
    '<table width="620" cellspacing="0" cellpadding="3" border="1" ' +
    'align="center" id="buffTable"><tbody>' +
    '<tr><th width="120">&nbsp;Name</th><th width="200">&nbsp;Player ' +
    'Info</th><th>&nbsp;Notable Bio Text</th></tr>' +
    '</tbody></table><br>' +
    '<div class=content style="font-size:xx-small; color:brown; ' +
    'margin-left:28px; margin-right:28px;">Disclaimer: This ' +
    'functionality does a simple text search for the terms above. '+
    'It is not as smart as you are, so please do not judge the results ' +
    'too harshly. It does not search all online players, just a subset ' +
    'of those that have been on recently. ' +
    'The aim is to be fast and still return a good set of results. This ' +
    'feature is a work in progress, so it may be tweaked and enhanced ' +
    'over time.</div>';
  content.innerHTML = injectionText;
  document.getElementById('findbuffsbutton')
    .addEventListener('click', findBuffsStart, true);
  document.getElementById('clearresultsbutton')
    .addEventListener('click', findBuffsClearResults, true);
}

function findOtherStart() { // Legacy
  var textToSearchFor = $('#textToSearchFor').val();
  //use existing array structure to save search text ...
  var textArray=textToSearchFor.split(',');
  var tempArray = [];
  for (var i=0;i<textArray.length;i += 1) {
    tempArray.push(textArray[i].trim());
  }
  textToSearchFor = tempArray.join(',');
  calf.findBuffNicks = textToSearchFor;
  calf.findBuffMinCastLevel = 1;

  document.getElementById('buffNicks').innerHTML = calf.findBuffNicks;
  var bufferProgress = document.getElementById('bufferProgress');
  bufferProgress.innerHTML = 'Gathering list of profiles to search ...';
  bufferProgress.style.color = 'green';
  calf.findBuffsLevel175Only =
    document.getElementById('level175').checked;
  document.getElementById('buffersProcessed').innerHTML = 0;
  calf.onlinePlayers = [];
  setValue('textToSearchFor', textToSearchFor);
  calf.extraProfile = document.getElementById('extraProfile').value;
  setValue('extraProfile', calf.extraProfile);
  //get list of players to search, starting with guild>manage page
  xmlhttp('index.php?cmd=guild&subcmd=manage',
    findBuffsParseGuildManagePage);
}

function injectFindOther(content) { // Native - Bad
  if (!content) {content=notebookContent();}
  var injectionText = '';
  var textToSearchFor = getValue('textToSearchFor');
  var extraProfile = getValue('extraProfile');
  injectionText += '<table width="620" cellspacing="0" cellpadding="2" ' +
    'border="0" align="center"><tbody>' +
    '<tr><td rowspan="2" colspan="2" width="50%"><h1>Find Other</h1></td>' +
    '<td align="right" style="color:brown;">Select text to search for:</td>' +

    '<td align="left"><input style="width:140px;" class="custominput" ' +
    'id="textToSearchFor" type="text" title="Text to search for" value="' +
    (textToSearchFor ? textToSearchFor : '') + '"></td></tr>' +

    '<tr>' +
    '<td align="right" style="color:brown;">Level 500+ players only:</td>' +
    '<td align="left"><input id="level175" type="checkbox"></td></tr>' +
    '<tr><td align="right" style="color:brown;" width="30%">Text ' +
    'searched for:&nbsp;</td><td align="left" id="buffNicks">&nbsp;</td>' +
    '<td align="right" style="color:brown;">Search guild members:</td>' +
    '<td align="left"><input id="guildMembers" type="checkbox" checked>' +
    '</td></tr><tr>' +
    '<td align="right" style="color:brown;"># potential players to ' +
    'search:&nbsp;</td><td align="left" id="potentialBuffers"></td>' +
    '<td align="right" style="color:brown;">Search allies/enemies:' +
    helpLink('Search Allies/Enemies',
      'The checkbox enables searching your own personal ' +
      'allies/enemies list for buffs.<br><br>' +
      'Additional profiles to search can be added in the text ' +
      'field to the right, separated by commas.') + '</td>' +
    '<td align="left"><input id="alliesEnemies" type="checkbox" checked>' +
    '<input style="width:118px;" class="custominput" id="extraProfile" ' +
    'type="text" title="Extra profiles to search" value="' +
    (extraProfile ? extraProfile : '') + '"></td></tr>' +
    '<tr><td align="right" style="color:brown;"># Players processed:' +
    '&nbsp;</td><td align="left" id="buffersProcessed">0</td>' +
    '<td align="right" style="color:brown;">Search online list:</td>' +
    '<td align="left"><select style="width:140px;" id="onlinePlayers">' +
      '<option value="0">Disabled</option>' +
      '<option value="49">Short (fastest)</option>' +
      '<option value="47">Medium (medium)</option>' +
      '<option value="45">Long (slowest)</option>' +
    '</select></td></tr>' +
    '<tr><td align="right" style="color:brown;">Find Other progress:' +
    '&nbsp;</td><td align="left" width="310" id="bufferProgress">Idle</td>' +
    '<td align="center"><input id="clearresultsbutton" class=' +
    '"custombutton" type="button" value="Clear Results"></td>' +
    '<td align="center"><input id="findbuffsbutton" class=' +
    '"custombutton" type="button" value="Find Buffers"></td></tr>' +
    '</tbody></table><br>' +
    '<h1>Potential Players and Bio Info</h1><br>' +
    '<table width="620" cellspacing="0" cellpadding="3" border="1" ' +
    'align="center" id="buffTable"><tbody>' +
    '<tr><th width="120">&nbsp;Name</th><th width="200">&nbsp;Player ' +
    'Info</th><th>&nbsp;Notable Bio Text</th></tr>' +
    '</tbody></table><br>' +
    '<div class=content style="font-size:xx-small; color:brown; ' +
    'margin-left:28px; margin-right:28px;">Disclaimer: This ' +
    'functionality does a simple text search for the terms above. ' +
    'It is not as smart as you are, so please do not judge the results ' +
    'too harshly. It does not search all online players, just a subset ' +
    'of those that have been on recently. ' +
    'The aim is to be fast and still return a good set of results. This ' +
    'feature is a work in progress, so it may be tweaked and enhanced ' +
    'over time.</div>';
  content.innerHTML = injectionText;
  document.getElementById('findbuffsbutton')
    .addEventListener('click', findOtherStart, true);
  document.getElementById('clearresultsbutton')
    .addEventListener('click', findBuffsClearResults, true);
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

function dataTableSearch() { // jQuery
  /* Custom filtering function which will search data in column three between two values */
  $.fn.dataTable.ext.search.push(
    function(_settings, data) {
      var min = parseInt($('#fshMinLvl', context).val(), 10); // context
      var max = parseInt($('#fshMaxLvl', context).val(), 10); // context
      if (!isNaN(min)) {setValue('onlinePlayerMinLvl', min);}
      if (!isNaN(max)) {setValue('onlinePlayerMaxLvl', max);}
      var level = intValue(data[2]) || 0; // use data for the level column
      if (isNaN(min) && isNaN(max) ||
        isNaN(min) && level <= max ||
        min <= level && isNaN(max) ||
        min <= level && level <= max )
      {return true;}
      return false;
    }
  );
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
  dataTableSearch();
  filterHeaderOnlinePlayers();

  table = $('#fshInv', context).dataTable({ // context
    data: onlineData,
    pageLength: 30,
    lengthMenu: [[30, 60, -1], [30, 60, 'All']],
    columns: [
      {title: 'Guild', class: 'dt-center', orderable: false},
      {title: 'Name', class: 'dt-center'},
      {title: 'Level', class: 'dt-center'},
      {title: 'Page/Index', class: 'dt-center'}
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

function getOnlinePlayers(data) { // Bad jQuery
  $('#fshOutput', context).append(' ' +
    (onlinePages + 1)); // context
  var doc = createDocument(data);
  var input = $('#pCC input.custominput', doc).first();
  var thePage = input.attr('value');
  var theRows = $('#pCC img[src$="/skin/icon_action_view.gif',
    doc).parent().parent().parent();
  theRows.each(function(index) {
    var tds = $('td', $(this));
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
  } else if (onlinePages === lastPage) {
    setForage('fsh_onlinePlayers', onlinePlayers);
    gotOnlinePlayers();
  }
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

function doOnlinePlayerEventHandlers(e) { // Native
  if (e.target.id === 'fshRefresh') {refreshEvt();return;}
  if (e.target.id === 'fshReset') {resetEvt();return;}
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
      lastCheck) / 1000) +'s ]</span>';
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
  context = content ? $(content) : $('#pCC');
  injectOnlinePlayersNew();
}

var extractInv;

function quickDoneExtracted(responseText) { // Native
  var infoMessage = infoBox(responseText);
  document.getElementById('buy_result').innerHTML += '<br>' + infoMessage;
}

function extractAllSimilar(evt) { // Legacy
  if (!confirm('Are you sure you want to extract all similar items?')) {
    return;}
  var InventoryIDs = evt.target.getAttribute('invIDs').split(',');
  evt.target.parentNode.innerHTML = 'extracting all ' +
    InventoryIDs.length + ' resources';
  for (var i = 0; i < InventoryIDs.length; i += 1){
    xmlhttp(
      'index.php?cmd=profile&subcmd=useitem&inventory_id=' +
      InventoryIDs[i], quickDoneExtracted);
  }
}

function showQuickExtract(data) { // Legacy
  var item;
  var id;
  if (data.items) {
    extractInv = data;
  }
  var table = $('table[id="Helper:ExtTable"]');
  table.children().remove();//empty table for re-population.
  calf.resourceList={}; //reset resourceList
  var selectST= $('input[id="Helper:useItemsInSt"]').is(':checked');
  var selectMain= $('input[id="Helper:useItemsInMain"]').is(':checked');
  table.append('<tr><th width=20%>Actions</th><th>Items</th></tr><tr>' +
    '<td id="buy_result" colspan=2></td></tr>');
  for (var i=0; i < extractInv.items.length;i += 1) {
    item = extractInv.items[i];
    if (selectMain && item.folder_id !== '-1') {continue;}
    if (!selectST && item.is_in_st) {continue;}
    if (item.item_name !== 'Zombie Coffin' &&
      item.type !== '12' &&
      item.type !== '16') {continue;}
    if (calf.resourceList[item.item_id]){
      calf.resourceList[item.item_id].invIDs += ',' +
        item.inv_id;
      calf.resourceList[item.item_id].count += 1;
    } else {
      calf.resourceList[item.item_id] = {'count':1,
        'invIDs':item.inv_id,
        'first_item':item};
    }
  }

  for (id in calf.resourceList) {
    if (!calf.resourceList.hasOwnProperty(id)) {continue;}
    var res=calf.resourceList[id];
    item=res.first_item;
    table.append('<tr><td align=center><span style="cursor:pointer; ' +
      'text-decoration:underline; color:#blue; font-size:x-small;"' +
      ' id="Helper:extractAllSimilar' + id + '" invIDs="' +
      res.invIDs + '">Extract all ' + res.count + '</span></td>' +
      '<td><img src="' + imageServer + '/items/' + 
      item.item_id + '.gif" class="tip-dynamic" data-tipped="' +
      'fetchitem.php?item_id=' + item.item_id + '&inv_id=' +
      item.inv_id + '&t=1&p=' + extractInv.player_id +
      '" border=0>' + '</td><td>'+item.item_name+'</td></tr>');
  }

  for (id in calf.resourceList) {
    if (!calf.resourceList.hasOwnProperty(id)) {continue;}
    document.getElementById('Helper:extractAllSimilar' + id)
      .addEventListener('click', extractAllSimilar, true);
  }
}

function insertQuickExtract(content) { // Hybrid
  if (!content) {content=notebookContent();}
  content.innerHTML='<table width=100%><tr style="background-color:' +
    '#CD9E4B;"><td nobr><b>Quick Extract</b></td></tr></table>' +
    'Select which type of plants you wish to extract all of. Only ' +
    'select extractable resources.<br/><label><input type="checkbox"' +
    ' id="Helper:useItemsInSt" checked /> Select items in ST</label>' +
    '<label><input type="checkbox" id="Helper:useItemsInMain" ' +
    'checked /> Only extract items in Main Folder</label><table ' +
    'width=100% id="Helper:ExtTable"></table>';
  $('[id^="Helper\\:useItemsIn"]').click(showQuickExtract);
  $.getJSON('?cmd=export&subcmd=inventory', showQuickExtract);
}

function showAHInvManager(injectId) { // Bad jQuery
  var output = '<table width=100% cellspacing=2 cellpadding=2>'+
    '<tr><th colspan=5 align=center>Items from ' +
    '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
    'AH Quick Search</a> found in your inventory</td>'+
    '<tr><th>Name</th><th>Nick Name<th>Inv Count</th><th>' +
    'AH Min Price</th><th>AH BuyNow Price</th></tr>';
  var invCount = {};
  var name;
  var key;
  var i;
  var quickSL = getValueJSON('quickSearchList');
  // fill up the Inv Counter
  for (key in calf.itemList) {
    if (!calf.itemList.hasOwnProperty(key)) {continue;}
    name = calf.itemList[key].html
      .match(/<td width="90%">&nbsp;(.*)<\/td>/)[1];
    if (invCount[name]) {
      invCount[name].count+= 1;
    } else {
      invCount[name]={'count':1,'nicknameList':''};
    }
    for (i = 0; i<quickSL.length; i += 1) {
      if (name.indexOf(quickSL[i].searchname) >= 0 &&
        invCount[name]
          .nicknameList
          .indexOf(quickSL[i].nickname) < 0) {
        invCount[name].nicknameList += '<a href=\'index.php?cmd=' +
          'auctionhouse&type=-1&search_text=' +
          quickSL[i].searchname + '\'>' + quickSL[i].nickname +
          '</a> ';
        quickSL[i].found = true;
      }
    }
  }
  // show inv & counter for item with nickname found
  for (key in invCount) {
    if (invCount[key].nicknameList !== '') {
      output += '<tr><td>' + key + '</td><td>' +
        invCount[key].nicknameList + '</td><td>' +
        invCount[key].count +
        '</td><td></td><td></td><td></td></tr>';
    }
  }
  // show item from quick AH search that are not in our inv
  output += '</td></tr><tr><td colspan=5><hr></td></tr>';
  output += '<tr><td>Did not find:</td><td colspan=4>';
  for (i=0; i<quickSL.length; i += 1) {
    if (quickSL[i].displayOnAH && !quickSL[i].found) {
      output += '<a href=\'index.php?cmd=auctionhouse&type=-1&' +
        'search_text=' + quickSL[i].searchname + '\'>' + 
        quickSL[i].nickname+'</a>, ';
    }
  }
  output += '</td></tr><tr><td colspan=5><hr></td></tr>'+
    '<tr><th colspan=5 align=center>Items NOT from ' +
    '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
    'AH Quick Search</a> found in your inventory</td>';
  // show inv & counter for item with nickname NOT found
  for (key in invCount) {
    if (invCount[key].nicknameList === '') {
      output += '<tr><td>' + key + '</td><td>' +
      invCount[key].nicknameList + '</td><td>' +
      invCount[key].count + '</td><td></td><td></td><td></td></tr>';
    }
  }
  output += '</table>';
  $(injectId).html(output);
}

function useProfileInventoryItem(evt) { // Legacy
  if (!window.confirm('Are you sure you want to use/extract the item?')) {
    return;
  }
  var InventoryItemID=evt.target.getAttribute('itemID');
  xmlhttp('index.php?cmd=profile&subcmd=useitem&inventory_id=' +
    InventoryItemID,
    function(responseText) {
      var info = infoBox(responseText);
      if (!info) {info = '<font color=red>Error</font>';}
      evt.target.parentNode.innerHTML = info;
    });
}

function equipProfileInventoryItemReturnMessage(responseText, callback) { // Legacy
  var target = callback.target;
  var info = infoBox(responseText);
  var itemCellElement = target.parentNode;
  if (!info) {
    itemCellElement.innerHTML =
      '<span style="color:green; font-weight:bold;">Worn</span>';
  } else {
    itemCellElement.innerHTML =
      '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
  }
}

function equipProfileInventoryItem(evt) { // Legacy
  var InventoryItemID=evt.target.getAttribute('itemID');
  xmlhttp(
    'index.php?cmd=profile&subcmd=equipitem&inventory_id=' +
    InventoryItemID,
    equipProfileInventoryItemReturnMessage,
    {'item': InventoryItemID, 'target': evt.target});
}

function showQuickWear(callback) { // jQuery
  var key;
  var itemID;
  var output='<div id="invTabs"><ul>'+
    '<li><a href="#invTabs-qw">Quick Wear / Use / Extract <br/>' +
    'Manager</a></li>'+
    '<li><a href="#invTabs-ah">Inventory Manager Counter<br/>' +
    'filtered by AH Quick Search</a></li></ul>'+
    '<div id="invTabs-qw"><table width=100%><tr ' +
    'style="background-color:#CD9E4B;"><td nobr><b>' +
    'Quick Wear / Use / Extract Manager</b></td></tr></table>'+
    '<table width=100%><tr><th width=20%>Actions</th>' +
    '<th colspan=4>Items</th></tr>';
  for (key in calf.itemList) {
    if (!calf.itemList.hasOwnProperty(key)) {continue;}
    itemID=calf.itemList[key].id;
    output+='<tr><td align=center>'+
      '<span style="cursor:pointer; text-decoration:underline; ' +
      'color:#blue; font-size:x-small;" '+
      'id="Helper:equipProfileInventoryItem' + itemID + '" ' +
      'itemID="' + itemID + '">Wear</span>&nbsp;|&nbsp;' +
      '<span style="cursor:pointer; text-decoration:underline; ' +
      'color:#blue; font-size:x-small;" '+
      'id="Helper:useProfileInventoryItem' + itemID + '" ' +
      'itemID="' + itemID + '">Use/Ext</span>'+
      '</td>'+calf.itemList[key].html+'</tr>';
  }
  output+='</table></div><div id="invTabs-ah"></div></div>';
  callback.inject.innerHTML=output;
  for (key in calf.itemList) {
    if (!calf.itemList.hasOwnProperty(key)) {continue;}
    itemID=calf.itemList[key].id;
    document.getElementById('Helper:equipProfileInventoryItem' + itemID)
      .addEventListener('click', equipProfileInventoryItem, true);
    document.getElementById('Helper:useProfileInventoryItem' + itemID)
      .addEventListener('click', useProfileInventoryItem, true);
  }
  $('#invTabs').tabs();
  $('#invTabs').tabs('select', 0);
  showAHInvManager('#invTabs-ah');
}

function retrieveItemInfor(doc) { // jQuery
  $('#pCC input[name="removeIndex[]"]', doc).each(function(){
    var input = $(this);
    input.closest('tr').find('img').attr('width', '30')
      .attr('height', '30');
    var item={
      'id': input.attr('value'),
      'html': input.closest('tr').html().replace(/<input[^>]*>/g, '')
    };
    calf.itemList['id'+item.id]=item;
  });
}

function getItemFromStoreItemPage(responseText, callback) { // Native
  var layout=callback.inject;
  layout.innerHTML+='store item page.';
  var doc=createDocument(responseText);
  if (responseText.indexOf('Store Items') > 0){
    retrieveItemInfor(doc);
  }
  showQuickWear(callback);
}

function getItemFromBackpack(responseText, callback) { // Legacy
  var layout=callback.inject;
  layout.innerHTML+='</br>backpack folder '+(callback.id+1)+', ';
  var doc=createDocument(responseText);
  if (responseText.indexOf('Back to Profile') > 0){
    retrieveItemInfor(doc);
  }

  var folderNodes=findNodes(
    '//a[contains(@href,"cmd=profile&subcmd=dropitems&folder_id=")]',doc);
  if (folderNodes && folderNodes.length > 0 &&
      callback.id < folderNodes.length - 1) {
    xmlhttp(folderNodes[callback.id+1].getAttribute('href'),
      getItemFromBackpack, {'inject':layout,'id':callback.id+1});
  } else {
    xmlhttp(
      '/index.php?cmd=guild&subcmd=inventory&subcmd2=storeitems',
      getItemFromStoreItemPage, callback);
  }
}

function insertQuickWear(content) { // Legacy
  calf.itemList = {};
  if (!content) {content=notebookContent();}
  content.innerHTML='Getting item list from: ';
  xmlhttp('/index.php?cmd=profile&subcmd=dropitems&folder_id=-1',
    getItemFromBackpack, {'inject':content,'id':0});
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
          'auction_id':
            /inv_id=(\d+)/.exec(itemImage.getAttribute('data-tipped'))[1]
        }
      )
    );
  }
  $.when.apply($, prm).done(function() {
    document.getElementById('refresh').click();
  });
}

function injectAuctionHouse() { // Bad jQuery
  if (getValue('autoFillMinBidPrice')) {
    document.getElementById('auto-fill').checked = true;
  }
  document.getElementById('sort0').click();
  var cancelAll = document.createElement('span');
  cancelAll.className = 'smallLink';
  cancelAll.textContent = 'Cancel All';
  var fill = document.getElementById('fill').parentNode.parentNode
    .nextElementSibling.firstElementChild;
  fill.classList.add('fshCenter');
  fill.insertAdjacentHTML('afterbegin', ']');
  fill.insertAdjacentElement('afterbegin', cancelAll);
  fill.insertAdjacentHTML('afterbegin', '[');
  cancelAll.addEventListener('click', cancelAllAH);
}

function injectFindPlayer() { // Bad jQuery
  var findPlayerButton = $('input[value="Find Player"]');
  var levelToTest = intValue($('dt.stat-level:first').next()
    .text());
  var characterVirtualLevel = getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  var pvpLowerLevelModifier = levelToTest > 205 ? 10 : 5;
  var pvpUpperLevelModifier = levelToTest >= 200 ? 10 : 5;
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
    .each(function() {
      var id = /player_id=([0-9]*)/.exec($(this).attr('href'));
      $(this).after('<a style="color:blue;font-size:10px;" ' +
        quickBuffHref(id[1])+'>[b]</a>');
    });
}

function addMarketplaceWarning() { // Legacy
  var amount = findNode('//input[@id="amount"]').value;
  var goldPerPoint = findNode('//input[@id="price"]');
  var warningField = findNode('//td[@id="warningfield"]');
  var sellPrice = goldPerPoint.value;
  if (sellPrice.search(/^[0-9]*$/) !== -1) {
    var warningColor = 'green';
    var warningText =
      '</b><br>This is probably an offer that will please someone.';
    if (sellPrice < 100000) {
      warningColor = 'brown';
      warningText = '</b><br>This is too low ... it just ain"t gonna sell.';
    } else if (sellPrice > 250000) {
      warningColor = 'red';
      warningText = '</b><br>Hold up there ... this is way to high a ' +
        'price ... you should reconsider.';
    }

    warningField.innerHTML = '<span style="color:' + warningColor +
      ';">You are offering to buy <b>' + amount +
      '</b> FSP for >> <b>' + addCommas(sellPrice) +
      warningText + ' (Total: ' +
      addCommas(amount * sellPrice +
      Math.ceil(amount * sellPrice * 0.005)) + ')</span>';
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

function ladder() { // Native
  document.querySelector('#pCC input[type="submit"]')
    .addEventListener('click', function(e) {
      e.preventDefault();
      window.location = 'index.php?cmd=pvpladder&viewing_band_id=' +
        document.querySelector('#pCC select[name="viewing_band_id"]').value;
    });
}

function injectFsBoxContent(content) { // jQuery
  if (!content) {content = notebookContent();}
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
    content = document.createElement('DIV');
    content.id = 'content';
    content.style.display = 'none';
    document.body.appendChild(content);
  }
  var functionPath = evt.target.textContent;
  var fn = functionLookup[functionPath];
  if (typeof fn === 'function') {
    screenview(functionPath);
    fn(content);
  }
  $(content).dialog({ width: 'auto', modal: true });
}

function eventHandler(evt) { // Native
  if (evt.target.classList.contains('fshLink')) {
    callHelperFunction(evt);
    return;
  }
  if (evt.target.classList.contains('a-reply')) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
  }
}

function showHelperMenu() { // Native
  var helperMenu = document.getElementById('helperMenu');
  helperMenu.removeEventListener('mouseenter', showHelperMenu);

  var helperMenuDiv = document.createElement('DIV');
  helperMenuDiv.id = 'helperMenuDiv';
  helperMenuDiv.className = 'helperMenuDiv';
  helperMenuDiv.style.backgroundImage = 'url(' + imageServer +
    '/skin/inner_bg.jpg)';
  helperMenuDiv.insertAdjacentHTML('beforeend', helperMenuBlob);
  helperMenu.appendChild(helperMenuDiv);
  helperMenu.addEventListener('click', function(evt) {
    if (evt.target.id !== 'helperMenu') {return;}
    var menu = evt.target.firstElementChild;
    menu.classList.toggle('showMenuDiv');
  });
  helperMenuDiv.addEventListener('click', eventHandler);
}

function injectHelperMenu() { // Native
  // don't put all the menu code here (but call if clicked) to minimize lag
  var node = document.getElementById('statbar-container');
  if (!node) {return;}
  var helperMenu = document.createElement('DIV');
  helperMenu.id = 'helperMenu';
  helperMenu.className = 'helperMenu';
  if (getValue('keepHelperMenuOnScreen')) {
    helperMenu.classList.add('fshFixed');}
  helperMenu.innerHTML = 'Helper&nbsp;Menu';
  helperMenu.addEventListener('mouseenter', showHelperMenu);
  if (getValue('draggableHelperMenu')) {
    helperMenu.setAttribute('draggable', 'true');
    helperMenu.addEventListener('dragstart', drag_start);
  }
  node.parentNode.insertBefore(helperMenu, node);
}

var buffCheck = '<span class="enemy-buff-check-on"></span>';
var msgButton = '<span class="enemy-send-message guild-icon left ' +
  'guild-minibox-action tip-static" data-tipped="Send Message"></span>';
var buffButton = '<span class="enemy-quickbuff guild-icon left ' +
  'guild-minibox-action tip-static" data-tipped="Quick Buff"></span>';

function contactColor(last_login, type) { // Native
  var out = 'fshWhite';
  var now = Math.floor(Date.now() / 1000);
  if (now - last_login < 120) { // 2 mins
    out = type ? 'fshDodgerBlue' : 'fshRed';
  } else if (now - last_login < 300) { // 5 mins
    out = type ? 'fshLightSkyBlue' : 'fshPaleVioletRed';
  } else {out = type ? 'fshPowderBlue' : 'fshPink';}
  return out;
}

function playerName$1(val, type) { // Native
  return '<a class="player-name tip-static ' +
    contactColor(val.last_login, type) +
    '" data-tipped="<b>' + val.username + '</b><br><table><tbody><tr>' +
    '<td>Level:</td><td>' + val.level + '</td></tr><tr><td>Last ' +
    'Activity:</td><td>' + formatLastActivity(val.last_login) +
    '</td></tr></tbody></table>" href="index.php?cmd=profile&player_id=' +
    val.id + '">' + val.username + '</a>';
}

function secureButton(val) { // Native
  return '<a class="enemy-secure-trade guild-icon left ' +
    'guild-minibox-action tip-static" href="index.php?cmd=trade' +
    '&subcmd=createsecure&target_username=' + val.username +
    '" data-tipped="Secure Trade"></a>';
}

function tradeButton(val) { // Native
  return '<a class="enemy-trade guild-icon left ' +
    'guild-minibox-action tip-static" href="index.php?cmd=trade' +
    '&target_player=' + val.username +
    '" data-tipped="Send Gold/Items/FSP"></a>';
}

function addContact(contactList, type) { // Native
  var now = Math.floor(Date.now() / 1000);
  var output = '';
  contactList.forEach(function(val) {
    if (now - val.last_login > 1800) {return;} // 30 mins
    output += '<li class="player"><div class="player-row">';
    if (!calf.hideBuffSelected) {
      output += buffCheck;
    }
    output += playerName$1(val, type);
    output += '</div><div class="guild-minibox-actions">';
    if (!calf.hideGuildInfoMessage) {
      output += msgButton;
    }
    if (!calf.hideGuildInfoBuff) {
      output += buffButton;
    }
    if (!calf.hideGuildInfoSecureTrade) {
      output += secureButton(val);
    }
    if (!calf.hideGuildInfoTrade) {
      output += tradeButton(val);
    }
    output += '</div></li>';
  });
  return output;
}

function injectAllyEnemyList(data) { // Native
  var allies = data._allies || [];
  var enemies = data._enemies || [];
  if (allies.length + enemies.length === 0 ||
    !calf.enableAllyOnlineList && enemies.length === 0 ||
    !calf.enableEnemyOnlineList && allies.length === 0) {
    return;
  }
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

function resetAllyEnemyList() { // jQuery.min
  myStats(true)
    .done(injectAllyEnemyList);
}

function quickBuffToggle(evt) { // Native
  evt.target.classList.toggle('enemy-buff-check-on');
  evt.target.classList.toggle('enemy-buff-check-off');
}

function sendMsg(evt) { // Native
  window.openQuickMsgDialog(evt.target.parentNode.previousElementSibling
    .lastElementChild.textContent);
}

function enemyBuff(evt) { // Native
  window.openWindow('index.php?cmd=quickbuff&t=' + evt.target.parentNode
    .previousElementSibling.lastElementChild.textContent,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

function selectedBuff() { // Native
  var buffBalls = document.getElementById('fshContactList')
    .getElementsByClassName('enemy-buff-check-on');
  var sendstring = Array.prototype.reduce.call(buffBalls,
    function(prev, curr) {
      prev.push(curr.nextElementSibling.textContent);
      return prev;
    }, []);
  window.openWindow('index.php?cmd=quickbuff&t=' + sendstring.join(),
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

function eventHandler$1(evt) { // Native
  if (evt.target.id === 'fshResetEnemy') {
    resetAllyEnemyList(evt);
    return;
  }
  if (evt.target.classList.contains('enemy-buff-check-on') ||
      evt.target.classList.contains('enemy-buff-check-off')) {
    quickBuffToggle(evt);
    return;
  }
  if (evt.target.classList.contains('enemy-send-message')) {
    sendMsg(evt);
    return;
  }
  if (evt.target.classList.contains('enemy-quickbuff')) {
    enemyBuff(evt);
    return;
  }
  if (evt.target.classList.contains('enemy-quick-buff')) {
    selectedBuff();
  }
}

function makeDiv(data) { // Native
  var fshAllyEnemy = document.createElement('DIV');
  fshAllyEnemy.id = 'fshAllyEnemy';
  fshAllyEnemy.className = 'minibox';
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

function interceptDebuff(e) { // jQuery
  var aLink = e.target;
  if (aLink.tagName === 'IMG') {
    $(e.target).qtip('hide');
    aLink = aLink.parentNode;
  } else if (aLink.tagName !== 'A') {return;}
  e.stopPropagation();
  e.preventDefault();
  if (!getValue('disableDeactivatePrompts')) {
    var onclick = aLink.getAttribute('onclick');
    var warn =
      onclick.match(/Are you sure you wish to remove the .* skill\?/)[0];
    if (!confirm(warn)) {return;}
  }
  var buffId = aLink.getAttribute('href').match(/(\d+)$/)[1];
  debuff(buffId)
    .done(function(data) {
      if (data.response.response === 0) {
        aLink.parentNode.innerHTML = '';
      } else {
        $('#dialog_msg').html(data.response.msg).dialog('open');
      }
    });
}

function fastDebuff() { // jQuery
  var profileRightColumn =
    document.getElementById('profileRightColumn').lastElementChild;
  profileRightColumn.addEventListener('click', interceptDebuff, true);
}

function totalAllyEnemy(target, numberOfContacts, contactsTotal) { // Native
  target.insertAdjacentHTML('beforeend', '<span class="fshBlue">' + '&nbsp;' +
    numberOfContacts + (contactsTotal && contactsTotal >= numberOfContacts ?
    '/' + contactsTotal : '') + '</span>');
}

function findAllyEnemy(el){ // Native
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

function profileParseAllyEnemy() { // Native
  // Allies/Enemies count/total function
  Array.prototype.forEach.call(
    document.querySelectorAll('#profileLeftColumn strong'), findAllyEnemy);
}

function backpackRemove(invId) { // jQuery
  invId = parseInt(invId, 10);
  var theBackpack = $('#backpackContainer').data('backpack');
  // remove from srcData
  theBackpack.srcData.some(function(el, i, ary) {
    if (el.a === invId) {
      ary.splice(i, 1);
      return true;
    }
  });
}

function fastWearUse(evt) { // jQuery
  var InventoryItemID = evt.target.getAttribute('itemID');
  useItem(InventoryItemID).done(function(data) {
    if (data.r !== 0) {return;}
    backpackRemove(InventoryItemID);
    evt.target.parentNode.innerHTML = '<span class="fastWorn">Used</span>';
  });
}

function fastWearEquip(e) { // jQuery
  var self = e.target;
  var invId = self.getAttribute('itemid');
  equipItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    backpackRemove(invId);
    // TODO Insert item from worn
    self.parentNode.innerHTML = '<span class="fastWorn">Worn</span>';
  });
}

function fastWearLinks() { // Native
  var bpTabs = document.getElementById('backpack_tabs');
  var type = bpTabs.getElementsByClassName('tab-selected')[0]
    .getAttribute('data-type');
  var items = document.querySelectorAll('#backpackTab_' + type +
    ' .backpackContextMenuEquippable,.backpackContextMenuUsable');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, function(theSpan) {
    var toUse = theSpan.classList.contains('backpackContextMenuUsable');
    var myDiv = document.createElement('DIV');
    myDiv.className = 'fastDiv';
    myDiv.insertAdjacentHTML('beforeend', '<span class="' +
      (toUse ? 'fastUse': 'fastWear') + '" itemid="' +
      theSpan.getAttribute('data-inv') + '">' +
      (toUse ? 'Use': 'Wear') + '</span>&nbsp;');
    if (theSpan.parentNode.nextElementSibling) {
      myDiv.appendChild(
        theSpan.parentNode.nextElementSibling.nextElementSibling);
    }
    theSpan.parentNode.parentNode.appendChild(myDiv);
  });
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

var compPages;
var componentList = {};

function delAllComponent() { // Native
  var invTbl = document.getElementById('profileRightColumn')
    .getElementsByClassName('inventory-table')[1];
  var nodeList = invTbl.getElementsByClassName('compDelBtn');
  Array.prototype.forEach.call(nodeList, function(el) {
    el.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
}

function retriveComponent(responseText, currentPage) { // Native
  var nextPage = currentPage + 1;
  var sumComp = document.getElementById('sumComp');
  sumComp.insertAdjacentHTML('beforeend', nextPage + ', ');
  var doc = createDocument(responseText);
  var invTbl = doc.getElementById('profileRightColumn')
    .getElementsByClassName('inventory-table')[1];
  var nodeList = invTbl.getElementsByTagName('IMG');
  Array.prototype.forEach.call(nodeList, function(el) {
    var mouseover = el.getAttribute('data-tipped');
    var id = mouseover.match(/fetchitem.php\?item_id=(\d+)/)[1];
    componentList[id] = componentList[id] || {
        'count': 0,
        'src': el.getAttribute('src'),
        'onmouseover': mouseover
      };
    componentList[id].count += 1;
  });
  if (currentPage < compPages - 1) {
    $.get('index.php?cmd=profile&component_page=' + nextPage)
      .done(function(data) {retriveComponent(data, nextPage);});
  } else {
    var totalCount = invTbl.querySelectorAll(
      'td[background$="inventory/1x1mini.gif"]');
    totalCount = totalCount.length + currentPage * 50;
    var output = 'Component Summary<br/><table>';
    var usedCount = 0;
    Object.keys(componentList).forEach(function(id) {
      var comp=componentList[id];
      output += '<tr><td align=center><img src="' + comp.src +
        '" class="tip-dynamic" data-tipped="' + comp.onmouseover +
        '"></td><td>' + comp.count + '</td></tr>';
      usedCount += comp.count;
    });
    output += '<tr><td align=center>Total:</td><td>' + usedCount + ' / ' +
      totalCount + '</td></tr></table>';
    sumComp.innerHTML = output;
  }
}

function countComponent(e) { // jQuery
  var invTbl = document.getElementById('profileRightColumn')
    .getElementsByClassName('inventory-table')[1];
  var compPage = invTbl.querySelectorAll(
    'a[href^="index.php?cmd=profile&component_page="]');
  compPages = compPage.length;
  e.target.parentNode.innerHTML = 'Retrieve page: ';
  $.get('index.php?cmd=profile&component_page=0')
    .done(function(data) {retriveComponent(data, 0);});
}

function delComponent(evt) { // jQuery
  var href = evt.target.previousElementSibling.getAttribute('href');
  $.get(href).done(function(data) {
    var response = infoBox(data);
    if (response === 'Component destroyed.') {
      evt.target.parentNode.innerHTML = '';
    } else {
      $('#dialog_msg').html(response).dialog('open');
    }
  });
}

function enableDelComponent() { // Native
  document.getElementById('compDel').parentNode.classList.add('fshHide');
  document.getElementById('compDelAll').parentNode.classList
    .remove('fshHide');
  var nodeList = document.getElementById('profileRightColumn')
    .getElementsByClassName('inventory-table')[1]
    .getElementsByTagName('IMG');
  Array.prototype.forEach.call(nodeList, function(el) {
    el.parentNode.parentNode.insertAdjacentHTML('beforeend',
      '<span class="compDelBtn">Del</span>');
  });
}

function profileComponents() { // Native
  var invTables = document.getElementById('profileRightColumn')
    .getElementsByClassName('inventory-table');
  if (invTables.length !== 2) {return;}
  var compDiv = invTables[1].parentNode;
  if (compDiv.style.display !== 'block') {return;}
  compDiv.insertAdjacentHTML('beforeend', '<div class="fshCenter">' +
    '<div>[<span id="compDel" class="sendLink">Enable Quick Del</span>]' +
    '</div>' +
    '<div id="sumComp">[<span id="compSum" class="sendLink">Count Components</span>]' +
    '</div>' +
    '<div>[<a class="fshBlue" href="index.php?cmd=notepad&blank=1' +
    '&subcmd=quickextract">Quick Extract Components</a>]</div>' +
    '<div class="fshHide">[<span id="compDelAll" class="sendLink">' +
    'Delete All Visible</span>]</div>' +
    '</div>');
  compDiv.addEventListener('click', function(e) {
    if (e.target.id === 'compDel') {enableDelComponent(e);}
    if (e.target.id === 'compSum') {countComponent(e);}
    if (e.target.id === 'compDelAll') {delAllComponent(e);}
    if (e.target.classList.contains('compDelBtn')) {delComponent(e);}
  });
}

var buffCost = {'count': 0, 'buffs': {}};
var bioEditLines;

function expandBio() { // Native
  var bioExpander = document.getElementById('fshBioExpander');
  bioExpander.textContent =
    bioExpander.textContent === 'More ...' ? 'Less ...' : 'More ...';
  document.getElementById('fshBioHidden').classList.toggle('fshHide');
}

function compressBio() { // Native
  var bioCell = document.getElementById('profile-bio'); // new interface logic
  if (!bioCell) {return;} // non-self profile
  var bioContents = bioCell.innerHTML;
  var maxCharactersToShow = getValue('maxCompressedCharacters');
  var maxRowsToShow = getValue('maxCompressedLines');
  var numberOfLines = bioContents.substr(0, maxCharactersToShow)
    .split(/<br>\n/).length - 1;
  if (bioContents.length <= maxCharactersToShow &&
      numberOfLines < maxRowsToShow) {return;}
  if (numberOfLines >= maxRowsToShow) {
    var startIndex = 0;
    while (maxRowsToShow > 0) {
      maxRowsToShow -= 1;
      startIndex = bioContents.indexOf('<br>\n', startIndex + 1);
    }
    maxCharactersToShow = startIndex;
  }

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
    '<span id="fshBioExpander" class="reportLink">More ...</span><br>' +
    '<span class="fshHide" id="fshBioHidden">' + extraOpenHTML + bioEnd +
    '</span>';
  // addClickListener('fshBioExpander', expandBio);
  document.getElementById('fshBioExpander').addEventListener('click', expandBio);
}

function getBuffsToBuy() { // Legacy
  if (buffCost.count === 0) {return;}
  var targetPlayer = document.getElementById('pCC')
    .getElementsByTagName('h1');
  if (targetPlayer.length !== 0) {
    targetPlayer = targetPlayer[0].textContent;
  } else {
    targetPlayer = playerName();
  }
  var buffsToBuy = Object.keys(buffCost.buffs).join(', ');
  var greetingText = getValue('buyBuffsGreeting').trim();
  var hasBuffTag = greetingText.indexOf('{buffs}') !== -1;
  var hasCostTag = greetingText.indexOf('{cost}') !== -1;
  greetingText = greetingText.replace(/{playername}/g, targetPlayer);
  if (!hasBuffTag) {
    greetingText += ' ' + buffsToBuy;
  } else {
    if (!hasCostTag) {
      greetingText = greetingText
        .replace(/{buffs}/g, '`~' + buffsToBuy + '~`');
    } else {
      greetingText = greetingText
        .replace(/{buffs}/g, '`~' + buffsToBuy + '~`')
        .replace(/{cost}/g, buffCost.buffCostTotalText);
    }
  }
  window.openQuickMsgDialog(targetPlayer, greetingText, '');
}

function updateBuffCost() { // Legacy
  if (buffCost.count > 0) {
    var total = {'k': 0, 'fsp': 0, 'stam': 0, 'unknown': 0};
    var html='This is an estimated cost based on how the script finds ' +
      'the cost associated with buffs from viewing bio.'+
      'It can be incorrect, please use with discretion.<br/><hr/>'+
      '<table border=0>';
    Object.keys(buffCost.buffs).forEach(function(buff) {
      total[buffCost.buffs[buff][1]] += buffCost.buffs[buff][0];
      html += '<tr><td>' + buff + '</td><td>: ' + buffCost.buffs[buff][0] +
        buffCost.buffs[buff][1] + '</td></tr>';
    });
    var totalText = total.fsp > 0 ? Math.round(total.fsp * 100) / 100 +
      ' FSP' : '';
    if (total.fsp > 0 && total.k > 0) {totalText += ' and ';}
    totalText += total.k > 0 ? total.k + ' k' : '';

    if (total.stam > 0 && (total.fsp > 0 || total.k > 0)) {
      totalText += ' and ';}
    totalText += total.stam > 0 ? total.stam + ' Stam(' +
      Math.round(total.stam / 25 * 10) / 10 + 'fsp)' : '';

    if (total.unknown > 0) {
      totalText += ' (' + total.unknown + ' buff(s) with unknown cost)';
    }
    html += '</table><b>Total: ' + totalText + '</b>';
    document.getElementById('buffCost').innerHTML = '<br/><span ' +
      'class="tip-static" data-tipped="' + html + '">Estimated Cost: <b>' +
      totalText + '</b></span>';
    buffCost.buffCostTotalText = totalText;
  } else {
    document.getElementById('buffCost').innerHTML = '';
    buffCost.buffCostTotalText = '';
  }
}

function toggleBuffsToBuy(evt) { // Legacy
  // This is also called by bio preview
  var newtext;
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
    var text = '';
    // get the whole line from the buff name towards the end (even after 
    // the ',', in case of 'AL, Lib, Mer: 10k each'
    while (node && node.nodeName.toLowerCase() !== 'br') {
      newtext = node.textContent;
      node = node.nextSibling;
      text += newtext;
    }
    var price = text.replace(/[^a-zA-Z0-9.,+\- ]/g, '').toLowerCase()
      .match(/([+\-]{0,1}[\.\d]+ *k)|([+\-]{0,1}[\.\d]+ *fsp)|([+\-]{0,1}[\.\d]+ *stam)/);
    if (!price) { // some players have prices BEFORE the buff names
      node = buffNameNode;
      while (node && node.nodeName.toLowerCase() !== 'br') {
        newtext = node.textContent;
        node = node.previousSibling;
        text = newtext + text;
      }
      price = text.replace(/[^a-zA-Z0-9.,+\- ]/g, '').toLowerCase()
        .match(/([+\-]{0,1}[\.\d]+ *k)|([+\-]{0,1}[\.\d]+ *fsp)|([+\-]{0,1}[\.\d]+ *stam)/);
    }
    var type;
    var cost;
    if (price) {
      type = price[0].indexOf('k') > 0 ? 'k' : price[0].indexOf('f') > 0 ? 'fsp' : 'stam';
      cost = price[0].match(/([+\-]{0,1}[\.\d]+)/)[0];
    } else {
      type = 'unknown';
      cost = '1';
    }
    buffCost.buffs[buffName] = [parseFloat(cost),type];
    buffCost.count += 1;
  } else {
    buffCost.count -= 1;
    delete buffCost.buffs[buffName];
  }
  updateBuffCost();
}

function bioEvtHdl(e) { // Native
  if (e.target.classList.contains('buffLink')) {
    toggleBuffsToBuy(e);
    return;
  }
  if (e.target.id === 'fshSendBuffMsg') {
    getBuffsToBuy(e);
    return;
  }
  var buffNameNode = e.target;
  while (buffNameNode.tagName &&
      buffNameNode.tagName.toLowerCase() !== 'span') {
    buffNameNode = buffNameNode.parentNode;
  }
  if (buffNameNode.classList &&
      buffNameNode.classList.contains('buffLink')) {
    toggleBuffsToBuy(e);
    return;
  }
}

function bioPreview() { // Native
  var textArea = document.getElementById('textInputBox');
  var bioPreviewHTML = convertTextToHtml(textArea.value);
  textArea.parentNode.insertAdjacentHTML('beforeend', '<div>' +
    '<table align="center" width="325" border="1">' +
    '<tbody><tr><td style="text-align:center;color:#7D2252;' +
    'background-color:#CD9E4B">Preview</td></tr><tr>' +
    '<td align="left" width="325"><span id="biopreview">' +
    bioPreviewHTML + '</span></td></tr></tbody></table></div>');
}

function bioWords() { // Native
  //Add description text for the new tags
  document.getElementById('pCC').insertAdjacentHTML('beforeend', '<div>' +
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

function changeHeight() { // Native
  var theBox = document.getElementById('fshLinesToShow');
  var boxVal = parseInt(theBox.value, 10);
  if (isNaN(boxVal) || boxVal < '1' || boxVal > '99') {return;}
  bioEditLines = boxVal;
  setValue('bioEditLines', boxVal);
  document.getElementById('textInputBox').rows = bioEditLines;
}

function bioHeight() { // Native
  var bioEditLinesDiv = document.createElement('DIV');
  bioEditLinesDiv.insertAdjacentHTML('beforeend',
    ' Display <input id="fshLinesToShow"' +
    ' type="number" min="1" max="99" value="' +
    bioEditLines + '"/> Lines ');
  var saveLines = document.createElement('INPUT');
  saveLines.className = 'custombutton';
  saveLines.value = 'Update Rows To Show';
  saveLines.type = 'button';
  saveLines.addEventListener('click', changeHeight);
  bioEditLinesDiv.appendChild(saveLines);
  document.getElementById('pCC').appendChild(bioEditLinesDiv);
}

function renderBio(bioContents) {
  bioContents = bioContents.replace(/\{b\}/g,'`~').replace(/\{\/b\}/g,'~`');
  var buffs = bioContents.match(/`~([^~]|~(?!`))*~`/g);
  if (!buffs) {return;}
  buffs.forEach(function(buff, i) {
    var fullName = buff.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g,'');
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

function profileRenderBio(self) { // Native
  var bioCell = document.getElementById('profile-bio');
  if (bioCell && (self && getValue('renderSelfBio') ||
      !self && getValue('renderOtherBios'))) {
    var bioContents = bioCell.innerHTML;
    bioContents = renderBio(bioContents);
    if (bioContents) {
      bioCell.innerHTML = bioContents;
    }
  }
  if (getValue('enableBioCompressor')) {compressBio();}
  bioCell.addEventListener('click', bioEvtHdl);
}

function updateBioCharacters() { // Native
  var textArea = document.getElementById('textInputBox');
  var previewArea = document.getElementById('biopreview');
  var bioContents = convertTextToHtml(textArea.value);
  bioContents = renderBio(bioContents);
  if (bioContents) {
    previewArea.innerHTML = bioContents;
  }
}

function injectBioWidgets() { // Native
  bioEditLines = getValue('bioEditLines');
  var textArea = document.getElementById('textInputBox');
  bioPreview();
  bioWords();
  bioHeight();
  textArea.rows = bioEditLines;
  textArea.classList.add('fshNoResize');

  textArea.parentNode.addEventListener('click', bioEvtHdl);
  textArea.addEventListener('keyup', updateBioCharacters);
  //Force the preview area to render
  updateBioCharacters();
}

var guildId$1;
var currentGuildRelationship;
var guildMessages = {
  self: {'color': 'fshGreen',
    'message': 'Member of your own guild!'},
  friendly: {'color': 'fshOliveDrab',
    'message': 'Do not attack - Guild is friendly!'},
  old: {'color': 'fshDarkCyan',
    'message': 'Do not attack - You\'ve been in that guild once!'},
  enemy: {'color': 'fshRed',
    'message': 'Enemy guild. Attack at will!'}
};

function quickWearLink() { // Native
  // quick wear manager link
  var node = document.querySelector('#profileRightColumn ' +
    'a[href="index.php?cmd=profile&subcmd=togglesection&section_id=2"]');
  if (!node) {return;}
  node.parentNode.insertAdjacentHTML('beforeend',
    '&nbsp;[<a href="/index.php?cmd=notepad&blank=1&subcmd=quickwear" ' +
    'class="fshBlue">Quick&nbsp;Wear</a>]');
}

function profileSelectAll() { // Native
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
    el.dispatchEvent(new MouseEvent('click', {bubbles: true,
      ctrlKey: true, metaKey: true}));
  });
}

function selectAllLink() { // Native
  //select all link
  var node = document.querySelector('#profileRightColumn' +
    ' a[href="index.php?cmd=profile&subcmd=dropitems"]');
  if (!node) {return;}
  var allSpan = document.createElement('SPAN');
  allSpan.className = 'smallLink';
  allSpan.textContent = 'All';
  allSpan.addEventListener('click', profileSelectAll);
  var wrapper = document.createElement('SPAN');
  wrapper.insertAdjacentHTML('beforeend', '[&nbsp;');
  wrapper.appendChild(allSpan);
  wrapper.insertAdjacentHTML('beforeend', '&nbsp;]&nbsp;');
  node.parentNode.appendChild(wrapper);
}

function storeVL() { // Native
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

function guildRelationship(txt) { // Native
  var output;
  var guildSelf = getValue('guildSelf') || '';
  var guildFrnd = getValue('guildFrnd') || '';
  var guildPast = getValue('guildPast') || '';
  var guildEnmy = getValue('guildEnmy') || '';
  guildSelf = guildSelf.toLowerCase().replace(/\s*,\s*/, ',')
    .replace(/\s\s*/g, ' ').split(',');
  guildFrnd = guildFrnd.toLowerCase().replace(/\s*,\s*/, ',')
    .replace(/\s\s*/g, ' ').split(',');
  guildPast = guildPast.toLowerCase().replace(/\s*,\s*/, ',')
    .replace(/\s\s*/g, ' ').split(',');
  guildEnmy = guildEnmy.toLowerCase().replace(/\s*,\s*/, ',')
    .replace(/\s\s*/g, ' ').split(',');
  txt = txt.toLowerCase().replace(/\s\s*/g, ' ');
  if (guildSelf.indexOf(txt) !== -1) {output = 'self';} else
  if (guildFrnd.indexOf(txt) !== -1) {output = 'friendly';} else
  if (guildPast.indexOf(txt) !== -1) {output = 'old';} else
  if (guildEnmy.indexOf(txt) !== -1) {output = 'enemy';}
  return output;
}

function profileInjectGuildRel() { // Native
  var aLink = document.querySelector(
    '#pCC a[href^="index.php?cmd=guild&subcmd=view&guild_id="]');
  if (!aLink) {return;}
  var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.getAttribute('href'));
  if (guildIdResult) {guildId$1 = parseInt(guildIdResult[1], 10);}
  currentGuildRelationship = guildRelationship(aLink.text);
  if (currentGuildRelationship) {
    aLink.parentNode.classList.add(
      guildMessages[currentGuildRelationship].color);
    aLink.parentNode.insertAdjacentHTML('beforeend', '<br>' +
      guildMessages[currentGuildRelationship].message);
  }
}

function profileInjectQuickButton(avyImg, playerid, playername) { // Native
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

function removeStatTable(el) { // Native
  var tde = el.getElementsByTagName('td');
  el.parentNode.innerHTML = tde[0].innerHTML.replace(/&nbsp;/g, ' ') +
    '<div class="profile-stat-bonus">' +
    tde[1].textContent + '</div>';
}

function updateStatistics() { // Native
  var charStats = document.getElementById('profileLeftColumn')
    .getElementsByTagName('table')[0];
  var dodgyTables = charStats.getElementsByTagName('table');
  Array.prototype.forEach.call(dodgyTables, removeStatTable);
}

function injectProfile() { // Native
  var avyImg = document
    .querySelector('#profileLeftColumn img[oldtitle*="\'s Avatar"]');
  if (!avyImg) {return;}
  var playername = document.getElementById('pCC')
    .getElementsByTagName('h1')[0].textContent;
  var self = playername === playerName();
  if (self) {
    // self inventory
    fastDebuff();
    profileParseAllyEnemy();
    injectFastWear();
    profileComponents();
    quickWearLink();
    selectAllLink();
    storeVL();
  }
  // Must be before profileInjectQuickButton
  profileInjectGuildRel();
  // It sets up guildId and currentGuildRelationship
  var playerid = getUrlParameter('player_id') || playerId();
  profileInjectQuickButton(avyImg, playerid, playername);

  //************** yuuzhan having fun
  if (playername === 'yuuzhan') {
    avyImg.setAttribute('src',
      'http://evolutions.yvong.com/images/tumbler.gif');
    avyImg.addEventListener('click', function(){alert('Winner!');});
  }
  //**************

  updateHCSQuickBuffLinks('#profileRightColumn a[href*="quickbuff"]');
  updateStatistics();
  profileRenderBio(self);
  addStatTotalToMouseover();
  add(3, colouredDots);
}

function changeCombatSet(responseText, itemIndex) { // Native
  var doc = createDocument(responseText);

  var cbsSelect = doc.querySelector(
    '#profileCombatSetDiv select[name="combatSetId"]');

  // find the combat set id value
  var allItems = cbsSelect.getElementsByTagName('option');
  if (itemIndex >= allItems.length) {return;}
  var cbsIndex = allItems[itemIndex].value;

  $.ajax({
    type: 'POST',
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'managecombatset',
      combatSetId: cbsIndex,
      submit: 'Use'
    },
    success: function() {
      localStorage.setItem('hcs.nav.openIndex', '2');
      location.href = 'index.php?cmd=profile';
    }
  });
}

var maxcharacters;
var textArea;
var shoutboxPreview;
var warehouse = [];

function updateShoutboxPreview() { // Native
  var textContent = textArea.value;
  var chars = textContent.length;
  if (chars > maxcharacters) {
    textContent = textContent.substring(0, maxcharacters);
    textArea.value = textContent;
    chars = maxcharacters;
  }
  if (!shoutboxPreview) {
    shoutboxPreview = textArea.parentNode.parentNode.parentNode.parentNode
      .insertRow().insertCell();
  }
  shoutboxPreview.innerHTML = '<table class="sbpTbl"><tbody><tr>' +
    '<td class="sbpHdr">Preview (' + chars + '/' + maxcharacters +
    ' characters)</td></tr><tr><td class="sbpMsg"><span>' + textContent +
    '</span></td></tr></tbody></table>';
}

function injectShoutboxWidgets() { // Native
  textArea = document.getElementById('textInputBox');
  textArea.classList.add('fshNoResize');
  textArea.addEventListener('keyup', updateShoutboxPreview);
}

function newsFsbox() { // Native
  maxcharacters = 100;
  injectShoutboxWidgets();
}

function newsShoutbox() { // Native
  maxcharacters = 150;
  injectShoutboxWidgets();
}

function closestHead(el) { // Native
  if (el.classList.contains('news_head') ||
      el.classList.contains('news_head_tavern')) {
    return el;
  }
  if (el.classList.contains('news_left_column')) {return;}
  return closestHead(el.parentNode);
}

function newsEvt(evt) { // jQuery
  var newsHead = closestHead(evt.target);
  if (!newsHead) {return;}
  var newsBody = newsHead.nextElementSibling;
  var _class = newsHead.classList.contains('news_head_tavern') ?
    '.news_body_tavern' : '.news_body';
  if (!$(newsBody).data('open')) {
    evt.preventDefault();
    $(_class).hide().data('open', false);
    $(newsBody).show().data('open', true);
  } else {
    if (evt.target.tagName !== 'A') {
      $(newsBody).hide().data('open', false);
    }
  }
  evt.stopPropagation();
}

function fixCollapse() { // Native
  var newsCol = document.getElementsByClassName('news_left_column');
  if (newsCol.length !== 1) {return;}
  newsCol[0].addEventListener('click', newsEvt, true);
}

function injectHomePageTwoLink() { // Native
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
}

function collapseArt(article) { // Native
  article.rows.forEach(function(el) {
    el.row.classList.add('fshHide');
  });
  article.open = false;
}

function collapseAll() { // Native
  warehouse.forEach(function(article) {
    if (article.open) {collapseArt(article);}
  });
}

function expandArt(article) { // Native
  collapseAll();
  article.rows.forEach(function(el) {el.row.classList.remove('fshHide');});
  article.open = true;
}

function closestTr(el) { // Native
  if (el.tagName === 'TR') {
    if (el.rowIndex % 6 === 0) {return el;} else {return;}
  }
  if (el.tagName === 'TABLE') {return;}
  return closestTr(el.parentNode);
}

function evtHdl(evt) { // Native
  var myRow = closestTr(evt.target);
  if (!myRow) {return;}
  var articleNo = myRow.rowIndex / 6;
  var article = warehouse[articleNo];
  if (article.open === false) {
    expandArt(article);
  } else {
    collapseArt(article);
  }
}

function doTagging(row) { // Native
  var rowType = row.rowIndex % 6;
  var articleNo = (row.rowIndex - rowType) / 6;
  warehouse[articleNo] = warehouse[articleNo] || {};
  warehouse[articleNo].open = false;
  warehouse[articleNo].rows = warehouse[articleNo].rows || [];
  if (rowType === 0) {row.classList.add('buffLink');}
  if (rowType > 1) {
    warehouse[articleNo].rows[rowType] = warehouse[articleNo][rowType] || {};
    warehouse[articleNo].rows[rowType].row = row;
    row.classList.add('fshHide');
  }
}

function viewArchive() { // Native
  var myTable = document.getElementById('pCC').getElementsByTagName('table')[2];
  Array.prototype.forEach.call(myTable.rows, doTagging);
  myTable.addEventListener('click', evtHdl);
}

function showMsgTemplate() { // jQuery
  var targetPlayer=$('#quickMsgDialog_targetUsername').text();
  $('#msgTemplateDialog').remove();

  // template displayed
  var html='<div id=msgTemplateDialog title="Choose Msg Template" ' +
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
  $(':button','#msgTemplate').button();
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
  $( '#msgTemplate' ).selectable({
    filter: 'li.ui-widget-content',
    stop: function() {
      if ($('.add-button.ui-selected').length > 0) {return;} // click on add row
      if ($('.ui-selected').length === 0) {return;} // nothing selected yet
      $('#quickMsgDialog_msg').val($('#quickMsgDialog_msg').val() +
        $('#msgTemplate .ui-selected').text()+'\n');
      $('#msgTemplateDialog').dialog('close');
    }
  });

  // show the template form
  $('#msgTemplateDialog').dialog({'buttons':{
    'Manage':function() {
      $('.del-button').toggle();
      $('.add-button').toggle();
    },
    'Cancel':function() {
      $('#msgTemplateDialog').dialog('close');
      $('#msgTemplateDialog').remove();
    }
  }});
}

function openQuickMsgDialog(name, msg, tip) { // jQuery
  if (!calf.template) {
    calf.template = getValueJSON('quickMsg');
    var buttons = $('#quickMessageDialog').dialog('option','buttons');
    buttons.Template = showMsgTemplate;
    $('#quickMessageDialog').dialog('option','buttons',buttons);
  }
  $('#quickMsgDialog_targetUsername').html(name);
  $('#quickMsgDialog_targetPlayer').val(name);
  if (!msg) {msg = '';}
  $('#quickMsgDialog_msg').val(msg);
  $('#quickMsgDialog_msg').removeAttr('disabled');
  if (!tip) {tip='';}
  $('.validateTips').text(tip);
  $('#quickMessageDialog').dialog('open');
}

function injectQuickMsgDialogJQ() { // Native
  window.openQuickMsgDialog = openQuickMsgDialog;
}

/* jshint latedef: nofunc */
var activeBountyListPosted;

function resetBountyList() { // Native
  setValueJSON('bountyList', null);
  location.reload();
}

function injectBountyList(bountyList) { // Native
  setValueJSON('bountyList', bountyList);
  var injectHere = document
    .getElementById('Helper:BountyListPlaceholder');
  var displayList = document.createElement('TABLE');
  displayList.cellPadding = 1;
  displayList.width = 125;

  var aRow = displayList.insertRow(0); //bountyList.rows.length
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
  }
  else {
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
  var breaker=document.createElement('BR');
  injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
  injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
  document.getElementById('Helper:resetBountyList')
    .addEventListener('click', resetBountyList, true);
}

function resetWantedList() { // Legacy
  setValueJSON('wantedList', null);
  location.reload();
}

function injectWantedList(wantedList) { // Legacy
  setValueJSON('wantedList', wantedList);
  var injectHere = document
    .getElementById('Helper:WantedListPlaceholder');
  var displayList = document.createElement('TABLE');
  displayList.cellPadding = 3;
  displayList.width = 125;

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
  }
  else {
    for (var i = 0; i < wantedList.bounty.length; i += 1) {
      var mouseOverText = '"<div style=\'text-align:center;width:' +
        '205px;\'>Target Level:  ' + wantedList.bounty[i].lvl +
        '<br/>Offerer: ' + wantedList.bounty[i].offerer +
        '<br/>Reward: ' + wantedList.bounty[i].reward + ' ' +
        wantedList.bounty[i].rewardType +
        '<br/>XP Loss Remaining: ' + wantedList.bounty[i].xpLoss +
        '<br/>Posted: ' + wantedList.bounty[i].posted +
        '<br/>Tickets Req.:  ' + wantedList.bounty[i].tickets;
      mouseOverText += '</div>" ';

      output += '<li style="padding-bottom:0px;margin-left:5px;">';
      output += '<a style= "font-size:10px;';
      if (wantedList.bounty[i].accept) {
        output += 'color:rgb(0,255,0); cursor:pointer; ' +
          'text-decoration:underline blink;" title = "Accept ' +
          'Bounty" onclick="' + wantedList.bounty[i].accept +
          '">[a]</a>&nbsp;';
      } else {
        output += 'color:red;" href="' + server +
          'index.php?cmd=attackplayer&target_username=' +
          wantedList.bounty[i].target + '">[a]</a>&nbsp;';
      }
      output += '<a style="color:#A0CFEC;font-size:10px;"href="j' +

        'avascript:openQuickMsgDialog(\'' + wantedList.bounty[i].target +
        '\');' +

        '">[m]</a> &nbsp;<a class="tip-static" data-tipped=' +
        mouseOverText +
        'style="color:#FFF380;font-size:10px;" href="' +
        wantedList.bounty[i].link + '">' +
        wantedList.bounty[i].target +'</a></li>';
    }
  }

  aCell.innerHTML = output;
  var breaker=document.createElement('BR');
  injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
  injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
  document.getElementById('Helper:resetWantedList')
    .addEventListener('click', resetWantedList);
}

function getWantedBountyList(doc, callback) { // Legacy
  var page = findNode('//input[@name="page"]', doc, $('body'));
  var curPage = parseInt(page.value,10);
  var maxPage = page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1];
  var activeTable = findNode('//table[@width = "630" and ' +
    'contains(.,"Target")]', doc);
  var wantedNames = getValue('wantedNames');
  var wantedArray = wantedNames.split(',');
  var wantedList = callback.wantedList;
  if (activeTable) {
    for (var i = 1; i < activeTable.rows.length - 2; i+=2) {
      var target = activeTable.rows[i].cells[0].firstChild
        .firstChild.firstChild.textContent;
      if (target === '[ No bounties available. ]') {break;}
      for (var j = 0; j < wantedArray.length; j += 1) {
        if (target === wantedArray[j].trim() || wantedArray.indexOf('*') !== -1) {
          wantedList.wantedBounties = true;
          var bounty = {};
          bounty.target = target;
          bounty.link = activeTable.rows[i].cells[0]
            .firstChild.firstChild.getAttribute('href');
          bounty.lvl = activeTable.rows[i].cells[0]
            .firstChild.firstChild.nextSibling.textContent
              .replace(/\[/, '').replace(/\]/, '');
          bounty.offerer = activeTable.rows[i].cells[1]
            .firstChild.firstChild.firstChild.textContent;
          bounty.reward = activeTable.rows[i].cells[2]
            .textContent;
          bounty.rewardType = activeTable.rows[i].cells[2]
            .firstChild.firstChild.firstChild.firstChild
            .nextSibling.firstChild.title;
          bounty.xpLoss = activeTable.rows[i].cells[3]
            .textContent;
          bounty.posted = activeTable.rows[i].cells[4]
            .textContent;
          bounty.tickets = activeTable.rows[i].cells[5]
            .textContent;
          if (activeTable.rows[i].cells[6].textContent
            .trim() === '[active]') {
            bounty.active = true;
            bounty.accept = '';
          }
          else if (activeTable.rows[i].cells[6].textContent
            .trim() !== '[n/a]') { // TODO
            bounty.active = false;
            bounty.accept = activeTable.rows[i].cells[6]
              .firstChild.firstChild
              .getAttribute('onclick');
          }
          wantedList.bounty.push(bounty);
        }
      }
    }
  }
  if (curPage < maxPage) {
    xmlhttp('index.php?cmd=bounty&page=' + (curPage + 1),
      parseBountyPageForWorld, {wantedList:wantedList});
  } else {
    injectWantedList(wantedList);
  }
}

function getActiveBountyList(doc) { // Legacy
  var activeTable = findNode('//table[@width = 620]', doc);
  var bountyList = {};
  bountyList.bounty = [];
  bountyList.isRefreshed = true;
  bountyList.lastUpdate = new Date();

  if (activeTable) {
    if (!/No bounties active/.test(activeTable.rows[1].cells[0]
      .innerHTML)) {
      bountyList.activeBounties = true;
      for (var i = 1; i < activeTable.rows.length - 2; i+=2) {
        var bounty = {};
        bounty.target = activeTable.rows[i].cells[0].firstChild
          .firstChild.firstChild.textContent;
        bounty.link = activeTable.rows[i].cells[0].firstChild
          .firstChild.getAttribute('href');
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
    }
    else {
      bountyList.activeBounties = false;
    }
  }
  injectBountyList(bountyList);
  activeBountyListPosted = true;
}

function parseBountyPageForWorld2(details, callback) { // Native
  var doc = createDocument(details);
  var enableActiveBountyList = calf.enableActiveBountyList;
  var enableWantedList = calf.enableWantedList;
  setValue('bwNeedsRefresh', false);
  if (enableWantedList) {
    getWantedBountyList(doc, callback);
  }
  if (enableActiveBountyList &&
      !activeBountyListPosted) {
    getActiveBountyList(doc);
  }
}

function parseBountyPageForWorld(details, callback) { // Native
  add(3, parseBountyPageForWorld2, [details, callback]);
}

function retrieveBountyInfo(enableActiveBountyList, enableWantedList) { // Legacy
  var bountyList = getValueJSON('bountyList');
  var wantedList = getValueJSON('wantedList');
  var bountyListRefreshTime = getValue('bountyListRefreshTime');
  var bwNeedsRefresh = getValue('bwNeedsRefresh');

  bountyListRefreshTime *= 1000;
  if (!bwNeedsRefresh) {
    if (bountyList) {
      if (Date.now() -
        bountyList.lastUpdate.getTime() >
        bountyListRefreshTime) {
        bwNeedsRefresh = true; // invalidate cache
      }
    }
    if (wantedList && !bwNeedsRefresh) {
      if (Date.now() -
        wantedList.lastUpdate.getTime() >
        bountyListRefreshTime) {
        bwNeedsRefresh = true; // invalidate cache
      }
    }
  }

  if (!bountyList || !wantedList || bwNeedsRefresh &&
    (enableActiveBountyList || enableWantedList)) {
    wantedList = {};
    wantedList.bounty = [];
    wantedList.isRefreshed = true;
    wantedList.lastUpdate = new Date();
    wantedList.wantedBounties = false;
    activeBountyListPosted = false;

    xmlhttp(
      'index.php?cmd=bounty&page=1',
      parseBountyPageForWorld,
      {wantedList:wantedList}
    );
  } else {
    if (enableWantedList) {
      wantedList.isRefreshed = false;
      injectWantedList(wantedList);
    }
    if (enableActiveBountyList) {
      bountyList.isRefreshed = false;
      injectBountyList(bountyList);
    }
  }
}

function prepareBountyData() { // jQuery
  if (calf.enableWantedList) {
    $('#pCR').prepend('<div class="minibox"><span id="Helper:' +
      'WantedListPlaceholder"></span></div>');
  }
  if (calf.enableActiveBountyList) {
    $('#pCR').prepend('<div class="minibox"><span id="Helper:' +
      'BountyListPlaceholder"></span></div>');
  }
  retrieveBountyInfo(
    calf.enableActiveBountyList,
    calf.enableWantedList);
}

function doSendGold() { // jQuery
  $.ajax({
    url: 'index.php',
    data: {
      cmd : 'trade',
      subcmd: 'sendgold',
      xc: window.ajaxXC,
      target_username: $('#HelperSendTo').html(),
      gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g,'')
    }
  }).done(function(data) {
    var info = infoBox(data);
    if (info === 'You successfully sent gold!' || info === '') {
      setValue('currentGoldSentTotal',
        parseInt(getValue('currentGoldSentTotal'), 10) +
        parseInt(getValue('goldAmount'), 10));
      GameData.fetch(387);
    }
  });
}

function injectSendGoldOnWorld() { // jQuery
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
  $('#HelperSendTotal')
    .html(getValue('currentGoldSentTotal')
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
  if (parseInt(data.player.gold, 10) >
    getValue('goldAmount')){
    $('#statbar-gold').css('background-color','red');
  }else{
    $('#statbar-gold').css('background-color','inherit');
  }
}

var wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|' +
  'Gut Rot Head Splitter|Serum');
var spinner = '<span class="guildReportSpinner" style="background-image: ' +
  'url(\'' + imageServer + '/skin/loading.gif\');"></span>';
var headerCount;
var headers;
var counter;
var nodeArray;
var nodeList;
var findUser;
var foundUser;

function hideOthers() { // Native
  var limit = performance.now() + 5;
  while (performance.now() < limit && counter < nodeList.length) {
    var el = nodeList[counter];

    if (el.firstChild.hasAttribute('bgcolor')) {
      if (el.firstChild.firstElementChild.textContent === findUser) {
        foundUser = true;
      } else {foundUser = false;}
    }
    if (!foundUser) {
      el.className = 'fshHide';
    }

    counter += 1;
  }
  if (counter < nodeList.length) {
    add(2, hideOthers);
  }
}

function searchUser() { // Native
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

function recallItem$1(evt) { // jQuery
  $(evt.target).qtip('hide');
  var mode = evt.target.getAttribute('mode');
  var theTd = evt.target.parentNode.parentNode;
  if (mode === '0') {theTd = theTd.parentNode;}
  var href = theTd.firstElementChild.getAttribute('href');
  queueRecallItem({
    invId: href.match(/&id=(\d+)/)[1],
    playerId: href.match(/&player_id=(\d+)/)[1],
    mode: mode,
    action: evt.target.getAttribute('action')})
    .done(function(data){
      if (data.r === 1) {return;}
      theTd.innerHTML = '<span class="fastWorn">' +
        'You successfully recalled the item</span>';
    });
  theTd.innerHTML = spinner;
}

function wearItem(evt) { // jQuery
  $(evt.target).qtip('hide');
  var theTd = evt.target.parentNode.parentNode.parentNode;
  var href = theTd.firstElementChild.getAttribute('href');
  equipItem(href.match(/&id=(\d+)/)[1]).done(function(data){
    if (data.r === 1) {return;}
    theTd.innerHTML = '<span class="fastWorn">Worn</span>';
  });
  theTd.innerHTML = spinner;
}

function eventHandlers(evt) { // Native
  if (evt.target.classList.contains('recall')) {
    recallItem$1(evt);
    return;
  }
  if (evt.target.classList.contains('equip')) {
    wearItem(evt);
    return;
  }
  if (evt.target.classList.contains('a-reply')) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
  }
}

function paintHeader() { // Native
  var limit = performance.now() + 10;
  while (performance.now() < limit && headerCount < headers.length) {
    var el = headers[headerCount];
    var oldhtml = el.textContent;
    el.innerHTML = onlineDot({
      last_login: calf.membrList[oldhtml].last_login}) +
      '<a href="index.php?cmd=profile&player_id=' +
      calf.membrList[oldhtml].id + '">' + oldhtml +
      '</a> [ <span class="a-reply fshLink" target_player=' +
      oldhtml + '>m</span> ]';
    headerCount += 1;
  }
  if (headerCount < headers.length) {
    add(3, paintHeader);
  }
}

function reportHeader() { // Native
  headers = document.querySelectorAll('#pCC table table ' +
    'tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b');
  headerCount = 0;
  add(3, paintHeader);
}

function paintChild() { // Native
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

function mySpan(el) { // Native
  var inject = document.createElement('span');
  var secondHref = el.children.length === 2;
  var firstHref = secondHref ? '': ' class="fshHide"';
  var itemName = el.previousElementSibling.innerHTML;
  var wearable = wearRE.test(itemName) ?
    ' class="fshHide"' : '';
  var equipable = secondHref ? 'recall': 'equip';
  inject.innerHTML = '<span' + firstHref +
    '> | <span class="reportLink recall tip-static" data-tipped="' +
    'Click to recall to backpack" mode="0" action="recall">Fast BP' +
    '</span></span>' +
    ' | <span class="reportLink recall tip-static" ' +
    'data-tipped="Click to recall to guild store" mode="1" ' +
    'action="recall">Fast GS</span>' +
    '<span' + wearable +
    '> | <span class="reportLink ' +
    equipable +
    '" mode="0" action="wear">Fast Wear</span></span>';
  return inject;
}

function makeSpan() { // Native
  var limit = performance.now() + 10;
  while (performance.now() < limit && counter < nodeList.length) {
    var el = nodeList[counter];
    if (counter === 0) {
      el.previousSibling.setAttribute('width', '200px');
      el.setAttribute('width', '370px');
    } else {
      el.previousSibling.removeAttribute('width');
      el.removeAttribute('width');
    }
    nodeArray.push(mySpan(el));
    counter += 1;
  }
  if (counter < nodeList.length) {
    add(3, makeSpan);
  } else {
    counter = 0;
    add(3, paintChild);
  }
}

function prepareChildRows() { // Native
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
  document.getElementById('pCC').getElementsByTagName('TABLE')[1]
    .addEventListener('click', eventHandlers);
}

var newSummary = {};
var advisorColumns = [
  {title: '<div class="fshBold">Member</div>'},
  {title: '<div class="fshBold">Lvl</div>', class: 'dt-center'},
  {title: '<div class="fshBold">Rank</div>', class: 'dt-center dt-nowrap'},
  {title: '<div class="fshBold">Gold From Deposits</div>',
    class: 'dt-center'},
  {title: '<div class="fshBold">Gold From Tax</div>', class: 'dt-center'},
  {title: '<div class="fshBold">Gold Total</div>', class: 'dt-center'},
  {title: '<div class="fshBold">FSP</div>', class: 'dt-center'},
  {title: '<div class="fshBold">Skill Cast</div>', class: 'dt-center'},
  {title: '<div class="fshBold">Group Create</div>', class: 'dt-center'},
  {title: '<div class="fshBold">Group Join</div>', class: 'dt-center'},
  {title: '<div class="fshBold">Relic</div>', class: 'dt-center'},
  {title: '<div class="fshBold">XP Contrib</div>', class: 'dt-center'}
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

function summaryLink() { // Native
  var updateInput = document.getElementById('pCC')
    .getElementsByClassName('custombutton');
  if (!updateInput) {return;}
  updateInput[0].insertAdjacentHTML('afterend', '<span> <a href="index.php' +
    '?cmd=guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>');
}

/*
function injectAdvisorDable() {

  var advisorTable = document.getElementById('pCC').firstElementChild
    .firstElementChild.lastElementChild.firstElementChild.firstElementChild;

  // for (var i = advisorTable.attributes.length - 1; i >= 0; i--){
    // advisorTable.removeAttribute(advisorTable.attributes[i].name);
  // }

  // Array.prototype.forEach.call(advisorTable.rows, function(row) {
    // Array.prototype.forEach.call(row.cells, function(cell) {
      // cell.removeAttribute('align');
      // cell.removeAttribute('bgcolor');
      // cell.removeAttribute('class');
      // cell.removeAttribute('width');
      // var oldChild = cell.removeChild(cell.firstElementChild);
      // cell.textContent = oldChild.textContent.trim().replace(/,/g, '');
    // });
  // });


  var tBody = advisorTable.firstElementChild;

  var firstRow = tBody.firstElementChild;
  firstRow.innerHTML = firstRow.innerHTML.replace(/td/g, 'th');
  var lastRow = tBody.lastElementChild;

  var myHead = advisorTable.createTHead();
  myHead.appendChild(firstRow);

  var myFoot = advisorTable.createTFoot();
  myFoot.appendChild(lastRow);

  var wrapperDiv = document.createElement('DIV');
  wrapperDiv.id = 'fshWrapper';

  advisorTable.parentNode.appendChild(wrapperDiv);
  wrapperDiv.appendChild(advisorTable);

  // advisorTable.parentNode.removeChild(advisorTable);
  // wrapperDiv.innerHTML =
    // '<table><thead>' +
    // '<tr><th>member</th><th>depo</th></tr>' +
    // '</thead><tbody>' +
    // '<tr><td>1</td><td>2</td></tr>' +
    // '<tr><td>3</td><td>4</td></tr>' +
    // '</tbody></table>';
  // document.body.innerHTML = '';
  // document.body.appendChild(wrapperDiv);

  console.log('fshWrapper', wrapperDiv); // DEV Only
  var dable = new Dable(wrapperDiv);

  dable.style = 'bootstrap';
  dable.UpdateStyle();

}
*/

function injectAdvisorNew(m) { // Native

  time('guildAdvisor.injectAdvisorNew');

  list = document.getElementById('pCC').getElementsByTagName('TABLE')[1];
  if (!list) {return;}
  var totalRow = list.firstElementChild.lastElementChild;
  var totalCell = totalRow.firstElementChild;
  totalCell.className = 'fshRight';
  totalCell.setAttribute('colspan', '3');
  var tfoot = document.createElement('TFOOT');
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
    tdOne.innerHTML = '<a href="index.php?cmd=profile&player_id=' +
      m[username].id + '">' +
      username + '</a>';
    tdOne.insertAdjacentHTML('afterend', '<td>' + m[username].level +
      '</td><td><div class="fshAdvRank">' + m[username].rank_name +
      '</div></td>');
  });
  list.insertAdjacentElement('beforeend', tfoot);
  add(3, doTable);
  summaryLink();

  timeEnd('guildAdvisor.injectAdvisorNew');

}

function returnAdvisorPage(data) { // Native
  /* jshint validthis: true */
  var e = this.period;

  time('guildAdvisor.returnAdvisorPage' + e);

  list.lastElementChild.insertAdjacentHTML('beforeend', ' day ' + e + ',');
  var doc = createDocument(data);
  var table = doc.getElementById('pCC').firstElementChild
    .firstElementChild.lastElementChild.firstElementChild.firstElementChild;
  var tr = table.rows;
  Array.prototype.forEach.call(tr, function(el) {
    var tds = el.cells;
    var member = tds[0].textContent.trim();
    if (member === 'Member') {return;}
    newSummary[member] = newSummary[member] || {};
    newSummary[member].deposit = (newSummary[member].deposit || 0) +
      intValue(tds[1].textContent);
    newSummary[member].tax = (newSummary[member].tax || 0) +
      intValue(tds[2].textContent);
    newSummary[member].total = (newSummary[member].total || 0) +
      intValue(tds[3].textContent);
    newSummary[member].fsp = (newSummary[member].fsp || 0) +
      intValue(tds[4].textContent);
    newSummary[member].skills = (newSummary[member].skills || 0) +
      intValue(tds[5].textContent);
    newSummary[member].grpCrt = (newSummary[member].grpCrt || 0) +
      intValue(tds[6].textContent);
    newSummary[member].grpJoin = (newSummary[member].grpJoin || 0) +
      intValue(tds[7].textContent);
    newSummary[member].relics = (newSummary[member].relics || 0) +
      intValue(tds[8].textContent);
    newSummary[member].contrib = (newSummary[member].contrib || 0) +
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
    },
    period: e
  }).done(returnAdvisorPage);
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

function addAdvisorPages() { // Native
  Object.keys(newSummary).forEach(function(f) {
    if (f === 'Total:') {return;}
    data.push([
      !membrList[f] ? f : '<a href="index.php?cmd=profile&player_id=' +
        membrList[f].id + '">' + f + '</a>',
      !membrList[f] ? '' : membrList[f].level,
      !membrList[f] ? '' : '<div class="fshAdvRank">' +
        membrList[f].rank_name + '</div>',
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
  });
  add(3, displayAdvisor);
}

function injectAdvisorWeekly() { // jQuery

  time('guildAdvisor.injectAdvisorWeekly');

  list = document.getElementById('pCC').firstElementChild
    .firstElementChild.lastElementChild.firstElementChild.firstElementChild;
  if (!list) {return;}
  list.innerHTML = '<span class="fshSpinner" style="background-image: ' +
    'url(\'' + imageServer +
    '/world/actionLoadingSpinner.gif\');"></span>' +
    '<span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span>';

  $.when(
    getMembrList(false)
      .done(function(data) {
        membrList = data;
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

function injectAdvisor() { // Native
  if (calf.subcmd2 === 'weekly') {
    injectAdvisorWeekly();
  } else {
    getMembrList(false).done(function(membrList) {
      add(3, injectAdvisorNew, [membrList]);
      // task.add(3, injectAdvisorDable, [membrList]);
    });
  }
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

function testQuant$1() { // Native
  return testQuant(document.getElementById('buy_amount').value);
}

function select(evt) { // Native
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

function quantity() { // Native
  var theValue = testQuant$1();
  if (theValue) {
    document.getElementById('quantity').textContent = theValue;
  }
}

function done(responseText) { // Native
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

function injectBazaar() { // Native
  var pCC = document.getElementById('pCC');
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

var maxGroupSizeToJoin;

function parseMercStats(responseText) { // jQuery
  var attackRE = /<td>Attack:<\/td><td>(\d+)<\/td>/;
  var defenseRE = /<td>Defense:<\/td><td>(\d+)<\/td>/;
  var armorRE = /<td>Armor:<\/td><td>(\d+)<\/td>/;
  var damageRE = /<td>Damage:<\/td><td>(\d+)<\/td>/;
  var hpRE = /<td>HP:<\/td><td>(\d+)<\/td>/;
  var mercPage = createDocument(responseText);
  var mercElements = $('#pCC img[src*="/merc/"][data-tipped]',
    mercPage);
  var totalMercAttack = 0;
  var totalMercDefense = 0;
  var totalMercArmor = 0;
  var totalMercDamage = 0;
  var totalMercHP = 0;
  var merc;
  for (var i = 0; i < mercElements.length; i += 1) {
    merc = mercElements[i];
    var mouseoverText = $(merc).data('tipped');
    var mercAttackValue = attackRE.exec(mouseoverText)[1] * 1;
    totalMercAttack += mercAttackValue;
    var mercDefenseValue = defenseRE.exec(mouseoverText)[1] * 1;
    totalMercDefense += mercDefenseValue;
    var mercArmorValue = armorRE.exec(mouseoverText)[1] * 1;
    totalMercArmor += mercArmorValue;
    var mercDamageValue = damageRE.exec(mouseoverText)[1] * 1;
    totalMercDamage += mercDamageValue;
    var mercHPValue = hpRE.exec(mouseoverText)[1] * 1;
    totalMercHP += mercHPValue;
  }
  var attackValue = $('#fshAtk');
  attackValue.html(addCommas(intValue(
    attackValue.text()) - Math.round(totalMercAttack * 0.2)));
  var defenseValue = $('#fshDef');
  defenseValue.html(addCommas(intValue(
    defenseValue.text()) - Math.round(totalMercDefense * 0.2)));
  var armorValue = $('#fshArm');
  armorValue.html(addCommas(intValue(
    armorValue.text()) - Math.round(totalMercArmor * 0.2)));
  var damageValue = $('#fshDam');
  damageValue.html(addCommas(intValue(
    damageValue.text()) - Math.round(totalMercDamage * 0.2)));
  var hpValue = $('#fshHP');
  hpValue.html(addCommas(intValue(
    hpValue.text()) - Math.round(totalMercHP * 0.2)));
}

function injectGroupStats() { // jQuery
  var attackValueElement = $('#stat-attack');
  attackValueElement.html(
    '<span class="fshBlue">' + attackValueElement.text() + '</span>' +
    ' ( <span id="fshAtk">' + attackValueElement.text() + '</span> )'
  );
  var defenseValueElement = $('#stat-defense');
  defenseValueElement.html(
    '<span class="fshBlue">' + defenseValueElement.text() + '</span>' +
    ' ( <span id="fshDef">' + defenseValueElement.text() + '</span> )'
  );
  var armorValueElement = $('#stat-armor');
  armorValueElement.html(
    '<span class="fshBlue">' + armorValueElement.text() + '</span>' +
    ' ( <span id="fshArm">' + armorValueElement.text() + '</span> )'
  );
  var damageValueElement = $('#stat-damage');
  damageValueElement.html(
    '<span class="fshBlue">' + damageValueElement.text() + '</span>' +
    ' ( <span id="fshDam">' + damageValueElement.text() + '</span> )'
  );
  var hpValueElement = $('#stat-hp');
  hpValueElement.html(
    '<span class="fshBlue">' + hpValueElement.text() + '</span>' +
    ' ( <span id="fshHP">' + hpValueElement.text() + '</span> )'
  );
  xmlhttp('index.php?cmd=guild&subcmd=mercs', parseMercStats);
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

function joinAllGroupsUnderSize() { // Legacy
  var joinButtons = findNodes(
    '//img[contains(@src,"skin/icon_action_join.gif")]');
  if (!joinButtons) {return;}
  var prm = [];
  for (var i = 0; i < joinButtons.length; i += 1) {
    var joinButton = joinButtons[i];
    var memList = joinButton.parentNode.parentNode.parentNode
      .previousSibling.previousSibling.previousSibling.previousSibling;
    var memListArrayWithMercs = memList.innerHTML.split(',');
    var memListArrayWithoutMercs = memListArrayWithMercs
      .filter(filterMercs);
    if (memListArrayWithoutMercs.length < maxGroupSizeToJoin) {
      var groupID = /javascript:confirmJoin\((\d+)\)/.exec(
        joinButton.parentNode.getAttribute('href'))[1];
      var groupJoinURL = 'index.php?cmd=guild&subcmd=groups&subcmd2=join' +
        '&group_id=' + groupID;
      prm.push(joinGroup(groupJoinURL, joinButton));
    }
  }
  $.when.apply($, prm).done(function() {
    location.href = 'index.php?cmd=guild&subcmd=groups';
  });
}

function parseGroupData(responseText, linkElement) { // Legacy
  var attackValue;
  var defenseValue;
  var armorValue;
  var damageValue;
  var hpValue;
  var doc=createDocument(responseText);
  var allItems = doc.getElementsByTagName('TD');

  for (var i=0;i<allItems.length;i += 1) {
    var anItem=allItems[i];
    if (anItem.innerHTML === '<font color="#333333">Attack:&nbsp;</font>'){
      var attackLocation = anItem.nextSibling;
      attackValue = attackLocation.textContent;
    }
    if (anItem.innerHTML === '<font color="#333333">Defense:&nbsp;</font>'){
      var defenseLocation = anItem.nextSibling;
      defenseValue = defenseLocation.textContent;
    }
    if (anItem.innerHTML === '<font color="#333333">Armor:&nbsp;</font>'){
      var armorLocation = anItem.nextSibling;
      armorValue = armorLocation.textContent;
    }
    if (anItem.innerHTML === '<font color="#333333">Damage:&nbsp;</font>'){
      var damageLocation = anItem.nextSibling;
      damageValue = damageLocation.textContent;
    }
    if (anItem.innerHTML === '<font color="#333333">HP:&nbsp;</font>'){
      var hpLocation = anItem.nextSibling;
      hpValue = hpLocation.textContent;
    }
  }
  var extraText = '<table cellpadding="1" style="font-size:x-small; ' +
    'border-top:2px black solid; border-spacing: 1px; ' +
    'border-collapse: collapse;">';
  extraText += '<tr>';
  extraText += '<td style="color:brown;">Attack</td><td align="right">' +
    attackValue + '</td>';
  extraText += '<td style="color:brown;">Defense</td><td align="right">' +
    defenseValue + '</td></tr>';
  extraText += '<tr>';
  extraText += '<td style="color:brown;">Armor</td><td align="right">' +
    armorValue + '</td>';
  extraText += '<td style="color:brown;">Damage</td><td align="right">' +
    damageValue + '</td></tr>';
  extraText += '<tr>';
  extraText += '<td style="color:brown;">HP</td><td align="right">' +
    hpValue + '</td>';
  extraText += '<td colspan="2"></td></tr>';
  extraText += '</table>';
  var expiresLocation = linkElement.parentNode.parentNode.previousSibling
    .previousSibling;
  expiresLocation.innerHTML += extraText;
}

function fetchGroupData() { // Legacy
  var calcButton = findNode('//input[@id="fetchgroupstats"]');
  calcButton.style.display = 'none';
  var allItems = findNodes(
    '//a[contains(@href,"index.php?cmd=guild&subcmd=groups' +
    '&subcmd2=viewstats&group_id=")]/img');
  for (var i=0; i<allItems.length; i += 1) {
    xmlhttp(allItems[i].parentNode.getAttribute('href'),
      parseGroupData, allItems[i].parentNode);
  }
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
    .addEventListener('click', fetchGroupData, true);

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
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    'Local: ' + groupDate.toString().substr(0,21)+'</span>');
}

function doGroupRow(e, m) { // jQuery
  var creator = $('b', e).text();
  var td = $('td', e).first();
  var inject = '';
  if (m[creator]) {
    inject += onlineDot({last_login: m[creator].last_login}) +
      '&nbsp;<a href="' + server +
      'index.php?cmd=profile&player_id=' + m[creator].id + '">' + td.html() +
      '</a>' + ' [' + m[creator].level + ']';
  } else {inject += td.html();}
  var td2 = $('td', e).eq(1);
  var theList = td2.html();
  var listArr = theList.split(', ');
  if (listArr.length > 1) {
    listArr.sort(function(a, b) {
      return (m[b] ? m[b].level : 0) - (m[a] ? m[a].level : 0);
    });
  }
  var countMembers = 0;
  var buffList = [];
  listArr.forEach(function(v, i, a) {
    if (v.indexOf('<font') !== -1) {return;}
    countMembers += 1;
    buffList[Math.floor(i / 16)] = buffList[Math.floor(i / 16)] || [];
    buffList[Math.floor(i / 16)].push(v);
    if (!m[v]) {return;}
    a[i] = ' <a href="index.php?cmd=profile&player_id=' +
      m[v].id + '">' + v + '</a>';
  });
  buffList.forEach(function(v, i) {
    inject += '<br><a href=\'' + buffAllHref(v) +
      '\'><span style="color:blue; font-size:x-small;" title="Quick ' +
      'buff functionality from HCS only does 16">Buff ' +
      places[i] + ' 16</span></a>';
  });
  td.html(inject + '<br><span style="font-size:x-small;">Members: ' +
    countMembers + '</span>');
  td2.html('<span>' + listArr.join(', ') + '</span>');
  groupLocalTime($('td', e).eq(2));
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

var ranks;
var myRank;
var theRows;
var rankCount;
var characterRow;

function parseRankData(responseText) { // Native
  /* jshint validthis: true */
  // Makes a weighted calculation of available permissions and gets tax rate
  var doc = createDocument(responseText);
  var checkBoxes = doc.querySelectorAll(
    '#pCC input[type="checkbox"]:checked');
  var count = 0;
  Array.prototype.forEach.call(checkBoxes, function(checkbox) {
    var privName = checkbox.nextElementSibling.textContent.trim();
    if (privName === 'Bank Withdraw' ||
      privName === 'Build/Upgrade/Demolish Structures' ||
      privName === 'Can Un-Tag Items') {
      count += 5;
    } else if (privName === 'Build/Upgrade Structures' ||
      privName === 'Can Kick Members') {
      count += 4;
    } else if (privName === 'Can Mass Messages') {
      count += 0.5;
    } else if (privName === 'Take Items' ||
      privName === 'Can Recall Tagged Items') {
      count += 0.2;
    } else if (privName === 'Store Items' ||
      privName === 'Can View Advisor') {
      count += 0.1;
    } else {
      count+= 1;
    }
  });
  var taxRate = doc.querySelector('#pCC input[name="rank_tax"]').value;
  var linkElement = this.linkElement;
  linkElement.insertAdjacentHTML('afterbegin', '<span class="fshBlue">(' +
    Math.round(10*count)/10 + ') Tax:(' + taxRate + '%)</span> ');
}

function fetchRankData() { // jQuery
  var calcButton = document.getElementById('getrankweightings');
  calcButton.classList.add('fshHide');
  var allItems = document.querySelectorAll('#pCC input[value="Edit"]');
  Array.prototype.forEach.call(allItems, function(anItem) {
    var targetNode = anItem.parentNode.parentNode.previousElementSibling;
    var href = /window\.location='(.*)';/.exec(anItem
      .getAttribute('onclick'))[1];
    $.ajax({url: href, linkElement: targetNode}).done(parseRankData);
  });
}

function ajaxifyRankControls(evt) { // jQuery
  var val = evt.target.getAttribute('value');
  if (val !== 'Up' && val !== 'Down') {return;}
  evt.stopPropagation();
  var onclickHREF = /window.location=\'(.*)\';/
    .exec(evt.target.getAttribute('onclick'))[1];
  var thisRankRow = evt.target.parentNode.parentNode.parentNode;
  var thisRankRowNum = thisRankRow.rowIndex;
  var targetRowNum = thisRankRowNum + (val === 'Up' ? -1 : 2);
  var parentTable = thisRankRow.parentNode;
  if (characterRow >= Math.min(thisRankRowNum, targetRowNum) ||
      targetRowNum < 1 ||
      targetRowNum > parentTable.rows.length) {return;}
  $.get(onclickHREF);
  var injectRow = parentTable.rows[targetRowNum];
  parentTable.insertBefore(thisRankRow, injectRow);
  window.scrollBy(0, val === 'Up' ? -22 : 22);
}

function doButtons() { // Native
  // gather rank info button
  var weightButton = document.createElement('input');
  weightButton.id = 'getrankweightings';
  weightButton.className = 'custombutton';
  weightButton.setAttribute('type', 'button');
  weightButton.setAttribute('value', 'Get Rank Weightings');
  weightButton.addEventListener('click', fetchRankData);
  var theTd = document.getElementById('show-guild-founder-rank-name')
    .parentNode;
  theTd.insertAdjacentHTML('beforeend', '&nbsp;');
  theTd.insertAdjacentElement('beforeend', weightButton);

  if (getValue('ajaxifyRankControls')) {
    document.getElementById('pCC').addEventListener('click',
      ajaxifyRankControls, true);
  }
}

function paintRanks() { // Native
  var limit = performance.now() + 10;
  while (performance.now() < limit &&
      rankCount < theRows.length) {
    var el = theRows[rankCount];
    var rankCell = el.firstElementChild;
    var rankName = rankCell.textContent;
    if (ranks[rankName]) { // has members
      if (rankName === myRank) {
        characterRow = rankCount; // limit for ajaxify later
      }
      rankCell.insertAdjacentHTML('beforeend', ' <span class="fshBlue">- ' +
        ranks[rankName].join(', ') + '</span>');
    }
    rankCount += 1;
  }
  if (rankCount < theRows.length) {
    add(3, paintRanks);
  }
}

function getRanks(membrList) { // Native
  ranks = Object.keys(membrList).reduce(function(prev, curr) {
    if (curr !== 'lastUpdate') {
      var rankName = membrList[curr].rank_name;
      prev[rankName] = prev[rankName] || [];
      prev[rankName].push(curr);
    }
    return prev;
  }, {});
  myRank = membrList[playerName()].rank_name;
  theRows = document.getElementById('pCC').firstElementChild
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

/* jshint latedef: nofunc */
var options;
var showQuickDropLinks;
var showQuickSendLinks;
var theInv;
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
  //' Composed: <input id="fshComposed" item="15" type="checkbox"/>' +
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
  '<td colspan="2"><input id="fshEpic" item="106" type="checkbox" checked/></td>' +
  '</tr>' +
  '</table>';
var inventoryCheckAll = {
  '0': 1, '1': 1, '2': 1, '3': 1, '4': 1,
  '5': 1, '6': 1, '7': 1, '8': 1, '9': 1,
  '10': 1, '11': 1, '12': 1, '13': 1,
  '14': 1, '15': 1, '16': 1, '100': 1,
  '101': 1, '102': 1, '103': 1, '104': 1,
  '105': 1, '106': 1
};
var itemType = ['Helmet', 'Armor', 'Gloves', 'Boots', 'Weapon', 'Shield',
  'Ring', 'Amulet', 'Rune', 'Quest Item', 'Potion', 'Component',
  'Resource', 'Recipe', 'Container', 'Composed', 'Frag Stash'];
var craftHash = {
  Perfect    : {abbr: 'Perf', colour: '#00b600', index: 8},
  Excellent  : {abbr:  'Exc', colour: '#f6ed00', index: 7},
  'Very Good': {abbr:   'VG', colour: '#f67a00', index: 6},
  Good       : {abbr: 'Good', colour: '#f65d00', index: 5},
  Average    : {abbr:  'Ave', colour: '#f64500', index: 4},
  Poor       : {abbr: 'Poor', colour: '#f61d00', index: 3},
  'Very Poor': {abbr:  'VPr', colour: '#b21500', index: 2},
  Uncrafted  : {abbr:  'Unc', colour: '#666666', index: 1}
};

function doSpinner() { // jQuery
  $('#pCC').html('<span id="fshInvMan"><img src = "' +
  imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
    'Getting inventory data...</span>');
}

function rekeyMembrList() { // Native
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

function decorate() { // Native
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

function lvlFilter() { // jQuery
  /* Custom filtering function which will search data in column 2 between two values */
  $.fn.dataTable.ext.search.push(
    function(_settings, data) {
      var min = options.fshMinLvl;
      var max = options.fshMaxLvl;
      var level = intValue(data[1]); // use data for the level column
      if (level === 0 ||
        isNaN(min) && isNaN(max) ||
        isNaN(min) && level <= max ||
        min <= level && isNaN(max) ||
        min <= level && level <= max )
      {return true;}
      return false;
    }
  );
}

function typeFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      return !options.checkedElements ||
        options.checkedElements[data.type] ?
        true : false;
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
        data.stats.set_id !== '-1' ?
        true : false;
    }
  );
}

function rarityFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      var rarity$$1 = (parseInt(data.rarity, 10) + 100).toString();
      return !options.checkedElements ||
        options.checkedElements[rarity$$1] ?
        true : false;
    }
  );
}

function headers$1() { // jQuery
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

function setChecks() { // Native
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

function nameRender(data, type, row) { // Native
  if (type !== 'display') {return data;}
  var cur = theInv.player_id ?
    theInv.player_id :
    theInv.current_player_id;
  var t = row.player_id === -1 ? 4 : 1;
  var p = theInv.player_id ?
    theInv.player_id :
    row.player_id !== -1 ? row.player_id :
    theInv.guild_id;
  var bold = row.equipped ? '<b>' + data + '</b>' : data;
  var setName = row.stats && row.stats.set_name !== '' ?
    ' (<span class="fshLink setName" set="' + row.stats.set_name +
    '">set</span>)' : '';
  return '<a href="index.php?cmd=auctionhouse&search_text=' + data +
    '" class="fshInvItem tip-dynamic ' +
    rarity[row.rarity].clas + '" ' +
    'data-tipped="fetchitem.php?item_id=' + row.item_id +
    '&inv_id=' + row.inv_id + '&t=' + t + '&p=' + p +
    '&currentPlayerId=' + cur + '"' + '>' +
    bold + '</a>' + setName;
}

function whereData(row) { // Native
  return row.folder_id || row.player_id;
}

function whereRender(data, type, row) { // Native
  if (row.folder_id) {
    return row.equipped ? -2 : parseInt(row.folder_id, 10);
  }
  return row.player_id === -1 ? '~' :
    calf.membrList[row.player_id].username;
}

function whereRenderDisplay(data, type, row) { // Native
  if (row.player_id) {
    return row.player_id === -1 ? 'GS' :
      '<a class="fshMaroon" href="index.php?cmd=profile&player_id=' +
      row.player_id + '">' +
      calf.membrList[row.player_id].username + '</a>';
  }
  if (row.equipped) {return 'Worn';}
  var folderSelect = '<select class="moveItem" data-inv="' + row.inv_id +
    '">';
  var keysArray = Object.keys(theInv.folders)
    .sort(function(a, b) {return a - b;});
  keysArray.forEach(function(value) {
    folderSelect += '<option value="' + value + '"' +
      (value === row.folder_id ? ' selected' : '') + '>' +
      theInv.folders[value] + '</option>';
  });
  folderSelect += '</select>';
  return folderSelect;
}

function whereRenderFilter(data, type, row) { // Native
  if (row.player_id) {
    return row.player_id === -1 ? 'GS' :
      calf.membrList[row.player_id].username;
  }
  if (row.equipped) {return 'Worn';}
  return theInv.folders[row.folder_id];
}

function craftRender(craft) { // Native
  return craftHash[craft] ? craftHash[craft].abbr : '';
}

function durabilityRender(data, type, row) { // Native
  if (parseInt(row.max_durability, 10) > 0) {
    return Math.ceil(row.durability / row.max_durability * 100);
  }
}

function bpRender(where, type, row) { // Native
  if (row.folder_id || row.player_id ===
    theInv.current_player_id) {return;}
  if (type !== 'display') {return 'BP';}
  if (row.player_id === -1) {
    return '<span class="fshLink takeItem" invid="' + row.inv_id +
      '" action="take">BP</span>';
  }
  return '<span class="fshLink recallItem" invid="' + row.inv_id +
    '" playerid="' + row.player_id +
    '" mode="0" action="recall">BP</span>';
}

function gsRender(_data, type, row) { // Native
  if (row.player_id && row.player_id !== -1 ||
    row.folder_id && row.guild_tag !== '-1') {
    return type === 'display' ? '<span class="fshLink recallItem" invid="' +
      row.inv_id + '" playerid="' +
      (row.player_id || theInv.player_id) +
      '" mode="1" action="recall">GS</span>' : 'GS';
  }
}

function wearRender(row) { // Native
  if (row.player_id && row.player_id === -1) {
    return '<span class="fshLink takeItem" invid="' + row.inv_id +
      '" action="wear">Wear</span>';
  }
  if (row.player_id &&
      row.player_id !== theInv.current_player_id) {
    return '<span class="fshLink recallItem" invid="' + row.inv_id +
      '" playerid="' + row.player_id +
      '" mode="0" action="wear">Wear</span>';
  }
  if (row.folder_id && !row.equipped ||
      row.player_id && !row.equipped &&
      row.player_id === theInv.current_player_id) {
    return '<span class="fshLink wearItem" invid="' + row.inv_id +
      '">Wear</span>';
  }
  return '';
}

function useRender(row) { // Native
  if (row.player_id && row.player_id === -1) {
    return '<span class="fshLink takeItem" invid="' + row.inv_id +
      '" action="use">Use</span>';
  }
  if (row.player_id &&
      row.player_id !== theInv.current_player_id) {
    return '<span class="fshLink recallItem" invid="' + row.inv_id +
      '" playerid="' + row.player_id +
      '" mode="0" action="use">Use</span>';
  }
  if (row.folder_id && !row.equipped ||
      row.player_id && !row.equipped &&
      row.player_id === theInv.current_player_id) {
    return '<span class="fshLink useItem" invid="' + row.inv_id +
      '">Use</span>';
  }
  return '';
}

function wuRender(data, _type, row) { // Native
  var action = {'0': 'Wear', '1': 'Wear', '2': 'Wear', '3': 'Wear',
    '4': 'Wear', '5': 'Wear', '6': 'Wear', '7': 'Wear', '8': 'Wear',
    '10': 'Use', '11': 'Use', '15': 'Use'}[data];
  if (action === 'Wear') {
    action = wearRender(row);
  } else if (action === 'Use') {
    action = useRender(row);
  }
  return action;
}

function dropRender(data, type, row) { // Native
  if (row.guild_tag !== '-1' || row.equipped) {return;}
  if (type !== 'display') {return 'Drop';}
  return '<span class="dropItem tip-static dropLink" data-tipped=' +
    '"INSTANTLY DESTROY THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Drop</span>';
}

function sendRender(data, type, row) { // Native
  if (row.bound || row.equipped) {return;}
  if (type !== 'display') {return 'Send';}
  return '<span class="sendItem tip-static reportLink" data-tipped=' +
    '"INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Send</span>';
}

function createdRow(row, data) { // jQuery
  var colour;
  if (data.folder_id) {
    colour = data.equipped ? 'fshGreen' : 'fshNavy';
  }
  if (data.player_id) {
    colour = data.player_id === -1 ? 'fshNavy' : 'fshMaroon';
  }
  $(row).addClass(colour);
}

function doTable$1() { // jQuery
  $('#pCC').append('<table id="fshInv" class="hover" style="font-size: x-small;"></table>');
  var table = $('#fshInv').DataTable({
    data: theInv.items,
    autoWidth: false,
    pageLength: 50,
    lengthMenu: [[50, 100, 150, 200, -1], [50, 100, 150, 200, 'All']],
    columnDefs: [{targets: '_all', defaultContent: ''},
      {targets: [1, 4, 5, 6, 7, 8, 9, 10, 12, 13],
        orderSequence: ['desc', 'asc']}],
    columns: [
      {title: 'Name', data: 'item_name',
        render: nameRender
      },
      {title: 'Level', data: 'stats.min_level'},
      {title: 'Where', data: whereData,
        render: {
          '_': whereRender,
          'display': whereRenderDisplay,
          'filter': whereRenderFilter
        }
      },
      {title: 'Type', data: 'type',
        render: function(type) {return itemType[type];}
      },
      {title: 'Att', data: 'stats.attack'},
      {title: 'Def', data: 'stats.defense'},
      {title: 'Arm', data: 'stats.armor'},
      {title: 'Dam', data: 'stats.damage'},
      {title: 'HP', data: 'stats.hp'},
      {title: 'Frg', data: 'forge'},
      {title: 'Craft', data: 'craft',
        render: {
          '_': function(craft) {
            return craftHash[craft] ? craftHash[craft].index : 0;
          },
          'display': craftRender,
          'filter': craftRender
        }
      },
      {title: 'Du%', data: 'durability',
        render: durabilityRender},
      {title: 'BP',
        data: whereData,
        render: bpRender
      },
      {title: 'GS',
        data: whereData,
        render: gsRender
      },
      {title: 'W/U',
        data: 'type',
        render: wuRender
      },
      {title: 'setName', data: 'stats.set_name',
        orderable: false, visible: false
      },
      {title: 'Tag', data: 'guild_tag',
        render: function(tag){
          return tag === '-1' ? 'No' : 'Yes';
        }
      },
      {title: 'Drop', data: 'type',
        render: dropRender
      },
      {title: 'Send', data: 'type',
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

function refresh() { // Native
  doSpinner();
  syncInvMan();
}

function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
  options.fshMinLvl = minLvl;
  options.fshMaxLvl = maxLvl;
  setForage('fsh_inventory', options);
  $('#fshInv').DataTable().draw(false);
}

function resetLvls() { // jQuery
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

function clearGearOnly(checkedElements) { // Native
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
    .done(function(data){
      if (data.r === 1) {return;}
      killRow(self);
    });
  anotherSpinner(self);
}

function recallItem$2(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  queueRecallItem({
    invId: self.attr('invid'),
    playerId: self.attr('playerid'),
    mode: self.attr('mode'),
    action: self.attr('action')})
    .done(function(data){
      if (data.r === 1) {return;}
      killRow(self);
    });
  anotherSpinner(self);
}

function wearItem$1(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  equipItem(self.attr('invid')).done(function(data){
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function useItem$1(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  useItem(self.attr('invid')).done(function(data){
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function moveItem$1(e) { // jQuery
  var self = $(e.target);
  moveItem([self.data('inv')], self.val());
}

function dropItem$1(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  dropItem([self.data('inv')]).done(function(data){
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function sendItem$1(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  sendItem([self.data('inv')]).done(function(data){
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function eventHandlers$1() { // jQuery
  $('#fshRefresh').click(refresh);
  $('#fshMinLvl, #fshMaxLvl').keyup(changeLvls);
  $('#fshReset').click(resetLvls);
  $('table.fshInvFilter').on('click', 'input[type="checkbox"]', getChecks);
  $('#fshAll').click(allChecks);
  $('#fshNone').click(clearChecks);
  $('#fshDefault').click(resetChecks);
  $('#fshInv').on('click', 'span.setName', setName);
  $('#fshInv').on('click', 'span.takeItem', takeItem$1);
  $('#fshInv').on('click', 'span.recallItem', recallItem$2);
  $('#fshInv').on('click', 'span.wearItem', wearItem$1);
  $('#fshInv').on('click', 'span.useItem', useItem$1);
  $('#fshInv').on('change', 'select.moveItem', moveItem$1);
  $('#fshInv').on('click', 'span.dropItem', dropItem$1);
  $('#fshInv').on('click', 'span.sendItem', sendItem$1);
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

function getInvMan() { // Native

  time('inventory.getInvMan');

  showQuickDropLinks = getValue('showQuickDropLinks');
  showQuickSendLinks = getValue('showQuickSendLinks');

  if (calf.membrList) {rekeyMembrList();}

  decorate();
  lvlFilter();
  typeFilter();
  setFilter();
  rarityFilter();
  headers$1();
  setChecks();
  setLvls();
  doTable$1();
  eventHandlers$1();
  clearButton();

  timeEnd('inventory.getInvMan');

}

function syncInvMan() { // jQuery
  var prm = [];
  prm.push(inventory(true).done(function(data) {
    theInv = data;
  }));
  if (calf.subcmd === 'guildinvmgr') {
    prm.push(getMembrList(false));
  }
  prm.push(getForage('fsh_inventory')
    .pipe(function(data) {
      options = data || {};
      options.fshMinLvl = options.fshMinLvl ||
        defaults.inventoryMinLvl;
      options.fshMaxLvl = options.fshMaxLvl ||
        defaults.inventoryMaxLvl;
      options.checkedElements =
        options.checkedElements ||
        defaults.inventoryCheckedElements;
    })
  );
  $.when.apply($, prm).done(function() {
    add(3, getInvMan);
  });
}

function parseGuildOnline(membrList) { // Native
  var pCC = document.getElementById('pCC');
  var spinner = pCC.getElementsByClassName('fshSpinner')[0];
  spinner.classList.add('fshHide');
  var nodeList = pCC.getElementsByTagName('IMG');
  Array.prototype.forEach.call(nodeList, function(el) {
    var guildId$$1 = el.getAttribute('src').match(/guilds\/([0-9]+)_/)[1];
    var theTd = el.parentNode.parentNode;
    var player = theTd.nextElementSibling.textContent.trim();
    if (membrList[guildId$$1] && membrList[guildId$$1][player]) {
      theTd.parentNode.insertAdjacentHTML('beforeend',
        '<td>' + onlineDot({
          last_login: membrList[guildId$$1][player].last_login
        }) + '</td>');
    }
  });
}

function findOnlinePlayers(e) { // jQuery
  $(e.target).qtip('hide');
  e.target.outerHTML = '<span class="fshSpinner fshTopListSpinner" ' +
    'style="background-image: url(\'' + imageServer +
    '/world/actionLoadingSpinner.gif\');">';
  var guildArray = [];
  var nodeList = document.getElementById('pCC').getElementsByTagName('IMG');
  Array.prototype.forEach.call(nodeList, function(el) {
    var guildId$$1 = el.getAttribute('src').match(/guilds\/([0-9]+)_/)[1];
    if (guildArray.indexOf(guildId$$1) === -1) {guildArray.push(guildId$$1);}
  });
  getAllMembrList(true, guildArray)
    .done(parseGuildOnline);
}

function injectTopRated() { // Native
  var pCC = document.getElementById('pCC');
  if (!pCC ||
      !pCC.firstElementChild ||
      !pCC.firstElementChild.rows ||
      pCC.firstElementChild.rows.length < 3 ||
      pCC.firstElementChild.rows[1].textContent
        .indexOf('Last Updated') !== 0) {return;}
  var theCell = pCC.getElementsByTagName('TD')[0];
  theCell.firstElementChild.className = 'fshTopListWrap';
  var findBtn = document.createElement('INPUT');
  findBtn.className = 'fshFindOnlinePlayers custombutton tip-static';
  findBtn.setAttribute('type', 'button');
  findBtn.setAttribute('value', 'Find Online Players');
  findBtn.setAttribute('data-tipped', 'Fetch the online status of the ' +
    'top 250 players (warning ... takes a few seconds).');
  theCell.insertBefore(findBtn, theCell.firstElementChild);
  findBtn.addEventListener('click', findOnlinePlayers);
}

var myPlayer = {};

function addLogColoring(logScreen, dateColumn) { // Legacy
  var jChatTable = $('#pCC td.header').eq(0).closest('table');
  jChatTable.css({tableLayout: 'fixed', wordWrap: 'break-word'});
  if (logScreen === 'Chat') {
    jChatTable.find('tr').eq(0)
      .after('<tr style="height: 2px"><td></td></tr>');
  }

  if (!getValue('enableLogColoring')) {return;}
  var nowUtc = (new Date()).getTime();
  var lastCheckScreen = 'last' + logScreen + 'Check';
  var lastCheckUtc = getValue(lastCheckScreen) || nowUtc;
  var chatTable = findNode('//table[@class="width_full"]'); // Guild Log
  if (!chatTable) {
    chatTable = findNode('//table[tbody/tr/td[.="Message"]]'); // Outbox & Guild Chat
  }
  if (!chatTable) {
    chatTable = findNode('//table[tbody/tr/td/span[' +
      'contains(.,"Currently showing:")]]'); //personal log
  }
  if (!chatTable) {return;}

  for (var i = logScreen === 'Chat' ? 2 : 1; i < chatTable.rows.length;
      i += logScreen === 'Chat' ? 4 : 2) {
    var aRow = chatTable.rows[i];
    var addBuffTag = true;
    if (aRow.cells[0].innerHTML) {
      var cellContents = aRow.cells[dateColumn].innerHTML;
      if (logScreen !== 'Chat') {
        cellContents = cellContents.substring(6,23); // fix for player log screen.
      }
      var postDateUtc = parseDateAsTimestamp(cellContents);
      var postAgeMins = (nowUtc - postDateUtc)/(1000*60);
      if (postDateUtc > lastCheckUtc) {
        aRow.style.backgroundColor = '#F5F298';
      }
      else if (postAgeMins > 20 && postDateUtc <= lastCheckUtc) {
        aRow.style.backgroundColor = '#CD9E4B';
        addBuffTag = false;
      }
      if (logScreen === 'Chat' && addBuffTag) {
        var playerIDRE = /player_id=(\d+)/;
        var playerID = playerIDRE.exec(aRow.cells[1].innerHTML)[1];
        aRow.cells[1].innerHTML += ' <a style="color:blue;font-size:10px;" ' +
          quickBuffHref(playerID) + '>[b]</a>';
      }
    }
  }
  setValue(lastCheckScreen, Date.now());
}

function addChatTextArea() { // jQuery
  if (!getValue('enhanceChatTextEntry')) {return;}
  $('#pCC form').first().attr('id', 'dochat');
  $('#pCC input').slice(0, 7).each(function() {
    $(this).attr('form', 'dochat');
  });
  var theTable = $('#pCC table table').first();
  theTable.append('<tr id="fshMass"></tr>');
  $('td', theTable).eq(0).remove();
  var btnMass = $('input[value="Send As Mass"]', theTable);
  if (btnMass.length === 1 ) {
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

function removeHTML(buffName) { // Native
  return buffName.replace(/<\/?[^>]+(>|$)/g, '');
}

function doChat(aRow, isGuildMate, playerName$$1, addAttackLinkToLog) { // Legacy
  var buffList$$1 = buffList;
  var dateHTML = aRow.cells[1].innerHTML;
  var dateFirstPart = dateHTML
    .substring(0, dateHTML.indexOf('>Report') + 7);
  var dateLastPart = dateHTML
    .substring(dateHTML.indexOf('Message</a>') + 11, dateHTML.length);
  var extraPart = '';
  if (!isGuildMate) {
    extraPart = ' | <a title="Add to Ignore List" href="index.php?cmd' +
      '=log&subcmd=doaddignore&ignore_username=' + playerName$$1 +
      '">Ignore</a>';
  }
  aRow.cells[1].innerHTML = dateFirstPart + '</a>' + extraPart +
    dateLastPart;

  var messageHTML = aRow.cells[2].innerHTML;
  var firstPart = messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
  var thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10, messageHTML.indexOf('>Buff</a>') + 9);
  var targetPlayerID = /quickBuff\((\d+)\)/.exec(thirdPart)[1];
  thirdPart = ' | <a ' + quickBuffHref(targetPlayerID) + '>Buff</a></span>';
  var fourthPart = messageHTML.substring(messageHTML.indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
  var lastPart = messageHTML.substring(messageHTML.indexOf('</small>'), messageHTML.length);
  extraPart = ' | <a href="index.php?cmd=trade&target_player=' + playerName$$1 + '">Trade</a> | ' +
    '<a title="Secure Trade" href="index.php?cmd=trade&subcmd=createsecure&target_username=' + playerName$$1 +
    '">ST</a>';

  var attackPart = '';
  if (addAttackLinkToLog) {
    attackPart = ' | <a href="index.php?cmd=attackplayer&target_username=' + playerName$$1 +'">Attack</a>';
  }

  var buffsSent = aRow.cells[2].innerHTML.match(/`~.*?~`/);
  var quickBuff = '';
  if (buffsSent) {
    buffsSent = buffsSent[0].replace('`~','').replace('~`', '').split(',');
    var theBuffPack = getValueJSON('buffpack');
    for (var j = 0; j < buffsSent.length; j += 1) {
      var bBuffFound = false;
      for (var m = 0; m < buffList$$1.length; m += 1) {
        var nicks = buffList$$1[m].nicks.split(',');
        var exitOuter = false;

        for (var k = 0; k < nicks.length; k += 1) {
          if (buffsSent[j].toLowerCase().trim() === nicks[k].toLowerCase().trim()) {

            quickBuff += m + ';';
            exitOuter = true;
            bBuffFound = true;
            break;

          }
        }
        if (exitOuter) {
          break;
        }
      }
      if (!bBuffFound) {

        if (!theBuffPack) {continue;}

        if (!theBuffPack.nickname) { //avoid bugs if the new array is not populated yet
          theBuffPack.nickname = {};
        }
        if (!theBuffPack.staminaTotal) { //avoid bugs if the new array is not populated yet
          theBuffPack.staminaTotal = {};
        }

        for (var idx = 0; idx < theBuffPack.size; idx += 1) {
          var nickname = theBuffPack.nickname[idx]? theBuffPack.nickname[idx]:'';
          if (nickname.toLowerCase().trim() === buffsSent[j].toLowerCase().trim()) {
            //131 is the number of buffs in the game currently. When they add new buffs, this will need to be updated, along with the fsdataObj.buffList variable!
            quickBuff += 131+idx + ';';
            break;
          }
        }
      }
    }
    thirdPart = ' | <a ' + quickBuffHref(targetPlayerID, quickBuff) + '>Buff</a></span>';
  }

  var msgReplyTo = '[ <span style="cursor:pointer;text-' +
    'decoration:underline"class="a-reply" target_player="' +
    playerName$$1 + '" replyTo="' +
    (getValue('enableChatParsing') ?
    removeHTML(firstPart.replace(/&nbsp;/g, ' '))
    .substr(0, 140) : '') + '...">Reply</span>';
  aRow.cells[2].innerHTML = firstPart + '<nobr>' + msgReplyTo +
    extraPart + thirdPart + attackPart + fourthPart +
    '</nobr>' + lastPart;
}

function retrievePvPCombatSummary(responseText, callback) { // Legacy
  var winner = callback.winner;
  var xpGain = getIntFromRegExp(responseText, /var\s+xpGain=(-?[0-9]+);/i);
  var goldGain = getIntFromRegExp(responseText, /var\s+goldGain=(-?[0-9]+);/i);
  var prestigeGain = getIntFromRegExp(responseText, /var\s+prestigeGain=(-?[0-9]+);/i);
  var goldStolen = getIntFromRegExp(responseText, /var\s+goldStolen=(-?[0-9]+);/i);
  var pvpRatingChange = getIntFromRegExp(responseText, /var\s+pvpRatingChange=(-?[0-9]+);/i);
  var output = '<br> ';
  if (xpGain !== 0) {
    output += 'XP stolen:<span style="color:' +
      (winner === 1 ? 'green' : 'red') + ';">' +
      addCommas(xpGain) + ' </span>';
  }
  if (goldGain !== 0) {
    output += 'Gold lost:<span style="color:' +
      (winner === 1 ? 'green' : 'red') + ';">' +
      addCommas(goldGain) + ' </span>';
  }
  if (goldStolen !== 0) {
    output += 'Gold stolen:<span style="color:' +
      (winner === 1?'green':'red') + ';">' +
      addCommas(goldStolen) + ' </span>';
  }
  if (prestigeGain !== 0) {
    output += 'Prestige gain:<span style="color:' +
      (winner === 1?'green':'red') + ';">' +
      prestigeGain + ' </span>';
  }
  if (pvpRatingChange !== 0) {
    output += 'PvP change:<span style="color:' +
    (winner === 1 ? 'green' : 'red') + ';">' +
    pvpRatingChange + ' </span>';
  }
  callback.target.innerHTML = output;
}

function addLogWidgetsOld() { // Legacy
  var i;
  var playerElement;
  var playerName$$1;
  var addAttackLinkToLog = getValue('addAttackLinkToLog');
  var logTable = findNode('//table[tbody/tr/td/span[contains' +
    '(.,"Currently showing:")]]');
  if (!logTable) {return;}
  var memberNameString = Object.keys(calf.membrList);
  var listOfAllies = myPlayer._allies.map(function(obj) {
    return obj.username;});
  var listOfEnemies = myPlayer._enemies.map(function(obj) {
    return obj.username;});
  var showPvPSummaryInLog = getValue('showPvPSummaryInLog');
  var messageType;

  var messageHeader = logTable.rows[0].cells[2];
  if (messageHeader) {
    messageHeader.innerHTML +='&nbsp;&nbsp;<span style="' +
      'color:white;">(Guild mates show up in <span style="' +
      'color:green;">green</span>)</span>';
  }

  for (i=1;i<logTable.rows.length;i += 2) {
    var aRow = logTable.rows[i];
    if (!aRow.cells[0].innerHTML) {continue;}
    var firstCell = aRow.cells[0];
    //Valid Types: General, Chat, Guild
    messageType = firstCell.firstChild.getAttribute('oldtitle');
    if (!messageType) {return;}
    var colorPlayerName = false;
    var isGuildMate = false;
    if (messageType === 'Chat') {
      playerElement = aRow.cells[2].firstChild;
      playerName$$1 = playerElement.innerHTML;
      colorPlayerName = true;
    }
    if ((messageType === 'General' ||
      messageType === 'Notification') &&
      aRow.cells[2].firstChild.nextSibling &&
      aRow.cells[2].firstChild.nextSibling.nodeName === 'A' &&
      aRow.cells[2].firstChild.nextSibling.getAttribute('href')
        .search('player_id') !== -1) {
      playerElement = aRow.cells[2].firstChild.nextSibling;
      playerName$$1 = playerElement.innerHTML;
      colorPlayerName = true;
    }
    if (colorPlayerName) {
      if (memberNameString.indexOf(playerName$$1) !== -1) {
        playerElement.style.color='green';
        isGuildMate = true;
      }
      if (listOfEnemies.indexOf(playerName$$1) !== -1) {
        playerElement.style.color='red';
      }
      if (listOfAllies.indexOf(playerName$$1) !== -1) {
        playerElement.style.color='blue';
      }
    }
    if (messageType === 'Chat') {
      doChat(aRow, isGuildMate, playerName$$1, addAttackLinkToLog);
    }
    if (messageType === 'Notification') {
      if (aRow.cells[2].firstChild.nextSibling && aRow.cells[2].firstChild.nextSibling.nodeName === 'A') {
        if (aRow.cells[2].firstChild.nextSibling.getAttribute('href').search('player_id') !== -1) {
          if (!isGuildMate) {
            var dateExtraText = '<nobr><span style="font-size:x-small;">[ <a title="Add to Ignore List" href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' + playerName$$1 +
            '">Ignore</a> ]</span></nobr>';
            aRow.cells[1].innerHTML = aRow.cells[1].innerHTML + '<br>' + dateExtraText;
          }
          var buffingPlayerIDRE = /player_id=(\d+)/;
          var buffingPlayerID = buffingPlayerIDRE.exec(aRow.cells[2].innerHTML)[1];
          var buffingPlayerName = aRow.cells[2].firstChild.nextSibling.innerHTML;
          var extraText = ' <span style="font-size:x-small;"><nobr>[ <span style="cursor:pointer;text-decoration:underline" class="a-reply" target_player="'+buffingPlayerName+
            '">Reply</span> | <a href="index.php?cmd=trade&target_player=' + buffingPlayerName +
            '">Trade</a> | <a title="Secure Trade" href="index.php?cmd=trade&subcmd=createsecure&target_username=' + buffingPlayerName +
            '">ST</a>';
          extraText += ' | <a ' + quickBuffHref(buffingPlayerID) + '>Buff</a>';
          if (addAttackLinkToLog) {
            extraText += ' | <a href="index.php?cmd=attackplayer&target_username=' + buffingPlayerName +'">Attack</a>';
          }
          extraText += ' ]</nobr></span>';

          aRow.cells[2].innerHTML += extraText;
        }
      }
    }

    //add PvP combat log summary
    if (messageType === 'Combat' &&
      aRow.cells[2] &&
      showPvPSummaryInLog &&
      aRow.cells[2].innerHTML.search('combat_id=') !== -1) {
      var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
      var defeat = /You were defeated by/.exec(aRow.cells[2].innerHTML);
      var combatSummarySpan = document.createElement('SPAN');
      combatSummarySpan.style.color = 'gray';
      aRow.cells[2].appendChild(combatSummarySpan);
      xmlhttp('index.php?cmd=combat&subcmd=view&combat_id=' +
        combatID, retrievePvPCombatSummary,
        {
          'target': combatSummarySpan,
          winner  : defeat ? 0 : 1
        });
    }
  }
  $('.a-reply').click(function(evt) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'),
      '', evt.target.getAttribute('replyTo'));
  });
}

function addLogWidgets() { // jQuery
  $.when(
    getMembrList(false),
    myStats(false).done(function(data) {
      myPlayer = data;
    })
  ).done(addLogWidgetsOld);
}

function addGuildLogWidgets() { // Legacy
  if (!getValue('hideNonPlayerGuildLogMessages')) {return;}
  var nodeList = document.getElementById('pCC').getElementsByTagName('TD');
  var messageNameCell = Array.prototype.reduce.call(nodeList, function(prev, curr) {
    prev = curr.textContent === 'Message' ? curr : prev;
    return prev;
  }, null);
  if (!messageNameCell) {return;}
  var playerId$$1 = playerId();
  var logTable = messageNameCell.parentNode.parentNode.parentNode;
  messageNameCell.innerHTML += '&nbsp;&nbsp;<font style="' +
    'color:white;">(Guild Log messages not involving ' +
    'self are dimmed!)</font>';

  for (var i = 1; i < logTable.rows.length; i += 2) {
    var aRow = logTable.rows[i];
    if (!aRow.cells[0].innerHTML) {continue;}

    var messageHTML = aRow.cells[2].innerHTML;
    var doublerPlayerMessageRE =
      /member\s<a\shref="index.php\?cmd=profile\&amp;player_id=(\d+)/;
    var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
    var singlePlayerMessageRE =
      /<a\shref="index.php\?cmd=profile\&amp;player_id=(\d+)/;
    var firstPlayer = singlePlayerMessageRE.exec(messageHTML);

    var firstPlayerID = firstPlayer ? firstPlayer[1] * 1 : 0;
    var secondPlayerID = secondPlayer ? secondPlayer[1] * 1 : 0;

    if (firstPlayer && firstPlayerID !== playerId$$1 &&
        secondPlayerID !== playerId$$1) {
      for (var j = 0; j < 3; j += 1) {
        aRow.cells[j].removeAttribute('class');
      }
      aRow.classList.add('fshGrey');
      aRow.classList.add('fshXXSmall');
    }

    var hasInvited = aRow.cells[2].textContent
      .search('has invited the player') !== -1;

    if (aRow.cells[2].textContent.charAt(0) === '\'' || hasInvited) {
      var message = aRow.cells[2].innerHTML;
      var firstQuote = message.indexOf('\'');
      var firstPart = '';
      firstPart = message.substring(0,firstQuote);
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

  }
}

function guildChat() { // Native
  addChatTextArea();
  addLogColoring('Chat', 0);
}

function guildLog() { // Native
  addLogColoring('GuildLog', 1);
  addGuildLogWidgets();
}

function outbox() { // Native
  addLogColoring('OutBox', 1);
}

function playerLog() { // Native
  addLogColoring('PlayerLog', 1);
  addLogWidgets();
}

var plantFromComponentHash = {
  'Amber Essense':      'Amber Plant',
  'Blood Bloom Flower': 'Blood Bloom Plant',
  'Dark Shade ':        'Dark Shade Plant',
  'Snake Eye':          'Elya Snake Head',
  'Snake Venom Fang':   'Elya Snake Head',
  'Heffle Wart':        'Heffle Wart Plant',
  'Jademare Blossom':   'Jademare Plant',
  'Trinettle Leaf':     'Trinettle Plant',
  'Purplet Flower':     'Purplet Plant',
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
    //Had to add &fsh=i to ensure that the call is sent out multiple times.
    xmlhttp(
      'index.php?cmd=inventing&subcmd=doinvent&recipe_id=' +
      recipeID + '&fsh=' + i, quickInventDone);
  }
}

function injectInvent(){ // Bad jQuery
  var selector = '<tr><td align="center">Select how many to quick ' +
    'invent<input value=1 id="invent_amount" name="invent_amount" ' +
    'size=3 class="custominput"></td></tr>' +
    '<tr><td align="center"><input id="quickInvent" value="Quick ' +
    'invent items" class="custombutton" type="submit"></td></tr>' + //button to invent
    '<tr><td colspan=6 align="center"><span id="invet_Result_label">' +
    '</span><ol id="invent_Result"></ol></td></tr>';
  $('input[name="recipe_id"]').closest('tbody').append(selector);
  document.getElementById('quickInvent').addEventListener('click',
    quickInvent, true);

}

function injectViewRecipeLinks(responseText, callback) { // Legacy
  var itemRE = /<b>([^<]+)<\/b>/i;
  var itemName = itemRE.exec(responseText);
  if (itemName) {itemName=itemName[1];}
  var plantFromComponent = plantFromComponentHash[itemName] || itemName;
  if (itemName !== plantFromComponent) {
    var itemLinks = document.createElement('td');
    itemLinks.innerHTML = '<a href="' + server +
      '?cmd=auctionhouse&search_text=' +
      encodeURI(plantFromComponent) + '">AH</a>';
    var counter=findNode('../../../../tr[2]/td', callback);
    counter.setAttribute('colspan', '2');
    callback.parentNode.parentNode.parentNode.appendChild(itemLinks);
  }
}

function linkFromMouseoverCustom(mouseOver) { // Legacy
  var reParams =
    /item_id=(\d+)\&inv_id=([-0-9]*)\&t=(\d+)\&p=(\d+)\&vcode=([a-z0-9]*)/i;
  var reResult =reParams.exec(mouseOver);
  if (reResult === null) {
    return null;
  }
  var itemId = reResult[1];
  var invId = reResult[2];
  var type = reResult[3];
  var pid = reResult[4];
  var vcode = reResult[5];
  var theUrl = 'fetchitem.php?item_id=' + itemId + '&inv_id=' + invId +
    '&t='+type + '&p=' + pid + '&vcode=' + vcode;
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

function inventing() { // Native
  injectViewRecipe();
  injectInvent();
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
var invItems;
var colouring;
var sendLinks;

function moveItemsToFolder() { // Bad jQuery
  var invList = [];
  $('input[name="removeIndex[]"]:checked').each(function(i) {
    var batchNo = Math.floor(i / 50);
    invList[batchNo] = invList[batchNo] || [];
    invList[batchNo].push($(this).val());
  });
  calf.moveItemsCallback = invList.length;
  invList.forEach(function(val) {
    $.ajax({
      dataType: 'json',
      url: 'index.php',
      data: {
        'cmd': 'profile',
        'subcmd': 'sendtofolder',
        'inv_list': JSON.stringify(val),
        'folder_id': $('#selectFolderId option:selected').val(),
        'ajax': 1
      },
      success: function() {
        calf.moveItemsCallback -= 1;
        if (calf.moveItemsCallback === 0) {location.reload();}
      }
    });
  });
}

function injectMoveItems() { // Bad jQuery
  var foldersEnabled = $('img[src$="/folder_on.gif"]');
  if (foldersEnabled.length !== 1) {return;}
  var otherFolders = $('#pCC a').has('img[src$="/folder.gif"]');
  if (otherFolders.length === 0) {return;}
  var select = $('<select name=folder id=selectFolderId class=' +
    'customselect></select>');
  otherFolders.each(function() {
    var self = $(this);
    select.append('<option value=' + self.attr('href')
    .match(/&folder_id=(-*\d+)/i)[1] + '>' +
    self.parent().text() + '</option>');
  });
  $('#pCC tr').has(otherFolders[0]).first().after($('<tr/>')
    .append($('<td class="fshCenter">Move selected items to: </td>')
      .append(select)
      .append('&nbsp;<input type="button" class="custombutton"' +
        ' id="fshMove" value="Move">')));
  $('#fshMove').click(moveItemsToFolder);
}

function doToggleButtons() { // Native
  // Option toggle buttons for both screens
  var insertHere = document.getElementById('pCC')
    .getElementsByTagName('form')[0].previousElementSibling.firstElementChild;
  var inject = '[<span id="fshShowExtraLinks" class="reportLink">' +
    (showExtraLinks ? 'Hide' : 'Show') +
    ' AH and UFSG links</span>]&nbsp;' +
    '[<span id="fshShowQuickDropLinks" class="reportLink">' +
    (showQuickDropLinks$1 ? 'Hide' : 'Show') +
    ' Quick Drop links</span>]&nbsp;';
  if (calf.subcmd2 === 'storeitems') {
    inject += '[<span id="fshSelectAllGuildLocked" class="reportLink">' +
      ' Select All Guild Locked</span>]&nbsp;';
  }
  insertHere.innerHTML = inject;
}

function dropItemsPaint() { // Native - abstract this pattern
  var limit = performance.now() + 5;
  while (performance.now() < limit && paintCount < itemsAry.length) {
    var o = itemsAry[paintCount];
    if (!extraLinks && showExtraLinks) {
      o.injectHere.insertAdjacentHTML('afterbegin',
        '<span>[<a href="index.php?cmd=auctionhouse' +
        '&search_text=' + encodeURIComponent(o.itemName) +
        '">AH</a>] [<a href="http://guide.fallensword.com/' +
        'index.php?cmd=items&subcmd=view' + '&item_id=' + o.itemId +
        '" target="_blank">UFSG</a>]</span>');
    }
    if (!checkAll && itemsHash[o.itemId] !== 1) {
      o.injectHere.insertAdjacentHTML('beforeend',
        ' [<span linkto="' + o.itemId +
        '" class="fshLink">Check all</span>]');
    }
    paintCount += 1;
  }
  if (paintCount < itemsAry.length) {
    add(3, dropItemsPaint);
  } else {
    if (showExtraLinks) {extraLinks = true;}
    checkAll = true;
  }
}

function toggleShowExtraLinks() { // Native
  showExtraLinks = !showExtraLinks;
  setValue('showExtraLinks', showExtraLinks);
  doToggleButtons();
  if (!extraLinks) {
    paintCount = 0;
    add(3, dropItemsPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.firstElementChild;
      el.classList.toggle('fshHide');
    });
  }
}

function invPaint() { // Native
  var limit = performance.now() + 5;
  while (performance.now() < limit &&
      paintCount < itemsAry.length) {
    var o = itemsAry[paintCount];

    var item = invItems[o.invid];
    if (!colouring && !disableItemColoring) {
      o.injectHere.classList.add(rarity[item.rarity].clas);
    }
    if (!sendLinks && showQuickSendLinks$1 &&
        !item.bound) {
      o.injectHere.insertAdjacentHTML('beforeend',
        ' <span class="quickAction sendLink tip-static" ' +
        'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
        'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>'
      );
    }
    if (!dropLinks && showQuickDropLinks$1 &&
        item.guild_tag === '-1') {
      o.injectHere.insertAdjacentHTML('beforeend',
        ' <span class="quickAction dropLink tip-static" itemInvId="' +
        o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
        'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>');
    }

    paintCount += 1;
  }
  if (paintCount < itemsAry.length) {
    add(3, invPaint);
  } else {
    colouring = true;
    if (showQuickDropLinks$1) {dropLinks = true;}
    sendLinks = true;
  }
}

function toggleShowQuickDropLinks() { // Native
  showQuickDropLinks$1 = !showQuickDropLinks$1;
  setValue('showQuickDropLinks', showQuickDropLinks$1);
  doToggleButtons();
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

function anotherSpinner$1(self) { // Native
  self.innerHTML = '<img class="quickActionSpinner" src="' +
    imageServer +
    '/skin/loading.gif" width="15" height="15">';
}

function doCheckboxes(type, itemId) { // Native
  itemsAry.forEach(function(o) {
    var el = o.el.parentNode.parentNode.previousElementSibling
      .firstElementChild;
    if (type === 'guild') {
      el.checked = !el.disabled &&
        invItems[o.invid].guild_tag !== '-1' ?
        true : false;
    }
    if (type === 'item' && o.itemId === itemId) {
      el.checked = !el.disabled && !el.checked ? true : false;
    }
  });
}

function quickSendItem(evt){ // jQuery
  var self = evt.target;
  self.className = 'quickAction';
  var itemInvId = self.getAttribute('itemInvId');
  sendItem([itemInvId]).done(function(data){
    if (data.r === 1) {return;}
    self.style.color = 'green';
    self.innerHTML = 'Sent';
  });
  $(self).qtip('hide');
  anotherSpinner$1(self);
  var theTd = self.parentNode;
  var quickDrop = theTd.querySelector('.dropLink');
  if (quickDrop) {
    quickDrop.className = 'quickAction';
    quickDrop.innerHTML = '';
  }
  var checkbox = theTd.parentNode.firstElementChild.firstElementChild;
  checkbox.checked = false;
  checkbox.disabled = true;
}

function quickDropItem(evt){ // jQuery
  var self = evt.target;
  self.className = 'quickAction';
  var itemInvId = self.getAttribute('itemInvId');
  dropItem([itemInvId]).done(function(data){
    if (data.r === 1) {return;}
    self.style.color = 'green';
    self.innerHTML = 'Dropped';
  });
  $(self).qtip('hide');
  anotherSpinner$1(self);
  var theTd = self.parentNode;
  var quickSend = theTd.querySelector('.sendLink');
  if (quickSend) {
    quickSend.className = 'quickAction';
    quickSend.innerHTML = '';
  }
  var checkbox = theTd.parentNode.firstElementChild.firstElementChild;
  checkbox.checked = false;
  checkbox.disabled = true;
}

function evtHandler(evt) { // Native
  if (evt.target.tagName !== 'SPAN') {return;}
  var self = evt.target;
  var myId = self.id;
  if (myId === 'fshShowExtraLinks') {toggleShowExtraLinks();}
  if (myId === 'fshShowQuickDropLinks') {toggleShowQuickDropLinks();}
  if (myId === 'fshSelectAllGuildLocked') {doCheckboxes('guild');}
  if (self.hasAttribute('linkto')) {
    doCheckboxes('item', evt.target.getAttribute('linkto'));}
  var myClasses = self.classList;
  if (myClasses.contains('sendLink')) {quickSendItem(evt);}
  if (myClasses.contains('dropLink')) {quickDropItem(evt);}
}

function getItems() { // Native
  addStatTotalToMouseover();
  disableItemColoring = getValue('disableItemColoring');
  showExtraLinks = getValue('showExtraLinks');
  showQuickDropLinks$1 = getValue('showQuickDropLinks');
  showQuickSendLinks$1 = getValue('showQuickSendLinks');
  doToggleButtons();

  var pCC = document.getElementById('pCC');
  pCC.addEventListener('click', evtHandler);
  var allTables = pCC.getElementsByTagName('table');
  var lastTable = allTables[allTables.length - 1];
  var imgList = lastTable.getElementsByTagName('img');
  itemsAry = [];
  itemsHash = {};
  Array.prototype.forEach.call(imgList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var matches = tipped.match(itemRE);
    itemsHash[matches[1]] = (itemsHash[matches[1]] || 0) + 1;
    var injectHere = el.parentNode.parentNode.nextElementSibling;
    var itemName = injectHere.textContent.trim();
    itemsAry.push({
      el: el, itemId: matches[1], invid: matches[2],
      injectHere: injectHere, itemName: itemName});
  });

  extraLinks = false;
  checkAll = false;
  paintCount = 0;
  add(3, dropItemsPaint);
}

function inventory$1(data) { // Native
  invItems = data.items.reduce(function(prev, curr) {
    prev[curr.inv_id] = curr;
    return prev;
  }, {});
  colouring = false;
  dropLinks = false;
  sendLinks = false;
  paintCount = 0;
  add(3, invPaint);
}

function injectDropItems() { // Native
  getInventory().done(inventory$1);
  add(3, getItems);
}

function injectProfileDropItems() { // Native
  injectDropItems();
  injectMoveItems();
}

function injectStoreItems() { // Native
  injectDropItems();
}

function injectQuestBookFull() { // Legacy
  var lastQBPage = location.search;
  if (lastQBPage.indexOf('&mode=0') !== -1) {
    setValue('lastActiveQuestPage', lastQBPage);
  } else if (lastQBPage.indexOf('&mode=1') !== -1) {
    setValue('lastCompletedQuestPage', lastQBPage);
  } else if (lastQBPage.indexOf('&mode=2') !== -1) {
    setValue('lastNotStartedQuestPage', lastQBPage);
  }
  if (getValue('storeLastQuestPage')) {
    if (getValue('lastActiveQuestPage').length > 0) {
      var activeLink = $('a[href*="index.php?cmd=questbook&mode=0"]');
      activeLink.attr('href', getValue('lastActiveQuestPage'));
    }
    if (getValue('lastCompletedQuestPage').length > 0) {
      var completedLink = $('a[href*="index.php?cmd=questbook&mode=1"]');
      completedLink.attr('href', getValue('lastCompletedQuestPage'));
    }
    if (getValue('lastNotStartedQuestPage').length > 0) {
      var notStartedLink = $('a[href*="index.php?cmd=questbook&mode=2"]');
      notStartedLink.attr('href', getValue('lastNotStartedQuestPage'));
    }
  }
  var questTable = findNode('//table[tbody/tr/td[.="Guide"]]');
  if (!questTable) {return;}
  var hideQuests = [];
  if (getValue('hideQuests')) {
    hideQuests = getValue('hideQuestNames').split(',');
  }
  for (var i = 1; i < questTable.rows.length; i += 1) {
    var aRow = questTable.rows[i];
    if (aRow.cells[0].innerHTML) {
      var questName =
        aRow.cells[0].firstChild.innerHTML.replace(/ {2}/g,' ').trim();
      if (hideQuests.indexOf(questName) >= 0) {
        aRow.parentNode.removeChild(aRow.nextSibling);
        aRow.parentNode.removeChild(aRow.nextSibling);
        aRow.parentNode.removeChild(aRow);
      }
      var questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
      aRow.cells[4].innerHTML = '<a href="http://guide.fallensword.com/' +
        'index.php?cmd=quests&amp;subcmd=view&amp;quest_id=' + questID +
        '&amp;search_name=&amp;search_level_min=&amp;search_level_max=' +
        '&amp;sort_by=" target="_blank">' +
        '<img border=0 style="float:left;" title="Search quest in Ultimate' +
        ' FSG" src="' + imageServer + '/temple/1.gif"/></a>';
      aRow.cells[4].innerHTML += '&nbsp;<a href="http://wiki.fallensword' +
        '.com/index.php?title=' + questName.replace(/ /g,'_') +
        '" target="_blank"><img border=0 style="float:left;" title="' +
        'Search for this quest on the Wiki" src="' +
        imageServer + '/skin/fs_wiki.gif"/></a>';
    }
  }
}

function injectQuestTracker() { // Legacy
  var injectHere = findNode('//td[font/b[.="Quest Details"]]');
  var questId = document.location.search.match(/quest_id=(\d+)/)[1];
  injectHere.innerHTML += '&nbsp;<a target="_blank" href="http://guide.' +
    'fallensword.com/index.php?cmd=quests&subcmd=view&quest_id=' + questId +
    '"><img border=0 title="Search quest in Ultimate FSG" src="' +
    imageServer + '/temple/1.gif"/></a>';
  
  var questName =
    findNode('//font[@size="2" and contains(.,"\'")]', injectHere);
  if (questName) {
    questName = questName.innerHTML;
    questName = questName.match(/"(.*)"/);
    if (questName && questName.length > 1) {
      questName = questName[1];
      injectHere.innerHTML += '&nbsp;<a href="http://wiki.fallensword.com' +
        '/index.php?title=' + questName.replace(/ /g,'_') +
        '" target="_blank"><img border=0 title="Search for this quest on ' +
        'the Fallensword Wiki" src=' + imageServer +
        '/skin/fs_wiki.gif /></a>';
    }
  }
}

function quickDoneTaken(data) { // jQuery
  if (data.r !== 0) {
    var $tempError = $('#temp_error');
    $tempError.html('<span style="color: red">Error:</span> ' + data.m);
    $tempError.show().delay(5000).hide(400);
  } else {
    var qtipId = $('#temp-inv-img-' + data.temp_id).data('hasqtip');
    $('#temp-inv-' + data.temp_id).remove();
    $('#qtip-' + qtipId).remove();
  }
  $('#take_result').append('<br />Item taken.');
}

function takeAllSimilar(evt) { // jQuery
  var invIds = evt.target.getAttribute('invIDs').split(',');
  evt.target.parentNode.innerHTML = 'taking all ' +
    invIds.length + ' items';
  invIds.forEach(function(invId) {
    $.ajax({
      type: 'POST',
      url: 'index.php',
      data: {
        'cmd': 'tempinv',
        'subcmd': 'takeitem',
        'temp_id': invId,
        'ajax': '1'
      },
      dataType: 'json'
    }).done(quickDoneTaken);
  });
}

function toggleQuickTake(){ // jQuery
  if($('#currentMBDisplay').attr('value')==='mailbox'){
    $('#mailboxSwitcher').html('Toggle Mailbox');
    $('#quickTake').css('display','block');
    $('#regularMailbox').css('display','none');
    $('#currentMBDisplay').attr('value','quicktake');
  }else{
    $('#mailboxSwitcher').html('Toggle Quick Take');
    $('#quickTake').css('display','none');
    $('#regularMailbox').css('display','block');
    $('#currentMBDisplay').attr('value','mailbox');
  }
}

function injectMailbox() { // Bad jQuery
  var items = $('#pCC a');
  if (items.length === 0) {return;} // Empty mailbox
  $('#pCC').wrapInner('<div id="regularMailbox" />');
  var quickTakeDiv='<div id="quickTake" style="display:none"><br />' +
    '<br /><center><font size="3"><b>Quick Take</b></font>'+
    '<br />Select which item to take all similar items from your ' +
    'Mailbox.<br /></center>'+
    '<table id="quickTakeTable" align="left"><tr><th width=20%>' +
    'Actions</th><th>Items</th></tr><tr><td id="take_result" ' +
    'colspan=2></td></tr></table>'+
    '</div>';
  $('#pCC').prepend('<span id="mailboxSwitcher" ' +
    'style="cursor:pointer; text-decoration:underline; ' +
    'color:blue;">Toggle Quick Take</span><input type="hidden" ' +
    'id="currentMBDisplay" value="mailbox" />'+quickTakeDiv);
  var itemList = {};
  $('#regularMailbox img[data-tipped*="t=5"]').each(function() {
    var itemIDs = itemRE.exec($(this).attr('data-tipped'));
    if (!itemIDs) {return;}
    var itemId = itemIDs[1];
    var invId = itemIDs[2];
    var tipped = $(this).attr('data-tipped');
    var src = $(this).attr('src');
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
      '">Take All ' + titem.invIds.length + '</span></td>'+
      '<td><img src="' + titem.src +
      '" class="tip-dynamic" border="0" data-tipped="' +
      titem.tipped + '"></td></tr>');
    document.getElementById('Helper:takeAllSimilar' + id)
      .addEventListener('click', takeAllSimilar, true);
  });
  document.getElementById('mailboxSwitcher')
    .addEventListener('click', toggleQuickTake, true);
}

function guildTake(e) { // jQuery
  var self = $(e.target);
  guildMailboxTake(self.attr('href')).done(function(data) {
    if (data.r === 1) {return;}
    self.removeClass();
    self.closest('table').next().find('td')
      .html('<span class="fshGreen">Taken</span>');
  });
}

function guildMailbox() { // Bad jQuery
  var items = $('#pCC a');
  if (items.length === 0) {return;}
  items.wrap(function() {
    return '<span class="helperQC" href="' + $(this).attr('href') +
      '"></span>';
  }).children().unwrap();
  $('#pCC').on('click', '.helperQC', guildTake);

  var takeItems = $('<div class="fshCenter"><span class="reportLink">' +
    'Take All</span></div>');
  $('#pCC td[height="25"]').append(takeItems);
  takeItems.click(function() {
    $('#pCC span.helperQC').click();
  });
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

function transResponse(response) { // jQuery
  var doc = createDocument(response);
  var infoBox = $('#pCC #info-msg', doc);
  if (infoBox.length === 0) {return;}
  var target = $('#pCC #info-msg');
  if (target.length === 0) {
    $('#pCC').prepend(infoBox.closest('table'));
  } else {
    target.closest('table').replaceWith(infoBox.closest('table'));
  }
  $('#pH #statbar-gold').text($('#pH #statbar-gold', doc).text());
  $('#pH #statbar-gold-tooltip-general dd').text(function(index) {
    return $('#pH #statbar-gold-tooltip-general dd', doc).eq(index).text();
  });
  var o = bankSettings;
  $('#pCC b').slice(o.balPos).text(function(index) {
    return $('#pCC b', doc).slice(o.balPos).eq(index).text();
  });
  if ($('#pCC b').eq(o.depoPos).text() === '0') {
    $('#pCC input[value="Deposit"]').prop('disabled', true);
  }
  $('#pCC #deposit_amount').val($('#pCC #deposit_amount', doc).val());
  $('#pCC #withdraw_amount').val(o.initWithdraw);
}

function bankDeposit(e) { // jQuery
  e.preventDefault();
  var o = bankSettings;
  var amount = $('#pCC #deposit_amount').val();
  if ($('#pCC b').eq(o.depoPos).text() === '0' || !$.isNumeric(amount) ||
    amount < 1) {return;}
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

function ajaxifyBank() { // jQuery
  var o = bankSettings;
  var bank = $('#pCC b');
  if (bank.length === 0 || bank.eq(0).text() !== o.headText) {return;}
  if (o.appLink) {
    bank.eq(0).closest('tr').after('<tr><td colspan="3" align="center">' +
      '<a href="/index.php?cmd=guild&subcmd=bank">Go to Guild Bank</a>' +
      '</td></tr>');
  }
  var depo = $('#pCC input[value="Deposit"]');
  if (depo.length !== 1) {return;}
  var withdraw = $('#pCC input[value="Withdraw"]');
  if (withdraw.length !== 1) {return;}
  if ($('#pCC b').eq(o.depoPos).text() === '0') {
    depo.prop('disabled', true);
  } else {
    depo.click(bankDeposit);
  }
  withdraw.click(bankWithdrawal);
}

function injectGuildBank() { // Native
  bankSettings = guildBank;
  ajaxifyBank();
}

function injectBank() { // jQuery
  bankSettings = playerBank;
  ajaxifyBank();
}

var leftHandSideColumnTable;
var members;
var memCount;

function removeGuildAvyImgBorder() { // Native
  document.querySelector('#pCC img[oldtitle$="\'s Logo"]')
    .removeAttribute('style');
}

function guildXPLock() { // Native
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

function injectViewGuild() { // Native
  add(3, colouredDots);
  removeGuildAvyImgBorder();
  guildXPLock();
  var highlightPlayersNearMyLvl =
    getValue('highlightPlayersNearMyLvl');
  var highlightGvGPlayersNearMyLvl =
    getValue('highlightGvGPlayersNearMyLvl');
  if (!highlightPlayersNearMyLvl && !highlightGvGPlayersNearMyLvl) {return;}
  var levelToTest = intValue(document.getElementsByClassName(
    'stat-level')[0].nextElementSibling.textContent);
  var characterVirtualLevel = getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  var memList = document.querySelectorAll(
    '#pCC a[data-tipped*="<td>VL:</td>"]');
  Array.prototype.forEach.call(memList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var vlevel = /VL:.+?(\d+)/.exec(tipped)[1];
    var aRow = el.parentNode.parentNode;
    if (highlightPlayersNearMyLvl &&
        Math.abs(vlevel - levelToTest) <= (levelToTest <= 205 ? 5 : 10)) {
      aRow.classList.add('lvlHighlight');
    } else if (highlightGvGPlayersNearMyLvl &&
        Math.abs(vlevel - levelToTest) <=
        (levelToTest <= 300 ? 25 : levelToTest <= 700 ? 50 : 100)) {
      aRow.classList.add('lvlGvGHighlight');
    }
  });
}

function gotConflictInfo(responseText, callback) { // Legacy
  var insertHere = callback.node;
  var doc = createDocument(responseText);

  var page = findNode('//td[contains(.,"Page:")]', doc);
  var curPage = parseInt(findNode('//input[@name="page"]',
    doc).value,10);
  var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/);

  var conflictTable = findNode(
    '//font[contains(.,"Participants")]/ancestor::table[1]', doc);
  if (conflictTable && conflictTable.rows.length > 3) {
    if (curPage === 1) {
      var newNode = insertHere.insertRow(insertHere.rows.length-2);
      newNode.insertCell(0);
      newNode.insertCell(0);
      newNode.cells[0].innerHTML =
        '<a href="index.php?cmd=guild&subcmd=conflicts">Active Conflicts</a>';
      newNode.cells[1].innerHTML = 'Score';
    }
    for (var i = 1; i <= conflictTable.rows.length - 4; i+=2) {
      var newRow = insertHere.insertRow(insertHere.rows.length-2);
      newRow.insertCell(0);
      newRow.insertCell(0);
      newRow.cells[0].innerHTML = conflictTable.rows[i].cells[0].innerHTML;
      newRow.cells[1].innerHTML = '<b>' + conflictTable.rows[i].cells[6]
        .innerHTML + '</b>';
    }
  }
  if (maxPage && parseInt(maxPage[1],10) > curPage) {
    xmlhttp(
      'index.php?cmd=guild&subcmd=conflicts&subcmd2=&page=' +
      (curPage + 1) + '&search_text=',
      gotConflictInfo,
      {'node': callback.node});
  }
}

function conflictInfo() { // jQuery
  $.get('index.php?cmd=guild&subcmd=conflicts').done(function(data) {
    gotConflictInfo(data,
      {node: document.getElementById('statisticsControl')});
  });
}

function logoToggle() { // Native
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

function statToggle() { // Native
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

function structureToggle() { // Native
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

function batchBuffLinks() { // Native
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

function buffLinks() { // Native
  // TODO preference
  memCount = 0;
  members = document.querySelectorAll(
    '#pCC a[href^="index.php?cmd=profile&player_id="]');
  add(3, batchBuffLinks);
  document.getElementById('pCC').addEventListener('click', function(evt) {
    if (evt.target.className !== 'smallLink') {return;}
    window.openWindow('index.php?cmd=quickbuff&t=' + evt.target
      .previousElementSibling.text, 'fsQuickBuff', 618, 1000, ',scrollbars');
  });
}

function selfRecall() { // Native
  // self recall
  var getLi = leftHandSideColumnTable.getElementsByTagName('LI');
  var selfRecall = getLi[getLi.length - 1].parentNode;
  selfRecall.insertAdjacentHTML('beforeend',
    '<li><a href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&' +
    'user=' + playerName() +
    '" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>');
}

function injectGuild() { // Native
  add(3, colouredDots);
  add(3, removeGuildAvyImgBorder);
  add(3, guildXPLock);
  leftHandSideColumnTable = document.getElementById('pCC')
    .lastElementChild.rows[2].cells[0].firstElementChild;
  add(3, logoToggle);
  add(3, statToggle);
  add(3, structureToggle);
  add(3, buffLinks);
  add(3, selfRecall);

  //Detailed conflict information
  if (getValue('detailedConflictInfo')) {
    add(3, conflictInfo);
  }

}

function recallGuildStoreItemReturnMessage(responseText, callback) { // Legacy
  var target = callback.target;
  var info = infoBox(responseText);
  var itemCellElement = target.parentNode;
  if (info.search('You successfully took the item into your backpack') !==
      -1) {
    itemCellElement.innerHTML =
      '<span style="color:green; font-weight:bold;">Taken</span>';
  } else if (info!=='') {
    itemCellElement.innerHTML =
      '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
  } else {
    itemCellElement.innerHTML = 'Weird Error: check the Tools>Error Console';
    log('Post the previous HTML and the following message to the ' +
    'GitHub or to the forum to help us debug this error');
    log(callback.url);
  }
}

function recallGuildStoreItem(evt) { // Legacy
  var guildStoreID=evt.target.getAttribute('itemID');
  var recallHref =
    'index.php?cmd=guild&subcmd=inventory&subcmd2=takeitem&guildstore_id=' +
    // guildStoreID + '&ajax=1'; // TODO
    guildStoreID;
  xmlhttp(recallHref,
    recallGuildStoreItemReturnMessage,
    {'item': guildStoreID, 'target': evt.target, 'url': recallHref});
}

function injectGuildAddTagsWidgets() { // Legacy
  var itemTable = findNode(
    '//img[contains(@src,"/items/")]/ancestor::table[1]');
  if (itemTable) {
    for (var i=1;i<itemTable.rows.length;i += 1) {
      var aRow = itemTable.rows[i];
      if (aRow.cells[2]) { // itemRow
        var itemId = aRow.cells[0].firstChild.getAttribute('value');
        aRow.cells[2].innerHTML += '&nbsp;<span style="cursor:pointer; ' +
          'text-decoration:underline; color:blue;" itemID="' + itemId +
          '">Fast BP</span>';
        var itemRecall = aRow.cells[2].firstChild.nextSibling;
        itemRecall.addEventListener('click', recallGuildStoreItem);
      }
    }
  }
  $('b:contains("100 x Item Level")').closest('tr').next()
    .children('td:first')
    .append('<input type="button" id="fshCheckAlTag" value="Check All">');
  $('#fshCheckAlTag').click(function() {
    $('input[name*=tagIndex]').each(function() {
      this.click();
    });
  });
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
  textArea.value = textArea.value.replace(/<br \/>/ig,'');
  var textAreaDiv = textArea.parentNode;
  var bioPreviewHTML = convertTextToHtml(textArea.value);
  var newDiv = document.createElement('div');
  textAreaDiv.appendChild(newDiv);
  newDiv.innerHTML = '<table align="center" width="325" border="1"><tbody>' +
    '<tr><td style="text-align:center;color:#7D2252;' +
    'background-color:#CD9E4B">Preview</td></tr>' +
    '<tr><td align="left" width="325"><span style="font-size:small;" ' +
    'findme="biopreview">' + bioPreviewHTML +
    '</span></td></tr></tbody></table>';

  document.getElementById('textInputBox').addEventListener('keyup',
    updateHistoryCharacters);
}

function parseProfileAndPostWarnings(data) { // Native
  var myBuffs = data._skills.reduce(function(prev, curr) {
    // What happens if I'm not buffed? TODO
    prev[curr.name] = curr.level;
    return prev;
  }, {});

  var nodeList = document.getElementById('pCC').firstElementChild.rows[9]
    .cells[0].firstElementChild.getElementsByTagName('A');
  Array.prototype.forEach.call(nodeList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var packRE = />([ a-zA-Z]+) Level (\d+)/g;
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

function injectRPUpgrades() { // jQuery
  myStats().done(parseProfileAndPostWarnings);
}

var currentFSP;

function updateStamCount(evt) { // jQuery
  var target = $(evt.target);
  var amount = target.attr('amount');
  var cost = target.attr('cost');
  var quantity = target.val();
  //cap the value if the user goes over his current FSP
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
    var alliesValue = alliesValueRE.exec(alliesRatio.innerHTML)[1]*1;
    setValue('alliestotal',alliesValue+5);
  }
  var enemiesText = findNode('//td[.="+1 Max Enemies"]');
  var enemiesRatio = enemiesText.nextSibling.nextSibling.nextSibling
    .nextSibling;
  if (enemiesRatio) {
    var enemiesValueRE = /(\d+) \/ 115/;
    var enemiesValue = enemiesValueRE.exec(enemiesRatio.innerHTML)[1]*1;
    setValue('enemiestotal',enemiesValue+5);
  }
  injectPoints();
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
var maxPage;
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

function rowProfile(data) {
  var rowTypeID = 0;
  // Potion messages
  if (data.indexOf('(Potion)') !== -1) {
    rowTypeID = 1;
  }
  // Store/Recall (showRecallMessages)
  else if (data.indexOf('recalled the item') !== -1 ||
      data.indexOf('took the item') !== -1 ||
      data.indexOf('auto-returned the') !== -1 ||
      data.indexOf('stored the item') !== -1) {
    rowTypeID = 2;
  }
  // Tag/Untag (showTaggingMessages)
  else if (
      data.indexOf('has added flags to') !== -1 ||
      data.indexOf('has removed flags to') !== -1) {
    rowTypeID = 3;
  }
  // Relic messages (showRelicMessages)
  else if (
      data.indexOf('relic. This relic now has an empower level of') !== -1 ||
      / empowered the .+ relic/.test(data) ||
      data.indexOf(
        'relic. The relic empower level has been reset to zero.') !== -1 ||
      data.indexOf('failed to capture the relic') !== -1 ||
      data.indexOf('captured the relic') !== -1 ||
      data.indexOf('captured your relic') !== -1 ||
      data.indexOf('has captured the undefended relic') !== -1 ||
      data.indexOf('attempted to capture your relic') !== -1 ||
      / removed the empowerment from the .+ relic/.test(data)) {
    rowTypeID = 4;
  }
  // Mercenary messages (showMercenaryMessages)
  else if (
      data.indexOf('disbanded a mercenary.') !== -1 ||
      data.indexOf('hired the mercenary') !== -1) {
    rowTypeID = 5;
  }
  // Group Combat messages (showGroupCombatMessages)
  else if (
      data.indexOf('has disbanded one of their groups') !== -1 ||
      /A group from your guild was (.*) in combat./.test(data)) {
    rowTypeID = 6;
  }
  // Donation messages (showDonationMessages)
  else if (
      /deposited ([,0-9]+) FallenSword Points into the guild./.test(data) ||
      /deposited ([,0-9]+) gold into the guild bank/.test(data)) {
    rowTypeID = 7;
  }
  //Ranking messages (showRankingMessages)
  else if (
      data.indexOf('has added a new rank entitled') !== -1 ||
      data.indexOf('has deleted the rank') !== -1 ||
      data.indexOf('has requested to join the guild') !== -1 ||
      data.indexOf('has invited the player') !== -1 ||
      data.indexOf('has officially joined the guild') !== -1 ||
      data.indexOf('has been kicked from the guild by') !== -1 ||
      data.indexOf('has left the guild') !== -1 ||
      data.indexOf('has been assigned the rank') !== -1) {
    rowTypeID = 8;
  }
  //GvG messages (showGvGMessages)
  else if (
      data.indexOf('resulted in a draw. Your GvG rating and ' +
        'Guild RP was unaffected.') !== -1 ||
      /resulted in (.*) with a final score of/.test(data) ||
      data.indexOf('has just initiated a conflict with the guild') !== -1 ||
      data.indexOf('has initiated a conflict with your guild') !== -1 ||
      data.indexOf(
        'is participating in the conflict against the guild') !== -1) {
    rowTypeID = 9;
  }
  // Titan messages (showTitanMessages)
  else if (
      data.indexOf(
        'from your guild\'s contribution to the defeat of the titan') !== -1 ||
      data.indexOf('a 7 day cooldown has been activated on your ' +
        'guild for this titan') !== -1 ||
      data.indexOf('bought the Titan Reward item') !== -1) {
    rowTypeID = 10;
  }
  return rowTypeID;
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
  currPage = pageInput.value * 1;
  lastPage$1 = /\d+/.exec(pageInput.parentNode.textContent)[0] * 1;
  if (currPage === 1) {maxPage = Math.min(lastPage$1, maxPagesToFetch);}
  fshOutput.textContent = 'Loading ' + currPage + ' of ' + maxPage + '...';
}

function parseTable() {
  var tableList = doc.getElementsByClassName('width_full');
  if (tableList.length !== 1) {return;}
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

function processPage(data) {
  parsePage(data);
  parseTable();
}

function getOtherPages() {
  var prm = [];
  if (completeReload) {
    for (var i = 2; i <= maxPage; i += 1) {
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
  myTable = document.createElement('table');
  myTable.id = 'fshInjectHere';
  myTable.className = 'width_full';
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

  var pCC = document.getElementById('pCC');
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

function processFirstPage(data) {
  processPage(data);
  getOtherPages().done(gotOtherPages);
}

function toggleItem(self) {
  var item = self.getAttribute('item') * 1;
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
  getGuildLogPage(1).done(processFirstPage);
}

function eventHandler$2(evt) {
  var self = evt.target;
  if (self.tagName === 'INPUT') {toggleItem(self);}
  if (self.id === 'fshAll') {selectAll();}
  if (self.id === 'fshNone') {selectNone();}
  if (self.id === 'rfsh') {refresh$1();}
}

function gotOptions(guildLog$$1) {
  options$1 = guildLog$$1 || options$1;
  options$1.checks = options$1.checks || defChecks.slice(0);
  document.getElementById('pCC').innerHTML = guildLogFilter;
  fshNewGuildLog = document.getElementById('fshNewGuildLog');
  fshNewGuildLog.addEventListener('click', eventHandler$2);
  setChecks$1();
  fshOutput = document.getElementById('fshOutput');
  maxPagesToFetch = getValue('newGuildLogHistoryPages') * 1;
  maxPage = maxPagesToFetch;
  getGuildLogPage(1).done(processFirstPage);
}

function injectNewGuildLog() {
  getForage('fsh_guildLog').done(gotOptions);
}

function injectScouttowerBuffLinks() { // Legacy
  var titanTables = findNodes('//table[tbody/tr/td/font[.="Guild Member"]]');
  var titanTable;
  if (titanTables) {
    for (var i = 0; i < titanTables.length; i += 1) {
      titanTable = titanTables[i];
      var shortList = [];
      if (titanTable.rows.length <= 1) {continue;}
      for (var j = 1; j < titanTable.rows.length; j += 1) {
        if (titanTable.rows[j].cells[1]) {
          var firstCell = titanTable.rows[j].cells[0];
          var playerID = /player_id=(\d+)/.exec(firstCell.innerHTML)[1];
          shortList.push(firstCell.textContent);
          firstCell.innerHTML += ' <a style="color:blue;font-size:10px;" ' +
            quickBuffHref(playerID) + '>[b]</a>';
        }
      }
      titanTable.rows[0].cells[0].innerHTML += ' <a style="color:blue;font-size:10px;">all</a>';
      var buffAllLink = titanTable.rows[0].cells[0].firstChild.nextSibling.nextSibling;
      buffAllLink.setAttribute('href',buffAllHref(shortList));
    }
  }
}

function getScoutTowerDetails(responseText) { // Legacy
  var doc=createDocument(responseText);
  var scoutTowerTable = findNode(
    '//table[tbody/tr/td/img[contains(@src,"/banners/scouttower.png")]]',
    doc);
  if (scoutTowerTable) {
    var titanTable = findNode(
      '//table[tbody/tr/td/img[contains(@src,"/banners/titankilllog.png")]]');
    var newRow = titanTable.insertRow(0);
    var newCell = newRow.insertCell(0);
    newCell.align = 'center';
    newCell.innerHTML = scoutTowerTable.rows[1].cells[0].innerHTML +
      '<br><br>' ;
    newRow = titanTable.insertRow(1);
    newCell = newRow.insertCell(0);
    newCell.innerHTML = scoutTowerTable.rows[8].cells[0].innerHTML;
  }
  injectScouttowerBuffLinks();
}

function injectTitan() { // Legacy
  xmlhttp('index.php?cmd=guild&subcmd=scouttower',
    getScoutTowerDetails);
}

function injectScouttower() { // Legacy
  injectScouttowerBuffLinks();
  var titanTable = findNode('//table[@width="500"]');
  for (var i = 1; i < titanTable.rows.length; i += 1) {
    var aRow = titanTable.rows[i];
    if (aRow.cells[2]) {
      var titanHP = aRow.cells[2].textContent;
      if (titanHP.search('-') !== -1) {break;}
      var guildKills = aRow.cells[3].textContent;
      if (guildKills) {
        var titanHPArray = titanHP.split('/');
        var currentHP = parseInt(titanHPArray[0], 10);
        var totalHP = parseInt(titanHPArray[1], 10);
        var currentNumberOfKills = totalHP - currentHP;
        var numberOfKillsToSecure = Math.ceil(totalHP/2 + 1);

        var titanString = '<span style="color:red;">' +
          (numberOfKillsToSecure - guildKills) + '</span> to secure';
        if (guildKills >= numberOfKillsToSecure) {
          titanString = 'Secured';
        } else if (numberOfKillsToSecure - guildKills > currentHP) {
          titanString = '<span style="color:red;">Cannot Secure</span>';
        }
        var killsPercent = (currentNumberOfKills === 0 ? 0 :
          guildKills * 100/currentNumberOfKills).toFixed(2);
        var killsTotPct = (guildKills * 100/totalHP).toFixed(2);
        aRow.cells[3].innerHTML += '<br><span style="color:blue;"> (' +
          killsPercent + '% Current <br>' +
          killsTotPct + '% Total<br>' + titanString + ')';
      }
    }
  }
}

function hideFolder(evt) { // native
  if (evt.target.nodeName !== 'SPAN' ||
      evt.target.id.indexOf('folderid') === -1) {return;}
  var folderid = evt.target.id;
  var itemDiv = document.getElementById('item-div');
  if (!itemDiv) {
    itemDiv = document.createElement('div');
    itemDiv.id = 'item-div';
    itemDiv.className = 'itemDiv';
    var itemList = document.getElementById('item-list');
    var oldItems = itemList.getElementsByTagName('table');
    while (oldItems.length) {
      oldItems[0].classList.add('fshBlock');
      itemDiv.appendChild(oldItems[0]);
    }
    itemList.parentNode.insertBefore(itemDiv, itemList);
  }
  var items = itemDiv.getElementsByTagName('table');
  Array.prototype.forEach.call(items, function(el) {
    el.firstElementChild.lastElementChild.firstElementChild
      .firstElementChild.checked = false;
    var hidden = el.classList.contains('fshHide');
    var all = folderid === 'folderid0';
    var hasFolder = el.classList.contains(folderid);
    if (hidden && (all || hasFolder)) {
      el.classList.remove('fshHide');
      el.classList.add('fshBlock'); // show()
    }
    if (!hidden && !all && !hasFolder) {
      el.classList.remove('fshBlock');
      el.classList.add('fshHide'); // hide()
    }
  });
}

function doFolderHeaders(folders) { // native
  var foldersRow = document.createElement('tr');
  foldersRow.id = 'fshFolderSelect';
  var folderCell = '<td colspan=6>';
  //append main folder
  folderCell += '<span id="folderid0" class="fshLink" fid=0>All</span>' +
    ' &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>';
  Object.keys(folders).forEach(function(key) {
    folderCell += ' &ensp;<span id="folderid' + key +
      '" class="fshLink fshNoWrap" fid=' + key + '>' +
      folders[key] + '</span> ';
  });
  foldersRow.insertAdjacentHTML('afterbegin', folderCell);
  foldersRow.addEventListener('click', hideFolder);
  var multiple = document.getElementById('fshSelectMultiple');
  multiple.insertAdjacentHTML('afterend', '<tr id="fshShowSTs">' +
    '<td align="center" colspan=6>' +
    '<label><input type="checkbox" id="itemsInSt" checked> ' +
    'Select items in ST</label></td></tr>');
  multiple.insertAdjacentElement('afterend', foldersRow);
}

function processTrade(data) { // native

  time('trade.processTrade');

  var fshHasST = false;
  var invItems = data.items.reduce(function(prev, curr) {
    if (curr.is_in_st) {fshHasST = true;}
    prev[curr.inv_id] = curr;
    return prev;
  }, {});
  /* Highlight items in ST */
  var nodeList = document.getElementById('item-list')
    .getElementsByTagName('table');
  Array.prototype.forEach.call(nodeList, function(el) {
    var checkbox = el.firstElementChild.lastElementChild.firstElementChild
      .firstElementChild;
    var item = invItems[checkbox.getAttribute('value')];
    el.className = 'folderid' + item.folder_id +
      (fshHasST ? item.is_in_st ? ' isInSTBorder' : ' tradeItemMargin' : '');
    checkbox.className = 'itemid' + item.item_id + ' itemtype' + item.type +
      (item.is_in_st ? ' isInST' : '');
  });
  doFolderHeaders(data.folders);

  timeEnd('trade.processTrade');

}

function inv() { // jQuery
  inventory(true).done(function(data){
    add(3, processTrade, [data]);
  });
}

function toggleCheckAllPlants(evt) { // native
  if (!evt.target.classList.contains('fshCheckAll')) {return;}
  var itemid = evt.target.id;
  var itemList = document.getElementById('item-div') ||
    document.getElementById('item-list');
  var itemTables = itemList.querySelectorAll('table:not(.fshHide)');
  var howMany = parseInt(document.getElementById('fshSendHowMany').value, 10);
  var itemsInSt = document.getElementById('itemsInSt').checked;
  if (!isNaN(howMany)) {
    // maximum of 100 items in an ST
    if (calf.subcmd !== '-') {howMany = Math.min(100, howMany);}
  } else {howMany = itemTables.length;}
  Array.prototype.forEach.call(itemTables, function(el) {
    var checkbox = el.firstElementChild.lastElementChild.firstElementChild
      .firstElementChild;
    if (howMany &&
        (itemsInSt || !checkbox.classList.contains('isInST')) &&
        (itemid === 'itemid-1' ||
        itemid === 'itemid-2' &&
        checkbox.classList.contains('itemtype12') ||
        checkbox.classList.contains(itemid))) {
      checkbox.checked = true;
      howMany -= 1;
      return;
    }
    checkbox.checked = false;
  });
}

function injectTradeOld() { // native
  var multiple = document.createElement('tr');
  multiple.id = 'fshSelectMultiple';
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
  multiple.insertAdjacentHTML('afterbegin', myTd);
  multiple.addEventListener('click', toggleCheckAllPlants);
  var el = document.getElementById('item-list').parentNode.parentNode;
  el.parentNode.insertBefore(multiple, el);
}

function injectTrade() { // native
  add(3, inv);
  add(3, injectTradeOld);
}

// var system = require('./support/system');

/* jshint -W098 */
/*function getBpCountFromWorld(responseText) { // Legacy - Bad, could be repurposed
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

/*function multiSummary() { // Legacy - Bad, could be repurposed
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

function dontPost(e) { // jQuery
  e.preventDefault();
  window.location = 'index.php?cmd=scavenging&subcmd=process' +
    '&cave_id=' + $('#pCC input[name="cave_id"]:checked').val() +
    '&gold=' + $('#gold').val() + '&submit=Scavenge';
}

function injectScavenging() { // jQuery
  $('#pCC input[value="Scavenge"]').click(dontPost);
}

var monsterAry;

function noMobs() {
  document.getElementById('pCC').innerHTML = '<span>No monster information! ' +
    'Please enable entity log and travel a bit to see the world</span>';
}

function drawMobs() {
  var inject = document.getElementById('entityTableOutput');
  if (!monsterAry || !inject) {return;}
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
  inject.innerHTML = result;
}

function doHandlers(evt) {
  var target = evt.target;
  if (target.id === 'clearEntityLog') {
    setForage('fsh_monsterLog', '');
    noMobs();
    return;
  }
  if (!target.classList.contains('fshLink')) {return;}
  var headerClicked = target.getAttribute('sortKey');
  var sortType = target.getAttribute('sortType');
  if (!sortType) {sortType='string';}
  if (calf.sortAsc === undefined) {calf.sortAsc = true;}
  if (calf.sortBy && calf.sortBy === headerClicked) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
  monsterAry.sort(sortType === 'string' ? stringSort :
    numberSort);
  drawMobs();
}

function drawTable() {
  var content = document.getElementById('pCC');
  if (!monsterAry || !content) {return;}
  content.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" ' +
    'width="100%"><tr class="fshBlack fshWhite">' +
    '<td width="90%" class="fshCenter"><b>Entity Information</b></td>' +
    '<td width="10%">[<span id="clearEntityLog" class="buffLink">Clear' +
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
    if (tmpObj.enhancements) {
      var tmp = '<span class="fshXXSmall">';
      tmp += Object.keys(tmpObj.enhancements).reduce(function(prev, curr) {
        return prev + '<span class="fshNoWrap">' + curr + ': ' +
          tmpObj.enhancements[curr].min + ' - ' +
          tmpObj.enhancements[curr].max + '</span><br>';
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
var oldMoves = [];
var tableOpts = {
  paging: false,
  info: false,
  order: [[3, 'asc'],[0, 'asc']],
  columnDefs: [
    {orderable: false, targets: [8, 9]}
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
var tabs;
var theTables;
var opts;
var oldIds;
var nodes;
var selectRow;

function gotoPage(pageId) { // Native
  window.location = 'index.php?cmd=arena&subcmd=completed&page=' + pageId;
}

function dontPost$1(e) { // jQuery
  e.preventDefault();
  var self = $(e.target);
  var pvpId = self.prev().val();
  var subcmd = self.prev().prev().val();
  window.location = 'index.php?cmd=arena&subcmd=' + subcmd +
    '&pvp_id=' + pvpId;
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
      .replace(/\D/g,'');
    var finishButton = $('<input value=">>" type="button">');
    nextButton.after(finishButton).after('&nbsp;');
    finishButton.click(function() {gotoPage(lastPage);});
  }
  $('#pCC input[value="View"]').click(dontPost$1);
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
      'src': imageServer + '/world/actionLoadingSpinner.gif',
      'width': '25',
      'height': '25'
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
    .attr({'width': '15', 'height': '50'});

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

function changeLvls$1() { // jQuery
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

function resetLvls$1() { // jQuery
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

function filterHeader() { // jQuery

  var theRow = $('#pCC > table > tbody > tr:nth-child(7)');
  theRow.clone().insertBefore(theRow).find('td').attr('height', '2');
  theRow.clone().insertAfter(theRow).find('td').attr('height', '1');

  var aTable = $(arenaFilter);

  var fshHideMoves = $('#fshHideMoves', aTable);
  if (opts && 'hideMoves' in opts) {
    fshHideMoves.prop('checked', opts.hideMoves);
    $('.moveMax').toggle(!opts.hideMoves);
  }
  fshHideMoves.click(hideMoves);

  var fshMinLvl = $('#fshMinLvl', aTable);
  if (opts && 'minLvl' in opts) {
    fshMinLvl.val(opts.minLvl);
  } else {
    fshMinLvl.val(defaults.arenaMinLvl);
  }
  var fshMaxLvl = $('#fshMaxLvl', aTable);
  if (opts && 'maxLvl' in opts) {
    fshMaxLvl.val(opts.maxLvl);
  } else {
    fshMaxLvl.val(defaults.arenaMaxLvl);
  }
  $('#fshMinLvl, #fshMaxLvl', aTable).keyup(changeLvls$1);

  $('#fshReset', aTable).click(resetLvls$1);

  $('td', theRow).append(aTable);

}

function lvlFilter$1() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, data) {
      if (!opts ||
        !opts.minLvl ||
        !opts.maxLvl) {return true;}
      var min = opts.minLvl;
      var max = opts.maxLvl;
      var level = intValue(data[7]);
      if (isNaN(min) && isNaN(max) ||
        isNaN(min) && level <= max ||
        min <= level && isNaN(max) ||
        min <= level && level <= max )
      {return true;}
      return false;
    }
  );
}

function boolData(cell) { // jQuery
  var matches = /(\d)\.gif/.exec($('img', cell).attr('src'));
  if (matches) {cell.attr('data-order', matches[1]);}
}

function maxMoves(cell, row) { // jQuery
  if (!opts || !opts.moves) {return;}
  var matches = /\/pvp\/(\d+)\.gif/.exec($('img', cell).attr('src'));
  if (matches &&
    opts.moves[matches[1]] &&
    opts.moves[matches[1]].count === 3) {
    row.addClass('moveMax');
  }
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

  cell = theCells.eq(1);
  matches = /(\d+)\s\/\s(\d+)/.exec(cell.text());
  if (matches) {cell.attr('data-order', matches[2] * 1000 + matches[1] * 1);}

  cell = theCells.eq(2);
  cell.attr('data-order',
    $('td', cell).first().text().replace(/[,\s]/g, ''));

  boolData(theCells.eq(4));
  boolData(theCells.eq(5));
  boolData(theCells.eq(6));
  maxMoves(theCells.eq(8), row);

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
  lvlFilter$1();
  theTables.DataTable(tableOpts);
  $('td.sorting, td.sorting_asc, td.sorting_desc', tabs).off('click');
  $('div.dataTables_filter').hide();
  tabs.on('click', 'td.sorting, td.sorting_asc, td.sorting_desc', sortHandler);
  tabs.on('click', 'input.custombutton[type="submit"]', dontPost$1);

  timeEnd('arena.process');

}

function storeMoves() { // jQuery
  getForage('fsh_arena').done(function(arena) {
    arena = arena || {};
    arena.moves = {};
    var arenaMoves = $('#pCC img[vspace="4"]').slice(1);
    arenaMoves.each(function() {
      var self = $(this);
      var src = self.attr('src');
      var moveId = /(\d+)\.gif/.exec(src)[1];
      arena.moves[moveId] = {};
      arena.moves[moveId].count = /(\d)$/.exec(self.closest('td').html())[1] * 1;
      arena.moves[moveId].href = src;
    });
    setForage('fsh_arena', arena);
  });
}

function injectArena() { // jQuery
  tabs = $('#arenaTypeTabs');
  if (tabs.length !== 1) {return;} // Join error screen
  theTables = $('table[width="635"]', tabs);
  getForage('fsh_arena').done(process);
}

function allowBack() { // Native
  document.querySelector('input[type="submit"]')
    .addEventListener('click', function(e) {
      e.preventDefault();
      var url = 'index.php?';
      Array.prototype.forEach.call(
        document.querySelectorAll('input:not([type="submit"])' +
          ':not([type="checkbox"]), select, input[type="checkbox"]:checked'),
        function(e) {url += '&' + e.name + '=' + e.value;});
      window.location = url;
    });
}

function showAllQuestSteps() { // Native
  if (!getValue('showNextQuestSteps')) {return;}
  Array.prototype.forEach.call(document.querySelectorAll('div[id^="stage"]'),
    function(e) {e.style.display = 'block';});
  document.getElementById('next_stage_button').style.display = 'none';
}

function getRelicPlayerBuffs(responseText) { // jQuery - Old map
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Processing attacking group stats ... ');

  var player = playerData(responseText);
  var groupAttackElement = $('td[title="GroupAttack"]');
  var groupAttackBuffedElement = $('td[title="GroupAttackBuffed"]');
  groupAttackElement.html(
    addCommas(calf.relicGroupAttackValue));
  var nightmareVisageEffect = Math.ceil(calf.relicGroupAttackValue *
    (player.nightmareVisageLevel * 0.0025));
  calf.relicGroupAttackValue = calf.relicGroupAttackValue -
    nightmareVisageEffect;
  var storedFlinchLevel =
    intValue($('td[title="LDFlinchLevel"]').text());
  var storedFlinchEffectValue = Math.ceil(calf.relicGroupAttackValue *
    storedFlinchLevel * 0.001);
  groupAttackBuffedElement.html(addCommas(
    calf.relicGroupAttackValue - storedFlinchEffectValue));
  var defenseWithConstitution = Math.ceil(calf.relicGroupDefenseValue *
    (1 + player.constitutionLevel * 0.001));
  var totalDefense = defenseWithConstitution + nightmareVisageEffect;
  var groupDefenseElement = $('td[title="GroupDefense"]');
  var groupDefenseBuffedElement = $('td[title="GroupDefenseBuffed"]');
  groupDefenseElement.html(addCommas(
    calf.relicGroupDefenseValue));
  groupDefenseBuffedElement.html(addCommas(totalDefense));
  var groupArmorElement = $('td[title="GroupArmor"]');
  var groupArmorBuffedElement = $('td[title="GroupArmorBuffed"]');
  groupArmorElement.html(
    addCommas(calf.relicGroupArmorValue));
  groupArmorBuffedElement.html(addCommas(
    calf.relicGroupArmorValue +
    Math.floor(calf.relicGroupArmorValue * player.sanctuaryLevel *
    0.001)));
  var groupDamageElement = $('td[title="GroupDamage"]');
  var groupDamageBuffedElement = $('td[title="GroupDamageBuffed"]');
  var groupHPElement = $('td[title="GroupHP"]');
  var groupHPBuffedElement = $('td[title="GroupHPBuffed"]');
  var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
    player.fortitudeLevel * 0.001);
  var chiStrikeBonusDamage = Math.ceil((calf.relicGroupHPValue +
    fortitudeBonusHP) * player.chiStrikeLevel * 0.001);
  var storedTerrorizeLevel = intValue(
    $('td[title="LDTerrorizeLevel"]').text());
  var storedTerrorizeEffectValue = Math.ceil(
    calf.relicGroupDamageValue * storedTerrorizeLevel * 0.001);
  groupDamageElement.html(
    addCommas(calf.relicGroupDamageValue));
  groupDamageBuffedElement.html(addCommas(
    calf.relicGroupDamageValue + chiStrikeBonusDamage -
    storedTerrorizeEffectValue));
  groupHPElement.html(addCommas(calf.relicGroupHPValue));
  groupHPBuffedElement.html(
    addCommas(calf.relicGroupHPValue + fortitudeBonusHP));

  //Effect on defending group from Flinch on attacking group.
  var defGuildBuffedAttackElement = $('td[title="attackValueBuffed"]');
  var defGuildBuffedAttackValue = intValue(
    defGuildBuffedAttackElement.text());
  var flinchEffectValue = Math.ceil(defGuildBuffedAttackValue *
    player.flinchLevel * 0.001);
  defGuildBuffedAttackElement.html(addCommas(
    defGuildBuffedAttackValue - flinchEffectValue));
  var defGuildBuffedDamageElement = $('td[title="damageValueBuffed"]');
  var defGuildBuffedDamageValue = intValue(
    defGuildBuffedDamageElement.text());
  var terrorizeEffectValue = Math.ceil(defGuildBuffedDamageValue *
    player.terrorizeLevel * 0.001);
  defGuildBuffedDamageElement.html(addCommas(
    defGuildBuffedDamageValue - terrorizeEffectValue));

  processingStatus.html('Done.');
}

function parseRelicMercStats(responseText) { // Hybrid - Old map
  //merc stats do not count for group stats so subtract them here ...
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Subtracting group merc stats ... ');

  var mercPage = createDocument(responseText);
  var mercElements = mercPage.getElementsByTagName('IMG');
  var totalMercAttack = 0;
  var totalMercDefense = 0;
  var totalMercArmor = 0;
  var totalMercDamage = 0;
  var totalMercHP = 0;
  var merc;
  for (var i = 0; i < mercElements.length; i += 1) {
    merc = mercElements[i];
    var mouseoverText = $(merc).data('tipped');
    var src = merc.getAttribute('src');
    if (mouseoverText && src.search('/merc/') !== -1){
      var attackRE = /<td>Attack:<\/td><td>(\d+)<\/td>/;
      var mercAttackValue = attackRE.exec(mouseoverText)[1] * 1;
      totalMercAttack += mercAttackValue;
      var defenseRE = /<td>Defense:<\/td><td>(\d+)<\/td>/;
      var mercDefenseValue = defenseRE.exec(mouseoverText)[1] * 1;
      totalMercDefense += mercDefenseValue;
      var armorRE = /<td>Armor:<\/td><td>(\d+)<\/td>/;
      var mercArmorValue = armorRE.exec(mouseoverText)[1] * 1;
      totalMercArmor += mercArmorValue;
      var damageRE = /<td>Damage:<\/td><td>(\d+)<\/td>/;
      var mercDamageValue = damageRE.exec(mouseoverText)[1] * 1;
      totalMercDamage += mercDamageValue;
      var hpRE = /<td>HP:<\/td><td>(\d+)<\/td>/;
      var mercHPValue = hpRE.exec(mouseoverText)[1] * 1;
      totalMercHP += mercHPValue;
    }
  }
  calf.relicGroupAttackValue =
    calf.relicGroupAttackValue - Math.round(totalMercAttack * 0.2);
  calf.relicGroupDefenseValue =
    calf.relicGroupDefenseValue - Math.round(totalMercDefense * 0.2);
  calf.relicGroupArmorValue =
    calf.relicGroupArmorValue - Math.round(totalMercArmor * 0.2);
  calf.relicGroupDamageValue =
    calf.relicGroupDamageValue - Math.round(totalMercDamage * 0.2);
  calf.relicGroupHPValue =
    calf.relicGroupHPValue - Math.round(totalMercHP * 0.2);

  xmlhttp('index.php?cmd=profile',
    getRelicPlayerBuffs);
}

function getRelicGroupData(responseText) { // Hybrid - Old map
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Parsing attacking group stats ... ');
  var doc = createDocument(responseText);
  var theTable = $('#pCC table table table', doc);
  calf.relicGroupAttackValue =
    intValue($('#stat-attack', theTable).text());
  calf.relicGroupDefenseValue =
    intValue($('#stat-defense', theTable).text());
  calf.relicGroupArmorValue =
    intValue($('#stat-armor', theTable).text());
  calf.relicGroupDamageValue =
    intValue($('#stat-damage', theTable).text());
  calf.relicGroupHPValue =
    intValue($('#stat-hp', theTable).text());
  xmlhttp('index.php?cmd=guild&subcmd=mercs',
    parseRelicMercStats);
}

function relicCheckIfGroupExists(responseText) { // Hybrid - Old map
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Checking attacking group ... ');
  var doc = createDocument(responseText);
  var groupExistsIMG =
    $(doc).find('img[title="Disband Group (Cancel Attack)"]');
  if (groupExistsIMG.length > 0) {
    var groupHref = groupExistsIMG.parents('td:first').find('a:first')
      .attr('href');
    xmlhttp(groupHref, getRelicGroupData);
  } else {
    processingStatus.html('Done.');
  }
}

function processRelicStats() { // Legacy - Old map
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Processing defending guild stats ... ');
  var relicCountValue = $('td[title="relicCount"]');
  var relicCount = intValue(relicCountValue.html());
  var relicMultiplier = 1;
  if (relicCount === 1) {
    relicMultiplier = 1.5;
  }
  else if (relicCount >= 2) {
    relicMultiplier = Math.round((1 - relicCount/10)*100)/100;
  }

  var LDConstitutionLevel =
    intValue($('td[title="LDConstitutionLevel"]').text());
  var LDNightmareVisageLevel =
    intValue($('td[title="LDNightmareVisageLevel"]').text());
  var LDFortitudeLevel =
    intValue($('td[title="LDFortitudeLevel"]').text());
  var LDChiStrikeLevel =
    intValue($('td[title="LDChiStrikeLevel"]').text());
  var LDSanctuaryLevel =
    intValue($('td[title="LDSanctuaryLevel"]').text());
  var attackValue = $('td[title="attackValue"]');
  var attackValueBuffed = $('td[title="attackValueBuffed"]');
  var LDattackValue = $('td[title="LDattackValue"]');
  var attackNumber = intValue(attackValue.html());
  var LDattackNumber = intValue(LDattackValue.html());
  var overallAttack =
    attackNumber + Math.round(LDattackNumber * relicMultiplier);
  attackValue.html(addCommas(overallAttack));
  var nightmareVisageEffect =
    Math.ceil(overallAttack * (LDNightmareVisageLevel * 0.0025));
  attackValueBuffed.html(
    addCommas(overallAttack - nightmareVisageEffect));
  var defenseValue = $('td[title="defenseValue"]');
  var defenseValueBuffed = $('td[title="defenseValueBuffed"]');
  var LDdefenseValue = $('td[title="LDdefenseValue"]');
  var defenseNumber = intValue(defenseValue.html());
  var LDdefenseNumber = intValue(LDdefenseValue.html());
  var overallDefense =
    defenseNumber + Math.round(LDdefenseNumber * relicMultiplier);
  defenseValue.html(addCommas(overallDefense));
  var defenseWithConstitution =
    Math.ceil(overallDefense * (1 + LDConstitutionLevel * 0.001));
  var totalDefense = defenseWithConstitution + nightmareVisageEffect;
  defenseValueBuffed.html(addCommas(totalDefense));
  var dc225 = $('td[title="DC225"]');
  var dc175 = $('td[title="DC175"]');
  dc225.html(addCommas(
    Math.ceil(totalDefense * (1 - 225 * 0.002))));
  dc175.html(addCommas(
    Math.ceil(totalDefense * (1 - 175 * 0.002))));
  var armorValue = $('td[title="armorValue"]');
  var armorValueBuffed = $('td[title="armorValueBuffed"]');
  var LDarmorValue = $('td[title="LDarmorValue"]');
  var armorNumber = intValue(armorValue.html());
  var LDarmorNumber = intValue(LDarmorValue.html());
  var totalArmor = armorNumber + Math.round(LDarmorNumber * relicMultiplier);
  armorValue.html(addCommas(totalArmor));
  armorValueBuffed.html(addCommas(totalArmor +
    Math.floor(totalArmor * LDSanctuaryLevel * 0.001)));
  var damageValue = $('td[title="damageValue"]');
  var damageValueBuffed = $('td[title="damageValueBuffed"]');
  var LDdamageValue = $('td[title="LDdamageValue"]');
  var damageNumber = intValue(damageValue.html());
  var LDdamageNumber = intValue(LDdamageValue.html());
  var hpValue = $('td[title="hpValue"]');
  var hpValueBuffed = $('td[title="hpValueBuffed"]');
  var LDhpValue = $('td[title="LDhpValue"]');
  var hpNumber = intValue(hpValue.html());
  var LDhpNumber = intValue(LDhpValue.html());
  var fortitudeBonusHP =
    Math.ceil(defenseWithConstitution * LDFortitudeLevel * 0.001);
  var chiStrikeBonusDamage = Math.ceil((hpNumber +
    Math.round(LDhpNumber * relicMultiplier) + fortitudeBonusHP) *
      LDChiStrikeLevel * 0.001);
  damageValue.html(addCommas(damageNumber +
    Math.round(LDdamageNumber * relicMultiplier)));
  damageValueBuffed.html(addCommas(damageNumber +
    Math.round(LDdamageNumber * relicMultiplier) + chiStrikeBonusDamage));
  hpValue.html(addCommas(hpNumber +
    Math.round(LDhpNumber * relicMultiplier)));
  hpValueBuffed.html(addCommas(hpNumber +
    Math.round(LDhpNumber * relicMultiplier) + fortitudeBonusHP));
  var LDpercentageValue = $('td[title="LDPercentage"]');
  LDpercentageValue.html(relicMultiplier*100 + '%');

  xmlhttp('index.php?cmd=guild&subcmd=groups',
    relicCheckIfGroupExists);
}

function syncRelicData() { // jQuery - Bad - Old map
  var defendersProcessed = $('td[title="defendersProcessed"]');
  var defendersProcessedNumber =
    intValue(defendersProcessed.html());
  var relicProcessedValue = $('td[title="relicProcessed"]');
  if (calf.relicDefenderCount === defendersProcessedNumber &&
    relicProcessedValue.html() === '1') {
    processRelicStats();
  }
}

function parseRelicGuildData(responseText) { // jQuery - Old map
  var doc = createDocument(responseText);
  var relicCount = $('#pCC table table table img[data-tipped*="' +
    'Relic Bonuses"]', doc).length;
  var relicCountElement = $('td[title="relicCount"]');
  relicCountElement.html(relicCount);
  var relicProcessedElement = $('td[title="relicProcessed"]');
  relicProcessedElement.html(1);
  syncRelicData();
}

function getRelicGuildData(extraTextInsertPoint, hrefpointer) { // Legacy - Old map
  xmlhttp(hrefpointer, parseRelicGuildData);
}

function leadDefender(player) { // jQuery - Old map
  //get lead defender (LD) buffs here for use later ... 
  var attackValue = $('td[title="LDattackValue"]');
  var attackNumber = intValue(attackValue.html());
  attackValue.html(addCommas(attackNumber +
    Math.round(player.attackValue)));
  var defenseValue = $('td[title="LDdefenseValue"]');
  var defenseNumber = intValue(defenseValue.html());
  defenseValue.html(addCommas(defenseNumber +
    Math.round(player.defenseValue)));
  var armorValue = $('td[title="LDarmorValue"]');
  var armorNumber=intValue(armorValue.html());
  armorValue.html(addCommas(armorNumber +
    Math.round(player.armorValue)));
  var damageValue = $('td[title="LDdamageValue"]');
  var damageNumber=intValue(damageValue.html());
  damageValue.html(addCommas(damageNumber +
    Math.round(player.damageValue)));
  var hpValue = $('td[title="LDhpValue"]');
  var hpNumber=intValue(hpValue.html());
  hpValue.html(addCommas(hpNumber + Math.round(player.hpValue)));
  var defendersProcessed = $('td[title="defendersProcessed"]');
  var defendersProcessedNumber =
    intValue(defendersProcessed.html());
  defendersProcessed.html(
    addCommas(defendersProcessedNumber + 1));

  $('td[title="LDProcessed"]').html(1);
  $('td[title="LDConstitutionLevel"]').html(player.constitutionLevel);
  $('td[title="LDFlinchLevel"]').html(player.flinchLevel);
  $('td[title="LDNightmareVisageLevel"]').html(player.nightmareVisageLevel);
  $('td[title="LDFortitudeLevel"]').html(player.fortitudeLevel);
  $('td[title="LDChiStrikeLevel"]').html(player.chiStrikeLevel);
  $('td[title="LDTerrorizeLevel"]').html(player.terrorizeLevel);
  $('td[title="LDSanctuaryLevel"]').html(player.sanctuaryLevel);
}

function parseRelicPlayerData(responseText, callback) { // jQuery - Old map
  var defenderMultiplier;
  var attackValue;
  var defenseValue;
  var overallDefense;
  var armorValue;
  var damageValue;
  var hpValue;
  var defendersProcessed;
  var defendersProcessedNumber;
  var attackNumber;
  var defenseNumber;
  var armorNumber;
  var damageNumber;
  var hpNumber;

  var defenderCount = callback.defenderCount;

  var player = playerData(responseText);

  if (defenderCount !== 0) {
    defenderMultiplier = 0.2;
    attackValue = $('td[title="attackValue"]');
    attackNumber = intValue(attackValue.html());
    attackValue.html(addCommas(attackNumber +
      Math.round(player.attackValue * defenderMultiplier)));
    defenseValue = $('td[title="defenseValue"]');
    defenseNumber = intValue(defenseValue.html());
    overallDefense =
      defenseNumber + Math.round(player.defenseValue * defenderMultiplier);
    defenseValue.html(addCommas(overallDefense));
    armorValue = $('td[title="armorValue"]');
    armorNumber = intValue(armorValue.html());
    armorValue.html(addCommas(armorNumber +
      Math.round(player.armorValue * defenderMultiplier)));
    damageValue = $('td[title="damageValue"]');
    damageNumber = intValue(damageValue.html());
    damageValue.html(addCommas(damageNumber +
      Math.round(player.damageValue * defenderMultiplier)));
    hpValue = $('td[title="hpValue"]');
    hpNumber = intValue(hpValue.html());
    hpValue.html(addCommas(hpNumber +
      Math.round(player.hpValue * defenderMultiplier)));
    defendersProcessed = $('td[title="defendersProcessed"]');
    defendersProcessedNumber =
      intValue(defendersProcessed.html());
    defendersProcessed.html(
      addCommas(defendersProcessedNumber + 1));
  }
  else {
    leadDefender(player);
  }
  syncRelicData();
}

function getRelicPlayerData(defenderCount, hrefpointer, pl) { // Hybrid - Old map
  if (defenderCount === 0) {
    xmlhttp(
      hrefpointer,
      parseRelicPlayerData,
      {'defenderCount': defenderCount}
    );
  } else {
    $.ajax({
      cache: false,
      dataType: 'json',
      url:'index.php',
      data: {
        'cmd': 'export',
        'subcmd': 'profile',
        'player_username': pl
      },
      success: function(data) {
        parseRelicPlayerData(data,
          {'defenderCount': defenderCount});
      }
    });
  }
}

function calculateRelicDefenderStats() { // Legacy - Old map
  var validMemberString;
  var membrList = calf.membrList;
  //hide the calc button
  $('input[id="calculatedefenderstats"]').css('visibility','hidden');
  //make the text smaller
  $('td:contains("Below is the current status for the relic"):last')
    .css('fontSize','x-small');
  //set the colspan of all other rows to 3
  $('table[width="600"]>tbody>tr:not(:eq(9))>td').attr('colspan',3);

  var tableWithBorderElement = $('table[cellpadding="5"]');
  tableWithBorderElement
    .attr('align','left')
    .attr('colSpan',2);
  var tableInsertPoint = tableWithBorderElement.parents('tr:first');
  tableInsertPoint.append('<td colspan="1"><table width="200" style="' +
    'border:1px solid #A07720;"><tbody><tr><td id="InsertSpot"></td>' +
    '</tr></tbody></table></td>');
  var extraTextInsertPoint = findNode('//td[@id="InsertSpot"]');
  var defendingGuildHref = $('a[href*="index.php?cmd=guild&subcmd=view' +
    '&guild_id="]:first').attr('href');
  getRelicGuildData(extraTextInsertPoint,defendingGuildHref);

  var defendingGuildMiniSRC = $('img[src*="_mini.jpg"]').attr('src');
  var defendingGuildID = /guilds\/(\d+)_mini.jpg/
    .exec(defendingGuildMiniSRC)[1];
  var myGuildID = guildId().toString();

  var hideRelicOffline = getValue('hideRelicOffline');
  if (defendingGuildID === myGuildID && !hideRelicOffline) {
    validMemberString = '';
    Object.keys(membrList).forEach(function(val) {
      var member = membrList[val];
      var lastLogin = 0;
      if (member.last_login) {
        lastLogin = Math.floor(Date.now() / 1000 -
          member.last_login);
      }
      if (lastLogin >= 120 && // two minutes is offline
        lastLogin <= 604800 && // 7 days max
        (member.level < 400 || member.level > 421 &&
        member.level < 441 || member.level > 450)) {
        validMemberString += member.username + ' ';
      }
    });
  }

  var defenders = $('#pCC table table a[href*="cmd=profile&player_id="]');
  defenders.each(function(ind) {
    var $this = $(this);
    getRelicPlayerData(ind, $this.attr('href'), $this.text());
    if (defendingGuildID === myGuildID && !hideRelicOffline) {
      validMemberString = validMemberString.replace(
        $this.text() + ' ','');
    }
  });
  calf.relicDefenderCount = defenders.length;

  var textToInsert = '<tr><td><table class="relicT">' +
    '<tr><td colspan="2" class="headr">Defending Guild Stats</td></tr>' +
    '<tr><td class="brn">Number of Defenders:</td>' +
      '<td>' + calf.relicDefenderCount + '</td></tr>' +
    '<tr><td class="brn">Relic Count:</td>' +
      '<td title="relicCount">0</td></tr>' +
    '<tr><td class="brn">Lead Defender Bonus:</td>' +
      '<td title="LDPercentage">0</td></tr>' +
    '<tr class="hidden"><td>Relic Count Processed:</td>' +
      '<td title="relicProcessed">0</td></tr>' +
    '<tr class="hidden">' +
      '<td colspan="2" class="headr">Lead Defender Full Stats</td></tr>' +
    '<tr class="hidden"><td>Attack:</td>' +
      '<td title="LDattackValue">0</td></tr>' +
    '<tr class="hidden"><td>Defense:</td>' +
      '<td title="LDdefenseValue">0</td></tr>' +
    '<tr class="hidden"><td>Armor:</td>' +
      '<td title="LDarmorValue">0</td></tr>' +
    '<tr class="hidden"><td>Damage:</td>' +
      '<td title="LDdamageValue">0</td></tr>' +
    '<tr class="hidden"><td>HP:</td>' +
      '<td title="LDhpValue">0</td></tr>' +
    '<tr class="hidden"><td>LDProcessed:</td>' +
      '<td title="LDProcessed">0</td></tr>' +
    '<tr class="hidden"><td>LDFlinchLevel:</td>' +
      '<td title="LDFlinchLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDConstitutionLevel:</td>' +
      '<td title="LDConstitutionLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDNightmareVisageLevel:</td>' +
      '<td title="LDNightmareVisageLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDFortitudeLevel:</td>' +
      '<td title="LDFortitudeLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDChiStrikeLevel:</td>' +
      '<td title="LDChiStrikeLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDTerrorizeLevel:</td>' +
      '<td title="LDTerrorizeLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDSanctuaryLevel:</td>' +
      '<td title="LDSanctuaryLevel">0</td></tr>' +
    '<tr><td colspan="2" class="headr">Other Defender Stats</td></tr>' +
    '<tr><td class="brn">Raw Attack:</td>' +
      '<td class="grey" title="attackValue">0</td></tr>' +
    '<tr><td class="brn">Attack w/ buffs:</td>' +
      '<td title="attackValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Defense:</td>' +
      '<td class="grey" title="defenseValue">0</td></tr>' +
    '<tr><td class="brn">Defense w/buffs:</td>' +
      '<td title="defenseValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Armor:</td>' +
      '<td title="armorValue">0</td></tr>' +
    '<tr><td class="brn">Armor w/ buffs:</td>' +
      '<td title="armorValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Damage:</td>' +
      '<td class="grey" title="damageValue">0</td></tr>' +
    '<tr><td class="brn">Damage w/ buffs:</td>' +
      '<td title="damageValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw HP:</td>' +
      '<td class="grey" title="hpValue">0</td></tr>' +
    '<tr><td class="brn">HP w/ buffs:</td>' +
      '<td title="hpValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Processed:</td>' +
      '<td title="defendersProcessed">0</td></tr>' +
    '<tr><td class="headr" colspan=2>Adjusted defense values:</td></tr>' +
    '<tr><td class="brn">DC225:</td>' +
      '<td title="DC225">0</td></tr>' +
    '<tr><td class="brn">DC175:</td>' +
      '<td title="DC175">0</td></tr>' +
    '<tr><td class="headr" colspan=2>Attacking Group Stats:</td></tr>' +
    '<tr><td class="brn">Raw Group Attack:</td>' +
      '<td class="grey" title="GroupAttack"></td></tr>' +
    '<tr><td class="brn">Group Attack w/ buffs:</td>' +
      '<td title="GroupAttackBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Defense:</td>' +
      '<td class="grey" title="GroupDefense"></td></tr>' +
    '<tr><td class="brn">Group Defense w/ buffs:</td>' +
      '<td title="GroupDefenseBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Armor:</td>' +
      '<td title="GroupArmor"></td></tr>' +
    '<tr><td class="brn">Group Armor w/ buffs:</td>' +
      '<td title="GroupArmorBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Damage:</td>' +
      '<td class="grey" title="GroupDamage"></td></tr>' +
    '<tr><td class="brn">Group Damage w/ buffs:</td>' +
      '<td title="GroupDamageBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group HP:</td>' +
      '<td class="grey" title="GroupHP"></td></tr>' +
    '<tr><td class="brn">Group HP w/ buffs:</td>' +
      '<td title="GroupHPBuffed"></td></tr>' +
    '<tr><td class="headr" colspan=2>Processing:</td></tr>' +
    '<tr><td style="color:green;" colspan="2" title="ProcessingStatus">' +
      'Parsing defending guild stats ...</td></tr>' +
    '<tr><td class="headr" colspan=2>Assumptions:</td></tr>' +
    '<tr><td colspan="2" class="grey">Above calculations include ' +
      'Constitution, Fortitude, Nightmare Visage, Chi Strike, Terrorize ' +
      'and Flinch bonus calculations (in that order) on both the ' +
      'defending group and attacking group.</td></tr>';

  if (defendingGuildID === myGuildID && !hideRelicOffline) {
    validMemberString = validMemberString.slice(0, -1);
    var validMemberArray = validMemberString.split(' ');
    validMemberArray.forEach(function(val, ind, arr) {
      if (membrList[val]) {
        arr[ind] = '<a style="color:red;" href="index.php?cmd=' +
          'profile&player_id=' + membrList[val].id + '">' +
          val + '</a>';
      }
    });
    validMemberString = validMemberArray.join(' ');

    textToInsert += '<tr><td class="headr" colspan=2>Offline guild ' +
        'members not at relic:</td></tr>' +
      '<tr title="offlinePlayerListControl">' +
        '<td colspan=2 style="color:red;" title="offlinePlayerList">' +
        validMemberString + '</td></tr>' +
      '<tr class="hidden"><td class="brn">OfflinePlayerCount:</td>' +
        '<td title="offlinePlayerCount">' + validMemberArray.length +
        '</td></tr>' +
      '<tr class="hidden"><td class="brn">OfflinePlayersProcessed:</td>' +
        '<td title="offlinePlayersProcessed">0</td></tr>' +
      '<tr class="hidden" title="offlinePlayerListControlTemp" ' +
        'style="display:block;"><td style="color:green;" colspan=2>' +
        'Checking offline status ...</td></tr>';
  }
  textToInsert += '</table><td><tr>';
  extraTextInsertPoint.innerHTML += textToInsert;
}

function injectRelic() { // Hybrid - Old map
  var relicNameElement = $('td:contains("Below is the current status ' +
    'for the relic"):last');
  relicNameElement.css('font-size', 'x-small');

  var injectHere = $('td:contains("Defended"):last');
  if (injectHere.length === 0) {return;}
  var defendingGuildMiniSRC = $('img[src*="_mini.jpg"]').attr('src');
  var defendingGuildID = /guilds\/(\d+)_mini.jpg/
    .exec(defendingGuildMiniSRC)[1];
  if (defendingGuildID === guildId().toString()) {
    var listOfDefenders = injectHere.next().text().split(',');
    // quick buff only supports 16
    var shortList = [];
    if (listOfDefenders) {
      var modifierWord;
      for (var i = 0; i < listOfDefenders.length; i += 1) {
        shortList.push(listOfDefenders[i]);
        if ((i + 1) % 16 === 0 && i !== 0 ||
          i === listOfDefenders.length - 1) {
          modifierWord = places[Math.floor(i / 16)];
          var htmlToAppend = '<br><nobr><a href="#" id="buffAll' +
            modifierWord + '"><span style="color:blue; font-' +
            'size:x-small;" title="Quick buff functionality ' +
            'from HCS only does 16">Buff ' + modifierWord +
            ' 16</span></a></nobr>';
          injectHere.append(htmlToAppend);
          var buffAllLink = $('#buffAll' + modifierWord);
          buffAllLink.attr('href', buffAllHref(shortList));
          shortList = [];
        }
      }
    }
  }
  injectHere.append('<input id="calculatedefenderstats" type="button" ' +
    'value="Fetch Stats" title="Calculate the stats of the players ' +
    'defending the relic." class="custombutton">');
  document.getElementById('calculatedefenderstats')
    .addEventListener('click',
      function() {
        getMembrList(false)
          .done(calculateRelicDefenderStats);
      },
      true);
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
    0: {generalVariable: 1.1053, hpVariable: 1.1},
    1: {generalVariable: 1.1, hpVariable: 1.053},
    2: {generalVariable: 1.053, hpVariable: 1},
    3: {generalVariable: 1.1053, hpVariable: 1}
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

function doFormGroup(e) { // jQuery
  e.preventDefault();
  $(e.target).qtip('hide');
  GameData.doAction(12, 385, {}, 0);
}

function openQuickBuff(e) { // Native
  e.preventDefault();
  window.openWindow('index.php?cmd=quickbuff&t=' +
    playerName(),
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

function showQuickLinks(worldName, data) { // jQuery
  worldName.append('Min Lvl: ' + data.realm.minlevel);
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
  var img = getValue('playNewMessageSound') === true ?
    assets.soundMuteImage :
    assets.soundImage;
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
  var img = calf.huntingMode === true ? assets.huntingOnImage :
    assets.huntingOffImage;
  worldName.append('&nbsp;').append(img);
  worldName.on('click', '#HelperToggleHuntingMode',
    toggleHuntMode);
}

function injectButtons(data) { // jQuery
  var worldName = $('#worldName');
  worldName.html(data.realm.name); //HACK - incase of switchign between master realm and realm they dont replace teh realm name
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

function updateMinMax(logStat, creatureStat) {
  logStat = logStat || {};
  logStat.min = logStat.min ? Math.min(logStat.min, creatureStat) :
    creatureStat;
  logStat.max = logStat.max ? Math.max(logStat.max, creatureStat) :
    creatureStat;
  return logStat;
}

function processMonsterLog() {
  if (!showMonsterLog) {return;}
  monsterLog[creature.name] = monsterLog[creature.name] || {};
  var logCreature = monsterLog[creature.name];
  logCreature.creature_class = logCreature.creature_class ||
    creature.creature_class;
  logCreature.image_id = logCreature.image_id || creature.image_id;
  logCreature.level = logCreature.level || creature.level * 1;
  logCreature.type = logCreature.type || creature.type;
  logCreature.armor = updateMinMax(logCreature.armor, creature.armor * 1);
  logCreature.attack = updateMinMax(logCreature.attack, creature.attack * 1);
  logCreature.damage = updateMinMax(logCreature.damage, creature.damage * 1);
  logCreature.defense = updateMinMax(logCreature.defense,
    creature.defense * 1);
  logCreature.hp = updateMinMax(logCreature.hp, creature.hp * 1);
  if (creature.enhancements) {
    logCreature.enhancements = logCreature.enhancements || {};
    var logEnh = logCreature.enhancements;
    creature.enhancements.forEach(function(e) {
      logEnh[e.name] = updateMinMax(logEnh[e.name], e.value * 1);
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

function processMouseOver(data) {
  if (!showCreatureInfo) {return;}
  var actions = document.getElementById('actionList').children;
  if (actions.length === 1 &&
      actions[0].classList.contains('hcs-state-disabled') || // In motion
      actions.length - 1 < data.passback || // Not enough actions
      creature.id !== actionData[data.passback].data.id.toString()) { // Different action list
    return;
  }
  monster = actions[data.passback].firstElementChild.firstElementChild
    .firstElementChild;
  doMouseOver();
}

function processMonster(data) {
  creature = data.response.data;
  if (!creature) {return;} // creature is null
  processMouseOver(data);
  processMonsterLog();
}

function loopActions(e, i) {
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

function getBias() {
  var combatEvaluatorBias = getValue('combatEvaluatorBias');
  if (combatEvaluatorBias === 1) {
    generalVariable = 1.1;
    hpVariable = 1.053;
  } else if (combatEvaluatorBias === 2) {
    generalVariable = 1.053;
    hpVariable = 1;
  } else if (combatEvaluatorBias === 3) {
    generalVariable = 1.1053;
    hpVariable = 1;
  }
}

function startMonsterLog() {
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

function creatureData(ses) { // jQuery
  var obj = {};
  obj.name    = $('#dialog-viewcreature').find('h2.name').text();
  obj.class   = $('#dialog-viewcreature')
    .find('span.classification')
    .text();
  obj.attack  = intValue($('#dialog-viewcreature')
    .find('dd.attribute-atk').text());
  obj.defense = intValue($('#dialog-viewcreature')
    .find('dd.attribute-def').text());
  obj.armor   = intValue($('#dialog-viewcreature')
    .find('dd.attribute-arm').text());
  obj.damage  = intValue($('#dialog-viewcreature')
    .find('dd.attribute-dmg').text());
  obj.hp      = intValue($('#dialog-viewcreature')
    .find('p.health-max').text());
  //reduce stats if critter is a SE and player has SES cast on them.
  if (obj.name.search('Super Elite') !== -1) {
    obj.attack -= Math.ceil(obj.attack * ses);
    obj.defense -= Math.ceil(obj.defense * ses);
    obj.armor -= Math.ceil(obj.armor * ses);
    obj.damage -= Math.ceil(obj.damage * ses);
    obj.hp -= Math.ceil(obj.hp * ses);
  }
  return obj;
}

function evalExtraBuffs(combat) { // Native
  combat.extraNotes = '';
  combat.extraNotes += combat.player.superEliteSlayerLevel > 0 ?
    'SES Stat Reduction Multiplier = ' +
    combat.player.superEliteSlayerMultiplier + '<br>':'';
  //math section ... analysis
  //Holy Flame adds its bonus after the armor of the creature has been taken off.
  combat.holyFlameBonusDamage = 0;
  if (combat.creature.class === 'Undead') {
    combat.holyFlameBonusDamage = Math.max(Math.floor(
      (combat.player.damageValue - combat.creature.armor) *
      combat.player.holyFlameLevel * 0.002),0);
    combat.extraNotes += combat.player.holyFlameLevel > 0 ?
      'HF Bonus Damage = ' + combat.holyFlameBonusDamage +
      '<br>':'';
  }
  //Death Dealer and Counter Attack both applied at the same time
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
  combat.extraStaminaPerHit =
    combat.player.counterAttackLevel > 0 ?
    Math.ceil((1 + combat.player.doublerLevel / 50) * 0.0025 *
    combat.player.counterAttackLevel) : 0;
  //playerAttackValue += counterAttackBonusAttack;
  //playerDamageValue += deathDealerBonusDamage + counterAttackBonusDamage;
  combat.extraNotes += combat.player.deathDealerLevel > 0 ?
    'DD Bonus Damage = ' + combat.deathDealerBonusDamage + '<br>':'';
  if (combat.player.counterAttackLevel > 0) {
    combat.extraNotes += 'CA Bonus Attack/Damage = ' +
      combat.counterAttackBonusAttack + ' / ' +
      combat.counterAttackBonusDamage + '<br>' +
      'CA Extra Stam Used = ' + combat.extraStaminaPerHit + '<br>';
  }
  return combat;
}

function evalAttack(combat) { // Native
  //Attack:
  combat.extraNotes += combat.player.darkCurseLevel > 0 ?
    'DC Bonus Attack = ' + Math.floor(combat.creature.defense *
    combat.player.darkCurseLevel * 0.002) + '<br>':'';
  combat.nightmareVisageAttackMovedToDefense =
    Math.floor(((combat.callback.groupExists ?
    combat.callback.groupAttackValue : combat.player.attackValue) +
    combat.counterAttackBonusAttack) *
    combat.player.nightmareVisageLevel * 0.0025);
  combat.extraNotes += combat.player.nightmareVisageLevel > 0 ?
    'NMV Attack moved to Defense = ' +
    combat.nightmareVisageAttackMovedToDefense + '<br>':'';
  combat.overallAttackValue = (combat.callback.groupExists ?
    combat.callback.groupAttackValue : combat.player.attackValue) +
    combat.counterAttackBonusAttack -
    combat.nightmareVisageAttackMovedToDefense;
  combat.hitByHowMuch = combat.overallAttackValue -
    Math.ceil(combat.attackVariable * (combat.creature.defense -
    combat.creature.defense * combat.player.darkCurseLevel * 0.002));
  if (combat.combatEvaluatorBias === 3) {
    combat.hitByHowMuch = combat.overallAttackValue - Math.ceil(
      combat.creature.defense - combat.creature.defense *
      combat.player.darkCurseLevel * 0.002
    ) - 50;
  }
  return combat;
}

function evalDamage(combat) { // Native
  //Damage:
  combat.fortitudeExtraHPs = Math.floor((combat.callback.groupExists ?
    combat.callback.groupHPValue : combat.player.hpValue) *
    combat.player.fortitudeLevel * 0.001);
  combat.extraNotes += combat.player.fortitudeLevel > 0 ?
    'Fortitude Bonus HP = ' + combat.fortitudeExtraHPs + '<br>' : '';
  combat.overallHPValue = (combat.callback.groupExists ?
    combat.callback.groupHPValue : combat.player.hpValue) +
    combat.fortitudeExtraHPs;
  combat.chiStrikeExtraDamage = Math.floor(combat.overallHPValue *
    combat.player.chiStrikeLevel * 0.001);
  combat.extraNotes += combat.player.chiStrikeLevel > 0 ?
    'Chi Strike Bonus Damage = ' + combat.chiStrikeExtraDamage +
    '<br>':'';
  combat.overallDamageValue = (combat.callback.groupExists ?
    combat.callback.groupDamageValue : combat.player.damageValue) +
    combat.deathDealerBonusDamage + combat.counterAttackBonusDamage +
    combat.holyFlameBonusDamage + combat.chiStrikeExtraDamage;
  combat.damageDone = Math.floor(combat.overallDamageValue - (
    combat.generalVariable * combat.creature.armor +
    combat.hpVariable * combat.creature.hp));
  combat.numberOfHitsRequired = combat.hitByHowMuch > 0 ?
    Math.ceil(combat.hpVariable * combat.creature.hp / (
    combat.overallDamageValue < combat.generalVariable *
    combat.creature.armor ? 1 : combat.overallDamageValue -
    combat.generalVariable * combat.creature.armor)) :'-';
  return combat;
}

function evalDefence(combat) { // Native
  combat.overallDefenseValue = (combat.callback.groupExists ?
    combat.callback.groupDefenseValue : combat.player.defenseValue) +
    Math.floor((combat.callback.groupExists ?
    combat.callback.groupDefenseValue : combat.player.defenseValue) *
    combat.player.constitutionLevel * 0.001 ) +
    combat.nightmareVisageAttackMovedToDefense;
  combat.extraNotes += combat.player.constitutionLevel > 0 ?
    'Constitution Bonus Defense = ' +
    Math.floor((combat.callback.groupExists ?
    combat.callback.groupDefenseValue : combat.player.defenseValue) *
    combat.player.constitutionLevel * 0.001) + '<br>':'';
  combat.extraNotes += combat.player.flinchLevel > 0 ?
    'Flinch Bonus Attack Reduction = ' +
    Math.floor(combat.creature.attack * combat.player.flinchLevel *
    0.001) + '<br>':'';
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

function evalArmour(combat) { // Native
  combat.overallArmorValue = (combat.callback.groupExists ?
    combat.callback.groupArmorValue : combat.player.armorValue) +
    Math.floor(combat.player.armorValue *
    combat.player.sanctuaryLevel * 0.001);
  combat.extraNotes += combat.player.sanctuaryLevel > 0 ?
    'Sanc Bonus Armor = ' + Math.floor(combat.player.armorValue *
    combat.player.sanctuaryLevel * 0.001) + '<br>':'';
  combat.terrorizeEffect = Math.floor(combat.creature.damage *
    combat.player.terrorizeLevel * 0.001);
  combat.extraNotes += combat.player.terrorizeLevel > 0 ?
    'Terrorize Creature Damage Effect = ' +
    combat.terrorizeEffect * -1 + '<br>':'';
  combat.creature.damage -= combat.terrorizeEffect;
  combat.creatureDamageDone = Math.ceil(combat.generalVariable *
    combat.creature.damage - combat.overallArmorValue +
    combat.overallHPValue);
  combat.numberOfCreatureHitsTillDead =
    combat.creatureHitByHowMuch >= 0 ?
    Math.ceil(combat.overallHPValue / (combat.generalVariable *
    combat.creature.damage < combat.overallArmorValue ? 1 :
    combat.generalVariable * combat.creature.damage -
    combat.overallArmorValue)):'-';
  return combat;
}

function evalAnalysis(combat) { // Native
  //Analysis:
  combat.playerHits = combat.numberOfCreatureHitsTillDead === '-' ?
    combat.numberOfHitsRequired : combat.numberOfHitsRequired === '-' ?
    '-' : combat.numberOfHitsRequired >
    combat.numberOfCreatureHitsTillDead ? '-' :
    combat.numberOfHitsRequired;
  combat.creatureHits = combat.numberOfHitsRequired === '-' ?
    combat.numberOfCreatureHitsTillDead :
    combat.numberOfCreatureHitsTillDead === '-' ? '-' :
    combat.numberOfCreatureHitsTillDead > combat.numberOfHitsRequired ?
    '-' : combat.numberOfCreatureHitsTillDead;
  combat.fightStatus = 'Unknown';
  if (combat.playerHits === '-' && combat.creatureHits === '-') {
    combat.fightStatus = 'Unresolved';
  } else if (combat.playerHits === '-') {
    combat.fightStatus = 'Player dies';
  } else if (combat.playerHits === 1) {
    combat.fightStatus = 'Player 1 hits' + (
      combat.numberOfCreatureHitsTillDead -
      combat.numberOfHitsRequired <= 1 ? ', dies on miss' :
      ', survives a miss');
  } else if (combat.playerHits > 1) {
    combat.fightStatus = 'Player > 1 hits' + (
      combat.numberOfCreatureHitsTillDead -
      combat.numberOfHitsRequired <= 1 ? ', dies on miss' :
      ', survives a miss');
  }
  return combat;
}

function evalCA(combat) { // Native
  if (combat.player.counterAttackLevel > 0 &&
    combat.numberOfHitsRequired === 1) {
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
    combat.extraStaminaPerHitAtLowestFeasibleCALevel =
      combat.player.counterAttackLevel > 0 ? Math.ceil((1 +
      combat.player.doublerLevel / 50) * 0.0025 *
      combat.lowestFeasibleCALevel) :0;
    if (combat.extraStaminaPerHitAtLowestFeasibleCALevel <
      combat.extraStaminaPerHit) {
      combat.extraNotes +=
        'Extra Stam Used at this lowered CA level = ' +
        combat.extraStaminaPerHitAtLowestFeasibleCALevel + '<br>';
    }
    else {
      combat.extraNotes += 'No reduction of stam used at the lower CA level<br>';
    }
  }
  if (combat.numberOfHitsRequired === '-' ||
    combat.numberOfHitsRequired !== 1) {
    combat.lowestCALevelToStillHit = Math.max(Math.ceil((
      combat.counterAttackBonusAttack - combat.hitByHowMuch + 1) /
      combat.player.attackValue / 0.0025), 0);
    combat.lowestCALevelToStillKill = Math.max(Math.ceil((
      combat.counterAttackBonusDamage - combat.damageDone + 1) /
      combat.player.damageValue / 0.0025), 0);
    if (combat.lowestCALevelToStillHit > 175) {
      combat.extraNotes +=
        'Even with CA175 you cannot hit this creature<br>';
    } else if (combat.lowestCALevelToStillHit !== 0) {
      combat.extraNotes += 'You need a minimum of CA' +
        combat.lowestCALevelToStillHit +
        ' to hit this creature<br>';
    }
    if (combat.lowestCALevelToStillKill > 175) {
      combat.extraNotes +=
        'Even with CA175 you cannot 1-hit kill this creature<br>';
    } else if (combat.lowestCALevelToStillKill !== 0) {
      combat.extraNotes += 'You need a minimum of CA' +
        combat.lowestCALevelToStillKill +
        ' to 1-hit kill this creature<br>';
    }
  }
  return combat;
}

function evalHTML(combat) { // Native
  return '<table width="100%"><tbody>' +
    '<tr><td bgcolor="#CD9E4B" colspan="4" align="center">' +
    (combat.callback.groupExists ? 'Group ':'') +
    'Combat Evaluation</td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    'Will I hit it? </td><td align="left">' +
    (combat.hitByHowMuch > 0 ? 'Yes':'No') +
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
    (combat.creatureHitByHowMuch >= 0 ? 'Yes':'No') +
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

function getCreaturePlayerData(responseText, callback) { // Legacy

  var combat = {};
  combat.callback = callback;
  //playerdata
  combat.player = playerData(responseText);

  combat.combatEvaluatorBias = getValue('combatEvaluatorBias');
  combat.attackVariable = 1.1053;
  combat.generalVariable =
    assets.bias[combat.combatEvaluatorBias] ?
    assets.bias[combat.combatEvaluatorBias].generalVariable :
    1.1053;
  combat.hpVariable =
    assets.bias[combat.combatEvaluatorBias] ?
    assets.bias[combat.combatEvaluatorBias].hpVariable : 1.1;

  //creaturedata
  var creatureStatTable;
  if ($('#worldPage').length === 0) { // old map
    creatureStatTable = findNode('//table[tbody/tr/td[.="Statistics"]]');
    if (!creatureStatTable) {return;}
  }

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

  if ($('#worldPage').length > 0) { // new map
    if (callback.groupEvaluation) {
      if ($('#creatureEvaluatorGroup').length === 0) {
        $('#dialog-viewcreature')
          .append('<div id="creatureEvaluatorGroup" ' +
            'style="clear:both;"></div>');
      }
      tempdata = combat.evaluatorHTML.replace(/'/g,'\\\'');
      $('#creatureEvaluatorGroup').html(tempdata);
    } else {
      if ($('#creatureEvaluator').length === 0) {
        $('#dialog-viewcreature')
          .append('<div id="creatureEvaluator" ' +
            'style="clear:both;"></div>');
      }
      tempdata = combat.evaluatorHTML.replace(/'/g,'\\\'');
      $('#creatureEvaluator').html(tempdata);
    }
  } else {
    var newRow = creatureStatTable.insertRow(creatureStatTable.rows.length);
    var newCell = newRow.insertCell(0);
    newCell.colSpan = '4';
    newCell.innerHTML = combat.evaluatorHTML;
  }

}

function getCreatureGroupData(responseText) { // Legacy
  var doc = createDocument(responseText);
  var groupAttackValue = findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Attack:")]', doc).nextSibling.textContent
    .replace(/,/, '') * 1;
  var groupDefenseValue = findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Defense:")]', doc).nextSibling.textContent
    .replace(/,/, '') * 1;
  var groupArmorValue = findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Armor:")]', doc).nextSibling.textContent
    .replace(/,/, '') * 1;
  var groupDamageValue = findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Damage:")]', doc).nextSibling.textContent
    .replace(/,/, '') * 1;
  var groupHPValue = findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"HP:")]', doc).nextSibling.textContent
    .replace(/,/, '') * 1;
  xmlhttp('index.php?cmd=profile',
    getCreaturePlayerData,
    { 'groupExists': true,
      'groupAttackValue': groupAttackValue,
      'groupDefenseValue': groupDefenseValue,
      'groupArmorValue': groupArmorValue,
      'groupDamageValue': groupDamageValue,
      'groupHPValue': groupHPValue,
      'groupEvaluation': true
    }
  );
}

function checkIfGroupExists(responseText) { // Hybrid
  var doc=createDocument(responseText);
  var groupExistsIMG = $(doc)
    .find('img[title="Disband Group (Cancel Attack)"]');
  if (groupExistsIMG.length > 0) {
    var groupHref = groupExistsIMG.parents('td:first').find('a:first')
      .attr('href');
    xmlhttp(groupHref, getCreatureGroupData);
  }
}

function addRemoveCreatureToDoNotKillList(evt) { // Native
  var creatureName = evt.target.getAttribute('creatureName');
  var newDoNotKillList = '';
  if (calf.doNotKillList.indexOf(creatureName) !== -1) {
    newDoNotKillList = calf.doNotKillList.replace(creatureName, '');
    newDoNotKillList = newDoNotKillList.replace(',,', ',');
    if (newDoNotKillList.charAt(0) === ',') {
      newDoNotKillList = newDoNotKillList
        .substring(1, newDoNotKillList.length);
    }
    evt.target.innerHTML = 'Add to the do not kill list';
  } else {
    newDoNotKillList = calf.doNotKillList +
      (calf.doNotKillList.length !== 0 ? ',' : '') + creatureName;
    newDoNotKillList = newDoNotKillList.replace(',,', ',');
    evt.target.innerHTML = 'Remove from do not kill list';
  }
  setValue('doNotKillList',newDoNotKillList);
  calf.doNotKillList = newDoNotKillList;
  //refresh the action list
  window.GameData.doAction(-1);
}

function readyViewCreature() { // Hybrid

  $('#creatureEvaluator').html('');
  $('#creatureEvaluatorGroup').html('');

  xmlhttp('index.php?cmd=profile',
    getCreaturePlayerData,
    { 'groupExists': false,
      'groupAttackValue': 0,
      'groupDefenseValue': 0,
      'groupArmorValue': 0,
      'groupDamageValue': 0,
      'groupHPValue': 0,
      'groupEvaluation': false
    }
  );
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
    .attr('creatureName',creatureName);
  var extraText = 'Add to the do not kill list';
  // TODO substring bug
  if (calf.doNotKillList.indexOf(creatureName) !== -1) {
    extraText = 'Remove from do not kill list';}
  $('#addRemoveCreatureToDoNotKillList').html(extraText);
  document.getElementById('addRemoveCreatureToDoNotKillList')
    .addEventListener('click',
      addRemoveCreatureToDoNotKillList, true);
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
      _rnd: Math.floor(Math.random() * 8999999998) + 1000000000
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
  fshDiv = document.createElement('div');
  fshDiv.className = 'fshClear';
  fshDiv.textContent = 'Select how many to quick-buy:';
  numInput = document.createElement('input');
  numInput.id = 'buyAmount';
  numInput.className = 'fshNumberInput';
  numInput.min = 1;
  numInput.max = 99;
  numInput.value = 1;
  numInput.type = 'number';
  fshDiv.appendChild(numInput);
  qbBtn = document.createElement('button');
  qbBtn.textContent = 'Quick-buy';
  qbBtn.addEventListener('click', qBuy);
  fshDiv.appendChild(qbBtn);
  resultDiv = document.createElement('div');
  fshDiv.appendChild(resultDiv);
  dialog$1.appendChild(fshDiv);
}

function worldDialogShop(e, data) {
  shoppingData = data;
  dialog$1 = dialog$1 || document.getElementById('shopDialogConfirm');
  if (!dialog$1) {return;}
  jDialog = jDialog || $(dialog$1).data('worldDialogShopConfirm');
  if (!fshDiv) {injectQuickBuy();}
  else {resultDiv.textContent = '';}
}

function prepareShop() {
  $.subscribe('prompt.worldDialogShop', worldDialogShop);
}

var showHuntingBuffs;
var huntingBuffs;
var huntingBuffsName;

function hideGroupButton() { // jQuery
  if (getValue('hideChampionsGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-1 a.create-group').hide();});
    $('#actionList li.creature-1 a.create-group').hide();
  }
  if (getValue('hideElitesGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-2 a.create-group').hide();});
    $('#actionList li.creature-2 a.create-group').hide();
  }
  if (getValue('hideSEGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-3 a.create-group').hide();});
    $('#actionList li.creature-3 a.create-group').hide();
  }
  if (getValue('hideTitanGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-4 a.create-group').hide();});
    $('#actionList li.creature-4 a.create-group').hide();
  }
  if (getValue('hideLegendaryGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-5 a.create-group').hide();});
    $('#actionList li.creature-5 a.create-group').hide();
  }
}

function colorMonsters() { // jQuery
  $('#actionList li.creature-1').css('color','green');
  $('#actionList li.creature-2').css('color','yellow');
  $('#actionList li.creature-3').css('color','red');
}

function afterUpdateActionList() { // jQuery
  // color the critters in the do no kill list blue
  // TODO substring bug
  $('#actionList div.header').each(function() {
    if (calf.doNotKillList.indexOf(
        $(this).find('a.icon').data('name')) !== -1) {
      $(this).css('color','blue');
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
      // TODO substring bug
      if (calf.doNotKillList.indexOf(
          creatureIcon.data('name')) !== -1) {
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

function dataEventsPlayerBuffs(evt, data) { // jQuery
  var buffHash = data.b.reduce(function(prev, curr) {
    prev[curr.name] = true;
    return prev;
  }, {});
  var missingBuffs = huntingBuffs.reduce(function(prev, curr) {
    if (!buffHash[curr.trim()]) {prev.push(curr);}
    return prev;
  }, []);
  var missingBuffsDiv = document.getElementById('missingBuffs');
  if (!missingBuffsDiv) {
    missingBuffsDiv = document.createElement('div');
    missingBuffsDiv.setAttribute('id', 'missingBuffs');
    var worldContainer = document.getElementById('worldContainerBelow');
    worldContainer.insertBefore(missingBuffsDiv, worldContainer.firstChild);
  }
  if (missingBuffs.length > 0) {
    missingBuffsDiv.innerHTML = 'You are missing some ' +
      huntingBuffsName + ' hunting buffs<br>(' +
      missingBuffs.join(', ') + ')';
  } else {missingBuffsDiv.innerHTML = '';}
}

function appendSavedLog(text) { // Native
  setTimeout(function(){
    var theLog=getValue('CombatLog');
    if (!theLog) {theLog='';}
    theLog+=text;
    setValue('CombatLog', theLog);
  }, 0);
}

function combatResponse(e, data) { // jQuery - Bad
  // TODO this is too slow
  // send the response to localforage
  // and deal with it later
  // If bad response do nothing.
  if (data.response.response !== 0) {return;}
  var l;
  var i;
  var combatData = {};
  combatData.combat = $.extend(true, {}, data.response.data); //make a deep copy
  //delete some values that are not needed to trim down size of log.
  delete combatData.combat.attacker.img_url;
  delete combatData.combat.defender.img_url;
  delete combatData.combat.is_conflict;
  delete combatData.combat.is_bounty;
  delete combatData.combat.pvp_rating_change;
  delete combatData.combat.pvp_prestige_gain;
  if (combatData.combat.inventory_id) {
    combatData.combat.drop = combatData.combat.item.id;
  }
  delete combatData.combat.inventory_id;
  delete combatData.combat.item;

  combatData.player={};
  combatData.player.buffs={};
  combatData.player.enhancements={};
  l = data.player.buffs.length;
  for(i=0; i<l; i += 1) //loop through buffs, only need to keep CA and Doubler
  {//54 = ca, 26 = doubler
    var buff = data.player.buffs[i];
    if(buff.id === 54 || buff.id === 26)
    {
      combatData.player.buffs[buff.id] = parseInt(buff.level, 10);
    }
  }
  var notSave = '|Breaker|Protection|Master Thief|Protect Gold|Disarm|Duelist|Thievery|Master Blacksmith|Master Crafter|Fury Caster|Master Inventor|Sustain|';//Taking the Not Save in case they add new enhancements.
  if (data.player.enhancements)
  {
    l = data.player.enhancements.length;
    for(i=0; i<l; i += 1) //loop through enhancements
    {//54 = ca, 26 = doubler
      var enh = data.player.enhancements[i];
      if (notSave.indexOf('|'+enh.name+'|')===-1){
        combatData.player.enhancements[enh.name]=enh.value;
      }
    }
  }
  var now = new Date();
  combatData.time = formatDateTime(now);
  appendSavedLog(',' + JSON.stringify(combatData));
}

function fixDebuffQTip(e) { // jQuery
  $(e.target).qtip('hide');
}

function injectWorldNewMap(data){ // Native
  if (data.player && getValue('sendGoldonWorld')) {
    updateSendGoldOnWorld(data);
  }
  if (data.realm && data.realm.name) {
    injectButtons(data);
    document.getElementById('buffList')
      .addEventListener('click', fixDebuffQTip);
  }
}

function doHuntingBuffs() {
  showHuntingBuffs = getValue('showHuntingBuffs');
  if (!showHuntingBuffs) {return;}
  var enabledHuntingMode = getValue('enabledHuntingMode');
  if (enabledHuntingMode === '1') {
    huntingBuffs = getValue('huntingBuffs');
    huntingBuffsName = getValue('huntingBuffsName');
  }
  if (enabledHuntingMode === '2') {
    huntingBuffs = getValue('huntingBuffs2');
    huntingBuffsName = getValue('huntingBuffs2Name');
  }
  if (enabledHuntingMode === '3') {
    huntingBuffs = getValue('huntingBuffs3');
    huntingBuffsName = getValue('huntingBuffs3Name');
  }
  huntingBuffs = huntingBuffs.split(',');
  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    dataEventsPlayerBuffs);
  if (window.initialGameData) {//HCS initial data
    dataEventsPlayerBuffs(null,
      {b: window.initialGameData.player.buffs});
  }
}

function subscribes() { // jQuery

  if (getValue('sendGoldonWorld')) {
    injectSendGoldOnWorld();
  }

  //Subscribes:
  calf.doNotKillList = getValue('doNotKillList');

  // subscribe to view creature events on the new map.
  $.subscribe('ready.view-creature', readyViewCreature);

  // Hide Create Group button
  hideGroupButton();

  if (getValue('enableCreatureColoring')) {
    $.subscribe('after-update.actionlist', colorMonsters);
    colorMonsters();
  }

  // add do-not-kill list functionality
  $.subscribe('after-update.actionlist', afterUpdateActionList);
  afterUpdateActionList();

  // add monster log functionality
  startMonsterLog();

  // then intercept the action call 
  interceptDoAction();

  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    impIconColour);

  doHuntingBuffs();

  $.subscribe('keydown.controls', function(e, key){
    switch(key) {
    case 'ACT_REPAIR': GameData.fetch(387);
      break;
    }
  });

  if (getValue('keepLogs')) {
    $.subscribe('2-success.action-response', combatResponse);
  }
  //on world

  if (window.initialGameData) {//HCS initial data
    injectWorldNewMap(window.initialGameData);
    impIconColour(null,
      {b: window.initialGameData.player.buffs});
  }
  $.subscribe('-1-success.action-response 5-success.action-response',
    function(e, data) { //change of information
      injectWorldNewMap(data);
    }
  );

  // somewhere near here will be multi buy on shop
  prepareShop();

}

function impWarning(impsRemaining) { // Legacy
  var applyImpWarningColor = ' style="color:green; ' +
    'font-size:medium;"';
  if (impsRemaining===2){
    applyImpWarningColor = ' style="color:Orangered; ' +
      'font-size:medium; font-weight:bold;"';
  }
  if (impsRemaining===1){
    applyImpWarningColor = ' style="color:Orangered; ' +
      'font-size:large; font-weight:bold"';
  }
  if (impsRemaining===0){
    applyImpWarningColor = ' style="color:red; ' +
      'font-size:large; font-weight:bold"';
  }
  return '<tr><td' + applyImpWarningColor +
    '>Shield Imps Remaining: ' +  impsRemaining +
    (impsRemaining === 0 ?
    '&nbsp;<span id="Helper:recastImpAndRefresh" style="color:' +
    'blue;cursor:pointer;text-decoration:underline;font-size:' +
    'xx-small;">Recast</span>':'') + '</td></tr>';
}

function hasCA() { // Legacy
  var replacementText = '';
  var hasCounterAttack = findNode('//img[contains(@src,"/54_sm.gif")]');
  if (hasCounterAttack) {
    var counterAttackLevel;
    if (hasCounterAttack.getAttribute('src').search('/skills/') !== -1) {
      var onmouseover = $(hasCounterAttack).data('tipped');
      var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/;
      var counterAttack = counterAttackRE.exec(onmouseover);
      if (counterAttack) {
        counterAttackLevel = counterAttack[1];
      }
    }
    replacementText += '<tr><td style="font-size:small; color:' +
      'blue">CA' + counterAttackLevel + ' active</td></tr>';
  }
  return replacementText;
}

function hasDblr() { // Legacy
  var replacementText = '';
  var hasDoubler = findNode('//img[contains(@src,"/26_sm.gif")]');
  if (hasDoubler) {
    var doublerLevel;
    if (hasDoubler.getAttribute('src').search('/skills/') !== -1) {
      var onmouseover = $(hasDoubler).data('tipped');
      var doublerRE = /<b>Doubler<\/b> \(Level: (\d+)\)/;
      var doubler = doublerRE.exec(onmouseover);
      if (doubler) {
        doublerLevel = doubler[1];
      }
    }
    if (doublerLevel === 200) {
      replacementText += '<tr><td style="font-size:small; color:' +
        'red">Doubler ' + doublerLevel + ' active</td></tr>';
    }
  }
  return replacementText;
}

function getKillStreak(responseText) { // Hybrid
  var doc=createDocument(responseText);
  var killStreakLocation = $(doc).find('td:contains("Streak:"):last').next();
  log('killStreakLocation', killStreakLocation);
  var playerKillStreakValue;
  if (killStreakLocation.length > 0) {
    playerKillStreakValue = intValue(killStreakLocation.text());
  }
  var killStreakElement = findNode('//span[@findme="killstreak"]');
  killStreakElement.innerHTML = addCommas(playerKillStreakValue);
  setValue('lastKillStreak', playerKillStreakValue);
  var deathDealerBuff = findNode('//img[contains(@data-tipped,"Death Dealer")]');
  var deathDealerRE = /<b>Death Dealer<\/b> \(Level: (\d+)\)/;
  var deathDealer = deathDealerRE.exec($(deathDealerBuff).data('tipped'));
  var deathDealerPercentage;
  if (deathDealer) {
    var deathDealerLevel = deathDealer[1];
    deathDealerPercentage = Math.min(Math.round(Math.floor(playerKillStreakValue/5) * deathDealerLevel) * 0.01, 20);
  }
  var deathDealerPercentageElement = findNode('//span[@findme="damagebonus"]');
  deathDealerPercentageElement.innerHTML = deathDealerPercentage;
  setValue('lastDeathDealerPercentage', deathDealerPercentage);
}

function doDeathDealer(impsRemaining) { // Legacy
  var replacementText = '';

  var lastDeathDealerPercentage =
    getValue('lastDeathDealerPercentage');
  if (lastDeathDealerPercentage === undefined) {
    setValue('lastDeathDealerPercentage', 0);
    lastDeathDealerPercentage = 0;
  }

  var lastKillStreak = getValue('lastKillStreak');
  if (lastKillStreak === undefined) {
    setValue('lastKillStreak', 0);
    lastKillStreak = 0;
  }

  var trackKillStreak = getValue('trackKillStreak');

  if (impsRemaining > 0 && lastDeathDealerPercentage === 20) {
    replacementText += '<tr><td style="font-size:small; color:black"' +
      '>Kill Streak: <span findme="killstreak">&gt;' +
      addCommas(lastKillStreak) + '</span> Damage bonus: <' +
      'span findme="damagebonus">20</span>%</td></tr>';
  } else {
    if (!trackKillStreak) {
      replacementText += '<tr><td style="font-size:small; color:' +
        'navy" nowrap>KillStreak tracker disabled. <span style="' +
        'font-size:xx-small">Track: <span id=Helper:toggleKS' +
        'tracker style="color:navy;cursor:pointer;text-' +
        'decoration:underline;" title="Click to toggle">' +
        (trackKillStreak ? 'ON' : 'off') +
        '</span></span></td></tr>';
    } else {
      replacementText += '<tr><td style="font-size:small; color:' +
        'navy" nowrap>KillStreak: <span findme="killstreak">' +
        addCommas(lastKillStreak) + '</span> Damage bonus' +
        ': <span findme="damagebonus">' +
        Math.round(lastDeathDealerPercentage * 100) / 100 +
        '</span>%&nbsp;<span style="font-size:xx-small">Track: ' +
        '<span id=Helper:toggleKStracker style="color:navy;' +
        'cursor:pointer;text-decoration:underline;" title="Click' +
        ' to toggle">' + (trackKillStreak ? 'ON' : 'off') +
        '</span></span></td></tr>';
      xmlhttp('index.php?cmd=profile', getKillStreak);
    }
  }
  return replacementText;
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
      getValue('trackKillStreak') ? false : true);
      location.reload();
    },true);
  }
}

function checkBuffs() { // Legacy - Old Map
  var impsRemaining;

  //extra world screen text
  var replacementText = '<td background="' + imageServer +
    '/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
    'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
    ':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
    'td colspan="2" height="10"></td></tr><tr>';
  var hasShieldImp = findNode('//img[contains(@src,"/55_sm.gif")]');
  var hasDeathDealer = findNode('//img[contains(@src,"/50_sm.gif")]');
  if (hasDeathDealer || hasShieldImp) {
    var re=/(\d+) HP remaining/;
    impsRemaining = 0;
    if (hasShieldImp) {
      var textToTest = $(hasShieldImp).data('tipped');
      var impsRemainingRE = re.exec(textToTest);
      impsRemaining = impsRemainingRE[1];
    }
    replacementText += impWarning(impsRemaining);
    if (hasDeathDealer) {
      replacementText += doDeathDealer(impsRemaining);
    }
  }
  replacementText += hasCA();
  replacementText += hasDblr();
  replacementText += calf.huntingMode === true ?
    '<tr><td style="font-size: small; color:red">' +
    'Hunting mode enabled</td></tr>' : '';
  replacementText += '<tr><td colspan="2" height="10"></td></tr>';
  replacementText += '</td>' ;

  var injectHere = findNode('//div[table[@class="centered" ' +
    'and @style="width: 270px;"]]');
  if (!injectHere) {return;}
  //insert after kill all monsters image and text
  var newSpan = document.createElement('DIV');
  newSpan.innerHTML=replacementText;
  injectHere.appendChild(newSpan);

  if ((hasDeathDealer || hasShieldImp) && impsRemaining ===0) {
    var _recastImpAndRefresh = document
      .getElementById('Helper:recastImpAndRefresh');
    var impHref = 'index.php?cmd=quickbuff&subcmd=activate&target' +
      'Players=' +
      $('dt.stat-name:first').next().text().replace(/,/g,'') +
      '&skills%5B%5D=55';
    _recastImpAndRefresh.addEventListener('click', function() {
      xmlhttp(impHref, recastImpAndRefresh, true);
    },true);
  }

  toggleKsTracker();
}

function prepareCombatLog() { // Legacy
  var reportsTable=findNode(
    '//div[table[@class="centered" and @style="width: 270px;"]]');
  if (!reportsTable) {return;}
  var tempLog=document.createElement('div');
  tempLog.id='reportsLog';
  var injLog=reportsTable.appendChild(tempLog);
  var is=injLog.style;
  is.color = 'black';
  is.backgroundImage='url(' + imageServer +
    '/skin/realm_right_bg.jpg)';
  is.maxHeight = '240px';
  is.width = '277px';
  is.maxWidth = is.width;
  is.marginLeft = '0px';
  is.marginRight = '0px';
  is.paddingLeft = '26px';
  is.paddingRight = '24px';
  is.overflow = 'hidden';
  is.fontSize = 'xx-small';
  is.textAlign = 'justify';
}

function injectOldMap() { // Native
  checkBuffs();
  prepareCombatLog();
}

function injectWorld() { // Native
  //-1 = world page
  //0 = quest responce
  //1 = view creature
  //2 = attack creature
  //3 = attack player
  //4 = move
  //5 = use stair
  //6 = use chest
  //7 = take portal
  //10 = problaby view relic
  //11 = take relic
  //12 = create group
  //13 = view shop
  //14 = purchase item
  //15 = repair
  //17 = login
  //18 = username not found
  if (document.getElementById('worldPage')) { // new map
    subscribes();
  } else {
    //not new map.
    injectOldMap();
  }
}

function unknownPage() { // Legacy
  if (typeof window.jQuery === 'undefined') {return;}

  if ($('#pCC td:contains("Below is the current status for ' +
    'the relic")').length > 0) {
    screenview('unknown.oldRelic.injectRelic');
    injectRelic();
    return;
  }

  var isBuffResult = document.getElementById('quickbuff-report');
  if (isBuffResult) {
    screenview('unknown.quickBuff.updateBuffLog');
    updateBuffLog();
    return;
  }

  var isQuestBookPage = findNode('//td[.="Quest Name"]');
  if (isQuestBookPage) {
    screenview('unknown.questBook.injectQuestBookFull');
    injectQuestBookFull();
    return;
  }

  var isAdvisorPageClue1 = findNode('//font[@size=2 and .="Advisor"]');
  var clue2 = '//a[@href="index.php?cmd=guild&amp;subcmd=manage" and .="Back to Guild Management"]';
  var isAdvisorPageClue2 = findNode(clue2);
  if (isAdvisorPageClue1 && isAdvisorPageClue2) {
    screenview('unknown.guildAdvisor.injectAdvisor');
    injectAdvisor();
    return;
  }

  // if (system.findNode('//a[.="Back to Scavenging"]')) {
    // fshGa.screenview('unknown.scavenging.injectScavenging');
    // FSH.scavenging.injectScavenging(); // Is this used???
  // }

  if ($('#pCC img[title="Inventing"]').length > 0) {
    screenview('unknown.recipes.inventing');
    inventing();
    return;
  }
}

var pageSwitcher = {
  settings: {'-': {'-': {'-': {'-': injectSettings}}}},
  world: {'-': {'-': {'-': {'-': injectWorld}}}},
  news: {
    'fsbox': {'-': {'-': {'-': newsFsbox}}},
    'shoutbox': {'-': {'-': {'-': newsShoutbox}}}},
  blacksmith: {
    'repairall': {'-': {'-': {'1': injectWorld}}}},
  arena: {
    '-': {'-': {'-': {'-': injectArena}}},
    'join': {'-': {'-': {'-': injectArena}}},
    'completed': {'-': {'-': {'-': completedArenas}}},
    'pickmove': {'-': {'-': {'-': storeMoves}}},
    'setup': {'-': {'-': {'-': setupMoves}}}
  },
  questbook: {
    '-': {'-': {
      '-': {'-': injectQuestBookFull},
      '0': {'-': injectQuestBookFull}, // Normal
      '1': {'-': injectQuestBookFull}}}, // Seasonal
    'atoz': {'-': {'-': {'-': injectQuestBookFull}}},
    'viewquest': {'-': {'-': {'-': injectQuestTracker}}}},
  profile: {
    '-': {'-': {'-': {'-': injectProfile}}},
    'managecombatset': {'-': {'-': {'-': injectProfile}}},
    'report': {'-': {'-': {'-': injectProfile}}},
    'equipitem': {'-': {'-': {'-': injectProfile}}},
    'useitem': {'-': {'-': {'-': injectProfile}}},
    'changebio': {'-': {'-': {'-': injectBioWidgets}}},
    'dropitems': {'-': {'-': {'-': injectProfileDropItems,
      '1': injectProfileDropItems}}}},
  auctionhouse: {'-': {'-': {'-': {'-': injectAuctionHouse},
    '-1': {'-': injectAuctionHouse},
    '-2': {'-': injectAuctionHouse},
    '-3': {'-': injectAuctionHouse}}}},
  guild: {
    'inventory': {
      'report': {'-': {'-': injectReportPaint}},
      'addtags': {
        '-': {'-': injectGuildAddTagsWidgets},
        '-1': {'-': injectGuildAddTagsWidgets},
        '0': {'-': injectGuildAddTagsWidgets},
        '1': {'-': injectGuildAddTagsWidgets},
        '2': {'-': injectGuildAddTagsWidgets},
        '3': {'-': injectGuildAddTagsWidgets},
        '4': {'-': injectGuildAddTagsWidgets},
        '5': {'-': injectGuildAddTagsWidgets},
        '6': {'-': injectGuildAddTagsWidgets},
        '7': {'-': injectGuildAddTagsWidgets},
        '8': {'-': injectGuildAddTagsWidgets},
        '10': {'-': injectGuildAddTagsWidgets},
        '15': {'-': injectGuildAddTagsWidgets},
        '16': {'-': injectGuildAddTagsWidgets}},
      'removetags': {
        '-': {'-': injectGuildAddTagsWidgets},
        '-1': {'-': injectGuildAddTagsWidgets},
        '0': {'-': injectGuildAddTagsWidgets},
        '1': {'-': injectGuildAddTagsWidgets},
        '2': {'-': injectGuildAddTagsWidgets},
        '3': {'-': injectGuildAddTagsWidgets},
        '4': {'-': injectGuildAddTagsWidgets},
        '5': {'-': injectGuildAddTagsWidgets},
        '6': {'-': injectGuildAddTagsWidgets},
        '7': {'-': injectGuildAddTagsWidgets},
        '8': {'-': injectGuildAddTagsWidgets},
        '10': {'-': injectGuildAddTagsWidgets},
        '16': {'-': injectGuildAddTagsWidgets}},
      'storeitems': {'-': {'-': injectStoreItems}}},
    'chat': {'-': {'-': {'-': guildChat}}},
    'log': {'-': {'-': {'-': guildLog}}},
    'groups': {
      'viewstats': {'-': {'-': injectGroupStats}},
      'joinallgroupsundersize': {'-': {'-': injectGroups}},
      'joinall': {'-': {'-': injectGroups}},
      '-': {'-': {'-': injectGroups}}},
    'manage': {'-': {'-': {'-': injectGuild}}},
    'advisor': {
      '-': {'-': {'-': injectAdvisor}},
      'weekly': {'-': {'-': injectAdvisor}}},
    'history': {'-': {'-': {'-': addHistoryWidgets}}},
    'view': {'-': {'-': {'-': injectViewGuild}}},
    'scouttower': {'-': {'-': {'-': injectScouttower}}},
    'mailbox': {'-': {'-': {'-': guildMailbox}}},
    'ranks': {'-': {'-': {'-': injectGuildRanks}}},
    'conflicts': {'rpupgrades': {'-': {'-': injectRPUpgrades}}},
    'bank': {'-': {'-': {'-': injectGuildBank}}}},
  bank: {'-': {'-': {'-': {'-': injectBank}}}},
  log: {
    '-': {'-': {
      '-': {'-': playerLog},
      '-1': {'-': playerLog},
      '0': {'-': playerLog},
      '1': {'-': playerLog},
      '2': {'-': playerLog},
      '3': {'-': playerLog}}},
    'outbox': {'-': {'-': {'-': outbox}}}},
  potionbazaar: {'-': {'-': {'-': {'-': injectBazaar}}}},
  marketplace: {
    'createreq': {'-': {'-': {'-': addMarketplaceWidgets}}}},
  quickbuff: {'-': {'-': {'-': {'-': injectQuickBuff}}}},
  notepad: {
    'showlogs': {'-': {'-': {'-': injectNotepadShowLogs}}},
    'invmanagernew': {'-': {'-': {
      '-': refresh}}},
    'guildinvmgr': {'-': {'-': {
      '-': refresh}}},
    'recipemanager': {'-': {'-': {'-': injectRecipeManager}}},
    'auctionsearch': {'-': {'-': {'-': injectAuctionSearch}}},
    'onlineplayers': {'-': {'-': {'-': injectOnlinePlayers}}},
    'quicklinkmanager': {'-': {'-': {'-': injectQuickLinkManager}}},
    'monsterlog': {'-': {'-': {'-': injectMonsterLog}}},
    'quickextract': {'-': {'-': {'-': insertQuickExtract}}},
    'quickwear': {'-': {'-': {'-': insertQuickWear}}},
    'fsboxcontent': {'-': {'-': {'-': injectFsBoxContent}}},
    'bufflogcontent': {'-': {'-': {'-': injectBuffLog}}},
    'newguildlog': {'-': {'-': {'-': injectNewGuildLog}}},
    'findbuffs': {'-': {'-': {'-': injectFindBuffs}}},
    'findother': {'-': {'-': {'-': injectFindOther}}},
    'savesettings': {'-': {'-': {'-': injectSaveSettings}}},
    '-': {'-': {'-': {'-': injectNotepad}}}},
  points: {'-': {'-': {
    '-': {'-': storePlayerUpgrades},
    '0': {'-': storePlayerUpgrades},
    '1': {'-': parseGoldUpgrades}}}},
  trade: {
    '-': {'-': {'-': {'-': injectTrade}}},
    'createsecure': {'-': {'-': {'-': injectTrade}}},
    'docreatesecure': {'-': {'-': {'-': injectTrade}}}},
  titan: {'-': {'-': {'-': {'-': injectTitan}}}},
  toprated: {
    'xp': {'-': {'-': {'-': injectTopRated}}},
    'monthlyxp': {'-': {'-': {'-': injectTopRated}}},
    'gold': {'-': {'-': {'-': injectTopRated}}},
    'killstreak': {'-': {'-': {'-': injectTopRated}}},
    'bounties': {'-': {'-': {'-': injectTopRated}}},
    'risingstars': {'-': {'-': {'-': injectTopRated}}},
    'arena': {'-': {'-': {'-': injectTopRated}}},
    'superelites': {'-': {'-': {'-': injectTopRated}}},
    'smasher': {'-': {'-': {'-': injectTopRated}}}},
  inventing: {'viewrecipe': {'-': {'-': {'-': inventing}}}},
  tempinv: {'-': {'-': {'-': {'-': injectMailbox}}}},
  findplayer: {'-': {'-': {'-': {'-': injectFindPlayer}}}},
  quests: {'-': {'-': {'-': {'-': allowBack}}},
    'view': {'-': {'-': {'-': showAllQuestSteps}}}}, //UFSG
  items: {'-': {'-': {'-': {'-': allowBack}}}}, //UFSG
  creatures: {'-': {'-': {'-': {'-': allowBack}}}}, //UFSG
  masterrealms: {'-': {'-': {'-': {'-': allowBack}}}}, //UFSG
  realms: {'-': {'-': {'-': {'-': allowBack}}}}, //UFSG
  relics: {'-': {'-': {'-': {'-': allowBack}}}}, //UFSG
  shops: {'-': {'-': {'-': {'-': allowBack}}}}, //UFSG
  scavenging: {'-': {'-': {'-': {'-': injectScavenging}}}},
  temple: {'-': {'-': {'-': {'-': parseTemplePage}}}},
  composing: {'-': {'-': {'-': {'-': injectComposing}}},
    'breakdown': {'-': {'-': {'-': composingBreakdown}}},
    'create': {'-': {'-': {'-': composingCreate}}}},
  pvpladder: {'-': {'-': {'-': {'-': ladder}}}},
  '-': {
    'viewupdatearchive': {'-': {'-': {'-': viewArchive}}},
    'viewarchive': {'-': {'-': {'-': viewArchive}}},
    '-': {'-': {'-': {'-': unknownPage}}}}
};

var coreFunction;
var functionPath;
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
var expandMenuOnKeyPress;

function getCoreFunction() { // Native
  var cmd;
  var subcmd;
  var subcmd2;
  var type;
  var fromWorld;
  var test_cmd;
  if (document.location.search !== '') {
    cmd = getUrlParameter('cmd') || '-';
    subcmd = getUrlParameter('subcmd') || '-';
    subcmd2 = getUrlParameter('subcmd2') || '-';
    type = getUrlParameter('type') || '-';
    fromWorld = getUrlParameter('fromworld') || '-';
  } else {
    test_cmd = document.querySelector('input[name="cmd"]');
    cmd = test_cmd ? test_cmd.getAttribute('value') : '-';
    test_cmd = document.querySelector('input[name="subcmd"]');
    subcmd = test_cmd ? test_cmd.getAttribute('value') : '-';
    if (subcmd === 'dochat') {
      cmd = '-';
      subcmd = '-';
    }
    test_cmd = document.querySelector('input[name="subcmd2"]');
    subcmd2 = test_cmd ? test_cmd.getAttribute('value') : '-';
    type = '-';
    fromWorld = '-';
  }

  calf.cmd = cmd;
  calf.subcmd = subcmd;
  calf.subcmd2 = subcmd2;
  functionPath = cmd + '/' + subcmd + '/' + subcmd2 + '/' + type + '/' +
    fromWorld;

  if (pageSwitcher[cmd] &&
      pageSwitcher[cmd][subcmd] &&
      pageSwitcher[cmd][subcmd][subcmd2] &&
      pageSwitcher[cmd][subcmd][subcmd2][type] &&
      pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld]) {
    coreFunction = pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld];
  }
}

function gameHelpLink() { // Native
  var nodeList = document.querySelectorAll('#pCR h3');
  Array.prototype.forEach.call(nodeList, function(el) {
    if (el.textContent === 'Game Help') {
      el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
    }
  });
}

function movePage(dir) { // Legacy
  var dirButton = findNode('//input[@value="'+dir+'"]');
  if (!dirButton) {return;}
  var url = dirButton.getAttribute('onClick');
  url = url.replace(/^[^']*'/m, '').replace(/\';$/m, '');
  location.href = url;
}

function keyPress(evt) { // Native

  if (evt.target.tagName !== 'HTML' &&
      evt.target.tagName !== 'BODY') {return;}

  // ignore control, alt and meta keys (I think meta is the command key in Macintoshes)
  if (evt.ctrlKey) {return;}
  if (evt.metaKey) {return;}
  if (evt.altKey) {return;}

  var r = evt.charCode;
  var s = evt.keyCode;

  switch (r) {
  case 114: // repair [r]
    //do not use repair link for new map
    if (!document.getElementById('worldPage')) {
      location.href = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
    }
    break;
  case 71: // create group [G]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    location.href =
      'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
    break;
  case 76: // Log Page [L]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=log';
    break;
  case 103: // go to guild [g]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    location.href = 'index.php?cmd=guild&subcmd=manage';
    break;
  case 106: // join all group [j]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    if (!getValue('enableMaxGroupSizeToJoin')) {
      location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
    } else {
      location.href =
        'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize';
    }
    break;
  case 98: // backpack [b]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=profile&subcmd=dropitems';
    break;
  case 118: // fast wear manager [v]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=notepad&blank=1&subcmd=quickwear';
    break;
  case 121: // fast send gold [y]
    doSendGold();
    break;
  case 112: // profile [p]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=profile';
    break;
  case 62: // move to next page [>]
  case 60: // move to prev page [<]
    movePage({62:'>', 60:'<'}[r]);
    break;
  case 33: // Shift+1
  case 64: // Shift+2
  case 34: // Shift+2 -- for UK keyboards, I think
  case 35: // Shift+3
  case 36: // Shift+4
  case 37: // Shift+5
  case 94: // Shift+6
  case 38: // Shift+7
  case 42: // Shift+8
  case 40: // Shift+9
    var keyMap = {'key33':1, 'key64':2, 'key34':2, 'key35':3, 'key36':4,
      'key37':5, 'key94':6, 'key38':7, 'key42':8, 'key40':9};
    // I'm using "key??" because I don't feel comfortable of naming properties with integers
    var itemIndex = keyMap['key' + r];
    $.get('index.php?cmd=profile').done(function(data) {
      changeCombatSet(data, itemIndex);
    });
    break;
  case 0: // special key
    switch (s) {
    case 33:
      if (document.getElementById('reportsLog')) {
        scrollUpCombatLog();
        evt.preventDefault();
        evt.stopPropagation();
      }
      break;
    case 34:
      if (document.getElementById('reportsLog')) {
        scrollDownCombatLog();
        evt.preventDefault();
        evt.stopPropagation();
      }
      break;
    default:
      break;
    }
    break;
  default:
    break;
  }
}

function replaceKeyHandler() { // Native
  expandMenuOnKeyPress = getValue('expandMenuOnKeyPress');
  document.onkeypress = keyPress;
}

function getEnvVars() { // Native
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

function hideElement(el) { // Native
  el.classList.add('fshHide');
}

function hideNodeList(nodeList) { // Native
  Array.prototype.forEach.call(nodeList, hideElement);
}

function hideQuerySelectorAll(parent, selector) { // Native - probably wrong
  hideNodeList(parent.querySelectorAll(selector));
}

function contactColour(el, obj) { // Native
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

function guildColour(el) { // Native
  contactColour(el, {
    l1: 'fshGreen',
    l2: 'fshWhite',
    l3: 'fshGrey'
  });
}

function addGuildInfoWidgets() { // Native
  var guildMembrList = document.getElementById('minibox-guild-members-list');
  if (!guildMembrList) {return;} // list exists
  // hide guild info links
  var hideQSA = hideQuerySelectorAll;
  if (calf.hideGuildInfoTrade) {
    hideQSA(guildMembrList, '#guild-minibox-action-trade');
  }
  if (calf.hideGuildInfoSecureTrade) {
    hideQSA(guildMembrList, '#guild-minibox-action-secure-trade');
  }
  if (calf.hideGuildInfoBuff) {
    hideQSA(guildMembrList, '#guild-minibox-action-quickbuff');
  }
  if (calf.hideGuildInfoMessage) {
    hideQSA(guildMembrList, '#guild-minibox-action-send-message');
  }
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

function alliesColour(el) { // Native
  contactColour(el, {
    l1: 'fshDodgerBlue',
    l2: 'fshLightSkyBlue',
    l3: 'fshPowderBlue'
  });
}

function addOnlineAlliesWidgets() { // Native
  var onlineAlliesList = document.getElementById('minibox-allies-list');
  if (!onlineAlliesList) {return;}
  var hideQSA = hideQuerySelectorAll;
  if (calf.hideGuildInfoTrade) {
    hideQSA(onlineAlliesList, '#online-allies-action-trade');
  }
  if (calf.hideGuildInfoSecureTrade) {
    hideQSA(onlineAlliesList, '#online-allies-action-secure-trade');
  }
  if (calf.hideGuildInfoBuff) {
    hideQSA(onlineAlliesList, '#online-allies-action-quickbuff');
  }
  if (calf.hideGuildInfoMessage) {
    hideQSA(onlineAlliesList, '#online-allies-action-send-message');
  }
  if (calf.hideBuffSelected) {
    hideNodeList(
      onlineAlliesList.getElementsByClassName('ally-buff-check-on'));
    document.getElementById('ally-quick-buff').classList.add('fshHide');
  }
  // add coloring for offline time
  Array.prototype.forEach.call(
    onlineAlliesList.getElementsByClassName('player-name'), alliesColour);
}

function conditional() { // Native
  if (calf.enableAllyOnlineList ||
      calf.enableEnemyOnlineList) {
    add(3, prepareAllyEnemyList);
  }
  if (calf.enableWantedList ||
      calf.enableActiveBountyList) {
    add(3, prepareBountyData);
  }
  if (calf.enableGuildInfoWidgets) {
    add(3, addGuildInfoWidgets);
  }
  if (calf.enableOnlineAlliesWidgets) {
    add(3, addOnlineAlliesWidgets);
  }
  if (calf.enableTempleAlert) {
    add(3, injectTempleAlert);
  }
  if (calf.enableUpgradeAlert) {
    add(3, injectUpgradeAlert);
  }
  if (calf.enableComposingAlert) {
    add(3, injectComposeAlert);
  }
}

function navMenu() { // jQuery
  var myNav = $('#nav').data('nav');
  if (!myNav) {return;}
  var oldSave = myNav._saveState;
  myNav._saveState = function(id) {
    var myHeight = $('li.nav-level-0', '#nav').eq(id).find('ul').height();
    if (myHeight === 0) {id = -1;}
    oldSave.call(myNav, id);
  };
}

function statbarWrapper(href, id) { // Native
  var myWrapper = document.createElement('a');
  myWrapper.setAttribute('href', href);
  var character = document.getElementById(id);
  var statWrapper = character.parentNode;
  myWrapper.appendChild(character);
  statWrapper.insertBefore(myWrapper, statWrapper.firstChild);
  myWrapper.addEventListener('click', function(evt) {
    evt.stopPropagation();
  }, true);
}

function statbar() { // Native
  var sw = statbarWrapper;
  sw('index.php?cmd=profile', 'statbar-character');
  sw('index.php?cmd=points&subcmd=reserve', 'statbar-stamina');
  sw('index.php?cmd=blacksmith', 'statbar-equipment');
  sw('index.php?cmd=profile&subcmd=dropitems', 'statbar-inventory');
  sw('index.php?cmd=points', 'statbar-fsp');
  sw('index.php?cmd=bank', 'statbar-gold');
}

function formatShortDate(aDate) { // Native
  var yyyy = aDate.getFullYear();
  var dd = aDate.getDate();
  if (dd < 10) {dd = '0' + dd;}
  var ddd = days[aDate.getDay()].substr(0, 3);
  var month = months[aDate.getMonth()].substr(0, 3);
  var hh = aDate.getHours();
  if (hh < 10) {hh = '0' + hh;}
  var mm = aDate.getMinutes();
  if (mm < 10) {mm = '0' + mm;}
  return hh + ':' + mm + ' ' + ddd + ' ' + dd + '/' + month + '/' + yyyy;
}

function timeBox(nextGainTime, hrsToGo) { // Native
  var nextGain = /([0-9]+)m ([0-9]+)s/.exec(nextGainTime);
  if (!nextGain) {return;}
  return '<dd>' +
    formatShortDate(new Date(Date.now() +
    (hrsToGo * 60 * 60 + parseInt(nextGain[1], 10) * 60 +
    parseInt(nextGain[2], 10)) * 1000)) + '</dd>';
}

function injectStaminaCalculator() { // Native
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

function injectLevelupCalculator() { // Native
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

function storeFSBox(boxList) { // Native
  if (!boxList) {boxList = '';}
  var fsbox = document.getElementById('minibox-fsbox')
    .getElementsByClassName('message')[0].innerHTML;
  if (boxList.indexOf(fsbox) < 0) {boxList = '<br>' + fsbox + boxList;}
  if (boxList.length > 10000) {boxList = boxList.substring(0, 10000);}
  setForage('fsh_fsboxcontent', boxList);
}

function injectFSBoxLog() { // Native
  var node = document.getElementById('minibox-fsbox');
  if (!node) {return;}
  var nodediv = node.lastElementChild;
  var playerName = nodediv.getElementsByTagName('a');
  if (playerName.length === 0) {return;}
  getForage('fsh_fsboxcontent').done(storeFSBox);
  playerName = playerName[0].textContent;
  nodediv.insertAdjacentHTML('beforeend', '<br><span class="fshPaleVioletRed">' +
    '[ <a href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' +
    playerName + '">Ignore</a> ]</span> <span class="fshYellow">[ <a ' +
    'href="index.php?cmd=notepad&blank=1&subcmd=fsboxcontent">Log</a> ]' +
    '</span>');
}

function fixOnlineGuildBuffLinks() { // Native
  updateHCSQuickBuffLinks(
    '#minibox-guild-members-list #guild-minibox-action-quickbuff');
  updateHCSQuickBuffLinks(
    '#minibox-allies-list #online-allies-action-quickbuff');
}

function changeGuildLogHREF() { // Native
  if (!getValue('useNewGuildLog')) {return;}
  var guildLogNodes = document.querySelectorAll(
    '#pCL a[href="index.php?cmd=guild&subcmd=log"]');
  var guildLogNode;
  var messageBox;
  if (!guildLogNodes) {return;}
  for (var i = 0; i < guildLogNodes.length; i += 1) {
    guildLogNode = guildLogNodes[i];
    guildLogNode.setAttribute('href',
      'index.php?cmd=notepad&blank=1&subcmd=newguildlog');
  }
  //hide the lhs box
  if (location.search === '?cmd=notepad&blank=1&subcmd=newguildlog') {
    if (guildLogNode.innerHTML.search('Guild Log updated!') !== -1) { // new UI
      messageBox = guildLogNode.parentNode;
      if (messageBox) {
        messageBox.classList.add('fshHide');
      }
    }
  }
}

function moveRHSBoxUpOnRHS(title) { // Native
  document.getElementById('pCR').insertAdjacentElement('afterbegin',
    document.getElementById(title));
}

function moveRHSBoxToLHS(title) { // Native
  var boxDiv = document.getElementById(title);
  boxDiv.classList.add('pCR');
  document.getElementById('pCL').appendChild(boxDiv);
}

function injectMenu() { // jQuery.min
  if (!document.getElementById('pCL')) {return;}
  if (getValue('lastActiveQuestPage').length > 0) {
    document.querySelector('#pCL a[href="index.php?cmd=questbook"]')
      .setAttribute('href', getValue('lastActiveQuestPage'));
  }
  //character
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
  if (getValue('keepBuffLog')) {
    document.getElementById('nav-character-log').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-bufflog" href="index.php?cmd=notepad&blank=1&' +
        'subcmd=bufflogcontent">Buff Log</a></li>');
  }
  if (getValue('keepLogs')) {
    document.getElementById('nav-character-notepad').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-showlogs" href="index.php?cmd=notepad&blank=1' +
        '&subcmd=showlogs">Combat Logs</a></li>');
  }
  if (getValue('showMonsterLog')) {
    document.getElementById('nav-character-notepad').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-monsterlog" href="index.php?cmd=notepad&blank' +
        '=1&subcmd=monsterlog">Creature Logs</a></li>');
  }
  document.getElementById('nav-character-notepad').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-quicklinkmanager" href="index.php?cmd=notepad&' +
      'blank=1&subcmd=quicklinkmanager">Quick Links</a></li>');
  //guild
  document.getElementById('nav-guild-storehouse-inventory').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'guild-guildinvmanager" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=guildinvmgr">Guild Inventory</a></li>');
  if (!getValue('useNewGuildLog')) {
    //if not using the new guild log, show it as a separate menu entry
    document.getElementById('nav-guild-ledger-guildlog').parentNode
      .insertAdjacentHTML('beforebegin',
        '<li class="nav-level-2"><a class="nav-link" ' +
        'href="index.php?cmd=notepad&blank=1&subcmd=newguildlog"' +
        '>New Guild Log</a></li>');
  }
  //top rated
  document.getElementById('nav-toprated-players-level').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'toprated-top250" href="index.php?cmd=toprated&subcmd=xp">' +
      'Top 250 Players</a></li>');
  //actions
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
  // adjust the menu height for the newly added items
  var theNav = document.getElementById('nav');
  var myNav = $(theNav).data('nav');
  // first the closed saved variables
  myNav.heights = [ null, null,
    // Character
    document.getElementById('nav-character').nextElementSibling.children
      .length * 22,
    660,
    // Guild
    document.querySelectorAll('#nav-guild > ul li').length * 22,
    374, 132, 132, null ];
  if (myNav.state !== '-1' && myNav.state !== -1) {
    // and now the open one
    theNav.children[myNav.state].children[1].style.height =
      myNav.heights[myNav.state] + 'px';
  }
}

function notHuntMode() { // Native
  //move boxes in opposite order that you want them to appear.
  if (getValue('moveGuildList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-guild']);
  }
  if (getValue('moveOnlineAlliesList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-allies']);
  }
  if (getValue('moveFSBox')) {
    add(3, moveRHSBoxToLHS, ['minibox-fsbox']);
  }

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

function prepareEnv() { // Native

  if (getValue('gameHelpLink')) {
    add(3, gameHelpLink);
  }

  calf.huntingMode = getValue('huntingMode');
  add(3, replaceKeyHandler);

  if (!calf.huntingMode) {
    notHuntMode();
  }

  if (!getValue('hideHelperMenu')) {
    add(3, injectHelperMenu);
  }

}

function asyncDispatcher() { // Native
  if (typeof coreFunction === 'function') {
    screenview(functionPath);
    start('JS Perf', functionPath);
    coreFunction();
    end('JS Perf', functionPath);
  }
}

function doMsgSound() { // jQuery
  var soundLocation = getValue('defaultMessageSound');
  $('a:contains("New log messages"):first').each(function(){
    $(this).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
  $('a:contains("New Guild chat message"):first').each(function(){
    $(this).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
}

function injectQuickLinks() { // Native ?
  var node = document.getElementById('statbar-container');
  if (!node) {return;}
  var quickLinks = getValueJSON('quickLinks') || [];
  if (quickLinks.length <= 0) {return;}
  var draggableQuickLinks = getValue('draggableQuickLinks');
  var html = '<div style="top:' +
    getValue('quickLinksTopPx') + 'px; left:' +
    getValue('quickLinksLeftPx') + 'px; background-image:' +
    'url(\'' + imageServer + '/skin/inner_bg.jpg\');" ' +
    'id="fshQuickLinks" class="fshQuickLinks' +
    (getValue('keepHelperMenuOnScreen') ? ' fshFixed' : '') +
    (draggableQuickLinks ? ' fshLink" draggable="true"' : '"') +
    '>';
  for (var i = 0; i < quickLinks.length; i += 1) {
    html += '<li><a href="' + quickLinks[i].url + '"' +
      (quickLinks[i].newWindow ? ' target=new' : '') +
      '>' + quickLinks[i].name + '</a></li>';
  }
  html += '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
  if (draggableQuickLinks) {
    document.getElementById('fshQuickLinks')
      .addEventListener('dragstart', drag_start, false);
  }
}

// main event dispatcher
FSH.dispatch = function dispatch() { // Native

  setup();

  start('JS Perf', 'FSH.dispatch');

  getCoreFunction();

  var hcsData = document.getElementById('html');
  if (hcsData && JSON.parse(hcsData.getAttribute('data-hcs'))['new-ui']) {
    prepareEnv();
  }

  add(3, asyncDispatcher);

  if (typeof window.jQuery === 'undefined') {return;}

  if (getValue('playNewMessageSound')) {
    add(3, doMsgSound);
  }

  // This must be at the end in order not to screw up other system.findNode calls (Issue 351)
  if (!calf.huntingMode) {
    add(3, injectQuickLinks);
  }

  end('JS Perf', 'FSH.dispatch');

};

window.FSH = window.FSH || {};

}());
