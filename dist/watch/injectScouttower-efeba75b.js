import { aM as now, q as entries, i as insertElement, k as insertHtmlBeforeEnd, as as openQuickBuffByName, D as getText, bw as containsText, aJ as arrayFrom, o as onclick, z as jQueryNotPresent, ak as get, bx as getTitle, bs as parseDateAsTimestamp, u as partial, by as createAnchor, av as guideUrl, C as setInnerHtml, g as getElementsByTagName, b as defTable, p as pCC, ai as set } from './calfSystem-98d7118c.js';
import './numberIsNaN-e9f5ff36.js';
import './round-4a8f6cf2.js';
import { r as roundToString } from './roundToString-5353d3ca.js';
import { d as dataRows } from './dataRows-6176e0e4.js';
import { c as createTBody } from './createTBody-ca63785b.js';
import { c as createTable } from './createTable-0de4c78c.js';
import { g as getKillsPct, a as getTitanString } from './getTitanString-9e2e9de7.js';

const titan = 0;
const cooldownText = 1;
const coolTime = 2;
const seen = 3;

function reformat(el) {
  return [el[0], el[1].cooldownText, el[1].coolTime, el[1].seen];
}

function onCd(el) { return el[coolTime] > now; }

function int(a, b) { return a[coolTime] - b[coolTime]; }

function makeRow(el) {
  return `<tr><td class="fshCenter">${el[titan]
  }</td><td class="fshBold fshCenter fshCooldown">${el[cooldownText]
  }</td><td class="fshCenter">${el[seen]}</td></tr>`;
}

function makeHtml(theTitans) {
  return entries(theTitans).map(reformat).filter(onCd).sort(int)
    .map(makeRow)
    .join('');
}

function makeTrackerTable(theTitans) {
  const trackerTable = createTable({ className: 'fshTTracker' });
  const tBody = createTBody({
    innerHTML: '<tr><td class="header fshCenter">Titan</td>'
      + '<td class="header fshCenter">Cooldown</td>'
      + '<td class="header fshCenter">Visible</td></tr>',
  });
  insertElement(trackerTable, tBody);
  insertHtmlBeforeEnd(tBody, makeHtml(theTitans));
  return trackerTable;
}

function displayTracker(parentTable, theTitans) {
  if (parentTable.rows.length > 5) {
    const trackerTable = makeTrackerTable(theTitans);
    const newRow = parentTable.insertRow(5);
    const newCell = newRow.insertCell(-1);
    newCell.colSpan = 3;
    insertElement(newCell, trackerTable);
  }
}

function buffIndividual(target) {
  if (target.previousElementSibling) {
    openQuickBuffByName(getText(target.previousElementSibling));
  }
}

function memberName(el) { return getText(el.cells[0].children[0].children[0]); }

function buffAll(target) {
  const titanTable = target.parentNode.parentNode.parentNode.parentNode;
  const shortList = dataRows(titanTable.rows, 3, 0).map(memberName);
  openQuickBuffByName(shortList.join());
}

function buffEvent(e) {
  const { target } = e;
  if (containsText('[b]', target)) {
    buffIndividual(target);
  }
  if (containsText('all', target)) {
    buffAll(target);
  }
}

function evtHdl(e) {
  if (e.target.classList.contains('fshBl')) { buffEvent(e); }
}

function playerBufflink(el) {
  insertHtmlBeforeEnd(el.cells[0],
    ' <button class="fshBl fshXSmall">[b]</button>');
}

function doBuffLinks(titanTable) {
  dataRows(titanTable.rows, 3, 0).forEach(playerBufflink);
  insertHtmlBeforeEnd(titanTable.rows[0].cells[0],
    ' <button class="fshBl fshXSmall">all</button>');
}

function myTables(el, i) { return el.rows.length > 1 && i > 1; }

function gotTables(titanTables) {
  arrayFrom(titanTables).filter(myTables).forEach(doBuffLinks);
  onclick(titanTables[1], evtHdl);
}

