import { textSpan } from '../../../common/cElement';

export let current;
export let kills;
export let member;
export let pctTotal;
export let status;
export let titanHp;
export let total;
export let yourGuild;

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
