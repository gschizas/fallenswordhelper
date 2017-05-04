import * as fshGa from '../support/fshGa';
import * as guildAdvisor from '../guildAdvisor';
import * as questBook from '../questBook';
import * as quickBuff from '../quickBuff';
import * as recipes from '../recipes';
import * as system from '../support/system';

var unknown = [
  {
    condition: function() {
      return document.getElementById('quickbuff-report');
    },
    result: function() {
      fshGa.screenview('unknown.quickBuff.updateBuffLog');
      quickBuff.updateBuffLog();
    }
  },
  {
    condition: function() {
      return system.findNode('//td[.="Quest Name"]');
    },
    result: function() {
      fshGa.screenview('unknown.questBook.injectQuestBookFull');
      questBook.injectQuestBookFull();
    }
  },
  {
    condition: function() {
      return system.findNode('//font[@size=2 and .="Advisor"]') &&
        system.findNode('//a[@href="index.php?cmd=guild&amp;subcmd=manage" ' +
          'and .="Back to Guild Management"]');
    },
    result: function() {
      fshGa.screenview('unknown.guildAdvisor.injectAdvisor');
      guildAdvisor.injectAdvisor();
    }
  },
  // {
  //   condition: function() {
  //     return system.findNode('//a[.="Back to Scavenging"]');
  //   },
  //   result: function() {
  //     fshGa.screenview('unknown.scavenging.injectScavenging');
  //     FSH.scavenging.injectScavenging(); // Is this used???
  //   }
  // },
  {
    condition: function() {
      return $('#pCC img[title="Inventing"]').length > 0;
    },
    result: function() {
      fshGa.screenview('unknown.recipes.inventing');
      recipes.inventing();
    }
  //#if _DEV  //  Fell through!
  },
  {
    condition: function() {return true;},
    result: function() {console.log('Fell through!');} // eslint-disable-line no-console
  //#endif
  }
];

export function unknownPage() { // Legacy
  if (typeof window.jQuery === 'undefined') {return;}
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
