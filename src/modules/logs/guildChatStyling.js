import './guildChat.css';
import getValue from '../system/getValue';
import querySelector from '../common/querySelector';

export default function guildChatStyling() {
  if (!getValue('wrapGuildChat')) { return; }
  const chatTable = querySelector('#pCC table table table table');
  if (!chatTable) { return; }
  chatTable.classList.add('fshGc');
}
