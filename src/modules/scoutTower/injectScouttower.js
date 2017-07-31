import getForage from '../ajax/getForage';
import injectScouttowerBuffLinks from './injectScouttowerBuffLinks';
import setForage from '../ajax/setForage';
import * as layout from '../support/layout';
import * as system from '../support/system';

function cooldownTracker(aRow, theTitans) {
  var myName = aRow.cells[0].firstElementChild.getAttribute('oldtitle')
    .replace(' (Titan)', '');
  if (!theTitans[myName]) {
    var cooldown = aRow.nextElementSibling.cells[0].textContent;
    var coolTime = 0;
    if (cooldown.indexOf('until') !== -1) {
      coolTime = system.parseDateAsTimestamp(
        cooldown.replace('Cooldown until: ', ''));
    }
    theTitans[myName] = {
      cooldownText: cooldown,
      coolTime: coolTime,
      seen: 'yes'
    };
  }
}

function addRow(theTitans, trackerTable, titan) {
  if (theTitans[titan].coolTime < Date.now()) {return;}
  trackerTable.insertAdjacentHTML('beforeend',
    '<tr><td class="fshCenter">' + titan + '</td>' +
    '<td class="fshBold fshCenter fshCooldown">' +
    theTitans[titan].cooldownText + '</td><td class="fshCenter">' +
    theTitans[titan].seen + '</td></tr>');
}

function displayTracker(parentTable, theTitans) {
  var trackerTable = document.createElement('table');
  trackerTable.className = 'fshTTracker';
  var tBody = document.createElement('tbody');
  trackerTable.appendChild(tBody);
  tBody.insertAdjacentHTML('beforeend',
    '<tr><td class="header fshCenter">Titan</td>' +
    '<td class="header fshCenter">Cooldown</td>' +
    '<td class="header fshCenter">Visible</td></tr>');
  Object.keys(theTitans).forEach(addRow.bind(null, theTitans, tBody));

  var newRow = parentTable.insertRow(5);
  var newCell = newRow.insertCell(-1);
  newCell.colSpan = 3;
  newCell.appendChild(trackerTable);
}

function addMissingTitansFromOld(oldTitans, newTitans) {
  if (!oldTitans) {return;}
  Object.keys(oldTitans).forEach(function(oldTitan) {
    if (newTitans[oldTitan]) {return;}
    if (oldTitans[oldTitan].coolTime <= Date.now()) {return;}
    newTitans[oldTitan] = {
      cooldownText: oldTitans[oldTitan].cooldownText,
      coolTime: oldTitans[oldTitan].coolTime,
      seen: 'no'
    };
  });
}

function getTitanString(guildKills, totalHP, currentHP) {
  var numberOfKillsToSecure = Math.ceil(totalHP / 2 + 1);
  if (guildKills >= numberOfKillsToSecure) {
    return 'Secured';
  }
  if (numberOfKillsToSecure - guildKills > currentHP) {
    return '<span class="fshRed">Cannot Secure</span>';
  }
  return '<span class="fshRed">' +
    (numberOfKillsToSecure - guildKills) + '</span> to secure';
}

function getKillsPct(currentNumberOfKills, guildKills) {
  if (currentNumberOfKills === 0) {return 0;}
  return guildKills * 100 / currentNumberOfKills;
}

function killsSummary(aRow) {
  var titanHP = aRow.cells[2].textContent;
  if (titanHP.indexOf('-') !== -1) {return;}
  var guildKills = Number(aRow.cells[3].textContent);
  var titanHPArray = titanHP.split('/');
  var currentHP = Number(titanHPArray[0]);
  var totalHP = Number(titanHPArray[1]);
  var currentNumberOfKills = totalHP - currentHP;
  var titanString = getTitanString(guildKills, totalHP, currentHP);
  var killsTotPct = (guildKills * 100 / totalHP).toFixed(2);
  aRow.cells[3].insertAdjacentHTML('beforeend',
    '<br><span class="fshBlue"> (' +
    getKillsPct(currentNumberOfKills, guildKills).toFixed(2) +
    '% Current <br>' + killsTotPct + '% Total<br>' + titanString + ')');
}

function gotOldTitans(oldTitans) {
  var titanTables = layout.pCC.getElementsByTagName('table');
  injectScouttowerBuffLinks(titanTables);
  var titanTable = titanTables[1];
  var newTitans = {};
  for (var i = 1; i < titanTable.rows.length - 1; i += 6) {
    var aRow = titanTable.rows[i];
    killsSummary(aRow);
    cooldownTracker(aRow, newTitans);
  }
  addMissingTitansFromOld(oldTitans, newTitans);
  displayTracker(titanTables[0], newTitans);
  setForage('fsh_titans', newTitans);
}

export default function injectScouttower() {
  getForage('fsh_titans').done(gotOldTitans);
}
