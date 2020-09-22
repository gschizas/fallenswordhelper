import { i as insertElement, P as once, s as partial, b as createDiv, A as setInnerHtml } from './calfSystem-dea093d3.js';
import { c as createInput } from './createInput-dad0c5bb.js';
import { c as createLabel } from './createLabel-430d66bd.js';
import { c as createUl } from './createUl-d8a22607.js';
import { p as publish } from './pubsub-601d43b7.js';
import { c as createLi } from './createLi-8a46712e.js';

const css = "\r\n\r\n  .fshTabSet .ui-tabs-panel {\r\n    padding: 0;\r\n  }\n.fshTabSet > input {\r\n    display: none;\r\n  }\n.fshTabSet > ul > li > label {\r\n    cursor: pointer;\r\n    display: block;\r\n    padding: 0.5em;\r\n  }\n.fshTabSet > ul > li:hover {\r\n    background: #f0be00 url(https://www.fallensword.com/media/dist/img/jQueryUITheme/ui-bg_gloss-wave_70_f0be00_500x100.png) 50% 50% repeat-x;\r\n    border: 1px solid #a45b13;\r\n    border-bottom-width: 0;\r\n    color: #381f00;\r\n  }\n.fshTabSet > input:first-of-type:checked ~ ul li:first-of-type,\r\n  .fshTabSet > input:nth-of-type(2):checked ~ ul li:nth-of-type(2),\r\n  .fshTabSet > input:nth-of-type(3):checked ~ ul li:nth-of-type(3) {\r\n    background: #ffa614 url(https://www.fallensword.com/media/dist/img/jQueryUITheme/ui-bg_gloss-wave_30_ffa614_500x100.png) 50% 50% repeat;\r\n    border: solid #655e4e;\r\n    border-width: 1px 1px 0;\r\n    margin-bottom: -1px;\r\n    padding-bottom: 1px;\r\n    color: #381f00\r\n\r\n  }\n.fshTabSet > input:first-of-type:checked ~ ul li:first-of-type > label:hover, .fshTabSet > input:nth-of-type(2):checked ~ ul li:nth-of-type(2) > label:hover, .fshTabSet > input:nth-of-type(3):checked ~ ul li:nth-of-type(3) > label:hover {\r\n      cursor: text;\r\n    }\n.fshTabSet > div {\r\n    height: 0;\r\n    overflow: hidden;\r\n  }\n.fshTabSet > input:first-of-type:checked ~ div:first-of-type,\r\n  .fshTabSet > input:nth-of-type(2):checked ~ div:nth-of-type(2) {\r\n    height: auto;\r\n    padding: 1em 1.4em;\r\n  }\r\n";
const modules_0c3659a3 = {};

const toggleId = (groupName, i) => groupName + String(i);

function makeRadio(groupName, e, i) {
  return createInput({
    checked: i === 0,
    id: toggleId(groupName, i),
    name: groupName,
    type: 'radio',
  });
}

function makeListItem(groupName, thisDivs, e, i) {
  const thisLi = createLi({ className: 'ui-state-default ui-corner-top' });
  insertElement(thisLi, createLabel({
    htmlFor: toggleId(groupName, i),
    innerHTML: e,
  }));
  if (i !== 0) {
    once(thisLi, 'click', () => {
      publish(toggleId(groupName, i), thisDivs[i]);
    });
  }
  return thisLi;
}

function makeUl(tabs, groupName, thisDivs) {
  const thisUl = createUl({
    className: 'ui-tabs-nav ui-helper-reset ui-helper-clearfix '
      + 'ui-widget-header ui-corner-all',
  });
  const thisItems = tabs.map(partial(makeListItem, groupName, thisDivs));
  thisItems.forEach(partial(insertElement, thisUl));
  return thisUl;
}

const makeDiv = () => createDiv({ className: 'ui-tabs-panel ui-corner-bottom' });

function fshTabSet(container, tabs, groupName) {
  const thisTabSet = createDiv({
    className: 'fshTabSet '
        + 'ui-tabs ui-widget-content ui-corner-all',
  });
  const appendToTabSet = partial(insertElement, thisTabSet);
  const thisRadios = tabs.map(partial(makeRadio, groupName));
  thisRadios.forEach(appendToTabSet);
  const thisDivs = tabs.map(makeDiv);
  publish(toggleId(groupName, 0), thisDivs[0]);
  const thisList = makeUl(tabs, groupName, thisDivs);
  publish(`${groupName}-header`, thisList);
  insertElement(thisTabSet, thisList);
  thisDivs.forEach(appendToTabSet);
  setInnerHtml('', container);
  insertElement(container, thisTabSet);
  return 0;
}

export { fshTabSet as f };
//# sourceMappingURL=fshTabSet-0748959e.js.map
