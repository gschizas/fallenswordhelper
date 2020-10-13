import { D as querySelector, a3 as fallback, b6 as playerId, R as getUrlParameter, L as quickbuffUrl, cb as auctionhouseUrl, bT as secureUrl, c0 as joinallUrl, c as calf, c1 as joinUnderUrl, bs as recallUserUrl, G as getValue, v as guildSubcmdUrl, aH as cdn } from './calfSystem-21d16a0e.js';
import './playerName-e1b17bb3.js';
import './onlineDot-61e94a2d.js';
import './batch-15fb3a1f.js';
import './colouredDots-292cf85e.js';
import { c as currentGuildId } from './currentGuildId-ce8bf3c5.js';
import './intValue-f4d85578.js';
import './valueText-6bc7cb16.js';
import './doStatTotal-8cad2c14.js';
import './executeAll-3d4e4221.js';
import { a as getPlayerName } from './profile-9ad50e33.js';
import './formToUrl-2fddf9de.js';
import './interceptSubmit-719ace11.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-cd4d08fc.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-5432f275.js';

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
//# sourceMappingURL=profileInjectQuickButton-ed0c2658.js.map
