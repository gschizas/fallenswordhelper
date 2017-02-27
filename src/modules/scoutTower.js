import * as system from './support/system';
import * as layout from './support/layout';

var titanTables;

function evtHdl(e) { // Native
  if (!e.target.classList.contains('fshBl')) {return;}
  var self = e.target;
  if (self.textContent === '[b]') {
    layout.openQuickBuffByName(self.previousElementSibling.textContent);
  }
  if (self.textContent === 'all') {
    var titanTable = self.parentNode.parentNode.parentNode.parentNode;
    var shortList = [];
    for (var j = 1; j < titanTable.rows.length; j += 2) {
      var firstCell = titanTable.rows[j].cells[0].firstChild.firstChild;
      shortList.push(firstCell.textContent);
    }
    layout.openQuickBuffByName(shortList.join());
  }
}

function injectScouttowerBuffLinks(titanTables) { // Native
  // titanTables = layout.pCC.getElementsByTagName('table');
  if (titanTables.length < 3) {return;}
  for (var i = 2; i < titanTables.length; i += 1) {
    var titanTable = titanTables[i];
    if (titanTable.rows.length < 2) {continue;}
    for (var j = 1; j < titanTable.rows.length; j += 2) {
      var firstCell = titanTable.rows[j].cells[0];
      firstCell.insertAdjacentHTML('beforeend',
        ' <button class="fshBl fshXSmall">[b]</button>');
    }
    titanTable.rows[0].cells[0].insertAdjacentHTML('beforeend',
      ' <button class="fshBl fshXSmall">all</button>');
  }
  titanTables[1].addEventListener('click', evtHdl);
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
    var newCell = newRow.insertCell(0);
    newCell.align = 'center';
    newCell.innerHTML = scoutTowerTable.rows[1].cells[0].innerHTML +
      '<br><br>' ;
    newRow = titanTable.insertRow(1);
    newCell = newRow.insertCell(0);
    newCell.innerHTML = scoutTowerTable.rows[8].cells[0].innerHTML;
  }
}

export function injectTitan() { // Legacy
  system.xmlhttp('index.php?cmd=guild&subcmd=scouttower',
    getScoutTowerDetails);
}

export function injectScouttower() { // Legacy
  injectScouttowerBuffLinks(layout.pCC.getElementsByTagName('table'));
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
    var numberOfKillsToSecure = Math.ceil(totalHP/2 + 1);

    var titanString = '<span style="color:red;">' +
      (numberOfKillsToSecure - guildKills) + '</span> to secure';
    if (guildKills >= numberOfKillsToSecure) {
      titanString = 'Secured';
    } else if (numberOfKillsToSecure - guildKills > currentHP) {
      titanString = '<span style="color:red;">Cannot Secure</span>';
    }
    var killsPercent = (currentNumberOfKills === 0 ? 0 :
      guildKills * 100/currentNumberOfKills).toFixed(2);
    var killsTotPct = (guildKills * 100/totalHP).toFixed(2);
    aRow.cells[3].innerHTML += '<br><span style="color:blue;"> (' +
      killsPercent + '% Current <br>' +
      killsTotPct + '% Total<br>' + titanString + ')';
  }
}
