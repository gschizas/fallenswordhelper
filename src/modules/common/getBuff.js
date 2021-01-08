import buffList from '../support/buffObj.json';

export default function getBuff(thisBuff) {
  return buffList.find((e) => e.name === thisBuff);
}
