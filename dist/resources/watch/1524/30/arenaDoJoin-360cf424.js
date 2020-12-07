import { y as getElementById, T as nowSecs, a_ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-d357ca6f.js';
import './numberIsNaN-fa7d637d.js';
import './setTipped-c3fa7f51.js';
import './currentGuildId-bcd6f2c1.js';
import './intValue-e8157483.js';
import { s as set, g as get } from './idb-255a2314.js';
import './formToUrl-b0bbd7c6.js';
import './interceptSubmit-8526eadf.js';
import './closest-3bdef2f3.js';
import './closestTr-ecf1563a.js';
import './lvlTests-7b778cd4.js';
import './all-36f83e81.js';
import './loadDataTables-8cccad22.js';
import './allthen-7d061027.js';
import { i as injectArena } from './arena-83e70851.js';
import './changeMinMax-649d8c61.js';
import './assets-c6a1020c.js';
import './arena-ddded72b.js';

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
//# sourceMappingURL=arenaDoJoin-360cf424.js.map
