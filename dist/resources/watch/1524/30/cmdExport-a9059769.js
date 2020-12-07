import { q as extend } from './calfSystem-d357ca6f.js';
import { i as indexAjaxJson } from './indexAjaxJson-e70729f5.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-a9059769.js.map
