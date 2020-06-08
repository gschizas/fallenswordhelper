import { c as calf } from './calfSystem-c0288c6c.js';
import { c as cmdExport } from './cmdExport-a514288d.js';
import { g as guildStore } from './guildStore-0ee3187d.js';

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
//# sourceMappingURL=getInventory-2e8b95ab.js.map
