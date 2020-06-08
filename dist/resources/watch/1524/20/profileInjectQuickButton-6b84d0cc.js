import { L as quickbuffUrl, D as querySelector, a3 as fallback, b7 as playerId, Q as getUrlParameter, cb as auctionhouseUrl, bi as secureUrl, c0 as joinallUrl, G as getValue, c1 as joinUnderUrl, bv as recallUserUrl, v as guildSubcmdUrl, aH as cdn } from './calfSystem-c0288c6c.js';
import './playerName-544021b8.js';
import './onlineDot-071cab0f.js';
import './batch-eda68c17.js';
import './colouredDots-e475b6dd.js';
import { c as currentGuildId } from './currentGuildId-d935e4f2.js';
import './intValue-e7ac83e4.js';
import './valueText-77bcf3af.js';
import './doStatTotal-9583de62.js';
import { a as getPlayerName } from './profile-6a8f9c2c.js';
import './formToUrl-112a5041.js';
import './interceptSubmit-cad751a8.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-fcaed482.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-4d24660b.js';

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
//# sourceMappingURL=profileInjectQuickButton-6b84d0cc.js.map
