import getElementById from '../../common/getElement';

let dialogMsg;

export default function getMsg() {
  if (!dialogMsg) {
    dialogMsg = getElementById('quickMsgDialog_msg');
  }
  return dialogMsg;
}
