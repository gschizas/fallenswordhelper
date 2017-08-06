import {createButton, createDiv} from '../common/cElement';

var profileCombatSetDiv;

function getNekid() { // jQuery
  var profileBlock = profileCombatSetDiv.nextElementSibling;
  var aLinks = profileBlock.getElementsByTagName('a');
  var prm = [];
  Array.prototype.forEach.call(aLinks, function(link) {
    var href = link.href;
    prm.push($.ajax({
      url: href,
      timeout: 3000
    }).pipe(null, function() {return $.when();}));
  });
  $.when.apply($, prm).done(function() {
    location.assign('index.php?cmd=profile');
  });
}

export default function nekidBtn() {
  var profileRightColumn = document.getElementById('profileRightColumn');
  profileCombatSetDiv = document.getElementById('profileCombatSetDiv');
  var targetBr = profileCombatSetDiv.parentElement.nextElementSibling;
  var nekidDiv = createDiv({className: 'fshCenter'});
  var theBtn = createButton({
    className: 'fshBl fshBls',
    textContent: 'Nekid'
  });
  nekidDiv.insertAdjacentText('beforeend', '[ ');
  nekidDiv.insertAdjacentElement('beforeend', theBtn);
  nekidDiv.insertAdjacentText('beforeend', ' ]');
  profileRightColumn.replaceChild(nekidDiv, targetBr);
  theBtn.addEventListener('click', getNekid);
}

