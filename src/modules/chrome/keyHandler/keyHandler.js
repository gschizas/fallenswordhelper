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
import on from '../../common/on';
import partial from '../../common/partial';
import profile from './profile';
import toWorld from './toWorld';

var keyLookup = [
  ['!', combatSetKey, 0], // Shift+1
  ['@', combatSetKey, 1], // Shift+2
  ['"', combatSetKey, 1], // Shift+2 -- for UK keyboards
  ['#', combatSetKey, 2], // Shift+3
  ['£', combatSetKey, 2], // Shift+3 -- for UK keyboards
  ['$', combatSetKey, 3], // Shift+4
  ['%', combatSetKey, 4], // Shift+5
  ['^', combatSetKey, 5], // Shift+6
  ['&', combatSetKey, 6], // Shift+7
  ['*', combatSetKey, 7], // Shift+8
  ['(', combatSetKey, 8], // Shift+9
  ['0', toWorld], // go to world [0]
  ['<', movePage, '<'], // move to prev page [<]
  ['>', movePage, '>'], // move to next page [>]
  ['G', createGroup], // create group [G]
  ['L', logPage], // Log Page [L]
  ['b', backpack], // backpack [b]
  ['g', gotoGuild], // go to guild [g]
  ['j', joinAllGroup], // join all group [j]
  ['l', logPage], // Log Page [l]
  ['p', profile], // profile [p]
  ['r', doRepair], // repair [r]
  ['v', fastWearMgr], // fast wear manager [v]
  ['y', doSendGold] // fast send gold [y]
];

function thisKey(key, arr) {return key === arr[0];}

function handleKey(key) {
  var mapping = keyLookup.find(partial(thisKey, key));
  if (mapping) {mapping[1](mapping[2]);}
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

function handleKeyUp(e) {
  if (doNotHandle(e)) {return;}
  handleKey(e.key);
}

export default function replaceKeyHandler() {
  on(document, 'keyup', handleKeyUp);
}
