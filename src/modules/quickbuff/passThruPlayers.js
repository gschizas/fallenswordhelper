import csvSplit from '../common/csvSplit';
import firstPlayerStats from './firstPlayerStats';
import getUrlParameter from '../system/getUrlParameter';

let requests;

function processQueue() {
  if (requests.length) {
    window.addPlayer(requests.shift());
    setTimeout(processQueue, 200);
  } else {
    firstPlayerStats();
  }
}

export default function passThruPlayers() {
  const passThru = getUrlParameter('players');
  if (passThru) {
    requests = csvSplit(passThru);
    processQueue();
  }
}
