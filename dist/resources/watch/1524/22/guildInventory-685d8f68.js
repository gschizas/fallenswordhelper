import { q as extend } from './calfSystem-995e3482.js';
import { g as guild } from './guild-fdf8a2a5.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-685d8f68.js.map
