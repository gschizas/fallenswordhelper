import { q as extend } from './calfSystem-0ffc234f.js';
import { i as indexAjaxJson } from './indexAjaxJson-d9144b37.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-1f8fe5a2.js.map
