import { C as searchPlayerUrl, f as insertHtmlBeforeEnd, D as querySelector, E as querySelectorArray, F as playerLinkSelector, p as pCC, o as onclick } from './calfSystem-b31646eb.js';
import './intValue-f94761c7.js';
import './valueText-31e23dfe.js';
import { g as getLowerPvpLevel, a as getUpperPvpLevel, b as getLowerGvGLevel, c as getUpperGvgLevel } from './levelHighlight-9406ec27.js';
import './fshOpen-71b2b356.js';
import './openQuickBuffByName-7f76ac0b.js';
import './formToUrl-16cc4fc0.js';
import { i as interceptSubmit } from './interceptSubmit-86cfff6d.js';
import { d as doBuffLink, a as doBuffLinkClick } from './doBuffLinkClick-f62b07c4.js';

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
//# sourceMappingURL=injectFindPlayer-e39ac0f4.js.map
