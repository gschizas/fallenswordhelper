import { u as partial, b3 as handleEvent } from './calfSystem-5ce1fc75.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-3f8a2864.js.map
