import { s as partial, aS as handleEvent } from './calfSystem-21d16a0e.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-b0f78c64.js.map
