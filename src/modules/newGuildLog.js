import calf from './support/calf';
import system from './support/system';
import layout from './support/layout';
import logs from './logs';

var storedGuildLog;
var gmtOffsetMilli;
var guildLogFilters = [
  {id: 'showRecallMessages', type: 'Store/Recall'},
  {id: 'showRelicMessages', type: 'Relic'},
  {id: 'showMercenaryMessages', type: 'Mercenary'},
  {id: 'showGroupCombatMessages', type: 'Group Combat'},
  {id: 'showDonationMessages', type: 'Donation'},
  {id: 'showRankingMessages', type: 'Ranking'},
  {id: 'showGvGMessages', type: 'GvG'},
  {id: 'showTaggingMessages', type: 'Tag/UnTag'},
  {id: 'showTitanMessages', type: 'Titan'}
];

function resetNewGuildLog() { // Native
  system.setValueJSON('storedGuildLog', '');
  location.reload();
}

function toggleGuildLogFilterVisibility(evt) { // Legacy
  var filterID = evt.target.id;
  var filterChecked = evt.target.checked;
  var logRows = system.findNodes('//tr[@id="GuildLogFilter:' +
    filterID + '"]');
  if (logRows) {
    for (var i=0;i<logRows.length;i += 1) {
      var logRow = logRows[i];
      if (filterChecked) {
        logRow.style.display = '';
        logRow.style.visibility = 'visible';
      } else {
        logRow.style.display = 'none';
        logRow.style.visibility = 'hidden';
      }
    }
  }
  system.setValue(filterID,filterChecked);
  calf[filterID] = filterChecked;
}

function guildLogSelectFilters(evt) { // Legacy
  var i;
  var checkedValue = evt.target.id==='GuildLogSelectAll';
  for (i = 0; i < guildLogFilters.length; i += 1) {
    system.setValue(guildLogFilters[i].id, checkedValue);
    document.getElementById(guildLogFilters[i].id).checked = checkedValue;
  }
  var logRows = system.findNodes('//tr[contains(@id,"GuildLogFilter:")]');
  if (logRows) {
    for (i=0;i<logRows.length;i += 1) {
      var logRow = logRows[i];
      var rowID = logRow.getAttribute('id');
      if (checkedValue) {
        logRow.style.display = '';
        logRow.style.visibility = 'visible';
      } else if (rowID !== 'GuildLogFilter:Unknown') {
        logRow.style.display = 'none';
        logRow.style.visibility = 'hidden';
      }
    }
  }
}

