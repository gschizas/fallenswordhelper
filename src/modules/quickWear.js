import calf from './support/calf';
import * as system from './support/system';
import * as layout from './support/layout';

function showAHInvManager(injectId) { // Bad jQuery
  var output = '<table width=100% cellspacing=2 cellpadding=2>'+
    '<tr><th colspan=5 align=center>Items from ' +
    '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
    'AH Quick Search</a> found in your inventory</td>'+
    '<tr><th>Name</th><th>Nick Name<th>Inv Count</th><th>' +
    'AH Min Price</th><th>AH BuyNow Price</th></tr>';
  var invCount = {};
  var name;
  var key;
  var i;
  var quickSL = system.getValueJSON('quickSearchList');
  // fill up the Inv Counter
  for (key in calf.itemList) {
    if (!calf.itemList.hasOwnProperty(key)) {continue;}
    name = calf.itemList[key].html
      .match(/<td width="90%">&nbsp;(.*)<\/td>/)[1];
    if (invCount[name]) {
      invCount[name].count+= 1;
    } else {
      invCount[name]={'count':1,'nicknameList':''};
    }
    for (i = 0; i<quickSL.length; i += 1) {
      if (name.indexOf(quickSL[i].searchname) >= 0 &&
        invCount[name]
          .nicknameList
          .indexOf(quickSL[i].nickname) < 0) {
        invCount[name].nicknameList += '<a href=\'index.php?cmd=' +
          'auctionhouse&type=-1&search_text=' +
          quickSL[i].searchname + '\'>' + quickSL[i].nickname +
          '</a> ';
        quickSL[i].found = true;
      }
    }
  }
  // show inv & counter for item with nickname found
  for (key in invCount) {
    if (invCount[key].nicknameList !== '') {
      output += '<tr><td>' + key + '</td><td>' +
        invCount[key].nicknameList + '</td><td>' +
        invCount[key].count +
        '</td><td></td><td></td><td></td></tr>';
    }
  }
  // show item from quick AH search that are not in our inv
  output += '</td></tr><tr><td colspan=5><hr></td></tr>';
  output += '<tr><td>Did not find:</td><td colspan=4>';
  for (i=0; i<quickSL.length; i += 1) {
    if (quickSL[i].displayOnAH && !quickSL[i].found) {
      output += '<a href=\'index.php?cmd=auctionhouse&type=-1&' +
        'search_text=' + quickSL[i].searchname + '\'>' + 
        quickSL[i].nickname+'</a>, ';
    }
  }
  output += '</td></tr><tr><td colspan=5><hr></td></tr>'+
    '<tr><th colspan=5 align=center>Items NOT from ' +
    '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
    'AH Quick Search</a> found in your inventory</td>';
  // show inv & counter for item with nickname NOT found
  for (key in invCount) {
    if (invCount[key].nicknameList === '') {
      output += '<tr><td>' + key + '</td><td>' +
      invCount[key].nicknameList + '</td><td>' +
      invCount[key].count + '</td><td></td><td></td><td></td></tr>';
    }
  }
  output += '</table>';
  $(injectId).html(output);
}

function useProfileInventoryItem(evt) { // Legacy
  if (!window.confirm('Are you sure you want to use/extract the item?')) {
    return;
  }
  var InventoryItemID=evt.target.getAttribute('itemID');
  system.xmlhttp('index.php?cmd=profile&subcmd=useitem&inventory_id=' +
    InventoryItemID,
    function(responseText) {
      var info = layout.infoBox(responseText);
      if (!info) {info = '<font color=red>Error</font>';}
      evt.target.parentNode.innerHTML = info;
    });
}

function equipProfileInventoryItemReturnMessage(responseText, callback) { // Legacy
  var target = callback.target;
  var info = layout.infoBox(responseText);
  var itemCellElement = target.parentNode; //system.findNode('//td[@title="' + itemID + '"]');
  if (!info) {
    itemCellElement.innerHTML =
      '<span style="color:green; font-weight:bold;">Worn</span>';
  } else {
    itemCellElement.innerHTML =
      '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
  }
}

function equipProfileInventoryItem(evt) { // Legacy
  var InventoryItemID=evt.target.getAttribute('itemID');
  system.xmlhttp(
    'index.php?cmd=profile&subcmd=equipitem&inventory_id=' +
    InventoryItemID,
    equipProfileInventoryItemReturnMessage,
    {'item': InventoryItemID, 'target': evt.target});
}

