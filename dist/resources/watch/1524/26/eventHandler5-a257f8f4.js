import { s as partial, aT as handleEvent } from './calfSystem-c851a12c.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-a257f8f4.js.map
