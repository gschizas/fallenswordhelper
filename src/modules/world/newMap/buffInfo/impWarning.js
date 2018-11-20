import {createSpan} from '../../../common/cElement';
import insertElement from '../../../common/insertElement';
import insertHtmlBeforeEnd from '../../../common/insertHtmlBeforeEnd';
import toggleForce from '../../../common/toggleForce';

var impDiv;
var impRemainingSpan;

function getImpsRemaining(imp) {
  if (imp) {
    return Number(imp.stack);
  }
  return 0;
}

var impStyles = [
  'imp-0',
  'imp-1',
  'imp-1'
];

function getImpWarningStyle(impsRem) {
  return impStyles[impsRem] || 'fshGreen';
}

function initImpDiv(containerDiv) {
  impDiv = containerDiv.children[0];
  impDiv.textContent = 'Shield Imps Remaining: ';
  impRemainingSpan = createSpan();
  insertElement(impDiv, impRemainingSpan);
  insertHtmlBeforeEnd(impDiv,
    '&nbsp;<span id="fshImpRecast" class="xSmallLink">Recast</span>');
}

function hasImp(containerDiv, imp) {
  if (impDiv) {
    toggleForce(impDiv, false);
  } else {
    initImpDiv(containerDiv);
  }
  var impsRem = getImpsRemaining(imp);
  impDiv.className = getImpWarningStyle(impsRem);
  impRemainingSpan.textContent = impsRem.toString();
}

function hideImpWarning() {
  if (impDiv) {
    toggleForce(impDiv, true);
  }
}

export default function impWarning(containerDiv, imp, dd) {
  if (imp || dd) {
    hasImp(containerDiv, imp);
  } else {
    hideImpWarning();
  }
}
