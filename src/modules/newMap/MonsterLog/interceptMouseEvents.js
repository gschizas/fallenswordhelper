import {getElementById} from '../../common/getElement';

export function interceptMouseEvents() {
  getElementById('actionList').addEventListener('mouseover', function(evt) {
    var self = evt.target;
    if (self.classList.contains('verb') &&
        self.classList.contains('view') &&
        self.classList.contains('tip-static') &&
        !self.classList.contains('fshTip')) {
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
  });
}
