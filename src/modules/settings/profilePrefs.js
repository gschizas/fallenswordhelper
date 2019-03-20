import bunchOfSimple from './bunchOfSimple';
import getValue from '../system/getValue';
import {helpLink} from './simpleCheckbox';

function buffGreet() {
  return '<tr><td class="fshRight">Buy Buffs Greeting' +
    helpLink('Buy Buffs Greeting',
      'This is the default text to open a message with when asking to ' +
      'buy buffs. You can use {playername} to insert the target players ' +
      'name. You can also use {buffs} to insert the list of buffs. You ' +
      'can use {cost} to insert the total cost of the buffs.') +
    ':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" ' +
    'value="' + getValue('buyBuffsGreeting') + '"></td></tr>';
}

export default function profilePrefs() {
  // profile prefs
  return '<tr><th colspan="2"><b>Profile preferences</b></th></tr>' +
    bunchOfSimple([
      'renderSelfBio',
      'renderOtherBios',
      'enableBioCompressor'
    ]) +
    buffGreet() +
    bunchOfSimple([
      'showStatBonusTotal',
      'enableQuickDrink',
      'disableDeactivatePrompts',
      'highlightPvpProtection'
    ]);
}
