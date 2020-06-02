import { n as extend } from './calfSystem-6e4b53e3.js';
import { i as indexAjaxJson } from './indexAjaxJson-3f2c1d04.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-67d5e685.js.map
