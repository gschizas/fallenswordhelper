import callApp from '../callApp';
import extend from '../../common/extend';

export default function composing(data) {
  return callApp(extend({cmd: 'composing'}, data));
}
