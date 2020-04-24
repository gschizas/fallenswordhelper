import isBoolean from './isBoolean';

export default function listenerOptions(options) {
  if (isBoolean(options)) {
    return { capture: options };
  }
  return options;
}
