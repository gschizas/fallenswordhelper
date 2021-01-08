import calf from '../support/calf';
import guildStore from '../_dataAccess/export/guildStore';
import inventory from '../_dataAccess/export/inventory';

export default function getInventory() {
  if (calf.subcmd === 'guildinvmgr') {
    return guildStore();
  }
  return inventory();
}
