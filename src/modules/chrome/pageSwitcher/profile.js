import {
  injectBioWidgets,
  injectProfile,
  injectProfileDropItems,
} from './loader';

export default {
  '-': { '-': injectProfile },
  managecombatset: { '-': injectProfile },
  report: { '-': injectProfile },
  equipitem: { '-': injectProfile },
  useitem: { '-': injectProfile },
  changebio: { '-': injectBioWidgets },
  dropitems: { '-': injectProfileDropItems },
};
