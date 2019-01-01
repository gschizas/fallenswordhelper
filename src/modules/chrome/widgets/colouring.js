import getElementsByClassName from '../../common/getElementsByClassName';

export default function colouring(parent, colourFn) {
  Array.from(getElementsByClassName('player-name', parent)).forEach(colourFn);
}
