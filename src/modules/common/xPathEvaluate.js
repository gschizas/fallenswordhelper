import fallback from '../system/fallback';

function getDoc(doc, context) {
  if (doc instanceof HTMLDocument) {return doc;}
  if (context) {return context.ownerDocument;}
  return document;
}

export default function xPathEvaluate(type, expr, _doc, _context) {
  var doc = getDoc(_doc, _context);
  var context = fallback(_context, doc);
  return doc.evaluate(expr, context, null, type, null);
}
