import { A as getElementById, ay as nowSecs, ai as set, bk as infoBox, S as querySelector, ak as get, u as partial, a2 as sendEvent } from './calfSystem-5ce1fc75.js';
import './dontPost-81b0b66f.js';
import './numberIsNaN-2472e643.js';
import './setTipped-16d6b447.js';
import './all-ef35ce51.js';
import './allthen-30db4f8c.js';
import './lvlTests-79aacd9f.js';
import './loadDataTables-eb1a39b4.js';
import { i as injectArena } from './arena-d1e5a819.js';
import './changeMinMax-41180c18.js';
import './assets-8a214660.js';
import './updateUrl-f2a9e464.js';
import './arena-3310e2e0.js';

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
//# sourceMappingURL=arenaDoJoin-6ed5e7bb.js.map
