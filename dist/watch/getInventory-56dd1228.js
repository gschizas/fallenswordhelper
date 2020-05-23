import { s as cmdExport, c as calf } from './calfSystem-e592bbc5.js';
import { g as guildStore } from './guildStore-d00770f9.js';

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
//# sourceMappingURL=getInventory-56dd1228.js.map
