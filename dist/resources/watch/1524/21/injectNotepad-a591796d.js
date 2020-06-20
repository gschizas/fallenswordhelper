import { x as jQueryNotPresent } from './calfSystem-b0234231.js';

function injectNotepad() { // jQuery
  if (jQueryNotPresent()) { return; }
  $('#notepad_notes')
    .attr('cols', '90')
    .attr('rows', '30')
    .css('resize', 'none');
}

export default injectNotepad;
//# sourceMappingURL=injectNotepad-a591796d.js.map
