import createDocument from '../system/createDocument';
import fallback from '../system/fallback';
import {getElementById} from '../common/getElement';
import {places} from './dataObj';
import setValue from '../system/setValue';
import {
  createButton,
  createLi,
  createUl
} from '../common/cElement';

export var pCC = getElementById('pCC');
export var pCR = getElementById('pCR');

export function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  var passthru = '';
  if (buffList) {passthru = '&blist=' + buffList;}
  return 'href=\'javascript:window.openWindow("index.php?cmd=' +
    'quickbuff&tid=' + aPlayerId + passthru +
    '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
}

export function openQuickBuffByName(aPlayerName) {
  window.openWindow('index.php?cmd=quickbuff&t=' + aPlayerName,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

export function doBuffLinks(members) {
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
    li.appendChild(btn);
    prev.appendChild(li);
    return prev;
  }, createUl());
  return shortList;
}

export function infoBox(documentText) {
  var doc = createDocument(documentText);
  var result;
  var infoMsg = getElementById('info-msg', doc);
  if (infoMsg) {
    var infoMatch = infoMsg.innerHTML;
    result = '';
    if (infoMatch) {
      infoMatch = infoMatch.replace(/<br.*/, '');
      result = infoMatch;
    }
  }
  return result;
}

export function playerId() {
  var thePlayerId = parseInt(getElementById('holdtext')
    .textContent.match(/fallensword.com\/\?ref=(\d+)/)[1], 10);
  setValue('playerID', thePlayerId);
  return thePlayerId;
}

export function playerName() {
  return getElementById('statbar-character').textContent;
}
