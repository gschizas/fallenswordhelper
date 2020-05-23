import { A as getElementById, ay as nowSecs, ai as set, bk as infoBox, S as querySelector, ak as get, u as partial, a2 as sendEvent } from './calfSystem-98d7118c.js';
import './dontPost-043b70f2.js';
import './numberIsNaN-e9f5ff36.js';
import './setTipped-01bbdd92.js';
import './all-9add17de.js';
import './allthen-b462b65b.js';
import './lvlTests-96e3fa7f.js';
import './loadDataTables-b5a0df23.js';
import { i as injectArena } from './arena-78a3140b.js';
import './changeMinMax-235bca1d.js';
import './assets-325dd726.js';
import './updateUrl-04275bcc.js';
import './arena-4e3be6ba.js';

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
//# sourceMappingURL=arenaDoJoin-e5a47e6f.js.map
