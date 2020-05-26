import add from '../../support/task';
import injectMenu from '../accordion/injectMenu';
import injectQuickMsgDialogJQ from '../messaging/messaging';

function asyncPThree(fn) { add(3, fn); }

export default function priorityThree() {
  [
    injectMenu,
    injectQuickMsgDialogJQ,
  ].forEach(asyncPThree);
}
