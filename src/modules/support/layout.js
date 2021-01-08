import getElementById from '../common/getElement';

export let pCL;
export let pCC;
export let pCR;

export function initPcc() {
  if (!pCC) {
    pCL = getElementById('pCL');
    pCC = getElementById('pCC');
    pCR = getElementById('pCR');
  }
}
