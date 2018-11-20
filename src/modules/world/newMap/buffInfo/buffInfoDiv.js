import calf from '../../../support/calf';
import {createDiv} from '../../../common/cElement';
import {getElementById} from '../../../common/getElement';
import insertElementAfter from '../../../common/insertElementAfter';
import toggleForce from '../../../common/toggleForce';

var containerDiv;

function wantsBuffInfo(ary) {
  return calf.showBuffInfo && ary.some(function(e) {return e;});
}

function drawBuffInfo() {
  if (containerDiv) {
    toggleForce(containerDiv, false);
  } else {
    containerDiv = createDiv({
      className: 'fshActionBox',
      innerHTML: '<div></div><div></div><div></div>' +
        '<div></div><div></div><div></div>'
    });
    var actCont = getElementById('actionContainer');
    insertElementAfter(containerDiv, actCont.children[2]);
  }
  return containerDiv;
}

function hideBuffInfo() {
  if (containerDiv) {
    toggleForce(containerDiv, true);
  }
}

export default function buffInfoDiv(ary) {
  if (wantsBuffInfo(ary)) {
    return drawBuffInfo();
  }
  hideBuffInfo();
}
