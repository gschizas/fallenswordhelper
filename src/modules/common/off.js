export default function off(target, type, listener, options) {
  if (target instanceof EventTarget) {
    target.removeEventListener(type, listener, options);
  }
}
