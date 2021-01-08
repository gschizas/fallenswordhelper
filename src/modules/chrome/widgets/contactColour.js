export default function contactColour(el, obj) {
  const onMouseOver = el.dataset.tipped;
  const lastActivityMinutes = /Last Activity:<\/td><td>(\d+) mins/.exec(onMouseOver)[1];
  if (lastActivityMinutes < 2) {
    el.classList.add(obj.l1);
  } else if (lastActivityMinutes < 5) {
    el.classList.add(obj.l2);
  } else {
    el.classList.add(obj.l3);
  }
}
