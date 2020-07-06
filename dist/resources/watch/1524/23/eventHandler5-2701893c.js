import { s as partial, aT as handleEvent } from './calfSystem-2b1fed3f.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-2701893c.js.map
