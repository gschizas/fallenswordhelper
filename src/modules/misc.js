import {getElementById} from './common/getElement';
import getForage from './ajax/getForage';
import setForage from './ajax/setForage';
import {
  addCommas,
  fallback,
  findNode,
  getValue,
  intValue
} from './support/system';
import {makePageTemplate, pCC, quickBuffHref} from './support/layout';

export function injectFindPlayer() { // Bad jQuery
  var findPlayerButton = $('input[value="Find Player"]');
  var levelToTest = intValue($('dt.stat-level:first').next()
    .text());
  var characterVirtualLevel = getValue('characterVirtualLevel');
  levelToTest = fallback(characterVirtualLevel, levelToTest);
  var pvpLowerLevelModifier = 5;
  if (levelToTest > 205) {pvpLowerLevelModifier = 10;}
  var pvpUpperLevelModifier = 5;
  if (levelToTest >= 200) {pvpUpperLevelModifier = 10;}
  findPlayerButton.parent().append('&nbsp;<a href="index.php?' +
    'cmd=findplayer&search_active=1&search_username=&search_level_min=' +
    (levelToTest - pvpLowerLevelModifier) + '&search_level_max=' +
    (levelToTest + pvpUpperLevelModifier) + '&search_in_guild=0"><span ' +
    'style="color:blue;">Get PvP targets</span></a>&nbsp;<a href="' +
    'index.php?cmd=findplayer&search_active=1&search_username=&' +
    'search_level_min=' + (levelToTest - 25) + '&search_level_max=' +
    (levelToTest + 25) + '&search_in_guild=0"><span style="color:blue;">' +
    'Get GvG targets</span></a>');

  $('table[class="width_full"]').find('a[href*="player_id"]')
    .each(function(i, e) {
      var id = /player_id=([0-9]*)/.exec($(e).attr('href'));
      $(e).after('<a style="color:blue;font-size:10px;" ' +
        quickBuffHref(id[1]) + '>[b]</a>');
    });
}

function marketplaceWarning(sellPrice) { // Legacy
  var warningColor = 'green';
  var warningText =
    '</b><br>This is probably an offer that will please someone.';
  if (sellPrice < 100000) {
    warningColor = 'brown';
    warningText = '</b><br>This is too low ... it just ain"t gonna sell.';
  }
  if (sellPrice > 250000) {
    warningColor = 'red';
    warningText = '</b><br>Hold up there ... this is way to high a ' +
      'price ... you should reconsider.';
  }
  var amount = findNode('//input[@id="amount"]').value;
  var warningField = findNode('//td[@id="warningfield"]');
  warningField.innerHTML = '<span style="color:' + warningColor +
    ';">You are offering to buy <b>' + amount +
    '</b> FSP for >> <b>' + addCommas(sellPrice) +
    warningText + ' (Total: ' +
    addCommas(amount * sellPrice +
    Math.ceil(amount * sellPrice * 0.005)) + ')</span>';
}

function addMarketplaceWarning() { // Legacy
  var goldPerPoint = findNode('//input[@id="price"]');
  var sellPrice = goldPerPoint.value;
  if (sellPrice.search(/^[0-9]*$/) !== -1) {
    marketplaceWarning(sellPrice);
  }
}

export function addMarketplaceWidgets() { // Legacy
  var requestTable = findNode(
    '//table[tbody/tr/td/input[@value="Confirm Request"]]');
  var newRow = requestTable.insertRow(2);
  var newCell = newRow.insertCell(0);
  newCell.id = 'warningfield';
  newCell.colSpan = '2';
  newCell.align = 'center';

  getElementById('price').addEventListener('keyup',
    addMarketplaceWarning, true);
  getElementById('amount').addEventListener('keyup',
    addMarketplaceWarning, true);
}

export function injectNotepad() { // jQuery
  $('#notepad_notes')
    .attr('cols', '90')
    .attr('rows', '30')
    .css('resize', 'none');
}

export function injectFsBoxContent(injector) { // jQuery
  var content = injector || pCC;
  content.innerHTML = makePageTemplate('FS Box Log', '',
    'fsboxclear', 'Clear', 'fsboxdetail');
  getForage('fsh_fsboxcontent').done(function(fsboxcontent) {
    getElementById('fsboxdetail').innerHTML = fsboxcontent;
  });
  getElementById('fsboxclear')
    .addEventListener('click', function() {
      setForage('fsh_fsboxcontent', '');
      location.reload();
    }, true);
}
