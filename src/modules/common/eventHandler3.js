export default function eventHandler3(evtAry) {
  return function(evt) {
    evtAry.some(function(el) {return el(evt);});
  };
}
