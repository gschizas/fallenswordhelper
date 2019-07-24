import {entries} from './entries';
import {fromEntries} from './fromEntries';

export const removeKeys = (keys, obj) =>
  fromEntries(entries(obj).filter(([k]) => !keys.includes(k)));
