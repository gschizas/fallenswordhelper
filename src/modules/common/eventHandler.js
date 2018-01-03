export default function eventHandler(evtAry) {
  return function(evt) {
    var self = evt.target;
    evtAry.some(function(el) {
      if (el.test(self)) {
        el.act(self);
        return true;
      }
      return false;
    });
  };
}
