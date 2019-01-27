import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import setText from '../../common/setText';
import {createDiv, createSpan} from '../../common/cElement';

export default function decorateButton(label) {
  var parentDiv = createDiv();
  var innerSpan = createSpan({
    className: 'sendLink ' + label.toLowerCase().replace(/ /g, '-'),
    textContent: label
  });
  setText('[', parentDiv);
  insertElement(parentDiv, innerSpan);
  insertHtmlBeforeEnd(parentDiv, ']');
  return parentDiv;
}
