import { c as calf } from './calfSystem-b31646eb.js';
import { c as cmdExport } from './cmdExport-4b19dfbd.js';
import { g as guildStore } from './guildStore-8f1acde9.js';

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
//# sourceMappingURL=getInventory-c700b7d1.js.map
