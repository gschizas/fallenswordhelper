import { q as extend } from './calfSystem-b0234231.js';
import { i as indexAjaxJson } from './indexAjaxJson-94973d1e.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-071bb352.js.map
