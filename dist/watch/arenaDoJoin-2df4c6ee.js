import { A as getElementById, ay as nowSecs, aj as set, bk as infoBox, S as querySelector, ai as get, u as partial, a2 as sendEvent } from './calfSystem-1499e8da.js';
import './dontPost-f6e0d9ec.js';
import './numberIsNaN-02f5e218.js';
import './all-5a1f9691.js';
import './allthen-f12255e2.js';
import './lvlTests-d1e204af.js';
import './loadDataTables-9c4ec21e.js';
import { i as injectArena } from './arena-e502560c.js';
import './changeMinMax-dce9df4b.js';
import './assets-bc245e94.js';
import './updateUrl-c7cb7382.js';
import './arena-c2400950.js';

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
//# sourceMappingURL=arenaDoJoin-2df4c6ee.js.map
