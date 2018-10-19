export default function off(target, type, listener, options) {
  target.removeEventListener(type, listener, options);
}
