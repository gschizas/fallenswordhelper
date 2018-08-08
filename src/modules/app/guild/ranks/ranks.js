import extend from '../../../common/extend';
import guild from '../guild';

export default function ranks(data) {
  return guild(extend({subcmd: 'ranks'}, data));
}
