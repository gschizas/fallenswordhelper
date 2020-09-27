import closestTd from '../../common/closestTd';
import closestTr from '../../common/closestTr';
import { doAddIgnore } from '../../support/constants';
import getTextTrim from '../../common/getTextTrim';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import querySelectorArray from '../../common/querySelectorArray';
import { sendEvent } from '../../support/fshGa';
import setText from '../../dom/setText';

function doIgnoreLink(a) {
  const playerLink = closestTd(a).nextElementSibling.children[0];
  if (playerLink instanceof Node) {
    const playerName = getTextTrim(playerLink);
    setText('Report', a);
    insertHtmlAfterEnd(a,
      ` | <a href="${doAddIgnore}${playerName}" data-tooltip="Add to Ignore List">Ignore</a>`);
  } else {
    sendEvent('playerLog', 'missing anchor', closestTr(a).innerHTML);
  }
}

export default function addIgnoreLinks(logTable) {
  const reportLinks = querySelectorArray('a[href*="reportMsg"]', logTable);
  reportLinks.forEach(doIgnoreLink);
}
