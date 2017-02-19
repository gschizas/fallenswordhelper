import * as layout from './support/layout';
import * as system from './support/system';

var ItemId;
var bazaarTable =
  '<table id="fshBazaar"><tr><td colspan="5">Select an item to quick-buy:' +
  '</td></tr><tr><td colspan="5">Select how many to quick-buy</td></tr>' +
  '<tr><td colspan="5"><input id="buy_amount" class="fshNumberInput" ' +
  'type="number" min="0" max="99" value="1"></td></tr><tr><td>@0@</td>' +
  '<td>@1@</td><td>@2@</td><td>@3@</td><td>@4@</td></tr><tr><td>@5@</td>' +
  '<td>@6@</td><td>@7@</td><td>@8@</td><td>@9@</td></tr><tr>' +
  '<td colspan="3">Selected item:</td><td id="selectedItem" colspan="2">' +
  '</td></tr><tr><td colspan="5"><span id="warning" class="fshHide">' +
  'Warning:<br>pressing [<span id="fshBuy" class="fshLink">This button' +
  '</span>] now will buy the <span id="quantity">1</span> item(s) WITHOUT ' +
  'confirmation!</span></td></tr><tr><td id="buy_result" colspan="5"></td>' +
  '</tr></table>';
var bazaarItem =
  '<span class="bazaarButton tip-dynamic" style="background-image: ' +
  'url(\'@src@\');" itemid="@itemid@" data-tipped="@tipped@"></span>';

function testQuant() { // Native
  return system.testQuant(document.getElementById('buy_amount').value);
}

function select(evt) { // Native
  var target = evt.target;
  if (!target.classList.contains('bazaarButton')) {return;}
  var theValue = testQuant();
  if (!theValue) {return;}
  document.getElementById('quantity').textContent = theValue;
  ItemId = target.getAttribute('itemid');
  document.getElementById('warning').removeAttribute('class');
  var dupNode = target.cloneNode(false);
  dupNode.className = 'bazaarSelected tip-dynamic';
  var selected = document.getElementById('selectedItem');
  selected.innerHTML = '';
  selected.appendChild(dupNode);
}

function quantity() { // Native
  var theValue = testQuant();
  if (theValue) {
    document.getElementById('quantity').textContent = theValue;
  }
}

function done(responseText) { // Native
  document.getElementById('buy_result').insertAdjacentHTML('beforeend',
  '<br>' + layout.infoBox(responseText));
}

function buy() { // jQuery
  if (!ItemId) {return;}
  var buyAmount = document.getElementById('quantity').textContent;
  document.getElementById('buy_result').textContent =
    'Buying ' + buyAmount + ' items';
  for (var i = 0; i < buyAmount; i += 1) {
    $.get('index.php?cmd=potionbazaar&subcmd=buyitem&item_id=' +
      ItemId, done);
  }
}

export function injectBazaar() { // Native
  var pbImg = layout.pCC.getElementsByTagName('IMG')[0];
  pbImg.className = 'fshFloatLeft';
  var potions = layout.pCC.getElementsByTagName('A');
  Array.prototype.forEach.call(potions, function(el, i) {
    var item = el.firstElementChild;
    var tipped = item.getAttribute('data-tipped');
    bazaarTable = bazaarTable
      .replace('@' + i + '@', bazaarItem)
      .replace('@src@', item.getAttribute('src'))
      .replace('@itemid@', tipped.match(/\?item_id=(\d+)/)[1])
      .replace('@tipped@', tipped);
    
  });
  bazaarTable = bazaarTable.replace(/@\d@/g, '');
  pbImg.parentNode.insertAdjacentHTML('beforeend', bazaarTable);
  document.getElementById('fshBazaar').addEventListener('click', select);
  document.getElementById('buy_amount').addEventListener('input', quantity);
  document.getElementById('fshBuy').addEventListener('click', buy);
}
