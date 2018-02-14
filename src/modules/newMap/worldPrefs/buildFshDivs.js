import {createDiv} from '../../common/cElement';
import {getElementById} from '../../common/getElement';
import {huntingBuffsHtml} from '../../settings/worldPrefs';
import insertElement from '../../common/insertElement';
import insertElementBefore from '../../common/insertElementBefore';
import isFunction from '../../common/isFunction';
import {simpleCheckboxHtml} from '../../settings/simpleCheckbox';
import toggleEnabledHuntingMode from './toggleEnabledHuntingMode';
import {toggleHidePlayerActions} from '../prepareHidePlayerActions';
import {toggleShowCreatureInfo} from '../monsterLog/creatureInfo';
import toggleShowHuntingBuffs from './toggleShowHuntingBuffs';
import {toggleShowMonsterLog} from '../monsterLog/processMonsterLog';
import {toggleShowTitanInfo} from '../titanStats/titanStats';
import {toggleSubLvlCreature} from '../interceptXHR';

export var missingBuffsDiv;

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
  if (isFunction(tmpFn)) {
    e.target.blur();
    tmpFn(e);
  }
}

export function buildFshDivs() {
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
  insertElementBefore(fshDiv, prefsDiv);
  missingBuffsDiv = createDiv();
  insertElement(fshDiv, missingBuffsDiv);
  var tempWorldButtons = getElementById('worldContainerBelow').children[0];
  insertElementBefore(fshDiv, tempWorldButtons);
}
