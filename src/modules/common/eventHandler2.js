export default function eventHandler2(evtAry) {
  return function(evt) {
    var self = evt.target;
    evtAry.some(function(el) {return el(self);});
  };
}
