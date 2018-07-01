import {createInput} from '../common/cElement';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';

export default function addButton(target, val) {
  var theButton = createInput({
    className: 'custombutton',
    type: 'button',
    value: val
  });
  insertHtmlBeforeEnd(target, '&nbsp;');
  insertElement(target, theButton);
  return theButton;
}
