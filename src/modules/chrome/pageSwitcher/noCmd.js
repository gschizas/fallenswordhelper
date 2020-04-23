import runDefault from '../../common/runDefault';
import { viewArchive } from './loader';

const unknownPage = () => { runDefault(import('../unknownPage')); };

export default {
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
  '-': { '-': unknownPage },
};
