import { G as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, ba as containsText, B as getText, V as setValue } from './calfSystem-0ffc234f.js';
import './isChecked-9f10b428.js';
import { s as simpleCheckbox } from './simpleCheckbox-9c1c931a.js';
import './hideElement-c8e0696f.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-4c16b9cc.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-6a4d7217.js';
import './toggleForce-8f3fdd9b.js';
import { c as collapse } from './collapse-83b04891.js';

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
//# sourceMappingURL=viewArchive-2788032f.js.map
