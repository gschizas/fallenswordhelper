import handleSubmit from './handleSubmit';
import on from './on';
import { pCC } from '../support/layout';

export default function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}
