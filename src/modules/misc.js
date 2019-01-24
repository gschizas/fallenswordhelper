import {getElementById} from './common/getElement';
import getForage from './ajax/getForage';
import jQueryNotPresent from './common/jQueryNotPresent';
import makePageTemplate from './notepad/lists/makePageTemplate';
import on from './common/on';
import {pCC} from './support/layout';
import quickBuffHref from './common/quickBuffHref';
import {searchPlayerUrl} from './support/constants';
import setForage from './ajax/setForage';
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

export function injectFindPlayer() { // Bad jQuery
  if (jQueryNotPresent()) {return;}
  calculateBoundaries();
  var findPlayerButton = $('input[value="Find Player"]');
  findPlayerButton.parent().append('&nbsp;<a class="fshBlue" href="' +
    searchUrl(pvpLowerLevel, pvpUpperLevel, '-1') +
    '">Get PvP targets</a>&nbsp;<a class="fshBlue" href="' +
    searchUrl(gvgLowerLevel, gvgUpperLevel, '1') +
    '">Get GvG targets</a>');

  $('table[class="width_full"]').find('a[href*="player_id"]')
    .each(function(i, e) {
      var id = /player_id=([0-9]*)/.exec($(e).attr('href'));
      $(e).after(' <a class="fshBf" ' + quickBuffHref(id[1]) + '>[b]</a>');
    });
}

export function injectNotepad() { // jQuery
  if (jQueryNotPresent()) {return;}
  $('#notepad_notes')
    .attr('cols', '90')
    .attr('rows', '30')
    .css('resize', 'none');
}

function inject(fsboxcontent) {
  getElementById('fsboxdetail').innerHTML = fsboxcontent;
}

function clearFsBox() {
  setForage('fsh_fsboxcontent', '');
  location.reload();
}

export function injectFsBoxContent(injector) { // jQuery.min
  if (jQueryNotPresent()) {return;}
  var content = injector || pCC;
  content.innerHTML = makePageTemplate({
    title: 'FS Box Log',
    comment: '',
    spanId: 'fsboxclear',
    button: 'Clear',
    divId: 'fsboxdetail'
  });
  getForage('fsh_fsboxcontent').done(inject);
  on(getElementById('fsboxclear'), 'click', clearFsBox, true);
}
