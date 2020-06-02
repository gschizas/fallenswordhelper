import { x as getElementById, T as setValue } from './calfSystem-6e4b53e3.js';

function toggleVisibilty(evt) {
  const anItemId = evt.target.dataset.linkto;
  const anItem = getElementById(anItemId);
  const currentVisibility = anItem.classList.contains('fshHide');
  anItem.classList.toggle('fshHide');
  if (currentVisibility) {
    setValue(anItemId, '');
  } else {
    setValue(anItemId, 'ON');
  }
}

export { toggleVisibilty as t };
//# sourceMappingURL=toggleVisibilty-d74ecea2.js.map
