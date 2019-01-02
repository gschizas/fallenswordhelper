import off from './off';
import on from './on';

var target = 0;
var type = 1;
var listener = 2;
var addOptions = 3;
var removeOptions = 4;

// https://stackoverflow.com/a/34325394

export default function once(ary) {
  on(ary[target], ary[type], function fn() {
    off(ary[target], ary[type], fn, ary[removeOptions]);
    ary[listener].apply(this, arguments); // eslint-disable-line no-invalid-this
  }, ary[addOptions]);
}
