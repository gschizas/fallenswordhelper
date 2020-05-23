import { z as jQueryNotPresent } from './calfSystem-5ce1fc75.js';

function injectNotepad() { // jQuery
  if (jQueryNotPresent()) { return; }
  $('#notepad_notes')
    .attr('cols', '90')
    .attr('rows', '30')
    .css('resize', 'none');
}

export default injectNotepad;
//# sourceMappingURL=injectNotepad-11a83ee8.js.map
