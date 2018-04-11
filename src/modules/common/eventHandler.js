export default function eventHandler(evtAry) {
  return function(evt) {
    var self = evt.target;
    var hdl = evtAry.find(function(el) {return el.test(self);});
    if (hdl) {hdl.act(self);}
  };
}
