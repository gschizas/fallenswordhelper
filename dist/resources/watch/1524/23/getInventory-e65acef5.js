import { c as calf } from './calfSystem-2b1fed3f.js';
import { c as cmdExport } from './cmdExport-4dceba5b.js';
import { g as guildStore } from './guildStore-fafef7d4.js';

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
//# sourceMappingURL=getInventory-e65acef5.js.map
