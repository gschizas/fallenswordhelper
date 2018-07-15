import createDocument from '../system/createDocument';
import {getElementById} from './getElement';

export default function infoBox(documentText) {
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
