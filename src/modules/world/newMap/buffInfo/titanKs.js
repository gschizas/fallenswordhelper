function hasTitan(el) {return el.type === 0;}

export default function titanKs() {
  var dynamic = GameData.realm().dynamic;
  return Array.isArray(dynamic) && dynamic.some(hasTitan);
}
