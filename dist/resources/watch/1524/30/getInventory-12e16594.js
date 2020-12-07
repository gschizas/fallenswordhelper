import { c as calf } from './calfSystem-d357ca6f.js';
import { c as cmdExport } from './cmdExport-a9059769.js';
import { g as guildStore } from './guildStore-5d89eead.js';

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
//# sourceMappingURL=getInventory-12e16594.js.map
