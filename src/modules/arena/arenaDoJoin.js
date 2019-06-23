import {getElementById} from '../common/getElement';
import infoBox from '../common/infoBox';
import {injectArena} from './arena';
import querySelector from '../common/querySelector';

//#if _DEV  //  arena DoJoin
function getMsg() {
  const thisInfo = infoBox();
  console.log(thisInfo); // eslint-disable-line no-console
}

function getId() {
  const thisId = querySelector('#pCC input[name="pvp_id"]');
  console.log(thisId.value); // eslint-disable-line no-console
}

//#endif
export default function arenaDoJoin() {
  // console.log('arena DoJoin');
  const tabs = getElementById('arenaTypeTabs');
  if (tabs) {
    injectArena();
  //#if _DEV  //  arena DoJoin
  } else {
    getMsg();
    getId();
  //#endif
  }
}
