/* eslint-disable no-bitwise */
import {itemType} from '../../support/constants';
import toLowerCase from '../../common/toLowerCase';

/* https://stackoverflow.com/a/52171480/1274806 */

export function cyrb32(s) {
  let h = 6;
  for (let i = 0; i < s.length; i += 1) {
    h = Math.imul(h ^ s.charCodeAt(i), 9 ** 9);
  }
  return (h ^ h >>> 9) >>> 0;
}

export function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^
    Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^
    Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function makeHash(hashFn, equip) {
  return hashFn(
    itemType
      .map(toLowerCase)
      .map(t => equip[t])
      .filter(s => s)
      .join()
  );
}
