import { L as quickbuffUrl, D as querySelector, a3 as fallback, b7 as playerId, Q as getUrlParameter, cc as auctionhouseUrl, bi as secureUrl, c1 as joinallUrl, G as getValue, c2 as joinUnderUrl, bv as recallUserUrl, v as guildSubcmdUrl, aH as cdn } from './calfSystem-2b1fed3f.js';
import './playerName-12a90d68.js';
import './onlineDot-bd64f1c8.js';
import './batch-8195e47b.js';
import './colouredDots-1a422747.js';
import { c as currentGuildId } from './currentGuildId-e952c248.js';
import './intValue-0e84cdad.js';
import './valueText-a309b391.js';
import './doStatTotal-dfd0d690.js';
import { a as getPlayerName } from './profile-42657d3d.js';
import './formToUrl-b13d3faa.js';
import './interceptSubmit-b78fe85b.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-677b583a.js';
import { a as getIsOwnGuild } from './getIsOwnGuild-6d41a335.js';

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
//# sourceMappingURL=profileInjectQuickButton-7f080d42.js.map
