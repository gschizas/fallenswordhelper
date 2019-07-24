export let now;
export let nowSecs;

export function initNow() {
  if (!now) {
    now = Date.now();
    nowSecs = Math.floor(now / 1000);
  }
}
