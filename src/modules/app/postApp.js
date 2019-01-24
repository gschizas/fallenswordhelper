import callApp from './callApp';
import extend from '../common/extend';

export default function postApp(data) {
  extend(data, {type: 'POST'});
  return callApp(data);
}
