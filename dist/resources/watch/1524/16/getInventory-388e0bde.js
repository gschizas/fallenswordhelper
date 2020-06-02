import { c as calf } from './calfSystem-6e4b53e3.js';
import { c as cmdExport } from './cmdExport-67d5e685.js';
import { g as guildStore } from './guildStore-a1fd8786.js';

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
//# sourceMappingURL=getInventory-388e0bde.js.map
