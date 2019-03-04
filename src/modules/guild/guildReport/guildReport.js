import add from '../../support/task';
import eventHandlers from './eventHandlers';
import getMembrList from '../../ajax/getMembrList';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import prepareChildRows from './prepareChildRows';
import reportHeader from './reportHeader';
import searchUser from './searchUser';

function doReportHeader() {add(3, reportHeader);}

export default function injectReportPaint() { // jQuery
  if (jQueryNotPresent()) {return;}
  getMembrList(false).then(doReportHeader);
  add(2, searchUser);
  add(3, prepareChildRows);
  eventHandlers();
}
