import {getElementById} from '../common/getElement';

var findBuffsLevel175Only;

export function calcMinLvl() { // Legacy
  if (findBuffsLevel175Only) {return 500;}
  return 1;
}

export function setMinLvl() {
  findBuffsLevel175Only = getElementById('level175').checked;
}
