import { s as cmdExport, c as calf } from './calfSystem-5ce1fc75.js';
import { g as guildStore } from './guildStore-d116d611.js';

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
//# sourceMappingURL=getInventory-29559628.js.map
