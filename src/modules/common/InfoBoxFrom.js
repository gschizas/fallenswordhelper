import createDocument from '../system/createDocument';
import infoBox from './infoBox';

export default function infoBoxFrom(documentText) {
  const doc = createDocument(documentText);
  return infoBox(doc);
}
