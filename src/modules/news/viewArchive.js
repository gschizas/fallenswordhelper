import collapse from '../common/collapse';
import getValue from '../system/getValue';
import {pCC} from '../support/layout';
import {simpleCheckbox} from '../settings/simpleCheckbox';
import {
  parseDateAsTimestamp,
  setValue
} from '../system/system';

var ladderResetPref = 'lastLadderReset';
var lastLadderReset;

function checkForPvPLadder(row) {
  if (row.children[1].children[0].textContent === 'PvP Ladder') {
    var logTime = parseDateAsTimestamp(
      row.children[1].children[2].textContent.replace('Posted: ', ''));
    if (logTime > lastLadderReset) {
      setValue(ladderResetPref, logTime);
      lastLadderReset = logTime;
    }
  }
}

function testArticle(rowType) {return rowType > 1;}

function setupPref(prefName, rowInjector) {
  rowInjector.insertAdjacentHTML('afterend', simpleCheckbox(prefName));
}

export default function viewArchive() {
  lastLadderReset = getValue(ladderResetPref);
  var prefName = 'collapseNewsArchive';
  var theTables = pCC.getElementsByTagName('table');
  setupPref(prefName, theTables[0].rows[2]);
  collapse({
    prefName: prefName,
    theTable: theTables[2],
    headInd: 6,
    articleTest: testArticle,
    extraFn: checkForPvPLadder
  });
}
