import { x as getElementById, R as nowSecs, b0 as infoBox, N as querySelector, r as partial, U as sendEvent } from './calfSystem-f6498976.js';
import './dontPost-9f2bc09d.js';
import './numberIsNaN-79df6758.js';
import './setTipped-2fe29612.js';
import './currentGuildId-6087beb5.js';
import './intValue-5c91f5c6.js';
import { s as set, g as get } from './idb-19d381b0.js';
import './closest-07392fae.js';
import './all-f66c7ff9.js';
import './allthen-dc1e6fe7.js';
import './closestTr-c7a10c8a.js';
import './lvlTests-a9238b1c.js';
import './loadDataTables-b03787dd.js';
import { i as injectArena } from './arena-b9cda89e.js';
import './changeMinMax-430f0e7e.js';
import './assets-0f6cb8d5.js';
import './updateUrl-18768626.js';
import './arena-4f8c6a68.js';

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
//# sourceMappingURL=arenaDoJoin-ed04a6d0.js.map
