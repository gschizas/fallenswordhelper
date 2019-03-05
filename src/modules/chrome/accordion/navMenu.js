import jQueryNotPresent from '../../common/jQueryNotPresent';

export default function navMenu() { // jQuery
  if (jQueryNotPresent()) {return;}
  var myNav = $('#nav').data('hcsNav');
  if (!myNav) {return;}
  var oldSave = myNav._saveState;
  myNav._saveState = function(_id) {
    var id = _id;
    var myHeight = $('li.nav-level-0', '#nav').eq(id).find('ul').height();
    if (myHeight === 0) {id = -1;}
    oldSave.call(myNav, id);
  };
}
