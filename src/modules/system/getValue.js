import {GMSTORAGE_PATH} from '../support/constants';
import defaults from '../support/dataObj.json';
import isUndefined from '../common/isUndefined';
import partial from '../common/partial';

var reviver = [
  ['S]', function(value) {return value.substr(2);}],
  ['N]', function(value) {return parseInt(value.substr(2), 10);}],
  ['B]', function(value) {return value.substr(2) === 'true';}]
];

function getType(value, el) {return value.substr(0, 2) === el[0];}

function retrieve(value) {
  var test = reviver.find(partial(getType, value));
  if (test) {return test[1](value);}
  return value;
}

function fshGetValue(name, defValue) {
  var value = window.localStorage.getItem(GMSTORAGE_PATH + name);
  if (value === null || isUndefined(value)) {return defValue;}
  return retrieve(value);
}

export default function getValue(name) {
  //#if _DEV  //  No default setting available
  if (isUndefined(defaults[name])) {
    console.log('No default setting available', name, defaults[name]); // eslint-disable-line no-console
  }
  //#endif
  return fshGetValue(name, defaults[name]);
}
