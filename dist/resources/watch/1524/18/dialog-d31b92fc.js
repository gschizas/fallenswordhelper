import { d as dialogMsg } from './dialogMsg-cdeff92d.js';

function dialog(data) {
  if (data.r !== 0) {
    dialogMsg(data.m);
  }
  return data;
}

export { dialog as d };
//# sourceMappingURL=dialog-d31b92fc.js.map
