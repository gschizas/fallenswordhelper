import off from './off';
import on from './on';

// https://stackoverflow.com/a/34325394

// eslint-disable-next-line max-len
export default function once(target, type, listener, addOptions, removeOptions) {
  on(target, type, function fn() {
    off(target, type, fn, removeOptions);
    listener.apply(this, arguments); // eslint-disable-line no-invalid-this
  }, addOptions);
}
