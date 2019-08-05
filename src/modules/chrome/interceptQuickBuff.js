import fshOpen from './fshOpen';

export default function interceptQuickBuff() {
  window.openWindow = fshOpen;
}
