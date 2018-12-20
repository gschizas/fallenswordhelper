import add from '../support/task';
import {buildInv} from './buildInv';
import calf from '../support/calf';
import clearButton from './clearButton';
import decorate from './decorate';
import doTable from './table';
import eventHandlers from './eventHandlers/eventHandlers';
import {extendOptions} from './options';
import getForage from '../ajax/getForage';
import getMembrList from '../ajax/getMembrList';
import headers from './headers';
import {imageServer} from '../system/system';
import jQueryNotPresent from '../common/jQueryNotPresent';
import setChecks from './setChecks';
import setLvls from './setLvls';
import {lvlFilter, rarityFilter, setFilter, typeFilter} from './filters';
import {time, timeEnd} from '../support/debug';

function doSpinner() { // jQuery
  $('#pCC').html('<span id="fshInvMan"><img src = "' +
  imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
    'Getting inventory data...</span>');
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

function getInvMan() {

  time('inventory.getInvMan');

  if (calf.membrList) {rekeyMembrList();}

  decorate();
  lvlFilter();
  typeFilter();
  setFilter();
  rarityFilter();
  headers();
  setChecks();
  setLvls();
  doTable();
  eventHandlers();
  // eslint-disable-next-line no-use-before-define
  $('#fshRefresh').click(injectInventoryManagerNew);
  clearButton();

  timeEnd('inventory.getInvMan');

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
  $.when.apply($, prm).done(function() {
    add(3, getInvMan);
  });
}

export function injectInventoryManagerNew() {
  if (jQueryNotPresent()) {return;}
  doSpinner();
  syncInvMan();
}
