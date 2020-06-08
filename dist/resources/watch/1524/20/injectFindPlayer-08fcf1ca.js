import { C as searchPlayerUrl, e as insertHtmlBeforeEnd, D as querySelector, E as querySelectorArray, F as playerLinkSelector, p as pCC, o as onclick } from './calfSystem-c0288c6c.js';
import './intValue-e7ac83e4.js';
import './valueText-77bcf3af.js';
import { c as calculateBoundaries, p as pvpLowerLevel, a as pvpUpperLevel, g as gvgLowerLevel, b as gvgUpperLevel } from './levelHighlight-25cd0b9d.js';
import './fshOpen-1a8bb979.js';
import './openQuickBuffByName-afe3cfbb.js';
import './formToUrl-112a5041.js';
import { i as interceptSubmit } from './interceptSubmit-cad751a8.js';
import { d as doBuffLink, a as doBuffLinkClick } from './doBuffLinkClick-b2a75f61.js';

function searchUrl(min, max, guild) {
  return `${searchPlayerUrl}&search_level_min=${
    min}&search_level_max=${
    max}&search_in_guild=${
    guild}`;
}

function shortcuts() {
  return `&nbsp;<a class="fshBlue" href="${
    searchUrl(pvpLowerLevel, pvpUpperLevel, '-1')
  }">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${
    searchUrl(gvgLowerLevel, gvgUpperLevel, '1')}">Get GvG targets</a>`;
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
  calculateBoundaries();
  doFindPlayer();
  doBuffLinks();
  interceptSubmit();
}

export default injectFindPlayer;
//# sourceMappingURL=injectFindPlayer-08fcf1ca.js.map
