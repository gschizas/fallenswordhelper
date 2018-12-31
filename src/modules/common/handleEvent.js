import partial from './partial';

export default function handleEvent(passingTest, evtAry, evt) {
  var self = evt.target;
  var hdl = evtAry.find(partial(passingTest, self));
  if (hdl) {return hdl[1](self);}
}
