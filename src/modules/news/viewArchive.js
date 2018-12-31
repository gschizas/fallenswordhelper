import collapse from '../common/collapse';
import {def_table} from '../support/constants';
import getValue from '../system/getValue';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import {pCC} from '../support/layout';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import setValue from '../system/setValue';
import {simpleCheckbox} from '../settings/simpleCheckbox';

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
  insertHtmlAfterEnd(rowInjector, simpleCheckbox(prefName));
}

export default function viewArchive() {
  lastLadderReset = getValue(ladderResetPref);
  var prefName = 'collapseNewsArchive';
  var theTables = pCC.getElementsByTagName(def_table);
  if (theTables.length > 2) {
    setupPref(prefName, theTables[0].rows[2]);
    collapse({
      prefName: prefName,
      theTable: theTables[2],
      headInd: 6,
      articleTest: testArticle,
      extraFn: checkForPvPLadder
    });
  }
}
