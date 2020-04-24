import getElementById from '../common/getElement';
import jQueryNotPresent from '../common/jQueryNotPresent';
import querySelectorAll from '../common/querySelectorAll';
import { screenview } from '../support/fshGa';
import updateBuffLog from '../notepad/buffLog/updateBuffLog';
import xPath from '../common/xPath';
import { injectQuestBookFull, inventing } from './pageSwitcher/loader';

const unknown = [
  [
    () => getElementById('quickbuff-report'),
    () => {
      screenview('unknown.buffLog.updateBuffLog');
      updateBuffLog();
    },
  ],
  [
    () => xPath('//td[.="Quest Name"]'),
    () => {
      screenview('unknown.questBook.injectQuestBookFull');
      injectQuestBookFull();
    },
  ],
  [
    () => querySelectorAll('#pCC img[title="Inventing"]').length > 0,
    () => {
      screenview('unknown.recipes.inventing');
      inventing();
    },
  // #if _DEV  //  Fell through!
  ],
  [
    () => true,
    // eslint-disable-next-line no-console
    () => { console.log('Fell through!'); },
  // #endif
  ],
];

export default function unknownPage() { // Legacy
  if (jQueryNotPresent()) { return; }
  // #if _DEV  //  unknownPage
  // eslint-disable-next-line no-console
  console.log('unknownPage');
  // #endif
  const known = unknown.find((el) => el[0]());
  if (known) { known[1](); }
}
