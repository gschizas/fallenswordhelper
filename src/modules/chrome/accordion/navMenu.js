import querySelector from '../../common/querySelector';

function sectionClosed(id) {
  return id !== -1 &&
    querySelector('#nav li.nav-level-0:nth-child(' + (id + 1) + ') ul')
      .offsetHeight === 0;
}

function validateId(id) {
  if (sectionClosed(id)) {return -1;}
  return id;
}

export default function navMenu(myNav) {
  var oldSave = myNav._saveState;
  myNav._saveState = function(id) {
    oldSave.call(myNav, validateId(id));
  };
}
