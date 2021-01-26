import on from './on';

export default function onsubmit(target, listener, options) {
  on(target, 'submit', listener, options);
}
