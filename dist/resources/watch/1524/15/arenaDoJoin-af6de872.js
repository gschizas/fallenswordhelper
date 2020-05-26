import { x as getElementById, Q as nowSecs, a5 as set, b1 as infoBox, M as querySelector, a7 as get, r as partial, T as sendEvent } from './calfSystem-b469667c.js';
import './dontPost-b432474a.js';
import './numberIsNaN-37f2e6cd.js';
import './setTipped-fa603e24.js';
import './currentGuildId-582db9c2.js';
import './intValue-8eb7c4cb.js';
import './all-3724e9c1.js';
import './allthen-5bad1519.js';
import './lvlTests-b1fd7a72.js';
import './loadDataTables-d2a8e1c4.js';
import { i as injectArena } from './arena-342268e5.js';
import './changeMinMax-efa4ff57.js';
import './assets-0754dcc2.js';
import './updateUrl-d377e06e.js';
import './arena-dbee633d.js';

function addId(id, obj) {
  const newObj = obj || {};
  newObj[id] = nowSecs;
  set('fsh_arenaFull', newObj);
}

function maxMoves(thisInfo) {
  return thisInfo && thisInfo.includes('combat move');
}

function yourGuild(thisInfo) {
  return thisInfo && thisInfo.includes('your guild');
}

function evalMsg() {
  const thisInfo = infoBox();
  if (maxMoves(thisInfo)) { return; }
  if (yourGuild(thisInfo)) {
    const thisId = querySelector('#pCC input[name="pvp_id"]').value;
    get('fsh_arenaFull').then(partial(addId, thisId));
  } else {
    sendEvent('arena', 'doJoin', thisInfo);
  }
}

function arenaDoJoin() {
  const tabs = getElementById('arenaTypeTabs');
  if (tabs) {
    injectArena();
  } else {
    evalMsg();
  }
}

export default arenaDoJoin;
//# sourceMappingURL=arenaDoJoin-af6de872.js.map
