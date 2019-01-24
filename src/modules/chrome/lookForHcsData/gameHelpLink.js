import {cmdUrl} from '../../support/constants';
import contains from '../../common/contains';
import querySelectorArray from '../../common/querySelectorArray';

function toSettings(el) {
  el.innerHTML = '<a href="' + cmdUrl + 'settings">Game Help</a>';
}

export default function gameHelpLink() {
  querySelectorArray('#pCR h3').filter(contains('Game Help'))
    .forEach(toSettings);
}
