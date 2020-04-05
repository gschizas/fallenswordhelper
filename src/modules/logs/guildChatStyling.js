import querySelector from '../common/querySelector';

export default function guildChatStyling() {
  const chatTable = querySelector('#pCC table table table table');
  if (!chatTable) { return; }
  chatTable.classList.add('fshGc');
}
