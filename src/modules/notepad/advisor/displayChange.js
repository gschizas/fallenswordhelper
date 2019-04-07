import {createTBody} from '../../common/cElement';
import rowFactory from './rowFactory';

export default function displayChange(domTable, displayed) {
  const domTBody = domTable.tBodies[0];
  const thisTBody = createTBody();
  for (let r of displayed) {
    thisTBody.appendChild(rowFactory(r.value));
  }
  domTable.replaceChild(thisTBody, domTBody);
}
