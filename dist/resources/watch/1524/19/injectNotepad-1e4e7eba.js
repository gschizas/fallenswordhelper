import { w as jQueryNotPresent } from './calfSystem-03895320.js';

function injectNotepad() { // jQuery
  if (jQueryNotPresent()) { return; }
  $('#notepad_notes')
    .attr('cols', '90')
    .attr('rows', '30')
    .css('resize', 'none');
}

export default injectNotepad;
//# sourceMappingURL=injectNotepad-1e4e7eba.js.map
