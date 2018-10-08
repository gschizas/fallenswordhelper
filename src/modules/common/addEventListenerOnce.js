// https://stackoverflow.com/a/34325394

// eslint-disable-next-line max-len
export default function addEventListenerOnce(target, type, listener, addOptions, removeOptions) {
  target.addEventListener(type, function fn() {
    target.removeEventListener(type, fn, removeOptions);
    listener.apply(this, arguments); // eslint-disable-line no-invalid-this
  }, addOptions);
}
