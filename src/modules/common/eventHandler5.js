import handleEvent from './handleEvent';
import partial from './partial';

function passingTest(self, el) {return el[0](self);}

export default function eventHandler5(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}
