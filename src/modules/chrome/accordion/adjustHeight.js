import {getElementById} from '../../common/getElement';
import isObject from '../../common/isObject';
import querySelectorAll from '../../common/querySelectorAll';
import {sendException} from '../../support/fshGa';

function navHeightsIsArray(theNav, myNav) {
  // first the closed saved variables
  myNav.heights = [
    null,
    null,
    // Character
    getElementById('nav-character').nextElementSibling.children
      .length * 22,
    660,
    // Guild
    querySelectorAll('#nav-guild > ul li').length * 22,
    374,
    132,
    132,
    null
  ];
  if (myNav.state !== '-1' && myNav.state !== -1) {
    // and now the open one
    theNav.children[myNav.state].children[1].style.height =
      myNav.heights[myNav.state] + 'px';
  }
}

function navDataExists(theNav, myNav) {
  if ('heights' in myNav) {
    navHeightsIsArray(theNav, myNav);
  } else {
    sendException('$(\'#nav\').data(\'nav\').heights does not exist', false);
  }
}

export default function adjustHeight() {
  // adjust the menu height for the newly added items
  var theNav = getElementById('nav');
  var myNav = $(theNav).data('nav');
  if (isObject(myNav)) {
    navDataExists(theNav, myNav);
  } else {
    sendException('$(\'#nav\').data(\'nav\') is not an object', false);
  }
}
