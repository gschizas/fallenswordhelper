import closestTr from '../../common/closestTr';
import getTextTrim from '../../common/getTextTrim';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import isGuildMate from './isGuildMate';
import querySelector from '../../common/querySelector';
import querySelectorArray from '../../common/querySelectorArray';
import { attackplayerUrl, chatSelector } from '../../support/constants';

const getPlayer = (r) => getTextTrim(r.cells[2].children[0]);
const guildTest = async ([r, name]) => [r, name, await isGuildMate(name)];

function addAttack([r, playerName]) {
  const trade = querySelector('a[href*="=createsecure&"]', r);
  insertHtmlAfterEnd(trade,
    ` | <a href="${attackplayerUrl}${playerName}">Attack</a>`);
}

export default async function addAttackLink(logTable) {
  const chatImg = querySelectorArray(chatSelector, logTable);
  if (chatImg.length === 0) { return; }
  const chatRows = chatImg.map(closestTr);
  const withPlayer = chatRows.map((r) => [r, getPlayer(r)]);
  const guildMate = await Promise.all(withPlayer.map(guildTest));
  const toUpdate = guildMate.filter(([, , gm]) => !gm);
  toUpdate.forEach(addAttack);
}
