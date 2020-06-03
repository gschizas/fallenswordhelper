import { D as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, bb as containsText, A as getText, T as setValue } from './calfSystem-940bc1b5.js';
import './isChecked-475781f3.js';
import { s as simpleCheckbox } from './simpleCheckbox-0111405d.js';
import './hideElement-72d056da.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-f1bd8788.js';
import './toggleForce-66dc2560.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-a9ffc7ad.js';
import { c as collapse } from './collapse-56a84f72.js';

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
//# sourceMappingURL=viewArchive-6b49e6b2.js.map
