import {createAnchor} from '../common/cElement';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';
import insertElementBefore from '../common/insertElementBefore';
import on from '../common/on';

function statbarWrapper(href, id) {
  var myWrapper = createAnchor({href: href});
  var character = getElementById(id);
  var statWrapper = character.parentNode;
  insertElement(myWrapper, character);
  insertElementBefore(myWrapper, statWrapper.firstChild);
  on(myWrapper, 'click', function(evt) {
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
