import jQueryPresent from '../common/jQueryPresent';

// var system = require('./support/system');

// Legacy - Bad, could be repurposed
/* function getBpCountFromWorld(responseText) {
  // backpack counter
  var doc=system.createDocument(responseText);
  var bp=system.findNode(
    '//td[a/img[contains(@src,"_manageitems.gif")]]',doc);
  var injectHere=document.getElementById('reportDiv');
  if (!injectHere) {
    injectHere=system.findNode(
      '//b[contains(.,"Multiple Scavenging Results")]/..');
  }
  insertElement(injectHere, bp);
}
*/

/* function multiSummary() { // Legacy - Bad, could be repurposed
  var injectHere=system.findNode(
    '//b[contains(.,"Multiple Scavenging Results")]/..');
  if (injectHere) { // multi scavenging
    var victories=system.findNodes('//td[contains(.,"victorious")]');
    if (victories) {
      injectHere.innerHTML+='<br/>Victories: '+victories.length;
    }
    var defeats=system.findNodes('//td[contains(.,"defeated")]');
    if (defeats) {
      injectHere.innerHTML+=', Defeated: '+defeats.length;
    }
    var gains=system.findNodes('//td[contains(.,"Item Gained")]/b');
    if (gains) {
      injectHere.innerHTML+='<br/>'+gains.length+' item(s): ';
      var gainHash={};
      for (var i=0;i<gains.length;i += 1) {
        if (gainHash[gains[i].textContent]) {
          gainHash[gains[i].textContent]+= 1;
        } else {
          gainHash[gains[i].textContent]=1;
        }
      }
      for (var item in gainHash) {
        if (!gainHash.hasOwnProperty(item)) { continue; }
        injectHere.innerHTML+=gainHash[item]+' '+item+'(s), ';
      }
    }
  }
  system.xmlhttp('index.php?cmd=world', getBpCountFromWorld);
}
*/

function dontPost(e) { // jQuery
  e.preventDefault();
  window.location = 'index.php?cmd=scavenging&subcmd=process' +
    '&cave_id=' + $('#pCC input[name="cave_id"]:checked').val() +
    '&gold=' + $('#gold').val() + '&submit=Scavenge';
}

export default function injectScavenging() { // jQuery
  if (jQueryPresent()) {
    $('#pCC input[value="Scavenge"]').click(dontPost);
  }
}
