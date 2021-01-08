import daQuickbuff from '../_dataAccess/daQuickbuff';
import partial from '../common/partial';
import quickbuffSuccess from '../common/quickbuffSuccess';
import setInnerHtml from '../dom/setInnerHtml';

function processResult(trigger, json) {
  if (quickbuffSuccess(json)) {
    // eslint-disable-next-line no-param-reassign
    trigger.className = 'fshLime';
    setInnerHtml('On', trigger);
  }
}

export default function quickActivate(evt) { // jQuery.min
  const trigger = evt.target;
  if (trigger.className !== 'quickbuffActivate') { return; }
  daQuickbuff([window.self], [trigger.dataset.buffid])
    .then(partial(processResult, trigger));
}
