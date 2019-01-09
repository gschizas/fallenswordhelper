import {getElementById} from '../common/getElement';
import injectQuestBookFull from '../questbook/injectQuestBookFull';
import inventing from '../recipes/inventing';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {screenview} from '../support/fshGa';
import updateBuffLog from '../notepad/buffLog/updateBuffLog';
import xPath from '../common/xPath';

var unknown = [
  [
    function() {return getElementById('quickbuff-report');},
    function() {
      screenview('unknown.buffLog.updateBuffLog');
      updateBuffLog();
    }
  ],
  [
    function() {return xPath('//td[.="Quest Name"]');},
    function() {
      screenview('unknown.questBook.injectQuestBookFull');
      injectQuestBookFull();
    }
  ],
  [
    function() {return $('#pCC img[title="Inventing"]').length > 0;},
    function() {
      screenview('unknown.recipes.inventing');
      inventing();
    }
  //#if _DEV  //  Fell through!
  ],
  [
    function() {return true;},
    function() {console.log('Fell through!');} // eslint-disable-line no-console
  //#endif
  ]
];

function aMatch(el) {return el[0];}

export default function unknownPage() { // Legacy
  if (jQueryNotPresent()) {return;}
  //#if _DEV  //  unknownPage
  console.log('unknownPage'); // eslint-disable-line no-console
  //#endif
  unknown.find(aMatch)[1]();
}
