import buildFshDivs from './buildFshDivs';
import calf from '../../../support/calf';
import doHuntingBuffs from './doHuntingBuffs';
import getCombatBias from './getCombatBias';
import getValue from '../../../system/getValue';
import interceptXHR from './interceptXHR';
import {prepareHidePlayerActions} from '../prepareHidePlayerActions';
import shouldBeArray from '../../../system/shouldBeArray';

function mappedArrays() {
  [
    ['buffs', 'huntingBuffs'],
    ['buffs2', 'huntingBuffs2'],
    ['buffs3', 'huntingBuffs3']
  ].forEach(function(a) {calf[a[0]] = shouldBeArray(a[1]);});
}

function straightArrays() {
  [
    'doNotKillList'
  ].forEach(function(a) {calf[a] = shouldBeArray(a);});
}

function arrayType() {
  mappedArrays();
  straightArrays();
}

function mappedValues() {
  [
    ['buffsName', 'huntingBuffsName'],
    ['buffs2Name', 'huntingBuffs2Name'],
    ['buffs3Name', 'huntingBuffs3Name'],
    ['showBuffs', 'showHuntingBuffs']
  ].forEach(function(a) {calf[a[0]] = getValue(a[1]);});
}

function straightValues() {
  [
    'enabledHuntingMode',
    'hideSubLvlCreature',
    'showTitanInfo',
    'showBuffInfo',
    'showMonsterLog',
    'showCreatureInfo'
  ].forEach(function(a) {calf[a] = getValue(a);});
}

function valueType() {
  mappedValues();
  straightValues();
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
