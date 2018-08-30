import errorDialog from '../app/errorDialog';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import jConfirm from '../common/jConfirm';
import removeskill from '../app/profile/removeskill';
import {sendEvent} from '../support/fshGa';

var disableDeactivatePrompts = getValue('disableDeactivatePrompts');

function doDebuff(aLink) { // jQuery.min
  sendEvent('profile', 'doDebuff');
  var buffId = aLink.href.match(/(\d+)$/)[1];
  removeskill(buffId).done(errorDialog).done(function(json) {
    if (json.s) {aLink.parentNode.innerHTML = '';}
  });
}

function doPrompt(aLink) {
  var onclick = aLink.getAttribute('onclick');
  var warn = onclick
    .match(/Are you sure you wish to remove the .* skill\?/)[0];
  jConfirm('Remove Skill', warn, function() {
    doDebuff(aLink);
  });
}

function checkForPrompt(aLink) {
  if (!disableDeactivatePrompts) {
    doPrompt(aLink);
  } else {
    doDebuff(aLink);
  }
}

function interceptDebuff(e) { // jQuery
  var aLink = e.target;
  if (aLink.tagName === 'IMG') {
    $(e.target).qtip('hide');
    aLink = aLink.parentNode;
  } else if (aLink.tagName !== 'A') {return;}
  e.stopPropagation();
  e.preventDefault();
  checkForPrompt(aLink);
}

export default function fastDebuff() {
  var profileRightColumn = getElementById('profileRightColumn');
  if (profileRightColumn) {
    profileRightColumn.lastElementChild
      .addEventListener('click', interceptDebuff, true);
  }
}
