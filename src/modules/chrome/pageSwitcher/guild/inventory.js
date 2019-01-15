import injectGuildAddTagsWidgets from
  '../../../guild/injectGuildAddTagsWidgets';
import injectReportPaint from '../../../guild/guildReport/guildReport';
import injectStoreItems from '../../../profile/dropitems/injectStoreItems';

export default {
  report: injectReportPaint,
  addtags: injectGuildAddTagsWidgets,
  removetags: injectGuildAddTagsWidgets,
  storeitems: injectStoreItems
};