function injectScouttowerBuffLinks(titanTables) {
  if (titanTables.length > 2) { gotTables(titanTables); }
}

function getTitanName(aRow) {
  return getTitle(aRow.cells[0].children[0]);
}

function cooldownTracker(theTitans, aRow) {
  const myName = getTitanName(aRow).replace(' (Titan)', '');
  if (!theTitans[myName]) {
    const cooldown = getText(aRow.nextElementSibling.cells[0]);
    let coolTime = 0;
    if (cooldown.includes('until')) {
      coolTime = parseDateAsTimestamp(
        cooldown.replace('Cooldown until: ', ''),
      );
    }
    // eslint-disable-next-line no-param-reassign
    theTitans[myName] = {
      cooldownText: cooldown,
      coolTime,
      seen: 'yes',
    };
  }
}

function anyMissing(newTitans, pair) {
  if (newTitans[pair[0]]) { return; }
  if (pair[1].coolTime <= now) { return; }
  // eslint-disable-next-line no-param-reassign
  newTitans[pair[0]] = {
    cooldownText: pair[1].cooldownText,
    coolTime: pair[1].coolTime,
    seen: 'no',
  };
}

function addMissingTitansFromOld(oldTitans, newTitans) {
  if (!oldTitans) { return; }
  entries(oldTitans).forEach(partial(anyMissing, newTitans));
}

function summaryHtml(guildKills, currentHP, totalHP) {
  return `<br><span class="fshBlue"> (${
    roundToString(getKillsPct(totalHP - currentHP, guildKills), 2)
  }% Current <br>${roundToString((guildKills * 100) / totalHP, 2)
  }% Total<br>${getTitanString(guildKills, totalHP, currentHP)})`;
}

function injectSummary(aRow, titanHP) {
  const titanHPArray = titanHP.split('/');
  insertHtmlBeforeEnd(aRow.cells[3],
    summaryHtml(Number(getText(aRow.cells[3])), Number(titanHPArray[0]),
      Number(titanHPArray[1])));
}

function killsSummary(aRow) {
  const titanHP = getText(aRow.cells[2]);
  if (titanHP.indexOf('-') !== -1) { return; }
  injectSummary(aRow, titanHP);
}

function guideLink(aRow) {
  const myName = encodeURIComponent(getTitanName(aRow));
  const myImg = aRow.cells[0].children[0];
  const myLink = createAnchor({
    href: `${guideUrl}creatures&search_name=${myName}`,
    target: '_blank',
  });
  insertElement(myLink, myImg);
  insertElement(aRow.cells[0], myLink);

  const realmCell = aRow.cells[1];
  const realmName = getText(realmCell);
  setInnerHtml(`<a href="${guideUrl}realms&search_name=${
    realmName}" target="_blank">${realmName}</a>`, realmCell);
}

function decorate(newTitans, aRow) {
  killsSummary(aRow);
  cooldownTracker(newTitans, aRow); // Pref
  guideLink(aRow);
}

function doTooMuch(titanTable, newTitans) {
  dataRows(titanTable.rows, 4, 0).forEach(partial(decorate, newTitans));
}

function gotOldTitans(oldTitans) {
  const titanTables = getElementsByTagName(defTable, pCC);
  injectScouttowerBuffLinks(titanTables);
  const titanTable = titanTables[1];
  const newTitans = {};
  doTooMuch(titanTable, newTitans);
  addMissingTitansFromOld(oldTitans, newTitans); // Pref
  displayTracker(titanTables[0], newTitans); // Pref
  set('fsh_titans', newTitans); // Pref
}

function injectScouttower() { // jQuery.min
  if (jQueryNotPresent()) { return; }
  get('fsh_titans').then(gotOldTitans); // Pref
}

export default injectScouttower;
//# sourceMappingURL=injectScouttower-efeba75b.js.map
