import * as ajax from './support/ajax';
import * as dataObj from './support/dataObj';
import * as system from './support/system';

var context;
var onlinePlayers;
var onlineData;
var highlightPlayersNearMyLvl;
var lvlDiffToHighlight;
var levelToTest;
var onlinePages;
var lastPage;
var table;

function buildOnlinePlayerData() { // jQuery
  onlineData = [];
  Object.keys(onlinePlayers).forEach(function(player) {
    var guildImage = $('<div/>')
      .append(onlinePlayers[player][0]);
    $('img', guildImage).addClass('center');
    onlineData.push([
      guildImage.html(),
      onlinePlayers[player][1],
      onlinePlayers[player][2],
      onlinePlayers[player][3] * 100 +
      onlinePlayers[player][4] + 1,
    ]);
  });
}

function dataTableSearch() { // jQuery
  /* Custom filtering function which will search
  data in column three between two values */
  $.fn.dataTable.ext.search.push(
    function(_settings, data) {
      var min = parseInt($('#fshMinLvl', context).val(), 10); // context
      var max = parseInt($('#fshMaxLvl', context).val(), 10); // context
      if (!isNaN(min)) {system.setValue('onlinePlayerMinLvl', min);}
      if (!isNaN(max)) {system.setValue('onlinePlayerMaxLvl', max);}
      var level = system.intValue(data[2]) || 0; // use data for the level column
      if (isNaN(min) && isNaN(max) ||
        isNaN(min) && level <= max ||
        min <= level && isNaN(max) ||
        min <= level && level <= max) {return true;}
      return false;
    }
  );
}

function filterHeaderOnlinePlayers() { // jQuery
  highlightPlayersNearMyLvl =
    system.getValue('highlightPlayersNearMyLvl');
  lvlDiffToHighlight = 10;
  levelToTest = system.intValue($('dt.stat-level:first')
    .next().text());
  var characterVirtualLevel = system.getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  if (levelToTest <= 205) {lvlDiffToHighlight = 5;}
  $('#fshOutput', context).html( // context
    '<div align=right>' +
    'Min lvl:<input value="' + system.getValue('onlinePlayerMinLvl') +
      '" size=5 id="fshMinLvl" /> ' +
    'Max lvl:<input value="' + system.getValue('onlinePlayerMaxLvl') +
      '" size=5 id="fshMaxLvl" /> ' +
    '<input id="fshReset" type="button" value="Reset"/>' +
    '</div><table id="fshInv" class="allow stripe hover"></table>');
}

function gotOnlinePlayers() { // jQuery
  buildOnlinePlayerData();
  dataTableSearch();
  filterHeaderOnlinePlayers();

  table = $('#fshInv', context).dataTable({ // context
    data: onlineData,
    pageLength: 30,
    lengthMenu: [[30, 60, -1], [30, 60, 'All']],
    columns: [
      {title: 'Guild', 'class': 'dt-center', orderable: false},
      {title: 'Name', 'class': 'dt-center'},
      {title: 'Level', 'class': 'dt-center'},
      {title: 'Page/Index', 'class': 'dt-center'}
    ],
    createdRow: function(row, data) {
      if (highlightPlayersNearMyLvl &&
        Math.abs(system.intValue(data[2]) - levelToTest) <=
        lvlDiffToHighlight) {
        $('td', row).eq(2).addClass('lvlHighlight');
      }
    },
    order: [3, 'desc'],
    stateSave: true,
    stateDuration: 0
  }).api();
}

function getOnlinePlayers(data) { // Bad jQuery
  $('#fshOutput', context).append(' ' +
    (onlinePages + 1)); // context
  var doc = system.createDocument(data);
  var input = $('#pCC input.custominput', doc).first();
  var thePage = input.attr('value');
  var theRows = $('#pCC img[src$="/skin/icon_action_view.gif',
    doc).parent().parent().parent();
  theRows.each(function(index, element) {
    var tds = $('td', $(element));
    var player = tds.eq(1).text();
    if (onlinePlayers[player] &&
        onlinePlayers[player][3] > thePage) {return;}
    onlinePlayers[player] = [
      tds.eq(0).html(),
      tds.eq(1).html(),
      tds.eq(2).text(),
      thePage,
      index
    ];
  });
  onlinePages += 1;
  if (onlinePages === 1) {
    input = input.parent().text();
    lastPage = parseInt(input.match(/(\d+)/g)[0], 10);
    for (var i = 2; i <= lastPage; i += 1) {
      $.get('index.php?cmd=onlineplayers&page=' + i,
        getOnlinePlayers);
    }
  } else if (onlinePages === lastPage) {
    ajax.setForage('fsh_onlinePlayers', onlinePlayers);
    gotOnlinePlayers();
  }
}

function refreshEvt() { // Bad jQuery
  $('#fshRefresh', context).hide();
  onlinePages = 0;
  onlinePlayers = {};
  $.get('index.php?cmd=onlineplayers&page=1', getOnlinePlayers);
  system.setValue('lastOnlineCheck', Date.now());
  $('#fshOutput', context).append('Parsing online players...'); // context
}

function changeLvl(e) { // jQuery
  if (e.target.id === 'fshMinLvl' || e.target.id === 'fshMaxLvl') {
    table.draw();
  }
}

function resetEvt() { // context
  system.setValue('onlinePlayerMinLvl',
    dataObj.defaults.onlinePlayerMinLvl);
  system.setValue('onlinePlayerMaxLvl',
    dataObj.defaults.onlinePlayerMaxLvl);
  $('#fshMinLvl', context).val(
    dataObj.defaults.onlinePlayerMinLvl); // context
  $('#fshMaxLvl', context).val(
    dataObj.defaults.onlinePlayerMaxLvl); // context
  table.draw();
}

function doOnlinePlayerEventHandlers(e) { // Native
  if (e.target.id === 'fshRefresh') {refreshEvt();}
  if (e.target.id === 'fshReset') {resetEvt();}
}

function injectOnlinePlayersNew() { // jQuery
  var lastCheck = system.getValue('lastOnlineCheck');
  var now = Date.now();
  var refreshButton;
  if (now - lastCheck > 300000) {
    refreshButton = '<span> (takes a while to refresh so only do it ' +
      'if you really need to) </span><span id="fshRefresh"' +
      '>[Refresh]</span>';
  } else {
    refreshButton = '<span>[ Wait ' + Math.round(300 - (now -
      lastCheck) / 1000) + 's ]</span>';
  }
  context.html(
    '<span><b>Online Players</b></span>' + refreshButton +
    '<div id="fshOutput"></div>');
  ajax.getForage('fsh_onlinePlayers').done(function(value) {
    onlinePlayers = value || {};
    gotOnlinePlayers();
  });
  context[0].addEventListener('click', doOnlinePlayerEventHandlers);
  context[0].addEventListener('keyup', changeLvl);
}

export function injectOnlinePlayers(content) { // jQuery
  context = content ? $(content) : $('#pCC');
  injectOnlinePlayersNew();
}
