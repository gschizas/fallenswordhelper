import { s as cmdExport, c as calf } from './calfSystem-98d7118c.js';
import { g as guildStore } from './guildStore-3cffb46e.js';

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
//# sourceMappingURL=getInventory-23c9b684.js.map
