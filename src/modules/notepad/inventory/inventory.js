import add from '../../support/task';
import allthen from '../../common/allthen';
import {buildInv} from './buildInv';
import calf from '../../support/calf';
import clearButton from './clearButton';
import decorate from './decorate';
import doTable from './table';
import {entries} from '../../common/entries';
import eventHandlers from './eventHandlers/eventHandlers';
import executeAll from '../../common/executeAll';
import {extendOptions} from './options';
import {get} from '../../system/idb';
import getMembrList from '../../ajax/getMembrList';
import headers from './headers';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import notLastUpdate from '../../common/notLastUpdate';
import {oldActionSpinner} from '../../support/constants';
import {pCC} from '../../support/layout';
import setChecks from './setChecks';
import setLvls from './setLvls';
import {lvlFilter, rarityFilter, setFilter, typeFilter} from './filters';
//#if _BETA  //  Timing output
import {time, timeEnd} from '../../support/debug';
//#endif

function doSpinner() { // jQuery
  pCC.innerHTML = '<span id="fshInvMan">' +
    '<img src = "' + oldActionSpinner + '">&nbsp;' +
    'Getting inventory data...</span>';
}

function hydrate(prev, pair) {
  prev[pair[1].id] = pair[1];
  return prev;
}

function rekeyMembrList() {
  // Rekey membrList from names to id's
  calf.membrList = entries(calf.membrList).filter(notLastUpdate)
    .reduce(hydrate, {});
}

function prepareLayout() {
  executeAll([
    decorate,
    lvlFilter,
    typeFilter,
    setFilter,
    rarityFilter,
    headers,
    setChecks,
    setLvls
  ]);
}

function doInventory() {
  prepareLayout();
  var fshInv = doTable();
  eventHandlers(fshInv);
  // eslint-disable-next-line no-use-before-define
  $('#fshRefresh').on('click', injectInventoryManagerNew);
  clearButton(fshInv);
}

function getInvMan() {
  //#if _BETA  //  Timing output

  time('inventory.getInvMan');

  //#endif
  doInventory();
  //#if _BETA  //  Timing output

  timeEnd('inventory.getInvMan');

  //#endif
}

function asyncCall() {
  add(3, getInvMan);
}

function syncInvMan() { // jQuery
  var prm = [];
  prm.push(buildInv());
  if (calf.subcmd === 'guildinvmgr') {
    prm.push(getMembrList(false).then(rekeyMembrList));
  }
  prm.push(get('fsh_' + calf.subcmd).then(extendOptions)
  );
  allthen(prm, asyncCall);
}

export function injectInventoryManagerNew() {
  if (jQueryNotPresent()) {return;}
  doSpinner();
  syncInvMan();
}
