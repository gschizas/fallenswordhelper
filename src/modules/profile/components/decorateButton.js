import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import {createDiv, createSpan} from '../../common/cElement';

export default function decorateButton(label) {
  var parentDiv = createDiv();
  var innerSpan = createSpan({
    className: 'sendLink ' + label.toLowerCase().replace(/ /g, '-'),
    textContent: label
  });
  parentDiv.textContent = '[';
  insertElement(parentDiv, innerSpan);
  insertHtmlBeforeEnd(parentDiv, ']');
  return parentDiv;
}
