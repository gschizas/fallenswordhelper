import {createDiv} from '../../../common/cElement';
import {getElementById} from '../../../common/getElement';
import {huntingBuffsHtml} from '../../../settings/worldPrefs';
import insertElement from '../../../common/insertElement';
import insertElementBefore from '../../../common/insertElementBefore';
import isFunction from '../../../common/isFunction';
import on from '../../../common/on';
import {simpleCheckboxHtml} from '../../../settings/simpleCheckbox';
import {toggleBuffInfo} from '../buffInfo/buffInfo';
import toggleEnabledHuntingMode from './toggleEnabledHuntingMode';
import {toggleHidePlayerActions} from '../prepareHidePlayerActions';
import toggleShowCreatureInfo from './toggleShowCreatureInfo';
import toggleShowHuntingBuffs from './toggleShowHuntingBuffs';
import toggleShowMonsterLog from './toggleShowMonsterLog';
import {toggleShowTitanInfo} from '../titanStats/titanStats';
import toggleSubLvlCreature from './toggleSubLvlCreature';

function buildPrefsDiv() {
  return createDiv({
    id: 'fshWorldPrefs',
    innerHTML: simpleCheckboxHtml('showCreatureInfo') + '&nbsp;&nbsp;' +
      simpleCheckboxHtml('showMonsterLog') + '&nbsp;&nbsp;' +
      simpleCheckboxHtml('showTitanInfo') + '&nbsp;&nbsp;' +
      simpleCheckboxHtml('showBuffInfo') +
      '<br>' +
      simpleCheckboxHtml('hideSubLvlCreature') + '&nbsp;&nbsp;' +
      simpleCheckboxHtml('hidePlayerActions') + '&nbsp;&nbsp;' +
      huntingBuffsHtml()
  });
}

var fshEvents = {
  hideSubLvlCreature: toggleSubLvlCreature,
  hidePlayerActions: toggleHidePlayerActions,
  showCreatureInfo: toggleShowCreatureInfo,
  showHuntingBuffs: toggleShowHuntingBuffs,
  showMonsterLog: toggleShowMonsterLog,
  showTitanInfo: toggleShowTitanInfo,
  showBuffInfo: toggleBuffInfo
};

function prefsClickEvent(e) {
  var tmpFn = fshEvents[e.target.name];
  if (isFunction(tmpFn)) {
    e.target.blur();
    tmpFn(e);
  }
}

export default function buildFshDivs() {
  var fshDiv = createDiv({className: 'fshCenter fshFten'});
  var prefsDiv = buildPrefsDiv();
  on(prefsDiv, 'click', prefsClickEvent);
  on(prefsDiv, 'change', toggleEnabledHuntingMode);
  insertElement(fshDiv, prefsDiv);
  var missingBuffsDiv = createDiv();
  insertElement(fshDiv, missingBuffsDiv);
  var tempWorldButtons = getElementById('worldContainerBelow').children[0];
  insertElementBefore(fshDiv, tempWorldButtons);
  return missingBuffsDiv;
}
