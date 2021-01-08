import getArrayByClassName from '../../common/getArrayByClassName';

export default function colouring(parent, colourFn) {
  getArrayByClassName('player-name', parent).forEach(colourFn);
}
