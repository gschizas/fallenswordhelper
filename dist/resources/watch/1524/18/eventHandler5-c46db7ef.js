import { r as partial, aU as handleEvent } from './calfSystem-940bc1b5.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-c46db7ef.js.map
