export default function quickbuffSuccess(result) {
  return result.s && result.r[0].casts.length === 1;
}
