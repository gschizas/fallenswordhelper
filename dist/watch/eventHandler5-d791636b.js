import { u as partial, b3 as handleEvent } from './calfSystem-cb5d894f.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-d791636b.js.map
