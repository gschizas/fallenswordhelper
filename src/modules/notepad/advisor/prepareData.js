import partial from '../../common/partial';
import toLowerCase from '../../common/toLowerCase';

const reformat = (membrList, row) => ({
  ...row,
  player: {
    ...row.player,
    lower: toLowerCase(row.player.name),
    rank: membrList[row.player.name].rank_name, // TODO
    level: membrList[row.player.name].level, // TODO
  },
});

export default function prepareData(data, membrList) {
  return data.r.map(partial(reformat, membrList));
}
