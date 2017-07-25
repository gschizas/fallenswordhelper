import groupViewStats from './groupViewStats';
import * as system from '../support/system';

function parseGroupStats(html) {
  var doc = system.createDocument(html);
  return groupViewStats(doc);
}

export default function getGroupStats(viewStats) {
  return $.ajax(viewStats).pipe(parseGroupStats);
}
