import { c as calf } from './calfSystem-c851a12c.js';
import { c as cmdExport } from './cmdExport-d8c344d2.js';
import { g as guildStore } from './guildStore-8221c147.js';

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
//# sourceMappingURL=getInventory-b22d80ae.js.map
