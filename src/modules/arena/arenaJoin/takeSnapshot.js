import all from '../../common/all';
import findArena from './findArena';
import {fromEntries} from '../../common/fromEntries';
import getArrayByTagName from '../../common/getArrayByTagName';
import getTextTrim from '../../common/getTextTrim';
import loadEquipped from '../../app/profile/loadequipped';
import {nowSecs} from '../../support/now';
import off from '../../common/off';
import once from '../../common/once';
import {pCC} from '../../support/layout';
import querySelector from '../../common/querySelector';
import {removeKeys} from '../../common/removeKeys';
import updateUrl from './updateUrl';
import view from '../../app/arena/view';
import {get, set} from 'idb-keyval';

function getStats() {
  const statLabels = getArrayByTagName('b', pCC).slice(2);
  return fromEntries(statLabels.map(b => [
    getTextTrim(b).replace(':', '').toLowerCase(),
    Number(getTextTrim(b.parentNode.nextElementSibling))
  ]));
}

async function buttonPress(e) {
  e.preventDefault();
  const [json, equipped, joinedArenas] = await all([view(), loadEquipped(),
    get('fsh_joinedArenas')]);
  const thisArena = removeKeys(['players'], findArena(json.r));
  if (thisArena.specials) {
    thisArena.slots = json.r.current_set.slots;
  }
  thisArena.equipped = equipped.r.map(o => removeKeys(['sp', 'v'], o));
  thisArena.joined = nowSecs;
  thisArena.seen = nowSecs;
  thisArena.stats = getStats();
  const newJoined = joinedArenas || [];
  newJoined.push(thisArena);
  await set('fsh_joinedArenas', newJoined);
  updateUrl(e);
}

export default function takeSnapshot() {
  const submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    off(submitButton, 'click', updateUrl);
    once(submitButton, 'click', buttonPress);
  }
}
