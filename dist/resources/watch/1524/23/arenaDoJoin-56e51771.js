import { y as getElementById, T as nowSecs, a$ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-2b1fed3f.js';
import './numberIsNaN-cb2409eb.js';
import './setTipped-d4d554a0.js';
import './currentGuildId-e952c248.js';
import './intValue-0e84cdad.js';
import { s as set, g as get } from './idb-549f3966.js';
import './formToUrl-b13d3faa.js';
import './interceptSubmit-b78fe85b.js';
import './closest-5107b89a.js';
import './closestTr-ccf7f767.js';
import './lvlTests-d0abd164.js';
import './all-9da52a21.js';
import './loadDataTables-22902379.js';
import './allthen-f8a5c187.js';
import { i as injectArena } from './arena-2fa2d3e4.js';
import './changeMinMax-29622459.js';
import './assets-06ec229a.js';
import './arena-ac8ad2ef.js';

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
//# sourceMappingURL=arenaDoJoin-56e51771.js.map
