import { y as getElementById, T as nowSecs, a$ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-b0234231.js';
import './numberIsNaN-ce079190.js';
import './setTipped-d6c2ec67.js';
import './currentGuildId-4c0a45a6.js';
import './intValue-639b8a5f.js';
import { s as set, g as get } from './idb-0eb46835.js';
import './formToUrl-a03ba266.js';
import './interceptSubmit-e148f699.js';
import './closest-35d154f1.js';
import './closestTr-c876e070.js';
import './lvlTests-9c500746.js';
import './all-a828ac07.js';
import './loadDataTables-ae87b91e.js';
import './allthen-f3edc27b.js';
import { i as injectArena } from './arena-df28d283.js';
import './changeMinMax-97cd39f9.js';
import './assets-c532a14a.js';
import './arena-e4dc9dff.js';

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
//# sourceMappingURL=arenaDoJoin-ff98a590.js.map
