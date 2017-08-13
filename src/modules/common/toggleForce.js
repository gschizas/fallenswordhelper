export default function toggleForce(el, force) { // Polyfill UC
  if (el.classList.contains('fshHide') !== force) {
    el.classList.toggle('fshHide');
  }
}
