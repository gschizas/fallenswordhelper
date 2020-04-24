export default function createDocument(details) {
  // Use DOMParser to prevent img src tags downloading
  const parser = new DOMParser();
  const doc = parser.parseFromString(details, 'text/html');
  return doc;
}
