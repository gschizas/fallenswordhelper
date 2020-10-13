import { y as getElementById, T as nowSecs, a_ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-21d16a0e.js';
import './numberIsNaN-91041dcf.js';
import './setTipped-e5305fe4.js';
import './currentGuildId-ce8bf3c5.js';
import './intValue-f4d85578.js';
import { s as set, g as get } from './idb-42714ac8.js';
import './formToUrl-2fddf9de.js';
import './interceptSubmit-719ace11.js';
import './closest-9ef1a6fc.js';
import './closestTr-5bf285ab.js';
import './lvlTests-0092190a.js';
import './all-7e2b4bf6.js';
import './loadDataTables-dc805378.js';
import './allthen-7191069a.js';
import { i as injectArena } from './arena-bb4859d1.js';
import './changeMinMax-9ec858ae.js';
import './assets-48002450.js';
import './arena-81f3394d.js';

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
//# sourceMappingURL=arenaDoJoin-d8daa2eb.js.map
