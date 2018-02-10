import calf from '../../support/calf';
import {setValue} from '../../system/system';

export default function toggleShowHuntingBuffs() {
  calf.showBuffs = !calf.showBuffs;
  setValue('showHuntingBuffs', calf.showBuffs);
  GameData.fetch(16);
}
