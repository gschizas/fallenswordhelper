import handleEvent from './handleEvent';
import hasClass from './hasClass';
import partial from './partial';

function passingTest(self, el) {return hasClass(el[0], self);}

export default function classHandler(evtAry) {
  return partial(handleEvent, passingTest, evtAry);
}
