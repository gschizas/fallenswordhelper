import calf from '../../support/calf';
import isFunction from '../../common/isFunction';

export var huntingBuffs;
export var huntingBuffsName;
var buffLookup = {
  '1': function() {
    huntingBuffs = calf.buffs;
    huntingBuffsName = calf.buffsName;
  },
  '2': function() {
    huntingBuffs = calf.buffs2;
    huntingBuffsName = calf.buffs2Name;
  },
  '3': function() {
    huntingBuffs = calf.buffs3;
    huntingBuffsName = calf.buffs3Name;
  }
};

export function setCurrentBuffList() {
  var tmpFn = buffLookup[calf.enabledHuntingMode];
  if (isFunction(tmpFn)) {
    tmpFn();
  }
}
