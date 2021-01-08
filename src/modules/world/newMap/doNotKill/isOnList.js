import calf from '../../../support/calf';

export default function isOnList(creatureName) {
  return calf.doNotKillList.includes(creatureName.trim());
}
