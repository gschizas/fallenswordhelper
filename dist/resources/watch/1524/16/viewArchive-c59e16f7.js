import { D as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, bb as containsText, A as getText, T as setValue } from './calfSystem-6e4b53e3.js';
import './isChecked-aa4fe178.js';
import { s as simpleCheckbox } from './simpleCheckbox-91bd42e6.js';
import './hideElement-2545b10e.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-02106a94.js';
import './toggleForce-0d836f31.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-fd1018b2.js';
import { c as collapse } from './collapse-8e04fd91.js';

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
//# sourceMappingURL=viewArchive-c59e16f7.js.map
