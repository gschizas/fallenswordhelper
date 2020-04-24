import { A as getElementById, ay as nowSecs, aj as set, bk as infoBox, S as querySelector, ai as get, u as partial, a2 as sendEvent } from './calfSystem-69cf053a.js';
import './dontPost-e04d2e64.js';
import './numberIsNaN-4a77fba0.js';
import './all-0cd3fb64.js';
import './allthen-1d09caaf.js';
import './lvlTests-705eb19b.js';
import './loadDataTables-9aef83ef.js';
import { i as injectArena } from './arena-c9e14e39.js';
import './changeMinMax-7ace2f7c.js';
import './assets-456e41a0.js';
import './updateUrl-bbc8ec42.js';
import './arena-4309bfb4.js';

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
//# sourceMappingURL=arenaDoJoin-39d97646.js.map
