import prepareData from './prepareData';

export default function smartTableConfig(data, membrList) {
  return {
    data: prepareData(data, membrList),
    tableState: {
      sort: {},
      filter: {},
      search: {},
      slice: {page: 1, size: 50}
    }
  };
}
