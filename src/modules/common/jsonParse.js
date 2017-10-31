
export default function jsonParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    // Ignore bad json
  }
}
