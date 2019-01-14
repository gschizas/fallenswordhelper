export default function on(target, type, listener, options) {
  if (target instanceof EventTarget) {
    target.addEventListener(type, listener, options);
  }
}
