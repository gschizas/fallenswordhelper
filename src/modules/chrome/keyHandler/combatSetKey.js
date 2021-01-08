import daViewProfile from '../../_dataAccess/daViewProfile';
import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';
import partial from '../../common/partial';
import { defSubcmd, profileUrl } from '../../support/constants';

const jsonTests = [
  (itemIndex, json) => json,
  (itemIndex, json) => json.s,
  (itemIndex, json) => json.r,
  (itemIndex, json) => json.r.equip_sets,
  (itemIndex, json) => json.r.equip_sets.length > itemIndex,
];

function funcPasses(itemIndex, json, fn) { return fn(itemIndex, json); }

function goodData(itemIndex, json) {
  return jsonTests.every(partial(funcPasses, itemIndex, json));
}

function changeCombatSet(itemIndex, json) {
  if (goodData(itemIndex, json)) {
    const cbsIndex = json.r.equip_sets[itemIndex].id;
    expandMenu('2');
    window.location.href = `${profileUrl + defSubcmd
    }managecombatset&submit=Use&combatSetId=${cbsIndex}`;
  }
}

export default function combatSetKey(itemIndex) {
  keyHandlerEvent('changeCombatSet');
  daViewProfile().then(partial(changeCombatSet, itemIndex));
}
