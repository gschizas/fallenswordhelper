import on from './on';

export default function onclick(target, listener, options) {
  on(target, 'click', listener, options);
}
