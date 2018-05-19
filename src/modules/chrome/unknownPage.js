import {getElementById} from '../common/getElement';
import injectAdvisor from '../guildAdvisor';
import {injectQuestBookFull} from '../questBook';
import inventing from '../recipes/inventing';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {screenview} from '../support/fshGa';
import updateBuffLog from '../buffLog/updateBuffLog';
import xPath from '../common/xPath';

var unknown = [
  {
    condition: function() {
      return getElementById('quickbuff-report');
    },
    result: function() {
      screenview('unknown.buffLog.updateBuffLog');
      updateBuffLog();
    }
  },
  {
    condition: function() {
      return xPath('//td[.="Quest Name"]');
    },
    result: function() {
      screenview('unknown.questBook.injectQuestBookFull');
      injectQuestBookFull();
    }
  },
  {
    condition: function() {
      return xPath('//font[@size=2 and .="Advisor"]') &&
      xPath('//a[@href="index.php?cmd=guild&amp;subcmd=manage" ' +
          'and .="Back to Guild Management"]');
    },
    result: function() {
      screenview('unknown.guildAdvisor.injectAdvisor');
      injectAdvisor();
    }
  },
  // {
  //   condition: function() {
  //     return xPath('//a[.="Back to Scavenging"]');
  //   },
  //   result: function() {
  //     screenview('unknown.scavenging.injectScavenging');
  //     FSH.scavenging.injectScavenging(); // Is this used???
  //   }
  // },
  {
    condition: function() {
      return $('#pCC img[title="Inventing"]').length > 0;
    },
    result: function() {
      screenview('unknown.recipes.inventing');
      inventing();
    }
  //#if _DEV  //  Fell through!
  },
  {
    condition: function() {return true;},
    result: function() {console.log('Fell through!');} // eslint-disable-line no-console
  //#endif
  }
];

export default function unknownPage() { // Legacy
  if (jQueryNotPresent()) {return;}
  //#if _DEV  //  unknownPage
  console.log('unknownPage'); // eslint-disable-line no-console
  //#endif
  unknown.some(function(el) {
    if (el.condition()) {
      el.result();
      return true;
    }
    return false;
  });
}
