export default function titanKs() {
  var dynamic = GameData.realm().dynamic;
  return Array.isArray(dynamic) && dynamic.some(function(el) {
    return el.type === 0;
  });
}
