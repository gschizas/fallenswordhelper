import createDocument from '../system/createDocument';
import {getElementById} from '../common/getElement';
import setValue from '../system/setValue';

export var pCC = getElementById('pCC');
export var pCR = getElementById('pCR');

export function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  var passthru = '';
  if (buffList) {passthru = '&blist=' + buffList;}
  return 'href=\'javascript:window.openWindow("index.php?cmd=' +
    'quickbuff&tid=' + aPlayerId + passthru +
    '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
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
