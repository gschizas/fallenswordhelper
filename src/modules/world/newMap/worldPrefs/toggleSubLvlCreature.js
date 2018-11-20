import calf from '../../../support/calf';
import {def_fetch_worldRealmActions} from '../../../support/constants';
import setValue from '../../../system/setValue';

export default function toggleSubLvlCreature() {
  calf.hideSubLvlCreature = !calf.hideSubLvlCreature;
  setValue('hideSubLvlCreature', calf.hideSubLvlCreature);
  GameData.fetch(def_fetch_worldRealmActions);
}
