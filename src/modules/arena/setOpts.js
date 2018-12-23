import {defaults} from '../support/dataObj';
import fallback from '../system/fallback';
import setForage from '../ajax/setForage';

export var opts;
export var oldIds;

export function storeOpts() {
  setForage('fsh_arena', opts);
}

function levelsAreNotNaN(minLvl, maxLvl) {
  return !isNaN(minLvl) && !isNaN(maxLvl);
}

export function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (levelsAreNotNaN(minLvl, maxLvl)) {
    opts = fallback(opts, {});
    opts.minLvl = minLvl;
    opts.maxLvl = maxLvl;
    storeOpts();
    $('#arenaTypeTabs table[width="635"]').DataTable().draw();
  }
}

export function resetLvls() { // jQuery
  opts = opts || {};
  opts.minLvl = defaults.arenaMinLvl;
  opts.maxLvl = defaults.arenaMaxLvl;
  storeOpts();
  $('#fshMinLvl').val(opts.minLvl);
  $('#fshMaxLvl').val(opts.maxLvl);
  $('#arenaTypeTabs table[width="635"]').DataTable().draw();
}

export function hideMoves(evt) { // jQuery
  opts = opts || {};
  opts.hideMoves = evt.target.checked;
  storeOpts();
  $('.moveMax').toggle(!evt.target.checked);
}

export function setOpts(arena) {
  opts = arena || {};
  oldIds = opts.id || {};
  opts.id = {};
}
