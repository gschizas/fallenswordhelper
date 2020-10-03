import { C as searchPlayerUrl, f as insertHtmlBeforeEnd, D as querySelector, E as querySelectorArray, F as playerLinkSelector, p as pCC, o as onclick } from './calfSystem-c851a12c.js';
import './intValue-e4cdd281.js';
import './valueText-92ef1aee.js';
import { g as getLowerPvpLevel, a as getUpperPvpLevel, b as getLowerGvGLevel, c as getUpperGvgLevel } from './levelHighlight-66041fcc.js';
import './fshOpen-a7890139.js';
import './openQuickBuffByName-df881f3c.js';
import './formToUrl-19af2e75.js';
import { i as interceptSubmit } from './interceptSubmit-ad55085a.js';
import { d as doBuffLink, a as doBuffLinkClick } from './doBuffLinkClick-2a80865b.js';

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
//# sourceMappingURL=injectFindPlayer-dbe6a356.js.map
