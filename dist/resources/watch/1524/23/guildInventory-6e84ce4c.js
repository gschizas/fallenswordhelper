import { q as extend } from './calfSystem-2b1fed3f.js';
import { g as guild } from './guild-5dfcc29b.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-6e84ce4c.js.map
