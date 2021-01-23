import { y as getElementById, T as nowSecs, aj as infoBox, D as querySelector, s as partial, W as sendEvent } from './calfSystem-91adbec8.js';
import { i as injectArena } from './arena-42a8ba5b.js';
import { s as set, g as get } from './idb-321c4955.js';
import './allthen-3a9178b8.js';
import './all-6dfbd6b8.js';
import './closestTr-f6b34e95.js';
import './closest-77701dcf.js';
import './intValue-e7ef611d.js';
import './changeMinMax-9086d4c2.js';
import './numberIsNaN-53300e34.js';
import './assets-ad350aab.js';
import './lvlTests-25cf6756.js';
import './interceptSubmit-06382d8c.js';
import './formToUrl-b273f7df.js';
import './loadDataTables-eb63e1b8.js';
import './currentGuildId-748f657b.js';
import './setTipped-777d443c.js';

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
//# sourceMappingURL=arenaDoJoin-b37de617.js.map
