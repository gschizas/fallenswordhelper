import getElementById from '../../common/getElement';
import setText from '../../dom/setText';

let targetPlayer;

export function getName() {
  return targetPlayer;
}

export function setName(name) {
  targetPlayer = name;
  setText(name, getElementById('quickMsgDialog_targetUsername'));
}
