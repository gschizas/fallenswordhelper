import { simpleCheckbox } from './simpleCheckbox';

function concatSimple(acc, curr) {
  return acc + simpleCheckbox(curr);
}

export default function bunchOfSimple(ary) {
  return ary.reduce(concatSimple, '');
}
