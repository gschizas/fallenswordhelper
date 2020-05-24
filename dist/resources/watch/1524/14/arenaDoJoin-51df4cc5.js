import { A as getElementById, ay as nowSecs, ai as set, bk as infoBox, S as querySelector, ak as get, u as partial, a2 as sendEvent } from './calfSystem-43606e5e.js';
import './dontPost-4ce1ffd1.js';
import './numberIsNaN-daa269b4.js';
import './setTipped-1b2870bf.js';
import './all-df45fbb2.js';
import './allthen-1113e879.js';
import './lvlTests-ac259a65.js';
import './loadDataTables-74eafaf5.js';
import { i as injectArena } from './arena-41d48396.js';
import './changeMinMax-80d5369e.js';
import './assets-b906e15f.js';
import './updateUrl-aaa5d3a2.js';
import './arena-1d991c84.js';

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
//# sourceMappingURL=arenaDoJoin-51df4cc5.js.map
