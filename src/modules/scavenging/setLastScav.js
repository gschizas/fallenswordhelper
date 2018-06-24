import setValue from '../system/setValue';

export default function setLastScav(caveId, gold) {
  setValue('lastScavPage',
    '?cmd=scavenging&cave_id=' + caveId + '&gold=' + gold);
}
