import add from '../../support/task';
import injectMenu from '../accordion/injectMenu';
import injectQuickMsgDialogJQ from '../messaging/messaging';
import injectServerNode from '../injectServerNode';
import scoutTowerLink from '../scoutTowerLink';

function asyncPThree(fn) { add(3, fn); }

export default function priorityThree() {
  [
    injectMenu,
    injectQuickMsgDialogJQ,
    injectServerNode,
    scoutTowerLink,
  ].forEach(asyncPThree);
}
