import { G as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, ba as containsText, B as getText, V as setValue } from './calfSystem-2b1fed3f.js';
import './isChecked-8ee9db43.js';
import { s as simpleCheckbox } from './simpleCheckbox-992e10fe.js';
import './hideElement-48576eeb.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-677b583a.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-91c1631c.js';
import './toggleForce-7d757ba6.js';
import { c as collapse } from './collapse-8c48d1b9.js';

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
//# sourceMappingURL=viewArchive-3fa44882.js.map
