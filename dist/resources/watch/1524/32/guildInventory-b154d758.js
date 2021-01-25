import { q as extend } from './calfSystem-e64be67d.js';
import { g as guild } from './guild-d3b62e56.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-b154d758.js.map
