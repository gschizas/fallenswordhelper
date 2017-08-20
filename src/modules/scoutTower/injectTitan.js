import injectScouttowerBuffLinks from './injectScouttowerBuffLinks';
import retryAjax from '../ajax/retryAjax';
import * as system from '../support/system';

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

export default function injectTitan() { // jQuery
  retryAjax('index.php?cmd=guild&subcmd=scouttower').done(getScoutTowerDetails);
}
