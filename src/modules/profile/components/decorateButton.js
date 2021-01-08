import createDiv from '../../common/cElement/createDiv';
import createSpan from '../../common/cElement/createSpan';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import setText from '../../dom/setText';
import toLowerCase from '../../common/toLowerCase';

export default function decorateButton(label) {
  const parentDiv = createDiv();
  const innerSpan = createSpan({
    className: `sendLink ${toLowerCase(label).replace(/ /g, '-')}`,
    textContent: label,
  });
  setText('[', parentDiv);
  insertElement(parentDiv, innerSpan);
  insertHtmlBeforeEnd(parentDiv, ']');
  return parentDiv;
}
