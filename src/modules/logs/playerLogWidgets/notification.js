import closestTr from '../../common/closestTr';
import getTextTrim from '../../common/getTextTrim';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import isGuildMate from './isGuildMate';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import querySelectorArray from '../../common/querySelectorArray';
import {
  attackplayerUrl,
  doAddIgnore,
  noteSelector,
  playerLinkSelector,
  secureUrl,
  tradeUrl,
} from '../../support/constants';

const isNote = ([, row]) => querySelector(noteSelector, row);

function addIgnore([, row, name]) {
  insertHtmlBeforeEnd(row.cells[1].children[0],
    `<font size="1"><br>[ <a href="${doAddIgnore}${name}" `
      + 'class="tip-static" data-tipped="Add to Ignore List" '
      + '>Ignore</a> ]</font>');
}

async function otherLinks(addAttackLinkToLog, [a, , name]) {
  const playerId = /&player_id=(\d+)/.exec(a.href)[1];
  const attackLink = addAttackLinkToLog && !await isGuildMate(name)
    ? ` | <a href="${attackplayerUrl}${name}">Attack</a>` : '';
  insertHtmlBeforeEnd(a.parentNode, '&nbsp;&nbsp; '
    + `<small>[ <a href="javascript:openQuickMsgDialog(&quot;${name}&quot;);" `
    + 'class="tip-static" data-tipped="Send Message">Reply</a> | '
    + `<a href="javascript:quickBuff(${playerId});">Buff</a> | `
    + `<a href="${tradeUrl}${name}">Send</a> | `
    + `<a href="${secureUrl}${name}">Trade</a>`
    + `${attackLink}`
    + ' ]</small>');
}

export default function notification(logTable, addIgnoreLink, addAttackLink) {
  const playerLinks = querySelectorArray(playerLinkSelector, logTable);
  if (playerLinks.length === 0) { return; }
  const playerRows = playerLinks.map((a) => [a, closestTr(a)]);
  const playerNotes = playerRows.filter(isNote);
  const nameNotes = playerNotes.map(([a, row]) => [a, row, getTextTrim(a)]);
  if (addIgnoreLink) {
    nameNotes.forEach(addIgnore);
  }
  nameNotes.forEach(partial(otherLinks, addAttackLink));
}
