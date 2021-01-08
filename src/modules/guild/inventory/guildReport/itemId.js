export default function itemId(href) {
  return href.match(/&id=(\d+)/)[1];
}
