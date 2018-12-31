import calf from '../support/calf';
import createDocument from '../system/createDocument';
import {doSendGold} from '../world/newMap/sendGold';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import insertQuickWear from '../notepad/quickWear/quickWear';
import jQueryDialog from './jQueryDialog';
import retryAjax from '../ajax/retryAjax';
import {sendEvent} from '../support/fshGa';
import xPath from '../common/xPath';

var expandMenuOnKeyPress;

function movePage(dir) { // Legacy
  var dirButton = xPath('//input[@value="' + dir + '"]');
  if (!dirButton) {return;}
  var url = dirButton.getAttribute('onClick');
  url = url.replace(/^[^']*'/m, '').replace(/';$/m, '');
  location.href = url;
}

function changeCombatSet(responseText, itemIndex) { // jQuery.min
  var doc = createDocument(responseText);

  var cbsSelect = doc.querySelector(
    '#profileCombatSetDiv select[name="combatSetId"]');

  // find the combat set id value
  var allItems = cbsSelect.getElementsByTagName('option');
  if (itemIndex >= allItems.length) {return;}
  var cbsIndex = allItems[itemIndex].value;

  retryAjax({
    url: 'index.php',
    data: {
      no_mobile: 1,
      cmd: 'profile',
      subcmd: 'managecombatset',
      combatSetId: cbsIndex,
      submit: 'Use'
    },
    success: function() {
      if (expandMenuOnKeyPress) {
        localStorage.setItem('hcs.nav.openIndex', '2');
      }
      location.href = 'index.php?cmd=profile';
    }
  });
}

function doRepair() {
  // do not use repair link for new map
  if (!getElementById('worldPage')) {
    location.href = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
  }
}

function createGroup() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
  location.href =
    'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
}

function logPage() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
  location.href = 'index.php?cmd=log';
}

function gotoGuild() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
  location.href = 'index.php?cmd=guild&subcmd=manage';
}

function joinAllGroup() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
  if (!getValue('enableMaxGroupSizeToJoin')) {
    location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
  } else {
    location.href =
      'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize';
  }
}

function backpack() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
  location.href = 'index.php?cmd=profile&subcmd=dropitems';
}

function fastWearMgr() {
  if (!('dialogIsClosed' in calf) || calf.dialogIsClosed()) {
    sendEvent('keyHandler', 'insertQuickWear');
    jQueryDialog(insertQuickWear);
  }
}

function profile() {
  if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
  location.href = 'index.php?cmd=profile';
}

function combatSetKey(itemIndex) {
  retryAjax('index.php?no_mobile=1&cmd=profile').done(function(data) {
    changeCombatSet(data, itemIndex);
  });
}

var keyDict = {
  '33': {fn: combatSetKey, arg: 1}, // Shift+1
  '64': {fn: combatSetKey, arg: 2}, // Shift+2
  '34': {fn: combatSetKey, arg: 2}, // Shift+2 -- for UK keyboards, I think
  '35': {fn: combatSetKey, arg: 3}, // Shift+3
  '36': {fn: combatSetKey, arg: 4}, // Shift+4
  '37': {fn: combatSetKey, arg: 5}, // Shift+5
  '94': {fn: combatSetKey, arg: 6}, // Shift+6
  '38': {fn: combatSetKey, arg: 7}, // Shift+7
  '42': {fn: combatSetKey, arg: 8}, // Shift+8
  '40': {fn: combatSetKey, arg: 9}, // Shift+9
  '60': {fn: movePage, arg: '<'}, // move to prev page [<]
  '62': {fn: movePage, arg: '>'}, // move to next page [>]
  '71': {fn: createGroup}, // create group [G]
  '76': {fn: logPage}, // Log Page [L]
  '98': {fn: backpack}, // backpack [b]
  '103': {fn: gotoGuild}, // go to guild [g]
  '106': {fn: joinAllGroup}, // join all group [j]
  '108': {fn: logPage}, // Log Page [l]
  '112': {fn: profile}, // profile [p]
  '114': {fn: doRepair}, // repair [r]
  '118': {fn: fastWearMgr}, // fast wear manager [v]
  '121': {fn: doSendGold}, // fast send gold [y]
  '163': {fn: combatSetKey, arg: 3}, // Shift+3 -- for UK keyboards
};

function handleKey(r) {
  if (r in keyDict) {
    keyDict[r].fn(keyDict[r].arg);
  }
}

var bailOut = [
  function(evt) {
    return evt.target.tagName !== 'HTML' && evt.target.tagName !== 'BODY';
  },
  /* ignore control, alt and meta keys
  (I think meta is the command key in Macintoshes) */
  function(evt) {return evt.ctrlKey;},
  function(evt) {return evt.metaKey;},
  function(evt) {return evt.altKey;}
];

function keyPress(evt) {
  for (var i = 0; i < bailOut.length; i += 1) {
    if (bailOut[i](evt)) {return;}
  }
  handleKey(evt.charCode);
}

export default function replaceKeyHandler() {
  expandMenuOnKeyPress = getValue('expandMenuOnKeyPress');
  document.onkeypress = keyPress;
}
