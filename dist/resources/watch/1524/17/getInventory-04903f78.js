import { c as calf } from './calfSystem-f6498976.js';
import { c as cmdExport } from './cmdExport-04d8cb57.js';
import { g as guildStore } from './guildStore-e39312dd.js';

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
//# sourceMappingURL=getInventory-04903f78.js.map
