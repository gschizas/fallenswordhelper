export default function getRandomInt(_min, _max) {
  var min = Math.ceil(_min);
  var max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min)) + min;
}
