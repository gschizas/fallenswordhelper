import { q as extend } from './calfSystem-b31646eb.js';
import { i as indexAjaxJson } from './indexAjaxJson-2db8a995.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-4b19dfbd.js.map
