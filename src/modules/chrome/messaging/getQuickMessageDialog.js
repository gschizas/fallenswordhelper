import getElementById from '../../common/getElement';

let quickMsgDialog;

export default function getQuickMessageDialog() {
  if (!quickMsgDialog) {
    quickMsgDialog = getElementById('quickMessageDialog');
  }
  return quickMsgDialog;
}
