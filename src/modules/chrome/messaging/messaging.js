import './messaging.css';
import doValidateTip from './doValidateTip';
import fallback from '../../system/fallback';
import getMsg from './getMsg';
import getQuickMessageDialog from './getQuickMessageDialog';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import sendOnEnter from './sendOnEnter';
import { setName } from './targetPlayer';
import showMsgTemplate from './showMsgTemplate';

function setMsg(msg) {
  const dialogMsg = getMsg();
  dialogMsg.value = fallback(msg, '');
  dialogMsg.disabled = false;
}

function openQuickMsgDialog(name, msg, tip) { // jQuery
  const quickMsgDialog = getQuickMessageDialog();
  if (quickMsgDialog.classList.contains('ui-dialog-content')) {
    setName(name);
    setMsg(msg);
    doValidateTip(tip);
    showMsgTemplate();
    sendOnEnter();
    $(quickMsgDialog).dialog('open');
  }
}

// enterOnMsgSend
// renderSelfBio
// renderOtherBios
// enableChatParsing
// enableMessageTemplates

export default function injectQuickMsgDialogJQ() {
  if (jQueryNotPresent()) { return; }
  window.openQuickMsgDialog = openQuickMsgDialog;
}
