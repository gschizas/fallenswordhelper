import debug from './support/debug';
import dataObj from './support/dataObj';
import system from './support/system';
import ajax from './support/ajax';

var moveOptions =
  '<td colspan=3 ' +
  'style="padding-top: 2px;padding-bottom: 2px;">' +
  '<select style="max-width: 50px;">' +
  '<option value="x">Basic Attack</option>' +
  '<option value="0">Block</option>' +
  '<option value="1">Counter Attack</option>' +
  '<option value="2">Critical Hit</option>' +
  '<option value="3">Defend</option>' +
  '<option value="4">Deflect</option>' +
  '<option value="5">Dodge</option>' +
  '<option value="6">Lunge</option>' +
  '<option value="7">Power Attack</option>' +
  '<option value="8">Spin Attack</option>' +
  '<option value="9">Piercing Strike</option>' +
  '<option value="10">Crush</option>' +
  '<option value="11">Weaken</option>' +
  '<option value="12">Ice Shard</option>' +
  '<option value="13">Fire Blast</option>' +
  '<option value="14">Poison</option>' +
  '</select></td>';
var oldMoves = [];
var tableOpts = {
  paging: false,
  info: false,
  order: [[3, 'desc'],[0, 'asc']],
  columnDefs: [
    {orderable: false, targets: [8, 9]}
  ],
  stateSave: true,
  stateDuration: 0
};
var arenaFilter =
  '<table width="100%"><tbody><tr><td>' +
  '<span class="fshBlue"><input id="fshHideMoves" type="checkbox">' +
  '&nbsp;Hide Matches for Completed Moves</span></td><td align="right">' +
  '<span class="fshBlue">Min lvl:&nbsp;<input id="fshMinLvl" size="5">' +
  '&nbsp;Max lvl:&nbsp;<input id="fshMaxLvl" size="5">&nbsp;&nbsp;' +
  '<input id="fshReset" class="custombutton" type="button" ' +
  'value="Reset"></span></td></tr></tbody></table>';
var tabs;
var theTables;
var opts;
var oldIds;
var nodes;
var selectRow;

function gotoPage(pageId) { // Native
  window.location = 'index.php?cmd=arena&subcmd=completed&page=' + pageId;
}

function dontPost(e) { // jQuery
  e.preventDefault();
  var self = $(e.target);
  var pvpId = self.prev().val();
  var subcmd = self.prev().prev().val();
  window.location = 'index.php?cmd=arena&subcmd=' + subcmd +
    '&pvp_id=' + pvpId;
}

function completedArenas() { // jQuery
  var prevButton = $('#pCC input[value="<"]');
  var nextButton = $('#pCC input[value=">"]');
  if (prevButton.length === 1) {
    var startButton = $('<input value="<<" type="button">');
    prevButton.before(startButton).before('&nbsp;');
    startButton.click(function() {gotoPage(1);});
  }
  if (nextButton.length === 1) {
    var lastPage = $('#pCC input[value="Go"]').closest('td').prev().text()
      .replace(/\D/g,'');
    var finishButton = $('<input value=">>" type="button">');
    nextButton.after(finishButton).after('&nbsp;');
    finishButton.click(function() {gotoPage(lastPage);});
  }
  $('#pCC input[value="View"]').click(dontPost);
}

function updateMoves() { // jQuery
  var newMoves = [];
  $('select', selectRow).each(function(i, e) {
    newMoves.push($(e).val());
  });
  var prm = [];
  newMoves.forEach(function(val, ind) {
    if (val === oldMoves[ind]) {return;}
    prm.push(ajax.doPickMove('x', ind));
    nodes.eq(ind).attr({
      'src': system.imageServer + '/world/actionLoadingSpinner.gif',
      'width': '25',
      'height': '25'
    });
  });
  $.when.apply($, prm).done(function() {
    newMoves.forEach(function(val, ind) {
      if (val === 'x' || val === oldMoves[ind]) {return;}
      prm.push(ajax.doPickMove(val, ind));
    });
    $.when.apply($, prm).done(function() {
      window.location = 'index.php?cmd=arena&subcmd=setup';
    });
  });
}

