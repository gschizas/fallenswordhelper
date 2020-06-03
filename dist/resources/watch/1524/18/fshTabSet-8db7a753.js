import { i as insertElement, M as once, r as partial, b as createDiv, z as setInnerHtml } from './calfSystem-940bc1b5.js';
import { c as createInput } from './createInput-90dfa3d0.js';
import { c as createLabel } from './createLabel-20353fe8.js';
import { c as createUl } from './createUl-456f2381.js';
import { p as publish } from './pubsub-586316ec.js';
import { c as createLi } from './createLi-a956c96f.js';

var undefined$1 = undefined;

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
//# sourceMappingURL=fshTabSet-8db7a753.js.map
