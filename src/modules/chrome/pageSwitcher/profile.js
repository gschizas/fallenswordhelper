import dropItemLoader from '../../profile/dropitems/dropItemLoader';
import injectBioWidgets from '../../profile/bio/bioWidgets';
import injectProfile from '../../profile/profile';

export default {
  '-': { '-': injectProfile },
  managecombatset: { '-': injectProfile },
  report: { '-': injectProfile },
  equipitem: { '-': injectProfile },
  useitem: { '-': injectProfile },
  changebio: { '-': injectBioWidgets },
  dropitems: { '-': dropItemLoader },
};
