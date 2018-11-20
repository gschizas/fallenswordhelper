import calf from '../../../support/calf';
import {def_fetch_playerBuffs} from '../../../support/constants';
import setValue from '../../../system/setValue';

export default function toggleShowHuntingBuffs() {
  calf.showBuffs = !calf.showBuffs;
  setValue('showHuntingBuffs', calf.showBuffs);
  GameData.fetch(def_fetch_playerBuffs);
}
