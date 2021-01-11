import runDefault from '../../common/runDefault';
import { news, viewArchive } from './loader';

const unknownPage = () => { runDefault(import('../unknownPage')); };

export default {
  news: { '-': news },
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
  '-': { '-': unknownPage },
};
