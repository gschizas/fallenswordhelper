import { D as querySelector, a3 as fallback, aA as playerId, R as getUrlParameter, L as quickbuffUrl, ca as auctionhouseUrl, bN as secureUrl, bX as joinallUrl, c as calf, bY as joinUnderUrl, bB as recallUserUrl, H as getValue, v as guildSubcmdUrl, ak as cdn } from './calfSystem-91adbec8.js';
import { c as currentGuildId } from './currentGuildId-748f657b.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-d5d83528.js';
import { a as getPlayerName } from './profile-3eb89f48.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-dac2bf7a.js';
import './colouredDots-fd53841d.js';
import './batch-42f379a6.js';
import './onlineDot-f5323202.js';
import './doStatTotal-0bcf773c.js';
import './executeAll-86fbe671.js';
import './playerName-13e38788.js';
import './intValue-e7ef611d.js';
import './valueText-43fd27d5.js';
import './interceptSubmit-06382d8c.js';
import './formToUrl-b273f7df.js';

function quickBuffHref(aPlayerId) { // Bad Pattern
  return `href='javascript:window.openWindow("${quickbuffUrl}&tid=${
    aPlayerId}", "fsQuickBuff", 618, 1000, ",scrollbars")'`;
}

function joinGroups() {
  let url = joinallUrl;
  let suffix = '';
  if (calf.enableMaxGroupSizeToJoin) {
    url = joinUnderUrl;
    suffix = ` < ${calf.maxGroupSizeToJoin} Members`;
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

function profileInjectQuickButton() {
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

export default profileInjectQuickButton;
//# sourceMappingURL=profileInjectQuickButton-061d3793.js.map
