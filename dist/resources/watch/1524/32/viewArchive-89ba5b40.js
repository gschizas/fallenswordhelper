import { c as collapse } from './collapse-87435051.js';
import { H as getValue, a6 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, aG as containsText, B as getText, W as setValue } from './calfSystem-e64be67d.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-3bb66451.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-e42c8c35.js';
import { s as simpleCheckbox } from './simpleCheckbox-7e912406.js';
import './hideElement-7c48eb54.js';
import './toggleForce-d3228ccb.js';
import './isChecked-00f5c23d.js';

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
//# sourceMappingURL=viewArchive-89ba5b40.js.map
