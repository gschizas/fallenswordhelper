import { q as extend } from './calfSystem-975d976a.js';
import { g as guild } from './guild-6891f066.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-db9d59a3.js.map
