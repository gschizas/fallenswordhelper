import {getElementById} from '../common/getElement';
//#if _DEV  //  arena DoJoin
import infoBox from '../common/infoBox';
//#endif
import {injectArena} from './arena';
//#if _DEV  //  arena DoJoin
import {nowSecs} from '../support/now';
import partial from '../common/partial';
import querySelector from '../common/querySelector';
import {sendEvent} from '../support/fshGa';
import {get, set} from 'idb-keyval';

function addId(id, obj) {
  const newObj = obj || {};
  newObj[id] = nowSecs;
  set('arenaFull', newObj);
}

function evalMsg() {
  const thisInfo = infoBox();
  if (thisInfo.includes('your guild')) {
    const thisId = querySelector('#pCC input[name="pvp_id"]').value;
    get('arenaFull').then(partial(addId, thisId));
  } else {
    sendEvent('arena', 'doJoin', thisInfo);
  }
}
//#endif

export default function arenaDoJoin() {
  // console.log('arena DoJoin');
  const tabs = getElementById('arenaTypeTabs');
  if (tabs) {
    injectArena();
  //#if _DEV  //  arena DoJoin
  } else {
    evalMsg();
  //#endif
  }
}
