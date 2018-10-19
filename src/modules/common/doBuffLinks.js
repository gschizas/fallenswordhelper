import fallback from '../system/fallback';
import insertElement from './insertElement';
import on from './on';
import openQuickBuffByName from './openQuickBuffByName';
import partial from './partial';
import {places} from '../support/constants';
import {createButton, createLi, createUl} from './cElement';

function batchUp(prev, curr, i) {
  var slot = Math.floor(i / 16);
  prev[slot] = fallback(prev[slot], []);
  prev[slot].push(curr);
  return prev;
}

function makeButtons(prev, curr, i) {
  var theNames = curr.join(',');
  var modifierWord = places[i];
  var li = createLi();
  var btn = createButton({
    className: 'fshBl fshBls tip-static',
    dataset: {tipped: 'Quick buff functionality from HCS only does 16'},
    textContent: 'Buff ' + modifierWord + ' 16'
  });
  on(btn, 'click', partial(openQuickBuffByName, theNames));
  insertElement(li, btn);
  insertElement(prev, li);
  return prev;
}

export default function doBuffLinks(members) {
  // quick buff only supports 16
  var shortList = members.reduce(batchUp, []).reduce(makeButtons, createUl());
  return shortList;
}
