import addChatTextArea from './addChatTextArea';
import addLogColoring from './addLogColoring';
import guildChatStyling from './guildChatStyling';

export default function guildChat() {
  addChatTextArea();
  guildChatStyling();
  addLogColoring('Chat', 0);
}
