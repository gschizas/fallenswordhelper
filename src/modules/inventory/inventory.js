import add from '../support/task';
import calf from '../support/calf';
import clearButton from './clearButton';
import decorate from './decorate';
import {defaultOptions} from './assets';
import doTable from './table';
import eventHandlers from './eventHandlers/eventHandlers';
import extend from '../common/extend';
import getForage from '../ajax/getForage';
import getInventory from '../ajax/getInventory';
import getMembrList from '../ajax/getMembrList';
import headers from './headers';
import setChecks from './setChecks';
import setLvls from './setLvls';
import {fallback, getValue, imageServer} from '../support/system';
import {lvlFilter, rarityFilter, setFilter, typeFilter} from './filters';
import {time, timeEnd} from '../support/debug';

/* jshint latedef: nofunc */
export var options;
export var showQuickDropLinks;
export var showQuickSendLinks;
export var theInv;

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

function refresh() {
  doSpinner();
  // eslint-disable-next-line no-use-before-define
  syncInvMan();
}

function getInvMan() {

  time('inventory.getInvMan');

  showQuickDropLinks = getValue('showQuickDropLinks');
  showQuickSendLinks = getValue('showQuickSendLinks');

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
  clearButton();

  timeEnd('inventory.getInvMan');

}

function extendOptions(data) {
  options = extend({}, defaultOptions);
  extend(options, fallback(data, {}));
}

function syncInvMan() { // jQuery
  var prm = [];
  prm.push(getInventory().done(function(data) {
    theInv = data;
  }));
  if (calf.subcmd === 'guildinvmgr') {
    prm.push(getMembrList(false));
  }
  prm.push(getForage('fsh_inventory')
    .done(extendOptions)
  );
  $.when.apply($, prm).done(function() {
    add(3, getInvMan);
  });
}

export {refresh as injectInventoryManagerNew};
