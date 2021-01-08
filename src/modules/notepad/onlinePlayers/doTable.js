import currentGuildId from '../../common/currentGuildId';
import getValue from '../../system/getValue';
import { guildRE } from '../../support/constants';
import intValue from '../../system/intValue';
import { getLowerPvpLevel, getUpperPvpLevel } from '../../common/levelHighlight';

let highlightPlayersNearMyLvl;
let table;

function guildNumber(html) {
  const match = html.match(guildRE);
  if (match) { return Number(match[1]); }
}

const highlightTests = [
  () => highlightPlayersNearMyLvl,
  (data) => guildNumber(data[0]) !== currentGuildId(),
  (data) => intValue(data[2]) >= getLowerPvpLevel(),
  (data) => intValue(data[2]) <= getUpperPvpLevel(),
];

function pvpHighlight(data) {
  return highlightTests.every((el) => el(data));
}

function createdRow(row, data) {
  if (pvpHighlight(data)) {
    $('td', row).eq(2).addClass('lvlHighlight');
  }
}

function tableOpts(onlineData) {
  return {
    columns: [
      { title: 'Guild', class: 'dt-center', orderable: false },
      { title: 'Name', class: 'dt-center' },
      { title: 'Level', class: 'dt-center' },
      { title: 'Page/Index', class: 'dt-center' },
    ],
    createdRow,
    data: onlineData,
    deferRender: true,
    lengthMenu: [[30, 60, -1], [30, 60, 'All']],
    order: [3, 'desc'],
    pageLength: 30,
    stateDuration: 0,
    stateSave: true,
  };
}

export function doTable(context, onlineData) {
  highlightPlayersNearMyLvl = getValue('highlightPlayersNearMyLvl');
  table = $('#fshInv', context).DataTable(tableOpts(onlineData));
}

export function tableDraw() {
  table.draw();
}
