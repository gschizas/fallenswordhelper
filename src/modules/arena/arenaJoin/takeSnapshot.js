import all from '../../common/all';
import {assign} from '../../common/assign';
import {fromEntries} from '../../common/fromEntries';
import join from '../../app/arena/join';
import loadEquipped from '../../app/profile/loadequipped';
import {nowSecs} from '../../support/now';
import off from '../../common/off';
import once from '../../common/once';
import {pCC} from '../../support/layout';
import querySelector from '../../common/querySelector';
import {thisTournament} from './thisTournament';
import toLowerCase from '../../common/toLowerCase';
import updateUrl from './updateUrl';
import {attribType, itemType} from '../../support/constants';
import {get, set} from '../../system/idb';

const mapAttribs = joinData => fromEntries(joinData.r.attributes.map(o =>
  ['stat_' + toLowerCase(attribType[o.id]), o.value]));
const mapEquipment = equipped =>
  fromEntries(equipped.r.map(o => [toLowerCase(itemType[o.t]), o.n]));

async function buttonPress(e) {
  e.preventDefault();
  const pvpId = thisTournament();
  const [equipped, joinData, fsh_arenaJoined] = await all([
    loadEquipped(), join(pvpId), get('fsh_arenaJoined')]);
  const thisData = assign(
    {pvpId, joined: nowSecs},
    mapEquipment(equipped),
    mapAttribs(joinData)
  );
  const newJoined = fsh_arenaJoined || [];
  newJoined.push(thisData);
  set('fsh_arenaJoined', newJoined);
  updateUrl(e);
}

export default function takeSnapshot() {
  const submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    off(submitButton, 'click', updateUrl);
    once(submitButton, 'click', buttonPress);
  }
}
