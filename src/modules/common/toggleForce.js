export default function toggleForce(el, force) {
  if (el instanceof Element) {
    el.classList.toggle('fshHide', force);
  }
}
