import buildHtml from './buildHtml';
import calf from '../../support/calf';
import doSortParams from '../../common/doSortParams';
import {getElementById} from '../../common/getElement';
import getForage from '../../ajax/getForage';
import jQueryPresent from '../../common/jQueryPresent';
import numberSort from '../../system/numberSort';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import setForage from '../../ajax/setForage';
import stringSort from '../../system/stringSort';

var content;
var monsterAry;

function noMobs() {
  content.innerHTML = '<span>No monster information! ' +
    'Please enable entity log and travel a bit to see the world</span>';
}

function makeRow(el) {
  return '<tr>' +
    '<td class="fshCenter">' + el.image + '</td>' +
    '<td>' + el.name + '</td>' +
    '<td class="fshCenter">' + el.creature_class + '</td>' +
    '<td class="fshCenter">' + el.level + '</td>' +
    '<td class="fshCenter">' + el.attack + '</td>' +
    '<td class="fshCenter">' + el.defense + '</td>' +
    '<td class="fshCenter">' + el.armor + '</td>' +
    '<td class="fshCenter">' + el.damage + '</td>' +
    '<td class="fshCenter">' + el.hp + '</td>' +
    '<td class="fshCenter">' + el.enhancements + '</td></tr>';
}

function mobRows() {
  return monsterAry.map(makeRow).join('');
}

function drawMobs() {
  var inject = getElementById('entityTableOutput');
  if (!monsterAry || !inject) {return;}
  inject.innerHTML = mobRows();
}

function findSortType(target) {
  return target.getAttribute('sortType') || 'string';
}

function sortMonsterAry(sortType) {
  if (sortType === 'string') {
    monsterAry.sort(stringSort);
  } else {
    monsterAry.sort(numberSort);
  }
}

function sortCol(target) {
  doSortParams(target.getAttribute('sortKey'));
  var sortType = findSortType(target);
  sortMonsterAry(sortType);
  drawMobs();
}

function doHandlers(evt) { // jQuery.min
  var target = evt.target;
  if (target.id === 'clearEntityLog') {
    setForage('fsh_monsterLog', '');
    noMobs();
    return;
  }
  if (!target.classList.contains('fshLink')) {return;}
  sortCol(target);
}

function drawTable() {
  if (!monsterAry) {return;}
  content.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" ' +
    'width="100%"><tr class="fshBlack fshWhite">' +
    '<td width="90%" class="fshCenter"><b>Entity Information</b></td>' +
    '<td width="10%">[<span id="clearEntityLog" class="fshPoint">Clear' +
    '</span>]</td></tr></table>' +
    '<table cellspacing="1" cellpadding="2" border="0"><thead>' +
    '<tr class="fshVerySoftOrange">' +
    '<th width="25%" class="fshLink" sortkey="name" colspan="2">Entity</th>' +
    '<th class="fshCenter fshLink" sortkey="creature_class">Class</th>' +
    '<th class="fshCenter fshLink" sortkey="level" sorttype="number">Lvl</th>' +
    '<th class="fshCenter">Attack</th>' +
    '<th class="fshCenter">Defence</th>' +
    '<th class="fshCenter">Armor</th>' +
    '<th class="fshCenter">Damage</th>' +
    '<th class="fshCenter">HP</th>' +
    '<th class="fshCenter">Enhancements</th>' +
    '</tr></thead><tbody id="entityTableOutput"></tbody></table>';
  on(content, 'click', doHandlers);
}

function prepMonster(data) {
  monsterAry = Object.keys(data).map(partial(buildHtml, data));
}

function prepAry(data) {
  if (!data || data === '') {
    noMobs();
    return;
  }
  prepMonster(data);
  calf.sortBy = 'level';
  calf.sortAsc = true;
  monsterAry.sort(numberSort);
  drawTable();
  drawMobs();
}

function haveJquery(injector) { // jQuery.min
  content = injector || pCC;
  if (!content) {return;}
  getForage('fsh_monsterLog').done(prepAry);
}

export default function injectMonsterLog(injector) {
  if (jQueryPresent()) {haveJquery(injector);}
}
