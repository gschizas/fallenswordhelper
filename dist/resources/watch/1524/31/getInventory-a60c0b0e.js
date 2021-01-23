import { c as calf } from './calfSystem-91adbec8.js';
import { g as guildStore } from './guildStore-51d9acf8.js';
import { c as cmdExport } from './cmdExport-6eca2840.js';

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
//# sourceMappingURL=getInventory-a60c0b0e.js.map
