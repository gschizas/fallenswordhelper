import buildFshDivs from './buildFshDivs';
import calf from '../../support/calf';
import doHuntingBuffs from './doHuntingBuffs';
import getCombatBias from '../getCombatBias';
import getValue from '../../system/getValue';
import interceptXHR from '../interceptXHR';
import {prepareHidePlayerActions} from '../prepareHidePlayerActions';
import shouldBeArray from '../../system/shouldBeArray';

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

export default function worldPrefs() {
  getCombatBias();
  getPrefs();
  var missingBuffsDiv = buildFshDivs();
  interceptXHR();
  doHuntingBuffs(missingBuffsDiv);
  prepareHidePlayerActions();
}
