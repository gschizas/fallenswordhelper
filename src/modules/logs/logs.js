import addChatTextArea from './addChatTextArea';
import addGuildLogWidgets from './addGuildLogWidgets';
import addLogColoring from './addLogColoring';
import addLogWidgets from './addLogWidgets';

export function guildChat() { // Native
  addChatTextArea();
  addLogColoring('Chat', 0);
}

export function guildLog() { // Native
  addLogColoring('GuildLog', 1);
  addGuildLogWidgets();
}

export function outbox() { // Native
  addLogColoring('OutBox', 1);
}

export function playerLog() { // Native
  addLogColoring('PlayerLog', 1);
  addLogWidgets();
}
