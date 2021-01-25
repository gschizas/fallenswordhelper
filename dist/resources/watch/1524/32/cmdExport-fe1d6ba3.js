import { q as extend } from './calfSystem-e64be67d.js';
import { i as indexAjaxJson } from './indexAjaxJson-354daa84.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-fe1d6ba3.js.map