function selectMoves(evt) { // jQuery
  $(evt.target).off();

  nodes =
    $('#pCC a[href^="index.php?cmd=arena&subcmd=pickmove&slot_id="] img');
  // FSH.arena.nodes = nodes;
  var table = nodes.eq(0).closest('table').parent().closest('table');

  var row = $('<tr/>');
  selectRow = row;
  row.append('<td/>');
  nodes.each(function(i, e) {
    var move = $(e).attr('src');
    if (move.indexOf('bar_icon_holder.jpg') > 0) {
      move = 'x';
    } else {
      move = move.match(/pvp\/(\d+).gif$/)[1];
    }
    // FSH.arena.oldMoves.push(move);
    var html = $(moveOptions);
    $('option[value=' + move + ']', html).prop('selected', true);
    row.append(html);
  });
  table.append(row);

  $('img[src$="pvp/bar_spacer.jpg"]', table)
    .attr({'width': '15', 'height': '50'});

  row = $('<tr><td colspan=32 align=center ' +
    'style="padding-top: 2px;padding-bottom: 2px;">' +
    '<input class="custombutton" value="Update" type="button">' +
    '</td></tr>');
  $('input', row).click(updateMoves);
  table.append(row);
}

function setupMoves() { // jQuery
  var node = $('#pCC b:contains("Setup Combat Moves")');
  if (node.length !== 1) {return;}
  node.addClass('fshLink fshGreen');
  node.click(selectMoves);
}

function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (!isNaN(minLvl) && !isNaN(maxLvl)) {
    opts = opts || {};
    opts.minLvl = minLvl;
    opts.maxLvl = maxLvl;
    ajax.setForage('fsh_arena', opts);
    $('#arenaTypeTabs table[width="635"]').DataTable().draw();
  }
}

function resetLvls() { // jQuery
  opts = opts || {};
  opts.minLvl = dataObj.defaults.arenaMinLvl;
  opts.maxLvl = dataObj.defaults.arenaMaxLvl;
  ajax.setForage('fsh_arena', opts);
  $('#fshMinLvl').val(opts.minLvl);
  $('#fshMaxLvl').val(opts.maxLvl);
  $('#arenaTypeTabs table[width="635"]').DataTable().draw();
}

function hideMoves(evt) { // jQuery
  opts = opts || {};
  opts.hideMoves = evt.target.checked;
  ajax.setForage('fsh_arena', opts);
  $('.moveMax').toggle(!evt.target.checked);
}

function sortHandler(evt) { // jQuery
  var self = $(evt.target).closest('td');
  var table = self.closest('table').DataTable();
  var myCol = self.index();
  var classes = self.attr('class');
  var test = /sorting([^\s]+)/.exec(classes);
  var sortOrder = 'desc';
  if (test && test[1] === '_desc') {sortOrder = 'asc';}
  if (myCol !== 3) {
    table.order([3, 'desc'], [myCol, sortOrder]).draw();
  } else {
    table.order([3, sortOrder]).draw();
  }
}

function filterHeader() { // jQuery

  var theRow = $('#pCC > table > tbody > tr:nth-child(7)');
  theRow.clone().insertBefore(theRow).find('td').attr('height', '2');
  theRow.clone().insertAfter(theRow).find('td').attr('height', '1');

  var aTable = $(arenaFilter);

  var fshHideMoves = $('#fshHideMoves', aTable);
  if (opts && 'hideMoves' in opts) {
    fshHideMoves.prop('checked', opts.hideMoves);
    $('.moveMax').toggle(!opts.hideMoves);
  }
  fshHideMoves.click(hideMoves);

  var fshMinLvl = $('#fshMinLvl', aTable);
  if (opts && 'minLvl' in opts) {
    fshMinLvl.val(opts.minLvl);
  } else {
    fshMinLvl.val(dataObj.defaults.arenaMinLvl);
  }
  var fshMaxLvl = $('#fshMaxLvl', aTable);
  if (opts && 'maxLvl' in opts) {
    fshMaxLvl.val(opts.maxLvl);
  } else {
    fshMaxLvl.val(dataObj.defaults.arenaMaxLvl);
  }
  $('#fshMinLvl, #fshMaxLvl', aTable).keyup(changeLvls);

  $('#fshReset', aTable).click(resetLvls);

  $('td', theRow).append(aTable);

}

function lvlFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, data) {
      if (!opts ||
        !opts.minLvl ||
        !opts.maxLvl) {return true;}
      var min = opts.minLvl;
      var max = opts.maxLvl;
      var level = system.intValue(data[7]);
      if (isNaN(min) && isNaN(max) ||
        isNaN(min) && level <= max ||
        min <= level && isNaN(max) ||
        min <= level && level <= max )
      {return true;}
      return false;
    }
  );
}

function boolData(cell) { // jQuery
  var matches = /(\d)\.gif/.exec($('img', cell).attr('src'));
  if (matches) {cell.attr('data-order', matches[1]);}
}

function maxMoves(cell, row) { // jQuery
  if (!opts || !opts.moves) {return;}
  var matches = /\/pvp\/(\d+)\.gif/.exec($('img', cell).attr('src'));
  if (matches &&
    opts.moves[matches[1]] &&
    opts.moves[matches[1]].count === 3) {
    row.addClass('moveMax');
  }
}

function orderData(i, e) { // jQuery

  var row = $(e);
  var theCells = row.children();

  var cell = theCells.eq(0);
  var matches = /#\s(\d+)/.exec(cell.text());
  if (matches && opts && opts.id) {
    opts.id[matches[1]] = matches[1];
    if (oldIds && !oldIds[matches[1]]) {
      row.css('background-color', '#F5F298');
      row.find('tr').css('background-color', '#F5F298');
    }
  }

  cell = theCells.eq(1);
  matches = /(\d+)\s\/\s(\d+)/.exec(cell.text());
  if (matches) {cell.attr('data-order', matches[2] * 1000 + matches[1] * 1);}

  cell = theCells.eq(2);
  cell.attr('data-order',
    $('td', cell).first().text().replace(/[,\s]/g, ''));

  boolData(theCells.eq(4));
  boolData(theCells.eq(5));
  boolData(theCells.eq(6));
  maxMoves(theCells.eq(8), row);

}

function redoHead(i, e) { // jQuery
  var firstRow = $('tr', e).first();
  $('a', firstRow).contents().unwrap();
  $(e).prepend($('<thead/>').append(firstRow));
}

function process(arena) { // jQuery

  debug.time('arena.process');

  theTables.each(redoHead);
  opts = arena || {};
  oldIds = opts.id || {};
  opts.id = {};
  var myRows = theTables.children('tbody').children('tr');
  myRows.each(orderData);
  filterHeader();
  ajax.setForage('fsh_arena', opts);
  lvlFilter();
  theTables.DataTable(tableOpts);
  $('td[class*="sorting"]', tabs).off('click');
  $('div.dataTables_filter').hide();
  tabs.on('click', 'td[class*="sorting"]', sortHandler);
  tabs.on('click', 'input.custombutton[type="submit"]', dontPost);

  debug.timeEnd('arena.process');

}

function storeMoves() { // jQuery
  ajax.getForage('fsh_arena').done(function(arena) {
    arena = arena || {};
    arena.moves = {};
    var arenaMoves = $('#pCC img[vspace="4"]').slice(1);
    arenaMoves.each(function() {
      var self = $(this);
      var src = self.attr('src');
      var moveId = /(\d+)\.gif/.exec(src)[1];
      arena.moves[moveId] = {};
      arena.moves[moveId].count = /(\d)$/.exec(self.closest('td').html())[1] * 1;
      arena.moves[moveId].href = src;
    });
    ajax.setForage('fsh_arena', arena);
  });
}

function injectArena() { // jQuery
  tabs = $('#arenaTypeTabs');
  if (tabs.length !== 1) {return;} // Join error screen
  theTables = $('table[width="635"]', tabs);
  ajax.getForage('fsh_arena').done(process);
}

export default {
  storeMoves: storeMoves,
  injectArena: injectArena,
  setupMoves: setupMoves,
  completedArenas: completedArenas
};
