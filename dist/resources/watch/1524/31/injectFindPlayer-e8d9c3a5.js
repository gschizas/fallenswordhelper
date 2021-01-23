import { d as doBuffLink, a as doBuffLinkClick } from './doBuffLinkClick-6110e55c.js';
import { C as searchPlayerUrl, f as insertHtmlBeforeEnd, D as querySelector, E as querySelectorArray, F as playerLinkSelector, p as pCC, o as onclick } from './calfSystem-91adbec8.js';
import { i as interceptSubmit } from './interceptSubmit-06382d8c.js';
import { g as getLowerPvpLevel, a as getUpperPvpLevel, b as getLowerGvGLevel, c as getUpperGvgLevel } from './levelHighlight-adb7fa1d.js';
import './openQuickBuffByName-0ac7bd3b.js';
import './fshOpen-bec182a3.js';
import './formToUrl-b273f7df.js';
import './intValue-e7ef611d.js';
import './valueText-43fd27d5.js';

function searchUrl(min, max, guild) {
  return `${searchPlayerUrl}&search_level_min=${
    min}&search_level_max=${
    max}&search_in_guild=${
    guild}`;
}

function shortcuts() {
  return `&nbsp;<a class="fshBlue" href="${
    searchUrl(getLowerPvpLevel(), getUpperPvpLevel(), '-1')
  }">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${
    searchUrl(getLowerGvGLevel(), getUpperGvgLevel(), '1')}">Get GvG targets</a>`;
}

function doShortcuts(findPlayerButton) {
  insertHtmlBeforeEnd(findPlayerButton.parentNode, shortcuts());
}

function doFindPlayer() {
  const findPlayerButton = querySelector('input[value="Find Player"]');
  if (findPlayerButton) {
    doShortcuts(findPlayerButton);
  }
}

function doBuffLinks() {
  const playerLinks = querySelectorArray(playerLinkSelector, pCC);
  playerLinks.forEach(doBuffLink);
  onclick(pCC, doBuffLinkClick);
}

function injectFindPlayer() {
  doFindPlayer();
  doBuffLinks();
  interceptSubmit();
}

export default injectFindPlayer;
//# sourceMappingURL=injectFindPlayer-e8d9c3a5.js.map
