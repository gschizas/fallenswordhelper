import * as system from '../support/system';
import * as task from '../support/task';

function doMsgSound() { // jQuery
  var soundLocation = system.getValue('defaultMessageSound');
  $('a:contains("New log messages"):first').each(function(i, e) {
    $(e).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
  $('a:contains("New Guild chat message"):first').each(function(i, e) {
    $(e).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
}

export default function isMessageSound() { // Native
  if (system.getValue('playNewMessageSound')) {
    task.add(3, doMsgSound);
  }
}
