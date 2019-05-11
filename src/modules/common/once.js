import off from './off';
import on from './on';

// https://stackoverflow.com/a/34325394

export default function once(ary) {
  const [target, type, listener, addOptions, removeOptions] = ary;
  on(target, type, function fn() { // Closure
    off(target, type, fn, removeOptions);
    listener.apply(this, arguments); // eslint-disable-line no-invalid-this
  }, addOptions);
}
