import {cdn} from '../../system/system';
import hideQTip from '../../common/hideQTip';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';

function anotherSpinner(target) {
  target.innerHTML = '<img class="quickActionSpinner" src="' +
    cdn +
    'ui/misc/spinner.gif" width="15" height="15">';
}

function actionReturn(target, success, data) {
  if (data.r === 1) {return;}
  target.style.color = 'green';
  target.innerHTML = success;
}

function doAction(target, fn, success) {
  var itemInvId = target.getAttribute('itemInvId');
  fn([itemInvId]).then(partial(actionReturn, target, success));
}

function disableOtherButton(theTd, otherClass) {
  var otherButton = querySelector(otherClass, theTd);
  if (otherButton) {
    otherButton.className = 'quickAction';
    otherButton.innerHTML = '';
  }
}

function disableCheckbox(theTd) {
  var checkbox = theTd.parentNode.children[0].children[0];
  checkbox.checked = false;
  checkbox.disabled = true;
}

export default function quickAction(fn, success, otherClass, target) {
  target.className = 'quickAction';
  doAction(target, fn, success);
  hideQTip(target);
  anotherSpinner(target);
  var theTd = target.parentNode;
  disableOtherButton(theTd, otherClass);
  disableCheckbox(theTd);
}
