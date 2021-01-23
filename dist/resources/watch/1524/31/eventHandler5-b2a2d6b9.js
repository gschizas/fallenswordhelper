import { s as partial, bb as handleEvent } from './calfSystem-91adbec8.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-b2a2d6b9.js.map
