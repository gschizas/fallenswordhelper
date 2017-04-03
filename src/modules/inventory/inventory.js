import calf from '../support/calf';
import * as ajax from '../support/ajax';
import * as assets from './assets';
import * as dataObj from '../support/dataObj';
import * as debug from '../support/debug';
import * as filters from './filters';
import * as system from '../support/system';
import * as table from './table';
import * as task from '../support/task';

/* jshint latedef: nofunc */
export var options;
export var showQuickDropLinks;
export var showQuickSendLinks;
export var theInv;

function doSpinner() { // jQuery
  $('#pCC').html('<span id="fshInvMan"><img src = "' +
  system.imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
    'Getting inventory data...</span>');
}

function rekeyMembrList() { // Native
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

function decorate() { // Native
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
  var myHtml = assets.invManFilter.replace('@@reportTitle@@', reportTitle);
  $('#pCC').html(myHtml);
}

function setChecks() { // Native
  Array.prototype.forEach.call(
    document.querySelectorAll('table.fshInvFilter input[type="checkbox"]'),
    function(el) {
      el.checked =
        options.checkedElements[el.getAttribute('item')] === 1;
    });
  ajax.setForage('fsh_inventory', options);
}

function setLvls() { // jQuery
  $('#fshMinLvl').val(options.fshMinLvl);
  $('#fshMaxLvl').val(options.fshMaxLvl);
}

function currentPlayer(player_id, current_player_id) {
  return player_id || current_player_id;
}

function getT(player_id) {
  if (player_id === -1) {return 4;}
  return 1;
}

function player(invPlayer, rowPlayer, guild) {
  if (invPlayer) {return invPlayer;}
  if (rowPlayer !== -1) {return rowPlayer;}
  return guild;
}

export function nameRender(data, type, row) { // Native
  if (type !== 'display') {return data;}
  var cur = currentPlayer(theInv.player_id, theInv.current_player_id);
  var t = getT(row.player_id);
  var p = player(theInv.player_id, row.player_id, theInv.guild_id);

  var bold = data;
  if (row.equipped) {bold = '<b>' + data + '</b>';}

  var _setName = '';
  if (row.stats && row.stats.set_name !== '') {
    _setName = ' (<span class="fshLink setName" set="' + row.stats.set_name +
      '">set</span>)';
  }

  return '<a href="index.php?cmd=auctionhouse&search_text=' + data +
    '" class="fshInvItem tip-dynamic ' +
    dataObj.rarity[row.rarity].clas + '" ' +
    'data-tipped="fetchitem.php?item_id=' + row.item_id +
    '&inv_id=' + row.inv_id + '&t=' + t + '&p=' + p +
    '&currentPlayerId=' + cur + '">' +
    bold + '</a>' + _setName;
}

export function whereData(row) { // Native
  return row.folder_id || row.player_id;
}

export function whereRender(data, type, row) { // Native
  if (row.folder_id) {
    return row.equipped ? -2 : parseInt(row.folder_id, 10);
  }
  return row.player_id === -1 ? '~' :
    calf.membrList[row.player_id].username;
}

export function whereRenderDisplay(data, type, row) { // Native
  if (row.player_id) {
    return row.player_id === -1 ? 'GS' :
      '<a class="fshMaroon" href="index.php?cmd=profile&player_id=' +
      row.player_id + '">' +
      calf.membrList[row.player_id].username + '</a>';
  }
  if (row.equipped) {return 'Worn';}
  var folderSelect = '<select class="moveItem" data-inv="' + row.inv_id +
    '">';
  var keysArray = Object.keys(theInv.folders)
    .sort(function(a, b) {return a - b;});
  keysArray.forEach(function(value) {
    folderSelect += '<option value="' + value + '"' +
      system.isSelected(value, row.folder_id) + '>' +
      theInv.folders[value] + '</option>';
  });
  folderSelect += '</select>';
  return folderSelect;
}

export function whereRenderFilter(data, type, row) { // Native
  if (row.player_id) {
    return row.player_id === -1 ? 'GS' :
      calf.membrList[row.player_id].username;
  }
  if (row.equipped) {return 'Worn';}
  return theInv.folders[row.folder_id];
}

export function craftRender(craft) { // Native
  return assets.craftHash[craft] ? assets.craftHash[craft].abbr : '';
}

export function durabilityRender(data, type, row) { // Native
  if (parseInt(row.max_durability, 10) > 0) {
    return Math.ceil(row.durability / row.max_durability * 100);
  }
}

export function bpRender(where, type, row) { // Native
  if (row.folder_id || row.player_id ===
    theInv.current_player_id) {return;}
  if (type !== 'display') {return 'BP';}
  if (row.player_id === -1) {
    return '<span class="fshLink takeItem" invid="' + row.inv_id +
      '" action="take">BP</span>';
  }
  return '<span class="fshLink recallItem" invid="' + row.inv_id +
    '" playerid="' + row.player_id +
    '" mode="0" action="recall">BP</span>';
}

export function gsRender(_data, type, row) { // Native
  if (row.player_id && row.player_id !== -1 ||
    row.folder_id && row.guild_tag !== '-1') {
    return type === 'display' ? '<span class="fshLink recallItem" invid="' +
      row.inv_id + '" playerid="' +
      (row.player_id || theInv.player_id) +
      '" mode="1" action="recall">GS</span>' : 'GS';
  }
}

function wearRender(row) { // Native
  if (row.player_id && row.player_id === -1) {
    return '<span class="fshLink takeItem" invid="' + row.inv_id +
      '" action="wear">Wear</span>';
  }
  if (row.player_id &&
      row.player_id !== theInv.current_player_id) {
    return '<span class="fshLink recallItem" invid="' + row.inv_id +
      '" playerid="' + row.player_id +
      '" mode="0" action="wear">Wear</span>';
  }
  if (row.folder_id && !row.equipped ||
      row.player_id && !row.equipped &&
      row.player_id === theInv.current_player_id) {
    return '<span class="fshLink wearItem" invid="' + row.inv_id +
      '">Wear</span>';
  }
  return '';
}

function useRender(row) { // Native
  if (row.player_id && row.player_id === -1) {
    return '<span class="fshLink takeItem" invid="' + row.inv_id +
      '" action="use">Use</span>';
  }
  if (row.player_id &&
      row.player_id !== theInv.current_player_id) {
    return '<span class="fshLink recallItem" invid="' + row.inv_id +
      '" playerid="' + row.player_id +
      '" mode="0" action="use">Use</span>';
  }
  if (row.folder_id && !row.equipped ||
      row.player_id && !row.equipped &&
      row.player_id === theInv.current_player_id) {
    return '<span class="fshLink useItem" invid="' + row.inv_id +
      '">Use</span>';
  }
  return '';
}

export function wuRender(data, _type, row) { // Native
  var action = {
    '0': 'Wear',
    '1': 'Wear',
    '2': 'Wear',
    '3': 'Wear',
    '4': 'Wear',
    '5': 'Wear',
    '6': 'Wear',
    '7': 'Wear',
    '8': 'Wear',
    '10': 'Use',
    '11': 'Use',
    '15': 'Use'
  }[data];
  if (action === 'Wear') {
    action = wearRender(row);
  } else if (action === 'Use') {
    action = useRender(row);
  }
  return action;
}

export function dropRender(data, type, row) { // Native
  if (row.guild_tag !== '-1' || row.equipped) {return;}
  if (type !== 'display') {return 'Drop';}
  return '<span class="dropItem tip-static dropLink" data-tipped=' +
    '"INSTANTLY DESTROY THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Drop</span>';
}

export function sendRender(data, type, row) { // Native
  if (row.bound || row.equipped) {return;}
  if (type !== 'display') {return 'Send';}
  return '<span class="sendItem tip-static reportLink" data-tipped=' +
    '"INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Send</span>';
}

export function createdRow(row, data) { // jQuery
  var colour;
  if (data.folder_id) {
    colour = data.equipped ? 'fshGreen' : 'fshNavy';
  }
  if (data.player_id) {
    colour = data.player_id === -1 ? 'fshNavy' : 'fshMaroon';
  }
  $(row).addClass(colour);
}

function refresh() { // Native
  doSpinner();
  syncInvMan();
}

function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
  options.fshMinLvl = minLvl;
  options.fshMaxLvl = maxLvl;
  ajax.setForage('fsh_inventory', options);
  $('#fshInv').DataTable().draw(false);
}

