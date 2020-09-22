import { y as getElementById, T as nowSecs, a$ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-dea093d3.js';
import './numberIsNaN-00e0daaf.js';
import './setTipped-5c176332.js';
import './currentGuildId-d9de8509.js';
import './intValue-44683b42.js';
import { s as set, g as get } from './idb-8edbec07.js';
import './formToUrl-a24fc80c.js';
import './interceptSubmit-609c1a86.js';
import './closest-d8e60c46.js';
import './closestTr-2da673ed.js';
import './lvlTests-1afc4fc9.js';
import './all-e4fd8fad.js';
import './loadDataTables-ed89c30b.js';
import './allthen-c22b3f9e.js';
import { i as injectArena } from './arena-084ecbb0.js';
import './changeMinMax-1374d190.js';
import './assets-cc59cb67.js';
import './arena-35a61c5d.js';

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
//# sourceMappingURL=arenaDoJoin-263f0108.js.map
