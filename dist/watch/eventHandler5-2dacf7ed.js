import { u as partial, b3 as handleEvent } from './calfSystem-69cf053a.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-2dacf7ed.js.map
