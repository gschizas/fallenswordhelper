import { q as extend } from './calfSystem-91adbec8.js';
import { g as guild } from './guild-490050f1.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-b5248597.js.map
