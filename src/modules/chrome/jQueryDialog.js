import {createDiv} from '../common/cElement';

export default function jQueryDialog(fn) { // jQuery
  var content = document.getElementById('content');
  if (content) {content.innerHTML = '';} else {
    content = createDiv({
      id: 'content',
      style: {display: 'none'}
    });
    document.body.appendChild(content);
  }
  $(content).dialog({
    width: 640,
    modal: true,
    position: {my: 'top', at: 'top', offset: '0 60', collision: 'none'},
    resizable: false
  });
  fn(content);
}
