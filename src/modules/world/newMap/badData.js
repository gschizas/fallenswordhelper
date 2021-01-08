export default function badData(data) {
  return !data || !data.response || !data.response.data;
}
