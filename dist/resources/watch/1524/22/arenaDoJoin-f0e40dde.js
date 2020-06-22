import { y as getElementById, T as nowSecs, a$ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-995e3482.js';
import './numberIsNaN-4e564176.js';
import './setTipped-0ede520a.js';
import './currentGuildId-8e64bbe5.js';
import './intValue-0c980717.js';
import { s as set, g as get } from './idb-ece4ba5b.js';
import './formToUrl-c6f1dab2.js';
import './interceptSubmit-49a349aa.js';
import './closest-b63f74e7.js';
import './closestTr-8d451a95.js';
import './lvlTests-8b2d6e25.js';
import './all-eb78e4af.js';
import './loadDataTables-8cd57880.js';
import './allthen-b5ef55e0.js';
import { i as injectArena } from './arena-77f9af2e.js';
import './changeMinMax-c2e02463.js';
import './assets-c67ab991.js';
import './arena-0b5e1553.js';

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
//# sourceMappingURL=arenaDoJoin-f0e40dde.js.map
