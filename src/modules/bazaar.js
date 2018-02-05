import buyitem from './app/potionbazaar/buyitem';
import {getElementById} from './common/getElement';
import jsonFail from './common/jsonFail';
import outputResult from './common/outputResult';
import {pCC} from './support/layout';
import {testQuant} from './system/system';

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

function select(evt) {
  var target = evt.target;
  if (!target.classList.contains('bazaarButton')) {return;}
  var theValue = testBuyAmount();
  if (!theValue) {return;}
  getElementById('quantity').textContent = theValue;
  ItemId = target.getAttribute('itemid');
  getElementById('fshBazaarWarning').removeAttribute('class');
  var dupNode = target.cloneNode(false);
  dupNode.className = 'bazaarSelected tip-dynamic';
  var selected = getElementById('selectedItem');
  selected.innerHTML = '';
  selected.appendChild(dupNode);
}

function quantity() {
  var theValue = testBuyAmount();
  if (theValue) {
    getElementById('quantity').textContent = theValue;
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
  var buyAmount = getElementById('quantity').textContent;
  getElementById('buyResultLabel').textContent =
    'Buying ' + buyAmount + ' items';
  for (var i = 0; i < buyAmount; i += 1) {
    buyitem(ItemId).done(done);
  }
}

export default function injectBazaar() { // TODO stop using getElementById
  var pbImg = pCC.getElementsByTagName('IMG')[0];
  pbImg.className = 'fshFloatLeft';
  var potions = pCC.getElementsByTagName('A');
  Array.prototype.forEach.call(potions, function(el, i) {
    var item = el.firstElementChild;
    var tipped = item.dataset.tipped;
    bazaarTable = bazaarTable
      .replace('@' + i + '@', bazaarItem)
      .replace('@src@', item.getAttribute('src'))
      .replace('@itemid@', tipped.match(/\?item_id=(\d+)/)[1])
      .replace('@tipped@', tipped);
  });
  bazaarTable = bazaarTable.replace(/@\d@/g, '');
  pbImg.parentNode.insertAdjacentHTML('beforeend', bazaarTable);
  getElementById('fshBazaar').addEventListener('click', select);
  getElementById('buy_amount').addEventListener('input', quantity);
  getElementById('fshBuy').addEventListener('click', buy);
}
