import { C as searchPlayerUrl, f as insertHtmlBeforeEnd, D as querySelector, E as querySelectorArray, F as playerLinkSelector, p as pCC, o as onclick } from './calfSystem-0ffc234f.js';
import './intValue-65d3c36c.js';
import './valueText-173142a3.js';
import { g as getLowerPvpLevel, a as getUpperPvpLevel, b as getLowerGvGLevel, c as getUpperGvgLevel } from './levelHighlight-88fcb0b2.js';
import './fshOpen-4f280086.js';
import './openQuickBuffByName-66509d7c.js';
import './formToUrl-a527c245.js';
import { i as interceptSubmit } from './interceptSubmit-b0fa4c9c.js';
import { d as doBuffLink, a as doBuffLinkClick } from './doBuffLinkClick-cc64f0a9.js';

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
//# sourceMappingURL=injectFindPlayer-8f8bf98a.js.map
