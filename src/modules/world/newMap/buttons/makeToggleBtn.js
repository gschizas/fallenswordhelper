import insertElement from '../../../common/insertElement';
import {
  createDiv,
  createInput,
  createLabel,
} from '../../../common/cElement';

function createLbl(className, tip, htmlFor) {
  return createLabel({
    className: 'fshCurveEle fshCurveLbl fshPoint tip-static ' + className,
    dataset: {tipped: tip},
    htmlFor: htmlFor
  });
}

export default function makeToggleBtn(o) {
  var btnDiv = createDiv({className: 'fshToggle'});
  var btnCheck = createInput({
    checked: o.prefVal,
    id: o.checkId,
    type: 'checkbox'
  });
  insertElement(btnDiv, btnCheck);
  var onLbl = createLbl(o.onClass, o.onTip, o.checkId);
  insertElement(btnDiv, onLbl);
  var offLbl = createLbl(o.offClass, o.offTip, o.checkId);
  insertElement(btnDiv, offLbl);
  insertElement(o.worldName, btnDiv);
  return btnCheck;
}
