export default function setValueJSON(name, value) {
  GM_setValue(name, JSON.stringify(value));
}
