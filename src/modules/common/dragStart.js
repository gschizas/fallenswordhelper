var dragTarget;

function dragOver(event) {
  event.preventDefault();
  return false;
}

function dragDrop(event) {
  var offset = event.dataTransfer.getData('text/plain').split(',');
  dragTarget.style.left =
    event.clientX + parseInt(offset[0], 10) + 'px';
  dragTarget.style.top =
    event.clientY + parseInt(offset[1], 10) + 'px';
  document.body.removeEventListener('dragover', dragOver, false);
  document.body.removeEventListener('drop', dragDrop, false);
  event.preventDefault();
  return false;
}

function dragStart(parent, event) {
  if (parent) {
    dragTarget = parent;
  } else {
    dragTarget = event.target;
  }
  var style = window.getComputedStyle(dragTarget, null);
  event.dataTransfer.setData('text/plain',
    parseInt(style.getPropertyValue('left'), 10) - event.clientX + ',' +
    (parseInt(style.getPropertyValue('top'), 10) - event.clientY));
  document.body.addEventListener('dragover', dragOver, false);
  document.body.addEventListener('drop', dragDrop, false);
}

export default function draggable(element, parent) {
  element.draggable = true;
  element.addEventListener('dragstart', dragStart.bind(null, parent));
}
