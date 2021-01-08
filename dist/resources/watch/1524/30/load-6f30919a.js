import { bk as GMSTORAGE_PATH, x as jQueryNotPresent, A as setInnerHtml, V as setValue, aN as jsonParse, y as getElementById, aU as isObject, au as keys, s as partial, G as getValue, p as pCC } from './calfSystem-d357ca6f.js';
import { d as dialogMsg } from './dialogMsg-27e2dc98.js';

function listValues() {
  const list = [];
  const reKey = new RegExp(`^${GMSTORAGE_PATH}`);
  for (let i = 0, il = window.localStorage.length; i < il; i += 1) {
    const key = window.localStorage.key(i);
    if (key.match(reKey)) {
      list.push(key.replace(GMSTORAGE_PATH, ''));
    }
  }
  return list;
}

function drawBox(content, fshSettings) {
  setInnerHtml('<h1>FSH Settings</h1><br><center>The box below '
    + 'is your current settings. Copy it to save your current settings<br>'
    + 'To load saved settings, simply replace the contents of the box with '
    + 'your saved copy and press the button below.'
    + '<textarea align="center" cols="80" rows="25" style="'
    + 'background-color:white;'
    + 'font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" '
    + `id="HelperfshSettings" name="fshSettings">${
      JSON.stringify(fshSettings)}</textarea>`
    + '<br><input id="HelperLoadSettings" class="custombutton" '
    + 'type="submit" value="Load Settings!" /></center>', content);
}

function saveSetting(settings, id) {
  setValue(id, settings[id]);
}

function clickHandler() {
  const userInput = jsonParse(getElementById('HelperfshSettings').value);
  if (isObject(userInput)) {
    const settings = userInput;
    keys(settings).forEach(partial(saveSetting, settings));
    dialogMsg('Settings loaded successfully!');
  }
}

function buildSettingsObj(acc, curr) {
  acc[curr] = getValue(curr);
  return acc;
}

function injectSaveSettings() { // Hybrid
  if (jQueryNotPresent()) { return; }
  const fshSettings = listValues().reduce(buildSettingsObj, {});
  drawBox(pCC, fshSettings);
  $('#HelperLoadSettings').on('click', clickHandler);
}

export default injectSaveSettings;
//# sourceMappingURL=load-6f30919a.js.map
