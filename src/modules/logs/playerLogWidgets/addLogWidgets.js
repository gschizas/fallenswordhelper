import addAttackLink from './addAttackLink';
import addIgnoreLinks from './addIgnoreLinks';
import addPvPSummary from './addPvPSummary';
import changeLabels from './changeLabels';
import colorPlayers from './colorPlayers';
import getValue from '../../system/getValue';
import interceptLinks from './interceptLinks';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import partial from '../../common/partial';
import processLadder from './processLadder';
import querySelector from '../../common/querySelector';

const conditionalArray = [
  ['addIgnoreLink', addIgnoreLinks],
  ['colorPlayerNames', colorPlayers],
  ['addAttackLinkToLog', addAttackLink],
  ['changeButtonLabels', changeLabels],
  ['trackLadderReset', processLadder],
  ['showPvPSummaryInLog', addPvPSummary],
];

function processConditionals(logTable, pair) {
  if (getValue(pair[0])) {
    pair[1](logTable);
  }
}

function foundLogTable(logTable) {
  interceptLinks(logTable);
  conditionalArray.forEach(partial(processConditionals, logTable));
}

export default function addLogWidgets() {
  if (jQueryNotPresent()) { return; }
  const logTable = querySelector('#pCC > table:last-of-type');
  if (logTable) { foundLogTable(logTable); }
}
