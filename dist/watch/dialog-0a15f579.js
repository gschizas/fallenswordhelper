import { d as dialogMsg } from './dialogMsg-a494feed.js';

function dialog(data) {
  if (data.r !== 0) {
    dialogMsg(data.m);
  }
  return data;
}

export { dialog as d };
//# sourceMappingURL=dialog-0a15f579.js.map
