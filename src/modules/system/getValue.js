import {defaults} from '../support/dataObj';

export default function getValue(name) {
  //#if _DEV  //  No default setting available
  if (typeof defaults[name] === 'undefined') {
    // eslint-disable-next-line no-console
    console.log(name, defaults[name]);
  }
  //#endif
  return GM_getValue(name, defaults[name]);
}
