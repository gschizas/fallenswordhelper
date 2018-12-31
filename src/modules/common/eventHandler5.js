import partial from './partial';

function passingTest(self, el) {return el[0](self);}

function doEvent(evtAry, evt) {
  var self = evt.target;
  var hdl = evtAry.find(partial(passingTest, self));
  if (hdl) {hdl[1](self);}
}

export default function eventHandler5(evtAry) {
  return partial(doEvent, evtAry);
}
