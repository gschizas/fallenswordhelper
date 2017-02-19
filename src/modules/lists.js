import calf from './support/calf';
import * as dataObj from './support/dataObj';
import * as system from './support/system';
import * as layout from './support/layout';

function generateManageTable() { // Legacy
  var i, j, result='<table cellspacing=2 cellpadding=2 style="table-layout: fixed; word-wrap: break-word;" width=100%><tr bgcolor=#CD9E4B>';
  var isArrayOnly= calf.param.fields.length === 0;
  for (i=0;i<calf.param.headers.length;i += 1) {
    result+='<th>'+calf.param.headers[i]+'</th>';
  }
  result+='<th>Action</th></tr>';
  var currentCategory = '';
  for (i=0;i<calf.param.currentItems.length;i += 1) {
    result+='<tr>';
    if (isArrayOnly) {
      result+='<td align=center>'+calf.param.currentItems[i]+'</td>';
    } else {
      if (calf.param.categoryField && currentCategory !== calf.param.currentItems[i][calf.param.categoryField]) {
        currentCategory = calf.param.currentItems[i][calf.param.categoryField];
        result += '<td><span style="font-weight:bold; font-size:large;">' + currentCategory + '</span></td></tr><tr>';
      }
      for (j=0;j<calf.param.fields.length;j += 1) {
        result+='<td align=center class=content>';
        if (calf.param.fields[j]!==calf.param.categoryField){
          if (calf.param.tags[j]==='checkbox'){
            result+='<input type=checkbox '+(calf.param.currentItems[i][calf.param.fields[j]]?'checked':'')+' disabled>';
          } else {
            if (calf.param.url && calf.param.url[j] !== ''){
              result+='<a href="'+calf.param.url[j].replace('@replaceme@',calf.param.currentItems[i][calf.param.fields[j]])+'">'+
                calf.param.currentItems[i][calf.param.fields[j]]+'</a>';
            } else {
              result+=calf.param.currentItems[i][calf.param.fields[j]];
            }
          }
          result+='</td>';
        }
      }
    }
    result+='<td><span class=HelperTextLink itemId="' + i + '" id="Helper:DeleteItem' + i + '">[Del]</span></td></tr>';
  }
  result+='<tr>';
  if (isArrayOnly){
    result+='<td align=center><input type='+calf.param.tags[i]+' class=custominput id=Helper:input0></td>';
  }
  else {
    for (i=0;i<calf.param.tags.length;i += 1){
      result+='<td align=center><input type='+calf.param.tags[i]+' class=custominput id=Helper:input'+calf.param.fields[i]+'></td>';
    }
  }
  result+='<td><span class=HelperTextLink id="Helper:AddItem">[Add]</span></td></tr></table>';

  if (calf.param.showRawEditor) {
    result+='<table width=100%><tr><td align=center><textarea cols=70 rows=20 name="Helper:rawEditor">' +
      JSON.stringify(calf.param.currentItems) + '</textarea></td></tr>'+
      '<tr><td align=center><input id="Helper:saveRawEditor" type="button" value="Save" class="custombutton">'+
      '&nbsp;<input id="Helper:resetRawEditor" type="button" value="Reset" class="custombutton"></td></tr>'+
      '</tbody></table>';
  }

  document.getElementById(calf.param.id).innerHTML = result;

  system.setValueJSON(calf.param.gmname, calf.param.currentItems);
}

function deleteQuickItem(evt) { // Legacy
  var itemId = evt.target.getAttribute('itemId');
  calf.param.currentItems.splice(itemId, 1);
  generateManageTable();
}

function addQuickItem() { // Legacy
  var isArrayOnly= calf.param.fields.length === 0;
  var newItem={};
  if (isArrayOnly) {
    newItem=document.getElementById('Helper:input0').value;
  } else {
    for (var i=0;i<calf.param.fields.length;i += 1){
      if (calf.param.tags[i]==='checkbox') {
        newItem[calf.param.fields[i]] =
          document.getElementById('Helper:input' +
            calf.param.fields[i]).checked;
      } else {
        newItem[calf.param.fields[i]] =
          document.getElementById('Helper:input' +
            calf.param.fields[i]).value;
      }
    }
  }
  calf.param.currentItems.push(newItem);
  generateManageTable();
}

function saveRawEditor() { // jQuery
  calf.param.currentItems =
    JSON.parse($('textarea[name="Helper:rawEditor"]').val());
  generateManageTable();
}

function resetRawEditor() { // Legacy
  if (location.search === '?cmd=notepad&blank=1&subcmd=auctionsearch') {
    calf.param.currentItems =
      JSON.parse(dataObj.defaults.quickSearchList);
  } else {calf.param.currentItems=[];}
  generateManageTable();
}

function listEvtHnl(e) { // Native
  if (e.target.id === 'Helper:resetRawEditor') {resetRawEditor();} else
  if (e.target.id === 'Helper:saveRawEditor') {saveRawEditor();} else
  if (e.target.id === 'Helper:AddItem') {addQuickItem();} else
  if (e.target.id.indexOf('Helper:DeleteItem') === 0) {deleteQuickItem(e);}
}

export function injectAuctionSearch(content) { // Legacy
  if (!content) {content = layout.pCC;}
  content.innerHTML =
    layout.makePageHeader('Trade Hub Quick Search', '', '', '') +
    '<div class=content>This screen allows you to set up some quick ' +
      'search templates for the Auction House. The Display on AH column ' +
      'indicates if the quick search will show on the short list on the ' +
      'Auction House main screen. A maximum of 36 items can show on this ' +
      'list (It will not show more than 36 even if you have more than 36 ' +
      'flagged). To edit items, either use the large text area below, or ' +
      'add a new entry and delete the old one. You can always reset the ' +
      'list to the default values.</div>'+
    '<div style="font-size:small;" id="Helper:Auction Search Output">' +
    '</div>';
  // global parameters for the meta function generateManageTable
  calf.param = {
    'id':'Helper:Auction Search Output',
    'headers': ['Category', 'Nickname', 'Quick Search Text',
      'Display in AH?'],
    'fields': ['category', 'nickname', 'searchname', 'displayOnAH'],
    'tags': ['textbox', 'textbox', 'textbox', 'checkbox'],
    'url': ['', '',
      'index.php?cmd=auctionhouse&type=-1&search_text=@replaceme@', ''],
    'currentItems': system.getValueJSON('quickSearchList'),
    'gmname': 'quickSearchList',
    'sortField': 'category',
    'categoryField': 'category',
    'showRawEditor': true
  };
  generateManageTable();
  content.addEventListener('click', listEvtHnl);
}

export function injectQuickLinkManager(content) { // Legacy
  if (!content) {content = layout.pCC;}
  content.innerHTML =
    layout.makePageTemplate('Quick Links', '', '', '', 'quickLinkAreaId');

  // global parameters for the meta function generateManageTable
  calf.param = {
    'id': 'quickLinkAreaId',
    'headers': ['Name', 'URL',
      'New [<span style="cursor:pointer; text-decoration:underline;" ' +
      'title="Open page in a new window">?</span>]'],
    'fields': ['name', 'url', 'newWindow'],
    'tags': ['textbox', 'textbox', 'checkbox'],
    'currentItems': system.getValueJSON('quickLinks'),
    'gmname': 'quickLinks',
    'showRawEditor': true
  };
  generateManageTable();
  content.addEventListener('click', listEvtHnl);
}
