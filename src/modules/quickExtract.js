import {createTable} from './common/cElement';
import getInventory from './ajax/getInventory';
import {useItem} from './support/ajax';
import * as layout from './support/layout';
import * as system from './support/system';

var extTbl;
var playerId;
var extractInv;
var selectST;
var selectMain;
var resourceList;
var buyResult;
var cn;

function backpackRemove(invId) {
  extractInv.some(function(el, i, ary) {
    if (el.inv_id === invId) {
      ary.splice(i, 1);
      return true;
    }
    return false;
  });
}

function quickDoneExtracted(invId, data) {
  if (data.r !== 0) {return;}
  backpackRemove(invId);
  cn += 1;
  buyResult.insertAdjacentHTML('beforeend', '<br>' + cn + '. ' + data.m);
}

function doExtract(target) {
  var InventoryIDs = resourceList[target.id.replace('fshExtr', '')].invIDs;
  target.parentNode.innerHTML = 'extracting all ' +
    InventoryIDs.length + ' resources';
  cn = 0;
  for (var i = 0; i < InventoryIDs.length; i += 1) {
    useItem(InventoryIDs[i])
      .done(quickDoneExtracted.bind(null, InventoryIDs[i]));
  }
}

function extractAllSimilar(evt) {
  layout.confirm('Extract Resources',
    'Are you sure you want to extract all similar items?',
    doExtract.bind(null, evt.target)
  );
}

function checkFlags(item) {
  return selectMain && item.folder_id !== '-1' ||
    !selectST && item.is_in_st;
}

function resources(prev, item) {
  if (checkFlags(item)) {return prev;}
  if (prev[item.item_id]) {
    prev[item.item_id].invIDs.push(item.inv_id);
  } else {
    prev[item.item_id] = {
      invIDs: [item.inv_id],
      inv_id: item.inv_id,
      item_name: item.item_name
    };
  }
  return prev;
}

function tableRows(prev, item_id) {
  var res = resourceList[item_id];
  return prev + '<tr><td class="fshCenter"><span class="smallLink"' +
    ' id="fshExtr' + item_id +
    '">Extract all ' + res.invIDs.length + '</span></td>' +
    '<td><img src="' + system.imageServer + '/items/' +
    item_id + '.gif" class="tip-dynamic" data-tipped="' +
    'fetchitem.php?item_id=' + item_id + '&inv_id=' +
    res.inv_id + '&t=1&p=' + playerId +
    '" border=0></td><td>' + res.item_name + '</td></tr>';
}

function showQuickExtract() {
  resourceList = extractInv.reduce(resources, {});
  var output = '<tr><th width="20%">Actions</th><th>Items</th></tr>' +
    '<tr><td id="qeresult" colspan="2"></td></tr>';
  output += Object.keys(resourceList).reduce(tableRows, '');
  extTbl.innerHTML = output;
  buyResult = document.getElementById('qeresult');
}

function isExtractable(curr) {
  return curr.item_name === 'Zombie Coffin' ||
    curr.type === '12' ||
    curr.type === '16';
}

function prepInv(data) {
  playerId = data.player_id;
  extractInv = data.items.reduce(function(prev, curr) {
    if (isExtractable(curr)) {prev.push(curr);}
    return prev;
  }, []);
  showQuickExtract();
}

var extractEvents = [
  {
    test: function(e) {return e.target.id === 'fshInSt';},
    fn: function() {
      selectST = !selectST;
      showQuickExtract();
    }
  },
  {
    test: function(e) {return e.target.id === 'fshInMain';},
    fn: function() {
      selectMain = !selectMain;
      showQuickExtract();
    }
  },
  {
    test: function(e) {return e.target.id.indexOf('fshExtr') === 0;},
    fn: function(e) {
      extractAllSimilar(e);
    }
  }
];

function listen(e) {
  for (var i = 0; i < extractEvents.length; i += 1) {
    if (extractEvents[i].test(e)) {
      extractEvents[i].fn(e);
      return;
    }
  }
}

export default function insertQuickExtract(injector) { // jQuery.min
  var content = injector || layout.pCC;
  content.innerHTML = '<div class="qeHead"><b>Quick Extract</b></div>' +
    'Select which type of plants you wish to extract all of. Only ' +
    'select extractable resources.<br>' +
    '<label><input type="checkbox" id="fshInSt" checked>' +
    ' Select items in ST</label>&nbsp;&nbsp;' +
    '<label><input type="checkbox" id="fshInMain" checked>' +
    ' Only extract items in Main Folder</label>';
  extTbl = createTable({width: '100%'});
  content.appendChild(extTbl);
  selectST = true;
  selectMain = true;
  content.addEventListener('click', listen);
  getInventory().done(prepInv);
}
