import getCustomUrlParameter from '../system/getCustomUrlParameter';
import {getElementById} from '../common/getElement';
import {pCC} from '../support/layout';
import retryAjax from '../ajax/retryAjax';

var bpc;

function bp() {
  if (!bpc) {
    bpc = getElementById('backpackContainer');
  }
  return bpc;
}

var elementTests = [
  function(self) {return self.tagName === 'A';},
  function(self) {return Boolean(self.href);},
  function(self) {return self.href.includes('togglesection');}
];

function isSectionToggle(self) {
  return elementTests.every(function(el) {
    return el(self);
  });
}

function oldStyleDiv(target) {
  if (target.style.display === 'block') {
    target.classList.add('fshHide');
  }
  target.removeAttribute('style');
  return 0;
}

function toggleTarget(target) {
  if (target.hasAttribute('style')) {
    oldStyleDiv(target);
  } else {
    target.classList.toggle('fshHide');
  }
}

function toggleSection(self) {
  var sectionId = Number(getCustomUrlParameter(self.href, 'section_id'));
  if (sectionId === 5) {
    toggleTarget(bp());
  } else {
    toggleTarget(self.parentNode.parentNode.nextElementSibling);
  }
}

function testForSection(evt) {
  var self = evt.target;
  if (isSectionToggle(self)) {
    toggleSection(self);
    retryAjax(self.href);
    evt.preventDefault();
  }
}

export default function ajaxifyProfileSections() {
  pCC.addEventListener('click', testForSection);
}
