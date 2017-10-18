import calf from '../support/calf';
import getForage from './getForage';
import getProfile from './getProfile';
import {now} from '../support/dataObj';
import setForage from './setForage';
import * as layout from '../support/layout';

function sendMyProfileToForage(data) {
  setForage('fsh_selfProfile', data);
}

function addLastUpdateDate(data) {
  data.lastUpdate = now;
  return data;
}

function getMyProfile() {
  return getProfile(layout.playerName())
    .pipe(addLastUpdateDate)
    .done(sendMyProfileToForage);
}

function getProfileFromForage(data) {
  if (!data || data.lastUpdate < now -
    calf.allyEnemyOnlineRefreshTime) {
    return getMyProfile();
  }
  return data;
}

export default function myStats(force) {
  if (force) {return getMyProfile();}
  // jQuery 1.7 uses pipe instead of then
  return getForage('fsh_selfProfile')
    .pipe(getProfileFromForage);
}
