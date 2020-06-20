import './injectStoreItems.css';
import buttonPress from './buttonPress';
import doStatTotal from '../../../profile/doStatTotal';
import doToggleButtons from './doToggleButtons';
import getCheckboxes from './getCheckboxes';
import getValue from '../../../system/getValue';
import jQueryNotPresent from '../../../common/jQueryNotPresent';
import onclick from '../../../common/onclick';
import { pCC } from '../../../support/layout';
import { prefTypes } from './constants';
import updateDomItems from './updateDomItems';

export default async function injectStoreItems() {
  if (jQueryNotPresent()) { return; }
  const checkboxes = getCheckboxes();
  if (!checkboxes) { return; }
  const prefs = prefTypes.map((p) => getValue(p));
  doStatTotal();
  doToggleButtons(prefs);
  if (prefs.some((v) => v)) {
    updateDomItems(prefs);
  }
  onclick(pCC, buttonPress);
}
