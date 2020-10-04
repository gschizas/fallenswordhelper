import { D as querySelector, a4 as fallback, b7 as playerId, R as getUrlParameter, L as quickbuffUrl, cc as auctionhouseUrl, bU as secureUrl, c1 as joinallUrl, c as calf, c2 as joinUnderUrl, bt as recallUserUrl, G as getValue, v as guildSubcmdUrl, aI as cdn } from './calfSystem-975d976a.js';
import './playerName-20370288.js';
import './onlineDot-dc6c8ae7.js';
import './batch-09b88166.js';
import './colouredDots-ea1c9313.js';
import { c as currentGuildId } from './currentGuildId-fe3aa388.js';
import './intValue-ef353ded.js';
import './valueText-987489d3.js';
import './doStatTotal-a8e5e39d.js';
import { a as getPlayerName } from './profile-bdb5ca79.js';
import './formToUrl-5a234537.js';
import './interceptSubmit-653ee929.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-4abf40c2.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-71bd646d.js';

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
//# sourceMappingURL=profileInjectQuickButton-1359382e.js.map
