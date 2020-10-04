import { y as getElementById, U as nowSecs, a$ as infoBox, D as querySelector, s as partial, X as sendEvent } from './calfSystem-975d976a.js';
import './numberIsNaN-871eca26.js';
import './setTipped-141d3404.js';
import './currentGuildId-fe3aa388.js';
import './intValue-ef353ded.js';
import { s as set, g as get } from './idb-9c55d032.js';
import './formToUrl-5a234537.js';
import './interceptSubmit-653ee929.js';
import './closest-79b9364e.js';
import './closestTr-a1708d78.js';
import './lvlTests-fb8bdb4f.js';
import './all-e81516b4.js';
import './loadDataTables-72cfef4b.js';
import './allthen-dd6cac31.js';
import { i as injectArena } from './arena-6a908b3b.js';
import './changeMinMax-5e8dfd5c.js';
import './assets-9f475ea8.js';
import './arena-72c98251.js';

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
//# sourceMappingURL=arenaDoJoin-6b75c616.js.map
