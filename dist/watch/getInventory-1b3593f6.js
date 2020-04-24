import { s as cmdExport, c as calf } from './calfSystem-69cf053a.js';
import { g as guildStore } from './guildStore-fce0fc07.js';

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
//# sourceMappingURL=getInventory-1b3593f6.js.map
