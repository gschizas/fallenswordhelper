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

function guideButtons(questID, questName) {
  return '<div class="parent">' +
    '<a href="http://guide.fallensword.com/index.php?cmd=quests&amp;' +
    'subcmd=view&amp;quest_id=' + questID + '" class="tip-static" ' +
    'data-tipped="Search for this quest on the Ultimate Fallen Sword Guide" ' +
    'style="background-image: url(\'' + system.imageServer +
    '/temple/1.gif\');" target="_blank"></a>&nbsp;' +
    '<a href="http://wiki.fallensword.com/index.php?title=' +
    questName.replace(/ /g, '_') + '" class="tip-static" ' +
    'data-tipped="Search for this quest on the Wiki" ' +
    'style="background-image: url(\'' + system.imageServer +
    '/skin/fs_wiki.gif\');" target="_blank"></a></div>';
}

export function injectQuestBookFull() { // Native
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
    var questName = aRow.cells[0].textContent.replace(/ {2}/g, ' ').trim();
    if (hideQuests.indexOf(questName) >= 0) {
      aRow.classList.add('fshHide');
      aRow.nextElementSibling.classList.add('fshHide');
      aRow.nextElementSibling.nextElementSibling.classList.add('fshHide');
      aRow.nextElementSibling.nextElementSibling.nextElementSibling
        .classList.add('fshHide');
    }
    var questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
    aRow.cells[4].innerHTML = guideButtons(questID, questName);
  }
}

export function injectQuestTracker() { // Native
  var lastActiveQuestPage = system.getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    layout.pCC.getElementsByTagName('a')[0]
      .setAttribute('href', lastActiveQuestPage);
  }
  var questID = system.getUrlParameter('quest_id');
  var injectHere = layout.pCC.getElementsByTagName('td')[0];
  var questName = injectHere.getElementsByTagName('font')[1].textContent
    .replace(/"/g, '');
  injectHere.insertAdjacentHTML('beforeend', guideButtons(questID, questName));
}
