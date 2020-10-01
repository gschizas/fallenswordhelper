import { attackplayerUrl } from '../../support/constants';
import getCustomUrlParameter from '../../system/getCustomUrlParameter';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import isGuildMate from './isGuildMate';
import querySelectorArray from '../../common/querySelectorArray';

const getPlayer = (t) => [t, getCustomUrlParameter(t.href, 'target_username')];
const guildTest = async ([t, name]) => [t, name, await isGuildMate(name)];

function addAttack([t, playerName]) {
  insertHtmlAfterEnd(t, ` | <a href="${attackplayerUrl}${playerName}">Attack</a>`);
}

export default async function addAttackLink(logTable) {
  const trade = querySelectorArray('a[href*="=createsecure&"]', logTable);
  if (!trade.length) { return; }
  const withPlayer = trade.map(getPlayer);
  const guildMate = await Promise.all(withPlayer.map(guildTest));
  guildMate.filter(([, , gm]) => !gm).forEach(addAttack);
}
