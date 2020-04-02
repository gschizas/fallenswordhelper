import partial from './partial';

export default function handleEvent(passingTest, evtAry, evt) {
  var target = evt.target;
  var hdl = evtAry.find(partial(passingTest, target));
  if (hdl) {return hdl[1](target);}
}
