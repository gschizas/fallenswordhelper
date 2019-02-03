import buffList from '../../support/buffObj';
import calf from '../../support/calf';
import createDocument from '../../system/createDocument';
import csvSplit from '../../common/csvSplit';
import {getElementById} from '../../common/getElement';
import getText from '../../common/getText';
import getValue from '../../system/getValue';
import guildManage from '../../ajax/guildManage';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import on from '../../common/on';
import onlinePlayersPage from '../../ajax/onlinePlayersPage';
import {pCC} from '../../support/layout';
import pageLayout from './pageLayout';
import parseProfileAndDisplay from './parseProfileAndDisplay';
import partial from '../../common/partial';
import playerName from '../../common/playerName';
import querySelectorArray from '../../common/querySelectorArray';
import retryAjax from '../../ajax/retryAjax';
import setValue from '../../system/setValue';
import stringSort from '../../system/stringSort';
import {buffCustom, otherCustom} from './assets';
import {calcMinLvl, setMinLvl} from './minLvl';
import {getBufferProgress, updateProgress} from './bufferProgress';
import {
  lastActivityRE,
  profileUrl,
  showPlayerUrl
} from '../../support/constants';

var findBuffNicks;
var findBuffMinCastLevel;
var onlinePlayers;
var onlinePlayersSetting;
export var extraProfile;
var profilePagesToSearch;
var profilePagesToSearchProcessed;

function gotProfile(j, html) {
  parseProfileAndDisplay(html, {
    href: j,
    findBuffNicks: findBuffNicks
  });
}

function getProfile(j) {
  retryAjax(j).done(partial(gotProfile, j));
}

function findBuffsParsePlayersForBuffs() { // Legacy
  // remove duplicates TODO
  // now need to parse player pages for buff ...
  getElementById('potentialBuffers').innerHTML =
    onlinePlayers.length;
  if (onlinePlayers.length <= 0) {
    updateProgress('Done.', 'blue');
    return;
  }
  updateProgress('Parsing player data ...', 'green');
  onlinePlayers.forEach(getProfile);
}

function calcNextPage(curPage, maxPage) { // Legacy
  if (curPage === 1) {return Math.round(onlinePlayersSetting * maxPage / 50);}
  return curPage + 1;
}

function addPlayerToSearchList(onlinePlayer, onlinePlayerName) {
  // add online player to search list (all but self)
  if (playerName() !== onlinePlayerName.trim()) {
    onlinePlayers.push(onlinePlayer);
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
  onlinePlayersPage(newPage).done(callback);
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
    onlinePlayersPage(1).done(findBuffsParseOnlinePlayers);
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

function getAlliesEnemies(el) {retryAjax(el).done(findBuffsParseProfilePage);}

function findBuffsParseProfilePageStart() { // Legacy
  // if option enabled then parse profiles
  profilePagesToSearch = [];
  profilePagesToSearch.push(profileUrl); // ???
  var extraProfileArray = csvSplit(extraProfile);
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
  Array.from(buffTable.rows).filter(notHeader)
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
  onlinePlayers = [];
  extraProfile = getElementById('extraProfile').value;
  setValue('extraProfile', extraProfile);
  // get list of players to search, starting with guild>manage page
  guildManage().done(findBuffsParseGuildManagePage);
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
  extraProfile = getValue('extraProfile');
}

function setupFindEvent(fn) {
  on(getElementById('findbuffsbutton'), 'click', fn, true);
}

function setupClearEvent() {
  on(getElementById('clearresultsbutton'),
    'click', findBuffsClearResults, true);
}

export function injectFindBuffs(injector) { // Legacy
  var content = injector || pCC;
  calf.sortBy = 'name';
  calf.sortAsc = true;
  buffList.sort(stringSort);
  getExtraProfile();
  content.innerHTML = pageLayout(buffCustom, extraProfile);
  getBufferProgress();
  setupFindEvent(findBuffsStart);
  setupClearEvent();
}

export function injectFindOther(injector) { // Native - Bad
  var content = injector || pCC;
  getExtraProfile();
  content.innerHTML = pageLayout(otherCustom, extraProfile);
  getBufferProgress();
  setupFindEvent(findOtherStart);
  setupClearEvent();
}
