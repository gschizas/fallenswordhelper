import dialogMsg from '../common/dialogMsg';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import isObject from '../common/isObject';
import jQueryNotPresent from '../common/jQueryNotPresent';
import jsonParse from '../common/jsonParse';
import {listValues} from '../system/listValues';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import setValue from '../system/setValue';

function drawBox(content, fshSettings) {
  content.innerHTML = '<h1>FSH Settings</h1><br><center>The box below ' +
    'is your current settings. Copy it to save your current settings<br>' +
    'To load saved settings, simply replace the contents of the box with ' +
    'your saved copy and press the button below.' +
    '<textarea align="center" cols="80" rows="25" style="' +
    'background-color:white;' +
    'font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" ' +
    'id="HelperfshSettings" name="fshSettings">' +
    JSON.stringify(fshSettings) + '</textarea>' +
    '<br><input id="HelperLoadSettings" class="custombutton" ' +
    'type="submit" value="Load Settings!" /></center>';
}

function saveSetting(settings, id) {
  setValue(id, settings[id]);
}

function clickHandler() {
  var userInput = jsonParse(getElementById('HelperfshSettings').value);
  if (isObject(userInput)) {
    var settings = userInput;
    Object.keys(settings).forEach(partial(saveSetting, settings));
    dialogMsg('Settings loaded successfully!');
  }
}

function buildSettingsObj(prev, curr) {
  prev[curr] = getValue(curr);
  return prev;
}

export default function injectSaveSettings() { // Hybrid
  if (jQueryNotPresent()) {return;}
  var fshSettings = listValues().reduce(buildSettingsObj, {});
  drawBox(pCC, fshSettings);
  $('#HelperLoadSettings').click(clickHandler);
}
