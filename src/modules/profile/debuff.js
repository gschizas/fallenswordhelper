import * as ajax from '../support/ajax';
import * as layout from '../support/layout';
import * as system from '../support/system';

var disableDeactivatePrompts = system.getValue('disableDeactivatePrompts');

function debuff(aLink) { // jQuery
  var buffId = aLink.getAttribute('href').match(/(\d+)$/)[1];
  ajax.debuff(buffId)
    .done(function(data) {
      if (data.response.response === 0) {
        aLink.parentNode.innerHTML = '';
      } else {
        $('#dialog_msg').html(data.response.msg).dialog('open');
      }
    });
}

function doPrompt(aLink) { // Native
  var onclick = aLink.getAttribute('onclick');
  var warn = onclick
    .match(/Are you sure you wish to remove the .* skill\?/)[0];
  layout.confirm('Remove Skill', warn, function() {
    debuff(aLink);
  });
}

function interceptDebuff(e) { // jQuery
  var aLink = e.target;
  if (aLink.tagName === 'IMG') {
    $(e.target).qtip('hide');
    aLink = aLink.parentNode;
  } else if (aLink.tagName !== 'A') {return;}
  e.stopPropagation();
  e.preventDefault();
  if (!disableDeactivatePrompts) {
    doPrompt(aLink);
  } else {
    debuff(aLink);
  }
}

export function fastDebuff() { // Native
  var profileRightColumn = document.getElementById('profileRightColumn')
    .lastElementChild;
  profileRightColumn.addEventListener('click', interceptDebuff, true);
}
