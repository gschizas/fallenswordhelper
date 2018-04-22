import callApp from '../callApp';
import extend from '../../common/extend';

export default function guild(data) {
  return callApp(extend({cmd: 'guild'}, data));
}
