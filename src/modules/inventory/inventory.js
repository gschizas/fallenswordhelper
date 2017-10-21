import add from '../support/task';
import calf from '../support/calf';
import {defaults} from '../support/dataObj';
import doTable from './table';
import dropItem from '../ajax/dropItem';
import getForage from '../ajax/getForage';
import getInventory from '../ajax/getInventory';
import getMembrList from '../ajax/getMembrList';
import moveItem from '../ajax/moveItem';
import sendItem from '../ajax/sendItem';
import setForage from '../ajax/setForage';
import {
  equipItem,
  queueRecallItem,
  queueTakeItem,
  useItem
} from '../support/ajax';
import {fallback, getValue, imageServer} from '../support/system';
import {invManFilter, inventoryCheckAll} from './assets';
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

function decorate() {
  if (theInv.folders) {
    theInv.folders['-1'] = 'Main';
  }
  // Hide composed potions until Zorg fixes the feed
  theInv.items =
    theInv.items.filter(function(obj) {
      return obj.type !== '15';
    });
  //
}

function headers() { // jQuery
  var reportTitle;
  if (theInv.player_id) {
    reportTitle = '<b>&nbsp;Inventory Manager</b> ' +
      theInv.items.length +
      ' items (green = worn, blue = backpack)';
  } else {
    reportTitle = '<b>&nbsp;Guild Inventory Manager</b> ' +
      theInv.items.length +
      ' items (maroon = in BP, blue=guild store)';
  }
  var myHtml = invManFilter.replace('@@reportTitle@@', reportTitle);
  $('#pCC').html(myHtml);
}

function setChecks() {
  Array.prototype.forEach.call(
    document.querySelectorAll('table.fshInvFilter input[type="checkbox"]'),
    function(el) {
      el.checked =
        options.checkedElements[el.getAttribute('item')] === 1;
    });
  setForage('fsh_inventory', options);
}

function setLvls() { // jQuery
  $('#fshMinLvl').val(options.fshMinLvl);
  $('#fshMaxLvl').val(options.fshMaxLvl);
}

function refresh() {
  doSpinner();
  // eslint-disable-next-line no-use-before-define
  syncInvMan();
}

function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
  options.fshMinLvl = minLvl;
  options.fshMaxLvl = maxLvl;
  setForage('fsh_inventory', options);
  $('#fshInv').DataTable().draw(false);
}

function resetLvls() { // jQuery
  options.fshMinLvl = defaults.inventoryMinLvl;
  options.fshMaxLvl = defaults.inventoryMaxLvl;
  setForage('fsh_inventory', options);
  $('#fshMinLvl').val(options.fshMinLvl);
  $('#fshMaxLvl').val(options.fshMaxLvl);
  $('#fshInv').DataTable().draw(false);
}

function getChecks() { // jQuery
  options.checkedElements = {};
  Array.prototype.forEach.call(
    document.querySelectorAll(
      'table.fshInvFilter input[type="checkbox"][item]:checked'),
    function(el) {
      options.checkedElements[el.getAttribute('item')] = 1;
    });
  setForage('fsh_inventory', options);
  $('#fshInv').DataTable().draw(false);
}

function allChecks() { // jQuery
  options.checkedElements = inventoryCheckAll;
  setChecks();
  $('#fshInv').DataTable().draw(false);
}

function clearGearOnly(checkedElements) {
  var newEle = {};
  Object.keys(checkedElements).forEach(function(key) {
    if (parseInt(key, 10) >= 100) {
      newEle[key] = checkedElements[key];
    }
  });
  return newEle;
}

function clearChecks() { // jQuery
  options.checkedElements = clearGearOnly(options.checkedElements);
  setChecks();
  $('#fshInv').DataTable().draw();
}

function resetChecks() { // jQuery
  options.checkedElements = defaults.inventoryCheckedElements;
  setChecks();
  $('#fshInv').DataTable().draw(false);
}

