import {defaults} from '../support/dataObj';
import isUndefined from '../common/isUndefined';

export default function getValue(name) {
  //#if _DEV  //  No default setting available
  if (isUndefined(defaults[name])) {
    // eslint-disable-next-line no-console
    console.log(name, defaults[name]);
  }
  //#endif
  return GM_getValue(name, defaults[name]);
}
