import calf from '../../../support/calf';
import setValue from '../../../system/setValue';

export default function toggleShowCreatureInfo() {
  calf.showCreatureInfo = !calf.showCreatureInfo;
  setValue('showCreatureInfo', calf.showCreatureInfo);
}
