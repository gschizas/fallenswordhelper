import { G as getValue, a8 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, ba as containsText, B as getText, W as setValue } from './calfSystem-975d976a.js';
import './isChecked-ed98077f.js';
import { s as simpleCheckbox } from './simpleCheckbox-d4935e11.js';
import './hideElement-b0b3e820.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-4abf40c2.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-35c7668d.js';
import './toggleForce-7e736fc3.js';
import { c as collapse } from './collapse-37291c78.js';

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
//# sourceMappingURL=viewArchive-b99dbda9.js.map
