import { c as calf } from './calfSystem-975d976a.js';
import { c as cmdExport } from './cmdExport-1f11a458.js';
import { g as guildStore } from './guildStore-cb7bb071.js';

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
//# sourceMappingURL=getInventory-5f212899.js.map
