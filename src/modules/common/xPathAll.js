import xPathEvaluate from './xPathEvaluate';

function invalidResult(result) {
  return !result || !result.snapshotLength || result.snapshotLength === 0;
}

export default function xPathAll(expr, doc, context) {
  var result = xPathEvaluate(XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    expr, doc, context);
  if (invalidResult(result)) {return;}
  var a = [];
  for (var i = 0; i < result.snapshotLength; i += 1) {
    a.push(result.snapshotItem(i));
  }
  return a;
}
