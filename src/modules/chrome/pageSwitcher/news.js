import runDefault from '../../common/runDefault';
import { viewArchive } from './loader';

const newsFsbox = () => { runDefault(import('../../news/newsFsbox')); };
const newsShoutbox = () => { runDefault(import('../../news/newsShoutbox')); };

export default {
  fsbox: { '-': newsFsbox },
  shoutbox: { '-': newsShoutbox },
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
};
