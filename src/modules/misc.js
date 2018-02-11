import {getElementById} from './common/getElement';
import getForage from './ajax/getForage';
import makePageTemplate from './lists/makePageTemplate';
import setForage from './ajax/setForage';
import {
  calculateBoundaries,
  gvgLowerLevel,
  gvgUpperLevel,
  pvpLowerLevel,
  pvpUpperLevel
} from './common/levelHighlight';
import {pCC, quickBuffHref} from './support/layout';

export function injectFindPlayer() { // Bad jQuery
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
  $('#notepad_notes')
    .attr('cols', '90')
    .attr('rows', '30')
    .css('resize', 'none');
}

export function injectFsBoxContent(injector) { // jQuery
  var content = injector || pCC;
  content.innerHTML = makePageTemplate({
    title: 'FS Box Log',
    comment: '',
    spanId: 'fsboxclear',
    button: 'Clear',
    divId: 'fsboxdetail'
  });
  getForage('fsh_fsboxcontent').done(function(fsboxcontent) {
    getElementById('fsboxdetail').innerHTML = fsboxcontent;
  });
  getElementById('fsboxclear')
    .addEventListener('click', function() {
      setForage('fsh_fsboxcontent', '');
      location.reload();
    }, true);
}
