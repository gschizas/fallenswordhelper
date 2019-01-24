import backpack from './backpack';
import combatSetKey from './combatSetKey';
import createGroup from './createGroup';
import doRepair from './doRepair';
import {doSendGold} from '../../world/newMap/sendGold';
import fastWearMgr from './fastWearMgr';
import gotoGuild from './gotoGuild';
import joinAllGroup from './joinAllGroup';
import logPage from './logPage';
import movePage from './movePage';
import partial from '../../common/partial';
import profile from './profile';
import toWorld from './toWorld';

var keyLookup = [
  [33, combatSetKey, 0], // Shift+1
  [64, combatSetKey, 1], // Shift+2
  [34, combatSetKey, 1], // Shift+2 -- for UK keyboards, I think
  [35, combatSetKey, 2], // Shift+3
  [36, combatSetKey, 3], // Shift+4
  [37, combatSetKey, 4], // Shift+5
  [94, combatSetKey, 5], // Shift+6
  [38, combatSetKey, 6], // Shift+7
  [42, combatSetKey, 7], // Shift+8
  [40, combatSetKey, 8], // Shift+9
  [48, toWorld], // go to world [0]
  [60, movePage, '<'], // move to prev page [<]
  [62, movePage, '>'], // move to next page [>]
  [71, createGroup], // create group [G]
  [76, logPage], // Log Page [L]
  [98, backpack], // backpack [b]
  [103, gotoGuild], // go to guild [g]
  [106, joinAllGroup], // join all group [j]
  [108, logPage], // Log Page [l]
  [112, profile], // profile [p]
  [114, doRepair], // repair [r]
  [118, fastWearMgr], // fast wear manager [v]
  [121, doSendGold], // fast send gold [y]
  [163, combatSetKey, 2] // Shift+3 -- for UK keyboards
];

function thisCharCode(charCode, arr) {return charCode === arr[0];}

function handleKey(charCode) {
  var mapping = keyLookup.find(partial(thisCharCode, charCode));
  if (mapping) {
    mapping[1](mapping[2]);
  }
}

function notTagName(evt, tag) {return evt.target.tagName !== tag;}

var bailOut = [
  function(evt) {
    return ['HTML', 'BODY'].every(partial(notTagName, evt));
  },
  /* ignore control, alt and meta keys
  (I think meta is the command key in Macintoshes) */
  function(evt) {return evt.ctrlKey;},
  function(evt) {return evt.metaKey;},
  function(evt) {return evt.altKey;}
];

function reason(evt, fn) {return fn(evt);}

function doNotHandle(evt) {
  return bailOut.some(partial(reason, evt));
}

function keyPress(evt) {
  if (doNotHandle(evt)) {return;}
  handleKey(evt.charCode);
}

export default function replaceKeyHandler() {
  document.onkeypress = keyPress;
}
