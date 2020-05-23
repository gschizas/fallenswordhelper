import { u as partial, b3 as handleEvent } from './calfSystem-e592bbc5.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-4c875000.js.map
