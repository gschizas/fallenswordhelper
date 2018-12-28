import dontPost from './dontPost';
import getValue from '../system/getValue';
import guideButtons from './guideButtons';
import on from '../common/on';
import {pCC} from '../support/layout';
import setValue from '../system/setValue';

var normalLink;
var seasonLink;
var activeLink;
var completeLink;
var notStartedLink;
var currentPageValue;

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

function getPrevVals() {
  return savePrefKey.map(function(pref) {return getValue(pref);});
}

function oppositeType(lastPages) {
  return [
    lastPages[3],
    lastPages[4],
    lastPages[5],
    lastPages[0],
    lastPages[1],
    lastPages[2]
  ];
}

function setLink(aLink, url) {
  if (url.length > 0) {
    aLink.setAttribute('href', url);
  }
}

function subset(lastPages, i) {
  setLink(activeLink, lastPages[i]);
  setLink(completeLink, lastPages[i + 1]);
  setLink(notStartedLink, lastPages[i + 2]);
}

function updateLinks() {
  var lastPages = getPrevVals();
  var oppositeTypeUrl = oppositeType(lastPages);

  if (currentPageValue < 3) {
    setLink(seasonLink, oppositeTypeUrl[currentPageValue]);
    subset(lastPages, 0);
  } else {
    setLink(normalLink, oppositeTypeUrl[currentPageValue]);
    subset(lastPages, 3);
  }
}

function storeQuestPage() {
  if (getValue('storeLastQuestPage')) {
    whereAmI();
    storeLoc();
    updateLinks();
  }
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

function forEachQuest(hideQuests, questTable) {
  for (var i = 2; i < questTable.rows.length; i += 4) {
    var aRow = questTable.rows[i];
    var questName = aRow.cells[0].textContent.replace(/ {2}/g, ' ').trim();
    doHideQuests(hideQuests, questName, aRow);
    var questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
    aRow.cells[4].innerHTML = guideButtons(questID, questName);
  }
}

export default function injectQuestBookFull() {
  on(pCC, 'click', dontPost);
  storeQuestPage();
  var questTable = pCC.getElementsByTagName('table')[5];
  if (!questTable) {return;}
  var hideQuests = isHideQuests();
  forEachQuest(hideQuests, questTable);
}
