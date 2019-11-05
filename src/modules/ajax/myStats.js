import calf from '../support/calf';
import getProfile from './getProfile';
import {now} from '../support/now';
import playerName from '../common/playerName';
import {get, set} from '../system/idb';

function sendMyProfileToForage(data) {
  set('fsh_selfProfile', data);
  return data;
}

function addLastUpdateDate(data) {
  if (data) {
    data.lastUpdate = now;
  }
  return data;
}

function getMyProfile() {
  return getProfile(playerName())
    .then(addLastUpdateDate)
    .then(sendMyProfileToForage);
}

function getProfileFromForage(data) {
  if (!data || data.lastUpdate < now - calf.allyEnemyOnlineRefreshTime) {
    return getMyProfile();
  }
  return data;
}

export default function myStats(force) {
  if (force) {return getMyProfile();}
  return get('fsh_selfProfile')
    .then(getProfileFromForage);
}
