import dontPost from './common/dontPost';
import jQueryNotPresent from './common/jQueryNotPresent';
import on from './common/on';
import quickBuffHref from './common/quickBuffHref';
import {searchPlayerUrl} from './support/constants';
import {
  calculateBoundaries,
  gvgLowerLevel,
  gvgUpperLevel,
  pvpLowerLevel,
  pvpUpperLevel
} from './common/levelHighlight';

function closestForm(el) {
  if (el.tagName === 'FORM') {return el;}
  return closestForm(el.parentNode);
}

function updateUrl(evt) {
  evt.preventDefault();
  dontPost(closestForm(evt.target));
}

function allowBack(findPlayerButton) {
  on(findPlayerButton, 'click', updateUrl);
}

function searchUrl(min, max, guild) {
  return searchPlayerUrl +
    '&search_level_min=' + min +
    '&search_level_max=' + max +
    '&search_in_guild=' + guild;
}

function shortcuts() {
  return '&nbsp;<a class="fshBlue" href="' +
    searchUrl(pvpLowerLevel, pvpUpperLevel, '-1') +
    '">Get PvP targets</a>&nbsp;<a class="fshBlue" href="' +
    searchUrl(gvgLowerLevel, gvgUpperLevel, '1') +
    '">Get GvG targets</a>';
}

function doShortcuts(findPlayerButton) {
  findPlayerButton.parent().append(shortcuts());
}

function doFindPlayer() {
  var findPlayerButton = $('input[value="Find Player"]');
  allowBack(findPlayerButton[0]);
  doShortcuts(findPlayerButton);
}

function addBuffLinks(i, e) {
  var id = /player_id=([0-9]*)/.exec($(e).attr('href'));
  $(e).after(' <a class="fshBf" ' + quickBuffHref(id[1]) + '>[b]</a>');
}

function doBuffLinks() {
  $('table[class="width_full"]').find('a[href*="player_id"]')
    .each(addBuffLinks);
}

export default function injectFindPlayer() { // Bad jQuery
  if (jQueryNotPresent()) {return;}
  calculateBoundaries();
  doFindPlayer();
  doBuffLinks();
}
