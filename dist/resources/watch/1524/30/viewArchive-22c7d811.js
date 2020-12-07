import { G as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, b9 as containsText, B as getText, V as setValue } from './calfSystem-d357ca6f.js';
import './isChecked-6167b36b.js';
import { s as simpleCheckbox } from './simpleCheckbox-9f95c1f3.js';
import './hideElement-f7381055.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-8735ac4b.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-491fa6b5.js';
import './toggleForce-c034bc71.js';
import { c as collapse } from './collapse-cd6af20d.js';

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
//# sourceMappingURL=viewArchive-22c7d811.js.map
