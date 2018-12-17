import {defaults} from '../support/dataObj';
//#if _DEV  //  No default setting available
import isUndefined from '../common/isUndefined';
//#endif

export default function getValue(name) {
  //#if _DEV  //  No default setting available
  if (isUndefined(defaults[name])) {
    // eslint-disable-next-line no-console
    console.log(name, defaults[name]);
  }
  //#endif
  return GM_getValue(name, defaults[name]);
}
