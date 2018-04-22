import extend from '../../../common/extend';
import guild from '../guild';

export default function guildGroups(data) {
  return guild(extend({subcmd: 'groups'}, data));
}
