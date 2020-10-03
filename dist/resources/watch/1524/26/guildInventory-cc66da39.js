import { q as extend } from './calfSystem-c851a12c.js';
import { g as guild } from './guild-948601cd.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-cc66da39.js.map
