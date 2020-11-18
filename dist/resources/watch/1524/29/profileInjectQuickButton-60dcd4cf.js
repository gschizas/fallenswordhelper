import { D as querySelector, a3 as fallback, b6 as playerId, R as getUrlParameter, L as quickbuffUrl, cb as auctionhouseUrl, bT as secureUrl, c0 as joinallUrl, c as calf, c1 as joinUnderUrl, bs as recallUserUrl, G as getValue, v as guildSubcmdUrl, aH as cdn } from './calfSystem-b31646eb.js';
import './playerName-8a2d59df.js';
import './onlineDot-faba3c40.js';
import './batch-9c39837c.js';
import './colouredDots-2fa85d58.js';
import { c as currentGuildId } from './currentGuildId-d6a28488.js';
import './intValue-f94761c7.js';
import './valueText-31e23dfe.js';
import './doStatTotal-219a4f8a.js';
import './executeAll-18adff71.js';
import { a as getPlayerName } from './profile-9b59385f.js';
import './formToUrl-16cc4fc0.js';
import './interceptSubmit-86cfff6d.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-46737457.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-9e7e6d08.js';

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
//# sourceMappingURL=profileInjectQuickButton-60dcd4cf.js.map
