import { y as getElementById, U as nowSecs, ak as infoBox, D as querySelector, s as partial, X as sendEvent } from './calfSystem-e64be67d.js';
import { i as injectArena } from './arena-96bc6ccd.js';
import { s as set, g as get } from './idb-1d4ba436.js';
import './allthen-975bc488.js';
import './all-31b59575.js';
import './closestTr-c6e9d2aa.js';
import './closest-331833f9.js';
import './intValue-da5ad0eb.js';
import './changeMinMax-b9ad340a.js';
import './numberIsNaN-fecd7e6d.js';
import './assets-3768dd31.js';
import './lvlTests-6c76a220.js';
import './interceptSubmit-448d7237.js';
import './formToUrl-b80842cb.js';
import './loadDataTables-14ceaa8c.js';
import './currentGuildId-d5e9890c.js';
import './setTipped-808b71de.js';

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
//# sourceMappingURL=arenaDoJoin-1beb83c6.js.map
