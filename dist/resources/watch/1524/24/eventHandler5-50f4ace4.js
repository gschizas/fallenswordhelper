import { s as partial, aT as handleEvent } from './calfSystem-dea093d3.js';

function passingTest(target, el) { return el[0](target); }

function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}

export { eventHandler5 as e };
//# sourceMappingURL=eventHandler5-50f4ace4.js.map
