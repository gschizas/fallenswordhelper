import collapse from '../common/collapse';
import containsText from '../common/containsText';
import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import getValue from '../system/getValue';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import { pCC } from '../support/layout';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import setValue from '../system/setValue';
import { simpleCheckbox } from '../settings/simpleCheckbox';
import { defLastLadderReset, defTable } from '../support/constants';

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

export default function viewArchive() {
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
