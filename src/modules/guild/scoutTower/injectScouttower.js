import {createAnchor} from '../../common/cElement';
import {dataRows} from '../../common/dataRows';
import displayTracker from './displayTracker';
import {entries} from '../../common/entries';
import getElementsByTagName from '../../common/getElementsByTagName';
import getText from '../../common/getText';
import getTitle from '../../common/getTitle';
import injectScouttowerBuffLinks from './injectScouttowerBuffLinks';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import {now} from '../../support/now';
import {pCC} from '../../support/layout';
import parseDateAsTimestamp from '../../system/parseDateAsTimestamp';
import partial from '../../common/partial';
import roundToString from '../../common/roundToString';
import {def_table, guideUrl} from '../../support/constants';
import {get, set} from '../../system/idb';

function getTitanName(aRow) {
  return getTitle(aRow.cells[0].children[0]);
}

function cooldownTracker(theTitans, aRow) {
  var myName = getTitanName(aRow).replace(' (Titan)', '');
  if (!theTitans[myName]) {
    var cooldown = getText(aRow.nextElementSibling.cells[0]);
    var coolTime = 0;
    if (cooldown.includes('until')) {
      coolTime = parseDateAsTimestamp(
        cooldown.replace('Cooldown until: ', ''));
    }
    theTitans[myName] = {
      cooldownText: cooldown,
      coolTime: coolTime,
      seen: 'yes'
    };
  }
}

function anyMissing(newTitans, pair) {
  if (newTitans[pair[0]]) {return;}
  if (pair[1].coolTime <= now) {return;}
  newTitans[pair[0]] = {
    cooldownText: pair[1].cooldownText,
    coolTime: pair[1].coolTime,
    seen: 'no'
  };
}

function addMissingTitansFromOld(oldTitans, newTitans) {
  if (!oldTitans) {return;}
  entries(oldTitans).forEach(partial(anyMissing, newTitans));
}

export function getTitanString(guildKills, totalHP, currentHP) {
  var numberOfKillsToSecure = Math.ceil(totalHP / 2 + 1);
  if (guildKills >= numberOfKillsToSecure) {
    return 'Secured';
  }
  var remainingKills = numberOfKillsToSecure - guildKills;
  if (remainingKills > currentHP) {
    return '<span class="fshRed">Cannot Secure</span>';
  }
  return '<span class="fshRed">' + remainingKills + '</span> to secure';
}

export function getKillsPct(currentNumberOfKills, guildKills) {
  if (currentNumberOfKills === 0) {return 0;}
  return guildKills * 100 / currentNumberOfKills;
}

function summaryHtml(guildKills, currentHP, totalHP) {
  return '<br><span class="fshBlue"> (' +
    roundToString(getKillsPct(totalHP - currentHP, guildKills), 2) +
    '% Current <br>' + roundToString(guildKills * 100 / totalHP, 2) +
    '% Total<br>' + getTitanString(guildKills, totalHP, currentHP) + ')';
}

function injectSummary(aRow, titanHP) {
  var titanHPArray = titanHP.split('/');
  insertHtmlBeforeEnd(aRow.cells[3],
    summaryHtml(Number(getText(aRow.cells[3])), Number(titanHPArray[0]),
      Number(titanHPArray[1])));
}

function killsSummary(aRow) {
  var titanHP = getText(aRow.cells[2]);
  if (titanHP.indexOf('-') !== -1) {return;}
  injectSummary(aRow, titanHP);
}

function guideLink(aRow) {
  var myName = encodeURIComponent(getTitanName(aRow));
  var myImg = aRow.cells[0].children[0];
  var myLink = createAnchor({
    href: guideUrl + 'creatures&search_name=' + myName,
    target: '_blank'
  });
  insertElement(myLink, myImg);
  insertElement(aRow.cells[0], myLink);

  var realmCell = aRow.cells[1];
  var realmName = getText(realmCell);
  realmCell.innerHTML = '<a href="' + guideUrl + 'realms&search_name=' +
    realmName + '" target="_blank">' + realmName + '</a>';
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
  var titanTables = getElementsByTagName(def_table, pCC);
  injectScouttowerBuffLinks(titanTables);
  var titanTable = titanTables[1];
  var newTitans = {};
  doTooMuch(titanTable, newTitans);
  addMissingTitansFromOld(oldTitans, newTitans); // Pref
  displayTracker(titanTables[0], newTitans); // Pref
  set('fsh_titans', newTitans); // Pref
}

export default function injectScouttower() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  get('fsh_titans').then(gotOldTitans); // Pref
}
