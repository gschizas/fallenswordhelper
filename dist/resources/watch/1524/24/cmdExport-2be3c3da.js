import { q as extend } from './calfSystem-dea093d3.js';
import { i as indexAjaxJson } from './indexAjaxJson-42210c04.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-2be3c3da.js.map
