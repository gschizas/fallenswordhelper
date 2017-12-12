import calf from '../support/calf';
import {createDiv} from '../common/cElement';
import {getElementById} from '../common/getElement';
import {huntingBuffsHtml} from '../settings/worldPrefs';
import insertElement from '../common/insertElement';
import insertElementBefore from '../common/insertElementBefore';
import {simpleCheckboxHtml} from '../settings/settingsPage';
import {toggleShowTitanInfo} from './titanStats/titanStats';
import {
  doHuntingBuffs,
  toggleEnabledHuntingMode,
  toggleShowHuntingBuffs
} from './doHuntingBuffs';
import {getValue, shouldBeArray} from '../support/system';
import {interceptXHR, toggleSubLvlCreature} from './interceptXHR';
import {
  prepareHidePlayerActions,
  toggleHidePlayerActions
} from './prepareHidePlayerActions';
import {toggleShowCreatureInfo, toggleShowMonsterLog} from './monsterLog';

export var missingBuffsDiv;

function getPrefs() {
  calf.buffs = shouldBeArray('huntingBuffs');
  calf.buffsName = getValue('huntingBuffsName');
  calf.buffs2 = shouldBeArray('huntingBuffs2');
  calf.buffs2Name = getValue('huntingBuffs2Name');
  calf.buffs3 = shouldBeArray('huntingBuffs3');
  calf.buffs3Name = getValue('huntingBuffs3Name');
  calf.doNotKillList = shouldBeArray('doNotKillList');
  calf.enabledHuntingMode = getValue('enabledHuntingMode');
  calf.hideSubLvlCreature = getValue('hideSubLvlCreature');
  calf.showBuffs = getValue('showHuntingBuffs');
  calf.showTitanInfo = getValue('showTitanInfo');
}

var fshEvents = {
  hideSubLvlCreature: toggleSubLvlCreature,
  hidePlayerActions: toggleHidePlayerActions,
  showCreatureInfo: toggleShowCreatureInfo,
  showHuntingBuffs: toggleShowHuntingBuffs,
  showMonsterLog: toggleShowMonsterLog,
  showTitanInfo: toggleShowTitanInfo
};

function prefsClickEvent(e) {
  var tmpFn = fshEvents[e.target.name];
  if (typeof tmpFn === 'function') {
    e.target.blur();
    tmpFn(e);
  }
}

function buildFshDivs() {
  var fshDiv = createDiv({className: 'fshCenter fshFten'});
  var prefsDiv = createDiv({
    id: 'fshWorldPrefs',
    innerHTML: simpleCheckboxHtml('showCreatureInfo') + '&nbsp;&nbsp;' +
      simpleCheckboxHtml('showMonsterLog') + '&nbsp;&nbsp;' +
      simpleCheckboxHtml('showTitanInfo') + '&nbsp;&nbsp;' +
      '<br>' +
      simpleCheckboxHtml('hideSubLvlCreature') + '&nbsp;&nbsp;' +
      simpleCheckboxHtml('hidePlayerActions') + '&nbsp;&nbsp;' +
      huntingBuffsHtml()
  });
  prefsDiv.addEventListener('click', prefsClickEvent);
  prefsDiv.addEventListener('change', toggleEnabledHuntingMode);
  insertElement(fshDiv, prefsDiv);
  missingBuffsDiv = createDiv();
  insertElement(fshDiv, missingBuffsDiv);
  var tempWorldButtons = getElementById('worldContainerBelow').children[0];
  insertElementBefore(fshDiv, tempWorldButtons);
}

export default function worldPrefs() {
  getPrefs();
  buildFshDivs();
  interceptXHR();
  doHuntingBuffs();
  prepareHidePlayerActions();
}
