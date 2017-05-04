function statbarWrapper(href, id) { // Native
  var myWrapper = document.createElement('a');
  myWrapper.setAttribute('href', href);
  var character = document.getElementById(id);
  var statWrapper = character.parentNode;
  myWrapper.appendChild(character);
  statWrapper.insertBefore(myWrapper, statWrapper.firstChild);
  myWrapper.addEventListener('click', function(evt) {
    evt.stopPropagation();
  }, true);
}

export function statbar() { // Native
  var sw = statbarWrapper;
  sw('index.php?cmd=profile', 'statbar-character');
  sw('index.php?cmd=points&subcmd=reserve', 'statbar-stamina');
  sw('index.php?cmd=blacksmith', 'statbar-equipment');
  sw('index.php?cmd=profile&subcmd=dropitems', 'statbar-inventory');
  sw('index.php?cmd=points', 'statbar-fsp');
  sw('index.php?cmd=bank', 'statbar-gold');
}
