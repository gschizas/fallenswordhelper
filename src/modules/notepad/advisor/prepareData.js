import partial from '../../common/partial';
import toLowerCase from '../../common/toLowerCase';

const reformat = (membrList, row) => {
  row.player.lower = toLowerCase(row.player.name);
  row.player.rank = membrList[row.player.name].rank_name; // TODO
  row.player.level = membrList[row.player.name].level; // TODO
  return row;
};

export default function prepareData(data, membrList) {
  return data.r.map(partial(reformat, membrList));
}
