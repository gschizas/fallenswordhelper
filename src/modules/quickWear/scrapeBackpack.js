import getInventoryById from '../ajax/getInventoryById';
import getItemImg from '../common/getItemImg';
import {itemRE} from '../support/dataObj';
import showQuickWear from './quickwear';
import * as layout from '../support/layout';
import * as system from '../support/system';

var content;
var scrapedItems;
var folders;
var invItems;

function getItems(doc) {
  var imgList = getItemImg(doc.getElementById('pCC'));
  Array.prototype.forEach.call(imgList, function(img) {
    var thisItem = itemRE.exec(img.dataset.tipped);
    if (!scrapedItems[thisItem[2]]) {
      scrapedItems[thisItem[2]] = {
        n: img.parentNode.parentNode.nextElementSibling.textContent.trim(),
        src: img.src,
        tip: img.dataset.tipped
      };
    }
  });
  return scrapedItems;
}

function queryFolders(doc) {
  return doc.querySelectorAll('a[href*="folder_id="]');
}

function folderNotActive(fldr) {
  return fldr.firstChild.src.indexOf('folder_on.gif') === -1;
}

function displayProgress(msg) {
  content.insertAdjacentHTML('beforeend', msg + '<br>');
}

function folderProgress(folderName) {
  displayProgress('Checking folder ' + folderName + '...');
}

function folderText(fldr) {
  return fldr.parentNode.textContent;
}

function gotOtherPage(folderName, html) {
  folderProgress(folderName);
  getItems(system.createDocument(html));
}

function gotSecondPage(folderName, html) {
  folderProgress(folderName);
  var doc = system.createDocument(html);
  var myFolders = queryFolders(doc);
  if (folderNotActive(myFolders[1])) {
    displayProgress('No more folders...');
    return html;
  }
  getItems(doc);
  var prm = [];
  for (var i = 2; i < myFolders.length; i += 1) {
    prm.push($.get(myFolders[i].href)
      .done(gotOtherPage.bind(null, folderText(myFolders[i]))));
  }
  return $.when.apply($, prm);
}

function gotGuildStoreItems(html) {
  displayProgress('Checking Guild Store Items...');
  getItems(system.createDocument(html));
}

function getGuildStoreItems() {
  return $.get('index.php?cmd=guild&subcmd=inventory&subcmd2=storeitems')
    .done(gotGuildStoreItems);
}

function imDone() {
  displayProgress('I\'m done.');
  var itemAry = Object.keys(scrapedItems).map(function(invId) {
    return {
      a: invId,
      eq: Number(invItems[invId].type) < 9,
      f: Number(invItems[invId].folder_id),
      n: scrapedItems[invId].n,
      src: scrapedItems[invId].src,
      tip: scrapedItems[invId].tip,
      u: ['10', '12', '15', '16'].indexOf(invItems[invId].type) !== -1 ||
        scrapedItems[invId].n === 'Zombie Coffin'
    };
  });
  showQuickWear(content, itemAry, folders);
}

function gotInv(data) {
  displayProgress('Checking Inventory...');
  // console.log('Inventory', data);
  folders = data.folders;
  invItems = data.items;
}

function gotFirstPage(html) {
  folderProgress('Main');
  var doc = system.createDocument(html);
  var myFolders = queryFolders(doc);
  if (folderNotActive(myFolders[0])) {
    displayProgress('Something has gone horribly wrong!');
    return;
  }
  var prm = [getInventoryById().done(gotInv)];
  if (myFolders[1]) {
    var fn = gotSecondPage.bind(null, folderText(myFolders[1]));
    prm.push($.get(myFolders[1].href).pipe(fn));
  }
  getItems(doc);
  $.when.apply($, prm).pipe(getGuildStoreItems).done(imDone);
}

export default function insertQuickWear(injector) {
  content = injector || layout.pCC;
  if (!content) {return;}
  displayProgress('Getting item list from backpack...');
  scrapedItems = {};
  $.get('index.php?cmd=profile&subcmd=dropitems')
    .done(gotFirstPage);
}
