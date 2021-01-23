import { o as onclick, p as pCC, y as getElementById, s as partial, bf as getCustomUrlParameter, aD as retryAjax } from './calfSystem-91adbec8.js';
import { h as hideElement } from './hideElement-d4551277.js';

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

function ajaxifyProfileSections() {
  onclick(pCC, testForSection);
}

export default ajaxifyProfileSections;
//# sourceMappingURL=ajaxifyProfileSections-b579b570.js.map
