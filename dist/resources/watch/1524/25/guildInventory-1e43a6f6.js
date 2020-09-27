import { q as extend } from './calfSystem-0ffc234f.js';
import { g as guild } from './guild-b0b94541.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-1e43a6f6.js.map
