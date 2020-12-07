import { q as extend } from './calfSystem-d357ca6f.js';
import { g as guild } from './guild-6076bd6b.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-c26aa98e.js.map
