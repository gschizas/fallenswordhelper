import {def_table} from '../support/constants';
import mixin from './mixin';

function cElement(type, props) {
  var el = document.createElement(type);
  if (props) {mixin(el, props);}
  return el;
}

export function createDiv(props) {
  return cElement('div', props);
}

export function createSpan(props) {
  return cElement('span', props);
}

export function createTable(props) {
  return cElement(def_table, props);
}

export function createTHead(props) {
  return cElement('thead', props);
}

export function createTBody(props) {
  return cElement('tbody', props);
}

export function createTr(props) {
  return cElement('tr', props);
}

export function createTd(props) {
  return cElement('td', props);
}

export function createTFoot(props) {
  return cElement('tfoot', props);
}

export function createUl(props) {
  return cElement('ul', props);
}

export function createOl(props) {
  return cElement('ol', props);
}

export function createLi(props) {
  return cElement('li', props);
}

export function createButton(props) {
  return cElement('button', props);
}

export function createBr() {
  return cElement('br');
}

export function createAnchor(props) {
  return cElement('a', props);
}

export function createInput(props) {
  return cElement('input', props);
}

export function createTextArea(props) {
  return cElement('textarea', props);
}

export function createTh(props) {
  return cElement('th', props);
}

export function createLabel(props) {
  return cElement('label', props);
}

export function textSpan(text) {
  return createSpan({textContent: text});
}

export function createStyle(style) {
  return cElement('style', {innerHTML: style});
}

export function createSelect(props) {
  return cElement('select', props);
}

export function createOption(props) {
  return cElement('option', props);
}
