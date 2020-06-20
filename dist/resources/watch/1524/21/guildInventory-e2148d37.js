import { q as extend } from './calfSystem-b0234231.js';
import { g as guild } from './guild-8a5936aa.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-e2148d37.js.map
