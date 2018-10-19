import {getElementById} from './common/getElement';
import getForage from './ajax/getForage';
import jQueryNotPresent from './common/jQueryNotPresent';
import makePageTemplate from './lists/makePageTemplate';
import on from './common/on';
import {pCC} from './support/layout';
import quickBuffHref from './common/quickBuffHref';
import setForage from './ajax/setForage';
import {
  calculateBoundaries,
  gvgLowerLevel,
  gvgUpperLevel,
  pvpLowerLevel,
  pvpUpperLevel
} from './common/levelHighlight';

export function injectFindPlayer() { // Bad jQuery
  if (jQueryNotPresent()) {return;}
  calculateBoundaries();
  var findPlayerButton = $('input[value="Find Player"]');
  findPlayerButton.parent().append('&nbsp;<a href="index.php?' +
    'cmd=findplayer&search_active=1&search_username=&search_level_min=' +
    pvpLowerLevel + '&search_level_max=' +
    pvpUpperLevel + '&search_in_guild=0"><span ' +
    'style="color:blue;">Get PvP targets</span></a>&nbsp;<a href="' +
    'index.php?cmd=findplayer&search_active=1&search_username=&' +
    'search_level_min=' + gvgLowerLevel + '&search_level_max=' +
    gvgUpperLevel + '&search_in_guild=0"><span style="color:blue;">' +
    'Get GvG targets</span></a>');

  $('table[class="width_full"]').find('a[href*="player_id"]')
    .each(function(i, e) {
      var id = /player_id=([0-9]*)/.exec($(e).attr('href'));
      $(e).after('<a style="color:blue;font-size:10px;" ' +
        quickBuffHref(id[1]) + '>[b]</a>');
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
