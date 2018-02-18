import fallback from '../system/fallback';
import insertElement from './insertElement';
import openQuickBuffByName from './openQuickBuffByName';
import {places} from '../support/constants';
import {createButton, createLi, createUl} from './cElement';

export default function doBuffLinks(members) {
  // quick buff only supports 16
  var shortList = members.reduce(function(prev, curr, i) {
    var slot = Math.floor(i / 16);
    prev[slot] = fallback(prev[slot], []);
    prev[slot].push(curr);
    return prev;
  }, []).reduce(function(prev, curr, i) {
    var theNames = curr.join(',');
    var modifierWord = places[i];
    var li = createLi();
    var btn = createButton({
      className: 'fshBl fshBls tip-static',
      dataset: {tipped: 'Quick buff functionality from HCS only does 16'},
      textContent: 'Buff ' + modifierWord + ' 16'
    });
    btn.addEventListener('click',
      openQuickBuffByName.bind(null, theNames));
    insertElement(li, btn);
    insertElement(prev, li);
    return prev;
  }, createUl());
  return shortList;
}
