import { defaultOptions } from './assets';
import extend from '../../common/extend';
import fallback from '../../system/fallback';
import getValue from '../../system/getValue';

export let options;
export let showQuickDropLinks;
export let showQuickSendLinks;

export function extendOptions(data) {
  options = extend({}, defaultOptions);
  extend(options, fallback(data, {}));
  showQuickDropLinks = getValue('showQuickDropLinks');
  showQuickSendLinks = getValue('showQuickSendLinks');
}
