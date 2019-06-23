import callApp from '../callApp';
import extend from '../../common/extend';

export default function arena(data) {
  return callApp(extend({cmd: 'arena'}, data));
}
