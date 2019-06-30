import daViewProfile from '../../_dataAccess/daViewProfile';
import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';
import partial from '../../common/partial';
import {def_subcmd, profileUrl} from '../../support/constants';

var jsonTests = [
  function(itemIndex, json) {return json;},
  function(itemIndex, json) {return json.s;},
  function(itemIndex, json) {return json.r;},
  function(itemIndex, json) {return json.r.equip_sets;},
  function(itemIndex, json) {return json.r.equip_sets.length > itemIndex;}
];

function funcPasses(itemIndex, json, fn) {return fn(itemIndex, json);}

function goodData(itemIndex, json) {
  return jsonTests.every(partial(funcPasses, itemIndex, json));
}

function changeCombatSet(itemIndex, json) {
  if (goodData(itemIndex, json)) {
    var cbsIndex = json.r.equip_sets[itemIndex].id;
    expandMenu('2');
    location.href = profileUrl + def_subcmd +
      'managecombatset&submit=Use&combatSetId=' + cbsIndex;
  }
}

export default function combatSetKey(itemIndex) {
  keyHandlerEvent('changeCombatSet');
  daViewProfile().then(partial(changeCombatSet, itemIndex));
}
