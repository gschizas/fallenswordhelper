import calf from './support/calf';
import * as buffObj from './support/buffObj';
import * as layout from './support/layout';
import * as settingsPage from './settings/settingsPage';
import * as system from './support/system';

var actRE = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;

function uniq(arr, removeBy) { // Ugly but fast
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

function getBioLines(bioCellHtml) {
  var res = [];
  var buffPosition = 0;
  var startingPosition = 0;
  var runningTotalPosition = 0;
  var bioTextToSearch = ' ' + bioCellHtml + ' ';
  var buffRE = new RegExp('[^a-zA-Z]((' +
    calf.findBuffNicks.replace(/,/g, ')|(') + '))[^a-zA-Z]', 'i');
  while (buffPosition !== -1) {
    bioTextToSearch = bioTextToSearch.substr(startingPosition,
      bioTextToSearch.length);
    buffPosition = bioTextToSearch.search(buffRE);
    if (buffPosition !== -1) {
      startingPosition = buffPosition + 1;
      runningTotalPosition += buffPosition;
      var prevBR = bioCellHtml.lastIndexOf('<br>', runningTotalPosition - 1);
      if (prevBR === -1) {prevBR = 0;}
      var nextBR = bioCellHtml.indexOf('<br>', runningTotalPosition);
      if (nextBR === -1 && bioCellHtml.indexOf('<br>') !== -1) {
        nextBR = bioCellHtml.length - 5;
      }
      var textLine = bioCellHtml.substr(prevBR + 4, nextBR - prevBR);
      textLine = textLine.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '');
      res.push(textLine);
    }
  }
  return uniq(res);
}

function findBuffsParseProfileAndDisplay(responseText, callback) { // Hybrid - Evil
  var doc = system.createDocument(responseText);
  // name and level
  var pCC = doc.getElementById('pCC');
  var playerName = pCC.getElementsByTagName('h1')[0].textContent;
  var levelValue = system.intValue(doc.getElementById('profileLeftColumn')
    .children[4].children[0].rows[0].cells[1].textContent);
  var virtualLevelValue = parseInt(doc.getElementById('stat-vl')
    .textContent, 10);
  // last activity
  var lastActivityElement = pCC.getElementsByTagName('p')[0];
  var lastActivity = /(\d+) mins, (\d+) secs/
    .exec(lastActivityElement.textContent);
  var lastActivityMinutes = parseInt(lastActivity[1], 10);
  var lastActivityIMG = layout.onlineDot({min: lastActivityMinutes});
  // buffs
  var bioCellHtml = doc.getElementById('profile-bio').innerHTML;
  var buffTable = document.getElementById('buffTable');
  var textLineArray = getBioLines(bioCellHtml);
  // console.log('textLineArray', textLineArray);
  // sustain
  var sustainText = $(doc)
    .find('td:has(a:contains("Sustain")):last').next()
    .find('table.tip-static').data('tipped');
  var sustainLevel;
  if (typeof sustainText !== 'undefined') {
    var sustainLevelRE = /Level<br>(\d+)%/;
    sustainLevel = sustainLevelRE.exec(sustainText)[1];
  } else {
    sustainLevel = -1;
  }
  // extend
  var hasExtendBuff = $(doc).find('img.tipped[data-tipped*="Extend"]');

  // add row to table
  if (textLineArray.length > 0) {
    var newRow = buffTable.insertRow(-1);
    // name cell
    var newCell = newRow.insertCell(0);
    newCell.style.verticalAlign = 'top';
    var playerHREF = callback.href;
    var bioTip = bioCellHtml.replace(/'|"|\n/g, '');
    newCell.innerHTML = '<nobr>' + lastActivityIMG + '&nbsp;<a href="' +
      playerHREF + '" target="new" ' +
      // FIXME - It kind works now, but not guaranteed?
      'class="tipped" data-tipped-options="hook: \'leftmiddle\'" ' +
      'data-tipped="' + bioTip + '">' + playerName + '</a>' +
      '&nbsp;<span style="color:blue;">[<span class="a-reply" ' +
      'target_player="' + playerName + '" style="cursor:pointer; ' +
      'text-decoration:underline;">m</span>]</span></nobr><br>' +
      '<span style="color:gray;">Level:&nbsp;</span>' + levelValue +
      '&nbsp;(' + virtualLevelValue + ')';
    $('.a-reply').click(function(evt) {
      window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
    });

    // player info cell
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
    // buff cell
    newCell = newRow.insertCell(2);
    for (var i = 0; i < textLineArray.length; i += 1) {
      newCell.innerHTML += textLineArray[i] + '<br>';
    }
  }
  var processedBuffers = document.getElementById('buffersProcessed');
  var potentialBuffers =
    parseInt(document.getElementById('potentialBuffers').textContent, 10);
  var processedBuffersCount = parseInt(processedBuffers.textContent, 10);
  processedBuffers.innerHTML = processedBuffersCount + 1;
  if (potentialBuffers === processedBuffersCount + 1) {
    var bufferProgress = document.getElementById('bufferProgress');
    bufferProgress.innerHTML = 'Done.';
    bufferProgress.style.color = 'blue';
  }
}

function findBuffsParsePlayersForBuffs() { // Legacy
  // remove duplicates TODO
  var bufferProgress = document.getElementById('bufferProgress');
  // now need to parse player pages for buff ...
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
    system.xmlhttp(calf.onlinePlayers[j],
      findBuffsParseProfileAndDisplay,
      {href: calf.onlinePlayers[j]});
  }
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
      var minPlayerVirtualLevel = 1;
      if (calf.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
      if (onlinePlayerLevel >= calf.findBuffMinCastLevel &&
        onlinePlayerLevel >= minPlayerVirtualLevel) {
        // add online player to search list (all but self)
        if (characterName !== onlinePlayerName.trim()) {
          calf.onlinePlayers.push(onlinePlayer);
        }
      }
    });
  }
  if (curPage < maxPage/* -maxPage+15*/) {
    var newPage = curPage === 1 ?
      Math.round(calf.onlinePlayersSetting * maxPage / 50) :
      curPage + 1;
    var bufferProgress = document.getElementById('bufferProgress');
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
  calf.onlinePlayersSetting =
    parseInt(document.getElementById('onlinePlayers').value, 10);
  if (calf.onlinePlayersSetting !== 0) {
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
    var lastActivity = actRE.exec(onMouseOver);
    var lastActivityDays = parseInt(lastActivity[1], 10);
    var lastActivityHours = parseInt(lastActivity[2], 10) +
      lastActivityDays * 24;
    var lastActivityMinutes = parseInt(lastActivity[3], 10) +
      lastActivityHours * 60;
    // check if they are high enough level to cast the buff
    var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
    virtualLevel = parseInt(virtualLevel[1].replace(/,/g, ''), 10);
    var minPlayerVirtualLevel = 1;
    if (calf.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
    if (lastActivityMinutes < 5 &&
      virtualLevel >= calf.findBuffMinCastLevel &&
      virtualLevel >= minPlayerVirtualLevel) {
      // add online player to search list (all but self)
      var onlinePlayer = $(e).attr('href');
      if (characterName !== $(e).text().trim()) {
        calf.onlinePlayers.push(onlinePlayer);
      }
    }
  });
  // continue with online players
  calf.profilePagesToSearchProcessed += 1;
  if (calf.profilePagesToSearchProcessed ===
    calf.profilePagesToSearch.length) {
    findBuffsParseOnlinePlayersStart();
  }
}

