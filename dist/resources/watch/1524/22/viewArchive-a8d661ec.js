import { G as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, ba as containsText, B as getText, V as setValue } from './calfSystem-995e3482.js';
import './isChecked-8928b11e.js';
import { s as simpleCheckbox } from './simpleCheckbox-4f133be1.js';
import './hideElement-26ab0eda.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-f52b317d.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-bc959f9f.js';
import './toggleForce-d5149782.js';
import { c as collapse } from './collapse-b960b890.js';

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
//# sourceMappingURL=viewArchive-a8d661ec.js.map