function parseGuildLogPage(responseText, callback) { // Hybrid - Evil!
  var pageNumber = callback.pageNumber;
  var maxPagesToFetch = callback.maxPagesToFetch;
  var completeReload = callback.completeReload;
  var guildLogInjectTable = callback.guildLogInjectTable;
  var loadingMessageInjectHere = callback.loadingMessageInjectHere;
  var doc = system.createDocument(responseText);

  var logTable = $(doc).find('table.width_full:first');

  /*
    if the whole first page is new, then likely that the stored log needs to
    be refreshed, so go ahead and do so
  */
  if (pageNumber === 1) {
    var lastRowInTable = logTable.find('tr>td:not(.divider)').parent(':last');
    var lastRowCellContents = lastRowInTable.find('td:eq(1)').text();
    var lastRowPostDateAsDate = system.parseDate(lastRowCellContents);
    var lastRowPostDateAsLocalMilli =
      lastRowPostDateAsDate.getTime() - gmtOffsetMilli;
    if (lastRowPostDateAsLocalMilli >
        calf.lastStoredGuildLogMessagePostTime) {completeReload = true;}
  } else {
    completeReload = false;
  }

  var localLastCheckMilli;
  var localDateMilli;
  var enableLogColoring = system.getValue('enableLogColoring');
  if (enableLogColoring) {
    var lastCheckScreen = 'lastGuildLogCheck';
    localLastCheckMilli=system.getValue(lastCheckScreen);
    if (!localLastCheckMilli) {
      localLastCheckMilli = Date.now();
    }
    localDateMilli = Date.now();
  }

  logTable.find('tr:gt(0):has(td:not(.divider))').each(function rowProfiler(){
    var cellContents = $(this).children('td:eq(1)').text();
    if (!cellContents || cellContents === 'Date' ||
      cellContents.split(' ').length === 1) {return;}
    var postDateAsDate = system.parseDate(cellContents);
    var postDateAsLocalMilli = postDateAsDate.getTime() -
      gmtOffsetMilli;

    // if the post date is the same as last one in the stored list and the
    // message is the same, then break out
    // and start appending the stored values instead of parsing.
    calf.stopProcessingLogPages = false;
    if (postDateAsLocalMilli ===
      calf.lastStoredGuildLogMessagePostTime &&
      $(this).html() === calf.lastStoredGuildLogMessage &&
      !completeReload) {
      calf.stopProcessingLogPages = true;
      return false;
    }
    var displayRow = true;
    var rowTypeID = 'GuildLogFilter:Unknown';
    var messageText = $(this).children('td:eq(2)').text();
    //if recall message, check to see if showRecallMessages is checked.
    if (messageText.search('recalled the item') !== -1 ||
      messageText.search('took the item') !== -1 ||
      messageText.search('auto-returned the') !== -1 ||
      messageText.search('stored the item') !== -1) {
      if (!calf.showRecallMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showRecallMessages';
    }
    //Tag/Untag (showTaggingMessages)
    else if (messageText.search('has added flags to some of guild\'s stored items costing a total of') !== -1 ||
      messageText.search('has removed flags to the guild\'s stored items.') !== -1) {
      if (!calf.showTaggingMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showTaggingMessages';
    }
    //Relic messages (showRelicMessages)
    else if (messageText.search('relic. This relic now has an empower level of') !== -1 ||
      messageText.search(/ empowered the .+ relic/) !== -1 ||
      messageText.search('relic. The relic empower level has been reset to zero.') !== -1 ||
      messageText.search('failed to capture the relic') !== -1 ||
      messageText.search('captured the relic') !== -1 ||
      messageText.search('captured your relic') !== -1 ||
      messageText.search('has captured the undefended relic') !== -1 ||
      messageText.search('attempted to capture your relic') !== -1 ||
      messageText.search(/ removed the empowerment from the .+ relic/) !== -1 ) {
      if (!calf.showRelicMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showRelicMessages';
    }
    //Mercenary messages (showMercenaryMessages)
    else if (messageText.search('disbanded a mercenary.') !== -1 ||
      messageText.search('hired the mercenary') !== -1) {
      if (!calf.showMercenaryMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showMercenaryMessages';
    }
    //Group Combat messages (showGroupCombatMessages)
    else if (messageText.search('has disbanded one of their groups') !== -1 ||
      messageText.search(/A group from your guild was (.*) in combat./) !== -1) {
      if (!calf.showGroupCombatMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showGroupCombatMessages';
    }
    //Donation messages (showDonationMessages)
    else if (messageText.search(/deposited ([,0-9]+) FallenSword Points into the guild./) !== -1 ||
      messageText.search(/deposited ([,0-9]+) gold into the guild bank/) !== -1) {
      if (!calf.showDonationMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showDonationMessages';
    }
    //Ranking messages (showRankingMessages)
    else if (messageText.search('has added a new rank entitled') !== -1 ||
      messageText.search('has deleted the rank') !== -1 ||
      messageText.search('has requested to join the guild') !== -1 ||
      messageText.search('has invited the player') !== -1 ||
      messageText.search('has officially joined the guild') !== -1 ||
      messageText.search('has been kicked from the guild by') !== -1 ||
      messageText.search('has left the guild') !== -1 ||
      messageText.search('has been assigned the rank') !== -1) {
      if (!calf.showRankingMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showRankingMessages';
    }
    //GvG messages (showGvGMessages)
    else if (messageText.search('resulted in a draw. Your GvG rating and Guild RP was unaffected.') !== -1 ||
      messageText.search(/resulted in (.*) with a final score of/) !== -1 ||
      messageText.search('has just initiated a conflict with the guild') !== -1 ||
      messageText.search('has initiated a conflict with your guild') !== -1 ||
      messageText.search('is participating in the conflict against the guild') !== -1) {
      if (!calf.showGvGMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showGvGMessages';
    }
    // Titan messages (showTitanMessages)
    else if (messageText.search('from your guild\'s contribution to the defeat of the titan') !== -1 ||
      messageText.search('a 7 day cooldown has been activated on your guild for this titan') !== -1 ||
      messageText.search('bought the Titan Reward item') !== -1) {
      if (!calf.showTitanMessages) {displayRow = false;}
      rowTypeID = 'GuildLogFilter:showTitanMessages';
    }

    //display the row or effectively hide it
    var newRow = $(this).clone(true);
    if (!displayRow) {
      newRow.css('display','none')
        .css('visibility','hidden');
    }
    newRow.id = rowTypeID;
    newRow.appendTo(guildLogInjectTable);
    var postAge = (localDateMilli - postDateAsLocalMilli)/(1000*60);
    if (enableLogColoring && postDateAsLocalMilli > localLastCheckMilli) {
      newRow.css('backgroundColor','#F5F298');
    }
    else if (enableLogColoring && postAge > 20 &&
      postDateAsLocalMilli <= localLastCheckMilli) {
      newRow.css('backgroundColor', '#CD9E4B');
    }
    var newLogMessage = {
      postDateAsLocalMilli: postDateAsLocalMilli,
      rowTypeID: rowTypeID,
      logMessage: newRow.html()
    };
    calf.newStoredGuildLog.logMessage.push(newLogMessage);
    //create following spacer row
    var spacerRow = $('<tr></tr>');
    if (!displayRow) {
      spacerRow.css('display','none')
        .css('visibility','hidden');
    }
    spacerRow.id = rowTypeID;
    spacerRow.appendTo(guildLogInjectTable);
    spacerRow.html('<td class="divider" colspan="3"></td>');
    newLogMessage = {
      postDateAsLocalMilli: postDateAsLocalMilli,
      rowTypeID: rowTypeID,
      logMessage: spacerRow.html()
    };
    calf.newStoredGuildLog.logMessage.push(newLogMessage);
  });

  if (calf.stopProcessingLogPages) {
    loadingMessageInjectHere.innerHTML = 'Processing stored logs ...';
    for (var i=0;i<storedGuildLog.logMessage.length;i += 1) {
      var logMessageArrayItem = storedGuildLog.logMessage[i];
      var newRow = document.createElement('TR');
      var displayRow = true;
      for (var j = 0; j < guildLogFilters.length; j += 1) {
        var guildLogFilterID = guildLogFilters[j].id;
        var rowTypeID = 'GuildLogFilter:' + guildLogFilterID;
        if (logMessageArrayItem.rowTypeID === rowTypeID) {
          displayRow = calf[guildLogFilterID];
          break;
        }
      }
      newRow.style.display = '';
      newRow.style.visibility = '';
      if (!displayRow) {
        newRow.style.display = 'none';
        newRow.style.visibility = 'hidden';
      }
      newRow.id = logMessageArrayItem.rowTypeID;
      guildLogInjectTable.appendChild(newRow);
      newRow.innerHTML = logMessageArrayItem.logMessage;
      var postAge = (localDateMilli -
        logMessageArrayItem.postDateAsLocalMilli)/(1000*60);
      if (enableLogColoring && newRow.cells[2] &&
        logMessageArrayItem.postDateAsLocalMilli > localLastCheckMilli) {
        newRow.style.backgroundColor = '#F5F298';
      }
      else if (enableLogColoring && newRow.cells[2] && postAge > 20 &&
        logMessageArrayItem.postDateAsLocalMilli <= localLastCheckMilli) {
        newRow.style.backgroundColor = '#CD9E4B';
      }
      var newLogMessage = {
        postDateAsLocalMilli: logMessageArrayItem.postDateAsLocalMilli,
        rowTypeID: logMessageArrayItem.rowTypeID,
        logMessage: logMessageArrayItem.logMessage
      };
      calf.newStoredGuildLog.logMessage.push(newLogMessage);
    }
  }

  var page = $(doc).find('input[name="page"]');
  var maxPage = page.parent().html().match(/of&nbsp;(\d*)/)[1];

  //fetch the next page (if necessary)
  if (pageNumber < maxPage && pageNumber < maxPagesToFetch &&
    !calf.stopProcessingLogPages) {
    var nextPage = parseInt(pageNumber+1,10);
    loadingMessageInjectHere.innerHTML = 'Loading Page ' + (nextPage + 1) +
      ' of ' + Math.floor(maxPagesToFetch+1,maxPage) + '...';
    system.xmlhttp('index.php?cmd=guild&subcmd=log&subcmd2=&page=' +
      nextPage + '&search_text=', parseGuildLogPage,
      {'guildLogInjectTable': guildLogInjectTable,
        'pageNumber': nextPage,
        'loadingMessageInjectHere': loadingMessageInjectHere,
        'maxPagesToFetch': maxPagesToFetch,
        'completeReload': completeReload});
  } else {
    loadingMessageInjectHere.innerHTML = 'Loading Complete.';
    logs.addGuildLogWidgets();
    system.setValueJSON('storedGuildLog', calf.newStoredGuildLog);
    var now = Date.now();
    system.setValue('lastGuildLogCheck', now.toString());
  }
}

function injectNewGuildLog(content){ // Legacy
  var i;
  if (!content) {content=layout.notebookContent();}

  // FSH.newGuildLog.setupGuildLogFilters();

  //store the time zone for use in processing date/times
  var gmtOffsetMinutes = (new Date()).getTimezoneOffset();
  gmtOffsetMilli = gmtOffsetMinutes * 60 * 1000;

  //find the time the guild log was stored last
  storedGuildLog = system.getValueJSON('storedGuildLog');
  if (storedGuildLog) {
    calf.lastStoredGuildLogMessage = storedGuildLog.logMessage[0].logMessage;
    calf.lastStoredGuildLogMessagePostTime =
      storedGuildLog.logMessage[0].postDateAsLocalMilli;
  }

  calf.newStoredGuildLog = {logMessage:[]};

  var newhtml='<table cellspacing="0" cellpadding="0" ' +
    'border="0" width="100%">' +
    '<tr style="background-color:#cd9e4b">' +
      '<td width="80%" nobr><b>&nbsp;Guild Log Version 3</b></td>' +
      '<td><span id="Helper:ResetNewGuildLog" ' +
        'style="text-decoration:underline;cursor:pointer;color:blue;">' +
        'Reset</span>' +
        '&nbsp;<a href="index.php?cmd=guild&subcmd=log">' +
        '<span style="color:blue;">Old Guild Log</span></a>' +
      '</td>' +
    '</tr>' +

    '<tr><td colspan=2>' +
      '<table><tbody><tr><td><b>Filters:</b></td>' +
      '<td><table><tbody><tr><td>';

  for (i = 0; i < guildLogFilters.length; i += 1) {
    var guildLogFilterID = guildLogFilters[i].id;
    calf[guildLogFilterID] = system.getValue(guildLogFilterID);
    newhtml += i % 5 === 0 ? '</td></tr><tr><td>' : '';
    newhtml += '&nbsp;' + guildLogFilters[i].type + 's:<input id="' +
      guildLogFilterID + '" type="checkbox" linkto="' + guildLogFilterID +
      '"' + (calf[guildLogFilterID] ? ' checked' : '') + '/>';
  }

  newhtml += '</td></tr><tr><td>&nbsp;' +
    '<span id=GuildLogSelectAll>[Select All]</span>&nbsp;' +
    '<span id=GuildLogSelectNone>[Select None]</span>' +
    '</td></tr></tbody></table>' +
    '</td></tr>'+
    '<tr><td colspan=2>' +
    '<span style="color:blue;" id="Helper:NewGuildLogLoadingMessage">' +
    'Loading Page 1 ...</span></td></tr>' +
    '</tbody></table>';

  newhtml += '<table width="100%" cellspacing="0" cellpadding="2" ' +
    'border="0" id="Helper:GuildLogInjectTable"><tbody>' +
    '<tr>' +
    '<td width="16" bgcolor="#cd9e4b"></td>' +
    '<td width="20%" bgcolor="#cd9e4b">Date</td>' +
    '<td width="80%" bgcolor="#cd9e4b">Message</td>' +
    '</tr>' +
    // '<tr>' +
    // '<td class="divider" colspan="3"></td>' +
    // '</tr>' +
    '</tbody>' +
    '</table>';
  content.innerHTML=newhtml;

  document.getElementById('Helper:ResetNewGuildLog')
    .addEventListener('click', resetNewGuildLog, true);

  var guildLogInjectTable =
    document.getElementById('Helper:GuildLogInjectTable');
  var loadingMessageInjectHere =
    document.getElementById('Helper:NewGuildLogLoadingMessage');

  for (i = 0; i < guildLogFilters.length; i += 1) {
    document.getElementById(guildLogFilters[i].id).addEventListener('click',
      toggleGuildLogFilterVisibility, true);
  }
  document.getElementById('GuildLogSelectAll').addEventListener('click',
    guildLogSelectFilters, true);
  document.getElementById('GuildLogSelectNone').addEventListener('click',
    guildLogSelectFilters, true);

  var oldMaxPagesToFetch = system.getValue('oldNewGuildLogHistoryPages');
  oldMaxPagesToFetch =
    oldMaxPagesToFetch ? parseInt(oldMaxPagesToFetch,10) : 100;
  var maxPagesToFetch =
    parseInt(system.getValue('newGuildLogHistoryPages') - 1, 10);
  system.setValue('oldNewGuildLogHistoryPages', maxPagesToFetch);
  var completeReload = false;
  if (maxPagesToFetch > oldMaxPagesToFetch) {completeReload = true;}
  //fetch guild log page and apply filters
  system.xmlhttp('index.php?cmd=guild&subcmd=log', parseGuildLogPage,
    {'guildLogInjectTable': guildLogInjectTable.firstElementChild,
      'pageNumber': 1, 
      'loadingMessageInjectHere': loadingMessageInjectHere,
      'maxPagesToFetch': maxPagesToFetch,
      'completeReload': completeReload
    }
  );
}

export default {
  injectNewGuildLog: injectNewGuildLog,
};
