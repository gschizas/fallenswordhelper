import {getElementById} from '../../common/getElement';

var creatureViewTests = ['verb', 'view', 'tip-static', 'fshTip'];

function isCreatureView(self) {
  return creatureViewTests.every(function(e) {
    return self.classList.contains(e);
  });
}

function moEvt(evt) {
  var self = evt.target;
  if (isCreatureView(self)) {
    self.classList.add('fshTip');
    $(self).qtip({
      overwrite: true,
      show: {
        event: evt.type,
        ready: true
      },
      style: {classes: 'qtip-tipsy qtip-custom'},
      position: {
        my: 'center right',
        at: 'center left',
        effect: false,
        viewport: $(window)
      },
      content: 'This is a test',
      hide: {effect: false}
    });
  }
}

export function interceptMouseEvents() {
  getElementById('actionList').addEventListener('mouseover', moEvt);
}
