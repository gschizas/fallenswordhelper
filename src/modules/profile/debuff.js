import * as layout from '../support/layout';
import * as system from '../support/system';

var disableDeactivatePrompts = system.getValue('disableDeactivatePrompts');

function debuff(buffId) {
  return $.ajax({
    url: 'fetchdata.php',
    data: {
      a: '22',
      d: '0',
      id: buffId
    },
    dataType: 'json'
  });
}

function doDebuff(aLink) { // jQuery
  var buffId = aLink.getAttribute('href').match(/(\d+)$/)[1];
  debuff(buffId)
    .done(function(data) {
      if (data.response.response === 0) {
        aLink.parentNode.innerHTML = '';
      } else {
        $('#dialog_msg').html(data.response.msg).dialog('open');
      }
    });
}

function doPrompt(aLink) {
  var onclick = aLink.getAttribute('onclick');
  var warn = onclick
    .match(/Are you sure you wish to remove the .* skill\?/)[0];
  layout.confirm('Remove Skill', warn, function() {
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
  var profileRightColumn = document.getElementById('profileRightColumn')
    .lastElementChild;
  profileRightColumn.addEventListener('click', interceptDebuff, true);
}
