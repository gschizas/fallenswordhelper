import calf from '../../../support/calf';
import setValue from '../../../system/setValue';

export default function toggleShowMonsterLog() {
  calf.showMonsterLog = !calf.showMonsterLog;
  setValue('showMonsterLog', calf.showMonsterLog);
}
