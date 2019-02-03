import jQueryNotPresent from './common/jQueryNotPresent';
import quickBuffHref from './common/quickBuffHref';
import {searchPlayerUrl} from './support/constants';
import {
  calculateBoundaries,
  gvgLowerLevel,
  gvgUpperLevel,
  pvpLowerLevel,
  pvpUpperLevel
} from './common/levelHighlight';

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

function addBuffLinks(i, e) {
  var id = /player_id=([0-9]*)/.exec($(e).attr('href'));
  $(e).after(' <a class="fshBf" ' + quickBuffHref(id[1]) + '>[b]</a>');
}

export default function injectFindPlayer() { // Bad jQuery
  if (jQueryNotPresent()) {return;}
  calculateBoundaries();
  var findPlayerButton = $('input[value="Find Player"]');
  findPlayerButton.parent().append(shortcuts());

  $('table[class="width_full"]').find('a[href*="player_id"]')
    .each(addBuffLinks);
}
