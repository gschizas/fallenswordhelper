import all from '../../common/all';
import fromEntries from '../../common/fromEntries';
import handleSubmit from '../../common/handleSubmit';
import isArray from '../../common/isArray';
import join from '../../app/arena/join';
import loadEquipped from '../../app/profile/loadequipped';
import { nowSecs } from '../../support/now';
import off from '../../common/off';
import once from '../../common/once';
import { pCC } from '../../support/layout';
// import querySelector from '../../common/querySelector';
import thisTournament from './thisTournament';
import toLowerCase from '../../common/toLowerCase';
import { attribType, itemType } from '../../support/constants';
import { get, set } from '../../system/idb';

const mapAttribs = (joinData) => fromEntries(
  joinData.r.attributes.map(
    (o) => [`stat_${toLowerCase(attribType[o.id])}`, o.value],
  ),
);
const mapEquipment = (equipped) => fromEntries(
  equipped.r.map((o) => [toLowerCase(itemType[o.t]), o.n]),
);

async function buttonPress(e) {
  e.preventDefault();
  const pvpId = thisTournament();
  const [equipped, joinData, fshArenaJoined] = await all([
    loadEquipped(), join(pvpId), get('fsh_arenaJoined')]);
  if (isArray(equipped.r)) {
    const thisData = {
      pvpId,
      joined: nowSecs,
      ...mapEquipment(equipped),
      ...mapAttribs(joinData),
    };
    const newJoined = fshArenaJoined || [];
    newJoined.push(thisData);
    set('fsh_arenaJoined', newJoined);
  }
  handleSubmit(e);
}

export default function takeSnapshot() {
  // const submitButton = querySelector('input[type="submit"]', pCC);
  // if (submitButton) {
  // off(submitButton, 'click', zzzupdateUrl);
  // It might be better to replace the Join Tournament Button entirely
  off(pCC, 'submit', handleSubmit);
  // once(submitButton, 'click', buttonPress);
  once(pCC, 'submit', buttonPress);
  // }
}
