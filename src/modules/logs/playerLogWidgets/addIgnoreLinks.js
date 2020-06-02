import closestTd from '../../common/closestTd';
import { doAddIgnore } from '../../support/constants';
import getTextTrim from '../../common/getTextTrim';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import querySelectorArray from '../../common/querySelectorArray';
import setText from '../../dom/setText';

function doIgnoreLink(a) {
  const playerName = getTextTrim(closestTd(a).nextElementSibling.children[0]);
  setText('Report', a);
  insertHtmlAfterEnd(a,
    ` | <a href="${doAddIgnore}${playerName}" class="tip-static" `
      + 'data-tipped="Add to Ignore List">Ignore</a>');
}

export default function addIgnoreLinks(logTable) {
  const reportLinks = querySelectorArray('a[href*="reportMsg"]', logTable);
  reportLinks.forEach(doIgnoreLink);
}
