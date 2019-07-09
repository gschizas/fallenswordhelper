import {daQuickbuff} from '../_dataAccess/_dataAccess';
import partial from '../common/partial';
import quickbuffSuccess from '../common/quickbuffSuccess';

function processResult(trigger, json) {
  if (quickbuffSuccess(json)) {
    trigger.className = 'fshLime';
    trigger.innerHTML = 'On';
  }
}

export default function quickActivate(evt) { // jQuery.min
  var trigger = evt.target;
  if (trigger.className !== 'quickbuffActivate') {return;}
  daQuickbuff([window.self], [trigger.dataset.buffid])
    .then(partial(processResult, trigger));
}
