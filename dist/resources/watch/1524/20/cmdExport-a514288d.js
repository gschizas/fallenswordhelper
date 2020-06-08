import { q as extend } from './calfSystem-c0288c6c.js';
import { i as indexAjaxJson } from './indexAjaxJson-ebc8dc2e.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-a514288d.js.map
