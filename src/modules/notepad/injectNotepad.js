import jQueryNotPresent from '../common/jQueryNotPresent';

export default function injectNotepad() { // jQuery
  if (jQueryNotPresent()) {return;}
  $('#notepad_notes')
    .attr('cols', '90')
    .attr('rows', '30')
    .css('resize', 'none');
}
