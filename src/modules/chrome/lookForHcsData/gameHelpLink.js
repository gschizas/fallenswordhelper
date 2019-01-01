function toSettings(el) {
  if (el.textContent === 'Game Help') {
    el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
  }
}

export default function gameHelpLink() {
  var nodeList = document.querySelectorAll('#pCR h3');
  Array.from(nodeList).forEach(toSettings);
}
