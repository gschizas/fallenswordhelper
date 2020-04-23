import { injectStoreItems } from '../loader';
import runDefault from '../../../common/runDefault';

const injectGuildAddTagsWidgets = () => {
  runDefault(import('../../../guild/injectGuildAddTagsWidgets'));
};
const injectReportPaint = () => {
  runDefault(import('../../../guild/guildReport/guildReport'));
};

export default {
  report: injectReportPaint,
  addtags: injectGuildAddTagsWidgets,
  removetags: injectGuildAddTagsWidgets,
  storeitems: injectStoreItems,
};
