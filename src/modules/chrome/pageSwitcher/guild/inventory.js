import dropItemLoader from '../../../profile/dropitems/dropItemLoader';
import injectGuildAddTagsWidgets from
  '../../../guild/injectGuildAddTagsWidgets';
import injectReportPaint from '../../../guild/guildReport/guildReport';

export default {
  report: injectReportPaint,
  addtags: injectGuildAddTagsWidgets,
  removetags: injectGuildAddTagsWidgets,
  storeitems: dropItemLoader
};
