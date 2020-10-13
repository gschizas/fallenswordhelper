import { G as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, b9 as containsText, B as getText, V as setValue } from './calfSystem-21d16a0e.js';
import './isChecked-12c32ad5.js';
import { s as simpleCheckbox } from './simpleCheckbox-2103e041.js';
import './hideElement-c14a94c9.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-cd4d08fc.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-0d7cc02b.js';
import './toggleForce-10d35470.js';
import { c as collapse } from './collapse-d52d5e6a.js';

let lastLadderReset;
let trackLadderReset;

function checkForPvPLadder(row) {
  if (trackLadderReset && containsText('PvP Ladder', row.children[1].children[0])) {
    const logTime = parseDateAsTimestamp(
      getText(row.children[1].children[2]).replace('Posted: ', ''),
    );
    if (logTime > lastLadderReset) {
      setValue(defLastLadderReset, logTime);
      lastLadderReset = logTime;
    }
  }
}

function testArticle(rowType) { return rowType > 1; }

function setupPref(prefName, rowInjector) {
  insertHtmlAfterEnd(rowInjector, simpleCheckbox(prefName));
}

function viewArchive() {
  lastLadderReset = getValue(defLastLadderReset);
  trackLadderReset = getValue('trackLadderReset');
  const prefName = 'collapseNewsArchive';
  const theTables = getElementsByTagName(defTable, pCC);
  if (theTables.length > 2) {
    setupPref(prefName, theTables[0].rows[2]);
    collapse({
      prefName,
      theTable: theTables[2],
      headInd: 7,
      articleTest: testArticle,
      extraFn: checkForPvPLadder,
    });
  }
}

export default viewArchive;
//# sourceMappingURL=viewArchive-855fb7fa.js.map
