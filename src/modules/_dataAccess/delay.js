export default function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
