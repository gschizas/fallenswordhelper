import { r as partial, aU as handleEvent } from './calfSystem-6e4b53e3.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-bc478e0c.js.map
