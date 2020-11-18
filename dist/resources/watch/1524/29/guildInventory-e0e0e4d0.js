import { q as extend } from './calfSystem-b31646eb.js';
import { g as guild } from './guild-a3177861.js';

function guildInventory(data) {
  return guild(extend({ subcmd: 'inventory' }, data));
}

export { guildInventory as g };
//# sourceMappingURL=guildInventory-e0e0e4d0.js.map
