import listenerOptions from './listenerOptions';
import on from './on';

export default function once(target, type, listener, addOptions) {
  on(target, type, listener, { once: true, ...listenerOptions(addOptions) });
}
