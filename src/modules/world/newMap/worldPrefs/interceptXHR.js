import bitwiseAnd from '../../../common/bitwiseAnd';
import calf from '../../../support/calf';
import {def_fetch_worldRealmActions} from '../../../support/constants';
import jsonParse from '../../../common/jsonParse';
import partial from '../../../common/partial';

function noAction(myData) {
  return !myData || !myData.actions || myData.actions.length === 0;
}

function subLvlMobs(realmLevel, el) {
  if (el.type === 6) {
    return el.data.creature_type !== 0 || el.data.level >= realmLevel;
  }
  return true;
}

function getLvlToTest(myData) {
  return myData.realm && myData.realm.minlevel || GameData.realm().minlevel;
}

function xhrDataFilter(data) {
  var myData = jsonParse(data);
  if (noAction(myData)) {return data;}
  myData.actions = myData.actions.filter(
    partial(subLvlMobs, getLvlToTest(myData))
  );
  return JSON.stringify(myData);
}

function isActionList(originalOptions) {
  return originalOptions.data &&
    originalOptions.data.d &&
    bitwiseAnd(originalOptions.data.d, def_fetch_worldRealmActions);
}

function xhrPreFilter(options, originalOptions) {
  if (calf.hideSubLvlCreature && isActionList(originalOptions)) {
    options.dataFilter = xhrDataFilter;
  }
}

export default function interceptXHR() { // jQuery.min
  $.ajaxPrefilter('JSON', xhrPreFilter);
  GameData.fetch(def_fetch_worldRealmActions);
}