function setName(e) { // jQuery
  $('#fshInv').DataTable().search($(e.target).attr('set')).draw();
  $('#fshInv_filter input').focus();
}

function removeClass(self) {
  self.closest('tr')
    .find('.takeItem, .recallItem, .wearItem, .dropItem, .sendItem')
    .removeClass().qtip('hide');
}

function killRow(self, data) { // jQuery
  if (data.r === 1) {return;}
  var tr = self.closest('tr');
  var td = $('td', tr);
  td.eq(2).empty(); // Where
  td.eq(12).empty(); // BP - GS
  td.eq(13).empty(); // GS - W/U
  td.eq(14).empty(); // W/U - Tag
  td.eq(15).empty(); // Tag - Drop
  td.eq(16).empty(); // ? - Send
  tr.css('text-decoration', 'line-through');
}

function anotherSpinner(self) {
  self.empty().append('<img src="' + imageServer +
    '/skin/loading.gif" width="11" height="11">');
}

function doAction(fn, self) { // jQuery
  removeClass(self);
  fn().done(killRow.bind(null, self));
  anotherSpinner(self);
}

function takeItem(e) { // jQuery
  var self = $(e.target);
  doAction(
    queueTakeItem.bind(null, self.attr('invid'), self.attr('action')),
    self
  );
}

function recallItem(e) { // jQuery
  var self = $(e.target);
  doAction(
    queueRecallItem.bind(null, {
      invId: self.attr('invid'),
      playerId: self.attr('playerid'),
      mode: self.attr('mode'),
      action: self.attr('action')
    }),
    self
  );
}

function wearItem(e) { // jQuery
  var self = $(e.target);
  doAction(equipItem.bind(null, self.attr('invid')), self);
}

function doUseItem(e) { // jQuery
  var self = $(e.target);
  doAction(useItem.bind(null, self.attr('invid')), self);
}

function doMoveItem(e) { // jQuery
  var self = $(e.target);
  moveItem([self.data('inv')], self.val());
}

function doDropItem(e) { // jQuery
  var self = $(e.target);
  doAction(dropItem.bind(null, [self.data('inv')]), self);
}

function doSendItem(e) { // jQuery
  var self = $(e.target);
  doAction(sendItem.bind(null, [self.data('inv')]), self);
}

function eventHandlers() { // jQuery
  $('#fshRefresh').click(refresh);
  $('#fshMinLvl, #fshMaxLvl').keyup(changeLvls);
  $('#fshReset').click(resetLvls);
  $('table.fshInvFilter').on('click', 'input[type="checkbox"]', getChecks);
  $('#fshAll').click(allChecks);
  $('#fshNone').click(clearChecks);
  $('#fshDefault').click(resetChecks);
  $('#fshInv').on('click', 'span.setName', setName);
  $('#fshInv').on('click', 'span.takeItem', takeItem);
  $('#fshInv').on('click', 'span.recallItem', recallItem);
  $('#fshInv').on('click', 'span.wearItem', wearItem);
  $('#fshInv').on('click', 'span.useItem', doUseItem);
  $('#fshInv').on('change', 'select.fshMoveItem', doMoveItem);
  $('#fshInv').on('click', 'span.dropItem', doDropItem);
  $('#fshInv').on('click', 'span.sendItem', doSendItem);
}

function clearButton() { // jQuery
  var input = $('#fshInv_filter input');
  input.prop('type', 'text');
  var clear = $('<span>&times;</span>');
  input.wrap($('<span class="text-input-wrapper"/>'));
  input.after(clear);
  clear.click(function() {
    input.val('');
    $('#fshInv').DataTable().search('').draw();
  });
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
  options = fallback(data, {});
  options.fshMinLvl = fallback(options.fshMinLvl,
    defaults.inventoryMinLvl);
  options.fshMaxLvl = fallback(options.fshMaxLvl,
    defaults.inventoryMaxLvl);
  options.checkedElements = fallback(options.checkedElements,
    defaults.inventoryCheckedElements);
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
