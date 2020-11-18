import { y as getElementById, T as nowSecs, a_ as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-b31646eb.js';
import './numberIsNaN-d1ebf732.js';
import './setTipped-56aeba85.js';
import './currentGuildId-d6a28488.js';
import './intValue-f94761c7.js';
import { s as set, g as get } from './idb-5f2321bd.js';
import './formToUrl-16cc4fc0.js';
import './interceptSubmit-86cfff6d.js';
import './closest-14c30e26.js';
import './closestTr-1c52e242.js';
import './lvlTests-99198e96.js';
import './all-01203f8c.js';
import './loadDataTables-b5e4d604.js';
import './allthen-ca11bf0c.js';
import { i as injectArena } from './arena-68a71bbe.js';
import './changeMinMax-09af108d.js';
import './assets-8c112bf6.js';
import './arena-729667cc.js';

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
//# sourceMappingURL=arenaDoJoin-5cd6c7d2.js.map
