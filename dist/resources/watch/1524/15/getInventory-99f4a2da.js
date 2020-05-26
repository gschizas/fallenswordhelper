import { c as calf } from './calfSystem-b469667c.js';
import { c as cmdExport } from './cmdExport-b618c276.js';
import { g as guildStore } from './guildStore-a2b43a1d.js';

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
//# sourceMappingURL=getInventory-99f4a2da.js.map
