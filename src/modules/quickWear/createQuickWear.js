import {createDiv, createTBody, createTable} from '../common/cElement';
import * as layout from '../support/layout';
import * as system from '../support/system';

function alpha(a, b) {
  if (a.n.toLowerCase() < b.n.toLowerCase()) {return -1;}
  if (a.n.toLowerCase() > b.n.toLowerCase()) {return 1;}
  return 0;
}

function isUseable(item) {
  if ([10, 12, 15, 16].indexOf(item.t) !== -1 ||
      item.n === 'Zombie Coffin') {
    return 'smallLink';
  }
  return 'notLink';
}

function itemImage(item) {
  var ret = system.imageServer + '/';
  if (item.b === 13699) {
    ret += 'composing/potions/' + item.extra.design + '_' +
      item.extra.color + '.gif';
  } else {
    ret += 'items/' + item.b + '.gif';
  }
  return ret;
}

function tableRows(tbl, playerId, item) {
  var newRow = tbl.insertRow(-1);
  item.dom = newRow;
  var equipClass = 'fshEq ';
  var useClass = 'fshUse ';
  if (item.t < 9) {equipClass += 'smallLink';} else {equipClass += 'notLink';}
  useClass += isUseable(item);
  newRow.innerHTML = '<td class="fshCenter"><span class="' + equipClass +
    '" data-itemid="' + item.a + '">Wear</span>&nbsp;|&nbsp;<span class="' +
    useClass + '" data-itemid="' + item.a +
    '">Use/Ext</span></td><td><img src="' + itemImage(item) + '" ' +
    'class="tip-dynamic" data-tipped="fetchitem.php?item_id=' + item.b +
    '&amp;inv_id=' + item.a + '&amp;t=1&amp;p=' + playerId + '&amp;' +
    'currentPlayerId=' + playerId + '" width="30" height="30" border="0">' +
    '</td><td width="90%">&nbsp;' + item.n + '</td>';
}

function makeFolderSpans(appInv) {
  return '<span class="fshLink folder" data-folder="0">All</span>' +
    ' &ensp;<span class="fshLink folder" data-folder="-1">Main</span>' +
    appInv.result.reduce(function(prev, folderObj) {
      return prev + ' &ensp;<span class="fshLink fshNoWrap folder" ' +
        'data-folder="' + folderObj.id.toString() + '">' +
        folderObj.name + '</span>';
    }, '');
}

export default function createQuickWear(appInv) {
  var playerId = layout.playerId();
  var tbl = createTable({
    width: '100%',
    innerHTML: '<thead><tr><th class="fshCenter" colspan="3">' +
      makeFolderSpans(appInv) + '</th></tr>' +
      '<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th>' +
      '<th colspan="2">Items</th></tr></thead>'
  });
  var tbody = createTBody();
  tbl.appendChild(tbody);
  appInv.result.forEach(function(aFolder) {
    aFolder.items.sort(alpha);
    aFolder.items.forEach(tableRows.bind(null, tbody, playerId));
  });
  var qw = createDiv({
    id: 'invTabs-qw',
    className: 'ui-tabs-panel ui-corner-bottom'
  });
  qw.appendChild(tbl);
  return qw;
}
