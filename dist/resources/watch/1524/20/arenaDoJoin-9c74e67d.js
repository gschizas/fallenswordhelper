import { y as getElementById, T as nowSecs, a$ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-c0288c6c.js';
import './numberIsNaN-0a1aaf72.js';
import './setTipped-88a9e306.js';
import './currentGuildId-d935e4f2.js';
import './intValue-e7ac83e4.js';
import { s as set, g as get } from './idb-247b069e.js';
import './formToUrl-112a5041.js';
import './interceptSubmit-cad751a8.js';
import './closest-a642edd4.js';
import './closestTr-076ccf71.js';
import './lvlTests-2eca8573.js';
import './all-1a225b40.js';
import './loadDataTables-449addeb.js';
import './allthen-f473bbe4.js';
import { i as injectArena } from './arena-e151aa57.js';
import './changeMinMax-4e0b95be.js';
import './assets-4920d856.js';
import './arena-8ae58e27.js';

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
//# sourceMappingURL=arenaDoJoin-9c74e67d.js.map
