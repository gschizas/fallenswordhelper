import { L as quickbuffUrl, D as querySelector, a3 as fallback, b7 as playerId, Q as getUrlParameter, cc as auctionhouseUrl, bi as secureUrl, c1 as joinallUrl, G as getValue, c2 as joinUnderUrl, bv as recallUserUrl, v as guildSubcmdUrl, aH as cdn } from './calfSystem-995e3482.js';
import './playerName-f1d5dedf.js';
import './onlineDot-266f3d0e.js';
import './batch-11ced035.js';
import './colouredDots-c686d93a.js';
import { c as currentGuildId } from './currentGuildId-8e64bbe5.js';
import './intValue-0c980717.js';
import './valueText-f7e6bf42.js';
import './doStatTotal-c896b494.js';
import { a as getPlayerName } from './profile-75c69879.js';
import './formToUrl-c6f1dab2.js';
import './interceptSubmit-49a349aa.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-f52b317d.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-f71e1e1f.js';

function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  let passthru = '';
  if (buffList) { passthru = `&blist=${buffList}`; }
  return `href='javascript:window.openWindow("${quickbuffUrl}&tid=${
    aPlayerId}${passthru}", "fsQuickBuff", 618, 1000, ",scrollbars")'`;
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
//# sourceMappingURL=profileInjectQuickButton-1d584db9.js.map
