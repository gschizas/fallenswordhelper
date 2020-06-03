import { x as getElementById, R as nowSecs, b0 as infoBox, N as querySelector, r as partial, U as sendEvent } from './calfSystem-03895320.js';
import './dontPost-8839e18d.js';
import './numberIsNaN-1467576c.js';
import './setTipped-2c57b90e.js';
import './currentGuildId-2be1b92f.js';
import './intValue-f7827250.js';
import { s as set, g as get } from './idb-1121a73b.js';
import './closest-6956725d.js';
import './all-c09a0f87.js';
import './allthen-08c6176a.js';
import './closestTr-bf590a13.js';
import './lvlTests-b222d8e3.js';
import './loadDataTables-ab46ff7b.js';
import { i as injectArena } from './arena-2b818dc1.js';
import './changeMinMax-8b102545.js';
import './assets-15133e04.js';
import './updateUrl-7530a8b3.js';
import './arena-1d891cc7.js';

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
//# sourceMappingURL=arenaDoJoin-48031abc.js.map
