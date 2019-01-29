import doLvlFilter from './doLvlFilter';
import filterHeader from './filterHeader';
import getForage from '../ajax/getForage';
import jQueryNotPresent from '../common/jQueryNotPresent';
import orderData from './orderData';
import partial from '../common/partial';
import redoSort from './redoSort';
import updateUrl from './updateUrl';
import {fshArenaKey, tableOpts} from './assets';
import {
  setOpts,
  storeOpts
} from './setOpts';
//#if _BETA  //  Timing output
import {time, timeEnd} from '../support/debug';
//#endif

var theTables;

function redoHead(i, e) { // jQuery
  var firstRow = $('tr', e).first();
  $('a', firstRow).contents().unwrap();
  $(e).prepend($('<thead/>').append(firstRow));
}

function prepareEnv() {
  filterHeader();
  storeOpts();
  doLvlFilter();
}

function arenaDataTable(tabs, arena) { // jQuery
  theTables.each(redoHead);
  setOpts(arena);
  orderData(theTables);
  prepareEnv();
  theTables.DataTable(tableOpts);
  redoSort(tabs);
  tabs.on('click', 'input.custombutton[type="submit"]', updateUrl);
}

function process(tabs, arena) {
  //#if _BETA  //  Timing output

  time('arena.process');

  //#endif
  arenaDataTable(tabs, arena);
  //#if _BETA  //  Timing output

  timeEnd('arena.process');

  //#endif
}

export function injectArena() { // jQuery
  if (jQueryNotPresent()) {return;}
  var tabs = $('#arenaTypeTabs');
  if (tabs.length !== 1) {return;} // Join error screen
  theTables = $('table[width="635"]', tabs);
  getForage(fshArenaKey).done(partial(process, tabs));
}
