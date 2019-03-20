import add from '../support/task';
import getArrayByTagName from '../common/getArrayByTagName';
import getValue from '../system/getValue';
import includes from '../common/includes';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import {pCL} from '../support/layout';

function doMsgSound() {
  var msg = getArrayByTagName('a', pCL).filter(includes('message'));
  if (msg.length) {
    insertHtmlBeforeEnd(document.body,
      '<audio src="' + getValue('defaultMessageSound') + '" autoplay=true />');
  }
}

export default function isMessageSound() {
  if (getValue('playNewMessageSound')) {
    add(3, doMsgSound);
  }
}
