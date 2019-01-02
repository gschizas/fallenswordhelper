import querySelectorArray from '../../common/querySelectorArray';

function gameHelp(el) {
  return el.textContent === 'Game Help';
}

function toSettings(el) {
  el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
}

export default function gameHelpLink() {
  querySelectorArray('#pCR h3').filter(gameHelp).forEach(toSettings);
}
