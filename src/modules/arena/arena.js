import allthen from '../common/allthen';
import arenaFull from './arenaFull';
import doLvlFilter from './doLvlFilter';
import filterHeader from './filterHeader';
import { get } from '../system/idb';
import interceptSubmit from '../common/interceptSubmit';
import jQueryNotPresent from '../common/jQueryNotPresent';
import loadDataTables from '../common/loadDataTables';
import orderData from './orderData';
import partial from '../common/partial';
import participants from './participants';
import querySelectorArray from '../common/querySelectorArray';
import redoSort from './redoSort';
import { sendEvent } from '../support/fshGa';
import view from '../app/arena/view';
import { fshArenaKey, tableOpts } from './assets';
import {
  setOpts,
  storeOpts,
} from './setOpts';
import { time, timeEnd } from '../support/debug';

function removeHiddenRows() {
  const hiddenRows = querySelectorArray(
    '#arenaTypeTabs tr[style="display: none;"]',
  );
  hiddenRows.forEach((n) => n.remove());
}

function redoHead(i, e) { // jQuery
  const firstRow = $('tr', e).first();
  $('a', firstRow).contents().unwrap();
  $(e).prepend($('<thead/>').append(firstRow));
}

function prepareEnv() {
  filterHeader();
  storeOpts();
  doLvlFilter();
}

function arenaDataTable(tabs, [arena, obj, json]) { // jQuery
  const theTables = $('table[width="635"]', tabs);
  theTables.each(redoHead);
  setOpts(arena);
  orderData(theTables);
  arenaFull(obj);
  participants(json);
  prepareEnv();
  theTables.DataTable(tableOpts);
  redoSort(tabs);
}

function process(tabs, values) {
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    time('arena.process');
  }
  removeHiddenRows();
  arenaDataTable(tabs, values);
  interceptSubmit();
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    timeEnd('arena.process');
  }
}

function prepare(tabs) {
  allthen([
    get(fshArenaKey),
    get('fsh_arenaFull'),
    view().catch(() => ({})),
    loadDataTables(),
  ],
  partial(process, tabs));
}

export default function injectArena() { // jQuery
  if (jQueryNotPresent()) { return; }
  const tabs = $('#arenaTypeTabs');
  if (tabs.length === 1) {
    prepare(tabs);
  } else {
    sendEvent('arena', 'Join error screen ?');
  }
}
