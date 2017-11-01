import getForage from './ajax/getForage';
import retryAjax from './ajax/retryAjax';
import setForage from './ajax/setForage';
import {
  createDocument,
  fallback,
  getValue,
  intValue,
  setValue
} from './support/system';
import {defaults, now} from './support/dataObj';

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
    $('img', guildImage).addClass('fshImgCntr');
    onlineData.push([
      guildImage.html(),
      onlinePlayers[player][1],
      onlinePlayers[player][2],
      onlinePlayers[player][3] * 100 +
      onlinePlayers[player][4] + 1,
    ]);
  });
}

function saveVal(key, val) {
  if (!isNaN(val)) {setValue(key, val);}
}

var lvlTests = [
  function(level, min, max) {return isNaN(min) && isNaN(max);},
  function(level, min, max) {return isNaN(min) && level <= max;},
  function(level, min, max) {return min <= level && isNaN(max);},
  function(level, min, max) {return min <= level && level <= max;}
];

function dataTableSearch(_settings, data) { // jQuery
  /* Custom filtering function which will search
  data in column three between two values */
  var min = parseInt($('#fshMinLvl', context).val(), 10); // context
  var max = parseInt($('#fshMaxLvl', context).val(), 10); // context
  saveVal('onlinePlayerMinLvl', min);
  saveVal('onlinePlayerMaxLvl', max);
  var level = fallback(intValue(data[2]), 0);
  for (var i = 0; i < lvlTests.length; i += 1) {
    if (lvlTests[i](level, min, max)) {return true;}
  }
  return false;
}

function filterHeaderOnlinePlayers() { // jQuery
  highlightPlayersNearMyLvl =
    getValue('highlightPlayersNearMyLvl');
  lvlDiffToHighlight = 10;
  levelToTest = intValue($('dt.stat-level:first')
    .next().text());
  var characterVirtualLevel = getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  if (levelToTest <= 205) {lvlDiffToHighlight = 5;}
  $('#fshOutput', context).html( // context
    '<div align=right>' +
    'Min lvl:<input value="' + getValue('onlinePlayerMinLvl') +
      '" size=5 id="fshMinLvl" /> ' +
    'Max lvl:<input value="' + getValue('onlinePlayerMaxLvl') +
      '" size=5 id="fshMaxLvl" /> ' +
    '<input id="fshReset" type="button" value="Reset"/>' +
    '</div><table id="fshInv" class="allow stripe hover"></table>');
}

function gotOnlinePlayers() { // jQuery
  buildOnlinePlayerData();
  $.fn.dataTable.ext.search.push(dataTableSearch);
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
        Math.abs(intValue(data[2]) - levelToTest) <=
        lvlDiffToHighlight) {
        $('td', row).eq(2).addClass('lvlHighlight');
      }
    },
    order: [3, 'desc'],
    stateSave: true,
    stateDuration: 0
  }).api();
}

function checkLastPage() {
  if (onlinePages === lastPage) {
    setForage('fsh_onlinePlayers', onlinePlayers);
    gotOnlinePlayers();
  }
}

function getOnlinePlayers(data) { // Bad jQuery
  $('#fshOutput', context).append(' ' +
    (onlinePages + 1)); // context
  var doc = createDocument(data);
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
      retryAjax('index.php?cmd=onlineplayers&page=' + i).done(getOnlinePlayers);
    }
  }
  checkLastPage();
}

function refreshEvt() { // Bad jQuery
  $('#fshRefresh', context).hide();
  onlinePages = 0;
  onlinePlayers = {};
  retryAjax('index.php?cmd=onlineplayers&page=1').done(getOnlinePlayers);
  setValue('lastOnlineCheck', now);
  $('#fshOutput', context).append('Parsing online players...'); // context
}

function changeLvl(e) { // jQuery
  if (e.target.id === 'fshMinLvl' || e.target.id === 'fshMaxLvl') {
    table.draw();
  }
}

function resetEvt() { // context
  setValue('onlinePlayerMinLvl',
    defaults.onlinePlayerMinLvl);
  setValue('onlinePlayerMaxLvl',
    defaults.onlinePlayerMaxLvl);
  $('#fshMinLvl', context).val(
    defaults.onlinePlayerMinLvl); // context
  $('#fshMaxLvl', context).val(
    defaults.onlinePlayerMaxLvl); // context
  table.draw();
}

function doOnlinePlayerEventHandlers(e) {
  if (e.target.id === 'fshRefresh') {refreshEvt();}
  if (e.target.id === 'fshReset') {resetEvt();}
}

function injectOnlinePlayersNew() { // jQuery
  var lastCheck = getValue('lastOnlineCheck');
  var refreshButton;
  if (now - lastCheck > 300000) {
    refreshButton = '<span> (takes a while to refresh so only do it ' +
      'if you really need to) </span><span id="fshRefresh" class="fshLink"' +
      '>[Refresh]</span>';
  } else {
    refreshButton = '<span>[ Wait ' + Math.round(300 - (now -
      lastCheck) / 1000) + 's ]</span>';
  }
  context.html(
    '<span><b>Online Players</b></span>' + refreshButton +
    '<div id="fshOutput"></div>');
  getForage('fsh_onlinePlayers').done(function(value) {
    onlinePlayers = value || {};
    gotOnlinePlayers();
  });
  context[0].addEventListener('click', doOnlinePlayerEventHandlers);
  context[0].addEventListener('keyup', changeLvl);
}

export default function injectOnlinePlayers(content) { // jQuery
  if (content) {
    context = $(content);
  } else {
    context = $('#pCC');
  }
  injectOnlinePlayersNew();
}
