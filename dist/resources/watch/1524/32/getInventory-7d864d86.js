import { c as calf } from './calfSystem-e64be67d.js';
import { g as guildStore } from './guildStore-f5c1db65.js';
import { c as cmdExport } from './cmdExport-fe1d6ba3.js';

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
//# sourceMappingURL=getInventory-7d864d86.js.map
