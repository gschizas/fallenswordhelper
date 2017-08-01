import calf from '../support/calf';

export default function getInventory() {
  var subcmd = 'inventory';
  if (calf.subcmd === 'guildinvmgr') {
    subcmd = 'guild_store&inc_tagged=1';
  }
  return $.ajax({
    dataType: 'json',
    url: 'index.php?cmd=export&subcmd=' + subcmd
  });
}
