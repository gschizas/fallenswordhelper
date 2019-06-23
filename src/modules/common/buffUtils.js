import buffList from '../support/buffObj.json';

// function buff(thisBuff, el) {return el.name === thisBuff;}

const getBuff = thisBuff => buffList.find(e => e.name === thisBuff);

export function getStamAsString(buffCast) {
  // var thisBuff = buffList.find(partial(buff, buffCast[1]));
  var thisBuff = getBuff(buffCast);
  if (thisBuff) {return thisBuff.stam.toString();}
  return '-';
}

export function getBuffId(buff) {
  const thisBuff = getBuff(buff);
  if (thisBuff) {return thisBuff.id;}
  return -1;
}
