import { q as extend } from './calfSystem-c0288c6c.js';
import { g as guild } from './guild-f1fcec81.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-939f2b51.js.map
