import buildFshDivs from './buildFshDivs';
import calf from '../../../support/calf';
import doHuntingBuffs from './doHuntingBuffs';
import getCombatBias from './getCombatBias';
import getValue from '../../../system/getValue';
import interceptXHR from './interceptXHR';
import {prepareHidePlayerActions} from '../prepareHidePlayerActions';
import shouldBeArray from '../../../system/shouldBeArray';

function arrayType() {
  [
    ['buffs', 'huntingBuffs'],
    ['buffs2', 'huntingBuffs2'],
    ['buffs3', 'huntingBuffs3'],
    ['doNotKillList', 'doNotKillList']
  ].forEach(function(a) {calf[a[0]] = shouldBeArray(a[1]);});
}

function valueType() {
  [
    ['buffsName', 'huntingBuffsName'],
    ['buffs2Name', 'huntingBuffs2Name'],
    ['buffs3Name', 'huntingBuffs3Name'],
    ['enabledHuntingMode', 'enabledHuntingMode'],
    ['hideSubLvlCreature', 'hideSubLvlCreature'],
    ['showBuffs', 'showHuntingBuffs'],
    ['showTitanInfo', 'showTitanInfo'],
    ['showBuffInfo', 'showBuffInfo'],
  ].forEach(function(a) {calf[a[0]] = getValue(a[1]);});
}

function getPrefs() {
  arrayType();
  valueType();
}

export default function worldPrefs() {
  getCombatBias();
  getPrefs();
  var missingBuffsDiv = buildFshDivs();
  interceptXHR();
  doHuntingBuffs(missingBuffsDiv);
  prepareHidePlayerActions();
}
