import runDefault from '../../common/runDefault';
import { news, viewArchive } from './loader';

const newsFsbox = () => { runDefault(import('../../news/newsFsbox')); };
const newsShoutbox = () => { runDefault(import('../../news/newsShoutbox')); };

export default {
  fsbox: { '-': newsFsbox },
  '-': { '-': news },
  shoutbox: { '-': newsShoutbox },
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
};
