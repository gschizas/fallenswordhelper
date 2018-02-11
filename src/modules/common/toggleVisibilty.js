import {getElementById} from './getElement';
import {setValue} from '../system/system';

export default function toggleVisibilty(evt) {
  var anItemId = evt.target.getAttribute('linkto');
  var anItem = getElementById(anItemId);
  var currentVisibility = anItem.classList.contains('fshHide');
  anItem.classList.toggle('fshHide');
  if (currentVisibility) {
    setValue(anItemId, '');
  } else {
    setValue(anItemId, 'ON');
  }
}
