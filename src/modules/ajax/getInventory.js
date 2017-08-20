import calf from '../support/calf';
import retryAjax from './retryAjax';

export default function getInventory() {
  var subcmd = 'inventory';
  if (calf.subcmd === 'guildinvmgr') {
    subcmd = 'guild_store&inc_tagged=1';
  }
  return retryAjax({
    dataType: 'json',
    url: 'index.php?cmd=export&subcmd=' + subcmd
  });
}
