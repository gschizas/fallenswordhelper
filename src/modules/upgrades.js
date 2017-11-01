import {findNode, intValue, server, setValue} from './support/system';

var currentFSP;

function updateStamCount(evt) { // jQuery
  var target = $(evt.target);
  var amount = target.attr('amount');
  var cost = target.attr('cost');
  var quantity = target.val();
  // cap the value if the user goes over his current FSP
  var color = 'red';
  var extraStam = Math.floor(currentFSP / cost) * amount;
  if (quantity * cost <= currentFSP) {
    extraStam = quantity * amount;
    color = 'blue';
  }
  $('#pCC span[id="totalStam"][type="' + target.attr('stamtype') + '"]')
    .css('color', color)
    .html('(+' + extraStam + ' stamina)');
}

function injectUpgradeHelper(value, type) { // jQuery
  var theCells = $('#pCC tr')
    .has('input[name="upgrade_id"][value="' + value + '"]')
    .find('td');
  var cell = theCells.first();
  cell.append(' <span style="color:blue" ' +
    'id="totalStam" type="' + type + '"></span>');
  var amountRE = new RegExp('\\+(\\d+) ' + type + ' Stamina');
  var amount = cell.text().match(amountRE)[1];
  $('input[name="quantity"]', theCells)
    .attr('stamtype', type)
    .attr('amount', amount)
    .attr('cost', theCells.eq(1).text())
    .keyup(updateStamCount);
}

function injectPoints() { // jQuery
  currentFSP = intValue($('#statbar-fsp').text());
  injectUpgradeHelper(0, 'Current');
  injectUpgradeHelper(1, 'Maximum');
  $('#pCC td')
    .has('input[name="upgrade_id"][value="3"]')
    .html('<a href="' + server +
      '?cmd=marketplace">Sell at Marketplace</a>');
}

export default function storePlayerUpgrades() { // Legacy
  var alliesText = findNode('//td[.="+1 Max Allies"]');
  var alliesRatio = alliesText.nextSibling.nextSibling.nextSibling
    .nextSibling;
  if (alliesRatio) {
    var alliesValueRE = /(\d+) \/ 115/;
    var alliesValue = Number(alliesValueRE.exec(alliesRatio.innerHTML)[1]);
    setValue('alliestotal', alliesValue + 5);
  }
  var enemiesText = findNode('//td[.="+1 Max Enemies"]');
  var enemiesRatio = enemiesText.nextSibling.nextSibling.nextSibling
    .nextSibling;
  if (enemiesRatio) {
    var enemiesValueRE = /(\d+) \/ 115/;
    var enemiesValue = Number(enemiesValueRE.exec(enemiesRatio.innerHTML)[1]);
    setValue('enemiestotal', enemiesValue + 5);
  }
  injectPoints();
}
