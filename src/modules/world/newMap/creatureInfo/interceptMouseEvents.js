import calf from '../../../support/calf';
import getCreatureStats from '../getCreatureStats/getCreatureStats';
import {getElementById} from '../../../common/getElement';
import hasClass from '../../../common/hasClass';
import hasClasses from '../../../common/hasClasses';
import on from '../../../common/on';
import partial from '../../../common/partial';
import processMouseOver from './processMouseOver';
import {sendEvent} from '../../../support/fshGa';

var creatureViewTests = ['verb', 'view', 'tip-static'];

function setQTip(monster, qtipText) { // jQuery
  $(monster).qtip({
    overwrite: true,
    show: {
      event: 'mouseover',
      ready: true
    },
    style: {classes: 'qtip-tipsy qtip-custom'},
    position: {
      my: 'center right',
      at: 'center left',
      effect: false,
      viewport: $(window)
    },
    content: {text: qtipText},
    hide: {effect: false}
  });
}

function getIndex(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

function displayJson(api, data) {
  var content = processMouseOver(data);
  api.set('content.text', content);
}

function getJson(passback, event, api) { // jQuery.min
  getCreatureStats(GameData.actions()[passback].data.id, passback)
    .then(partial(displayJson, api));
  return 'Loading...';
}

function makeMouseOver(self, listItem) {
  sendEvent('NewMap', 'CreatureInfo');
  var passback = getIndex(listItem);
  self.classList.add('fshTip');
  setQTip(self, partial(getJson, passback));
}

function isViewCreature(self, listItem) {
  return hasClasses(creatureViewTests, self) && !hasClass('fshTip', self) &&
    hasClass('creature', listItem);
}

function moEvt(evt) {
  if (!calf.showCreatureInfo) {return;}
  var self = evt.target;
  var listItem = self.parentNode.parentNode.parentNode;
  if (isViewCreature(self, listItem)) {
    makeMouseOver(self, listItem);
  }
}

export function interceptMouseEvents() {
  on(getElementById('actionList'), 'mouseover', moEvt);
}
