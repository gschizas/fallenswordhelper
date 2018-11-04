import calf from '../../../support/calf';
import setValue from '../../../system/setValue';

export default function toggleSubLvlCreature() {
  calf.hideSubLvlCreature = !calf.hideSubLvlCreature;
  setValue('hideSubLvlCreature', calf.hideSubLvlCreature);
  GameData.fetch(256);
}
