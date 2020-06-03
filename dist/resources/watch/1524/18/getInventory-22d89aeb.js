import { c as calf } from './calfSystem-940bc1b5.js';
import { c as cmdExport } from './cmdExport-76b2dc80.js';
import { g as guildStore } from './guildStore-0f30ae9c.js';

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
//# sourceMappingURL=getInventory-22d89aeb.js.map
