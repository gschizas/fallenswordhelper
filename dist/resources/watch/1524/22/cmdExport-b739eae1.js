import { q as extend } from './calfSystem-995e3482.js';
import { i as indexAjaxJson } from './indexAjaxJson-f24b8c24.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-b739eae1.js.map
