import { y as getElementById, h as hasClass, V as setValue } from './calfSystem-b0234231.js';

function toggleVisibilty(evt) {
  const anItemId = evt.target.dataset.linkto;
  const anItem = getElementById(anItemId);
  const currentVisibility = hasClass('fshHide', anItem);
  anItem.classList.toggle('fshHide');
  if (currentVisibility) {
    setValue(anItemId, '');
  } else {
    setValue(anItemId, 'ON');
  }
}

export { toggleVisibilty as t };
//# sourceMappingURL=toggleVisibilty-668cd611.js.map
