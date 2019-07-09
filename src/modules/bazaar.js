import {daBazaarBuy} from './_dataAccess/_dataAccess';
import getArrayByTagName from './common/getArrayByTagName';
import {getElementById} from './common/getElement';
import getElementsByTagName from './common/getElementsByTagName';
import getText from './common/getText';
import insertElement from './common/insertElement';
import insertHtmlBeforeEnd from './common/insertHtmlBeforeEnd';
import jQueryNotPresent from './common/jQueryNotPresent';
import jsonFail from './common/jsonFail';
import on from './common/on';
import outputResult from './common/outputResult';
import {pCC} from './support/layout';
import setText from './common/setText';
import testQuant from './system/testQuant';

var ItemId;
var bazaarTable =
  '<table id="fshBazaar"><tr><td colspan="5">Select an item to quick-buy:' +
  '</td></tr><tr><td colspan="5">Select how many to quick-buy</td></tr>' +
  '<tr><td colspan="5"><input id="buy_amount" class="fshNumberInput" ' +
  'type="number" min="0" max="99" value="1"></td></tr><tr><td>@0@</td>' +
  '<td>@1@</td><td>@2@</td><td>@3@</td><td>@4@</td></tr><tr><td>@5@</td>' +
  '<td>@6@</td><td>@7@</td><td>@8@</td><td>@9@</td></tr><tr>' +
  '<td colspan="3">Selected item:</td><td id="selectedItem" colspan="2">' +
  '</td></tr><tr><td colspan="5">' +
  '<span id="fshBazaarWarning" class="fshHide">' +
  'Warning:<br>pressing [<span id="fshBuy" class="fshLink">This button' +
  '</span>] now will buy the <span id="quantity">1</span> item(s) WITHOUT ' +
  'confirmation!</span></td></tr><tr><td colspan="5">' +
  '<span id="buyResultLabel"></span><ol id="buy_result"></ol>' +
  '</td>' +
  '</tr></table>';
var bazaarItem =
  '<span class="bazaarButton tip-dynamic" style="background-image: ' +
  'url(\'@src@\');" itemid="@itemid@" data-tipped="@tipped@"></span>';

function testBuyAmount() {
  return testQuant(getElementById('buy_amount').value);
}

function buyTarget(target, theValue) {
  setText(theValue, getElementById('quantity'));
  ItemId = target.getAttribute('itemid');
  getElementById('fshBazaarWarning').removeAttribute('class');
  var dupNode = target.cloneNode(false);
  dupNode.className = 'bazaarSelected tip-dynamic';
  var selected = getElementById('selectedItem');
  selected.innerHTML = '';
  insertElement(selected, dupNode);
}

function select(evt) {
  var target = evt.target;
  if (!target.classList.contains('bazaarButton')) {return;}
  var theValue = testBuyAmount();
  if (!theValue) {return;}
  buyTarget(target, theValue);
}

function quantity() {
  var theValue = testBuyAmount();
  if (theValue) {
    setText(theValue, getElementById('quantity'));
  }
}

function done(json) {
  var buyResult = getElementById('buy_result');
  if (jsonFail(json, buyResult)) {return;}
  if (json.s) {
    outputResult('You purchased the item!', buyResult);
  }
}

function buy() { // jQuery.min
  if (!ItemId) {return;}
  var buyAmount = getText(getElementById('quantity'));
  setText('Buying ' + buyAmount + ' items', getElementById('buyResultLabel'));
  for (var i = 0; i < buyAmount; i += 1) {
    daBazaarBuy(ItemId).then(done);
  }
}

function doMiniatures(el, i) {
  var item = el.children[0];
  var tipped = item.dataset.tipped;
  bazaarTable = bazaarTable
    .replace('@' + i + '@', bazaarItem)
    .replace('@src@', item.getAttribute('src'))
    .replace('@itemid@', tipped.match(/\?item_id=(\d+)/)[1])
    .replace('@tipped@', tipped);
}

function evtHandlers() {
  on(getElementById('fshBazaar'), 'click', select);
  on(getElementById('buy_amount'), 'input', quantity);
  on(getElementById('fshBuy'), 'click', buy);
}

export default function injectBazaar() { // TODO stop using getElementById
  if (jQueryNotPresent()) {return;}
  var pbImg = getElementsByTagName('img', pCC)[0];
  pbImg.className = 'fshFloatLeft';
  getArrayByTagName('a', pCC).forEach(doMiniatures);
  bazaarTable = bazaarTable.replace(/@\d@/g, '');
  insertHtmlBeforeEnd(pbImg.parentNode, bazaarTable);
  evtHandlers();
}
