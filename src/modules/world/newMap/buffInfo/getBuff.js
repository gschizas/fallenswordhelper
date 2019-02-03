import partial from '../../../common/partial';

function thisBuff(name, e) {return e.name === name;}

export default function getBuff(name) {
  var buffs = GameData.player().buffs;
  if (buffs) {
    return buffs.find(partial(thisBuff, name));
  }
}
