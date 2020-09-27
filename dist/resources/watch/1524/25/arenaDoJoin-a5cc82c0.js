import { y as getElementById, T as nowSecs, a$ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-0ffc234f.js';
import './numberIsNaN-929de7af.js';
import './setTipped-64e874d6.js';
import './currentGuildId-a05aee13.js';
import './intValue-65d3c36c.js';
import { s as set, g as get } from './idb-b52eaa3c.js';
import './formToUrl-a527c245.js';
import './interceptSubmit-b0fa4c9c.js';
import './closest-8d8d60b3.js';
import './closestTr-0d1dc3c5.js';
import './lvlTests-62970e0d.js';
import './all-3791b7d5.js';
import './loadDataTables-93cc4f12.js';
import './allthen-ad810e11.js';
import { i as injectArena } from './arena-dc9ee5a6.js';
import './changeMinMax-502ef301.js';
import './assets-73a041e8.js';
import './arena-9893c453.js';

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
//# sourceMappingURL=arenaDoJoin-a5cc82c0.js.map
