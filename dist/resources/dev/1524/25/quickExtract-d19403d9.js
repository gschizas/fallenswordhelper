import{x as t,A as e,h as n,o as i,p as s,t as r,au as a,y as o,aH as c,bD as d}from"./calfSystem-69dd5601.js"
import{c as f}from"./createTable-ba9c0bc4.js"
import"./indexAjaxJson-2e5777a1.js"
import"./cmdExport-88c93b51.js"
import"./guildStore-036541ca.js"
import{g as l}from"./getInventory-dd9651ec.js"
import{j as m,o as u}from"./jsonFail-11ca2dfb.js"
import{j as p}from"./jConfirm-f84302cc.js"
import{d as h}from"./daUseItem-0f92a11f.js"
import{e as x}from"./eventHandler5-edf8409d.js"
import{s as b}from"./selfIdIs-6ca8a9a1.js"
let y,_,j,v,g,I,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${d[t.type]}`}function k(t,e){var n
m(e,$)||(!function(t){const e=j.findIndex(r(E,t))
e>=0&&j.splice(e,1)}(t),u((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){h(t).then(r(k,t))}function D(t){const n=I[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function A(t){p("Extract Resources","Are you sure you want to extract all similar items?",r(D,t))}function F(t){return function(t){return g&&-1!==t.folder_id}(t)||function(t){return!v&&t.is_in_st}(t)}function q(t,e){return F(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function C(t,e){const n=I[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${_}" border=0></td><td>${n.item_name}</td></tr>`}function H(){if(!j)return
I=j.reduce(q,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(I).reduce(C,""),e(t,y),$=o("qeresult")}function M(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function Y(t){_=t.player_id,j=t.items.filter(M),H()}function O(){v=!v,H()}function R(){g=!g,H()}function T(t){return t.id.startsWith("fshExtr")}function J(r){if(t())return
const a=r||s
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),y=f({width:"100%"}),n(a,y),v=!0,g=!0,i(a,x([[b("fshInSt"),O],[b("fshInMain"),R],[T,A]])),l().then(Y)}export default J
//# sourceMappingURL=quickExtract-d19403d9.js.map