function showQuickWear(callback) { // jQuery
  var key;
  var itemID;
  var output='<div id="invTabs"><ul>'+
    '<li><a href="#invTabs-qw">Quick Wear / Use / Extract <br/>' +
    'Manager</a></li>'+
    '<li><a href="#invTabs-ah">Inventory Manager Counter<br/>' +
    'filtered by AH Quick Search</a></li></ul>'+
    '<div id="invTabs-qw"><table width=100%><tr ' +
    'style="background-color:#CD9E4B;"><td nobr><b>' +
    'Quick Wear / Use / Extract Manager</b></td></tr></table>'+
    '<table width=100%><tr><th width=20%>Actions</th>' +
    '<th colspan=4>Items</th></tr>';
  for (key in calf.itemList) {
    if (!calf.itemList.hasOwnProperty(key)) {continue;}
    itemID=calf.itemList[key].id;
    output+='<tr><td align=center>'+
      '<span style="cursor:pointer; text-decoration:underline; ' +
      'color:#blue; font-size:x-small;" '+
      'id="Helper:equipProfileInventoryItem' + itemID + '" ' +
      'itemID="' + itemID + '">Wear</span>&nbsp;|&nbsp;' +
      '<span style="cursor:pointer; text-decoration:underline; ' +
      'color:#blue; font-size:x-small;" '+
      'id="Helper:useProfileInventoryItem' + itemID + '" ' +
      'itemID="' + itemID + '">Use/Ext</span>'+
      '</td>'+calf.itemList[key].html+'</tr>';
  }
  output+='</table></div><div id="invTabs-ah"></div></div>';
  callback.inject.innerHTML=output;
  for (key in calf.itemList) {
    if (!calf.itemList.hasOwnProperty(key)) {continue;}
    itemID=calf.itemList[key].id;
    document.getElementById('Helper:equipProfileInventoryItem' + itemID)
      .addEventListener('click', equipProfileInventoryItem, true);
    document.getElementById('Helper:useProfileInventoryItem' + itemID)
      .addEventListener('click', useProfileInventoryItem, true);
  }
  $('#invTabs').tabs();
  $('#invTabs').tabs('select', 0);
  showAHInvManager('#invTabs-ah');
}

function retrieveItemInfor(doc) { // jQuery
  $('#pCC input[name="removeIndex[]"]', doc).each(function(){
    var input = $(this);
    input.closest('tr').find('img').attr('width', '30')
      .attr('height', '30');
    var item={
      'id': input.attr('value'),
      'html': input.closest('tr').html().replace(/<input[^>]*>/g, '')
    };
    calf.itemList['id'+item.id]=item;
  });
}

function getItemFromStoreItemPage(responseText, callback) { // Native
  var layout=callback.inject;
  layout.innerHTML+='store item page.';
  var doc=system.createDocument(responseText);
  if (responseText.indexOf('Store Items') > 0){
    retrieveItemInfor(doc);
  }
  showQuickWear(callback);
}

function getItemFromBackpack(responseText, callback) { // Legacy
  var layout=callback.inject;
  layout.innerHTML+='</br>backpack folder '+(callback.id+1)+', ';
  var doc=system.createDocument(responseText);
  if (responseText.indexOf('Back to Profile') > 0){
    retrieveItemInfor(doc);
  }

  var folderNodes=system.findNodes(
    '//a[contains(@href,"cmd=profile&subcmd=dropitems&folder_id=")]',doc);
  if (folderNodes && folderNodes.length > 0 &&
      callback.id < folderNodes.length - 1) {
    system.xmlhttp(folderNodes[callback.id+1].getAttribute('href'),
      getItemFromBackpack, {'inject':layout,'id':callback.id+1});
  } else {
    system.xmlhttp(
      '/index.php?cmd=guild&subcmd=inventory&subcmd2=storeitems',
      getItemFromStoreItemPage, callback);
  }
}

export function insertQuickWear(content) { // Legacy
  calf.itemList = {};
  if (!content) {content=layout.notebookContent();}
  content.innerHTML='Getting item list from: ';
  system.xmlhttp('/index.php?cmd=profile&subcmd=dropitems&folder_id=-1',
    getItemFromBackpack, {'inject':content,'id':0});
}
