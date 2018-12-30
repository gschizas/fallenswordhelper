export default function colouring(parent, colourFn) {
  Array.prototype.forEach.call(
    parent.getElementsByClassName('player-name'), colourFn);
}
