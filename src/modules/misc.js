import * as system from './support/system';
import * as layout from './support/layout';
import * as ajax from './support/ajax';

export function injectFindPlayer() { // Bad jQuery
  var findPlayerButton = $('input[value="Find Player"]');
  var levelToTest = system.intValue($('dt.stat-level:first').next()
    .text());
  var characterVirtualLevel = system.getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  var pvpLowerLevelModifier = levelToTest > 205 ? 10 : 5;
  var pvpUpperLevelModifier = levelToTest >= 200 ? 10 : 5;
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
    .each(function() {
      var id = /player_id=([0-9]*)/.exec($(this).attr('href'));
      $(this).after('<a style="color:blue;font-size:10px;" ' +
        layout.quickBuffHref(id[1])+'>[b]</a>');
    });
}

function addMarketplaceWarning() { // Legacy
  var amount = system.findNode('//input[@id="amount"]').value;
  var goldPerPoint = system.findNode('//input[@id="price"]');
  var warningField = system.findNode('//td[@id="warningfield"]');
  var sellPrice = goldPerPoint.value;
  if (sellPrice.search(/^[0-9]*$/) !== -1) {
    var warningColor = 'green';
    var warningText =
      '</b><br>This is probably an offer that will please someone.';
    if (sellPrice < 100000) {
      warningColor = 'brown';
      warningText = '</b><br>This is too low ... it just ain"t gonna sell.';
    } else if (sellPrice > 250000) {
      warningColor = 'red';
      warningText = '</b><br>Hold up there ... this is way to high a ' +
        'price ... you should reconsider.';
    }

    warningField.innerHTML = '<span style="color:' + warningColor +
      ';">You are offering to buy <b>' + amount +
      '</b> FSP for >> <b>' + system.addCommas(sellPrice) +
      warningText + ' (Total: ' +
      system.addCommas(amount * sellPrice +
      Math.ceil(amount * sellPrice * 0.005)) + ')</span>';
  }
}

export function addMarketplaceWidgets() { // Legacy
  var requestTable = system.findNode(
    '//table[tbody/tr/td/input[@value="Confirm Request"]]');
  var newRow = requestTable.insertRow(2);
  var newCell = newRow.insertCell(0);
  newCell.id = 'warningfield';
  newCell.colSpan = '2';
  newCell.align = 'center';

  document.getElementById('price').addEventListener('keyup',
    addMarketplaceWarning, true);
  document.getElementById('amount').addEventListener('keyup',
    addMarketplaceWarning, true);
}

export function injectNotepad() { // jQuery
  $('#notepad_notes')
  .attr('cols', '90')
  .attr('rows', '30')
  .css('resize', 'none');
}

export function ladder() { // Native
  document.querySelector('#pCC input[type="submit"]')
    .addEventListener('click', function(e) {
      e.preventDefault();
      window.location = 'index.php?cmd=pvpladder&viewing_band_id=' +
        document.querySelector('#pCC select[name="viewing_band_id"]').value;
    });
}

export function injectFsBoxContent(content) { // jQuery
  if (!content) {content = layout.notebookContent();}
  content.innerHTML = layout.makePageTemplate('FS Box Log', '',
    'fsboxclear', 'Clear', 'fsboxdetail');
  ajax.getForage('fsh_fsboxcontent').done(function(fsboxcontent) {
    document.getElementById('fsboxdetail').innerHTML = fsboxcontent;
  });
  document.getElementById('fsboxclear')
    .addEventListener('click', function() {
      ajax.setForage('fsh_fsboxcontent', '');
      location.reload();
    }, true);
}
