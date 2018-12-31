import hasClass from './hasClass';
import partial from './partial';

function passingTest(self, el) {return hasClass(el[0], self);}

function doEvent(evtAry, evt) {
  var self = evt.target;
  var hdl = evtAry.find(partial(passingTest, self));
  if (hdl) {hdl[1](self);}
}

export default function classHandler(evtAry) {
  return partial(doEvent, evtAry);
}
