import getCustomUrlParameter from '../../system/getCustomUrlParameter';
import getElementById from '../../common/getElement';
import hideElement from '../../common/hideElement';
import onclick from '../../common/onclick';
import { pCC } from '../../support/layout';
import partial from '../../common/partial';
import retryAjax from '../../ajax/retryAjax';

let bpc;

function bp() {
  if (!bpc) {
    bpc = getElementById('backpackContainer');
  }
  return bpc;
}

const elementTests = [
  (target) => target.tagName === 'A',
  (target) => Boolean(target.href),
  (target) => target.href.includes('togglesection'),
];

function condition(target, fn) { return fn(target); }

function isSectionToggle(target) {
  return elementTests.every(partial(condition, target));
}

function oldStyleDiv(target) {
  if (target.style.display === 'block') {
    hideElement(target);
  }
  target.removeAttribute('style');
}

function toggleTarget(target) {
  if (target.hasAttribute('style')) {
    oldStyleDiv(target);
  } else {
    target.classList.toggle('fshHide');
  }
}

function toggleSection(target) {
  const sectionId = Number(getCustomUrlParameter(target.search, 'section_id'));
  if (sectionId === 5) {
    toggleTarget(bp());
  } else {
    toggleTarget(target.parentNode.parentNode.nextElementSibling);
  }
}

function testForSection(evt) {
  const { target } = evt;
  if (isSectionToggle(target)) {
    toggleSection(target);
    retryAjax(target.href);
    evt.preventDefault();
  }
}

export default function ajaxifyProfileSections() {
  onclick(pCC, testForSection);
}
