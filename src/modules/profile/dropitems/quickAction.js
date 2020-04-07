import { cdn } from '../../system/system';
import hideQTip from '../../common/hideQTip';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import setInnerHtml from '../../dom/setInnerHtml';

function anotherSpinner(target) {
  setInnerHtml(`<img class="quickActionSpinner" src="${
    cdn}ui/misc/spinner.gif" width="15" height="15">`, target);
}

function actionReturn(target, success, data) {
  if (data.r === 1) { return; }
  // eslint-disable-next-line no-param-reassign
  target.style.color = 'green';
  setInnerHtml(success, target);
}

function doAction(target, fn, success) {
  const itemInvId = target.getAttribute('itemInvId');
  fn([itemInvId]).then(partial(actionReturn, target, success));
}

function disableOtherButton(theTd, otherClass) {
  const otherButton = querySelector(otherClass, theTd);
  if (otherButton) {
    otherButton.className = 'quickAction';
    setInnerHtml('', otherButton);
  }
}

function disableCheckbox(theTd) {
  const checkbox = theTd.parentNode.children[0].children[0];
  checkbox.checked = false;
  checkbox.disabled = true;
}

export default function quickAction(fn, success, otherClass, target) {
  // eslint-disable-next-line no-param-reassign
  target.className = 'quickAction';
  doAction(target, fn, success);
  hideQTip(target);
  anotherSpinner(target);
  const theTd = target.parentNode;
  disableOtherButton(theTd, otherClass);
  disableCheckbox(theTd);
}