function resetLvls() { // jQuery
  options.fshMinLvl = dataObj.defaults.inventoryMinLvl;
  options.fshMaxLvl = dataObj.defaults.inventoryMaxLvl;
  ajax.setForage('fsh_inventory', options);
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
  ajax.setForage('fsh_inventory', options);
  $('#fshInv').DataTable().draw(false);
}

function allChecks() { // jQuery
  options.checkedElements = assets.inventoryCheckAll;
  setChecks();
  $('#fshInv').DataTable().draw(false);
}

function clearGearOnly(checkedElements) { // Native
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
  options.checkedElements = dataObj.defaults.inventoryCheckedElements;
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

function killRow(self) { // jQuery
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
  self.empty().append('<img src="' + system.imageServer +
    '/skin/loading.gif" width="11" height="11">');
}

function takeItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  ajax.queueTakeItem(self.attr('invid'), self.attr('action'))
    .done(function(data) {
      if (data.r === 1) {return;}
      killRow(self);
    });
  anotherSpinner(self);
}

function recallItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  ajax.queueRecallItem({
    invId: self.attr('invid'),
    playerId: self.attr('playerid'),
    mode: self.attr('mode'),
    action: self.attr('action')
  })
    .done(function(data) {
      if (data.r === 1) {return;}
      killRow(self);
    });
  anotherSpinner(self);
}

function wearItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  ajax.equipItem(self.attr('invid')).done(function(data) {
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function useItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  ajax.useItem(self.attr('invid')).done(function(data) {
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function moveItem(e) { // jQuery
  var self = $(e.target);
  ajax.moveItem([self.data('inv')], self.val());
}

function dropItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  ajax.dropItem([self.data('inv')]).done(function(data) {
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
}

function sendItem(e) { // jQuery
  var self = $(e.target);
  removeClass(self);
  ajax.sendItem([self.data('inv')]).done(function(data) {
    if (data.r === 1) {return;}
    killRow(self);
  });
  anotherSpinner(self);
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
  $('#fshInv').on('click', 'span.useItem', useItem);
  $('#fshInv').on('change', 'select.moveItem', moveItem);
  $('#fshInv').on('click', 'span.dropItem', dropItem);
  $('#fshInv').on('click', 'span.sendItem', sendItem);
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

function getInvMan() { // Native

  debug.time('inventory.getInvMan');

  showQuickDropLinks = system.getValue('showQuickDropLinks');
  showQuickSendLinks = system.getValue('showQuickSendLinks');

  if (calf.membrList) {rekeyMembrList();}

  decorate();
  filters.lvlFilter();
  filters.typeFilter();
  filters.setFilter();
  filters.rarityFilter();
  headers();
  setChecks();
  setLvls();
  table.doTable();
  eventHandlers();
  clearButton();

  debug.timeEnd('inventory.getInvMan');

}

function syncInvMan() { // jQuery
  var prm = [];
  prm.push(ajax.getInventory().done(function(data) {
    theInv = data;
  }));
  if (calf.subcmd === 'guildinvmgr') {
    prm.push(ajax.getMembrList(false));
  }
  prm.push(ajax.getForage('fsh_inventory')
    .pipe(function(data) {
      options = data || {};
      options.fshMinLvl = options.fshMinLvl ||
        dataObj.defaults.inventoryMinLvl;
      options.fshMaxLvl = options.fshMaxLvl ||
        dataObj.defaults.inventoryMaxLvl;
      options.checkedElements =
        options.checkedElements ||
        dataObj.defaults.inventoryCheckedElements;
    })
  );
  $.when.apply($, prm).done(function() {
    task.add(3, getInvMan);
  });
}

export {refresh as injectInventoryManagerNew};
