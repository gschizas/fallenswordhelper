import './advisor.postcss';
import daAdvisor from '../../_dataAccess/daAdvisor';
import getMembrList from '../../ajax/getMembrList';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import {pCC} from '../../support/layout';
import showMe from './showMe';

export default function advisor() {
  if (jQueryNotPresent()) {return;}
  pCC.innerHTML = 'Loading...';
  Promise.all([daAdvisor(0), getMembrList(false)]).then(showMe);
}
