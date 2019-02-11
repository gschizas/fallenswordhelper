import hideQTip from '../../common/hideQTip';
import {imageServer} from '../../system/system';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';

function anotherSpinner(self) {
  self.innerHTML = '<img class="quickActionSpinner" src="' +
    imageServer +
    '/skin/loading.gif" width="15" height="15">';
}

function actionReturn(self, success, data) {
  if (data.r === 1) {return;}
  self.style.color = 'green';
  self.innerHTML = success;
}

function doAction(self, fn, success) {
  var itemInvId = self.getAttribute('itemInvId');
  fn([itemInvId]).done(partial(actionReturn, self, success));
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

export default function quickAction(fn, success, otherClass, self) {
  self.className = 'quickAction';
  doAction(self, fn, success);
  hideQTip(self);
  anotherSpinner(self);
  var theTd = self.parentNode;
  disableOtherButton(theTd, otherClass);
  disableCheckbox(theTd);
}
