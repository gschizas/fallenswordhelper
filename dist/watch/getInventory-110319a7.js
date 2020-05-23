import { s as cmdExport, c as calf } from './calfSystem-cb5d894f.js';
import { g as guildStore } from './guildStore-3dc6832c.js';

function inventory() {
  return cmdExport({ subcmd: 'inventory' });
}

function getInventory() {
  if (calf.subcmd === 'guildinvmgr') {
    return guildStore();
  }
  return inventory();
}

export { getInventory as g };
//# sourceMappingURL=getInventory-110319a7.js.map
