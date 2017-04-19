import * as layout from './support/layout';
import * as system from './support/system';

var normalLink;
var seasonLink;
var activeLink;
var completeLink;
var notStartedLink;
var currentPageValue;

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

function whereAmI() { // Native
  var aLinks = layout.pCC.getElementsByTagName('a');
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

function storeLoc() { // Native
  var lastQBPage = location.search;
  system.setValue('lastActiveQuestPage', lastQBPage);
  system.setValue(savePrefKey[currentPageValue], lastQBPage);
}

function setLink(aLink, url) { // Native
  if (url.length > 0) {
    aLink.setAttribute('href', url);
  }
}

function updateLinks() { // Native
  var lastNormalActiveQuestPage = system.getValue(savePrefKey[0]);
  var lastNormalCompletedQuestPage = system.getValue(savePrefKey[1]);
  var lastNormalNotStartedQuestPage = system.getValue(savePrefKey[2]);
  var lastSeasonalActiveQuestPage = system.getValue(savePrefKey[3]);
  var lastSeasonalCompletedQuestPage = system.getValue(savePrefKey[4]);
  var lastSeasonalNotStartedQuestPage = system.getValue(savePrefKey[5]);

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
  if (system.getValue('storeLastQuestPage')) {
    whereAmI();
    storeLoc();
    updateLinks();
  }
}

function guideButtons(questID, questName) { // Native
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

function isHideQuests() {
  if (system.getValue('hideQuests')) {
    return system.getValue('hideQuestNames').split(',');
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

export function injectQuestBookFull() { // Native
  layout.pCC.addEventListener('click', dontPost);
  storeQuestPage();
  var questTable = layout.pCC.getElementsByTagName('table')[5];
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
