import * as layout from './support/layout';
import * as system from './support/system';

var normalLink;
var isNormal;
var seasonLink;
var isSeason;
var activeLink;
var isActive;
var completeLink;
var isComplete;
var notStartedLink;
var isNotStarted;
var lastNormalActiveQuestPage;
var lastNormalCompletedQuestPage;
var lastNormalNotStartedQuestPage;
var lastSeasonalActiveQuestPage;
var lastSeasonalCompletedQuestPage;
var lastSeasonalNotStartedQuestPage;

function dontPost(e) { // Native
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

function whereAmI() { // Native
  var aLinks = layout.pCC.getElementsByTagName('a');
  normalLink = aLinks[0];
  isNormal = normalLink.firstElementChild.getAttribute('color') ===
    '#FF0000';
  seasonLink = aLinks[1];
  isSeason = seasonLink.firstElementChild.getAttribute('color') ===
    '#FF0000';
  activeLink = aLinks[2];
  isActive = activeLink.firstElementChild.getAttribute('color') ===
    '#FF0000';
  completeLink = aLinks[3];
  isComplete = completeLink.firstElementChild.getAttribute('color') ===
    '#FF0000';
  notStartedLink = aLinks[4];
  isNotStarted = notStartedLink.firstElementChild.getAttribute('color') ===
    '#FF0000';
}

function storeLoc() { // Native
  var lastQBPage = location.search;
  system.setValue('lastActiveQuestPage', lastQBPage);
  if (isNormal) {
    if (isActive) {
      system.setValue('lastNormalActiveQuestPage', lastQBPage);
    } else if (isComplete) {
      system.setValue('lastNormalCompletedQuestPage', lastQBPage);
    } else if (isNotStarted) {
      system.setValue('lastNormalNotStartedQuestPage', lastQBPage);
    }
  } else if (isSeason) {
    if (isActive) {
      system.setValue('lastSeasonalActiveQuestPage', lastQBPage);
    } else if (isComplete) {
      system.setValue('lastSeasonalCompletedQuestPage', lastQBPage);
    } else if (isNotStarted) {
      system.setValue('lastSeasonalNotStartedQuestPage', lastQBPage);
    }
  }
}

function normalLinks() { // Native
  if (lastNormalActiveQuestPage.length > 0) {
    activeLink.setAttribute('href', lastNormalActiveQuestPage);
  }
  if (lastNormalCompletedQuestPage.length > 0) {
    completeLink.setAttribute('href', lastNormalCompletedQuestPage);
  }
  if (lastNormalNotStartedQuestPage.length > 0) {
    notStartedLink.setAttribute('href', lastNormalNotStartedQuestPage);
  }
  if (isActive) {
    if (lastSeasonalActiveQuestPage.length > 0) {
      seasonLink.setAttribute('href', lastSeasonalActiveQuestPage);
    }
  }
  if (isComplete) {
    if (lastSeasonalCompletedQuestPage.length > 0) {
      seasonLink.setAttribute('href', lastSeasonalCompletedQuestPage);
    }
  }
  if (isNotStarted) {
    if (lastSeasonalNotStartedQuestPage.length > 0) {
      seasonLink.setAttribute('href', lastSeasonalNotStartedQuestPage);
    }
  }
}

function seasonLinks() { // Native
  if (lastSeasonalActiveQuestPage.length > 0) {
    activeLink.setAttribute('href', lastSeasonalActiveQuestPage);
  }
  if (lastSeasonalCompletedQuestPage.length > 0) {
    completeLink.setAttribute('href', lastSeasonalCompletedQuestPage);
  }
  if (lastSeasonalNotStartedQuestPage.length > 0) {
    notStartedLink.setAttribute('href', lastSeasonalNotStartedQuestPage);
  }
  if (isActive) {
    if (lastNormalActiveQuestPage.length > 0) {
      normalLink.setAttribute('href', lastNormalActiveQuestPage);
    }
  }
  if (isComplete) {
    if (lastNormalCompletedQuestPage.length > 0) {
      normalLink.setAttribute('href', lastNormalCompletedQuestPage);
    }
  }
  if (isNotStarted) {
    if (lastNormalNotStartedQuestPage.length > 0) {
      normalLink.setAttribute('href', lastNormalNotStartedQuestPage);
    }
  }
}

function updateLinks() { // Native
  lastNormalActiveQuestPage = system.getValue('lastNormalActiveQuestPage');
  lastNormalCompletedQuestPage =
    system.getValue('lastNormalCompletedQuestPage');
  lastNormalNotStartedQuestPage =
    system.getValue('lastNormalNotStartedQuestPage');
  lastSeasonalActiveQuestPage =
    system.getValue('lastSeasonalActiveQuestPage');
  lastSeasonalCompletedQuestPage =
    system.getValue('lastSeasonalCompletedQuestPage');
  lastSeasonalNotStartedQuestPage =
    system.getValue('lastSeasonalNotStartedQuestPage');
  if (isNormal) {
    normalLinks();
  } else if (isSeason) {
    seasonLinks();
  }
}

export function injectQuestBookFull() { // Legacy
  layout.pCC.addEventListener('click', dontPost);
  if (system.getValue('storeLastQuestPage')) {
    whereAmI();
    storeLoc();
    updateLinks();
  }
  var questTable = layout.pCC.getElementsByTagName('table')[5];
  if (!questTable) {return;}
  var hideQuests = [];
  if (system.getValue('hideQuests')) {
    hideQuests = system.getValue('hideQuestNames').split(',');
  }
  for (var i = 2; i < questTable.rows.length; i += 4) {
    var aRow = questTable.rows[i];
    var questName =
      aRow.cells[0].firstChild.innerHTML.replace(/ {2}/g, ' ').trim();
    if (hideQuests.indexOf(questName) >= 0) {
      aRow.classList.add('fshHide');
      aRow.nextElementSibling.classList.add('fshHide');
      aRow.nextElementSibling.nextElementSibling.classList.add('fshHide');
      aRow.nextElementSibling.nextElementSibling.nextElementSibling
        .classList.add('fshHide');
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
