import equipItem from '../../ajax/equipItem';
import hasClass from '../../common/hasClass';
import partial from '../../common/partial';
import { sendEvent } from '../../support/fshGa';
import setInnerHtml from '../../dom/setInnerHtml';
import setText from '../../dom/setText';
import useItem from '../../ajax/useItem';

function backpackRemove(theBackpack, invId) {
  // remove from srcData
  const i = theBackpack.srcData.findIndex((el) => el.a === invId);
  if (i !== -1) { theBackpack.srcData.splice(i, 1); }
}

function actionResult([theBackpack, result, target, invId], data) {
  if (data.r !== 0) {
    target.remove();
    return;
  }
  backpackRemove(theBackpack, invId);
  target.classList.remove('fshSpinner');
  setInnerHtml(`<span class="fastWorn">${result}</span>`, target.parentNode);
}

function fastAction(theBackpack, evt, action, result) {
  sendEvent('profile', `fastAction - ${result}`);
  const { target } = evt;
  const invId = target.parentNode.parentNode.children[0].dataset.inv;
  setText('', target);
  target.blur();
  target.className = 'fastAction fshBl fshSpinner fshSpinner12';
  action(invId).then(
    partial(actionResult, [theBackpack, result, target, invId]),
  );
}

export default function fastEvent(theBackpack, evt) {
  if (hasClass('fastWear', evt.target)) {
    fastAction(theBackpack, evt, equipItem, 'Worn');
  }
  if (hasClass('fastUse', evt.target)) {
    fastAction(theBackpack, evt, useItem, 'Used');
  }
}
