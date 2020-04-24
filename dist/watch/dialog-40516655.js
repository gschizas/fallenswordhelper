import { d as dialogMsg } from './dialogMsg-eb4f8460.js';

function dialog(data) {
  if (data.r !== 0) {
    dialogMsg(data.m);
  }
  return data;
}

export { dialog as d };
//# sourceMappingURL=dialog-40516655.js.map
