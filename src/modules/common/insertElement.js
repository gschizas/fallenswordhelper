export default function insertElement(parent, child) {
  if (parent instanceof Node && child instanceof Node) {
    parent.appendChild(child);
  }
}
