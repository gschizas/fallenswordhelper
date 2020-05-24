import { z as jQueryNotPresent, o as onclick, E as searchPlayerUrl, F as playerIDRE } from './calfSystem-43606e5e.js';
import { d as dontPost } from './dontPost-4ce1ffd1.js';
import { c as calculateBoundaries, p as pvpLowerLevel, a as pvpUpperLevel, g as gvgLowerLevel, b as gvgUpperLevel } from './levelHighlight-0642ec6f.js';
import { c as closest } from './closest-90712ffa.js';
import { q as quickBuffHref } from './quickBuffHref-3e56bf86.js';

function closestForm(el) {
  return closest('FORM', el);
}

function updateUrl(evt) {
  evt.preventDefault();
  dontPost(closestForm(evt.target));
}

function allowBack(findPlayerButton) {
  onclick(findPlayerButton, updateUrl);
}

function searchUrl(min, max, guild) {
  return `${searchPlayerUrl
  }&search_level_min=${min
  }&search_level_max=${max
  }&search_in_guild=${guild}`;
}

function shortcuts() {
  return `&nbsp;<a class="fshBlue" href="${
    searchUrl(pvpLowerLevel, pvpUpperLevel, '-1')
  }">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${
    searchUrl(gvgLowerLevel, gvgUpperLevel, '1')
  }">Get GvG targets</a>`;
}

function doShortcuts(findPlayerButton) {
  findPlayerButton.parent().append(shortcuts());
}

function doFindPlayer() {
  const findPlayerButton = $('input[value="Find Player"]');
  allowBack(findPlayerButton[0]);
  doShortcuts(findPlayerButton);
}

function addBuffLinks(i, e) {
  const id = playerIDRE.exec($(e).attr('href'));
  $(e).after(` <a class="fshBf" ${quickBuffHref(id[1])}>[b]</a>`);
}

function doBuffLinks() {
  $('table[class="width_full"]').find('a[href*="player_id"]')
    .each(addBuffLinks);
}

function injectFindPlayer() { // Bad jQuery
  if (jQueryNotPresent()) { return; }
  calculateBoundaries();
  doFindPlayer();
  doBuffLinks();
}

export default injectFindPlayer;
//# sourceMappingURL=injectFindPlayer-f442a5b1.js.map
