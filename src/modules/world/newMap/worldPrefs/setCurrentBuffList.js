import calf from '../../../support/calf';
import {isArray} from '../../../common/isArray';

export var huntingBuffs;
export var huntingBuffsName;

export function setCurrentBuffList() {
  var lookup = [, // eslint-disable-line no-sparse-arrays
    [calf.buffs, calf.buffsName],
    [calf.buffs2, calf.buffs2Name],
    [calf.buffs3, calf.buffs3Name]
  ][calf.enabledHuntingMode];
  if (isArray(lookup)) {
    huntingBuffs = lookup[0];
    huntingBuffsName = lookup[1];
  }
}
