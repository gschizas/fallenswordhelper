import {beginFolderSpanElement} from '../../support/constants';
import calf from '../../support/calf';
import {imageServer} from '../../system/system';
import insertElement from '../../common/insertElement';
import partial from '../../common/partial';
import playerId from '../../common/playerId';
import stringSort from '../../system/stringSort';
import {createDiv, createTBody, createTable} from '../../common/cElement';

function isUseable(item) {
  if ([10, 12, 15, 16].indexOf(item.t) !== -1 ||
      item.n === 'Zombie Coffin') {
    return 'smallLink';
  }
  return 'notLink';
}

function itemImage(item) {
  var ret = imageServer + '/';
  if (item.b === 13699) {
    ret += 'composing/potions/' + item.extra.design + '_' +
      item.extra.color + '.gif';
  } else {
    ret += 'items/' + item.b + '.gif';
  }
  return ret;
}

function tableRows(tbl, currentPlayerId, item) {
  var newRow = tbl.insertRow(-1);
  item.dom = newRow;
  var equipClass = 'fshEq ';
  var useClass = 'fshUse ';
  if (item.t < 9) {equipClass += 'smallLink';} else {equipClass += 'notLink';}
  useClass += isUseable(item);
  newRow.innerHTML = '<td class="fshCenter"><span class="' + equipClass +
    '" data-itemid="' + item.a + '">Wear</span>&nbsp;|&nbsp;<span class="' +
    useClass + '" data-itemid="' + item.a +
    '">Use/Ext</span></td><td><img src="' + itemImage(item) +
    '" class="tip-dynamic" data-tipped="fetchitem.php?item_id=' + item.b +
    '&amp;inv_id=' + item.a + '&amp;t=1&amp;p=' + currentPlayerId +
    '&amp;currentPlayerId=' + currentPlayerId +
    '" width="30" height="30" border="0"></td><td width="90%">&nbsp;' +
    item.n + '</td>';
}

function folderHtml(folderObj) {
  return ' &ensp;' + beginFolderSpanElement + String(folderObj.id) + '">' +
    folderObj.name + '</span>';
}

function makeFolderSpans(appInv) {
  return beginFolderSpanElement + '0">All</span>' +
    appInv.r.map(folderHtml).join('');
}

function sortedRows(tbody, currentPlayerId, aFolder) {
  aFolder.items.sort(stringSort);
  aFolder.items.forEach(partial(tableRows, tbody, currentPlayerId));
}

export default function createQuickWear(appInv) {
  var tbl = createTable({
    width: '100%',
    innerHTML: '<thead><tr><th class="fshCenter" colspan="3">' +
      makeFolderSpans(appInv) + '</th></tr>' +
      '<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th>' +
      '<th colspan="2">Items</th></tr></thead>'
  });
  var tbody = createTBody();
  insertElement(tbl, tbody);
  calf.sortBy = 'n';
  calf.sortAsc = true;
  appInv.r.forEach(partial(sortedRows, tbody, playerId()));
  var qw = createDiv({
    id: 'invTabs-qw',
    className: 'ui-tabs-panel ui-corner-bottom'
  });
  insertElement(qw, tbl);
  return qw;
}
