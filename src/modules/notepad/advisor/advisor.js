import advisorView from '../../app/guild/advisorView';
import getMembrList from '../../ajax/getMembrList';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import {pCC} from '../../support/layout';
import showMe from './showMe';

export default function advisor() {
  if (jQueryNotPresent()) {return;}
  pCC.innerHTML = 'Loading...';
  Promise.all([advisorView(0), getMembrList(false)]).then(showMe);
}
