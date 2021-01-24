import QuickButtons from './QuickButtons.svelte';
import querySelector from '../../common/querySelector';

export default function profileInjectQuickButton() {
  const avyImg = querySelector(
    '#profileLeftColumn img[src*="/avatars/"][width="200"]',
  );
  if (!avyImg) { return; }
  // eslint-disable-next-line no-new
  new QuickButtons({
    anchor: avyImg.nextElementSibling,
    target: avyImg.parentNode,
  });
}
