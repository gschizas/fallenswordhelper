import {createDocument} from '../support/system';
import {getElementById} from '../common/getElement';
import injectScouttowerBuffLinks from './injectScouttowerBuffLinks';
import {pCC} from '../support/layout';
import retryAjax from '../ajax/retryAjax';

function insertBr(el) {
  el.insertAdjacentHTML('beforeend', '<br><br>');
}

function getScoutTowerDetails(responseText) {
  var doc = createDocument(responseText);
  var scoutPcc = getElementById('pCC', doc);
  injectScouttowerBuffLinks(scoutPcc.getElementsByTagName('table'));
  var scoutTowerTable = scoutPcc.children[0];
  if (scoutTowerTable) {
    var titanTable = pCC.children[0];
    var newRow = titanTable.insertRow(-1);
    insertBr(newRow);
    newRow = titanTable.insertRow(-1);
    newRow.appendChild(scoutTowerTable.rows[1].cells[0])
      .insertAdjacentHTML('beforeend', '<br><br>');
    newRow = titanTable.insertRow(-1);
    newRow.appendChild(scoutTowerTable.rows[8].cells[0]);
  }
}

export default function injectTitan() { // jQuery.min
  retryAjax('index.php?cmd=guild&subcmd=scouttower').done(getScoutTowerDetails);
}
