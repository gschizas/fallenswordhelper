import { c as calf } from './calfSystem-21d16a0e.js';
import { c as cmdExport } from './cmdExport-ad1c09dc.js';
import { g as guildStore } from './guildStore-c1ac187c.js';

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
//# sourceMappingURL=getInventory-179ae68f.js.map
