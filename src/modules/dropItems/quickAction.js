import {imageServer} from '../support/system';

function anotherSpinner(self) {
  self.innerHTML = '<img class="quickActionSpinner" src="' +
    imageServer +
    '/skin/loading.gif" width="15" height="15">';
}

export default function quickAction(self, fn, success, otherClass) { // jQuery.min
  self.className = 'quickAction';
  var itemInvId = self.getAttribute('itemInvId');
  fn([itemInvId]).done(function(data) {
    if (data.r === 1) {return;}
    self.style.color = 'green';
    self.innerHTML = success;
  });
  $(self).qtip('hide');
  anotherSpinner(self);
  var theTd = self.parentNode;
  var otherButton = theTd.querySelector(otherClass);
  if (otherButton) {
    otherButton.className = 'quickAction';
    otherButton.innerHTML = '';
  }
  var checkbox = theTd.parentNode.firstElementChild.firstElementChild;
  checkbox.checked = false;
  checkbox.disabled = true;
}
