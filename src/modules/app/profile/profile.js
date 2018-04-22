import callApp from '../callApp';
import extend from '../../common/extend';

export default function profile(data) {
  return callApp(extend({cmd: 'profile'}, data));
}
