import closestTr from '../../common/closestTr';
import getTextTrim from '../../common/getTextTrim';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import querySelector from '../../common/querySelector';
import querySelectorArray from '../../common/querySelectorArray';
import setText from '../../dom/setText';
import { doAddIgnore, playerLinkSelector } from '../../support/constants';

function ignoreLinkHtml(p) {
  return `<a href="${doAddIgnore}${getTextTrim(p)}" data-tooltip="Add to Ignore List">Ignore</a>`;
}

function withMsg([p, , m]) {
  setText('Report', m);
  insertHtmlAfterEnd(m, ` | ${ignoreLinkHtml(p)}`);
}

function noMsg([p, r]) {
  insertHtmlBeforeEnd(r.cells[1].children[0],
    `<font size="1"><br>[ ${ignoreLinkHtml(p)} ]</font>`);
}

export default function addIgnoreLinks(logTable) {
  const playerLinks = querySelectorArray(playerLinkSelector, logTable);
  if (playerLinks.length === 0) { return; }
  const playerRows = playerLinks.map((p) => [p, closestTr(p)]);
  const reportLinks = playerRows.map(([p, r]) => [p, r, querySelector('a[href*="reportMsg"]', r)]);
  reportLinks.filter(([, , m]) => m).forEach(withMsg);
  reportLinks.filter(([, , m]) => !m).forEach(noMsg);
}
