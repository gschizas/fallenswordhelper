import calf from '../../../support/calf';
import { defFetchWorldRealmActions } from '../../../support/constants';
import setValue from '../../../system/setValue';

export default function toggleSubLvlCreature() {
  calf.hideSubLvlCreature = !calf.hideSubLvlCreature;
  setValue('hideSubLvlCreature', calf.hideSubLvlCreature);
  GameData.fetch(defFetchWorldRealmActions);
}
