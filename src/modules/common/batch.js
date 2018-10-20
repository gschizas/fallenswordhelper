import add from '../support/task';
import isFunction from './isFunction';

function moreToDo(limit, cntr, list) {
  return list && performance.now() < limit && cntr < list.length;
}

function maybeEndFn(priority, endFn) {
  if (isFunction(endFn)) {add(priority, endFn);}
}

export default function batch(priority, itemsAry, counter, doFn, endFn) {
  var limit = performance.now() + 5;
  var localCounter = counter;
  while (moreToDo(limit, localCounter, itemsAry)) {
    doFn(itemsAry[localCounter], localCounter, itemsAry);
    localCounter += 1;
  }
  if (localCounter < itemsAry.length) {
    add(priority, batch, [priority, itemsAry, localCounter, doFn, endFn]);
  } else {
    maybeEndFn(priority, endFn);
  }
}
