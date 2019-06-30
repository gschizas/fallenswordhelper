import {arrayFrom} from '../common/arrayFrom';
import createDocument from '../system/createDocument';
import {getElementById} from '../common/getElement';
import getTextTrim from '../common/getTextTrim';
import indexAjaxData from '../ajax/indexAjaxData';
import querySelector from '../common/querySelector';

function parseReport(html) {
  const doc = createDocument(html);
  const select = querySelector('select[name="combatSetId"]', doc);
  if (!select) {return {s: false};}
  const sets = arrayFrom(select.children).filter((e, i) => i > 0)
    .map(o => ({id: Number(o.value)}));
  const vl = Number(getTextTrim(getElementById('stat-vl', doc)));
  return {
    r: {equip_sets: sets, last_activity: 0, virtual_level: vl},
    s: true
  };
}

// Incomplete
export default function viewProfile() {
  return indexAjaxData({cmd: 'profile'}).then(parseReport);
}
