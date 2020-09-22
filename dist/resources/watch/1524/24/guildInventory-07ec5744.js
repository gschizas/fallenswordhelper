import { q as extend } from './calfSystem-dea093d3.js';
import { g as guild } from './guild-858050bb.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-07ec5744.js.map
