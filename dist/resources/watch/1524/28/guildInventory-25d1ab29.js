import { q as extend } from './calfSystem-21d16a0e.js';
import { g as guild } from './guild-cad6b720.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-25d1ab29.js.map
