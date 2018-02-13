import buffList from '../support/buffObj';
import calf from '../support/calf';
import createDocument from '../system/createDocument';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {lastActivityRE} from '../support/constants';
import {pCC} from '../support/layout';
import pageLayout from './pageLayout';
import parseProfileAndDisplay from './parseProfileAndDisplay';
import playerName from '../common/playerName';
import retryAjax from '../ajax/retryAjax';
import setValue from '../system/setValue';
import stringSort from '../system/stringSort';
import {buffCustom, otherCustom} from './assets';

var characterName;
var findBuffNicks;
var findBuffMinCastLevel;
var findBuffsLevel175Only;
var onlinePlayers;
var onlinePlayersSetting;
export var extraProfile;
var profilePagesToSearch;
var profilePagesToSearchProcessed;
var bufferProgress;

function findBuffsParsePlayersForBuffs() { // Legacy
  // remove duplicates TODO
  // now need to parse player pages for buff ...
  getElementById('potentialBuffers').innerHTML =
    onlinePlayers.length;
  if (onlinePlayers.length <= 0) {
    bufferProgress.innerHTML = 'Done.';
    bufferProgress.style.color = 'blue';
    return;
  }
  bufferProgress.innerHTML = 'Parsing player data ...';
  bufferProgress.style.color = 'green';

  //#if _DEV  //  Find Buffs uglify bug
  console.log('onlinePlayers', onlinePlayers); // eslint-disable-line no-console
  //#endif

  onlinePlayers.forEach(function(j) {
    retryAjax(j).done(function(html) {
      parseProfileAndDisplay(html, {
        href: onlinePlayers[j],
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
    onlinePlayers.push(onlinePlayer);
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
  onlinePlayers = [];
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

export function injectFindBuffs(injector) { // Legacy
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

export function injectFindOther(injector) { // Native - Bad
  var content = injector || pCC;
  extraProfile = getValue('extraProfile');
  content.innerHTML = pageLayout(otherCustom, extraProfile);
  getElementById('findbuffsbutton')
    .addEventListener('click', findOtherStart, true);
  getElementById('clearresultsbutton')
    .addEventListener('click', findBuffsClearResults, true);
}
