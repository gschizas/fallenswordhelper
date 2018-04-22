import extend from '../../../common/extend';
import guild from '../guild';

export default function guildInventory(data) {
  return guild(extend({subcmd: 'inventory'}, data));
}
