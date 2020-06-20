import add from '../../../support/task';
import arrayFrom from '../../../common/arrayFrom';
import batch from '../../../common/batch';
import closestTr from '../../../common/closestTr';
import getCheckboxes from './getCheckboxes';
import getInv from './getInv';
import partial from '../../../common/partial';
import {
  ahSearchUrl,
  defSubcmd,
  guideUrl,
  rarity,
} from '../../../support/constants';
import {
  checkAllOfType,
  enableItemColoring,
  showExtraLinks,
  showQuickDropLinks,
  showQuickSendLinks,
} from './constants';

async function getItems() {
  const checkboxes = getCheckboxes();
  if (!checkboxes) { return []; }
  const inv = await getInv();
  if (!inv || !inv.items) { return []; }
  return arrayFrom(checkboxes)
    .map((cb) => [
      closestTr(cb).cells[2],
      inv.items[cb.value],
    ])
    .filter(([, invItem]) => invItem);
}

function tally(acc, i) {
  acc[i] = (acc[i] || 0) + 1;
  return acc;
}

function buildItemHash(invItems) {
  return {
    ...invItems
      .map(([, i]) => i.item_id)
      .reduce(tally, {}),
    // Exclude composed pots
    13699: 1,
  };
}

function tooltip(type) {
  return ` data-tooltip="INSTANTLY ${type} THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."`;
}

function generalButton(className, extra, text) {
  return `[<button class="bob ${className}"${extra}>${text}</button>]`;
}

function actionButton(color, type, label) {
  return ` ${generalButton(`${color} actionButton tooltip-multiline`, tooltip(type), `Quick ${label}`)}`;
}

function aLink(href, extra, text) {
  return `[<a href="${href}"${extra}>${text}</a>]`;
}

function doAhLinks(invItem) {
  if (invItem.bound) {
    return '<span class="aHSpacer"></span>';
  }
  return aLink(`${ahSearchUrl}${encodeURIComponent(invItem.item_name)}`, '', 'AH');
}

function doUfsgLink(invItem) {
  return aLink(`${guideUrl}items${defSubcmd}view&item_id=${invItem.item_id}`,
    ' target="_blank"', 'UFSG');
}

function decorateItems(prefs, itemHash, [inject, invItem]) {
  const thisTd = inject;
  if (prefs[enableItemColoring]) {
    thisTd.className = rarity[invItem.rarity].clas;
  }
  let newInner = '';
  if (prefs[showExtraLinks]) {
    newInner = `${doAhLinks(invItem)} ${doUfsgLink(invItem)}`;
  }
  newInner += `&nbsp;${invItem.item_name}`;
  if (prefs[checkAllOfType] && itemHash[invItem.item_id] > 1) {
    newInner += ` ${generalButton('fshBlack', '', 'Check All')}`;
  }
  if (prefs[showQuickSendLinks] && !invItem.bound) {
    newInner += actionButton('fshBlue', 'SENDS', 'Send');
  }
  if (prefs[showQuickDropLinks] && invItem.guild_tag === -1) {
    newInner += actionButton('fshRed', 'DROP', 'Drop');
  }
  if (thisTd.innerHTML !== newInner) {
    thisTd.innerHTML = newInner;
  }
}

function endFn() {
  return 0;
}

export default async function updateDomItems(prefs) {
  const invItems = await getItems();
  const itemHash = prefs[checkAllOfType] ? buildItemHash(invItems) : [];
  add(3, batch, [[5, 3, invItems, 0, partial(decorateItems, prefs, itemHash), endFn]]);
}
