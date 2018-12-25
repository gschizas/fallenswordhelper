import {simpleCheckbox} from './simpleCheckbox';

function concatSimple(prev, curr) {
  return prev + simpleCheckbox(curr);
}

export default function bunchOfSimple(ary) {
  return ary.reduce(concatSimple, '');
}
