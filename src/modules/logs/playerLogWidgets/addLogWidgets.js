import addAttackLink from './addAttackLink';
import addIgnoreLinks from './addIgnoreLinks';
import addPvPSummary from './addPvPSummary';
import changeLabels from './changeLabels';
import colorPlayers from './colorPlayers';
import getValue from '../../system/getValue';
import interceptLinks from './interceptLinks';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import processLadder from './processLadder';
import querySelector from '../../common/querySelector';

function foundLogTable(logTable) {
  interceptLinks(logTable);
  const addIgnoreLink = getValue('addIgnoreLink');
  const addAttackLinkToLog = getValue('addAttackLinkToLog');
  if (addIgnoreLink) {
    addIgnoreLinks(logTable);
  }
  if (getValue('colorPlayerNames')) {
    colorPlayers(logTable);
  }
  if (addAttackLinkToLog) {
    addAttackLink(logTable);
  }
  if (getValue('changeButtonLabels')) {
    changeLabels(logTable);
  }
  if (getValue('trackLadderReset')) {
    processLadder(logTable);
  }
  if (getValue('showPvPSummaryInLog')) {
    addPvPSummary(logTable);
  }
}

export default function addLogWidgets() {
  if (jQueryNotPresent()) { return; }
  const logTable = querySelector('#pCC > table:last-of-type');
  if (logTable) { foundLogTable(logTable); }
}
