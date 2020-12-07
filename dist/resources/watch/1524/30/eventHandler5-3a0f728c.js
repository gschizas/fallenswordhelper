import { s as partial, aS as handleEvent } from './calfSystem-d357ca6f.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-3a0f728c.js.map
