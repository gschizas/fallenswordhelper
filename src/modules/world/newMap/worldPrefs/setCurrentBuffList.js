import calf from '../../../support/calf';
import isArray from '../../../common/isArray';

export let huntingBuffs;
export let huntingBuffsName;

export function setCurrentBuffList() {
  // eslint-disable-next-line no-sparse-arrays
  const lookup = [,
    [calf.buffs, calf.buffsName],
    [calf.buffs2, calf.buffs2Name],
    [calf.buffs3, calf.buffs3Name],
  ][calf.enabledHuntingMode];
  if (isArray(lookup)) {
    [huntingBuffs, huntingBuffsName] = lookup;
  }
}
