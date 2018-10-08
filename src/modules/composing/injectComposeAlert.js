import calf from '../support/calf';
import composingView from '../app/composing/view';
import displayComposeMsg from './displayComposeMsg';
import getValue from '../system/getValue';
import jQueryPresent from '../common/jQueryPresent';
import setValue from '../system/setValue';
import {
  def_lastComposeCheck,
  def_needToCompose,
  now
} from '../support/constants';

function getTime(pot) {
  return pot.time_remaining;
}

function displayAlert() {
  displayComposeMsg();
  setValue(def_needToCompose, true);
}

function potsBrewing(potions) {
  var minTimeInSecs = Math.min.apply(null, potions.map(getTime));
  if (minTimeInSecs > 0) {
    setValue(def_needToCompose, false);
    setValue(def_lastComposeCheck, now + minTimeInSecs * 1000);
  } else {
    displayAlert();
  }
}

function parseComposingApp(result) {
  if (result.potions.length !== result.max_potions) {
    displayAlert();
  } else {
    potsBrewing(result.potions);
  }
}

function checkAppResponse(json) {
  if (json.s) {parseComposingApp(json.r);}
}

function checkLastCompose() { // jQuery.min
  var lastComposeCheck = getValue(def_lastComposeCheck);
  if (lastComposeCheck && now < lastComposeCheck) {return;}
  composingView().done(checkAppResponse);
}

function composeAlert() {
  if (getValue(def_needToCompose)) {
    displayComposeMsg();
  } else {
    checkLastCompose();
  }
}

export default function injectComposeAlert() {
  if (calf.cmd !== 'composing' && jQueryPresent()) {composeAlert();}
}
