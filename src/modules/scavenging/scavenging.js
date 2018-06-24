import lookForMultiplierCount from './lookForMultiplierCount';
import lookForScavBtn from './lookForScavBtn';
import lookForSendRequest from './lookForSendRequest';

export default function injectScavenging() {
  lookForScavBtn();
  lookForSendRequest();
  lookForMultiplierCount();
}
