import { x as getElementById, R as nowSecs, b0 as infoBox, N as querySelector, r as partial, U as sendEvent } from './calfSystem-940bc1b5.js';
import './dontPost-2931988f.js';
import './numberIsNaN-6ac4f483.js';
import './setTipped-2d327644.js';
import './currentGuildId-86fac8cc.js';
import './intValue-883414eb.js';
import { s as set, g as get } from './idb-9fdca27d.js';
import './closest-3a8e7614.js';
import './all-d5dc3a0a.js';
import './allthen-aa100d71.js';
import './closestTr-746f9cb4.js';
import './lvlTests-5adf3fe9.js';
import './loadDataTables-f12bf290.js';
import { i as injectArena } from './arena-02939610.js';
import './changeMinMax-19fded4d.js';
import './assets-5d3515ba.js';
import './updateUrl-8026df84.js';
import './arena-b1919616.js';

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
//# sourceMappingURL=arenaDoJoin-552f2919.js.map
