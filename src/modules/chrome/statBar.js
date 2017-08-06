import {createAnchor} from '../common/cElement';

function statbarWrapper(href, id) {
  var myWrapper = createAnchor({href: href});
  var character = document.getElementById(id);
  var statWrapper = character.parentNode;
  myWrapper.appendChild(character);
  statWrapper.insertBefore(myWrapper, statWrapper.firstChild);
  myWrapper.addEventListener('click', function(evt) {
    evt.stopPropagation();
  }, true);
}

export default function statbar() {
  statbarWrapper('index.php?cmd=profile', 'statbar-character');
  statbarWrapper('index.php?cmd=points&subcmd=reserve', 'statbar-stamina');
  statbarWrapper('index.php?cmd=blacksmith', 'statbar-equipment');
  statbarWrapper('index.php?cmd=profile&subcmd=dropitems', 'statbar-inventory');
  statbarWrapper('index.php?cmd=points', 'statbar-fsp');
  statbarWrapper('index.php?cmd=bank', 'statbar-gold');
}
