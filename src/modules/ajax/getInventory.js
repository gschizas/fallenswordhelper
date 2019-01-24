import calf from '../support/calf';
import extend from '../common/extend';
import indexAjaxJson from './indexAjaxJson';

export default function getInventory() {
  var subcmd = {subcmd: 'inventory'};
  if (calf.subcmd === 'guildinvmgr') {
    subcmd = {subcmd: 'guild_store', inc_tagged: '1'};
  }
  return indexAjaxJson(extend({cmd: 'export'}, subcmd));
}
