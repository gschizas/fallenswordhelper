import { D as querySelector, a3 as fallback, b6 as playerId, R as getUrlParameter, L as quickbuffUrl, cb as auctionhouseUrl, bT as secureUrl, c0 as joinallUrl, c as calf, c1 as joinUnderUrl, bs as recallUserUrl, G as getValue, v as guildSubcmdUrl, aH as cdn } from './calfSystem-d357ca6f.js';
import './playerName-35237fe6.js';
import './onlineDot-579824dd.js';
import './batch-f74bc427.js';
import './colouredDots-f5d022b5.js';
import { c as currentGuildId } from './currentGuildId-bcd6f2c1.js';
import './intValue-e8157483.js';
import './valueText-6e721c40.js';
import './doStatTotal-a9fb57d6.js';
import './executeAll-be2ac0ec.js';
import { a as getPlayerName } from './profile-6746ccd4.js';
import './formToUrl-b0bbd7c6.js';
import './interceptSubmit-8526eadf.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-8735ac4b.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-fd9b48a5.js';

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
//# sourceMappingURL=profileInjectQuickButton-ecbe1cfc.js.map
