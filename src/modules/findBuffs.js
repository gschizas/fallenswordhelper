import buffList from './support/buffObj';
import calf from './support/calf';
import {lastActivityRE} from './support/dataObj';
import * as layout from './support/layout';
import * as settingsPage from './settings/settingsPage';
import * as system from './support/system';

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
    var textToSearchFor = system.getValue('textToSearchFor') || '';
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
var onlinePlayers;
var onlinePlayersSetting;
var extraProfile;
var profilePagesToSearch;
var profilePagesToSearchProcessed;
var bufferProgress;

function pageLayout(o) { // Legacy
  extraProfile = system.getValue('extraProfile');
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
    settingsPage.helpLink('Search Allies/Enemies',
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
  return system.fallback(sustainLevel, -1);
}

function nameCell(doc, callback, lastActivity, bioCellHtml) { // Legacy
  var playerName = doc.getElementById('pCC')
    .getElementsByTagName('h1')[0].textContent;
  var levelValue = system.intValue(doc.getElementById('profileLeftColumn')
    .children[4].children[0].rows[0].cells[1].textContent);
  var virtualLevelValue = parseInt(doc.getElementById('stat-vl')
    .textContent, 10);
  var lastActivityMinutes = parseInt(lastActivity[1], 10);
  var lastActivityIMG = layout.onlineDot({min: lastActivityMinutes});
  var playerHREF = callback.href;
  var bioTip = bioCellHtml.replace(/'|"|\n/g, '');
  return '<nobr>' + lastActivityIMG + '&nbsp;<a href="' +
      playerHREF + '" target="new" ' +
      // FIXME - It kind works now, but not guaranteed?
      'class="tip-static" ' +
      'data-tipped="' + bioTip + '">' + playerName + '</a>' +
      '&nbsp;<span class="fshBlue">[<span class="a-reply fshLink" ' +
      'target_player="' + playerName + '">m</span>]</span></nobr><br>' +
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
  var doc = system.createDocument(responseText);
  // name and level
  var pCC = doc.getElementById('pCC');
  // last activity
  var lastActivityElement = pCC.getElementsByTagName('p')[0];
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
    onlinePlayers.length;
  if (onlinePlayers.length <= 0) {
    bufferProgress.innerHTML = 'Done.';
    bufferProgress.style.color = 'blue';
    return;
  }
  bufferProgress.innerHTML = 'Parsing player data ...';
  bufferProgress.style.color = 'green';

  for (var j = 0; j < onlinePlayers.length; j += 1) {
    system.xmlhttp(onlinePlayers[j],
      findBuffsParseProfileAndDisplay,
      {href: onlinePlayers[j]});
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
  var doc = system.createDocument(responseText);
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
          onlinePlayers.push(onlinePlayer);
        }
      }
    });
  }
  if (curPage < maxPage/* -maxPage+15*/) {
    var newPage = calcNextPage(curPage, maxPage);
    bufferProgress.innerHTML = 'Parsing online page ' + curPage + ' ...';
    system.xmlhttp('index.php?cmd=onlineplayers&page=' + newPage,
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
    system.xmlhttp('index.php?cmd=onlineplayers&page=1',
      findBuffsParseOnlinePlayers, {page: 1});
  } else {
    findBuffsParsePlayersForBuffs();
  }
}

function findBuffsParseProfilePage(responseText) { // jQuery
  var doc = system.createDocument(responseText);
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
        onlinePlayers.push(onlinePlayer);
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
      system.xmlhttp(el, findBuffsParseProfilePage);
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
      onlinePlayers.push(onlinePlayer);
    }
  }
}

function findBuffsParseGuildManagePage(responseText) { // jQuery
  var doc = system.createDocument(responseText);
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
  onlinePlayers = [];
  extraProfile = document.getElementById('extraProfile').value;
  system.setValue('extraProfile', extraProfile);
  // get list of players to search, starting with guild>manage page
  system.xmlhttp('index.php?cmd=guild&subcmd=manage',
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
  system.setValue('textToSearchFor', textToSearchFor);
  findBuffNicks = textToSearchFor;
  findBuffMinCastLevel = 1;
  findAnyStart('profiles to search');
}

export function injectFindBuffs(injector) { // Legacy
  var content = injector || layout.pCC;
  calf.sortBy = 'name';
  calf.sortAsc = true;
  buffList.sort(system.stringSort);
  content.innerHTML = pageLayout(buffCustom);
  document.getElementById('findbuffsbutton')
    .addEventListener('click', findBuffsStart, true);
  document.getElementById('clearresultsbutton')
    .addEventListener('click', findBuffsClearResults, true);
}

export function injectFindOther(injector) { // Native - Bad
  var content = injector || layout.pCC;
  content.innerHTML = pageLayout(otherCustom);
  document.getElementById('findbuffsbutton')
    .addEventListener('click', findOtherStart, true);
  document.getElementById('clearresultsbutton')
    .addEventListener('click', findBuffsClearResults, true);
}
