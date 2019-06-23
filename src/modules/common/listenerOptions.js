import isType from './isType';

export default function listenerOptions(options) {
  if (isType(options, 'boolean')) {
    return {capture: options};
  }
  return options;
}
