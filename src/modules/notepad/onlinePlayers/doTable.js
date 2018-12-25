import currentGuildId from '../../common/currentGuildId';
import getValue from '../../system/getValue';
import intValue from '../../system/intValue';
import {
  pvpLowerLevel,
  pvpUpperLevel
} from '../../common/levelHighlight';

var highlightPlayersNearMyLvl;
var table;

function guildNumber(html) {
  var match = html.match(/;guild_id=([0-9]+)"/);
  if (match) {return Number(match[1]);}
}

var highlightTests = [
  function() {return highlightPlayersNearMyLvl;},
  function(data) {return guildNumber(data[0]) !== currentGuildId();},
  function(data) {return intValue(data[2]) >= pvpLowerLevel;},
  function(data) {return intValue(data[2]) <= pvpUpperLevel;}
];

function pvpHighlight(data) {
  return highlightTests.every(function(el) {
    return el(data);
  });
}

function createdRow(row, data) {
  if (pvpHighlight(data)) {
    $('td', row).eq(2).addClass('lvlHighlight');
  }
}

function tableOpts(onlineData) {
  return {
    columns: [
      {title: 'Guild', 'class': 'dt-center', orderable: false},
      {title: 'Name', 'class': 'dt-center'},
      {title: 'Level', 'class': 'dt-center'},
      {title: 'Page/Index', 'class': 'dt-center'}
    ],
    createdRow: createdRow,
    data: onlineData,
    deferRender: true,
    lengthMenu: [[30, 60, -1], [30, 60, 'All']],
    order: [3, 'desc'],
    pageLength: 30,
    stateDuration: 0,
    stateSave: true
  };
}

export function doTable(context, onlineData) {
  highlightPlayersNearMyLvl = getValue('highlightPlayersNearMyLvl');
  table = $('#fshInv', context).DataTable(tableOpts(onlineData));
}

export function tableDraw() {
  table.draw();
}
