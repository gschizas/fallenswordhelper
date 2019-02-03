import {def_table} from '../support/constants';
import getElementsByTagName from '../common/getElementsByTagName';
import getValue from '../system/getValue';
import injectQuestRow from './injectQuestRow';
import on from '../common/on';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import setValue from '../system/setValue';
import updateUrl from './updateUrl';

var normalLink;
var seasonLink;
var activeLink;
var completeLink;
var notStartedLink;
var currentPageValue;

var currentLocationValue = [0, 3, 0, 1, 2];

var savePrefKey = [
  'lastNormalActiveQuestPage',
  'lastNormalCompletedQuestPage',
  'lastNormalNotStartedQuestPage',
  'lastSeasonalActiveQuestPage',
  'lastSeasonalCompletedQuestPage',
  'lastSeasonalNotStartedQuestPage'
];

function pageCombo(aLinks, prev, curr, i) {
  if (aLinks[i].children[0].getAttribute('color') === '#FF0000') {
    return prev + curr;
  }
  return prev;
}

function whereAmI() {
  var aLinks = getElementsByTagName('a', pCC);
  normalLink = aLinks[0];
  seasonLink = aLinks[1];
  activeLink = aLinks[2];
  completeLink = aLinks[3];
  notStartedLink = aLinks[4];
  currentPageValue = currentLocationValue.reduce(partial(pageCombo, aLinks), 0);
}

function storeLoc() {
  var lastQBPage = location.search;
  setValue('lastActiveQuestPage', lastQBPage);
  setValue(savePrefKey[currentPageValue], lastQBPage);
}

function getPref(pref) {return getValue(pref);}

function getPrevVals() {
  return savePrefKey.map(getPref);
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

export default function injectQuestBookFull() {
  on(pCC, 'click', updateUrl);
  storeQuestPage();
  var questTable = getElementsByTagName(def_table, pCC)[5];
  if (!questTable) {return;}
  injectQuestRow(questTable);
}
