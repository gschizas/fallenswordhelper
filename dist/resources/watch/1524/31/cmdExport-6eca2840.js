import { q as extend } from './calfSystem-91adbec8.js';
import { i as indexAjaxJson } from './indexAjaxJson-0938fd4f.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-6eca2840.js.map
