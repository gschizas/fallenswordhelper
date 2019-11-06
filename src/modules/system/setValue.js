import {GMSTORAGE_PATH} from '../support/constants';
import partial from '../common/partial';

function storItem(name, type, value) {
  if (Modernizr.localstorage) {
    window.localStorage.setItem(GMSTORAGE_PATH + name, type + value);
  }
}

var cold = [
  ['string', function(name, value) {storItem(name, 'S]', value);}],
  [
    'number',
    function(name, value) {
      if (value.toString().indexOf('.') < 0) {storItem(name, 'N]', value);}
    }
  ],
  ['boolean', function(name, value) {storItem(name, 'B]', value);}]
];

function typeStor(value, el) {return typeof value === el[0];}

export default function setValue(name, value) {
  var storType = cold.find(partial(typeStor, value));
  if (storType) {storType[1](name, value);}
}
