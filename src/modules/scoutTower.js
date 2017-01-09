import system from './support/system';
import layout from './support/layout';

function injectScouttowerBuffLinks() { // Legacy
  var titanTables = system.findNodes('//table[tbody/tr/td/font[.="Guild Member"]]');
  var titanTable;
  if (titanTables) {
    for (var i = 0; i < titanTables.length; i += 1) {
      titanTable = titanTables[i];
      var shortList = [];
      if (titanTable.rows.length <= 1) {continue;}
      for (var j = 1; j < titanTable.rows.length; j += 1) {
        if (titanTable.rows[j].cells[1]) {
          var firstCell = titanTable.rows[j].cells[0];
          var playerID = /player_id=(\d+)/.exec(firstCell.innerHTML)[1];
          shortList.push(firstCell.textContent);
          firstCell.innerHTML += ' <a style="color:blue;font-size:10px;" ' +
            layout.quickBuffHref(playerID) + '>[b]</a>';
        }
      }
      titanTable.rows[0].cells[0].innerHTML += ' <a style="color:blue;font-size:10px;">all</a>';
      var buffAllLink = titanTable.rows[0].cells[0].firstChild.nextSibling.nextSibling;
      buffAllLink.setAttribute('href',layout.buffAllHref(shortList));
    }
  }
}

function getScoutTowerDetails(responseText) { // Legacy
  var doc=system.createDocument(responseText);
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
  injectScouttowerBuffLinks();
}

function injectTitan() { // Legacy
  system.xmlhttp('index.php?cmd=guild&subcmd=scouttower',
    getScoutTowerDetails);
}

function injectScouttower() { // Legacy
  injectScouttowerBuffLinks();
  var titanTable = system.findNode('//table[@width="500"]');
  for (var i = 1; i < titanTable.rows.length; i += 1) {
    var aRow = titanTable.rows[i];
    if (aRow.cells[2]) {
      var titanHP = aRow.cells[2].textContent;
      if (titanHP.search('-') !== -1) {break;}
      var guildKills = aRow.cells[3].textContent;
      if (guildKills) {
        var titanHPArray = titanHP.split('/');
        var currentHP = parseInt(titanHPArray[0], 10);
        var totalHP = parseInt(titanHPArray[1], 10);
        var currentNumberOfKills = totalHP - currentHP;
        var numberOfKillsToSecure = Math.ceil(totalHP/2 + 1);

        var titanString = '<span style="color:red;">' + (numberOfKillsToSecure - guildKills) + '</span> to secure';
        if (guildKills >= numberOfKillsToSecure) {
          titanString = 'Secured';
        } else if (numberOfKillsToSecure - guildKills > currentHP) {
          titanString = '<span style="color:red;">Cannot Secure</span>';
        }
        var killsPercent = (currentNumberOfKills === 0 ? 0 : guildKills * 100/currentNumberOfKills).toFixed(2);
        var killsTotPct = (guildKills * 100/totalHP).toFixed(2);
        aRow.cells[3].innerHTML += '<br><span style="color:blue;"> (' + killsPercent + '% Current <br>' +
        killsTotPct + '% Total<br>' + titanString + ')';
      }
    }
  }
}

export default {
  injectTitan: injectTitan,
  injectScouttower: injectScouttower
};
