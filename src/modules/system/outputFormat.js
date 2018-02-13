export default function outputFormat(value, suffix) {
  if (value === 0) {return '';}
  return value.toString() + suffix;
}
