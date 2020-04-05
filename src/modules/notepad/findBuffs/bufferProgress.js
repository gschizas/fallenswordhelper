import { getElementById } from '../../common/getElement';

let bufferProgress;

export function getBufferProgress() {
  bufferProgress = getElementById('bufferProgress');
}

export function updateProgress(html, colour) {
  bufferProgress.innerHTML = html;
  if (colour) {
    bufferProgress.style.color = colour;
  }
}
