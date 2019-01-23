import extend from '../common/extend';
import {indexPhp} from '../support/constants';
import retryAjax from './retryAjax';

export default function indexAjax(options) {
  return retryAjax(extend({url: indexPhp}, options));
}
