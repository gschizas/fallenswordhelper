import { n as extend } from './calfSystem-6e4b53e3.js';
import { g as guild } from './guild-cf78b700.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-4d7c66c3.js.map
