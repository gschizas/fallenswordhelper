import { q as extend } from './calfSystem-975d976a.js';
import { i as indexAjaxJson } from './indexAjaxJson-26919f52.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-1f11a458.js.map
