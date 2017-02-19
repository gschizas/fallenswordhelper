import calf from './support/calf';
import * as ajax from './support/ajax';
import * as layout from './support/layout';
import * as system from './support/system';

var monsterAry;

function noMobs() {
  layout.pCC.innerHTML = '<span>No monster information! ' +
    'Please enable entity log and travel a bit to see the world</span>';
}

function drawMobs() {
  var inject = document.getElementById('entityTableOutput');
  if (!monsterAry || !inject) {return;}
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
  inject.innerHTML = result;
}

function doHandlers(evt) {
  var target = evt.target;
  if (target.id === 'clearEntityLog') {
    ajax.setForage('fsh_monsterLog', '');
    noMobs();
    return;
  }
  if (!target.classList.contains('fshLink')) {return;}
  var headerClicked = target.getAttribute('sortKey');
  var sortType = target.getAttribute('sortType');
  if (!sortType) {sortType='string';}
  if (calf.sortAsc === undefined) {calf.sortAsc = true;}
  if (calf.sortBy && calf.sortBy === headerClicked) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
  monsterAry.sort(sortType === 'string' ? system.stringSort :
    system.numberSort);
  drawMobs();
}

function drawTable() {
  var content = layout.pCC;
  if (!monsterAry || !content) {return;}
  content.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" ' +
    'width="100%"><tr class="fshBlack fshWhite">' +
    '<td width="90%" class="fshCenter"><b>Entity Information</b></td>' +
    '<td width="10%">[<span id="clearEntityLog" class="buffLink">Clear' +
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

function prepMonster(data) {
  monsterAry = Object.keys(data).reduce(function(prev, curr) {
    var tmpObj = data[curr];
    tmpObj.name = curr;
    tmpObj.image = '<img class="tip-static" src="' + system.imageServer +
      '/creatures/' + tmpObj.image_id + '.jpg" data-tipped="<img src=\'' +
      system.imageServer + '/creatures/' + tmpObj.image_id +
      '.jpg\' width=200 height=200>" width=40 height=40>';
    tmpObj.level = system.addCommas(tmpObj.level);
    tmpObj.attack = tmpObj.attack.min + ' - ' + tmpObj.attack.max;
    tmpObj.defense = tmpObj.defense.min + ' - ' + tmpObj.defense.max;
    tmpObj.armor = tmpObj.armor.min + ' - ' + tmpObj.armor.max;
    tmpObj.damage = tmpObj.damage.min + ' - ' + tmpObj.damage.max;
    tmpObj.hp = tmpObj.hp.min + ' - ' + tmpObj.hp.max;
    if (tmpObj.enhancements) {
      var tmp = '<span class="fshXXSmall">';
      tmp += Object.keys(tmpObj.enhancements).reduce(function(prev, curr) {
        return prev + '<span class="fshNoWrap">' + curr + ': ' +
          tmpObj.enhancements[curr].min + ' - ' +
          tmpObj.enhancements[curr].max + '</span><br>';
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
  monsterAry.sort(system.numberSort);
  drawTable();
  drawMobs();
}

export function injectMonsterLog() {
  ajax.getForage('fsh_monsterLog').done(prepAry);
}
