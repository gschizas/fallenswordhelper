import add from '../support/task';
import isFunction from './isFunction';

function moreToDo(limit, cntr, list) {
  return list && performance.now() < limit && cntr < list.length;
}

function maybeEndFn(endFn) {
  if (isFunction(endFn)) {add(3, endFn);}
}

export default function batch(itemsAry, counter, doFn, endFn) {
  var limit = performance.now() + 5;
  var localCounter = counter;
  while (moreToDo(limit, localCounter, itemsAry)) {
    doFn(itemsAry[localCounter], localCounter, itemsAry);
    localCounter += 1;
  }
  if (localCounter < itemsAry.length) {
    add(3, batch, [itemsAry, localCounter, doFn, endFn]);
  } else {
    maybeEndFn(endFn);
  }
}
