import {createDiv} from './cElement';
import {getElementById} from './getElement';
import insertElement from './insertElement';
import setText from './setText';

function makeFshMsg() {
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
  return fshMsg;
}

function openFshMsg(title, fn, fshMsg) {
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

export default function jConfirm(title, msgText, fn) { // jQuery
  var fshMsg = makeFshMsg();
  setText(msgText, fshMsg);
  openFshMsg(title, fn, fshMsg);
}
