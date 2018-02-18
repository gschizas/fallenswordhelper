import {createDiv} from '../common/cElement';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';

export default function jQueryDialog(fn) { // jQuery
  var content = getElementById('content');
  if (content) {content.innerHTML = '';} else {
    content = createDiv({
      id: 'content',
      style: {display: 'none'}
    });
    insertElement(document.body, content);
  }
  $(content).dialog({
    width: 640,
    modal: true,
    position: {my: 'top', at: 'top', offset: '0 60', collision: 'none'},
    resizable: false
  });
  fn(content);
}
