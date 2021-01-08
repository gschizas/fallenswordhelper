import getElementById from '../../common/getElement';
import setInnerHtml from '../../dom/setInnerHtml';

let bufferProgress;

export function getBufferProgress() {
  bufferProgress = getElementById('bufferProgress');
}

export function updateProgress(html, colour) {
  setInnerHtml(html, bufferProgress);
  if (colour) {
    bufferProgress.style.color = colour;
  }
}
