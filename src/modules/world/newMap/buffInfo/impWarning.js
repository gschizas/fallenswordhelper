import './impWarning.postcss';
import {createSpan} from '../../../common/cElement';
import {daQuickbuff} from '../../../_dataAccess/_dataAccess';
import {def_fetch_playerBuffs} from '../../../support/constants';
import getBuff from './getBuff';
import insertElement from '../../../common/insertElement';
import insertHtmlBeforeEnd from '../../../common/insertHtmlBeforeEnd';
import on from '../../../common/on';
import playerName from '../../../common/playerName';
import quickbuffSuccess from '../../../common/quickbuffSuccess';
import setText from '../../../common/setText';
import toggleForce from '../../../common/toggleForce';

var impDiv;
var impRemainingSpan;

function refreshBuffs(json) {
  if (quickbuffSuccess(json)) {
    GameData.fetch(def_fetch_playerBuffs);
  }
}

function recastClick() {
  if (getBuff('Summon Shield Imp')) {return;}
  daQuickbuff([playerName()], [55]).then(refreshBuffs);
}

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
  setText('Shield Imps Remaining: ', impDiv);
  impRemainingSpan = createSpan();
  insertElement(impDiv, impRemainingSpan);
  insertHtmlBeforeEnd(impDiv, '&nbsp;');
  var recast = createSpan({className: 'xSmallLink', textContent: 'Recast'});
  insertElement(impDiv, recast);
  on(recast, 'click', recastClick);
}

function hasImp(containerDiv, imp) {
  if (impDiv) {
    toggleForce(impDiv, false);
  } else {
    initImpDiv(containerDiv);
  }
  var impsRem = getImpsRemaining(imp);
  impDiv.className = getImpWarningStyle(impsRem);
  setText(impsRem, impRemainingSpan);
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
