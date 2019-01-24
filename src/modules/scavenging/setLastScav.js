import {def_cmd} from '../support/constants';
import setValue from '../system/setValue';

export default function setLastScav(caveId, gold) {
  setValue('lastScavPage',
    def_cmd + 'scavenging&cave_id=' + caveId + '&gold=' + gold);
}
