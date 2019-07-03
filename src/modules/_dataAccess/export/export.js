import extend from '../../common/extend';
import indexAjaxJson from '../../ajax/indexAjaxJson';

export default function cmdExport(data) {
  return indexAjaxJson(extend({cmd: 'export'}, data));
}
