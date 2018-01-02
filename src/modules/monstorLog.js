import calf from './support/calf';
import {getElementById} from './common/getElement';
import getForage from './ajax/getForage';
import {pCC} from './support/layout';
import reverseSort from './common/reverseSort';
import setForage from './ajax/setForage';
import {addCommas, imageServer, numberSort, stringSort} from './support/system';

var content;
var monsterAry;

function noMobs() {
  content.innerHTML = '<span>No monster information! ' +
    'Please enable entity log and travel a bit to see the world</span>';
}

function mobRows() {
  var result = '';
  for (var i = 0; i < monsterAry.length; i += 1) {
    result += '<tr>' +
      '<td class="fshCenter">' + monsterAry[i].image + '</td>' +
      '<td>' + monsterAry[i].name + '</td>' +
      '<td class="fshCenter">' + monsterAry[i].creature_class + '</td>' +
      '<td class="fshCenter">' + monsterAry[i].level + '</td>' +
      '<td class="fshCenter">' + monsterAry[i].attack + '</td>' +
      '<td class="fshCenter">' + monsterAry[i].defense + '</td>' +
      '<td class="fshCenter">' + monsterAry[i].armor + '</td>' +
      '<td class="fshCenter">' + monsterAry[i].damage + '</td>' +
      '<td class="fshCenter">' + monsterAry[i].hp + '</td>' +
      '<td class="fshCenter">' + monsterAry[i].enhancements + '</td></tr>';
  }
  return result;
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
  var headerClicked = target.getAttribute('sortKey');
  if (typeof calf.sortAsc === 'undefined') {calf.sortAsc = true;}
  if (reverseSort(headerClicked)) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
  var sortType = findSortType(target);
  sortMonsterAry(sortType);
  drawMobs();
}

function doHandlers(evt) {
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
  content.addEventListener('click', doHandlers);
}

function hazEnhancements(enhancements) {
  return enhancements && enhancements.length > 0;
}

function prepMonster(data) {
  monsterAry = Object.keys(data).reduce(function(prev, curr) {
    var tmpObj = data[curr];
    tmpObj.name = curr;
    tmpObj.image = '<img class="tip-static" src="' + imageServer +
      '/creatures/' + tmpObj.image_id + '.jpg" data-tipped="<img src=\'' +
      imageServer + '/creatures/' + tmpObj.image_id +
      '.jpg\' width=200 height=200>" width=40 height=40>';
    tmpObj.level = addCommas(tmpObj.level);
    tmpObj.attack = tmpObj.attack.min + ' - ' + tmpObj.attack.max;
    tmpObj.defense = tmpObj.defense.min + ' - ' + tmpObj.defense.max;
    tmpObj.armor = tmpObj.armor.min + ' - ' + tmpObj.armor.max;
    tmpObj.damage = tmpObj.damage.min + ' - ' + tmpObj.damage.max;
    tmpObj.hp = tmpObj.hp.min + ' - ' + tmpObj.hp.max;
    var enhancements;
    if (tmpObj.enhancements) {enhancements = Object.keys(tmpObj.enhancements);}
    if (hazEnhancements(enhancements)) {
      var tmp = '<span class="fshXXSmall">';
      tmp += enhancements.reduce(function(_prev, _curr) {
        return _prev + '<span class="fshNoWrap">' + _curr + ': ' +
          tmpObj.enhancements[_curr].min + ' - ' +
          tmpObj.enhancements[_curr].max + '</span><br>';
      }, '');
      tmpObj.enhancements = tmp.slice(0, -4) + '</span>';
    } else {
      tmpObj.enhancements = '<span class="fshGrey">**Missing**</span>';
    }
    prev.push(tmpObj);
    return prev;
  }, []);
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

export default function injectMonsterLog(injector) {
  content = injector || pCC;
  if (!content) {return;}
  getForage('fsh_monsterLog').done(prepAry);
}
