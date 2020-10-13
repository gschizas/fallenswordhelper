import { q as extend } from './calfSystem-21d16a0e.js';
import { i as indexAjaxJson } from './indexAjaxJson-299742b0.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-ad1c09dc.js.map
