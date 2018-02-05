import add from '../support/task';
import {getValue} from '../system/system';

function doMsgSound() { // jQuery
  var soundLocation = getValue('defaultMessageSound');
  $('a:contains("New log messages"):first').each(function(i, e) {
    $(e).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
  $('a:contains("New Guild chat message"):first').each(function(i, e) {
    $(e).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
}

export default function isMessageSound() {
  if (getValue('playNewMessageSound')) {
    add(3, doMsgSound);
  }
}
