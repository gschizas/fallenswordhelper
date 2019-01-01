import add from '../support/task';
import calf from '../support/calf';
import {createTr} from '../common/cElement';
import {defaults} from '../support/dataObj';
import doFolders from './doFolders';
import fallback from '../system/fallback';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import insertElementBefore from '../common/insertElementBefore';
import jsonParse from '../common/jsonParse';
import on from '../common/on';

function getHowMany(itemTables) {
  var howMany = parseInt(getElementById('fshSendHowMany').value, 10);
  if (isNaN(howMany)) {return itemTables.length;}
  // maximum of 100 items in an ST
  if (calf.subcmd !== '-') {return Math.min(100, howMany);}
  return howMany;
}

function itemType(itemid, checkbox) {
  return itemid === 'itemid-2' && checkbox.classList.contains('itemtype12');
}

function shouldBeChecked(itemid, checkbox) {
  return itemid === 'itemid-1' ||
    itemType(itemid, checkbox) ||
    checkbox.classList.contains(itemid);
}

function canBeChecked(howMany, itemsInSt, el, itemid, checkbox) {
  return howMany &&
    fallback(itemsInSt, !el.classList.contains('isInST')) &&
    shouldBeChecked(itemid, checkbox);
}

function findStCheck() {
  var cbox = getElementById('itemsInSt');
  if (cbox) {return cbox.checked;}
}

function doCheckAll(evt) {
  var itemid = evt.target.id;
  var itemList = getElementById('item-div') ||
    getElementById('item-list');
  var itemTables = itemList.querySelectorAll('table:not(.fshHide)');
  var howMany = getHowMany(itemTables);
  var itemsInSt = findStCheck();
  Array.prototype.forEach.call(itemTables, function(el) {
    var checkbox = el.children[0].lastElementChild.children[0].children[0];
    if (canBeChecked(howMany, itemsInSt, el, itemid, checkbox)) {
      checkbox.checked = true;
      howMany -= 1;
      return;
    }
    checkbox.checked = false;
  });
}

function toggleAllPlants(evt) {
  if (evt.target.classList.contains('fshCheckAll')) {doCheckAll(evt);}
}

function getItemList() {
  var sendClasses = getValue('sendClasses');
  var itemList = jsonParse('[' + sendClasses + ']');
  if (itemList) {return itemList;}
  return jsonParse('[' + defaults.sendClasses + ']');
}

function injectTradeOld() {
  var myTd = '<td colspan=6>Select:&ensp;<span id="itemid-1" ' +
    'class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;' +
    '<span id="itemid-2" ' +
    'class="fshCheckAll fshLink fshNoWrap">All Resources</span>';
  var itemList = getItemList();
  itemList.forEach(function(el) {
    myTd += ' &ensp;<span id="itemid' + el[1] +
      '" class="fshCheckAll fshLink fshNoWrap">' + el[0] + '</span>';
  });
  myTd += ' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" ' +
    'class="custominput" value="all" size=3></td>';
  var multiple = createTr({
    id: 'fshSelectMultiple',
    innerHTML: myTd
  });
  on(multiple, 'click', toggleAllPlants);
  var el = getElementById('item-list').parentNode.parentNode;
  insertElementBefore(multiple, el);
}

export default function injectTrade() {
  add(3, doFolders);
  add(3, injectTradeOld);
}
