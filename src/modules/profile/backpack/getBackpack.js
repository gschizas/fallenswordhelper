let bp;

export default function getBackpack() { // jQuery
  if (!bp) {
    bp = $('#backpackContainer').data('hcsBackpack');
  }
  return bp;
}
