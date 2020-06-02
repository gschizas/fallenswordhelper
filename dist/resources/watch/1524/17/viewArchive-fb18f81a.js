import { D as getValue, a7 as defLastLadderReset, g as getElementsByTagName, p as pCC, d as defTable, bb as containsText, A as getText, T as setValue } from './calfSystem-f6498976.js';
import './isChecked-b18ca318.js';
import { s as simpleCheckbox } from './simpleCheckbox-fe263785.js';
import './hideElement-a5a5f404.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-c351a35c.js';
import './toggleForce-da36c8d4.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-150901d3.js';
import { c as collapse } from './collapse-ae4296f4.js';

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
//# sourceMappingURL=viewArchive-fb18f81a.js.map
