import add from '../support/task';
import getValue from '../system/getValue';
import partial from '../common/partial';

function makeSound(soundLocation, i, e) {
  $(e).after('<audio src="' + soundLocation + '" autoplay=true />');
}

function doMsgSound() { // jQuery
  var soundLocation = getValue('defaultMessageSound');
  var boundSound = partial(makeSound, soundLocation);
  $('a:contains("New log messages"):first').each(boundSound);
  $('a:contains("New Guild chat message"):first').each(boundSound);
}

export default function isMessageSound() {
  if (getValue('playNewMessageSound')) {
    add(3, doMsgSound);
  }
}
