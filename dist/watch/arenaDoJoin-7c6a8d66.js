import { A as getElementById, ay as nowSecs, aj as set, bk as infoBox, S as querySelector, ai as get, u as partial, a2 as sendEvent } from './calfSystem-05ea3a63.js';
import './dontPost-0ff218c1.js';
import './numberIsNaN-825e71c2.js';
import './setTipped-99d3968e.js';
import './all-c9a2b6b5.js';
import './allthen-f9ff4d25.js';
import './lvlTests-8b60a777.js';
import './loadDataTables-3a7296f0.js';
import { i as injectArena } from './arena-2ebe777f.js';
import './changeMinMax-f7b98da2.js';
import './assets-b89886ca.js';
import './updateUrl-bddae85c.js';
import './arena-a11fb466.js';

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
//# sourceMappingURL=arenaDoJoin-7c6a8d66.js.map
