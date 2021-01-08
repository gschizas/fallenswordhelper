import runDefault from '../../../common/runDefault';

const injectReportPaint = () => {
  runDefault(import('../../../guild/inventory/guildReport/guildReport'));
};
const injectGuildAddTagsWidgets = () => {
  runDefault(import('../../../guild/inventory/injectGuildAddTagsWidgets'));
};
const storeitems = () => {
  runDefault(import('../../../guild/inventory/storeitems/storeitems'));
};

export default {
  report: injectReportPaint,
  addtags: injectGuildAddTagsWidgets,
  removetags: injectGuildAddTagsWidgets,
  storeitems,
};
