import {textSpan} from '../../../common/cElement';

export var current;
export var kills;
export var member;
export var pctTotal;
export var status;
export var titanHp;
export var total;
export var yourGuild;

function partOne() {
  current = textSpan('Current');
  kills = textSpan('Kills');
  member = textSpan('Member');
  pctTotal = textSpan('% of Total');
}

function partTwo() {
  status = textSpan('Status');
  titanHp = textSpan('Titan HP');
  total = textSpan('Total');
  yourGuild = textSpan('Your Guild');
}

export function buildAssets() {
  partOne();
  partTwo();
}
