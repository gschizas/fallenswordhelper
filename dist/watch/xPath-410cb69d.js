import { ab as fallback } from './calfSystem-98d7118c.js';

function getDoc(doc, context) {
  if (doc instanceof HTMLDocument) { return doc; }
  if (context) { return context.ownerDocument; }
  return document;
}

function xPathEvaluate(type, expr, _doc, _context) {
  const doc = getDoc(_doc, _context);
  const context = fallback(_context, doc);
  return doc.evaluate(expr, context, null, type, null);
}

function xPath(expr, doc, context) {
  return xPathEvaluate(XPathResult.ANY_UNORDERED_NODE_TYPE,
    expr, doc, context).singleNodeValue;
}

export { xPath as x };
//# sourceMappingURL=xPath-410cb69d.js.map
