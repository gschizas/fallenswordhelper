import quickbuff from '../app/quickbuff';

function itWorked(result) {
  return result.s && result.r[0].casts.length === 1;
}

function processResult(trigger) {
  return function(json) {
    if (itWorked(json)) {
      trigger.className = 'fshLime';
      trigger.innerHTML = 'On';
    }
  };
}

export default function quickActivate(evt) { // jQuery.min
  var trigger = evt.target;
  if (trigger.className !== 'quickbuffActivate') {return;}
  quickbuff([window.self], [trigger.dataset.buffid])
    .done(processResult(trigger));
}
