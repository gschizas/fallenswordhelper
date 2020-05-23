import { A as getElementById, ay as nowSecs, ai as set, bk as infoBox, S as querySelector, ak as get, u as partial, a2 as sendEvent } from './calfSystem-cb5d894f.js';
import './dontPost-f7f61941.js';
import './numberIsNaN-ee5269f5.js';
import './setTipped-ef00e933.js';
import './all-e75ce0da.js';
import './allthen-050da718.js';
import './lvlTests-2726d8f6.js';
import './loadDataTables-db061ae9.js';
import { i as injectArena } from './arena-caed8a11.js';
import './changeMinMax-fe8725a9.js';
import './assets-d33c93ab.js';
import './updateUrl-d4184fca.js';
import './arena-9f3b654e.js';

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
//# sourceMappingURL=arenaDoJoin-3bcf71a3.js.map
