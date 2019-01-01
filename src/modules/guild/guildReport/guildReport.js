import add from '../../support/task';
import eventHandlers from './eventHandlers';
import getElementsByTagName from '../../common/getElementsByTagName';
import getMembrList from '../../ajax/getMembrList';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import prepareChildRows from './prepareChildRows';
import reportHeader from './reportHeader';
import searchUser from './searchUser';

export default function injectReportPaint() { // jQuery
  if (jQueryNotPresent()) {return;}
  getMembrList(false).done(function() {
    add(3, reportHeader);
  });
  add(2, searchUser);
  add(3, prepareChildRows);
  on(getElementsByTagName('table', pCC)[1], 'click', eventHandlers);
}
