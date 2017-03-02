import * as system from './support/system';

export function injectQuestBookFull() { // Legacy
  var lastQBPage = location.search;
  if (lastQBPage.indexOf('&mode=0') !== -1) {
    system.setValue('lastActiveQuestPage', lastQBPage);
  } else if (lastQBPage.indexOf('&mode=1') !== -1) {
    system.setValue('lastCompletedQuestPage', lastQBPage);
  } else if (lastQBPage.indexOf('&mode=2') !== -1) {
    system.setValue('lastNotStartedQuestPage', lastQBPage);
  }
  if (system.getValue('storeLastQuestPage')) {
    if (system.getValue('lastActiveQuestPage').length > 0) {
      var activeLink = $('a[href*="index.php?cmd=questbook&mode=0"]');
      activeLink.attr('href', system.getValue('lastActiveQuestPage'));
    }
    if (system.getValue('lastCompletedQuestPage').length > 0) {
      var completedLink = $('a[href*="index.php?cmd=questbook&mode=1"]');
      completedLink.attr('href', system.getValue('lastCompletedQuestPage'));
    }
    if (system.getValue('lastNotStartedQuestPage').length > 0) {
      var notStartedLink = $('a[href*="index.php?cmd=questbook&mode=2"]');
      notStartedLink.attr('href', system.getValue('lastNotStartedQuestPage'));
    }
  }
  var questTable = system.findNode('//table[tbody/tr/td[.="Guide"]]');
  if (!questTable) {return;}
  var hideQuests = [];
  if (system.getValue('hideQuests')) {
    hideQuests = system.getValue('hideQuestNames').split(',');
  }
  for (var i = 1; i < questTable.rows.length; i += 1) {
    var aRow = questTable.rows[i];
    if (aRow.cells[0].innerHTML) {
      var questName =
        aRow.cells[0].firstChild.innerHTML.replace(/ {2}/g, ' ').trim();
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
        ' FSG" src="' + system.imageServer + '/temple/1.gif"/></a>';
      aRow.cells[4].innerHTML += '&nbsp;<a href="http://wiki.fallensword' +
        '.com/index.php?title=' + questName.replace(/ /g, '_') +
        '" target="_blank"><img border=0 style="float:left;" title="' +
        'Search for this quest on the Wiki" src="' +
        system.imageServer + '/skin/fs_wiki.gif"/></a>';
    }
  }
}

export function injectQuestTracker() { // Legacy
  var injectHere = system.findNode('//td[font/b[.="Quest Details"]]');
  var questId = document.location.search.match(/quest_id=(\d+)/)[1];
  injectHere.innerHTML += '&nbsp;<a target="_blank" href="http://guide.' +
    'fallensword.com/index.php?cmd=quests&subcmd=view&quest_id=' + questId +
    '"><img border=0 title="Search quest in Ultimate FSG" src="' +
    system.imageServer + '/temple/1.gif"/></a>';
  var questName =
    system.findNode('//font[@size="2" and contains(.,"\'")]', injectHere);
  if (questName) {
    questName = questName.innerHTML;
    questName = questName.match(/"(.*)"/);
    if (questName && questName.length > 1) {
      questName = questName[1];
      injectHere.innerHTML += '&nbsp;<a href="http://wiki.fallensword.com' +
        '/index.php?title=' + questName.replace(/ /g, '_') +
        '" target="_blank"><img border=0 title="Search for this quest on ' +
        'the Fallensword Wiki" src=' + system.imageServer +
        '/skin/fs_wiki.gif /></a>';
    }
  }
}
