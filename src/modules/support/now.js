export var now;
export var nowSecs;

export function initNow() {
  if (!now) {
    now = Date.now();
    nowSecs = Math.floor(now / 1000);
  }
}
