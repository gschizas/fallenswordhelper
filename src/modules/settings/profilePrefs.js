import bunchOfSimple from './bunchOfSimple';
import getValue from '../system/getValue';
import {helpLink} from './simpleCheckbox';
import isValueChecked from './isValueChecked';

export default function profilePrefs() {
  // profile prefs
  return '<tr><th colspan="2"><b>Profile preferences</b></th></tr>' +

    bunchOfSimple([
      'renderSelfBio',
      'renderOtherBios'
    ]) +

    '<tr><td class="fshRight">Enable Bio Compressor' +
      helpLink('Enable Bio Compressor',
        'This will compress long bios according to settings and provide a ' +
        'link to expand the compressed section.') +
      ':</td><td><input name="enableBioCompressor" type="checkbox" ' +
      'value="on"' +
      isValueChecked('enableBioCompressor') +
      '> Max Characters:<input name="maxCompressedCharacters" size="4" ' +
      'value="' + getValue('maxCompressedCharacters') + '" />' +
      ' Max Lines:<input name="maxCompressedLines" size="3" value="' +
      getValue('maxCompressedLines') + '"></td></tr>' +

    '<tr><td class="fshRight">Buy Buffs Greeting' +
      helpLink('Buy Buffs Greeting',
        'This is the default text to open a message with when asking to ' +
        'buy buffs. You can use {playername} to insert the target players ' +
        'name. You can also use {buffs} to insert the list of buffs. You ' +
        'can use {cost} to insert the total cost of the buffs.') +
      ':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" ' +
      'value="' + getValue('buyBuffsGreeting') + '"></td></tr>' +

    bunchOfSimple([
      'showStatBonusTotal',
      'enableQuickDrink',
      'disableDeactivatePrompts',
      'highlightPvpProtection'
    ]);
}
