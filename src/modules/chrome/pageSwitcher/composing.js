import composingBreakdown from '../../composing/breakdown';
import composingCreate from '../../composing/composingCreate';
import injectComposing from '../../composing/composing';

export default {
  '-': {'-': {'-': injectComposing}},
  breakdown: {'-': {'-': composingBreakdown}},
  create: {'-': {'-': composingCreate}}
};
