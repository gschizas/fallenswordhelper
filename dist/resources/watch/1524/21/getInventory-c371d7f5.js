import { c as calf } from './calfSystem-b0234231.js';
import { c as cmdExport } from './cmdExport-071bb352.js';
import { g as guildStore } from './guildStore-2b1303ab.js';

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
//# sourceMappingURL=getInventory-c371d7f5.js.map
