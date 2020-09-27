import { D as querySelector, a3 as fallback, b7 as playerId, R as getUrlParameter, L as quickbuffUrl, cc as auctionhouseUrl, bi as secureUrl, c1 as joinallUrl, G as getValue, c2 as joinUnderUrl, bv as recallUserUrl, v as guildSubcmdUrl, aH as cdn } from './calfSystem-0ffc234f.js';
import './playerName-a4720b96.js';
import './onlineDot-0427e12a.js';
import './batch-427b6015.js';
import './colouredDots-fb7d4e36.js';
import { c as currentGuildId } from './currentGuildId-a05aee13.js';
import './intValue-65d3c36c.js';
import './valueText-173142a3.js';
import './doStatTotal-164abc6a.js';
import { a as getPlayerName } from './profile-eabf6c8d.js';
import './formToUrl-a527c245.js';
import './interceptSubmit-b0fa4c9c.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-4c16b9cc.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-c2b2bb71.js';

function quickBuffHref(aPlayerId) { // Bad Pattern
  return `href='javascript:window.openWindow("${quickbuffUrl}&tid=${
    aPlayerId}", "fsQuickBuff", 618, 1000, ",scrollbars")'`;
}

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
//# sourceMappingURL=profileInjectQuickButton-ef1de4d0.js.map
