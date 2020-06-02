import { x as getElementById, R as nowSecs, b0 as infoBox, N as querySelector, r as partial, U as sendEvent } from './calfSystem-6e4b53e3.js';
import './dontPost-2be1889c.js';
import './numberIsNaN-39eae3cb.js';
import './setTipped-b108da58.js';
import './currentGuildId-a98deec3.js';
import './intValue-8ba42bf3.js';
import { s as set, g as get } from './idb-fc617077.js';
import './closest-c88159b8.js';
import './all-cabe488e.js';
import './allthen-daa2db1e.js';
import './closestTr-77eb7cb6.js';
import './lvlTests-6fa7ed7a.js';
import './loadDataTables-e00e8b6b.js';
import { i as injectArena } from './arena-55951cf4.js';
import './changeMinMax-6fde12b7.js';
import './assets-39ed51d4.js';
import './updateUrl-3e4d9c6f.js';
import './arena-eea8566c.js';

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
//# sourceMappingURL=arenaDoJoin-03cc9061.js.map
