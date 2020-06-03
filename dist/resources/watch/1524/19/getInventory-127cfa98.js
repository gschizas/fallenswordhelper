import { c as calf } from './calfSystem-03895320.js';
import { c as cmdExport } from './cmdExport-8139127c.js';
import { g as guildStore } from './guildStore-7c00455a.js';

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
//# sourceMappingURL=getInventory-127cfa98.js.map
