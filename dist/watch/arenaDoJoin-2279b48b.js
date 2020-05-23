import { A as getElementById, ay as nowSecs, ai as set, bk as infoBox, S as querySelector, ak as get, u as partial, a2 as sendEvent } from './calfSystem-e592bbc5.js';
import './dontPost-6ead6cf8.js';
import './numberIsNaN-adb5919f.js';
import './setTipped-dbfb5305.js';
import './all-00afcb6d.js';
import './allthen-09db85f7.js';
import './lvlTests-f2af1de6.js';
import './loadDataTables-0ef0d745.js';
import { i as injectArena } from './arena-c0538972.js';
import './changeMinMax-e8d84f55.js';
import './assets-2e66506c.js';
import './updateUrl-671d33cf.js';
import './arena-17df483f.js';

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
//# sourceMappingURL=arenaDoJoin-2279b48b.js.map
