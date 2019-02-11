import {getElementById} from '../common/getElement';

export var pCC;
export var pCR;

export function initPcc() {
  if (!pCC) {
    pCC = getElementById('pCC');
    pCR = getElementById('pCR');
  }
}
