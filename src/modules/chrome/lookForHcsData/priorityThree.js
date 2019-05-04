import add from '../../support/task';
import changeGuildLogHREF from '../changeGuildLogHREF';
import injectFSBoxLog from '../injectFSBoxLog';
import injectHomePageTwoLink from '../../news/injectHomePageTwoLink';
import injectJoinAllLink from '../notification/injectJoinAllLink';
import injectLevelupCalculator from '../calcs/injectLevelupCalculator';
import injectMenu from '../accordion/injectMenu';
import injectQuickMsgDialogJQ from '../messaging/messaging';
import injectServerNode from '../injectServerNode';
import injectStaminaCalculator from '../calcs/injectStaminaCalculator';
import interceptQuickBuff from '../interceptQuickBuff';
import scoutTowerLink from '../scoutTowerLink';
import statbar from '../statBar';

function asyncPThree(fn) {add(3, fn);}

export default function priorityThree() {
  [
    statbar,
    injectStaminaCalculator,
    injectLevelupCalculator,
    injectMenu,
    injectFSBoxLog,
    interceptQuickBuff,
    injectJoinAllLink,
    changeGuildLogHREF,
    injectHomePageTwoLink,
    injectQuickMsgDialogJQ,
    injectServerNode,
    scoutTowerLink
  ].forEach(asyncPThree);
}
