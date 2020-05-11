import { A as getElementById, a1 as setValue } from './calfSystem-05ea3a63.js';

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
//# sourceMappingURL=toggleVisibilty-bfecd070.js.map
