import {createSpan} from '../common/cElement';
import hideElement from '../common/hideElement';
import hideQTip from '../common/hideQTip';

var spinner;

export function hideSpinner() {
  hideElement(spinner);
}

export function displaySpinner(target) {
  hideQTip(target);
  spinner = createSpan({
    className: 'fshCurveContainer fshTopListSpinner',
    innerHTML: '<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'
  });
  target.parentNode.replaceChild(spinner, target);
}
