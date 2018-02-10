import {defaultOptions} from './assets';
import extend from '../common/extend';
import fallback from '../system/fallback';
import getValue from '../system/getValue';

export var options;
export var showQuickDropLinks;
export var showQuickSendLinks;
export var theInv;

export function storeTheInv(data) {
  theInv = data;
}

export function extendOptions(data) {
  options = extend({}, defaultOptions);
  extend(options, fallback(data, {}));
  showQuickDropLinks = getValue('showQuickDropLinks');
  showQuickSendLinks = getValue('showQuickSendLinks');
}
