
export default function jsonParse(str, reviver) {
  try {
    return JSON.parse(str, reviver);
  } catch (e) {
    // Ignore bad json
  }
}
