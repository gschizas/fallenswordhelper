import { cdn } from '../system/system';
import currentGuildId from '../common/currentGuildId';
import fallback from '../system/fallback';
import getIsOwnGuild from './getIsOwnGuild';
import getPlayerName from './getPlayerName';
import getUrlParameter from '../system/getUrlParameter';
import getValue from '../system/getValue';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import playerId from '../common/playerId';
import querySelector from '../common/querySelector';
import quickBuffHref from '../common/quickBuffHref';
import {
  auctionhouseUrl,
  guildSubcmdUrl,
  joinUnderUrl,
  joinallUrl,
  recallUserUrl,
  secureUrl,
} from '../support/constants';

function joinGroups() {
  let url = joinallUrl;
  let suffix = '';
  if (getValue('enableMaxGroupSizeToJoin')) {
    url = joinUnderUrl;
    suffix = ` < ${getValue('maxGroupSizeToJoin')} Members`;
  }
  return `<a class="fshJoin quickButton tip-static" href="${
    url}" data-tipped="Join All Groups${
    suffix}"></a>&nbsp;&nbsp;`;
}

function showRecallButton(ownGuild, playername) {
  if (ownGuild) {
    return `<a class="fshTempleThree quickButton tip-static" href="${
      recallUserUrl}${playername}" data-tipped="Recall items from ${
      playername}"></a>&nbsp;&nbsp;`;
  }
  return '';
}

function showRankButton(ownGuild, playerid, playername) {
  if (ownGuild && getValue('showAdmin')) {
    return `<a class="quickButton tip-static" href="${
      guildSubcmdUrl}members&subcmd2=changerank&member_id=${
      playerid}" data-tipped="Rank ${
      playername}" style="background-image: url('${cdn}guilds/${
      currentGuildId()}_mini.png');"></a>&nbsp;&nbsp;`;
  }
  return '';
}

export default function profileInjectQuickButton() {
  const avyImg = querySelector(
    '#profileLeftColumn img[src*="/avatars/"][width="200"]',
  );
  if (!avyImg) { return; }
  const playername = getPlayerName();
  const playerid = fallback(getUrlParameter('player_id'), playerId());
  const ownGuild = getIsOwnGuild();
  const blob = '<div align="center">'
    + `<a class="fshQuickBuff quickButton tip-static" ${
      quickBuffHref(playerid)} data-tipped="Buff ${
      playername}"></a>&nbsp;&nbsp;${
      joinGroups()}<a class="fshGold quickButton tip-static" href="${
      auctionhouseUrl}&type=-3&tid=${playerid}" data-tipped="Go to ${
      playername}'s auctions"></a>&nbsp;&nbsp;`
    + `<a class="fshTempleTwo quickButton tip-static" href="${secureUrl}${
      playername}" data-tipped="Create Secure Trade to ${
      playername}"></a>&nbsp;&nbsp;${showRecallButton(ownGuild, playername)}${
      showRankButton(ownGuild, playerid, playername)}</div>`;
  insertHtmlAfterEnd(avyImg, blob);
}
