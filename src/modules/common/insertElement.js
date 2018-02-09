export default function insertElement(parent, child) {
  if (parent instanceof Node) {
    parent.appendChild(child);
  }
}
