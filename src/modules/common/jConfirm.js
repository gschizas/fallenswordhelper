import {createDiv} from './cElement';
import {getElementById} from './getElement';
import insertElement from './insertElement';

export default function jConfirm(title, msgText, fn) { // jQuery
  var fshMsg = getElementById('fshmsg');
  if (!fshMsg) {
    fshMsg = createDiv({id: 'fshmsg'});
    insertElement(document.body, fshMsg);
    $(fshMsg).dialog({
      autoOpen: false,
      dialogClass: 'no-close',
      draggable: false,
      modal: true,
      resizable: false,
    });
  }
  fshMsg.textContent = msgText;
  $(fshMsg).dialog('option', {
    buttons: {
      Yes: function() {
        fn();
        $(this).dialog('close');
      },
      No: function() {$(this).dialog('close');}
    },
    title: title
  }).dialog('open');
}
