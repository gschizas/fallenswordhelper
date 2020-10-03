import { q as extend } from './calfSystem-c851a12c.js';
import { i as indexAjaxJson } from './indexAjaxJson-bfe47429.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-d8c344d2.js.map
