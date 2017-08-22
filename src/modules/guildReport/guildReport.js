import add from '../support/task';
import eventHandlers from './eventHandlers';
import getMembrList from '../ajax/getMembrList';
import {pCC} from '../support/layout';
import prepareChildRows from './prepareChildRows';
import reportHeader from './reportHeader';
import searchUser from './searchUser';

export default function injectReportPaint() { // jQuery
  getMembrList(false).done(function() {
    add(3, reportHeader);
  });
  add(2, searchUser);
  add(3, prepareChildRows);
  pCC.getElementsByTagName('TABLE')[1]
    .addEventListener('click', eventHandlers);
}
