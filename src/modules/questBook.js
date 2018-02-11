import getUrlParameter from './system/getUrlParameter';
import getValue from './system/getValue';
import {guideUrl} from './support/dataObj';
import {imageServer} from './system/system';
import {pCC} from './support/layout';
import setValue from './system/setValue';

var normalLink;
var seasonLink;
var activeLink;
var completeLink;
var notStartedLink;
var currentPageValue;

function dontPost(e) {
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

function whereAmI() {
  var aLinks = pCC.getElementsByTagName('a');
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

function storeLoc() {
  var lastQBPage = location.search;
  setValue('lastActiveQuestPage', lastQBPage);
  setValue(savePrefKey[currentPageValue], lastQBPage);
}

function setLink(aLink, url) {
  if (url.length > 0) {
    aLink.setAttribute('href', url);
  }
}

function updateLinks() {
  var lastNormalActiveQuestPage = getValue(savePrefKey[0]);
  var lastNormalCompletedQuestPage = getValue(savePrefKey[1]);
  var lastNormalNotStartedQuestPage = getValue(savePrefKey[2]);
  var lastSeasonalActiveQuestPage = getValue(savePrefKey[3]);
  var lastSeasonalCompletedQuestPage = getValue(savePrefKey[4]);
  var lastSeasonalNotStartedQuestPage = getValue(savePrefKey[5]);

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
  if (getValue('storeLastQuestPage')) {
    whereAmI();
    storeLoc();
    updateLinks();
  }
}

function guideButtons(questID, questName) {
  return '<div class="parent">' +
    '<a href="' + guideUrl + 'quests&' +
    'subcmd=view&quest_id=' + questID + '" class="tip-static" ' +
    'data-tipped="Search for this quest on the Ultimate Fallen Sword Guide" ' +
    'style="background-image: url(\'' + imageServer +
    '/temple/1.gif\');" target="_blank"></a>&nbsp;' +
    '<a href="https://wiki.fallensword.com/index.php?title=' +
    questName.replace(/ /g, '_') + '" class="tip-static" ' +
    'data-tipped="Search for this quest on the Wiki" ' +
    'style="background-image: url(\'' + imageServer +
    '/skin/fs_wiki.gif\');" target="_blank"></a></div>';
}

function isHideQuests() {
  if (getValue('hideQuests')) {
    return getValue('hideQuestNames').split(',');
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

export function injectQuestBookFull() {
  pCC.addEventListener('click', dontPost);
  storeQuestPage();
  var questTable = pCC.getElementsByTagName('table')[5];
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

export function injectQuestTracker() {
  var lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    pCC.getElementsByTagName('a')[0]
      .setAttribute('href', lastActiveQuestPage);
  }
  var questID = getUrlParameter('quest_id');
  var injectHere = pCC.getElementsByTagName('td')[0];
  var questName = injectHere.getElementsByTagName('font')[1].textContent
    .replace(/"/g, '');
  injectHere.insertAdjacentHTML('beforeend', guideButtons(questID, questName));
}