function findBuffsParseProfilePageStart() { // Legacy
  // if option enabled then parse profiles
  calf.profilePagesToSearch = [];
  calf.profilePagesToSearch.push('index.php?cmd=profile');
  var extraProfileArray = calf.extraProfile.split(',');
  var i;
  for (i = 0; i < extraProfileArray.length; i += 1) {
    calf.profilePagesToSearch.push('index.php?cmd=findplayer' +
      '&search_active=1&search_level_max=&search_level_min=' +
      '&search_username=' + extraProfileArray[i] + '&search_show_first=1');
  }
  calf.profilePagesToSearchProcessed = 0;
  if (document.getElementById('alliesEnemies').checked) {
    for (i = 0; i < calf.profilePagesToSearch.length; i += 1) {
      system.xmlhttp(calf.profilePagesToSearch[i],
        findBuffsParseProfilePage);
    }
  } else {
    findBuffsParseOnlinePlayersStart();
  }
}

function findBuffsParseGuildManagePage(responseText) { // jQuery
  var doc = system.createDocument(responseText);
  var characterName = $('dt.stat-name:first').next().text().replace(/,/g, '');
  var memberTableRows = $(doc)
    .find('table:has(td:contains("Rank")[bgcolor="#C18B35"]):last')
    .find('tr:gt(1):not(:has(td[colspan="5"]))');
  if (document.getElementById('guildMembers').checked) {
    memberTableRows.each(function(i, e) {
      var contactLink = $(e).find('a');
      var onMouseOver = $(contactLink).data('tipped');
      var lastActivity = actRE.exec(onMouseOver);
      var lastActivityDays = parseInt(lastActivity[1], 10);
      var lastActivityHours = parseInt(lastActivity[2], 10) +
        lastActivityDays * 24;
      var lastActivityMinutes = parseInt(lastActivity[3], 10) +
        lastActivityHours * 60;
      // check if they are high enough level to cast the buff
      var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
      virtualLevel = parseInt(virtualLevel[1].replace(/,/g, ''), 10);
      var minPlayerVirtualLevel = 1;
      if (calf.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
      if (lastActivityMinutes < 5 &&
        virtualLevel >= calf.findBuffMinCastLevel &&
        virtualLevel >= minPlayerVirtualLevel) {
        // add online player to search list (all but self)
        var onlinePlayer = contactLink.attr('href');
        if (characterName !== $(e).find('td:eq(1)')
          .text().trim()) {
          calf.onlinePlayers.push(onlinePlayer);
        }
      }
    });
  }
  // continue with profile pages
  findBuffsParseProfilePageStart();
}

function findBuffsStart() { // Legacy
  var selectedBuff = parseInt($('#selectedBuff').val(), 10);
  // create array of buff nicknames ...
  var buffList = buffObj.buffList;
  for (var j = 0; j < buffList.length; j += 1) {
    if (selectedBuff === buffList[j].skillId) {
      calf.findBuffNicks = buffList[j].nicks;
      calf.findBuffMinCastLevel = buffList[j].minCastLevel;
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
  system.setValue('extraProfile', calf.extraProfile);
  // get list of players to search, starting with guild>manage page
  system.xmlhttp('index.php?cmd=guild&subcmd=manage',
    findBuffsParseGuildManagePage);
}

function findBuffsClearResults() { // Legacy
  var buffTable = document.getElementById('buffTable');
  for (var j = buffTable.rows.length; j > 1; j -= 1) {
    buffTable.deleteRow(j - 1);
  }
  document.getElementById('buffNicks').innerHTML = '';
  var bufferProgress = document.getElementById('bufferProgress');
  bufferProgress.innerHTML = 'Idle.';
  bufferProgress.style.color = 'black';
  document.getElementById('potentialBuffers').innerHTML = '';
  document.getElementById('buffersProcessed').innerHTML = 0;
}

export function injectFindBuffs(injector) { // Legacy
  var content = injector || layout.pCC;
  var buffList = buffObj.buffList;
  calf.sortBy = 'name';
  calf.sortAsc = true;
  buffList.sort(system.stringSort);
  var injectionText = '';
  var extraProfile = system.getValue('extraProfile');
  injectionText += '<table width="620" cellspacing="0" cellpadding="2" ' +
    'border="0" align="center"><tbody><tr><td rowspan="2" colspan="2" ' +
    'width="50%"><h1>Find Buff</h1></td><td align="right" style="' +
    'color:brown;">Select buff to search for:</td>';

  injectionText += '<td align="left"><select style="width:140px;" ' +
    'id="selectedBuff">';
  for (var j = 0; j < buffList.length; j += 1) {
    injectionText += '<option value="' + buffList[j].skillId + '">' +
      buffList[j].name + '</option>';
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
    settingsPage.helpLink('Search Allies/Enemies', 'The checkbox enables ' +
    'searching your own personal allies/enemies list for buffs.<br><br>' +
    'Additional profiles to search can be added in the text field to the ' +
    'right, separated by commas.') + '</td>' +
    '<td align="left"><input id="alliesEnemies" type="checkbox" checked>' +
    '<input style="width:118px;" class="custominput" id="extraProfile" ' +
    'type="text" title="Extra profiles to search" value="' +
    (extraProfile || '') + '"></td></tr>' +
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
    '&nbsp;</td><td align="left" width="310" id="bufferProgress">Idle</td>' +
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
    'functionality does a simple text search for the terms above. ' +
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
  // use existing array structure to save search text ...
  var textArray = textToSearchFor.split(',');
  var tempArray = [];
  for (var i = 0; i < textArray.length; i += 1) {
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
  system.setValue('textToSearchFor', textToSearchFor);
  calf.extraProfile = document.getElementById('extraProfile').value;
  system.setValue('extraProfile', calf.extraProfile);
  // get list of players to search, starting with guild>manage page
  system.xmlhttp('index.php?cmd=guild&subcmd=manage',
    findBuffsParseGuildManagePage);
}

export function injectFindOther(injector) { // Native - Bad
  var content = injector || layout.pCC;
  var injectionText = '';
  var textToSearchFor = system.getValue('textToSearchFor');
  var extraProfile = system.getValue('extraProfile');
  injectionText += '<table width="620" cellspacing="0" cellpadding="2" ' +
    'border="0" align="center"><tbody>' +
    '<tr><td rowspan="2" colspan="2" width="50%"><h1>Find Other</h1></td>' +
    '<td align="right" style="color:brown;">Select text to search for:</td>' +

    '<td align="left"><input style="width:140px;" class="custominput" ' +
    'id="textToSearchFor" type="text" title="Text to search for" value="' +
    (textToSearchFor || '') + '"></td></tr>' +

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
    settingsPage.helpLink('Search Allies/Enemies',
      'The checkbox enables searching your own personal ' +
      'allies/enemies list for buffs.<br><br>' +
      'Additional profiles to search can be added in the text ' +
      'field to the right, separated by commas.') + '</td>' +
    '<td align="left"><input id="alliesEnemies" type="checkbox" checked>' +
    '<input style="width:118px;" class="custominput" id="extraProfile" ' +
    'type="text" title="Extra profiles to search" value="' +
    (extraProfile || '') + '"></td></tr>' +
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
