import fallback from '../system/fallback';
import isValueChecked from './isValueChecked';
import mySimpleCheckboxes from './simple.json';
import networkIcon from './settingObj';

export function helpLink(title, text) {
  return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="'
    + `<span class='fshHelpTitle'>${title}</span><br><br>${
      text}">?</span>&nbsp;]`;
}

function hasNetwork(o) {
  if (o.network) { return networkIcon; }
  return '';
}

export function justLabel(name) {
  const o = mySimpleCheckboxes[name];
  return `${hasNetwork(o)
  }<label for="${name}">${fallback(o.title, o.helpTitle)
  }${helpLink(o.helpTitle, o.helpText)
  }:</label>`;
}

export function justCheckbox(name) {
  return `<input id="${name}" name="${name
  }" class="fshVMid" type="checkbox" value="on"${isValueChecked(name)}>`;
}

export function simpleCheckboxHtml(name) {
  return justLabel(name) + justCheckbox(name);
}

export function simpleCheckbox(name) {
  return `<tr><td align="right">${justLabel(name)
  }</td><td>${justCheckbox(name)}</td></tr>`;
}
