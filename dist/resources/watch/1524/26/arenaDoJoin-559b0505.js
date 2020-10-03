import { y as getElementById, T as nowSecs, a$ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-c851a12c.js';
import './numberIsNaN-a6bcb044.js';
import './setTipped-7d31935e.js';
import './currentGuildId-25856d67.js';
import './intValue-e4cdd281.js';
import { s as set, g as get } from './idb-6207cbac.js';
import './formToUrl-19af2e75.js';
import './interceptSubmit-ad55085a.js';
import './closest-c2515a48.js';
import './closestTr-edab17ad.js';
import './lvlTests-7a9795f8.js';
import './all-646b32fa.js';
import './loadDataTables-ae2f6e83.js';
import './allthen-18c82be8.js';
import { i as injectArena } from './arena-17141e4f.js';
import './changeMinMax-bf9a1252.js';
import './assets-d1187a02.js';
import './arena-bcaaac58.js';

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
//# sourceMappingURL=arenaDoJoin-559b0505.js.map
