import add from '../../support/task';
import {buildInv} from './buildInv';
import calf from '../../support/calf';
import clearButton from './clearButton';
import decorate from './decorate';
import doTable from './table';
import eventHandlers from './eventHandlers/eventHandlers';
import execute from '../../common/execute';
import {extendOptions} from './options';
import getForage from '../../ajax/getForage';
import getMembrList from '../../ajax/getMembrList';
import headers from './headers';
import {imageServer} from '../../system/system';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import {pCC} from '../../support/layout';
import setChecks from './setChecks';
import setLvls from './setLvls';
import when from '../../common/when';
import {lvlFilter, rarityFilter, setFilter, typeFilter} from './filters';
import {time, timeEnd} from '../../support/debug';

function doSpinner() { // jQuery
  // $('#pCC').html('<span id="fshInvMan"><img src = "' +
  pCC.innerHTML = '<span id="fshInvMan"><img src = "' +
  imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
    'Getting inventory data...</span>';
}

function rekeyMembrList() {
  calf.membrList = Object.keys(calf.membrList)
    // Using reduce() to rekey the membrList from names to id's
    .reduce(function(prev, curr) {
      if (curr !== 'lastUpdate') {
        prev[calf.membrList[curr].id] =
          calf.membrList[curr];
      }
      return prev;
    }, {});
}

function prepareLayout() {
  [
    decorate,
    lvlFilter,
    typeFilter,
    setFilter,
    rarityFilter,
    headers,
    setChecks,
    setLvls
  ].forEach(execute);
}

function doInventory() {
  if (calf.membrList) {rekeyMembrList();}
  prepareLayout();
  var fshInv = doTable();
  eventHandlers(fshInv);
  // eslint-disable-next-line no-use-before-define
  $('#fshRefresh').click(injectInventoryManagerNew);
  clearButton(fshInv);
}

function getInvMan() {
  time('inventory.getInvMan');
  doInventory();
  timeEnd('inventory.getInvMan');
}

function asyncCall() {
  add(3, getInvMan);
}

function syncInvMan() { // jQuery
  var prm = [];
  prm.push(buildInv());
  if (calf.subcmd === 'guildinvmgr') {
    prm.push(getMembrList(false));
  }
  prm.push(getForage('fsh_' + calf.subcmd)
    .done(extendOptions)
  );
  when(prm, asyncCall);
}

export function injectInventoryManagerNew() {
  if (jQueryNotPresent()) {return;}
  doSpinner();
  syncInvMan();
}
