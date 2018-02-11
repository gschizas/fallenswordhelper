import fallback from './fallback';

function getTarget(doc) {
  if (doc instanceof HTMLDocument) {return doc;}
  return document;
}

function patchXPath(xpath) {
  if (xpath.indexOf('/') === 0) {
    return '.' + xpath;
    // TODO this is likely to be bad
    // this is a chrome fix - needs a .// for xpath
    // where as firefox can function without it.
    // firefox still works with .//
  }
  return xpath;
}

export default function findNodes(xpath, doc) {
  var _xpath = patchXPath(xpath);
  var nodes = [];
  var target;
  // We may have passed in a HTMLDocument object as the context
  // See createDocument with DOMParser
  // This only matters in Firefox. evaluate will fail silently if
  // the context is not part of the calling object.
  var _doc = fallback(doc, document);
  target = getTarget(_doc);
  var findQ = target.evaluate(_xpath, _doc, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (findQ.snapshotLength === 0) {return null;}
  for (var i = 0; i < findQ.snapshotLength; i += 1) {
    nodes.push(findQ.snapshotItem(i));
  }
  return nodes;
}
