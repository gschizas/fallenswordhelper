import './createQuickWear.postcss';
import calf from '../../support/calf';
import {cdn} from '../../system/system';
import insertElement from '../../common/insertElement';
import makeFolderSpan from '../../common/makeFolderSpan';
import partial from '../../common/partial';
import playerId from '../../common/playerId';
import stringSort from '../../system/stringSort';
import {createDiv, createTBody, createTable} from '../../common/cElement';

function initSort() {
  calf.sortBy = 'n';
  calf.sortAsc = true;
}

function isUseable(item) {
  if ([10, 12, 15, 16].indexOf(item.t) !== -1 ||
      item.n === 'Zombie Coffin') {
    return 'smallLink';
  }
  return 'notLink';
}

function itemImage(item) {
  var ret = cdn;
  if (item.b === 13699) {
    ret += 'composing/' + item.extra.design + '_' +
      item.extra.color + '.png';
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
  return makeFolderSpan(String(folderObj.id), folderObj.name);
}

function makeFolderSpans(appInv) {
  return makeFolderSpan('0', 'All') + appInv.r.map(folderHtml).join('');
}

function addRows(tbody, currentPlayerId, aFolder) {
  aFolder.items.sort(stringSort)
    .forEach(partial(tableRows, tbody, currentPlayerId));
}

function makeQwTable(appInv) {
  var tbl = createTable({
    width: '100%',
    innerHTML: '<thead><tr><th class="fshCenter" colspan="3">' +
      makeFolderSpans(appInv) + '</th></tr>' +
      '<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th>' +
      '<th colspan="2">Items</th></tr></thead>'
  });
  var tbody = createTBody();
  insertElement(tbl, tbody);
  initSort();
  appInv.r.forEach(partial(addRows, tbody, playerId()));
  return tbl;
}

export default function createQuickWear(appInv) {
  var tbl = makeQwTable(appInv);
  var qw = createDiv();
  insertElement(qw, tbl);
  return qw;
}
