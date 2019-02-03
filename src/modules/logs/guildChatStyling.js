import querySelector from '../common/querySelector';

export default function guildChatStyling() {
  var chatTable = querySelector('#pCC table table table table');
  if (!chatTable) {return;}
  chatTable.classList.add('fshGc');
}
