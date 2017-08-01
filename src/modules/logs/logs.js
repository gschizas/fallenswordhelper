import addChatTextArea from './addChatTextArea';
import addGuildLogWidgets from './addGuildLogWidgets';
import addLogColoring from './addLogColoring';
import addLogWidgets from './addLogWidgets';

export function guildChat() {
  addChatTextArea();
  addLogColoring('Chat', 0);
}

export function guildLog() {
  addLogColoring('GuildLog', 1);
  addGuildLogWidgets();
}

export function outbox() {
  addLogColoring('OutBox', 1);
}

export function playerLog() {
  addLogColoring('PlayerLog', 1);
  addLogWidgets();
}
