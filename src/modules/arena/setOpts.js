import {defaults} from '../support/dataObj';
import {fshArenaKey} from './assets';
import setForage from '../ajax/setForage';

export var opts;
export var oldIds;

export function storeOpts() {
  setForage(fshArenaKey, opts);
}

function newOpts(newMin, newMax) {
  opts = opts || {};
  opts.minLvl = newMin;
  opts.maxLvl = newMax;
  storeOpts();
}

export function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
  newOpts(minLvl, maxLvl);
  $('#arenaTypeTabs table[width="635"]').DataTable().draw();
}

export function resetLvls() { // jQuery
  newOpts(defaults.arenaMinLvl, defaults.arenaMaxLvl);
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
