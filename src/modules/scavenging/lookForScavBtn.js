import {getElementById} from '../common/getElement';
import on from '../common/on';
import setLastScav from './setLastScav';

function dontPost(e) {
  var caveEle = document.querySelector('#pCC input[name="cave_id"]:checked');
  if (caveEle) {
    e.preventDefault();
    var caveId = caveEle.value;
    var gold = getElementById('gold').value;
    setLastScav(caveId, gold);
    window.location = 'index.php?cmd=scavenging&subcmd=process&cave_id=' +
      caveId + '&gold=' + gold + '&submit=Scavenge';
  }
}

export default function lookForScavBtn() {
  var scavBtn = document.querySelector('#pCC input[value="Scavenge"]');
  if (scavBtn) {on(scavBtn, 'click', dontPost);}
}
