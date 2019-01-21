import {createDiv} from '../../common/cElement';
import partial from '../../common/partial';

var fastBpHtml = '<span class="sendLink fast-bp">Fast BP</span> | ';
var fastGsHtml = '<span class="sendLink fast-gs">Fast GS</span>';
var fastWearHtml = ' | <span class="sendLink fast-wear">Fast Wear</span>';
var wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|' +
  'Gut Rot Head Splitter|Serum');
var gs;
var bp;
var wearableBp;
var wearableGs;

function fastBp() {
  if (!bp) {bp = createDiv({innerHTML: fastBpHtml + fastGsHtml});}
  return bp.cloneNode(true);
}

function fastWearableBp() {
  if (!wearableBp) {
    wearableBp = createDiv({innerHTML: fastBpHtml + fastGsHtml + fastWearHtml});
  }
  return wearableBp.cloneNode(true);
}

function fastGs() {
  if (!gs) {gs = createDiv({innerHTML: fastGsHtml});}
  return gs.cloneNode(true);
}

function fastWearableGs() {
  if (!wearableGs) {
    wearableGs = createDiv({innerHTML: fastGsHtml + fastWearHtml});
  }
  return wearableGs.cloneNode(true);
}

var lookup = [
  [true, true, fastWearableBp],
  [true, false, fastWearableGs],
  [false, true, fastBp],
  [false, false, fastGs]
];

function theArray(thisWearable, thisBp, arr) {
  return arr[0] === thisWearable && arr[1] === thisBp;
}

export default function makeFastRecall(el) {
  var thisWearable = !wearRE.test(el.previousElementSibling.innerHTML);
  var thisBp = el.children.length === 2;
  return lookup.find(partial(theArray, thisWearable, thisBp))[2]();
}
