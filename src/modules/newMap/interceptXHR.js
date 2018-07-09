import bitwiseAnd from '../common/bitwiseAnd';
import calf from '../support/calf';
import {def_fetch_worldRealmActions} from '../support/constants';
import jsonParse from '../common/jsonParse';

var testActions = [
  function(myData) {return !myData;},
  function(myData) {return !myData.actions;},
  function(myData) {return myData.actions.length === 0;}
];

function xhrDataFilter(data) {
  var myData = jsonParse(data);
  if (testActions.some(function(el) {return el(myData);})) {return data;}
  var realm = GameData.realm();
  myData.actions = myData.actions.filter(function(el) {
    if (el.type === 6) {
      return el.data.creature_type !== 0 || el.data.level >= realm.minlevel;
    }
    return true;
  });
  var ret = JSON.stringify(myData);
  return ret;
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
}
