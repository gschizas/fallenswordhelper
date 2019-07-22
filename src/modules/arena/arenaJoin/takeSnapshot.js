import loadEquipped from '../../app/profile/loadequipped';
import off from '../../common/off';
import once from '../../common/once';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import updateUrl from './updateUrl';

async function buttonPress(r, thisArena, e) {
  e.preventDefault();
  const equipped = await loadEquipped();
  console.log(r); // eslint-disable-line no-console
  console.log(thisArena); // eslint-disable-line no-console
  console.log(equipped); // eslint-disable-line no-console
  // updateUrl(e);
  console.log('updateUrl(e)'); // eslint-disable-line no-console
}

export default function takeSnapshot(r, thisArena) {
  const submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    off(submitButton, 'click', updateUrl);
    once(submitButton, 'click', partial(buttonPress, r, thisArena));
  }
}
