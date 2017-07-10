var profileCombatSetDiv;

function getNekid() { // jQuery
  var profileBlock = profileCombatSetDiv.nextElementSibling;
  var aLinks = profileBlock.getElementsByTagName('a');
  var prm = [];
  Array.prototype.forEach.call(aLinks, function(link) {
    var href = link.getAttribute('href');
    prm.push($.ajax({
      url: href,
      timeout: 3000
    }));
  });
  $.when.apply($, prm).always(function() {
    location.assign('index.php?cmd=profile');
  });
}

export default function nekidBtn() { // Native
  var profileRightColumn = document.getElementById('profileRightColumn');
  profileCombatSetDiv = document.getElementById('profileCombatSetDiv');
  var targetBr = profileCombatSetDiv.parentElement.nextElementSibling;
  var nekidDiv = document.createElement('div');
  nekidDiv.className = 'fshCenter';
  var theBtn = document.createElement('button');
  theBtn.className = 'fshBl fshBls';
  theBtn.textContent = 'Nekid';
  nekidDiv.insertAdjacentText('beforeend', '[ ');
  nekidDiv.insertAdjacentElement('beforeend', theBtn);
  nekidDiv.insertAdjacentText('beforeend', ' ]');
  profileRightColumn.replaceChild(nekidDiv, targetBr);
  theBtn.addEventListener('click', getNekid);
}

