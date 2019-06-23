import createDocument from '../system/createDocument';
import infoBox from './infoBox';

export default function infoBoxFrom(documentText) {
  var doc = createDocument(documentText);
  return infoBox(doc);
}
