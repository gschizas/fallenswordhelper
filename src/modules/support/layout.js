import {getElementById} from '../common/getElement';

export var pCL;
export var pCC;
export var pCR;

export function initPcc() {
  if (!pCC) {
    pCL = getElementById('pCL');
    pCC = getElementById('pCC');
    pCR = getElementById('pCR');
  }
}
