import { d as dialogMsg } from './dialogMsg-e65fe68e.js';

function dialog(data) {
  if (data.r !== 0) {
    dialogMsg(data.m);
  }
  return data;
}

export { dialog as d };
//# sourceMappingURL=dialog-30fd8a85.js.map
