import getValueJSON from '../system/getValueJSON';
import hasFailed from './hasFailed';
import { nowSecs } from '../support/now';
import setValueJSON from '../system/setValueJSON';

let appBad;

function resetAppBad() {
  if (appBad[0] < nowSecs - 24 * 60 * 60) { appBad = [nowSecs, false]; }
}

function initAppBad() {
  if (!appBad) {
    appBad = getValueJSON('appBad') || [nowSecs, false];
    resetAppBad();
    // setValueJSON('appBad', appBad);
  }
}

export default function $dataAccess(appFn, fallbackFn, ...args) {
  initAppBad();
  if (appBad[1]) { return fallbackFn(...args); }
  return appFn(...args)
    .then((json) => {
      // if (hasFailed(json)) {
      if (hasFailed()) {
        appBad = [nowSecs, true];
        setValueJSON('appBad', appBad);
        return fallbackFn(...args);
      }
      return json;
    })
    .catch(() => fallbackFn(...args));
}
