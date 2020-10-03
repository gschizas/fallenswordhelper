import { G as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, ba as containsText, B as getText, V as setValue } from './calfSystem-c851a12c.js';
import './isChecked-4820f42a.js';
import { s as simpleCheckbox } from './simpleCheckbox-39a4b647.js';
import './hideElement-891c9603.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-21fda3e0.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-7d5c44ea.js';
import './toggleForce-a095aa43.js';
import { c as collapse } from './collapse-0a37db76.js';

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
//# sourceMappingURL=viewArchive-b3971457.js.map
