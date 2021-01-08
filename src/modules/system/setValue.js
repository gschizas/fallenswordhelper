import { GMSTORAGE_PATH } from '../support/constants';
import isBoolean from '../common/isBoolean';
import isNumber from '../common/isNumber';
import isString from '../common/isString';
import isUndefined from '../common/isUndefined';

function storItem(name, type, value) {
  if (!isUndefined(Modernizr) && Modernizr.localstorage) {
    window.localStorage.setItem(GMSTORAGE_PATH + name, type + value);
  }
}

const cold = [
  [isString, (name, value) => { storItem(name, 'S]', value); }],
  [
    isNumber,
    (name, value) => {
      if (value.toString().indexOf('.') < 0) { storItem(name, 'N]', value); }
    },
  ],
  [isBoolean, (name, value) => { storItem(name, 'B]', value); }],
];

export default function setValue(name, value) {
  const storType = cold.find((pair) => pair[0](value));
  if (storType) {
    storType[1](name, value);
  }
}
