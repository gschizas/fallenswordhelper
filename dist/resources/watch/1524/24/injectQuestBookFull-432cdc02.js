import { s as partial, G as getValue, K as getTextTrim, A as setInnerHtml, g as getElementsByTagName, p as pCC, d as defTable, V as setValue } from './calfSystem-dea093d3.js';
import { d as dataRows } from './dataRows-bf8d661e.js';
import { h as hideElement } from './hideElement-b044934d.js';
import './formToUrl-a24fc80c.js';
import { i as interceptSubmit } from './interceptSubmit-609c1a86.js';
import { g as guideButtons } from './guideButtons-e898d285.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-3d54502a.js';
import './csvSplit-dcc6dfc9.js';
import { s as shouldBeArray } from './shouldBeArray-c18f1b64.js';

function isHideQuests() {
  if (getValue('hideQuests')) {
    return shouldBeArray('hideQuestNames');
  }
  return [];
}

function doHideQuests(hideQuests, questName, aRow) {
  if (hideQuests.includes(questName)) {
    let target = aRow;
    hideElement(target);
    for (let i = 0; i < 3; i++) {
      target = target.nextElementSibling;
      hideElement(target);
    }
  }
}

function decorate(questsToHide, aRow) {
  const questName = replaceDoubleSpace(getTextTrim(aRow.cells[0]));
  doHideQuests(questsToHide, questName, aRow);
  const questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
  setInnerHtml(guideButtons(questID, questName), aRow.cells[4]);
}

function injectQuestRow(questTable) {
  const questsToHide = isHideQuests();
  dataRows(questTable.rows, 5, 0).forEach(partial(decorate, questsToHide));
}

let normalLink;
let seasonLink;
let activeLink;
let completeLink;
let notStartedLink;
let currentPageValue;

const currentLocationValue = [0, 3, 0, 1, 2];

const savePrefKey = [
  'lastNormalActiveQuestPage',
  'lastNormalCompletedQuestPage',
  'lastNormalNotStartedQuestPage',
  'lastSeasonalActiveQuestPage',
  'lastSeasonalCompletedQuestPage',
  'lastSeasonalNotStartedQuestPage',
];

function pageCombo(aLinks, acc, curr, i) {
  if (aLinks[i].children[0].getAttribute('color') === '#FF0000') {
    return acc + curr;
  }
  return acc;
}

function whereAmI() {
  const aLinks = getElementsByTagName('a', pCC);
  [normalLink, seasonLink, activeLink, completeLink, notStartedLink] = aLinks;
  currentPageValue = currentLocationValue.reduce(partial(pageCombo, aLinks), 0);
}

function storeLoc() {
  const lastQBPage = window.location.search;
  setValue('lastActiveQuestPage', lastQBPage);
  setValue(savePrefKey[currentPageValue], lastQBPage);
}

function getPref(pref) { return getValue(pref); }

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
    lastPages[2],
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
  const lastPages = getPrevVals();
  const oppositeTypeUrl = oppositeType(lastPages);

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

function injectQuestBookFull() {
  interceptSubmit();
  storeQuestPage();
  const questTable = getElementsByTagName(defTable, pCC)[5];
  if (!questTable) { return; }
  injectQuestRow(questTable);
}

export default injectQuestBookFull;
//# sourceMappingURL=injectQuestBookFull-432cdc02.js.map
