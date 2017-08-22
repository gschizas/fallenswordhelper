import groupViewStats from './groupViewStats';
import retryAjax from './retryAjax';
import * as system from '../support/system';

function parseGroupStats(html) {
  var doc = system.createDocument(html);
  return groupViewStats(doc);
}

export default function getGroupStats(viewStats) {
  return retryAjax(viewStats).pipe(parseGroupStats);
}
