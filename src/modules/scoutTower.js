import * as layout from './support/layout';
import * as system from './support/system';

function buffAll(self) { // Native
  var titanTable = self.parentNode.parentNode.parentNode.parentNode;
  var shortList = [];
  for (var j = 1; j < titanTable.rows.length; j += 2) {
    var firstCell = titanTable.rows[j].cells[0].firstChild.firstChild;
    shortList.push(firstCell.textContent);
  }
  layout.openQuickBuffByName(shortList.join());
}

function buffEvent(e) { // Native
  var self = e.target;
  if (self.textContent === '[b]') {
    layout.openQuickBuffByName(self.previousElementSibling.textContent);
  }
  if (self.textContent === 'all') {
    buffAll(self);
  }
}

function evtHdl(e) { // Native
  if (e.target.classList.contains('fshBl')) {buffEvent(e);}
}

function doBuffLinks(titanTable) { // Native
  for (var j = 1; j < titanTable.rows.length; j += 2) {
    var firstCell = titanTable.rows[j].cells[0];
    firstCell.insertAdjacentHTML('beforeend',
      ' <button class="fshBl fshXSmall">[b]</button>');
  }
  titanTable.rows[0].cells[0].insertAdjacentHTML('beforeend',
    ' <button class="fshBl fshXSmall">all</button>');
}

function gotTables(titanTables) { // Native
  for (var i = 2; i < titanTables.length; i += 1) {
    var titanTable = titanTables[i];
    if (titanTable.rows.length < 2) {continue;}
    doBuffLinks(titanTable);
  }
  titanTables[1].addEventListener('click', evtHdl);
}

function injectScouttowerBuffLinks(titanTables) { // Native
  if (titanTables.length > 2) {gotTables(titanTables);}
}

function getScoutTowerDetails(responseText) { // Legacy
  var doc = system.createDocument(responseText);
  injectScouttowerBuffLinks(doc.getElementById('pCC')
    .getElementsByTagName('table'));
  var scoutTowerTable = system.findNode(
    '//table[tbody/tr/td/img[contains(@src,"/banners/scouttower.png")]]',
    doc);
  if (scoutTowerTable) {
    var titanTable = system.findNode(
      '//table[tbody/tr/td/img[contains(@src,"/banners/titankilllog.png")]]');
    var newRow = titanTable.insertRow(0);
    newRow.appendChild(scoutTowerTable.rows[1].cells[0])
      .insertAdjacentHTML('beforeend', '<br><br>');
    newRow = titanTable.insertRow(1);
    newRow.appendChild(scoutTowerTable.rows[8].cells[0]);
  }
}

export function injectTitan() { // jQuery
  $.get('index.php?cmd=guild&subcmd=scouttower', getScoutTowerDetails);
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

export function injectScouttower() { // Legacy
  var titanTables = layout.pCC.getElementsByTagName('table');
  injectScouttowerBuffLinks(titanTables);
  var titanTable = titanTables[1];
  for (var i = 1; i < titanTable.rows.length; i += 6) {
    var aRow = titanTable.rows[i];
    var titanHP = aRow.cells[2].textContent;
    if (titanHP.indexOf('-') !== -1) {break;}
    var guildKills = aRow.cells[3].textContent;
    var titanHPArray = titanHP.split('/');
    var currentHP = parseInt(titanHPArray[0], 10);
    var totalHP = parseInt(titanHPArray[1], 10);
    var currentNumberOfKills = totalHP - currentHP;
    var titanString = getTitanString(guildKills, totalHP, currentHP);
    var killsTotPct = (guildKills * 100 / totalHP).toFixed(2);
    aRow.cells[3].innerHTML += '<br><span class="fshBlue"> (' +
      getKillsPct(currentNumberOfKills, guildKills).toFixed(2) +
      '% Current <br>' + killsTotPct + '% Total<br>' + titanString + ')';
  }
}
