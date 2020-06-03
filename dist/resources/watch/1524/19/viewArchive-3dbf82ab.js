import { D as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, bb as containsText, A as getText, T as setValue } from './calfSystem-03895320.js';
import './isChecked-526af1cb.js';
import { s as simpleCheckbox } from './simpleCheckbox-00a38d76.js';
import './hideElement-17927f8d.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-3f73e139.js';
import './toggleForce-01e59b03.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-bb5f3978.js';
import { c as collapse } from './collapse-d90499ca.js';

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
//# sourceMappingURL=viewArchive-3dbf82ab.js.map
