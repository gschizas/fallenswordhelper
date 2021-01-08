import './advisor.css';
import daAdvisor from '../../_dataAccess/daAdvisor';
import getMembrList from '../../ajax/getMembrList';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import { pCC } from '../../support/layout';
import setInnerHtml from '../../dom/setInnerHtml';
import showMe from './showMe';

export default function advisor() {
  if (jQueryNotPresent()) { return; }
  setInnerHtml('Loading...', pCC);
  Promise.all([daAdvisor(0), getMembrList(false)]).then(showMe);
}
