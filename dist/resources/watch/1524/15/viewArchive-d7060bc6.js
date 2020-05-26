import { D as getValue, g as getElementsByTagName, p as pCC, d as defTable, bc as containsText, A as getText, S as setValue } from './calfSystem-b469667c.js';
import './isChecked-81a663ed.js';
import { s as simpleCheckbox } from './simpleCheckbox-6735e1ba.js';
import './hideElement-33e9906c.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-ebd132d2.js';
import './toggleForce-e3c93179.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-f1f2d9e8.js';
import { c as collapse } from './collapse-62822938.js';

const ladderResetPref = 'lastLadderReset';
let lastLadderReset;
let trackLadderReset;

function checkForPvPLadder(row) {
  if (trackLadderReset && containsText('PvP Ladder', row.children[1].children[0])) {
    const logTime = parseDateAsTimestamp(
      getText(row.children[1].children[2]).replace('Posted: ', ''),
    );
    if (logTime > lastLadderReset) {
      setValue(ladderResetPref, logTime);
      lastLadderReset = logTime;
    }
  }
}

function testArticle(rowType) { return rowType > 1; }

function setupPref(prefName, rowInjector) {
  insertHtmlAfterEnd(rowInjector, simpleCheckbox(prefName));
}

function viewArchive() {
  lastLadderReset = getValue(ladderResetPref);
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
//# sourceMappingURL=viewArchive-d7060bc6.js.map
