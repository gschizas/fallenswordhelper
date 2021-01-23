import { c as collapse } from './collapse-0cac8315.js';
import { H as getValue, a5 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, aF as containsText, B as getText, V as setValue } from './calfSystem-91adbec8.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-dac2bf7a.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-9744c617.js';
import { s as simpleCheckbox } from './simpleCheckbox-d105d600.js';
import './hideElement-d4551277.js';
import './toggleForce-8e48254b.js';
import './isChecked-1c18cd61.js';

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
//# sourceMappingURL=viewArchive-4c460a95.js.map
