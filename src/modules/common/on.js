export default function on(target, type, listener, options) {
  target.addEventListener(type, listener, options);
}
