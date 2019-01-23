import calf from '../support/calf';
import extend from '../common/extend';
import indexAjax from './indexAjax';

export default function getInventory() {
  var subcmd = {subcmd: 'inventory'};
  if (calf.subcmd === 'guildinvmgr') {
    subcmd = {subcmd: 'guild_store', inc_tagged: '1'};
  }
  return indexAjax({
    dataType: 'json',
    data: extend({cmd: 'export'}, subcmd)
  });
}
